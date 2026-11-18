# Visual Standards
00_Reference / visual. Read before producing or reviewing any visual, dashboard, deck, or HTML.

## General
- Clean white layouts. La tipografía y micro-tipografía (fuente, numbered markers, letter spacing) siguen el brand skill del entregable: lucha-brand para LUCHA, y el skill de marca que corresponda para cualquier otra marca. No declarar tokens tipográficos que compitan aquí.
- No emojis in rendered output. The semaforos (verde, amarillo, rojo, gris) are internal signals only (logs, conversation), never in rendered HTML. Use the template's color classes instead.

## Brand systems (owned by skills, do not duplicate tokens here)
- LUCHA brand: use the lucha-brand skill (MADE Tommy Soft, Nunito web fallback, white layouts, LUCHA palette).
- Other brands (e.g. a tech-consultancy brand): use that brand's own style skill.

## 60dB dashboard system (impact data dashboards)
- Background cream #FDF6EE plus white cards. Accent coral #F05A47. Text navy #1A1F36.
- Fonts: DM Serif Display italic (big numbers, quotes) plus Inter (everything else).
- Stat cards: coral number 48 to 64px plus grey label 13px. Horizontal bars: coral fill, dotted grey benchmark. Quote blocks: serif italic, text only.
- No pie charts. No data without a benchmark. Hero sections: navy background, coral accent.

## PPTX
- Calibri font for Keynote compatibility. Workflow: pptxgenjs local, output to /home/claude, convert to PDF via soffice, rasterize with pdftoppm at 110dpi for QA, copy final to outputs.

## PDF
- Salto de página por bloque: si un hallazgo, recomendación o sección no cabe completa en el espacio restante de la página, empezarla en página nueva. Nunca dejar un bloque cortado entre dos páginas (en reportlab: envolver cada bloque en KeepTogether).
