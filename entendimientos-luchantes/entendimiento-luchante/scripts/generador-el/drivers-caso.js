/* DRIVERS del caso. Quinta constante de configuracion de la plantilla del EL.
   La escribe analisis-financiero-el en su Paso 2d, salvo las palancas, que las declara
   quien hace el EL. calc reproduce la formula del modelo de la empresa. drivers-check.js
   bloquea la construccion si calc con los valores del modelo no calza con las celdas
   del modelo con un margen de 2%, o si un EL de caso trae palancas sin declarar.
   Caso de ejemplo, Polímera, CASH FLOW - POLIMERA.xlsx, hoja Base Case Scenario. */
var DRIVERS = {
 dim: 'negocio',
 ronda: 1250000,
 drivers: [
  { id: 'N', n: 'Desarrollos pagos que arrancan en 2027', unidad: 'n', min: 0, max: 25, paso: 1, modelo: 10,
    ref: 'El modelo supone 10 y que crecen 20% al a&ntilde;o.', obs: { v: 0, preset: false, t: 'Hoy hay 0 firmados y 15 NDA, a un ritmo de 0,6 NDA al mes.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'fee', n: 'Fee por desarrollo', unidad: 'usd', min: 6250, max: 75000, paso: 625, modelo: 37500,
    ref: 'El modelo supone USD 37.500.', obs: { v: 16459, t: 'Hoy el m&oacute;dulo inicial promedio de 6 propuestas es USD 16.459.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'roy', n: 'Royalty sobre ventas', unidad: 'pct', min: 0.005, max: 0.08, paso: 0.0005, modelo: 0.04,
    ref: 'El modelo supone 4%.', obs: { v: 0.015, t: 'La &uacute;nica tasa escrita en una propuesta es de 1% a 2%.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'succ', n: 'Desarrollos que llegan a mercado', unidad: 'pct', min: 0.1, max: 0.9, paso: 0.05, modelo: 0.5,
    ref: 'El modelo supone 50%.', obs: { v: null, t: 'Sin historia, todav&iacute;a no hay productos lanzados.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } },
  { id: 'sales', n: 'Ventas anuales por producto en madurez', unidad: 'usd', min: 312500, max: 6250000, paso: 62500, modelo: 1250000,
    ref: 'El modelo supone USD 1.250.000 al a&ntilde;o.', obs: { v: null, t: 'Sin historia.' },
    palanca: { estado: 'pendiente', accion: '', hasta: null, quien: '', fecha: '' } }
 ],
 salidas: [
  { id: 'cob', n: 'Cobros 2027 y 2028', modelo: 787500, celda: 'Base Case Scenario!C78:Z78' },
  { id: 'peak', n: 'Capital que falta', modelo: 865812, celda: 'Cash Flow 27-28!D51', enlace: 'capital', menorEsMejor: true,
    umbral: { v: 1250000, ok: 'Entra en el USD 1.250.000 que se pide.', mal: 'Est&aacute; por encima del USD 1.250.000 que se pide. La ronda no alcanza para 2027 y 2028.' } },
  { id: 'i32', n: 'Ingresos 2032', modelo: 1892500, celda: 'Base Case Scenario!D116 m&aacute;s I116:R116' },
  { id: 'r32', n: 'Royalties 2032', modelo: 992500, celda: 'Base Case Scenario!I116:R116', parteDe: 'i32' }
 ],
 metas: [
  { t: 'Que la ronda alcance.', driver: 'N', salida: 'peak', comp: '<=', umbral: 1250000 },
  { t: 'Que el ingreso de 2032 llegue al del plan, USD 1.892.500.', driver: 'roy', salida: 'i32', comp: '>=', umbral: 1892500, nota: 'La &uacute;nica tasa escrita en una propuesta es de 1% a 2%.' }
 ],
 nota: 'El gasto de 2027 y 2028 no se mueve con ning&uacute;n driver, porque en el modelo son montos fijos que no dependen del volumen. Con menos desarrollos, el gasto sigue igual y el capital que falta sube. Tampoco dice que el plan base sea probable, solo muestra qu&eacute; tiene que pasar para que se cumpla.',
 /* cobros y egresos mensuales 2027 y 2028 del modelo, Cash Flow 27-28 filas 6, 42 y 44 */
 base: {
  cobro: [28125,0,28125,28125,28125,0,28125,56250,37500,0,37500,65625,37500,0,37500,75000,37500,0,37500,75000,37500,0,37500,75000],
  egreso: [42060,26353.5,257136,71340,47121,55018.5,32496,36006,55896,69585,54492,126388.5,59083.5,45132,62916,79062,78769.5,44839.5,68532,46594.5,51859.5,67654.5,28740,146236.5]
 },
 calc: function(p){
  var R = function(x){ return Math.floor(x + 0.5); }; /* redondeo de Excel */
  var b = DRIVERS.base, s27 = 0.9 * p.N * p.fee / 337500, s28 = 1.2 * p.N * p.fee / 450000, cum = 0, mn = 0, i, t, k;
  for (i = 0; i < 24; i++) { cum += b.cobro[i] * (i < 12 ? s27 : s28) - b.egreso[i]; if (cum < mn) mn = cum; }
  var dev = [p.N]; for (t = 1; t < 10; t++) dev.push(R(dev[t - 1] * 1.2)); dev.push(0, 0, 0);
  var ramp = [0.4, 0.75, 1], pr = [], roy = [];
  for (t = 0; t < 13; t++) pr.push(t >= 2 ? R(dev[t - 2] * p.succ) : 0);
  for (t = 0; t < 13; t++) { var r = 0; for (k = 0; k <= t; k++) r += pr[k] * p.roy * p.sales * ramp[Math.min(t - k, 2)]; roy.push(r); }
  return { cob: 2.1 * p.N * p.fee, peak: -mn, i32: roy[5] + dev[5] * p.fee, r32: roy[5] };
 }
};
