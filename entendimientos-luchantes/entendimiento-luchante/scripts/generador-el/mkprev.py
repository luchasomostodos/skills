import os, sys
D = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else D + '/../../assets/plantilla/plantilla-EL-vigente.html'
out = open(SRC, encoding='utf-8').read()
head = "<!doctype html><html><head><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'></head><body>"
open(D + '/preview.html', 'w', encoding='utf-8').write(head + '\n' + out + '\n</body></html>\n')
