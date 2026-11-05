# Revisar un README

En el modo Revisar solo se reporta. Las correcciones se hacen cuando se piden.

## Qué se mira, en este orden

1. **Verdad.** Cada afirmación de estado coincide con lo que corre hoy. Si el repositorio dice una cosa y n8n, Supabase u otro sistema en producción dicen otra, el README debe decir lo que hace el sistema.
2. **Estructura.** Siguen el orden y las partes de [Estructura](estructura.md).
3. **Lenguaje.** Una persona que no programa lo entiende. No hay nombres de tablas, IDs, comandos ni siglas sin explicar. Ver [Lenguaje](lenguaje.md).
4. **Estados.** Solo aparecen funciona, en prueba y falta, y ninguno se afirma sin haberlo comprobado.
5. **Pie y enlaces.** Tiene fecha de revisión y todos los enlaces abren.

## Formato del reporte

Un renglón por problema, agrupado por parte del README. Primero lo que dice algo falso, después estructura y lenguaje.

| Parte | Qué falta | Cómo se corrige |
| --- | --- | --- |
| Estado actual | Dice que los mensajes salen por WhatsApp, pero el proceso quedó en modo solo observar | Cambiar la frase a lo que hace hoy |
| Qué hace hoy | Menciona el nombre de una tabla | Describir lo que logra la persona |

Cerrar con cuántas partes cumplen y cuáles faltan. Si todo cumple, decirlo en una línea.
