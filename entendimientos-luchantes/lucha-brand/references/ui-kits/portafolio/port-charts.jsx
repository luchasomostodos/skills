/* LuchIA Portafolio — Sección 4: evolución del portafolio (gráficos) */
const { useState: useStateC, useMemo: useMemoC } = React;
const PFc = window.PFmt;
const PDc = window.PORT;
const PSc = window.PortShell;
const QSc = PDc.QUARTERS;
const COHORTS = ["C1", "C2", "C3"];
const COH_LABEL = { C1: "Cohort 1", C2: "Cohort 2", C3: "Cohort 3" };
// paleta para modo "Por empresa": gradiente azul → teal → verde, distinto por empresa
const EMP_PALETTE = ["#1c5d9e", "#236f9f", "#2a82a0", "#3a9d9b", "#46a795", "#57b08c", "#6cbb88", "#84d094"];
function lumOf(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function PortfolioCharts({ empresas, scope, setScope }) {
  const [mode, setMode] = useStateC("cohort");   // cohort | empresa
  const [pick, setPick] = useStateC("todas");    // cohort id, "todas", o empresa id
  const [openQ, setOpenQ] = useStateC(null);     // índice de trimestre abierto

  // resetea pick al cambiar de modo
  const onMode = (m) => { setMode(m); setPick(m === "empresa" ? (empresas[0] ? empresas[0].id : "") : "todas"); setOpenQ(null); };

  // empresas en juego según filtro del gráfico
  const pool = useMemoC(() => {
    if (mode === "empresa") return empresas.filter((e) => e.id === pick);
    if (pick !== "todas") return empresas.filter((e) => e.cohorte === pick);
    return empresas;
  }, [empresas, mode, pick]);

  // serie por trimestre: por cohort (stack) o por empresa
  const series = useMemoC(() => {
    return QSc.map((q, i) => {
      const segs = {};
      let total = 0;
      for (const e of pool) {
        const v = PDc.valorPosAtQ(e, scope, i) || 0;
        const key = mode === "cohort" ? e.cohorte : e.id;
        segs[key] = (segs[key] || 0) + v;
        total += v;
      }
      return { i, q, segs, total };
    });
  }, [pool, scope, mode]);

  const yMax = Math.max(...series.map((s) => s.total), 1);
  const segKeys = mode === "cohort" ? COHORTS.filter((c) => series.some((s) => s.segs[c])) : pool.map((e) => e.id);

  // colores de empresa (gradiente)
  const empColor = useMemoC(() => {
    const m = {};
    pool.forEach((e, i) => { m[e.id] = EMP_PALETTE[i % EMP_PALETTE.length]; });
    return m;
  }, [pool]);
  const colorOf = (k) => mode === "cohort" ? (PDc.COHORTE_COLOR[k] || "var(--p-subtle)") : (empColor[k] || "var(--p-fl)");
  const txtOf = (k) => {
    if (mode === "cohort") return k === "C3" ? "var(--p-ink)" : "#fff";
    return lumOf(empColor[k] || "#1c5d9e") > 0.62 ? "var(--p-ink)" : "#fff";
  };
  const nameOf = (k) => mode === "cohort" ? (COH_LABEL[k] || k) : (PDc.byId[k] ? PDc.byId[k].nombre : k);

  // stat de cabecera: primer trimestre con dato → último
  const stat = useMemoC(() => {
    const withData = series.filter((s) => s.total > 0);
    if (withData.length < 2) return null;
    const first = withData[0], last = withData[withData.length - 1];
    const months = (last.i - first.i) * 3;
    const pct = first.total > 0 ? (last.total - first.total) / first.total : null;
    return { first: first.total, last: last.total, months, pct, up: last.total >= first.total };
  }, [series]);

  // bloque "por qué bajó": una entrada por empresa con caída registrada
  const dips = useMemoC(() => {
    const out = [];
    for (const e of pool) {
      if (!e.dip) continue;
      const q = e.dip.q;
      const cur = PDc.valorPosAtQ(e, scope, q);
      let prevV = null;
      for (let j = q - 1; j >= 0; j--) { const pv = PDc.valorPosAtQ(e, scope, j); if (pv != null) { prevV = pv; break; } }
      out.push({ e, q, prevV, cur, motivo: e.dip.motivo, doc: e.dip.doc });
    }
    return out.sort((a, b) => a.q - b.q || a.e.nombre.localeCompare(b.e.nombre));
  }, [pool, scope]);

  // detalle del trimestre abierto (clic en una barra)
  const detail = useMemoC(() => {
    if (openQ == null) return null;
    const rows = pool.map((e) => {
      const cur = PDc.valorPosAtQ(e, scope, openQ) || 0;
      let prevV = null;
      for (let j = openQ - 1; j >= 0; j--) { const pv = PDc.valorPosAtQ(e, scope, j); if (pv != null) { prevV = pv; break; } }
      const delta = (prevV != null) ? cur - prevV : null;
      return { e, cur, delta };
    }).filter((r) => r.cur > 0).sort((a, b) => b.cur - a.cur);
    const total = rows.reduce((s, r) => s + r.cur, 0);
    return { rows, total };
  }, [openQ, pool, scope]);

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sh-l">
          <div><span className="sec-num">04</span><h2>Evolución del portafolio</h2></div>
          <div className="sh-sub">Posición $ = stake ganado del <b>alcance elegido</b> × valuación del trimestre (dilución no aplicada). Apilado por cohort; cambia a <b>Por empresa</b>, filtrá, y tocá una barra para abrir el detalle del trimestre.</div>
        </div>
      </div>

      <div className="chart-card">
        {/* fila 1: alcance + toggle por cohort/empresa */}
        <div className="chart-controls">
          <div className="scope-seg">
            {PDc.SCOPES.map((s) => (
              <button key={s.id} data-active={scope === s.id} onClick={() => setScope && setScope(s.id)}>{s.label}</button>
            ))}
          </div>
          <PSc.InfoTip text="Ronda Ceibo = ángeles directos que LUCHA gestiona pero no son plata de los fondos; el default los excluye." />
          <div className="spacer" />
          <div className="seg">
            <button data-active={mode === "cohort"} onClick={() => onMode("cohort")}>Por cohort</button>
            <button data-active={mode === "empresa"} onClick={() => onMode("empresa")}>Por empresa</button>
          </div>
        </div>

        {/* fila 2: filtro por cohort o empresa */}
        <div className="chart-filter">
          {mode === "cohort" ? (
            <div className="seg">
              <button data-active={pick === "todas"} onClick={() => { setPick("todas"); setOpenQ(null); }}>Todos</button>
              {COHORTS.map((c) => <button key={c} data-active={pick === c} onClick={() => { setPick(c); setOpenQ(null); }}>{COH_LABEL[c]}</button>)}
            </div>
          ) : (
            <select className="chart-select" value={pick} onChange={(e) => { setPick(e.target.value); setOpenQ(null); }}>
              {empresas.map((e) => <option key={e.id} value={e.id}>{e.nombre} · {e.cohorte}</option>)}
            </select>
          )}
        </div>

        {pool.length === 0 ? (
          <div className="empty-state"><span className="es-ico">⌕</span>Sin empresas para este filtro.</div>
        ) : (
        <>
          <div className="calc-with">Posición calculada con: <b>{PDc.SCOPE_BY_ID[scope].label}</b></div>

          {stat && (
            <div className={`chart-stat ${stat.up ? "" : "neg"}`}>
              <span>{PFc.fmtUsd(stat.first)}</span>
              <span className="arrow">→</span>
              <span>{PFc.fmtUsd(stat.last)}</span>
              {stat.pct != null && <span className="meta">· {PFc.fmtSignedPct(stat.pct)} en {stat.months} meses</span>}
            </div>
          )}

          {mode === "cohort" && (
            <div className="chart-legend">
              {segKeys.map((c) => <span className="it" key={c}><span className="d" style={{ background: colorOf(c) }} />{COH_LABEL[c]} · entró {PDc.COHORTE_AÑO[c]}</span>)}
            </div>
          )}

          <div className="hbars">
            {series.map((s) => (
              <div className="hbar-row" key={s.i} data-active={openQ === s.i} onClick={() => setOpenQ(openQ === s.i ? null : s.i)}>
                <span className="hbar-q">{s.q}</span>
                <div className="hbar-track">
                  <div className="hbar-fill" style={{ width: `${(s.total / yMax) * 100}%` }}>
                    {segKeys.map((k) => s.segs[k] ? (
                      <div key={k} className="hbar-seg" title={`${nameOf(k)} · ${PFc.fmtUsd(s.segs[k])}`}
                        style={{ flexGrow: s.segs[k], flexBasis: 0, background: colorOf(k), color: txtOf(k) }}>
                        {(s.segs[k] / yMax) > 0.07 ? PFc.fmtUsd(s.segs[k]) : null}
                      </div>
                    ) : null)}
                  </div>
                </div>
                <span className="hbar-total">{PFc.fmtUsd(s.total)}</span>
              </div>
            ))}
          </div>

          {detail && (
            <div className="qdetail">
              <div className="qdetail-head">
                <h4>{QSc[openQ]} · posición por empresa <span className="num" style={{ color: "var(--p-muted)", fontWeight: 400 }}>· total {PFc.fmtUsd(detail.total)}</span></h4>
                <button className="qd-close" onClick={() => setOpenQ(null)}>✕</button>
              </div>
              <div className="qdetail-list">
                {detail.rows.length === 0 ? (
                  <div className="empty-state" style={{ padding: 28 }}>Sin posición ganada en este trimestre.</div>
                ) : detail.rows.map((r, k) => (
                  <div className="qdrow" key={r.e.id}>
                    <span className="qd-rank">{k + 1}</span>
                    <span className="qd-nm">{r.e.nombre} <span className="qd-coh"><PSc.CohortePill c={r.e.cohorte} /></span></span>
                    <span className="qd-pos">{PFc.fmtUsd(r.cur)}</span>
                    <PSc.DeltaPill v={r.delta} money />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* por qué bajó: una entrada por trimestre con caída registrada */}
          <div className="whyblock">
            <div className="wb-title">Por qué bajó</div>
            {dips.length === 0 ? (
              <div className="whyblock-empty">Sin caídas de valuación registradas en el alcance y filtro actuales.</div>
            ) : (
              <div className="wb-list">
                {dips.map((d) => (
                  <div className="wb-row" key={d.e.id}>
                    <span className="wb-q">{QSc[d.q]}</span>
                    <div className="wb-body">
                      <div className="wb-head">
                        <span className="wb-nm">{d.e.nombre}</span>
                        <span className="wb-trans">{PFc.fmtUsd(d.prevV)} <span style={{ color: "var(--p-faint)" }}>→</span> <span className="to">{PFc.fmtUsd(d.cur)}</span></span>
                        {d.doc && <span className="wb-doc">{d.doc}</span>}
                      </div>
                      <div className="wb-motivo">{d.motivo}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
        )}
      </div>
    </div>
  );
}

window.PortCharts = PortfolioCharts;
