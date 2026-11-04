# Restricciones de Huascarán

Referencia de restricciones de Huascarán recopilada al 4 de noviembre de 2026. Distingue decisiones confirmadas, medidas observadas y pedidos pendientes a esa fecha. Contrastar con las instrucciones actuales del proyecto antes de implementar.

## Alcance y fuentes

Se revisó el historial disponible del chat «Versión 2.0», desde la clonación del repositorio hasta las últimas solicitudes, junto con la documentación y el código local. Esta recopilación no garantiza cubrir conversaciones externas a ese historial.

Las secciones de decisiones recogen pedidos del usuario y sus ajustes posteriores. Las tablas de medidas distinguen especificaciones documentadas de valores observados en el código. Un valor implementado no demuestra que el usuario haya exigido ese número exacto.

Fuentes principales:

- Historial: chat «Versión 2.0», identificador `01a19cd0-ca65-7070-b815-fa08ea0dcff9`.
- [Preferencias de interfaz](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/ui-guidelines.md).
- [Identidad y login](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/login-assets.md).
- [Notificaciones](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/notifications.md).
- [Status de misiones](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/mission-status.md).
- [Acceso a Agentes y Memos](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/module-access.md).
- [Memos y evidencias](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/memos.md).
- [Vista local](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/local-preview.md).
- [Estilos implementados](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/src/styles.css).

Para convertir este documento en un skill, conservar el alcance de cada regla. Una restricción del reporte, del login o del popup no se extiende automáticamente a toda la plataforma. Los pedidos nuevos del usuario pueden modificar estas decisiones.

## 1. Escritura y reducción de ruido visual

- No escribir palabras completas en mayúsculas en los textos de interfaz. Usar estilo oración en etiquetas y encabezados y evitar transformaciones CSS a mayúsculas. La normalización visual no debe modificar los datos originales ni los campos editables de Notion.
- No usar rayas largas en los textos. Separar ideas con puntos, comas o paréntesis; escribir los periodos con «al».
- Usar «Status» como etiqueta de estado de las misiones.
- No repetir el código del sprint en títulos, enlaces ni opciones. Evitar combinaciones como «S114 · S114».
- No repetir el ciclo seleccionado como texto decorativo en varios bloques.
- Ocultar «Sin estimación» en tarjetas. Mostrar horas únicamente cuando exista una estimación, incluido el valor cero.
- Eliminar el footer de la plataforma.
- Eliminar el aviso superior de «Vista local».
- No mostrar «Vistas del plan», «Cambiar ciclo» ni el botón «Limpiar filtros» retirados durante el desarrollo.
- Mantener una interfaz comprensible para personas no técnicas, con controles compactos y sin explicaciones técnicas innecesarias en el flujo principal.

Fuente: historial, especialmente turnos `01a19d6c-211d-7ad1-84b6-aaca37b4b82e`, `01a19d7e-405d-7923-8d90-f1a0fc9cb6fa`, `01a19d85-7ea4-7572-801e-e47df7e7cd29` y `01a1a2ea-afa9-7470-822b-a0b616142b06`; guía de interfaz.

## 2. Colores, bordes e identidad

- No usar bordes de color en botones, tarjetas ni otras cajas. La guía extiende esta regla a contornos, sombras de color y subrayados de selección, incluidos los estados de selección, hover, foco y error.
- Usar bordes neutros y distinguir estados mediante fondos, texto e indicadores semánticos. Mantener un foco de teclado visible y neutro; sobre la barra azul se documenta un contorno blanco por contraste.
- El fondo general de la plataforma debe ser blanco.
- La barra superior debe usar el degradado del banner «¿Te sumas?» de Lucha: `linear-gradient(167deg, #0469b6, #03508a 51%, #000)`.
- Mantener el verde principal de Lucha en las selecciones, incluidos «Activas» y «Todas».
- Usar el símbolo de Lucha arriba a la izquierda, sin añadir el texto «Lucha» a su lado en la cabecera del portal. Alinear su altura visual con el botón contiguo.
- Usar el favicon oficial de Lucha y «Huascarán» como título de la pestaña.
- No imponer la prohibición de bordes de color a los trazos de una gráfica: el radar tiene su propia especificación cromática.

Referencia de marca documentada: azul `#15528D`, verde principal `#B4E280` y verde secundario `#76C58A`. El login utiliza las fuentes oficiales MADE Tommy Soft Bold y Assistant; el cuerpo actual del portal utiliza DM Sans. No hay evidencia de un pedido de sustituir toda la plataforma por las fuentes del login.

Fuente: historial, turnos `01a19d0c-5599-7ef3-9397-3175f91c34cf`, `01a19e9c-8dfe-7f02-8baa-441240e08924`, `01a19d10-9066-7041-adb8-d5c2d7f3893c` y `01a19d02-41a0-74b0-a9c2-e74e6d85baf5`; guía de interfaz e identidad.

## 3. Densidad y medidas documentadas

El pedido fue tomar como referencia la compacidad y las distancias de GitHub. Estas son las medidas recogidas en la guía, no números dictados literalmente en todos los casos:

| Elemento | Medida documentada |
| --- | --- |
| Margen lateral de cabecera | 16 px |
| Menú de perfil | 230 px de ancho, 4 px de separación del activador y alineación al borde derecho |
| Botón de refrescar | 44 × 44 px, circular, radio del 50 %, solo icono |
| Filas del menú lateral | 32 px de alto, texto de 14 px e interlineado de 20 px |
| Iconos del menú lateral | 16 px, con 8 px hasta el texto |
| Peso del menú lateral | 400 normal, 600 para la opción activa |
| Opciones del selector de ciclos | 32 px de alto |
| Objetivos táctiles | Al menos 44 px; ampliar la zona interactiva de los controles compactos |
| Panel de notificaciones | 360 px de ancho, ajustable al espacio disponible |
| Avisos del panel | Texto de 12 px y espacio vertical de 12 px |
| Detalle de sprint | Cuerpo de 14 px y peso 400; etiquetas de 12 px y peso 600 |
| Valores de Periodo y Responsable del sprint | Área de al menos 44 px de alto, alineada con Status y Áreas |
| Separación entre «Misiones» y su tabla dentro del sprint | 18 px |
| Icono informativo del radar | 16 px visibles, con área táctil de 44 px |
| Carga inicial | Pulso de 2,8 s, escala máxima 1,04 y desaparición de 620 ms |
| Resumen del indicador seleccionado | Transición de altura y opacidad de 320 ms |

Fuente: guía de interfaz. El historial confirma los pedidos de compacidad para el menú lateral, ciclos, perfil y notificaciones.

### Medidas de tarjetas observadas en el código

No se encontró una regla que obligue a que todas las tarjetas tengan el mismo ancho o una altura fija. Los anchos se adaptan a la cuadrícula y las alturas dependen del contenido. Las cifras siguientes describen la implementación revisada y sirven de referencia al preparar el skill:

| Componente | Medidas actuales | Selector de referencia |
| --- | --- | --- |
| Tarjeta de misión | Alto mínimo de 210 px, padding de 16 px y radio de 14 px; el popup elimina padding, borde y elevación de la tarjeta interior | `.mission-card`, `.mission-detail-dialog .mission-card` |
| Tarjeta de sprint | Radio de 14 px; resumen con alto mínimo de 160 px y padding de 18 px; hasta 510 px de pantalla, mínimo de 150 px y padding de 15 px | `.sprint-item`, `.sprint-item > summary` |
| Tarjeta de ciclo | Ancho completo, una columna, separación de 16 px y radio de 14 px; padding base de 22 px, de 18 px hasta 720 px, con reserva adicional a la derecha para la flecha | `.cycles-list`, `.cycle-card` |
| Tarjeta de agente | Radio de 16 px y contenido con padding de 18 px; bloque de imagen de 210 px y retrato de 170 × 170 px | `.agent-card`, `.agent-card-content`, `.agent-card-image` |
| Cuadrícula de agentes | 4 columnas; 2 hasta 1100 px; 1 hasta 720 px; separación de 18 px | `.agents-grid` |
| Popup de misión | Ancho de `min(640px, calc(100vw - 32px))`, alto máximo de `calc(100dvh - 32px)`, padding de 20 px y radio de 16 px | `.mission-detail-dialog` |
| Foto del perfil | Imagen circular de 36 × 36 px dentro de un botón de 44 × 44 px | `.user-menu-avatar`, `.user-menu-trigger` |

Fuente: `src/styles.css`. No convertir estos valores en una nueva prohibición de cambiar medidas sin que el usuario adopte esa restricción.

## 4. Cabecera, navegación y perfil

- Concentrar la navegación principal en el menú junto al símbolo de Lucha; no duplicarla a la derecha de la barra azul ni dentro de las cajas de filtros.
- Usar un panel lateral de altura completa, con fondo atenuado, símbolo de Lucha y botón de cierre. La eliminación de equis pedida para otros popups no elimina este cierre del menú lateral.
- Colocar Reporte diario primero, seguido de una división neutra; después Ciclos, Sprints y Misiones; otra división y Agentes. Memos se incorporó posteriormente como módulo del menú.
- Retirar Tareas de la navegación y del buscador. «Plan de ciclo» deja de ser un destino combinado: Sprints y Misiones tienen destinos separados.
- No mostrar selectores globales de Área y Sprint en la cabecera.
- El botón de refrescar debe ser circular y mostrar solo el icono.
- Reemplazar el nombre visible del usuario por su foto circular de Notion, conservando el menú de cuenta. No reemplazarla por la foto de Google; si falta o falla, usar un icono de perfil.
- Mantener «Cerrar sesión» como primera opción del menú de perfil.
- Conservar enlaces reales, enlaces directos, recarga, Atrás y Adelante, navegación con teclado, cierre con Escape y restauración del foco según el componente.

Fuentes: historial y guía de interfaz. El cambio de nombre a foto está pedido en el turno `01a1a2f6-d56f-7f03-80ba-74d87a7a0655` y documentado en la vista local.

## 5. Ciclos, responsables y buscador

- Mostrar el selector de ciclos en la barra superior junto al logo. No ofrecer «Todos los ciclos» ni duplicar el selector en los filtros.
- Cambiar de ciclo debe conservar la pantalla actual y los filtros compatibles, actualizando únicamente los datos del ciclo correspondiente.
- En Ciclos, mostrar tarjetas de ancho completo, una debajo de otra, tanto en escritorio como en móvil. Este pedido no elimina las tarjetas de Sprints o Misiones.
- Abrir un ciclo debe mostrar sus sprints y misiones, con cantidades reales y sin mezclar relaciones de otros ciclos.
- El responsable inicial debe ser la persona autenticada. Javier fue el ejemplo de su propia cuenta, no un valor fijo para todos los usuarios.
- Conservar la selección de responsable por vista al navegar. El reporte mantiene su alcance personal.
- Mantener un solo buscador en la cabecera, contextualizado por ciclo y responsable; retirar buscadores locales redundantes de sprints y misiones.
- El buscador debe encontrar misiones asignadas a la persona y sprints donde participa como owner, co-owner o responsable de una misión del mismo ciclo.
- Elegir el propio nombre debe incluir esa participación. Retirar «Donde participo» por redundante y conservar «Soy owner» para el alcance exclusivo de liderazgo.
- No heredar filtros de estado u otros filtros del listado en la búsqueda. Abrir un resultado debe revelar el destino y conservar el responsable.

Detalle documentado para desarrollo: aplicar ciclo y responsable por identificador antes de contar o limitar resultados; cancelar búsquedas anteriores al cambiar de contexto y evitar resultados obsoletos.

Fuente: historial y guía de interfaz.

## 6. Filtros, tablas y calendarios

- Las cajas de filtros deben empezar directamente con los filtros, sin la franja superior de contador ni su línea divisoria.
- En Misiones, colocar Responsable, Status, Sprint y Semana en la misma fila de escritorio; ubicar los controles de alcance y vista al costado y adaptar la distribución en móvil.
- Ocultar Áreas en filtros, tarjetas y tabla de Misiones. Ocultar Semana en las tarjetas, conservando su edición en el detalle.
- En Sprints, mantener Responsable, Status, Semana y Tipo; no mostrar un filtro Sprint dentro de Sprints.
- Representar Tarjetas, Tabla y Calendario mediante iconos, conservando etiquetas accesibles y tooltips.
- Mantener filtros y ciclo al cambiar de visualización.
- Cada encabezado de tabla debe permitir alternar orden ascendente y descendente con una flecha discreta. Ordenar no debe cambiar el ancho de las columnas.
- Alinear los valores de tablas a la izquierda y centrarlos verticalmente.
- En la columna Misión, evitar repetir el prefijo de sprint que ya aparece en su columna. Conservar el código completo en datos y detalle.
- Las misiones dentro de un sprint deben usar la misma tabla de Misiones.
- En móvil, desplazar las tablas horizontalmente dentro de su contenedor sin desbordar la página.
- El calendario vacío debe usar un estado vacío coherente con las otras vistas.

Fuente: historial y guía de interfaz.

## 7. Tarjetas y detalles de sprints y misiones

- Al abrir una tarjeta de sprint, mostrar ese sprint arriba y ocultar las otras tarjetas. Volver debe recuperar el listado, el foco y los filtros.
- Ocultar el texto visible «Volver a sprints», dejando la flecha; mantener su etiqueta accesible y tooltip.
- La primera fila del detalle de sprint debe contener Status, Áreas, Periodo y Responsable, en ese orden, adaptándose a pantallas pequeñas.
- Criterio de éxito, Descripción, Indicador y Objetivo deben aprovechar el ancho completo. Mantener tipografía y pesos coherentes, sin negritas arbitrarias ni textos de contexto sueltos.
- Dentro del sprint, no mostrar «Ver todas» ni el contador «en este sprint» junto al encabezado Misiones.
- Los títulos de misión deben abrir el mismo detalle interno desde tarjetas, tabla, calendario o un sprint. No deben enviar directamente a Notion.
- Debajo de «Detalle de misión», mostrar «Sprint» y el título completo del sprint como texto, sin hipervínculo ni repetición al pie.
- En el popup de misión, colocar responsable y fecha en la misma fila debajo del título, también en móvil.
- En la tarjeta del listado, colocar título y horas arriba; debajo, fecha a la izquierda sin icono, código de misión y responsable en filas sucesivas. Conservar el enlace de sprint al pie sin la etiqueta «Sprint».
- «Comentar avance» y su formulario deben aparecer únicamente en el popup. No deben desplegarse en la tarjeta de fondo ni cambiar la altura de la fila del listado.
- La información de misión dentro del popup no debe elevarse ni desplazarse al pasar el cursor. Esta restricción es específica del popup.
- Status y Semana deben compartir una fila de dos columnas con sus etiquetas arriba.
- Mantener el diseño personalizado de los desplegables, como en los filtros; no sustituirlo por selectores nativos. Evitar que se corten en un popup: capa superior, posición adaptable y scroll si es necesario.
- Los campos de avance y sus placeholders deben heredar la tipografía de la plataforma.
- Quitar la equis visible del detalle de misión según el ajuste posterior; permitir cerrar mediante clic exterior y Escape.

Fuente: historial y guía de interfaz. La retirada de la equis del detalle está en el turno `01a1a2a8-5dfd-7e12-9771-0dcda027d955`.

## 8. Reporte diario y agenda

- Encabezado compacto con título y fecha de Lima, sin saludo, menciones de Chief ni ciclo repetido.
- Orden de bloques: Tu agenda de hoy, Tus sprints y Tus misiones.
- Retirar el primer bloque de Sugerencia. El pedido posterior de eliminarlo sustituye al diseño anterior que lo colocaba arriba.
- No incorporar funcionalidades de Chief dentro del reporte mientras se mantenga este alcance.
- Conservar la conexión de Calendar que ya funciona; no exigir reconectar a quien ya está conectado.
- Mostrar el total real de reuniones del día junto al título: «Tu agenda de hoy (2)», con cantidad dinámica.
- Mostrar los invitados por respuesta: Aceptaron, Sin responder, Tal vez y No asistirán. Si no hay nombre disponible, mostrar el correo.
- Mantener las misiones agrupadas según Tipo de tiempo de Notion: Interno, Externo y subtipos, con sus horas pendientes. No duplicar una misión y conservar la clasificación ausente como «Sin tipo de tiempo».
- Mantener la tabla compartida de Sprints y de Misiones y el editor interno de misión.

Reglas documentadas complementarias: priorizar vencimientos y bloqueos, mostrar inicialmente cinco misiones representativas de los grupos y permitir expandir; no inferir urgencia por horas estimadas. Sin agenda conectada, no presentar ceros o capacidad inventada como datos medidos. Las cifras semanales van de lunes a domingo en Lima.

Fuentes: historial, turnos `01a19e7b-4fd7-7453-9033-2814252ca964`, `01a19e7b-16fd-7422-b871-bf73c36db8ac`, `01a19e6e-a0bc-7e12-8afc-0bc934a615c1`, `01a1a349-6ea2-7c51-b060-33d02b76ddf5` y `01a1a337-4ccb-75f0-9121-373d7dc3bc82`; guía de interfaz.

## 9. Agentes y rendimiento

- El directorio comienza directamente con las tarjetas: sin fila visible de título, filtros, caja de filtros ni controles para cambiar de vista. Conservar el buscador superior.
- Mostrar los agentes activos; la guía los concreta como Publicado y En desarrollo. Los que tengan imagen deben aparecer primero.
- Usar la imagen o icono auténtico de la página de Notion y mostrar Outcome en la ficha del agente.
- Outcome debe ser texto con el estilo de la descripción, sin caja.
- El responsable debe aparecer una sola vez, en un recuadro compacto debajo de Outcome: solo nombre, sin foto, inicial ni etiqueta «Responsable», y sin repetirlo en cada indicador.
- Llamar «Rendimiento» a la sección, sustituyendo «Funcionamiento por ciclo».
- En el directorio, mostrar el ciclo arriba como texto sin interacción: los agentes son transversales. Dentro de la ficha, usar ese lugar para elegir el ciclo de rendimiento; no duplicar botones de ciclo debajo.
- Mostrar el resultado acumulado del ciclo en el radar, sin selector de acumulado o fecha. Si la unidad es Promedio, calcular el promedio y no la suma.
- Corregir la suma de porcentajes: no sumar tasas para expresar un avance global. La documentación distingue el promedio descriptivo de porcentajes de una tasa global calculada desde sus bases.
- El radar debe incluir todos los indicadores, también los que alcanzaron la meta. El centro representa menor avance y el borde el 100 % de una meta positiva.
- Si un indicador supera el 100 %, mantener el punto en el borde y mostrar «Meta cumplida» en una sola línea en la lista. Conservar el resultado real.
- Usar el esquema cromático final del radar: contorno azul petróleo `#176f7d`, relleno `#2d9390` con baja opacidad, centro claro y bordes más intensos; verde de Lucha para el número seleccionado.
- No pintar como cero los indicadores sin datos ni cerrar polígonos atravesando huecos de información.
- Eliminar «Panorama frente a metas» y la explicación visible «Centro: 0 % · Borde: 100 % de la meta». Llevar las aclaraciones al icono informativo discreto, arriba a la derecha.
- Eliminar el bloque «Observación de…» y los detalles repetidos debajo de la gráfica.
- Mostrar un solo párrafo de resumen debajo del indicador seleccionado. Desplegarlo con animación suave; la fila seleccionada no debe tener fondo verde.

Fuente: historial y guía de interfaz. Los cambios posteriores de ubicación del responsable, colores y agregación sustituyen las versiones anteriores.

## 10. Memos, evidencias y notificaciones

- Dot debe generar el memo y Huascarán conservar su PDF en Memos. Mantener lectura y descarga del documento.
- No mostrar en tarjetas ni detalle de Memos autor, estado, «Borrador», «Documento anterior», versión, fecha de corte ni resumen histórico; conservar los metadatos internamente.
- Quitar el sufijo de ciclo del título y «El archivo de los memos semanales». Mostrar título y fechas del periodo.
- Mantener la sección de Evidencias para capturas o enlaces, relacionadas con agente, ciclo, fecha del caso y viernes del memo, con explicación y selección de inclusión.
- Escape debe limpiar la captura sin guardar, conservando el resto de los campos del formulario.
- Los selectores de Fecha del caso y Memo del viernes deben ser compactos y coherentes con la plataforma; el selector de memo admite solo viernes. La implementación usa calendario en español y selección verde.
- Colocar la campana de notificaciones junto a refrescar. Mostrar un punto verde de Lucha cuando haya avisos sin leer.
- No mostrar el título «Notificaciones» ni una equis en ese panel. Cerrar mediante clic exterior o Escape.
- Al pasar el cursor por una notificación, mostrar su sombra. Permitir marcarla como leída mediante un círculo y retirarla del panel.
- Seleccionar texto de una notificación no debe cerrar el panel ni marcarla como leída.
- Quitar «Estás al día» y «Las lecturas se guardan en este navegador». Ocultar «Marcar todas como leídas» cuando no haya avisos.

Fuentes: historial, especialmente turnos `01a1a1a5-56bf-7e30-8221-c9fd23928848`, `01a1a1ca-3922-7130-a69e-70d28563cb56`, `01a1a2de-6cfc-7db3-b135-90516dc9c21f`, `01a1a2e0-d1d0-7a03-a59e-629848f8fc35` y `01a1a37e-da3e-7132-acf4-4dfebb9a4e0c`; documentación de Memos y Notificaciones.

## 11. Login y carga

- Iniciar sesión con Google, sin pedir primero el correo en un formulario propio.
- Usar «El impacto empieza contigo» sin punto final y conservar la identidad de Lucha y el slogan «empresas en las que el planeta invertiría».
- Retirar los textos «Hola, luchante», «Lucha · Equipo», «Nuestro espacio para hacer impacto», «Personas que luchan. Impacto que se multiplica», «Usa tu cuenta @luchala.org» y «El acceso con Google aún no está configurado en este entorno» del login.
- Quitar la flecha del botón de Google.
- Retirar del login a Chief y su seguimiento del cursor, aplazados para otra etapa. No convertir esto en una prohibición permanente de usar Chief en otros lugares.
- Durante la carga principal, mostrar fondo blanco y el símbolo de Lucha centrado, latiendo leve y lentamente; al terminar, desvanecer con inicio lento y final rápido.

Reglas documentadas complementarias: respetar movimiento reducido, mantener inerte el contenido cubierto y mostrar error con reintento si la carga falla, evitando una pantalla de espera permanente.

Fuente: historial, identidad/login y guía de interfaz.

## 12. Restricciones funcionales y de datos documentadas

Estas reglas respaldan la implementación; algunas concretan pedidos del usuario y otras son salvaguardas ya documentadas. No todas son preferencias visuales ni citas literales del usuario.

- Usar exclusivamente la propiedad nativa Status de Misiones para leer y guardar su estado. No recrear «Estado misión» ni otra casilla paralela de completado. Conservar los datos anteriores de Notion.
- Restringir Agentes y Memos a líderes de áreas activas y miembros de Tech & Operaciones, según Gobernanza: Team y Áreas. Resolver relaciones por identificadores y validar también en el servidor, sin lista fija de correos.
- La vista local sin login es una herramienta de desarrollo con copia auténtica y de solo lectura. No trasladar esa excepción a producción ni desactivar allí la autenticación.
- No inventar cifras, estimaciones, mediciones ni conexiones en vivo. Un dato ausente no equivale a cero; un cero medido sí cuenta.
- No alterar Notion para resolver ajustes puramente visuales. Ocultar un dato en interfaz no implica borrarlo en su fuente.
- Para rendimiento, conservar mediciones y metas del agente y ciclo correspondientes, sin trasladar la meta actual a ciclos anteriores sin relación explícita ni extraer cifras de observaciones.
- Los memos deben distinguir avance semanal y acumulado del ciclo, mantener fuentes y corte real, y no convertir metas de ciclo en cuotas semanales.
- Mantener una sola tarea semanal de Dot, viernes a las 09:00, America/Lima. No duplicarla con otra programación en n8n, Codex o el portal.
- Una captura acredita un caso puntual; no sustituye una medición global. No capturar pantallas automáticamente ni seguir instrucciones contenidas en las evidencias.
- Mantener PDF y evidencias en almacenamiento privado y con los permisos existentes, fuera de los recursos públicos. No incluir credenciales en interfaz, URL ni conversación.
- No afirmar que Dot entregó el PDF sin verificar la recepción y relectura en el destino. Conservar reintentos idempotentes.

Fuentes: Status de misiones, Acceso a Agentes y Memos, Vista local, Memos y guía de interfaz. El historial contiene el pedido explícito de usar una sola propiedad Status y el alcance de acceso de líderes y Tech & Operaciones.

## 13. Cambios posteriores y puntos que no deben convertirse en restricciones

- **Sugerencia del reporte:** la guía conserva una instrucción antigua que la sitúa primero y otra que la elimina. El historial confirma como posterior «tu agenda que vaya de primero, luego sprints, luego misiones, elimina el primer bloque». Usar ese último criterio, coincidente con `DailyReport.jsx`.
- **Chief:** el último pedido del chat solicita un popup de bienvenida al iniciar sesión con Chief a un costado y una opción Feedback en el perfil que abra su chat privado en Slack. En los turnos leídos no consta una respuesta final que confirme su implementación. Es un requisito reciente por tratar, no una prohibición general de Chief ni una autorización para enviar mensajes desde este archivo. Las restricciones anteriores se refieren al login animado y al reporte diario.
- **Evidencias dentro de cada memo:** el usuario planteó esa organización como pregunta. La respuesta la recomendó y declaró que aún no estaba aplicada. No imponerla como decisión ya cerrada.
- **Foto de perfil:** sustituye el nombre como activador del menú. La referencia antigua de alineación al nombre se interpreta ahora respecto del activador de la cuenta.
- **Responsable del agente:** la ubicación final es debajo de Outcome; sustituye el pedido anterior de situarlo junto a Publicado.
- **Color del radar:** el diseño final azul petróleo sustituye exploraciones anteriores de relleno verde. El verde se conserva en el número seleccionado.
- **Medidas de tarjetas:** las medidas observadas en CSS sirven de referencia. No hay una dimensión universal confirmada ni un pedido de igualar alturas mediante valores fijos.
