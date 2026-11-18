---
name: saboteadores
description: Use this skill to analyze a startup founder's saboteurs and Positive Intelligence (PQ) profile, applying Shirzad Chamine's Positive Intelligence framework to LUCHA's deal flow, feeding Dim 08 (Bienestar y Liderazgo) of the Entendimiento Luchante. Trigger whenever someone on the LUCHA team says "saboteadores", "analiza los saboteadores", "perfil de saboteadores", "PQ del founder", "positive intelligence", "Chamine", "analiza el test de saboteadores", "interpreta el saboteur assessment", or uploads Saboteur Assessment results, a PQ score, or a founder transcript and asks for a saboteurs / wellbeing / leadership read. Trigger even without the word "saboteadores" as long as the request is about interpreting a founder's saboteurs, PQ, or mental/leadership patterns for an investment evaluation. Do NOT trigger for the Tribal Score (that is the tribalometro skill, Dim 06), the financial engine (analisis-financiero-el), or generic wellbeing advice unrelated to evaluating a founder.
---

# Saboteadores (Positive Intelligence)

Analiza el perfil de saboteadores y PQ de un founder aplicando el framework de Positive Intelligence (Shirzad Chamine) al deal flow de LUCHA. Es el hermano del `tribalometro`: ese alimenta Dim 06 (Equipo y Cultura) con el stage tribal; este alimenta **Dim 08 (Bienestar y Liderazgo)** con el perfil de saboteadores y el contexto de PQ.

## Qué hace esta skill

Recibe uno o varios inputs sobre el founder y devuelve una lectura cualitativa accionable:

1. Top saboteadores del founder (con su intensidad/% si viene del test)
2. Lectura de cada saboteador dominante con el **lente de founder/CEO** (fortaleza y riesgo según rol y etapa)
3. Nivel de **autoconciencia** del founder sobre sus saboteadores (el mejor predictor de manejo)
4. Contexto de **PQ** (si hay número; si no, inferido del perfil y marcado como tal)
5. Cruces con Grit y con el stage tribal (Dim 06)
6. Bandera para Dim 08 y recomendación para el equipo de partners

El output es Markdown en español neutro, sin em dashes ni emojis, directo.

## Inputs que maneja

- **Saboteur Assessment**: resultados del test con los saboteadores rankeados y sus %. Da el perfil **autorreportado**.
- **Transcript(s) del founder**: los mismos transcripts del proceso E3 que alimentan el `tribalometro` (reuniones de liderazgo, modelo, visión, etc.). **No son un fallback: SIEMPRE que existan, úsalos.** El test dice lo que el founder *cree* de sí mismo; el transcript muestra lo que *hace y dice*, de ahí salen las quotes literales que confirman o contradicen el perfil y, sobre todo, la **autoconciencia** (el mejor predictor de manejo). Si no hay test, el transcript es la base (evaluación tentativa, marcada como tal).
- **PQ Score**: número 0-100 si existe. **Ojo: PQ Score ≠ Saboteur Assessment** (son tests distintos). Si solo hay perfil de saboteadores y no PQ numérico, NO inventes el PQ: márcalo como inferido del perfil.

**Regla de oro: triangula.** Lo más fuerte es cruzar el test (perfil autorreportado) con los transcripts (conducta observada). Cuando ambos existen, úsalos juntos; no te quedes solo con los números del test.

## Cuándo NO usar la skill

- El Tribal Score / stage cultural del founder (eso es `tribalometro`, Dim 06).
- Números financieros (eso es `analisis-financiero-el`).
- Consejo de bienestar genérico fuera de evaluar a un founder para invertir.
- Personas que no son el founder evaluado (a menos que sea un co-founder dentro del mismo EL, como diagnóstico complementario).

## Flujo de ejecución

### Paso 1: Cargar el framework

Antes de analizar nada, lee `references/framework.md`. Contiene los 10 saboteadores (el Juez maestro + 9 cómplices) con su descripción, su mentira y las señales para detectarlos; el Sage y sus 5 poderes; la definición de PQ y el tipping point de 75; y el **lente de evaluación de founder** (qué saboteadores son comunes/manejables, cuáles son banderas de cuidado, y los cruces obligados). No evalúes de memoria; el framework es la fuente de verdad y existe justo para no releer el libro.

### Paso 2: Identificar y reunir los inputs

Determina qué tienes: ¿Saboteur Assessment con %? ¿PQ numérico? ¿transcripts del founder? **Busca activamente los transcripts del caso** (carpeta `transcripts/` del caso en `casos/[empresa]/`, las mismas reuniones que usa el tribalómetro) aunque el usuario solo te haya pasado el test; si existen, úsalos. Si hay más de un founder, evalúa a cada uno por separado. Si falta el PQ numérico, planea marcarlo como inferido.

### Paso 3: Procesar el perfil (triangulando)

- **Test (si hay):** toma los saboteadores dominantes en orden (los top 2-3 importan) con su %.
- **Transcript (si hay):** identifica patrones en lo que el founder dice y hace (atribución de éxito/fracaso, relación con el equipo, manejo de conflicto, foco, control vs delegación) y mapéalos a saboteadores. **Extrae quotes literales** que evidencien cada saboteador dominante (literales, nunca parafraseadas, en su idioma original, igual que el tribalómetro). Si solo hay transcript y el founder habló poco (<~1500 palabras), agrega `> Señal baja: evaluación tentativa.`
- **Triangula test vs transcript:** ¿la conducta observada confirma el perfil autorreportado? Señala **discrepancias** (ej. el test marca Avoider bajo pero en el transcript patea las conversaciones difíciles, o marca Controller bajo pero revisa todo). Las discrepancias son señal valiosa: el autorreporte puede tener punto ciego.
- Busca **autoconciencia**: ¿el founder nombra o reconoce sus propios saboteadores en el transcript? Eso pesa más que el tipo y casi siempre se ve en lo que dice, no en el test.
- Busca señales de **Sage** (no solo saboteadores): ¿reencuadra reveses?, ¿decide desde valores?, ¿empatiza con el equipo?

### Paso 4: Interpretar con el lente de founder

Para cada saboteador dominante, da fortaleza y riesgo **según el rol de CEO y la etapa de la empresa** (ver §3 y §6 del framework). No describas el saboteador en abstracto; aterriza qué significa para construir y escalar *esta* empresa.

### Paso 5: PQ y cruces

- Reporta el PQ (número real o inferido, marcado). Recuerda el tipping point de 75.
- Cruza con **Grit** (Dim 08; recuerda el veto Grit Low → roja) y con el **stage tribal** del tribalómetro (Dim 06). Señala combinaciones de riesgo (ej. Victim alto + Grit bajo).
- Si hay perfil de los co-founders, grafícalos como diagnóstico complementario (no entra al score).

### Paso 6: Generar output

Usa el template de `examples/sample_output.md`. No inventes secciones. Mantén quotes literales (si vienen de transcript), tono profesional directo, español neutro, sin em dashes ni emojis.

## Casos borde

- **Solo saboteadores, sin PQ:** interpreta el perfil y marca el PQ como inferido del perfil, nunca como dato del test.
- **Solo transcript:** evaluación tentativa; di que no hay test formal.
- **Múltiples co-founders:** sección por cada uno; si los perfiles son muy distintos, comenta la complementariedad/choque como dinámica de equipo (conecta con Dim 06).
- **Founder con autoconciencia alta:** dilo explícito; es señal positiva fuerte y el punto donde más aporta el coaching del Partner de Liderazgo.
- **Perfil "limpio" pero founder ciego a sí mismo:** peor señal que un perfil intenso con autoconciencia. Repórtalo.

## Por qué esto importa para LUCHA

LUCHA invierte en personas primero. Los saboteadores predicen cómo un founder maneja la presión, las decisiones duras y a su equipo, justo donde se rompen muchas empresas. La señal alimenta Dim 08 (Bienestar y Liderazgo), contextualiza el **PQ (peso 50%)** junto con el Grit (50%). El assessment del Partner de Liderazgo no puntúa en Dim 08, es el único insumo de Dim 01, y le da al Partner de Liderazgo un mapa para el coaching. Es señal cualitativa para el comité, no un veredicto: la decisión de invertir es del comité.

## Estructura de archivos

```
saboteadores/
├── SKILL.md (este archivo)
├── references/
│ └── framework.md (los 10 saboteadores + Sage + PQ + lente de founder; fuente de verdad)
└── examples/
 └── sample_output.md (template de output esperado)
```
