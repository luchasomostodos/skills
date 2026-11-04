# Lucha como Skill

Biblioteca del equipo para mantener la identidad de Lucha y los lineamientos de sus proyectos. Repositorio central: [luchasomostodos/skills](https://github.com/luchasomostodos/skills).

## Qué hay en cada carpeta

| Carpeta | Para qué sirve |
| --- | --- |
| [identidad-lucha](identidad-lucha/README.md) | Skill compartido de identidad visual, escritura y criterios de interfaz para futuras webs de Lucha |
| [huascaran](huascaran/README.md) | Skills propios de Huascarán, comenzando por sus restricciones de interfaz |

Cada carpeta tiene un `README.md` para el equipo. Cada skill tiene además un `SKILL.md`, que contiene las instrucciones que lee el agente. Los README explican la organización; los SKILL dirigen el trabajo.

```text
lucha-skills/
├── README.md
├── install.sh
├── identidad-lucha/
│   ├── README.md
│   ├── SKILL.md
│   ├── agents/        # Configuración de presentación del skill
│   ├── references/    # Identidad y criterios de interfaz
│   └── assets/        # Logos y variables CSS
└── huascaran/
    ├── README.md
    └── interfaz-huascaran/
        ├── README.md
        ├── SKILL.md
        ├── agents/
        └── references/
```

Las carpetas de recursos también incluyen su propio README. La organización parte de la práctica de [Jibaru/skills](https://github.com/Jibaru/skills), adaptada a una biblioteca compartida y a carpetas por proyecto.

## Instalar en Mac o Linux

Clonar con una cuenta que tenga acceso al repositorio:

```sh
git clone https://github.com/luchasomostodos/skills.git lucha-skills
cd lucha-skills
```

Instalar la identidad compartida en una web de Lucha:

```sh
bash install.sh --agent codex --project "/ruta/a/la/web" --skill identidad-lucha --dry-run
bash install.sh --agent codex --project "/ruta/a/la/web" --skill identidad-lucha
```

Para Huascarán, instalar ambos skills:

```sh
bash install.sh --agent codex --project "/ruta/a/huascaran" --skill identidad-lucha --skill interfaz-huascaran
```

El instalador encuentra también los skills dentro de carpetas de proyecto. Sin `--skill`, instala todos los de la biblioteca. Cambiar `--agent codex` por `--agent claude` permite instalar para Claude Code.

Con `--project` se copian los archivos a `.agents/skills/` para Codex o `.claude/skills/` para Claude. Las copias pueden versionarse con el proyecto y sus cambios se revisan allí. Sin `--project`, se crean enlaces personales en `~/.agents/skills/` o `~/.claude/skills/`, que siguen los cambios de esta biblioteca local. No mover la biblioteca mientras se utilicen esos enlaces.

`--dry-run` muestra los destinos sin escribir. Una instalación idéntica se conserva; una distinta no se sobrescribe. Si ya instalaste `lucha-web`, reemplaza esa instalación anterior al migrar a `identidad-lucha`; el instalador no la elimina automáticamente.

Publicar o clonar la biblioteca no instala los skills por sí solo. [Alcances de skills en Codex](https://learn.chatgpt.com/docs/build-skills).

## Usarlos

Ejemplos de pedidos en Codex:

```text
Usa $identidad-lucha para diseñar esta landing de Lucha.
Usa $interfaz-huascaran para modificar el detalle de misión de Huascarán.
```

Un skill puede seleccionarse por su descripción o invocarse explícitamente. Para que las reglas de identidad estén presentes al trabajar en una web, añadir este bloque al `AGENTS.md` del proyecto, conservando sus instrucciones existentes:

```markdown
## Identidad de Lucha

Al crear o modificar interfaces de este proyecto, aplicar el skill identidad-lucha.
Usar textos en estilo oración, sin mayúsculas decorativas ni rayas largas.
Mantener bordes y sombras neutros, foco visible, logos auténticos y paleta de Lucha.
Conservar controles compactos y áreas táctiles de al menos 44 px.
Las reglas funcionales y las medidas específicas viven en la documentación de este proyecto.
```

El bloque es un ejemplo para incorporar a las instrucciones del proyecto; no se necesita una carpeta adicional de plantillas. [Instrucciones de proyecto en Codex](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Para Claude, incorporar las reglas equivalentes a las instrucciones que utilice ese agente; no asumir que lee `AGENTS.md` por instalar un skill.

## Mantener esta biblioteca

- La identidad compartida vive en `identidad-lucha/`; las particularidades de Huascarán, en `huascaran/`.
- Al añadir otro proyecto, crear su carpeta con README y los skills que necesite.
- Cada nuevo skill necesita su propio nombre único y `SKILL.md`. No usar el mismo nombre para skills diferentes aunque estén en carpetas distintas.
- Separar reglas confirmadas, medidas de referencia y decisiones históricas reemplazadas.
- Mantener `SKILL.md` breve y enlazar los detalles desde sus referencias.
- Añadir un `README.md` a cada nueva carpeta, incluidos sus recursos.
