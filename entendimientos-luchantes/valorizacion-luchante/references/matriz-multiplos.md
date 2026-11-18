# Matriz de múltiplos · base auditable, factores interpolados, puente a equity

Leer en los pasos M3 y E2.

```
Múltiplo = base_industria × f(etapa) × f(crecimiento) × f(calidad operativa)
EV       = run rate × Múltiplo
Equity   = EV − deuda financiera bruta + caja − pasivos con prelación
```

---

## 1 · Base por industria, en dos pasos

La base **no es un número redondo puesto a mano**. Es:

```
base_industria = comparable público EV/Sales × (1 − descuento de iliquidez y tamaño)
```

Así el descuento se discute por sus propios méritos y la actualización anual del comparable es una sola columna.

| Industria | Base vigente | Comparable público implícito (con descuento 40%) | Racional |
|---|---|---|---|
| Edtech | 3.5× | 5.8× | SaaS educativo B2B |
| HealthTech | 3.5× | 5.8× | Salud digital / distribución |
| Fintech | 4.0× | 6.7× | Premium por recurrencia y escalabilidad |
| Proptech | 3.5× | 5.8× | Mezcla fintech–inmobiliaria |
| Ecommerce | 2.5× | 4.2× | Marketplace, margen bajo castiga |
| FoodTech | 2.5× | 4.2× | Márgenes no probados |
| Mobility | 2.5× | 4.2× | Capital-intensiva, hardware + financiamiento |
| Climate | 3.0× | 5.0× | Capital-intensiva, premium por impacto |
| Climate (agro) | 4.0× | 6.7× | Premium por escasez e impacto |
| Apparel | 1.0× | 1.7× | Retail / consumo |
| Biotech pre-revenue | **N/A** | — | **Un múltiplo de ventas sobre cero no existe.** Usar otro método |

> **SALVEDAD ABIERTA.** La columna "comparable público implícito" está **derivada hacia atrás** desde las bases que traía el workbook, no leída de una fuente. En la próxima corrida hay que reemplazarla por la cifra real de Damodaran (emerging markets, por industria) **con fecha de publicación y tamaño de muestra**, y recalcular las bases hacia adelante. Hasta entonces, las bases son razonables pero no citables ante un LP.

---

## 2 · Factores, todos interpolados

**Prohibidos los escalones.** Un salto de 0.90 a 1.10 entre 29.9% y 30.1% de crecimiento mueve el múltiplo 22% por un decimal en un número que ya venía de una estimación. Se interpola linealmente entre anclas; fuera de rango se toma el ancla extrema.

### f(etapa)
| Etapa | Factor |
|---|---|
| Pre Seed / MVP | 0.85 |
| Seed | 1.00 |
| Serie A+ | 1.15 |

### f(crecimiento) — interpolar
| Crecimiento anualizado | Factor |
|---|---|
| ≤ −30% | 0.70 |
| 0% | 0.85 |
| +30% | 1.00 |
| +70% | 1.15 |
| +150% | 1.40 |
| ≥ +250% | 1.60 |

**Compresión por confianza:** si el crecimiento se midió sobre **menos de 4 trimestres**, el factor se comprime a la mitad hacia 1.00:
`f_ajustado = 1 + (f − 1) × 0.5`. Un dato flaco no puede mover el múltiplo tanto como un dato sólido.

**Una sola definición de crecimiento por corrida.** El workbook de Q2-2026 tenía dos conviviendo para Ruta (+164.8% YoY trimestral en la hoja `Mapa`, +114% anualizado vs FY25 en `Base Valorización`), que caen en tramos distintos y dan 19% de diferencia en el múltiplo. Declarar cuál se usa, arriba, y usarla en todos lados.

### f(calidad operativa) — sustituye a "margen bruto"
Un margen bruto sano con un opex de 18× el ingreso no es calidad. Se combinan dos sub-factores por **media geométrica**:

```
f(calidad) = √( f_margen × f_eficiencia )
```

**f_margen** (margen bruto), interpolar:
| Margen bruto | Factor |
|---|---|
| ≤ 15% | 0.85 |
| 35% | 1.00 |
| 65% | 1.15 |
| ≥ 85% | 1.25 |

**f_eficiencia** (Berry ratio = utilidad bruta / opex), interpolar:
| Berry | Factor |
|---|---|
| ≤ 0.30 | 0.75 |
| 1.00 | 1.00 |
| 2.00 | 1.10 |
| ≥ 3.00 | 1.15 |

Si el Berry no está disponible, usar **0.90** y marcarlo como salvedad. Nunca omitir el sub-factor (omitirlo equivale a asumir eficiencia perfecta).

---

## 3 · Comparación con el método anterior (Q2-2026)

El cambio de escalones a interpolación **no vuela los números del analista financiero**: los mueve dentro de ±13% y los vuelve continuos y auditables. Lo que sí cambia el resultado de verdad es el tratamiento del cap y el puente a equity.

| Empresa | f(crec) | f(calidad) | Múltiplo nuevo | Múltiplo anterior | Δ |
|---|---|---|---|---|---|
| Ruta | 1.288 | 1.055 | **3.40×** | 3.88× | −12.5% |
| Grafito | 0.703 | 0.884 | **1.55×** | 1.75× | −11.2% |
| Faro | 0.768 | 1.031 (Berry s/d → 0.90) | **2.77×** | 2.82× | −1.6% |
| Botica | 0.925 | 0.967 | **3.13×** | 3.15× | −0.6% |
| Hogar | 0.925 | 0.882 (Berry s/d → 0.90) | **2.86×** | 2.68× | +6.6% |
| Raíz | — | — | **N/A** (sin ventas) | 2.60× calculado y no usado | Debe decir N/A, no un número |

Nótese Grafito: el factor de calidad baja de 1.00 a 0.884 porque ahora entra su Berry ratio de 0.019× (los sueldos son 18× el ingreso neto). Eso antes no tocaba el múltiplo por ningún lado.

---

## 4 · Puente EV → equity  (paso obligatorio, el que faltaba)

Un múltiplo EV/Sales produce **enterprise value**: el valor del negocio completo, deudas incluidas. El precio de una ronda es **equity post-money**. **No son la misma cosa y no se promedian.**

```
Equity = EV − deuda financiera bruta + caja − pasivos con prelación sobre el equity
```

"Pasivos con prelación" incluye préstamos de accionistas y cuentas por pagar a accionistas — cobran antes que el equity. Piso en 0.

**Si el balance no está disponible** (marcado PENDIENTE en casi todas las hojas Modelo del Q2-2026), el puente no se cierra. En ese caso:
1. Reportar el resultado del múltiplo **etiquetado como EV**, no como valor de la empresa.
2. **No promediarlo** contra un post-money de equity.
3. Salvedad explícita con el dueño del dato y la fecha comprometida.

Ejemplo de por qué importa: Raíz tiene $496k de pasivos a junio 2026, de los cuales $156k son obligaciones financieras y $256k cuentas por pagar a accionistas. Cualquier EV que no reste eso sobreestima el equity en cientos de miles de dólares — sobre una empresa valorizada en $5M.
