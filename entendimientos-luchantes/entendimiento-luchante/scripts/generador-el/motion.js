/* ============================================================
   MOVIMIENTO Y POLIMERATERACCIONES
   Cada animacion responde a algo del documento. Respeta reduce-motion.
   ============================================================ */
(function(){
 var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if (!reduce) document.body.classList.add('mo');
 var fmt = function(v, dec){ return dec ? v.toFixed(2).replace('.', ',') : String(Math.round(v)); };

 /* Tooltip que mide su propio ancho */
 window.showTp = function(ev, t, d, c){
  var el = document.getElementById('tp'); if (!el) return;
  var host = ev.currentTarget || ev.target; var r = host.getBoundingClientRect();
  el.innerHTML = '<div class="tp-t">' + t + '</div><div class="tp-d">' + d + '</div>' + (c ? '<div class="tp-c">' + c + '</div>' : '');
  el.classList.add('show');
  var tw = el.offsetWidth, th = el.offsetHeight;
  var left = Math.max(8, Math.min(window.innerWidth - tw - 8, r.left + r.width / 2 - tw / 2));
  var top = r.top - th - 10; if (top < 70) top = r.bottom + 10;
  el.style.left = left + 'px'; el.style.top = top + 'px';
 };

 /* Encabezado desde DATA */
 try {
  document.getElementById('hd-eb').innerHTML = 'Entendimiento Luchante &middot; ' + DATA.vertical;
  document.getElementById('hd-name').innerHTML = DATA.empresa;
  document.getElementById('hd-sub').innerHTML = DATA.periodo;
  var sp = DATA.sponsor, spEl = document.getElementById('hd-sp');
  if (sp && spEl) {
   var ini = String(sp.nombre || '').split(' ').map(function(w){ return w[0]; }).join('').slice(0,2);
   spEl.innerHTML = (sp.foto_b64 ? '<img alt="' + sp.nombre + '" src="data:image/jpeg;base64,' + sp.foto_b64 + '">' : '<div class="av">' + ini + '</div>')
    + '<div class="t"><span class="eb">Sponsor</span><b>' + sp.nombre + '</b></div>';
  }
 } catch(e){}

 /* Puntaje: las dos mitades calculadas con los mismos pesos de Metodologia */
 var W = typeof pesosEL === 'function' ? pesosEL() : { proposito:12, impacto:15, equipo:15, storytelling:8, bienestar:10, negocio:12, capital:8, mercado:15, resiliencia:5 };
 var SEL = ['proposito','impacto','equipo','storytelling','bienestar'], RET = ['negocio','capital','mercado','resiliencia'];
 function mitad(keys){ var s=0, w=0; keys.forEach(function(k){ var sc = SECTIONS[k] && SECTIONS[k].score; if (sc != null) { s += sc * W[k]; w += W[k]; } }); return w ? s / w : null; }
 var tag = document.querySelector('.diag-score .tag'), num = document.querySelector('.diag-score .num');
 if (num && DATA.total != null) num.setAttribute('data-count', DATA.total);
 if (tag) {
  var sel = mitad(SEL), ret = mitad(RET);
  var d = document.createElement('div'); d.className = 'diag-split';
  d.innerHTML = '<span class="sel">Selecci&oacute;n &middot; 60%</span> <b>' + fmt(sel, true) + '</b><br><span class="ret">Retorno &middot; 40%</span> <b>' + fmt(ret, true) + '</b>';
  tag.parentNode.appendChild(d);
 }

 /* Contadores */
 function countUp(el){
  var to = parseFloat(el.getAttribute('data-count')); if (isNaN(to)) return;
  var dec = !Number.isInteger(to), t0 = null, dur = 1100;
  function step(t){ if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur); var e = 1 - Math.pow(1 - p, 3);
   el.textContent = fmt(to * e, dec); if (p < 1) requestAnimationFrame(step); else { el.textContent = fmt(to, dec); if (el === num && tag) tag.classList.add('pulse'); } }
  requestAnimationFrame(step);
 }

 /* El mapa aparece quieto y listo (decision del 2026-09-29). Solo cuenta el puntaje general. */
 var blocks = [].slice.call(document.querySelectorAll('#mapa .bk'));
 if (num && !reduce) countUp(num);

 /* Clic en un indicador abre su por que; clic en el bloque abre su doble click */
 var mapa = document.getElementById('mapa');
 function irA(key){
  if (!window.__activateDim) return;
  window.__activateDim(key);
  var sec = document.getElementById('dim-tabs') || document.getElementById('dimensiones'), navEl = document.querySelector('.nav');
  var top = sec.getBoundingClientRect().top + window.pageYOffset - (navEl ? navEl.offsetHeight + 8 : 70);
  try { window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' }); } catch(_) { window.scrollTo(0, top); }
  var card = document.querySelector('#dim-body .dim-card.dim-active');
  if (card) { card.classList.remove('target'); setTimeout(function(){ card.classList.add('target'); }, reduce ? 0 : 450); }
 }
 if (mapa) {
  mapa.addEventListener('click', function(e){
   var go = e.target.closest('.bk-go'); if (go) { if (window.__goDim) window.__goDim(go.dataset.go, go.closest('.bk')); else irA(go.dataset.go); }
  });
 }

 /* Tabs de dimension con indicador que se desliza */
 var tabs = document.getElementById('dim-tabs');
 if (tabs) {
  var ind = document.createElement('span'); ind.className = 'tab-ind'; tabs.insertBefore(ind, tabs.firstChild);
  window.__moveTabInd = function(){
   var a = tabs.querySelector('.dim-tab.active'); if (!a) return;
   ind.style.width = a.offsetWidth + 'px'; ind.style.height = a.offsetHeight + 'px';
   ind.style.transform = 'translate(' + a.offsetLeft + 'px,' + a.offsetTop + 'px)';
  };
  window.__moveTabInd();
  window.addEventListener('resize', window.__moveTabInd);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(window.__moveTabInd);
 }

 /* Nav: el indicador sigue la seccion que estas leyendo */
 var nav = document.getElementById('nav-links'), navInd = document.getElementById('nav-ind');
 if (nav && navInd) {
  var links = [].slice.call(nav.querySelectorAll('a'));
  var secs = links.map(function(a){ return document.getElementById(a.getAttribute('href').slice(1)); });
  var cur = -1;
  function spy(){
   var navH = document.querySelector('.nav').offsetHeight + 40, idx = -1;
   secs.forEach(function(s, i){ if (s && s.getBoundingClientRect().top <= navH) idx = i; });
   if (idx === cur) return; cur = idx;
   links.forEach(function(a, i){ a.classList.toggle('on', i === idx); });
   if (idx < 0) { navInd.style.opacity = 0; return; }
   var a = links[idx];
   navInd.style.opacity = 1; navInd.style.width = a.offsetWidth + 'px'; navInd.style.height = a.offsetHeight + 'px';
   navInd.style.transform = 'translate(' + (a.offsetLeft - 4) + 'px,' + (a.offsetTop - 4) + 'px)';
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', function(){ cur = -2; spy(); });
  spy();
 }

 /* El momento de logro, el mismo gesto que cerrar un sprint */
 window.__celebrar = function(anchor, texto, tipo){
  if (!anchor) return;
  var r = anchor.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  var pill = document.createElement('div'); pill.className = 'el-logro' + (tipo === 'mal' ? ' mal' : ''); pill.textContent = texto;
  document.body.appendChild(pill);
  var pw = pill.offsetWidth;
  pill.style.left = Math.max(8, Math.min(window.innerWidth - pw - 8, cx - pw / 2)) + 'px';
  pill.style.top = Math.max(8, cy - 46) + 'px';
  var kf = tipo === 'mal'
   ? [{opacity:0, transform:'translateX(0)'},{opacity:1, transform:'translateX(-6px)', offset:.15},{transform:'translateX(6px)', offset:.3},{transform:'translateX(-3px)', offset:.45},{opacity:1, transform:'translateX(0)', offset:.8},{opacity:0}]
   : [{opacity:0, transform:'translateY(6px) scale(.92)'},{opacity:1, transform:'none', offset:.18},{opacity:1, transform:'translateY(-6px)', offset:.75},{opacity:0, transform:'translateY(-16px) scale(.96)'}];
  if (pill.animate) pill.animate(kf, { duration: reduce ? 900 : 1700, easing:'cubic-bezier(.2,.8,.3,1)' }).onfinish = function(){ pill.remove(); };
  else setTimeout(function(){ pill.remove(); }, 1500);
  if (reduce || tipo === 'mal' || !pill.animate) return;
  var col = ['#8fe2a1', '#10b981', '#0e1c2b', '#f0b429', '#3a9d9b'];
  for (var i = 0; i < 26; i++) (function(i){
   var c = document.createElement('span'); c.className = 'el-confetti';
   c.style.background = col[i % col.length]; c.style.left = cx + 'px'; c.style.top = cy + 'px';
   if (i % 3 === 0) c.style.borderRadius = '999px';
   document.body.appendChild(c);
   var ang = (Math.PI * 2 * i) / 26 + (Math.random() - .5) * .5, dist = 70 + Math.random() * 120;
   var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 40;
   c.animate([{transform:'translate(0,0) rotate(0deg)', opacity:1},{transform:'translate(' + dx + 'px,' + (dy + 120) + 'px) rotate(' + (Math.random() * 720 - 360) + 'deg)', opacity:0}],
    { duration: 900 + Math.random() * 500, easing:'cubic-bezier(.15,.6,.35,1)' }).onfinish = function(){ c.remove(); };
  })(i);
 };
 window.__flash = function(el){ if (reduce) return; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); };

 /* Condiciones precedentes: marcar las cuatro es el logro del caso */
 var cpItems = [].slice.call(document.querySelectorAll('.cp-item'));
 var cpWrap = document.querySelector('.cp-wrap'), cpArc = document.querySelector('.cp-arc'), cpNum = document.querySelector('.cp-num');
 var CIRC = 2 * Math.PI * 18;
 function cpUpdate(prev){
  var n = cpItems.filter(function(b){ return b.getAttribute('aria-checked') === 'true'; }).length;
  if (cpArc) cpArc.style.strokeDasharray = (CIRC * n / cpItems.length) + ' 200';
  if (cpNum) cpNum.textContent = n + '/' + cpItems.length;
  if (cpWrap) cpWrap.classList.toggle('done', n === cpItems.length);
  if (n === cpItems.length && prev < n) window.__celebrar(document.querySelector('.cp-ring'), 'Listo para desembolsar', 'bien');
  return n;
 }
 var cpN = 0;
 cpItems.forEach(function(b){ b.addEventListener('click', function(){
  b.setAttribute('aria-checked', b.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
  cpN = cpUpdate(cpN);
 }); });
})();
