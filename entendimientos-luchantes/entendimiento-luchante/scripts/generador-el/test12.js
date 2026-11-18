const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:900},deviceScaleFactor:1.2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|fonts|net::/.test(m.text()))errs.push(m.text())});
await p.goto('file://'+__dirname+'/preview.html');await p.waitForTimeout(900);
const res={};
for(const k of ['proposito','negocio','capital','mercado','impacto','equipo','storytelling','bienestar','resiliencia']){
 await p.evaluate(k=>window.__activateDim(k),k);await p.waitForTimeout(250);
 res[k]=await p.evaluate(()=>{const c=document.querySelector('.dim-card.dim-active');return {rows:c.querySelectorAll('.dx-row').length,sx:c.querySelectorAll('.sx').length,keep:c.querySelectorAll('.sx-keep').length,orig:c.querySelectorAll('.sx-orig').length,loose:[...c.children].map(e=>e.className).filter(x=>!/^(dim-head|dx-|rubrica|dim-conclusion|sig)/.test(x))}});
}
async function shot(k,i,name){await p.evaluate(k=>window.__activateDim(k),k);await p.waitForTimeout(200);
 await p.click('.dim-card.dim-active .dx-row[data-i="'+i+'"] .dx-row-h');await p.waitForTimeout(700);
 const el=await p.$('.dim-card.dim-active .dx-row[data-i="'+i+'"]');await el.screenshot({path:__dirname+'/'+name});
 await p.click('.dim-card.dim-active .dx-row[data-i="'+i+'"] .dx-row-h');await p.waitForTimeout(400);}
await shot('capital',1,'sx-cap1.png');await shot('negocio',0,'sx-neg0.png');await shot('mercado',2,'sx-mer2.png');await shot('equipo',1,'sx-eq1.png');await shot('capital',0,'sx-cap0.png');
await p.setViewportSize({width:400,height:800});await p.evaluate(()=>window.__activateDim('negocio'));await p.waitForTimeout(300);
await p.click('.dim-card.dim-active .dx-row[data-i="0"] .dx-row-h');await p.waitForTimeout(700);
const w=await p.evaluate(()=>document.documentElement.scrollWidth);
const el=await p.$('.dim-card.dim-active .dx-row[data-i="0"]');await el.screenshot({path:__dirname+'/sx-mob.png'});
console.log(JSON.stringify({res,w,errs},null,0));await b.close();})();
