# Procesar transcripts para el Entendimiento Luchante — guía y prompts

Para: Coordinación de Funnel · LUCHA Impact Studio
Fecha: 2026-06-04

Esto es para que cada reunión llegue ya procesada y no haya que leer el transcript crudo. Da dos cosas: (1) el **transcript limpio y ordenado** y (2) un **preprocesamiento estructurado** de la reunión, listo para el análisis del EL.

**Por qué importa la limpieza sin parafrasear:** el análisis de liderazgo, cultura (tribalómetro) y saboteadores usa **citas literales**. Si Notion AI "mejora" o resume las palabras del founder, perdemos la señal. Por eso el Prompt 1 limpia muletillas y errores de dictado, pero **conserva las palabras textuales**.

## Flujo (en Notion AI o cualquier LLM)

1. Pega el transcript crudo.
2. Corre **Prompt 1 (Limpieza)**. Guarda como `AAAA-MM-DD-transcript-[tema]-[persona]-LIMPIO.md`.
3. Sobre el transcript limpio, corre **Prompt 2 (Preprocesamiento)**. Guarda como `AAAA-MM-DD-transcript-[tema]-[persona]-PREPROCESADO.md`.
4. Sube ambos a `Lucha/Funnel/02_Casos/[empresa]/transcripts/`.
5. Para el análisis fino de liderazgo/cultura, sobre el limpio corremos los skills `tribalometro` y `saboteadores`.

---

## Prompt 1 — Limpiar y ordenar el transcript

```
Eres un editor de transcripciones. Te voy a pegar la transcripción cruda de una reunión (trae errores de dictado, muletillas y palabras mal capturadas). Devuélveme la MISMA conversación, limpia y ordenada, sin cambiar lo que dijo cada persona.

Reglas:
1. NO parafrasees, NO resumas, NO "mejores" el estilo. Conserva las palabras textuales de cada hablante: las usamos como citas literales.
2. Quita solo: muletillas (eh, este, o sea, mmm), falsos arranques, repeticiones involuntarias y ruido de dictado.
3. Corrige errores obvios de transcripción (palabras mal capturadas, nombres propios, términos técnicos) usando el contexto. Si no estás seguro, deja la palabra y márcala con [sic] o [¿inaudible?].
4. Etiqueta a cada hablante por su nombre o rol (ej. "Founder:", "Partner:"). Si no sabes quién habla, usa "Hablante 1", "Hablante 2".
5. Mantén el orden cronológico y divide en turnos de conversación.
6. Conserva exactos los números, cifras, fechas, nombres y montos.
7. Marca [inaudible], [risas], [se interrumpen], [cambian de tema] cuando aplique.
8. No agregues nada que no se haya dicho. Si algo no se entiende, márcalo, no lo rellenes.

Formato de salida: turnos "Hablante: ..." en Markdown, uno por bloque.

Transcripción cruda:
<<pega aquí el transcript>>
```

---

## Prompt 2 — Preprocesamiento estructurado de la reunión

```
Eres analista de inversión de impacto de LUCHA. Te paso una transcripción LIMPIA de una reunión con (o sobre) un founder. Pre-procésala en una ficha estructurada que el equipo usará para construir el Entendimiento Luchante. No inventes: si algo no está en el transcript, escribe "no se mencionó".

Primero identifica: empresa, fecha, tipo de reunión (Liderazgo / Modelo de negocio / Visión / Cultura / Impacto / Inversionista / Usuario / otro), participantes, y quién es founder vs no-founder.

Devuelve esta ficha en Markdown:

## Ficha de reunión — [empresa] — [tipo] — [fecha]
Participantes:
Contexto / duración:

### 1. Resumen ejecutivo
5 a 8 bullets con lo más importante.

### 2. Hechos, números y afirmaciones clave
Tabla con columnas: Dato | Valor o afirmación | Quién lo dijo | Cita literal.
Incluye revenue, métricas, churn, precios, fechas, montos, planes, hitos.

### 3. Quotes literales destacadas
Las frases textuales más reveladoras, atribuidas y agrupadas por tema. Cópialas EXACTAS (se usan para liderazgo, cultura y saboteadores).

### 4. Señales por dimensión del EL
Solo las dimensiones que toca esta reunión, cada una con su evidencia (cita o dato):
Founder y propósito · Negocio y finanzas · Capital · Mercado · Impacto · Equipo y cultura · Storytelling · Bienestar y liderazgo.

Si la reunión es de liderazgo o cultura, agrega además:
- Lenguaje predominante del founder, con ejemplos textuales (de "la vida es dura" → "yo soy bueno" → "nosotros somos grandes" → "estamos haciendo historia juntos").
- ¿Habla en "yo" o en "nosotros"? Ejemplos.
- Estructura de relaciones: ¿todo pasa por el founder, o el equipo se conecta en red? Evidencia.
- Autoconciencia y manejo de desacuerdos: ejemplos.

### 5. Banderas e inconsistencias
Contradicciones, riesgos o cosas a reconciliar, cada una con su evidencia.

### 6. Preguntas abiertas / follow-ups
Qué falta preguntar o pedir tras esta reunión.

Transcripción limpia:
<<pega aquí el transcript ya limpio>>
```

---

## Reglas de oro (no romper)

- Las quotes van **literales**. Nunca parafrasear ni "pulir" lo que dijo el founder.
- Limpiar ≠ resumir. El Prompt 1 entrega la conversación completa, solo sin ruido.
- Lo que no se entienda se marca ([¿inaudible?], [sic]), no se inventa.
- Números, montos y nombres, exactos.
- Separar siempre founder de no-founder (el Tribal Score solo corre sobre el founder).
- Guardar el crudo, el limpio y el preprocesado, los tres, en `transcripts/` del caso.
