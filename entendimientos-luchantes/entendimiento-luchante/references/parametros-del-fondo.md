# Qué parámetros mueve el memo del Fondo Luchante

**Abierto:** 2026-08-29 · **Documento fuente:** `00_Reference/2026-08-Memo-Fondo-Luchante-v3.pdf`

## Para qué sirve este archivo

El memo del Fondo no es un documento de lectura: **es una fuente de parámetros que gobiernan cómo se evalúa cada caso del Funnel.** Cuando ese documento cambia, hay números en los skills y en los ELs vivos que quedan mal y nadie se entera.

Esta es la lista de qué se mueve. Se revisa cada vez que salga una versión nueva del memo o del Reglamento.

## El mapa de dependencias

| Parámetro | Valor vigente | De dónde sale | Qué se rompe si cambia |
|---|---|---|---|
| **Horizonte del vehículo** | **30 años, evergreen** (era 10-12 cerrado) | Memo v3 §1 | El gate de VC-backable, la ventana de rescate de todo caso, y el criterio de selección del Funnel entero. Un vehículo largo puede sostener negocios que pagan y no venden |
| **MOIC objetivo del fondo** | **Sin fuente.** `parametros.md` usa 3x a 7 años y lo marca pendiente | No figura en el memo ni en `Fondo Luchante.md` | `P_max` de `valorizacion-luchante`, que lo lleva en el denominador. A 3,0x da 1,56M; a 1,5x da 3,12M. **Duplica el veredicto de precio** |
| **Métrica principal de retorno** | **Período de recupero**, no MOIC | Memo, Anexo B | Todo output de valorización. Hoy ningún skill lo produce |
| **Distribuciones del caso base del Fondo** | desde el **año 6** | Memo, Anexo B | La vara contra la que se compara cualquier caso que distribuya |
| **Política de reinversión** | **El Fondo reparte todo. No reinvierte** | Memo §12, decisión 7 | El período de recupero de cada posición pasa directo al inversionista |
| **Management fee** | 2% general, 1% Early Investors, ventana de 5 años por cohorte, más 0,25% perpetuo | Memo §8 y §12 | La carga total sobre el capital y el retorno neto de cada caso |
| **Cascada** | **Europea.** Lucha no cobra el 20% hasta que los partícipes recuperen el 100% | Memo §7 | El reparto de cualquier realización |
| **Precio de entrada al Fondo** | Clase A a 100 hasta el 31-dic-2026. Desde 2027, escalera de hasta 20% en cuatro peldaños, default 0% | Memo §5, §6 y §12 | Cuándo conviene desplegar y a qué costo entra capital nuevo |
| **CADE · cobertura** | Term Sheet cubre solo **Raíz, Aula Viva, Vigía** más Sostén en opción | Memo §11 | **Cualquier caso nuevo del Funnel necesita la modificación del Artículo 18 para que su CADE exista** |
| **CADE · tope anual** | ~USD 544.000, **ya al 86%** | Memo §11 | Quedan ~76.000 de espacio. Un caso nuevo compite por ese saldo |
| **CADE · descuento** | Pendiente de fijar. Referencia Botica: primario a 4,8M, compra a Lucha a 4,4M | Memo §11 | La valorización mezclada de entrada del Fondo, que es mejor que la de la ronda |
| **Descuento de rondas secundarias** | **Pendiente.** Se mencionaron 25% y 12,5% | Memo §9 y §12 | La vía de liquidez del inversionista |

## Cómo funciona la CADE, corregido el 2026-08-29

**Aplica a toda empresa del Funnel en la que finalmente invertimos**, no solo a las construidas por el Impact Studio. El deal le da equity a la sociedad de LUCHA y al Fondo Luchante a la vez, y después el Fondo le compra a Lucha parte de su posición con descuento.

Nota para el propio memo: su justificación escrita dice que la ventaja existe *"porque ninguno tiene un estudio construyendo las empresas antes de que llegue el dinero"*, que describe solo la ruta Studio. Si la CADE aplica a todo el Funnel, esa frase la subvende.

## Lo que hay que hacer cuando salga una versión nueva

1. Correr esta tabla contra el documento nuevo y marcar qué se movió.
2. Actualizar `references/parametros.md` de `valorizacion-luchante`.
3. Listar los ELs vivos que usaron un parámetro que cambió y re-correr su bloque de valorización.
4. Anotar en el ledger de cada caso afectado qué número cambió y por qué.
