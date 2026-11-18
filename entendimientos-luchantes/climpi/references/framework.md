# Framework climpi

Auditoría de aleatoriedad aplicada al razonamiento de LUCHA. Derivado de *Fooled by Randomness* (Nassim Nicholas Taleb, 2da ed.) por reverse engineering, con las quotes verificadas contra el texto del libro. Esta es la fuente de verdad del skill `climpi`: se lee completo antes de auditar, no se evalúa de memoria.

**Objeto de la auditoría: nosotros.** No el founder, no el modelo financiero, no el mercado. El sujeto evaluado es el razonamiento que construyó el EL. La pregunta que responde el framework es una sola: nuestra convicción sobre este caso está apoyada en evidencia, o en azar disfrazado de habilidad.

---

## 0. Las dos reglas que gobiernan todo el framework

### Regla 1: la exención de Taleb a los emprendedores

Taleb ataca la celebración del éxito emprendedor, pero exime explícitamente al emprendedor del ataque central del libro. Esto no es opcional ni matizable: un framework construido sobre este libro que se use para descalificar founders está mal usado.

> "I am excluding entrepreneurs from this discussion for the obvious reason: These are people who stuck their necks out for some idea, and risked belonging to the vast cemetery of those who did not make it. But CEOs are not entrepreneurs. As a matter a fact, they are often empty suits." (Postscript, First Thought)

> "However, and in general (provided we exclude risk-bearing entrepreneurs), the higher up the corporate ladder, the lower the evidence of such contribution." (Postscript)

Consecuencia operativa: `climpi` nunca produce la conclusión "este founder tuvo suerte, no invertir". Produce "esta afirmación nuestra no está sostenida por la evidencia que citamos". La bandera siempre apunta a un hueco en **nuestro** razonamiento, con una acción concreta.

### Regla 2: toda bandera se cierra de una de dos maneras

Taleb da la salida explícita, y es la que hace este framework accionable en vez de nihilista:

> "There is nothing wrong with a risk taker taking a hit provided one declares that one is a risk taker rather than that the risk being taken is small or nonexistent." (Ch 3, Denigration of History)

Entonces cada hallazgo se cierra así:

1. **Con evidencia.** Se consigue el dato que faltaba (denominador, cohorte, falsador, banda, comparable verificado).
2. **Con la afirmación reescrita como apuesta declarada.** La afirmación deja de presentarse como hecho establecido y pasa a decir lo que es: una apuesta, con su condición de quiebre nombrada.

Lo que **no** cierra una bandera: bajar el score, agregar una advertencia genérica, o matar el caso por incomodidad probabilística. El pecado que caza `climpi` no es tomar riesgo, es **llamar bajo riesgo a un riesgo que no medimos**.

> "One is thus capable of unwittingly playing Russian roulette—and calling it by some alternative “low risk” name." (Ch 2)

---

## Bloque A · Cómo juzgamos la evidencia

### A1. Historias alternativas (juzgar por el resultado vs juzgar por la distribución)

**Qué dice Taleb.** Un desempeño no se juzga por el resultado sino contra el costo de las historias que no ocurrieron. El que gana 10 millones en ruleta rusa es admirado porque solo se observa una de seis historias; las otras cinco son invisibles pero adivinables. La realidad es peor que la ruleta en tres puntos: el tambor tiene cientos de recámaras (la bala llega tan rara vez que olvidas que existe), el generador no se ve (juegas ruleta rusa creyendo que es estrategia de bajo riesgo), y advertir sobre lo que no pasó no te da crédito, te da culpa. La operación es cualitativa, no numérica: se evalúan los atributos de las historias alternativas, no se computan.

> "I start with the platitude that one cannot judge a performance in any given field (war, politics, medicine, investments) by the results, but by the costs of the alternative (i.e., if history played out in a different way)." (Ch 2)

> "one need not actually compute the alternative histories so much as assess their attributes." (Ch 2)

**Cómo se ve en un EL.** Todo lo que sostiene la tesis es algo que pasó. La tracción, el hito conseguido, el cliente firmado, el round anterior, la venta cerrada. Ninguna afirmación del documento se refiere a lo que pudo pasar y no pasó. Señal fuerte: un logro del founder citado como prueba de capacidad sin ninguna mención de qué tan repetible era, o de cuántas versiones de ese mismo intento habrían fallado.

**Pregunta de auditoría.** Para cada hito que citamos como evidencia de habilidad: describe un mundo plausible, con el mismo founder y las mismas acciones, donde ese hito no ocurre. Si no se puede describir, el hito no es evidencia de habilidad, es evidencia de que ocurrió.

**Severidad por defecto.** Amarilla. Roja si el hito en cuestión es el pilar de una dimensión con score verde.

---

### A2. Generador nulo (el inversionista placebo)

**Qué dice Taleb.** Monte Carlo no es un método de cálculo, es un modo de pensar. Su truco epistémico es la inversión: en vez de examinar gente real y buscarle atributos, se fabrican agentes con atributos conocidos y se mira qué track records generan. Con "placebo investors", agentes diseñados para tener expectativa negativa, se demuestra que una cohorte de perdedores esperados igual produce records brillantes de cinco años.

> "we can man-make pure nobodies to laugh at; they will be by design stripped of any shadow of ability (exactly like a placebo drug)." (Ch 9)

> "It can be electrifying to generate virtual histories and watch the dispersion between the various results. Such dispersion is indicative of the degree of resistance to randomness." (Ch 3)

**Cómo se ve en un EL.** Nadie generó el nulo. El documento no contiene en ninguna parte la pregunta de qué habría producido un proceso sin habilidad en este mismo mercado y este mismo momento. Se listan señales (crecimiento MoM, waitlist, cartas de intención, interés de ángeles) sin preguntar cuántas de esas señales produce un founder promedio en un mercado caliente.

**Pregunta de auditoría.** Si corriéramos 100 founders sin ninguna habilidad diferencial por este mercado en estos 12 meses, cuántos me mostrarían exactamente estas métricas. Si la respuesta es "bastantes", la métrica no discrimina y no puede sostener el score.

**Severidad por defecto.** Amarilla. Es el check más productivo del framework: casi siempre produce el hallazgo más útil del documento.

---

### A3. Bandas de confianza y ceguera a la opcionalidad

**Qué dice Taleb.** El pronóstico importa mucho menos que el error alrededor del pronóstico. 60°F más o menos 10 y 60°F más o menos 500 exigen empacar distinto. La gente sobrevalora su conocimiento: rangos pedidos al 98% se violan hasta 30% de las veces. Y la ceguera a opciones consiste en confundir el valor esperado con el escenario modal, sobreponderando mentalmente el estado más probable.

> "It is not the estimate or the forecast that matters so much as the degree of confidence with the opinion." (Ch 11)

> "They confuse the expected value and the most likely scenario" (Ch 11)

**Cómo se ve en un EL.** Estimados puntuales sin banda: la proyección de revenue, el timeline al breakeven, el tamaño del round siguiente, el año del exit. O bandas implausiblemente angostas para pre-seed. Tell clásico: el escenario base del modelo tratado como valor esperado del caso, cuando el valor esperado en venture está dominado por la cola.

**Pregunta de auditoría.** Cada número forward del documento: cuál es la banda, y de dónde sale. Y: el escenario base lo estamos usando como el más probable, o como el esperado. No son lo mismo y la diferencia decide el sizing.

**Severidad por defecto.** Amarilla. Nota si el modelo ya trae escenarios con toggles y solo falta explicitar la banda en el texto.

---

## Bloque B · De dónde viene la muestra

### B1. Contar los monos (el denominador)

**Qué dice Taleb.** El contenido informativo de un track record depende de exactamente dos cosas: el contenido de aleatoriedad de la actividad y el tamaño de la cohorte inicial. Con cinco monos, el que escribió la Ilíada impresiona; con mil millones, te sorprendería que ninguno lo hiciera. La regla es cuantitativa y da veredictos opuestos con el mismo record.

> "If the initial population includes ten managers, then I would give the performer half my savings without a blink. If the initial population is composed of 10,000 managers, I would ignore the results." (Ch 9)

> "I have rarely seen anyone count the monkeys." (Part II preamble)

**Cómo se ve en un EL.** Nadie pregunta "sobre cuántos". Aparece de dos formas. Una: una racha del founder (tres pivots, dos exits chicos, N años en la industria) leída como habilidad sin referencia a cuántos intentaron lo mismo. Dos, más peligrosa porque es nuestra: el caso llegó al EL después de un embudo cuyo denominador no está en el documento, así que la selectividad del funnel se siente como calidad del caso.

**Pregunta de auditoría.** Cuántas empresas comparables vimos y descartamos este año, y cuántas de las descartadas mostraban esta misma señal. Y en el track record del founder: sobre cuántos intentos.

**Severidad por defecto.** Nota si es sobre el funnel. Amarilla si el track record del founder sostiene el score de Dim 01.

---

### B2. Sesgo de supervivencia y evidencia silenciosa

**Qué dice Taleb.** Solo vemos ganadores porque los perdedores desaparecen, así que los odds observados están sistemáticamente mal. *The Millionaire Next Door* comete doble sesgo: la muestra de ricos son los monos afortunados (faltan los que acumularon los activos equivocados), y toda la muestra viene de un solo episodio de bull market irrepetible. Su golpe más directo al oficio de evaluar founders es lógico, no estadístico:

> "That all millionaires were persistent, hardworking people does not make persistent hard workers become millionaires: Plenty of unsuccessful entrepreneurs were persistent, hardworking people." (Prologue)

> "In a nutshell, the survivorship bias implies that the highest performing realization will be the most visible. Why? Because the losers do not show up." (Ch 8)

Y sobre el heurístico de selección más usado en venture:

> "Optimism, it is said, is predictive of success. Predictive? It can also be predictive of failure. Optimistic people certainly take more risks as they are overconfident about the odds; those who win show up among the rich and famous, others fail and disappear from the analyses. Sadly." (Ch 8)

**Cómo se ve en un EL.** La clase de referencia usada es un set de sobrevivientes. Concretamente: comparables de exit (que son los que salieron), benchmarks de valuación construidos sobre rondas que se cerraron, "las empresas que hicieron esto lograron aquello", y el patrón interno "nuestras mejores del portafolio comparten X". Nadie en el documento puede nombrar el denominador ni las empresas que corrieron el mismo playbook y murieron. También la forma inversa que Taleb llama Reverse Survivors: el operador bueno que dos años malos sacaron de la muestra, y cuya ausencia hace ver mejor a los que quedaron.

**Pregunta de auditoría.** Cada comparable y cada benchmark del documento: la muestra incluye a los que fracasaron. Si no, qué le hacemos al número para reinyectarlos. Y en cualquier lista de rasgos del founder presentada como predictiva: cuántos founders fracasados tenían el mismo rasgo.

**Severidad por defecto.** Amarilla. Roja si un comparable de exit sin denominador es lo que sostiene la ruta al exit de Dim 03.

---

### B3. Selección adversa del inbound

**Qué dice Taleb.** El estándar que se le aplica a algo que llega debe ser estrictamente más alto que el que se aplica a algo que se buscó, porque la llegada misma es un evento de selección. Lo cuantifica: buscando en una cohorte de 10,000, su probabilidad de topar con un sobreviviente espurio es ~2%; quedándose en casa contestando el timbre, es cercana a 100%.

> "Judging an investment that comes to you requires more stringent standards than judging an investment you seek, owing to such selection bias." (Ch 9)

**Cómo se ve en un EL.** El documento no distingue si el caso fue originado activamente por LUCHA (tesis primero, búsqueda después) o si llegó por referral, warm intro, demo day o inbound. Se le aplica el mismo estándar de prueba a los dos. Corolario del cuartel de bomberos (ver E2): si además el referral vino de alguien del círculo cercano, el sesgo se duplica.

**Pregunta de auditoría.** Este caso lo buscamos o nos llegó. Si nos llegó, cuál es el estándar extra que le aplicamos y dónde está escrito en el documento. Y: por qué llegó a nosotros y no a otro fondo.

**Severidad por defecto.** Nota si está documentado el origen. Amarilla si el EL no dice cómo llegó el caso.

---

### B4. Corte transversal vs serie de tiempo, y cambio de régimen

**Qué dice Taleb.** Las desviaciones grandes son desproporcionadamente suerte y revierten. El problema del corte transversal es explícito: en cualquier momento dado, los más exitosos son los mejor ajustados al último ciclo, no los mejores operadores. Y bajo cambio de régimen, todos los atributos del sistema cambian hasta volverse irreconocibles, así que el sobreviviente no es necesariamente el más apto: la aptitud es aptitud a una y solo una serie de tiempo, no al promedio de los ambientes posibles. Su regla de selección, derivada de simular poblaciones de traders, va contra la intuición de Wall Street: seleccionar por **años acumulados de exposición** condicionado a no haber estallado, no por éxito absoluto.

> "At a given time in the market, the most successful traders are likely to be those that are best fit to the latest cycle." (Ch 5)

> "For evolution means fitness to one and only one time series, not the average of all the possible environments." (Ch 5)

**Cómo se ve en un EL.** Un snapshot tratado como ranking de habilidad. Formas concretas: el founder es fuerte porque su métrica de hoy está arriba de sus pares de hoy; la empresa es buena porque está creciendo en la ola actual; el comparable elegido es el que está en el top del league table este trimestre. Falta la lectura de trayectoria a través de regímenes: cómo le fue a este founder o a este modelo cuando el terreno cambió.

**Pregunta de auditoría.** Estamos comparando contra pares en un momento, o contra la propia trayectoria del founder a través de al menos un cambio de régimen. Y: el ambiente que produjo la aptitud observada, sigue existiendo. Este check cruza con Dim 09 (Resiliencia Tecnológica) pero no la duplica: Dim 09 evalúa a la empresa ante la ola de IA, B4 evalúa si **nuestra lectura** confundió ajuste al ciclo con calidad.

**Severidad por defecto.** Amarilla.

---

## Bloque C · Cómo construimos la tesis

### C1. El falsador ausente (Popper y el cisne negro)

**Qué dice Taleb.** Ninguna cantidad de cisnes blancos permite inferir que todos los cisnes son blancos; un cisne negro refuta. La data puede rechazar, nunca confirmar. Una afirmación sin condiciones de refutación especificadas es charlatanería, y Taleb lo extiende directo al que toma decisiones. Su resolución es asimétrica: usar inducción y estadística para **hacer apuestas**, nunca para **manejar riesgo o dimensionar exposición**.

> "No amount of observations of white swans can allow the inference that all swans are white, but the observation of a single black swan is sufficient to refute that conclusion." (Ch 7)

> "to me a trader who does not have a point that would make him change his mind is not a trader" (Ch 7)

> "I will use statistics and inductive methods to make aggressive bets, but I will not use them to manage my risks and exposure." (Ch 7)

**Cómo se ve en un EL.** No hay falsador escrito. El documento acumula evidencia confirmatoria (quotes que apoyan, métricas que suben, validación externa positiva) y no dice en ninguna parte qué observación futura nos haría concluir que nos equivocamos. Segunda forma, más sutil y más grave: la **misma** base de evidencia se usa para justificar la apuesta y para acotar el downside. Ese es exactamente el error que Taleb le atribuye a Carlos y a John.

**Pregunta de auditoría.** Qué observación concreta, en qué plazo, nos haría salir o dejar de hacer follow-on. Si la respuesta es vaga, no existe. Y: la evidencia con la que dimensionamos el riesgo es la misma con la que justificamos entrar.

**Severidad por defecto.** Roja. Un EL sin falsador explícito no debería ir a comité: es el hallazgo más barato de arreglar y el más caro de omitir.

---

### C2. Data mining y patrones del portafolio

**Qué dice Taleb.** Si se busca *cualquier* relación en una base en vez de testear una pre-especificada, aparece una espuria con certeza. Está convencido de que existe un instrumento en Occidente 100% correlacionado con la temperatura en Ulán Bator. Peor: las reglas que la comunidad usa hoy son ellas mismas sobrevivientes de un universo enorme de reglas probadas, así que hasta los heurísticos aceptados pueden ser puro azar.

> "The more I try, the more I am likely, by mere luck, to find a rule that worked on past data. A random series will always present some detectable pattern." (Ch 9)

> "By dint of throwing their monkeys on typewriters, without specifying what book they want their monkey to write, they will hit upon hypothetical gold somewhere." (Ch 9)

**Cómo se ve en un EL.** Un patrón presentado sin registro de cuántos patrones se buscaron. Forma nativa de LUCHA: heurísticos derivados del propio portafolio ("las que funcionaron tenían founder técnico", "los casos que salieron bien venían con tracción antes del round"), construidos sobre un set que ya es de sobrevivientes. Ese es el doble error: B2 apilado sobre C2. También aplica a nuestros propios criterios de scoring cuando se ajustaron después de ver resultados.

**Pregunta de auditoría.** Este patrón lo especificamos antes de mirar la data, o lo encontramos mirándola. Si lo encontramos, la misma data no puede confirmarlo. Y: el criterio que estamos aplicando salió de cuántas empresas, y cuántas de ellas siguen vivas.

**Severidad por defecto.** Amarilla. Roja si un heurístico backfiteado sostiene un veredicto verde.

---

### C3. Atribución y falacia narrativa

**Qué dice Taleb.** La atribución sesgada es el motor: los éxitos se atribuyen a habilidad y los fracasos a azar, que es exactamente cómo los de LTCM llegaron a "diez sigmas". La memoria empuja en esa dirección porque las historias causales comprimen mejor que las listas de particulares, así que la narrativa **reduce la cantidad de aleatoriedad que detectamos**. Las palomas de Skinner, alimentadas al azar, inventaron danzas de lluvia; Taleb se descubrió usando la misma corbata manchada después de un día bueno.

> "We tend to think that traders were successful because they are good. Perhaps we have turned the causality on its head; we consider them good just because they make money." (Ch 5)

> "We favor the visible, the embedded, the personal, the narrated, and the tangible; we scorn the abstract." (Postscript, Third Thought)

**Cómo se ve en un EL.** La calidad del relato del founder está funcionando como evidencia de la calidad del negocio. Tell concreto: las quotes más citadas del transcript son las más narrativamente satisfactorias, no las más informativas. Segunda forma, sobre nosotros: en los antecedentes del caso o en el log, los éxitos previos del founder tienen explicación de habilidad y los fracasos tienen explicación de entorno. Tercera: nuestra convicción sobre el caso subió después de un resultado favorable que la tesis no predecía.

**Pregunta de auditoría.** Cuál de nuestras quotes o argumentos sobreviviría si le quitamos la forma de historia y lo dejamos como lista de hechos. Y: los fracasos del founder los estamos explicando con la misma vara que sus éxitos.

**Severidad por defecto.** Amarilla. Cruza con Dim 07 (Storytelling): ojo con el doble conteo, ahí la calidad narrativa es la variable evaluada; acá el hallazgo es que la calidad narrativa se filtró a dimensiones donde no corresponde.

---

### C4. Retro-predicción y "esta vez es diferente"

**Qué dice Taleb.** Mirando atrás el pasado siempre es determinista, porque solo se observó una realización, y la mente interpreta cada evento por los eventos que le siguieron: es dar un examen sabiendo la respuesta. El daño de segundo orden es que la habilidad de retro-explicar se convierte en falsa confianza para pronosticar. Y los humanos no aprenden de la historia ajena: todos los traders que estallaron denigraban la historia y argumentaban que estos tiempos son distintos.

> "A mistake is not something to be determined after the fact, but in the light of the information until that point." (Ch 3)

> "those who are very good at predicting the past will think of themselves as good at predicting the future, and feel confident about their ability to do so." (Ch 3)

**Cómo se ve en un EL.** Explicaciones causales fluidas y confiadas sobre por qué a tal empresa del portafolio le fue bien o mal, usadas como base para el juicio sobre este caso. Y el tic verbal: "este mercado es distinto", "el momento ahora es otro", "eso pasó porque el ciclo estaba raro". También en la evaluación de decisiones pasadas del founder: llamarle error a lo que perdió y buena decisión a lo que ganó, sin referencia a lo que era sabible en ese momento.

**Pregunta de auditoría.** Al juzgar una decisión pasada, del founder o nuestra: qué información existía en ese momento. Y si el documento contiene "esta vez es diferente" en cualquiera de sus formas, cuál es la evidencia de que el régimen efectivamente cambió, en vez de que nos conviene que haya cambiado.

**Severidad por defecto.** Amarilla. Roja si se está usando una lectura retrospectiva del portafolio como evidencia principal.

---

## Bloque D · Cómo medimos riesgo

### D1. Probabilidad vs expectativa

**Qué dice Taleb.** La frecuencia de tener razón es irrelevante sola: hay que multiplicarla por la magnitud. Su tabla canónica: 999/1000 de ganar $1 y 1/1000 de perder $10,000 da expectativa de -$9. Se puede ser simultáneamente bullish (mayor probabilidad de subir) y estar short (mayor expectativa de bajar), porque los comentaristas se pagan por hit rate y los que toman riesgo se pagan en dólares. Y la mediana no es el mensaje: cuando los resultados son asimétricos, la supervivencia promedio no tiene nada que ver con la mediana.

> "it is not how likely an event is to happen that matters, it is how much is made when it happens that should be the consideration. How frequent the profit is irrelevant; it is the magnitude of the outcome that counts." (Ch 6)

> "Whenever there is asymmetry in outcomes, the average survival has nothing to do with the median survival." (Ch 6)

**Cómo se ve en un EL.** El razonamiento está en tasas de acierto sin magnitud adosada, o en lenguaje modal que sustituye a la expectativa: "lo más probable es que", "la mayoría de estos casos", "el escenario base". En venture el error es especialmente costoso porque la expectativa vive en la cola: un caso puede ser el correcto con probabilidad baja de éxito y expectativa altísima, y el documento no lo puede decir si solo razona en probabilidad. Tell inverso, también bandera: un caso defendido porque es el que **más probablemente** funcione, sin decir cuánto paga si funciona.

**Pregunta de auditoría.** Para cada afirmación de probabilidad en el documento: cuál es la magnitud pareada. Y: la tesis de este caso es de alta probabilidad y payoff moderado, o de baja probabilidad y payoff de cola. La estructura del deal es coherente con la respuesta.

**Severidad por defecto.** Amarilla. Cruza con `analisis-financiero-el` (estructura de retorno) sin duplicarlo: el motor calcula el payoff, `climpi` verifica que el razonamiento del documento lo esté usando.

---

### D2. Calma leída como seguridad (la falacia del evento raro)

**Qué dice Taleb.** Los eventos raros son por definición inesperados: si se esperaran, no se tomaría la posición que los causa y el evento no ocurriría. "Evento inesperado e imprevisto" es una confesión estructural, no una explicación. Generaliza el peso problem a cualquier riesgo mal entendido por derivarse de una interpretación estrecha de una serie pasada, y advierte sobre las aguas calmas: las monedas con mayor estabilidad histórica son las más propensas a colapsar. Estadísticamente, el conocimiento sobre la **ausencia** de bolas rojas se acumula mucho más lento que la raíz de n, mientras que un solo avistamiento transforma el conocimiento al instante.

> "Rare events are always unexpected, otherwise they would not occur." (Ch 6)

> "This asymmetry in knowledge is not trivial; it is central in this book" (Ch 6)

**Cómo se ve en un EL.** La ausencia de historia adversa citada como evidencia de seguridad. Formas concretas: "el churn ha sido estable", "nunca han tenido un problema regulatorio", "el canal ha funcionado consistentemente", "ninguna empresa del portafolio ha tenido este problema". Y cualquier estimado de riesgo cuya base entera es el rango observado del pasado, que a pre-seed son 12 a 24 meses de historia.

**Pregunta de auditoría.** Cada afirmación de estabilidad del documento: cuánta historia la respalda, y cuánto tiempo tendría que pasar sin el evento adverso para que la estabilidad fuera informativa. Y: qué evento, si ocurre una vez, cambia la tesis por completo.

**Severidad por defecto.** Amarilla. Roja si la estabilidad observada es lo que sostiene una dimensión verde con menos de 24 meses de historia.

---

### D3. Ruido vs información, y no linealidad

**Qué dice Taleb.** Para un inversionista genuinamente excelente (15% de retorno en exceso, 10% de volatilidad), la probabilidad de éxito es 93% al año, 67% al mes, 50.02% al segundo. La razón ruido a señal es ~0.7:1 en un año, ~2.32:1 en un mes, 30:1 en una hora. En incrementos cortos se observa la varianza, no los retornos. Y como las pérdidas duelen ~2.5 veces más que las ganancias equivalentes, monitorear a alta frecuencia produce un déficit emocional estricto. Aparte: los resultados son no lineales, el último grano tumba el montón de arena, así que métricas intermedias planas no son evidencia de fracaso en un dominio de payoff convexo.

> "Over a short time increment, one observes the variability of the portfolio, not the returns. In other words, one sees the variance, little else." (Ch 3)

> "chance events coupled with positive feedback rather than technological superiority will determine economic superiority—not some abstrusely defined edge in a given area of expertise." (Ch 10, citando a Brian Arthur)

**Cómo se ve en un EL.** La convicción se mueve con datos dentro de la banda de ruido. Concretamente: un mes flojo de ventas leído como problema de modelo, un mes bueno leído como validación, una explicación causal ofrecida para un movimiento demasiado chico como para merecerla. A pre-seed casi todo el detalle económico mensual es ruido: la lectura correcta es tendencia y cohortes, no puntos. Forma inversa: tracción leída como prueba de calidad de producto cuando puede ser efecto de red circular o de un canal caliente.

**Pregunta de auditoría.** Cada movimiento de KPI que el documento interpreta: está fuera de la banda de ruido de esta serie. Y: la tracción que citamos es evidencia de calidad, o puede ser retroalimentación positiva sobre una condición inicial afortunada.

**Severidad por defecto.** Nota si es una lectura menor. Amarilla si una bandera del EL se sostiene en ruido mensual.

---

### D4. Riesgo de ruina y la definición de blow up

**Qué dice Taleb.** Blow up no es perder dinero: es perder más de lo que uno esperaba, al punto de quedar fuera del negocio. Eso hace que el objeto de la auditoría sea el **tamaño de la sorpresa**, no el tamaño de la pérdida. John hizo ~$250M en siete años y perdió más de $600M en días. Niederhoffer tuvo dos décadas opacadas por un evento de minutos. Y hay un atributo vicioso: cuanto más tiempo pasa un operador sin encontrarse con el evento raro, más vulnerable es a él. La regla de Nero es un tope duro: nunca permitir una pérdida arriba de un número fijo, sin importar la probabilidad del evento.

> "There is nothing wrong with a risk taker taking a hit provided one declares that one is a risk taker rather than that the risk being taken is small or nonexistent." (Ch 3)

> "One vicious attribute is that the longer these animals can go without encountering the rare event, the more vulnerable they will be to it." (Ch 5)

**Cómo se ve en un EL.** Un track record presentado como evidencia de bajo riesgo en vez de como una trayectoria de muestra favorable. La duración de una racha limpia leída como seguridad en vez de como exposición acumulada. Y en el lado nuestro: no está escrito cuál es la máxima pérdida de este ticket sin importar su probabilidad, ni qué le pasa al fondo si este caso va a cero junto con otros dos de la misma vertical (correlación de cola dentro del portafolio, que es la versión LUCHA del "todo se movió a la vez" de John).

**Pregunta de auditoría.** Qué evento termina esta empresa, y qué evento termina esta tesis. Cuál es la pérdida máxima de este ticket sin importar probabilidad. Y: qué otras posiciones del portafolio mueren del mismo evento.

**Severidad por defecto.** Roja si no hay pérdida máxima declarada ni lectura de correlación con el resto del portafolio. Cruza con Kill Criteria #13 (dependencia crítica) sin duplicarlo: ahí el sujeto es la empresa, acá el fondo.

---

## Bloque E · Cómo nos comportamos como comité

### E1. Los seis rasgos de Carlos y John

Es la lista más directamente auditable del libro (Ch 5, "The Traits They Shared"). Taleb la escribió sobre traders que estallaron; aquí se aplica a nosotros como tenedores de una posición o de una tesis.

1. **Sobreestimación de la exactitud de las propias creencias.** Nunca considerar que el éxito pasado del framework pudo ser coincidencia, ni que el análisis fue ajustado a eventos pasados para enmascarar el elemento aleatorio.
2. **Casarse con la posición.** "Loyalty to ideas is not a good thing for traders, scientists—or anyone."
3. **Cambiar la historia.** Volverse inversionista "de largo plazo" recién después de perder.
4. **No tener plan de juego previo para el caso de pérdidas.** No es que el plan fuera malo: no existía, porque la posibilidad no estaba contemplada.
5. **Ausencia de pensamiento crítico y de stop.** Negarse a vender a "valor aún mejor", sin considerar nunca que lo equivocado podía ser el método de determinar valor.
6. **Negación.** El precio en pantalla pierde realidad frente a un "valor" abstracto.

Más el tell sistémico: Carlos consolando a la gerencia con que otros bancos perdieron más. Taleb: "Such statements, that other traders had also gotten into trouble, are self-incriminating."

> "A trader's mental construction should direct him to do precisely what other people do not do." (Ch 5)

**Cómo se ve en un EL.** Frases casi literales: "ahora está más barata todavía", "somos inversionistas de largo plazo", "no contemplamos ese escenario", "el precio no refleja el valor". En un EL de entrada, el rasgo más frecuente es el 4: no hay plan escrito para el caso de que las cosas salgan mal, solo un plan a 18 meses para el caso de que salgan bien.

**Pregunta de auditoría.** El Plan 18 meses tiene rama de pérdidas, o solo rama de éxito. Y: si este mismo caso llegara hoy sin nuestra historia previa con el founder, entraríamos al mismo precio.

**Severidad por defecto.** Amarilla por rasgo detectado. Roja si el rasgo 4 aplica al Plan.

---

### E2. Cuartel de bomberos, presión social y la regla de Wittgenstein

**Qué dice Taleb.** Carlos pasaba una hora cada mañana con economistas de mercado de todo el mundo, y todos le contaban la misma historia. Marty O'Connell lo llama el efecto cuartel de bomberos: bomberos con tiempo libre que hablan demasiado entre sí convergen en opiniones que un observador externo hallaría ridículas. El board que despidió a Carlos no entendía cómo el banco tenía esa exposición a un gobierno que no le pagaba a sus propios soldados. Taleb: *"This was one of the small points that emerging-market economists around the globe, from talking to each other so much, forgot to take into account."* (Ch 5). Y la respuesta a la probabilidad es social, no matemática: *"We do not respond to probability, but to society's assessment of it"* (Part II). La regla de Wittgenstein cierra el punto: si no confías en la fuente, el juicio te informa más sobre el que juzga que sobre lo juzgado.

**Cómo se ve en un EL.** La convicción viene de la densidad de acuerdo dentro de un circuito cerrado: el equipo Luchante, los mismos advisors, los mismos co-inversionistas. Formas concretas: validación externa construida con gente del propio círculo; el markup de otro fondo o la participación de un co-inversionista prestigioso citada como evidencia; consenso interno rápido presentado como robustez. Y el hecho externo obvio que nadie del circuito mencionó.

**Pregunta de auditoría.** Quién de los que opinan en este documento no habla regularmente con nosotros. Si la respuesta es nadie, la validación externa es interna. Y por cada endorsement citado: qué le pasa al juicio si le aplicamos la regla de Wittgenstein al que lo emitió, empezando por si tiene posición en el caso.

**Severidad por defecto.** Amarilla. Roja si toda la Validación externa proviene del círculo cercano o de partes con posición.

---

### E3. Epifenomenalismo del proceso

**Qué dice Taleb.** La mayoría de los resultados verdaderos en probabilidad son contraintuitivos, así que la posición correcta suena peor en una reunión que la incorrecta. Lo que suena inteligente en una conversación, una reunión o los medios es sospechoso. Y la supervisión institucional de riesgo tiende al epifenomenalismo, la ilusión de causa y efecto: da la impresión de reducir riesgo en vez de reducirlo, porque el supervisor no puede detener a un tomador de riesgo rentable sin que lo culpen ex post por el upside perdido, pero sí carga con el blowup.

> "By “watching” your risks, are you effectively reducing them or are you giving yourself the feeling that you are doing your duty?" (Ch 2)

> "What sounds intelligent in a conversation or a meeting, or, particularly, in the media, is suspicious." (Ch 2)

**Cómo se ve en un EL.** El documento cumple el formato y no detiene nada. Tells: cada dimensión tiene su bandera pero ninguna bandera tiene consecuencia; los Kill Criteria están citados sin veredicto; las banderas amarillas no tienen dueño, plazo ni condición de cierre; el argumento que más espacio ocupa es el que suena mejor, no el mejor evidenciado. Contra-tell honesto: si el proceso del EL nunca ha matado un caso, no está funcionando como proceso de riesgo.

**Pregunta de auditoría.** Qué afirmación de este documento, si resultara falsa, cambia la decisión. Si ninguna, el documento es narrativo, no evaluativo. Y: cada bandera amarilla tiene dueño, plazo y condición de cierre.

**Severidad por defecto.** Amarilla. Roja si ninguna bandera del EL tiene condición de cierre.

---

## Tabla de ruteo: dónde entra cada hallazgo

El EL renderizado no lleva jerga interna del proceso ni bloque de "Riesgos Críticos" (removido, no reintroducir). Entonces `climpi` no agrega una sección al artifact: entrega un documento interno y sus hallazgos se inyectan donde ya hay lugar.

| Hallazgo | Dónde se inyecta |
|---|---|
| Falsador ausente (C1) | Apuesta / El ask: la condición de quiebre declarada. Y Plan 18 meses: rama de pérdidas. |
| Pérdida máxima y correlación de portafolio (D4) | Términos / Calculadora y el memo de comité (frente de exit y protección de retorno). |
| Comparable o benchmark sin denominador (B2) | Dim 03 (callout de valuación, método de las dos verdades) y Dim 04 (comparables). |
| Generador nulo (A2), monos (B1) | Rúbrica de la dimensión afectada: baja la evidencia, no el score. El score lo cierra el comité. |
| Corte transversal y régimen (B4) | Síntesis de Dim 09 y callout "aprovecha la ola o se muere con la ola". |
| Ruido leído como señal (D3) | Detalle económico de Dim 02 (tendencia y cohortes en vez de puntos). |
| Narrativa filtrada a otras dimensiones (C3) | Dim 07 se queda con la calidad narrativa; se limpia de las demás. |
| Validación externa endogámica (E2) | Bloques `vex-block`: se marca el hueco en vez de inventar expertos. |
| Los seis rasgos (E1), epifenomenalismo (E3) | Memo interno de comité, campo "contra-argumento honesto". No van al artifact. |
| Selección adversa del inbound (B3) | Log de construcción del caso y memo interno. |

---

## Anti-patrones de `climpi` (qué hace mal esta auditoría cuando se hace mal)

1. **Nihilismo probabilístico.** Concluir que nada es sabible y por lo tanto no invertir. El framework no existe para no decidir, existe para que la decisión diga la verdad sobre en qué se apoya. Toda bandera cierra con evidencia o con apuesta declarada (Regla 2).
2. **Usar a Taleb contra el founder.** Prohibido por la Regla 1. El sujeto auditado es nuestro razonamiento.
3. **Hindsight al auditar.** Auditar una decisión pasada con información que no existía cuando se tomó es cometer C4 mientras se caza C4. Fechar siempre la información disponible.
4. **Doble conteo con los otros skills.** El motor financiero calcula (`analisis-financiero-el`); Dim 09 evalúa la resiliencia de la empresa; el Paso 6 de `entendimiento-luchante` verifica hechos, números y quotes. `climpi` no recalcula, no re-verifica y no re-evalúa a la empresa: audita el razonamiento que conecta esos insumos con la convicción.
5. **Banderas sin acción.** Una bandera sin dueño, plazo y condición de cierre es exactamente el epifenomenalismo que E3 caza. Aplica al output de este skill antes que a nadie.
6. **Contar sin cerrar.** 18 checks disparando todos a la vez no es una auditoría, es ruido. Máximo cinco hallazgos priorizados por cuánto mueven la decisión.
