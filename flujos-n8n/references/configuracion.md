# Configuración del flujo

Estos ajustes van en todo flujo publicado. En el editor se abren desde el menú `...` del flujo, opción `Settings`.

| Ajuste en el editor | Valor | Clave en la API |
| --- | --- | --- |
| Execution Logic | v1 (recommended) | `executionOrder: "v1"` |
| Error Workflow (to notify when this one errors) | Error Workflow - Avisa y da seguimiento a las fallas | `errorWorkflow: "SPznRD5uJ8NLUKqI"` |
| Timezone | America/Lima | `timezone: "America/Lima"` |
| Save failed production executions | Save | `saveDataErrorExecution: "all"` |
| Save successful production executions | Save | `saveDataSuccessExecution: "all"` |
| Save manual executions | Save | `saveManualExecutions: true` |
| Save execution progress | Save | `saveExecutionProgress: true` |
| Available in MCP | Activado | `availableInMCP: true` |
| Estimated time saved | Fixed, con los minutos de la tabla siguiente | `timeSavedPerExecution: <minutos>` |

El único flujo sin Error Workflow es el propio Error Workflow.

## Por qué se guarda todo

Guardar exitosas, fallidas, manuales y progreso permite ver qué pasó en cualquier ejecución sin volver a correrla, y le da al Error Workflow la evidencia que necesita para confirmar que una falla se resolvió. Un flujo que no guarda sus ejecuciones no se puede monitorear.

## Tiempo ahorrado

El valor es lo que tardaría una persona en hacer a mano lo que hace una ejecución del flujo. Alimenta los indicadores de ahorro de n8n, así que se estima con criterio y no se infla.

| Tipo de flujo | Minutos |
| --- | --- |
| Revisa algo cada 1 a 5 minutos y casi siempre no encuentra nada | 0 |
| Herramienta o subflujo que otro flujo llama (un paso de un proceso mayor) | 1 a 5 |
| Registra, copia o avisa algo que una persona haría en pocos clics | 2 a 10 |
| Prepara un documento, resumen, memo o reporte | 10 a 60 |

Si un flujo cambia de alcance, actualizar también este valor.

## Retención de ejecuciones

Guardar todo hace crecer la base de ejecuciones. La limpieza automática se configura una sola vez en el servidor de n8n (Easypanel) con `EXECUTIONS_DATA_PRUNE`, `EXECUTIONS_DATA_MAX_AGE` y `EXECUTIONS_DATA_PRUNE_MAX_COUNT`. Lo administra Javo; no se cambia desde un flujo.
