/* LuchIA · Mapas Luchantes — Vista 3: dashboard índice (panel de salud) */
const { useState: useStateD, useMemo: useMemoD, useEffect: useEffectD, useRef: useRefD } = React;
const PFd = window.PFmt;
const PDd = window.PORT;
const MDd = window.MAPA;
const PSd = window.PortShell;

/* ---------- tooltip flotante reutilizable (lee data-tip="t|desc|ctx") ---------- */
function FloatTip() {
  const [st, setSt] = useStateD(null);
  useEffectD(() => {
    const over = (e) => {
      const t = e.target.closest && e.target.closest("[data-tip]");
      if (!t) return;
      const p = t.getAttribute("data-tip").split("|");
      setSt({ t: p[0] || "", d: p[1] || "", c: p[2] || "", x: e.clientX, y: e.clientY });
    };
    const move = (e) => setSt((s) => (s ? { ...s, x: e.clientX, y: e.clientY } : s));
    const out = (e) => { if (e.target.closest && e.target.closest("[data-tip]")) setSt(null); };
    document.addEventListener("mouseover", over);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseout", out);
    return () => { document.removeEventListener("mouseover", over); document.removeEventListener("mousemove", move); document.removeEventListener("mouseout", out); };
  }, []);
  if (!st) return null;
  const left = Math.min(st.x + 14, window.innerWidth - 296);
  const top = Math.min(st.y + 16, window.innerHeight - 130);
  return (
    <div style={{ position: "fixed", left, top, zIndex: 300, maxWidth: 280, background: "var(--p-tooltip, var(--p-ink))", color: "#fff", borderRadius: 9, padding: "9px 12px", fontSize: 11.5, lineHeight: 1.5, pointerEvents: "none", boxShadow: "0 12px 32px -10px hsl(208 50% 10% / .5)", border: "1px solid var(--p-border)" }}>
      <div style={{ fontWeight: 600, color: "var(--p-mint)", marginBottom: 3 }}>{st.t}</div>
      {st.d && <div style={{ color: "#e6eaef" }}>{st.d}</div>}
      {st.c && <div style={{ color: "hsl(212 14% 70%)", fontSize: 10, marginTop: 6, paddingTop: 5, borderTop: "1px solid hsl(212 25% 28%)", fontFamily: "var(--p-num)" }}>{st.c}</div>}
    </div>
  );
}

/* ---------- KPIs de salud ---------- */
function HealthKpis() {
  const a = MDd.healthAgg();
  return (
    <div className="mp-kpis">
      <div className="kc"><span className="kc-label"># Empresas</span><span className="kc-value">{a.total}</span><span className="kc-sub">Impact Studio · cohorts C1–C3</span></div>
      <div className="kc"><span className="kc-label">Con Mapa</span><span className="kc-value">{a.conMapa}</span><span className="kc-sub">{a.sinMapa} sin mapa en el corte</span></div>
      <div className="kc"><span className="kc-label">Score promedio
        <PSd.InfoTip text={`Promedio del score general del Mapa sobre las ${a.conMapa} empresas con mapa.`} formula="verde ≥70 · amarillo 55–69 · rojo <55" /></span>
        <span className="kc-value">{a.avg}</span><span className="kc-sub">de {a.conMapa} mapas</span></div>
      <div className="kc"><span className="kc-label">Salud V·A·R</span>
        <span className="kc-value mp-sem-counts">
          <span className="d" style={{ background: "var(--semaforo-verde)" }} />{a.counts.g}
          <span className="d" style={{ background: "var(--semaforo-amarillo)", marginLeft: 8 }} />{a.counts.y}
          <span className="d" style={{ background: "var(--semaforo-rojo)", marginLeft: 8 }} />{a.counts.r}
        </span><span className="kc-sub">+ {a.sinMapa} sin mapa</span></div>
      <div className="kc"><span className="kc-label">Valor portafolio</span><span className="kc-value">{PFd.fmtUsd(a.valorPortafolio)}</span><span className="kc-sub">valuación total · referencia</span></div>
    </div>
  );
}

/* ---------- matriz de decisión (scatter) ---------- */
function DecisionMatrix({ onSelect, cohort }) {
  const [yMode, setYMode] = useStateD("imp");
  const pts = PDd.empresas.map((e) => ({ e, m: MDd.get(e.id), exp: PDd.valorPosHoy(e, "sinCeibo") || 0 })).filter((p) => !p.m.sinMapa && (cohort === "Todos" || p.e.cohorte === cohort));
  const maxExp = Math.max(...pts.map((p) => p.exp), 1);
  const W = 560, H = 380, L = 52, R = 22, T = 20, B = 48;
  const xd = [40, 90];
  const yDef = yMode === "imp"
    ? { label: "Impacto (score) ↑", dom: [40, 88], get: (m) => m.scoreByKey.impacto, fmt: (v) => Math.round(v) }
    : { label: "Momentum (Δ QoQ) ↑", dom: [-7, 7], get: (m) => m.momentum, fmt: (v) => (v > 0 ? "+" : "") + Math.round(v) };
  const X = (v) => L + (W - L - R) * (v - xd[0]) / (xd[1] - xd[0]);
  const Y = (v) => T + (H - T - B) * (1 - (v - yDef.dom[0]) / (yDef.dom[1] - yDef.dom[0]));
  const rad = (exp) => 7 + 19 * Math.sqrt(exp / maxExp);

  return (
    <div className="mp-panel">
      <div className="mp-panel-t">Matriz de decisión · {yMode === "imp" ? "Impacto" : "Momentum"} × Salud</div>
      <div className="mp-panel-s">cada burbuja = empresa · X = salud del negocio · tamaño = exposición $ · color = semáforo general</div>
      <div className="mp-panel-ctrls">
        <span className="p-eyebrow">Eje Y</span>
        <div className="seg">
          <button data-active={yMode === "imp"} onClick={() => setYMode("imp")}>Impacto</button>
          <button data-active={yMode === "mom"} onClick={() => setYMode("mom")}>Momentum</button>
        </div>
      </div>
      <svg className="mp-scatter" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* zona frágil (salud < 60) */}
        <rect x={L} y={T} width={X(60) - L} height={H - T - B} className="mp-zone" />
        {/* ejes */}
        <line x1={L} y1={H - B} x2={W - R} y2={H - B} stroke="var(--p-border)" />
        <line x1={L} y1={T} x2={L} y2={H - B} stroke="var(--p-border)" />
        <line x1={X(60)} y1={T} x2={X(60)} y2={H - B} className="mp-qline" />
        {[50, 60, 70, 80].map((t) => <text key={t} x={X(t)} y={H - B + 15} textAnchor="middle" className="mp-ax">{t}</text>)}
        {[yDef.dom[0], (yDef.dom[0] + yDef.dom[1]) / 2, yDef.dom[1]].map((t, i) => <text key={i} x={L - 8} y={Y(t) + 3} textAnchor="end" className="mp-ax">{yDef.fmt(t)}</text>)}
        {yMode === "imp" ? (
          <>
            <line x1={L} y1={Y(60)} x2={W - R} y2={Y(60)} className="mp-qline" />
            <text x={X(60) - 7} y={T + 13} textAnchor="end" className="mp-quadlab">sostener c/ Studio ◤</text>
            <text x={X(60) + 7} y={T + 13} textAnchor="start" className="mp-quadlab">◥ doblar apuesta</text>
            <text x={X(60) - 7} y={H - B - 7} textAnchor="end" className="mp-quadlab">triage / exit ◣</text>
            <text x={X(60) + 7} y={H - B - 7} textAnchor="start" className="mp-quadlab">◢ revisar tesis</text>
          </>
        ) : (
          <>
            <line x1={L} y1={Y(0)} x2={W - R} y2={Y(0)} className="mp-qline" />
            <text x={W - R - 4} y={Y(0) - 6} textAnchor="end" className="mp-quadlab" style={{ fill: "var(--semaforo-verde-text)" }}>subiendo ▲</text>
            <text x={W - R - 4} y={Y(0) + 14} textAnchor="end" className="mp-quadlab" style={{ fill: "var(--semaforo-rojo-text)" }}>cayendo ▼</text>
          </>
        )}
        <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" className="mp-axl">Salud del negocio (score) →</text>
        <text transform={`translate(13 ${(T + H - B) / 2}) rotate(-90)`} textAnchor="middle" className="mp-axl">{yDef.label}</text>
        {pts.map(({ e, m, exp }) => {
          const cx = X(m.scoreByKey.salud), cy = Y(yDef.get(m)), r = rad(exp);
          const f = MDd.SEM_TOKEN[m.sem].fill;
          const tip = `${e.nombre}|Salud ${m.scoreByKey.salud} · ${yMode === "imp" ? "Impacto " + m.scoreByKey.impacto : "Momentum " + yDef.fmt(m.momentum)}|exposición ${PFd.fmtUsd(exp)} · ${m.quad.label}`;
          return (
            <g key={e.id} className="mp-bub" onClick={() => onSelect(e.id)}>
              <circle cx={cx} cy={cy} r={r} fill={f} fillOpacity="0.42" stroke={f} strokeWidth="1.6" data-tip={tip} />
              <text x={cx} y={cy - r - 4} textAnchor="middle" className="mp-blab">{e.nombre}</text>
            </g>
          );
        })}
      </svg>
      <div className="mp-panel-foot">Cada cuadrante es una acción: <b>doblar</b> (sana + impacto), <b>sostener con el Studio</b> (impacto pero frágil), <b>revisar tesis</b> (sana sin impacto), <b>triage</b> (ni-ni). Click en una burbuja → ficha.</div>
    </div>
  );
}

/* ---------- mapa geográfico (LatAm real vía world-atlas + d3-geo) ---------- */
const LATAM_IDS = new Set([484, 320, 84, 222, 340, 558, 188, 591, 192, 214, 332, 388, 170, 862, 328, 740, 254, 218, 604, 76, 68, 600, 152, 858, 32]);
const FOCUS_IDS = new Set([484, 170, 604, 152, 76, 218]); // donde opera LUCHA
function GeoPanel({ onSelect, cohort }) {
  const [topo, setTopo] = useStateD(window.__worldTopo || null);
  useEffectD(() => {
    if (topo) return;
    if (!window.d3 || !window.topojson) return;
    fetch("https://unpkg.com/world-atlas@2.0.2/countries-50m.json")
      .then((r) => r.json()).then((j) => { window.__worldTopo = j; setTopo(j); }).catch(() => {});
  }, [topo]);

  const W = 360, H = 420;
  const render = useMemoD(() => {
    if (!topo || !window.d3 || !window.topojson) return null;
    const d3 = window.d3, topojson = window.topojson;
    const all = topojson.feature(topo, topo.objects.countries).features;
    const latam = all.filter((f) => LATAM_IDS.has(+f.id));
    const proj = d3.geoMercator().fitExtent([[14, 14], [W - 14, H - 14]], { type: "FeatureCollection", features: latam });
    const path = d3.geoPath(proj);
    const pins = PDd.empresas.map((e) => {
      const m = MDd.get(e.id);
      const xy = proj([m.geo.lng, m.geo.lat]);
      return { e, m, xy, exp: PDd.valorPosHoy(e, "sinCeibo") || 0 };
    }).filter((p) => p.xy && (cohort === "Todos" || p.e.cohorte === cohort)).sort((a, b) => b.exp - a.exp);
    const maxExp = Math.max(...pins.map((p) => p.exp), 1);
    return { latam, path, pins, rad: (exp) => 4 + 9 * Math.sqrt(exp / maxExp) };
  }, [topo, cohort]);

  return (
    <div className="mp-panel">
      <div className="mp-panel-t">¿Dónde está el portafolio?</div>
      <div className="mp-panel-s">tamaño del pin = exposición $ · color = semáforo · {render ? render.pins.length : ""} empresas</div>
      {!render ? (
        <div className="mp-geo-loading">Cargando mapa de Latinoamérica…</div>
      ) : (
        <svg className="mp-geo" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          {render.latam.map((f) => (
            <path key={f.id} d={render.path(f)} className={"land" + (FOCUS_IDS.has(+f.id) ? " focus" : "")} />
          ))}
          {render.pins.map(({ e, m, xy, exp }) => {
            const f = MDd.SEM_TOKEN[m.sem].fill;
            const tip = `${e.nombre}|${m.geo.city}, ${m.geo.pais}|posición ${PFd.fmtUsd(exp)} · salud ${m.sinMapa ? "s/d" : m.overall}`;
            return <circle key={e.id} className="pin" cx={xy[0]} cy={xy[1]} r={render.rad(exp)} fill={f} fillOpacity="0.82" stroke="#fff" strokeWidth="1.4" data-tip={tip} onClick={() => onSelect(e.id)} />;
          })}
        </svg>
      )}
      <div className="mp-geo-legend">
        <span className="tag-pill"><span className="d" style={{ background: "var(--semaforo-verde)" }} />Verde</span>
        <span className="tag-pill"><span className="d" style={{ background: "var(--semaforo-amarillo)" }} />Amarillo</span>
        <span className="tag-pill"><span className="d" style={{ background: "var(--semaforo-rojo)" }} />Rojo</span>
        <span className="tag-pill"><span className="d" style={{ background: "var(--semaforo-gris)" }} />Sin mapa</span>
      </div>
    </div>
  );
}

/* ---------- live feed · Kanban por empresa ---------- */
function LiveFeed({ onSelect }) {
  // semilla desde MDd.feed + tarjetas que el usuario agrega en sesión
  const [cards, setCards] = useStateD(() => MDd.feed.map((x, i) => ({ ...x, id: "seed" + i })));
  const [adding, setAdding] = useStateD(null); // nombre de empresa con composer abierto
  const [draft, setDraft] = useStateD({ x: "", t: "in", src: "Conversación" });

  const idOf = (nm) => { const e = PDd.empresas.find((x) => x.nombre === nm); return e ? e.id : null; };
  // columnas = empresas con actividad (orden por #tarjetas), preservando orden de aparición
  const cols = useMemoD(() => {
    const order = [];
    cards.forEach((c) => { if (!order.includes(c.emp)) order.push(c.emp); });
    return order;
  }, [cards]);

  const today = new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "short" }).replace(".", "");
  const openAdd = (emp) => { setAdding(emp); setDraft({ x: "", t: "in", src: "Conversación" }); };
  const submit = (emp) => {
    if (!draft.x.trim()) { setAdding(null); return; }
    setCards((cs) => [{ id: "u" + Date.now(), emp, d: today, src: draft.src, t: draft.t, x: draft.x.trim(), manual: true }, ...cs]);
    setAdding(null);
  };

  return (
    <div className="mp-feed">
      <div className="mp-feed-banner"><span className="lbl">No conectado aún</span> Tablero Kanban — las actas llegarán desde <b>Notion</b>; mientras, agregá con <b>+</b> lo que salga de conversaciones con los founders.</div>
      <div className="mp-kanban">
        {cols.map((emp) => {
          const items = cards.filter((c) => c.emp === emp);
          const id = idOf(emp);
          const m = id ? MDd.get(id) : null;
          const sem = m && !m.sinMapa ? MDd.SEM_TOKEN[m.sem].fill : "var(--p-faint)";
          return (
            <div className="mp-kcol" key={emp}>
              <div className="mp-kcol-h">
                <span className="mp-kdot" style={{ background: sem }} />
                <span className="mp-kcol-n" onClick={() => id && onSelect(id)}>{emp}</span>
                <span className="mp-kcount">{items.length}</span>
                <button className="mp-kadd" title={`Agregar tarjeta a ${emp}`} onClick={() => openAdd(emp)}>+</button>
              </div>
              {adding === emp && (
                <div className="mp-kcompose">
                  <textarea autoFocus placeholder="Nota / novedad de una conversación…" value={draft.x} onChange={(e) => setDraft((d) => ({ ...d, x: e.target.value }))} />
                  <div className="mp-krow">
                    <select value={draft.t} onChange={(e) => setDraft((d) => ({ ...d, t: e.target.value }))}>
                      <option value="av">avance</option><option value="ri">riesgo</option><option value="in">info</option>
                    </select>
                    <select value={draft.src} onChange={(e) => setDraft((d) => ({ ...d, src: e.target.value }))}>
                      <option>Conversación</option><option>Manual</option><option>Noticia</option><option>Notion · Acta</option>
                    </select>
                  </div>
                  <div className="mp-krow end">
                    <button className="mp-kbtn ghost" onClick={() => setAdding(null)}>Cancelar</button>
                    <button className="mp-kbtn" onClick={() => submit(emp)}>Agregar</button>
                  </div>
                </div>
              )}
              <div className="mp-kcards">
                {items.map((it) => (
                  <div className={"mp-kcard" + (it.manual ? " manual" : "")} key={it.id}>
                    <div className="mp-kcard-top">
                      <span className="mp-kcard-dot" style={{ background: MDd.TIPOS[it.t].dot }} />
                      <span className="mp-kcard-src">{it.src}</span>
                      <span className="mp-kcard-date">{it.d}</span>
                    </div>
                    <div className="mp-kcard-x">{it.x}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- heatmap comparativo ---------- */
function Heatmap({ onSelect }) {
  const [sort, setSort] = useStateD({ k: "overall", dir: -1 });
  const avgs = MDd.dimAverages();
  const rows = useMemoD(() => {
    const list = PDd.empresas.map((e) => ({ e, m: MDd.get(e.id) }));
    const val = (r) => {
      if (sort.k === "emp") return r.e.nombre;
      if (sort.k === "overall") return r.m.sinMapa ? -1 : r.m.overall;
      if (sort.k === "valor") return r.e.valuacion ?? -1;
      return r.m.sinMapa ? -1 : r.m.scoreByKey[sort.k];
    };
    return [...list].sort((a, b) => {
      const va = val(a), vb = val(b);
      if (typeof va === "string") return va.localeCompare(vb) * (sort.dir);
      return (va - vb) * sort.dir;
    });
  }, [sort]);

  const onSort = (k) => setSort((s) => s.k === k ? { k, dir: -s.dir } : { k, dir: k === "emp" ? 1 : -1 });
  const SA = ({ k }) => sort.k === k ? <span className="sortarrow">{sort.dir === 1 ? "↑" : "↓"}</span> : null;
  const cell = (v, tip, ov) => {
    const tok = MDd.SEM_TOKEN[MDd.semOf(v)];
    if (v == null) return <td><span className="mp-heat-cellwrap"><span className="cell empty">·</span></span></td>;
    return <td><span className={"cell" + (ov ? " ov" : "")} style={{ background: tok.soft, color: tok.text }} data-tip={tip}>{v}</span></td>;
  };

  return (
    <div className="tbl-card" style={{ overflow: "auto" }}>
      <table className="mp-heat">
        <thead>
          <tr>
            <th className="l first" onClick={() => onSort("emp")}>Empresa<SA k="emp" /></th>
            {MDd.DIMS.map((d) => (
              <th key={d.key} onClick={() => onSort(d.key)} data-tip={`${d.name}|${d.q}|click para ordenar el portafolio por esta dimensión`}>{d.code}<SA k={d.key} /></th>
            ))}
            <th onClick={() => onSort("overall")}>Score<SA k="overall" /></th>
            <th onClick={() => onSort("valor")} className="val">Val<SA k="valor" /></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ e, m }) => (
            <tr className="hrow" key={e.id}>
              <td className="first" onClick={() => onSelect(e.id)}>{e.nombre}</td>
              {MDd.DIMS.map((d) => {
                const v = m.sinMapa ? null : m.scoreByKey[d.key];
                return <React.Fragment key={d.key}>{cell(v, `${e.nombre} · ${d.name}|Score ${v == null ? "s/d" : v} /100|${d.q}`)}</React.Fragment>;
              })}
              {cell(m.sinMapa ? null : m.overall, `${e.nombre}|Score general ${m.sinMapa ? "s/d" : m.overall} /100|Propósito ponderado ×1.5`, true)}
              <td className="val">{PFd.fmtUsd(e.valuacion)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="first">Promedio</td>
            {MDd.DIMS.map((d) => <React.Fragment key={d.key}>{cell(avgs[d.key], `${d.name} · promedio portafolio|${avgs[d.key]} /100|salud agregada — debilidades sistémicas`)}</React.Fragment>)}
            {cell(avgs.overall, `Score general · promedio|${avgs.overall} /100`, true)}
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ---------- dashboard completo ---------- */
function MapasDashboard({ onSelect }) {
  const [cohort, setCohort] = useStateD("Todos");
  return (
    <div>
      <HealthKpis />
      <div className="sec-head">
        <div className="sh-l"><div><span className="sec-num">01</span><h2>Matriz de decisión &amp; geografía</h2></div>
          <div className="sh-sub">Salud × impacto, tamaño por exposición · y dónde vive el portafolio en LatAm.</div></div>
        <div className="sec-tools">
          <span className="p-eyebrow" style={{ marginRight: 2 }}>Cohort</span>
          <div className="seg">
            {["Todos", "C1", "C2", "C3"].map((c) => <button key={c} data-active={cohort === c} onClick={() => setCohort(c)}>{c}</button>)}
          </div>
        </div>
      </div>
      <div className="mp-dgrid" style={{ marginBottom: 30 }}>
        <DecisionMatrix onSelect={onSelect} cohort={cohort} />
        <GeoPanel onSelect={onSelect} cohort={cohort} />
      </div>

      <div className="sec-head"><div className="sh-l"><div><span className="sec-num">02</span><h2>Live feed · novedades por empresa</h2></div>
        <div className="sh-sub">Tablero Kanban, una columna por empresa · agregá con <b>+</b> lo que salga de conversaciones con los founders.</div></div></div>
      <div style={{ marginBottom: 30 }}><LiveFeed onSelect={onSelect} /></div>

      <div className="sec-head"><div className="sh-l"><div><span className="sec-num">03</span><h2>Comparativo · 7 dimensiones por empresa</h2></div>
        <div className="sh-sub">Click en una dimensión para ordenar el portafolio · click en una empresa para abrir su ficha · la fila inferior es el promedio.</div></div></div>
      <Heatmap onSelect={onSelect} />
      <div className="legend" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", fontSize: 11, color: "var(--p-muted)", margin: "10px 2px 0" }}>
        <span className="tag-pill" style={{ background: "var(--semaforo-verde-soft)", color: "var(--semaforo-verde-text)" }}>≥70</span>
        <span className="tag-pill" style={{ background: "var(--semaforo-amarillo-soft)", color: "var(--semaforo-amarillo-text)" }}>55–69</span>
        <span className="tag-pill" style={{ background: "var(--semaforo-rojo-soft)", color: "var(--semaforo-rojo-text)" }}>&lt;55</span>
        <span>· Pr Propósito · Sa Salud · Ca Capital · Im Impacto · St Storytelling · Eq Equipo · Bi Bienestar</span>
      </div>
    </div>
  );
}

window.MapaDashboard = { MapasDashboard, FloatTip };
