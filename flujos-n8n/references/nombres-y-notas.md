# Nombres y notas

## Nombre del flujo

Formato: `Agente - Qué hace`.

- El agente o área va primero, para que los flujos de un mismo sistema queden juntos en la lista.
- Después de `-` va una frase corta con verbo en tercera persona que diga qué logra el flujo: `Publica el reporte semanal por área`, no `Reporte semanal por área`.
- `-` con espacios es el único separador. No usar `·`, `|`, `:`, `→` ni rayas largas.
- Si el flujo es un paso de una secuencia numerada, el número va antes de la acción, sin separador: `Coco - 02 Procesa la transcripción`.
- Si una etapa del proceso necesita su propio nivel, se agrega como segundo tramo: `EL - Carril - Prepara la propuesta`.
- Si el flujo no está terminado, se agrega `(borrador)` al final.

### Prefijos en uso

| Prefijo | Qué agrupa |
| --- | --- |
| Chief | Chief en Slack y Notion: actas, memos, reportes, Daily Brief |
| Chief WhatsApp | Chief en los grupos de WhatsApp (secuencia 00 a 11) |
| Chief CRM | Contactos y organizaciones que Chief registra |
| Coco | Coaching: sesiones, documentos, recaps y encuestas (secuencia 00 a 22) |
| Grok | Pasos que conectan a Coco con Grok Bot por WhatsApp |
| PIA | PIA: mensajes de WhatsApp, fechas del funnel, posts |
| Randy | Randy: eventos de Slack y envío de correos |
| EL | Entendimiento Luchante, con sus etapas (F1, Carril, Captura, Ola 1, etc.) |
| Illari | Onboarding, offboarding, renovaciones y Site de Cultura |
| Publi | Publi: avisos de contenido y herramientas del agente |
| Finanzas | Finanzas de Lucha |
| Finanzas Nacho | Finanzas personales de Nacho |
| Explee | Conversaciones y leads de Explee |
| Hunter | Relaciones institucionales, depósitos y LPs |
| CRM | Fichas de contactos en Notion |
| Alertas | Avisos de servicios por agotarse |
| Monitoreo | Registro y limpieza de ejecuciones |
| Error Workflow | El flujo que avisa y da seguimiento a las fallas |

Usar un prefijo existente si el flujo pertenece a ese sistema. Un agente o área nueva lleva un prefijo nuevo acordado con Javo.

### Ejemplos

| Antes | Después |
| --- | --- |
| `Chief · Daily Brief` | `Chief - Envía el Daily Brief de cada mañana` |
| `02 · Procesar transcripción` | `Coco - 02 Procesa la transcripción` |
| `03 · Responde menciones` | `Chief WhatsApp - 03 Responde cuando lo mencionan` |
| `Illari - Fase 2 - v5: Formulario de renovación` | `Illari - Renovaciones 2 - Recibe el formulario de renovación` |
| `Estados de cuenta BCP → Sheets` | `Finanzas - Pasa los estados de cuenta BCP a Sheets` |

## Nombre de los nodos

- Verbo en tercera persona singular, en presente: `Lee la ficha`, `Guarda los vínculos`, `Envía el PDF al coach`. Nunca infinitivo (`Leer ficha`) ni sustantivo suelto (`Lectura de ficha`).
- Corto, en español y único dentro del flujo.
- Se puede anteponer el servicio para que se lea a primera vista: `Notion · Lee el acta`, `Kapso · Envía la plantilla aprobada`.
- Las condiciones (If, Switch, Filter) van como pregunta cerrada: `¿Hay mención?`, `¿Sesión conectada?`.
- Los disparadores programados dicen cuándo corren: `Cada 15 minutos`, `Viernes al mediodía`, `Lunes a viernes · 09, 13 y 17`.
- Los subnodos de IA (modelo, memoria, formato de salida) llevan sustantivo: `Modelo del resumen`, `Formato del acta`.

| Antes | Después |
| --- | --- |
| `Guardar vínculos` | `Guarda los vínculos` |
| `Normalizar correo` | `Ordena el correo` |
| `Reclamar transcripción` | `Toma la transcripción` |
| `Es feedback nuevo?` | `¿Es feedback nuevo?` |
| `Traer los posts de LinkedIn` | `Trae los posts de LinkedIn` |

### Nombres que no se cambian

- Disparadores de webhook, formulario, chat y MCP. Otros sistemas, como Grok Bot, los llaman por su nombre.
- Herramientas de agentes de IA (`leer_transcripcion`, `web_search`). Su nombre es lo que lee el modelo.
- Flujos usados como herramientas por nombre, como `buscar_recursos_coco` o `iniciar_turno_coco`.
- Nodos cuyo nombre lee otro flujo. Ejemplo: el Error Workflow revisa `Verificar ramas operativas` de `Coco - 11`.

Estos nodos sí llevan nota.

## Notas de los nodos

Cada nodo lleva una nota de una línea, visible en el flujo. En el editor: pestaña `Settings` del nodo, campo `Notes`, con `Display Note in Flow?` activado. En la API: `notes` y `notesInFlow: true`.

- Dice qué logra el paso, para alguien del equipo que no conoce el código.
- Una sola oración, idealmente de menos de 12 palabras.
- Sin IDs, URLs, consultas SQL, nombres de tablas, códigos de error ni términos como lease, upsert, payload, JID o HMAC.
- Lo técnico va en la descripción del flujo o en la documentación del proyecto, no en las notas.

| Nota técnica | Nota del estándar |
| --- | --- |
| `Actor harvestapi/linkedin-profile-posts. run-sync-get-dataset-items corre y devuelve los items en la misma llamada` | `Trae las últimas publicaciones de LinkedIn.` |
| `Reserva con lease un lote extract de un solo grupo` | `Aparta un lote de mensajes de un grupo.` |
| `events.patch sobre attendees comment, sendUpdates none` | `Deja el enlace del memo en la invitación del calendario.` |
