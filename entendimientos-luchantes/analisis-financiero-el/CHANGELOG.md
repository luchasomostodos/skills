# Changelog · analisis-financiero-el

## Mark 88 → Mark 89

**Fecha:** 2026-08-28
**Autor:** el líder del caso
**Origen:** reverse engineering del workbook de valorización del analista financiero y verificación de los SAFEs firmados en `Portfolio_Legal`. Se detectó que el cálculo de valuación vivía en dos lugares (este skill y el workbook trimestral) con criterios distintos.
**Resumen:** este skill deja de emitir el veredicto de precio. Nace `valorizacion-luchante` como única fuente de verdad y este motor le entrega los inputs.

Qué cambió:
1. **Encabezado/versión:** Mark 88 → Mark 89.
2. **Paso 5** pasa de "Benchmarkear el valuation con las dos verdades" a "Preparar los inputs de valorización y entregarlos". Conserva la tabla de denominador por tipo y los múltiplos trailing/forward; pierde el veredicto de fairness. Se agrega la tabla de handoff.
3. **Paso 8a** delega el cálculo de valuación defensible. 8b, 8c y 8d intactos.
4. **Reglas inviolables:** +1 (no emitir el veredicto de precio).
5. **Formato de salida (Dim 03):** la línea de Valuation apunta al skill nuevo.
6. **Benchmarks embebidos:** se conservan como contexto, con nota de que el veredicto se emite fuera.
7. **Frontmatter:** se saca "valuation vs benchmark" de los triggers y se agrega el NO-dispara hacia `valorizacion-luchante`.

Copia previa en `Archived/historial-versiones-skills/2026-08-28-analisis-financiero-el-pre-delegacion/`.

---

## Mark 87 → Mark 88

**Fecha:** 2026-06-26
**Autor:** el analista financiero
**Origen:** observaciones del analista financiero sobre el modelo de Brote (proyección de revenue sin lógica de crecimiento, COGS/GM que no escala, SG&A sin desglose, necesidad de acoplar marketing a la adquisición y entender el funnel comercial).
**Resumen:** se añade el paso **2d "Anatomía de la proyección"**, que prueba si la proyección tiene motor (driver-based) o son metas tecleadas, y entrega preguntas abiertas al founder.

Qué cambió:
1. **Encabezado/versión:** Mark 87 → Mark 88, con línea de apertura nueva.
2. **Nuevo paso 2d** (corre siempre, todos los tipos), con cuatro lentes: (A) revenue driver-based vs tecleado y reconstrucción desde drivers; (B) escalamiento de COGS y compresión esperada del GM; (C) desglose de SG&A; (D) acoplamiento marketing↔adquisición (CAC reinvestment: `clientes nuevos × CAC ≈ marketing`) y dominio del funnel comercial por el founder. La salida incluye una lista de preguntas abiertas.
3. **Paso 6 banderas estructurales:** +4 banderas (revenue tecleado, COGS que no escala, SG&A en caja negra, plan de adquisición subfinanciado).
4. **Formato de salida (Dim 02):** nueva línea "Anatomía de la proyección" + preguntas al founder.
5. **Reglas inviolables:** +1 (distinguir driver-based de metas tecleadas; no validar lo que no se reconstruye desde drivers; levantar marketing desacoplado de la adquisición).
6. **references/modelo-parsing.md:** nueva sección "Anatomía de la proyección" con qué celdas buscar y cómo reconstruir revenue/marketing.

Mecánica del deal (ratio Studio/FL), clasificación por tipo (Mark 87) y Reverse Engineering intactos.

---

## Mark 86 → Mark 87

**Fecha:** 2026-06-25
**Autor:** el analista financiero (handoff del líder del caso)
**Resumen:** El motor ahora clasifica la empresa en uno de 4 tipos y adapta KPIs, banderas y denominador del múltiplo a cada uno. Antes asumía suscripción por default con una sola nota suelta para transaccional.

## Qué cambió

1. **Encabezado / versión.** Subido de Mark 86 a Mark 87. Añadida la línea de apertura que describe la clasificación por tipo.

2. **Nuevo Paso 2.5 "Clasificar la empresa".** Insertado entre el Paso 2 (parsear) y el 2b. Incluye la tabla de decisión (SaaS, transaccional/marketplace, healthtech, fintech/lending), las reglas de clasificación (motor de revenue dominante, manejo de híbridos) y el output obligatorio "Tipo detectado + señales".

3. **Paso 2c ramificado.** Reemplazado el bloque único "Detalle económico de suscripción" por un set de KPIs y unit economics por cada uno de los 4 tipos. El check de reconciliación headline-vs-cohorte queda solo para SaaS y para la línea de suscripción de healthtech.

4. **Paso 5 y 8a — denominador del múltiplo por tipo.** El denominador ahora depende del tipo: ARR (SaaS), revenue neto / GMV×take rate (transaccional), ARR institucional o revenue neto (healthtech), revenue neto de riesgo post-provisión (fintech). Añadida tabla de denominadores trailing/forward. La nota suelta de transaccional del 8a se generalizó a los 4 tipos.

5. **Paso 6 — banderas por tipo.** Las banderas estructurales (deuda, posiciones duales, EBITDA vs servicio de deuda) se conservan para todos los tipos; debajo se añadió un bloque de banderas propias de cada tipo.

6. **Formato de salida (Dim 02).** El pack ahora abre con "Tipo detectado: [X] · Señales: [...]" y el bloque de KPIs es el del tipo detectado, no SaaS por default.

7. **references/modelo-parsing.md.** Reemplazada la sección final "Negocio transaccional vs suscripción" por una de los 4 tipos, indicando qué etiquetas buscar en el modelo para cada uno (ej. lending: "cartera/originación/mora/provisión"; marketplace: "GMV/take rate/transacciones").

8. **Reglas inviolables.** Añadida: "Clasificar el tipo de empresa antes de elegir KPIs y denominador de múltiplo. No correr el set de SaaS por default." La regla de transaccional se amplió para incluir lending.

## Qué NO cambió (intacto)

- Mecánica del deal: ratio Studio/FL, EI, sweat, premio de vesting, y `references/calculadora-ratio.md`.
- Triple check de márgenes y consistencia de la proyección (Paso 2b).
- Reconciliación de framing (trimestral vs anualizado, IGV).
- Las dos verdades del valuation (absoluto vs múltiplo) — solo cambió el denominador del múltiplo.
- Banderas estructurales de deuda.
- Reverse Engineering (Paso 8) y el resto de reglas inviolables.

## Mark 90 · 2026-09-30

Lente E del paso 2d, el pack de drivers para el simulador de la Dim 02. Drivers con valor del modelo, rango y lo observado, la fórmula `calc` que reproduce el modelo, las salidas con el capital que falta, la calibración de 2% contra las celdas, y las metas medidas contra el plan. Las palancas no las escribe el motor, las declara quien hace el EL. Detalle en `Funnel/00_Proceso/reingenieria-EL/2026-09-30-diff-simulador-drivers-negocio.md`.

## Mark 91 · 2026-09-30

El paso 2.5 reconoce siete tipos del Gate B. Activo biológico usa la tabla de su motor de revenue dominante y además revisa la curva de rendimiento según la edad de la planta o del lote, el costo por hectárea y el año de producción plena. Nace del caso Cardo Foods.
