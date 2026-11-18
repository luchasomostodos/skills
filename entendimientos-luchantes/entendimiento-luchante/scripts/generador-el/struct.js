/* ============================================================
   BLOQUES ESTRUCTURADOS · Polímera
   Cada subvariable en piezas. Mismos datos que el texto original,
   que queda disponible debajo de cada bloque para comparar.
   tesis · figs (con barra partida o barras) · keep (visuales del
   original) · puntos · tablas · calls · nota
   ============================================================ */
var STRUCT = {
 negocio: {
  0: {
   tesis: "El pipeline es real y la velocidad no alcanza. Hay plataforma funcionando y siete propuestas vivas, pero el ritmo de firma y la capacidad declarada quedan debajo de lo que el plan de 2027 le pide.",
   figs: [
    { k: "Embudo contra el plan a 24 meses", v: "15 de 40", n: "acuerdos de confidencialidad, 37,5% de la meta. Cero pruebas de concepto firmadas contra una meta de 20, y cero programas de desarrollo contra 10 a 12.", bars: [{ l: "Firmados", v: 15, t: "15", c: "y" }, { l: "Meta", v: 40, t: "40", c: "n" }] },
    { k: "Ritmo de originación", v: "0,60 al mes", n: "15 acuerdos en 25 meses. Llegar a diez desarrollos pagos pide 1,75 al mes con la conversión declarada, 2,9 veces el ritmo, y hasta 8,3 veces con la observada.", bars: [{ l: "Hoy", v: 0.6, t: "0,60", c: "y" }, { l: "Necesario", v: 1.75, t: "1,75", c: "n" }] },
    { k: "Capacidad", v: "125%", n: "de lo que la empresa dice que puede ejecutar. Declara hasta 8 desarrollos completos al año y espera 18 recién en 24 meses, y el plan arranca con 10.", bars: [{ l: "Capacidad hoy", v: 8, t: "8", c: "n" }, { l: "Plan 2027", v: 10, t: "10", c: "r" }] }
   ],
   tablas: [{ t: "La cartera comercial, contrato por contrato", head: ["Contraparte", "Módulo inicial", "Si cierra todo"], rows: [
    ["BioControl NL México", "USD 7.500", "hasta USD 27.500"], ["BioControl NL Argentina", "USD 15.000", "USD 30.000 a 32.500"], ["Ideagro Lab", "USD 15.000", "hasta USD 32.500"],
    ["Fresal Biotech", "USD 17.500", "USD 35.000 a 40.000"], ["Alma Bio", "USD 17.500", "USD 35.000 a 40.000"], ["Cumbre Bio", "USD 6.250 en México más USD 10.000 en Argentina", "hasta USD 68.750 con los tres módulos"],
    ["Total", "USD 78.750 a 82.500", "USD 241.250 declarado, USD 203.750 real"]], total: true }],
   puntos: { t: "Los tres sustitutos del cliente", intro: "El comprador es el responsable de I+D de un fabricante de bioinsumos y paga con presupuesto de formulación, un mercado de USD 280 a 570 millones al año.", items: [
    { b: "Hacerlo en casa.", d: "Uno de los clientes potenciales entrevistados ya tiene plataforma propia y terceriza por capacidad, no por incapacidad. Puede dejar de comprar cuando le sobra capacidad interna." },
    { b: "Otro proveedor con el mismo modelo.", d: "el Instituto Hale cobra fee más licencia. Se examina en Defensibilidad, para no cobrarlo dos veces." },
    { b: "No hacer nada.", d: "El cuello de botella de la industria es el registro sanitario, de siete a nueve años en Europa, y Polímera vende velocidad en formulación, que no es ese cuello." }] },
   calls: [
    { tipo: "bad", t: "El techo real", p: "De los USD 162.500 en módulos opcionales, USD 142.500 están declarados por escrito como no comprometidos por cuatro de las seis contrapartes. Y USD 37.500 del techo son un pago de activación de Cumbre Bio y no un módulo, así que el techo real es USD 203.750." },
    { tipo: "info", t: "Lo que hay en papel", p: "El único acuerdo de transferencia de material firmado es el de AgroGlobal Sciences, y un segundo acuerdo con otro cliente sigue sin firmar. La conversión de 28% que declara la empresa reconcilia contra cuatro pruebas de concepto «activas» sin documento firmado detrás." }],
   nota: "No dice que el negocio esté mal pensado. Hay una plataforma funcionando, un acuerdo de transferencia firmado con un cliente de primer nivel y siete propuestas vivas con compromiso inicial real."
  },
  1: {
   tesis: "El lado del ingreso está modelado y el del costo no. Al precio que los clientes tienen hoy sobre la mesa, cada desarrollo completo cuesta más de lo que cobra.",
   figs: [
    { k: "Costo directo por desarrollo", v: "USD 21.630", n: "en 2027 y USD 22.074 en 2028. Suma renta y materiales de laboratorio, servicios técnicos y sueldo del personal técnico." },
    { k: "Cobertura al precio real", v: "0,61x a 0,64x", n: "con USD 13.125 a 13.750 de módulo inicial. Al fee del modelo, USD 37.500, serían 1,73 veces el costo y 42,3% de margen.", bars: [{ l: "Precio real", v: 13.44, t: "13,1 a 13,8k", c: "y" }, { l: "Costo", v: 21.63, t: "21,6k", c: "n" }, { l: "Fee del modelo", v: 37.5, t: "37,5k", c: "g" }] },
    { k: "Cobertura de caja por los fees", v: "57,2%", n: "del gasto en los 24 meses del plan. Opera con caja negativa por diseño mientras no tenga otra fuente de ingreso.", max: 100, bars: [{ l: "2027", v: 46.3, t: "46,3%", c: "y" }, { l: "2028", v: 69.3, t: "69,3%", c: "y" }] }
   ],
   puntos: { t: "Por qué el costo no es un modelo", items: [
    { b: "El mismo rango con dos etiquetas.", d: "El documento de negocio usa USD 37.500 a 187.500 como precio en una página y como costo en la siguiente, y en la misma frase dice «embedded margin». Un tercer rótulo, USD 0.29/L, usa la palabra costo con otro significado." },
    { b: "600 constantes tecleadas.", d: "El bloque de costos no referencia las hojas de escenario. En el pesimista se ejecutan 11 proyectos en vez de 22 y el gasto de 24 meses no se mueve ni un dólar." },
    { b: "Un factor de 1,17 sin rótulo.", d: "Multiplica buena parte del presupuesto de 2027 y 2028 sobre la base de 2026. No está identificado y no coincide con el IVA mexicano de 16%." },
    { b: "El costeo del Módulo A es estimación.", d: "Los founders declararon el 12 de septiembre que no tienen time tracking ni sistema de costeo. Con la contingencia de 20% a 30%, el margen de 45% a 50% baja a 28,5%." }] },
   tablas: [
    { t: "La regalía, cinco tasas en tres instrumentos", head: ["Instrumento", "Tasa"], rows: [
     ["Modelo de la empresa", "4% sobre USD 1.250.000 de ventas anuales por producto, con rezago de tres años"], ["Contratos con BioControl NL", "3% a 5% sobre ventas netas, orientativo y no vinculante"], ["Propuesta de Cumbre Bio", "1% con gatillo a 2%, o 1,5% fijo"]] },
    { t: "Cuándo la regalía supera a los fees", head: ["Tasa firmada", "Cruce"], rows: [["5%", "2031"], ["4%", "2032"], ["3%", "2034"], ["1% o 1,5%", "No cruza dentro de la ventana"]] }],
   calls: [{ tipo: "info", t: "El plazo también tiene tres versiones", p: "Veinte años en un documento, once años sin decaimiento en el modelo, y cuatro o tres años en la propuesta de Cumbre Bio, que aclara por escrito que «no se contempla una obligación perpetua»." }],
   nota: "No dice que los founders no sepan cobrar. Articulan precio, módulos, hitos de cobro y regalía con solvencia, y el lado del ingreso sí está enlazado a sus supuestos."
  },
  2: {
   tesis: "La ventaja de hoy es real y contestable, no un foso. Hay una solicitud en trámite y un grupo con historia, y un tercero ya tiene patente concedida sobre el núcleo técnico.",
   figs: [
    { k: "La patente de Polímera", v: "Solicitada", n: "PCT/US2026/051177 del 23 de julio de 2026, con Hartley &amp; Vance. Lucía Ferrer Soto es la única inventora, y la cesión garantiza que no tiene compromisos en conflicto." },
    { k: "La patente del tercero", v: "Concedida", n: "el Instituto Hale, US 11.874.203 del 22 de abril de 2025, sobre encapsulación de microbios vivos en alginato. No aparece en ninguno de los 93 archivos del data room." },
    { k: "Análisis de libertad de operación", v: "No existe", n: "Es el estudio que dice si uno puede vender sin infringir la patente de otro. Hoy no sabemos si Polímera puede operar sin chocar con Hale." }
   ],
   puntos: { t: "Lo que hace contestable la ventaja", items: [
    { b: "Opera en un laboratorio que no es suyo.", d: "El deck declara «lab operations at IBT-UNV (Valle Alto), 350L bioreactor capacity». Es rentado, ya se mudaron una vez a uno más caro, y no hay convenio, licencia ni carta de no reclamo de la UNV." },
    { b: "Una discrepancia técnica sin resolver.", d: "El único paper publicado del equipo describe gelificación iónica con 28 días de viabilidad, y el expediente afirma que el proceso no es gelificación." }] },
   calls: [{ tipo: "ok", t: "Lo que sí tiene", p: "Tres décadas de trabajo del grupo académico de la UNV en biopolímeros microbianos, que el propio documento de tecnología reconoce, y una solicitud en trámite con un estudio de primer nivel." }],
   nota: "No dice que Polímera infrinja la patente de Hale. Dice que nadie lo miró."
  },
  3: {
   tesis: "Falta el insumo, no salió mal. No hay evaluación técnica de un tercero en el expediente, y la de un gerente de industria existe y nunca entró. Es el pedido más barato y más útil que puede hacer el comité.",
   figs: [
    { k: "Capacidad instalada", v: "350 litros", n: "de biorreactor, pagada y verificable en el modelo, más una línea de secado por aspersión en uso desde 2025." },
    { k: "Evidencia propia", v: "28 días", n: "de viabilidad en un paper propio con revisión por pares sobre encapsulación de células vivas. Un estudio de patentes de primer nivel aceptó llevar el caso." },
    { k: "Evaluador técnico externo", v: "Ninguno", n: "en los diez transcripts ni en los archivos de assessment. Esta lectura es documental y nuestra." }
   ],
   puntos: { t: "Lo que hay en contra", items: [
    { b: "Un proyecto pausado.", d: "Un cliente lo pausó por una razón técnica declarada, «tal vez no era lo mejor para nuestro primer foco», con la puerta abierta a retomarlo. No es un rechazo." },
    { b: "La discrepancia del proceso.", d: "El equipo publicó gelificación iónica y el expediente describe otro proceso." }] },
   nota: "No es un veredicto técnico cerrado. Un evaluador externo podría mover esta lectura hacia mejor o hacia peor. El cliente con plataforma propia se examina en Producto y tracción, para no cobrarlo dos veces."
  },
  4: {
   tesis: "Quedan 2,8 meses de caja, y 1,8 si se cuenta solo lo que está en cuentas de la empresa. Al ritmo de gasto de este año, la caja llega a cero alrededor del 24 de noviembre.",
   figs: [
    { k: "Caja al 31 de agosto", v: "USD 47.530", n: "cuadra al centavo contra los tres libros de gasto. USD 17.908,31 están en la cuenta personal de Lucía Ferrer, el premio de InnovaRed, y USD 29.622,14 en cuentas de la empresa.", stack: [["Cuentas de la empresa", 29622.14, "var(--tealB)"], ["Cuenta personal de una founder", 17908.31, "var(--syD)"]] },
    { k: "Runway", v: "2,8 a 3,9 meses", n: "con el gasto de 2026, USD 16.708 al mes, o el de los últimos tres meses, USD 12.306. El corte de julio publicaba 3,7." },
    { k: "Cierre de 2026", v: "USD -32.019", n: "es donde cierra diciembre con su propio presupuesto de agosto a diciembre, que carga propiedad intelectual y un evento de fin de año." }
   ],
   tablas: [{ t: "Cuánto pide la ronda y cuánto necesita", head: ["Cifra", "Monto", "Fuente"], rows: [
    ["Pedido", "USD 1.250.000", "Documento de 23 páginas y una sesión de trabajo"], ["Pedido", "USD 1.000.000, con USD 687.500 por cerrar", "Documento de 16 páginas"],
    ["Pico de financiamiento", "USD 865.813, con USD 275.553 de contingencia", "Modelo de la empresa"], ["Necesidad real", "USD 897.830", "Pico más el hueco de cierre de 2026"]] }],
   puntos: { t: "Lo que hay que leer junto a la caja", items: [
    { b: "La obligación de USD 312.500.", d: "Son 6,6 veces la caja y 10,6 veces lo que está en cuentas de la empresa. Se examina en Capital." },
    { b: "Una fila sin rótulo.", d: "El 38,6% de la liquidez reportada viene de una fila sin rótulo en los tres libros de gasto." },
    { b: "Gasto de equipo comercial, no de laboratorio.", d: "En 2026 va 43,61% a gente y 2,77% a investigación y laboratorio, 15,7 dólares de nómina por cada dólar de laboratorio. Servicios profesionales y desarrollo comercial suman 46%." },
    { b: "Founders sin relación laboral.", d: "Lucía y Tomás son prestadores de USD 2.500 al mes, sin horas ni exclusividad. Entre enero y julio de 2026 Lucía recibió USD 32.505,61 y Tomás USD 15.000,00, contra USD 17.500 del contrato, sin adenda que lo explique." }] },
   calls: [{ tipo: "bad", t: "Lo que falta cerrar no cubre el pico", p: "Los USD 687.500 por cerrar quedan debajo del pico de USD 865.813. La holgura sin explicar del pedido es de unos USD 102.500 si es de 1 millón y de unos USD 352.500 si es de 1,25 millones." }],
   nota: "No dice que la empresa esté mal administrada. La estructura de gasto es coherente con estar pre-revenue. Dice que la capacidad de ejecución que asume el plan de 2027 no tiene historia de costo real."
  },
  5: {
   tesis: "La Partner de Negocio le pone 8 sobre 10, la única lectura verde del bloque. El resto del expediente todavía no tiene con qué sostener ese ocho.",
   figs: [{ k: "Assessment de la Partner de Negocio", v: "8 de 10", n: "del 9 de septiembre de 2026, traducido a 80 sobre 100. Pesa 10% en la dimensión." }],
   puntos: { t: "Lo que salió de esa sesión", items: [
    { b: "El ingreso a hoy es cero.", d: "Lo confirmó de forma directa, consistente con los dos libros financieros." },
    { b: "«Si nos sale 10, lo cobramos 20».", d: "Una frase del bloque de unit economics, atribuida por contexto al co-founder de negocio, que convive mal con la afirmación de que los fees cubren el costo uno a uno." }] },
   nota: "No dice que el negocio esté mal pensado. Para sostener el ocho faltan tres cosas, un desarrollo pago firmado, el costo real modelado y más de 2,8 meses de caja."
  }
 },
 capital: {
  0: {
   tesis: "Hoy la ronda no se puede ejecutar. No hay acciones para emitir hasta enmendar el Certificate, y esa enmienda necesita la misma firma que el veto de NORTEX.",
   figs: [
    { k: "Uso de fondos", v: "Desagregado", n: "I+D 45,04%, salida al mercado 14,99%, plataforma 21,23%, y un «IP 20%» que en realidad son dos tercios impuestos.", stack: [["I+D", 45.04, "var(--azul)"], ["Plataforma", 21.23, "var(--tealB)"], ["«IP», dos tercios impuestos", 18.74, "var(--sxD)"], ["Mercado", 14.99, "var(--mint)"]] },
    { k: "Propiedad intelectual", v: "USD 87.750", n: "en 24 meses, contra USD 200.000 a 250.000 que los founders dicen que cuestan las fases nacionales. Entre 2,3 y 2,9 veces menos.", bars: [{ l: "Presupuesto", v: 87.75, t: "87,8k", c: "y" }, { l: "Costo declarado", v: 250, lo: 200, t: "200 a 250k", c: "n" }] },
    { k: "Financiamiento", v: "USD 178.313", n: "de brecha aun en el mejor escenario. Faltan USD 687.500 por cerrar y el pico que proyecta el modelo es USD 865.813.", bars: [{ l: "Por cerrar", v: 687.5, t: "687,5k", c: "y" }, { l: "Pico del modelo", v: 865.81, t: "865,8k", c: "n" }] }
   ],
   tablas: [{ t: "El paquete de NORTEX, derecho por derecho", rows: [
    ["Veto", "Sin umbral, sobre emitir cualquier valor a un tercero y sobre enmendar el Certificate o los Bylaws"], ["Acciones libres", "Cero. La única clase que existe es Common Stock"],
    ["Obligación contingente", "USD 312.500 en efectivo, a su sola discreción, ante cualquier desacuerdo no unánime. Son 6,6 veces la caja"], ["Mejor término", "Corre en un solo sentido, a favor de NORTEX"],
    ["Compra en rondas futuras", "Sin plazo de ejercicio ni umbral, y sobrevive a la conversión de sus SAFE"], ["Observador en el board", "Con todos los materiales y permiso expreso para invertir en competidores"],
    ["Indemnidad", "Sin tope de monto"], ["Cesión", "NORTEX cede su posición con solo avisar, la compañía necesita su permiso para ceder la suya"], ["Gasto dirigido", "Puede dirigir hasta USD 62.500 del gasto, con obligación de la empresa de obedecer"]] }],
   calls: [
    { tipo: "bad", t: "El hallazgo más caro", p: "Los acuerdos con los dos founders se firmaron veintinueve días después del Side Letter, sin consentimiento escrito de NORTEX. Bajo los tres SAFE, cualquier incumplimiento del Side Letter es un evento de disolución sin período de cura, y dispara el mismo cobro de USD 312.500 por una vía independiente." },
    { tipo: "lev", t: "La única palanca", p: "NORTEX tampoco puede convertir sus propios instrumentos sin esa misma enmienda. El bloqueo es mutuo, y la negociación arranca ahí, con un paquete único de consentimiento y no por partes." }],
   nota: "No describe founders que no responden preguntas básicas. En la sesión de trabajo respondieron con números en vivo."
  },
  1: {
   tesis: "El cap pedido está 20% por encima de lo que soporta el plan. Es una diferencia negociable, no un bloqueo, y la conversación con NORTEX es el momento de discutirla.",
   figs: [
    { k: "Cap pedido", v: "USD 6,875M", n: "post money. Queda dentro del rango de entrada de LUCHA, de USD 3 a 8 millones." },
    { k: "Lo que soporta el plan", v: "USD 5,706M", n: "es el precio máximo defendible. El pedido queda USD 1.168.750 por encima.", bars: [{ l: "Soporta el plan", v: 5.706, t: "5,706M", c: "y" }, { l: "Pedido", v: 6.875, t: "6,875M", c: "n" }] },
    { k: "El salto", v: "5,5 veces", n: "de USD 1,25M el 29 de enero de 2026 a USD 6,875M en el material de la ronda, en poco más de siete meses, con cero ingreso nuevo y un solo hito duro, la solicitud de patente de julio." }
   ],
   tablas: [{ t: "Las dos cuentas del precio", head: ["Cuenta", "Techo", "NORTEX queda en"], rows: [["Material de la ronda", "USD 6.875.000", "4,55%"], ["Los tres SAFE firmados", "USD 1.250.000", "25,00%"]] }],
   calls: [
    { tipo: "ok", t: "Resuelto el 12 de septiembre", p: "Polímera contestó por escrito que los tres SAFE se quedan a su techo contractual y que los USD 312.500 no se recalculan. Vale la cuenta de los contratos, NORTEX en 25,00%, y la del deck queda retirada. La cláusula de mejor término corre en un solo sentido y no sube el techo de nadie." },
    { tipo: "info", t: "Por qué el múltiplo no ayuda", p: "Contra el ingreso de los últimos doce meses no se puede calcular, el denominador es cero. Contra el ingreso proyectado es alto al precio pedido y bajo al contratado, pero ese ingreso no tiene contrato firmado detrás, así que describe una promesa." }],
   nota: "No dice que USD 6,875M sea descalificante. Lo anómalo es el salto, y USD 1,25M es el único precio que un tercero pagó de verdad, tres veces en dieciocho meses."
  },
  2: {
   tesis: "Queda una sola cuenta del cap table y los founders retienen 67,50% combinado. Lo que sigue pendiente es que el 100% de su equity está sin vestear.",
   figs: [
    { k: "Cap table post conversión", v: "13.333.333", n: "acciones, contando los tres SAFE de NORTEX convertidos.", stack: [["Lucía 32,40%", 32.4, "var(--tealB)"], ["Tomás 32,40%", 32.4, "var(--azul)"], ["Martín Rojas 2,70%", 2.7, "var(--mint)"], ["Pool 7,50%", 7.5, "var(--syD)"], ["NORTEX 25,00%", 25, "var(--ink)"]] },
    { k: "La tabla que entrega la empresa", v: "Sin NORTEX", n: "Se llama «fully diluted» y cierra en 10.000.000 de acciones igual a 100%. Un comité que la mire se equivoca por 25 puntos." },
    { k: "Vesting de founders", v: "0%", n: "con cliff recién en agosto de 2027 y recompra a USD 0,00001 por acción si alguno se va antes, salvo cambio de control con terminación, que acelera el 100%." }
   ],
   puntos: { t: "Lo que sigue abierto", items: [
    { b: "El rol de Martín Rojas.", d: "Tiene tres rótulos en tres documentos, «Board &amp; Co-Founder», «Co-founder Advisor» y «Board Member», y el board tiene un solo asiento que ocupa Tomás. Es investigador titular de tiempo completo de la UNV. Si su 2,70% fuera una posición inactiva, el combinado de founders baja a 64,80%." },
    { b: "Sin pacto entre socios.", d: "No existe acuerdo de accionistas, de voto ni pacto de socios entre los tres, y no hay board consent posterior a agosto de 2024. La autorización de los dos SAFE más recientes no está documentada." },
    { b: "Acceso desigual a la información.", d: "Los founders renunciaron a sus derechos de inspección de libros y NORTEX mantiene derechos de información contractuales. Correría en contra de LUCHA si firmara la misma renuncia." }] },
   calls: [{ tipo: "ok", t: "Cerrado el 12 de septiembre", p: "Polímera entregó el cap table en sus dos formas, legal y as-converted, y confirmó por escrito que ningún acuerdo reemplaza el techo contractual de USD 1.250.000 de NORTEX." }]
  },
  3: {
   tesis: "El plan hacia la Serie A está bien construido y le falta la lista que lo sostiene. No hay una sola conversación documentada con un fondo seed o de Serie A.",
   figs: [
    { k: "Horizonte de la ronda", v: "18 a 24 meses", n: "para llegar a una Serie A con tracción comercial, con hitos por fase para 2026, 2027 y 2028." },
    { k: "Hitos de 2026", v: "Atrasados", n: "Dos o más acuerdos de desarrollo contra cero reales, cuatro o más pruebas de concepto contra cero firmadas. El único cumplido es la solicitud de patente de julio." },
    { k: "Lista de fondos", v: "Cero", n: "La construye un contratista de diez horas semanales por USD 1.125 al mes, con contrato que vence el 3 de noviembre de 2026, dieciocho días antes de la caja en cero." }
   ],
   nota: "No dice que no vayan a levantar. Dice que el plan existe y la lista para ejecutarlo todavía no."
  },
  4: {
   tesis: "La industria compra en esta vecindad y todavía no compró nada con la forma de Polímera. El múltiplo de salida de un licenciante que cobra regalías es desconocido.",
   figs: [{ k: "El comparable de la forma exacta", v: "USD 83M", n: "Genlab compró la plataforma de investigación y desarrollo de biológicos agrícolas de Rhein Agro en 2022. Fue compra de activo, no la salida de una empresa." }],
   tablas: [{ t: "Los precedentes de compra", head: ["Comprador", "Compra", "Monto"], rows: [["AgroGlobal", "Sustrato Labs, 2022", "USD 1.200 millones"], ["BioGuard", "TropiBio, 2023", "USD 569 millones"], ["Quimix", "FeroTech", "USD 200 millones"], ["CampoMax", "Agrovalle, 2020", "Sin monto declarado"]], nota: "Las cuatro son compras de empresas de producto biológico con ingreso, no de un licenciante de formulación." }],
   puntos: { t: "Las otras vías de retorno, cerradas hoy", items: [
    { b: "Dividendos.", d: "El flujo operativo es negativo los dos años del plan y repartir necesita el consentimiento de NORTEX." },
    { b: "Rescate o venta forzada.", d: "No existe ningún derecho a favor de LUCHA." },
    { b: "Arrastre en una venta.", d: "No se puede armar limpio porque los SAFE de NORTEX reservan excepciones a su favor, y NORTEX tiene preferencia de liquidación senior al capital común." }] },
   calls: [
    { tipo: "ok", t: "A favor", p: "Los compradores naturales están nombrados y tres de ellos ya son contrapartes vivas del pipeline." },
    { tipo: "bad", t: "En contra", p: "Tres compañías más grandes, mejor financiadas y con más años no lograron salida. El material de la propia ronda no menciona una vista de salida ni una vez." }]
  }
 },
 mercado: {
  0: {
   tesis: "Con M-23, la columna de capa de infraestructura, el tamaño entra en banda alta. El mercado de una capa es el gasto del cliente en ella más la base sobre la que cobra su regalía.",
   figs: [
    { k: "TAM combinado", v: "USD 610M a 1,2B", n: "USD 280 a 570 millones de gasto mundial en I+D de formulación de bioinsumos, más USD 330 a 635 millones de regalía de 3% a 5% sobre un mercado de producto de USD 11 a 12,7 mil millones.", stack: [["I+D de formulación", 425, "var(--azul)"], ["Regalía sobre producto", 482.5, "var(--tealB)"]] },
    { k: "SAM LatAm", v: "USD 45 a 115M", n: "USD 28 a 86 millones de I+D más USD 17 a 29 millones de regalía sobre los USD 581,2 millones del mercado sudamericano." },
    { k: "SOM", v: "USD 3 a 5M", n: "tarifa y regalía sobre una cartera de formulaciones licenciadas, más un par de millones de honorarios de desarrollo." }
   ],
   puntos: { t: "Lo que pesa contra la empresa aunque el tamaño alcance", items: [
    { b: "Tres estimaciones que no coinciden.", d: "La más alta, USD 170 millones al año, supone USD 250 mil de regalía anual por producto. El propio modelo dice que un producto maduro factura alrededor de USD 1,25 millones, cinco veces menos. Corregido, baja a unos USD 57 millones." },
    { b: "Una tarifa que no está sobre la mesa.", d: "La cuenta usa USD 50 mil por proyecto, 3,6 a 3,8 veces lo que los clientes ofrecen hoy, entre USD 13.125 y 13.750 por módulo inicial." },
    { b: "El segmento con la base de cobro más flaca.", d: "Los inoculantes se quedan con 13% del valor del mercado brasileño de bioinsumos y cubren 40% de la superficie tratada, según la asociación agroindustrial de Brasil. La regalía se cobra sobre valor y no sobre hectáreas." }] },
   calls: [{ tipo: "info", t: "Por qué M-23", p: "Las columnas originales están escritas en dólares de producto terminado, y una empresa que vende una capa dentro del producto de otro no llegaba a verde ejecutara como ejecutara. Antes de M-23 esta subvariable se reportaba en banda de 32 a 55. Está calibrada con este solo caso y hay que correrla contra los casos cerrados antes de aplicarla a otro." }]
  },
  1: {
   tesis: "Los drivers existen y el capital de los incumbentes se está moviendo. Pero el cuello de botella de la industria es el registro, y Polímera vende velocidad en otra etapa.",
   figs: [
    { k: "Regulación", v: "50% menos", n: "uso de pesticidas al 2030, el compromiso de Europa." },
    { k: "Adopción por superficie", v: "194M ha", n: "tratadas en Brasil en 2025, 28,5% más que el año anterior, con los inoculantes en 40% del área, según la asociación agroindustrial de Brasil." },
    { k: "Adopción por presupuesto", v: "Menos de 5%", n: "del gasto total en protección de cultivos y nutrición, según declara la propia empresa." }
   ],
   puntos: { t: "Los incumbentes están pagando", items: [
    { b: "CampoMax.", d: "Opera una planta propia de biológicos de 22.000 metros cuadrados en Estados Unidos, compró Nexa Microbials e integró la colección de cepas de Helvetia Pharma." },
    { b: "Rhein Agro.", d: "Firmó con Verdana Bio un acuerdo que paga por hitos de eficacia, seguridad y manufacturabilidad, dentro de un programa de descubrimiento con catálogo propio y no como servicio de formulación contratado por separado." }] },
   calls: [
    { tipo: "bad", t: "El cuello de botella real", p: "La aprobación de biopesticidas toma de siete a nueve años en la Unión Europea y de dos a tres en América, y la ley brasileña que la empresa presenta como viento de cola tiene su implementación trabada. Una tarifa de unos USD 37,5 mil no mueve la aguja contra un desarrollo de biológico de USD 25 millones." },
    { tipo: "bad", t: "El capital no fluye hacia este modelo", p: "El financiamiento global de agrifoodtech quedó plano en 2025, con 12% menos rondas. AgroGlobal, la contraparte más avanzada, se divide en dos compañías públicas en el segundo semestre de 2026, justo cuando Polímera necesita convertir su acuerdo de evaluación en contrato." }],
   nota: { t: "La lectura.", p: "El mercado ya adoptó biológicos en superficie y todavía no en presupuesto. Es bueno para el volumen del que licencia la tecnología y malo para la regalía, que se cobra sobre valor." }
  },
  2: {
   tesis: "El comprador es también el competidor. Los grandes formulan puertas adentro, y el comparable más cercano en modelo ya tiene patente concedida en el núcleo técnico.",
   figs: [{ k: "Patentes en el espacio", v: "822", n: "en cinco años, según el propio relevamiento." }],
   keep: [".mkt-comp-table"],
   puntos: { t: "Lo que empeora la estructura", items: [
    { b: "Tráfico interno del inversionista.", d: "NORTEX tiene en su portafolio público a un competidor de encapsulación que Polímera clasifica como directo. Un cuarto de los acuerdos de confidencialidad comerciales y dos de las siete propuestas son con otras empresas del mismo portafolio." },
    { b: "La exclusividad que no sobrevive.", d: "La afirmación de ser la única plataforma abierta entre empresas para microorganismos vivos no sobrevive a su propio relevamiento, que registra a un competidor con la misma declaración." },
    { b: "La referencia que no existe.", d: "Un comprador pidió dos veces una referencia comercial verificable y la respuesta fue que no existe todavía. VivaGrow Bio sí puede darla, y Hale carga noventa años de reputación en investigación por contrato." }] }
  },
  3: {
   tesis: "El founder-market fit descansa en la profundidad científica de Lucía Ferrer. El wedge está identificado con precisión y hoy no es defendible.",
   figs: [
    { k: "Lucía Ferrer, CSO", v: "12 años", n: "en el objeto exacto del negocio. Doctorado en Biotecnología, primera autora de un paper revisado por pares sobre encapsulación en alginato, miembro del sistema nacional de investigadores de México y única inventora de la solicitud." },
    { k: "Tomás Ibarra, CEO", v: "7 años", n: "adyacentes al agro en finanzas y consultoría, sexta generación de productores agropecuarios, cero años previos en bioinsumos." },
    { k: "Contratos de desarrollo firmados", v: "Cero", n: "Es lo único que falta para probar el wedge." }
   ],
   puntos: { t: "El wedge y lo que lo limita", items: [
    { b: "Qué es.", d: "Entrecruzamiento auto inducido en un solo paso durante el secado por aspersión, selección de biopolímero por cepa con apoyo bioinformático y salida en formato sólido, sin cambios en la planta del cliente." },
    { b: "Por qué no es defendible hoy.", d: "La patente concedida en ese espacio es de un tercero, la familia de materiales es estado del arte publicado, y no hay análisis de libertad de operación." },
    { b: "La restricción geográfica.", d: "El laboratorio está en México y buena parte de los clientes en otros países. El análogo genérico del banco de cepas lo rechaza la propia líder técnica de un prospecto, porque cepas de una misma especie no responden igual." },
    { b: "Patente contra secreto industrial.", d: "En una llamada Polímera le dijo tres veces a un comprador que su tecnología está protegida por patente, cuando lo que existe son solicitudes sin conceder. Lo que protege el proceso es el secreto industrial." }] },
   calls: [{ tipo: "ok", t: "Evidencia directa, no solo currículum", p: "Con un prospecto que trajo a su líder técnica, Lucía estratificó la dificultad por tipo de membrana bacteriana, explicó por qué el método del cliente fallaba en la re germinación y reconoció sin que se lo pidieran que todavía no usan cámaras para ensayos de vida útil en tiempo real. Ese prospecto es también inversionista del fondo de LUCHA, así que vale como lectura técnica y no como validación comercial." }]
  }
 },
 resiliencia: {
  0: {
   tesis: "La tecnología funciona en condiciones parecidas a las reales y todavía no corrió en la planta de un cliente. Esa es toda la distancia entre el 5 y el 6.",
   figs: [
    { k: "Nivel", v: "5 de 9", n: "Validada en entorno relevante. Score igual a nivel menos 1, dividido 8, por 100, da 50." },
    { k: "Muestras transferidas", v: "16 a 18 g", n: "de formulación encapsulada de Azospirillum, contra el acuerdo firmado con AgroGlobal Sciences con fecha efectiva del 3 de marzo de 2026." },
    { k: "Corridas en planta de cliente", v: "Cero", n: "Es lo que pide el nivel 6." }
   ],
   puntos: { t: "Qué impide el nivel 6", items: [
    { b: "Sin corrida industrial.", d: "No hay una sola corrida documentada en el entorno de un cliente." },
    { b: "Reproducibilidad sin papel.", d: "La reproducibilidad a escala comercial no está documentada, y el costo real de un desarrollo recién se pudo auditar el 12 de septiembre con el Módulo A de Cumbre Bio." }] },
   calls: [
    { tipo: "bad", t: "La presión que esta fila no captura", p: "La selección asistida de biomateriales, su diferenciador central, ya se compra a terceros, y la ventana estimada por LUCHA para que deje de ser vendible es de doce a dieciocho meses." },
    { tipo: "lev", t: "El activo que no está vendiendo", p: "Predecir si una célula viva sigue viable después de mucho tiempo guardada no se comoditiza, porque ese dato solo se genera esperando el tiempo real. La compañía tiene ese activo y no tiene el pitch construido sobre él." }],
   nota: "No dice que la tecnología no sirva. Dice que todavía no se probó donde tiene que probarse."
  },
  1: {
   tesis: "Hay una solicitud presentada y todavía nadie la examinó. Una solicitud no es una patente, es un turno en la fila.",
   figs: [
    { k: "Nivel", v: "4 de 9", n: "Primera solicitud prioritaria, julio de 2026. Da 38." },
    { k: "Hito de 2026", v: "Cumplido", n: "Es el único hito que la empresa se puso para 2026 y cumplió. La pone un nivel por delante de donde estaba Selva Bio en esta misma fila." },
    { k: "Restricción de datos", v: "7 años", n: "La cláusula 2.2 del acuerdo con AgroGlobal restringe el uso cruzado del dato de esa evaluación." }
   ],
   puntos: { t: "Lo que falta para el nivel 5", items: [
    { b: "Examen o fase nacional.", d: "Que un examinador revise la solicitud, o que se pida protección país por país, que es donde el derecho se vuelve exigible." },
    { b: "Lo que declara la empresa.", d: "Declara un nivel más alto y el expediente no lo sostiene." }] },
   calls: [{ tipo: "info", t: "Por qué pesa distinto que en una empresa de molécula", p: "El activo de Polímera es conocimiento de proceso, y ese sí se puede sostener como secreto industrial. La cláusula de AgroGlobal acota el foso de datos y no lo bloquea, y la regla de no atribución corre a favor de la empresa." }]
  },
  2: {
   tesis: "Esta escala no le corresponde a Polímera. El que vende y registra es el cliente, así que no puntúa y su peso se reparte entre las otras dos.",
   figs: [{ k: "Estado", v: "No aplica", n: "Cambio de método M-25. TRL pasa a pesar 53,33% e IPRL 46,67%." }],
   puntos: { t: "Lo que queda", items: [
    { b: "Una condición declarada.", d: "Que el encapsulado en sí no requiera aprobación propia, por ejemplo figurar en una lista de inertes aprobados." },
    { b: "Un riesgo indirecto.", d: "La regalía de 3% a 5% empieza a correr solo cuando el producto del cliente está aprobado y vendiendo. Polímera hereda el calendario regulatorio de cada contraparte sin poder acelerarlo, y ese riesgo de plazos se cobra en Negocio." }] }
  }
 },
 equipo: {
  0: {
   tesis: "Los dos founders se autoevalúan casi igual, 13 de 15 cada uno, y describen la misma estructura ligera.",
   figs: [
    { k: "Autoevaluación", v: "4,33 de 5", n: "promedio de Tomás y Lucía. La conversión normalizada da 83." },
    { k: "Cultura", v: "5 de 5", n: "los dos tocan el techo del instrumento en cultura." }
   ],
   puntos: { t: "En sus palabras", items: [
    { b: "Lucía Ferrer.", d: "«Actualmente operamos con una estructura de personal ligera y contratamos servicios cuando es necesario, manteniendo siempre cubiertas las capacidades críticas de la startup»." },
    { b: "Tomás Ibarra.", d: "«Aunque nos falta terminar de documentar los procesos, el equipo sabe responder y puede cubrirme sin problema si me ausento un tiempo». Nombra el hueco operativo con precisión." }] },
   nota: "No dice que el equipo esté perfectamente alineado. Que respondan casi igual puede ser alineación real o calibración compartida entre ellos, y queda anotado así sin corregir el número."
  },
  1: {
   tesis: "Los dos founders están en Stage 3, en la parte alta de la banda, con profundidad 80 y 82. El veto por Stage 1 o 2 no se dispara.",
   figs: [
    { k: "Conversión", v: "60", n: "Stage 3 igual a 60, conversión estricta de la tabla, sin interpolar." },
    { k: "Tomás Ibarra", v: "80", n: "de profundidad. Stage 3 tardío con Stage 4 presente y consistente." },
    { k: "Lucía Ferrer", v: "82", n: "de profundidad, con los marcadores más limpios del expediente." }
   ],
   keep: [".eq-quotes-h", ".eq-founder-block"],
   calls: [{ tipo: "ok", t: "Por qué el veto no se dispara", p: "Lo más cercano a un marcador de Stage 2, la queja de Tomás sobre un fondo desalineado, se cierra con la decisión de descartar ese dinero, que es agencia y no resignación." }],
   nota: { t: "Cautela de método.", p: "Andrés Molina no se puntúa, no dice una palabra en los cinco transcripts con founders presentes. La atribución de hablante es inferida porque ningún transcript trae etiqueta, y antes de citar una frase con nombre en comité conviene reconfirmarla contra el audio." }
  },
  2: {
   tesis: "Es el componente de mayor peso y el que sostiene el verde. El Partner de Cultura encuentra resonancia real en valores y en la forma de mirar el impacto.",
   figs: [{ k: "Assessment de Cultura", v: "8,5 de 10", n: "del Partner de Cultura, el 8 de septiembre, solo sobre Cultura. Pesa 50% de la dimensión." }],
   puntos: { t: "En sus palabras", items: [
    { b: "Resonancia.", d: "«Lo que me dejó tranquilo es que hay resonancia real, en valores, en la forma de mirar el impacto, y en la humildad con la que se paran frente al proceso»." },
    { b: "Una propuesta matrimonial.", d: "«Si ellos dicen que sí, no es un “ok, inviertan”. Es un vínculo de largo plazo, donde Lucha no promete plata solamente, promete presencia, acompañamiento y trabajo»." },
    { b: "Los límites que ya pusieron.", d: "Antes de que nadie se lo ofreciera, pusieron dos veces el límite de la injerencia. «Es una línea muy finita»." }] },
   calls: [{ tipo: "info", t: "La pregunta que quedó abierta", p: "El Partner de Cultura les preguntó de frente si quieren un cofundador más o solo un inversionista, y el transcript se corta antes de la respuesta. «El “sí final” depende de que ellos contesten con claridad qué quieren de nosotros»." }]
  }
 }
};
