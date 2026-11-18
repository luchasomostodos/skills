# Ejemplo trabajado · Botica · MODO ENTRADA

Corrida completa sobre data del Q2-2026 y del SAFE firmado. Sirve como referencia de formato y como test de regresión: si el skill se modifica, estos números deben reproducirse.

---

## Valorización de entrada · Botica
Fecha: 2026-08-28 · Corrió: LuchIA · Parámetros: v1 (r=40%, T=18m, M_win=10×, p=30%, R=55%)

### Inputs recibidos de `analisis-financiero-el`
- **Tipo:** Healthtech / digital health. Señales: distribución de medicamentos, mix B2C + convenios, margen bruto de servicio (21.8%), no de software.
- **Denominador:** revenue neto (fee-for-service manda). No es ARR.
- **Run rate:** Q2 × 4 = **$878,467**. H1 × 2 = $895,826 (cross-check, converge).
- Margen bruto Q2 21.83% · Berry ratio 1.383 · EBITDA Q2 **+6.04%** (la única del portafolio en positivo)
- Crecimiento: **s/d** — no hay FY-2025 depurado. Se asume 0% y se comprime el factor por confianza.
- Instrumento: SAFE YC post-money (2026-06-01), cap nominal **$6.4M** con 25% de Lead Investor Discount → **cap efectivo $4.8M**. Sin descuento de conversión adicional. Ticket hasta $80,000.
- Balance: **PENDIENTE DE CARGAR**.

### Los tres números
| | Valor | Cómo se obtuvo |
|---|---|---|
| Precio de entrada | **$4.80M** | Cap efectivo del SAFE tras el Lead Investor Discount |
| Valor implícito hoy | **$2.90M** | $4.80M / 1.40^1.5 |
| Valor alcanzable en la próxima ronda | **$4.80M** | $1.37M de ingreso proyectado × 3.5× forward |

### ¿El cap se alcanza?
- Ingreso requerido para justificar $4.8M a 3.5×: **$1,371,429**
- Run rate hoy: $878,467 → **faltan 1.56×**
- CAGR requerido: **34.6%** en 18 meses · Crecimiento observado: s/d
- **Veredicto: ALCANZABLE.** Es el único cap del portafolio a distancia razonable de la operación. Un healthtech con EBITDA positivo creciendo 35% anual es un caso normal, no heroico.
- Condición: **medir el crecimiento real.** Sin FY-2025 el veredicto se apoya en que 35% es plausible, no en que esté ocurriendo. Es la salvedad principal.

### Múltiplo y enterprise value
- Base healthtech **3.5×** × Etapa 1.00 × Crecimiento **0.925** (0% comprimido por <4 trimestres) × Calidad **0.967** (√(0.901 margen × 1.038 Berry)) = **3.13×**
- EV = $878,467 × 3.13 = **$2.75M**
- **Puente a equity: NO SE PUEDE CERRAR.** Balance pendiente. El $2.75M queda etiquetado como EV y **no se promedia** contra el cap de equity. SALVEDAD.

### Precio máximo defendible
| Supuesto de exit | P_max (R=55%, M_win=10×) |
|---|---|
| $40M | $2.20M |
| $64M | $3.52M |
| **$87M** | **$4.80M** ← el exit que justifica el precio pedido |

- Lente de valor esperado (p=30%, MOIC=3×): idéntica. Chequeo `M_win = MOIC/p` → 10 = 3/0.30. **Cuadra.**
- **Precio pedido $4.8M vs P_max: fuera**, salvo que la vista de exit sea de ~$87M.
- Recordatorio: `P_max` no depende del ticket. Bajar de $80k a $40k no mejora el precio de entrada.

### Las dos verdades
- **En absoluto:** $4.8M post-money. Dentro de la banda LUCHA ($3M–8M), zona media. Sobre la mediana pre-seed LatAm (~$4.05M), bajo el pre-seed healthcare US (~$6.2M). **Precio de mercado razonable.**
- **En múltiplo:** trailing **5.46×**, forward **3.50×** sobre revenue neto. Para healthtech son múltiplos **bajos** — esta empresa ya tiene ingreso de verdad ($0.88M anualizados), así que el denominador no es chico y el múltiplo no está inflado por levantar temprano.
- Las dos verdades **coinciden acá**, que es poco común: ni cara en absoluto ni cara en múltiplo.

### Ownership
- Si ata el cap: 80,000 / 4,800,000 = **1.67%**
- Sin descuento de conversión, si la próxima ronda precia en o bajo $4.8M la posición vale exactamente el ticket (1.0×).
- **Stake reportado en el workbook Q2-26: 2.60%. No cuadra con 1.67%.** Reconciliar contra CAA / Ronda Ceibo / CADE antes de publicar.

### Veredicto
**Justa, y la mejor posición del portafolio en calidad de evidencia**, con una condición dura. El precio es razonable en absoluto y barato en múltiplo; el cap es el único alcanzable del portafolio (1.56×, 35% CAGR); y es la única empresa con EBITDA positivo. Pero a `M_win` 10× el precio exige un exit de ~$87M, que está por encima de lo típico para healthtech en LatAm hispanohablante.

**Condiciones para sostener el precio:**
1. Medir el crecimiento real (falta FY-2025). Si crece bajo 35%, el cap deja de ser alcanzable y el veredicto cambia.
2. Escribir la vista de exit con precedentes de M&A del sector. Si el exit realista es $40–48M, el precio justo baja a $2.20–2.64M.
3. Si el exit no llega a $87M, activar retorno multi-vía (dividendos + put/redemption) — es la empresa del portafolio mejor posicionada para pagar dividendos, precisamente por su EBITDA positivo.

### Salvedades abiertas
| Qué falta | Dueño | Qué cambiaría |
|---|---|---|
| FY-2025 depurado | Analista financiero | El factor de crecimiento y el veredicto de alcanzabilidad |
| Balance (deuda, caja, pasivos con prelación) | Finanzas | Permite cerrar el puente EV→equity y comparar métodos |
| Reconciliación 1.67% vs 2.60% de stake | Legal | El valor de la posición reportado a inversionistas |
| Vista de exit documentada | Sponsor del caso | `P_max`, y con eso el veredicto de precio |

---

## Contraste rápido · Grafito · MODO MARCA

El mismo motor sobre el peor caso del portafolio, para mostrar la diferencia:

| | Botica | Grafito |
|---|---|---|
| Cap del SAFE | $4.8M efectivo | $6.0M |
| Run rate | $878,467 | $18,032 |
| Faltan para el cap | **1.6×** | **133×** |
| CAGR requerido | 35% | 2,507% |
| Crecimiento observado | s/d | **−29%** |
| Berry ratio | 1.383 | **0.019** (sueldos = 18× el ingreso) |
| Evidencia de precio | Ronda de tercero reciente | Ronda de $5.46M **sin documento en `Portfolio_Legal`** |
| Si la ronda precia bajo el cap | — | Sin descuento: la posición vale **exactamente el ticket** |
| Veredicto | Alcanzable, justa con condiciones | No alcanzable. Referencia sin respaldo documental |
