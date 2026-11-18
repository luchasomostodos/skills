/* LuchIA Portafolio — Sección 1: tabla maestra vista inversionistas (3 capas) */
const { useState: useStateI, useMemo: useMemoI } = React;
const PFi = window.PFmt;
const PDi = window.PORT;
const PSi = window.PortShell;

/* tooltip flotante reutilizable sobre cualquier hijo (no solo el ⓘ) */
function HoverTip({ children, lines, style }) {
  const [pos, setPos] = useStateI(null);
  return (
    <span style={{ position: "relative", ...style }} onMouseEnter={(e) => setPos({ x: e.clientX, y: e.clientY })} onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setPos(null)}>
      {children}
      {pos && <span className="tip" style={{ left: Math.min(pos.x + 12, window.innerWidth - 290), top: pos.y + 16 }}>{lines}</span>}
    </span>
  );
}

/* columna Salud (Mapa): conecta la lente financiera con el Mapa Luchante */
function SaludMapaCell({ e, onGo }) {
  const M = window.MAPA;
  if (!M) return <span className="num dim">—</span>;
  const m = M.get(e.id);
  const tok = M.SEM_TOKEN[m.sem];
  const lbl = m.sinMapa ? "s/d" : m.overall;
  const lines = m.sinMapa
    ? <>Sin Mapa Luchante en el corte Q1’26.<span className="tip-formula">click para ver la ficha →</span></>
    : <>Score {m.overall}/100 · {M.SEM_TOKEN[m.sem].label}<span className="tip-formula">{m.dims.map((d) => `${d.code} ${d.score}`).join(" · ")}</span></>;
  return (
    <HoverTip lines={lines}>
      <span className="tag-pill" onClick={() => onGo(e.id)} style={{ background: tok.soft, color: tok.text, cursor: "pointer" }}>
        <span className="d" style={{ background: tok.fill }} />{lbl}
      </span>
    </HoverTip>
  );
}

function InvestorTable({ empresas, scope, onSelect }) {
  const [sortKey, setSortKey] = useStateI("valorPos");
  const [sortDir, setSortDir] = useStateI(-1);
  const scopeLabel = PDi.SCOPE_BY_ID[scope].short;
  const MDi = window.MAPA;

  const goMapa = (id) => { window.location.href = `../mapas/index.html#${id}`; };

  const enriched = useMemoI(() => empresas.map((e) => ({
    e,
    flUsd: e.valuacion != null ? (e.pct.fl / 100) * e.valuacion : null,
    valorPos: PDi.valorPosHoy(e, scope),
    scopePct: PDi.scopePct(e, scope),
  })), [empresas, scope]);

  const sorted = useMemoI(() => {
    const pick = (r) => {
      switch (sortKey) {
        case "valuacion": return r.e.valuacion ?? -Infinity;
        case "valorPos": return r.valorPos ?? -Infinity;
        case "desemb": return r.e.desembolsado ?? -Infinity;
        case "porDes": return r.e.porDesembolsar ?? -Infinity;
        case "saludMapa": { const m = MDi && MDi.get(r.e.id); return m && !m.sinMapa ? m.overall : -Infinity; }
        default: return r.e.nombre;
      }
    };
    return [...enriched].sort((a, b) => {
      const va = pick(a), vb = pick(b);
      if (typeof va === "string") return va.localeCompare(vb) * sortDir;
      return (va - vb) * sortDir;
    });
  }, [enriched, sortKey, sortDir]);

  const handleSort = (k) => { if (sortKey === k) setSortDir((d) => -d); else { setSortKey(k); setSortDir(k === "nombre" ? 1 : -1); } };
  const SA = ({ k }) => sortKey === k ? <span style={{ marginLeft: 3 }}>{sortDir === 1 ? "↑" : "↓"}</span> : null;
  const TH = (k, label, cls) => <th className={`${cls || ""} sortable`} onClick={() => handleSort(k)}>{label}<SA k={k} /></th>;

  // totales
  const tot = useMemoI(() => {
    let flUsd = 0, valorPos = 0, desemb = 0, porDes = 0;
    for (const r of sorted) { flUsd += r.flUsd || 0; valorPos += r.valorPos || 0; desemb += r.e.desembolsado || 0; porDes += r.e.porDesembolsar || 0; }
    return { flUsd, valorPos, desemb, porDes };
  }, [sorted]);

  const Z = (v, render) => v == null || v === 0 ? <span className={`num ${v === 0 ? "cell-zero" : "dim"}`}>{v === 0 ? "0" : "—"}</span> : render();

  const matrix = () => {
    const head = ["#", "Empresa", "Salud (Mapa)", "Estado legal", "Valuación", "FL %", "FL $", "Lucha %", "Ceibo %", "Total s/Ceibo %", "Total LUCHA %", `Valor posición (${scopeLabel})`, "Desembolsado", "Por desembolsar"];
    const rows = sorted.map((r) => { const m = MDi && MDi.get(r.e.id); const sm = m ? (m.sinMapa ? "s/d" : m.overall) : ""; return [r.e.rank, r.e.nombre, sm, r.e.legal, r.e.valuacion ?? "", r.e.pct.fl, r.flUsd ?? "", r.e.pct.lucha, r.e.pct.ceibo, r.e.pct.sinCeibo, r.e.pct.total, r.valorPos ?? "", r.e.desembolsado ?? "", r.e.porDesembolsar ?? ""]; });
    return PSi.tableToRows(head, rows);
  };

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sh-l">
          <div><span className="sec-num">01</span><h2>Vista inversionistas · 3 capas</h2></div>
          <div className="sh-sub">Una fila por empresa · stake <b>ganado</b> hoy, separado en Fondo Luchante / Fondo Lucha / Ronda Ceibo. Columnas ƒ son calculadas.</div>
        </div>
        <div className="sec-tools"><PSi.ExportButtons matrix={matrix} filename="portafolio-inversionistas.csv" /></div>
      </div>

      <div className="tbl-card">
        {sorted.length === 0 ? (
          <div className="empty-state"><span className="es-ico">⌕</span>Sin resultados para la búsqueda.</div>
        ) : (
        <div className="tbl-scroll">
          <table className="dtable">
            <thead>
              <tr>
                <th className="l sticky-name sortable" onClick={() => handleSort("nombre")}>Empresa<SA k="nombre" /></th>
                {MDi && <th className="c sortable" onClick={() => handleSort("saludMapa")}>Salud (Mapa)<SA k="saludMapa" /></th>}
                {TH("valuacion", "Valuación")}
                <th>FL %</th>
                <th className="calc-h">FL $ <PSi.InfoTip text="Participación del Fondo Luchante en dólares." formula="ƒ = FL % × valuación actual" /></th>
                <th>Lucha %</th>
                <th>Ceibo %</th>
                <th className="calc-h">Total s/Ceibo % <PSi.InfoTip text="Stake sin la Ronda Ceibo (el default del fondo)." formula="ƒ = FL % + Lucha %" /></th>
                <th className="calc-h">Total LUCHA % <PSi.InfoTip text="Stake total incluyendo la Ronda Ceibo." formula="ƒ = FL % + Lucha % + Ceibo %" /></th>
                {TH("valorPos", <span className="calc-h">Valor posición <span style={{ color: "var(--p-subtle)" }}>· {scopeLabel}</span></span>, "c")}
                {TH("desemb", "Desembolsado")}
                {TH("porDes", <span className="calc-h">Por desembolsar <PSi.InfoTip text="Solo se muestra si es mayor a cero." formula="ƒ = comprometido − desembolsado" /></span>)}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => {
                const e = r.e;
                return (
                  <tr className="drow" key={e.id} onClick={() => onSelect && onSelect(e.id)}>
                    <td className="l sticky-name"><PSi.NameCell e={e} sub={e.legal} /></td>
                    {MDi && <td className="c"><SaludMapaCell e={e} onGo={goMapa} /></td>}
                    <td>{Z(e.valuacion, () => <span className="num bold">{PFi.fmtUsd(e.valuacion)}</span>)}</td>
                    <td>{Z(e.pct.fl, () => <span className="num cap-pp">{PFi.fmtCapPct(e.pct.fl)}</span>)}</td>
                    <td>{Z(r.flUsd, () => <span className="num dim">{PFi.fmtUsd(r.flUsd)}</span>)}</td>
                    <td>{Z(e.pct.lucha, () => <span className="num cap-pp">{PFi.fmtCapPct(e.pct.lucha)}</span>)}</td>
                    <td>{Z(e.pct.ceibo, () => <span className="num cap-pp">{PFi.fmtCapPct(e.pct.ceibo)}</span>)}</td>
                    <td>{Z(e.pct.sinCeibo, () => <span className="num cap-pp">{PFi.fmtCapPct(e.pct.sinCeibo)}</span>)}</td>
                    <td>{Z(e.pct.total, () => <span className="num cap-pp">{PFi.fmtCapPct(e.pct.total)}</span>)}</td>
                    <td className="c">{Z(r.valorPos, () => <span className="num bold">{PFi.fmtUsd(r.valorPos)}</span>)}</td>
                    <td>{Z(e.desembolsado, () => <span className="num dim">{PFi.fmtUsd(e.desembolsado)}</span>)}</td>
                    <td>{Z(e.porDesembolsar, () => <span className="num dim">{PFi.fmtUsd(e.porDesembolsar)}</span>)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="l sticky-name">Totales · {sorted.length}</td>
                {MDi && <td></td>}
                <td></td><td></td>
                <td className="num">{PFi.fmtUsd(tot.flUsd)}</td>
                <td></td><td></td><td></td><td></td>
                <td className="c num">{PFi.fmtUsd(tot.valorPos)}</td>
                <td className="num">{PFi.fmtUsd(tot.desemb)}</td>
                <td className="num">{PFi.fmtUsd(tot.porDes)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}

window.PortInvestors = InvestorTable;
