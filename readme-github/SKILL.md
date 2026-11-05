---
name: readme-github
description: Crear, actualizar o revisar el README.md de cualquier repositorio de Lucha, escrito en lenguaje simple y sin términos técnicos, para que cualquier persona del equipo entienda qué hace el proyecto, en qué estado está y qué falta. Usar cuando alguien pida escribir, rehacer, poner al día o revisar un README, o documentar un repo. No aplicar a documentación técnica, AGENTS.md, CLAUDE.md ni guías para quienes desarrollan.
---

# README de GitHub de Lucha

El README es la puerta de entrada de un repositorio. Se escribe para una persona del equipo que no programa y quiere saber tres cosas: qué hace el proyecto, en qué punto está y qué falta. Lo técnico va en otros documentos y el README solo los enlaza.

## Elegir el modo

- **Crear:** repositorio sin README, o con uno que no cuenta qué hace el proyecto.
- **Actualizar:** poner al día un README existente. Se conserva lo que sigue siendo cierto y se corrige lo demás.
- **Revisar:** leer un README y reportar qué le falta, sin cambiarlo, con el formato de [Revisión](references/revision.md).

## Antes de escribir

1. Leer el repositorio y los documentos que enlaza.
2. Comprobar lo que el proyecto hace **hoy**, no lo que dice el código o un documento antiguo. Si el repositorio y lo que corre en producción no coinciden, manda lo que corre: para los flujos, n8n. Para datos, Supabase. Para WhatsApp, el proveedor. El README cuenta lo que hace el sistema ahora.
3. No afirmar nada que no se haya visto. Lo que no se pudo comprobar se dice como pendiente.

## Estructura

El README sigue siempre el mismo orden, tomado del README de [Coco](https://github.com/luchasomostodos/coco). Cada parte se explica en [Estructura](references/estructura.md).

1. **Encabezado:** nombre, una frase que diga para qué sirve, dos líneas que expliquen qué es y las herramientas que usa.
2. **Estado actual:** tabla corta de qué funciona, qué está en prueba y qué falta.
3. **Qué hace hoy:** lo que logra el proyecto, separado por quién lo usa.
4. **Cómo funciona paso a paso:** el recorrido de un caso típico, de principio a fin.
5. **Qué falta:** lo que todavía no funciona.
6. **Próximos pasos:** lo que sigue, en orden.
7. **Reglas básicas:** lo que el proyecto cuida siempre, como la privacidad, los permisos y el tono.
8. **Documentación:** enlaces a los documentos técnicos.
9. **Pie:** fecha de revisión y qué se revisó.

## Cómo se escribe

- Frases cortas y palabras de todos los días. Una idea por frase.
- Contar qué logra la persona, no cómo está construido. "Avisa al coach cuando hay un documento nuevo", no "dispara un webhook al terminar el flujo".
- Sin nombres de tablas, columnas, IDs, nodos, comandos ni siglas sin explicar. Los cambios de palabras más comunes están en [Lenguaje](references/lenguaje.md).
- Las herramientas se nombran una sola vez, en el encabezado.
- Español neutro, sin rayas largas y sin frases de relleno.
- Los comandos para instalar o probar no van en el README. Van en un documento para quien desarrolla, enlazado al final.

## Decir la verdad sobre el estado

- Usar tres estados y nada más: **funciona**, **en prueba** y **falta**.
- Que un proceso termine sin error no significa que sirva. Antes de decir que algo funciona, confirmar que hizo lo que debía.
- Lo que no se revisó se dice: "no se comprobó si los mensajes llegan".
- Poner la fecha de revisión al final. Un README sin fecha envejece sin que se note.

## Comprobación final

- Sigue el orden de [Estructura](references/estructura.md) y cabe en una lectura de cinco minutos.
- Una persona que no programa entiende cada frase sin buscar nada.
- No quedan nombres técnicos, IDs, comandos ni rayas largas.
- Cada afirmación de estado está comprobada o dicha como pendiente.
- Los enlaces funcionan y la fecha de revisión está al final.
