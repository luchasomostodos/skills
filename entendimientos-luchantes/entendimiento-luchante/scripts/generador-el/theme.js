/* ============================================================
   MODO OSCURO
   El EL trae colores escritos a mano en CSS, en estilos en linea y en SVG.
   En vez de reescribirlos, este motor los traduce al vuelo con una sola
   regla por tipo de uso (fondo, texto, borde, sombra) y los devuelve igual
   al volver al modo claro. El semaforo y los acentos no cambian de tono.
   ============================================================ */
(function(){
 var KEY = 'el-tema', root = document.documentElement, on = false, saved = [], obs = null;
 function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
 function parse(c){
  c = c.trim(); var m;
  if ((m = c.match(/^#([0-9a-f]{3,8})$/i))) { var x = m[1]; if (x.length === 3 || x.length === 4) x = x.split('').map(function(ch){ return ch + ch; }).join('');
   return [parseInt(x.slice(0,2),16), parseInt(x.slice(2,4),16), parseInt(x.slice(4,6),16), x.length === 8 ? parseInt(x.slice(6,8),16) / 255 : 1]; }
  if ((m = c.match(/^rgba?\(([^)]+)\)$/i))) { var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat); return [p[0], p[1], p[2], p[3] == null ? 1 : p[3]]; }
  if ((m = c.match(/^hsla?\(([^)]+)\)$/i))) { var q = m[1].replace(/%/g, '').split(/[\s,\/]+/).filter(Boolean).map(parseFloat); var rgb = h2r(q[0], q[1] / 100, q[2] / 100); rgb.push(q[3] == null ? 1 : q[3]); return rgb; }
  return null;
 }
 function r2h(r, g, b){ r /= 255; g /= 255; b /= 255; var mx = Math.max(r, g, b), mn = Math.min(r, g, b), h = 0, s = 0, l = (mx + mn) / 2;
  if (mx !== mn) { var d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
  return [h, s, l * 100]; }
 function h2r(h, s, l){ var k = function(n){ return (n + h / 30) % 12; }, a = s * Math.min(l, 1 - l); var f = function(n){ return l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)); };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]; }
 function out(h, s, L, a){ var c = h2r(h, s, L / 100); return a < 1 ? 'rgba(' + c.join(',') + ',' + (+a.toFixed(3)) + ')' : 'rgb(' + c.join(',') + ')'; }
 function mapOne(c, kind){
  var v = parse(c); if (!v) return c;
  var hsl = r2h(v[0], v[1], v[2]), h = hsl[0], s = hsl[1], L = hsl[2], a = v[3];
  var neutral = s < .22 || L > 86;
  if (kind === 'shadow') return 'rgba(0,0,0,' + clamp(a * 2.4, .12, .6).toFixed(2) + ')';
  if (kind === 'text') {
   if (L < 45) return out(h, neutral ? Math.min(s, .18) : s * .85, 100 - L * .75, a);
   if (L < 70 && neutral) return out(h, Math.min(s, .14), clamp(100 - L * .72, 58, 80), a);
   return c;
  }
  if (kind === 'border') {
   if (L >= 80) return out(h, Math.min(s, .12), 21 + (100 - L) * .35, a);
   if (neutral && L >= 45) return out(h, Math.min(s, .12), clamp(100 - L, 26, 50), a);
   if (L < 30) return out(h, Math.min(s, .2), 78, a);
   return c;
  }
  if (kind === 'var') { if (!neutral && L < 36 && a >= 1) return out(h, s * .8, 64, a); kind = 'bg'; }
  /* fondos */
  if (a < 1 && L < 35) return out(h, Math.min(s, .25), 90, a);
  if (a < 1 && L >= 97 && s < .1) return out(36, .08, 13, a);
  if (a < 1 && L >= 88) return out(h, Math.min(s, .12), 11, a);
  if (a < 1) return c;
  if (L >= 97) return out(36, .08, 13.5, 1);
  if (L >= 93) return out(h, Math.min(s, .18) * .8, 9.5, 1);
  if (L > 86) return out(h, neutral && s < .22 ? Math.min(s, .14) : Math.min(s, .38), 17, 1);
  if (neutral && L >= 45) return out(h, Math.min(s, .12), clamp(100 - L + 8, 30, 62), 1);
  if (L < 22) return out(h, Math.min(s, .35), 17, 1);
  return c;
 }
 var RX = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;
 function kindOf(prop){
  if (/shadow/.test(prop)) return 'shadow';
  if (/^--/.test(prop)) return /(ink|mut|sub|muted|navy|T$|txt|text)/i.test(prop) ? 'text' : /(line|track|border)/i.test(prop) ? 'border' : 'var';
  if (/^(color|caret-color|-webkit-text-fill-color|text-decoration-color|column-rule-color)$/.test(prop)) return 'text';
  if (/border|outline/.test(prop)) return 'border';
  if (/^(stroke)$/.test(prop)) return 'border';
  return 'bg';
 }
 function mapVal(val, prop){ if (!RX.test(val)) { RX.lastIndex = 0; return val; } RX.lastIndex = 0; var k = kindOf(prop); return val.replace(RX, function(c){ return mapOne(c, k); }); }
 var PROPS = /color|background|border|outline|shadow|fill|stroke|^--/;
 function doRules(rules){
  [].forEach.call(rules, function(r){
   if (r.cssRules && !r.style) { doRules(r.cssRules); return; }
   if (r.cssRules && r.cssRules.length) doRules(r.cssRules);
   var st = r.style; if (!st) return;
   for (var i = 0; i < st.length; i++) { var p = st[i]; if (!PROPS.test(p)) continue; var v = st.getPropertyValue(p), pr = st.getPropertyPriority(p), nv = mapVal(v, p); if (nv !== v) { saved.push([st, p, v, pr]); st.setProperty(p, nv, pr); } }
  });
 }
 var ATTRS = ['fill', 'stroke', 'stop-color', 'color'];
 function doEl(el){
  if (el.nodeType !== 1 || el.__th) return; el.__th = 1;
  var s = el.getAttribute('style');
  if (s && RX.test(s)) { RX.lastIndex = 0; var st = el.style, rec = [];
   for (var i = 0; i < st.length; i++) { var p = st[i]; if (!PROPS.test(p)) continue; var v = st.getPropertyValue(p), nv = mapVal(v, el.tagName === 'text' && p === 'fill' ? 'color' : p); if (nv !== v) rec.push([p, v, nv, st.getPropertyPriority(p)]); }
   rec.forEach(function(x){ st.setProperty(x[0], x[2], x[3]); saved.push([st, x[0], x[1], x[3]]); }); }
  RX.lastIndex = 0;
  ATTRS.forEach(function(a){ var v = el.getAttribute(a); if (!v || !RX.test(v)) { RX.lastIndex = 0; return; } RX.lastIndex = 0;
   var nv = mapVal(v, (el.tagName === 'text' || el.tagName === 'tspan') && a === 'fill' ? 'color' : a === 'stroke' ? 'border' : a === 'stop-color' ? 'bg' : 'bg');
   if (nv !== v) { saved.push([el, '@' + a, v]); el.setAttribute(a, nv); } });
 }
 function doTree(n){ if (n.nodeType !== 1) return; doEl(n); var all = n.getElementsByTagName('*'); for (var i = 0; i < all.length; i++) doEl(all[i]); }
 function enable(){
  if (on) return; on = true; saved = [];
  [].forEach.call(document.styleSheets, function(sh){ try { doRules(sh.cssRules); } catch(e){} });
  doTree(document.body);
  obs = new MutationObserver(function(ms){ ms.forEach(function(m){ [].forEach.call(m.addedNodes, doTree); }); });
  obs.observe(document.body, { childList: true, subtree: true });
  root.setAttribute('data-theme', 'dark'); root.style.colorScheme = 'dark';
 }
 function disable(){
  if (!on) return; on = false; if (obs) obs.disconnect();
  for (var i = saved.length - 1; i >= 0; i--) { var x = saved[i]; if (x[1].charAt(0) === '@') x[0].setAttribute(x[1].slice(1), x[2]); else x[0].setProperty(x[1], x[2], x[3]); }
  saved = []; [].forEach.call(document.getElementsByTagName('*'), function(e){ e.__th = 0; }); if (document.body) document.body.__th = 0;
  root.setAttribute('data-theme', 'light'); root.style.colorScheme = 'light';
 }
 function paintBtn(){ var b = document.getElementById('th-tog'); if (!b) return; b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'); b.title = on ? 'Modo claro' : 'Modo oscuro'; }
 var pref = null; try { pref = localStorage.getItem(KEY); } catch(e){}
 var sys = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
 if (pref === 'dark' || (pref == null && sys)) enable();
 paintBtn();
 var b = document.getElementById('th-tog');
 if (b) b.addEventListener('click', function(){ if (on) disable(); else enable(); try { localStorage.setItem(KEY, on ? 'dark' : 'light'); } catch(e){} paintBtn(); });
 window.__tema = { enable: enable, disable: disable };
})();
