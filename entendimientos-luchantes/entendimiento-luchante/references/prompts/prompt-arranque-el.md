# Prompt de arranque del Entendimiento Luchante

29 de septiembre de 2026. Se pega al abrir cada EL en su propio chat, uno por caso. Cambia solo lo que está entre corchetes. Orden acordado para la comparación, Fuego Energía primero, luego Micelia, Cardo Foods y Biomente.

## El prompt

```
Jarvis, abrimos el Entendimiento Luchante de [EMPRESA]. Corre, entendimiento completo.

Antes de hacer nada:
1. Carga el CLAUDE.md y el MEMORY.md de la raíz y de Lucha, y del skill
   entendimiento-luchante references/sistema/el-system.md y
   references/dimensiones/carril-y-version-de-reglas.md. El resto de references/dimensiones/
   solo cuando construyas esa dimensión.
2. Usa el skill entendimiento-luchante en su versión vigente y confirma cuál es.
3. Verifica que existe assets/plantilla/plantilla-EL-vigente.html en el skill.
4. Abre la carpeta del caso en Lucha/Funnel/02_Casos/[EMPRESA]/ con el esqueleto de
   00_Reference/Estructura Lucha.md. Si no existe, créala y dime qué creaste.

El caso:
- Lo que ya tengo: [deck, transcript del pitch, data room parcial, modelo, lo que haya]
- Sponsor tentativo: [nombre o "por definir"]
- Reuniones de partners ya hechas: [ninguna / cuáles]. Si hay, rige la regla de
  transición, corre igual la Ola 1 y el corte.
- Fecha objetivo de comité: [fecha o "sin fecha"]

Cómo trabajamos:
- Lo primero es proponerme el carril (VC-backable, vertical, deeptech, tipo de negocio,
  IA nativa, si ya vende) con sus razones. No sigas hasta que lo declare.
- Versión de reglas 2026-09-28. Dim 09 según el carril, I+D en deeptech, IA en software,
  o ninguna con el repesaje.
- Dos olas con corte de continuidad en el medio. Cuando salte una parada, detente y
  dime qué encontraste, qué falta, qué costaría seguir y con qué supuesto seguirías.
- Dos rondas de preguntas al founder, una por ola. Ninguna sale sin que yo vea el texto
  exacto y dé el OK.
- El data room se pide con el checklist v2 de assets/formatos/data-room-checklist.pdf
  (seis carpetas, 26 piezas).
- Impacto con la ficha ABC de impacto-luchante antes del Gate de Impacto. Si el resultado
  es del planeta, usa la versión planeta provisional de las anclas.
- El documento se escribe en registro de comité. Habla de la empresa y de la decisión,
  no de nuestra revisión. De dónde sale cada dato va en Metodología.
- Una dimensión a profundidad completa primero, me la muestras y recién replicas.
- Al cerrar cada sesión, deja el estado en el log-construccion.md del caso.

Dime qué cargaste, el carril que propones y qué te falta para arrancar la Ola 1.
```

## Por qué va así

Cada EL corre en su chat para que la comparación entre los cuatro sea limpia y ninguno herede contexto del otro. El carril va primero porque decide el lente, los pesos y la Dim 09 del caso entero. La versión de reglas se nombra en el prompt para que los cuatro se construyan con la misma y se puedan comparar.
