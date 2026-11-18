---
name: climpi
description: Audita el razonamiento de un Entendimiento Luchante en borrador contra Fooled by Randomness (Taleb), dónde la convicción de LUCHA se apoya en azar disfrazado de habilidad en vez de en evidencia. El sujeto auditado es LUCHA, no el founder ni el modelo. Dispara cuando alguien del equipo de LUCHA dice "climpi", "corre climpi", "corre la prueba de azar", "audita el razonamiento del EL", "qué es suerte y qué es habilidad acá", "dónde nos estamos engañando", "Taleb", "fooled by randomness", o cuando tiene un EL en borrador y pide una lectura adversarial de la convicción antes de comité. Dispara sin la palabra exacta si el pedido es revisar si el caso está bien razonado o si el equipo se está autoengañando. NO dispara para verificar hechos, números o quotes del EL (Paso 7 de entendimiento-luchante), ni para el motor financiero (analisis-financiero-el), ni para evaluar al founder (tribalometro, saboteadores), ni para la madurez tecnológica del caso (Dim 09).
---

# climpi (prueba de azar del EL)

Audita el razonamiento de un EL en borrador contra el framework de *Fooled by Randomness* de Nassim Taleb. Responde una sola pregunta: **nuestra convicción sobre este caso está apoyada en evidencia, o en azar disfrazado de habilidad.**

El sujeto evaluado es LUCHA. No el founder, no el modelo financiero, no el mercado. Es el hermano epistemológico del Paso 7 de `entendimiento-luchante`: ese verifica que los hechos del documento sean ciertos, `climpi` verifica que las inferencias que hacemos con esos hechos aguanten.

## Qué hace

Lee el EL en borrador y devuelve un documento interno con:

1. Hasta **cinco hallazgos priorizados** por cuánto mueven la decisión, cada uno anclado a la frase literal del borrador que lo dispara.
2. La **vía de cierre** de cada hallazgo: conseguir la evidencia que falta, o reescribir la afirmación como apuesta declarada. Con dueño, plazo y condición de cierre.
3. Los **falsadores explícitos** de la tesis: qué observación concreta, en qué plazo, nos haría salir o no hacer follow-on.
4. La **tabla de ruteo**: en qué sección del EL entra cada hallazgo.
5. Los checks que corrieron limpios, en una línea cada uno, para que quede registro de que se miraron.

Output en Markdown, español neutro, sin em dashes ni emojis, directo. Se guarda como `YYYY-MM-DD-[empresa]-climpi.md` en `Lucha/Funnel/02_Casos/[EMPRESA]/_build/` (es insumo del armado, no entregable) y se registra en `log-construccion.md`. El esqueleto completo del caso vive en `00_Reference/Estructura Lucha.md` sección 2.2 (workspace del equipo).

## Las dos reglas que no se negocian

**Regla 1: Taleb exime a los emprendedores.** El libro ataca la celebración del éxito emprendedor, pero exime explícitamente al emprendedor que sacó el cuello y arriesgó pertenecer al cementerio de los que no la hicieron. `climpi` nunca concluye "este founder tuvo suerte, no invertir". Concluye "esta afirmación nuestra no está sostenida por la evidencia que citamos". La bandera apunta siempre a un hueco en nuestro razonamiento.

**Regla 2: toda bandera cierra con evidencia o con apuesta declarada.** Taleb: no hay nada de malo en que un tomador de riesgo reciba un golpe, siempre que haya declarado que estaba tomando riesgo en vez de afirmar que el riesgo era pequeño o inexistente. El pecado que caza este skill no es tomar riesgo, es **llamarle bajo riesgo a un riesgo que no medimos**. Lo que no cierra una bandera: bajar el score, agregar una advertencia genérica, o matar el caso por incomodidad probabilística.

## Cuándo NO usar la skill

- Verificar hechos, recalcular métricas o cotejar quotes contra transcripts. Eso es el verificador del Paso 7 de `entendimiento-luchante`, que corre justo antes.
- Números financieros y estructura de retorno (`analisis-financiero-el`).
- Evaluar al founder: stage tribal (`tribalometro`) o saboteadores y PQ (`saboteadores`).
- Resiliencia de la empresa ante la ola de IA: eso es Dim 09 y evalúa a la empresa. `climpi` solo revisa si **nuestra lectura** confundió ajuste al ciclo actual con calidad durable.
- Auditar el razonamiento de un caso ya decidido para ver "si acertamos". Es la trampa de hindsight que el propio framework prohíbe (check C4). Si el líder del caso lo pide igual, se corre solo con la información que existía a la fecha de la decisión, fechada explícitamente, y se dice en el output que es una auditoría retrospectiva con ese límite.

## Flujo de ejecución

### Paso 1 · Cargar el framework

Lee el framework completo antes de mirar el EL. Vive en `references/framework.md` de este skill. Contiene las dos reglas de gobierno, los 18 checks agrupados en 5 bloques (cada uno con la afirmación de Taleb, sus quotes verbatim con capítulo, la señal de detección aplicada a un EL, la pregunta de auditoría y la severidad por defecto), la tabla de ruteo y los anti-patrones. No audites de memoria: el framework existe justo para no releer el libro y para no inventar checks.

El libro madre (*Fooled by Randomness*, Nassim Taleb; el PDF vive en la biblioteca del workspace del equipo, `00_Reference/Biblioteca/Fuente de skill/`, no en este repo) NO reemplaza al framework. Se abre solo si el framework se queda corto para un caso concreto, o si vas a editar el propio framework y necesitas verificar una quote.

### Paso 2 · Localizar el borrador y su base de evidencia

Toma el EL en borrador del caso (markdown consolidado o el HTML del artifact, en `Lucha/Funnel/02_Casos/[EMPRESA]/EL/`). Lee también, sin re-verificarlas, las **fuentes que el borrador cita**: transcripts, modelo, research, scores de partners. No se necesitan para comprobar los hechos (eso es del verificador), se necesitan para distinguir tres cosas distintas: lo que la fuente dice, lo que el borrador afirma, y lo que el borrador **infiere**. Los hallazgos de `climpi` viven casi todos en el tercer grupo.

Si el borrador está incompleto, corre igual sobre lo que hay y marca qué secciones no se auditaron.

### Paso 3 · Barrido de los 18 checks

Corre los cinco bloques en orden: A (cómo juzgamos la evidencia), B (de dónde viene la muestra), C (cómo construimos la tesis), D (cómo medimos riesgo), E (cómo nos comportamos como comité).

Reglas del barrido:

- **Cada hallazgo se ancla a texto literal del borrador.** Cita la frase que lo dispara, entre comillas, con su sección. Un hallazgo sin ancla literal es una opinión y no entra.
- **Un hallazgo no es "el documento no menciona X" en abstracto.** Es "el documento afirma A apoyándose en B, y B no sostiene A por la razón del check N". La estructura es afirmación, apoyo citado, y por qué el apoyo no alcanza.
- **Distingue hueco de error.** Hueco es que falta la evidencia; error es que la evidencia que hay dice otra cosa. Los dos entran, etiquetados distinto.
- **No cuentes dos veces.** Si un mismo problema dispara tres checks, es un hallazgo con tres lentes, no tres hallazgos.

### Paso 3b · El C del caso

Además de los 18 checks, lee la ficha de impacto del caso (`_build/YYYY-MM-DD-[empresa]-ficha-impacto.md`, de `impacto-luchante`) y la Dim 05 del borrador. Pregunta por qué la empresa no es B. Busca afirmaciones de impacto que sostienen el nivel N1 o N2 y que se apoyan solo en el dicho del founder o en la narrativa de LUCHA, sin evidencia secundaria ni dato propio. Es la falacia narrativa aplicada al impacto, y el campo es propenso a inflar el C.

Entra como un hallazgo más, con las mismas reglas de ancla y de prioridad. Se cierra como cualquier otro. Por evidencia, con el dato que lo sostiene. O como apuesta declarada, que en impacto es reescribirlo como C potencial con su meta C y su plazo. Nunca se cierra bajando el nivel, ni penalizando al founder por no tener su impacto medido, que es justo lo que LUCHA construye con él.

### Paso 4 · Priorizar a máximo cinco

Dieciocho checks disparando todos a la vez no es una auditoría, es ruido. Ordena por **cuánto mueve la decisión**: primero lo que cambiaría el sí o el no, luego lo que cambiaría el precio o la estructura, luego lo que cambiaría un score, al final lo que solo calibra el proceso. Corta en cinco. Lo que queda afuera va a una lista de una línea por ítem al final del documento.

Severidad, alineada a la convención del verificador adversarial:

- **Roja.** La convicción se apoya en algo que no es evidencia y nadie lo ha declarado como apuesta. No debería ir a comité sin resolverse por una de las dos vías. El default rojo del framework son dos: falsador ausente (C1) y pérdida máxima no declarada (D4).
- **Amarilla.** Hueco de evidencia real que hay que nombrar en el documento, con dueño y plazo.
- **Nota.** Registro para calibrar el proceso, sin efecto en este caso.

### Paso 5 · Cerrar cada hallazgo por una de las dos vías

Ningún hallazgo se entrega sin vía de cierre. Para cada uno, escribe explícitamente cuál de las dos aplica:

- **Vía evidencia.** Qué dato específico lo cierra, quién lo consigue, para cuándo. No "validar con el founder": el dato concreto.
- **Vía apuesta declarada.** El texto de reemplazo, redactado. La afirmación deja de presentarse como hecho y dice lo que es, con su condición de quiebre nombrada. Este es el entregable más valioso del skill, no la crítica sino el párrafo que la reemplaza. **Se escribe en registro de comité**, sobre la empresa y la decisión, con la forma "Apostamos a que A. ¿Qué tiene que ser cierto? B. Si en tal plazo no pasa C, no hacemos follow-on". No lleva etiquetas de nuestro proceso como "inferencia", "no es auditable", "según el transcript" o "el data room no trae", que son el séptimo vicio del barrido de prosa de `../entendimiento-luchante/references/sistema/el-system.md`.

Y por separado, siempre, los **falsadores de la tesis**: mínimo tres, concretos, con plazo y umbral. "Si a los 12 meses el CAC no baja de X" es un falsador. "Si no crecen" no lo es. Si el equipo no puede producir ninguno, ese es el hallazgo rojo principal del documento y así se reporta. Cuando el caso es N3, uno de los falsadores es la meta C con su plazo.

### Paso 6 · Generar el output

Usa el template de `examples/sample_output.md`. No inventes secciones ni agregues resumen ejecutivo motivacional. Incluye siempre la tabla de ruteo (qué hallazgo entra en qué sección del EL) y la lista de checks que corrieron limpios.

**El output es interno.** No se agrega una sección "Prueba de Azar" al artifact renderizado: el EL no lleva jerga interna del proceso, y "Riesgos Críticos" es un bloque removido que no se reintroduce. Los hallazgos se inyectan donde ya hay lugar según la tabla de ruteo del framework (Apuesta, Plan 18 meses, callout de valuación en Dim 03, rúbricas, bloques de Validación externa, y el campo "contra-argumento honesto" del memo de comité). El hallazgo del C del caso va a la Dim 05 y al frente de impacto frente a retorno del memo de comité.

### Paso 7 · Auto-check contra los anti-patrones

Antes de entregar, corre la lista de anti-patrones del §final del framework sobre el propio output:

1. No hay conclusión nihilista (nada es sabible, no invertir).
2. Ningún hallazgo descalifica al founder por haber tenido suerte (Regla 1).
3. Ningún juicio sobre el pasado usa información que no existía entonces (C4 aplicado a uno mismo).
4. No se recalculó nada del motor financiero, no se re-verificó ninguna quote, no se re-evaluó a la empresa.
5. Toda bandera tiene dueño, plazo y condición de cierre (si no, es el epifenomenalismo de E3 cometido por el auditor).
6. Máximo cinco hallazgos priorizados.
7. Ningún hallazgo de impacto castiga al founder por no tener su impacto medido.
8. Ningún párrafo de reemplazo habla de nuestras fuentes o de nuestra revisión. Habla de la empresa y de la decisión.

Si algún punto falla, corrige antes de entregar.

## Reglas de oro

- El sujeto auditado somos nosotros. Siempre.
- Todo hallazgo lleva ancla literal del borrador, con sección.
- Todo hallazgo lleva vía de cierre redactada, no solo la crítica.
- Las quotes del libro van verbatim en inglés con su capítulo, tomadas del framework, nunca parafraseadas ni traducidas como si fueran cita.
- `climpi` no asigna ni modifica scores. Los scores los cierra el comité. `climpi` reporta que la **evidencia** detrás de un score no alcanza, y eso es un insumo para la rúbrica, no una corrección al número.
- Si el proceso del EL nunca ha detenido un caso, el hallazgo E3 aplica al sistema completo y se reporta como nota, independiente de este caso.

## Por qué esto importa para LUCHA

El EL está diseñado para construir convicción sobre un founder, y hace bien su trabajo: junta evidencia, la organiza y la puntúa. Lo que ningún paso del proceso hace hoy es preguntarse si la convicción construida es conocimiento o es el efecto de una muestra afortunada, un relato bien contado y un circuito de gente que habla entre sí. Eso es lo que corre `climpi`, con la salida honesta que Taleb concede: se puede apostar fuerte a lo que no se sabe, siempre que se diga que es una apuesta. Es insumo para el comité, no un veredicto: la decisión de invertir es del comité.

## Estructura de archivos

Fuente en el repo: `entendimientos-luchantes/climpi/`

```
climpi/
├── SKILL.md (este archivo)
├── references/
│ └── framework.md (2 reglas de gobierno + 18 checks en 5 bloques con quotes verbatim + tabla de ruteo + anti-patrones; fuente de verdad)
└── examples/
  └── sample_output.md (template de output esperado)
```

---

Changelog: 2026-09-29. La vía de apuesta declarada se escribe en registro de comité, anti-patrón 8, y el skill corre una vez en el Paso 7 de `entendimiento-luchante`.

Changelog: 2026-09-28. Paso 3b nuevo, el C del caso, desde el marco de impacto ABC. Anti-patrón 7 y el falsador de la meta C en casos N3.
