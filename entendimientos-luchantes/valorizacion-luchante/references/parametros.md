# Parámetros por defecto

> ## ⚠️ Antes de usar cualquier cosa de este archivo, responde el Gate VC-backable
>
> **Todo lo de abajo asume que el caso es VC-backable**, o sea que el retorno viene de un exit. `P_max`, `M_win`, `p` y el vector RLA miden la probabilidad de llegar a ese exit.
>
> **Si el Gate VC-backable dio NO, nada de esto aplica y usarlo produce un veredicto de precio equivocado.** Ya pasó: en el caso Marea se publicó que el precio estaba 3,2 veces por encima del máximo defendible, y hubo que retirarlo. Ahí se usa el **modo CAJA** de `modo-caja.md`.
>
> El gate y su procedimiento están en `../entendimiento-luchante/references/sistema/el-system.md`.

Leer siempre antes de correr. **La tabla de parámetros usada se pega al output de cada corrida.** Sin eso, el número no es reproducible.

| Parámetro | Símbolo | Default | Quién lo aprueba | Estado |
|---|---|---|---|---|
| Retorno exigido para traer el cap a presente | `r` | **40% anual** | Comité | Propuesto, no ratificado |
| Tiempo a la próxima ronda | `T` | **18 meses** | Por caso | Ajustar según runway real |
| Múltiplo exigido si el caso funciona | `M_win` | **10×** | Reglamento del fondo | Propuesto |
| ~~Objetivo de retorno del fondo~~ | ~~`MOIC_fondo`~~ | ~~3× a 7 años~~ | — | **RETIRADO el 2026-08-29 por el líder del caso.** No tiene fuente: no figura en el memo del Fondo v3 ni en `00_Reference/Fondo Luchante.md`. A 3,0x da un `P_max` de 1,56M y a 1,5x da 3,12M, o sea que **duplica el veredicto de precio**. El memo, Anexo B, declara que **la métrica principal es el período de recupero, no el MOIC.** El MOIC se sigue reportando como salida junto al recupero, pero **deja de ser parámetro que decide** |
| Probabilidad de llegar al exit modelado | `p` | **derivado del RLA** (30% ≡ RLA 6) | Vector RLA con evidencia | Ya no se teclea. Ver `rla-madurez.md` §5. Debe cumplir `M_win = MOIC_fondo / p` |
| Retención de ownership tras dilución futura | `R` | **55%** | Por caso | Seed → exit, dos o tres rondas más |
| Descuento de iliquidez y tamaño sobre comparable público | — | **40%** | Comité, revisión anual | Aplicado como paso visible, no embebido en la base |
| Criterio de run rate | — | **último trimestre × 4** | Fijo | H1 × 2 como cross-check |
| Factor de hitos sin plan original disponible | — | **0.85** | Fijo | Nunca 1.00 |
| Factor de eficiencia sin Berry ratio disponible | — | **0.90** | Fijo | Conservador y marcado como salvedad |
| Convexidad del valor por madurez | `γ` | **1.5** | Comité | Los últimos niveles RLA valen desproporcionadamente más |
| Piso / techo del valor por madurez | — | **$1.4M / $8.0M** | Comité | Piso de aceleradora LatAm y techo de la banda de entrada de LUCHA |

## La métrica principal es el período de recupero

Memo del Fondo Luchante v3, Anexo B. **Los años desde el desembolso hasta que la caja que efectivamente recibimos iguala lo que pusimos.** Cinco decisiones, todas declaradas:

1. Solo cuenta caja recibida: dividendos cobrados y el producto de un rescate, put o venta. **No cuenta el valor de la posición sin realizar.**
2. Nominal, sin descontar.
3. Bruto a nivel de posición. La comisión es carga del vehículo, no de una empresa.
4. Desde el desembolso, no desde el año fiscal de la empresa.
5. **En el escenario conservador**, no en el base. Si se mide en el base, un plan heroico puntúa como buen precio.

**Regla de las dos corridas.** Primero **solo con dividendos**. Si así nunca repaga, eso no es un detalle de cálculo: significa que todo el retorno depende de un mecanismo de salida que hay que negociar, y eso es el hallazgo. Después se corre con el mecanismo, declarando año y fórmula.

Vara de comparación: el caso base del propio Fondo **distribuye desde el año 6**.

Implementación de referencia: `Lucha/Funnel/02_Casos/Marea Regenerativa/modelo/recupero.py`.

## Chequeo de consistencia, solo en modo ENTRADA con gate VC-backable

`M_win = MOIC_fondo / p`

Con el MOIC retirado, **este chequeo queda sin ancla y no se puede correr.** Hasta que el comité fije un objetivo de retorno con fuente, `M_win` y `p` se declaran como propuestos y `P_max` se reporta como referencia, nunca como veredicto.

## Vigencia

Parámetros cargados el **2026-08-28**. La base de múltiplos y el descuento de iliquidez se revisan una vez al año o cuando se publique data nueva de comparables. Si un parámetro tiene más de 12 meses, validarlo antes de defender el número en comité.
