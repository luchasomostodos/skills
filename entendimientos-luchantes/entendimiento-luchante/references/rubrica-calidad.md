# Rúbrica de calidad del EL

Gate del paso 5. Reemplaza al criterio de "±20% del conteo de palabras del EL de referencia", que era imitación de un ejemplo: un EL de 20,000 palabras con el mecanismo de ingreso equivocado pasaba esa vara.

**Cómo se usa.** Se corre por dimensión, no sobre el documento entero. Una dimensión no pasa a la siguiente con un check en rojo. El conteo de palabras se conserva al final, degradado a lo que es: una señal de humo, no un criterio.

## Checks transversales (todas las dimensiones)

| # | Check | Falla si... |
|---|---|---|
| T1 | Cada cifra portante tiene fila en `hechos.md` con su `estado del dato` | hay un número en el documento que no está en el ledger |
| T2 | Cada quote es literal y trae archivo de origen | hay una paráfrasis presentada como quote, o una quote sin ubicación |
| T3 | Cada sub-ítem del Mapa es número o métrica | aparece una palabra-estado como relleno ("fuerte", "pendiente" sin ser estado real) |
| T4 | Cada semáforo tiene su evidencia; el gris tiene motivo explícito | hay un color sin fundamento a la vista |
| T5 | Cero jerga interna del proceso en el documento renderizado | aparece "anclas 80/50/20", "el motor", nombres de hojas del Excel |
| T6 | Cero rastros del caso plantilla | queda un nombre, monto o métrica del caso de origen |
| T7 | Un dato sin documento no se presenta como confirmado | se afirma como hecho algo que el ledger tiene como `Input verbal`. **Se marca el estado del dato, no se narra quién lo dijo ni cuándo**, que es procedencia de nuestro proceso y va fuera del cuerpo |
| T8 | Cada bloque de subvariable abre con tesis y está en piezas, sin dato perdido frente al texto original | hay un párrafo de más de cuatro líneas en el cuerpo del bloque, o una cifra del texto original que no aparece en ninguna pieza |
| T9 | Registro de comité, el cuerpo habla de la empresa y de la decisión | aparece en el cuerpo «expediente», «data room», «transcript», «ledger», «el material», «la llamada de referencia» o «hueco», o una frase cuyo sujeto es nuestra revisión. La procedencia va en Metodología |
| T10 | La plantilla se usa con su configuración y no a mano | falta `EL_REGLAS` con el carril y la Dim 09 del caso, la Dim 05 no sale de la constante `ABC` en modo vigente, o el total escrito no calza con el calculado |
| T11 | El simulador de drivers de la Dim 02 reproduce el modelo y sus palancas son declaradas | una salida con los drivers del modelo no calza con su celda con un margen de 2%, un driver no trae lo observado, una meta se mide como cruce entre dos líneas y no contra el plan, o una palanca no viene de `_build/...-palancas.md` con quién la declaró y la fecha. `drivers-check.js` lo bloquea al construir |

## Checks por dimensión

**Dim 01 Founder.** ¿Está la señal de pivot ante cambios tecnológicos, con quote? ¿Se distingue founder enamorado del problema de founder enamorado de la solución de hoy?

**Dim 02 Negocio.** ¿Está nombrado **quién firma el cheque y desde qué presupuesto**? ¿Está nombrado **qué sustituto tiene el cliente hoy**? ¿El bloque de detalle económico trae su check de reconciliación? ¿La defensibilidad distingue ventaja estructural de ventaja contestable?

**Dim 03 Capital.** ¿El callout de fairness da veredicto explícito con las **dos verdades** (precio absoluto y múltiplo)? ¿Está el múltiplo forward además del trailing? ¿Los términos del deal de Lucha están fuera de Capital? ¿El cap table nombra el % de cada founder, incluidos los salientes?

**Dim 04 Mercado.** ¿El TAM es estimable con dato público, o se declara que no lo es? ¿La tabla competitiva verifica que cada competidor **hace lo que decimos que hace**?

**Dim 05 Impacto.** ¿Arranca con el Gate de Impacto y su nivel marcado? ¿N1 está presentado como el mejor nivel? ¿El self-assessment del founder está etiquetado como NO oficial? ¿El impacto se lee por trayectoria y no solo por la foto de hoy?

**Dim 06 Equipo.** ¿La escalera del Tribalómetro marca el peldaño con quotes tipadas por stage? ¿Se declara si el veto (stage 1-2) se activa o no?

**Dim 07 Storytelling.** ¿La conclusión publica los tres puntajes y un comentario corto, y nada más? Si la dimensión corrió con el Storytelómetro, ¿la rúbrica describe el instrumento y no el cambio de método?

**Dim 08 Bienestar.** ¿El PQ está marcado como inferido si no hay número? ¿Se declara si el veto de Grit se activa?

**Dim 09 Resiliencia.** ¿Cierra con el callout **"¿Qué tiene que ser cierto para que esta dimensión pase a verde?"**? ¿No hay doble conteo con Dim 02 Defensibilidad? **El callout de la ola se retiró el 2026-09-11.**

## Cierre del documento

| # | Check | Falla si... |
|---|---|---|
| C1 | Los conflictos abiertos del ledger están resueltos o declarados | un `Conflicto` del ledger no aparece ni resuelto ni marcado en el documento |
| C2 | Si el veredicto es no invertir: **sin Plan Luchante ni Calculadora** | están, contradiciendo el veredicto |
| C3 | Densidad comparable al EL de referencia | el documento sale en la mitad **y** falta contenido, no solo palabras |
| C4 | `node --check` del script del template pasa | el HTML quedó roto |
