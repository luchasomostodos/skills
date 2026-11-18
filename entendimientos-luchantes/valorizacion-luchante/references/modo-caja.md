# Modo CAJA · valorización de un caso NO VC-backable

**Abierto:** 2026-08-29 · **Caso piloto:** Marea Regenerativa

## Cuándo se usa

**Cuando el Gate VC-backable dio NO.** El gate vive en `../entendimiento-luchante/references/sistema/el-system.md` y se responde antes de puntuar la primera dimensión de un EL.

El Fondo Luchante es un vehículo de 30 años diseñado para sostener también empresas que pagan y no venden. **Que una empresa no sea VC-backable no la descalifica: la manda a este modo.**

## Qué NO se usa en este modo

**`P_max`, `M_win`, `p` y el vector RLA no aplican.** Todos miden la probabilidad de llegar a un exit modelado, y en este modo el exit no es la vía de retorno. Usarlos produce un veredicto de precio equivocado.

Ya pasó. En Marea se publicó que el precio estaba **3,2 veces por encima del máximo defendible**, y hubo que retirarlo por dos razones independientes: el lente equivocado, y el MOIC de 3x que sostenía el cálculo y que no tiene fuente.

## La métrica

**El período de recupero.** Los años desde el desembolso hasta que la caja que efectivamente recibimos iguala lo que pusimos.

| Decisión | Cómo se fija |
|---|---|
| Qué cuenta como caja recibida | Dividendos cobrados y el producto de un rescate, put o venta. **No cuenta el valor de la posición sin realizar** |
| Nominal o descontado | **Nominal.** El descontado se reporta aparte si alguien lo pide |
| Bruto o neto | **Bruto a nivel de posición.** La comisión es carga del vehículo, no de una empresa. Se declara que es bruto |
| Desde cuándo | Desde el desembolso, no desde el año fiscal de la empresa |
| En qué escenario | **En el conservador.** Si se mide en el base, un plan heroico puntúa como buen precio |

### La regla de las dos corridas

**Primero solo con dividendos.** Si así nunca repaga, eso no es un detalle de cálculo: significa que **todo el retorno depende de un mecanismo de salida que hay que negociar**, y eso es el hallazgo que gobierna la negociación.

**Después con el mecanismo**, declarando en qué año y con qué fórmula.

### La vara

El caso base del propio Fondo **distribuye desde el año 6** (memo v3, Anexo B). Esa es la referencia contra la que se lee el recupero de cualquier posición.

| Recupero | Lectura |
|---|---|
| Año 6 o antes | En línea o mejor que el caso base del Fondo |
| Año 7 a 10 | Aguanta el base, no el conservador |
| Más allá del año 10 | Solo alcanzable en el optimista |

**Trazabilidad.** El corte del año 6 sale del memo. Los de año 10 y escenario optimista son propuesta y no tienen fuente.

## Qué precio se puntúa

**El precio efectivo de entrada del vehículo que tiene la posición**, mezclado si aplica una CADE, y no el cap nominal de la ronda.

## Implementación

`Lucha/Funnel/02_Casos/Marea Regenerativa/modelo/recupero.py` es la implementación de referencia. Toma cheque, cap, dilución, payout, año y fórmula del rescate, y devuelve el recupero con y sin mecanismo, más el múltiplo total.

## Lo que este modo alimenta

El bloque de Valuation de **Dim 03 con las anclas del fork**, que están en `../entendimiento-luchante/references/dimensiones/anclas-caso-no-vc-backable.md`. Ahí `ca_val` se puntúa por año de recupero en escenario conservador, no por banda de post-money contra stage.
