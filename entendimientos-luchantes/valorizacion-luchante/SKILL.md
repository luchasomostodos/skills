---
name: valorizacion-luchante
description: >-
  Fuente de verdad de valorización en LUCHA, en dos modos: a qué valorización entramos a una startup (ENTRADA) y cuánto vale hoy una posición del portafolio (MARCA). Traduce el CAP de un SAFE a valor de
  hoy y corre el vector RLA de madurez. Dispara con "valoriza", "corre la valorización", "a qué valorización entramos", "cuánto vale [empresa]", "el cap está caro o barato", "es justa la valuación",
  "marca del portafolio", "valuación Q", "fair value"; con el bloque de Valuation de la Dim 03 de un EL; con la valorización trimestral para inversionistas; o cuando suben un workbook, term sheet, SAFE
  o cap table y preguntan por el precio. Dispara sin la palabra exacta si el pedido es opinar sobre un precio de entrada, un cap o el valor de una posición. NO dispara para unit economics, márgenes ni
  ratio Studio sobre FL (analisis-financiero-el, que llama a este skill), ni para el tablero de inversionistas (tablero-legal), ni para el Mapa Luchante.
---

# Valorización Luchante · Mark 1

Motor de valorización de LUCHA. Reemplaza el cálculo de valuación que vivía disperso en `analisis-financiero-el` (Paso 5 y 8a) y en el workbook trimestral de valorización. Ese skill ahora delega acá; este archivo manda.

Nace del reverse engineering del workbook `Data_Financieros_por_Empresa_CON_VALORIZACION.xlsx` (analista financiero, Q2-2026) y de una regla del líder del caso: **el CAP de un SAFE no es lo que la empresa vale hoy, es cuánto puede llegar a valer.** Ese principio es la Regla Cero de este skill.

Lo que hace: convierte evidencia en un precio defendible, con el rango y las salvedades a la vista. Lo que NO hace: decidir. Entrega el número y la lectura; la convicción la pone la persona en comité.

---

## Regla Menos Uno · Antes de nada, el Gate VC-backable

**Todo el motor de este skill asume que el retorno viene de un exit.** `P_max`, `M_win`, `p` y el vector RLA miden la probabilidad de llegar a ese exit.

**Si el caso no es VC-backable, nada de eso aplica.** El Fondo Luchante es un vehículo de 30 años que sostiene también empresas que pagan y no venden.

| Gate | Modo | Métrica |
|---|---|---|
| **VC-backable: SÍ** | ENTRADA o MARCA, como siempre | `P_max`, múltiplos, vector RLA |
| **VC-backable: NO** | **Modo CAJA**, ver `references/modo-caja.md` | **Período de recupero** |

El gate y su procedimiento viven en `../entendimiento-luchante/references/sistema/el-system.md`. Se responde y se declara por escrito **antes** de puntuar.

**Ya nos costó caro una vez.** En Marea se publicó que el precio estaba 3,2 veces por encima del máximo defendible, calculado con `P_max` de exit sobre un caso cuya vía de retorno no es el exit. Hubo que retirarlo.

**Y el MOIC objetivo del fondo quedó retirado** como parámetro que decide, porque no tiene fuente. Ver `references/parametros.md`.

---

## Regla Cero · Tres números que nunca son el mismo número

La mayoría de los errores de valorización en LUCHA vienen de colapsar estos tres en uno. **Siempre se reportan los tres, nunca uno solo.**

| # | Número | Qué es | De dónde sale |
|---|---|---|---|
| **1** | **Precio de entrada** (CAP, pre-money, post-money) | El número que está sobre la mesa en el documento. En un SAFE es un **techo de conversión negociado**, no una tasación | Term sheet, SAFE, ronda priced |
| **2** | **Valor implícito hoy** | Lo que creemos que la empresa vale **a la fecha de medición** | Motor de este skill: cap traído a presente, o múltiplos con puente a equity |
| **3** | **Valor alcanzable** | Cuánto puede **llegar** a valer en la próxima ronda si cumple | Ingreso proyectado × múltiplo forward del sector |

**Por qué el CAP no es el número 2, y por qué el error va siempre en la misma dirección:**

- **Es forward.** El cap intenta describir la próxima ronda priced, no la fecha de hoy.
- **Se negocia hacia arriba.** Al founder le conviene un cap alto (menos dilución); el inversionista lo acepta a cambio de descuento y MFN. El número que sale de esa mesa es el borde de un rango, no una estimación central.
- **Es una opción, no un precio.** El inversionista recibe el mejor de `cap` y `ronda × (1 − descuento)`. El cap es su cota mala. Un precio de equity puro no lleva esa opcionalidad adentro.
- **Bajo IFRS 13 / IPEV**, fair value es el precio de una transacción ordenada **a la fecha de medición**. Un cap dentro de un convertible no es una transacción de equity.

**Y el cap muerde dos veces.** Si el SAFE no ha convertido, el cap no solo infla el valor: define el **ownership**. Un stake de SAFE sin convertir es un derecho a un porcentaje que recién se fija en la próxima ronda. Se reporta como **rango**, nunca como punto. Ver `references/cap-safe.md`.

---

## Antes de empezar

1. **Declara el modo.** ENTRADA (deal nuevo, EL, comité) o MARCA (posición existente, reporte trimestral). Si el pedido es ambiguo, pregunta una vez; si nadie contesta, corre ENTRADA y dilo.
2. **Trae el tipo de empresa** del Paso 2.5 de `analisis-financiero-el` (SaaS / transaccional / healthtech / fintech-lending). El tipo decide el **denominador** del múltiplo. Si ese skill no corrió, clasifica acá con la misma tabla y márcalo.
3. **Lee `references/parametros.md`** y declara qué parámetros estás usando. Ninguna corrida sale sin la tabla de parámetros pegada al output.
4. Si falta una pieza (balance, documento de la ronda, FY anterior), **no bloquees**: corre con lo que hay, marca el gap como salvedad y baja el peso del método afectado.

---

## MODO ENTRADA · ¿a qué valorización entramos?

Para Dim 03 de un EL, para comité, y para el club de inversión Quillay.

### E1 · Declarar qué número está sobre la mesa
Instrumento (SAFE post-money / SAFE pre-money / nota convertible / ronda priced), el número (cap o valuación), descuento, MFN, y si hay ronda priced simultánea. Si es pre-money, conviértelo: `post = pre + monto levantado`. **Todo se reporta en post-money.**

### E2 · ¿El cap se alcanza? (test de alcanzabilidad)
Es el test que responde la pregunta de verdad. Ver `references/cap-safe.md`.

```
Ingreso requerido en la próxima ronda = CAP / múltiplo forward del sector
Veces que falta                       = Ingreso requerido / run rate de hoy
CAGR requerido                        = (Veces que falta)^(1/T) − 1
```

Veredicto en tres estados, comparando el CAGR requerido contra el crecimiento **observado** (no el proyectado):

| Veredicto | Condición | Lectura |
|---|---|---|
| **Alcanzable** | CAGR requerido ≤ crecimiento observado | El cap es una apuesta razonable; el descuento tiene valor |
| **Apretado** | CAGR requerido entre 1× y 2× el observado | Depende de que el plan se cumpla; condicionar |
| **No alcanzable** | CAGR requerido > 2× el observado | Convertiremos al cap en una ronda que no lo justifica: **entramos caro** y el descuento vale cero |

### E2b · De dónde viene el upside de un SAFE (leer antes de negociar un cap)

El SAFE convierte al menor de dos precios. **Los cinco SAFEs firmados de LUCHA son YC post-money "Valuation Cap only": sin descuento de conversión** (verificado 2026-08-28 en `Portfolio_Legal`). Con eso, las dos ramas son:

- **Si ata el cap** (la ronda precia por encima): la posición vale `ticket × ronda_post / cap` y **crece con la ronda**.
- **Si no ata** (la ronda precia en o por debajo del cap): la posición vale **exactamente el ticket. 1.0×.** Sin descuento no hay red.

> **El 100% del retorno de nuestros SAFEs depende de que el cap ate.** Un cap demasiado alto no es generosidad neutra con el founder: hace más probable la rama en la que ganamos cero.

Regla de negociación que sale de acá: si no se puede bajar el cap, **pedir descuento de conversión**. Un SAFE sin descuento y con cap alto es el peor instrumento posible para el inversionista. Inventario, mecánica y casos en `references/cap-safe.md`.

### E3 · Valor implícito hoy
```
V_referencia = MIN(CAP, valor alcanzable a T)
V_implícito_hoy = V_referencia / (1 + r)^T
```
`r` = retorno exigido para el riesgo del stage; `T` = años a la próxima ronda. Defaults en `references/parametros.md`.

Si E2 dijo "no alcanzable", `V_referencia` es el valor alcanzable, no el cap: la brecha entre ambos **es la sobreprecio que estamos pagando**. Cuantifícala en dólares y en porcentaje.

### E4 · Precio máximo defendible desde el retorno del fondo
La pregunta al revés: no "cuánto vale", sino "cuánto podemos pagar". Ver `references/modo-entrada.md`.

```
P_max = V_exit × R / M_win            (lente del ganador)
P_max = p × V_exit × R / MOIC_fondo   (lente de valor esperado)
```
- `V_exit` = valor de salida modelado · `R` = retención de ownership tras dilución futura · `M_win` = múltiplo exigido **si el caso funciona** · `p` = probabilidad de llegar a ese exit · `MOIC_fondo` = objetivo del fondo.
- **`p` no se teclea: sale del vector RLA** (`references/rla-madurez.md` §5). Un RLA ponderado de 3 da p=15%; de 6, p=30%; de 8, p=42%. La madurez mueve `P_max` 2.8× de punta a punta.
- Las dos lentes son la misma ecuación y deben cuadrar: **`M_win = MOIC_fondo / p`**. Si no cuadran, uno de los dos supuestos está mal puesto; dilo.
- **Resultado no obvio que hay que decir siempre: `P_max` no depende del tamaño del ticket.** El ticket se cancela. Depende de la vista de salida, la dilución futura, la probabilidad y el objetivo de retorno. Nada más.

### E5 · Las dos verdades
Heredado de `../entendimiento-luchante/references/sistema/el-system.md` y `../entendimiento-luchante/references/dimensiones/dim-03-capital.md`, se mantiene tal cual:
1. **En absoluto:** post-money vs benchmarks de mercado y vs la regla de entrada de LUCHA (USD 3M–8M, 8 = excepción).
2. **En múltiplo:** múltiplo trailing y forward sobre el denominador del tipo. A pre-seed el trailing es ruidoso (denominador chico): un múltiplo alto suele significar que levanta temprano en su curva, no sobreprecio. Decir las dos, no una.

### E6 · Veredicto y condiciones
Un párrafo: justa / barata / cara, **por qué**, y bajo qué condición cambia. Si el founder prioriza dividendos sobre exit, el precio de entrada pesa más y la fairness queda condicionada a blindar la estructura de retorno.

---

## MODO MARCA · ¿cuánto vale hoy la posición?

Para el cierre trimestral y el reporte a inversionistas.

### M1 · Clasificar la evidencia
No existe una columna "última ronda". Existe **tipo de evidencia**, y cada tipo se trata distinto. Tabla completa en `references/taxonomia-evidencia.md`. Resumen:

| Evidencia | Tratamiento |
|---|---|
| Ronda priced liderada por tercero, ≤12m | Evidencia de mercado. Factor 1.00 |
| Ronda priced de tercero, 12–24m / >24m | Envejecida. Factor 0.85 / 0.70, con techo de peso |
| **CAP de SAFE o nota convertible** | **Nunca a valor nominal.** Pasa por el motor de cap (E2+E3) |
| Secundario entre terceros | Precio real; factor 0.90–1.00 |
| **Ronda liderada o co-liderada por LUCHA** | **Circular.** Excluida como evidencia de mercado; se reporta aparte como costo |
| Afirmación del founder sin documento | No es evidencia. Factor 0 |
| Sin documento de ningún tipo | No es evidencia. Se usa **costo menos deterioro** |

### M2 · Calibrar contra hitos
El factor de calibración **se deriva, no se teclea**, y **nunca queda en 1.00 por default**:
```
Factor = factor_tipo_y_antigüedad × factor_hitos
```
`factor_hitos` compara el ingreso real contra el que se prometió cuando se fijó ese precio. Tabla en `references/taxonomia-evidencia.md`. Una empresa que hizo el 30% de lo que prometió no vale lo mismo que el día de la ronda; ese es exactamente el ajuste que IPEV pide a cada fecha de medición.

### M3 · Múltiplo → enterprise value
Matriz interpolada, sin escalones. Ver `references/matriz-multiplos.md`.
```
Múltiplo = base_industria × f(etapa) × f(crecimiento) × f(calidad operativa)
EV = run rate × Múltiplo
```
- La **base** es de dos pasos auditables: comparable público EV/Sales (con fuente, fecha y muestra) × descuento de iliquidez y tamaño (%). No un número redondo sin procedencia.
- `f(crecimiento)` y `f(calidad)` se **interpolan linealmente** entre anclas. Prohibidos los escalones.
- `f(calidad)` mira margen bruto **y** eficiencia operativa (Berry ratio). Un margen bruto sano con opex 18× el ingreso no es calidad.
- Si el crecimiento se mide sobre menos de 4 trimestres, el factor se **comprime a la mitad hacia 1.00**.

### M3b · Valor por madurez (cuando el múltiplo no aplica)

Si la empresa es pre-revenue o su ingreso es demasiado chico para sostener un múltiplo, **no se cae todo el peso en la última ronda**: se corre el vector RLA y se valoriza por madurez. Ver `references/rla-madurez.md`.

```
RLA ponderado = Σ (nivel_i × peso_i) / 100        (escala 1–9, pesos por tipo de empresa)
g             = (RLA ponderado − 1) / 8
Valor         = piso + (techo − piso) × g^1.5
```

Es el método que el workbook trimestral declaró faltante y no reemplazó. Para Raíz da **$2.66M documentado** en vez de **$5.0M sin documento**.

Regla: el valor por madurez y un múltiplo de ingresos **nunca conviven** sobre la misma empresa. Con ingreso suficiente manda el múltiplo, y el RLA solo calibra `p`.

---

### M4 · Puente EV → equity  (paso obligatorio)
```
Equity = EV − deuda financiera bruta + caja − pasivos con prelación sobre el equity
```
"Pasivos con prelación" incluye préstamos y cuentas por pagar a accionistas. Piso en 0.

**Si el balance no está disponible, el puente no se puede cerrar.** En ese caso: reporta el resultado del múltiplo **etiquetado como EV**, márcalo como salvedad, y **no lo promedies contra un post-money de equity**. Un promedio entre EV y equity no es un valor, es una suma de peras y manzanas.

### M5 · Ponderar por escenario, no por método
Método por defecto. Se ponderan **estados del mundo**, no columnas de Excel:

| Escenario | Valor asociado |
|---|---|
| **Sube** — la próxima ronda precia por encima de la referencia | Valor alcanzable a T, traído a presente |
| **Plano** — ronda flat o extensión al mismo precio | Referencia calibrada (M1+M2) |
| **Baja o no hay ronda** — down round, recap, cierre | El menor entre equity por múltiplos (M4) y costo menos deterioro |

Las probabilidades salen de evidencia observable: crecimiento, runway, momentum de la ronda, banderas de `analisis-financiero-el`. Suman 1. **Cada probabilidad se justifica en una línea.**

Se permite la ponderación por método (ronda vs múltiplos) como continuidad con trimestres anteriores, **con dos condiciones**: cada peso justificado por escrito, y reportado el **rango completo** (valor con 100% método A vs 100% método B) junto al resultado. Si el rango es amplio, el rango **es** el hallazgo.

### M6 · Valor de la posición
```
Valor posición = f(waterfall), no stake × valor de la empresa
```
Considerar preferencia de liquidación, deuda de accionistas por delante, y —para SAFEs sin convertir— el **rango** de ownership según si el cap ata o no. Ver `references/cap-safe.md`.

### M7 · Salvedades y trazabilidad
Cada fila cierra con: qué falta, quién lo debe, y qué cambiaría el número si aparece. Cada corrida lleva fecha, autor, fuente de cada input y versión de parámetros.

---

## Reglas inviolables

1. **El CAP nunca es valor.** Los tres números de la Regla Cero se reportan siempre los tres.
2. **Un múltiplo de ventas produce enterprise value.** No se compara ni se promedia contra un post-money de equity sin el puente de deuda neta. Sin balance: se dice y no se promedia.
3. **Nuestro propio precio de entrada no es evidencia de fair value.** Es costo. Se reporta aparte.
4. **Sin documento legal no hay valorización por ronda.** Costo menos deterioro.
5. **Un stake de SAFE sin convertir se reporta como rango**, nunca como punto.
6. **El denominador es el ingreso neto del tipo de empresa.** Nunca GMV, nunca interés bruto sin provisionar, nunca originación.
7. **Una sola definición de crecimiento por corrida**, declarada arriba y usada en todos lados.
8. **Un solo criterio de run rate**, declarado: por defecto último trimestre × 4, con H1 × 2 como cross-check. Nunca uno distinto por empresa sin decirlo.
9. **Nada de escalones.** Todos los factores se interpolan.
10. **Toda ponderación se justifica por escrito y se reporta con su rango.** Si mover los pesos mueve el resultado más de 20%, ese hecho va en el output, arriba.
11. **El factor de calibración nunca queda en 1.00 por default.** Se deriva o se justifica.
12. **`p` sale del vector RLA con evidencia, no de un default tecleado.** Y un nivel RLA sin evidencia adjunta se reporta como el nivel inferior que sí la tenga.
13. Este skill no decide. Entrega número, rango y lectura.

---

## Formato de salida · MODO ENTRADA

```
## Valorización de entrada · [Empresa]
Fecha: [YYYY-MM-DD] · Corrió: [quién] · Parámetros: v[x] (r=[x]%, T=[x]m, M_win=[x], p=[x]%, R=[x]%)

### Los tres números
| | Valor | Cómo se obtuvo |
|---|---|---|
| Precio de entrada (lo que pide el documento) | $[x] | [instrumento: cap SAFE / priced], descuento [x]% |
| Valor implícito hoy | $[x] | [referencia] traída a presente a r=[x]% por [T] |
| Valor alcanzable en la próxima ronda | $[x] | [ingreso proyectado] × [múltiplo forward] |

### ¿El cap se alcanza?
- Tipo de empresa: [x] · Denominador: [x] · Run rate hoy: $[x]
- Ingreso requerido para justificar el cap: $[x] → faltan [x]×
- CAGR requerido: [x]% · Crecimiento observado: [x]%
- **Veredicto: [Alcanzable / Apretado / No alcanzable]** — [una frase]
- Si no alcanzable: sobreprecio implícito $[x] ([x]%)

### Precio máximo defendible
- V_exit modelado: $[x] ([base del supuesto])
- P_max (lente ganador, M_win=[x]): $[x]
- P_max (lente valor esperado, p=[x]%, MOIC=[x]): $[x]
- Consistencia M_win = MOIC/p: [cuadra / no cuadra, y qué supuesto revisar]
- **Precio pedido vs P_max: [dentro / fuera] por $[x]**

### Las dos verdades
- En absoluto: $[x] post-money vs [benchmarks] y vs regla LUCHA $3M–8M → [barata/cara]
- En múltiplo: trailing [x]× · forward [x]× sobre [denominador] → [lectura]

### Efecto en ownership (si SAFE sin convertir)
- Si el cap ata: [x]% · Si la ronda precia bajo el cap: [x]%–[x]%
- **Stake reportable: rango [x]%–[x]%**, no punto

### Veredicto
[Justa / barata / cara], porque [razón]. Condicionada a [estructura de retorno / hito].

### Salvedades
- [qué falta, quién lo debe, qué cambiaría]
```

## Formato de salida · MODO MARCA

```
## Marca de valor · [Empresa] · [Q]
Fecha: [YYYY-MM-DD] · Corrió: [quién] · Parámetros: v[x] · Criterio de run rate: [x]

### Evidencia
- Tipo: [x] · Fecha del documento: [x] · Antigüedad: [x] meses
- Factor tipo/antigüedad: [x] · Factor hitos: [x] (real $[x] vs prometido $[x])
- **Factor de calibración: [x]** → referencia calibrada $[x]

### Múltiplo y enterprise value
- Base: comparable [x] a [fecha] = [x]× × descuento iliquidez/tamaño [x]% = [x]×
- × Etapa [x] × Crecimiento [x] × Calidad operativa [x] = **múltiplo [x]×**
- Run rate: $[x] → **EV $[x]**

### Puente a equity
- EV $[x] − deuda financiera $[x] + caja $[x] − pasivos con prelación $[x] = **Equity $[x]**
- [o] Balance no disponible → resultado reportado como EV, no promediado. SALVEDAD.

### Escenarios
| Escenario | Prob. | Valor | Justificación |
|---|---|---|---|
| Sube | [x]% | $[x] | [una línea] |
| Plano | [x]% | $[x] | [una línea] |
| Baja / sin ronda | [x]% | $[x] | [una línea] |
| **Ponderado** | 100% | **$[x]** | |

### Rango y sensibilidad
- Mínimo posible $[x] — máximo posible $[x] — publicado $[x] ([x]% del camino al máximo)
- [Si mover pesos mueve el resultado >20%: decirlo acá, arriba]

### Valor de la posición
- Ownership: [x]% [punto o rango si SAFE sin convertir]
- Waterfall: [preferencias / deuda de accionistas por delante]
- **Valor posición: $[x]**

### Δ vs trimestre anterior
$[x] → $[x] ([x]%). Motivo: [evidencia nueva / recalibración / cambio de run rate]

### Salvedades
- [qué falta, quién lo debe, qué cambiaría]
```

---

## Referencias incluidas

| Archivo | Cuándo leerlo |
|---|---|
| `references/cap-safe.md` | Siempre que haya un SAFE o convertible. Motor de cap: alcanzabilidad, valor implícito, efecto en ownership |
| `references/taxonomia-evidencia.md` | Paso M1 y M2. Tipos de evidencia, factores de tipo/antigüedad y de hitos |
| `references/matriz-multiplos.md` | Pasos M3 y E2. Base por industria con procedencia, factores interpolados, puente EV→equity |
| `references/modo-entrada.md` | Paso E4. Derivación del precio máximo y ejemplos trabajados |
| `references/parametros.md` | Siempre, antes de correr. Defaults, quién los aprueba, qué está pendiente de confirmar |
| `references/rla-madurez.md` | Empresa pre-revenue, o siempre que se calcule `P_max`. Vector de 8 dimensiones 1–9, pesos por tipo, valor por madurez y calibración de `p` |
| `references/bloque-el-rla.md` | Al renderizar el bloque RLA en el artifact del EL |
| `examples/ejemplo-botica-entrada.md` | Corrida completa de referencia sobre data del portafolio (Botica, modo ENTRADA) + contraste con Grafito. Sirve de test de regresión |

## Quién llama a este skill

- `entendimiento-luchante` → bloque Valuation de Dim 03 (modo ENTRADA)
- `analisis-financiero-el` → delega acá los Pasos 5 y 8a; ese skill ya no calcula valuación
- `tablero-legal` → consume el resultado del modo MARCA; no lo recalcula
- Corrida directa: "corre la valorización de [empresa]" o "valoriza el portafolio del Q[x]"
