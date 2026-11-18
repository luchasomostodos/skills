/* LuchIA Portafolio — Sección 5: control legal EDITABLE por empresa
   - documentos: agregar al set requerido + click para cambiar estado
   - banderas / updates: agregar pendientes ruteados a un responsable
   - eventos: registrar cambios (p.ej. inversión a valuación más alta) que
     se gestionan en el área que corresponde (Legal / Finanzas / Deal / …)
   Los cambios persisten en localStorage (sesión de iteración). */
const PFl = window.PFmt;
const PDl = window.PORT;
const PSl = window.PortShell;
const { useState: useStateL, useEffect: useEffectL } = React;

const DOC_CYCLE = ["vacio", "draft", "pendiente", "sinfirma", "firmado", "completo"];
const SEM_OF_DOC = { verde: "var(--semaforo-verde)", amarillo: "var(--semaforo-amarillo)", rojo: "var(--semaforo-rojo)", gris: "var(--semaforo-gris)" };
const EVENT_KINDS = [
  { id: "val",   label: "Valuación ↑",        area: "fin" },
  { id: "ronda", label: "Nueva ronda / SAFE", area: "legal" },
  { id: "exit",  label: "Exit / salida",      area: "exit" },
  { id: "legal", label: "Cambio legal / doc", area: "legal" },
  { id: "stake", label: "Hito de stake",      area: "deal" },
  { id: "team",  label: "Equipo / founder",   area: "estudio" },
  { id: "otro",  label: "Otro",               area: "deal" },
];
const KIND_BY_ID = Object.fromEntries(EVENT_KINDS.map((k) => [k.id, k]));
const LS_KEY = "port2-legal-edits";

function loadEdits() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; } }

function DocChip({ name, state, required, onCycle }) {
  const st = PDl.DOC_STATES[state] || PDl.DOC_STATES.vacio;
  return (
    <span className="doc-chip editable" onClick={onCycle} title="Click para cambiar estado">
      <span className="dglyph" style={{ background: SEM_OF_DOC[st.sem] }}>{st.glyph}</span>
      {name}{required && <span className="doc-req" title="Documento requerido">★</span>} <span className="dst">· {st.label}</span>
    </span>
  );
}

function LegalSection({ empresas, pend }) {
  const [edits, setEdits] = useStateL(loadEdits);
  const [open, setOpen] = useStateL(null);   // { id, mode: 'doc'|'flag'|'event' }
  const [draft, setDraft] = useStateL({});
  useEffectL(() => { try { localStorage.setItem(LS_KEY, JSON.stringify(edits)); } catch (e) {} }, [edits]);

  const getX = (id) => edits[id] || {};
  const mutate = (id, fn) => setEdits((prev) => {
    const cur = { docState: {}, addedDocs: [], flags: [], events: [], ...(prev[id] || {}) };
    return { ...prev, [id]: fn({ ...cur, docState: { ...cur.docState }, addedDocs: [...cur.addedDocs], flags: [...cur.flags], events: [...cur.events] }) };
  });

  const docList = (e) => [...PDl.CORE_DOCS.map((d) => ({ name: d, required: false })), ...(getX(e.id).addedDocs || []).map((d) => ({ name: d, required: true }))];
  const docState = (e, name) => { const x = getX(e.id); return (x.docState && x.docState[name]) || e.docs[name] || "vacio"; };
  const combinedFlags = (e) => [...e.flags, ...(getX(e.id).flags || [])];
  const events = (e) => getX(e.id).events || [];
  const today = () => new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "short" }).replace(".", "");

  const cycleDoc = (e, name) => { const order = DOC_CYCLE; const cur = docState(e, name); const next = order[(order.indexOf(cur) + 1) % order.length]; mutate(e.id, (x) => ({ ...x, docState: { ...x.docState, [name]: next } })); };
  const startAdd = (id, mode) => {
    setOpen({ id, mode });
    if (mode === "doc") setDraft({ name: "", state: "pendiente" });
    if (mode === "flag") setDraft({ text: "", area: "legal", estado: "abierto" });
    if (mode === "event") setDraft({ title: "", kind: "val", area: KIND_BY_ID.val.area, detail: "" });
  };
  const submit = (e) => {
    if (open.mode === "doc" && draft.name.trim()) mutate(e.id, (x) => ({ ...x, addedDocs: x.addedDocs.includes(draft.name.trim()) ? x.addedDocs : [...x.addedDocs, draft.name.trim()], docState: { ...x.docState, [draft.name.trim()]: draft.state } }));
    if (open.mode === "flag" && draft.text.trim()) mutate(e.id, (x) => ({ ...x, flags: [...x.flags, { id: "U-" + Date.now().toString().slice(-4), queFalta: draft.text.trim(), area: draft.area, dueno: PDl.RESP_BY_ID[draft.area].owner, estado: draft.estado, manual: true }] }));
    if (open.mode === "event" && draft.title.trim()) mutate(e.id, (x) => ({ ...x, events: [{ id: "EV-" + Date.now().toString().slice(-4), title: draft.title.trim(), kind: draft.kind, area: draft.area, detail: draft.detail.trim(), date: today() }, ...x.events] }));
    setOpen(null);
  };

  const respLabel = pend ? PDl.RESP_BY_ID[pend] : null;
  const ordered = [...empresas].sort((a, b) => {
    if (!pend) return 0;
    const am = combinedFlags(a).some((f) => f.area === pend) ? 0 : 1;
    const bm = combinedFlags(b).some((f) => f.area === pend) ? 0 : 1;
    return am - bm;
  });

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sh-l">
          <div><span className="sec-num">05</span><h2>Control legal por empresa</h2></div>
          <div className="sh-sub">
            Estado de los documentos requeridos y banderas abiertas — <b>editable</b>: agregá documentos, levantá banderas y registrá eventos que cambian la empresa.
            {respLabel ? <> Resaltando pendientes de <b>{respLabel.label} · {respLabel.owner}</b>.</> : <> Usá los chips de arriba para resaltar por responsable.</>}
          </div>
        </div>
      </div>

      {ordered.length === 0 ? (
        <div className="tbl-card"><div className="empty-state"><span className="es-ico">⌕</span>Sin resultados.</div></div>
      ) : (
      <div className="legal-grid">
        {ordered.map((e) => {
          const flags = combinedFlags(e);
          const dimmed = pend && !flags.some((f) => f.area === pend);
          const semColor = PDl.LEGAL_SEM[e.semLegal];
          const evs = events(e);
          const isOpen = open && open.id === e.id;
          return (
            <div className={`legal-card ${dimmed ? "dimmed" : ""}`} key={e.id}>
              <div className="legal-top">
                <div>
                  <div className="lt-nm">{e.nombre}{e.exit && <span className="badge-exit">exit?</span>}</div>
                  <div className="lt-sub">{e.legal}</div>
                </div>
                <span className="lt-status" style={{ background: "var(--p-card-2)", color: "var(--p-ink)", border: "1px solid var(--p-hairline)" }}>
                  <span className="sem-dot" style={{ background: semColor }} />{PDl.LEGAL_LABEL[e.semLegal]}
                </span>
              </div>

              <div className="docs-row">
                {docList(e).map((d) => <DocChip key={d.name} name={d.name} required={d.required} state={docState(e, d.name)} onCycle={() => cycleDoc(e, d.name)} />)}
                <button className="legal-add" onClick={() => startAdd(e.id, "doc")}>+ Documento</button>
              </div>

              {/* composer */}
              {isOpen && (
                <div className="legal-compose">
                  {open.mode === "doc" && <>
                    <input autoFocus placeholder="Nombre del documento (p. ej. NDA, Convenio…)" value={draft.name} onChange={(ev) => setDraft((d) => ({ ...d, name: ev.target.value }))} />
                    <div className="lc-row">
                      <select value={draft.state} onChange={(ev) => setDraft((d) => ({ ...d, state: ev.target.value }))}>
                        {Object.keys(PDl.DOC_STATES).map((k) => <option key={k} value={k}>{PDl.DOC_STATES[k].label}</option>)}
                      </select>
                      <span className="lc-hint">se agrega como requerido ★</span>
                    </div>
                  </>}
                  {open.mode === "flag" && <>
                    <textarea autoFocus placeholder="Qué falta / qué cambió…" value={draft.text} onChange={(ev) => setDraft((d) => ({ ...d, text: ev.target.value }))} />
                    <div className="lc-row">
                      <select value={draft.area} onChange={(ev) => setDraft((d) => ({ ...d, area: ev.target.value }))}>
                        {PDl.RESPONSABLES.map((r) => <option key={r.id} value={r.id}>{r.label} · {r.owner}</option>)}
                      </select>
                      <select value={draft.estado} onChange={(ev) => setDraft((d) => ({ ...d, estado: ev.target.value }))}>
                        <option value="abierto">abierto</option><option value="cerrado">cerrado</option>
                      </select>
                    </div>
                  </>}
                  {open.mode === "event" && <>
                    <input autoFocus placeholder="Evento (p. ej. Inversión a valuación más alta)" value={draft.title} onChange={(ev) => setDraft((d) => ({ ...d, title: ev.target.value }))} />
                    <div className="lc-row">
                      <select value={draft.kind} onChange={(ev) => { const k = ev.target.value; setDraft((d) => ({ ...d, kind: k, area: KIND_BY_ID[k].area })); }}>
                        {EVENT_KINDS.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
                      </select>
                      <select value={draft.area} onChange={(ev) => setDraft((d) => ({ ...d, area: ev.target.value }))}>
                        {PDl.RESPONSABLES.map((r) => <option key={r.id} value={r.id}>→ {r.label}</option>)}
                      </select>
                    </div>
                    <input placeholder="Detalle (opcional)" value={draft.detail} onChange={(ev) => setDraft((d) => ({ ...d, detail: ev.target.value }))} />
                  </>}
                  <div className="lc-row end">
                    <button className="lc-btn ghost" onClick={() => setOpen(null)}>Cancelar</button>
                    <button className="lc-btn" onClick={() => submit(e)}>Guardar</button>
                  </div>
                </div>
              )}

              {/* banderas */}
              <div className="legal-sub-h">Banderas <button className="legal-add sm" onClick={() => startAdd(e.id, "flag")}>+ Bandera</button></div>
              {flags.length === 0 ? (
                <div className="flags-empty">Sin banderas abiertas.</div>
              ) : (
                <div className="flags-list">
                  {flags.map((f) => {
                    const r = PDl.RESP_BY_ID[f.area];
                    const hl = pend && f.area === pend;
                    return (
                      <div className={`flag-item ${hl ? "hl" : ""}`} key={f.id}>
                        <span className="fid" style={f.manual ? { background: "var(--p-mint)", color: "var(--p-ink)" } : null}>{f.id}</span>
                        <div className="ftext">
                          {f.queFalta}
                          <div className="fmeta">{r.label} · {f.dueno} · <span style={{ color: f.estado === "cerrado" ? "var(--semaforo-verde-text)" : "var(--semaforo-rojo-text)" }}>{f.estado}</span></div>
                        </div>
                        <span className="tag-pill farea" style={{ background: "var(--p-accent-soft)", color: "var(--p-ink)" }}>{r.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* eventos */}
              <div className="legal-sub-h">Eventos <button className="legal-add sm" onClick={() => startAdd(e.id, "event")}>+ Evento</button></div>
              {evs.length === 0 ? (
                <div className="flags-empty">Sin eventos registrados. Registrá cambios (valuación, ronda, exit…) para rutearlos al área que corresponde.</div>
              ) : (
                <div className="ev-list">
                  {evs.map((ev) => {
                    const r = PDl.RESP_BY_ID[ev.area];
                    return (
                      <div className="ev-item" key={ev.id}>
                        <span className="ev-date">{ev.date}</span>
                        <div className="ev-body">
                          <div className="ev-head"><span className="ev-kind">{KIND_BY_ID[ev.kind] ? KIND_BY_ID[ev.kind].label : "Evento"}</span><span className="ev-title">{ev.title}</span></div>
                          {ev.detail && <div className="ev-detail">{ev.detail}</div>}
                          <div className="ev-route">→ gestionar en <b>{r.label}</b> · {r.owner}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}

window.PortLegal = LegalSection;
