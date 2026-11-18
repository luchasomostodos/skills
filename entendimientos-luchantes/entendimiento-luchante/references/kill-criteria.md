# Kill Criteria

00_Reference / screening. Léelo al filtrar o evaluar una startup para el funnel.

Reescrito el 2026-08-02 sobre research de fondos comparables, y ampliado el 2026-08-03 con un tercer research. Antes de esta versión los filtros duros 1 a 11 no existían: el documento decía "to be migrated from the original Kill Criteria document" y nunca se migró, así que el filtro de entrada del funnel operó tres cuartos vacío. Los de abajo se construyeron desde los parámetros del fondo y desde rúbricas públicas de fondos comparables, no desde el documento perdido.

Los tres research y la nota de qué aportó cada uno están en `Lucha/Funnel/00_Proceso/rediseno-filtros-2026-08/`.

## Dónde vive cada filtro

No es una lista, son tres niveles en tres momentos distintos.

| Nivel | Qué filtra | Cuándo corre | Con qué información |
|---|---|---|---|
| **1 · Eliminatorios** | Encaje binario. Falla uno, se descarta | Etapa 1, sobre el deck | Deck, formulario, 10 min de búsqueda pública |
| **2 · PEL** | Rúbrica ponderada de pre-análisis | Etapa 1, sobre el deck | Lo mismo |
| **3 · EL** | Las 9 dimensiones del Mapa Luchante | E3, post-pitch | Data room, transcripts, modelo, scores de partners |

**El Nivel 2 es el PEL (Pre-Entendimiento Luchante).** Decisión del Managing Partner, 2026-08-02: el PEL no es un documento aparte ni un paso intermedio, es **el pre-análisis que corre sobre el deck antes del pitch**. Es el EL con información mucho más pobre: proxies rápidos en vez de evidencia verificada.

**Regla dura: el PEL no duplica al EL.** Si el PEL pesa lo mismo que el EL, no es un filtro, es un EL barato hecho con peor información. Por eso el PEL **no puntúa impacto de forma fina** (eso es el Gate de Impacto con sus N1-N4 en E3, Dim 05), **no puntúa capital ni estructura** (Dim 03 necesita cap table), y **no puntúa cultura ni bienestar** (Dim 06 y 08 necesitan transcripts). El PEL mira barato lo que se puede mirar barato.

Nota de alcance: la postulación y la evaluación del deck ocurren en **Panel** (la plataforma de postulación de LUCHA), que no está integrado al workspace. Los niveles 1 y 2 son el criterio que Panel debe aplicar; el Nivel 3 vive acá. Ver `Estructura Lucha.md` sección 3.

---

## Nivel 1 · Filtros eliminatorios

Binarios y verificables sin hablar con el founder. Falla uno, se descarta.

### Encaje con el mandato

1. **Geografía fuera de alcance.** Fuera de LatAm hispanohablante, o Brasil.
2. **Vertical fuera de tesis.** Ni Access Tech, ni Climate Tech, ni Green Zebra.
3. **Etapa fuera de rango.** Post-money declarado sobre USD 8M sin justificación de excepción. El rango de entrada es **USD 3M a 8M post-money**, donde 8M es techo y excepción, no norma. (Resuelto por el Managing Partner, 2026-06-01; explica el default de 8M de la Calculadora Luchante.) Las referencias de mercado (top quartile LatAm ~5M, mediana healthcare US ~14M, variable por etapa y fuente) son **indicativas, no anclas**: lo que se evalúa es cómo está priceada esta startup vs. comparables de su etapa y sector.
4. **Ticket incompatible.** Pide sustancialmente sobre USD 150K sin ruta al comité externo. Ver `Fondo Luchante.md`.
5. **Exit incompatible con el fondo.** Horizonte de 15+ años, o lifestyle business sin evento de liquidez. El fondo dura 10 años más 2.

### Encaje con el impacto

6. **Impacto no ligado al modelo.** El impacto está al costado y no crece con las ventas. Criterio de Elevar (impacto en el core) y de Acumen (el foco es eliminatorio, no ponderado). Un deck que describe el impacto como programa de responsabilidad social separado del negocio falla acá.
7. **Impacto N4.** Cero impacto y cero intención, aplicado de forma anticipada y grosera sobre el deck. N1 y N2 pasan, N3 conversa (Gate completo en el flujograma del funnel).

### Riesgo eliminatorio

8. **Dependencia crítica** de un solo cliente, canal o regulador, sin plan de diversificación.
9. **Riesgos ESG materiales** sin plan de mitigación aceptado. Screening negativo básico: prácticas dañinas declaradas o evidentes. Criterio de Root Capital.
10. **Obsolescencia por IA.** Ventaja del core erosionable por IA (agéntica o no-code) en menos de 2 años **sin** ruta de defensa creíble ni capacidad de pivot del founder. Es la bandera roja de **Dim 09 Resiliencia Tecnológica** (ver `references/sistema/el-system.md`). Agregada por el comité 2026-06-08 a partir del caso Orbe.

   **Cómo se aplica sobre un deck,** con tres tests: **(a) sustitución**, ¿un usuario técnico obtiene el 80% del valor pegando el prompt central en ChatGPT o Claude? **(b) apagado de API**, ¿el producto sigue entregando valor si le revocan la API? **(c) anuncio de feature**, ¿el negocio muere si el proveedor del modelo lanza la función nativamente? Falla los tres sin ruta creíble a moat: eliminatorio. Falla los tres **con** ruta plausible a data flywheel: bandera de revisión, no muerte. El moat real viene de dato propietario que mejora con el uso, lock-in de workflow, o distribución que el proveedor del modelo no tiene. Nunca del modelo en sí.

11. **TAM sin fuente** presentado como argumento central de tamaño de mercado, sin metodología bottom-up. Es el destructor de credibilidad más citado en el análisis de decks.

### Encaje con el founder

Los tres son de la rúbrica pública de **Echoing Green**, y los tres se verifican en LinkedIn en cinco minutos.

12. **Sin dedicación full-time.** Los founders principales mantienen trabajo de tiempo completo en una corporación y operan la startup de costado. No hay alineación de riesgo.
13. **Quien postula no es el tomador de decisiones.** Es un director contratado o un intermediario, no el founder con autoridad real sobre el negocio.
14. **Encuadre colonial o paternalista** del problema y de la población objetivo. Un deck que habla de "los beneficiarios" desde arriba, sin proximidad ni transferencia de poder a la comunidad afectada, es incompatible con la tesis del fondo. Echoing Green lo descarta explícitamente.

### Adicionalidad financiera observable

15. **Cap table que anula la adicionalidad.** Si las rondas previas fueron lideradas por **VCs comerciales de primer nivel** (a16z, Kaszek, Monashees y equivalentes), la empresa no sufre vacío de capital y los USD 150K del fondo serían capital de relleno subsidiado. Verificable en los campos "Ronda actual", "Capital levantado previo" e "Inversores actuales" del formulario.

   **Corrección del 2026-08-03.** La versión del 2-ago decía que la adicionalidad financiera no era filtrable en etapa 1. Es demasiado absoluto: la parte fina (¿tiene otras opciones reales?) sigue requiriendo conversación y el founder tiene incentivo a ocultarla, pero **la presencia de VC comercial tier-1 en el cap table es observable y es evidencia fuerte en contra**. Marco de referencia: **DELTA de IDB Invest**, el marco regional de los bancos de desarrollo, que corresponde usar antes que el del IFC.

   Al revés, el **filtro verde de alta adicionalidad**: hardware de Climate Tech con I+D largo, o arquitecturas B2B en periferia con ciclos de venta lentos. Perfiles que enfrentan déficit estructural de financiamiento porque no encajan en el horizonte de exit de 5 a 7 años que exigen los LPs tradicionales. Ahí el instrumento blended del fondo es existencialmente necesario.

---

## Nivel 2 · La rúbrica del PEL

Score sobre 100 con lo observable en deck, formulario y búsqueda pública. Adaptada de **VIRAL** (Village Capital), el framework público más maduro para esto: 9 niveles de madurez por 8 categorías, con "evidencia" definida de forma operable. Lo que se toma prestado es su exigencia de evidencia en vez de afirmaciones, y su alerta contra el falso positivo de confundir una primera venta con tracción repetible.

| Criterio | Peso | Qué se mira | Fuente |
|---|---|---|---|
| **Founder-market fit observable** | 30 | Experiencia previa en el sector del problema **y** experiencia vivida del problema. Roles operativos, no asesoría. Declaraciones específicas y falsificables de "por qué yo" | Gompers, Gornall, Kaplan y Strebulaev 2020 (JFE, 885 VCs en 681 firmas): el equipo pesa más que el negocio. Village Capital llama a la experiencia vivida el "X factor" |
| **Calidad de la evidencia de tracción** | 20 | No que exista tracción, sino de qué está hecha. Datapoints de conversaciones con clientes, pilotos nombrados, cohortes con fecha. Una carta de intención no es validación | VIRAL nivel 3 (pide 50 datapoints de clientes) y alerta del nivel 7 |
| **Composición del equipo e historia compartida** | 15 | Al menos dos personas con habilidades diferenciadas, una técnica si el producto lo exige. Y sobre todo: **¿los cofundadores ya se conocían?** Equipos con historial previo de trabajo o estudio juntos superan a los formados ad hoc, porque bajan el costo de coordinación y resuelven conflicto bajo estrés. Verificable cruzando LinkedIn | VIRAL nivel 1. CB Insights: "no tener el equipo correcto" explica 23% de los fracasos, tercer motivo. La historia compartida viene de la literatura de equipos fundadores (Beckman y otros); ver nota de calidad de fuentes |
| **Diferenciación vs. saturación** | 15 | Los cuatro tests de abajo | LAVCA 2024, IDB-Finnovista 2023, Briter/CATAL1.5°T 2025 |
| **Por qué ahora** | 10 | Catalizador específico: regulación nueva, caída de un costo, penetración de dispositivo, apertura de datos. No "el mercado está creciendo" | Análisis de decks de alto desempeño |
| **Adicionalidad de programa** | 10 | Dos señales observables. **(a)** Que el deck o el formulario articule necesidades no financieras que los seis pilares del Studio resuelven. **(b)** El **test del saltador de aceleradoras**: si el perfil público muestra a la empresa brincando año tras año por incubadoras, premios y programas mientras el revenue sigue experimental, es un "grant-preneur" y otro programa de 18 meses no va a generar inflexión. Cinco minutos de LinkedIn | Adicionalidad no financiera de DFIs (DELTA, IDB Invest); Root Capital |

**Coachability no está en la rúbrica, a propósito.** Ciuchta et al. 2018 validaron una escala de 9 ítems y funciona como señal en un pitch presencial, pero investigación posterior encontró que **la coachability no predice el desempeño de la empresa**. Es lo que todo inversionista dice querer y no correlaciona. Para LUCHA importa como encaje con el programa de 18 meses, no como predictor, y eso se evalúa conversando. El criterio 2 del Gate de E2 debería reformularse en esa línea.

### Fricción cognitiva: la razón real por la que se rechaza un deck

Dato de telemetría de DocSend: un inversionista dedica en promedio **2 minutos y 24 segundos** a la primera revisión, unos 10 a 12 segundos por slide. Si la slide 2 promete un SaaS de suscripción pura y la slide 7 muestra ingresos irregulares de consultoría, el lector se detiene 15 a 30 segundos a reconciliar. Ese impuesto cognitivo agota el presupuesto de atención y erosiona la confianza. La mayoría de los rechazos no son por mala idea: son porque el deck fue cognitivamente insoportable y el analista asumió desorden operativo detrás.

**Pero acá hay una trampa que aplica directo a LUCHA.** Castigar la mala articulación gráfica produce **mortalidad asimétrica de talento** en LatAm, porque saber armar un deck bonito no es lo mismo que saber distribuir en campo. Por eso hay que separar dos cosas que se confunden:

- **Inconsistencia arquitectónica** (los números de una slide contradicen los de otra de forma que revela que el equipo no entiende su propia economía). Es señal legítima y va a bandera de interrogación obligatoria en el pitch.
- **Imperfección estética** (deck feo, tipografía mala, gráficos torpes). **No se penaliza. Nunca.**

Ante una contradicción, la pregunta correcta no es "esto está mal hecho" sino "¿es un error de tipeo o es una falla de comprensión financiera?". Lo primero se perdona, lo segundo se interroga.

### Los cuatro tests de diferenciación

Aplicables en unos 10 minutos de búsqueda pública.

1. **Densidad de competidores con funding.** Cuántos competidores con ronda cerrada hay en el mismo nicho y país.
2. **Ola vs. clon.** ¿Monta una tendencia estructural real, o repite un patrón ya explotado sin ventaja? La ola justifica el timing; el clon solo copia.
3. **Consolidación o cementerio.** ¿La categoría ya tuvo una ronda de M&A o una tanda visible de fracasos? Entrar tarde y sin diferenciación a una categoría consolidada es bandera roja. YC lo llama "tarpit ideas": fáciles de empezar, difíciles de ganar, atraen primerizos.
4. **Test de IA**, los tres del filtro 10.

### Nichos sobre-poblados y whitespace

Lista viva, se refresca cada trimestre. Fuentes con año, porque los benchmarks de 2021 no aplican.

**Access Tech, zonas rojas.** Lending y crédito digital, pagos y remesas, neobancos. El fintech captó **46% de los dólares de VC regionales en 2023** (LAVCA, Trends in Tech 2024; ojo, la cifra de 61% que circula viene de agregadores secundarios, no del dato primario). IDB con Finnovista contó **3,069 fintechs en 26 países en 2023**, desde 703 en 2017. CB Insights: en 2025 la región captó USD 2,500M en fintech con solo **199 deals**, mínimo de cinco años. El capital se concentra en menos empresas y más tardías.

**Climate Tech, dónde está el dinero.** Forestal, uso de la tierra y agrofood dominan el volumen, pero por pocos deals grandes: más del 70% del flujo 2021-2023 vino de deals sobre USD 10M. Más de 600 ventures en 10 países levantaron más de USD 2,000M en la década, ticket promedio USD 780K, menos del 1% del funding climático global (Briter Bridges con CATAL1.5°T, 2025).

**Climate Tech, whitespace del mismo reporte.** Transporte de baja emisión, construcción verde, deeptech, hardware y economía circular, todos con brecha de investment readiness. Geográficamente lideran Brasil, Chile y México; Centroamérica y el Caribe quedan desatendidos. Para un fondo hispano ex-Brasil eso ubica la oportunidad con precisión.

**Advertencia sobre los datos.** Casi toda la data de funding de LatAm agrega Brasil, que con México concentra cerca del 70-78% de los dólares regionales. Las cifras "LatAm" están sesgadas hacia Brasil: para el universo hispano ex-Brasil los volúmenes reales son bastante menores que los titulares.

---

## Green Zebra · Track paralelo

Decisión del Managing Partner, 2026-08-02. Cierra una pendiente que llevaba abierta desde la creación de este documento.

**Green Zebra no pasa por la misma rúbrica.** Es un régimen distinto, no una vertical más. Combina retorno moderado con impacto profundo, así que juzgarla con criterios de escala la mata por diseño.

Qué cambia respecto del Nivel 2:

- **No se le exige escalabilidad masiva.** Múltiplos bajo 5x son aceptables y no descuentan.
- **El criterio de saturación no aplica igual.** Su nicho es por definición menos poblado, y competir en un espacio chico no es debilidad.
- **Entra un criterio propio: rentabilidad temprana**, o ruta clara y creíble hacia ella. Toma el peso de 15 que en el track normal lleva la diferenciación.
- Todo el Nivel 1 sí aplica, incluidos los filtros de riesgo y el de impacto ligado al modelo.

---

## Banderas de auto-auditoría

**No filtran al founder, auditan nuestro propio scoring.** Disparan segunda opinión obligatoria antes de descartar.

- **El founder es mujer, o hay mujeres en el equipo fundador.** El sesgo está documentado con evidencia experimental fuerte: pitches idénticos narrados por voz masculina se financian 68% más, y los equipos exclusivamente femeninos captaron 1.8% del capital de VC de EE.UU. en 2023, el mínimo desde 2016 (PitchBook/Deloitte). Corregir esto es parte de la tesis del fondo: el filtro no puede reproducirlo.

- **Founder mujer en una vertical percibida como técnica o masculina.** Es la bandera más específica y la que más aplica a este fondo. Kanze, Conley, Okimoto, Phillips y Merluzzi (**Science Advances, 2020**) demuestran que las founders mujeres en industrias dominadas por hombres sufren una penalización severa en valuación y en probabilidad de avanzar, por un sesgo inconsciente de "falta de encaje de industria". Los founders hombres **no** son penalizados al entrar a sectores dominados por mujeres: el sesgo es asimétrico. **Climate Tech es una de las tres verticales del fondo, y es justo donde más golpea.** Cualquier corazonada del tipo "no parece encajar en el sector" es este sesgo operando: la competencia técnica se infiere de las métricas de iteración del producto, nunca del perfil demográfico.

- **Lenguaje de prevención en el deck.** Kanze et al. (*Academy of Management Journal*, 2018) documentan que a los hombres se les habla en clave de promoción (crecimiento, conquista de mercado) y a las mujeres y founders de entornos subatendidos en clave de prevención (supervivencia, mitigación de riesgo), y que los founders moldean su narrativa en consecuencia. Un deck redactado con prudencia y foco en gestión de riesgo se califica inconscientemente como menos visionario. **En una Green Zebra eso está al revés:** la gestión impecable del riesgo y la eficiencia de capital son superiores a la hiper-expansión subsidiada. No descontar decks prudentes frente a proyecciones mesiánicas de monopolio.

- **División de equity exactamente igualitaria (la regla 1/n).** 50/50 o 33/33/33 en un equipo con contribuciones asimétricas correlaciona **negativamente** con captación posterior de capital, porque suele señalar aversión a la negociación difícil o miedo al conflicto interno (investigación de Oxford sobre división de equity fundacional). Se ve en el formulario si se pide la estructura accionaria. Bandera para conversar, nunca descarte: en equipos genuinamente simétricos el reparto igual es correcto.
- **El founder viene de un mercado o geografía distinta al mercado objetivo.** Explorar el founder-market fit en la conversación, no descalificar.
- **Founder primerizo sin track record.** Los founders con IPO previa tienen 30% de éxito vs. 18% de los primerizos (Gompers, Kovner, Lerner y Scharfstein 2010, JFE, más de 10,000 empresas). Predice, pero excluye a primerizos de calidad, que es contrario a la tesis. Bandera, nunca descarte. Echoing Green apoya primerizos y evita explícitamente filtros de éxito financiero previo.
- **Estilo de pitch fuertemente asertivo o fuertemente orientado a riesgo.** Verificar que se evalúa sustancia y no estilo. Kanze documenta que a las mujeres se les hacen preguntas de prevención y a los hombres de promoción.
- **Thin wrapper de IA con ruta plausible a data flywheel.** Revisión, no muerte.

**Señales prohibidas como criterio.** Universidad de élite, ex-Big Tech, logos de empleadores previos en el team slide. Están desacreditadas como proxy de calidad y contaminadas por el sesgo que el fondo quiere corregir. Lo que cuenta es experiencia de ejecución específica, no el logo.

**Registros formales** (patente, marca, incorporación en Delaware) no tienen peso acá. Catalini y Stern encontraron un efecto enorme, 278x, pero es un estudio de EE.UU. de 1995-2005 y esas señales institucionales no se trasladan a LatAm: su ausencia no dice nada.

---

## Lo que NO se puede filtrar en etapa 1

Va a la conversación. Ponerlo en el filtro es fingir precisión.

- **Adicionalidad financiera real.** Los marcos de DFIs requieren contrafactual, y el Center for Global Development advierte que el founder **tiene incentivo a ocultar** si tiene respaldo privado disponible: fingir que no es viable sin ti le consigue mejores términos. En etapa 1 solo se evalúa adicionalidad de programa. El descarte fuerte ("si le sirve igual un VC tradicional, no es nuestro deal") se resuelve en el pitch, con dos preguntas tomadas de Root Capital: ¿conseguiría términos similares de un VC tradicional? y ¿qué de los seis pilares es imprescindible en este caso?
- **Coachability real.** Requiere observar reacción a una tarea o a un desafío en vivo.
- **Veracidad de las métricas declaradas.** Revenue, clientes pagantes y capital levantado son autorreporte del formulario. Sin data room no hay verificación.
- **Dinámica y química entre cofundadores.** Invisible sin interacción o referencias.
- **Founder hallucination.** Distinguir convicción genuina del founder que se volvió su propio cliente número uno y confunde su caso con el mercado. Exige sondear.
- **Feedback real de clientes** (Lean Data de Acumen). Requiere acceso directo a los clientes.

---

## Métrica del proceso y calibración

**Tasa de paso objetivo de etapa 1 a pitch: 15%.** Decisión del Managing Partner, 2026-08-02.

Está dentro del rango defendible de 10-25%: Draper Richards Kaplan publica que pasa ~25% a primera entrevista, el embudo de VC deja avanzar 10-15%, YC entrevista a ~7%. No existe benchmark específico para fondos de impacto pre-seed de ticket USD 150K en LatAm, así que esto es inferencia calibrada, no hallazgo directo.

**Por qué NO aplica el 3-5% que va a aparecer citado.** Hay un benchmark muy repetido de 3-5% de conversión de deck a primera reunión, con 40-50% para intros cálidas. Ese número mide **outbound frío a un VC**, que es otro embudo. Panel es una **postulación entrante a un programa**, con formulario, y ese embudo se compara contra DRK (25%) y YC (7%), no contra el cold email. Si alguien trae el 3-5% para argumentar que 15% es laxo, esta es la respuesta.

**Umbrales de recalibración.** Bajo 10% de paso, el filtro probablemente está matando falsos negativos. Sobre 30%, no está discriminando.

**Revisión de cohorte rechazada, cada 6 meses.** Tomar una muestra de descartados y ver qué pasó: levantaron, crecieron, murieron. Y sobre todo, qué criterio los mató. Un filtro se calibra mirando lo que mata de más, no solo lo que deja pasar. Airbnb fue rechazada por múltiples VCs y Fred Wilson la llamó después su mayor error: el screening por deck falla justo en los modelos raros, que es donde vive el retorno.

**Segunda opinión de bajo costo.** No se revisa todo. Se activa solo con las banderas de auto-auditoría y con los thin wrappers que tienen ruta a moat. O sea, solo lo que el propio filtro tiende a penalizar injustamente.

**Selección entre pares como antídoto.** Village Capital usa rondas repetidas de ranking entre los propios founders para corregir el sesgo de un evaluador único. Nació explícitamente porque el VC fluye hacia redes de hombres blancos en tres estados de EE.UU. Vale considerarlo si el volumen crece.

---

## Decisiones pendientes

Cerradas en esta versión: la excepción Green Zebra (track paralelo) y el pre-scoring de etapa 1 (Panel corre el Nivel 1 binario; el Nivel 2 es humano asistido por IA).

Abiertas:

1. **Sign-off de rechazo.** ¿Coordinación de Funnel firma con plantilla en Nivel 1, y el Managing Partner firma Niveles 2 y 3?
2. **Corte del PEL.** El PEL da un score sobre 100 pero no está definido el corte. ¿Score mínimo fijo para pasar a pitch, o ranking hasta llenar el 15%?
3. **Refresco de la lista de nichos.** Quién la actualiza cada trimestre y con qué fuentes.

## Huecos de evidencia declarados

Del research, para que nadie los tome por resueltos:

- **Corregido el 2026-08-03.** Los dos primeros research declararon que Alive Ventures y Pomona Impact no tenían criterios públicos. El tercero los encontró: **Alive** usa las Cinco Dimensiones del Impact Management Project, un lente de género innegociable, y población objetivo bajo USD 11 al día; **Pomona** aplica un filtro de mandato estrictamente binario (industria, país, retorno, etapa, monto, alineación ODS e IRIS+). Sigue sin haber rúbrica pública operable para EWA Capital, Mountain Nazca, Adobe Capital (hoy Deetken Impact), Yunus Social Business ni Impacta VC. Los que sí tienen metodología comparable: Village Capital, Acumen, Draper Richards Kaplan, Echoing Green, Root Capital, Elevar Equity, Alive y Pomona.
- **Nota de calidad de fuentes.** Varias de las mejores ideas del tercer research (fricción cognitiva, historia compartida del equipo, tasas de conversión) se apoyan en blogs de consultoras de pitch decks, no en las fuentes primarias. El dato de DocSend es real y muy citado pero llega de segunda mano, y la cita de historia compartida del equipo apunta a un paper sobre sindicatos de VC, no sobre equipos fundadores. Las ideas se adoptaron porque son plausibles y accionables; **si alguna se va a defender ante comité o LPs, hay que ir a la fuente primaria antes**.
- No existe estudio sistemático que cuantifique tasas de falsos negativos en fondos de impacto de este tamaño. Solo evidencia anecdótica.
- No existe instrumento psicométrico comercial con validación externa independiente para evaluar founders a distancia. No incluir ninguno en el filtro.
- No hay data de funding reciente para sub-categorías de Access Tech **no financiero** (salud, agua, energía distribuida) en países hispanohablantes ex-Brasil. Es justo donde el fondo juega, y es el hueco de datos más relevante para el criterio de saturación.

## Papelera Luchante

Regla operativa que no se discute, viene del diseño del funnel: **48 horas de ventana sobre cualquier decisión negativa antes de comunicarla**, en cualquier fase. Aplica también a los descartes de Nivel 1.
