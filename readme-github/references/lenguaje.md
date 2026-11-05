# Lenguaje del README

El README se escribe para alguien que usa el proyecto, no para quien lo construye. Si una palabra necesita explicación, se cambia por otra más simple.

## Cambios de palabras

| En vez de | Escribir |
| --- | --- |
| workflow, flujo, nodo | proceso, paso |
| webhook, trigger | aviso que activa el proceso, se activa cuando |
| base de datos, tabla, schema | dónde se guarda la información |
| migración | cambio en cómo se guarda la información |
| deploy, despliegue, publicar | poner en funcionamiento |
| cron, schedule | cada hora, cada día, todos los lunes |
| API, endpoint | conexión con otra herramienta |
| token, credencial, secreto | clave de acceso |
| lease, lock, reserva | lo aparta para que no se repita |
| idempotente, deduplicar | evita que algo se haga dos veces |
| payload, JSON, parsear | datos, leer los datos |
| log, registro de ejecuciones | historial de lo que pasó |
| rollback, revertir | volver atrás |
| PR, merge | cambio propuesto, aprobar el cambio |
| bug, issue | falla, pendiente |
| runtime | lo que está funcionando hoy |
| observe_only, active | solo observa, responde |
| LLM, modelo, prompt | asistente de IA, instrucciones |

## Qué se evita

- Nombres de tablas, columnas, IDs, rutas de archivos y comandos.
- Siglas que no se explican la primera vez.
- Frases largas con tres ideas. Se parten en tres frases.
- Voz pasiva sin quien actúa: "se procesa" se cambia por "Chief procesa".
- Promesas sin comprobar: "funciona", "listo", "estable", "seguro".
- Rayas largas, dos puntos en medio de una frase y frases de relleno como "es importante notar".

## Antes y después

| Antes | Después |
| --- | --- |
| El workflow 05 reserva con lease un lote de la cola y concilia los estados del proveedor. | Envía los mensajes pendientes y confirma que llegaron. |
| Sincroniza Notion con Supabase cada 15 min mediante cron. | Cada 15 minutos copia las fichas de Notion para que el proyecto trabaje con datos al día. |
| Migración idempotente del schema chief_e2 aplicada en producción. | Se actualizó cómo se guarda la información de los grupos. |
| Ejecución exitosa del flujo 11 en el último corte. | La vigilancia de la conexión de WhatsApp corrió sin errores en la última revisión. No se comprobó que los mensajes lleguen. |

## Nombres propios

Los nombres de proyectos, personas y herramientas se escriben como son: Chief, Coco, WhatsApp, Notion. Los nombres de los procesos internos se evitan; si hay que citar uno, se usa lo que logra y se enlaza a su documento.
