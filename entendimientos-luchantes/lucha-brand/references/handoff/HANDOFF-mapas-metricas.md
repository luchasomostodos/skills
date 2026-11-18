# Handoff — Mapas Luchantes · sección **Métricas (negocio + impacto)**

> Alcance: el bloque “Métricas · desempeño de la empresa” de la ficha de `/equipo/mapas/[id]`.
> Reemplaza el mini-dashboard de *nuestra posición* por **desempeño de la empresa** con dos lentes (Negocio / Impacto).
> Origen de verdad: `company_business_metrics`, `company_impact_metrics`, `companies`.
> **Pre-requisito**: el wiring de tokens (sección 0) — sin él, los `bg-semaforo-*` / `text-brand-*` no existen.

---

## 0. Pre-requisito de tokens (theme) — bloquea todo lo demás

Pure-Tailwind exige que semáforo, marca y cohorte vivan en el theme. Hoy `globals.css` solo trae los slate de shadcn.

**`src/app/globals.css`** — agregar dentro de `@layer base`:

```css
@layer base {
  :root {
    /* semáforo (H S% L%) para hsl(var(--…)) */
    --semaforo-verde: 160 84% 39%;   --semaforo-verde-foreground: 161 94% 30%;   --semaforo-verde-soft: 152 76% 96%;
    --semaforo-amarillo: 43 96% 56%; --semaforo-amarillo-foreground: 38 92% 40%; --semaforo-amarillo-soft: 48 96% 89%;
    --semaforo-rojo: 347 77% 60%;    --semaforo-rojo-foreground: 347 77% 50%;    --semaforo-rojo-soft: 356 100% 95%;
    --semaforo-gris: 240 5% 65%;     --semaforo-gris-foreground: 240 4% 46%;     --semaforo-gris-soft: 240 5% 96%;
    /* marca */
    --brand-mint: 136 60% 73%;  --brand-ink: 211 51% 11%;  --brand-azul: 222 67% 33%;
    /* cohorte */
    --coh-1: 207 70% 36%;  --coh-2: 178 46% 42%;  --coh-3: 137 47% 67%;
  }
  .dark {
    --semaforo-verde-foreground: 150 52% 62%;   --semaforo-verde-soft: 150 30% 15%;
    --semaforo-amarillo-foreground: 43 78% 62%; --semaforo-amarillo-soft: 43 36% 16%;
    --semaforo-rojo-foreground: 347 74% 71%;    --semaforo-rojo-soft: 347 32% 19%;
    --semaforo-gris-foreground: 215 10% 60%;    --semaforo-gris-soft: 215 14% 18%;
    /* la regla ink→mint la resuelve el toggle de tab activo con bg-foreground text-background */
  }
}
```

**`tailwind.config.ts`** — extender `theme.extend.colors`:

```ts
colors: {
  // …los de shadcn…
  semaforo: {
    verde:    { DEFAULT: "hsl(var(--semaforo-verde))",    fg: "hsl(var(--semaforo-verde-foreground))",    soft: "hsl(var(--semaforo-verde-soft))" },
    amarillo: { DEFAULT: "hsl(var(--semaforo-amarillo))", fg: "hsl(var(--semaforo-amarillo-foreground))", soft: "hsl(var(--semaforo-amarillo-soft))" },
    rojo:     { DEFAULT: "hsl(var(--semaforo-rojo))",     fg: "hsl(var(--semaforo-rojo-foreground))",     soft: "hsl(var(--semaforo-rojo-soft))" },
    gris:     { DEFAULT: "hsl(var(--semaforo-gris))",     fg: "hsl(var(--semaforo-gris-foreground))",     soft: "hsl(var(--semaforo-gris-soft))" },
  },
  brand: { mint: "hsl(var(--brand-mint))", ink: "hsl(var(--brand-ink))", azul: "hsl(var(--brand-azul))" },
  coh:   { 1: "hsl(var(--coh-1))", 2: "hsl(var(--coh-2))", 3: "hsl(var(--coh-3))" },
}
```

---

## 1. Árbol de archivos

```
src/
  app/equipo/mapas/[id]/page.tsx              (RSC) carga datos, compone la ficha; monta <CompanyMetrics/>
  lib/
    metrics.ts                                tipos + getCompanyMetrics(query) + derivadores puros
  components/equipo/metrics/
    CompanyMetrics.tsx          (Client)       contenedor con lens Negocio/Impacto (shadcn Tabs)
    MetricTile.tsx              (RSC)          tile: label + valor + delta + sub + Sparkline
    Sparkline.tsx               (RSC)          SVG sparkline; punto hueco para faltantes (null)
    SnapshotStrip.tsx           (RSC)          tira Q1'26 (métricas sin serie)
    CashRunwayChart.tsx         (RSC)          barras de caja (color por dirección) + línea runway
    GrossMarginChart.tsx        (RSC)          margen consolidado + líneas de variante
    ImpactCard.tsx              (RSC)          tarjeta dinámica de indicador de impacto
    MetricsSkeleton.tsx         (RSC)          estado loading
```

---

## 2. Código de cada archivo

### `src/lib/metrics.ts`
```ts
export type Quarter = string; // "Q1 '25"

export type BusinessMetrics = {
  lab: Quarter[];                 // 5 trimestres, p.ej. Q1'25→Q1'26
  cash: number[];                 // $K por trimestre (Cash on hand)
  runway: number[];               // meses por trimestre
  grossMargin: number[];          // % por trimestre
  headcount: number[];            // FTE por trimestre
  burnK: number;                  // $K/mes (para tooltip + footer)
  snapshot: { yoy: number; nrr: number; ebitda: number; sga: number; pq: number }; // solo Q1'26
  variants: { name: string; v: number }[] | null; // gross margin por línea de producto
};

export type ImpactIndicator = {
  name: string;
  unit: string;                   // " tn" | " MWh" | " pers." | " %" | ""
  serie: number[];                // length 1 ⇒ snapshot (sin serie Q-a-Q)
};

export type CompanyImpact = {
  foco: "social" | "ambiental" | "ambos";
  founders: number;               // % founders mujeres
  items: ImpactIndicator[];
};

export type CompanyMetricsData = {
  negocio: BusinessMetrics;
  impacto: CompanyImpact;
};

/* ---- derivadores PUROS (fórmulas, no implementación de fetch) ---- */
export const pctQoQ = (last: number, prev: number) =>
  prev === 0 ? 0 : Math.round((last / prev - 1) * 100);
export const dirOf = (a: number, b: number) =>
  a > b * 1.001 ? "up" : a < b * 0.999 ? "down" : "flat";
export const kfmt = (v: number) =>
  v >= 1000 ? `${+(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K` : `${v}`;
export const moneyK = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toFixed(1)}M` : `$${v}K`;

/* getCompanyMetrics(companyId): arma BusinessMetrics + CompanyImpact desde la DB.
   - cash/runway/grossMargin/headcount = serie de company_business_metrics
     filtrando indicador IN ('Cash on hand','Runway','Gross margin','Headcount (FTE)')
     ORDER BY periodo. Variantes = filas indicador LIKE 'Gross margin (%)'.
   - snapshot = fila periodo='Q1 2026' de indicadores YoY/NRR/EBITDA/SG&A/PQ.
   - impacto.items = company_impact_metrics agrupado por indicador (todas 'output'),
     serie ordenada por periodo (length 1 ⇒ snapshot).
   - foco/founders = columnas de companies.
   Implementar con Drizzle en queries.ts; este módulo solo tipa + deriva. */
```

### `src/components/equipo/metrics/CompanyMetrics.tsx`
```tsx
"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CompanyMetricsData } from "@/lib/metrics";
import { dirOf, pctQoQ, moneyK } from "@/lib/metrics";
import { MetricTile } from "./MetricTile";
import { SnapshotStrip } from "./SnapshotStrip";
import { CashRunwayChart } from "./CashRunwayChart";
import { GrossMarginChart } from "./GrossMarginChart";
import { ImpactCard } from "./ImpactCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FOCO_LABEL = { social: "Social", ambiental: "Ambiental", ambos: "Ambos" } as const;

export function CompanyMetrics({ data, name }: { data: CompanyMetricsData; name: string }) {
  const [lens, setLens] = useState<"neg" | "imp">("neg");
  const { negocio: n, impacto: imp } = data;
  const gmDelta = n.grossMargin.at(-1)! - n.grossMargin[0];
  const hcDelta = n.headcount.at(-1)! - n.headcount.at(-2)!;
  const cashDir = dirOf(n.cash.at(-1)!, n.cash.at(-2)!);
  const runway = n.runway.at(-1)!;
  const shown = imp.items.slice(0, 4);
  const extra = imp.items.length - shown.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          {lens === "neg" ? "Cómo respira el negocio" : "A quién cambia la vida"}
        </p>
        <Tabs value={lens} onValueChange={(v) => setLens(v as "neg" | "imp")} className="ml-auto">
          <TabsList>
            <TabsTrigger value="neg">Negocio</TabsTrigger>
            <TabsTrigger value="imp">Impacto</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {lens === "neg" ? (
        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <MetricTile label="Cash on hand" value={moneyK(n.cash.at(-1)!)}
              delta={`${Math.abs(pctQoQ(n.cash.at(-1)!, n.cash.at(-2)!))}% QoQ`} dir={cashDir}
              sub={cashDir === "down" ? "consumiendo caja" : "caja en alza"} series={n.cash}
              tip={`Cash on hand · caja en USD · serie ${n.lab[0]}→${n.lab.at(-1)}`} />
            <MetricTile label="Runway" value={`${runway}`} unit=" meses"
              sub={runway < 6 ? "⚠ zona crítica" : "zona alerta < 6m"} series={n.runway}
              tip={`Runway · meses de pista al burn actual ($${n.burnK}K/mes)`} />
            <MetricTile label="Gross margin" value={`${n.grossMargin.at(-1)}`} unit="%"
              delta={`${gmDelta >= 0 ? "+" : ""}${gmDelta} pp / 4Q`} dir={gmDelta >= 0 ? "up" : "down"}
              vlink={n.variants ? `${n.variants.length} variantes ↓` : undefined} series={n.grossMargin}
              tip="Gross margin · margen bruto %" />
            <MetricTile label="Headcount (FTE)" value={`${n.headcount.at(-1)}`}
              delta={`${hcDelta >= 0 ? "+" : ""}${hcDelta} QoQ`} dir={hcDelta >= 0 ? "up" : "down"}
              sub={`de ${n.headcount[0]} hace 1 año`} series={n.headcount}
              tip="Headcount · equipo a tiempo completo" />
          </div>

          <SnapshotStrip s={n.snapshot} />

          <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.3fr_1fr]">
            <CashRunwayChart n={n} />
            <GrossMarginChart n={n} />
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3.5 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Impacto propio de {name}.</span>{" "}
            No hay indicadores compartidos — cada empresa reporta los suyos (categoría{" "}
            <span className="font-mono text-foreground">output</span>).
            <div className="mt-2.5 flex gap-5">
              <span className="flex flex-col gap-0.5">
                <span className="text-[9.5px] uppercase tracking-wide text-muted-foreground">Foco</span>
                <Badge variant="secondary" className="gap-1.5">
                  <span className="size-2 rounded-full bg-coh-2" />{FOCO_LABEL[imp.foco]}
                </Badge>
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[9.5px] uppercase tracking-wide text-muted-foreground">Founders ♀</span>
                <span className="font-mono text-sm font-semibold">{imp.founders}%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {shown.map((it, i) => <ImpactCard key={i} it={it} />)}
          </div>

          {extra > 0 && (
            <details className="rounded-lg border border-dashed border-border bg-muted/40 p-3 text-sm text-muted-foreground">
              <summary className="cursor-pointer list-none">
                <span className="font-semibold text-foreground">{extra} indicador{extra > 1 ? "es" : ""} más</span>{" "}
                reportado{extra > 1 ? "s" : ""} por {name} este corte.
              </summary>
              <p className="mt-2">{imp.items.slice(4).map((x) => x.name).join(" · ")}</p>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
```

### `src/components/equipo/metrics/Sparkline.tsx`
```tsx
export function Sparkline({ arr, className = "text-semaforo-verde",
  w = 60, h = 22 }: { arr: (number | null)[]; className?: string; w?: number; h?: number }) {
  const present = arr.filter((v): v is number => v != null);
  if (present.length < 2) return null;
  const p = 3, mx = Math.max(...present), mn = Math.min(...present);
  const X = (i: number) => p + (i * (w - 2 * p)) / (arr.length - 1);
  const Y = (v: number) => h - p - ((v - mn) / ((mx - mn) || 1)) * (h - 2 * p);
  const segs: string[][] = []; let cur: string[] = [];
  arr.forEach((v, i) => { if (v == null) { if (cur.length) segs.push(cur); cur = []; } else cur.push(`${X(i)},${Y(v)}`); });
  if (cur.length) segs.push(cur);
  const li = arr.length - 1;
  return (
    <svg width={w} height={h} className={className} aria-hidden>
      {segs.map((s, k) => (
        <polyline key={k} points={s.join(" ")} fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {arr[li] != null && <circle cx={X(li)} cy={Y(arr[li]!)} r="2" fill="currentColor" />}
      {arr.map((v, i) => v == null ? (
        <circle key={`h${i}`} cx={X(i)} cy={h / 2} r="2.4"
          className="fill-card stroke-muted-foreground/50" strokeWidth="1.3" />
      ) : null)}
    </svg>
  );
}
```

### `src/components/equipo/metrics/MetricTile.tsx`
```tsx
import { Card } from "@/components/ui/card";
import { Sparkline } from "./Sparkline";

const ARROW = { up: "▲", down: "▼", flat: "=" } as const;
const DCLS = { up: "text-semaforo-verde-fg", down: "text-semaforo-rojo-fg", flat: "text-muted-foreground" } as const;

export function MetricTile({ label, value, unit, delta, dir = "flat", sub, vlink, series, tip }: {
  label: string; value: string; unit?: string; delta?: string;
  dir?: "up" | "down" | "flat"; sub?: string; vlink?: string; series?: (number | null)[]; tip?: string;
}) {
  return (
    <Card className="relative overflow-hidden p-3.5">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {tip && <span title={tip} aria-label={tip}
          className="grid size-3.5 cursor-help place-items-center rounded-full border border-muted-foreground/40 font-mono text-[9px]">i</span>}
      </div>
      <div className="mt-2 font-mono text-2xl font-semibold leading-none tabular-nums tracking-tight">
        {value}{unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
      </div>
      {delta && <div className={`mt-2 font-mono text-[11.5px] font-medium ${DCLS[dir]}`}>{ARROW[dir]} {delta}</div>}
      {vlink && <div className="mt-1.5 text-[10.5px] font-medium text-coh-1">{vlink}</div>}
      {sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>}
      {series && <div className="absolute bottom-3 right-3 opacity-90"><Sparkline arr={series} /></div>}
    </Card>
  );
}
```

### `src/components/equipo/metrics/SnapshotStrip.tsx`
```tsx
import { Card } from "@/components/ui/card";
import type { BusinessMetrics } from "@/lib/metrics";

export function SnapshotStrip({ s }: { s: BusinessMetrics["snapshot"] }) {
  const cell = (k: string, v: string, cls = "") => (
    <div className="bg-card p-2.5">
      <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className={`mt-0.5 font-mono text-lg font-semibold tabular-nums ${cls}`}>{v}</div>
    </div>
  );
  return (
    <Card className="p-4">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-[11px] font-semibold">Snapshot</span>
        <span className="rounded border border-border bg-muted px-1.5 font-mono text-[9.5px] text-muted-foreground">Q1 '26</span>
        <span className="ml-auto text-[10.5px] text-muted-foreground">corte puntual · sin serie</span>
      </div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border md:grid-cols-5">
        {cell("Crec. ventas YoY", `+${s.yoy}%`, "text-semaforo-verde-fg")}
        {cell("Retención (NRR)", `${s.nrr}%`)}
        {cell("EBITDA", `${s.ebitda}%`, s.ebitda < 0 ? "text-semaforo-rojo-fg" : "text-semaforo-verde-fg")}
        {cell("SG&A / Ingresos", `${s.sga}%`)}
        {cell("Score PQ", `${s.pq}`)}
      </div>
    </Card>
  );
}
```

### `src/components/equipo/metrics/CashRunwayChart.tsx`
```tsx
import { Card } from "@/components/ui/card";
import type { BusinessMetrics } from "@/lib/metrics";
import { dirOf } from "@/lib/metrics";

export function CashRunwayChart({ n }: { n: BusinessMetrics }) {
  const { cash, runway, lab } = n;
  const W = 520, H = 178, B = 26, T = 20, gap = 12, mx = Math.max(...cash);
  const bw = (W - (lab.length - 1) * gap) / lab.length;
  const rmx = Math.max(...runway);
  const xs = (i: number) => i * (bw + gap) + bw / 2;
  const yr = (v: number) => T + ((rmx - v) / rmx) * (H - B - T) * 0.62 + (H - B - T) * 0.14;
  const barCls = { up: "fill-semaforo-verde", down: "fill-semaforo-rojo", flat: "fill-muted-foreground/40" } as const;
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12.5px] font-semibold">Caja y runway</span>
        <span className="font-mono text-[10.5px] text-muted-foreground">USD · Q-a-Q</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="block h-auto w-full">
        <line x1="0" y1={H - B} x2={W} y2={H - B} className="stroke-border" strokeWidth="1" />
        {cash.map((v, i) => {
          const d = dirOf(v, i ? cash[i - 1] : v);
          const hh = Math.max(3, (H - B - T) * (v / mx)), x = i * (bw + gap), y = H - B - hh;
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={hh} rx="4" className={barCls[d]} fillOpacity={0.82}>
                <title>{`${lab[i]} · $${v}K`}</title>
              </rect>
              <text x={x + bw / 2} y={y - 6} textAnchor="middle" className="fill-muted-foreground font-mono text-[8.5px]">${v}K</text>
              <text x={x + bw / 2} y={H - 9} textAnchor="middle" className="fill-muted-foreground font-mono text-[8.5px]">{lab[i].replace(" ", "")}</text>
            </g>
          );
        })}
        <polyline points={runway.map((v, i) => `${xs(i)},${yr(v)}`).join(" ")} fill="none"
          className="stroke-muted-foreground" strokeWidth="1.8" strokeDasharray="5 3" strokeLinecap="round" />
        {runway.map((v, i) => (
          <g key={`r${i}`}>
            <circle cx={xs(i)} cy={yr(v)} r="2.6" className="fill-card stroke-muted-foreground" strokeWidth="1.4"><title>{`${lab[i]} · ${v} meses`}</title></circle>
            <text x={xs(i)} y={yr(v) - 6} textAnchor="middle" className="fill-muted-foreground/70 font-mono text-[8.5px]">{v}m</text>
          </g>
        ))}
      </svg>
      <div className="mt-2.5 flex flex-wrap gap-4 text-[10.5px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-semaforo-verde" />Cash on hand</span>
        <span className="flex items-center gap-1.5"><span className="h-0 w-4 border-t-2 border-dashed border-muted-foreground" />Runway (meses)</span>
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
        Runway en <b className="text-foreground">{runway.at(-1)} meses</b> al ritmo de quema actual (${n.burnK}K/mes).
        Barras coloreadas por dirección vs. el trimestre previo.
      </p>
    </Card>
  );
}
```

### `src/components/equipo/metrics/GrossMarginChart.tsx`
```tsx
import { Card } from "@/components/ui/card";
import type { BusinessMetrics } from "@/lib/metrics";

export function GrossMarginChart({ n }: { n: BusinessMetrics }) {
  const { grossMargin: gm, variants, lab } = n;
  const W = 360, H = 150, pT = 14, pB = 24;
  const all = [...gm, ...(variants?.map((v) => v.v) ?? [])];
  const lo = Math.max(10, Math.min(...all) - 6), hi = Math.min(90, Math.max(...all) + 6);
  const xs = (i: number) => 6 + (i * (W - 12)) / (lab.length - 1);
  const y = (v: number) => pT + ((hi - v) / (hi - lo)) * (H - pT - pB);
  const grid = [...new Set([Math.round(lo / 10) * 10 + 10, Math.round((lo + hi) / 20) * 10, Math.round(hi / 10) * 10])].filter((g) => g > lo && g < hi);
  return (
    <Card className="p-4" id="gm-card">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12.5px] font-semibold">Gross margin</span>
        <span className="font-mono text-[10.5px] text-muted-foreground">% · {variants ? "por variante" : "consolidado"}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="block h-auto w-full">
        <line x1="0" y1={H - pB} x2={W} y2={H - pB} className="stroke-border" strokeWidth="1" />
        {grid.map((g) => (
          <g key={g}>
            <line x1="0" y1={y(g)} x2={W} y2={y(g)} className="stroke-border" strokeDasharray="2 3" strokeWidth="1" />
            <text x="2" y={y(g) - 2} className="fill-muted-foreground/60 font-mono text-[8.5px]">{g}%</text>
          </g>
        ))}
        {variants?.map((vr, k) => (
          <line key={k} x1="0" y1={y(vr.v)} x2={W} y2={y(vr.v)} strokeWidth="1.3" strokeDasharray="4 3"
            className={k === 0 ? "stroke-coh-2" : "stroke-semaforo-amarillo"} opacity={0.75} />
        ))}
        <polyline points={gm.map((v, i) => `${xs(i)},${y(v)}`).join(" ")} fill="none"
          className="stroke-semaforo-verde" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {gm.map((v, i) => <circle key={i} cx={xs(i)} cy={y(v)} r="2.4" className="fill-semaforo-verde" />)}
        <text x={xs(gm.length - 1)} y={y(gm.at(-1)!) - 7} textAnchor="end" className="fill-semaforo-verde-fg font-mono text-[8.5px]">{gm.at(-1)}%</text>
        {lab.map((q, i) => <text key={i} x={xs(i)} y={H - 8} textAnchor="middle" className="fill-muted-foreground font-mono text-[8.5px]">{q.replace(" ", "")}</text>)}
      </svg>
      {variants && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip nm="Consolidado" v={gm.at(-1)!} />
          {variants.map((v, i) => <Chip key={i} nm={v.name} v={v.v} />)}
        </div>
      )}
      <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
        {variants ? <>Las variantes por línea de producto se agrupan bajo el margen <b className="text-foreground">consolidado</b>.</>
                  : <>Margen bruto <b className="text-foreground">{gm[0]}% → {gm.at(-1)}%</b> en 5 trimestres.</>}
      </p>
    </Card>
  );
}
function Chip({ nm, v }: { nm: string; v: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1 text-[11px]">
      <span className="text-muted-foreground">{nm}</span><span className="font-mono font-semibold">{v}%</span>
    </span>
  );
}
```

### `src/components/equipo/metrics/ImpactCard.tsx`
```tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "./Sparkline";
import type { ImpactIndicator } from "@/lib/metrics";
import { dirOf, kfmt } from "@/lib/metrics";

const ARROW = { up: "▲", down: "▼", flat: "=" } as const;
const DCLS = { up: "text-semaforo-verde-fg", down: "text-semaforo-rojo-fg", flat: "text-muted-foreground" } as const;

export function ImpactCard({ it }: { it: ImpactIndicator }) {
  const last = it.serie.at(-1)!, snap = it.serie.length < 2;
  const d = dirOf(last, snap ? last : it.serie.at(-2)!);
  return (
    <Card className="relative overflow-hidden p-4">
      <div className="flex items-center gap-1.5 text-[11.5px] font-semibold">
        <Badge variant="outline" className="px-1.5 py-0 text-[8.5px] uppercase tracking-wide">output</Badge>{it.name}
      </div>
      <div className="mt-2 font-mono text-2xl font-semibold leading-none tabular-nums tracking-tight">
        {kfmt(last)}<span className="text-sm font-medium text-muted-foreground">{it.unit}</span>
      </div>
      {snap
        ? <div className="mt-1.5 font-mono text-[9.5px] text-muted-foreground/70">◷ 1 punto · sin serie</div>
        : <div className={`mt-1.5 font-mono text-[11px] font-medium ${DCLS[d]}`}>{ARROW[d]} +{Math.round((last / it.serie.at(-2)! - 1) * 100)}% QoQ</div>}
      {!snap && <div className="absolute right-3.5 top-4"><Sparkline arr={it.serie} className="text-coh-1" w={56} h={20} /></div>}
    </Card>
  );
}
```

### `src/app/equipo/mapas/[id]/page.tsx` (extracto: dónde se monta)
```tsx
import { getCompanyMetrics } from "@/lib/queries";
import { CompanyMetrics } from "@/components/equipo/metrics/CompanyMetrics";
import { MetricsSkeleton } from "@/components/equipo/metrics/MetricsSkeleton";
import { Suspense } from "react";

export default async function FichaPage({ params }: { params: { id: string } }) {
  const company = await getCompany(params.id);
  if (!company) notFound();
  // …cabecera diagnóstica + canvas BMC + insights… (sin cambios)
  return (
    <section data-screen-label={`Ficha · ${company.nombre}`}>
      {/* …secciones existentes… */}
      <h2 className="…">Métricas · desempeño de la empresa</h2>
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsLoader id={params.id} name={company.nombre} />
      </Suspense>
    </section>
  );
}

async function MetricsLoader({ id, name }: { id: string; name: string }) {
  const data = await getCompanyMetrics(id);            // ← contrato §3
  if (!data) return <EmptyMetrics />;
  return <CompanyMetrics data={data} name={name} />;
}
```

---

## 3. Contrato de datos (por componente)

| Componente | Props (TS) | Fuente (schema.ts) | Derivados (fórmula) |
|---|---|---|---|
| `CompanyMetrics` | `{ data: CompanyMetricsData; name: string }` | `getCompanyMetrics(id)` | — |
| `MetricTile` (Cash) | `value,delta,dir,series` | `company_business_metrics` WHERE `indicador='Cash on hand'` ORDER BY `periodo` | `dir=dirOf(cash[-1],cash[-2])`, `delta=pctQoQ(...)` |
| `MetricTile` (Runway) | idem | `indicador='Runway'` | tile sin delta; alerta si `<6` |
| `MetricTile` (Gross margin) | idem + `vlink` | `indicador='Gross margin'` (+ `LIKE 'Gross margin (%)'` para variantes) | `gmDelta=gm[-1]-gm[0]` |
| `MetricTile` (Headcount) | idem | `indicador='Headcount (FTE)'` | `hcDelta=hc[-1]-hc[-2]` |
| `SnapshotStrip` | `s: snapshot` | `company_business_metrics` WHERE `periodo='Q1 2026'` AND `indicador IN (YoY, NRR, EBITDA, SG&A/Ingresos, Score PQ)` | — (1 punto, no serie) |
| `CashRunwayChart` | `n: BusinessMetrics` | cash + runway series | barra coloreada por `dirOf` vs. trimestre previo |
| `GrossMarginChart` | `n` | gm series + variantes | escala auto `lo/hi` |
| `ImpactCard` | `it: ImpactIndicator` | `company_impact_metrics` por `indicador`, `categoria='output'`, ORDER BY `periodo` | `serie.length<2 ⇒ snapshot` |
| empresa-level | `foco, founders` | `companies.foco_impacto`, `companies.pct_founders_mujeres` | label map |

> ⚠️ **Confirmar nombres exactos de columnas contra `schema.ts`** (usé los de tu SQL del checklist de datos: `indicador`, `periodo`, `valor`, `bloque`, `categoria`). Si difieren, ajustar solo `getCompanyMetrics`.

---

## 4. Estados explícitos

```tsx
// Loading — MetricsSkeleton.tsx
export function MetricsSkeleton() {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[110px] animate-pulse rounded-lg border border-border bg-muted/50" />
        ))}
      </div>
      <div className="h-20 animate-pulse rounded-lg border border-border bg-muted/50" />
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.3fr_1fr]">
        <div className="h-64 animate-pulse rounded-lg border border-border bg-muted/50" />
        <div className="h-64 animate-pulse rounded-lg border border-border bg-muted/50" />
      </div>
    </div>
  );
}

// Empty — empresa sin métricas de negocio cargadas (ej. entrada muy reciente)
function EmptyMetrics() {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
      Sin métricas de negocio cargadas para esta empresa en el corte actual.
    </div>
  );
}

// Partial — campo sin dato (ej. Brío sin valuación; o un Q sin reporte)
// → la serie trae `null` en ese trimestre: el Sparkline dibuja un punto HUECO y NO extrapola;
//   las barras saltan ese índice. Un indicador de impacto con serie.length===1 se marca "◷ 1 punto · sin serie".
// → si falta TODO un indicador de negocio, no se renderiza su tile (no se inventa 0).

// Error (DB caída) — error.tsx del segmento captura el throw del RSC:
"use client";
export default function MetricsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-lg border border-semaforo-rojo/40 bg-semaforo-rojo-soft p-4 text-sm text-semaforo-rojo-fg">
      No se pudieron cargar las métricas. <button onClick={reset} className="underline">Reintentar</button>
    </div>
  );
}
```

---

## 5. Interacciones

- **Tabs Negocio/Impacto** (`CompanyMetrics`, único Client) → `useState` local cambia la lente. Es estado efímero de UI, **no** va al URL (a diferencia de filtros de Portafolio, que sí deben ir a search params).
- **Tile “Gross margin → N variantes ↓”** → ancla suave a `#gm-card` (la card de gross margin trae `id="gm-card"`). Sin panel nuevo.
- **“Ver todos (N)”** (impacto) → `<details>` nativo expande los nombres de indicadores restantes. Sin JS, accesible por teclado.
- **Tooltips** → `title=`/`aria-label=` en el chip `i` de cada tile y `<title>` SVG en barras/puntos (hover + screen-reader). Si querés rich tooltips, cambiar por `@/components/ui/tooltip` (shadcn) — ver flag.
- **Hover** en barras/puntos → solo `<title>`; sin estado.

---

## 6. Light/Dark + Responsive

- **Light/Dark**: 100% tokens semánticos (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`) + los nuevos `semaforo-*` / `coh-*` (sección 0), todos vía `hsl(var(--…))`. **Cero hex hardcodeado.** El dark se resuelve solo con la clase `.dark` (next-themes). Verificado en el kit fuente en ambos modos.
- Screenshots adjuntos en el proyecto de diseño: `screenshots/02-kit-ruta.png` (dark · Negocio), `screenshots/02-kit-light.png` (light · Negocio), `screenshots/02-kit-ruta.png` (dark · Impacto). *(En el repo: regenerar tras portear.)*
- **Responsive**:
  - Tiles: `grid-cols-2 md:grid-cols-4`.
  - Snapshot: `grid-cols-2 md:grid-cols-5`.
  - Tendencias: `grid-cols-1 lg:grid-cols-[1.3fr_1fr]`.
  - Impacto: `grid-cols-1 md:grid-cols-2`.
  - Charts SVG con `viewBox` → escalan fluido a cualquier ancho. **Desktop 1280+ y tablet 768–1280 cubiertos; móvil funciona (1 col).**

---

## 7. Data de ejemplo usada (para diff contra tu DB)

> **Sintética y determinista** (semilla por `company_id`) — placeholder hasta cablear la DB. Ejemplo de **Ruta**:

```jsonc
{
  "negocio": {
    "lab": ["Q1 '25","Q2 '25","Q3 '25","Q4 '25","Q1 '26"],
    "cash":        [250, 225, 225, 300, 225],   // $K
    "runway":      [9, 10, 9, 12, 9],            // meses (burn ≈ $25K/mes)
    "grossMargin": [48, 51, 54, 56, 58],         // %
    "headcount":   [8, 9, 10, 10, 11],           // FTE
    "burnK": 25,
    "snapshot": { "yoy": 173, "nrr": 119, "ebitda": 6, "sga": 48, "pq": 9.2 },
    "variants": [ { "name": "línea principal", "v": 62 }, { "name": "línea secundaria", "v": 53 } ]
  },
  "impacto": {
    "foco": "social", "founders": 60,
    "items": [
      { "name": "Personas con acceso", "unit": " pers.", "serie": [4200, 4500, 4700, 4900, 5000] },
      { "name": "Empleos creados",     "unit": "",        "serie": [24, 28, 33, 37, 43] },
      { "name": "Comunidades atendidas","unit": "",       "serie": [7] },            // snapshot
      { "name": "% primer acceso formal","unit": " %",    "serie": [37] },           // snapshot
      { "name": "Trayectos asistidos", "unit": "",        "serie": [61000] }         // → "Ver todos (5)"
    ]
  }
}
```

Indicadores de negocio fijos (universales): **Cash on hand · Runway · Gross margin · Headcount (FTE)**.
Q1'26-only (snapshot, no tiles): **Crec. ventas YoY · Retención (NRR) · EBITDA · SG&A/Ingresos · Score PQ**.

---

## 8. Flags abiertos (para el líder del caso)

1. **Tooltips**: hoy `title`/`<title>` nativo (cero deps, a11y ok) vs. `@/components/ui/tooltip` de shadcn (más lindo, Client + Radix). Elegí.
2. **Tabs**: usé `@/components/ui/tabs` como segmented control. Si querés que la lente persista en el URL (`?lens=imp`) en vez de `useState`, lo cambio a search param — coherente con la regla de filtros de Portafolio.
3. **Charts**: SVG a mano (sin dep, escalan con `viewBox`, theme vía `fill-*`/`stroke-*`). Si preferís **Recharts/visx**, los charts se reescriben pero el contrato de datos (§3) no cambia.
4. **Derivación de Runway/Margen/Burn**: si tu hoja Negocio **no** trae `Runway`/`Gross margin`/`Cash on hand` como filas propias, hay que derivarlos (runway = caja ÷ burn; margen = (ventas − COGS) ÷ ventas) — necesita COGS + caja. Confirmá qué indicadores existen *realmente* (lo dejaste casi cerrado en el checklist de datos) y ajusto `getCompanyMetrics`.
5. **Nombres de columnas**: confirmar `indicador/periodo/valor/bloque/categoria` contra `schema.ts` (§3).
6. **Empresas sin mapa** (Brío/Hogar/Sostén): la ficha muestra header + métricas, sin BMC. La sección Métricas funciona igual (es independiente del mapa). Confirmá que ese comportamiento se mantiene en el port.
