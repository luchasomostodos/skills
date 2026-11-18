/* ============================================================
   FICHA DE IMPACTO ABC · reglas 2026-09-28
   ABC_RUBRICA es del sistema (dim-05-impacto.md) y no cambia por caso.
   ABC es del caso y lo reemplaza cada EL nuevo.
   modo 'vigente'     la ficha manda y reemplaza al Gate viejo.
   modo 'ilustrativo' se lee al lado del Gate con el que el caso fue a comité.
   ============================================================ */
var ABC_RUBRICA = {
 subs: [
  { k:'im_quien',   t:'Quién vive el resultado',         peso:25, a:['La mayoría de quienes lo viven están bajo el umbral, por diseño del producto, del precio o del canal','Una parte relevante está bajo el umbral y hay un camino creíble a que sea la mayoría','Llega sobre todo a quienes ya están sobre el umbral'] },
  { k:'im_cuanto',  t:'Cuánto cambia',                   peso:20, a:['Puede llevar a la persona sobre el umbral y hay evidencia de que el mecanismo funciona','Acerca a la persona al umbral de forma significativa','Cambio marginal o de conveniencia'] },
  { k:'im_umbral',  t:'Qué resultado y qué umbral',      peso:15, a:['Resultado importante para quien lo vive, con umbral de fuente científica o normativa en Perú o la región','Resultado claro, con umbral de la mejor fuente disponible','Resultado difuso, o solo actividad como usuarios o transacciones'] },
  { k:'im_empresa', t:'Contribución de la empresa',      peso:15, a:['No hay alternativa accesible para esa población','La alternativa existe pero es cara, lejana o de mala calidad','Hay una alternativa equivalente al alcance'] },
  { k:'im_negocio', t:'Parte del negocio que lo genera', peso:15, a:['La mayor parte del ingreso viene de personas que viven el resultado','Una parte relevante, y la estrategia la hace crecer','El resultado es un complemento del negocio principal'] },
  { k:'im_lucha',   t:'Contribución de LUCHA',           peso:10, a:['Sin LUCHA no se cierra la ronda, o el Impact Studio cambia el modelo de impacto y construye su medición','Aceleramos lo que ya iba a pasar y armamos su medición','Capital reemplazable, no sumamos al impacto'] }
 ],
 niveles: [
  { n:'N1', t:'C por diseño', d:'Cumple quién vive el resultado, qué parte del negocio lo genera y qué pasaría sin la empresa' },
  { n:'N2', t:'C con desarrollo', d:'Cumple la mayoría y tiene un camino claro para el resto' },
  { n:'N3', t:'C potencial', d:'Hoy es B y hay un camino creíble a C. Entra con una meta C con plazo' },
  { n:'N4', t:'Veto', d:'Daño sin corrección, un negocio que crece sin que crezca el resultado, o un founder que no acepta medirlo' }
 ],
 riesgos: ['Evidencia','Externo','Participación de la comunidad','Abandono','Eficiencia','Ejecución','Alineamiento con quien vive el resultado','Resistencia','Impacto inesperado','Inequidad'],
 origen: { f:'Dicho del founder', s:'Evidencia secundaria', p:'Dato propio' },
 /* Version planeta, provisional desde el 2026-09-29 hasta que Impacto escriba sus criterios.
    Se usa cuando ABC.resultado es 'planeta'. Mismos pesos. */
 planeta: {
  im_quien:   { t:'Qué recurso y dónde', a:['El recurso está sobre su límite sostenible donde opera la empresa, y el efecto ocurre por el uso directo del producto','El recurso está bajo presión y el efecto ocurre a través de un cliente o intermediario, con un camino creíble a medirlo','El recurso no está bajo presión donde se usa el producto, o el efecto depende de terceros sin camino a medirlo'] },
  im_cuanto:  { t:'Cuánto cambia', a:['Reducción o remoción adicional frente a la línea base, verificable por un tercero o con un método reconocido','Mecanismo físico demostrado con evidencia técnica y una fórmula de cálculo definida, todavía sin línea base','Reducción supuesta o marginal, sin mecanismo demostrado'] },
  im_umbral:  { t:'Qué resultado y qué umbral', a:['Resultado con límite sostenible o meta basada en ciencia para ese recurso, con su fuente','Resultado claro y medible, con la mejor referencia disponible','Resultado difuso, o solo actividad como hectáreas intervenidas o productos vendidos'] },
  im_empresa: { t:'Contribución de la empresa', a:['Sin la empresa la práctica actual del territorio no cambia y no hay alternativa accesible','La alternativa existe pero es cara, lejana o de peor desempeño ambiental','Hay una alternativa equivalente al alcance'] },
  im_negocio: { t:'Parte del negocio que lo genera', a:['La mayor parte del ingreso viene de ventas que generan el efecto','Una parte relevante, y la estrategia la hace crecer','El efecto es un complemento del negocio principal'] }
 },
 /* Riesgo de impacto, escala del 2026-09-29. Cada riesgo activo resta 0,05 y el piso es 0,6 */
 paso_riesgo: 0.05, piso_riesgo: 0.6
};

var ABC = {
 modo: 'ilustrativo',
 aviso: 'Lectura con las reglas del 28 de septiembre, hecha sobre el material que ya existía. Polímera fue a comité con N2 igual a 75 y ese puntaje no cambia.',
 resultado: 'planeta',
 nivel: 'N2', confianza: 'media',
 porque_nivel: 'El mecanismo es claro y tiene evidencia técnica. Falta medir cuánto, porque el dato vive en la operación del cliente.',
 subs: [
  { ancla:50, o:'s', l:'Las emisiones de la cadena del bioinsumo, por transporte, frío, envases y merma. El efecto ocurre en la operación del cliente y el piloto de medición es el camino para medirlo.' },
  { ancla:50, o:'s', l:'El mecanismo físico está demostrado, entre 70% y 80% menos volumen y vida útil de 6 meses a 2 años, y la fórmula de cálculo está definida. Falta la línea base por producto.' },
  { ancla:50, o:'p', l:'El resultado es claro, toneladas de CO2 equivalente evitadas. Falta la línea base por producto y una meta basada en ciencia.' },
  { ancla:50, o:'s', l:'La alternativa existe y es el bioinsumo líquido convencional, con más volumen, cadena de frío y merma.' },
  { ancla:80, o:'s', l:'El efecto físico es el producto. Polímera no cobra sin estabilizar el microorganismo, aunque la tonelada se materializa recién cuando el cliente vende.' },
  { ancla:80, o:'f', l:'Los founders pidieron ayuda para construir la medición y el Impact Studio la arma con ellos. Hoy no existe.' }
 ],
 riesgos: [
  { r:'Evidencia', p:'Hay desempeño técnico y no hay tonelada medida. Traducir mejora técnica a emisiones sobreestima.' },
  { r:'Externo', p:'El resultado depende de que el cliente fabrique, venda y coloque el producto.' },
  { r:'Ejecución', p:'Sin acceso periódico a los datos del cliente el piloto de medición no corre.' }
 ],
 que_tiene: 'Que corra un piloto de medición con datos del cliente, y que el acceso periódico a esos datos quede firmado',
 multiplicador: 'auto',
 nota: 'No hay sesión nueva con Impacto ni con los founders detrás de estas anclas. Sirve para ver cómo se lee un caso con la ficha, no para recalificarlo.'
};

(function(){
 if (typeof ABC !== 'undefined' && ABC.resultado === 'planeta') ABC_RUBRICA.subs.forEach(function(r){ var pl = ABC_RUBRICA.planeta[r.k]; if (pl) { r.t = pl.t; r.a = pl.a; } });
 window.__abcMult = function(){
  if (typeof ABC === 'undefined') return null;
  if (ABC.multiplicador === 'auto') return Math.max(ABC_RUBRICA.piso_riesgo, 1 - ABC_RUBRICA.paso_riesgo * (ABC.riesgos || []).length);
  return ABC.multiplicador == null ? null : ABC.multiplicador;
 };
 var nf = function(v, d){ return v == null || isNaN(v) ? '--' : (d === 0 ? String(Math.round(v)) : v.toFixed(d == null ? 1 : d).replace('.', ',')); };
 var semOf = function(v){ return v == null ? 'x' : v >= 70 ? 'g' : v >= 55 ? 'y' : 'r'; };
 var SEML = { g:'Verde', y:'Amarillo', r:'Rojo', x:'Sin data' };
 /* Color de la Dim 05, 2026-09-29. El nivel del Gate fija el piso y el techo del color. El numero no cambia */
 window.__abcSem = function(v){
  var s = semOf(v), n = typeof ABC !== 'undefined' ? ABC.nivel : null;
  if (s === 'x') return s;
  if (n === 'N4') return 'r';
  if ((n === 'N1' || n === 'N2') && s === 'r') return 'y';
  if (n === 'N3' && s === 'g') return 'y';
  return s;
 };
 window.__abcSemPor = function(){
  var sc = window.__abcScore ? window.__abcScore() : null; if (!sc || sc.total == null) return '';
  var f = window.__abcSem(sc.total); if (f === semOf(sc.total)) return '';
  if (ABC.nivel === 'N4') return 'Rojo por veto del Gate de Impacto.';
  var k = (ABC.riesgos || []).length, resta = sc.mult == null || sc.mult >= 1 ? '' : ', ' + k + (k === 1 ? ' riesgo activo resta ' : ' riesgos activos restan ') + Math.round((1 - sc.mult) * 100) + '%';
  return SEML[f] + ' por nivel ' + ABC.nivel + '. ' + nf(sc.sub) + ' en las seis subdimensiones' + resta + ' y el número queda en ' + nf(sc.total, 2) + '. ' + (ABC.nivel === 'N3' ? 'N3 no pasa de amarillo.' : 'N1 y N2 no bajan de amarillo.');
 };
 window.__abcScore = function(){
  if (typeof ABC === 'undefined') return null;
  var s = 0, t = 0; ABC_RUBRICA.subs.forEach(function(r, i){ var v = ABC.subs[i] && ABC.subs[i].ancla; if (v != null) { s += v * r.peso; t += r.peso; } });
  var sub = t ? s / t : null; var m = window.__abcMult(); return { sub: sub, mult: m, total: sub == null ? null : (m == null ? sub : sub * m) };
 };
 window.__abcPiece = function(){
  if (typeof ABC === 'undefined') return '';
  var R = ABC_RUBRICA, sc = window.__abcScore(), ilus = ABC.modo === 'ilustrativo';
  var niv = R.niveles.map(function(n){ var on = n.n === ABC.nivel; return '<div class="abc-niv' + (on ? ' on' : '') + (n.n === 'N4' ? ' veto' : '') + '"><span class="abc-niv-n">' + n.n + '</span><b>' + n.t + '</b><p>' + n.d + '</p>' + (on ? '<span class="abc-here">Este caso</span>' : '') + '</div>'; }).join('');
  var rows = R.subs.map(function(r, i){
   var c = ABC.subs[i] || {}, a = c.ancla, sem = semOf(a);
   var pos = a == null ? 0 : a === 80 ? 2 : a === 50 ? 1 : 0;
   var marks = [20, 50, 80].map(function(v, j){ return '<span class="abc-m" style="left:' + (j * 50) + '%" title="' + v + ' · ' + R.subs[i].a[2 - j] + '"><i></i><em>' + v + '</em></span>'; }).join('');
   return '<div class="abc-row" data-i="' + i + '">'
    + '<div class="abc-row-h"><b>' + r.t + '</b><span class="abc-peso"><i style="width:' + (r.peso * 4) + '%"></i>' + r.peso + '%</span></div>'
    + '<div class="abc-scale" data-pos="' + pos + '">' + marks + '<span class="abc-pin d-' + sem + '" style="left:' + (pos * 50) + '%"></span></div>'
    + '<p class="abc-l">' + (c.l || 'Por leer.') + (c.o ? ' <span class="abc-o">' + R.origen[c.o] + '</span>' : '') + '</p>'
    + '<p class="abc-anc">Ancla ' + (a == null ? '--' : a) + ', ' + (a == null ? 'sin lectura' : R.subs[i].a[2 - pos].charAt(0).toLowerCase() + R.subs[i].a[2 - pos].slice(1)) + '.</p>'
    + '</div>';
  }).join('');
  var act = (ABC.riesgos || []).map(function(x){ return x.r; });
  var chips = R.riesgos.map(function(r){ var on = act.indexOf(r) >= 0; return '<span class="abc-rk' + (on ? ' on' : '') + '">' + r + '</span>'; }).join('');
  var rdet = (ABC.riesgos || []).map(function(x){ return '<li><b>' + x.r + '.</b> ' + x.p + '</li>'; }).join('');
  var mv = sc.mult;
  var mult = mv == null ? '<b class="abc-mult-v">Por definir</b><span>La regla dice entre 0,6 y 1,0.</span>' : '<b class="abc-mult-v">&times; ' + nf(mv, 2) + '</b><span>' + act.length + ' de 10 riesgos activos. Cada uno resta 0,05 y el piso es 0,6.</span>';
  var tsem = window.__abcSem(sc.total), tpor = window.__abcSemPor();
  return '<div class="sig sig-abc' + (ilus ? ' ilus' : '') + '">'
   + '<div class="sig-h"><span class="eb">Ficha de impacto ABC</span><span class="sig-sub">Reglas 2026-09-28. El nivel clasifica y no suma. El puntaje sale de las seis subdimensiones.</span></div>'
   + (ilus ? '<div class="abc-aviso"><b>Recálculo ilustrativo.</b> ' + ABC.aviso + '</div>' : '')
   + '<div class="abc-in">'
   + '<div class="abc-top"><div class="abc-tag"><span class="eb">Resultado</span><b>' + (ABC.resultado === 'planeta' ? 'Del planeta' : 'De personas') + '</b></div><div class="abc-tag"><span class="eb">Confianza</span><b>' + ABC.confianza.charAt(0).toUpperCase() + ABC.confianza.slice(1) + '</b><span>Cuánto está medido. No baja el nivel.</span></div></div>'
   + '<div class="abc-sec"><span class="eb">Gate de Impacto · clasificación</span><div class="abc-nivs">' + niv + '</div><p class="abc-why">' + (ABC.porque_nivel || '') + '</p></div>'
   + '<div class="abc-sec"><span class="eb">Las seis subdimensiones</span><p class="abc-help">Cada línea va de 20 a 80. El punto es el ancla que describe mejor al caso. Pasa sobre una marca para leer el ancla completa.</p><div class="abc-rows">' + rows + '</div></div>'
   + '<div class="abc-sec"><span class="eb">Riesgo de impacto</span><div class="abc-rks">' + chips + '</div>' + (rdet ? '<ul class="abc-rdet">' + rdet + '</ul>' : '') + '</div>'
   + '<div class="abc-sum"><div class="abc-k"><span class="eb">Subdimensiones ponderadas</span><b class="abc-sub sc-' + semOf(sc.sub) + '">' + nf(sc.sub) + '</b></div><div class="abc-op">×</div><div class="abc-k abc-mult"><span class="eb">Riesgo</span>' + mult + '</div><div class="abc-op">=</div><div class="abc-k"><span class="eb">Dim 05' + (ilus ? ' ilustrativa' : '') + '</span><b class="abc-tot sc-' + tsem + '">' + nf(sc.total, 2) + '</b><span class="abc-tsem"><i class="d-' + tsem + '"></i>' + SEML[tsem] + (sc.mult == null ? ', antes del riesgo' : '') + '</span></div></div>' + (tpor ? '<p class="abc-tpor">' + tpor + '</p>' : '')
   + (ABC.nota ? '<p class="sx-note"><b>Lo que esto no dice.</b> ' + ABC.nota + '</p>' : '')
   + '</div></div>';
 };
 window.__abcAnimate = function(card){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pins = card.querySelectorAll('.abc-pin'); if (!pins.length || reduce || !pins[0].animate) return;
  [].forEach.call(pins, function(p, n){ var to = p.style.left; p.animate([{ left: '0%', opacity: .2 }, { left: to, opacity: 1 }], { duration: 620, delay: 120 + n * 110, easing: 'cubic-bezier(.22,.9,.3,1)', fill: 'backwards' }); });
  var tot = card.querySelector('.abc-tot'), sc = window.__abcScore(); if (!tot || !sc || sc.total == null) return;
  var t0 = null, end = sc.total, dur = 900 + pins.length * 110;
  function f(ts){ if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / dur); tot.textContent = nf(end * (1 - Math.pow(1 - k, 3)), 2); if (k < 1) requestAnimationFrame(f); else tot.textContent = nf(end, 2); }
  requestAnimationFrame(f);
 };
})();
