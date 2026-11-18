---
name: cierre-el
description: >-
  Barre un Entendimiento Luchante completo contra cinco criterios verificables y dice qué dimensiones están cerradas y cuáles no, antes de comité. Dispara cuando alguien del equipo de LUCHA dice "corre el cierre",
  "cierra el EL", "está listo para comité", "qué falta para cerrar", "barre el expediente", "corre cierre-el", "qué dimensiones están cerradas", o cuando un EL en borrador va a mostrarse a comité o
  a un tercero. Dispara sin la palabra exacta si el pedido es saber si el documento está terminado o qué le falta. NO dispara para construir el EL o una dimensión (entendimiento-luchante), para el
  motor financiero (analisis-financiero-el), para el veredicto de precio (valorizacion-luchante), ni para la auditoría de razonamiento contra Taleb (climpi), que es otra cosa y se corre aparte.
---

# Cierre de un Entendimiento Luchante

> **Fuente reconstruida el 2026-08-30 desde `2026-08-29-protocolo-cierre-EL.md`**, porque este skill existía instalado y sin fuente en el repo. **Hay que diffearla contra la copia instalada antes de reinstalar.**

## Para qué existe

Un EL se construye dimensión por dimensión, en corridas distintas, y el ledger crece por acumulación. Eso funciona para construir y falla para cerrar, porque nunca hay un momento en el que alguien pregunte, dimensión por dimensión, si esto está terminado.

El síntoma es concreto: **cada pregunta nueva produce un hallazgo nuevo.** No porque el trabajo esté mal, sino porque nadie barrió el expediente entero una sola vez. Mientras no exista el barrido, los hallazgos aparecen al ritmo de las preguntas y el equipo pierde confianza en el documento.

Este skill es ese barrido. Se corre una vez, completo, antes de comité.

## Paso 0 · ¿Está declarado el Gate VC-backable?

**Si no está declarado por escrito, el barrido no arranca.** El gate decide el lente con el que se lee el caso entero y qué anclas aplican. Un EL sin gate declarado no se puede cerrar porque no se sabe contra qué rúbrica se puntuó.

Vive en `../entendimiento-luchante/references/sistema/el-system.md`. Si el gate dio **NO**, verifica además que se hayan usado:

- Las anclas de `../entendimiento-luchante/references/dimensiones/anclas-caso-no-vc-backable.md` en Dim 02, Dim 03 y Dim 04
- La ponderación de las nueve por gate, y los **tres números publicados**: Total, Selección y Retorno
- El modo CAJA de `valorizacion-luchante` (`../valorizacion-luchante/references/modo-caja.md`), con período de recupero en vez de `P_max`

Y la regla transversal: **ningún hecho que el gate usó para determinar el lente vuelve a puntuar en ninguna dimensión.**

## El estándar · los cinco criterios

Una dimensión está **cerrada** solo si pasa los cinco. **No hay cierre parcial.**

| # | Criterio | Cómo se verifica |
|---|---|---|
| **C1** | La aritmética reproduce | Subindicadores por pesos declarados = score publicado, al decimal que se publica |
| **C2** | Cada subindicador tiene justificación escrita | Existe el texto, no solo el número |
| **C3** | Ningún score portante descansa solo en input verbal | Confirmado contra documento, o cálculo nuestro reproducible |
| **C4** | Ningún conflicto abierto del ledger **contamina nuestro número** | Barrido del ledger por dimensión, clasificando cada conflicto en tres |
| **C5** | Ninguna pregunta con dueño pendiente movería el score más de 5 puntos | Sensibilidad **corrida**, no estimada |

**Regla dura de C5.** La sensibilidad se corre, no se opina. Si no se puede correr, la dimensión no cierra.

**Refinamiento de C4.** No todos los conflictos abiertos bloquean igual. Hay que clasificarlos en tres:

1. **Contaminan nuestro número.** Nuestro modelo usa uno de los dos valores en disputa. **Bloquean, y hay que correr la sensibilidad de cada uno.**
2. **Cerrados por decisión propia.** El documento de la empresa se contradice, pero nosotros cerramos ese supuesto por decisión y con fundamento. **No bloquean; se declaran.**
3. **Necesitan a un tercero.** El founder, su contador, o verificación externa. **Bloquean, con dueño y fecha.**

Sin esta clasificación, un ledger con veintidós conflictos abiertos parece que bloquea todo, cuando la mitad ya está resuelta por construcción.

## Cómo se corre · seis pasos

1. **Extraer la estructura viva del artifact**, no del recuerdo ni de un resumen. Scores, subindicadores, pesos y textos salen del HTML publicado.
2. **Verificar C1 sobre las nueve.** Es mecánico y va primero porque una aritmética que no cuadra invalida todo lo que se diga después.
3. **Barrer el ledger por dimensión** y listar los conflictos abiertos que tocan cada una.
4. **Correr la sensibilidad de C5.** Un escenario por cada decisión de método que no esté ratificada, más el escenario combinado, que es el piso.
5. **Clasificar** cada dimensión en cerrada, cerca o lejos, con el criterio que falla nombrado.
6. **Agrupar por causa, no por dimensión.** Varias dimensiones que fallan por lo mismo son un problema, no varios.

## Trampas conocidas

1. **Las dimensiones de un solo subindicador no tienen aritmética que verificar**, así que C1 pasa por defecto. Son justo las que más peso concentran sin respaldo. No confundir "no falla C1" con "está bien".
2. **Una misma persona puntuando dos dimensiones es doble conteo.** Hay que declararlo y correr el escenario sin ella.
3. **Un score verbal sin justificación escrita no es un dato, es una opinión sin fecha.**
4. **Si el score publicado no reproduce con los pesos declarados**, o los pesos están mal o el número se escribió a mano. Publicar dos decimales sobre un número escrito a mano es peor que publicar uno.
5. **Las reglas de conversión y de ponderación tienen que estar ratificadas antes de poblar**, no después.
6. **Todo input de un cálculo se verifica contra el ledger antes de correrlo, incluidos los propios.** Correr bien la matemática sobre un dato sin chequear produce un resultado limpio y equivocado, que es peor que un error visible.
7. **El barrido se hace entero y de una vez.** Contestar pregunta por pregunta produce el mismo trabajo repartido en el tiempo, pero destruye la confianza en el documento.
8. **El análisis vive en el archivo, no en el chat.** Una corrida que se explica en la conversación y de la que solo llega al archivo una línea de resumen **está perdida** en cuanto se cierre el chat. Ya hubo que rehacer una dimensión entera por esto.
9. **Una sensibilidad publicada tiene que estar corrida por el motor, no estimada.** Escalar el caso base por un factor y publicarlo como escenario es lo mismo que opinarlo, y ya produjo un hallazgo estructural equivocado.
10. **No dar por no verificable algo que sí está en el data room.** "No verificable en fuente pública" y "no está en el expediente" son cosas distintas, y confundirlas deja abierto un bloqueo que no existe.

## Salida

| Qué | Formato |
|---|---|
| La matriz | Una fila por dimensión, columna por criterio, más estado y qué falta |
| El conteo | **Cerradas X de 9** |
| La causa común | Agrupada, no dimensión por dimensión |
| La sensibilidad | Corrida, con el piso identificado |
| Lo que falta | Con dueño, y separando lo que bloquea de lo que no |

**Todo esto se escribe en el protocolo de cierre del caso**, `02_Casos/[EMPRESA]/YYYY-MM-DD-protocolo-cierre-EL.md`, que es un archivo vivo. Nunca solo en el chat.
