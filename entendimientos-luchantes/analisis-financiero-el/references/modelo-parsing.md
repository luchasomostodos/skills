# Parsing del modelo financiero seed (referencia del motor)

Cómo extraer data del modelo seed estándar LUCHA sin asumir el layout puntual de un caso. El layout exacto (filas, columnas) varía por empresa: localiza por etiqueta, no por índice hardcodeado.

## Estructura típica del workbook

Hojas habituales: `Financials`, `Executive Summary`, `Debt Schedule`. Puede haber más. No asumas nombres exactos: lista las hojas primero.

```python
import pandas as pd
xls = pd.ExcelFile(path)
print(xls.sheet_names)
df = pd.read_excel(xls, sheet_name="Financials", header=None)  # header=None: el modelo trae headers irregulares
```

## Localizar TOTAL REVENUE

No asumas que está en una fila fija. Búscala por etiqueta y mapea sus columnas.

1. Recorre la columna de etiquetas buscando la fila de TOTAL REVENUE (o equivalente).
2. Mapea las columnas: el modelo suele tener primero columnas de año fiscal y luego columnas mensuales (ej. arrancando en cierto mes del año). Identifica cuáles son anuales y cuáles mensuales antes de leer valores.
3. Distingue revenue real (meses ya cerrados) de proyectado (meses futuros).

## Qué extraer

- **Revenue:** real vs proyectado, mensual y anualizado. Guarda ambos framings para el chequeo de reconciliación.
- **Trayectoria de márgenes:** GM%, COGS%, SG&A% y EBITDA%, tanto históricos (por mes/trimestre) como proyectados (por año). Los necesitas para el triple check de más abajo.
- **Margen de contribución y EBITDA:** por periodo, idealmente trimestral.
- **Escenario activo:** qué escenario corre el modelo (bear/base/bull) y los toggles (ej. clínicas ON/OFF).
- **Servicio de deuda:** por trimestre, desde el Debt Schedule.
- **Debt Schedule completo:** todos los instrumentos de deuda con sus términos. Cruzar contra el cap table y los SAFE.
- **Suscripción (si aplica):** localiza por etiqueta las hojas/secciones de usuarios, churn y cohortes (los nombres varían: "Users", "Cohorts", "KPIs", "Suscriptores"). Extrae usuarios pagantes por mes, churn mensual, y la matriz de retención por cohorte. Si no existen en el modelo, es bandera de información faltante, no algo a estimar.

## Chequeos obligatorios antes de reportar

- **IGV:** confirma si las cifras de revenue están con o sin IGV. Una diferencia de revenue suele ser tratamiento de IGV, no un error.
- **Framing trimestral vs anualizado:** reconcilia antes de marcar discrepancia. Total de un trimestre no es lo mismo que run rate anualizado.
- **Deuda fuera del Debt Schedule:** cualquier préstamo conocido (ej. préstamos personales de backers a los founders) que no aparezca en el Schedule es bandera de transparencia.
- **Posiciones duales:** un mismo backer que aparece como equity y como deuda necesita clarificación estructural.
- **Cobertura de servicio de deuda:** revisa si el EBITDA cubre el servicio de deuda en los trimestres tempranos post seed, y si el seed termina financiando servicio de deuda en vez de growth.

## Trayectoria de márgenes y consistencia de la proyección (triple check)

El motor no solo reporta los márgenes: chequea que la proyección sea creíble. Triple check obligatorio antes de cerrar el pack.

1. **Ancla a los actuals.** Calcula GM%, COGS%, SG&A% y EBITDA% históricos (promedio y tendencia de los últimos meses) y los mismos por año en la proyección. Si el primer año de proyección parte de un margen materialmente distinto al histórico sin un puente explícito (ej. GM que salta de ~80% real a >90% proyectado), es bandera: la proyección debe partir de donde está el negocio, no de un ideal.

2. **De dónde viene la mejora de margen.** Si el EBITDA mejora, aísla la causa: ¿COGS% que baja, SG&A% que baja, o ambos? Casi siempre es operating leverage asumido (SG&A crece más lento que revenue). Reporta el múltiplo de revenue vs el múltiplo de SG&A entre el primer y el último año proyectado; un revenue 12x con SG&A 3x es una apuesta de leverage, no un hecho.

3. **Cruza los supuestos contra el modelo de negocio y el plan.** La expansión de margen tiene que ser consistente con la dirección del negocio:
   - Si el negocio se expande vía add-ons con costo humano (contabilidad, supervisión clínica, educación) o vía un motion B2B/clínicas con vendedores, COGS% y SG&A% no deberían colapsar a niveles de software puro. Margen creciente más servicios humanos crecientes es una contradicción a marcar.
   - Si hay plan de contrataciones declarado (key hires, vendedores, ingenieros), el payroll debería crecer en línea con ese plan. Si el modelo crece SG&A mucho menos de lo que el plan implica, el costo está subestimado.

4. **Escenario activo.** Reporta qué escenario corre el headline (bear/base/bull) y los toggles. Si está en bull, pide el base y subraya que el headline es el optimista.

5. **Dependencia de segmentos no validados.** Si una línea que hoy es 0 (ej. clínicas) pesa en el revenue o el margen proyectado, márcalo: la trayectoria descansa en algo aún no probado, y suele tener un margen distinto al del core.

Conclusión a entregar: una frase sobre si los márgenes crecen, por qué, y si esa trayectoria ancla a los actuals y es consistente con el modelo y el plan, o si es optimista y debe re-cortarse (anclar GM a actuals, crecer SG&A con el plan, correr el base).

## Anatomía de la proyección: ¿los números tienen motor? (paso 2d del SKILL)

El triple check valida que los márgenes anclen; este chequeo valida que la proyección esté **construida desde drivers** y no sea un set de metas tecleadas. Genera hallazgos y, sobre todo, **preguntas para el founder**. Qué buscar en el modelo:

- **Revenue (driver-based vs tecleado).** Busca las celdas que alimentan el revenue proyectado. ¿Sale de un build-up (# clientes × ARPU, o volumen × ticket × frecuencia) con una tasa de crecimiento explícita, o son montos escritos a mano fila por año? Intenta reconstruir el revenue desde los drivers (ej. `clientes EOY × ARPU anual`); si no cuadra con la fila de revenue, o si el crecimiento de clientes es un salto sin lógica, es bandera. Pregunta el raciocinio detrás de las metas.
- **COGS y GM.** Compara COGS% histórico vs proyectado. Si el COGS no escala con el volumen (líneas de costo directo planas mientras el revenue se multiplica) o el GM se sostiene altísimo/sube por años sin puente, márcalo como optimista. Postura base: el GM tiende a comprimirse algo al escalar salvo prueba de lo contrario.
- **SG&A (desglose).** Localiza el detalle de SG&A. Si viene como un solo número agregado por año, pide el breakdown (payroll por rol/headcount, marketing y ventas, G&A). Sin desglose no se puede auditar el plan de gasto.
- **Acoplamiento marketing ↔ adquisición.** Cruza el gasto de marketing proyectado contra los clientes nuevos por periodo y el CAC: `clientes nuevos × CAC ≈ presupuesto de marketing`. Si el revenue asume muchos clientes nuevos pero el marketing no crece en proporción, el plan de adquisición está subfinanciado o el CAC está subestimado. Busca también señales del funnel comercial (% de cierre, ciclo de venta, CAC por canal); si no están en el modelo, van como pregunta al founder.

## Clasificar el tipo de empresa (cuatro tipos)

Después de parsear, clasifica la empresa por su **motor de revenue dominante** y corre el set de KPIs del tipo. No fuerces el set de SaaS por default. Localiza por etiqueta las señales de cada tipo en las hojas del modelo; los nombres exactos varían, busca por equivalentes.

### SaaS / suscripción
- **Etiquetas a buscar:** "suscriptores", "subscribers", "planes", "MRR", "ARR", "churn", "mensual/anual", "Users", "Cohorts", "retención".
- **Qué extraer:** usuarios pagantes por mes y MoM; churn mensual + rolling L3M/L6M por plan y blended; mix-precio-duración de planes (avg lifetime, LTV/CAC); split mensual vs anual; matriz de retención por cohorte. Si no existen en el modelo, es bandera de información faltante, no algo a estimar.
- **Denominador del múltiplo:** ARR (trailing y forward).

### Transaccional / marketplace
- **Etiquetas a buscar:** "GMV", "take rate", "comisión", "transacciones", "AOV", "ticket promedio", "compradores/vendedores", "fill/match rate".
- **Qué extraer:** GMV; número de transacciones; take rate (%); **revenue neto** (no GMV); AOV; frecuencia de compra; usuarios activos por lado; retención por lado; CAC por lado. El margen de contribución se calcula sobre revenue neto, nunca sobre GMV.
- **Denominador del múltiplo:** revenue neto anualizado (o GMV × take rate). **NO ARR.**

### Healthtech / digital health
- **Etiquetas a buscar:** "pacientes", "consultas", "clínicas", "aseguradoras", "reembolso", "convenios", "licencia sanitaria", toggle de clínicas ON/OFF.
- **Qué extraer:** pacientes activos y retención; mix B2C vs B2B; ciclo de venta B2B; ARR institucional de convenios; quién paga (paciente / aseguradora / sistema público); márgenes **separados por línea** (software puro vs servicio clínico/humano); costo por consulta; CAC por canal. Reporta blended y por línea: un blended "de software" suele esconder una línea de servicio con margen flaco.
- **Denominador del múltiplo:** ARR institucional si manda; revenue neto si fee-for-service; ambos si híbrido.

### Fintech / lending
- **Etiquetas a buscar:** "cartera", "loan book", "saldo vivo", "originación", "tasa/APR", "mora", "NPL", "provisión", "fondeo", "cosecha/vintage".
- **Qué extraer:** cartera (saldo vivo); originaciones por periodo; tasa/APR; costo de fondeo; spread/NIM; mora/NPL; provisiones/pérdida esperada; default por cosecha; CAC; LTV ajustado por riesgo. El riesgo crediticio es un costo de primera línea: el revenue por interés debe ir neto de provisión.
- **Denominador del múltiplo:** revenue neto de riesgo (después de provisión). **NO ARR ni interés bruto.**

Si es híbrido, declara el tipo primario por el motor de revenue dominante y trata la segunda línea como sub-modelo con sus KPIs aparte. Si no es claro, decláralo como bandera y corre el tipo más conservador.
