# Criterios de interfaz compartidos

Preferencias extraídas del desarrollo de Huascarán, adaptadas para futuras webs de Lucha por el pedido del 4 de noviembre de 2026. Las medidas son puntos de partida para interfaces de producto; una landing puede necesitar otra escala de títulos y espacios.

## Componentes y densidad

| Elemento | Base de referencia | Alcance |
| --- | --- | --- |
| Menús compactos | Filas de 32 px | Escritorio con puntero preciso |
| Texto de menús | 14 px, interlineado de 20 px, peso 400 | Opción activa con peso 600 |
| Iconos de menús | 16 px, separación de 8 px hasta el texto | Mantener proporciones y alineación |
| Área táctil | Al menos 44 × 44 px | Ampliar el área interactiva sin volver voluminoso el dibujo |
| Controles de solo icono | 44 × 44 px | Etiqueta accesible y tooltip cuando ayude |
| Cuerpo de detalles | 14 px y peso 400 | Referencia de detalles compactos |
| Etiquetas de detalles | 12 px y peso 600 | Mantener jerarquía sin negritas arbitrarias |
| Bordes de superficies | 1 px neutro | Usar tokens del proyecto |
| Radios de tarjetas | 14 a 16 px | Referencia observada; decidir por tipo de componente |

No hay un ancho ni un alto universal de tarjeta. Definirlos según contenido, cuadrícula y dispositivo. Evitar alturas fijas que corten datos. Conservar las medidas particulares del proyecto cuando ya estén acordadas.

## Estados y capas

- Mantener bordes y sombras neutros también en hover, seleccionado y error. El foco debe seguir visible.
- Usar verde principal de Lucha en selecciones, con contraste de texto suficiente. Los mensajes de error y estados semánticos pueden usar texto e iconos apropiados sin colorear los bordes de las cajas.
- La restricción de bordes se refiere a componentes de interfaz, no a los trazos de una gráfica ni a los detalles del logo.
- Los menús dentro de diálogos deben mostrarse en una capa superior, abrir arriba o abajo según el espacio y permitir desplazamiento si no caben completos.
- No usar la animación de hover de una tarjeta exterior en el contenido de un popup. Abrir un formulario dentro de un diálogo no debe modificar las filas del listado de fondo.
- Conservar teclado, Escape, clic exterior y restauración del foco cuando correspondan al componente. Quitar una equis visible de un popup no es una regla general para todos los diálogos.

## Contenido y navegación

- Mantener un único lugar claro para cada acción de navegación; evitar duplicar botones en cabecera, menú y filtros.
- Al cambiar una vista o filtro, conservar el contexto compatible. Para estados que deban compartirse o sobrevivir a una recarga, usar enlaces y URL coherentes con el proyecto.
- Las tablas no deben cambiar el ancho de sus columnas al ordenar. Alinear el texto a la izquierda y los valores al centro vertical; adaptar columnas numéricas cuando el proyecto lo necesite.
- En móvil, contener el scroll horizontal de tablas sin desbordar la página.
- Diferenciar cero, dato ausente y carga. No inventar estimaciones ni mostrar un cero como sustituto de información no disponible.
- No añadir contadores, subtítulos, instrucciones o enlaces externos redundantes. Un dato operativo útil puede permanecer aunque en Huascarán se haya retirado un texto parecido.

## Movimiento y accesibilidad

Mantener transiciones discretas y respetar `prefers-reduced-motion`. En Huascarán se definieron pulso de carga de 2,8 s y escala máxima 1,04, desvanecimiento de 620 ms y despliegue de resumen de 320 ms. Esos tiempos corresponden a sus componentes; no imponerlos a toda animación de otra web.

Comprobar con teclado los controles modificados y conservar nombre accesible en botones de solo icono. No eliminar el foco para lograr una apariencia limpia.

## Lo que permanece en cada proyecto

El orden de módulos, los nombres de filtros, la presencia de footer, los permisos, los estados de Notion, las reglas de indicadores, el contenido de un memo y las excepciones de una pantalla deben vivir en las instrucciones o documentación del producto. Un nuevo proyecto de Lucha no necesita heredar la estructura funcional de Huascarán.
