# Changelog · valorizacion-luchante

## Mark 1 — nacimiento

**Fecha:** 2026-08-28
**Autor:** el líder del caso (dirección) sobre reverse engineering del workbook del analista financiero
**Origen:** `Data_Financieros_por_Empresa_CON_VALORIZACION.xlsx` (analista financiero, Q2-2026) y la regla del líder del caso de que el CAP de un SAFE no es el valor de hoy sino cuánto puede llegar a valer.

**Qué trae:**
1. **Regla Cero**: precio de entrada, valor implícito hoy y valor alcanzable son tres números distintos y se reportan los tres.
2. **Motor de CAP** (`references/cap-safe.md`): test de alcanzabilidad, valor implícito a presente, efecto del cap en el ownership, y la lectura de que el upside de un SAFE solo existe si el cap ata.
3. **Dos modos**: ENTRADA (precio máximo defendible desde el retorno del fondo) y MARCA (fair value trimestral).
4. **Taxonomía de evidencia** con factor de calibración derivado (tipo × antigüedad × hitos), que nunca queda en 1.00 por default.
5. **Matriz de múltiplos interpolada**, base en dos pasos auditables, y factor de calidad que incorpora eficiencia operativa (Berry), no solo margen bruto.
6. **Puente EV → equity** como paso obligatorio.
7. **Ponderación por escenario** en vez de por método, con reporte obligatorio del rango.

**Qué reemplaza:** el cálculo de valuación de `analisis-financiero-el` (Pasos 5 y 8a), que ahora delega acá.

**Pendientes abiertos al cerrar Mark 1:**
- `MOIC_fondo` no está escrito en `00_Reference/Fondo Luchante.md`. Se corre con 3× a 7 años como default propuesto.
- Los comparables públicos de la matriz están derivados hacia atrás desde las bases del analista financiero. Reemplazar por Damodaran con fecha y muestra.
- Falta confirmar, empresa por empresa, qué instrumento respalda cada "última ronda" del portafolio (SAFE con cap vs ronda priced). Ese dato vive en el Excel Supremo, fuera de este workspace.

---

## Mark 1.1 — calibrado contra los documentos firmados

**Fecha:** 2026-08-28
**Origen:** el líder del caso pidió verificar los SAFEs reales antes de dar la metodología por buena.

Qué cambió tras leer `Portfolio_Legal/*/2. SAFE/`:
1. **Corrección de fondo:** los cinco SAFEs de LUCHA son YC post-money **"Valuation Cap only", sin descuento de conversión**. La rama baja no devuelve `ticket/(1−d)`: devuelve **exactamente el ticket, 1.0×**. El argumento contra los caps altos es más fuerte de lo que se escribió en Mark 1.
2. **Inventario verificado** de caps, tickets y ownership implícito (`cap-safe.md` §1), y cross-check contra los stakes reportados: cuadran Ruta y Faro, no cuadran Grafito, Botica y Hogar.
3. **Tabla de alcanzabilidad rehecha con los caps reales.** Botica pasa de "apretado" a **alcanzable (1.6×, 35% CAGR)**; Ruta queda moot porque su cap ya ató contra la ronda Vértice Capital de $15M.
4. **Taxonomía de evidencia** actualizada con el cruce documento por documento: en 4 de 6 empresas el número que el workbook llama "última ronda" no coincide con ningún documento firmado.
5. Cierra el pendiente `MET-DIL` / `RUT-V1` (método de conversión de SAFEs y dilución), abierto con el analista financiero desde 2026-06-05.

---

## Mark 2 — vector RLA de madurez

**Fecha:** 2026-08-28
**Origen:** el líder del caso compartió la calculadora de un fondo deeptech (Readiness Level Assessment, 6 dimensiones 1–9 con evidencia por dimensión) y pidió integrarla, no solo para deeptech.

Qué trae:
1. **`references/rla-madurez.md`** — vector de **8 dimensiones** 1–9 con definición escrita por nivel. Las 6 del original (TRL, IPRL, BRL, CRL, TmRL, GRL) más dos de LUCHA: **RegRL (regulatorio y licencias)** e **ImpRL (impacto, alineado al Gate N1–N4)**.
2. **Pesos por tipo de empresa.** Portado literal, el original no sirve fuera de deeptech: Technology sale 9 e IP sale 2 en todo nuestro portafolio y el vector no informa. Con pesos por tipo, CRL y BRL mandan en marketplace y RegRL manda en fintech y healthtech. ImpRL pesa 10 en todos y no se negocia.
3. **Uso 1 — valor por madurez** (`Valor = piso + (techo − piso) × g^1.5`), el método que faltaba para pre-revenue. Raíz pasa de $5.0M sin documento a **$2.66M documentado**.
4. **Uso 2 — calibración de `p`**, el parámetro más arbitrario del modo ENTRADA. Deja de ser 30% tecleado y sale del vector con evidencia. Mueve `P_max` 2.8× entre RLA 3 y RLA 8.
5. **Uso 3 — disciplina de evidencia**: nivel sin evidencia se reporta como el nivel inferior que sí la tenga.
6. **`references/bloque-el-rla.md`** — spec de render del bloque en el artifact del EL, entre Dim 03 y Validación externa.

Decisión de diseño: **el RLA NO es un scorecard paralelo al Mapa Luchante.** Es insumo de valorización y calibrador de `p`. Los 0–100 del Mapa siguen siendo el score del EL.

Diferencia deliberada con la herramienta original: ahí los tres números de valuación (modelo interno / última cerrada / ronda abierta) son chips donde eliges uno. Acá los tres se muestran siempre y ninguno es elegible — la fuente la decide la taxonomía de evidencia.
