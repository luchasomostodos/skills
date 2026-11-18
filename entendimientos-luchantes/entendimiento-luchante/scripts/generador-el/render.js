/* Mapa con la piel de la marca vigente. Cada indicador muestra su color con
   punto y palabra, y el por que de su color se abre al pasar o al tocar. */
const SEM_LBL = { g: 'Verde', y: 'Amarillo', r: 'Rojo', x: 'Sin data' };
const fmtScore = v => v == null ? '--' : (Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ','));

function renderSub(s){
 const tt = TT[s.k] || { t: s.k, d: '', c: '' };
 const sc = s.score == null ? (s.sem === 'x' ? '&middot;' : '--') : nm(s.score);
 const porLbl = s.sem === 'r' ? 'Por qu&eacute; est&aacute; en rojo'
              : s.sem === 'y' ? 'Por qu&eacute; est&aacute; en amarillo'
              : 'Por qu&eacute; est&aacute; as&iacute;';
 const raw = s.raw ? `<div class="su-raw">${s.raw}${s.u}</div>` : '';
 const por = s.por ? `<div class="su-por su-por-${s.sem}"><span class="su-por-t">${porLbl}</span>${s.por}</div>` : '';
 const tpD = s.por ? `<span class="tp-why tp-why-${s.sem}">${porLbl}</span>${s.por}` : tt.d;
 const tpC = s.por ? `${tt.d} ${tt.c}` : tt.c;
 const tpCall = `showTp(event,'${escapeAttr(tt.t)}','${escapeAttr(tpD)}','${escapeAttr(tpC)}')`;
 return `<div class="su${s.por ? ' has-por' : ''}" tabindex="0"
 onmouseenter="${tpCall}" onmouseleave="hideTp()" onfocus="${tpCall}" onblur="hideTp()">
 <span class="su-dot d-${s.sem}"></span>
 <span class="su-n">${tt.t}${s.por ? '<span class="su-q" aria-hidden="true">?</span>' : ''}</span>
 <span class="su-v sc-${s.sem}">${sc}</span>
 ${(raw || por) ? `<div class="su-more"><div class="su-more-in">${raw}${por}</div></div>` : ''}
 </div>`;
}

function renderBlock(key){
 const sec = SECTIONS[key];
 const sem = sec.semaforo;
 const score = sec.score == null ? (sec.score_label || '--') : fmtScore(sec.score);
 const count = sec.score == null ? '' : ` data-count="${sec.score}"`;
 const subsHtml = sec.subs.map(renderSub).join('');
 const vetoHtml = sec.veto ? `<span class="veto-badge">VETO</span>` : '';
 const bar = sec.score == null ? '' : `<div class="bk-bar"><span class="bar-${sem}" style="width:${sec.score}%"></span><i></i></div>`;
 const chip = `<span class="chip ch-${sem}"><i class="d-${sem}"></i>${SEM_LBL[sem]}${sem !== 'x' ? (sem === 'g' ? ' &middot; &ge;70' : sem === 'y' ? ' &middot; 55 a 69' : ' &middot; &lt;55') : ''}</span>`;
 if (key === 'proposito') {
 return `<div class="bk bc" data-dim="${key}">
 <div class="eb">El centro</div>
 <div class="bt">${sec.nombre}</div>
 <div class="bq">${sec.pregunta}</div>
 <div class="bs-wrap"><span class="bs sc-${sem}"${count}>${score}</span></div>
 ${chip}
 <div class="subs">${subsHtml}</div>
 <button type="button" class="bk-go" data-go="${key}">Ver doble click <span aria-hidden="true">&rarr;</span></button>
 </div>`;
 }
 return `<div class="bk" data-dim="${key}" style="grid-area:${AREA[key]}">
 <div class="bh">
 <div>
 <div class="bt">${sec.nombre} ${vetoHtml}</div>
 <div class="bq">${sec.pregunta}</div>
 </div>
 <div class="bs-wrap"><span class="bs sc-${sem}"${count}>${score}</span></div>
 </div>
 ${bar}
 <div>${chip}</div>
 <div class="subs">${subsHtml}</div>
 <button type="button" class="bk-go" data-go="${key}">Ver doble click <span aria-hidden="true">&rarr;</span></button>
 </div>`;
}
