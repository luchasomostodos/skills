# Modo ENTRADA · precio máximo defendible

Leer en el paso E4. Este archivo responde la pregunta al revés: no "cuánto vale la empresa" sino **"cuánto podemos pagar y seguir cumpliendo el mandato del fondo"**.

---

## 1 · La derivación

Invertimos un ticket `Tk` a un post-money `P`. Entonces:

```
ownership al entrar   = Tk / P
ownership al salir    = (Tk / P) × R          R = retención tras dilución futura
valor de la posición  = V_exit × (Tk / P) × R
```

Exigimos que, **si el caso funciona**, la posición devuelva `M_win` veces el ticket:

```
V_exit × (Tk / P) × R  ≥  M_win × Tk
```

`Tk` se cancela a ambos lados:

```
P_max = V_exit × R / M_win
```

**Resultado que hay que decir siempre en voz alta: el precio máximo de entrada no depende del tamaño del ticket.** Depende solo de la vista de salida, la dilución futura y el retorno exigido. Negociar el ticket no arregla un precio de entrada malo.

### La misma ecuación por valor esperado

```
P_max = p × V_exit × R / MOIC_fondo
```

Las dos lentes son idénticas cuando **`M_win = MOIC_fondo / p`**. Con los defaults: `10 = 3 / 0.30`. Si en un caso concreto no cuadran, hay dos supuestos peleados y eso es un hallazgo, no un detalle de cálculo.

---

## 2 · Tabla de referencia (R = 55%)

| V_exit | M_win = 8× | M_win = 10× | M_win = 12× |
|---|---|---|---|
| $30M | $2.06M | $1.65M | $1.38M |
| $50M | $3.44M | **$2.75M** | $2.29M |
| $80M | $5.50M | $4.40M | $3.67M |
| $120M | $8.25M | $6.60M | $5.50M |

---

## 3 · El desafío que esta tabla le hace a LUCHA

La regla de entrada vigente es **USD 3M–8M post-money** (`../entendimiento-luchante/references/kill-criteria.md`, con 8M como techo y excepción). Cruzándola con la tabla, y con `M_win = 10×` y `R = 55%`:

- Un precio de entrada de **$3M** exige un exit de **~$55M**.
- Un precio de entrada de **$8M** exige un exit de **~$145M**.

Esos son exits grandes para Access Tech y Climate Tech en LatAm hispanohablante, en un fondo de 10+2 años, con founders que en varios casos priorizan dividendos sobre venta. **La conclusión no es que la regla esté mal**, sino que la banda alta ($6M–$8M) solo se sostiene si:

1. La vista de exit es genuinamente de $100M+ y está escrita, no asumida; **o**
2. La estructura de retorno multi-vía (dividendos + put/redemption + drag-along, ver `../entendimiento-luchante/references/sistema/el-system.md`) reemplaza parte del retorno que el exit no va a dar; **o**
3. `R` es mejor que 55% porque protegemos ownership con pro-rata.

**Regla operativa:** cuando el precio pedido esté sobre `P_max`, el output no dice "caro" y se acaba. Dice **cuál de las tres condiciones de arriba tendría que cumplirse**, y esa condición pasa a la sección de Términos del EL como algo que hay que negociar o documentar.

---

## 4 · De dónde sale `V_exit`

Por orden de calidad:
1. **Precedentes de M&A del sector en LatAm**, con múltiplo pagado y tamaño de la empresa al vender. Es la mejor fuente.
2. **Comparables públicos** aplicados al ingreso proyectado a 5–7 años, con el descuento de iliquidez.
3. **Vista del founder sobre su exit**, tratada como hipótesis a validar, nunca como input directo.

Declarar cuál se usó. Un `V_exit` sin procedencia convierte todo el cálculo en un ejercicio circular: se elige el exit que justifica el precio que ya se quería pagar.

---

## 5 · Checklist del modo ENTRADA

- [ ] Instrumento declarado (SAFE post/pre-money, nota, priced) y todo en post-money
- [ ] Corrido el test de alcanzabilidad del cap (`cap-safe.md` §3)
- [ ] Los tres números de la Regla Cero reportados, los tres
- [ ] `P_max` calculado con las dos lentes y chequeo `M_win = MOIC/p`
- [ ] Las dos verdades (absoluto y múltiplo) dichas por separado
- [ ] Ownership como rango si el SAFE no ha convertido
- [ ] Si el precio > `P_max`: nombrada la condición que tendría que cumplirse
- [ ] Tabla de parámetros pegada al output
