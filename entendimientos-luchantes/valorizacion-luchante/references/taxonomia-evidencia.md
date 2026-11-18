# Taxonomía de evidencia y calibración

Leer en los pasos M1 y M2. Reemplaza la columna única "última ronda" del workbook trimestral.

El principio: **no todas las cifras de valorización son la misma clase de cosa.** Una ronda priced liderada por un tercero hace tres meses y un número que un founder mencionó en una llamada no pueden ocupar la misma celda.

---

## 1 · Tipos de evidencia

| Tipo | Qué es | Factor base | Techo de peso | Nota |
|---|---|---|---|---|
| **Ronda priced de tercero, ≤12m** | Precio de mercado real, verificable en documento | **1.00** | sin techo | La mejor evidencia que existe |
| **Ronda priced de tercero, 12–24m** | Precio envejecido | **0.85** | 60% | El mundo cambió; la cifra no |
| **Ronda priced de tercero, >24m** | Ya no describe el presente | **0.70** | 30% | Considerar dejar de usarla |
| **CAP de SAFE / nota convertible** | Techo de conversión, no precio | **nunca nominal** | 50% | Pasa por el motor de `cap-safe.md` (alcanzabilidad + descuento a presente) |
| **Secundario entre terceros** | Transacción real, posible descuento de iliquidez | **0.90–1.00** | 60% | Verificar tamaño y si fue forzada |
| **Ronda liderada o co-liderada por LUCHA** | Nuestro propio precio | **excluida** | 0% | Circular. Se reporta aparte como **costo**, nunca como evidencia de mercado |
| **Promedio construido de varias rondas** | Artefacto de cálculo | **no usar** | 0% | No es un precio. Usar la más reciente y de tercero; las otras son historia |
| **Afirmación del founder sin documento** | No es evidencia | **0.00** | 0% | Puede ir como salvedad con nombre y fecha |
| **Sin documento de ningún tipo** | No hay nada | **0.00** | 0% | Se valoriza a **costo menos deterioro** |

**Reglas duras de esta tabla:**
- Un promedio de tres rondas de fechas distintas no es un precio de mercado. Si se quiere mostrar el rango de rondas conocidas, va como rango en la salvedad, no como input.
- Nuestro propio ticket no valida nuestro propio precio. Si la única "ronda" de una empresa la lideramos nosotros, esa empresa **no tiene evidencia de mercado** y hay que decirlo así en el reporte.
- "Me dijo el founder que están cerrando a X" es un dato de momentum, no de valor.

---

## 2 · Factor de hitos

Compara lo que la empresa **hizo** contra lo que **prometió** cuando se fijó ese precio. Es el ajuste que IPEV pide a cada fecha de medición y el que el workbook nunca aplicó.

| Ingreso real vs prometido | Factor |
|---|---|
| ≥ 80% | 1.00 |
| 50–80% | 0.85 |
| 20–50% | 0.70 |
| < 20% | 0.50 |

Interpolar linealmente entre anclas. Si no existe el plan original contra el cual comparar, usar 0.85 por defecto y marcarlo como salvedad — **no 1.00**: la ausencia de plan no es evidencia de cumplimiento.

Señales cualitativas que también bajan el factor de hitos (una sola línea de justificación cada una): pérdida de un cliente ancla, caída sostenida del take rate, salida de un founder, ronda que se cayó, runway bajo 6 meses.

---

## 3 · Factor de calibración final

```
Factor de calibración = factor_tipo_y_antigüedad × factor_hitos
Referencia calibrada  = valor de la evidencia × Factor de calibración
```

**Nunca 1.00 por default.** Si sale 1.00, es porque el tipo es "ronda priced de tercero ≤12m" **y** los hitos se cumplieron ≥80%. Cualquier otro 1.00 es un error de la corrida.

### Aplicado al portafolio Q2-2026, contra los documentos firmados (verificado 2026-08-28)

| Empresa | Lo que usa el workbook | Lo que dice el documento | Veredicto |
|---|---|---|---|
| Ruta | $15M | **Cap SAFE $8.33M blended** (6.25M + 9.375M) **+ ronda priced Vértice Capital $15M post-money, Q1-2026** | Los dos números son correctos y miden cosas distintas: $8.33M es nuestro precio de entrada, $15M es el valor de mercado hoy. **Ronda priced de tercero ≤12m → factor 1.00.** La mejor evidencia del portafolio |
| Grafito | $5.46M "hermanos Olivares" | **Cap SAFE $6.0M.** La ronda de $5.46M **no está en `Portfolio_Legal`** | Sin documento no es evidencia. Y si existiera, precia **bajo** nuestro cap → el cap no ata y la posición vale el ticket. Salvedad más cara del portafolio |
| Faro | $2.4M (2024) | **Cap SAFE $2.4M, Discount Rate 100% (sin descuento)** | El $2.4M es nuestro cap, no una ronda de tercero. **No es evidencia de mercado.** Ronda >24m sin tercero → costo menos deterioro |
| Botica | $7.21M (promedio de $4.8M/$6.4M/$12M) | **Cap SAFE $6.4M nominal con 25% Lead Investor Discount → efectivo $4.8M** | El "$4.8M de Lucha" del promedio **es nuestro propio cap efectivo**. Promediarlo con terceros es circular. Usar solo la transacción de tercero más reciente |
| Hogar | $10M (marca) | **Cap SAFE $7.5M** | El $10M no tiene documento de ronda: es decisión de marca. El único número documentado es nuestro cap de $7.5M, que es costo, no valor. El **$15M está ANULADO** (líder del caso, 2026-09-03): fue un error de carga del 16-jul-2026 —Acta Checkpoint Q2 más reporte del founder, sustento línea de crédito Ancla, que es deuda privada y no reprecia el equity—. No se cita como marca, valor alcanzable ni escenario |
| Raíz | $5M sin documento legal | **No hay SAFE: Convenio de Accionistas (equity directo)** | Sin evidencia de precio. Costo menos deterioro |

**Hallazgo transversal: en 4 de 6 empresas el número que el workbook llama "última ronda" no coincide con ningún documento firmado.** Solo Ruta tiene una ronda priced de tercero verificable; en Faro, Botica y Hogar el número que se usa es —o deriva de— nuestro propio cap, que es costo y no evidencia de mercado.

### Nota de método

Este ejercicio es el que hay que correr empresa por empresa antes de publicar cualquier cifra trimestral.
