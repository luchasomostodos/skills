import re, sys
import os, sys
DIR = os.path.dirname(os.path.abspath(__file__)) + "/"
ARGS = [a for a in sys.argv[1:] if not a.startswith('--')]
PLANTILLA = '--plantilla' in sys.argv
# Por defecto, el EL fuente vive en el workspace del equipo y la salida es la plantilla vigente del skill.
SRC = ARGS[0] if len(ARGS) > 0 else os.path.expanduser("~/Lucha/Funnel/02_Casos/Polímera/EL/2026-09-11-EL-polimera.html")
OUT = ARGS[1] if len(ARGS) > 1 else DIR + "../../assets/plantilla/plantilla-EL-vigente.html"
h = open(SRC, encoding='utf-8').read()

def must(old, new, count=1):
    global h
    n = h.count(old)
    if n < 1:
        sys.exit('NO ENCONTRADO: ' + old[:80])
    h = h.replace(old, new, count if count else n)

# 1. pesos tipograficos, la marca llega hasta Medium
h = re.sub(r'font-weight:\s*(600|700|800)', 'font-weight:500', h)
h = re.sub(r'font-weight="(600|700|800)"', 'font-weight="500"', h)
must('family=Quicksand:wght@300;400;500;600;700', 'family=Nunito:wght@400;500;600;700')

# 2. paleta, de la paleta del EL a la marca vigente
MAP = [
 ('#0F4375', '#0e1c2b'), ('#0f4375', '#0e1c2b'), ('rgba(15,67,117', 'rgba(14,28,43'),
 ('#15518D', '#0e1c2b'), ('#171E33', '#0e1c2b'),
 ('#3C9EA1', '#3a9d9b'), ('rgba(60,158,161', 'rgba(58,157,155'),
 ('#B4E280', '#8fe2a1'), ('#B7E082', '#8fe2a1'), ('rgba(183,224,130', 'rgba(143,226,161'), ('rgba(180,226,128', 'rgba(143,226,161'),
 ('#FF8FB3', '#8fe2a1'),
 ('#EA3C71', '#f0316a'), ('#C42E6B', '#f0316a'), ('rgba(234,60,113', 'rgba(240,49,106'), ('rgba(196,46,107', 'rgba(240,49,106'),
 ('#217CAB', '#1c3e8e'), ('#1E7DA9', '#1c3e8e'), ('rgba(30,125,169', 'rgba(28,62,142'),
 ('#74C58D', '#10b981'), ('#76C68B', '#10b981'), ('rgba(116,197,141', 'rgba(16,185,129'), ('rgba(118,198,139', 'rgba(16,185,129'), ('rgba(34,197,94', 'rgba(16,185,129'), ('#22c55e', '#10b981'),
 ('#E8A838', '#f0b429'), ('rgba(232,168,56', 'rgba(240,180,41'), ('rgba(245,158,11', 'rgba(240,180,41'),
 ('#D94F4F', '#f43f5e'), ('rgba(217,79,79', 'rgba(244,63,94'), ('rgba(197,48,48', 'rgba(244,63,94'), ('rgba(239,68,68', 'rgba(244,63,94'),
 ('#1f7a44', '#0a7a53'), ('#1f6f4a', '#0a7a53'), ('#2d6b3f', '#0a7a53'), ('#7d5a14', '#8a5a06'), ('#7d2222', '#b3123a'), ('#a83232', '#b3123a'), ('#8c5e0c', '#8a5a06'), ('#9b2c2c', '#b3123a'),
 ('#b8860b', '#3a9d9b'), ('rgba(184,134,11', 'rgba(58,157,155'),
 ('#fafbfc', '#faf8f4'), ('#f9fafb', '#f6f3ee'), ('#f4f6f8', '#f3efe8'), ('#F7F8FA', '#f6f3ee'), ('#f3f4f6', '#f3efe8'),
 ('#e8eaed', '#e6e0d6'), ('#e5e7eb', '#e6e0d6'), ('#eef0f2', '#efeae2'), ('#eef1f5', '#efeae2'), ('#f0f1f3', '#efeae2'),
 ('#F0F7F4', '#eef8f2'), ('#cfe6db', '#cfe8da'), ('#dde7f0', '#e9e4da'), ('#f0f0f0', '#efeae2'),
 ('#2a3548', '#1f2b39'), ('#3a4858', '#3d4a59'),
]
for a, b in MAP:
    h = h.replace(a, b)

# 3. I+D en deeptech
must("nombre: 'Resiliencia Tecnol&oacute;gica', pregunta:", "nombre: 'I+D', pregunta:")
must('<td>09 Resiliencia Tecnol&oacute;gica</td>', '<td>09 I+D</td>')

# 3b. numeracion de la dimension sin el espacio entre digitos
must("num.replace('0','0 ')", "num", 0)

# 3c. carril, version de reglas y ficha ABC, antes de pintar nada
must('function renderDiag(){', open(DIR + 'abc.js', encoding='utf-8').read() + '\n' + open(DIR + 'reglas.js', encoding='utf-8').read() + '\nfunction renderDiag(){')

# 3c2. validacion externa como balanza por tema
i0 = h.index('function renderValidacion(){'); i1 = h.index('/* TOOLTIPS */', i0)
h = h[:i0] + open(DIR + 'valida.js', encoding='utf-8').read() + '\n' + h[i1:]
if os.path.exists(DIR + 'valida-caso.js') and '--sin-caso' not in sys.argv:
    must(' social: null\n};', ' social: null,\n' + open(DIR + 'valida-caso.js', encoding='utf-8').read().strip() + '\n};')

# 3d. el scorecard de Metodologia sale de las reglas
i0 = h.index('<div class="ng-sec-h">El scorecard'); i1 = h.index('</table>', i0) + len('</table>')
h = h[:i0] + h[i1:]
i2 = h.index('El proceso, de principio a fin</div>'); i2 = h.rindex('<div style="margin:18px 0 0">', 0, i2)
h = h[:i2] + '<div id="mtd-reglas"></div>\n' + h[i2:]

# 4. encabezado nuevo y nav en pildora
old_nav = h[h.index('<div class="nav">'):h.index('<div id="diag" class="diag"></div>')]
new_nav = open(DIR + 'header.html', encoding='utf-8').read()
h = h.replace(old_nav, new_nav)

# 5. leyenda
old_lg = h[h.index('<div class="lg">'):h.index('<div id="mapa" class="bmc"></div>')]
new_lg = '''<div class="lg"><span class="lg-t">Sem&aacute;foro</span><span class="lg-i"><i class="d-g"></i>Verde &middot; &ge;70</span><span class="lg-i"><i class="d-y"></i>Amarillo &middot; 55 a 69</span><span class="lg-i"><i class="d-r"></i>Rojo &middot; &lt;55</span><span class="lg-i"><i class="d-x"></i>Sin data</span><span class="lg-hint">Pasa sobre un indicador para ver por qu&eacute; tiene ese color. &laquo;Ver doble click&raquo; abre el detalle de la dimensi&oacute;n.</span></div>

'''
h = h.replace(old_lg, new_lg)

# 6. condiciones precedentes como checklist
i0 = h.index('<p style="margin-bottom:10px"><strong>Antes de desembolsar hacen falta cuatro cosas, no diez.</strong></p>')
i1 = h.index('<p style="font-size:12px;opacity:.8">Las tres primeras son la misma conversaci&oacute;n')
old_cp = h[i0:i1]
items = re.findall(r'<li[^>]*>(.*?)</li>', old_cp, re.S)
assert len(items) == 4, len(items)
cp = '<div class="cp-wrap"><div class="cp-head"><div><p style="margin:0"><strong>Antes de desembolsar hacen falta cuatro cosas, no diez.</strong></p><div class="cp-sim">Marca cada una cuando se cumpla. Es un simulador para la sesi&oacute;n, no se guarda.</div></div><div class="cp-ring"><svg viewBox="0 0 44 44"><circle class="cp-base" cx="22" cy="22" r="18"/><circle class="cp-arc" cx="22" cy="22" r="18"/></svg><span class="cp-num">0/4</span></div></div><div class="cp-list">'
for n, it in enumerate(items):
    cp += f'<button type="button" class="cp-item" role="checkbox" aria-checked="false" id="cp-{n}"><span class="cp-box"></span><span class="cp-txt">{it}</span></button>'
cp += '</div></div>'
h = h[:i0] + cp + h[i1:]

# 7. render del mapa y de los indicadores
a = h.index('function renderSub(s){')
b = h.index('function renderBmc(){')
h = h[:a] + open(DIR + 'render.js', encoding='utf-8').read() + '\n' + h[b:]

# 8. tabs, exponer activate e indicador deslizante
must(""" c.classList.toggle('dim-active', c.dataset.dimKey === key);
 });
 }""", """ c.classList.toggle('dim-active', c.dataset.dimKey === key);
 });
 if (window.__moveTabInd) window.__moveTabInd();
 }
 window.__activateDim = activate;""")

# 9. banda de la calculadora, el momento de logro
must("""  ? 'FUERA de la banda declarada de 3% a 5%' : 'objetivo declarado, 3% a 5%';""",
     """  ? 'FUERA de la banda declarada de 3% a 5%' : 'objetivo declarado, 3% a 5%';
 if (window.__bandState !== undefined && window.__bandState !== fuera && window.__celebrar) {
   window.__celebrar(document.getElementById('o-luchaup'), fuera ? 'Fuera de la banda' : 'Dentro de la banda', fuera ? 'mal' : 'bien');
 }
 window.__bandState = fuera;
 ['b-up','b-full','b-cash','b-ratio'].forEach(function(id){ var e=document.getElementById(id); if(e && window.__flash) window.__flash(e); });""")

# 9b. simulador de drivers del negocio (regla del 2026-09-30). drivers-check.js bloquea si no calza con el modelo
DRV = ''
if os.path.exists(DIR + 'drivers-caso.js') and '--sin-caso' not in sys.argv:
    import subprocess
    r = subprocess.run(['node', DIR + 'drivers-check.js', DIR + 'drivers-caso.js'] + (['--plantilla'] if PLANTILLA else []), capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(r.stderr.strip() or 'DRIVERS BLOQUEA')
    print(r.stdout.strip())
    DRV = open(DIR + 'drivers-caso.js', encoding='utf-8').read() + '\n' + open(DIR + 'drivers.js', encoding='utf-8').read() + '\n'

# 10. css y js nuevos
must('</style>\n</head>', '\n' + open(DIR + 'skin.css', encoding='utf-8').read() + '\n' + open(DIR + 'dimux.css', encoding='utf-8').read() + '\n' + open(DIR + 'abc.css', encoding='utf-8').read() + '\n' + open(DIR + 'reglas.css', encoding='utf-8').read() + '\n' + open(DIR + 'valida.css', encoding='utf-8').read() + '\n' + open(DIR + 'deal.css', encoding='utf-8').read() + '\n' + open(DIR + 'drivers.css', encoding='utf-8').read() + '\n</style>\n</head>')
must('</script>\n</body>', '\n' + open(DIR + 'motion.js', encoding='utf-8').read() + '\n' + open(DIR + 'struct.js', encoding='utf-8').read() + '\n' + DRV + open(DIR + 'dimux.js', encoding='utf-8').read() + '\nwindow.__reglasPost && window.__reglasPost();\n' + open(DIR + 'theme.js', encoding='utf-8').read() + '\n</script>\n</body>')

# 10a. tipografia, propuesta 3 del 2026-09-29. Nunito en todo, tres tamanos, etiquetas sin mayusculas
h = h.replace("'Quicksand'", "'Nunito'").replace('"Quicksand"', '"Nunito"').replace('font-family:Quicksand', 'font-family:Nunito').replace('font-family: Quicksand', 'font-family: Nunito')
def _fs(m):
    v = float(m.group(1))
    n = 13 if v <= 11 else 15 if v <= 14 else v
    return 'font-size:' + (str(int(n)) if float(n).is_integer() else str(n)) + 'px'
h = re.sub(r'font-size:\s*([\d.]+)px', _fs, h)
def _up(m):
    body = m.group(0)
    if 'uppercase' not in body: return body
    body = re.sub(r'letter-spacing:\s*[\d.]+(px|em)\s*;?', '', body)
    return body.replace('text-transform:uppercase', 'text-transform:none;font-weight:700')
h = re.sub(r'\{[^{}]*\}', _up, h)
h = re.sub(r'style="[^"]*"', _up, h)
must('</style>\n</head>', '\n' + open(DIR + 'tipo.css', encoding='utf-8').read() + '\n' + open(DIR + 'layout.css', encoding='utf-8').read() + '\n</style>\n</head>')

# 10b. plantilla, la ficha ABC manda y el encabezado dice que es plantilla
if PLANTILLA:
    must("modo: 'ilustrativo',", "modo: 'vigente',")
    h = re.sub(r"periodo: '[^']*'", "periodo: 'Plantilla del EL &middot; reglas 2026-09-28 &middot; datos de ejemplo de un caso cerrado'", h, count=1)
    # 10c. barrido de prosa, septimo vicio de EL System (2026-09-29)
    import prosa_plantilla
    h = prosa_plantilla.aplicar(h)

# 11. al formato del artifact, sin doctype ni head ni body
head = h[h.index('<title>'):h.index('</head>')]
body = h[h.index('<body>') + 6:h.index('</body>')]
head = head.replace('<title>Entendimiento Luchante &middot; Polímera</title>', '<title>Plantilla del EL</title>' if PLANTILLA else '<title>Entendimiento Luchante Polímera</title>')
open(OUT, 'w', encoding='utf-8').write(head + '\n' + body)
print('ok', len(head + body))
