/* LuchIA · Mapas — Ficha: métricas de DESEMPEÑO DE LA EMPRESA (negocio + impacto).
   Reemplaza el mini-dashboard de "nuestra posición". Dos lentes:
     · Negocio  → 4 tiles universales (Cash on hand · Runway · Gross margin ·
                  Headcount) + snapshot Q1'26 + tendencias.
     · Impacto  → indicadores propios de la empresa (output), render dinámico.
   Datos de m.negocio / m.impacto (sintetizados en mapa-data.js, espejo de
   company_business_metrics / company_impact_metrics). */
const { useState: useStateM } = React;

/* ---- formateo ---- */
function kfmt(v) { return v >= 1000 ? +(v / 1000).toFixed(v >= 10000 ? 0 : 1) + "K" : "" + v; }
function moneyK(v) { return v >= 1000 ? "$" + (v / 1000).toFixed(1) + "M" : "$" + v + "K"; }
function dirOf(a, b) { return a > b * 1.001 ? "up" : a < b * 0.999 ? "down" : "flat"; }
function arrow(d) { return d === "up" ? "▲" : d === "down" ? "▼" : "="; }
function dcls(d) { return d === "up" ? "mpm-up" : d === "down" ? "mpm-down" : "mpm-flat"; }

/* ---- sparkline con punto hueco para faltantes (null) ---- */
function Spark({ arr, color, w = 60, h = 22 }) {
  const present = arr.filter((v) => v != null);
  if (present.length < 2) return null;
  const p = 3, mx = Math.max(...present), mn = Math.min(...present);
  const X = (i) => p + i * (w - 2 * p) / (arr.length - 1);
  const Y = (v) => h - p - (v - mn) / ((mx - mn) || 1) * (h - 2 * p);
  const segs = []; let cur = [];
  arr.forEach((v, i) => { if (v == null) { if (cur.length) segs.push(cur); cur = []; } else cur.push(`${X(i)},${Y(v)}`); });
  if (cur.length) segs.push(cur);
  const li = arr.length - 1;
  return (
    <svg className="mpm-spark" width={w} height={h} aria-hidden="true">
      {segs.map((s, k) => <polyline key={k} points={s.join(" ")} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />)}
      {arr[li] != null && <circle cx={X(li)} cy={Y(arr[li])} r="2" fill={color} />}
      {arr.map((v, i) => v == null ? <circle key={"h" + i} cx={X(i)} cy={h / 2} r="2.4" fill="var(--p-card)" stroke="var(--p-faint)" strokeWidth="1.3" /> : null)}
    </svg>
  );
}

/* ---- tile destacado ---- */
function Tile({ label, value, unit, delta, dir, sub, vlink, onLink, series, tip }) {
  return (
    <div className="mpm-tile">
      <div className="mpm-tile-l">{label}{tip && <span className="mpm-info" data-tip={tip}>i</span>}</div>
      <div className="mpm-tile-v">{value}{unit && <small>{unit}</small>}</div>
      {delta && <div className={"mpm-tile-d " + dcls(dir)}>{arrow(dir)} {delta}</div>}
      {vlink && <div className="mpm-tile-link" onClick={onLink}>{vlink}</div>}
      {sub && <div className="mpm-tile-s">{sub}</div>}
      {series && <Spark arr={series} color="var(--semaforo-verde)" />}
    </div>
  );
}

/* ---- gráfico de caja (barras por dirección) + runway (línea) ---- */
function CashChart({ n }) {
  const { cash, runway, lab } = n;
  const W = 520, H = 178, B = 26, T = 20, gap = 12, mx = Math.max(...cash);
  const bw = (W - (lab.length - 1) * gap) / lab.length;
  const rmx = Math.max(...runway);
  const xs = (i) => i * (bw + gap) + bw / 2;
  const yr = (v) => T + (rmx - v) / rmx * (H - B - T) * 0.62 + (H - B - T) * 0.14;
  return (
    <svg className="mp-bars" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <line x1="0" y1={H - B} x2={W} y2={H - B} className="mpm-ax" />
      {cash.map((v, i) => {
        const prev = i ? cash[i - 1] : v;
        const d = dirOf(v, prev);
        const col = d === "up" ? "var(--semaforo-verde)" : d === "down" ? "var(--semaforo-rojo)" : "var(--p-faint)";
        const hh = Math.max(3, (H - B - T) * (v / mx)), x = i * (bw + gap), y = H - B - hh;
        return (
          <g key={i} data-tip={`${lab[i]}|Cash on hand $${v}K|${d === "up" ? "▲ sube" : d === "down" ? "▼ baja" : "= plano"} vs. trimestre previo`}>
            <rect x={x} y={y} width={bw} height={hh} rx="4" fill={col} fillOpacity="0.82" />
            <text x={x + bw / 2} y={y - 6} textAnchor="middle" className="mpm-bv">${v}K</text>
            <text x={x + bw / 2} y={H - 9} textAnchor="middle" className="mp-bar-q">{lab[i].replace(" ", "")}</text>
          </g>
        );
      })}
      <polyline points={runway.map((v, i) => `${xs(i)},${yr(v)}`).join(" ")} fill="none" stroke="var(--p-muted)" strokeWidth="1.8" strokeDasharray="5 3" strokeLinecap="round" />
      {runway.map((v, i) => (
        <g key={"r" + i} data-tip={`${lab[i]}|Runway ${v} meses`}>
          <circle cx={xs(i)} cy={yr(v)} r="2.6" fill="var(--p-card)" stroke="var(--p-muted)" strokeWidth="1.4" />
          <text x={xs(i)} y={yr(v) - 6} textAnchor="middle" className="mpm-ax-t">{v}m</text>
        </g>
      ))}
    </svg>
  );
}

/* ---- gráfico de gross margin: consolidado + variantes ---- */
function MarginChart({ n }) {
  const { grossMargin, variants, lab } = n;
  const W = 360, H = 150, pT = 14, pB = 24;
  const all = [...grossMargin, ...(variants ? variants.map((v) => v.v) : [])];
  const lo = Math.max(10, Math.min(...all) - 6), hi = Math.min(90, Math.max(...all) + 6);
  const xs = (i) => 6 + i * (W - 12) / (lab.length - 1);
  const y = (v) => pT + (hi - v) / (hi - lo) * (H - pT - pB);
  const grid = [Math.round(lo / 10) * 10 + 10, Math.round((lo + hi) / 20) * 10, Math.round(hi / 10) * 10 - 0];
  const last = grossMargin[grossMargin.length - 1];
  // líneas planas de variantes (último valor, referencia)
  return (
    <svg className="mp-bars" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <line x1="0" y1={H - pB} x2={W} y2={H - pB} className="mpm-ax" />
      {[...new Set(grid)].filter((g) => g > lo && g < hi).map((g) => (
        <g key={g}><line x1="0" y1={y(g)} x2={W} y2={y(g)} stroke="var(--p-hairline)" strokeDasharray="2 3" strokeWidth="1" /><text x="2" y={y(g) - 2} className="mpm-ax-t">{g}%</text></g>
      ))}
      {variants && variants.map((vr, k) => (
        <line key={k} x1="0" y1={y(vr.v)} x2={W} y2={y(vr.v)} stroke={k === 0 ? "var(--p-coh-2)" : "var(--semaforo-amarillo)"} strokeWidth="1.3" strokeDasharray="4 3" opacity="0.75" />
      ))}
      <polyline points={grossMargin.map((v, i) => `${xs(i)},${y(v)}`).join(" ")} fill="none" stroke="var(--semaforo-verde)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {grossMargin.map((v, i) => <circle key={i} cx={xs(i)} cy={y(v)} r="2.4" fill="var(--semaforo-verde)" />)}
      <text x={xs(grossMargin.length - 1)} y={y(last) - 7} textAnchor="end" className="mpm-bv" fill="var(--semaforo-verde-text)">{last}%</text>
      {lab.map((q, i) => <text key={i} x={xs(i)} y={H - 8} textAnchor="middle" className="mp-bar-q">{q.replace(" ", "")}</text>)}
    </svg>
  );
}

/* ---- tarjeta dinámica de impacto ---- */
function ImpactCard({ it }) {
  const serie = it.serie, last = serie[serie.length - 1], snap = serie.length < 2;
  const prev = snap ? last : serie[serie.length - 2];
  const d = dirOf(last, prev);
  return (
    <div className="mpm-icard">
      <div className="mpm-icard-l"><span className="mpm-tag">output</span>{it.name}</div>
      <div className="mpm-icard-v">{kfmt(last)}<small>{it.unit}</small></div>
      {snap
        ? <div className="mpm-icard-snap">◷ 1 punto · sin serie</div>
        : <div className={"mpm-icard-d " + dcls(d)}>{arrow(d)} +{Math.round((last / prev - 1) * 100)}% QoQ</div>}
      {!snap && <Spark arr={serie} color="var(--p-coh-1)" w={56} h={20} />}
    </div>
  );
}

/* ============================================================ */
function MapaMetrics({ e, m }) {
  const [lens, setLens] = useStateM("neg");
  const n = m.negocio, imp = m.impacto;
  if (!n) return null;

  // deltas de tiles
  const cashD = dirOf(n.cash[4], n.cash[3]);
  const gmDelta = n.grossMargin[4] - n.grossMargin[0];
  const hcD = n.headcount[4] - n.headcount[3];
  const runMonth = n.runway[4];
  const FOCO_LABEL = { social: "Social", ambiental: "Ambiental", ambos: "Ambos" };
  const shown = imp.items.slice(0, 4), extra = imp.items.length - shown.length;

  return (
    <div>
      {/* lens toggle */}
      <div className="mpm-lensbar">
        <span className="mpm-lens-cap">{lens === "neg" ? "Cómo respira el negocio" : "A quién cambia la vida"}</span>
        <div className="mpm-lens" role="tablist">
          <button data-active={lens === "neg"} onClick={() => setLens("neg")}>Negocio</button>
          <button data-active={lens === "imp"} onClick={() => setLens("imp")}>Impacto</button>
        </div>
      </div>

      {lens === "neg" ? (
        <div>
          <div className="mpm-tiles">
            <Tile label="Cash on hand" value={moneyK(n.cash[4])} delta={Math.abs(Math.round((n.cash[4] / n.cash[3] - 1) * 100)) + "% QoQ"} dir={cashD}
              sub={cashD === "down" ? "consumiendo caja" : "caja en alza"} series={n.cash} tip={`Cash on hand · caja en USD|serie ${n.lab[0]}→${n.lab[4]}`} />
            <Tile label="Runway" value={runMonth} unit=" meses" delta={null} dir="flat"
              sub={runMonth < 6 ? "⚠ zona crítica" : "zona alerta < 6m"} series={n.runway} tip={`Runway · meses de pista al burn actual ($${n.burn}K/mes)`} />
            <Tile label="Gross margin" value={n.grossMargin[4]} unit="%" delta={(gmDelta >= 0 ? "+" : "") + gmDelta + " pp / 4Q"} dir={gmDelta >= 0 ? "up" : "down"}
              vlink={n.variants ? n.variants.length + " variantes ↓" : null} onLink={() => document.getElementById("mpm-gm").scrollIntoView({ behavior: "smooth", block: "center" })}
              series={n.grossMargin} tip="Gross margin · margen bruto %" />
            <Tile label="Headcount (FTE)" value={n.headcount[4]} delta={(hcD >= 0 ? "+" : "") + hcD + " QoQ"} dir={hcD >= 0 ? "up" : "down"}
              sub={"de " + n.headcount[0] + " hace 1 año"} series={n.headcount} tip="Headcount · equipo a tiempo completo" />
          </div>

          {/* snapshot Q1'26 */}
          <div className="mpm-snap">
            <div className="mpm-snap-h"><span className="lbl">Snapshot</span><span className="q">Q1 '26</span><span className="hint">corte puntual · sin serie</span></div>
            <div className="mpm-snap-grid">
              <div className="mpm-snap-cell"><div className="k">Crec. ventas YoY</div><div className="vv mpm-up">+{n.snapshot.yoy}%</div></div>
              <div className="mpm-snap-cell"><div className="k">Retención (NRR)</div><div className="vv">{n.snapshot.nrr}%</div></div>
              <div className="mpm-snap-cell"><div className="k">EBITDA</div><div className={"vv " + (n.snapshot.ebitda < 0 ? "mpm-down" : "mpm-up")}>{n.snapshot.ebitda}%</div></div>
              <div className="mpm-snap-cell"><div className="k">SG&amp;A / Ingresos</div><div className="vv">{n.snapshot.sga}%</div></div>
              <div className="mpm-snap-cell"><div className="k">Score PQ</div><div className="vv">{n.snapshot.pq}</div></div>
            </div>
          </div>

          {/* tendencias */}
          <div className="mp-mgrid">
            <div className="mp-mcard">
              <div className="mp-mcard-h"><span className="mp-mcard-t">Caja y runway</span><span className="mpm-meta">USD · Q-a-Q</span></div>
              <CashChart n={n} />
              <div className="mpm-legend">
                <span><span className="d" style={{ background: "var(--semaforo-verde)" }} />Cash on hand</span>
                <span><span className="ln" />Runway (meses)</span>
              </div>
              <div className="mp-mcard-foot">Runway en <b>{runMonth} meses</b> al ritmo de quema actual (${n.burn}K/mes). Barras coloreadas por dirección vs. el trimestre previo.</div>
            </div>

            <div className="mp-mcard" id="mpm-gm">
              <div className="mp-mcard-h"><span className="mp-mcard-t">Gross margin</span><span className="mpm-meta">% · {n.variants ? "por variante" : "consolidado"}</span></div>
              <MarginChart n={n} />
              {n.variants && (
                <div className="mpm-var">
                  <span className="mpm-varchip"><span className="nm">Consolidado</span><span className="vv">{n.grossMargin[4]}%</span></span>
                  {n.variants.map((v, i) => <span className="mpm-varchip" key={i}><span className="nm">{v.name}</span><span className="vv">{v.v}%</span></span>)}
                </div>
              )}
              <div className="mp-mcard-foot">{n.variants ? <>Las variantes por línea de producto se agrupan bajo el margen <b>consolidado</b>.</> : <>Margen bruto <b>{n.grossMargin[0]}% → {n.grossMargin[4]}%</b> en 5 trimestres.</>}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mpm-impnote">
            <b>Impacto propio de {e.nombre}.</b> No hay indicadores compartidos en el portafolio — cada empresa reporta los suyos (categoría <span className="mono">output</span>).
            <div className="mpm-imp-emp">
              <span className="it"><span className="kk">Foco</span><span className="badge-foco"><span className="d" style={{ background: "var(--p-coh-2)" }} />{FOCO_LABEL[imp.foco]}</span></span>
              <span className="it"><span className="kk">Founders ♀</span><span className="vv">{imp.founders}%</span></span>
            </div>
          </div>

          <div className="mpm-igrid">
            {shown.map((it, i) => <ImpactCard it={it} key={i} />)}
          </div>

          {extra > 0 && (
            <div className="mpm-more">
              <span><b>{extra} indicador{extra > 1 ? "es" : ""} más</b> reportado{extra > 1 ? "s" : ""} por {e.nombre} este corte.</span>
              <button onClick={(ev) => { ev.currentTarget.closest(".mpm-more").querySelector("span").textContent = imp.items.slice(4).map((x) => x.name).join(" · "); }}>Ver todos ({imp.items.length})</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

window.MapaMetrics = MapaMetrics;
