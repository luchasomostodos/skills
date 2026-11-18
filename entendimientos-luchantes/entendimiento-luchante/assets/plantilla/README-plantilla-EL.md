# Plantilla vigente del EL

`plantilla-EL-vigente.html` es **el único archivo de plantilla del EL**. El paso 5 de `entendimiento-luchante` la forkea literal (`cp`) y reemplaza contenido dimensión por dimensión.

## Por qué vive acá y no dentro de un caso

Porque antes vivía dentro de la carpeta de un caso, y los casos se archivan. El puntero se rompió dos veces: primero de Brote-EL-v3 a v5 (changelog v2.1 del skill), y otra vez cuando el v5 se archivó el 2026-08-04 y nadie lo notó por tres semanas. **El nombre del archivo no lleva fecha a propósito:** así el puntero del skill nunca caduca.

## Procedencia

El contenido de ejemplo es de un caso real anonimizado: los nombres de personas, empresas e instituciones son ficticios y los montos del caso están alterados (escalados por un factor fijo), así que las cifras calzan entre sí pero no son las reales. Las rutas `Brote/…`, `02_Casos/…` y `Archived/…` son del workspace del equipo y no existen en este repositorio. El generador que antes vivía en `generador/` ahora es `scripts/generador-el/`.

| Promovida | Origen | Por qué |
|---|---|---|
| 2026-08-25 | `Brote/EL/2026-08-10-Brote-EL-v7.html` (hoy en `Archived/2026-08-25-funnel-casos-cerrados/`) | Es el EL más reciente con las 9 dimensiones v7 y el triple check aplicado. El linaje viene del EL de Orbe. |
| 2026-09-29 | `02_Casos/Polímera/EL/2026-09-11-EL-polimera.html`, pasado por el generador (hoy `scripts/generador-el/`) con `--plantilla` | Piel nueva con la marca vigente, reglas 2026-09-28 con carril y Dim 09 configurables, Dim 05 con la ficha ABC, bloques en piezas, Validación en balanza por tema, Nunito y un solo ancho. La anterior está en `Archived/2026-09-29-sistema-EL/2026-09-29-plantilla-EL-brote-v7.html`. |
| 2026-09-29, tarde | La misma fuente de Polímera, con el generador actualizado | El color de la Dim 05 lo fija el nivel del Gate (N1 y N2 nunca en rojo, N3 como máximo amarillo, N4 rojo) y dice por qué cuando no calza con el número. El texto de ejemplo pasó por el barrido de prosa del séptimo vicio (`scripts/generador-el/prosa_plantilla.py`, solo con `--plantilla`), sin perder cifras, citas ni nombres. La anterior está en `Archived/2026-09-29-sistema-EL/2026-09-29-plantilla-EL-pre-color-impacto.html`. |
| 2026-09-30 | La misma fuente de Polímera, con el generador actualizado | Simulador de drivers del negocio en la Dim 02, con los cinco drivers del modelo de Polímera, resultados arriba y drivers abajo, calibrado al dólar contra las celdas del modelo. Las palancas salen en "Por declarar" porque no se declararon para ese caso. La anterior está en `Archived/2026-09-30-sistema-EL/2026-09-30-plantilla-EL-pre-drivers.html`. |

## Cómo promover una plantilla nueva

Es una **decisión explícita**, no un efecto colateral de qué caso está vivo:

1. Sobrescribir `plantilla-EL-vigente.html` con el EL nuevo.
2. Agregar una fila a la tabla de arriba: fecha, caso de origen, y por qué reemplaza a la anterior.
3. La versión anterior va a `Archived/`, no al lado.

No se renombra el archivo ni se le pone fecha. No se crea `plantilla-EL-v2.html`.

## Qué edita cada caso

La plantilla trae datos de ejemplo de un caso cerrado y anonimizado (Polímera, nombre ficticio). El caso reemplaza las constantes de datos y deja el código intacto.

| Constante | Qué es |
|---|---|
| `EL_REGLAS` | Versión de reglas, carril (VC-backable, vertical, deeptech, tipo, IA nativa, si vende) y Dim 09 (`id`, `ia` o `ninguna`). De aquí salen los pesos, el total y el bloque de Metodología |
| `ABC` | La ficha de impacto. `modo: 'vigente'`, resultado de personas o del planeta, nivel del Gate, confianza, las seis anclas con lectura y origen, los riesgos activos y `multiplicador: 'auto'` |
| `STRUCT` | Los bloques de subvariable en piezas |
| `VALIDACION_EXTERNA` | Las opiniones, más `voces` (iniciales, vínculo y nivel de 0 a 5) y `temas` (dims, veredicto y la cita que decide) |
| `DRIVERS` | El simulador de la Dim 02, en `scripts/generador-el/drivers-caso.js`. `drivers` (entre tres y cinco, con valor del modelo, rango, lo observado y `palanca` con `estado` `lucha`, `mercado` o `pendiente`), `salidas` (con valor del modelo y celda, el capital que falta con `enlace: 'capital'` y su umbral), `metas` (driver, salida, comparación y umbral del plan), `nota`, y `calc`, la fórmula del modelo. `scripts/generador-el/drivers-check.js` lo valida en cada construcción y bloquea si no calza al 2% o si en un caso queda una palanca pendiente |
| `DATA`, `SECTIONS`, `CASO` y el resto | El contenido del caso, como antes |

Para regenerar la plantilla desde otro EL, `python3 transform.py [EL fuente] [salida] --plantilla` en `scripts/generador-el/`. Sin `[salida]`, escribe sobre `../../assets/plantilla/plantilla-EL-vigente.html`. Para revisar el simulador de drivers: `node drivers-check.js drivers-caso.js --plantilla` (sin `--plantilla` bloquea mientras haya palancas por declarar, que es lo esperado en la plantilla).
