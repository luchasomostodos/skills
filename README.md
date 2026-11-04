# Skills de Lucha

Biblioteca del equipo para conservar criterios de Lucha entre proyectos, creada el 4 de noviembre de 2026. Repositorio central: [luchasomostodos/skills](https://github.com/luchasomostodos/skills). Cada proyecto o integrante elige cómo instalarla; publicar la biblioteca no la instala automáticamente.

## Organización recomendada

Mantener skills por capacidad reutilizable y documentación por proyecto:

| Nivel | Qué contiene | Dónde vive |
| --- | --- | --- |
| Compartido | Identidad, escritura y criterios de interfaz de Lucha | `lucha-web/` en esta biblioteca |
| Proyecto | Módulos, permisos, estados, flujos y medidas particulares | `AGENTS.md` y documentación del producto |
| Procedimiento específico | Un trabajo repetible que necesite su propia guía | Un skill nuevo cuando exista ese procedimiento |

No crear un skill por cada proyecto solo para guardar contexto. Si Huascarán tiene un procedimiento repetido de mantenimiento o publicación de memos, ese procedimiento podría justificar un skill propio; sus decisiones de interfaz actuales ya tienen documentación de proyecto.

```text
lucha-skills/
├── README.md
├── install.sh
├── templates/
│   └── AGENTS.lucha.md
└── lucha-web/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── references/
    │   ├── identidad.md
    │   └── interfaces.md
    └── assets/
        ├── tokens.css
        ├── lucha-logo-blue.png
        ├── lucha-logo-white.png
        └── lucha-favicon.png
```

La estructura se inspira en [Jibaru/skills](https://github.com/Jibaru/skills): carpetas independientes por capacidad, `SKILL.md` y recursos de apoyo, con instalación desde una biblioteca central. No se copiaron sus instrucciones de diseño ni sus scripts. Su instalador general consultado apunta a Claude Code; este paquete permite elegir Codex o Claude.

## Instalar en Mac o Linux

Clonar el repositorio con una cuenta que tenga acceso:

```sh
git clone https://github.com/luchasomostodos/skills.git lucha-skills
cd lucha-skills
```

Ejecutar desde esta carpeta. El instalador copia los archivos cuando se elige un proyecto y crea enlaces simbólicos en instalación personal. No descarga dependencias ni ejecuta contenido remoto. Antes de cambiar nada se puede usar `--dry-run`.

Para Codex, solo en un proyecto existente:

```sh
bash install.sh --agent codex --project "/ruta/al/proyecto" --dry-run
bash install.sh --agent codex --project "/ruta/al/proyecto"
```

Para Codex en la cuenta personal, disponible desde distintos proyectos:

```sh
bash install.sh --agent codex
```

El destino de Codex es `.agents/skills/` dentro del proyecto, o `~/.agents/skills/` en instalación personal. La documentación oficial describe esos alcances y el soporte de enlaces simbólicos: [skills en Codex](https://learn.chatgpt.com/docs/build-skills).

Para Claude Code:

```sh
bash install.sh --agent claude --project "/ruta/al/proyecto"
# Omitir --project para usar ~/.claude/skills/.
```

Se recomienda empezar por instalación de proyecto: el alcance queda claro y la copia real de `.agents/skills/lucha-web/` puede versionarse junto con el código para el equipo. La instalación personal también es válida; la descripción del skill limita su uso a interfaces de Lucha. Un archivo guardado en esta biblioteca no se activa en todos los equipos por sí solo.

La instalación personal sigue los cambios de la biblioteca mediante un enlace local. No mover ni borrar la biblioteca mientras existan esos enlaces. Las copias de proyecto son instantáneas y sus cambios se revisan y versionan dentro del proyecto; no se actualizan automáticamente al editar esta biblioteca. El instalador reconoce instalaciones idénticas y rechaza sobrescribir otras distintas. No hay sincronización automática de equipo.

## Uso y reglas permanentes

En Codex se puede pedir explícitamente:

```text
Usa $lucha-web para crear esta landing de Lucha.
```

El skill también permite selección automática cuando el pedido coincide con su descripción; no equivale a una carga obligatoria en todas las tareas. Para dejar reglas permanentes en un proyecto de Codex, incorporar el bloque de `templates/AGENTS.lucha.md` a su `AGENTS.md`, conservando las instrucciones existentes. [Referencia de instrucciones de proyecto](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Para Claude Code, incorporar las reglas equivalentes a las instrucciones del proyecto que ese agente utilice; no asumir que lee `AGENTS.md` por tener instalado el skill.

## Mantener la biblioteca

- Editar las reglas en su fuente compartida y describir su alcance.
- Separar identidad documentada, preferencias del usuario y decisiones locales. El detalle de esa distinción está en `lucha-web/references/identidad.md`.
- Crear un skill nuevo cuando resuelva una capacidad distinta y repetida. No separar cada color, componente o regla en otro skill.
- Conservar `SKILL.md` breve y llevar detalles a referencias o activos.
- Mantener esta biblioteca separada del código de un producto y revisar sus cambios en este repositorio compartido.

La recopilación completa de Huascarán permanece en su proyecto, en `docs/restricciones-huascaran.md`. No se distribuyen en este paquete sus reglas funcionales, datos personales ni copias privadas.
