/* LuchIA Portafolio — shell: tooltip, alcance, chips, KPI cards, export */
const { useState: useStateS, useRef: useRefS, useEffect: useEffectS } = React;
const PFs = window.PFmt;
const PDs = window.PORT;

/* ---------- Tooltip ⓘ (fixed, sigue al cursor) ---------- */
function InfoTip({ text, formula }) {
  const [pos, setPos] = useStateS(null);
  const show = (e) => setPos({ x: e.clientX, y: e.clientY });
  const move = (e) => setPos({ x: e.clientX, y: e.clientY });
  return (
    <span className="info-i" onMouseEnter={show} onMouseMove={move} onMouseLeave={() => setPos(null)}>
      i
      {pos && (
        <span className="tip" style={{ left: Math.min(pos.x + 12, window.innerWidth - 290), top: pos.y + 16 }}>
          {text}
          {formula && <span className="tip-formula">{formula}</span>}
        </span>
      )}
    </span>
  );
}

/* ---------- export helpers ---------- */
function tableToRows(headers, rows) {
  return [headers, ...rows];
}
function downloadCSV(filename, matrix) {
  const esc = (c) => {
    const s = c == null ? "" : String(c);
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = matrix.map((r) => r.map(esc).join(",")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function copyTable(matrix) {
  const tsv = matrix.map((r) => r.join("\t")).join("\n");
  try { await navigator.clipboard.writeText(tsv); return true; } catch (e) { return false; }
}
function ExportButtons({ matrix, filename }) {
  const [copied, setCopied] = useStateS(false);
  return (
    <>
      <button className={`exp-btn ${copied ? "ok" : ""}`} onClick={async () => { const ok = await copyTable(matrix()); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1400); } }}>
        {copied ? "✓ Copiado" : "Copiar tabla"}
      </button>
      <button className="exp-btn" onClick={() => downloadCSV(filename, matrix())}>Descargar CSV</button>
    </>
  );
}

/* ---------- selector de alcance ---------- */
function ScopeBar({ scope, setScope }) {
  const active = PDs.SCOPE_BY_ID[scope];
  return (
    <div className="scope-bar">
      <span className="sb-label">
        Alcance por fondo
        <InfoTip text="Ronda Ceibo = syndicate de ángeles que invierte directo; LUCHA lo gestiona pero no es plata de los fondos, por eso el default la excluye." />
      </span>
      <div className="scope-seg">
        {PDs.SCOPES.map((s) => (
          <button key={s.id} data-active={scope === s.id} onClick={() => setScope(s.id)}>{s.short}</button>
        ))}
      </div>
      <span className="scope-active-note">Mostrando <b>{active.label}</b> · recalcula tabla, stake y gráficos</span>
    </div>
  );
}

/* ---------- chips de pendientes por responsable ---------- */
function PendientesBar({ pend, setPend }) {
  const counts = PDs.flagCountByArea();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return (
    <div className="pend-bar">
      <span className="pb-label">Pendientes</span>
      {PDs.RESPONSABLES.map((r) => (
        <button key={r.id} className="pend-chip" data-active={pend === r.id} onClick={() => setPend(pend === r.id ? null : r.id)}>
          {r.label} <span className="who">· {r.owner}</span>
          <span className="cnt">{counts[r.id] || 0}</span>
        </button>
      ))}
      <button className="pend-chip allchip" data-active={pend === null} onClick={() => setPend(null)}>Ver todas <span className="cnt">{total}</span></button>
    </div>
  );
}

/* ---------- KPI cards de resumen ---------- */
function KpiStrip({ scope }) {
  const t = PDs.totals(scope);
  const scopeLabel = PDs.SCOPE_BY_ID[scope].short;
  return (
    <div className="kpi-strip">
      <div className="kc">
        <span className="kc-label">Total desembolsado
          <InfoTip text="Cash efectivamente girado por el Fondo Luchante. No incluye valorización de servicios (sweat equity)." />
        </span>
        <span className="kc-value">{PFs.fmtUsd(t.desemb)}</span>
        <span className="kc-sub">Comprometido <b>{PFs.fmtUsd(t.comprom)}</b> · por desembolsar {PFs.fmtUsd(t.porDes)}</span>
      </div>
      <div className="kc">
        <span className="kc-label">Total comprometido</span>
        <span className="kc-value">{PFs.fmtUsd(t.comprom)}</span>
        <span className="kc-sub">{t.n} empresas en cartera</span>
      </div>
      <div className="kc">
        <span className="kc-label"># Empresas</span>
        <span className="kc-value">{t.n}</span>
        <span className="kc-sub">cohorts C1 · C2 · C3</span>
      </div>
      <div className="kc">
        <span className="kc-label">Valor de posición
          <InfoTip text={`Σ (stake ganado del alcance × valuación actual) sobre las ${t.n} empresas.`} formula={`alcance activo: ${scopeLabel}`} />
        </span>
        <span className="kc-value">{PFs.fmtUsd(t.pos)}</span>
        <span className="kc-sub">valor de portafolio (val. total) <b>{PFs.fmtUsd(t.valorPortafolio)}</b></span>
      </div>
    </div>
  );
}

/* ---------- bits reutilizables ---------- */
function SaludTag({ e }) {
  const s = PDs.SALUD[PDs.saludKey(e)];
  return <span className="tag-pill" style={{ background: s.soft, color: s.text }}><span className="d" style={{ background: s.color }} />{s.label}</span>;
}
function CohortePill({ c }) {
  return <span className="tag-pill"><span className="d" style={{ background: PDs.COHORTE_COLOR[c] || "var(--p-subtle)" }} />{c}</span>;
}
function DeltaPill({ v, money }) {
  if (v == null) return <span className="num dim">—</span>;
  const pos = v > 0.0001, neg = v < -0.0001;
  const bg = pos ? "var(--semaforo-verde-soft)" : neg ? "var(--semaforo-rojo-soft)" : "var(--p-hover)";
  const fg = pos ? "var(--semaforo-verde-text)" : neg ? "var(--semaforo-rojo-text)" : "var(--p-muted)";
  const txt = money ? (pos ? "+" : "") + PFs.fmtUsd(v) : PFs.fmtSignedPct(v);
  return <span className="qd-delta" style={{ background: bg, color: fg }}>{txt}</span>;
}
function NameCell({ e, sub }) {
  return (
    <div className="vt-name">
      <span className="vt-rank">{e.rank}</span>
      <div style={{ minWidth: 0 }}>
        <div className="nm">{e.nombre}{e.exit && <span className="badge-exit">exit?</span>}</div>
        <div className="sub">{sub != null ? sub : `${e.sector} · ${e.vertical}`}</div>
      </div>
    </div>
  );
}

window.PortShell = { InfoTip, ScopeBar, PendientesBar, KpiStrip, ExportButtons, SaludTag, CohortePill, DeltaPill, NameCell, downloadCSV, copyTable, tableToRows };
