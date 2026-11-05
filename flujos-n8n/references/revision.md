# Revisión

## Revisar un flujo

Revisar solo flujos publicados, salvo que pidan otro. Con el MCP de n8n, `search_workflows` lista los flujos y `get_workflow_details` devuelve su configuración y sus nodos. En el editor, la configuración está en `...` > `Settings` y la nota de cada nodo en su pestaña `Settings`.

Revisar en este orden:

1. **Borrador pendiente.** Si el flujo tiene cambios sin publicar, anotarlo y no proponer cambios encima. En la API se ve cuando `versionId` es distinto de `activeVersionId`.
2. **Configuración.** Cada valor de [Configuración](configuracion.md). El tiempo ahorrado debe tener sentido para lo que hace el flujo.
3. **Nombre del flujo.** Formato `Agente - Qué hace`, prefijo en uso, verbo en tercera persona, sin `·`, `|`, `:`, `→` ni rayas largas.
4. **Nombres de nodos.** Verbo en tercera persona, condiciones como pregunta, excepciones respetadas.
5. **Notas.** Todos los nodos tienen nota de una línea, sin lenguaje técnico y visible en el flujo (`notesInFlow: true`).
6. **Errores.** Error Workflow global en la configuración y ningún `Error Trigger` dentro del flujo.
7. **Salud.** Últimas ejecuciones en Executions. Si falla seguido, anotar el paso y el mensaje.

## Formato del reporte

Un renglón por problema, agrupado por flujo. Primero lo que impide monitorear (configuración y errores), después nombres y notas.

| Flujo | Qué falta | Cómo se corrige |
| --- | --- | --- |
| Chief - Envía el Daily Brief de cada mañana | No guarda ejecuciones exitosas | Save successful production executions en Save |
| Coco - 02 Procesa la transcripción | 3 nodos sin nota visible | Agregar nota de una línea y activar Display Note in Flow? |

Cerrar con el total de flujos revisados, cuántos cumplen y cuáles tienen borrador pendiente. Si todo cumple, decirlo en una línea.

## Renombrar sin romper

n8n actualiza las expresiones al renombrar un nodo desde el editor, pero no todo lo que menciona su nombre.

1. **Dentro del flujo.** Buscar el nombre viejo en todos los parámetros: `$('Nombre')`, `$node["Nombre"]`, `$items("Nombre")` y textos entre comillas dentro de un Code, como listas de nodos o mensajes que nombran el paso. Las cadenas sueltas no se actualizan solas.
2. **En otros flujos.** Buscar el nombre viejo en los demás flujos publicados. Si otro flujo lo lee, cambiar ambos en el mismo momento o dejar el nombre como está.
3. **Fuera de n8n.** Si el nodo es un disparador o una herramienta que llama otro sistema, no renombrarlo.
4. **Subflujos.** Las llamadas entre flujos van por ID, así que renombrar un flujo no las rompe. Si el nodo que llama muestra el nombre viejo, actualizar solo ese texto.
5. **Incidentes abiertos.** El Error Workflow agrupa las fallas por flujo y nodo. Si el nodo renombrado tenía fallas abiertas, avisar a Javo para que actualice el registro; si no, esas fallas no se cierran solas.
6. **Publicar y comprobar.** Publicar y revisar la siguiente ejecución.

## Manejo de errores

- La configuración del flujo apunta siempre al Error Workflow global. No crear Error Workflows propios ni poner un `Error Trigger` dentro del flujo.
- Usar `On Error: Continue` en un nodo solo cuando la rama siguiente resuelve ese caso. Si no lo resuelve, dejar que el flujo falle: así el Error Workflow avisa y sigue la falla hasta que se recupere.
- No esconder fallas con `Always Output Data` o `Continue` para que la ejecución salga en verde.
