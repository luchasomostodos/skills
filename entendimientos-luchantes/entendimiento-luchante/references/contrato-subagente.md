# Contrato de salida de los subagentes del fan-out

Se copia al prompt de cada subagente del paso 3. Una sola vez, acá: no se repite en el SKILL.md.

## Qué recibe cada subagente

1. Las **rutas** de los archivos del caso que le tocan. No el contenido: las rutas.
2. Las **rutas** de sus archivos de dimensión en `references/dimensiones/` del skill. Los carga él.
3. La ruta de `hechos.md` del caso, que es el ledger de datos con su fuente y su estado.
4. Este contrato.
5. Los SKILL.md de los especialistas que aplican: bloque A lee `analisis-financiero-el`; bloque B lee `tribalometro` y `saboteadores`.

La sesión principal **no** carga las dimensiones que no redacta.

## Qué devuelve

Markdown estructurado, nunca HTML. Por dimensión:

- **Sub-indicadores** como número o métrica. Nunca palabra-estado.
- **Score 0-100 y semáforo propuestos**, con su evidencia. Propuestos: los cierra el comité.
- **Quotes literales con ubicación exacta** (archivo más línea aproximada). Sin ubicación, la quote no vale: la sesión principal vuelve a la fuente cruda al escribir, y sin ubicación no puede.
- **Filas nuevas para el ledger**: cualquier afirmación portante que encuentre, con su fuente, su `estado del dato` y, si discrepa de otra fuente, la marca de conflicto.
- **Huecos** en gris, con el motivo y la pregunta sugerida para el líder del caso.
- **Banderas** con su cruce a Kill Criteria (`references/kill-criteria.md`).

## Reglas

- Los bloques son **índice y scores para la redacción final, no su fuente**. La sesión principal redacta desde las fuentes crudas usando las ubicaciones que el bloque trae.
- Un subagente **no le pregunta nada al líder del caso**. Lo que falte va como hueco.
- Un subagente **no asigna scores finales** ni decide si LUCHA invierte.
- Conflicto entre dos fuentes: se reporta como conflicto. **Nunca se promedia.**
