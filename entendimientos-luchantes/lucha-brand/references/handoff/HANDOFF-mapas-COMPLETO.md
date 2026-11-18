# Handoff — Mapas Luchantes (superficie completa) · `/equipo/mapas`

> **Cómo usar este paquete.** Dos piezas:
> 1. **Este doc** = mapa de toda la superficie en el formato que pediste (árbol, contrato de datos, estados, interacciones, tokens, flags), marcando **🆕 nuevo (lo hicimos nosotros)** vs **♻️ pre-existente del kit**.
> 2. **`HANDOFF-mapas-metricas.md`** = el `.tsx` completo, Tailwind-only, de la sección **nueva** que construimos (Métricas negocio+impacto).
> 3. **Código fuente real** = la carpeta `ui_kits/mapas/` (+ deps `ui_kits/portafolio/`, `tokens/`, `styles.css`) va en el zip adjunto. Es React funcionando; léelo como spec de comportamiento pixel-exacto y portalo a Tailwind-only TSX.
>
> El kit fuente usa CSS custom (`.mp-*` + vars `--p-*`/`--semaforo-*`), **no** Tailwind. El port a Tailwind-only es trabajo de Claude Code; este doc + el código fuente le dan todo para no re-decidir nada de diseño/datos.

---

## 0. Pre-requisito de tokens (compartido con todas las superficies)

Ver §0 de `HANDOFF-mapas-metricas.md` — agrega `semaforo-*`, `brand-*`, `coh-*` a `globals.css` + `tailwind.config.ts`. **Además** la superficie usa estos que probablemente ya tengas como shadcn (`background`, `card`, `border`, `muted`, `foreground`) — confirmá el mapeo:

| token del kit | → token shadcn | nota |
|---|---|---|
| `--p-canvas` (papel cálido) | `--background` (solo dentro de `/equipo`) o un `--canvas` propio | superficie "cabina"; ver flag 1 |
| `--p-card` / `--p-card-2` | `--card` / `--muted` | |
| `--p-ink` / `--p-muted` / `--p-subtle` / `--p-faint` | `--foreground` / `--muted-foreground` / +2 escalones | el kit tiene 4 niveles de texto; mapear a 2-3 de shadcn + opacidades |
| `--p-mint` | `--brand-mint` | acento; regla ink→mint en dark = `bg-foreground text-background` |
| `--p-num` | `font-mono` (JetBrains Mono) | números tabulares |
| `--semaforo-*` (+`-text`/`-soft`) | `semaforo-*` (+`-fg`/`-soft`) | §0 métricas |
| `--p-coh-1/2/3` | `coh-1/2/3` | cohortes |

---

## 1. Árbol de archivos (superficie completa)

```
src/app/equipo/mapas/
  page.tsx                         (RSC) dashboard índice — carga portfolio + scores
  [id]/page.tsx                    (RSC) ficha de empresa — carga company + map + métricas
  error.tsx / loading.tsx          estados de segmento

src/lib/
  mapas.ts          🆕  tipos del Mapa (7 dims, sub-indicadores, semáforo) + getMapasIndex()/getCompanyMap()
  metrics.ts        🆕  tipos + derivadores de métricas (ver HANDOFF-mapas-metricas.md §2)
  semaforo.ts       🆕  semOf(score) + SEM_TOKEN (clases tailwind por estado)

src/components/equipo/mapas/
  # — DASHBOARD —
  HealthKpis.tsx              ♻️  5 KPIs de salud (RSC)
  DecisionMatrix.tsx          🆕* scatter Impacto/Momentum × Salud (Client: toggle eje)
  GeoPanel.tsx                ♻️  mapa LatAm (Client: fetch world-atlas + d3-geo)
  LiveFeed.tsx                ♻️  Kanban por empresa (Client: agregar tarjetas) — placeholder Notion
  Heatmap.tsx                 🆕* tabla 7 dims, sortable (Client: sort state)
  CohortFilter.tsx            ♻️  segmented Todos/C1/C2/C3 (Client; → search param, ver §5)
  FloatTip.tsx                ♻️  tooltip flotante global (Client)
  # — FICHA —
  DiagHeader.tsx              ♻️  cabecera diagnóstica + score + modo sugerido (RSC)
  BmcCanvas.tsx               ♻️  canvas tipo BMC, 7 bloques + sub-indicadores (RSC)
  InsightsBlock.tsx           ♻️  insights / banderas / focos / riesgos / transacciones (Client: editable)
  MetodoLucha.tsx             ♻️  status por pilar, click para ciclar (Client)
  metrics/*                   🆕  TODA la sección de métricas — código en HANDOFF-mapas-metricas.md
```

> 🆕 = construido por nosotros esta iteración · 🆕* = lógica del kit pero **es la parte nueva conceptual** (segunda lente sobre las mismas empresas) · ♻️ = estructura pre-existente del kit, se porta tal cual.
>
> **Lo verdaderamente nuevo de esta sesión = `metrics/*`** (negocio+impacto, reemplaza el viejo "métricas de posición"). El resto del kit ya existía; se incluye para que el port sea de la superficie completa.

---

## 2. Inventario de secciones (qué es cada una · archivo fuente)

| # | Sección | Estado | Fuente kit | Qué hace |
|---|---|---|---|---|
| Dash-KPIs | Salud del portafolio | ♻️ | `mapa-dashboard.jsx › HealthKpis` | 5 tiles: #empresas, con-mapa, score prom, V·A·R, valor |
| Dash-01a | Matriz de decisión | 🆕* | `› DecisionMatrix` | scatter Salud×Impacto (o Momentum); burbuja=empresa, tamaño=exposición; 4 cuadrantes de acción |
| Dash-01b | Mapa LatAm | ♻️ | `› GeoPanel` | pins geo reales (lat/lng) por empresa; tamaño=exposición |
| Dash-02 | Live feed | ♻️ | `› LiveFeed` | Kanban por empresa, banner "No conectado aún", agregar tarjeta manual |
| Dash-03 | Heatmap 7 dims | 🆕* | `› Heatmap` | tabla sortable empresa×dimensión + fila promedio |
| Ficha-a | Cabecera diagnóstica | ♻️ | `mapa-ficha.jsx › MapaFicha` | nombre, score, semáforo, modo sugerido, diag |
| Ficha-b | Canvas BMC | ♻️ | `› Block` | 7 bloques (Propósito centro) + sub-indicadores con raw+score |
| Ficha-c | Insights/Banderas/Focos/Riesgos/Transacciones | ♻️ | `› MapaFicha` | bloques cualitativos **editables** (localStorage en el kit) |
| Ficha-d | Método LUCHA | ♻️ | `› MapaFicha` | 7 pilares, click cicla estado |
| **Ficha-e** | **Métricas · negocio + impacto** | **🆕** | `mapa-metrics.jsx` | **lo nuevo: 2 lentes, tiles+snapshot+charts+impacto dinámico** |

---

## 3. Contrato de datos (modelo → DB real)

El kit corre sobre **dos lentes de las MISMAS 15 empresas**: `PORT` (posición financiera) y `MAPA` (evaluación 360). En el repo eso son tablas Drizzle:

| Objeto del kit | Tabla(s) en `schema.ts` | Campos clave |
|---|---|---|
| `PORT.empresas[]` | `companies` | nombre, sector, vertical, etapa, cohorte, salud, semLegal, exit, valuacionEntradaUsd, moic, stake por capa, desembolsadoUsd, comprometidoUsd, docs, jurisdiccion, paisMercado |
| `e.series.val` / `.ganado` | `valuacion_por_periodo`, `stake_por_periodo` | valuación Q-a-Q, stake ganado/Q (con `fondo` para el scope) |
| `MAPA.maps[id].dims` (7 dims + subs) | `mapas_luchante`, `pillar_states` | 🟡 hoy esqueleto (`pillarId`, `estado` semáforo, `artifact` jsonb) — scores/subs **sintetizados** en el kit; al cablear, leer scores reales |
| `MAPA.maps[id].geo` | `companies.paisMercado` + **falta lat/lng** | 🟡 hoy `GEO{}` hardcode en `mapa-data.js`; agregar columnas lat/lng o tabla geo |
| `MAPA.feed` | — | 🟡 sin tabla; Kanban es placeholder (Notion en fase posterior) |
| **`m.negocio`** | **`company_business_metrics`** (bloque `real`) | **Cash on hand · Runway · Gross margin(+variantes) · Headcount · YoY/NRR/EBITDA/SG&A/PQ** — ver HANDOFF-métricas §3 |
| **`m.impacto`** | **`company_impact_metrics`** + `companies.foco_impacto`/`pct_founders_mujeres` | **indicadores output por empresa** — ver HANDOFF-métricas §3 |

**Derivados puros (fórmulas):**
- `semOf(score)` = `score≥70 ? verde : ≥55 ? amarillo : <55 ? rojo : gris`.
- `overall` = promedio ponderado de las 7 dims con **Propósito ×1.5**.
- `exposición$` (tamaño de burbuja/pin) = `scopePct(e,'sinCeibo') × valuacion` = `(fl+lucha)/100 × valuacionUsd`.
- `momentum` = Δ score del mapa QoQ.
- `quadrant(salud,impacto)` = doblar / sostener-c-Studio / revisar-tesis / triage según umbral 60.
- métricas negocio/impacto: ver HANDOFF-métricas §1 (`pctQoQ`, `dirOf`, `moneyK`, `kfmt`).

> **Síntesis vs real (importante):** en el kit, `mapa-data.js` **sintetiza determinísticamente** (semilla por `company_id`) scores del Mapa, geo, feed, **y las métricas de negocio/impacto**. Es placeholder hasta cablear la DB. Lo único 100% "real-ready" hoy: `companies` + `valuacion/stake_por_periodo`. Ver flags.

---

## 4. Estados explícitos

- **Loading**: skeletons por sección (tiles, charts, filas de heatmap). Métricas: `MetricsSkeleton` (HANDOFF-métricas §4).
- **Empty**:
  - Dashboard con filtro de cohort sin matches → panel "No hay empresas en C{n}".
  - Heatmap nunca vacío (siempre 15 filas); empresa sin mapa = celdas `·` (s/d).
- **Partial** (el caso central de esta superficie):
  - **Empresa sin Mapa** (Brío/Hogar/Sostén en el corte): la ficha muestra **solo cabecera + métricas** (sin BMC, insights, etc.). Comportamiento intencional del kit — mantener en el port.
  - Sub-indicador/score s/d → celda gris `·`, **no** 0.
  - Serie de métrica con `null` en un Q → sparkline con punto hueco, no extrapola.
  - Indicador de impacto de 1 punto → "◷ snapshot · sin serie".
- **Error** (DB caída): `error.tsx` del segmento + el de métricas (HANDOFF-métricas §4). Mapa LatAm: si falla el fetch de world-atlas → "Cargando mapa…" persistente (degradar a lista; ver flag 4).

---

## 5. Interacciones

| Disparador | Resultado | Estado |
|---|---|---|
| Click burbuja (matriz) / pin (mapa) / fila (heatmap) / columna Kanban | abre ficha de esa empresa | navegación `→ /equipo/mapas/[id]` (en el kit es hash `#id`) |
| Toggle eje matriz **Impacto/Momentum** | recalcula Y del scatter | `useState` local (efímero) |
| Filtro **Cohort** Todos/C1/C2/C3 | filtra matriz + mapa | **debe ir a search param** `?cohort=C1` (no `useState` aislado) — regla del proyecto |
| Click header de dimensión (heatmap) | ordena portafolio por esa dim | `useState` sort {k,dir}; opcional URL |
| Kanban **+ / Cancelar / Agregar** | compositor inline; agrega tarjeta manual | `useState` local (placeholder; sin persistencia DB aún) |
| Ficha: **+Agregar / ×** en insights/banderas/focos/riesgos/transacciones | edita bloque cualitativo | kit usa **localStorage**; en el repo → mutación a tabla o client-state (flag 2) |
| Método LUCHA: click pilar | cicla estado semáforo | kit localStorage |
| Métricas: **Tabs Negocio/Impacto**, "N variantes ↓", "Ver todos" | ver HANDOFF-métricas §5 | |
| Hover en cualquier `[data-tip]` | tooltip flotante (`FloatTip`) | en el port: `@/components/ui/tooltip` o `title` nativo (flag 3) |

---

## 6. Light/Dark + Responsive

- **Light/Dark**: el kit ya corre en ambos (vars `--p-*`/`--semaforo-*` con bloque dark). En el port: **todo token semántico**, cero hex. Regla de marca: superficies "ink-fill" (tab activo, logo, avatar, chips `01`) → en dark **voltean a mint con texto oscuro** = `bg-foreground text-background`. Verificado en el kit fuente.
- **Screenshots** (en el proyecto de diseño, regenerar tras portear):
  - Dashboard dark: `screenshots/01-kit-light.png` muestra ficha light; dashboard se ve en la 1ª captura de la sesión.
  - Ficha Negocio dark/light + Impacto: `screenshots/02-kit-ruta.png`, `screenshots/02-kit-light.png`.
- **Responsive**: el kit es **desktop-first (1280+)**. Matriz+mapa en grid 2-col que colapsa; heatmap scrollea horizontal; Kanban scrollea. Métricas: responsive completo (HANDOFF-métricas §6). Tablet 768–1280 funciona con colapsos; móvil no es objetivo de esta superficie (densidad de cabina) — **marcar desktop-only** salvo la sección de métricas.

---

## 7. Data de ejemplo usada

- **Negocio/Impacto (Ruta)**: ver HANDOFF-métricas §7 (JSON completo).
- **Empresas del portafolio** (15, con sector/cohorte/salud/valuación/stake): están en `ui_kits/portafolio/port-data.js › BASE` (zip adjunto) — pegalas tal cual para diff contra `companies`.
- **Geo** (lat/lng por empresa): `mapa-data.js › GEO`.
- **Scores del Mapa + feed**: sintetizados en `mapa-data.js` (semilla por id) — **no** hacer diff, son placeholder.
- Empresas sin mapa: `SIN_MAPA = {hogar, brio, sosten}`.

---

## 8. Flags abiertos (para el líder del caso)

1. **Canvas "papel cálido"**: ¿el `--background` global voltea a papel cálido en `/equipo`, o solo las cards? Yo dejé papel como superficie de cabina, fondo app sin tocar.
2. **Bloques cualitativos editables** (insights/banderas/focos/riesgos/transacciones/método): el kit persiste en **localStorage**. En el repo: ¿(a) client-state efímero, (b) nuevas tablas Drizzle para flags/eventos? No hay tablas hoy.
3. **Tooltips**: `FloatTip` global custom vs `@/components/ui/tooltip` shadcn. (Mismo flag que métricas.)
4. **Mapa LatAm**: depende de `world-atlas` (fetch CDN) + `d3-geo` + lat/lng por empresa (faltan columnas). ¿Agregamos lat/lng a `companies`, o tabla geo? ¿d3-geo client-side o pre-render?
5. **Scores del Mapa (7 dims + sub-indicadores)**: hoy `mapas_luchante`/`pillar_states` son esqueleto y el kit los sintetiza. ¿Seedeamos scores reales o la ficha lee `pillar_states.estado` y deja subs en "s/d"?
6. **Kanban / live feed**: sin tabla; placeholder. ¿Notion ahora o después?
7. **Métricas Runway/Margen/Burn**: derivar vs filas propias — ver HANDOFF-métricas flag 4.
8. **Matriz/Heatmap como SVG/tabla a mano** vs librería (Recharts/visx): el contrato de datos no cambia si migrás.

---

### Archivos que acompañan este handoff
- `HANDOFF-mapas-metricas.md` — `.tsx` completo de la sección nueva.
- **zip del código fuente** — `ui_kits/mapas/` + `ui_kits/portafolio/` (deps) + `tokens/` + `styles.css` + `fonts.css`. Es la spec de comportamiento pixel-exacto.
