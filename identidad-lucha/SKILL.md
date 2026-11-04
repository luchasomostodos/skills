---
name: identidad-lucha
description: Crear, modificar o revisar interfaces web de Lucha conservando su identidad visual, estilo de escritura y criterios de interfaz. Usar para webs, landing pages, portales y aplicaciones identificados como productos de Lucha. No aplicar a otras marcas ni a tareas de backend sin impacto en la interfaz.
---

# Identidad de Lucha

Mantener una identidad reconocible entre productos de Lucha, adaptando la composición al propósito de cada web. No convertir las pantallas de Huascarán en una plantilla obligatoria para todos los proyectos.

## Contexto y referencias

1. Revisar las instrucciones del proyecto, sus componentes y sus tokens existentes antes de cambiar una interfaz. Los pedidos explícitos actuales del usuario pueden modificar los lineamientos.
2. Leer [Identidad](references/identidad.md) para colores, logo, tipografía y voz. Allí se distingue la información de marca de las preferencias de interfaz.
3. Para menús, tarjetas, filtros, tablas, formularios o diálogos, leer [Interfaces](references/interfaces.md). Sus medidas de referencia se adaptan al proyecto; no son tamaños fijos para todas las webs.
4. Reutilizar componentes y tokens del proyecto. En un proyecto nuevo, [tokens.css](assets/tokens.css) ofrece una base sin framework ni estilos globales automáticos.

## Restricciones compartidas

- Escribir textos y encabezados en estilo oración. No usar palabras enteras en mayúsculas como recurso visual, ni `text-transform: uppercase`. Mantener identificadores técnicos y datos originales cuando deban conservarse exactamente; no alterar registros para cambiar su presentación.
- No usar rayas largas en los textos de interfaz. Usar puntos, comas o paréntesis y «al» para los periodos.
- No usar bordes, contornos, sombras ni subrayados de selección de color en botones, tarjetas o cajas, incluidos hover, selección, foco y error. Mantener el foco visible con un contorno neutro; sobre una superficie azul puede ser blanco por contraste.
- Expresar los estados mediante texto, iconos y fondos semánticos; no depender solo del color. Usar el verde principal de Lucha para las selecciones, con texto oscuro legible.
- Usar los logos auténticos. Conservar proporciones y no reconstruir el símbolo como texto o dibujo aproximado.
- Mantener controles compactos, tipografía coherente y separación suficiente. Evitar títulos, contadores, explicaciones y controles duplicados.
- No desplazar el contenido interior de un diálogo al pasar el cursor. Los desplegables deben caber en la ventana y quedar sobre el contenido del diálogo.
- Las acciones de detalle deben mantener el contexto de navegación. No sustituirlas por enlaces a herramientas externas salvo que esa sea la acción pedida.

## Límites del alcance

- El fondo blanco es la base de interfaz documentada. La composición de una campaña o landing puede usar superficies de marca si el encargo lo requiere; no introducir automáticamente un tema oscuro ni imponer la cabecera de Huascarán a toda web.
- Conservar las dimensiones de tarjetas, nombres de módulos, reglas de permisos, integración con Notion, lógica de indicadores y comportamiento de datos en la documentación de cada producto.
- No extender a toda Lucha decisiones locales como quitar un footer, usar la etiqueta Status, ocultar filtros de área, retirar una equis específica o prohibir a Chief en una pantalla.
- No añadir autenticación, automatizaciones, integraciones, publicación ni permisos nuevos por aplicar este skill. Implementar únicamente el trabajo solicitado.

## Comprobación de la interfaz cambiada

Revisar escritorio y móvil, foco con teclado, contraste y los estados de hover, selección y error de los componentes modificados. Confirmar que no se hayan introducido bordes cromáticos, mayúsculas decorativas, desbordamientos ni controles duplicados. Respetar movimiento reducido al añadir animaciones.

Cuando se acuerde una nueva regla, registrar si corresponde a la marca, a una preferencia compartida o solo al proyecto. No promover automáticamente un ajuste local a regla general.
