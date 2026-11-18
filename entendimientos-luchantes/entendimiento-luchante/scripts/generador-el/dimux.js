/* ============================================================
   DOBLE CLICK EN TRES CAPAS
   1 · la respuesta en diez segundos (veredicto y que tiene que ser cierto)
   2 · el calculo como dibujo (barra partida por peso, con simulador)
   3 · las subvariables en acordeon, el analisis completo detras
   Mas la pieza propia de I+D (el cerro) y de Equipo (la escalera).
   ============================================================ */
(function(){
 var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var nf = function(v, d){ return v == null || isNaN(v) ? '--' : (d === 0 ? String(Math.round(v)) : v.toFixed(d == null ? 2 : d).replace('.', ',')); };
 var semOf = function(v){ return v == null ? 'x' : v >= 70 ? 'g' : v >= 55 ? 'y' : 'r'; };
 var SEML = { g:'Verde', y:'Amarillo', r:'Rojo', x:'Sin data' };
 var strip = function(h){ var d = document.createElement('div'); d.innerHTML = h || ''; return (d.textContent || '').replace(/\s+/g, ' ').trim(); };

 /* Pesos internos de cada dimension, los mismos de Metodologia y de cada rubrica */
 var WTS = {
  proposito:[100], negocio:[20,10,20,25,15,10], capital:[25,25,20,15,15], mercado:[30,15,25,30],
  impacto:[100], equipo:[20,30,50,0], storytelling:[50,50], bienestar:[50,0,50], resiliencia:[53.33,46.67,0]
 };
 if (typeof ABC !== 'undefined' && ABC.modo === 'vigente') WTS.impacto = ABC_RUBRICA.subs.map(function(r){ return r.peso; });
 var DIMW = typeof pesosEL === 'function' ? pesosEL() : { proposito:12, impacto:15, equipo:15, storytelling:8, bienestar:10, negocio:12, capital:8, mercado:15, resiliencia:5 };
 var SELK = ['proposito','impacto','equipo','storytelling','bienestar'];
 var EVID = { fp_lid:'Lectura interna', ng_prod:'Documento', ng_mod:'Documento', ng_def:'Documento', ng_tech:'Lectura documental', ng_ops:'Documento', ng_partner:'Lectura interna',
  ca_str:'Documento', ca_val:'Documento', ca_cap:'Documento', ca_fwd:'Documento', ca_exit:'Documento', me_tam:'Documento', me_mom:'Documento', me_comp:'Documento', me_fmf:'Documento',
  im_lid:'Lectura interna', im_quien:'Ficha ABC', im_cuanto:'Ficha ABC', im_umbral:'Ficha ABC', im_empresa:'Ficha ABC', im_negocio:'Ficha ABC', im_lucha:'Ficha ABC', eq_self:'Autoevaluación', eq_trib:'Lectura interna', eq_cultura:'Lectura interna', eq_spo:'Lectura interna', st_ceo:'Autoevaluación y auditor', st_cso:'Autoevaluación y auditor',
  bl_pq:'Autoevaluación', bl_co:'Lectura interna', bl_grit:'Autoevaluación', rt_trl:'Documento', rt_ip:'Documento', rt_reg:'No aplica' };
 var SUBSEL = { negocio:'.neg-block', capital:'.cap-block', mercado:'.mkt-sub', resiliencia:'.neg-block', equipo:'.eq-block' };
 var XTITLE = { 'neg-dash':'Indicadores clave', 'cap-callouts':'Los hechos de la ronda', 'imp-lectura-block':'Lectura para este caso', 'dim-body':'Qué dijo el founder' };

 function scoreOf(key, sims){
  var sec = SECTIONS[key], w = WTS[key] || [], s = 0, t = 0;
  sec.subs.forEach(function(sb, i){ var v = sims && sims[i] != null ? sims[i] : sb.score; var wi = w[i] || 0; if (v != null && wi) { s += v * wi; t += wi; } });
  return t ? s / t : sec.score;
 }
 function totalWith(key, dimScore){
  var s = 0; Object.keys(DIMW).forEach(function(k){ var v = k === key ? dimScore : SECTIONS[k].score; if (v != null) s += v * DIMW[k] / 100; }); return s;
 }
 function halfWith(key, dimScore){
  var keys = SELK.indexOf(key) >= 0 ? SELK : Object.keys(DIMW).filter(function(k){ return SELK.indexOf(k) < 0; });
  var s = 0, w = 0; keys.forEach(function(k){ var v = k === key ? dimScore : SECTIONS[k].score; if (v != null) { s += v * DIMW[k]; w += DIMW[k]; } });
  return { name: SELK.indexOf(key) >= 0 ? 'Selección' : 'Retorno', v: w ? s / w : null };
 }

 function verdict(key){
  var t = DIM_TITLES[key] || ''; var p = t.split(' · '); p.shift(); t = p.join(' · ').split(';')[0].trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) + (/[.]$/.test(t) ? '' : '.') : '';
 }
 function mustBeTrue(key){
  var txt = strip(DIM_CONCLUSION[key]); var i = txt.indexOf('¿Qué tiene que ser cierto'); if (i < 0) return [];
  var rest = txt.slice(txt.indexOf('?', i) + 1).trim();
  var m = rest.search(/\.\s+[A-ZÁÉÍÓÚÑ¿]/); if (m > 0) rest = rest.slice(0, m);
  rest = rest.replace(/[.]$/, '').split(/,\s*porque\s/i)[0];
  return rest.split(/,\s*(?:y\s+)?que\s+/i).map(function(x){ x = x.replace(/^que\s+/i, '').trim(); return x.charAt(0).toUpperCase() + x.slice(1); }).filter(function(x){ return x.length > 6; });
 }
 function oneLiner(sb){
  if (!sb.por) return '';
  var d = document.createElement('div'); d.innerHTML = sb.por;
  var st = d.querySelector('strong');
  if (st && d.innerHTML.trim().indexOf('<strong>') === 0) return st.textContent.trim();
  var t = d.textContent.trim(); var k = t.search(/\.\s/); return k > 0 ? t.slice(0, k + 1) : t;
 }


 /* Bloques en formato estructurado (datos en struct.js):
    tesis, cifras con visual, visuales del original, puntos, tablas, llamados y nota. */
 var BARC = { y: 'var(--syD)', n: 'hsl(215 14% 72%)', g: 'var(--sgD)', r: 'var(--srD)' };
 var CALLT = { bad: 'El hallazgo', lev: 'La palanca', ok: 'Lo que sí está', info: 'Para leer bien el dato' };
 function structHtml(d, sem){
  var fig = function(f){
   var viz = '';
   if (f.stack) { var tot = f.stack.reduce(function(a, s){ return a + s[1]; }, 0);
    viz = '<div class="sx-stack">' + f.stack.map(function(s){ return '<span style="flex:' + s[1] + ' 1 0;background:' + s[2] + '" title="' + s[0] + '"></span>'; }).join('') + '</div><div class="sx-stack-l">' + f.stack.map(function(s){ return '<span><i style="background:' + s[2] + '"></i>' + s[0] + '</span>'; }).join('') + '</div>'; }
   if (f.bars) { var max = f.max || Math.max.apply(null, f.bars.map(function(x){ return x.v; }));
    viz = '<div class="sx-bars">' + f.bars.map(function(x){
     var col = BARC[x.c] || BARC.n, wv = Math.max(2, x.v / max * 100);
     var track = x.lo != null ? '<b style="width:' + (x.lo / max * 100) + '%;background:' + col + '"></b><b class="sx-rng" style="left:' + (x.lo / max * 100) + '%;width:' + ((x.v - x.lo) / max * 100) + '%;background:' + col + '"></b>' : '<b style="width:' + wv + '%;background:' + col + '"></b>';
     return '<div class="sx-bar"><span>' + x.l + '</span><div class="sx-bt">' + track + '</div><em>' + x.t + '</em></div>';
    }).join('') + '</div>'; }
   return '<div class="sx-fig"><span class="eb">' + f.k + '</span><b>' + f.v + '</b>' + viz + (f.n ? '<p>' + f.n + '</p>' : '') + '</div>';
  };
  var h = '';
  if (d.tesis) h += '<p class="sx-tesis sxt-' + (sem || 'x') + '">' + d.tesis + '</p>';
  if (d.figs && d.figs.length) h += '<div class="sx-figs n' + Math.min(d.figs.length, 3) + '">' + d.figs.map(fig).join('') + '</div>';
  h += '<div class="sx-keep"></div>';
  if (d.puntos) h += '<div class="sx-sec"><div class="eb">' + d.puntos.t + '</div>' + (d.puntos.intro ? '<p class="sx-intro">' + d.puntos.intro + '</p>' : '')
   + '<ol class="sx-puntos">' + d.puntos.items.map(function(it){ return '<li><b>' + it.b + '</b> ' + it.d + '</li>'; }).join('') + '</ol></div>';
  (d.tablas || []).forEach(function(t){
   var cols = t.head && t.head.length ? t.head.length : (t.rows[0] || []).length;
   var gt = cols === 3 ? 'minmax(150px,1fr) minmax(0,1fr) minmax(0,1.2fr)' : 'minmax(150px,220px) minmax(0,1fr)';
   var row = function(r, cls){ return '<div class="sx-tr' + (cls ? ' ' + cls : '') + '" style="grid-template-columns:' + gt + '">' + r.map(function(c, j){ return '<span' + (t.head && t.head[j] ? ' data-h="' + t.head[j] + '"' : '') + '>' + c + '</span>'; }).join('') + '</div>'; };
   h += '<div class="sx-sec"><div class="eb">' + t.t + '</div><div class="sx-table">'
    + (t.head && t.head.length ? row(t.head, 'sx-th') : '')
    + t.rows.map(function(r, j){ return row(r, t.total && j === t.rows.length - 1 ? 'sx-tot' : ''); }).join('')
    + '</div>' + (t.nota ? '<p class="sx-tnote">' + t.nota + '</p>' : '') + '</div>';
  });
  if (d.calls && d.calls.length) h += '<div class="sx-calls n' + Math.min(d.calls.length, 2) + '">' + d.calls.map(function(c){ return '<div class="sx-call sx-' + c.tipo + '"><span class="eb">' + (c.t || CALLT[c.tipo]) + '</span><p>' + c.p + '</p></div>'; }).join('') + '</div>';
  if (d.nota) h += typeof d.nota === 'string' ? '<p class="sx-note"><b>Lo que esto no dice.</b> ' + d.nota + '</p>' : '<p class="sx-note"><b>' + d.nota.t + '</b> ' + d.nota.p + '</p>';
  return h;
 }

 /* ---------- piezas propias ---------- */
 function mountainSvg(f, idx){
  var W = 520, H = 210, n = 9;
  var pts = []; for (var i = 0; i < n; i++) { var x = 40 + i * (W - 90) / (n - 1); var y = H - 34 - Math.pow(i / (n - 1), 1.25) * (H - 78) + (i % 2 ? 6 : -4); pts.push([x, y]); }
  var lvl = f.nivel || 0, id = 'mt' + idx;
  var ridge = 'M0,' + H + ' L0,' + (H - 26) + ' ' + pts.map(function(p, i){ return 'L' + p[0] + ',' + (p[1] - 16 - (i === n - 1 ? 14 : 0)); }).join(' ') + ' L' + W + ',' + (pts[n - 1][1] + 10) + ' L' + W + ',' + H + ' Z';
  var back = 'M0,' + H + ' L0,' + (H - 60) + ' L90,' + (H - 110) + ' L170,' + (H - 80) + ' L260,' + (H - 150) + ' L350,' + (H - 118) + ' L430,' + (H - 180) + ' L' + W + ',' + (H - 140) + ' L' + W + ',' + H + ' Z';
  var done = pts.slice(0, Math.max(1, lvl)).map(function(p, i){ return (i ? 'L' : 'M') + p[0] + ',' + p[1]; }).join(' ');
  var todo = pts.slice(Math.max(0, lvl - 1)).map(function(p, i){ return (i ? 'L' : 'M') + p[0] + ',' + p[1]; }).join(' ');
  var camps = pts.map(function(p, i){ var on = i < lvl; return '<circle class="mt-camp' + (on ? ' on' : '') + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i === lvl - 1 ? 0 : 4) + '"/><text class="mt-n" x="' + p[0] + '" y="' + (p[1] + 18) + '">' + (i + 1) + '</text>'; }).join('');
  var cur = lvl ? pts[lvl - 1] : null;
  var here = cur ? '<g class="mt-here" data-lvl="' + lvl + '" transform="translate(' + cur[0] + ',' + cur[1] + ')"><circle class="mt-halo" r="13"/><circle class="mt-dot" r="7"/></g>' : '';
  var nxt = lvl && lvl < n ? '<text class="mt-next" x="' + pts[lvl][0] + '" y="' + (pts[lvl][1] - 14) + '">siguiente</text>' : '';
  var peak = '<text class="mt-peak" x="' + pts[n - 1][0] + '" y="' + (pts[n - 1][1] - 34) + '">9 · en operación</text>';
  return '<svg class="mt-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + strip(f.dim) + ', nivel ' + lvl + ' de 9" data-pts=\'' + JSON.stringify(pts.map(function(p){ return [Math.round(p[0]), Math.round(p[1])]; })) + '\'>'
   + '<defs><linearGradient id="' + id + 'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(205 42% 95%)"/><stop offset="1" stop-color="hsl(38 26% 96%)"/></linearGradient></defs>'
   + '<rect width="' + W + '" height="' + H + '" fill="url(#' + id + 'g)"/><path d="' + back + '" class="mt-back"/><path d="' + ridge + '" class="mt-ridge"/>'
   + '<path d="' + todo + '" class="mt-todo"/><path d="' + done + '" class="mt-done"/>' + camps + nxt + peak + here + '</svg>';
 }
 function climb(svg){
  var g = svg.querySelector('.mt-here'); if (!g) return;
  var pts = JSON.parse(svg.getAttribute('data-pts')), lvl = +g.getAttribute('data-lvl');
  if (reduce || !g.animate) return;
  var kf = pts.slice(0, lvl).map(function(p){ return { transform: 'translate(' + p[0] + 'px,' + p[1] + 'px)' }; });
  if (kf.length < 2) return;
  g.style.transform = kf[0].transform; g.removeAttribute('transform');
  var a = g.animate(kf, { duration: 350 * lvl, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'forwards' });
  a.onfinish = function(){ g.style.transform = kf[kf.length - 1].transform; };
 }
 function mountainPiece(){
  var v = RESILIENCIA_BODY.vector; var real = v.filas.filter(function(f){ return f.nivel; });
  var html = '<div class="sig sig-mt"><div class="sig-h"><span class="eb">La ruta de madurez</span><span class="sig-sub">Cada escala va de 1 a 9. El punto verde es donde está hoy.</span></div><div class="mt-grid">';
  real.forEach(function(f, i){ html += '<figure class="mt-fig"><figcaption><b>' + f.dim + '</b><span>' + f.nivel + ' de 9 · ' + f.etiqueta.toLowerCase() + '</span></figcaption>' + mountainSvg(f, i) + '<div class="mt-cap">' + f.que + '. Siguiente, ' + f.sig.replace(/^\d+\s+[A-ZÁÉÍÓÚ]+,\s*/, '') + '.</div></figure>'; });
  v.filas.filter(function(f){ return !f.nivel; }).forEach(function(f){ html += '<div class="mt-na"><b>' + f.dim + '</b><span>No aplica</span><p>' + f.que + '. ' + f.sig + '.</p></div>'; });
  return html + '</div></div>';
 }
 function stairsPiece(){
  var t = EQUIPO_BODY.tribalometro; var W = 700, H = 230, sw = 120, sh = 34, x0 = 30, y0 = H - 24;
  var steps = t.stages.map(function(s, i){ var x = x0 + i * sw, y = y0 - (i + 1) * sh; return '<rect class="st-step' + (i < 2 ? ' veto' : '') + (s.n === t.stageActual ? ' cur' : '') + '" x="' + x + '" y="' + y + '" width="' + sw + '" height="' + ((i + 1) * sh) + '"/>'
   + '<text class="st-n" x="' + (x + 10) + '" y="' + (y + 18) + '">Stage ' + s.n + '</text><text class="st-t" x="' + (x + 10) + '" y="' + (y + 33) + '">' + s.titulo.replace(/'/g, '&#39;') + '</text>'; }).join('');
  var veto = '<text class="st-veto" x="' + (x0 + 8) + '" y="' + (y0 + 16) + '">Stage 1 y 2 activan el veto de la dimensión</text>';
  var fs = (t.foundersOnStage || []).map(function(f, j){ var fx = x0 + (t.stageActual - 1) * sw + 70 + j * 34, fy = y0 - t.stageActual * sh - 18; return '<g class="st-f" data-stage="' + t.stageActual + '" data-j="' + j + '" transform="translate(' + fx + ',' + fy + ')"><circle r="15"/><text dy="4">' + f.initial + '</text></g>'; }).join('');
  return '<div class="sig sig-st"><div class="sig-h"><span class="eb">La escalera del Tribalómetro</span><span class="sig-sub">Dónde está cada founder según su lenguaje en las sesiones. Pesa 30% de la dimensión.</span></div><svg class="st-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Founders en Stage ' + t.stageActual + '" data-sw="' + sw + '" data-sh="' + sh + '" data-x0="' + x0 + '" data-y0="' + y0 + '">' + steps + veto + fs + '</svg></div>';
 }
 function climbStairs(svg){
  var sw = +svg.dataset.sw, sh = +svg.dataset.sh, x0 = +svg.dataset.x0, y0 = +svg.dataset.y0;
  [].forEach.call(svg.querySelectorAll('.st-f'), function(g){
   var st = +g.dataset.stage, j = +g.dataset.j;
   var pos = function(s){ return [x0 + (s - 1) * sw + 70 + j * 34, y0 - s * sh - 18]; };
   var e = pos(st); g.removeAttribute('transform'); g.style.transform = 'translate(' + e[0] + 'px,' + e[1] + 'px)';
   if (reduce || !g.animate) return;
   var kf = []; for (var s = 1; s <= st; s++) { var p = pos(s); if (s > 1) { var q = pos(s - 1); kf.push({ transform: 'translate(' + (q[0] + sw / 2) + 'px,' + (p[1] - 26) + 'px)' }); } kf.push({ transform: 'translate(' + p[0] + 'px,' + p[1] + 'px)' }); }
   g.animate(kf, { duration: 520 * st, delay: j * 180, easing: 'ease-in-out', fill: 'backwards' });
  });
 }

 /* ---------- construir cada tarjeta ---------- */
 var built = {};
 function build(card){
  var key = card.dataset.dimKey, sec = SECTIONS[key]; if (!sec || built[key]) return; built[key] = true;
  var w = WTS[key] || sec.subs.map(function(){ return 0; });
  var head = card.querySelector(':scope > .dim-head'), conc = card.querySelector(':scope > .dim-conclusion'), rub = card.querySelector(':scope > .rubrica');
  var subBlocks = SUBSEL[key] ? [].slice.call(card.querySelectorAll(':scope > ' + SUBSEL[key])) : [];
  var rest = [].slice.call(card.children).filter(function(el){ return el !== head && el !== conc && el !== rub && subBlocks.indexOf(el) < 0 && el.textContent.trim() !== ''; });
  var old = card.querySelector('.eq-tribal-svg'); if (old) old.remove();

  /* capa 1 */
  var l1 = document.createElement('div'); l1.className = 'dx-l1';
  var mb = mustBeTrue(key);
  l1.innerHTML = '<p class="dx-verdict">' + verdict(key) + '</p>' + (mb.length ? '<div class="dx-true"><span class="eb">¿Qué tiene que ser cierto?</span><ul>' + mb.map(function(x){ return '<li>' + x + '</li>'; }).join('') + '</ul></div>' : '');

  /* pieza propia */
  var sig = null;
  if (key === 'resiliencia' && typeof RESILIENCIA_BODY !== 'undefined') { sig = document.createElement('div'); sig.innerHTML = mountainPiece(); sig = sig.firstChild; }
  if (key === 'equipo' && typeof EQUIPO_BODY !== 'undefined') { sig = document.createElement('div'); sig.innerHTML = stairsPiece(); sig = sig.firstChild; }

  /* capa 2 */
  var l2 = document.createElement('div'); l2.className = 'dx-l2';
  var segs = sec.subs.map(function(sb, i){
   var tt = TT[sb.k] || { t: sb.k };
   if (!w[i]) return '';
   var sm = sb.sem, v = sb.score;
   return '<button type="button" class="dx-seg" data-i="' + i + '" style="flex:' + w[i] + ' 1 0" title="' + strip(tt.t) + ' · ' + nf(v, v % 1 ? 1 : 0) + ' · pesa ' + nf(w[i], w[i] % 1 ? 2 : 0) + '%">'
    + '<span class="dx-seg-col"><span class="dx-seg-fill f-' + sm + '" style="height:' + (v || 0) + '%"></span></span>'
    + '<span class="dx-seg-v sc-' + sm + '">' + nf(v, v % 1 ? 1 : 0) + '</span><span class="dx-seg-n">' + tt.t + '</span><span class="dx-seg-w">' + nf(w[i], w[i] % 1 ? 1 : 0) + '% · aporta ' + nf(v * w[i] / 100, 1) + '</span></button>';
  }).join('');
  var multi = sec.subs.filter(function(sb, i){ return w[i] && sb.score != null; }).length > 1;
  l2.innerHTML = '<div class="dx-l2-h"><span class="eb">De dónde sale el ' + nf(sec.score, sec.score % 1 ? 2 : 0) + '</span><span class="dx-l2-s">' + (multi ? 'El ancho de cada columna es su peso y la altura es su puntaje. La línea marca el corte de 70.' : 'Una sola fuente, sin promedio.') + '</span></div>'
   + '<div class="dx-bar">' + segs + '<i class="dx-cut"></i></div>'
   + (multi ? '<button type="button" class="dx-sim-t" aria-expanded="false">Simular qué tendría que ser cierto</button><div class="dx-sim" hidden></div>' : '');

  /* capa 3 */
  var l3 = document.createElement('div'); l3.className = 'dx-l3';
  l3.innerHTML = '<div class="eb">Las subvariables, de una en una</div>';
  sec.subs.forEach(function(sb, i){
   var tt = TT[sb.k] || { t: sb.k, d: '', c: '' };
   var body = document.createElement('div'); body.className = 'dx-row-in';
   var blk = subBlocks[i];
   var sd = typeof STRUCT !== 'undefined' && STRUCT[key] && STRUCT[key][i];
   if (blk && sd) { var hh0 = blk.querySelector(':scope > [class$="-h"]'); if (hh0) hh0.remove(); var sx = document.createElement('div'); sx.className = 'sx'; sx.innerHTML = structHtml(sd, sb.sem); body.appendChild(sx);
    var kp = sx.querySelector('.sx-keep'); (sd.keep || []).forEach(function(sel){ [].slice.call(blk.querySelectorAll(sel)).forEach(function(el){ kp.appendChild(el); }); }); if (!kp.children.length) kp.remove();
    if (blk.textContent.trim()) { var orig = document.createElement('div'); orig.className = 'dx-x sx-orig'; orig.innerHTML = '<button type="button" class="dx-x-h" aria-expanded="false"><span>Ver el texto original</span><span class="dx-car" aria-hidden="true"></span></button><div class="dx-row-b"><div class="dx-row-in"></div></div>';
     var oi = orig.querySelector('.dx-row-in'); while (blk.firstChild) oi.appendChild(blk.firstChild); body.appendChild(orig); }
    blk.remove(); }
   else if (blk) { var hh = blk.querySelector(':scope > [class$="-h"]'); if (hh) hh.remove(); while (blk.firstChild) body.appendChild(blk.firstChild); blk.remove(); }
   else if (sb.por) { var p = document.createElement('div'); p.className = 'dx-por'; p.innerHTML = sb.por; body.appendChild(p); }
   var def = document.createElement('div'); def.className = 'dx-def'; def.innerHTML = (sb.raw ? '<b>' + sb.raw + sb.u + '</b> · ' : '') + tt.d + (tt.c ? ' <span>' + tt.c + '</span>' : ''); body.appendChild(def);
   var row = document.createElement('div'); row.className = 'dx-row'; row.dataset.i = i;
   var ol = oneLiner(sb);
   row.innerHTML = '<button type="button" class="dx-row-h" aria-expanded="false"><span class="dx-dot d-' + sb.sem + '"></span><span class="dx-row-t"><b>' + tt.t + '</b>' + (ol ? '<span class="dx-ol">' + ol + '</span>' : '') + '</span><span class="dx-ev">' + (EVID[sb.k] || '') + '</span><span class="dx-w">' + (w[i] ? nf(w[i], w[i] % 1 ? 1 : 0) + '%' : 'sin peso') + '</span><span class="dx-sc sc-' + sb.sem + '">' + (sb.score == null ? '&middot;' : nf(sb.score, sb.score % 1 ? 1 : 0)) + '</span><span class="dx-car" aria-hidden="true"></span></button><div class="dx-row-b"></div>';
   row.querySelector('.dx-row-b').appendChild(body);
   l3.appendChild(row);
  });
  subBlocks.forEach(function(b){ if (b.parentNode) b.remove(); });

  /* evidencia adicional */
  var more = document.createElement('div'); more.className = 'dx-more';
  var groups = [], cur = null;
  rest.forEach(function(el){
   var c = el.className || '';
   var joinPrev = /^(imp-gate-intro|imp-niveles|imp-regla)/.test(c) || (cur && /(neg-dash-meta|cap-meta)/.test(cur.lead));
   if (cur && joinPrev) { cur.els.push(el); if (/(neg-dash-meta|cap-meta)/.test(cur.lead)) cur.lead = c; return; }
   cur = { lead: c, els: [el] }; groups.push(cur);
  });
  var gateSig = null;
  if (key === 'impacto') { groups = groups.filter(function(g){ if (/imp-gate/.test(g.els[0].className)) { gateSig = g; return false; } return true; }); }
  groups.forEach(function(g, gi){
   var first = g.els[0], lead = g.lead;
   if (key === 'resiliencia' && /neg-charts/.test(first.className)) { var vc = first.querySelector('.neg-chart'); if (vc && /vector/.test(vc.textContent)) vc.remove(); }
   var title = '';
   Object.keys(XTITLE).forEach(function(k){ if (!title && (' ' + lead + ' ').indexOf(' ' + k + ' ') >= 0) title = XTITLE[k]; });
   if (!title && /imp-gate/.test(first.className)) title = 'Gate de Impacto · los cuatro niveles';
   if (!title) { var tEl = first.querySelector('.bie-block-title,.eq-lectura-title,.imp-lectura-title,.neg-chart-title,.col-label'); if (tEl) title = tEl.textContent.trim(); }
   if (!title && first.style && /border-radius:12px/.test(first.getAttribute('style') || '')) title = (first.firstElementChild ? first.firstElementChild.textContent.split('·')[0].trim() : 'Detalle');
   if (!title) title = 'Detalle';
   var x = document.createElement('div'); x.className = 'dx-x';
   var open = !SUBSEL[key] && gi === 0;
   x.innerHTML = '<button type="button" class="dx-x-h" aria-expanded="' + open + '"><span>' + title + '</span><span class="dx-car" aria-hidden="true"></span></button><div class="dx-row-b' + (open ? ' open' : '') + '"><div class="dx-row-in"></div></div>';
   var inner = x.querySelector('.dx-row-in'); g.els.forEach(function(el){ inner.appendChild(el); });
   more.appendChild(x);
  });

  /* conclusion completa, sin repetir la caja de pesos */
  var cx = null;
  if (conc) {
   [].forEach.call(conc.querySelectorAll('div[style*="border-left:3px"]'), function(box){ var ul = box.querySelector('ul'); if (!ul) return; var node = box.firstChild; while (node && node !== ul) { var nx = node.nextSibling; box.removeChild(node); node = nx; } ul.remove(); if (!box.textContent.trim()) box.remove(); });
   cx = document.createElement('div'); cx.className = 'dx-x dx-conc';
   cx.innerHTML = '<button type="button" class="dx-x-h" aria-expanded="false"><span>Leer el análisis completo</span><span class="dx-car" aria-hidden="true"></span></button><div class="dx-row-b"><div class="dx-row-in"></div></div>';
   conc.querySelector('.dc-label') && conc.querySelector('.dc-label').remove();
   cx.querySelector('.dx-row-in').appendChild(conc);
  }

  if (gateSig) { sig = document.createElement('div'); sig.className = 'sig sig-gate'; sig.innerHTML = '<div class="sig-h"><span class="eb">Gate de Impacto</span><span class="sig-sub">El nivel en el que entra el caso, siempre a la vista.</span></div><div class="sig-gate-in"></div>';
   var gi2 = sig.querySelector('.sig-gate-in'); gateSig.els.forEach(function(el){ if (!/imp-gate-h/.test(el.className)) gi2.appendChild(el); else el.remove(); }); }
  /* ficha de impacto ABC. En modo vigente reemplaza al Gate viejo */
  var abc = null;
  if (key === 'impacto' && window.__abcPiece && typeof ABC !== 'undefined') { var ad = document.createElement('div'); ad.innerHTML = window.__abcPiece(); abc = ad.firstChild; if (ABC.modo === 'vigente') sig = null; }
  var frag = document.createDocumentFragment();
  frag.appendChild(l1); if (sig) frag.appendChild(sig); if (abc) frag.appendChild(abc); frag.appendChild(l2); frag.appendChild(l3);
  /* simulador de drivers del negocio, regla del 2026-09-30 */
  if (window.__driversPiece) { var drvEl = window.__driversPiece(key); if (drvEl) frag.appendChild(drvEl); }
  if (more.children.length) { var mh = document.createElement('div'); mh.className = 'eb dx-more-h'; mh.textContent = 'Evidencia de apoyo'; frag.appendChild(mh); frag.appendChild(more); }
  if (cx) frag.appendChild(cx);
  head.after(frag);
  card.classList.add('dx');
  if (multi) setupSim(card, key, w);
  if (window.__driversMount) window.__driversMount(card, key);
 }

 /* ---------- simulador ---------- */
 function setupSim(card, key, w){
  var sec = SECTIONS[key], btn = card.querySelector('.dx-sim-t'), box = card.querySelector('.dx-sim');
  var sims = sec.subs.map(function(sb){ return sb.score; });
  var base = scoreOf(key), baseT = totalWith(key, base), baseH = halfWith(key, base);
  var rows = sec.subs.map(function(sb, i){ if (!w[i] || sb.score == null) return ''; var tt = TT[sb.k] || { t: sb.k };
   return '<label class="sim-r"><span class="sim-n">' + tt.t + '</span><input type="range" min="0" max="100" step="1" value="' + Math.round(sb.score) + '" data-i="' + i + '" id="sim-' + key + '-' + i + '"><output class="sim-v">' + nf(sb.score, 0) + '</output></label>'; }).join('');
  box.innerHTML = '<div class="sim-intro">Mueve una subvariable y mira qué pasa con la dimensión, con su mitad y con el total. Es una simulación, el documento no cambia.</div><div class="sim-rows">' + rows + '</div>'
   + '<div class="sim-out"><div class="sim-k"><span class="eb">Esta dimensión</span><b class="sim-dim"></b><span class="sim-d sim-dd"></span></div><div class="sim-k"><span class="eb sim-hn"></span><b class="sim-half"></b><span class="sim-d sim-hd"></span></div><div class="sim-k"><span class="eb">General</span><b class="sim-tot"></b><span class="sim-d sim-td"></span></div><button type="button" class="sim-reset">Volver a los valores reales</button></div>';
  var semD = key === 'impacto' && window.__abcSem ? window.__abcSem : semOf;
  var semPrev = semD(base), totPrev = semOf(baseT);
  function paint(){
   var s = scoreOf(key, sims), t = totalWith(key, s), h = halfWith(key, s);
   var q = function(sel){ return box.querySelector(sel); };
   q('.sim-dim').textContent = nf(s); q('.sim-dim').className = 'sim-dim sc-' + semD(s);
   q('.sim-half').textContent = nf(h.v); q('.sim-hn').textContent = h.name;
   q('.sim-tot').textContent = nf(t); q('.sim-tot').className = 'sim-tot sc-' + semOf(t);
   var dl = function(a, b){ var d = a - b; return Math.abs(d) < .005 ? 'sin cambio' : (d > 0 ? '+' : '') + nf(d); };
   q('.sim-dd').textContent = dl(s, base); q('.sim-hd').textContent = dl(h.v, baseH.v); q('.sim-td').textContent = dl(t, baseT);
   [].forEach.call(card.querySelectorAll('.dx-seg'), function(sg){ var i = +sg.dataset.i, v = sims[i], sm = semOf(v);
    var f = sg.querySelector('.dx-seg-fill'); f.style.height = (v || 0) + '%'; f.className = 'dx-seg-fill f-' + sm;
    var vv = sg.querySelector('.dx-seg-v'); vv.textContent = nf(v, v % 1 ? 1 : 0); vv.className = 'dx-seg-v sc-' + sm;
    sg.classList.toggle('moved', Math.abs(v - SECTIONS[key].subs[i].score) > .001); });
   var ns = semD(s), nt = semOf(t);
   if (ns !== semPrev && window.__celebrar) window.__celebrar(q('.sim-dim'), 'La dimensión pasa a ' + SEML[ns].toLowerCase(), ns === 'r' ? 'mal' : 'bien');
   else if (nt !== totPrev && window.__celebrar) window.__celebrar(q('.sim-tot'), 'El total pasa a ' + SEML[nt].toLowerCase(), nt === 'r' || (totPrev === 'g') ? 'mal' : 'bien');
   semPrev = ns; totPrev = nt;
  }
  box.addEventListener('input', function(e){ var r = e.target; if (r.type !== 'range') return; sims[+r.dataset.i] = +r.value; r.nextElementSibling.textContent = r.value; paint(); });
  box.querySelector('.sim-reset').addEventListener('click', function(){ sims = sec.subs.map(function(sb){ return sb.score; }); [].forEach.call(box.querySelectorAll('input'), function(r){ r.value = Math.round(sims[+r.dataset.i]); r.nextElementSibling.textContent = r.value; }); semPrev = semD(base); totPrev = semOf(baseT); paint(); });
  btn.addEventListener('click', function(){ var o = box.hidden; box.hidden = !o; btn.setAttribute('aria-expanded', String(o)); btn.textContent = o ? 'Cerrar el simulador' : 'Simular qué tendría que ser cierto'; if (o) paint(); });
  paint();
 }

 /* ---------- acordeones ---------- */
 document.getElementById('dim-body').addEventListener('click', function(e){
  var h = e.target.closest('.dx-row-h,.dx-x-h'); if (h) { var b = h.nextElementSibling; var o = !b.classList.contains('open'); b.classList.toggle('open', o); h.setAttribute('aria-expanded', String(o)); return; }
  var sg = e.target.closest('.dx-seg'); if (sg) { var card = sg.closest('.dim-card'); var row = card.querySelector('.dx-row[data-i="' + sg.dataset.i + '"]'); if (!row) return;
   var rb = row.querySelector('.dx-row-b'); rb.classList.add('open'); row.querySelector('.dx-row-h').setAttribute('aria-expanded', 'true');
   var navH = document.querySelector('.nav').offsetHeight + 60; var top = row.getBoundingClientRect().top + window.pageYOffset - navH;
   try { window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' }); } catch(_) { window.scrollTo(0, top); }
   row.classList.remove('flash-row'); void row.offsetWidth; row.classList.add('flash-row'); }
 });

 /* ---------- barra fija de la dimension ---------- */
 var sec = document.getElementById('dimensiones'), tabs = document.getElementById('dim-tabs');
 var bar = document.createElement('div'); bar.className = 'dx-sticky';
 bar.innerHTML = '<button type="button" class="dx-nav dx-prev" aria-label="Dimensión anterior">&larr;</button><div class="dx-st-t"><span class="dx-st-n"></span><b class="dx-st-name"></b><span class="dx-st-s"></span></div><button type="button" class="dx-nav dx-next" aria-label="Dimensión siguiente">&rarr;</button><button type="button" class="dx-back">Volver al mapa</button>';
 tabs.after(bar);
 var current = DIM_ORDER_BODY[0];
 function paintBar(key){ var s = SECTIONS[key]; bar.querySelector('.dx-st-n').textContent = DIM_NUMS[key]; bar.querySelector('.dx-st-name').innerHTML = s.nombre;
  var st = bar.querySelector('.dx-st-s'); st.innerHTML = '<i class="d-' + s.semaforo + '"></i>' + (s.score == null ? '--' : nf(s.score, s.score % 1 ? 2 : 0)) + ' · ' + SEML[s.semaforo]; st.className = 'dx-st-s sc-' + s.semaforo; }
 function step(d){ var i = DIM_ORDER_BODY.indexOf(current) + d; if (i < 0 || i >= DIM_ORDER_BODY.length) return; window.__activateDim(DIM_ORDER_BODY[i]); var top = tabs.getBoundingClientRect().top + window.pageYOffset - document.querySelector('.nav').offsetHeight - 8; if (window.pageYOffset > top) window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' }); }
 bar.querySelector('.dx-prev').addEventListener('click', function(){ step(-1); });
 bar.querySelector('.dx-next').addEventListener('click', function(){ step(1); });
 document.addEventListener('keydown', function(e){
  if (/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ''))) return;
  var r = sec.getBoundingClientRect(); if (r.top > window.innerHeight * .6 || r.bottom < 120) return;
  if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1);
 });

 /* ---------- el puntaje se arma ---------- */
 function assemble(card){
  var key = card.dataset.dimKey, w = WTS[key] || [], sec = SECTIONS[key];
  var num = card.querySelector('.dim-circle .num'); var segs = [].slice.call(card.querySelectorAll('.dx-seg'));
  [].forEach.call(card.querySelectorAll('.mt-svg'), climb);
  [].forEach.call(card.querySelectorAll('.st-svg'), climbStairs);
  if (window.__abcAnimate) window.__abcAnimate(card);
  if (reduce || !segs.length || !card.animate) return;
  var acc = 0, tot = 0; sec.subs.forEach(function(sb, i){ if (w[i] && sb.score != null) tot += w[i]; });
  if (num) num.textContent = '0';
  segs.forEach(function(sg, n){
   var i = +sg.dataset.i, sb = sec.subs[i];
   sg.animate([{ opacity: 0, transform: 'translateY(-26px)' }, { opacity: 1, transform: 'translateY(4px)', offset: .7 }, { opacity: 1, transform: 'none' }], { duration: 480, delay: 140 + n * 170, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'backwards' });
   var f = sg.querySelector('.dx-seg-fill'); f.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 520, delay: 300 + n * 170, easing: 'cubic-bezier(.22,.9,.3,1)', fill: 'backwards' });
   setTimeout(function(){ if (sb.score != null && tot) { acc += sb.score * w[i] / tot; if (num) num.textContent = String(Math.round(acc)); } }, 520 + n * 170);
  });
  setTimeout(function(){ if (num) num.textContent = String(Math.round(sec.score)); }, 560 + segs.length * 170);
 }

 /* ---------- enganchar con las pestanas ---------- */
 [].forEach.call(document.querySelectorAll('#dim-body .dim-card'), build);
 var orig = window.__activateDim;
 window.__activateDim = function(key){ orig(key); current = key; paintBar(key); var c = document.querySelector('#dim-body .dim-card.dim-active'); if (c) assemble(c); };
 paintBar(current);
 tabs.addEventListener('click', function(e){ var t = e.target.closest('.dim-tab'); if (!t) return; current = t.dataset.dim; paintBar(current); var c = document.querySelector('#dim-body .dim-card.dim-active'); if (c) assemble(c); });
 var setNav = function(){ var n = document.querySelector('.nav'); if (n) document.documentElement.style.setProperty('--navh', n.offsetHeight + 'px'); };
 setNav(); window.addEventListener('resize', setNav);

 /* ---------- la tarjeta del mapa se abre en la dimension ---------- */
 function jump(y){ var h = document.documentElement, p = h.style.scrollBehavior; h.style.scrollBehavior = 'auto'; window.scrollTo(0, y); h.style.scrollBehavior = p; }
 function ghostFly(fromRect, toEl, cls){
  if (reduce || !document.body.animate) return;
  var to = toEl.getBoundingClientRect();
  var g = document.createElement('div'); g.className = 'dx-ghost' + (cls ? ' ' + cls : '');
  g.style.left = fromRect.left + 'px'; g.style.top = fromRect.top + 'px'; g.style.width = fromRect.width + 'px'; g.style.height = fromRect.height + 'px';
  document.body.appendChild(g);
  var toH = Math.min(to.height, window.innerHeight - to.top - 20);
  g.animate([{ left: fromRect.left + 'px', top: fromRect.top + 'px', width: fromRect.width + 'px', height: fromRect.height + 'px', opacity: 1 },
   { left: to.left + 'px', top: to.top + 'px', width: to.width + 'px', height: Math.max(120, toH) + 'px', opacity: 1, offset: .75 },
   { left: to.left + 'px', top: to.top + 'px', width: to.width + 'px', height: Math.max(120, toH) + 'px', opacity: 0 }],
   { duration: 620, easing: 'cubic-bezier(.65,0,.25,1)' }).onfinish = function(){ g.remove(); };
  toEl.animate([{ opacity: 0 }, { opacity: 0, offset: .55 }, { opacity: 1 }], { duration: 620 });
 }
 window.__goDim = function(key, srcEl){
  var from = srcEl ? srcEl.getBoundingClientRect() : null;
  window.__activateDim(key);
  var top = tabs.getBoundingClientRect().top + window.pageYOffset - document.querySelector('.nav').offsetHeight - 8;
  jump(top);
  var card = document.querySelector('#dim-body .dim-card.dim-active');
  if (from && card) ghostFly(from, card);
 };
 bar.querySelector('.dx-back').addEventListener('click', function(){
  var card = document.querySelector('#dim-body .dim-card.dim-active'); var from = card ? card.getBoundingClientRect() : null;
  var fr = from ? { left: from.left, top: Math.max(from.top, 80), width: from.width, height: Math.min(from.height, window.innerHeight - 100) } : null;
  var mapEl = document.getElementById('mapa'); var bk = mapEl.querySelector('.bk[data-dim="' + current + '"]');
  var top = mapEl.getBoundingClientRect().top + window.pageYOffset - document.querySelector('.nav').offsetHeight - 30;
  jump(top);
  if (fr && bk) ghostFly(fr, bk, 'back');
 });
})();
