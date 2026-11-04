# Identidad de Lucha

Base recopilada el 4 de noviembre de 2026. Los activos y valores proceden del material de marca documentado en Huascarán el 2 de noviembre. No se realizó una nueva auditoría completa de la marca para crear este paquete.

## Fuentes y alcance

- [Brand de Lucha en Notion](https://app.notion.com/p/lucha/Brand-380c414dc9f280659c35df47b7ea0b27).
- [Web oficial](https://www.luchala.org/).
- [Documentación de identidad de Huascarán](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/login-assets.md).
- [Decisiones de interfaz documentadas](https://github.com/luchasomostodos/huascaran/blob/7d7ad9ec5905ccbdd32a489249e3fbc2650ecf65/docs/ui-guidelines.md).

La paleta, los logos, las familias tipográficas y el slogan se registran como identidad existente. Las restricciones de mayúsculas, bordes y compacidad son preferencias compartidas del usuario, extraídas del desarrollo de Huascarán y reutilizadas para futuras webs por su pedido actual. No atribuirlas a un manual corporativo de marca.

## Paleta registrada

| Uso | Valor | Procedencia |
| --- | --- | --- |
| Azul principal | `#15528D` | Material de marca documentado |
| Verde principal | `#B4E280` | Material de marca documentado |
| Verde secundario | `#76C58A` | Material de marca documentado |
| Fondo de interfaz | `#FFFFFF` | Preferencia de Huascarán, base compartida |
| Borde neutro | `#DEDEDE` | Implementación de referencia de Huascarán |
| Foco neutro | `#444444` | Implementación de referencia de Huascarán |

Los dos últimos colores son valores técnicos de partida, no colores oficiales añadidos al brand. Mantener contraste legible; el verde principal funciona como fondo de selección con texto oscuro, no como texto pequeño sobre blanco.

El degradado usado en la cabecera de Huascarán se obtuvo del banner «¿Te sumas?» de la web oficial:

```css
linear-gradient(167deg, #0469b6, #03508a 51%, #000)
```

Puede reutilizarse en una cabecera o superficie de marca cuando corresponda. No es obligatorio agregar una barra superior con este degradado a cualquier landing o campaña.

## Logos incluidos

| Archivo | Uso |
| --- | --- |
| `assets/lucha-logo-blue.png` | Logo horizontal azul sobre fondo claro |
| `assets/lucha-logo-white.png` | Logo horizontal blanco sobre fondo oscuro o azul |
| `assets/lucha-favicon.png` | Favicon de 32 × 32 px registrado en Huascarán |

Las rutas se resuelven desde la carpeta del skill. Son copias exactas de `public/brand/` del proyecto Huascarán, no versiones generadas. Mantener la relación de aspecto y el encuadre. El logo blanco tiene además esta [fuente publicada](https://ik.imagekit.io/2bvykimun/lucha-logo-blanco-horizontal.png).

El uso exclusivo del símbolo, sin el texto del logo, fue una decisión de la cabecera de Huascarán. Para otro sitio elegir la variante auténtica adecuada a su composición.

## Tipografía

- Familias de marca documentadas: MADE Tommy Soft Bold y Assistant Regular/Bold.
- En Huascarán se aplicaron al login; el cuerpo del portal existente usa DM Sans. Esa diferencia no constituye una nueva familia oficial.
- En una web nueva, partir de las familias de marca que el proyecto tenga habilitadas. En una web existente, conservar su sistema tipográfico salvo que el encargo incluya migrarlo.
- Los campos, botones, desplegables y placeholders heredan la tipografía de su contexto; evitar que adopten por accidente otra fuente.
- No se distribuyen fuentes binarias en este paquete. El archivo MADE registrado en el proyecto llevaba el nombre `MADE_Tommy_Soft_Bold_PERSONAL_USE.otf`; su copia local no acredita una licencia de redistribución. Obtener las fuentes desde el canal de marca con los derechos correspondientes al proyecto.

## Voz

- Español claro, cercano y comprensible para personas no técnicas.
- Encabezados y etiquetas en estilo oración, sin mayúsculas decorativas ni rayas largas.
- Slogan registrado: «empresas en las que el planeta invertiría».
- «El impacto empieza contigo» fue un texto creado para el login de Huascarán, no un slogan obligatorio para todos los sitios.
- Explicar acciones y estados con mensajes breves. No repetir el título de una sección como subtítulo ni llenar el flujo de detalles de implementación.
