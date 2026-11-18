---
name: analisis-financiero-el
description: >-
  Motor determinístico de análisis financiero para los bloques de Negocio (Dim 02) y Capital (Dim 03) de un Entendimiento Luchante. Dispara cuando alguien del equipo de LUCHA
  trabaja Dim 02 o Dim 03 de un EL, cuando suben o apuntan a un modelo financiero seed (.xlsx), un cap table, los SAFE o la calculadora_luchante.jsx, o cuando piden: unit
  economics, margen de contribución, EBITDA vs servicio de deuda, ratio Studio sobre FL, dilución del founder, revenue real vs proyección, banderas cuantitativas, o Reverse
  Engineering del plan de inversión. Dispara aunque no se diga "análisis financiero": si está parseando un modelo seed, estructurando la ronda de un caso, o comparando dos
  ELs o dos modelos, úsalo. NO dispara para Tribal Score (tribalometro), Impacto (Responsable de Impacto), Storytelling, styling de marca (lucha-brand), ni contabilidad genérica fuera de un
  EL. El precio, la fairness de la valuación y el cap de un SAFE son de valorizacion-luchante.
---

# Análisis financiero del EL (Mark 91)

Motor determinístico que ingiere el modelo financiero seed, el cap table y los parámetros de la calculadora de un caso, y devuelve un pack de números y banderas que alimenta Dim 02 (Negocio y Salud Financiera) y Dim 03 (Capital y Estructura) del Entendimiento Luchante.

Lo que hace: la parte cuantitativa y repetible, más el Reverse Engineering del plan de inversión cuando aplica. Lo que NO hace: asignar el score de la dimensión ni redactar el framing cualitativo. El motor entrega los inputs; la persona pone el número y la narrativa.

**Mark 86** añade: (a) Reverse Engineering del plan de inversión como paso explícito, (b) modo comparativo para dos ELs en paralelo, (c) thresholds de decisión embebidos para que el skill funcione sin acceso a EL System.md, y (d) onboarding pensado para que el analista financiero y Coordinación de Funnel lo corran solos.

**Mark 87** añade clasificación por tipo de empresa (SaaS/suscripción, transaccional/marketplace, healthtech/digital health, fintech/lending) y adapta KPIs, banderas y denominador del múltiplo a cada uno.

**Mark 88** añade el paso 2d **Anatomía de la proyección**: prueba si los números proyectados tienen motor (driver-based) o son metas tecleadas, si el COGS escala con el volumen, si el SG&A está desglosado, y si el gasto de marketing está acoplado a la adquisición de clientes que el revenue asume (CAC reinvestment + funnel comercial). Entrega además la lista de preguntas abiertas al founder.

**Mark 89** saca la valorización de este skill: los Pasos 5 y 8a ahora **delegan en `valorizacion-luchante`**, única fuente de verdad de precio en LUCHA. Este motor sigue dueño de unit economics, márgenes, proyección, banderas y ratio Studio/FL.

**Mark 90** (2026-09-30) añade la lente E del paso 2d, **el pack de drivers** para el simulador de la Dim 02, con la fórmula del modelo, su calibración contra las celdas y las metas. Sin palancas, que las declara quien hace el EL.

**Mark 91** (2026-09-30) suma el séptimo tipo del Gate B, activo biológico, al paso 2.5.

---

## Antes de empezar, el Gate VC-backable

**Pregúntalo o léelo declarado antes de correr nada.** Vive en `../entendimiento-luchante/references/sistema/el-system.md` y lo declara el EL en su bloque de Metodología.

| Gate | Qué produce este skill además de lo de siempre |
|---|---|
| **VC-backable: SÍ** | Lo de siempre. `valorizacion-luchante` emite el veredicto con `P_max` y múltiplos |
| **VC-backable: NO** | **El período de recupero de la posición**, que pasa a ser la métrica principal. `valorizacion-luchante` corre en **modo CAJA** y `P_max` no aplica |

**El período de recupero** son los años desde el desembolso hasta que la caja recibida iguala lo puesto. Nominal, bruto a nivel de posición, en escenario conservador, y **sin contar el valor de la posición sin realizar**. Se corre dos veces: primero solo con dividendos, y si así nunca repaga, eso es el hallazgo, porque significa que todo el retorno depende de un mecanismo de salida que hay que negociar.

Implementación de referencia: `Lucha/Funnel/02_Casos/Marea Regenerativa/modelo/recupero.py`. Vara del Fondo: su caso base distribuye desde el **año 6**.

**Y el MOIC objetivo del fondo quedó retirado** como parámetro que decide, porque no tiene fuente. Se reporta como salida junto al recupero, nunca como vara.

---

## Antes de empezar

Si tienes acceso a `../entendimiento-luchante/references/sistema/el-system.md` y `00_Reference/Fondo Luchante.md` (workspace del equipo), léelos primero: son la fuente de verdad de pesos, semáforo y metodología de scoring. Si no tienes acceso, usa los **thresholds embebidos** de la sección al final de este archivo. Este skill no repite todo EL System: lo consulta si está disponible, opera con los embebidos si no.

---

## Procedimiento

### 1. Reunir inputs

Ubica el modelo seed (.xlsx), el cap table, y los parámetros del deal (de `calculadora_luchante.jsx` o de los términos aprobados en comité). Si falta una pieza, pregunta una vez, luego corre con lo que haya y marca el gap como bandera. No bloquees todo por un archivo faltante.

Checklist mínimo:
- [ ] Modelo financiero seed (.xlsx)
- [ ] Cap table actualizado
- [ ] Parámetros del deal: ticket FL, valuation, descuento de ronda, EI, descuento EI, sweat equity, premio de vesting

---

### 2. Parsear el modelo

Sigue `references/modelo-parsing.md`. Extrae: trayectoria de revenue (real y proyectado), trayectoria de márgenes (GM%, COGS%, SG&A%, EBITDA%) histórica y proyectada, escenario activo (bear/base/bull) con toggles, margen de contribución, EBITDA por trimestre, servicio de deuda por trimestre, y el Debt Schedule completo.

---

### 2.5 Clasificar la empresa

**Desde el 2026-09-28 el tipo de negocio ya viene declarado en el Gate B del EL, con siete tipos** (`../entendimiento-luchante/references/dimensiones/carril-y-version-de-reglas.md`). Este paso lo confirma con el modelo y elige la tabla de KPIs así. Software puro usa SaaS. Marketplace con operación física usa transaccional. Crédito o balance usa fintech. Producto regulado usa healthtech si es salud. Servicio apoyado en tecnología y hardware o deeptech usan la tabla de su motor de revenue dominante. Activo biológico también, y además revisa la curva de rendimiento según la edad de la planta o del lote, el costo por hectárea y el año en que se llega a producción plena. **Si el modelo contradice el tipo declarado, es una parada del EL** y se reporta antes de seguir. Si corres fuera de un EL, clasifica tú como sigue.

Antes de elegir KPIs, declara de qué tipo es la empresa y con qué señales lo decidiste. Regla de decisión:

| Tipo | Cómo se gana la plata | Señales en el modelo |
|---|---|---|
| **SaaS / suscripción** | El cliente paga periódicamente por acceso continuo | "suscriptores", "planes", "MRR/ARR", churn, mensual vs. anual |
| **Transaccional / marketplace** | Comisión o take rate por transacción; o conecta dos lados | "GMV", "take rate", "comisión", "transacciones", "compradores/vendedores" |
| **Healthtech / digital health** | Servicio/producto de salud, casi siempre mix B2C + B2B | clínicas, aseguradoras, reembolso, pacientes, consultas, licencia sanitaria |
| **Fintech / lending** | Spread financiero: presta y cobra interés/comisión | cartera, originación, tasa/APR, mora/NPL, provisión, fondeo |

**Reglas de clasificación:**
- Clasifica por el **motor de revenue dominante**, no por cómo se describe el founder. Una healthtech que cobra suscripción sigue siendo healthtech si tiene línea clínica/regulatoria; el tipo se define por lo que mueve la economía y el riesgo.
- Si es **híbrida** (lo más común en nuestro funnel: ej. healthtech con suscripción B2C + convenios B2B), declara el tipo primario y trata la segunda línea como sub-modelo, reportando sus KPIs aparte.
- **Output obligatorio:** "Tipo detectado: [X]. Señales: [...]". Si no es claro, decláralo como bandera y corre el tipo más conservador.

---

**2b. Triple check de márgenes y consistencia de la proyección.** Ancla los márgenes proyectados a los actuals, aísla de dónde viene la mejora de margen (COGS% vs SG&A%, operating leverage), y cruza los supuestos contra el modelo de negocio y el plan de crecimiento. Identifica el escenario corrido. Este chequeo corre siempre.

**2c. KPIs y unit economics por tipo.** Según el tipo declarado en 2.5, extrae el set correspondiente:

**SaaS / suscripción recurrente**
- **KPIs núcleo:** MRR/ARR; descomposición new / expansion / churned MRR; NRR y GRR (net y gross revenue retention); logo churn vs. revenue churn; ARPU; LTV; CAC; LTV/CAC; CAC payback (meses); % mensual vs. anual; cohortes de retención.
- **Unit economics:** contribución por suscriptor = ARPU × gross margin − costo de servir. LTV = ARPU × GM% ÷ churn. CAC payback = CAC ÷ (ARPU × GM%).
- Corre el **check de reconciliación**: deriva el lifetime implícito del headline y compáralo contra las cohortes. Si el headline es más optimista, levántalo como bandera.

**Transaccional / marketplace**
- **KPIs núcleo:** GMV; número de transacciones; take rate (%); **revenue neto** (no GMV); AOV (ticket promedio); frecuencia de compra; usuarios activos por lado (compradores y vendedores); liquidez del marketplace (match/fill rate); retención por lado; CAC por lado.
- **Unit economics:** contribución por transacción = revenue neto por transacción − costos variables (procesamiento de pagos, logística, soporte, fraude). El margen de contribución se calcula sobre **revenue neto**, nunca sobre GMV.

**Healthtech / digital health**
- **KPIs núcleo:** pacientes activos y retención; **mix B2C vs. B2B** (clínicas/aseguradoras); ciclo de venta B2B; ARR institucional de convenios; **quién paga** (paciente, aseguradora, sistema público = reembolso); márgenes **separados por línea** (software puro vs. servicio clínico/humano); costo por consulta/intervención; CAC por canal.
- **Unit economics:** separa la línea software (margen alto) de la línea servicio clínico/humano (margen bajo, costo de personal de salud). Reporta el blended y el de cada línea. Un margen blended que se ve "de software" suele esconder una línea de servicio con margen flaco.
- Corre el **check de reconciliación de cohortes** solo para la línea de suscripción si existe.

**Fintech / lending**
- **KPIs núcleo:** cartera (loan book / saldo vivo); originaciones por periodo; tasa / APR; costo de fondeo; **spread / NIM** (net interest margin); **mora / NPL**; provisiones / pérdida esperada; **cosecha o vintage** (default por cohorte de originación); CAC; LTV ajustado por riesgo; unit economics por préstamo.
- **Unit economics:** contribución por préstamo = ingreso por interés/comisión − costo de fondeo − **pérdida crediticia esperada** − costo de servicio. El **riesgo crediticio es un costo de primera línea**, no un detalle al pie.

---

**2d. Anatomía de la proyección: ¿los números tienen motor?** Corre siempre, para todos los tipos. El 2b chequea que los márgenes anclen; el 2d chequea que la proyección esté **construida desde drivers** y no sea un set de metas tecleadas. La salida de este paso es doble: hallazgos cuantitativos **y** una lista de preguntas abiertas al founder (este paso casi siempre genera preguntas, no veredictos). Cuatro lentes:

**A. Revenue: ¿build-up o número tecleado?** Intenta reconstruir el revenue proyectado de abajo hacia arriba (ej. # clientes × ARPU, o volumen × ticket × frecuencia). Verifica que el **crecimiento de clientes tenga una tasa o lógica explícita** (funnel, capacidad de venta, cohortes) y no sea un salto arbitrario. Si la meta de revenue no se puede derivar de ningún driver —es un número puesto a mano sin growth assumption detrás— es **bandera**: no se valida el número, se levanta la pregunta de cuál es el raciocinio. Señal típica: revenue que duplica o triplica año a año con la misma estructura, sin que cambie ningún driver que lo explique.

**B. COGS y margen bruto: ¿escala el costo con el volumen?** Casi todos los negocios suman costo directo al escalar (soporte, infra, entrega humana, procesamiento, fraude, fondeo según el tipo). Un **COGS plano o que sube poco mientras el revenue se multiplica**, o un **GM que se sostiene altísimo (o sube) por años sin un puente explícito**, es optimista por defecto: márcalo y pregunta qué compone el COGS y por qué no crece con el volumen. La postura base del motor es que el GM tiende a **comprimirse** algo al escalar salvo prueba de lo contrario.

**C. SG&A: ¿hay desglose o es una caja negra?** Un SG&A reportado como un solo número agregado impide validar cómo se llega ahí. Pide el **breakdown por línea** (payroll por rol/headcount, marketing y ventas, G&A) y cruza contra el plan de contrataciones (2b) y el plan de adquisición (lente D). Sin desglose, el plan de gasto no es auditable: bandera de transparencia, no de credibilidad.

**D. Acoplamiento crecimiento ↔ gasto (CAC reinvestment + funnel).** Es la lente más importante cuando el valor futuro depende de adquirir más clientes y los unit economics son buenos (LTV/CAC alto, payback corto): en ese caso el modelo **debe** mostrar inversión creciente en marketing/ventas ahora para lograr el ramp de clientes. Chequea la **coherencia aritmética**: clientes nuevos del periodo × CAC ≈ presupuesto de marketing del periodo. Si el modelo proyecta muchos clientes nuevos pero el marketing no crece en proporción al CAC, el plan de adquisición está subfinanciado (o el CAC proyectado está subestimado). Identifica además el **funnel comercial** (% de pitches/leads que cierran, ciclo de venta, CAC por canal) y evalúa **qué tan bien conocen los founders estos números**: el negocio entra pronto en una etapa donde *money in (marketing) → money out (nuevos pagantes → MRR/ARR)*, y la calidad de la apuesta depende de que dominen esa máquina. Lo que el modelo no muestre, va como pregunta al founder.

**E. El pack de drivers para el simulador de la Dim 02 (Mark 90).** Corre siempre que la proyección tenga motor. Si el revenue es tecleado, no hay drivers que simular y se dice así.

1. **Elige entre tres y cinco drivers**, los supuestos de los que sale el ingreso del modelo (por ejemplo volumen, ticket, conversión, tasa, ventas por unidad). Cada uno con su valor del modelo y su celda, un rango creíble para el slider, y lo observado hoy con su frase. Si no hay historia, se dice.
2. **Escribe `calc`**, la fórmula del modelo en JavaScript, determinista. Reproduce la lógica de las hojas, incluido el redondeo de Excel (8,5 sube a 9). Si el costo no escala con el volumen, no es driver y va en la nota.
3. **Elige las salidas**, entre tres y cinco, con su valor del modelo y su celda. El capital que falta va siempre y enlaza a la Dim 03.
4. **Calibra.** Con los drivers en su valor del modelo, cada salida calza con su celda con un margen de 2%. Si el modelo trae escenarios, prueba `calc` contra cada uno. Lo que no calce por una inconsistencia del propio modelo entra como pregunta al founder.
5. **Escribe las metas** del "¿Qué tiene que ser cierto?", cada una con el driver que se resuelve, la salida, el umbral del plan y la comparación. Se miden en absoluto contra el plan, nunca como el cruce entre dos líneas.
6. **No escribas palancas.** Cada driver sale con `palanca: { estado: 'pendiente' }`. Si LUCHA puede moverlo, con qué acción y hasta qué valor lo declara quien hace el EL, en la parada que abre `entendimiento-luchante`.

Formato en `../entendimiento-luchante/assets/plantilla/README-plantilla-EL.md`, constante `DRIVERS`. El caso de ejemplo es Polímera, en `../entendimiento-luchante/scripts/generador-el/drivers-caso.js`.

**Salida del 2d:** una frase por lente (driver-based o tecleado; COGS escala o no; SG&A desglosado o caja negra; marketing acoplado o subfinanciado) **más** la lista de preguntas abiertas que el founder debe responder para que la proyección sea defendible, **más** el pack de drivers de la lente E, que pasa calibrado a `drivers-caso.js` del caso.

---

### 3. Validar framing antes de marcar discrepancias

Una diferencia entre revenue reportado y modelo casi siempre es framing (trimestral vs run rate anualizado) o tratamiento de IGV. Reconcilia antes de escalar nada como discrepancia.

---

### 4. Computar la estructura del deal

Sigue `references/calculadora-ratio.md`. La calculadora es la fuente de verdad; no re-derives a mano lo que ella ya calcula. Reporta: ratio sin vesting, ratio con vesting cumplido, dilución upfront y full del founder, valuation blended del FL, y si el ratio Studio sobre FL queda por encima de **1**.

Target: ratio > 1 en ambas versiones. La única fuente de fórmulas es `references/calculadora-ratio.md` (siempre disponible junto a este skill); no existe cadena alternativa en este archivo.

---

### 5. Preparar los inputs de valorización y entregarlos

Este paso **ya no emite el veredicto de precio**. Produce los insumos y los pasa a `valorizacion-luchante`, que es la única fuente de verdad de valuación en LUCHA (Mark 89, 2026-08-28).

El denominador del múltiplo depende del tipo declarado en 2.5:

| Tipo | Denominador trailing | Denominador forward |
|---|---|---|
| SaaS / suscripción | ARR actual | ARR proyectado a 12M |
| Transaccional / marketplace | Revenue neto anualizado (o GMV × take rate) | Revenue neto proyectado a 12M |
| Healthtech / digital health | ARR institucional si manda; revenue neto si fee-for-service; ambos si híbrido | Idem, proyectado a 12M |
| Fintech / lending | Revenue neto de riesgo (después de provisión) | Revenue neto de riesgo proyectado a 12M |

**Múltiplo trailing:** post-money / denominador del tipo (actual).
**Múltiplo forward:** post-money / denominador del tipo (proyectado a 12 meses al ritmo de crecimiento observado).

Declara siempre qué denominador estás usando y por qué. Para transaccional y lending en particular, di explícitamente que NO es ARR. Marca si el default de la calculadora diverge de los docs del deal.

**Handoff obligatorio a `valorizacion-luchante`:**

| Qué entrega este skill | Qué devuelve `valorizacion-luchante` |
|---|---|
| Tipo de empresa (paso 2.5) | Los tres números: precio de entrada, valor implícito hoy, valor alcanzable |
| Denominador y run rate | Test de alcanzabilidad del cap |
| Crecimiento observado, margen bruto, Berry ratio | Precio máximo defendible (`P_max`) |
| Deuda financiera, caja, pasivos con prelación | Veredicto de fairness y sus condiciones |
| Instrumento y cap del documento | Ownership como rango si el SAFE no ha convertido |

Si `valorizacion-luchante` no está disponible, reporta los múltiplos trailing y forward **sin veredicto** y marca el gap. No improvises el juicio de precio acá.

---

### 6. Emitir banderas cuantitativas

**Banderas estructurales (todos los tipos):**
- Deuda que no aparece en el Debt Schedule
- Posiciones duales equity + deuda del mismo backer
- Seed que financia servicio de deuda en vez de growth
- EBITDA que no cubre servicio de deuda en trimestres tempranos post seed
- Márgenes proyectados que no anclan a los actuals
- Expansión de margen contradictoria con el modelo (add-ons con costo humano, motion B2B)
- SG&A que crece menos que el plan de contrataciones
- Headline corrido en bull en vez de base
- Dependencia de segmentos no validados (línea que hoy es 0 y pesa en la proyección)
- **Revenue proyectado tecleado**: metas sin build-up de drivers ni growth assumption que las explique (paso 2d-A)
- **COGS que no escala con el volumen / GM que se sostiene altísimo años sin puente** (paso 2d-B)
- **SG&A en caja negra**: sin desglose por línea que permita auditar el plan de gasto (paso 2d-C)
- **Plan de adquisición subfinanciado**: marketing proyectado que no alcanza para los clientes nuevos que el revenue asume, dado el CAC; o founders sin dominio del funnel comercial (% de cierre, ciclo, CAC por canal) (paso 2d-D)

**Banderas propias del tipo:**

*SaaS / suscripción:*
- Churn que empeora al escalar
- NRR < 100% (no hay expansión)
- LTV/CAC inflado por churn de headline más optimista que las cohortes (correr check de reconciliación 2c)
- CAC payback > 18–24 meses a este stage
- "Recurrente" que en realidad son contratos one-off
- Mezcla de planes mensuales y anuales sin declarar en el headline
- No confundir bookings con MRR; no anualizar un mes pico como run rate estable

*Transaccional / marketplace:*
- Reportar **GMV como si fuera revenue** (bandera grande)
- Take rate inflado o no sostenible
- Volumen sostenido por subsidio/incentivos
- Concentración en pocos compradores o vendedores (riesgo de churn de un lado)
- Margen "sobre GMV" que esconde margen negativo sobre revenue neto

*Healthtech / digital health:*
- Márgenes proyectados a nivel de software puro cuando hay componente de servicio clínico humano (aquí es la regla, no la excepción)
- Línea de clínicas/aseguradoras hoy en 0 que pesa fuerte en la proyección
- Supuestos regulatorios o de reembolso sin resolver (¿licencia sanitaria? ¿aprobación de reembolso? ¿de quién depende?)
- Ciclo de venta B2B subestimado (clínicas y aseguradoras tardan meses o años)
- Dependencia de un convenio o cliente institucional único
- No contar el pipeline B2B como revenue

*Fintech / lending:*
- Proyección de mora demasiado baja vs. las cosechas reales observadas
- Crecimiento de cartera financiado con fondeo caro que comprime el spread
- Revenue contabilizado **sin provisionar** la pérdida esperada (interés bruto presentado como limpio)
- Concentración de cartera; descalce de plazos (fondeo corto, cartera larga)
- Dependencia de una sola línea de fondeo
- Supuestos regulatorios sin resolver (¿licencia para originar o captar?)

---

### 7. Devolver el pack

Formato fijo de salida: ver sección de formato más abajo. La persona lo usa para puntuar contra las anclas de Dim 02 y 03.

---

### 8. Reverse Engineering del plan de inversión *(paso Mark 86)*

Una vez entregado el pack, corre este paso si se pide explícitamente o si hay dos ELs comparados. El objetivo: trabajar hacia atrás desde los números para validar o refinar la tesis de inversión.

**8a. ¿Qué valuation es defensible desde los números?** → **lo corre `valorizacion-luchante`.**
- Entrega el pack del paso 5 (tipo, denominador, run rate, crecimiento, márgenes, deuda neta, instrumento y cap) e invoca ese skill en **modo ENTRADA**.
- Él devuelve: valor implícito hoy, alcanzabilidad del cap, `P_max` desde el retorno objetivo del fondo, y la brecha contra el precio pedido.
- **No re-derives ese cálculo acá.** Si el número que devuelve contradice tu lectura del modelo, eso es un hallazgo para comité, no algo que se arregla recalculando por otro lado.

**8b. ¿Qué estructura de deal maximiza el ratio y minimiza el riesgo para LUCHA?**
- Regla clave: el ratio Studio/FL depende SOLO de los montos (ticket, EI, descuento EI, sweat, premio). El valuation y el descuento de ronda se cancelan en la división: no son palancas del ratio; sí lo son de la dilución del founder y de los stakes absolutos.
- Palancas del ratio: bajar ticket o EI, subir sweat o premio, o reducir el descuento EI. Palancas de dilución: valuation y descuento de ronda.
- Restricciones al optimizar: EI ≤ 100, dilución founder full dentro del semáforo (<25% verde, 35% techo), y los rangos aprobados en comité.
- Reporta la configuración que produce el mejor ratio respetando esas restricciones, y por separado su efecto en dilución.

**8c. ¿Qué supuestos del modelo deben cumplirse para que la tesis sea válida?**
- Identifica los 2-3 supuestos que más impactan el retorno (ej. retención de cohortes, crecimiento de un segmento, reducción de COGS%).
- Para cada uno: ¿qué pasa si no se cumple? Cuantifica el impacto en revenue y EBITDA a 24 meses.

**8d. Si hay dos ELs, análisis comparativo.**
- Tabla lado a lado: valuation/denominador del tipo, ratio Studio/FL, dilución founder, banderas, múltiplo forward.
- ¿Cuál tiene mejor riesgo-retorno dado el stage y el modelo de negocio?
- ¿Hay oportunidad de estructurar diferente alguno de los dos para mejorar el perfil?

**Output del Reverse Engineering:**

```
## Reverse Engineering del plan · [Empresa / Comparativo]

### Valuation defensible
- Tipo de empresa: [X]
- Denominador usado: [ARR / revenue neto / GMV×take rate / revenue neto de riesgo] — [justificación]
- Denominador forward 12M: [valor]
- Múltiplo sector aplicado: [rango y fuente]
- Post-money implícito: [valor] vs deal propuesto: [valor]
- Brecha: [% y qué crecimiento la cierra]

### Estructura óptima del deal
- Configuración recomendada: ticket [x], descuento [%], EI [x], sweat [x], premio [x]
- Ratio resultante: sin vesting [x.xx], con vesting [x.xx]
- Dilución founder: upfront [%], full [%]

### Supuestos críticos
1. [Supuesto], impacto si falla: [cuantificado]
2. [Supuesto], impacto si falla: [cuantificado]
3. [Supuesto], impacto si falla: [cuantificado]

### Comparativo [si aplica]
| Métrica | [Empresa A] | [Empresa B] |
|---|---|---|
| Post-money deal | | |
| Tipo de empresa | | |
| Denominador múltiplo (tipo) | | |
| Denominador actual | | |
| Múltiplo trailing | | |
| Múltiplo forward | | |
| Ratio Studio/FL (sin vest) | | |
| Dilución founder full | | |
| Banderas críticas | | |
| Veredicto riesgo-retorno | | |
```

---

## Formato de salida: pack financiero (fijo)

```
## Pack financiero · [Empresa]

### Tipo detectado: [SaaS/suscripción | Transaccional/marketplace | Healthtech/digital health | Fintech/lending]
Señales: [lista de señales del modelo que lo determinaron]
[Si híbrido: tipo primario + sub-modelo con sus KPIs separados]

### Negocio (Dim 02)
- Revenue real vs proyección: [framing reconciliado]
- Margen de contribución: [valor]
- Trayectoria de márgenes y consistencia de la proyección: [GM/EBITDA histórico vs proyectado, escenario activo, si ancla o es optimista]
- Anatomía de la proyección (2d): [Revenue driver-based o tecleado · COGS escala o no · SG&A desglosado o caja negra · marketing acoplado a la adquisición o subfinanciado] + preguntas abiertas al founder
- EBITDA por trimestre: [serie]
- Salud operativa: runway, burn, cobertura de servicio de deuda
- KPIs del tipo:
  [SaaS] MRR/ARR, NRR/GRR, churn, LTV/CAC, CAC payback, cohortes; check reconciliación headline vs cohorte [conciliado / flag]
  [Transaccional] GMV, revenue neto, take rate, AOV, frecuencia, usuarios activos por lado
  [Healthtech] Mix B2C/B2B, márgenes por línea (software vs clínico), pacientes activos, CAC por canal, ciclo venta B2B, quién paga
  [Fintech] Cartera, originaciones, NIM/spread, mora/NPL, cosecha/vintage, LTV ajustado por riesgo, costo de fondeo

### Capital (Dim 03)
- Estructura de ronda: ticket FL, ronda target, % comprometido
- Valuation: múltiplo [denominador del tipo] trailing y forward + inputs entregados a `valorizacion-luchante`; el veredicto de precio viene de ahí, no de acá
- Cap table: distribución y backers
- Ratio Studio/FL: sin vesting [x.xx], con vesting [x.xx] (target > 1)
- Valuation blended del FL: [valor] (precio efectivo de entrada del FL)
- Dilución founder: upfront [%], full [%]

### Banderas cuantitativas
- [banderas estructurales con evidencia]
- [banderas propias del tipo con evidencia, o "sin banderas del tipo"]
```

---

## Thresholds embebidos (operar si EL System.md no está disponible)

### Benchmarks de valuation (pre-seed / seed)

> Se conservan como contexto de lectura. **El veredicto de fairness lo emite `valorizacion-luchante`**, que además corrige por instrumento (cap de SAFE ≠ valor), por deuda neta (EV ≠ equity) y por retorno objetivo del fondo.

| Referencia | Post-money |
|---|---|
| Mediana pre-seed LatAm | ~USD 4.05M |
| Healthcare / digital health US pre-seed | ~USD 6.2M |
| Piso aceleradora LatAm | USD 1.4M–2M |
| Rango screening Lucha | USD 3M–8M |

Múltiplos ARR pre-seed típicos (SaaS): 10x–30x trailing (ruidoso por ARR chico). Forward (12M) más informativo: >20x es señal de levantar temprano, no necesariamente sobreprecio. Para otros tipos, el denominador cambia según la tabla del Paso 5; los rangos de múltiplo deben validarse contra comparables del sector específico.

Vigencia: benchmarks cargados a junio 2026. Si el dato tiene más de ~12 meses, validar contra data fresca antes de la defensa en comité.

### Semáforo de salud financiera (Dim 02)
| Indicador | Verde | Amarillo | Rojo |
|---|---|---|---|
| Runway post-seed | >18 meses | 12–18 meses | <12 meses |
| EBITDA cubre servicio de deuda Q1 post-seed | Sí | Parcial | No |
| GM% proyectado ancla a actuals | Δ<5pp | Δ5–10pp | Δ>10pp sin puente |
| Headline escenario | Base | Mixto | Bull |

### Semáforo de deal (Dim 03)
| Indicador | Verde | Amarillo | Rojo |
|---|---|---|---|
| Ratio Studio/FL sin vesting | >1.5x | 1.0–1.5x | <1.0x |
| Dilución founder full | <25% | 25–35% | >35% |
| Valuation en rango Lucha | Sí | Borde | Fuera de rango |

---

## Reglas inviolables

- **Clasificar el tipo de empresa antes de elegir KPIs y denominador de múltiplo. No correr el set de SaaS por default.**
- **Distinguir proyección driver-based de metas tecleadas (paso 2d). Si el revenue, el COGS o el SG&A no se pueden reconstruir desde drivers, no validar el número: marcarlo y listar la pregunta al founder. Si el plan de marketing no está acoplado a la adquisición de clientes que el revenue asume, levantarlo.**
- No usar ARR/MRR cuando el negocio es transaccional o lending. Usar métricas propias del tipo.
- **No emitir el veredicto de precio ni calcular valuación defensible. Eso se delega a `valorizacion-luchante` (Paso 5 y 8a). Este skill entrega los inputs; aquel decide el número.**
- No asignar el score de la dimensión ni escribir el framing cualitativo. Entregar números y banderas.
- No re-derivar a mano lo que la calculadora ya computa.
- Validar framing (trimestral vs anualizado, IGV) antes de marcar cualquier discrepancia de revenue.
- Montos de la calculadora en miles de USD (1 = $1,000).
- El modelo financiero es la fuente de verdad sobre lo que el modelo contiene: reportar sus números como hechos del modelo, no como afirmaciones del founder por validar. La credibilidad de la proyección se evalúa aparte, en el triple check (2b).
- Todo monto se reporta en USD. Si el modelo viene en otra moneda, convertir y mostrar el tipo de cambio.
- Las valuations siempre en post-money. Si un dato viene en pre-money: post-money = pre-money + monto levantado.
- El paso 8 (Reverse Engineering) no reemplaza el juicio de inversión. Entrega la materia prima para que la persona decida.

---

## Referencias incluidas

- `references/calculadora-ratio.md`: cadena de fórmulas del ratio Studio/FL, inputs canónicos y ejemplo trabajado. Leer en el paso 4.
- `references/modelo-parsing.md`: cómo parsear el modelo seed estándar LUCHA. Leer en el paso 2.
