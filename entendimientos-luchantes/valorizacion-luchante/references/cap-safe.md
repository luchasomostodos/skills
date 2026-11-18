# El CAP de un SAFE · motor completo

Leer siempre que haya un SAFE o una nota convertible sobre la mesa, en cualquiera de los dos modos.

**Este archivo está calibrado contra los SAFEs firmados de LUCHA**, leídos de `Lucha/Impact Studio/Portfolio_Legal/*/2. SAFE/` el 2026-08-28. No es teoría: es cómo funcionan nuestros instrumentos.

---

## 1 · Qué firmamos realmente (inventario verificado 2026-08-28)

| Empresa | Instrumento | Cap post-money | Ticket | Descuento de conversión | Ownership si ata el cap |
|---|---|---|---|---|---|
| **Ruta** | 2 SAFEs YC post-money (flip a The Ruta Corporation, abr-2026) | **$6.25M** (62.5k) + **$9.375M** (187.5k) → **blended $8.33M** | $250,000 | **ninguno** | **3.00%** |
| **Grafito** | SAFE YC post-money firmado | **$6.0M** | $120,000 | **ninguno** | 2.00% |
| **Faro** | SAFE YC post-money firmado | **$2.4M** | hasta $120,000 | **Discount Rate 100% = ninguno** | 5.00% |
| **Botica** | SAFE YC post-money (2026-06-01) | **$6.4M nominal, con 25% de Lead Investor Discount → efectivo $4.8M** | hasta $80,000 | el 25% ya está dentro del cap efectivo | 1.67% |
| **Hogar** | SAFE YC post-money firmado | **$7.5M** | $125,000 | **ninguno** | 1.67% |
| **Raíz** | **No hay SAFE.** Convenio de Accionistas (equity directo) | — | — | — | equity directo |

**Los cinco son post-money SAFEs de YC, versión "Valuation Cap only": sin descuento de conversión.** Faro lo dice explícito (`The "Discount Rate" is 100%`, que en el formato YC significa cero descuento); los otros cuatro directamente no tienen sección de Discount Rate.

---

## 2 · Cómo convierte, y de dónde viene nuestro retorno

El SAFE convierte al menor de dos precios. Sin descuento, las dos ramas son:

| Rama | Cuándo | Ownership | Valor de la posición al convertir |
|---|---|---|---|
| **Ata el cap** | La ronda precia **por encima** del cap | `ticket / cap` | `ticket × ronda_post / cap` → **crece con la ronda** |
| **No ata el cap** | La ronda precia **en o por debajo** del cap | `ticket / ronda_post` | **exactamente el ticket. 1.0×** |

> **Sin descuento, el 100% de nuestro retorno depende de que el cap ate.** Si la próxima ronda precia en o por debajo del cap, recibimos acciones al precio de mercado por el monto exacto que pusimos: recuperamos la plata en papel, después de años de riesgo, y nada más.

En un SAFE con descuento la rama baja al menos devuelve `ticket / (1 − d)`. **Los nuestros no tienen descuento**, así que esa red no existe. Eso hace que el cap sea, literalmente, la única palanca de retorno del instrumento.

**Consecuencia para la negociación, y es contraintuitiva:** un cap alto se siente generoso con el founder y neutro para nosotros. No lo es. **Un cap alto destruye nuestro upside**, porque hace más probable la rama en la que ganamos exactamente cero. La negociación del cap es una negociación sobre nuestro retorno, no sobre la dilución del founder.

**Corolario para el comité:** si en la negociación no se puede bajar el cap, hay que pedir descuento de conversión. Un SAFE sin descuento y con cap alto es el peor instrumento posible para el inversionista.

---

## 3 · Post-money SAFE vs pre-money SAFE

Los nuestros son **post-money**: el ownership queda fijo en `ticket / cap` si el cap ata, y los SAFEs que entren después diluyen al founder, no a nosotros. Por eso el % es calculable hoy.

En un **pre-money SAFE** el ownership no está fijo: los otros SAFEs que conviertan en el mismo evento nos diluyen, y el % solo se conoce al convertir. Si alguna vez firmamos uno, el ownership reportado tiene que ser un rango cuyo piso asuma que el founder firmó más SAFE del que nos contó.

---

## 4 · Test de alcanzabilidad del cap

```
Ingreso requerido = cap efectivo / múltiplo forward del sector
Veces que falta   = Ingreso requerido / run rate de hoy
CAGR requerido    = (Veces que falta)^(1/T) − 1
```

| Veredicto | Condición |
|---|---|
| **Alcanzable** | CAGR requerido ≤ crecimiento observado |
| **Apretado** | entre 1× y 2× el crecimiento observado |
| **No alcanzable** | > 2× el crecimiento observado |

### Corrida sobre los caps reales (Q2-2026, run rate = Q2 × 4, T = 18 meses)

| Empresa | Cap efectivo | Run rate | Múlt. | Ingreso requerido | Faltan | CAGR requerido | Observado | Veredicto |
|---|---|---|---|---|---|---|---|---|
| **Botica** | $4.80M | $0.88M | 3.5× | $1.37M | **1.6×** | **35%** | s/d | **Alcanzable** — la mejor posición del portafolio |
| **Faro** | $2.40M | $269k | 3.5× | $686k | 2.6× | 87% | −16% | No alcanzable en tendencia |
| **Ruta** | $8.33M | $325k | 2.5× | $3.33M | 10.2× | 372% | +114% | **Moot: el cap ya ató** (ver §5) |
| **Hogar** | $7.50M | $158k | 3.5× | $2.14M | 13.6× | 470% | s/d | No alcanzable |
| **Grafito** | $6.00M | $18k | 2.5× | $2.40M | 133× | 2,507% | −29% | No alcanzable |
| Raíz | — | $0 | — | — | — | — | sin ventas | No aplica: equity directo, costo menos deterioro |

---

## 5 · Los dos casos que hay que leer con cuidado

**Ruta — el cap ató y ganamos.** La ronda priced de Vértice Capital cerró a **$15M post-money en Q1-2026**, muy por encima de nuestro cap blended de $8.33M. Nuestros SAFEs convierten al cap: **3.00% de ownership** (que es exactamente el stake que reporta el workbook, cuadra), sobre una empresa que el mercado precia a $15M. Posición ≈ $450k sobre $250k invertidos = **1.8×**. Este es el caso de éxito y muestra para qué sirve el cap cuando está bien puesto.

**Grafito — el cap no ata y el retorno es cero.** Nuestro cap es $6.0M. El workbook usa como referencia una ronda de **$5.46M**, es decir **por debajo** de nuestro cap. Si esa ronda es real y priced, el cap no ata, no tenemos descuento, y nuestra posición vale **exactamente los $120,000 que pusimos**. Además el ownership implícito (120k/6.0M = 2.00%) no cuadra con el 2.5% que reporta el workbook: hay que reconciliarlo contra las otras capas de stake (CAA, Ronda Ceibo) o corregirlo.

---

## 6 · Cross-check obligatorio: ownership implícito vs stake reportado

Para todo SAFE sin convertir, comparar `ticket / cap` contra el stake que se reporta al inversionista. Si no cuadran, hay otra capa (CAA, CADE, Ronda Ceibo) o hay un error. **Nunca publicar sin resolver la diferencia.**

| Empresa | `ticket / cap` | Stake en el workbook Q2-26 | Estado |
|---|---|---|---|
| Ruta | 3.00% | 3.00% | Cuadra |
| Faro | 5.00% | 5.00% | Cuadra |
| Grafito | 2.00% | 2.50% | **Reconciliar** |
| Botica | 1.67% | 2.60% | **Reconciliar** |
| Hogar | 1.67% | 2.71% | **Reconciliar** (hay CADE ejercida 2026-02-04) |
| Raíz | n/a | 5.35% | Equity directo, no aplica |

---

## 7 · Qué preguntar en la negociación, por orden de impacto

1. **¿A qué ingreso llega la empresa en la fecha de la próxima ronda?** De ahí sale el cap defendible, no al revés.
2. **¿Hay descuento de conversión?** Si el cap no se va a alcanzar, el descuento es todo nuestro retorno. Sin descuento y con cap alto, el instrumento no puede ganar.
3. **¿Cuánto SAFE vivo hay en total y con qué caps?** Sin eso, nuestro ownership es desconocido, no estimado.
4. **¿Post-money o pre-money?**
5. **¿Hay piso (floor) o MFN?** Cambian el reparto de riesgo en la rama baja.

---

## 8 · Salvedades abiertas de este inventario

- Los SAFEs de Ruta leídos son los **post-flip** a The Ruta Corporation (abr-2026), con caps $6.25M y $9.375M. Confirmar que reproducen los términos originales y no crean posiciones nuevas.
- La ronda de **Grafito a $5.46M** ("hermanos Olivares") no está en `Portfolio_Legal`. Sin documento, no se puede afirmar que el cap no ató. Es la salvedad más cara del portafolio.
- El método de conversión de SAFEs y de dilución está marcado como **PENDIENTE con el analista financiero** (`MET-DIL` / `RUT-V1`, MEMORY.md 2026-06-05). Este skill es la propuesta para cerrarlo.
