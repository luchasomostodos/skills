# Carril del caso y versión de reglas

**Versión de reglas vigente: 2026-10-26.** Cada EL declara en su Metodología la versión con la que se construyó. Un cambio de pesos o de criterio crea una versión nueva y no se aplica a un EL ya abierto. Así los EL de una misma versión se pueden comparar entre sí. La única excepción la autoriza el Managing Partner por escrito y se anota en el historial con su razón.

Nace del blueprint del EL (`Funnel/00_Proceso/flujograma/2026-09-24-blueprint-EL-funnel.html`). Diff aprobado el 2026-09-28 en `Funnel/00_Proceso/reingenieria-EL/2026-09-28-diff-sistema-proceso-decidido.md`.

## Cuándo se declara

El carril se declara al entrar al EL, justo después del pitch. Claude lo propone en un loop con el Managing Partner, con el deck, el pitch y el Portfolio Fit Check. Se **confirma por escrito antes de puntuar la primera dimensión**, ya con el ledger y el cruce de los tres motores. En la confirmación solo cambia si un hecho del ledger, con su fuente, lo justifica. Si cambia, se dice qué hecho lo cambió.

## Gate A · VC-backable, vertical y deeptech

VC-backable sí o no, con las cuatro preguntas de EL System. Si es sí, la vertical es Access Tech o Climate Tech. La pregunta de deeptech solo aplica a Climate Tech, porque una Access Tech casi nunca es deeptech. Si es no, el carril es Green Zebra, que no tiene columna propia de pesos y usa la de su tipo de negocio.

## Gate B · tipo de negocio

Siete tipos. Hardware o deeptech, software puro, servicio apoyado en tecnología, marketplace con operación física, crédito o balance, producto regulado y activo biológico. El tipo elige los pesos del vector de madurez y los manda sobre la tabla de cuatro columnas de `../valorizacion-luchante/references/rla-madurez.md`.

| Dimensión del vector | Hardware o deeptech | Software puro | Servicio con tecnología | Marketplace físico | Crédito o balance | Producto regulado | Activo biológico |
|---|---|---|---|---|---|---|---|
| Tecnología | 18 | 5 | 5 | 6 | 6 | 10 | 18 |
| Propiedad intelectual | 14 | 3 | 2 | 2 | 2 | 5 | 3 |
| Desarrollo de negocio | 12 | 22 | 25 | 24 | 20 | 15 | 20 |
| Desarrollo de cliente | 18 | 25 | 20 | 24 | 14 | 18 | 16 |
| Equipo | 13 | 17 | 20 | 16 | 14 | 13 | 15 |
| Gobernanza | 8 | 10 | 10 | 10 | 18 | 9 | 10 |
| Regulatorio | 7 | 8 | 8 | 8 | 16 | 20 | 8 |
| Impacto | 10 | 10 | 10 | 10 | 10 | 10 | 10 |

Hardware o deeptech y software puro vienen de las columnas que ya existían, con desarrollo de cliente en 18 para deeptech desde el 24 de septiembre (en una deeptech es clave tener compradores potenciales de la tecnología). Las cinco columnas nuevas son **provisionales** y se calibran con los casos.

**Activo biológico.** Cultivos perennes, acuicultura, forestal y cualquier negocio cuyo activo productivo es un ser vivo que madura en años. En este tipo, Tecnología se lee como la madurez del paquete agronómico (recuperación, sanidad y rendimiento según la edad de la planta o del lote) y no como TRL. Propiedad intelectual solo cuenta si hay material genético o variedades propias.

**Umbrales que no se compensan.** Crédito o balance, sin datos de cartera por cohorte Negocio no puede quedar en verde. Producto regulado, sin ruta regulatoria identificada, y en salud sin evidencia clínica, Negocio no puede quedar en verde. Activo biológico, sin datos propios de rendimiento y recuperación de al menos una campaña, Negocio no puede quedar en verde. Y si la tierra y el agua no están aseguradas por todo el horizonte del cultivo, con título o contrato, Gobernanza no puede quedar en verde.

**Modificador IA nativa.** Suma tres preguntas. Margen después del costo de inferencia, dependencia de un proveedor de modelos, y si sobrevive a que el modelo base haga lo mismo gratis.

**Resiliencia en hardware o deeptech.** La Dim 09 se lee con tecnología y patentes, según `dim-09-resiliencia.md`.

**Qué Dim 09 lleva el caso.** Deeptech lleva I+D, la ruta de madurez. Software lleva resiliencia ante la IA, los tres ejes de `dim-09-resiliencia.md`. Activo biológico no lleva Dim 09, porque el riesgo agronómico se mide en Tecnología y en su umbral. Si ninguna aplica, el caso no tiene Dim 09 y su peso se reparte entre Negocio, Capital y Mercado en proporción a sus pesos, con el bloque de Retorno en 40. Se declara con el carril y va en la Metodología del EL.

El paso 2.5 de `analisis-financiero-el` confirma el tipo con el modelo. Si el modelo lo contradice, es una parada.

**Activo biológico inmaduro en Negocio (desde la versión 2026-10-25).** La rúbrica de Negocio castigaba como defecto lo que en una plantación joven es parte del ciclo. Tres ajustes, con el detalle en `anclas-caso-no-vc-backable.md`, Dim 02.
- Modelo. La baja de costo se separa en tres causas, maduración, eficiencia y escala. La maduración no se castiga como plan genérico si la curva por edad se compara con referencias de la zona a la misma edad.
- Salud operativa. No se mide en meses de caja, porque la caja corta es parte del ciclo y que la ronda cubra el valle ya lo mide Capital. Se mide con el servicio de la deuda y el orden de la caja.
- Defensibilidad. Cuenta el tiempo que le tomaría a un tercero replicar la plantación (área, edad y certificación). El plazo de la propia empresa hasta plena producción sigue sin puntuar, por la Regla 1.

**Impacto en la vertical Climate (desde la versión 2026-10-26).** Dos reglas para todo caso con vertical Climate. Primera, planeta es el resultado principal de la Dim 05 y personas el secundario, 70% y 30%, cada uno con su propio multiplicador de riesgo. Segunda, la falta de medición va a la etiqueta de confianza y no se cuenta como riesgo de evidencia, porque Impacto mide el modelo y no lo que la empresa ya mide. Autorizadas por el Managing Partner el 2026-10-26. Las valida la persona Responsable de Impacto.

**Respaldo en activo biológico en Capital (desde la versión 2026-10-26).** En un activo biológico la tierra y la plantación con título son lo que le queda al inversionista si la empresa no llega a generar caja. La rúbrica de Capital no lo miraba en ninguna parte. Entra en un solo lugar, `ca_exit` Ruta de retorno, porque su modo de falla es tener un derecho sobre una empresa que no genera, y el activo es lo que respalda ese derecho.
- Cuándo se activa. Las cuatro condiciones juntas. El Gate B es activo biológico. La tierra está a nombre de la empresa, con certificado de tradición y libertad o su equivalente. Hay un avalúo independiente de tres años o menos. Y el avalúo separa el valor de la tierra del de la plantación. La plantación solo cuenta si el avalúo le pone valor comercial. El activo biológico registrado al costo no cuenta.
- Cómo se mide. Cobertura neta = (60% del avalúo de la tierra y la plantación con título − toda la deuda financiera de la empresa) / el monto de la ronda con derecho preferente. El 60% aplica el descuento de iliquidez de 40% que ya usa `valorizacion-luchante` (`matriz-multiplos.md` sec. 1). Se resta toda la deuda financiera, esté o no subordinada y tenga o no garantía, porque cualquier compromiso de usar el activo como garantía de otro acreedor lo pone primero.
- Cuánto suma. +10 puntos a `ca_exit` con cobertura de 1,0 vez o más. +5 entre 0,5 y 1,0. Cero bajo 0,5 o sin las cuatro condiciones. Nunca pasa de 79, porque la banda 80-100 pide un mecanismo escrito y ejercible con una contraparte con caja.
- Qué no hace. No entra en `ca_val`, porque el valor de un activo sin realizar no es caja recibida (`../valorizacion-luchante/references/modo-caja.md`). No entra en `ca_fwd`, salvo que la empresa consiga deuda con garantía de esa tierra, y en ese caso esa deuda ya puntúa en `ca_fwd` como contraparte nombrada y se resta en la cobertura. No entra en Defensibilidad de Negocio, que sigue contando solo el tiempo de replicar la plantación. Así el mismo activo no se cobra dos veces.
- Gobernanza del vector RLA. El título no sube el nivel, porque los niveles miden estructura de gobierno y no activos. Cumple la mitad del umbral que corresponde a la tierra. Gobernanza sigue sin poder quedar en verde mientras el agua no esté asegurada con título o contrato por el horizonte del cultivo.

## Negocio · ¿ya vende?

Si ya vende, Negocio se puntúa con ingreso y tracción. Si es pre-revenue, por evidencia de validación.

## Congelado en esta versión

**Riesgo de impacto.** Cada riesgo activo resta 0,05 al multiplicador, con piso en 0,6.

**Anclas de impacto del planeta.** La versión planeta provisional de `dim-05-impacto.md`, hasta que la persona Responsable de Impacto escriba sus criterios.

**Pesos de la Dim 05.** Los propuestos en `dim-05-impacto.md`. Quién vive el resultado 25, cuánto cambia 20, qué resultado y qué umbral 15, contribución de la empresa 15, parte del negocio 15, contribución de LUCHA 10.

**Criterio común de impacto.** Provisional hasta que la persona Responsable de Impacto escriba sus tres criterios. Cada ficha de impacto dice que usó este criterio.

Cuando el resultado es de personas.
- Umbral. Primero la norma o fuente oficial peruana. Si no existe, la científica internacional. Si tampoco, la regional. Lo que dicen las personas afectadas va siempre como complemento.
- Cambio significativo. Lleva a la persona sobre el umbral, o cierra al menos la mitad de la distancia que le falta.
- Contrafactual. La alternativa que esa población usa hoy, con su precio y la distancia a la que la tiene.

Cuando el resultado es del planeta.
- Umbral. El límite sostenible o una meta basada en ciencia para ese recurso (carbono, suelo, agua, biodiversidad), con su fuente.
- Cambio significativo. Reducción o remoción adicional frente a la línea base, verificable por un tercero.
- Contrafactual. Lo que pasaría con ese recurso sin la empresa, con la práctica que se usa hoy en ese territorio.

En los dos casos se separa por género cuando haya dato de personas.

## Historial de versiones

| Versión | Qué cambió |
|---|---|
| 2026-09-28 | Primera versión. Gate B de seis tipos, IA nativa, umbrales que no se compensan, pesos de Dim 05 y criterio común de impacto |
| 2026-09-28, completada el 29 | Antes de abrir el primer caso con esta versión se agregaron la escala del riesgo de impacto, las anclas de impacto del planeta y el repesaje sin Dim 09. Ningún EL se había construido con la versión, así que no cambia de número |
| 2026-09-28, completada el 30 | Séptimo tipo del Gate B, activo biológico, con su columna de pesos, su regla de lectura de Tecnología y sus dos umbrales. Nace del caso Cardo Foods. Ningún EL se había construido con la versión, así que no cambia de número |
| 2026-10-25 | Activo biológico inmaduro en Negocio, con maduración como tercera causa en Modelo, Salud operativa sin meses de caja y crédito en Defensibilidad al tiempo de replicar la plantación. Nace del caso Cardo Foods. El Managing Partner autorizó aplicarla a Cardo Foods, que ya estaba abierto, porque es un modelo que LUCHA no había evaluado y ninguna dimensión estaba puntuada en firme. Marea, que se armó antes de que existieran versiones, se recalcula solo como referencia y su EL no se reabre |
| 2026-10-26 | Respaldo en activo biológico en Capital, con crédito acotado en `ca_exit` según la cobertura neta de la tierra y la plantación con título, y el título contado en Gobernanza del vector solo para el umbral de la tierra. Nace del caso Cardo Foods. El Managing Partner autorizó aplicarla a Cardo Foods, que ya estaba abierto, porque Capital no tenía dónde leer que la empresa es dueña de su tierra, que en un activo biológico es el respaldo principal de la posición si la caja no llega, y ninguna dimensión de Capital estaba puntuada en firme. En Cardo Foods hoy no mueve el puntaje, porque la deuda financiera supera el valor realizable de la tierra. En la misma versión, `ca_val` se mide con el reparto preferente que se propone en Términos, en el conservador y con las cuentas por cobrar corregidas, con llamado rojo si el precio supera el techo de entrada (cambio 1), y un derecho o veto que ya puntúa en `ca_str` no vuelve a puntuar en `ca_exit` (cambio 2). Los dos quedan escritos en `anclas-caso-no-vc-backable.md`, aprobados por el Managing Partner el 2026-10-26. En la misma versión, impacto en la vertical Climate con planeta como resultado principal (70/30) y la falta de medición en la etiqueta de confianza y no como riesgo de evidencia, autorizado por el Managing Partner el 2026-10-26 y pendiente de validar por la persona Responsable de Impacto. También en esta versión, en casos no VC-backable el tamaño de Mercado se mide por la parte del mercado que la empresa necesita para vender su producción, lo que resuelve la observación abierta desde Marea (en `anclas-caso-no-vc-backable.md`, Dim 04) |
