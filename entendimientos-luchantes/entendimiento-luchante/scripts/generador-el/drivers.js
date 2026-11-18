/* ============================================================
   SIMULADOR DE DRIVERS DEL NEGOCIO · Dim 02 (regla del 2026-09-30)
   Lee la constante DRIVERS del caso. Resultados arriba, drivers abajo.
   No mueve el puntaje de la dimension. Las palancas las declara quien hace el EL.
   ============================================================ */
(function(){
 if (typeof DRIVERS === 'undefined') return;
 var D = DRIVERS, v = {}, BASE = null;
 function thou(x){ return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
 function usd(x){ return 'USD ' + thou(x); }
 function pc(x){ return String(Math.round(x * 10000) / 100).replace('.', ',') + '%'; }
 function fmt(u, x){ return u === 'usd' ? usd(x) : u === 'pct' ? pc(x) : String(Math.round(x)); }
 function drv(id){ for (var i = 0; i < D.drivers.length; i++) if (D.drivers[i].id === id) return D.drivers[i]; }
 function sal(id){ for (var i = 0; i < D.salidas.length; i++) if (D.salidas[i].id === id) return D.salidas[i]; }
 function reset(){ D.drivers.forEach(function(d){ v[d.id] = d.modelo; }); }
 reset(); BASE = D.calc(v);

 function chip(p){ var e = p && p.estado; return e === 'lucha' ? '<span class="drv-chip l">Lo puede mover LUCHA</span>' : e === 'mercado' ? '<span class="drv-chip m">Depende del mercado</span>' : '<span class="drv-chip p">Por declarar</span>'; }
 function palHtml(d){ var p = d.palanca || {};
  if (p.estado === 'lucha') return '<div class="drv-pal"><b>Qu&eacute; har&iacute;a LUCHA.</b> ' + p.accion + (p.hasta != null ? ' Hasta ' + fmt(d.unidad, p.hasta) + '.' : '') + '</div>';
  if (p.estado === 'mercado') return '';
  return '<div class="drv-pnd"><b>Palanca por declarar.</b> La declara quien hace el EL. &iquest;LUCHA puede mover este driver? Si puede, &iquest;con qu&eacute; acci&oacute;n concreta y hasta qu&eacute; valor?</div>'; }

 window.__driversPiece = function(key){
  if (key !== D.dim) return null;
  var el = document.createElement('div'); el.className = 'drv';
  var pos = function(d, x){ return ((x - d.min) / (d.max - d.min) * 100) + '%'; };
  var rows = D.drivers.map(function(d){
   var ob = d.obs && d.obs.v != null && d.obs.v !== d.modelo ? '<span class="drv-mk ob" style="left:' + pos(d, d.obs.v) + '">Hoy</span>' : '';
   return '<div class="drv-r"><div class="drv-top"><span class="drv-n">' + d.n + '</span>' + chip(d.palanca) + '<span class="drv-v" data-v="' + d.id + '"></span></div>'
    + '<div class="drv-sl"><span class="drv-mk mo" style="left:' + pos(d, d.modelo) + '">Modelo</span>' + ob
    + '<input type="range" min="' + d.min + '" max="' + d.max + '" step="' + d.paso + '" value="' + d.modelo + '" data-d="' + d.id + '" aria-label="' + d.n.replace(/<[^>]+>/g, '') + '"></div>'
    + '<div class="drv-ref">' + d.ref + (d.obs && d.obs.t ? ' <span class="o">' + d.obs.t + '</span>' : '') + '</div>' + palHtml(d) + '</div>';
  }).join('');
  var hasObs = D.drivers.some(function(d){ return d.obs && d.obs.v != null && d.obs.preset !== false; });
  el.innerHTML = '<div class="drv-h"><span class="eb">Simular los drivers del negocio</span><p class="drv-intro">Todos los ingresos del plan salen de estos supuestos. Arriba est&aacute; lo que pasa con la caja y con los ingresos, abajo los drivers. Mueve uno y los resultados cambian. La f&oacute;rmula es la del modelo de la empresa y el puntaje de la dimensi&oacute;n no se mueve.</p></div>'
   + '<div class="drv-res"><div class="drv-outs"></div></div>'
   + '<div class="drv-qt"><span class="eb">&iquest;Qu&eacute; tiene que ser cierto?</span><ol></ol></div>'
   + '<div class="drv-acts"><button type="button" class="drv-b drv-bm">Volver al modelo</button>' + (hasObs ? '<button type="button" class="drv-b dk drv-bo">Con lo observado hoy</button>' : '') + '</div>'
   + '<div class="drv-dh"><span class="eb">Los drivers</span><div class="drv-leg"><span><i class="k-mo"></i>Lo que supone el modelo</span><span><i class="k-ob"></i>Lo que se observa hoy</span><span><i class="k-l"></i>Lo puede mover LUCHA</span></div></div>'
   + '<div class="drv-rows">' + rows + '</div>'
   + (D.nota ? '<div class="drv-nota"><b>Lo que esto no dice.</b> ' + D.nota + '</div>' : '');
  return el;
 };

 function solve(m, cur){
  var d = drv(m.driver), ok = function(x){ var t = {}; for (var k in cur) t[k] = cur[k]; t[m.driver] = x; var o = D.calc(t)[m.salida]; return m.comp === '<=' ? o <= m.umbral : o >= m.umbral; };
  var a = ok(d.min), b = ok(d.max);
  if (a === b) return { todo: a };
  var lo = d.min, hi = d.max; for (var i = 0; i < 50; i++) { var mid = (lo + hi) / 2; if (ok(mid) === b) hi = mid; else lo = mid; }
  var x = b ? hi : lo;
  if (d.unidad === 'n') x = b ? Math.ceil(x - 1e-9) : Math.floor(x + 1e-9);
  else if (d.unidad === 'pct') x = b ? Math.ceil(x * 10000 - 1e-6) / 10000 : Math.floor(x * 10000 + 1e-6) / 10000;
  else x = b ? Math.ceil(x) : Math.floor(x);
  return { x: x, alMenos: b };
 }

 function dl(a, b){ var x = a - b; if (Math.abs(x) < 0.5) return 'Igual que el modelo'; return (x > 0 ? '+' : '&minus;') + usd(Math.abs(x)) + ' contra el modelo'; }

 function paint(root){
  D.drivers.forEach(function(d){ root.querySelector('[data-v="' + d.id + '"]').textContent = fmt(d.unidad, v[d.id]); root.querySelector('input[data-d="' + d.id + '"]').value = v[d.id]; });
  var c = D.calc(v);
  root.querySelector('.drv-outs').innerHTML = D.salidas.map(function(s){
   var val = c[s.id], cls = '', why = '';
   if (s.umbral) { var over = s.menorEsMejor ? val > s.umbral.v : val < s.umbral.v; cls = over ? ' r' : ' g'; why = '<span class="drv-why">' + (over ? s.umbral.mal : s.umbral.ok) + '</span>'; }
   var sub = s.parteDe ? (c[s.parteDe] ? pc(val / c[s.parteDe]).replace(/,\d+%/, '%') + ' de ' + sal(s.parteDe).n.charAt(0).toLowerCase() + sal(s.parteDe).n.slice(1) : 'Sin ingresos') : dl(val, BASE[s.id]);
   return '<div class="drv-k' + cls + '"><span class="eb">' + s.n + '</span><b>' + usd(val) + '</b><span class="drv-d">' + sub + '</span>' + why
    + (s.enlace ? '<button type="button" class="drv-link" data-go="' + s.enlace + '">Pasa a la Dim 03, Capital</button>' : '') + '</div>';
  }).join('');
  root.querySelector('.drv-qt ol').innerHTML = (D.metas || []).map(function(m){
   var d = drv(m.driver), r = solve(m, v), c2 = D.calc(v)[m.salida], okNow = m.comp === '<=' ? c2 <= m.umbral : c2 >= m.umbral, txt;
   if (r.todo === true) txt = 'Se cumple en todo el rango de ' + d.n.charAt(0).toLowerCase() + d.n.slice(1) + '.';
   else if (r.todo === false) txt = 'Con los dem&aacute;s drivers como est&aacute;n, no se cumple con ning&uacute;n valor de ' + d.n.charAt(0).toLowerCase() + d.n.slice(1) + ' entre ' + fmt(d.unidad, d.min) + ' y ' + fmt(d.unidad, d.max) + '.';
   else txt = 'Con los dem&aacute;s drivers como est&aacute;n, ' + d.n.charAt(0).toLowerCase() + d.n.slice(1) + ' tiene que ser ' + (r.alMenos ? 'de al menos ' : 'de como m&aacute;ximo ') + fmt(d.unidad, r.x) + '. Hoy el simulador est&aacute; en ' + fmt(d.unidad, v[m.driver]) + '.';
   return '<li><span class="drv-dot ' + (okNow ? 'g' : 'r') + '"></span><b>' + m.t + '</b> ' + txt + (m.nota ? ' ' + m.nota : '') + '</li>';
  }).join('');
 }

 window.__driversMount = function(card, key){
  if (key !== D.dim) return; var root = card.querySelector('.drv'); if (!root) return;
  [].forEach.call(root.querySelectorAll('input[data-d]'), function(r){ r.addEventListener('input', function(){ v[r.dataset.d] = +r.value; paint(root); }); });
  root.querySelector('.drv-bm').addEventListener('click', function(){ reset(); paint(root); });
  var bo = root.querySelector('.drv-bo'); if (bo) bo.addEventListener('click', function(){ D.drivers.forEach(function(d){ if (d.obs && d.obs.v != null && d.obs.preset !== false) v[d.id] = d.obs.v; }); paint(root); });
  root.addEventListener('click', function(e){ var g = e.target.closest('.drv-link'); if (!g || !window.__activateDim) return; window.__activateDim(g.dataset.go); var t = document.querySelector('.dim-tabs') || document.getElementById('dim-body'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  var setTop = function(){ var bar = document.querySelector('.dx-sticky'); if (bar) document.documentElement.style.setProperty('--dxbar', bar.offsetHeight + 'px'); };
  setTop(); window.addEventListener('resize', setTop);
  paint(root);
 };
})();
