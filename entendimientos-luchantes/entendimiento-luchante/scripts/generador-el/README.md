# Generador del EL

Generador que produjo la plantilla vigente. Los archivos dependen entre sí. `transform.py [EL fuente] [salida] --plantilla` pasa un EL a la plantilla vigente; `node drivers-check.js drivers-caso.js` bloquea el EL si el simulador de drivers no calza con el modelo financiero o si queda una palanca sin declarar.

- [abc.css](abc.css): estilos
- [abc.js](abc.js): ficha de impacto ABC de la Dim 05
- [deal.css](deal.css): estilos
- [dimux.css](dimux.css): estilos
- [dimux.js](dimux.js): interfaz de las dimensiones
- [drivers-caso.js](drivers-caso.js): ejemplo de la constante DRIVERS que lee el control
- [drivers-check.js](drivers-check.js): control que bloquea el EL si el simulador de drivers no calza con el modelo (margen de 2%) o si queda una palanca sin declarar
- [drivers.css](drivers.css): estilos
- [drivers.js](drivers.js): simulador de drivers de la Dim 02
- [header.html](header.html): encabezado de la página
- [layout.css](layout.css): estilos
- [mkprev.py](mkprev.py): genera una vista previa de la plantilla
- [motion.js](motion.js): animaciones y microinteracciones
- [prosa_plantilla.py](prosa_plantilla.py): barrido de prosa que se aplica solo a la plantilla
- [reglas.css](reglas.css): estilos
- [reglas.js](reglas.js): versión de reglas, carril y pesos
- [render.js](render.js): render de la página
- [skin.css](skin.css): estilos
- [struct.js](struct.js): bloques de subvariable en piezas
- [test12.js](test12.js): prueba del generador
- [theme.js](theme.js): tema claro y oscuro
- [tipo.css](tipo.css): estilos
- [transform.py](transform.py): pasa un EL a la plantilla vigente; con `--plantilla` además limpia el texto de ejemplo
- [valida-caso.js](valida-caso.js): fragmento de datos de Validación que transform.py inserta
- [valida.css](valida.css): estilos
- [valida.js](valida.js): sección de Validación externa
