/* ============================================================
   VALIDACION EXTERNA · la balanza por tema (2026-09-29)
   Una fila por tema con su veredicto, la balanza de quien preocupa y quien
   valida, y la cita que decide. Clic en una inicial abre la cita de esa
   persona y las flechas pasan por todas las citas del tema.
   Datos del caso en VALIDACION_EXTERNA, con dos campos propios del formato.
   voces  { autor: { ini, vinculo, nivel 0 a 5 } }, 0 es sin vinculo
   temas  [ { t, dims:[...], veredicto, decide: indice en la lista completa } ]
   Sin temas, agrupa por el campo dim de cada opinion.
   ============================================================ */
function renderValidacion(){
 const v = VALIDACION_EXTERNA;
 const all = [].concat(v.expertos || [], v.clientes || [], v.inversionistas || []);
 const voces = v.voces || {};
 const iniOf = a => (voces[a] && voces[a].ini) || String(a).replace(/&[a-z]+;/g, '').split(' ').filter(w => w.length > 2).map(w => w[0].toUpperCase()).join('').slice(0, 2);
 let temas = v.temas;
 if (!temas || !temas.length) { const seen = {}; temas = []; all.forEach(q => { if (!seen[q.dim]) { seen[q.dim] = { t: q.dim, dims: [q.dim] }; temas.push(seen[q.dim]); } }); }
 const strip = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d.textContent; };
 const autores = [];
 all.forEach(q => { if (autores.indexOf(q.autor) < 0) autores.push(q.autor); });
 autores.sort((a, b) => ((voces[a] || {}).nivel || 0) - ((voces[b] || {}).nivel || 0));
 const lvl = n => '<span class="vb-lv" title="Vínculo ' + n + ' de 5">' + [0,1,2,3,4].map(i => '<i class="' + (i < n ? 'on' : '') + '"></i>').join('') + '</span>';
 let h = '<div class="vb-voces"><span class="eb">Quién habló, de la voz más independiente a la de más vínculo</span><div class="vb-voces-in">'
  + autores.map(a => { const vo = voces[a] || {}; return '<div class="vb-voz"><span class="vb-ini">' + iniOf(a) + '</span><span class="vb-voz-t"><b>' + a + '</b><span>' + (vo.vinculo || '') + '</span>' + lvl(vo.nivel || 0) + '</span></div>'; }).join('') + '</div></div>';
 h += '<div class="vb-rows">';
 temas.forEach((t, ti) => {
  const qs = all.map((q, i) => ({ q, i })).filter(o => t.dims.indexOf(o.q.dim) >= 0 || t.dims.indexOf(strip(o.q.dim)) >= 0);
  const pre = qs.filter(o => o.q.sn === 'pre'), val = qs.filter(o => o.q.sn !== 'pre');
  const order = pre.concat(val);
  let start = order.findIndex(o => o.i === t.decide); if (start < 0) start = 0;
  const chip = (o, k) => '<button type="button" class="vb-chip ' + (o.q.sn === 'pre' ? 'c-r' : 'c-g') + '" data-k="' + k + '" title="' + strip(o.q.autor) + '" aria-label="Ver la cita de ' + strip(o.q.autor) + '">' + iniOf(o.q.autor) + '</button>';
  const nl = (n, s, p) => n + ' ' + (n === 1 ? s : p);
  h += '<div class="vb-row" data-t="' + ti + '" data-start="' + start + '">'
   + '<div class="vb-t"><b>' + t.t + '</b>' + (t.veredicto ? '<span>' + t.veredicto + '</span>' : '') + '</div>'
   + '<div class="vb-bal"><div class="vb-side l">' + pre.map((o, k) => chip(o, k)).join('') + '</div><i class="vb-mid"></i><div class="vb-side">' + val.map((o, k) => chip(o, pre.length + k)).join('') + '</div>'
   + '<div class="vb-lab"><span class="sc-r">' + nl(pre.length, 'preocupa', 'preocupan') + '</span><span class="sc-g">' + nl(val.length, 'valida', 'validan') + '</span></div></div>'
   + '<div class="vb-q"><div class="vb-q-in"></div><div class="vb-nav"><button type="button" class="vb-prev" aria-label="Cita anterior">&larr;</button><span class="vb-pos"></span><button type="button" class="vb-next" aria-label="Cita siguiente">&rarr;</button></div></div>'
   + '</div>';
  window.__vbData = window.__vbData || []; window.__vbData[ti] = order.map(o => o.q);
 });
 h += '</div>';
 const body = document.getElementById('validacion-body');
 body.innerHTML = h;
 const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function show(row, k, anim){
  const list = window.__vbData[+row.dataset.t]; k = (k + list.length) % list.length; row.dataset.k = k;
  const q = list[k], box = row.querySelector('.vb-q-in');
  box.innerHTML = '<span class="vb-tag ' + (q.sn === 'pre' ? 'tr' : 'tg') + '">' + (q.sn === 'pre' ? 'Preocupa' : 'Valida') + '</span>'
   + '<p class="vb-cita">«' + q.quote + '»</p>'
   + '<p class="vb-quien"><b>' + q.autor + '</b> &middot; ' + q.rol + '</p>'
   + (q.ev ? '<details class="vb-ev"><summary>Cómo leerla</summary><p>' + q.ev + '</p><p class="vb-org">' + q.org + ' &middot; ' + q.fecha + '</p></details>' : '');
  row.querySelector('.vb-pos').textContent = (k + 1) + ' de ' + list.length;
  row.querySelector('.vb-q').classList.toggle('vb-solo', list.length < 2);
  [].forEach.call(row.querySelectorAll('.vb-chip'), c => c.classList.toggle('on', +c.dataset.k === k));
  if (anim && !reduce && box.animate) box.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
 }
 [].forEach.call(body.querySelectorAll('.vb-row'), r => show(r, +r.dataset.start, false));
 body.addEventListener('click', e => {
  const row = e.target.closest('.vb-row'); if (!row) return;
  const c = e.target.closest('.vb-chip'); if (c) { show(row, +c.dataset.k, true); return; }
  if (e.target.closest('.vb-prev')) show(row, +row.dataset.k - 1, true);
  if (e.target.closest('.vb-next')) show(row, +row.dataset.k + 1, true);
 });
}

