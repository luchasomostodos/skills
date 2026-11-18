# Secciones transversales y formato del artifact

> Se carga al producir el artifact. Cada dimensión con detalle propio tiene su archivo en esta misma carpeta (`dim-01` a `dim-09`).

Orden del artifact: **diag/portada → caso brief → Mapa BMC → doble click por dimensión (9) → Validación externa → Plan → Apuesta/El ask → Términos/Calculadora.** Granularidad fina: una sección por turno, validando con el líder del caso.

**Mapa BMC (scorecard).** 9 nodos (`bk`), cada uno con score 0-100 (`bs`) y 2-3 sub-ítems (`su`). REGLA: cada sub-ítem lleva una **métrica o número** (7.66x, $162k, 88, 79%, ~83), no una palabra-estado. "pendiente"/"fuerte" se permiten solo como estado real, no como relleno. El nodo central es Founder/Propósito. El 9º nodo es Resiliencia Tecnológica (Dim 09). Semáforo por clase t-g/t-y/t-r y bd-/dc-.

**Dim 02 Negocio** y **Dim 03 Capital.** Ver "detalle" de cada una más arriba. Dashboard KPIs + 2 gráficos + 6 sub-bloques (02); 6 callouts + 5 sub-bloques (03). El motor `analisis-financiero-el` entrega los números.

**Validación externa.** Bloques `vex-block` tipados: (1) Capacidad técnica (ficha del tech lead/CTO `vex-cto-head` + cards + veredicto), (2) Opiniones de expertos, (3) clientes, (4) inversionistas. Cada quote con señal `sn-val`/`sn-obs`/`sn-pre` y la dimensión que sustenta. Omitir el bloque que no tenga material (no inventar expertos).
