# Dim 02 · Negocio y Salud Financiera

> Detalle de dimensión del EL. Se carga **solo** cuando se construye esta dimensión. La espina (pesos, semáforo, runbook) vive en `references/sistema/el-system.md`. Pesos internos: Producto y tracción 25, Modelo y unit economics 20, Defensibilidad 15, Validación técnica 15, Salud operativa 15, Assessment Partner de Negocio 10. El motor `analisis-financiero-el` entrega los números.

> ### Si el Gate VC-backable dio NO
>
> **Estas anclas no aplican tal cual.** Carga primero `references/dimensiones/anclas-caso-no-vc-backable.md`, que trae las anclas de reemplazo, la ponderación de las nueve dimensiones por gate, y la regla de que ningún hecho usado por el gate vuelve a puntuar en ninguna dimensión.
>
> **Producto y Modelo, 45% del peso, tienen anclas de SaaS**: MRR, ARR, NPS, retention de logo, CAC payback, LTV sobre CAC. **El fork las reemplaza** por cobertura contractual y concentración de comprador, y por margen de contribución por unidad vendida con la curva de costos separada entre eficiencia y escala. Y acá sube de 12% a 18% de peso, el mayor de las nueve, porque sin exit la caja del negocio es el retorno.

Pregunta guía: el modelo cierra y escala. El motor `analisis-financiero-el` entrega los números; el score y el framing los pone la persona.

- Modelo y unit economics, Salud operativa: el motor da margen de contribución, EBITDA, runway, cobertura de servicio de deuda. La persona puntúa contra ancla.
- Producto y tracción: el motor da revenue real vs proyección reconciliado; la lectura de tracción es juicio.
- Defensibilidad: juicio. Una ventaja de supply chain (ej. farma) es contestable, no estructural. No tratarla como moat estructural.
- Validación técnica: assessment del co-founder técnico. Sub-variable que entra al score (15%); el bloque narrativo de "Capacidad Técnica" fue removido del documento.
- Assessment Partner de Negocio: lo pone el Partner de Negocio.

Doble click: dashboard de KPIs con modos activables (Pre-revenue / Revenue), para transaccional KPIs transaccionales, + 2 gráficos (line de trayectoria, donut de composición) + 6 sub-bloques narrativos con score y peso.

**Bloque económico estándar (Detalle económico).** Cuando hay revenue recurrente, Dim 02 incluye un bloque "Detalle económico · data del modelo" con: (1) **usuarios pagantes por mes + crecimiento MoM** (base total, no solo el plan flagship); (2) **churn como tendencia, no foto de un mes**: churn mensual + rolling L3M/L6M por plan, más el blended (retención mensual → churn); (3) **mix, precio y duración de planes** (miembros, % mix, precio con su USD/mes, avg lifetime, LTV/CAC) y el split **mensual vs anual** (si no sale limpio del modelo, marcarlo como pregunta al founder); (4) **curva de retención por cohorte** (M1…MN por camada). Cierra con el **check de reconciliación**: si el headline de retención (1/(1−churn) → lifetime) es más optimista que las cohortes, levantar el flag y dejarlo como pregunta a reconciliar con el founder. Los números los entrega `analisis-financiero-el`. Es el detalle que pide el comité (estilo del Partner de Mercado): churn, tendencia, cohortes y duración, no solo el promedio.

**Simulador de drivers del negocio (regla del 2026-09-30).** La Dim 02 lleva un bloque propio, "Simular los drivers del negocio", después de las subvariables. El partner mueve los drivers reales del modelo de la empresa y ve qué pasa con la caja y con los ingresos.

- **Qué drivers.** Entre tres y cinco, los supuestos de los que sale el ingreso del modelo de ese caso. No hay lista fija, porque cambian con el tipo de negocio.
- **Qué muestra.** Arriba los resultados, abajo los drivers. Entre los resultados va siempre el capital que falta, que enlaza a la Dim 03. Cierra con el "¿Qué tiene que ser cierto?", que resuelve qué valor de un driver hace falta para una meta del plan. Las metas se miden en absoluto, contra el plan, y nunca como el cruce entre dos líneas que puede mejorar cuando el negocio empeora.
- **El costo.** Si en el modelo no escala con el volumen, no es driver y se dice en la nota del bloque.
- **El puntaje no se mueve.** El simulador muestra qué tendría que pasar, la nota de la dimensión es la del caso como está.
- **La fórmula es la del modelo.** Con los drivers en su valor del modelo, cada resultado calza con su celda con un margen de 2%, o el EL no se construye.
- **Las palancas las declara quien hace el EL.** Si LUCHA puede mover el driver, con qué acción y hasta qué valor. El sistema no las infiere. Van en verde, "Qué haría LUCHA", o en gris, "Depende del mercado". Un driver sin declarar bloquea la publicación.

Los drivers y la fórmula los entrega `analisis-financiero-el` en su Paso 2d. La constante es `DRIVERS`, descrita en `assets/plantilla/README-plantilla-EL.md`.
