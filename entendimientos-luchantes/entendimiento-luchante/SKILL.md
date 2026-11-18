---
name: entendimiento-luchante
description: >-
  Orquesta la construcción de un Entendimiento Luchante (EL) completo: inputs, data room, fan-out en subagentes por bloque, artifact con formato estándar y verificación
  adversarial. Dispara cuando alguien del equipo de LUCHA dice "corre, entendimiento completo", "corre el EL de [empresa]", "armemos el EL", o abre/retoma un caso en Lucha/Funnel/02_Casos/ y
  pide construir el EL. Dispara también al construir o retomar una dimensión suelta del Mapa Luchante (Founder, Negocio, Capital, Mercado, Impacto, Equipo, Storytelling,
  Bienestar, Resiliencia Tecnológica), Validación externa, Plan o Apuesta de un EL, y para el bloque de madurez y precio (vector RLA y los tres números de valorización). NO
  dispara para solo el motor financiero (analisis-financiero-el), solo la valorización (valorizacion-luchante), solo el Tribal Score (tribalometro), ni para housekeeping.
  Es el director de orquesta; llama a esos skills cuando toca.
---

# Entendimiento Luchante (orquestador del EL) · v3.7

Construye el EL de un caso de punta a punta, o retoma una sección. No reinventa el formato: lo consume de `references/sistema/el-system.md` (espina) y de `references/dimensiones/` (detalle por dimensión, carga diferida). Es el director de orquesta: reparte en subagentes paralelos y cierra con un verificador adversarial. La sesión principal debe correr en Fable u Opus; si no, avísale al líder del caso antes de arrancar.

## Archivos incluidos

Las rutas de este skill son relativas a su carpeta. Las carpetas de casos (`Lucha/Funnel/02_Casos/`, el Drive compartido y Notion) viven en el workspace del equipo, no acá.

**`references/`**

- `sistema/el-system.md`. La espina del EL: orden de carga, Gate VC-backable, ponderación, semáforo, inputs (sección B), checklist del data room (C), errores comunes (D), frentes de comité (E), Runbook del Drive del caso (G) y el barrido de prosa. Se lee siempre, antes de empezar.
- `dimensiones/`. `carril-y-version-de-reglas.md` se lee siempre. Un archivo por dimensión, de `dim-01-founder.md` a `dim-09-resiliencia.md`, que se abre solo al construir esa dimensión. `anclas-caso-no-vc-backable.md` solo si el gate da NO. `regla-de-conversion-de-scores.md` al convertir los scores de partners, y `secciones-transversales.md` al producir el artifact.
- `contrato-subagente.md`. Se copia al prompt de cada subagente del Paso 3.
- `rubrica-calidad.md`. Gate del Paso 5 y parte del verificador del Paso 7.
- `kill-criteria.md`. Filtros de entrada del Funnel y banderas de auto-auditoría. Los subagentes cruzan sus banderas contra él.
- `parametros-del-fondo.md`. Parámetros de diseño del Fondo Luchante (horizonte, métrica de retorno, fees, cascada, CADE) que mueven el gate y la valorización. Se revisa cuando cambia el memo del Fondo.
- `portfolio-fit-check/`. `especificacion.md` y un `ejemplo.md` trabajado, para el Paso 2.
- `prompts/`. `prompt-arranque-el.md` abre cada EL en su chat. `bloque-impacto-prompt-research.md` va en el research del Paso 0. `prompt-procesar-transcripts.md` limpia y preprocesa cada reunión antes de que entre al caso.
- `voz-y-visual/`. `visual-standards.md` y `voice-principles.md`, para el Paso 5 y para todo texto del EL.

**`assets/`**

- `plantilla/plantilla-EL-vigente.html`. La plantilla que se forkea en el Paso 5. `plantilla/README-plantilla-EL.md` explica sus constantes de configuración y cómo se promueve una plantilla nueva.
- `formatos/plantilla-modelo-financiero-founders.xlsx` y `formatos/data-room-checklist.pdf`. Lo que se le pide al founder en el Paso 1 y contra lo que se valida el data room en el Paso 2.

**`scripts/generador-el/`**

- `transform.py` regenera la plantilla desde un EL cerrado (`python3 transform.py [EL fuente] [salida] --plantilla`) e inyecta los `.css`, `.js` y `header.html` de la carpeta (piel, carril y reglas, ficha ABC, bloques `STRUCT`, Validación externa, simulador de drivers, modo oscuro). `prosa_plantilla.py` es el barrido de prosa que corre con `--plantilla`.
- `drivers-check.js` es el control que bloquea en cada construcción (Paso 5 y check T11): `node drivers-check.js drivers-caso.js`. `drivers-caso.js` y `valida-caso.js` son ejemplos de las constantes `DRIVERS` y `VALIDACION_EXTERNA` de un caso.
- `mkprev.py` y `test12.js` arman una vista previa y la prueban con Playwright.

## Antes de empezar

Lee `references/sistema/el-system.md` y `references/dimensiones/carril-y-version-de-reglas.md`, que trae el Gate B, los pesos del vector por tipo y la versión de reglas vigente. **No cargues el resto de `references/dimensiones/` completo:** abre solo el archivo de la dimensión que estás construyendo, cuando la estés construyendo.

El caso vive en `Lucha/Funnel/02_Casos/[EMPRESA]/` con esqueleto fijo (`00_Reference/Estructura Lucha.md` del workspace del equipo, sección 2.2). Tres reglas de esa referencia que aplican acá: el EL vivo va en `EL/`, uno solo; lo que manda el founder entra a `data-room/_crudo/` **sin renombrar**; los productos de los pasos 6 y 7 van a `entregables/` y los insumos del armado a `_build/`.

Mantén vivo el `log-construccion.md` del caso: qué se construyó, con qué input, qué subagentes corrieron, qué hueco apareció.

Lo que se cruza con el founder no vive en el caso local sino en su carpeta del Drive compartido (Funnel › 02_Casos › [EMPRESA]), con tres subcarpetas, `01_Preguntas y pedidos`, `02_Data room` y `03_Legal en revisión`. Al founder se le comparten solo `01` y `02`. Qué hacer al abrir el caso, al armar preguntas y al mandar documentos legales a revisión está en `references/sistema/el-system.md`, Runbook, sección G.

## Paso previo · Declarar el carril

Es lo primero al entrar al EL, justo después del pitch, porque define qué se hace en el resto del proceso. Propón el carril en un loop con el líder del caso, con el deck, el transcript del pitch y el Portfolio Fit Check.

1. **Gate A.** VC-backable sí o no, con las cuatro preguntas del paso 2b. Si es sí, vertical Access Tech o Climate Tech, y deeptech solo si es Climate Tech. Si es no, Green Zebra.
2. **Gate B.** El tipo de negocio entre los seis de `carril-y-version-de-reglas.md` y si es IA nativa.
3. **Negocio.** Si ya vende o es pre-revenue.

Escribe la propuesta con sus razones y espera la declaración del líder del caso. Anota en `log-construccion.md` el carril declarado y la versión de reglas del caso.

## Paso 0 · El ledger de hechos

`02_Casos/[EMPRESA]/hechos.md`. Una fila por afirmación portante del caso: afirmación, valor, período, fuente, ubicación, quién lo dijo, `estado del dato`, con qué está en conflicto, dimensión, dueño de resolver.

`estado del dato`: **Confirmado** (documento o fuente pública verificable) · **Inferido** (derivado, se explicita de qué) · **Input verbal** (lo dijo alguien, sin documento) · **Cálculo Lucha** (derivado por nosotros) · **Conflicto** (dos fuentes discrepan) · **Faltante**.

Con el ledger arranca el **research en tres motores**, en paralelo con el parseo del modelo. Escribe el prompt del caso (mercado, ventana de obsolescencia por IA, el bloque de impacto de `references/prompts/bloque-impacto-prompt-research.md` y, si es deeptech, la tesis técnica). El líder del caso lo corre en Perplexity Deep Research, Gemini Deep Research y Claude Research, y las salidas van sin editar a `mercado/`. Cruza las tres. Donde dos o tres convergen con fuente primaria, la fila sube a Confirmado. Donde discrepan, queda en Conflicto y no se promedia.

El ledger se abre con el caso y crece con cada input. Es lo que leen los subagentes, lo que audita el verificador del paso 7, y de donde sale el memo de comité filtrando por `Conflicto`. Una fila sin fuente no es un hecho, es un hueco.

## Paso 1 · Pedir los inputs

Pide de una sola vez los 9 inputs de la sección B de `references/sistema/el-system.md`. El modelo financiero se pide con el formato de `assets/formatos/plantilla-modelo-financiero-founders.xlsx`. Marca lo que falte como hueco; no bloquees por una pieza.

**Frontera entre recolectar y analizar.** Mientras el set de inputs esté abierto: extrae, cruza y flaguea. **No puntúes, no compares contra benchmark y no opines del caso.** Las banderas de conflicto entre fuentes sí se registran al aparecer, en el ledger, porque guardarlas hasta el final llega tarde. El paso a análisis es una decisión explícita del líder del caso.

## Paso 2 · Validar el data room

Contrasta contra el checklist C (el que recibe el founder es `assets/formatos/data-room-checklist.pdf`). Señala faltantes antes de construir. Corre el Portfolio Fit Check (E2) si no se hizo, con `references/portfolio-fit-check/especificacion.md` (hay un ejemplo trabajado en `ejemplo.md`); su salida alimenta Dim 04.

En la carpeta 6 de Impacto no se pide un marco de impacto. Se pide lo que ya exista. Que el founder no tenga su impacto medido no es un faltante que bloquee, es lo que LUCHA construye con él.

## Paso 2b · Confirmar el carril · bloquea el puntaje

**El carril declarado en el paso previo se confirma por escrito antes de puntuar la primera dimensión**, ya con el ledger y el cruce de los tres motores. Decide el lente con el que se lee el caso entero, y cambiarlo a mitad de camino invalida los scores ya puestos. **Solo cambia si un hecho del ledger, con su fuente, lo justifica**, y se escribe qué hecho lo cambió. El Gate B lo confirma además el paso 2.5 de `analisis-financiero-el` con el modelo. Si el modelo contradice el tipo, es una parada.

**No se llama Paso 0.** El Paso 0 de este skill es el ledger de hechos. Son dos cosas distintas.

El Fondo Luchante es un vehículo de 30 años diseñado para invertir también en empresas que no son VC-backable. **Que una empresa no lo sea no la descalifica: la manda a otro lente.**

Cuatro preguntas, con evidencia:

1. ¿Existen precedentes de adquisición de empresas **como esta**, no como esta industria?
2. ¿El negocio necesita ser enorme para ser rentable, o lo es a la escala que puede alcanzar?
3. ¿Qué quiere el founder?
4. ¿El mercado soporta un resultado de 10x en el horizonte del fondo?

**No confundir "no VC-backable" con deeptech.** Las deeptech sí son VC-backable, con sus propias reglas. Son dos ejes independientes: el tipo de empresa decide los pesos del vector RLA, el gate decide el lente de retorno. Se declaran los dos, por separado.

### Qué cambia si el gate da NO

| Qué | Dónde |
|---|---|
| Las anclas de Dim 02, Dim 03 y Dim 04 | `references/dimensiones/anclas-caso-no-vc-backable.md` |
| La ponderación de las nueve dimensiones | `references/sistema/el-system.md` |
| La valorización pasa a modo CAJA, con período de recupero | `../valorizacion-luchante/references/modo-caja.md` |

Y una regla que aplica siempre: **ningún hecho que el gate usó para determinar el lente vuelve a puntuar en ninguna dimensión.** Cobrarlo dos veces ya nos pasó en dos dimensiones distintas del mismo caso.

**El gate se declara en el bloque de Metodología del EL.** Un lector que no ve el lente primero interpreta mal cada score de abajo.

## Paso 2c · Ficha de impacto antes del Gate de Impacto

Corre `impacto-luchante` en su versión corta, con el deck, el pitch y el bloque de impacto del research en tres motores. La ficha le llega a quien es Responsable de Impacto antes del Gate de Impacto. Si el resultado es del planeta, la ficha usa la versión planeta provisional de las anclas, y el multiplicador de riesgo resta 0,05 por riesgo activo con piso en 0,6, los dos en `dim-05-impacto.md`. El nivel N1 a N4 clasifica el modelo con el ABC y decide si el caso sigue. El puntaje de la Dim 05 sale de sus seis subdimensiones, según `references/dimensiones/dim-05-impacto.md`. Solo hay tres causas de veto, daño sin corrección, un negocio que crece sin que crezca el resultado, o un founder que no quiere el resultado o no acepta medirlo.

## Paso 2d · Operación en dos olas, con paradas y corte

El detalle vive en `references/sistema/el-system.md`, sección "Operación del EL · primero analizar". Lo que este skill hace en cada parte.

- **Paradas.** Si falta un insumo, dos fuentes se contradicen en un hecho que mueve un puntaje, el modelo no alcanza, o en el corte el caso no se sostiene, **detén la corrida**. Reporta qué encontraste, qué falta, qué costaría seguir y con qué supuesto seguirías, y espera la decisión del líder del caso (pedir el dato, seguir con supuesto declarado o cerrar).
- **Dos rondas de preguntas al founder, una por ola.** Arma cada ronda completa y bárrela contra el material del founder antes de mostrarla. Las preguntas para las reuniones de partners de la Ola 2 entran a la ronda 2, con una sección por reunión. Nada sale sin el OK del líder del caso sobre el texto exacto. Con el OK, la ronda se crea como Google Doc nativo en `01_Preguntas y pedidos` del Drive del caso, con el nombre `AAAA-MM-DD-Empresa-preguntas-y-pedidos-ronda-N` (Runbook, sección G2).
- **Ola 1.** Mercado, Negocio e Impacto, con la ficha de impacto del paso 2c antes del Gate de Impacto.
- **Corte de continuidad.** Reporta qué sostiene el caso, qué falta y qué costaría la Ola 2. Deciden el líder del caso y el Partner de Mercado entre sigue, se reformula con condiciones y fecha, o se para. Si se para, escribe en `aprendizajes-por-caso.md`.
- **Ola 2.** Solo si el corte dio que sigue.
- **Casos que ya avanzaron.** Si el caso ya tuvo reuniones de partners, corre igual la Ola 1 y el corte con lo que existe, usa las reuniones como insumo y decláralo en Metodología.

## Paso 3 · Fan-out por olas

Cuatro subagentes. Los bloques se definen por fuente de input, no por número de dimensión. **En la Ola 1 corren solo Negocio (02) del bloque A, Mercado (04) del bloque C y la ficha de impacto. En la Ola 2 corren el resto**, Capital (03) con el vector de madurez y la valorización, el bloque B completo, Resiliencia (09) y Validación externa del bloque C, y el bloque D. Los pesos del vector salen de `carril-y-version-de-reglas.md`, no de la tabla de `../valorizacion-luchante/references/rla-madurez.md`.

| Bloque | Cubre | Modelo | Inputs |
|---|---|---|---|
| A. Motor financiero y precio | Negocio (02) + Capital (03) + **vector RLA y valorización** | Sonnet | modelo .xlsx, cap table, SAFEs, datos del deal, data room para evidenciar los niveles RLA |
| B. Founder completo | Founder (01) + Equipo (06) + Bienestar (08) | Sonnet | transcripts etiquetados, self-assessment, Grit, PQ, Saboteur, scores de partners |
| C. Mercado y ola | Mercado (04) + Resiliencia (09) + Validación externa | Sonnet | research de mercado, research de IA, salida del Fit Check |
| D. Data room y caso | Caso brief + Mapa BMC + extracción de campos + ficha de impacto (05, de `impacto-luchante`) y Storytelling (07) | Haiku | data room completo, fotos, ficha de impacto validada por quien es Responsable de Impacto |

**Bloque A, cadena obligatoria:** corre `analisis-financiero-el` (unit economics, márgenes, proyección, banderas, ratio Studio/FL) y con su pack invoca `valorizacion-luchante` en **modo ENTRADA**. Devuelve, además de Dim 02 y 03: los tres números de la Regla Cero (precio de entrada, valor implícito hoy, valor alcanzable), el test de alcanzabilidad del cap, `P_max`, y el **vector RLA de 8 dimensiones con evidencia por dimensión**. `analisis-financiero-el` ya no emite veredicto de precio; no lo pidas ahí. El aspecto Impacto del vector se lee con la escalera de madurez de impacto de `impacto-luchante`, que mide qué tan medido está el impacto y no cuánto impacto hay.

El contrato de salida está en `references/contrato-subagente.md`. Cópialo al prompt de cada subagente. Cada subagente recibe **rutas**, no contenido: las de sus archivos del caso y las de sus dimensiones en `references/dimensiones/`. La sesión principal no carga las dimensiones que no redacta.

**Parada de palancas, al cerrar el Bloque A.** `analisis-financiero-el` entrega el pack de drivers de la Dim 02 sin palancas. Detén la corrida y pregúntale a quien hace el EL, driver por driver, tres cosas. Si LUCHA puede mover ese driver. Si puede, con qué acción concreta. Y hasta qué valor. **No propongas palancas ni clasifiques drivers por tu cuenta**, son compromisos de LUCHA y no hechos de la empresa. Muestra cada driver con su valor del modelo y lo observado, y espera. Guarda las respuestas en `_build/YYYY-MM-DD-[empresa]-palancas.md` con quién respondió y la fecha, anota una línea en `log-construccion.md`, y lleva a `drivers-caso.js` del caso (el formato está en `scripts/generador-el/drivers-caso.js`) el estado `lucha` (con acción, hasta, quién y fecha) o `mercado` (con quién y fecha). Las palancas declaradas entran también al Plan 18 meses.

Fallback: un reintento con feedback; si falla otra vez, ese bloque se construye secuencial en la sesión principal. Nunca se cae el EL completo por un bloque.

## Paso 4 · Fan-in y transversales

1. Consolida. Conflicto entre bloques = hallazgo al ledger, **nunca promediar**.
2. Junta todas las preguntas de huecos en un solo mensaje al líder del caso.
3. Revisión con el líder del caso **por bloques, una pasada consolidada** (no sección por sección). Aplica al análisis, no a la producción del HTML.
4. Con los bloques validados, redacta lo transversal, que sí es secuencial: Diagnóstico, Insights, Impacto, Storytelling, La Contra, Apuesta, Plan 18 meses, Términos.

## Paso 5 · Producción del HTML

Solo la sesión principal, con lucha-brand y Visual Standards (`references/voz-y-visual/visual-standards.md`, y la voz en `voice-principles.md`), una sola mano en voz y visual.

1. **Verifica que la plantilla existe** antes de forkear: `test -f "assets/plantilla/plantilla-EL-vigente.html"`, desde la carpeta de este skill. Si no está, para y avisa. No la busques dentro de una carpeta de caso: ahí es donde el puntero se rompió dos veces.
2. **Forkea la plantilla vigente literal** (`cp`). Conserva CSS, componentes, SVGs y renderers intactos. Nunca regeneres el markup "usando las clases del template": produce documentos flacos.
3. **Reemplaza contenido dimensión por dimensión** editando las constantes de datos, con edición quirúrgica verificable (asserts de reemplazo y `node --check` tras cada empalme). El código de la plantilla no se toca. Cinco constantes de configuración mandan sobre lo demás, y están descritas en `assets/plantilla/README-plantilla-EL.md`.
   - `EL_REGLAS` lleva la versión de reglas, el carril y la Dim 09 (`id`, `ia` o `ninguna`). De ahí salen los pesos, el total, Selección y Retorno, el encabezado y el bloque de Metodología. **El total no se escribe a mano**, se calcula.
   - `ABC` lleva la ficha de impacto en `modo: 'vigente'`, con `multiplicador: 'auto'`. La Dim 05 del mapa sale de ahí.
   - `STRUCT` lleva los bloques de subvariable en piezas.
   - `VALIDACION_EXTERNA` lleva las opiniones más `voces`, con iniciales, vínculo y nivel de 0 a 5, y `temas`, con sus dims, el veredicto en una línea y la cita que decide el tema. Validación externa se lee como una balanza por tema, no como una pila de citas.
   - `DRIVERS` lleva el simulador de la Dim 02, en `drivers-caso.js`. Los drivers, la fórmula `calc`, las salidas y las metas vienen calibrados de `analisis-financiero-el`. Las palancas vienen de la parada del Paso 3. El generador corre `scripts/generador-el/drivers-check.js` en cada construcción y **bloquea** si una salida no calza con el modelo con un margen de 2% o si una palanca quedó por declarar.
4. **Redacta desde las fuentes crudas.** Los bloques del fan-out son índice y scores; las quotes y el detalle salen del transcript y del modelo, usando las ubicaciones que el ledger trae. Si el volumen excede el contexto, usa subagentes mineros con contrato de quotes verbatim más ubicación, y redacta tú.
   **Cada bloque de subvariable se escribe en piezas y no en párrafos**, según la sección "Los bloques de subvariable van en piezas" del paso 9. El texto corrido se conserva como respaldo plegado debajo de cada bloque.
5. **Vara de calidad:** construye UNA dimensión a profundidad completa (Dim 02 o Dim 01), pásala por `references/rubrica-calidad.md`, muéstrasela al líder del caso y espera su aprobación antes de replicar.
6. **Bloque de madurez y precio.** Entre Dim 03 (Capital) y Validación externa va el bloque RLA, según la spec de render de `../valorizacion-luchante/references/bloque-el-rla.md`: los tres números de la Regla Cero en tarjetas de igual peso (ninguna seleccionable), el vector de 8 dimensiones ordenado por peso del tipo de empresa con nivel, definición textual y evidencia visible, y el cierre que conecta el RLA ponderado con `p`, `M_win` y `P_max`. Una fila sin evidencia se renderiza en el nivel inferior que sí la tenga, marcada.
7. **Gate final:** la rúbrica completa. El estado mixto plantilla más caso es solo de trabajo: nunca se muestra ni se entrega.

## Paso 6 · Anticipar el comité

Sección E del runbook: los cuatro frentes recurrentes (adicionalidad cross-portfolio, exit y protección de retorno, fairness de valuación, dinámica del equipo), más un quinto desde el 2026-09-28, **impacto frente a retorno**. Dónde cae el caso en el plano de Dim 05 contra retorno esperado, comparado con el portafolio, cuánto retorno cedemos por cuánto impacto y, si es N3, la meta C con su plazo. Memo `YYYY-MM-DD-[empresa]-respuestas-preguntas-comite.md` en `entregables/`, con respuesta corta, argumento, evidencia y **contra-argumento honesto** por pregunta. Los comparables internos de portafolio van en el memo, no en el artifact.

## Paso 7 · Verificación adversarial (bloquea la publicación)

Subagente verificador con contexto limpio (Sonnet; Opus si el ticket es alto). Recibe el borrador, las rutas de las fuentes, el ledger, y las resoluciones de banderas ya tomadas. No recibe el razonamiento de los otros bloques.

Audita **contra el ledger y contra las fuentes**, no contra la prosa del borrador:

1. Recalcula las métricas clave desde el .xlsx y el cap table fuente. Divergencia = hallazgo.
2. Cada fila del ledger con `Conflicto` está resuelta o declarada en el documento.
3. Quotes literales contra los transcripts.
4. Consistencia scorecard vs tarjetas vs conclusiones.
5. Comparables verificados: que cada competidor citado **haga lo que decimos que hace**.
6. La rúbrica completa de `references/rubrica-calidad.md`.

Salida: hallazgos con severidad (rojo bloquea, amarillo a criterio del líder del caso, nota informativa) más veredicto publicable sí o no. Rojos abiertos = no se publica. Registra el resultado en `log-construccion.md`.

**Después del verificador corre `climpi`, una vez, sobre el borrador casi final.** El verificador revisa que los hechos sean ciertos y `climpi` revisa que lo que concluimos con esos hechos aguante. Sus reemplazos de apuesta declarada entran al documento en registro de comité. Sus rojos abiertos bloquean la publicación igual que los del verificador. Se registra en `log-construccion.md`.

## Paso 8 · Cierre antes de comité

Un EL se construye dimensión por dimensión y en corridas distintas, así que nunca hay un momento en que alguien pregunte, dimensión por dimensión, si esto está terminado. **El síntoma es que cada pregunta nueva produce un hallazgo nuevo.**

Corre el skill **`cierre-el`** (`../cierre-el/`), que barre el expediente entero una sola vez contra cinco criterios verificables y dice qué dimensiones están cerradas y cuáles no.

**El barrido se hace entero y de una vez.** Contestar pregunta por pregunta produce el mismo trabajo repartido en el tiempo y destruye la confianza en el documento.

Y una regla dura que salió de ahí: **el análisis vive en el archivo, no en el chat.** Una corrida que se explica en la conversación y de la que solo llega una línea de resumen al archivo **está perdida** en cuanto se cierre el chat. Ya nos costó rehacer una dimensión entera.

## Después del comité · documentos legales a revisión

Si el comité aprueba y toca revisar documentos legales, sigue `references/sistema/el-system.md`, Runbook, sección G3. El orden no cambia. Los borradores de LUCHA van a `03_Legal en revisión`, se le comparte `03` primero a Legal, y el founder la ve recién cuando los documentos quedaron en versión limpia, sin los comentarios de Legal. Compartir y escribirle a alguien piden el OK del líder del caso cada vez. Lo firmado entra al expediente por `Impact Studio/Portfolio_Legal/[Empresa]/` del workspace.

## Hechos que no se pueden inferir (no los toques)

Esta lista no son guardarraíles de criterio: son datos del mundo que se sacan mal razonando de primeros principios.

- **N1 es el MEJOR nivel del Gate de Impacto.** Desde el 2026-09-28 los niveles clasifican el modelo con el ABC. N1 es C por diseño, N2 C con desarrollo, N3 C potencial con meta C y plazo, N4 veto. Ya no se convierten a puntaje. No invertir la escala.
- **En Impacto se mide el modelo, no cuánto mide hoy el founder.** La falta de medición va a la etiqueta de confianza, no al nivel.
- **PQ Score ≠ Saboteur Assessment.** Dos instrumentos. Sin el número de PQ, va marcado inferido.
- **Dim 09 ≠ Dim 02.** Dim 02 mide el foso de hoy. Dim 09 mide **dónde está la tecnología en su vector de madurez**, no cuánto la amenaza la IA. Los tres ejes de software (comoditización por IA, moat ante IA, posicionamiento frente a la ola) **se retiraron el 2026-09-11**. La capacidad de pivot se puntúa en Dim 01. **Pendiente de sistema**, si el vector RLA que ya tiene bloque propio en el EL es también lo que puntúa Dim 09, o si viven separados. Ver `references/dimensiones/dim-09-resiliencia.md`.
- **Referencias de valuación** (mediana pre-seed LatAm ~USD 4.05M, healthcare US pre-seed ~USD 6.2M, rango de entrada de Lucha USD 3M-8M). Son referencia, no ancla, y siempre se dicen las dos verdades: precio absoluto y múltiplo.
- **El modelo financiero es la verdad de su sección.** Márgenes y EBITDA van neutros, no como bandera.
- **EL con veredicto de no invertir:** sin Plan Luchante ni Calculadora.

## Paso 9 · La forma del documento, y lo que no se reinterpreta

Tres reglas que salieron del cierre de Selva Bio el 2026-09-12 y valen para todo EL.

### La estructura

**Metodología va al final del documento**, después de los Términos del deal y antes del footer, con sus bloques plegados. Es lo nuestro y el comité lee el caso, no el método. **No hay nota de método por dimensión**, se retiró del sistema.

Metodología cierra con el **diagrama de proceso**, el de cuatro columnas, lo que entra, los motores que lo procesan, el borrador y lo que sale, con los loops de auditoría como flecha de retorno. La fuente del diagrama es el EL de Marea, en el workspace del equipo. **Se porta, no se rediseña.**

### Cómo se cuentan los loops

La regla es la de Marea y está escrita en `Marea Regenerativa/paquetes/notebook-lider-del-caso/16-metodologia.md`, en el workspace del equipo. **Un caso que la cuente distinto no se puede comparar con los anteriores.**

| Métrica | Qué cuenta |
|---|---|
| **Vueltas** | Barridos completos del expediente, entre revisiones de razonamiento y verificaciones automáticas |
| **Correcciones a lo nuestro** | Hallazgos que cambiaron algo que **nosotros** escribimos o calculamos. No hallazgos sobre la empresa |
| **Verificaciones que corren solas** | Chequeos que se disparan en cada publicación y **bloquean** si algo no cuadra. Un script que siempre sale en cero no cuenta acá, es un informe y hay que leerlo |

Los cambios que pide el sponsor **se declaran aparte** y no se suman a las correcciones propias. Inflar el número propio con feedback recibido es lo mismo que inflarlo. Referencia, Marea cerró en 11, 64 y 6. Selva en 17, 63 y 10, más 50 cambios del sponsor declarados por separado.

### Los bloques de subvariable van en piezas

Regla del 2026-09-28, del EL de Polímera. El comité no lee párrafos de ocho líneas. Cada subvariable con bloque propio (Negocio, Capital, Mercado, Equipo e I+D o Dim 09) se escribe en este orden, y cada pieza es opcional salvo la tesis.

| Pieza | Qué lleva | Regla |
|---|---|---|
| **Tesis** | Una o dos frases con el veredicto de la subvariable | Va primero. El borde toma el color del semáforo de la subvariable |
| **Cifras** | Hasta tres tarjetas, cada una con rótulo, número grande y una frase que lo explica | Si la cifra se compara contra otra (pedido contra soportado, hoy contra meta), lleva barras. Si es una composición (uso de fondos, cap table, caja), lleva barra partida |
| **Visual del original** | Una pieza aprobada que ya existe en la plantilla (tabla competitiva, quotes por founder) | Se mueve tal cual, no se redibuja |
| **Puntos** | Lista numerada de dos a cuatro ítems, cada uno con una frase en negrita y su detalle | Para causas, sustitutos o razones que hoy viven enumeradas dentro de un párrafo |
| **Tablas** | Filas de dos o tres columnas, con encabezado y fila de total cuando suma | Para contratos, derechos, tasas o escenarios. Nunca una tabla para una sola fila |
| **Llamados** | Uno o dos recuadros, el hallazgo (rojo), la palanca (teal), lo que sí está (verde) o cómo leer el dato (azul) | Uno por idea. El rojo explica por qué es rojo |
| **Nota** | "Lo que esto no dice", o una cautela de método con título propio | Cierra el bloque. Evita que el lector sobreinterprete |

Cuatro reglas que no se negocian.

1. **Ningún dato se pierde en la conversión.** Cada cifra, nombre, fecha y fuente del texto corrido aparece en alguna pieza. El verificador del paso 7 lo compara.
2. **El texto original queda plegado debajo** como "Ver el texto original", hasta que el formato se asiente en tres casos.
3. **Los datos viven en una constante `STRUCT` separada**, por dimensión e índice de subvariable. El renderer de la plantilla vigente la lee, no se escribe HTML a mano por bloque.
4. **Las dimensiones sin bloque propio** (Founder, Impacto, Storytelling, Bienestar) siguen con su "por qué" corto, que ya cumple.

### El documento habla en registro de comité

Regla del 2026-09-29. El EL es un documento ejecutivo sobre la empresa y la decisión, no el diario de nuestra revisión. El cuerpo no nombra nuestras fuentes ni nuestro trabajo como sujeto de la frase. La lista de palabras que no van, los pares de "no así, así" y dónde va la procedencia están en `references/sistema/el-system.md`, en el séptimo vicio del barrido de prosa. El check T9 de la rúbrica lo verifica.

**Ojo con la plantilla.** Trae el texto de ejemplo de un caso cerrado. Pasó por el barrido del séptimo vicio el 2026-09-29, pero igual se reemplaza entero y no es modelo de tono, el modelo es `references/sistema/el-system.md`.

### Una pieza aprobada se porta tal cual

**Cuando una pieza de un EL anterior ya recibió feedback bueno, se copia con su markup, su CSS y su JS, y solo cambian los datos.** Replicar la lógica y rehacer el UI es un error, y cuesta una vuelta entera.

El caso concreto fue la **Calculadora Luchante**. La fuente canónica es el EL de Orbe, `2026-06-01-EL-Orbe-artifact.html` en la carpeta del caso del workspace del equipo, sección `id="terminos"`. Trae cinco bloques, Inputs del deal, Perspectiva del Founder, Perspectiva del Fondo Luchante, Perspectiva del Impact Studio y Resumen Lucha consolidado, más el banner de Setting recomendado, el slider espejo de programa en % contra USD, y la tabla de Otros términos del instrumento. **Si al portarla se pierde alguno de esos, no está portada.**

Corolario, **esa copia conserva su redacción original aunque choque con una regla de estilo vigente.** Los dos puntos de la calculadora de Orbe se quedan, y la excepción se declara en el protocolo del caso.

## Qué NO hace este skill

No asigna los scores finales (los cierra el comité) ni reemplaza el juicio de los partners. No corre el motor financiero, el tribalómetro ni el branding: los invoca. No hace housekeeping del workspace.

---

Changelog: **v3.7 (2026-10-06).** El caso tiene carpeta en el Drive compartido de Funnel con `01_Preguntas y pedidos`, `02_Data room` y `03_Legal en revisión`. Las rondas de preguntas se crean ahí como Google Doc, y las preguntas para reuniones de partners de la Ola 2 entran a la ronda 2. Sección nueva después del paso 8 para la revisión legal post comité, primero Legal y después el founder con versiones limpias. El detalle vive en `references/sistema/el-system.md`, Runbook, sección G.

Changelog: **v3.6 (2026-09-30).** Simulador de drivers del negocio en la Dim 02, quinta constante `DRIVERS`. Parada de palancas al cerrar el Bloque A, donde quien hace el EL declara si LUCHA mueve cada driver, con qué acción y hasta qué valor. El sistema no las infiere. Check T11 en la rúbrica. Detalle en `Funnel/00_Proceso/reingenieria-EL/2026-09-30-diff-simulador-drivers-negocio.md`.

Changelog: **v3.5 (2026-09-29).** `climpi` entra al Paso 7, una vez, después del verificador y sobre el borrador casi final, con sus rojos bloqueando la publicación. El color de la Dim 05 lo fija el nivel del Gate (regla en `dim-05-impacto.md`), y la plantilla lo trae en `abc.js`.

Changelog: **v3.4 (2026-09-29).** Plantilla nueva promovida desde el EL de Polímera con la piel nueva. Paso 5 con las cuatro constantes de configuración (`EL_REGLAS`, `ABC`, `STRUCT` y `VALIDACION_EXTERNA` con voces y temas) y el total calculado. Ficha de impacto con la versión planeta provisional y la escala de riesgo. Regla de registro de comité en el paso 9. Checks T9 y T10 en la rúbrica.

Changelog: **v3.3 (2026-09-28).** Los bloques de subvariable se escriben en piezas (tesis, cifras con visual, puntos, tablas, llamados y nota) y no en párrafos, con los datos en la constante `STRUCT` y el texto original plegado. Origen, la revisión visual del EL de Polímera. Check T8 nuevo en la rúbrica, que viaja en el paquete `skills/_packages/entendimiento-luchante.skill`.

Changelog: **v3.2 (2026-09-28).** Proceso del blueprint del EL. Paso previo para declarar el carril al entrar al EL, con Gate B de seis tipos y la versión de reglas en `carril-y-version-de-reglas.md`. Research en tres motores en el paso 0. Paso 2b pasa a confirmar el carril antes de puntuar, y solo cambia con un hecho del ledger. Paso 2d nuevo con paradas, dos rondas de preguntas, corte de continuidad y la regla para casos que ya avanzaron. Fan-out partido en dos olas. Detalle en `Funnel/00_Proceso/reingenieria-EL/2026-09-28-diff-sistema-proceso-decidido.md`.

Changelog: **v3.1 (2026-09-28).** Marco de impacto ABC, desde el blueprint v29. Paso 2c nuevo con la ficha de impacto de `impacto-luchante` antes del Gate de Impacto. El Gate N1 a N4 clasifica y ya no se convierte a puntaje, y la Dim 05 se puntúa con seis subdimensiones. Tres causas de veto. La carpeta 6 del data room pide solo lo que ya existe. Quinto frente de comité, impacto frente a retorno. El aspecto Impacto del vector se lee con la escalera de madurez de impacto. Detalle en `Funnel/00_Proceso/reingenieria-EL/2026-09-28-diff-sistema-marco-impacto.md`.

Changelog: **v3 (2026-08-25).** Reingeniería de contexto tras el artículo de context engineering para modelos Claude 5, aplicada durante el EL de Marea. Cambios: (1) EL System partido en espina (hoy `references/sistema/el-system.md`) más las dimensiones (hoy `references/dimensiones/`), carga diferida por dimensión, y los subagentes reciben rutas en vez de extractos; (2) **paso 0 nuevo: el ledger de hechos** (`hechos.md`), interfaz portada de `sincerar-empresa`, que pasa a ser lo que auditan el paso 7 y el memo de comité; (3) la plantilla del paso 5 sale de las carpetas de caso y vive en una ruta fija sin fecha en el nombre (hoy `assets/plantilla/plantilla-EL-vigente.html`), con verificación de existencia antes de forkear; (4) **el conteo de palabras deja de ser criterio de aceptación** y se reemplaza por `references/rubrica-calidad.md`, con checks observables por dimensión; (5) contrato de subagente movido a `references/`, una sola vez; (6) frontera explícita entre recolectar y analizar en el paso 1; (7) las "reglas de oro" se filtraron con la pregunta "¿me equivocaría razonando de primeros principios?": sobrevivieron los hechos no inferibles, se fueron las prohibiciones redundantes. Detalle: `Funnel/00_Proceso/reingenieria-EL/2026-08-25-propuesta-context-engineering-funnel.md`.

Changelog: v2.1 (2026-08-01). Reorg de Funnel: los casos pasaron a `02_Casos/` con esqueleto fijo.

Changelog: v2 (2026-07-12). Origen: post-mortem del EL de Brote. Paso 5 de producción (fork literal, redacción desde fuentes crudas, gate de vara de calidad, barrido anti-plantilla), ubicación de quotes en el contrato de subagentes, ítems 9-10 del verificador.
