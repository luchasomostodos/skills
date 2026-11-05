---
name: flujos-n8n
description: Crear, modificar, publicar o revisar workflows en el n8n de Lucha (lucha-n8n.ds0gmv.easypanel.host) con el estándar del equipo de configuración, nombres de flujos y nodos, notas y manejo de errores. Usar cuando alguien de Lucha construya o cambie un flujo, antes de publicarlo, o cuando pida revisar si uno o varios flujos cumplen el estándar. No aplicar a otras instancias de n8n ni a los Agents de n8n.
---

# Flujos n8n de Lucha

Todo flujo publicado en el n8n de Lucha cumple el mismo estándar. Así Javo puede monitorearlos y cualquier persona del equipo entiende qué hace un flujo con solo mirarlo.

## Elegir el modo

- **Crear o modificar:** construir o cambiar el flujo y dejarlo cumpliendo el estándar antes de publicarlo.
- **Revisar:** leer uno o varios flujos publicados y reportar qué les falta, con el formato de [Revisión](references/revision.md). No corregir nada sin que lo pidan.

## Reglas

1. **Configuración del flujo.** Guardar todas las ejecuciones (fallidas, exitosas, manuales y progreso), zona horaria America/Lima, disponible en MCP, Error Workflow global y tiempo ahorrado estimado. Valores exactos y cómo calcular el tiempo en [Configuración](references/configuracion.md).
2. **Nombre del flujo.** `Agente - Qué hace`, con el verbo en tercera persona y `-` como único separador: `Chief - Envía el Daily Brief de cada mañana`. Número si es parte de una secuencia (`Coco - 02 Procesa la transcripción`) y `(borrador)` al final si no está terminado.
3. **Nombre de los nodos.** Verbo en tercera persona singular, nunca en infinitivo: `Guarda los vínculos`, no `Guardar vínculos`. Las condiciones van como pregunta: `¿Hay mención?`.
4. **Notas de los nodos.** Una línea en lenguaje simple que diga qué logra el paso, con `Display Note in Flow?` activado. Nada técnico.
5. **Errores.** Ningún flujo tiene manejador de errores propio. Todos apuntan al Error Workflow global, que avisa por correo y sigue cada falla hasta que se resuelve.

Las excepciones y los ejemplos de nombres y notas están en [Nombres y notas](references/nombres-y-notas.md).

## Antes de tocar un flujo existente

- Si el flujo tiene cambios sin publicar de otra persona, no editarlo. Avisar a quien lo está trabajando y seguir con otro.
- No renombrar disparadores de webhook, formulario, chat o MCP, ni herramientas de agentes de IA. Otros sistemas los llaman por su nombre.
- Al renombrar un nodo, seguir los pasos de [Renombrar sin romper](references/revision.md#renombrar-sin-romper). Un nombre viejo que queda dentro de un código rompe el flujo en la siguiente ejecución.

## Publicar

Un cambio no corre hasta que el flujo se publica. Después de publicar, abrir la siguiente ejecución en la pestaña Executions y confirmar que terminó bien. Si falla, el Error Workflow también avisará.

## Comprobación final

Antes de dar por terminado un flujo, confirmar:

- La configuración coincide con [Configuración](references/configuracion.md).
- El nombre del flujo sigue `Agente - Qué hace` y no usa `·`, `|`, `→` ni rayas largas.
- Cada nodo tiene nombre con verbo en tercera persona (o es una excepción) y una nota de una línea visible en el flujo.
- Ningún nombre viejo quedó en expresiones o código.
- El flujo está publicado y su última ejecución terminó bien.
