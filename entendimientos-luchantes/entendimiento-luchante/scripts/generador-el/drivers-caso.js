/* DRIVERS del caso. Quinta constante de configuracion de la plantilla del EL.
   La escribe analisis-financiero-el en su Paso 2d, salvo las palancas, que las declara
   quien hace el EL. calc reproduce la formula del modelo de la empresa. drivers-check.js
   bloquea la construccion si calc con los valores del modelo no calza con las celdas
   del modelo con un margen de 2%, o si un EL de caso trae palancas sin declarar.
   Caso de ejemplo, Polímera, CASH FLOW - POLIMERA.xlsx, hoja Base Case Scenario. */
var DRIVERS = {
 dim: 'negocio',
 ronda: 900000,
 drivers: [
  { id: 'N', n: 'Desarrollos pagos que arrancan en 2027', unidad: 'n', min: 0, max: 25, paso: 1, modelo: 10,
    ref: 'El modelo supone 10 y que crecen 20% al a&ntilde;o.', obs: { v: 0, preset: false, t: 'Hoy hay 0 firmados y 15 NDA, a un ritmo de 0,6 NDA al mes.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'fee', n: 'Fee por desarrollo', unidad: 'usd', min: 4500, max: 54000, paso: 450, modelo: 27000,
    ref: 'El modelo supone USD 27.000.', obs: { v: 11850, t: 'Hoy el m&oacute;dulo inicial promedio de 6 propuestas es USD 11.850.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'roy', n: 'Royalty sobre ventas', unidad: 'pct', min: 0.005, max: 0.08, paso: 0.0005, modelo: 0.04,
    ref: 'El modelo supone 4%.', obs: { v: 0.015, t: 'La &uacute;nica tasa escrita en una propuesta es de 1% a 2%.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'succ', n: 'Desarrollos que llegan a mercado', unidad: 'pct', min: 0.1, max: 0.9, paso: 0.05, modelo: 0.5,
    ref: 'El modelo supone 50%.', obs: { v: null, t: 'Sin historia, todav&iacute;a no hay productos lanzados.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'sales', n: 'Ventas anuales por producto en madurez', unidad: 'usd', min: 225000, max: 4500000, paso: 45000, modelo: 900000,
    ref: 'El modelo supone USD 900.000 al a&ntilde;o.', obs: { v: null, t: 'Sin historia.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } }
 ],
 salidas: [
  { id: 'cob', n: 'Cobros 2027 y 2028', modelo: 567000, celda: 'Base Case Scenario!C78:Z78' },
  { id: 'peak', n: 'Capital que falta', modelo: 623384.64, celda: 'Cash Flow 27-28!D51', enlace: 'capital', menorEsMejor: true,
    umbral: { v: 900000, ok: 'Entra en el USD 900.000 que se pide.', mal: 'Est&aacute; por encima del USD 900.000 que se pide. La ronda no alcanza para 2027 y 2028.' } },
  { id: 'i32', n: 'Ingresos 2032', modelo: 1362600, celda: 'Base Case Scenario!D116 m&aacute;s I116:R116' },
  { id: 'r32', n: 'Royalties 2032', modelo: 714600, celda: 'Base Case Scenario!I116:R116', parteDe: 'i32' }
 ],
 metas: [
  { t: 'Que la ronda alcance.', driver: 'N', salida: 'peak', comp: '<=', umbral: 900000 },
  { t: 'Que el ingreso de 2032 llegue al del plan, USD 1.362.600.', driver: 'roy', salida: 'i32', comp: '>=', umbral: 1362600, nota: 'La &uacute;nica tasa escrita en una propuesta es de 1% a 2%.' }
 ],
 nota: 'El gasto de 2027 y 2028 no se mueve con ning&uacute;n driver, porque en el modelo son montos fijos que no dependen del volumen. Con menos desarrollos, el gasto sigue igual y el capital que falta sube. Tampoco dice que el plan base sea probable, solo muestra qu&eacute; tiene que pasar para que se cumpla.',
 /* cobros y egresos mensuales 2027 y 2028 del modelo, Cash Flow 27-28 filas 6, 42 y 44 */
 base: {
  cobro: [20250,0,20250,20250,20250,0,20250,40500,27000,0,27000,47250,27000,0,27000,54000,27000,0,27000,54000,27000,0,27000,54000],
  egreso: [30283.2,18974.52,185137.92,51364.8,33927.12,39613.32,23397.12,25924.32,40245.12,50101.2,39234.24,90999.72,42540.12,32495.04,45299.52,56924.64,56714.04,32284.44,49343.04,33548.04,37338.84,48711.24,20692.8,105290.28]
 },
 calc: function(p){
  var R = function(x){ return Math.floor(x + 0.5); }; /* redondeo de Excel */
  var b = DRIVERS.base, s27 = 0.9 * p.N * p.fee / 243000, s28 = 1.2 * p.N * p.fee / 324000, cum = 0, mn = 0, i, t, k;
  for (i = 0; i < 24; i++) { cum += b.cobro[i] * (i < 12 ? s27 : s28) - b.egreso[i]; if (cum < mn) mn = cum; }
  var dev = [p.N]; for (t = 1; t < 10; t++) dev.push(R(dev[t - 1] * 1.2)); dev.push(0, 0, 0);
  var ramp = [0.4, 0.75, 1], pr = [], roy = [];
  for (t = 0; t < 13; t++) pr.push(t >= 2 ? R(dev[t - 2] * p.succ) : 0);
  for (t = 0; t < 13; t++) { var r = 0; for (k = 0; k <= t; k++) r += pr[k] * p.roy * p.sales * ramp[Math.min(t - k, 2)]; roy.push(r); }
  return { cob: 2.1 * p.N * p.fee, peak: -mn, i32: roy[5] + dev[5] * p.fee, r32: roy[5] };
 }
};
