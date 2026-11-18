# Regla de conversión de scores de partners

> Adoptada el 2026-08-25 por el líder del caso ("extrapola según corresponda y hazlo como regla"), durante el EL de Marea. Cierra dos pendientes que el sistema declaraba abiertos: la conversión de la escala de los partners y el mapeo N1-N4 del Gate de Impacto. Origen: M-11 en `Funnel/00_Proceso/reingenieria-EL/2026-08-25-mejoras-desde-el-marea.md`.

## El problema que resuelve

Los partners entregan su assessment en escala **/10**. Las dimensiones del EL se puntúan **0-100** con anclas en **80 / 50 / 20**. Sin una regla, cada caso convierte a criterio y los scores dejan de ser comparables entre casos, que es justo para lo que sirve una escala con anclas.

## La regla

**Score de dimensión = score del partner × 10.**

Es la única conversión que **preserva las anclas**: un 8/10 del partner cae exactamente en el ancla 80, un 5/10 en el 50, un 2/10 en el 20. Cualquier otra transformación (capar en 95, reescalar para que el 10 caiga en 90) rompe esa correspondencia y vuelve el número incomparable contra la rúbrica.

| Partner entrega | Dimensión recibe |
|---|---|
| 10 / 10 | 100 |
| 9.5 / 10 | 95 |
| 8 / 10 | 80 (ancla alta) |
| 5 / 10 | 50 (ancla media) |
| 2 / 10 | 20 (ancla baja) |

### Guardarraíl en los extremos

**Un 10/10 o un 0/10 exige una línea de justificación del partner**, porque afirma que no hay nada por encima o por debajo. No se rechaza el 10: se documenta. Si el partner no la da, el score entra igual y el EL declara que la justificación del extremo está pendiente.

La responsabilidad de la escala queda donde corresponde: en quien puntúa, no en quien convierte.

### Un score por dimensión, no por partner

Un partner que evalúa **dos** dimensiones entrega **dos** números. El Partner de Cultura y Storytelling evalúa Cultura (peso 50 en Dim 06) y Storytelling (peso 100 en Dim 07): son dos assessments distintos y necesitan dos scores. Si llega uno solo, se usa para ambas y **el EL declara que el segundo score no fue emitido por separado**.

## Mapeo del Gate de Impacto (Dim 05) · retirado el 2026-09-28

La tabla N1=85, N2=70, N3=45, N4=0 ya no aplica. Desde el marco ABC del 2026-09-28, el nivel N1 a N4 clasifica el modelo y decide si el caso sigue, y el puntaje de la Dim 05 sale de sus seis subdimensiones. Ver `dim-05-impacto.md`. La tabla anterior queda en `Lucha/Funnel/00_Proceso/_backups-sistema/2026-09-28/regla-de-conversion-de-scores.md` para leer los EL cerrados antes de esa fecha.

## Hacia adelante

La conversión existe porque los partners puntúan en /10. **La solución de fondo es que puntúen directo en 0-100 contra las anclas**, con un formulario que tenga una fila por dimensión y su peso a la vista. Mientras eso no exista, rige esta regla. Cuando exista, este archivo se archiva.
