# Anclas para caso NO VC-backable

> Detalle de método del EL. **Se carga solo cuando el gate del Gate VC-backable da NO.** La espina vive en `references/sistema/el-system.md` y las anclas por defecto en los `dim-XX-*.md` de esta carpeta.

**Abierto:** 2026-08-29 · **Caso piloto:** Marea Regenerativo · **Estado:** propuesta, sin ratificar por comité

## Por qué existe

El Fondo Luchante es un vehículo de 30 años y el memo v3 dice que existe para sostener también empresas que pagan y no venden. El gate del Gate VC-backable decide con qué lente se lee un caso. Lo que faltaba es que ese lente llegara a los anclajes.

**La rúbrica del EL tiene el lente venture escrito adentro.** No en el encuadre, en el texto de las bandas. Medido sobre el caso Marea:

| Dim | Peso con anclas venture | Ejemplo textual |
|---|--:|---|
| 03 Capital | **85%** | *"Lista de 10+ fondos Serie A"* · *"Mercado con historia documentada de M&A"* |
| 02 Negocio | 45% | *"MRR/ARR creciendo MoM. Retention >80% logo, NPS >40"* · *"CAC payback <18 meses"* |
| 04 Mercado | 30% | TAM y SAM en dólares de mercado de producto |

Y dos de esas anclas hacen algo peor que no aplicar. `ca_fwd` pide una lista de diez fondos Serie A a una empresa que, según nuestro propio gate, no debe levantar una Serie A: **le cobra a la empresa por ser lo que declaramos que es.** `ca_exit` exige historia de M&A, que es el hecho que el gate ya usó para fijar el lente.

## Regla 1 · No se cobra dos veces el hecho del gate

**Ningún hecho que el Gate VC-backable usó para determinar el lente vuelve a puntuar en ninguna dimensión.**

Ya se violó dos veces en el mismo caso, con la ausencia de precedente de M&A puntuando en `ca_exit` de Dim 03 y en `me_comp` de Dim 04. Por eso va como regla y no como nota.

## Regla 2 · El fork cambia anclas y ponderación. No cambia las sub-variables

**Corregida el 2026-08-29 por decisión del líder del caso.** La primera versión decía que el fork no tocaba pesos, con el argumento de que cambiar anclas y pesos a la vez lo volvía inauditable. Ese argumento se cae una vez que las anclas ya se corrieron y su efecto está medido por separado: la ponderación entra como un segundo paso auditable, no como una variable revuelta con la primera.

**Adentro de Dim 03 los pesos de las cinco sub-variables no cambian.** Bajo lente de caja, Estructura 25 más Ruta de retorno 15 ya dan 40% sobre si la plata puede volver, que es el reparto correcto.

**Lo que sí cambia es la ponderación de las nueve dimensiones**, y la fija el gate.

### La ponderación de las nueve, por gate

**Founder e impacto pesan 60% bajo los dos lentes.** Es la tesis de selección de LUCHA y no depende de si la empresa es VC-backable. Lo que el gate cambia es cómo se reparte el 40% restante.

| Dim | VC-backable | NO VC-backable | Qué cambia y por qué |
|---|--:|--:|---|
| 01 Propósito | 12% | 12% | |
| 05 Impacto | 15% | 15% | Declarado KEY por LUCHA |
| 06 Equipo | 15% | 15% | Donde vive el Tribal Score |
| 07 Storytelling | 8% | 8% | Es founder, y es el más blando. Baja de 11,1% porque suele ser el mismo dato que ya pesa en Dim 06 |
| 08 Bienestar | 10% | 10% | |
| **Founder e impacto** | **60%** | **60%** | **La tesis de selección, constante** |
| 02 Negocio | 12% | **18%** | Sin exit, la caja que genera el negocio **es** el retorno |
| 03 Capital | 8% | **12%** | Sin exit, el derecho contractual a cobrar es lo único que hace cobrable esa caja |
| 04 Mercado | 15% | **5%** | Un exit grande necesita un mercado enorme. La caja no. Un caso de este tipo puede necesitar menos del 1% de la demanda mundial y funcionar |
| 09 Resiliencia | 5% | 5% | La obsolescencia por IA es la misma pregunta bajo los dos lentes |
| **Negocio** | **40%** | **40%** | |

### Los dos números

Un score único promedia dos preguntas distintas y las esconde. **Se publican los dos, además del total.**

- **Selección.** El bloque de founder e impacto. Responde si es la empresa y la persona en que LUCHA invierte.
- **Retorno.** El bloque de negocio. Responde si la plata vuelve y cómo.

La brecha entre los dos es información, no ruido. Un caso con selección alta y retorno bajo es una decisión de convicción con un mecanismo de cobro que hay que construir en la negociación, y eso hay que decirlo en esos términos y no esconderlo en un promedio.

## Regla 3 · Se declara en Metodología

El gate, el fork y toda conversión de unidades que el fork exija se declaran en el bloque de Metodología del EL. Un lector que no ve el lente primero interpreta mal cada score de abajo.

---

# Dim 03 · Capital y Estructura

Los cinco modos de falla que la dimensión detecta bajo lente de caja.

| Sub | Peso | Qué mide | Modo de falla |
|---|--:|---|---|
| `ca_str` Estructura de la ronda | 25% | Si el derecho a la caja existe y está contratado | Tener razón y no poder cobrarla |
| `ca_val` Valuation | 25% | En cuántos años vuelve la plata a este precio efectivo | Pagar un precio que el flujo no repaga |
| `ca_cap` Cap table | 20% | Si esta propiedad puede producir una decisión de distribuir | Que nadie quiera repartir |
| `ca_fwd` Plan forward | 15% | El camino al cruce de caja y quién financia el valle | Morirse antes de llegar a la caja |
| `ca_exit` Ruta de retorno | 15% | Si hay caja proyectada para honrar el mecanismo, y quién decide | Derecho sobre una empresa que no genera |

**El corte entre `ca_str` y `ca_exit` es deliberado.** Estructura mide si el derecho existe. Ruta de retorno mide si hay caja para que ese derecho valga algo. Un derecho sin caja no sirve y una caja sin derecho no se alcanza. Son dos modos de falla, no uno, y la primera versión de este fork los medía dos veces con 40% del peso entre ambos.

## 1 · Estructura de la ronda · 25%

**Qué se puntúa, y qué no.** Los términos de retorno son **propuesta de LUCHA** y se redactan después del EL, no los trae la empresa. Por eso esta sub-variable **no puntúa si están firmados**, que a esta altura del proceso es imposible por diseño. Puntúa si la estructura que necesitamos para cobrar **es proponible y no choca con nada**.

Corolario. **La ausencia del SAFE o del pacto en el data room no es un hueco del expediente.** No existen todavía y no deben existir. Lo que sí es un hueco es que el EL no lleve escrita la propuesta.

| Score | Cómo se ve |
|---|---|
| 80-100 | Instrumento y uso de fondos estándar, precio negociable. **Y la estructura de retorno no tiene obstáculo:** la jurisdicción la permite o se puede contratar, el cap table la admite, la founder está alineada, y los demás inversionistas de la ronda no la bloquean |
| 50-79 | Instrumento aceptable. **La estructura es proponible pero con un obstáculo identificado y sin resolver**, por ejemplo otros inversionistas cuya posición sobre el pacto no conocemos, o una recapitalización pendiente de formalizar |
| 20-49 | **La estructura que necesitamos choca con algo:** estatutos, un pacto existente, terms de otro inversionista, o un cap table que no admite forzar una distribución. O el instrumento es raro y no negociable |
| 0-19 | Ronda mal estructurada. Founders no responden preguntas básicas |

**Nota de jurisdicción.** En una SpA chilena no hay derecho legal de suscripción preferente, así que la protección antidilución tiene que ser expresa. Lo mismo aplica a cualquier vehículo donde el derecho no venga por ley.

**Un lock de inversión no es banda alta por sí solo.** Que Lucha no invierta sin estos derechos protege el peor escenario. Lo que mueve el score es que no haya obstáculo, y el obstáculo típico es la posición de los demás inversionistas de la ronda, no la del founder.

**Entregable obligatorio de esta sub-variable.** El EL lleva la propuesta de términos escrita y explicada, con qué se pide, por qué, y qué pasa si no se consigue. Un score alto sin esa sección escrita no es defendible.

## 2 · Valuation · 25%

Se puntúa el **período de recupero en el escenario conservador**, no en el base. Si se mide en el base, un plan heroico puntúa como buen precio.

| Score | Cómo se ve |
|---|---|
| 80-100 | Recupero **en o antes del año 6**, con margen en el conservador |
| 50-79 | Recupero entre **año 7 y año 10** |
| 20-49 | Recupero **más allá del año 10**, o solo alcanzable en el optimista |
| 0-19 | Sin recupero identificable sin un evento de liquidez que el caso no tiene |

**El precio que se puntúa es el precio efectivo de entrada del vehículo que tiene la posición**, mezclado si aplica una CADE, y no el cap nominal de la ronda.

**Trazabilidad de los cortes.** El año 6 sale del memo del Fondo, Anexo B, que es el año desde el que distribuye su caso base. **Los cortes de año 10 y de escenario optimista son propuesta y no tienen fuente.**

**Dependencia.** Esta sub-variable no se puede puntuar hasta que el motor produzca el período de recupero. Hoy no lo produce ningún skill.

**Desde la versión 2026-10-26.** `ca_val` puntúa la segunda corrida, con el mecanismo de reparto preferente que se propone en Términos, en el escenario conservador y con las cuentas por cobrar corregidas. Si el precio supera el techo de la regla de entrada, va un llamado rojo dentro de Capital y en la valorización, porque con reparto preferente el precio deja de pesar en esta sub-variable.

## 3 · Cap table · 20%

Mide propiedad, no derechos contratados. Los derechos son de `ca_str`.

| Score | Cómo se ve |
|---|---|
| 80-100 | Founders con control y alineados a un negocio que distribuye. **Ningún bloque capaz de vetar una distribución.** Sin dead equity |
| 50-79 | Founders con control, pero **existe un bloque relevante cuyo apetito por distribuir no está declarado**, o concentración tal que una sola persona decide sola. ESOP ajustado o ausente, que acá pesa menos |
| 20-49 | Dead equity material, o un bloque que puede bloquear la distribución, o founders sin control con inversionistas que buscan exit y no caja |
| 0-19 | Cap table incompatible con distribuir |

**La concentración corta en dos direcciones y bajo este lente no es un bien libre.** Un founder que sube de 61% a 82% elimina el riesgo de que alguien bloquee una distribución y sube el de que nadie la pueda forzar. Bajo lente venture eso es una mejora limpia. Bajo lente de caja es ambiguo, y el techo lo levanta `ca_str`, no esta sub-variable.

## 4 · Plan forward · 15%

| Score | Cómo se ve |
|---|---|
| 80-100 | Hitos cuantitativos hasta el cruce de caja, con fecha. **La empresa sabe cuál es la variable que decide su caso** y la mide. Financiamiento del valle identificado, con contrapartes nombradas, sea deuda, grants, estratégico o ronda puente |
| 50-79 | Cruce de caja proyectado y defendible, **pero el financiamiento del valle está en idea general** |
| 20-49 | Sin cruce de caja proyectado, o sin plan para el valle |
| 0-19 | No hay plan |

## 5 · Ruta de retorno · 15%

Renombrada. Bajo este lente la pregunta no es a quién le vendemos sino cómo vuelve la plata.

| Score | Cómo se ve |
|---|---|
| 80-100 | Mecanismo escrito y ejercible, con contraparte que tiene caja proyectada para honrarlo |
| 50-79 | Mecanismo identificado y **aritméticamente sostenible con el flujo proyectado**, pero no contratado |
| 20-49 | El retorno depende de una decisión discrecional de terceros que no tenemos cómo forzar |
| 0-19 | Sin vía de retorno identificable |

**Por la Regla 1, la ausencia de precedente de M&A no puntúa acá.**

**Desde la versión 2026-10-26.** Un derecho o un veto que ya puntúa en `ca_str` no vuelve a puntuar acá. Acá se mide solo si hay caja proyectada para honrar el mecanismo y quién decide pagar.

---

# Dim 04 · Mercado y Ventana

Solo se forkea `me_tam`, y no las bandas sino la lectura.

**Cuando la unidad de venta es un commodity físico, las anclas de tamaño se leen convirtiendo el volumen a dólares al precio del insumo, no al del producto terminado de terceros, y la conversión se declara con su precio y su fuente.**

Corrido así en Marea el 2026-08-29, el score no se movió. Eso no es un empate: quedó puesto por las razones correctas en vez de por dos hallazgos que pertenecían a Dim 02.

**Observación abierta, no resuelta.** Un caso de producción primaria tiene TAM en dólares chico por construcción aunque el volumen físico sea grande y la empresa quepa de sobra. Marea puntúa 45 en tamaño y a la vez necesita el 0,5% de la demanda mundial. La rúbrica no está rota pero castiga a una clase de caso por su unidad de medida. Va a `Funnel/00_Proceso/reingenieria-EL/`.

**Resuelta en la versión 2026-10-26.** En un caso no VC-backable, el tamaño del mercado al que llega la empresa (SAM) se puntúa por qué parte de ese mercado necesita para vender toda su producción, y no por su tamaño en dólares. El mercado mundial se lee con la mejor cifra con fuente y cuenta si la empresa ya tiene cómo llegar a él (por ejemplo, certificación para exportar). Autorizado por el Managing Partner el 2026-10-26, a partir del caso Cardo Foods.

---

# Dim 02 · Negocio y Salud Financiera

**Bajo gate NO VC-backable, Dim 02 deja de ser una dimensión más y pasa a ser la tesis**, porque el retorno viene de la caja que genera el negocio. Por eso su peso sube de 12% a 18%, el mayor de las nueve.

Se forkean dos de las seis sub-variables, las que suman 45% del peso interno y están escritas con anclas de SaaS. Las otras cuatro (Defensibilidad 15, Validación técnica 15, Salud operativa 15, Assessment de lente Negocio 10) son agnósticas al lente y no se tocan, salvo en activo biológico inmaduro, que ajusta Defensibilidad y Salud operativa (sección 3, desde la versión 2026-10-25).

**Regla que cruza las dos.** La unidad de medida es **la que la empresa vende**. Para un productor de biomasa es la tonelada, no el cliente. MRR, ARR, NPS, retention de logo, CAC payback y LTV sobre CAC no existen cuando hay pocos compradores y ciclos largos, y forzarlos produce un score sobre nada.

## 1 · Producto y tracción · 25%

Deja de preguntar por ingreso recurrente y pregunta si **hay demanda real pagando y si la relación con el comprador es durable**.

| Score | Cómo se ve |
|---|---|
| 80-100 | Ingreso repetido con clientes que vuelven. **Contratos vigentes que cubren la mayor parte del ingreso proyectado del año**, y ningún comprador que pese más de un tercio |
| 50-79 | Ingreso real y verificable, pero con **concentración material** o cobertura contractual parcial. Los clientes repiten y el contrato no está renovado |
| 20-49 | Ingreso presente pero **casi todo en un comprador**, o casi todo en pipeline sin contrato. Sin evidencia de recompra |
| 0-19 | Sin ingreso verificable, o solo pilotos no pagados |

**Qué se verifica, y no se acepta de palabra.** Cuántos contratos hay, cuáles están vigentes hoy y no solo firmados alguna vez, qué fracción del ingreso del año cubren, y cuánto pesa el comprador más grande. Un contrato firmado y expirado no es tracción vigente, y decirlo en presente es el error que ya cometimos.

## 2 · Modelo y unit economics · 20%

Deja de preguntar por CAC y LTV y pregunta si **cada unidad vendida gana plata y si la curva de costos va a donde el plan dice**.

| Score | Cómo se ve |
|---|---|
| 80-100 | Margen de contribución positivo y **medido** por unidad vendida, con costos que ya bajaron de forma observable. La curva de costos del plan está respaldada por lo que ya ocurrió |
| 50-79 | Margen positivo proyectado y defendible, pero **la baja de costos que el plan necesita todavía no ocurrió**. Se distingue explícitamente qué parte de la baja es eficiencia y qué parte es escala |
| 20-49 | Margen negativo hoy con un plan de mejora genérico, o una curva de costos que **no separa eficiencia de escala** |
| 0-19 | No hay unit economics calculables |

**Por qué la distinción entre eficiencia y escala.** Una baja de costo que viene de diluir sueldos sobre más volumen no es una mejora de la operación: es una apuesta a alcanzar ese volumen. Puntuarla como eficiencia infla el score y esconde el riesgo real.

## 3 · Activo biológico inmaduro (desde la versión 2026-10-25)

Aplica cuando el Gate B es activo biológico y el cultivo todavía no llega a plena producción. Nace del caso Cardo Foods, aprobado por el Managing Partner el 2026-10-25.

**Modelo y unit economics.** La baja de costo se separa en tres causas. Maduración, árboles que pasan a producir sobre un costo de campo casi fijo. Eficiencia, la operación hace lo mismo con menos. Escala, el costo fijo se diluye en más volumen. Un costo por kilo alto porque se mantienen árboles que no producen todavía no se lee como plan genérico. Entra al tramo 50-79 si la curva de producción por edad se compara con referencias de la zona a la misma edad y se separa de la eficiencia y de la escala. Que la curva se cumpla sigue siendo una apuesta, y se mide en Validación técnica.

**Salud operativa.** No se puntúa con bandas de meses de caja. En una plantación joven la caja corta es parte del ciclo, y que la ronda cubra ese valle ya lo mide Capital. Se puntúa con el servicio de la deuda (pagos al día, deuda vencida, cumplimiento con acreedores) y con el orden de la caja.

**Defensibilidad.** Cuenta el tiempo que le tomaría a un tercero replicar la plantación, con su área, la edad de los árboles y la certificación. Es una barrera real en agro. Lo que sigue sin puntuar, por la Regla 1, es el plazo de la propia empresa hasta plena producción, que es el hecho que usó el gate.

## Dónde caen los hallazgos que Dim 04 manda para acá

El fork de Dim 04 mueve tres cosas a esta dimensión. **Corregido el 2026-08-30:** la versión anterior decía que las tres iban a Validación técnica, y eso se contradecía con la razón escrita en la primera fila, que dice que mide función comercial. **La primera va a Producto y tracción; las otras dos a Validación técnica, que no se forkea pero sí recibe.** Lo levantaron las dos corridas independientes de Dim 02, por separado.

| Hallazgo | Por qué es de acá |
|---|---|
| La captura de un porcentaje alto del SAM propio | Mide función comercial, no tamaño de mercado. **Va a `ng_prod` Producto y tracción** |
| Un cuello de botella físico entre lo que el plan exige y la capacidad instalada verificada | Es validación técnica. **Va a `ng_tech`** |
| El plan medido contra la producción real del país o del sector | Es alcanzabilidad, no mercado. **Va a `ng_tech`**, con sus dos denominadores: contra el país pesa en contra, contra la exportación pesa a favor |

## Estado

~~**Escrito el 2026-08-30. Ninguna dimensión se ha re-puntuado con estas anclas todavía.**~~ **Corrido en Marea el 2026-08-30: Dim 02 pasa de 62,10 amarillo a 54,45 rojo.** La predicción de abajo se cumplió y por las dos razones que anticipaba. La predicción era que en Marea la dirección probable fuera hacia abajo, por el ingreso concentrado en un servicio que el propio modelo lleva a cero y una curva de costos cuya baja aún no ocurrió. **Se cumplió: la dimensión bajó 4,90 puntos**, de 62,10 a 57,20, tras dos decisiones del líder del caso que la devolvieron a amarillo desde el 54,45 de la primera corrida.

---

## Qué falta para que esto deje de ser propuesta

| Qué | Dueño |
|---|---|
| Ratificar el fork, o rechazarlo | Comité |
| Los cortes de año 10 y de escenario optimista de `ca_val`, que hoy no tienen fuente | Comité |
| El período de recupero como salida del motor | nosotros |
| ~~El fork de Dim 02~~ **Escrito y corrido en Marea el 2026-08-30 (F-209, F-220). Cerrado** | nosotros |
| La ponderación de las nueve dimensiones | Comité |
