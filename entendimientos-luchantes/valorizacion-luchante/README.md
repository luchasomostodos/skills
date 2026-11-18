# Valorización Luchante

Fuente de verdad de valorización en LUCHA. Tiene dos modos: a qué valorización entramos a una startup (entrada) y cuánto vale hoy una posición del portafolio (marca). Traduce el cap de un SAFE a valor de hoy y corre el vector RLA de madurez.

## Contenido

- [SKILL.md](SKILL.md): los dos modos, fórmulas y formato de salida.
- [references/](references/): parámetros, matriz de múltiplos, vector RLA, cap de SAFE, taxonomía de evidencia y bloque para el EL.
- [examples/](examples/): corrida completa de ejemplo en modo entrada, útil como prueba de regresión.
- [CHANGELOG.md](CHANGELOG.md): historial de cambios del skill.
- [Configuración](agents/README.md): nombre y descripción visibles del skill.

Su nombre de instalación e invocación es `valorizacion-luchante`.

## Uso

```text
Usa $valorizacion-luchante para decir si el cap de este SAFE está caro.
Usa $valorizacion-luchante para marcar la posición de [empresa] este trimestre.
```

Los datos de ejemplo de este skill están anonimizados: los nombres de personas y empresas son ficticios y los montos están alterados. Consultar la [guía de la carpeta](../README.md) y la [guía principal](../../README.md) para instalarlo.
