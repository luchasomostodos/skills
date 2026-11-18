/* LuchIA Portafolio — Secciones 2 y 3: evolución Q-a-Q (valuación · stake) */
const { useState: useStateQ, useMemo: useMemoQ } = React;
const PFq = window.PFmt;
const PDq = window.PORT;
const PSq = window.PortShell;
const QS = PDq.QUARTERS;

/* sparkline de una serie (ignora nulls al inicio) */
function Sparkline({ values, w = 116, h = 30 }) {
  const idx = values.map((v, i) => [i, v]).filter(([, v]) => v != null);
  if (idx.length < 2) return <span className="num dim">—</span>;
  const vs = idx.map(([, v]) => v);
  const lo = Math.min(...vs), hi = Math.max(...vs), span = hi - lo || 1;
  const n = values.length;
  const x = (i) => 3 + (w - 6) * (i / (n - 1));
  const y = (v) => 4 + (h - 8) * (1 - (v - lo) / span);
  const d = idx.map(([i, v], k) => `${k ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const first = vs[0], last = vs[vs.length - 1];
  const up = last >= first;
  const col = up ? "var(--semaforo-verde-text)" : "var(--semaforo-rojo-text)";
  const [li, lv] = idx[idx.length - 1];
  return (
    <span className="spark">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <path d={d} fill="none" stroke={col} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={x(li)} cy={y(lv)} r="2.6" fill={col} />
      </svg>
    </span>
  );
}

/* señal de celda comparando con el trimestre previo CON dato */
function valSignal(series, i) {
  const v = series[i];
  if (v == null) return { state: "none" };
  let prev = null;
  for (let j = i - 1; j >= 0; j--) { if (series[j] != null) { prev = series[j]; break; } }
  if (prev == null) return { state: "flat", first: true };
  const chg = (v - prev) / prev;
  if (chg >= 0.005) return { state: "up", chg };
  if (chg <= -0.005) return { state: "down", chg };
  return { state: "flat", chg };
}

/* ============ Sección 2 — Evolución del valuation ============ */
function ValuationQ({ empresas }) {
  const [view, setView] = useStateQ("tabla"); // tabla | tendencias

  const matrix = () => {
    const head = ["Empresa", ...QS];
    const rows = empresas.map((e) => [e.nombre, ...e.series.val.map((v) => v == null ? "" : v)]);
    return PSq.tableToRows(head, rows);
  };

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sh-l">
          <div><span className="sec-num">02</span><h2>Evolución del valuation · Q a Q</h2></div>
          <div className="sh-sub">Valuación por trimestre, Q1’24 → Q2’26. Las celdas se colorean solo cuando hay señal (±0.5% vs. el trimestre previo con dato).</div>
        </div>
        <div className="sec-tools">
          <div className="seg">
            <button data-active={view === "tabla"} onClick={() => setView("tabla")}>Tabla</button>
            <button data-active={view === "tendencias"} onClick={() => setView("tendencias")}>Tendencias</button>
          </div>
          <PSq.ExportButtons matrix={matrix} filename="portafolio-valuation-qaq.csv" />
        </div>
      </div>

      <div className="tbl-card">
        {empresas.length === 0 ? (
          <div className="empty-state"><span className="es-ico">⌕</span>Sin resultados.</div>
        ) : view === "tendencias" ? (
          <div className="tbl-scroll">
            <table className="dtable">
              <thead><tr><th className="l sticky-name">Empresa</th><th className="c">Tendencia Q1’24 → Q2’26</th><th>Entrada</th><th>Hoy</th><th className="c">Δ total</th></tr></thead>
              <tbody>
                {empresas.map((e) => {
                  const vs = e.series.val.filter((v) => v != null);
                  const first = vs[0] ?? null, last = vs[vs.length - 1] ?? null;
                  const dpct = (first && last) ? (last - first) / first : null;
                  return (
                    <tr className="drow" key={e.id}>
                      <td className="l sticky-name"><PSq.NameCell e={e} /></td>
                      <td className="c"><Sparkline values={e.series.val} /></td>
                      <td><span className="num dim">{PFq.fmtUsd(first)}</span></td>
                      <td><span className="num bold">{PFq.fmtUsd(last)}</span></td>
                      <td className="c"><PSq.DeltaPill v={dpct} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="tbl-scroll">
              <table className="dtable">
                <thead><tr><th className="l sticky-name">Empresa</th>{QS.map((q) => <th key={q}>{q}</th>)}</tr></thead>
                <tbody>
                  {empresas.map((e) => (
                    <tr className="drow" key={e.id}>
                      <td className="l sticky-name"><PSq.NameCell e={e} /></td>
                      {e.series.val.map((v, i) => {
                        const sig = valSignal(e.series.val, i);
                        const showWhy = sig.state === "down" && e.dip && e.dip.q === i;
                        return (
                          <td key={i} className={`qcell ${sig.state}`}>
                            {v == null ? "·" : PFq.fmtUsd(v)}
                            {showWhy && <PSq.InfoTip text={e.dip.motivo} />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="qlegend">
              <span className="it"><span className="sw" style={{ background: "var(--semaforo-verde-soft)" }} /> Sube (≥ +0.5%)</span>
              <span className="it"><span className="sw" style={{ background: "var(--semaforo-rojo-soft)" }} /> Baja (≤ −0.5%)</span>
              <span className="it"><span className="sw" style={{ background: "var(--p-hover)" }} /> Sin cambio / primer dato</span>
              <span className="it"><span className="sw" style={{ background: "var(--p-card-2)", border: "1px solid var(--p-hairline)" }} /> · sin dato</span>
              <span className="it"><span className="why" style={{ position: "static" }}>?</span> caída con explicación (hover)</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ============ Sección 3 — Evolución del stake (ganado + potencial) ============ */
function StakeQ({ empresas, scope }) {
  const scopeLabel = PDq.SCOPE_BY_ID[scope].short;
  const matrix = () => {
    const head = ["Empresa", ...QS, "Condiciones", "Potencial %"];
    const rows = empresas.map((e) => [
      e.nombre,
      ...QS.map((_, i) => { const p = PDq.scopePctAtQ(e, scope, i); return p == null ? "" : p; }),
      e.condiciones, e.potPct,
    ]);
    return PSq.tableToRows(head, rows);
  };

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sh-l">
          <div><span className="sec-num">03</span><h2>Evolución del stake · Q a Q</h2></div>
          <div className="sh-sub">Stake <b>ganado</b> (% del cap table) por trimestre para el alcance <b>{scopeLabel}</b>. A la derecha, lo <b>potencial</b>: qué falta y el % total si se cumplen los hitos.</div>
        </div>
        <div className="sec-tools"><PSq.ExportButtons matrix={matrix} filename="portafolio-stake-qaq.csv" /></div>
      </div>

      <div className="tbl-card">
        {empresas.length === 0 ? (
          <div className="empty-state"><span className="es-ico">⌕</span>Sin resultados.</div>
        ) : (
        <div className="tbl-scroll">
          <table className="dtable">
            <thead>
              <tr>
                <th className="l sticky-name">Empresa</th>
                {QS.map((q) => <th key={q}>{q}</th>)}
                <th className="l stake-split">Condiciones (qué falta)</th>
                <th className="calc-h">Potencial % <PSq.InfoTip text="% total acordado sin Ceibo si se cumplen todos los hitos pendientes." /></th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((e) => (
                <tr className="drow" key={e.id}>
                  <td className="l sticky-name"><PSq.NameCell e={e} /></td>
                  {QS.map((_, i) => {
                    const p = PDq.scopePctAtQ(e, scope, i);
                    return <td key={i} className={`qcell ${p == null ? "none" : p === 0 ? "flat" : ""}`}>{p == null ? "·" : p === 0 ? "0%" : PFq.fmtCapPct(p)}</td>;
                  })}
                  <td className="l stake-split"><span className="cond-text">{e.condiciones}</span></td>
                  <td><span className="pot-pill">{PFq.fmtCapPct(e.potPct)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}

window.PortQuarterly = { ValuationQ, StakeQ, Sparkline };
