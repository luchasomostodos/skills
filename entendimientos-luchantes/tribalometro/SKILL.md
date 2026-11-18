---
name: tribalometro
description: Use this skill to evaluate a startup founder's tribal stage (1-5) from a meeting transcript, interview, or call recording, applying the Tribal Leadership framework by Dave Logan to LUCHA Impact Studio's deal flow. Trigger this skill whenever the user asks to "tribalometro", "tribal score", "evaluar founder", "qué stage es", "qué nivel cultural", "analiza esta reunión con el founder", "analyze this founder", "tribal stage del founder", or similar; or when the user uploads a .txt, .vtt, .srt, .docx, or .pdf transcript of a founder meeting and asks for cultural / qualitative evaluation. Trigger even when the word "tribalometro" is not used, as long as the request is about scoring, classifying, or qualitatively evaluating a founder based on what they said in a meeting. Do NOT trigger for internal team meetings, customer interviews, podcast transcripts, or any conversation where the subject is not a startup founder being evaluated for investment.
---

# Tribalómetro

Evalúa el stage tribal (1-5) de un founder a partir de un transcript de reunión, aplicando el framework de Tribal Leadership (Logan, King, Fischer-Wright) al deal flow de LUCHA Impact Studio.

## Qué hace esta skill

Recibe un transcript (texto pegado o archivo) y devuelve:

1. Stage tribal dominante del founder (1, 2, 3, 4 o 5)
2. Stage secundario si oscila
3. Score 0-100 dentro del stage dominante
4. Quotes literales del transcript que evidencian cada stage detectado
5. Bandera deal flow para LUCHA: verde / amarilla / roja
6. Recomendación accionable para el equipo de partners

El output es Markdown en español neutro, sin em dashes ni emojis, con formato directo.

## Cuándo NO usar la skill

- Reuniones internas de LUCHA (entre partners y equipo: Managing Partner, Partner de Mercado, Partner de Liderazgo, Partner de Cultura y Storytelling, Responsable de Impacto, etc.)
- Entrevistas a clientes finales o usuarios
- Podcasts o entrevistas mediáticas
- Transcripts donde no hay un founder identificable como sujeto de evaluación
- Contenido que no es una conversación (notas sueltas, documentos, decks)

Si el archivo no es claramente una reunión con un founder, pregunta antes de proceder.

## Flujo de ejecución

### Paso 1: Cargar el framework

Antes de analizar nada, lee `references/framework.md`. Este archivo contiene la descripción completa de los 5 stages, los marcadores lingüísticos por stage, las frases típicas y la lógica de scoring. No intentes evaluar de memoria; el framework es la fuente de verdad.

### Paso 2: Cargar la calibración

Lee `references/quote_examples.md` antes de extraer quotes. Contiene ejemplos reales por stage que sirven de calibración. Esto evita falsos positivos típicos (por ejemplo, confundir un founder técnico orgulloso con un Stage 4).

### Paso 3: Procesar el transcript

1. Identifica al founder en el transcript. Si hay múltiples interlocutores, intenta separar quién es quién por etiquetas (Speaker 1, nombre, etc.). Si no es claro, marca la ambigüedad y procede con la mejor inferencia.
2. Si hay timestamps, regístralos para asociarlos a quotes.
3. Si hay múltiples founders, evalúa a cada uno por separado en su propia sección.
4. **Solo evalúa lo que dice el founder, no las preguntas del partner.** El sesgo más común es atribuir al founder cosas que dijo el entrevistador.
5. Mide cuánto habla el founder. Si es menos de 10 minutos estimados (o menos de aproximadamente 1500 palabras), marca el output como "señal baja, evaluación tentativa".

### Paso 4: Aplicar el framework

Para cada bloque de habla del founder, identifica marcadores lingüísticos (ver `framework.md`):

- Pronombres (yo / tú / nosotros / ellos)
- Atribución de éxito y fracaso (interna vs externa, individual vs colectiva)
- Foco del discurso (sobrevivir, quejarse, ganar, construir, transcender)
- Relación con su equipo (jerárquica, transaccional, de mentoría, de pares, de causa común)
- Lenguaje sobre competidores, clientes, inversores

Asigna peso por bloque al stage más probable. El stage dominante es el de mayor peso acumulado. Marca un secundario solo si supera el 25% del peso del dominante.

### Paso 5: Calcular score y bandera

- Score 0-100 dentro del stage dominante: qué tan profundamente está en ese stage vs en transición. Justifica el score con 1-2 oraciones.
- Bandera deal flow LUCHA:
  - **Verde**: Stage 4 estable o Stage 3 tardío con epifanía visible (transición clara hacia Stage 4). Founder con potencial de tribu, valores articulados, "we" auténtico.
  - **Amarilla**: Stage 3 medio sin epifanía, o Stage 4 con muchas oscilaciones a Stage 3. Founder con tracción individual pero riesgo de no escalar tribalmente.
  - **Roja**: Stage 2 dominante, Stage 3 temprano hostil, o cualquier Stage 1. Riesgo de cultura tóxica, victimismo, o incapacidad de construir equipo.

### Paso 6: Generar output

Usa exactamente el template definido en `examples/sample_output.md`. No inventes secciones nuevas. Mantén:

- Quotes literales, nunca parafraseadas
- Quotes en idioma original (si el transcript mezcla español e inglés, conserva cada quote en su idioma)
- Sin em dashes, sin emojis, sin floritura
- Tono profesional directo en español neutro

## Casos borde

**Founder que evade o no responde directamente.** No es razón para no evaluar; el patrón evasivo es en sí una señal. Reportar como observación cualitativa y considerar como factor en la bandera.

**Mezcla español/inglés.** Procesar ambos idiomas. Quotes en idioma original. El análisis y el output siempre en español.

**Múltiples founders.** Sección separada por cada uno. Si los stages divergen significativamente, mencionar la dinámica de equipo como observación adicional al final.

**Transcript muy corto.** Si el founder habló menos de 10 minutos o aproximadamente 1500 palabras, agregar al inicio del output: `> Señal baja: el founder habló poco en esta sesión. Evaluación tentativa.`

**Sin timestamps.** Omitir timestamps en quotes, no inventarlos.

**Founder que claramente está performando.** Si hay señales de que el founder está dando respuestas ensayadas o "vendiéndose" en lugar de hablar genuinamente, reportarlo en la lectura cualitativa. El framework asume habla espontánea; la performance puede inflar artificialmente la lectura hacia Stage 3 o 4.

## Por qué esto importa para LUCHA

LUCHA invierte en personas primero. El stage tribal del founder es predictor del techo cultural de la empresa que va a construir: una empresa no escala más allá del stage de su founder. Un Stage 3 puede construir un negocio individual fuerte pero rara vez una tribu. Un Stage 4 puede construir un equipo que perdure. Esta señal complementa (no reemplaza) la evaluación de mercado, modelo y tracción que hacen el Partner de Mercado, el Partner de Liderazgo, el Partner de Cultura y Storytelling y el Managing Partner en sus dimensiones respectivas.

La skill produce señal cualitativa accionable, no un veredicto. La decisión de invertir es del comité.

## Estructura de archivos

```
tribalometro/
├── SKILL.md (este archivo)
├── references/
│   ├── framework.md (descripción completa del framework por stage)
│   └── quote_examples.md (ejemplos calibradores de quotes por stage)
└── examples/
    └── sample_output.md (template de output esperado)
```
