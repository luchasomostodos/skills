# Dim 09 · Resiliencia Tecnológica

> Detalle de dimensión del EL. Se carga **solo** cuando se construye esta dimensión. La espina (pesos, semáforo, runbook) vive en `references/sistema/el-system.md`. Pesos internos: Comoditización por IA 40, Moat específico ante IA 35, Posicionamiento frente a la ola 25. Agregada en v7 (comité 2026-06-08, caso Orbe).

Agregada en v7 (comité 2026-06-08, caso Orbe). Pregunta guía: **¿la ventaja sobrevive la aceleración de la IA, o lo que evaluamos hoy se comoditiza en 1-3 años?** No es un bloque de "riesgos" genérico (esos siguen removidos del documento): es una lente temporal y específica de IA, con score propio. Evitar doble conteo con Dim 02 Defensibilidad: Dim 02 mide el moat competitivo *de hoy*; Dim 09 mide la **resiliencia a la obsolescencia por IA en una ventana de 1-3 años**.

Sub-variables y pesos internos:

- **Comoditización por IA (40%).** Cuánto del value prop puede replicar o abaratar la IA agéntica / no-code en 12-36 meses. Ancla 80 = el núcleo es difícil de comoditizar (data clínica propietaria, red, integración profunda en el flujo, cumplimiento regulatorio); 50 = parcialmente erosionable pero con ruta de defensa creíble; 20 = el core se replica con herramientas genéricas en menos de 2 años.
- **Moat específico ante IA (35%).** Qué activos defienden ante esa comoditización: efectos de red, data propietaria, integración en el flujo de trabajo, distribución y marca, confianza/relación, cumplimiento. Distinto del moat genérico de Dim 02: aquí se evalúa cuáles aguantan *específicamente* el empuje de la IA y cuáles se erosionan rápido.
- **Posicionamiento frente a la ola (25%).** ¿El negocio **aprovecha la ola** (integra la IA como tailwind, la usa para acelerar su propio impacto) o **se muere con la ola** (la IA es headwind que lo deja obsoleto)? Sintetiza con la **capacidad de pivot del founder** (señal de Dim 01) y el momentum de Dim 04.

**Veredicto / callout transversal "¿Aprovecha la ola o se muere con la ola?"** Dim 09 cierra con un callout que da el veredicto explícito en una línea (aprovecha / neutral / se muere) y la condición para mover el caso de amarillo a verde. Se alimenta del research de mercado de IA del caso (sección "ventana temporal" del prompt de Perplexity/deep research + los entregables A "implicaciones de resiliencia" y B "preguntas al founder"). Insumo: ese research; cruza con Dim 02 (Defensibilidad), Dim 04 (Momentum, Estructura competitiva) y Dim 01 (pivot).

Bandera: si el core es comoditizable por IA en <2 años **sin** ruta de defensa ni capacidad de pivot → roja, y cruza con Kill Criteria (candidato a dealbreaker). Anclas 80/50/20 finas por sub-variable: cerrar en `RUBRICAS` del template al construir el primer caso con Dim 09.

Doble click (formato del artifact): conclusión `dim-conclusion` + el callout de la ola + 3 sub-bloques narrativos con score y peso (40/35/25) + rúbrica. Sin dashboard ni gráficos propios (es lente cualitativa); si se quiere visual, una barra simple de erosión vs defensa.

---

## Columna deeptech y climate hardware · agregada el 2026-09-11

**Por qué.** Esta dimensión se escribió en junio de 2026 sobre un caso de software y sus anclas son de software (data clínica propietaria, no-code, efectos de red, integración en el flujo de trabajo). El Gate B admite **deeptech y climate hardware**, y esos casos ya reciben la columna de pesos que les corresponde, pero seguían recibiendo las definiciones de software. Detectado en el caso Selva Bio, donde el tooltip preguntaba qué tan rápido "un wrapper replica la capa de valor del producto" a una empresa que vende una proteína aplicada al campo.

**El cambio conceptual.** En software la amenaza es que un modelo genérico replique la capa de valor. En deeptech la IA **no replica el producto, comprime el paso de descubrimiento** y deja intactos producción, regulación y campo. El foso se mueve del código a lo que no se acelera.

### 1 · Comoditización por IA

Pregunta. **Qué parte del ciclo comprime la IA y qué parte del ciclo no toca.**

| Score | Cómo se ve |
|---|---|
| 80-100 | La IA comprime un paso menor. El valor vive en pasos físicos o regulatorios que no se aceleran |
| 50-79 | Comprime el descubrimiento y deja intactos producción, regulación y campo. El diferencial declarado se erosiona, el producto no |
| 20-49 | El diferencial declarado es justo el paso que la IA ya comoditizó, y el paso físico es corto o está subcontratado |
| 0-19 | El producto se replica sin activo físico propio ni barrera de tiempo |

### 2 · Moat específico ante IA

Pregunta. **Qué activos no se aceleran.** No efectos de red ni integración en el flujo, que en deeptech no existen.

| Score | Cómo se ve |
|---|---|
| 80-100 | Patente concedida en las jurisdicciones del plan, o registro obtenido, más know-how de proceso no publicado y data propia de ensayos |
| 50-79 | Al menos dos de esos activos en curso con fecha, y el ciclo físico da ventaja de tiempo real |
| 20-49 | Los activos están planificados y no poseídos. La única ventaja es el tiempo del ciclo |
| 0-19 | Ni activos ni ventaja de tiempo |

### 3 · Posicionamiento frente a la ola

Pregunta. **Si el equipo usa la IA para acortar lo acortable, y si sabe qué parte no puede acortar.**

| Score | Cómo se ve |
|---|---|
| 80-100 | Usa la IA en el paso que sí se acelera, tiene medido cuánto, y declara cuál es el paso irreducible |
| 50-79 | La usa como núcleo y su lectura de qué se comoditiza es correcta, sin medición propia |
| 20-49 | La usa como capa cosmética, o cree que protege algo que ya es público |
| 0-19 | La ola lo deja obsoleto y el equipo no tiene lectura del tema |

### Los pesos internos, resueltos el 2026-09-11

**Selva Bio quedó en 40/35/25, que es lo que este archivo ya declaraba como canónico.** El 25/50/25 del 7 de septiembre queda retirado y sigue corrido como escenario S4 de la sensibilidad del caso. **Falta que el Director de Portfolio decida si Marea, ya cerrado, se releé con esta convención.**

## Segunda revisión de la columna deeptech · 2026-09-11

**Qué cambió.** Los tres ejes de arriba (comoditización por IA, moat ante IA, posicionamiento frente a la ola) son de software incluso con anclas deeptech, porque la pregunta sigue siendo qué hace la IA. Para una empresa que vende una molécula, la pregunta que decide es **dónde está la tecnología en el vector de madurez**. Selva Bio corre desde el 11 de septiembre sobre el **RLA** de `../valorizacion-luchante/references/rla-madurez.md`, con tres de sus ocho dimensiones.

| Sub-bloque | Peso | Qué mide | Selva |
|---|--:|---|---|
| **TRL** Tecnología | 40% | Cuán lejos del laboratorio y cuán cerca de producir en serie | 6 de 9, demostrada en entorno relevante |
| **IPRL** Propiedad intelectual | 35% | Qué está protegido y dónde | 3 de 9, decisión de proteger tomada, nada presentado |
| **RegRL** Regulatorio | 25% | Cuánto falta para tener permiso de vender | 4 de 9, expediente en preparación |

**Conversión.** Nivel a score con **(nivel menos 1) entre 8 por 100**. Da 63, 25 y 38, y ponderados dan **43**.

**Pendiente de sistema.** Decidir si esta columna RLA reemplaza a la de los tres ejes de IA para todo caso deeptech, o si conviven según el caso. Decisión del Director de Portfolio.
