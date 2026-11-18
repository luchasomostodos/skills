/* Control que corre solo en cada construccion del EL y bloquea si falla.
   Uso: node drivers-check.js drivers-caso.js [--plantilla]
   1. calc con los valores del modelo calza con cada celda del modelo, margen de 2%.
   2. cada driver trae su valor del modelo dentro del rango, y lo observado (o que no hay historia).
   3. palancas. En un EL de caso ninguna queda pendiente, y la que dice que LUCHA mueve el
      driver trae accion, hasta que valor, quien la declaro y la fecha. La plantilla puede ir
      con palancas pendientes, porque no es un EL. */
var fs = require('fs'), f = process.argv[2], plantilla = process.argv.indexOf('--plantilla') > 0;
eval(fs.readFileSync(f, 'utf8') + ';global.__D = DRIVERS;'); var D = global.__D, err = [];
var v = {}; D.drivers.forEach(function(d){
 v[d.id] = d.modelo;
 if (!(d.modelo >= d.min && d.modelo <= d.max)) err.push(d.id + ' fuera de su rango');
 if (!d.obs || typeof d.obs.t !== 'string' || !d.obs.t) err.push(d.id + ' sin lo observado');
 var p = d.palanca || {};
 if (['lucha', 'mercado', 'pendiente'].indexOf(p.estado) < 0) err.push(d.id + ' palanca sin estado');
 if (p.estado === 'pendiente' && !plantilla) err.push(d.id + ' palanca por declarar');
 if (p.estado === 'lucha' && !(p.accion && p.hasta != null && p.quien && p.fecha)) err.push(d.id + ' palanca de LUCHA sin accion, hasta, quien o fecha');
 if (p.estado === 'mercado' && !(p.quien && p.fecha)) err.push(d.id + ' declarado de mercado sin quien o fecha');
});
if (D.drivers.length < 3 || D.drivers.length > 5) err.push('van entre tres y cinco drivers, hay ' + D.drivers.length);
var out = D.calc(v);
D.salidas.forEach(function(s){
 var c = out[s.id]; if (typeof c !== 'number') { err.push(s.id + ' no sale de calc'); return; }
 var dif = s.modelo ? Math.abs(c - s.modelo) / Math.abs(s.modelo) : Math.abs(c);
 if (dif > 0.02) err.push(s.id + ' no calza con el modelo, ' + c.toFixed(2) + ' contra ' + s.modelo + ' en ' + s.celda);
});
(D.metas || []).forEach(function(m){ if (!D.drivers.some(function(d){ return d.id === m.driver; })) err.push('meta con driver inexistente ' + m.driver); if (!(m.salida in out)) err.push('meta con salida inexistente ' + m.salida); });
if (err.length) { console.error('DRIVERS BLOQUEA\n- ' + err.join('\n- ')); process.exit(1); }
console.log('drivers ok, ' + D.salidas.length + ' salidas calzan con el modelo' + (plantilla ? ', plantilla' : ''));
