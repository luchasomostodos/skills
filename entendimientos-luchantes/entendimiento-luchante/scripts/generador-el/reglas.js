/* ============================================================
   CARRIL Y VERSION DE REGLAS DEL CASO
   Fuente, 00_Reference/EL Dimensiones/carril-y-version-de-reglas.md y la
   ponderacion de EL System. El caso solo edita EL_REGLAS.
   dim09  'id'       deeptech, I+D con la ruta de madurez
          'ia'       software, resiliencia ante la IA
          'ninguna'  la dimension no existe y su peso se reparte en Retorno
   ============================================================ */
const EL_REGLAS = {
 version: '2026-09-28',
 carril: { vc: true, vertical: 'Climate Tech', deeptech: true, tipo: 'Hardware o deeptech', ia_nativa: false, vende: false },
 dim09: 'id',
 calcular_total: true
};
const EL_DIM09 = {
 id: { nombre: 'I+D', pregunta: '&iquest;D&oacute;nde est&aacute; la tecnolog&iacute;a en su ruta de madurez?' },
 ia: { nombre: 'Resiliencia ante la IA', pregunta: '&iquest;La ventaja sobrevive la aceleraci&oacute;n de la IA?' },
 ninguna: null
};
const EL_SEL = ['proposito','impacto','equipo','storytelling','bienestar'];
const EL_RET = ['negocio','capital','mercado','resiliencia'];
function pesosEL(){
 var W = EL_REGLAS.carril.vc
  ? { proposito:12, impacto:15, equipo:15, storytelling:8, bienestar:10, negocio:12, capital:8, mercado:15, resiliencia:5 }
  : { proposito:12, impacto:15, equipo:15, storytelling:8, bienestar:10, negocio:18, capital:12, mercado:5, resiliencia:5 };
 if (EL_REGLAS.dim09 === 'ninguna') {
  var ret = W.negocio + W.capital + W.mercado + W.resiliencia, sin = ret - W.resiliencia;
  ['negocio','capital','mercado'].forEach(function(k){ W[k] = W[k] * ret / sin; });
  W.resiliencia = 0;
 }
 return W;
}
function totalEL(){
 var W = pesosEL(), s = 0, t = 0;
 Object.keys(W).forEach(function(k){ var v = SECTIONS[k] && SECTIONS[k].score; if (W[k] && v != null) { s += v * W[k]; t += W[k]; } });
 return t ? { total: s / t, cubierto: t } : { total: null, cubierto: 0 };
}
(function(){
 /* Dim 05 con la ficha ABC vigente, seis subdimensiones en vez del Gate traducido */
 if (typeof ABC !== 'undefined' && ABC.modo === 'vigente' && SECTIONS.impacto) {
  var sc = window.__abcScore ? window.__abcScore() : null, R = ABC_RUBRICA;
  SECTIONS.impacto.subs = R.subs.map(function(r, i){ var c = ABC.subs[i] || {}, a = c.ancla, sem = a == null ? 'x' : a >= 70 ? 'g' : a >= 55 ? 'y' : 'r';
   if (typeof TT !== 'undefined') TT[r.k] = { t: r.t, d: 'Ancla 80, ' + R.subs[i].a[0].charAt(0).toLowerCase() + R.subs[i].a[0].slice(1) + '. Ancla 50, ' + R.subs[i].a[1].charAt(0).toLowerCase() + R.subs[i].a[1].slice(1) + '. Ancla 20, ' + R.subs[i].a[2].charAt(0).toLowerCase() + R.subs[i].a[2].slice(1) + '.', c: 'Pesa ' + r.peso + '% de Impacto' };
   return { k: r.k, raw: a == null ? 'Sin lectura' : 'Ancla ' + a, u: '', score: a == null ? null : a, sem: sem, por: c.l || '' }; });
  if (sc && sc.total != null) { SECTIONS.impacto.score = Math.round(sc.total * 100) / 100; SECTIONS.impacto.semaforo = window.__abcSem(sc.total); }
  SECTIONS.impacto.score_label = ABC.nivel;
  var nv = ABC_RUBRICA.niveles.filter(function(n){ return n.n === ABC.nivel; })[0], sv = SECTIONS.impacto.score, sl = { g:'Verde', y:'Amarillo', r:'Rojo', x:'Sin data' }[SECTIONS.impacto.semaforo], st = String(sv).replace('.', ','), por = window.__abcSemPor ? window.__abcSemPor() : '';
  if (typeof DIM_TITLES !== 'undefined') DIM_TITLES.impacto = sl + ' ' + st + ' · ' + ABC.nivel + ', ' + (nv ? nv.t : '') + '. ' + (por ? por + ' ' : '') + (ABC.porque_nivel || '');
  if (typeof DIM_CONCLUSION !== 'undefined') DIM_CONCLUSION.impacto = '<p><strong>' + sl + ' ' + st + '. ' + ABC.nivel + ', ' + (nv ? nv.t : '') + '.</strong> ' + (por ? por + ' ' : '') + (ABC.porque_nivel || '') + '</p>' + (ABC.que_tiene ? '<p>¿Qué tiene que ser cierto? ' + ABC.que_tiene + '.</p>' : '');
  if (typeof RUBRICAS !== 'undefined') RUBRICAS.impacto = '<div class="rb-nota">Reglas ' + EL_REGLAS.version + '. El Gate N1 a N4 clasifica el modelo con el ABC y no se convierte a puntaje. El puntaje sale de seis subdimensiones con anclas 80, 50 y 20, y se multiplica por el riesgo de impacto, entre 0,6 y 1,0. El color lo fija el nivel del Gate, N1 y N2 no bajan de amarillo, N3 no pasa de amarillo y N4 va en rojo.</div>'
   + R.subs.map(function(r){ return '<div class="rb-sub"><div class="rb-sub-h"><span class="rb-sub-name">' + r.t + '</span><span class="rb-sub-peso">' + r.peso + '%</span></div><table><tr><th>Ancla</th><th>C&oacute;mo se ve</th></tr><tr><td class="anc-g">80</td><td>' + r.a[0] + '</td></tr><tr><td class="anc-y">50</td><td>' + r.a[1] + '</td></tr><tr><td class="anc-r">20</td><td>' + r.a[2] + '</td></tr></table></div>'; }).join('');
 }
 var d9 = EL_DIM09[EL_REGLAS.dim09];
 if (d9 && SECTIONS.resiliencia) { SECTIONS.resiliencia.nombre = d9.nombre; SECTIONS.resiliencia.pregunta = d9.pregunta; }
 if (!d9 && SECTIONS.resiliencia) { SECTIONS.resiliencia.nombre = 'No aplica'; SECTIONS.resiliencia.score = null; SECTIONS.resiliencia.semaforo = 'x'; SECTIONS.resiliencia.subs = []; }
 if (EL_REGLAS.calcular_total) {
  var r = totalEL();
  if (r.total != null) {
   if (DATA.total != null && Math.abs(DATA.total - r.total) > .01 && window.console) console.warn('El total escrito (' + DATA.total + ') no calza con el calculado (' + r.total.toFixed(2) + ')');
   DATA.total = Math.round(r.total * 100) / 100;
   DATA.semaforo_general = DATA.total >= 70 ? 'g' : DATA.total >= 55 ? 'y' : 'r';
   if (r.cubierto < 99.99) DATA.semaforo_general = 'x';
  }
 }
})();

/* Metodologia, el carril y el scorecard desde las reglas */
window.__reglasPost = function(){
 var ga = document.getElementById('hd-ga'), gb = document.getElementById('hd-gb'), c0 = EL_REGLAS.carril;
 if (ga) ga.innerHTML = 'Gate A &middot; ' + (c0.vc ? 'VC-backable &middot; ' + c0.vertical : 'Green Zebra');
 if (gb) gb.innerHTML = 'Gate B &middot; ' + c0.tipo.toLowerCase() + (c0.ia_nativa ? ' &middot; IA nativa' : '');
 var f = function(v){ return v == null ? '--' : v.toFixed(2).replace('.', ','); };
 var fw = function(v){ return (Math.round(v * 100) / 100).toString().replace('.', ',') + '%'; };
 var W = pesosEL(), c = EL_REGLAS.carril;
 var ninguna = EL_REGLAS.dim09 === 'ninguna';
 var box = document.getElementById('mtd-reglas');
 if (box) {
  var chip = function(k, v){ return '<div class="rg-chip"><span class="eb">' + k + '</span><b>' + v + '</b></div>'; };
  var h = '<div class="ng-sec-h">Carril y versi&oacute;n de reglas</div><div class="ng-sec-sub">El carril se declara al entrar al EL y se confirma antes de puntuar. Un EL se compara solo con otros de la misma versi&oacute;n.</div>'
   + '<div class="rg-chips">' + chip('Versi&oacute;n de reglas', EL_REGLAS.version) + chip('VC-backable', c.vc ? 'S&iacute;' : 'No, Green Zebra') + chip('Vertical', c.vertical) + chip('Deeptech', c.deeptech ? 'S&iacute;' : 'No') + chip('Tipo de negocio', c.tipo) + chip('IA nativa', c.ia_nativa ? 'S&iacute;' : 'No') + chip('Negocio', c.vende ? 'Ya vende' : 'Pre-revenue') + chip('Dim 09', ninguna ? 'No existe' : EL_DIM09[EL_REGLAS.dim09].nombre) + '</div>'
   + (ninguna ? '<p class="rg-nota">Este caso no tiene Dim 09. Su peso se reparte entre Negocio, Capital y Mercado en proporci&oacute;n a sus pesos, y el bloque de Retorno sigue pesando lo mismo.</p>' : '');
  var row = function(k){ var s = SECTIONS[k], v = s.score, w = W[k]; return '<tr><td>' + DIM_NUMS[k] + ' ' + s.nombre + '</td><td class="n">' + fw(w) + '</td><td class="n">' + f(v) + '</td><td class="n">' + (v == null ? '--' : f(v * w / 100)) + '</td></tr>'; };
  var half = function(keys){ var s = 0, w = 0; keys.forEach(function(k){ var v = SECTIONS[k].score; if (W[k] && v != null) { s += v * W[k]; w += W[k]; } }); return { v: w ? s / w : null, w: keys.reduce(function(a, k){ return a + W[k]; }, 0), a: s / 100 }; };
  var hs = half(EL_SEL), hr = half(EL_RET), tot = totalEL().total;
  h += '<div class="ng-sec-h">El scorecard, dimensi&oacute;n por dimensi&oacute;n</div><div class="ng-sec-sub">Nueve dimensiones agrupadas en las dos mitades del m&eacute;todo. Los pesos salen del carril.</div><table class="mtd-tabla"><tr><th>Dimensi&oacute;n</th><th style="text-align:right">Peso</th><th style="text-align:right">Score</th><th style="text-align:right">Aporte</th></tr>'
   + '<tr class="sub"><td colspan="4">Bloque de Selecci&oacute;n &middot; 60% &middot; mira a las personas</td></tr>' + EL_SEL.map(row).join('')
   + '<tr class="sub"><td>Subtotal Selecci&oacute;n</td><td class="n">' + fw(hs.w) + '</td><td class="n">' + f(hs.v) + '</td><td class="n">' + f(hs.a) + '</td></tr>'
   + '<tr class="sub"><td colspan="4">Bloque de Retorno &middot; 40% &middot; mira al negocio</td></tr>' + EL_RET.filter(function(k){ return W[k]; }).map(row).join('')
   + '<tr class="sub"><td>Subtotal Retorno</td><td class="n">' + fw(hr.w) + '</td><td class="n">' + f(hr.v) + '</td><td class="n">' + f(hr.a) + '</td></tr>'
   + '<tr class="tot"><td>General ponderado</td><td class="n">100%</td><td class="n">' + f(tot) + '</td><td class="n">' + f(tot) + '</td></tr></table>';
  box.innerHTML = h;
 }
 if (ninguna) {
  var bk = document.querySelector('#mapa .bk[data-dim="resiliencia"]');
  if (bk) { bk.classList.add('rg-na'); bk.innerHTML = '<div class="bh"><div><div class="bt">09 &middot; No aplica</div><div class="bq">Este caso no tiene Dim 09</div></div></div><p class="rg-na-p">Su peso se reparte entre Negocio, Capital y Mercado.</p>'; }
  var tab = document.querySelector('#dim-tabs [data-dim="resiliencia"]'); if (tab) tab.style.display = 'none';
  var card = document.querySelector('#dim-body .dim-card[data-dim-key="resiliencia"]'); if (card) card.style.display = 'none';
  var i = DIM_ORDER_BODY.indexOf('resiliencia'); if (i >= 0) DIM_ORDER_BODY.splice(i, 1);
 }
};
