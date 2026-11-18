# Entendimientos Luchantes

Carpeta con los skills del Entendimiento Luchante (EL), el documento con el que LUCHA evalúa un caso antes de comité. Es el kit que antes se compartía como plugin `mark-86`.

Para empezar, abre un caso y pide "corre el EL de [empresa]". El orquestador, `entendimiento-luchante`, llama a los demás skills cuando corresponde.

## Skills disponibles

| Skill | Para qué sirve |
| --- | --- |
| [entendimiento-luchante](entendimiento-luchante/README.md) | Orquesta el EL completo. Trae las rúbricas, la plantilla vigente y el generador |
| [analisis-financiero-el](analisis-financiero-el/README.md) | Motor financiero de la Dim 02 (Negocio) y la Dim 03 (Capital) |
| [valorizacion-luchante](valorizacion-luchante/README.md) | Precio de entrada, cap de SAFE y valor de las posiciones del portafolio |
| [impacto-luchante](impacto-luchante/README.md) | Ficha de impacto ABC y puntaje de la Dim 05 |
| [tribalometro](tribalometro/README.md) | Tribal Score del founder |
| [saboteadores](saboteadores/README.md) | Lectura de saboteadores y PQ del founder |
| [cierre-el](cierre-el/README.md) | Revisión de cierre antes de comité |
| [climpi](climpi/README.md) | Auditoría del razonamiento del EL contra el azar (Taleb) |
| [lucha-brand](lucha-brand/README.md) | Marca de LUCHA para tableros, paneles y artifacts internos |

## Cómo se conectan

```text
entendimiento-luchante
├── analisis-financiero-el ──> valorizacion-luchante
├── impacto-luchante
├── tribalometro
├── saboteadores
├── cierre-el
├── climpi
└── lucha-brand
```

## Instalar

Para tener el kit completo, instalar los nueve skills en tu cuenta:

```sh
bash install.sh --agent claude --skill entendimiento-luchante --skill analisis-financiero-el --skill valorizacion-luchante --skill impacto-luchante --skill tribalometro --skill saboteadores --skill cierre-el --skill climpi --skill lucha-brand
```

La [guía principal](../README.md) explica las demás opciones del instalador.

## Datos de ejemplo

Esta biblioteca es pública. Los ejemplos, casos de prueba y la plantilla del EL vienen de casos reales y se anonimizaron antes de publicarlos:

- Las personas, empresas, inversionistas, instituciones y contrapartes tienen nombres ficticios.
- Las personas del equipo de LUCHA aparecen por su rol.
- Los montos de cada empresa están multiplicados por un factor, así que no corresponden a cifras reales. Porcentajes, múltiplos y fórmulas se mantienen, y los ejemplos trabajados siguen calzando.

Al agregar un ejemplo nuevo, anonimizarlo de la misma forma antes de subirlo. Ningún dato real de un caso, del portafolio ni de los partícipes del Fondo debe llegar a este repositorio.
