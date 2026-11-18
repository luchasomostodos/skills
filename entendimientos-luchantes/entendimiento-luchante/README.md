# Entendimiento Luchante

Skill que dirige la construcción de un Entendimiento Luchante (EL) completo: reúne los inputs y el data room, reparte el trabajo por bloque, arma el documento sobre la plantilla vigente y lo verifica antes de comité. Llama a los demás skills de esta carpeta cuando corresponde.

## Contenido

- [SKILL.md](SKILL.md): pasos del EL, reglas y verificación.
- [references/](references/): EL System, rúbricas de las nueve dimensiones, prompts, kill criteria, Portfolio Fit Check, parámetros del Fondo, voz y visual.
- [assets/](assets/): plantilla HTML vigente del EL, modelo financiero para founders y checklist del data room.
- [scripts/generador-el/](scripts/generador-el/): generador que pasa un EL a la plantilla vigente y valida el simulador de drivers.
- [Configuración](agents/README.md): nombre y descripción visibles del skill.

Su nombre de instalación e invocación es `entendimiento-luchante`.

## Uso

```text
Usa $entendimiento-luchante para correr el EL de [empresa].
Usa $entendimiento-luchante para retomar la Dim 04 de Mercado de este caso.
```

Los datos de ejemplo de este skill están anonimizados: los nombres de personas y empresas son ficticios y los montos están alterados. Consultar la [guía de la carpeta](../README.md) y la [guía principal](../../README.md) para instalarlo.
