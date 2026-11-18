---
name: lucha-brand
description: Aplica el sistema de marca de LUCHA Impact Studio (Control Tower, "LuchIA") al producir cualquier artifact, dashboard, tablero, panel vivo, one-pager, HTML o componente React que represente a LUCHA. Dispara cuando el usuario diga "LUCHA", "Lucha", "marca Lucha", "aplica la marca", "on-brand", "estilo LUCHA", "modo luchante", o mencione el vocabulario de LUCHA (Impact Studio, Equipo Luchante, Fondo Luchante, Método Lucha, Access/Climate Tech, Green Zebra) o de la cabina interna (/equipo, KPIs Studio, Mapas Luchantes, Portafolio, Tablero de Control Legal, semáforo, cabina, backoffice). Úsalo aunque no diga "marca": si el entregable representa a LUCHA, debe ir on-brand. Incluye neutros papel cálido (light + dark), paleta, tipografía (MADE Tommy Soft, fallback Quicksand, máx Medium), el semáforo (la firma), tokens, componentes, dos UI kits (Mapas, Portafolio) y checklist. NO dispares para otras marcas (Sabbi, Yichang, Lanzark).
---

# LUCHA Brand — Control Tower (LuchIA)

LUCHA es una organización latinoamericana de inversión de impacto. "Impact first y for profit, empresas en las que el planeta invertiría." Este skill es el sistema visual del **producto interno** de LUCHA Impact Studio: la cabina de control del `/equipo` (KPIs Studio, Mapas Luchantes, Portafolio, Tablero de Control Legal). El look es un **dashboard denso y calmo**: ink y grafito sobre **papel cálido** (la "torre de control"), tarjetas blancas, la paleta de marca como acento, el **mint** como acento firma y el **semáforo** como estado. Corre en **light y dark**. Se siente a software de trabajo, no a landing.

> Linaje: reemplaza el sistema **AURORA 2.0** (decisión del equipo de LUCHA, 2026-06-25). Si necesitas el AURORA anterior (oscuro, aurora animada, vidrio, modos doc/pptx), está respaldado en el workspace como `2026-06-25-lucha-brand-AURORA-backup.md`.

## Quick start

1. Enlaza los tokens: `assets/tokens.css` (un solo archivo trae color light+dark + tipo + spacing + semáforo).
2. Carga la tipografía en el `<head>` (ver Tipografía). En live artifacts, omite el `<link>` y deja el fallback.
3. Abre `assets/showcase.html` como **referencia viva** del look, con toggle light/dark: paleta, semáforo, escala tipográfica, componentes, KPI hero y tabla densa. Replica de ahí.
4. Arma la superficie con los Patrones de abajo; para producción mira los UI kits en `references/ui-kits/`.
5. Corre el Checklist de cierre antes de entregar.

## Filosofía visual

- **Papel cálido y denso.** Lienzo papel cálido (`hsl(40 24% 96.5%)`), tarjetas blancas con borde hairline y sombra muy suave. La densidad de cabina viene de la escala de 14px y el ritmo de 4px, no de apretar todo. En dark, lienzo slate profundo (`hsl(215 28% 9%)`) y tarjetas grafito.
- **El neutro carga la página; la marca es acento.** El 90% del lienzo es neutro cálido. El **mint `#8fe2a1` es el acento firma** (sobre ink: logo, tab activo, botón primario; en dark voltea a fondo mint con texto oscuro). Verde/azul para datos y destacados. El **rosa `#f0316a` es para alerta/dato en rojo**, nunca decorativo.
- **El estado se lee, no se adivina.** Todo KPI y empresa cargan un semáforo: punto de color **+ palabra**. Nunca solo el color (accesibilidad).
- **Números curados.** Compactos, tabulares (`font-variant-numeric: tabular-nums`), alineados a la derecha en tablas. `$48.2M`, `71`, `82%`.
- **Tres direcciones de densidad/mood** que comparten los mismos tokens: **Estudio** (aireado, narrativo), **Cabina** (denso, operativo, el default del tablero), **Bitácora** (lista/registro). Elige una por superficie; no las mezcles.

## Color

Neutros **papel cálido** ("torre de control": ink/grafito sobre papel cálido, lo que usan las pantallas reales del tablero) + la paleta de marca LUCHA. Todos los valores viven en `assets/tokens.css`, en light y dark.

> Nota: el export traía dos paletas — el slate frío del shell de la app y el papel cálido de los tableros. Este sistema usa el **papel cálido**, que es lo que se ve en Portafolio y Mapas. Si alguna vez quieres el slate frío del shell, está documentado y se cambia en `tokens.css`.

### Neutros (estructura) y datos

| Rol | Token (light) | Uso |
|---|---|---|
| Lienzo | `--color-bg` `hsl(40 24% 96.5%)` | fondo de página (papel cálido) |
| Tarjeta | `--color-surface-card` `#fff` | toda superficie de panel |
| Card-2 / Muted | `--color-surface-card-2` / `--color-surface-muted` | header de tabla, fondos sutiles, barras base |
| Borde | `--color-border` `hsl(38 16% 88%)` (hairline 1px) | tarjetas, divisores, tablas |
| Tinta | `--color-fg` `#0e1c2b` (ink de marca) | títulos y texto principal |
| Texto muted / subtle | `--color-text-muted` / `--color-text-subtle` | meta, captions, s/d |
| Datos / cohortes | `--color-chart-1..3` (azul, teal, verde) | series, gráficos, cohortes |

### Paleta de marca (del brand deck)

| Nombre | Hex | Uso |
|---|---|---|
| Ink | `#0e1c2b` | chip de logo, superficies "ink-fill", tinta de marca |
| Mint | `#8fe2a1` | **acento firma**: texto/glyph sobre ink, progreso, estado activo; en dark, el fondo del acento |
| Verde | `#6ed48e` | acento de datos, destacados |
| Azul | `#1c3e8e` | acento estructural, cohorte/datos |
| Forest | `#2d5749` | acento profundo |
| Rosa | `#f0316a` | **solo alerta / dato en rojo / el ask**. Nunca decorativo |

Washes suaves de marca: `--brand-verde-soft`, `--brand-mint-soft`, `--brand-rosa-soft`.

**Regla de jerarquía:** neutros estructuran, mint es el acento firma (verde/azul para datos), rosa es la única señal de alerta. Si todo es de color, nada resalta.

## Semáforo — la firma

El indicador de estado de toda la cabina. Cada KPI / empresa carga uno de cuatro estados. Cada estado trae **punto** (fill), **texto** y **fondo soft** para pills. Tokens en `tokens.css` (`--semaforo-*`), con set propio para dark.

| Estado | Significado | Dot | Score |
|---|---|---|---|
| **verde** | Cumple | emerald-500 | `score ≥ 70` |
| **amarillo** | Por cumplir | amber-400 | `55 – 69` |
| **rojo** | No cumple | rose-500 | `< 55` |
| **gris** | Sin datos | zinc-400 | s/d |

Derivado: `semOf(score) = score≥70 ? 'verde' : score≥55 ? 'amarillo' : score!=null ? 'rojo' : 'gris'`.

**Alcance** (% de meta), pill suave coloreada por umbral: `≥100% verde · ≥70% amarillo · <70% rojo · null → "—"`.

Reglas no negociables del semáforo:

- Siempre **punto + palabra**, no solo color.
- Sin datos = punto gris o `·`, **nunca 0**.
- El punto lleva un anillo del color de la superficie (`box-shadow:0 0 0 2px var(--color-surface-card)`) para separarlo de la fila.

## Tipografía

**Una sola familia para todo, incl. números.** Tipo de marca: **MADE Tommy Soft** (geométrica suave). No viene en este skill (los `.otf` son "personal use" y no están en Google Fonts), así que el fallback documentado para artifacts es **Quicksand** y luego `system-ui`. Para producción con la licencia real, embebe MADE Tommy Soft y usa `references/tokens-original/`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap" rel="stylesheet">
```
```css
--font-sans: "MADE Tommy Soft", "Quicksand", system-ui, -apple-system, "Segoe UI", sans-serif;
```
En **live artifacts** no se permiten URLs externas: quita el `<link>` y deja el fallback (`system-ui` sostiene el layout). Agrega `color-scheme` al `:root` (light, o dark cuando `data-theme="dark"`).

Escala (px, densidad de dashboard): `10` eyebrow · `12` meta · `14` cuerpo/tabla · `18` narrativa · `20` sección · `24` título · `30` conteo · `48-60` KPI hero.

**Sin negrita. El peso máximo de marca es Medium (500).** Body en Light (300) / Regular (400); títulos, labels, números y KPIs en **Medium 500, nunca más**. En el producto real (MADE Tommy Soft) los pesos 500/600/700 renderizan TODOS como Medium; por eso con el fallback cargamos solo Quicksand `300;400;500` y los tokens `--fw-semibold`/`--fw-bold` valen 500. Tracking apretado en títulos (`-0.02em`), amplio en eyebrows mayúsculas (`0.1em`).

## Spacing, forma y movimiento

- **Ritmo 4px** (`--space-*`). Padding de tarjeta 18–22px; celdas de tabla 9–11px.
- **Radius:** inputs/botones `6px`, tarjetas/tablas `12–14px`, hero `16–24px`, pills/dots `full`.
- **Bordes hairline 1px** + **sombras restringidas** (`--shadow-card`, nunca elevación "Material").
- **Layout:** columna centrada `--layout-max: 77.5rem` (1240px). Desktop-first (1280+); las tablas densas hacen scroll horizontal en pantallas chicas.
- **Motion:** `--ease-out` con `--dur` 200ms. Transiciones sutiles de color/opacidad; nada de parallax ni rebotes.

## Componentes

Código exacto en `references/components/` (core: Button, Card, Input, Badge · data: SemaforoDot, AlcancePill) y render en `assets/showcase.html`. Resumen:

- **Button**: variantes `default` (ink+mint, la primaria de marca), `secondary`, `outline`, `ghost`, `destructive`, `link`; tamaños `default`/`sm`/`lg`/`icon`. Alto 2.5rem, radius 6px, font Medium, foco con doble anillo (`ring`). En dark, la primaria voltea a fondo mint con texto oscuro.
- **Input**: alto 2.5rem, borde hairline, anillo suave en foco.
- **Badge**: `default` (ink+mint), `secondary` (muted), `outline`, `success` (verde soft). Modo `uppercase` para eyebrows (10px, tracking amplio). Pill `radius-full`.
- **Card** + `CardHeader/Title/Description/Content/Footer`: superficie hairline + `--shadow-card`, radius 12–14px. El contenedor de todo panel.
- **SemaforoDot**: punto con anillo + etiqueta (Cumple / Por cumplir / No cumple / Sin datos). `estado` null → `—`.
- **AlcancePill**: % de meta, color por umbral, `tabular-nums`, `min-width` para alinear en columnas.

## Patrones armados

- **KPI hero:** tarjeta con label (eyebrow 10px), número grande (48px Medium, tabular), meta (12px muted) y **barra de progreso 4px** (mint por defecto; teal/amarillo según el dato). 3 por fila.
- **Tabla densa:** header en `card-2` con micro-heads mayúsculas 10px; filas con borde superior hairline, hover en lienzo; columnas numéricas a la derecha y tabulares; estado por SemaforoDot; meta por AlcancePill; fila de totales en `card-2`. Envuelta en una tarjeta con `overflow:hidden`.
- **Estados vacíos/parciales** (centrales en la cabina): empresa sin mapa → solo cabecera + métricas; sub-indicador s/d → celda `·` gris (no 0); serie con `null` → punto hueco, no extrapola.
- **Light/Dark:** todo va por token semántico (cero hex en el markup), así el mismo código sirve en ambos temas. Ver **Modo oscuro**.

## Modo oscuro

Pon `data-theme="dark"` en `<html>` (o en el contenedor raíz) y todos los tokens cambian. Valores reales de los kits:

- **Lienzo** `hsl(215 28% 9%)` · **tarjeta** `hsl(215 24% 12.5%)` · **card-2** `hsl(215 22% 15.5%)` · **borde** `hsl(215 16% 25%)`.
- **Texto** off-white cálido `hsl(40 18% 90%)`; muted `hsl(215 12% 64%)`; subtle `hsl(215 12% 48%)`.
- **El mint es el único acento.** Las superficies "ink-fill" del light (logo, tab activo, botón primario, chips de sección, avatar) **voltean a fondo mint con texto oscuro** (`hsl(215 32% 10%)`). En CSS basta usar los tokens: `--color-primary` pasa de ink a mint, así que un botón con `background:var(--color-primary);color:var(--color-primary-fg)` se voltea solo.
- **Semáforo:** los puntos se mantienen; los `*-soft` pasan a tonos profundos y los `*-text` se aclaran (p. ej. verde-soft `hsl(150 30% 15%)` / verde-text `hsl(150 52% 62%)`).
- **Toggle:** sol/luna que alterna `data-theme`, **en memoria** (sin `localStorage`). El `showcase.html` trae uno listo para copiar.
- En **.docx/.pptx** no hay dark mode; ahí siempre light.

## UI kits de referencia (producción)

Para construir las superficies reales del `/equipo`, no inventes: parte de los kits en `references/ui-kits/`.

- **`mapas/`** — Mapas Luchantes: matriz de decisión, mapa LatAm, live feed, heatmap de 7 dimensiones, y la ficha tipo BMC por empresa.
- **`portafolio/`** — Portafolio / Tablero de Control Legal: filtros, KPI cards, valuación y stake Q-a-Q, composición, control legal. Trae el bloque dark real (`port-theme.css`).
- **`references/handoff/`** — los handoff docs (árbol de archivos, contrato de datos, estados, interacciones, flags) para portear los kits a Tailwind/TSX sin re-decidir diseño.

Los kits usan CSS custom (`.mp-*`/`.port-*`, vars `--p-*`/`--semaforo-*`), **no** Tailwind. Léelos como spec de comportamiento pixel-exacto; el port a Tailwind-only es trabajo aparte. Ojo: hardcodean `font-weight:600` que en MADE Tommy Soft = Medium; con Quicksand, trátalo como 500.

## Restricciones de runtime (artifacts)

- **Nada de `localStorage` ni `sessionStorage`.** Estado en memoria (React `useState`); el toggle de tema también en memoria.
- En **React**, solo utilidades Tailwind core; para control fino del look, HTML self-contained con un `<style>` es lo más fiel.
- **Google Fonts** solo vía `<link>` en HTML estático; en live artifacts se quita y queda el fallback.
- Un solo archivo self-contained por entregable; sin CSS externo salvo `assets/tokens.css` cuando aplique.

## Voz y copy

- **Español** por defecto, **cálido y curado**, sin relleno.
- **Sin emoji.** Nunca, ni en copy ni en mocks.
- Afirmaciones, no preguntas. "Validamos la base con data real", no "¿Cómo validar?".
- Números compactos y tabulares; el estado lo llevan el punto y la palabra.
- Vocabulario LUCHA: Método Lucha, Fondo Luchante, Equipo Luchante, Impact Studio, Access Tech / Climate Tech / Green Zebra, semáforo, cabina.
- Sin em dashes (usa comas, dos puntos o dos oraciones). Sin jerga VC genérica (unicorn, 10x, disrupt, sinergia). Sin signos de exclamación salvo rarísima invitación.

## Trabajar con el usuario

1. Identifica la superficie (KPIs Studio / Mapas / Portafolio / vista nueva) y la dirección (Estudio/Cabina/Bitácora). Confirma solo si es ambiguo.
2. Para **mocks/prototipos**: arma HTML estático self-contained, copia tokens y patrones, abre `showcase.html` como referencia.
3. Para **producción**: parte de los UI kits y los handoff; respeta el contrato de datos y deja los flags abiertos marcados.
4. Aplica la Voz a todo el copy. Corre el Checklist.
5. Entrega el archivo en la carpeta de salida y compártelo.

## Checklist de cierre

- [ ] Tokens enlazados (`assets/tokens.css`) o inline; Quicksand cargada solo `300;400;500` (o fallback en live artifact).
- [ ] Lienzo papel cálido (o slate profundo en dark), tarjetas blancas/grafito, bordes hairline, sombras suaves (no elevación pesada).
- [ ] Funciona en **light y dark** (`data-theme="dark"`); en dark el mint es el único acento y las superficies ink-fill voltean a mint.
- [ ] El neutro carga la página; mint como acento firma; verde/azul en datos; **rosa solo en alerta/dato rojo**.
- [ ] Todo estado con **semáforo: punto + palabra**; s/d en gris o `·`, nunca 0.
- [ ] Umbrales correctos: score 70/55; alcance 100/70.
- [ ] Números **tabulares**, compactos, alineados a la derecha en tablas.
- [ ] Tipografía **sin negrita, máx Medium (500)**; eyebrows mayúsculas con tracking.
- [ ] Sin emoji. Español, claims no preguntas, sin em dashes ni jerga VC.
- [ ] Sin `localStorage` / `sessionStorage`. React = Tailwind core o `<style>` self-contained.
- [ ] Responsive: la tabla densa scrollea en pantallas chicas; layout centrado a 77.5rem.
- [ ] Si renderizas para revisar, mira de cerca el semáforo y los pills de alcance, en light y dark, antes de cerrar.
