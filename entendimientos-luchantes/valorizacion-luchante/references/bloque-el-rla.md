# Bloque RLA en el artifact del Entendimiento Luchante

Spec de render. Se aplica con `lucha-brand` (neutros papel cálido, MADE Tommy Soft con fallback Quicksand, semáforo como firma). El bloque vive en el EL entre **Dim 03 Capital** y **Validación externa**, porque su función es sostener la lectura de precio.

---

## 1 · Encabezado del bloque: los tres números

Antes del vector va la Regla Cero, en tres tarjetas de igual peso visual. **Ninguna se ve "seleccionada": no es un toggle, son tres hechos distintos.**

```
┌─ Precio de entrada ──┐ ┌─ Valor implícito hoy ─┐ ┌─ Valor alcanzable ────┐
│ $4,800,000           │ │ $2,900,000            │ │ $4,800,000            │
│ Cap efectivo SAFE    │ │ Cap traído a presente │ │ Ingreso proy. ×        │
│ (25% lead discount)  │ │ r 40% · T 18m         │ │ múltiplo forward      │
└──────────────────────┘ └───────────────────────┘ └───────────────────────┘
```

Debajo, una línea de veredicto de alcanzabilidad con el chip del semáforo:
`Verde` alcanzable · `Ámbar` apretado · `Rojo` no alcanzable — seguida de la frase de una línea y el "faltan N×".

**Diferencia deliberada con la herramienta que inspiró esto:** ahí los tres números son chips donde eliges uno y la ronda abierta —el número más optimista y menos verificado— es un clic tan fácil como los otros. Acá los tres se muestran siempre y ninguno es elegible: el que manda lo decide la taxonomía de evidencia, no el usuario.

---

## 2 · El vector de madurez

Una fila por dimensión, en el orden de peso descendente **del tipo de empresa** (no un orden fijo), para que lo que más pesa se lea primero.

Cada fila:

```
TRL · Tecnología                                    peso 20    ● NIVEL 7
Madurez técnica y avance de desarrollo
████████████████████████░░░░░░░░  7/9
OPERATIONAL — Demostración del prototipo en entorno operacional
Evidencia: piloto industrial, tests de laboratorio acreditado, informe de centro tecnológico  ·  3 documentos
```

- **Barra 1–9** con el nivel marcado. Relleno en el neutro fuerte de la marca; el acento se reserva para el chip de nivel.
- **Chip de nivel** con el color del semáforo según distancia al nivel esperado para la etapa (ver §4), no según el nivel absoluto. Un TRL 5 en pre-seed es verde; en Serie A es rojo.
- **Etiqueta + definición del nivel**, textual de `rla-madurez.md`. Nunca parafrasear: la definición es el criterio.
- **Línea de evidencia** con el conteo de documentos. **Si no hay evidencia, la fila se renderiza en el nivel inferior que sí la tenga, con la marca `▲ declarado 7, evidenciado 5`.** Es la regla que impide que el vector se infle solo.

Cierre del vector: **RLA ponderado** grande, con los pesos usados y el tipo de empresa declarado arriba.

---

## 3 · Qué hace el vector con el número

Un bloque corto que cierra el círculo, para que nadie lea el vector como decoración:

```
RLA ponderado 6.2  →  p = 31%  →  M_win = 9.7×
P_max = p × V_exit × R / MOIC = $2.27M      Precio pedido: $4.80M
```

Con una línea de lectura: cuánto tendría que subir el RLA, o cuánto mayor tendría que ser el exit, para que el precio pedido entre en rango. **Ese es el output que convierte el bloque en argumento de comité.**

Si la empresa es pre-revenue, además: `Valor por madurez = $2.66M` con el piso, el techo y la γ a la vista.

---

## 4 · Nivel esperado por etapa (para el color del semáforo)

Referencia, no regla. Verde: en o sobre lo esperado. Ámbar: un nivel debajo. Rojo: dos o más debajo.

| Dimensión | Pre-seed | Seed | Serie A |
|---|---|---|---|
| TRL | 4 | 6 | 8 |
| IPRL | 2 | 4 | 6 |
| BRL | 3 | 5 | 7 |
| CRL | 3 | 5 | 7 |
| TmRL | 3 | 5 | 7 |
| GRL | 3 | 4 | 6 |
| RegRL | 2 | 5 | 7 |
| ImpRL | 3 | 5 | 7 |

---

## 5 · Reglas de render

1. **Los tres números siempre, nunca uno.** Si falta uno, va la tarjeta con "no calculable" y el motivo.
2. **La definición del nivel se muestra completa**, no truncada ni parafraseada.
3. **Evidencia visible por dimensión.** Una fila sin evidencia se ve distinta a una con evidencia; el lector tiene que poder distinguirlas de un vistazo.
4. **Los pesos y el tipo de empresa se muestran**, porque el mismo vector con otros pesos da otro número.
5. **Nada de "score global de madurez" fuera del RLA ponderado.** No se inventa un segundo agregado ni se mezcla con los 0–100 del Mapa Luchante.
6. En el artifact que puede compartirse van solo benchmarks de mercado; los comparables internos de portafolio quedan en el memo interno, como manda `../entendimiento-luchante/references/sistema/el-system.md`.
