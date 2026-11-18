/* LuchIA · Mapas Luchantes — Vista 2: ficha de empresa (canvas BMC) · EDITABLE */
const { useState: useStateF, useEffect: useEffectF } = React;
const PFf = window.PFmt;
const PDf = window.PORT;
const MDf = window.MAPA;

const SEM_LABEL = { g: "Verde · ≥70", y: "Amarillo · 55–69", r: "Rojo · <55", x: "Sin mapa" };
const STATUS_SEM = { "Done": "g", "En progreso": "y", "Stuck": "r", "Sin iniciar": "x" };
const STATUS_CYCLE = ["Sin iniciar", "Stuck", "En progreso", "Done"];
const LS_FICHA = "mapa-ficha-edits";
function loadFicha() { try { return JSON.parse(localStorage.getItem(LS_FICHA)) || {}; } catch (e) { return {}; } }

function HeartIcon() {
  return (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21s-7.5-4.6-10-9.2C.3 8.4 1.8 5 5.2 5c2 0 3.3 1.1 4 2.2C9.8 6.1 11.2 5 13.2 5c3.4 0 4.9 3.4 3.2 6.8C18.5 16.4 12 21 12 21z" /></svg>);
}
function SecIcon({ d }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>);
}
const ICONS = {
  insight: "M9 18h6 M10 22h4 M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z",
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
  focos: "M5 12h14 M13 6l6 6-6 6",
  deal: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  method: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  trend: "M3 17l6-6 4 4 8-8 M14 7h7v7",
};

/* ---------- bloque del canvas (no editable: viene del corte del Mapa) ---------- */
function Block({ d }) {
  return (
    <div className={"mp-bk " + d.sem + (d.center ? " mp-center" : "")} style={{ gridArea: d.center ? "center" : d.key }}>
      {d.center ? (
        <>
          <span className="mp-heart"><HeartIcon /></span>
          <div className="mp-bk-t">{d.name}</div>
          <div className="mp-bk-q">{d.q}</div>
          <div className="mp-bk-s">{d.score}<small>/100</small></div>
        </>
      ) : (
        <div className="mp-bk-h">
          <div style={{ minWidth: 0 }}><div className="mp-bk-t">{d.name}</div><div className="mp-bk-q">{d.q}</div></div>
          <div className="mp-bk-s">{d.score}<small>/100</small></div>
        </div>
      )}
      <div className="mp-subs">
        {d.subs.length === 0 ? <div className="mp-bk-empty">Sin datos cuanti</div> :
          d.subs.map((s, i) => (
            <div className={"mp-su " + s.sem} key={i}>
              <span className="mp-su-n">{s.name}</span>
              <span className="mp-su-raw">{s.raw}</span>
              <span className="mp-su-sc" data-tip={`${s.name}|${s.desc[0]}|score ${s.score}/100 · ${s.desc[1]}`}>{s.score}<small>/100</small></span>
            </div>
          ))}
      </div>
    </div>
  );
}

/* ---------- ficha completa ---------- */
function MapaFicha({ id, onBack }) {
  const e = PDf.byId[id];
  const m = MDf.get(id);
  const [edits, setEdits] = useStateF(loadFicha);
  const [open, setOpen] = useStateF(null);   // bloque con composer abierto
  const [draft, setDraft] = useStateF({});
  useEffectF(() => { try { localStorage.setItem(LS_FICHA, JSON.stringify(edits)); } catch (err) {} }, [edits]);
  if (!e) return null;
  const tok = MDf.SEM_TOKEN[m.sem];
  const x = edits[id] || {};

  const blk = (block) => (x[block] || { add: [], rm: [] });
  const items = (block, base) => {
    const b = blk(block);
    const all = [...base.map((it, i) => ({ key: "b" + i, it })), ...(b.add || []).map((it, i) => ({ key: "a" + i, it, added: true }))];
    return all.filter((o) => !(b.rm || []).includes(o.key));
  };
  const mutate = (block, fn) => setEdits((p) => {
    const cur = { add: [], rm: [], ...((p[id] || {})[block] || {}) };
    return { ...p, [id]: { ...(p[id] || {}), [block]: fn({ add: [...cur.add], rm: [...cur.rm] }) } };
  });
  const removeItem = (block, key) => mutate(block, (b) => (b.rm.includes(key) ? b : { ...b, rm: [...b.rm, key] }));
  const startAdd = (block, seed) => { setOpen(block); setDraft(seed); };
  const saveAdd = (block, item) => { mutate(block, (b) => ({ ...b, add: [...b.add, item] })); setOpen(null); };

  const pilStatus = (name, base) => (x.pilares && x.pilares[name]) || base;
  const cyclePil = (name, base) => setEdits((p) => {
    const cur = (p[id] && p[id].pilares) || {};
    const c = cur[name] || base;
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(c) + 1) % STATUS_CYCLE.length];
    return { ...p, [id]: { ...(p[id] || {}), pilares: { ...cur, [name]: next } } };
  });

  const AddBtn = ({ block, seed }) => <button className="mp-add" onClick={() => startAdd(block, seed)}>+ Agregar</button>;
  const Rm = ({ block, k }) => <button className="mp-rm" title="Quitar" onClick={() => removeItem(block, k)}>×</button>;

  if (m.sinMapa) {
    return (
      <div>
        <div className="mp-crumb"><a onClick={onBack}>← Mapas Luchantes</a> &nbsp;/&nbsp; {e.nombre}</div>
        <div className="mp-diag" style={{ "--mp-diag-sem": "var(--semaforo-gris)" }}>
          <div>
            <div className="mp-diag-name">{e.nombre}{e.exit && <span className="badge-exit">exit?</span>}</div>
            <div className="mp-diag-meta">{e.sector} · Cohort {e.cohorte} · {m.geo.city}, {m.geo.pais}</div>
            <div className="mp-diag-text">Sin Mapa Luchante en el corte Q1’26 — {e.exit ? "empresa en proceso de exit" : "entrada reciente al portafolio"}. La posición financiera se sigue abajo.</div>
          </div>
          <div className="mp-diag-score"><div className="n" style={{ color: "var(--p-faint)" }}>·</div><div className="t" style={{ background: "var(--semaforo-gris-soft)", color: "var(--semaforo-gris-text)" }}><span className="d" style={{ background: "var(--semaforo-gris)" }} />Sin mapa</div></div>
        </div>
        <div className="mp-h"><span className="ic"><SecIcon d={ICONS.trend} /></span>Métricas · desempeño de la empresa</div>
        {window.MapaMetrics && <window.MapaMetrics e={e} m={m} />}
      </div>
    );
  }

  return (
    <div>
      <div className="mp-crumb"><a onClick={onBack}>← Mapas Luchantes</a> &nbsp;/&nbsp; Ficha de empresa</div>

      {/* (a) cabecera diagnóstica */}
      <div className="mp-diag" style={{ "--mp-diag-sem": tok.fill, background: `color-mix(in srgb, ${tok.soft} 55%, var(--p-card))`, borderColor: `color-mix(in srgb, ${tok.fill} 35%, var(--p-border))` }}>
        <div>
          <div className="mp-diag-name">{e.nombre}{e.exit && <span className="badge-exit">exit?</span>}</div>
          <div className="mp-diag-meta">Q1 2026 · Cohort {e.cohorte} · {m.activeSecs}/7 secciones activas · {m.geo.city}, {m.geo.pais}</div>
          <div className="mp-diag-text">{m.diag}</div>
          <div className="mp-diag-mode"><span className="d" />Modo sugerido: {m.quad.label}</div>
        </div>
        <div className="mp-diag-score">
          <div className="n">{m.overall}</div>
          <div className="t" style={{ background: tok.soft, color: tok.text }}><span className="d" style={{ background: tok.fill }} />{SEM_LABEL[m.sem]}</div>
        </div>
      </div>

      {/* (b) canvas BMC */}
      <div className="mp-bmc">{m.dims.map((d) => <Block key={d.key} d={d} />)}</div>

      {/* (c) bloques cualitativos — editables */}
      <div className="mp-h"><span className="ic"><SecIcon d={ICONS.insight} /></span>Insights<AddBtn block="insights" seed={{ tag: "Fortaleza", bt: "", bd: "" }} /></div>
      {open === "insights" && (
        <div className="legal-compose" style={{ marginBottom: 12 }}>
          <div className="lc-row">
            <select value={draft.tag} onChange={(ev) => setDraft((d) => ({ ...d, tag: ev.target.value }))}>{["Fortaleza", "Riesgo", "Tendencia"].map((t) => <option key={t}>{t}</option>)}</select>
            <input style={{ flex: 2 }} placeholder="Título" value={draft.bt} onChange={(ev) => setDraft((d) => ({ ...d, bt: ev.target.value }))} />
          </div>
          <textarea placeholder="Detalle" value={draft.bd} onChange={(ev) => setDraft((d) => ({ ...d, bd: ev.target.value }))} />
          <div className="lc-row end"><button className="lc-btn ghost" onClick={() => setOpen(null)}>Cancelar</button><button className="lc-btn" onClick={() => draft.bt.trim() && saveAdd("insights", draft)}>Guardar</button></div>
        </div>
      )}
      <div className="mp-grid3">
        {items("insights", m.insights).map((o) => (
          <div className="mp-box mp-editable" key={o.key}><Rm block="insights" k={o.key} /><span className="tag">{o.it.tag}</span><div className="bt">{o.it.bt}</div><div className="bd">{o.it.bd}</div></div>
        ))}
      </div>

      <div className="mp-h"><span className="ic"><SecIcon d={ICONS.flag} /></span>Banderas críticas<AddBtn block="banderas" seed={{ tipo: "crit", titulo: "", detalle: "" }} /></div>
      {open === "banderas" && (
        <div className="legal-compose" style={{ marginBottom: 12 }}>
          <div className="lc-row">
            <select value={draft.tipo} onChange={(ev) => setDraft((d) => ({ ...d, tipo: ev.target.value }))}><option value="crit">crítica</option><option value="info">info</option></select>
            <input style={{ flex: 2 }} placeholder="Título de la bandera" value={draft.titulo} onChange={(ev) => setDraft((d) => ({ ...d, titulo: ev.target.value }))} />
          </div>
          <input placeholder="Detalle / dueño" value={draft.detalle} onChange={(ev) => setDraft((d) => ({ ...d, detalle: ev.target.value }))} />
          <div className="lc-row end"><button className="lc-btn ghost" onClick={() => setOpen(null)}>Cancelar</button><button className="lc-btn" onClick={() => draft.titulo.trim() && saveAdd("banderas", draft)}>Guardar</button></div>
        </div>
      )}
      {items("banderas", m.banderas).length === 0 ? (
        <div className="mp-box" style={{ color: "var(--p-subtle)", fontSize: 12.5 }}>Sin banderas abiertas este corte.</div>
      ) : (
        <div className="mp-grid2">
          {items("banderas", m.banderas).map((o) => (
            <div className={"mp-box mp-editable " + o.it.tipo} key={o.key}><Rm block="banderas" k={o.key} />
              <div className="bt">{o.it.titulo}{o.it.doc && <span className="bdoc">{o.it.doc}</span>} <span className="note" style={{ fontFamily: "var(--p-num)", fontSize: 10, color: o.it.tipo === "crit" ? "var(--semaforo-rojo-text)" : "var(--p-subtle)" }}>· {o.it.tipo === "crit" ? "crítica" : "info"}</span></div>
              <div className="bd">{o.it.detalle}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mp-grid2" style={{ marginTop: 6 }}>
        <div>
          <div className="mp-h"><span className="ic"><SecIcon d={ICONS.focos} /></span>Focos · próximos 3 meses<AddBtn block="focos" seed={{ t: "" }} /></div>
          {open === "focos" && (
            <div className="legal-compose" style={{ marginBottom: 8 }}><input autoFocus placeholder="Nuevo foco…" value={draft.t} onChange={(ev) => setDraft({ t: ev.target.value })} /><div className="lc-row end"><button className="lc-btn ghost" onClick={() => setOpen(null)}>Cancelar</button><button className="lc-btn" onClick={() => draft.t.trim() && saveAdd("focos", draft.t.trim())}>Guardar</button></div></div>
          )}
          {items("focos", m.focos).map((o) => <div className="mp-li mp-editable" key={o.key}><span className="d" style={{ background: "var(--p-mint)" }} />{typeof o.it === "string" ? o.it : o.it.t}<Rm block="focos" k={o.key} /></div>)}
        </div>
        <div>
          <div className="mp-h"><span className="ic"><SecIcon d={ICONS.flag} /></span>Riesgos clave<AddBtn block="riesgos" seed={{ t: "" }} /></div>
          {open === "riesgos" && (
            <div className="legal-compose" style={{ marginBottom: 8 }}><input autoFocus placeholder="Nuevo riesgo…" value={draft.t} onChange={(ev) => setDraft({ t: ev.target.value })} /><div className="lc-row end"><button className="lc-btn ghost" onClick={() => setOpen(null)}>Cancelar</button><button className="lc-btn" onClick={() => draft.t.trim() && saveAdd("riesgos", draft.t.trim())}>Guardar</button></div></div>
          )}
          {items("riesgos", m.riesgos).map((o) => <div className="mp-li mp-editable" key={o.key}><span className="d" style={{ background: "var(--semaforo-rojo)" }} />{typeof o.it === "string" ? o.it : o.it.t}<Rm block="riesgos" k={o.key} /></div>)}
        </div>
      </div>

      <div className="mp-h"><span className="ic"><SecIcon d={ICONS.deal} /></span>Transacciones críticas y metas Q<AddBtn block="transacciones" seed={{ bt: "", det: "", stage: "Pendiente" }} /></div>
      {open === "transacciones" && (
        <div className="legal-compose" style={{ marginBottom: 12 }}>
          <input autoFocus placeholder="Transacción / meta" value={draft.bt} onChange={(ev) => setDraft((d) => ({ ...d, bt: ev.target.value }))} />
          <div className="lc-row">
            <input style={{ flex: 2 }} placeholder="Detalle" value={draft.det} onChange={(ev) => setDraft((d) => ({ ...d, det: ev.target.value }))} />
            <select value={draft.stage} onChange={(ev) => setDraft((d) => ({ ...d, stage: ev.target.value }))}>{["Pendiente", "En proceso", "Done"].map((s) => <option key={s}>{s}</option>)}</select>
          </div>
          <div className="lc-row end"><button className="lc-btn ghost" onClick={() => setOpen(null)}>Cancelar</button><button className="lc-btn" onClick={() => draft.bt.trim() && saveAdd("transacciones", draft)}>Guardar</button></div>
        </div>
      )}
      <div className="mp-grid4">
        {items("transacciones", m.transacciones).map((o) => (
          <div className="mp-deal mp-editable" key={o.key}><Rm block="transacciones" k={o.key} /><div className="bt">{o.it.bt}</div><div className="det">{o.it.det}</div><span className={"stage " + o.it.stage.replace(/\s/g, "")}>{o.it.stage}</span></div>
        ))}
      </div>

      <div className="mp-h"><span className="ic"><SecIcon d={ICONS.method} /></span>Método LUCHA · status por pilar <span style={{ fontFamily: "var(--p-num)", fontSize: 10, color: "var(--p-subtle)", fontWeight: 400, marginLeft: 4 }}>click para cambiar</span></div>
      <div className="mp-grid7">
        {m.pilares.map((p, i) => {
          const status = pilStatus(p.name, p.status);
          const s = MDf.SEM_TOKEN[STATUS_SEM[status]];
          return <div className="mp-pillar mp-pillar-edit" key={i} onClick={() => cyclePil(p.name, p.status)} title="Click para cambiar estado"><div className="pn">{p.name}</div><div className="ps" style={{ background: s.soft, color: s.text }}><span className="d" style={{ background: s.fill }} />{status}</div></div>;
        })}
      </div>

      {/* (d) métricas — mini-dashboard real */}
      <div className="mp-h"><span className="ic"><SecIcon d={ICONS.trend} /></span>Métricas · desempeño de la empresa <span style={{ fontFamily: "var(--p-num)", fontSize: 10, color: "var(--p-subtle)", fontWeight: 400, marginLeft: 4 }}>negocio + impacto, no nuestra posición</span></div>
      {window.MapaMetrics && <window.MapaMetrics e={e} m={m} />}
    </div>
  );
}

window.MapaFicha = MapaFicha;
