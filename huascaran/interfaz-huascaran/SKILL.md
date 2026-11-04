---
name: interfaz-huascaran
description: Crear, modificar o revisar la interfaz de Huascarán conservando sus restricciones de navegación, filtros, tarjetas, detalles, reporte diario, agentes, memos y notificaciones. Usar solo para el producto Huascarán; no trasladar estas reglas funcionales a otras webs de Lucha ni activar por tareas de backend sin impacto en la interfaz.
---

# Interfaz de Huascarán

Mantener las decisiones de interfaz del producto sin confundirlas con las reglas generales de marca de Lucha.

## Consultar antes de cambiar una pantalla

Revisar las instrucciones actuales del proyecto y [los lineamientos recopilados](references/lineamientos.md). Esta referencia corresponde al 4 de noviembre de 2026; los pedidos nuevos del usuario pueden modificarla. Consultar primero su sección 13 para identificar cambios posteriores, contradicciones y preguntas que no se cerraron.

Leer las secciones relevantes a la tarea:

- Secciones 1 a 3: escritura, identidad, densidad y medidas. Distinguir las medidas documentadas de las observadas en CSS.
- Secciones 4 a 7: cabecera, navegación, contexto de ciclo y responsable, filtros, tablas, sprints y misiones.
- Secciones 8 a 11: reporte diario, agenda, agentes, rendimiento, memos, evidencias, notificaciones, login y carga.
- Sección 12: restricciones funcionales que la interfaz debe respetar, sin dar autorización para modificar permisos, datos o infraestructura.

## Invariantes de interfaz

- Textos en estilo oración, sin palabras completas en mayúsculas como decoración ni rayas largas. Bordes y sombras neutros, con foco visible.
- Fondo blanco, cabecera con el degradado de Lucha y selecciones con su verde principal. Reutilizar componentes y tokens existentes.
- Controles compactos con zonas táctiles suficientes. No imponer el mismo ancho o altura fija a todas las tarjetas.
- Conservar ciclo, responsable y filtros compatibles al navegar. El responsable inicial es la persona autenticada, no una persona fija.
- Títulos de misión abren el detalle interno. Comentar avance aparece solo dentro del popup, sin expandir las tarjetas de fondo ni mover el contenido con hover.
- Las tablas mantienen anchos al ordenar, alineación izquierda y scroll contenido en móvil. Los desplegables no se cortan en los diálogos.
- Reporte diario conserva el orden Agenda, Sprints y Misiones. No reintroducir el bloque de Sugerencia retirado ni funcionalidades de Chief en ese reporte por iniciativa propia.
- Respetar las reglas de agregación de indicadores: promedio cuando corresponda, sin sumar porcentajes ni representar ausencia de datos como cero.

## Resolver el alcance

Una modificación visual no autoriza cambios en Notion, permisos, automatizaciones, entregas de memos, despliegues o mensajes. Conservar los datos originales al normalizar su presentación.

El skill compartido `identidad-lucha` aporta los logos y criterios generales si está disponible. Este skill incluye los lineamientos de Huascarán en su propia referencia y puede consultarse sin depender de una ruta absoluta ni de otra instalación.

No implementar preguntas o recomendaciones históricas como requisitos confirmados. En especial, revisar la fecha y el estado de los pedidos sobre Chief y evidencias dentro de cada memo.

Al terminar una modificación, comprobar la pantalla afectada en escritorio y móvil, sus filtros y apertura/cierre de detalles, el teclado y los estados de hover y foco. Registrar los cambios de reglas en la documentación del proyecto dentro del alcance solicitado.
