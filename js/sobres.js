// ===== SOBRES v20: sobres rediseñados, garantía de legendario, rango Leyenda, ropa (outfits) con accesorios y auras =====
(()=>{
const OUTF=[
 {n:'Callejero Gris',r:0,col:'#6b7280',pat:1,pc:'#d1d5db'},
 {n:'Verde Neón',r:0,col:'#16a34a',pat:2,pc:'#bbf7d0'},
 {n:'Rojo Barrio',r:0,col:'#dc2626',pat:3,pc:'#ffffff'},
 {n:'Azul Rey',r:0,col:'#1d4ed8',pat:5,pc:'#facc15'},
 {n:'Ninja Sombra',r:1,col:'#111827',pat:6,pc:'#ef4444',acc:'band',c:'#ef4444'},
 {n:'Gatito Rosa',r:1,col:'#ec4899',pat:10,pc:'#ffffff',acc:'ears',fx:'spark',c:'#ff9ad5'},
 {n:'Robot Chip',r:1,col:'#64748b',pat:1,pc:'#22d3ee',acc:'ant',fx:'spark',c:'#22d3ee'},
 {n:'Demonio Infernal',r:2,col:'#7f1d1d',pat:8,pc:'#fb923c',acc:'horns',hc:'#ff3b2f',fx:'ember',c:'#ff4a1a',em:['🔥']},
 {n:'Ángel Celestial',r:2,col:'#f8fafc',pat:5,pc:'#fcd34d',acc:'halo',fx:'spark',c:'#fde68a'},
 {n:'Vampiro Nocturno',r:2,col:'#2e1065',pat:12,pc:'#dc2626',acc:'wings',fx:'orbit',em:['🦇'],c:'#a855f7'},
 {n:'Dragón Esmeralda',r:2,col:'#065f46',pat:12,pc:'#34d399',acc:'horns',hc:'#22c55e',fx:'ember',c:'#34d399',em:['🐉']},
 {n:'Rey Demonio',r:3,col:'#0a0a0a',pat:8,pc:'#ff2d2d',acc:'horns',hc:'#ff1a1a',hb:1.45,fx:'ember',c:'#ff1a1a',em:['🔥','💀']},
 {n:'Dios del Trueno',r:3,col:'#1e3a8a',pat:9,pc:'#fde047',acc:'crown',fx:'bolt',c:'#fde047'},
 {n:'Cósmico Galáctico',r:3,col:'#1e1b4b',pat:11,pc:'#c084fc',acc:'halo',hc:'#c084fc',fx:'orbit',em:['⭐','🪐'],c:'#c084fc'},
 {n:'Fénix Ardiente',r:3,col:'#b45309',pat:8,pc:'#fde047',acc:'flames',fx:'ember',c:'#ffa500',em:['🔥']}];
window.OUTF=OUTF;
const OW=[55,28,13,4],ODUP=[60,150,400,1000],OLBL=['Común','Raro','Épico','Legendario'];
const OPACKS=[{n:'ROPA CALLEJERA',cost:150,cnt:1,min:0,b:0,e:'👕'},{n:'ROPA PLATA',cost:600,cnt:3,min:1,b:.2,e:'🧥'},{n:'ROPA ORO',cost:1400,cnt:4,min:1,b:.5,e:'🥋'},{n:'ROPA INFERNAL',cost:3200,cnt:4,min:2,b:1,e:'😈',pity:1}];
PACKS.push({n:'SOBRE CLÁSICO',cost:5000,cnt:3,min:2,b:0,e:'🏆',lm:0,cl:1});
const oo=()=>save.oo||(save.oo={}),has=i=>!!oo()[i];
const eqOf=()=>save.of!=null&&OUTF[save.of]&&has(save.of)?OUTF[save.of]:null;
const hex2=(c,a)=>c+('0'+Math.round(a*255).toString(16)).slice(-2);
// ---- estampados nuevos (8-12) ----
const _jp=window.jPat;
window.jPat=function(g,pat,pc,tor){if(!pat||pat<8)return _jp(g,pat,pc,tor);if(!pc)return;g.save();g.clip();g.fillStyle=pc;g.strokeStyle=pc;
 const P=new Path2D();
 if(tor){switch(pat){
  case 8:for(let x=-20;x<20;x+=10){P.moveTo(x,4);P.quadraticCurveTo(x+1,-10,x+5,-24);P.quadraticCurveTo(x+9,-10,x+10,4)}g.fill(P);break;
  case 9:P.moveTo(-5,-44);P.lineTo(6,-28);P.lineTo(-4,-24);P.lineTo(7,-4);g.lineWidth=5;g.stroke(P);break;
  case 10:for(let y=-38;y<2;y+=11)for(let x=-14+(((y+38)/11|0)&1)*5;x<18;x+=10){P.moveTo(x+2.4,y);P.arc(x,y,2.4,0,7)}g.fill(P);break;
  case 11:P.moveTo(-20,-46);P.lineTo(20,-46);P.lineTo(-20,4);P.closePath();g.fill(P);break;
  case 12:g.lineWidth=1.8;for(let y=-40;y<6;y+=9)for(let x=-20+(((y+40)/9|0)&1)*6;x<22;x+=12){P.moveTo(x+6,y);P.arc(x,y,6,0,Math.PI)}g.stroke(P);break}}
 else{g.fillRect(-16,12,32,4);g.fillRect(-16,-4,4,6)}
 g.restore()};
// ---- accesorios (origen = parte alta de la cabeza, u = escala) ----
const ACC={
 horns(g,u,f,o){const c=o.hc||'#e11d2e',b=o.hb||1;for(const s of[-1,1]){g.save();g.scale(s*u*b,u*b);const gr=g.createLinearGradient(8,6,22,-30);gr.addColorStop(0,'#2a0505');gr.addColorStop(1,c);g.fillStyle=gr;g.strokeStyle='#150303';g.lineWidth=2;g.beginPath();g.moveTo(6,5);g.quadraticCurveTo(7,-14,24,-32);g.quadraticCurveTo(21,-10,15,7);g.closePath();g.fill();g.stroke();g.restore()}},
 halo(g,u,f,o){const c=o.hc||'#ffe27a',y=-17*u+Math.sin(f*.08)*2*u;g.save();g.globalCompositeOperation='lighter';g.shadowColor=c;g.shadowBlur=18*u;g.strokeStyle=c;g.lineWidth=4.5*u;g.beginPath();g.ellipse(0,y,18*u,5.5*u,0,0,7);g.stroke();g.strokeStyle='#fff';g.lineWidth=1.6*u;g.stroke();g.restore()},
 crown(g,u){g.save();g.scale(u,u);const gr=g.createLinearGradient(0,-20,0,5);gr.addColorStop(0,'#fff3a0');gr.addColorStop(1,'#d89a0b');g.fillStyle=gr;g.strokeStyle='#5a3a00';g.lineWidth=2;g.beginPath();g.moveTo(-17,5);g.lineTo(-18,-14);g.lineTo(-9,-5);g.lineTo(0,-21);g.lineTo(9,-5);g.lineTo(18,-14);g.lineTo(17,5);g.closePath();g.fill();g.stroke();for(const[x,c]of[[-11,'#ef4444'],[0,'#38bdf8'],[11,'#ef4444']]){g.fillStyle=c;g.beginPath();g.arc(x,-2,2.6,0,7);g.fill()}g.restore()},
 ears(g,u,f,o){for(const s of[-1,1]){g.save();g.scale(s*u,u);g.fillStyle='#ec4899';g.strokeStyle='#1a1020';g.lineWidth=2;g.beginPath();g.moveTo(5,3);g.lineTo(10,-20);g.lineTo(21,-3);g.closePath();g.fill();g.stroke();g.fillStyle='#ffc1e3';g.beginPath();g.moveTo(9,-2);g.lineTo(11,-13);g.lineTo(16,-4);g.closePath();g.fill();g.restore()}},
 ant(g,u,f){g.save();g.scale(u,u);g.strokeStyle='#cbd5e1';g.lineWidth=2.4;g.beginPath();g.moveTo(0,2);g.lineTo(0,-22);g.stroke();const on=(f>>4)&1;g.fillStyle=on?'#22d3ee':'#0e7490';g.shadowColor='#22d3ee';g.shadowBlur=on?12:2;g.beginPath();g.arc(0,-26,5,0,7);g.fill();g.restore()},
 band(g,u,f,o,fc){fc=fc||1;g.save();g.scale(u,u);g.fillStyle=o.c||'#ef4444';g.strokeStyle='#1a1020';g.lineWidth=1.6;g.fillRect(-17,12,34,6);g.strokeRect(-17,12,34,6);const w=Math.sin(f*.2)*4;g.beginPath();g.moveTo(-fc*17,14);g.quadraticCurveTo(-fc*(28+w),10+w,-fc*(38+w),19+w*.5);g.lineTo(-fc*(30),21);g.quadraticCurveTo(-fc*22,18,-fc*17,18);g.closePath();g.fill();g.stroke();g.restore()},
 flames(g,u,f){g.save();g.globalCompositeOperation='lighter';g.scale(u,u);for(let i=-2;i<=2;i++){const h=18+9*Math.sin(f*.3+i*1.7)+(2-Math.abs(i))*5;const gr=g.createLinearGradient(0,4,0,-h);gr.addColorStop(0,'#ff3b00');gr.addColorStop(.6,'#ffb100');gr.addColorStop(1,'#fff6a0');g.fillStyle=gr;g.beginPath();g.moveTo(i*8-6,4);g.quadraticCurveTo(i*8-5,-h*.5,i*8+Math.sin(f*.25+i)*3,-h);g.quadraticCurveTo(i*8+5,-h*.5,i*8+6,4);g.closePath();g.fill()}g.restore()},
 wings(g,u,f,o){const fl=Math.sin(f*.16)*9;for(const s of[-1,1]){g.save();g.scale(s*u,u);const gr=g.createLinearGradient(10,40,70,10);gr.addColorStop(0,'#1e0a4a');gr.addColorStop(1,'#7c2bd8');g.fillStyle=gr;g.strokeStyle='#0d0420';g.lineWidth=2;g.beginPath();g.moveTo(12,50);g.lineTo(34,22+fl);g.lineTo(66,4+fl);g.quadraticCurveTo(62,22+fl,54,26+fl);g.quadraticCurveTo(58,40+fl*.6,46,44+fl*.5);g.quadraticCurveTo(46,58,34,60);g.quadraticCurveTo(28,66,12,64);g.closePath();g.fill();g.stroke();g.strokeStyle='#dc2626';g.lineWidth=1.4;g.beginPath();g.moveTo(14,52);g.lineTo(62,6+fl);g.moveTo(16,54);g.lineTo(50,30+fl*.7);g.stroke();g.restore()}}};
// parte alta de la cabeza + auras (compartido entre partido y vista previa)
const sr=(i,f)=>{const x=Math.sin(i*127.1+f*311.7)*43758.5453;return x-Math.floor(x)};
function auraFx(g,o,x,yb,H,u,f){if(!o.fx&&!o.c)return;const c=o.c||'#fff';g.save();g.globalCompositeOperation='lighter';
 if(o.r>=2){const gr=g.createRadialGradient(x,yb,2,x,yb,62*u);gr.addColorStop(0,hex2(c,.5+.15*Math.sin(f*.2)));gr.addColorStop(1,hex2(c,0));g.fillStyle=gr;g.beginPath();g.ellipse(x,yb,62*u,17*u,0,0,7);g.fill()}
 if(o.fx==='ember'){for(let i=0;i<10;i++){const k=((f*.9+i*29)%70)/70,px=x+Math.sin(i*5+k*6)*30*u,py=yb-k*H*1.02,r=(1-k)*4.2*u+1;g.fillStyle=hex2(i%2?c:'#ffd27a',1-k);g.beginPath();g.arc(px,py,r,0,7);g.fill()}
  if(o.em){g.globalCompositeOperation='source-over';g.font=Math.round(17*u)+'px sans-serif';g.textAlign='center';for(let i=0;i<3;i++){const k=((f*.6+i*40)%120)/120;g.globalAlpha=1-k;g.fillText(o.em[i%o.em.length],x+Math.sin(i*2+k*5)*26*u,yb-H*.1-k*H*.9)}}}
 else if(o.fx==='spark'){for(let i=0;i<8;i++){const a=f*.03+i*.9,px=x+Math.cos(a*1.3+i)*38*u,py=yb-H*(.08+.9*((i*.137+f*.004)%1)),s=(2.5+4*Math.abs(Math.sin(f*.12+i)))*u;g.strokeStyle=hex2(i%2?c:'#ffffff',.9);g.lineWidth=1.6*u;g.beginPath();g.moveTo(px-s,py);g.lineTo(px+s,py);g.moveTo(px,py-s);g.lineTo(px,py+s);g.stroke()}}
 else if(o.fx==='orbit'){g.globalCompositeOperation='source-over';g.font=Math.round(20*u)+'px sans-serif';g.textAlign='center';const n=(o.em?o.em.length:1)*2;for(let i=0;i<n;i++){const a=f*.05+i*Math.PI*2/n;g.globalAlpha=.55+.45*Math.sin(a+1.57);g.fillText(o.em?o.em[i%o.em.length]:'✦',x+Math.cos(a)*H*.36,yb-H*.5+Math.sin(a)*H*.1)}
  g.globalCompositeOperation='lighter';g.globalAlpha=1;for(let i=0;i<6;i++){const k=((f*.7+i*23)%80)/80;g.fillStyle=hex2(c,1-k);g.beginPath();g.arc(x+Math.sin(i*3+k*4)*26*u,yb-k*H,(1-k)*3.5*u+.8,0,7);g.fill()}}
 else if(o.fx==='bolt'){const s0=f>>2;for(let b=0;b<2;b++){let px=x+(sr(b,s0)-.5)*60*u,py=yb-H*(.2+sr(b+9,s0)*.5);g.strokeStyle=hex2(c,.9);g.lineWidth=3*u;g.shadowColor=c;g.shadowBlur=14*u;g.beginPath();g.moveTo(px,py);for(let k=1;k<6;k++){px+=(sr(b*7+k,s0)-.5)*30*u;py+=14*u*(sr(k,s0+b)+.3);g.lineTo(px,py)}g.stroke();g.strokeStyle='#fff';g.lineWidth=1*u;g.stroke()}}
 g.restore()}
function drawOutfit(g,o,x,yf,sc,hh,f,fc,z){const H=210*sc*hh,u=sc*hh/.85*.9,yh=yf-H*.98;auraFx(g,o,x,yf,H,sc/.85,f);if(!o.acc||!ACC[o.acc])return;g.save();g.translate(x,yh);ACC[o.acc](g,u,f,o,fc);g.restore()}
const _ov=MV.over;
MV.over=function(g,p,sc){_ov.apply(this,arguments);try{const o=p.of;if(!o||!G||G.mode==='end')return;const hh=CH[p.hdo||p.id].h||1;if(p.st==='fall'){auraFx(g,o,p.x,p.y-p.z,60,sc/.85,G.fr);return}drawOutfit(g,o,p.x,p.y-p.z,sc,hh,G.fr,p.f||1)}catch(e){}};
const _mk=window.mkP;
window.mkP=function(t){const p=_mk.apply(this,arguments);try{const o=eqOf();if(t===0&&o){p.col=o.col;p.pat=o.pat;p.pc=o.pc;p.of=o}}catch(e){}return p};
const _rc=window.rivalColor;
window.rivalColor=function(own,pref){try{const o=eqOf();if(o&&own===CH[save.sel].jc)own=o.col}catch(e){}return _rc.call(this,own,pref)};
const _chm=window.cardHTML;
window.cardHTML=function(id){return _chm.apply(this,arguments).replace('<div class="pcard"','<div data-rk="'+CH[id].rar+'" class="pcard"')};
// ---- iconos de ropa ----
const icoC={};
function icon(i){if(icoC[i])return icoC[i];const o=OUTF[i],cv=document.createElement('canvas');cv.width=100;cv.height=120;const g=cv.getContext('2d');
 g.save();g.translate(50,116);g.scale(1.5,1.5);g.beginPath();g.moveTo(-14,2);g.lineTo(14,2);g.lineTo(17,-38);g.quadraticCurveTo(0,-45,-17,-38);g.closePath();g.fillStyle=o.col;g.fill();window.jPat(g,o.pat,o.pc,1);g.lineWidth=1.8;g.strokeStyle='#1a1020';g.stroke();g.restore();
 g.fillStyle='#e8b48a';g.strokeStyle='#1a1020';g.lineWidth=2;g.beginPath();g.arc(50,40,15,0,7);g.fill();g.stroke();g.fillStyle='#1a1020';g.fillRect(44,40,3,4);g.fillRect(54,40,3,4);
 g.save();g.translate(50,25);if(ACC[o.acc])ACC[o.acc](g,.78,20,o,1);g.restore();
 return icoC[i]=cv.toDataURL()}
// ---- helpers de UI ----
const tip=t=>{const e=$('#gtip');if(e)e.textContent=t};
const RC=r=>RAR[r].c;
function confetti(c,n){const host=$('#gacha');for(let i=0;i<n;i++){const s=document.createElement('span');s.className='cf';const a=Math.random()*6.283,d=120+Math.random()*260;s.style.cssText=`--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d-80}px;--r:${Math.random()*720-360}deg;background:${i%3?c:'#fff'};animation-delay:${Math.random()*.15}s`;host.appendChild(s);setTimeout(()=>s.remove(),1500)}}
const leg=()=>SPEC.map(id=>CH[id]).filter(c=>c&&!c.hide),ley=()=>CH.filter(c=>c.rar===4);
const pick=a=>a[rnd()*a.length|0];
function odds(pk){ // % de la carta garantizada del sobre
 if(pk.cl)return[0,0,60,28,12];const mx=pk.max==null?2:pk.max,W=RAR.map((r,i)=>(i<pk.min||i>mx||i>3)?0:r.w*(i==0?1-pk.b:1+pk.b*i*1.5)),T=W.reduce((a,c)=>a+c,0)||1;return W.map(w=>w/T*100)}
function rollClassic(){const x=rnd();if(x<.12)return pick(ley());if(x<.4)return pick(leg());return pick(CH.filter(c=>c.rar===2&&!c.hide))}
const tabs=t=>`<div class="gtabs g2"><button data-t="p" class="${t==='p'?'on':''}">🃏 JUGADORES</button><button data-t="o" class="${t==='o'?'on':''}">👕 ROPA</button></div>`;
const obar=a=>`<div class="obar">${a.map((w,i)=>w>0?`<i style="flex:${w};background:${RC(i)}" title="${RAR[i].k} ${w.toFixed(1)}%"></i>`:'').join('')}</div>`;
const odl=a=>a.map((w,i)=>w>0?`<u style="--c:${RC(i)}">${RAR[i].k.slice(0,3)} ${w<1?w.toFixed(1):Math.round(w)}%</u>`:'').join('');
function packCard(i,p,kind){const pc=PKC[Math.min(i,4)]||PKC[2],ok=save.coins>=p.cost,o=odds(p),sub=p.cl?`${p.cnt} cartas · ¡LEYENDAS!`:`${p.cnt} carta${p.cnt>1?'s':''}${p.min?' · mín. '+RAR[p.min].k:''}`;
 const col=p.cl?['#ff5ce1','rgba(255,92,225,.55)']:pc;
 return`<button class="pk2${ok||!p.cost?'':' dis'}${p.welcome?' wel':''}${p.cl?' clas':''}" data-i="${i}" style="--pc:${col[0]};--pg:${col[1]}"><div class="p2art"><span>${p.e}</span><i class="sh"></i><em></em></div><b>${p.n}</b><small>${sub}</small>${obar(o)}<div class="p2od">${odl(o)}</div><div class="p2pr">${p.cost?p.cost+' 🪙':'¡GRATIS!'}</div></button>`}
function pityBar(n,max,lbl,cls){let h='';for(let i=0;i<max;i++)h+=`<i class="${i<n?'on':''}"></i>`;return`<div class="pity ${cls||''}"><b>${lbl}</b><div class="pbar">${h}</div><small>${n}/${max}</small></div>`}
let oddsOpen=false;
window.renderPacks=function(){gTab='p';const own=Object.keys(save.owned).length,tot=CH.filter(c=>!c.hide).length,lo=ley().filter(c=>save.owned[c.id]).length,lg=leg().filter(c=>save.owned[c.id]).length;
 const wel=save.welcome?`<div class="pkrow">${packCard(4,PACKS[4])}</div>`:'';
 const main=[0,1,2,3].map(i=>packCard(i,PACKS[i])).join('');
 const mini=(ids,cls)=>`<div class="glr">${ids.map(id=>{const c=CH[id],h=!!save.owned[id];return`<div class="gl ${cls}${h?' own':''}" style="--c:${RC(c.rar)}"><img src="${figImg(id,c.jc)}"><b>${c.name.split(' ')[0]}</b>${h?'<i>✓</i>':''}</div>`}).join('')}</div>`;
 $('#gpk').innerHTML=tabs('p')+wel+pityBar(save.pity||0,10,'🌟 SOBRE LEYENDA: ¡cada 10 sobres te da un LEGENDARIO seguro!','gold')+`<div class="pkrow">${main}</div>`+pityBar(save.cpity||0,5,'🏆 SOBRE CLÁSICO: ¡cada 5 sobres te da una LEYENDA segura!','holo')+`<div class="pkrow">${packCard(5,PACKS[5])}</div>
 <div class="coll"><span>📚 Colección <b>${own}/${tot}</b></span><span>⭐ Legendarios <b>${lg}/${leg().length}</b></span><span>💎 Leyendas <b>${lo}/${ley().length}</b></span><button id="g-odds" class="btn small ghost">ℹ PROBABILIDADES</button></div>
 ${oddsOpen?`<div class="oddsp">${[0,1,2,3,5].map(i=>{const p=PACKS[i];return`<div><b>${p.e} ${p.n}</b><span>${odl(odds(p))}${i<4?` · Legendario extra ${(LEGP*(p.lm||1)*100).toFixed(3)}%/carta`:''}${i===3?' · Leyenda 0.4%/carta':''}${i===5?' · garantiza ≥1 Legendario':''}</span></div>`}).join('')}</div>`:''}
 <div class="glt2">💎 LEYENDAS (solo Sobre Clásico)</div>${mini(ley().map(c=>c.id),'ly')}<div class="glt2">⭐ LEGENDARIOS</div>${mini(leg().map(c=>c.id),'lg')}`;
 bindP()};
function bindP(){$$('#gpk .pk2').forEach(b=>b.onclick=()=>gOpen(+b.dataset.i));$$('#gpk .gtabs button').forEach(b=>b.onclick=()=>{b.dataset.t==='o'?renderOutfits():renderPacks()});const bo=$('#g-odds');if(bo)bo.onclick=()=>{oddsOpen=!oddsOpen;renderPacks()}}
// ---- abrir sobre de jugadores ----
window.gOpen=function(n){const pk=PACKS[n];if(!pk)return;if(save.coins<pk.cost){tip('No tienes monedas suficientes 😢 ¡Juega partidos para ganar más!');sfx('buzz');return}
 save.coins-=pk.cost;if(pk.welcome)save.welcome=0;let guar=0,cs=[];
 if(n===3){save.pity=(save.pity||0)+1;if(save.pity>=10){save.pity=0;guar=3}}
 if(pk.cl){save.cpity=(save.cpity||0)+1;if(save.cpity>=5){save.cpity=0;guar=4}}
 for(let i=0;i<pk.cnt;i++){let c=pk.cl?rollClassic():rollGacha((pk.all||i==pk.cnt-1)?pk.min:0,pk.b,pk);if(n===3&&rnd()<.004)c=pick(ley());cs.push(c)}
 if(guar===3&&!cs.some(c=>c.rar>=3))cs[cs.length-1]=pick(leg());
 if(guar===4&&!cs.some(c=>c.rar===4))cs[cs.length-1]=pick(ley());
 if(pk.cl&&!cs.some(c=>c.rar>=3))cs[cs.length-1]=pick(leg());
 gres=cs.map(c=>({c,r:grantChar(c)})).sort((a,b)=>a.c.rar-b.c.rar);store();gi=0;gMode('reveal');
 const best=Math.max(...gres.map(x=>x.c.rar));$('#gcard').classList.add('hidden');$('#g-next').classList.add('hidden');
 playOpen(pk,best,guar,()=>gShow())};
function playOpen(pk,best,guar,done){let o=$('#gpo');if(!o){o=document.createElement('div');o.id='gpo';$('#gacha').appendChild(o)}
 const c=RC(best);o.style.setProperty('--c',c);o.innerHTML=`<div class="po-r"></div><div class="po-p">${pk.e}</div><div class="po-t">${guar?(guar===4?'💎 ¡LEYENDA GARANTIZADA!':'🌟 ¡LEGENDARIO GARANTIZADO!'):'ABRIENDO…'}</div>`;o.className='on';sfx('card');
 let fin=false;const end=()=>{if(fin)return;fin=true;o.className='boom';if(best>=2){const f=$('#flash');f.style.background=c;f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}setTimeout(()=>{o.className='';done()},420)};
 o.onclick=end;setTimeout(end,1500)}
window.gShow=function(){const{c,r}=gres[gi],R=RAR[c.rar],card=$('#gcard'),fr=$('#gfront');
 card.classList.remove('flip','shake','hidden');card.style.setProperty('--rc',R.c);card.dataset.r=c.rar;void card.offsetWidth;fr.dataset.r=c.rar;
 const o=save.owned[c.id];fr.style.setProperty('--rc',R.c);fr.parentElement.style.setProperty('--rc',R.c);
 const s=statsOf(c.id,o.lvl,o.st);
 fr.innerHTML=`${c.rar>=3?`<div class="rib">${c.rar===4?'💎 LEYENDA':'⭐ LEGENDARIO'}</div>`:''}<canvas width="300" height="300" data-id="${c.id}" data-col="${c.jc}"></canvas><div class="nm">${c.name}</div><div class="rr">★ ${R.k} · ${c.pos} · ${PWN[c.pw]||c.pw} · ${c.title||ARN[c.arch]}</div><div class="ovrb">OVR ${ovrOf(s)}</div>${r.isNew?'<div class="new">¡NUEVO!</div>':r.star?'<div class="new" style="color:#ffe45c">¡COPIA! +1★ (+'+Math.round(STB*100)+'% stats)</div>':`<div class="new" style="color:#ffb347">Copia máx → +${r.coins}🪙</div>`}`;
 mountPreviews(fr);card.classList.add('shake');gstate='back';$('#g-next').classList.add('hidden');
 let ry=$('#grays');if(!ry){ry=document.createElement('div');ry.id='grays';$('#gstage').insertBefore(ry,$('#gstage').firstChild)}ry.className='';ry.style.setProperty('--rc',R.c);
 tip(gres.length>1?`Carta ${gi+1}/${gres.length} · ¡Tócala!`:'¡Toca la carta!')};
$('#gcard').onclick=()=>{if(gstate!=='back')return;gstate='front';const c=gres[gi].c,card=$('#gcard');card.classList.remove('shake');card.classList.add('flip');
 if(c.rar>=2){const f=$('#flash');f.style.background=RAR[c.rar].c;f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}
 sfx(c.rar>=3?'legend':'card');if(c.rar>=3){const ry=$('#grays');if(ry)ry.className='on';confetti(RAR[c.rar].c,c.rar===4?60:36)}else if(c.rar===2)confetti(RAR[2].c,14);
 setTimeout(()=>{const last=gi>=gres.length-1,nb=$('#g-next');nb.classList.remove('hidden');nb.textContent=last?(gres.length>1?'RESUMEN ▶':'OTRA VEZ ▶'):'SIGUIENTE ▶';tip('')},700)};
$('#g-next').onclick=()=>{const ry=$('#grays');if(ry)ry.className='';if(gstate==='sum'){gReset();return}
 if(gi<gres.length-1){gi++;gShow();return}
 if(gres.length>1){gMode('sum');$('#gcard').classList.add('hidden');gstate='sum';
  $('#gsum').innerHTML=gres.map(({c,r})=>`<div class="rc rk${c.rar}" style="--rc:${RAR[c.rar].c}"><img src="${figImg(c.id,c.jc)}"><b>${c.name}</b><small>${RAR[c.rar].k}</small><i>${r.isNew?'¡NUEVO!':r.star?'+1★':'+'+r.coins+'🪙'}</i></div>`).join('');
  $('#gsum').classList.remove('hidden');$('#g-next').textContent='OTRO SOBRE ▶';$('#g-next').classList.remove('hidden');tip('¡Contenido del sobre!')}
 else gReset()};
// ---- ROPA ----
function rollOutfit(minR,b){const W=OW.map((w,i)=>i<minR?0:w*(i===0?1-b:1+b*i*1.5)),T=W.reduce((a,c)=>a+c,0);let x=rnd()*T,ri=0;for(let i=0;i<W.length;i++){if(x<W[i]){ri=i;break}x-=W[i]}return pick(OUTF.map((o,i)=>o.r===ri?i:-1).filter(i=>i>=0))}
function opCard(i,p){const ok=save.coins>=p.cost,o=OW.map((w,k)=>k<p.min?0:w*(k===0?1-p.b:1+p.b*k*1.5)),T=o.reduce((a,c)=>a+c,0),pc=PKC[[0,1,2,3][i]];
 return`<button class="pk2${ok?'':' dis'}" data-o="${i}" style="--pc:${pc[0]};--pg:${pc[1]}"><div class="p2art"><span>${p.e}</span><i class="sh"></i><em></em></div><b>${p.n}</b><small>${p.cnt} prenda${p.cnt>1?'s':''}${p.min?' · mín. '+OLBL[p.min]:''}</small>${obar(o.map(w=>w/T*100))}<div class="p2od">${odl(o.map(w=>w/T*100))}</div><div class="p2pr">${p.cost} 🪙</div></button>`}
window.renderOutfits=function(){gTab='o';const o=eqOf(),n=Object.keys(oo()).length;
 const slots=[`<div class="osl orig${o?'':' eq'}" data-s="-1"><div class="oi">🏀</div><b>Original</b><small>Sin ropa</small></div>`].concat(OUTF.map((x,i)=>{const h=has(i);return`<div class="osl${h?'':' off'}${o===x?' eq':''}" data-s="${i}" style="--rc:${RC(Math.min(x.r,3))}"><img src="${icon(i)}"><b>${h?x.n:'???'}</b><small>${OLBL[x.r]}${x.acc||x.fx?' ✨':''}</small>${h&&oo()[i]>1?`<i>x${oo()[i]}</i>`:''}${o===x?'<em>PUESTA</em>':''}</div>`})).join('');
 $('#gpk').innerHTML=tabs('o')+`<div class="wr"><canvas id="wrc" width="200" height="230"></canvas><div class="wri"><b>${o?o.n:'Equipación original'}</b><small>${o?OLBL[o.r]+(o.acc?' · '+({horns:'Cuernos',halo:'Halo',crown:'Corona',ears:'Orejas',ant:'Antena',band:'Cinta ninja',flames:'Pelo en llamas',wings:'Alas'})[o.acc]:'')+(o.fx?' · aura':''):'Toca una prenda para ponértela'}</small><small>Se aplica a todo tu equipo en los partidos</small>${pityBar(save.opity||0,5,'😈 ROPA INFERNAL: ¡cada 5 sobres = ROPA LEGENDARIA!','gold')}<small class="wrc">👕 ${n}/${OUTF.length} prendas</small></div></div>
 <div class="pkrow">${OPACKS.map((p,i)=>opCard(i,p)).join('')}</div><div class="glt2">👗 TU ARMARIO</div><div class="wgrid">${slots}</div>`;
 $$('#gpk .pk2[data-o]').forEach(b=>b.onclick=()=>openOPack(+b.dataset.o));$$('#gpk .gtabs button').forEach(b=>b.onclick=()=>{b.dataset.t==='o'?renderOutfits():renderPacks()});
 $$('#gpk .osl').forEach(e=>e.onclick=()=>{const i=+e.dataset.s;if(i>=0&&!has(i)){sfx('buzz');return}save.of=i<0||save.of===i?null:i;store();sfx('card');renderOutfits()})};
let wf=0;setInterval(()=>{const c=$('#wrc');if(!c||!c.offsetParent)return;wf++;const g=c.getContext('2d'),id=save.sel,hh=CH[id].h||1,o=eqOf(),col=o?o.col:CH[id].jc,sc=.8;g.clearRect(0,0,200,230);
 try{drawRigFig(g,100,215,sc,1,col,id,{mv:false,gait:0,cy:0,an:wf,ball:false,pat:o?o.pat:patOf(col),pc:o?o.pc:pcOf(col)});if(o)drawOutfit(g,o,100,215,sc,hh,wf,1)}catch(e){}},60);
function openOPack(i){const pk=OPACKS[i];if(save.coins<pk.cost){sfx('buzz');tip('Faltan monedas 😢');return}save.coins-=pk.cost;let lg=false;if(pk.pity){save.opity=(save.opity||0)+1;if(save.opity>=5){save.opity=0;lg=true}}
 let ids=[];for(let k=0;k<pk.cnt;k++)ids.push(rollOutfit(k===pk.cnt-1?pk.min:0,pk.b));
 if(lg&&!ids.some(x=>OUTF[x].r===3))ids[ids.length-1]=pick(OUTF.map((o,x)=>o.r===3?x:-1).filter(x=>x>=0));
 ids.sort((a,b)=>OUTF[a].r-OUTF[b].r);
 const res=ids.map(id=>{const had=oo()[id]||0;oo()[id]=had+1;let coins=0;if(had>0){coins=ODUP[OUTF[id].r];save.coins+=coins}return{id,nw:had===0,coins}});
 if(save.of==null&&res.some(r=>r.nw)){save.of=res.find(r=>r.nw).id}
 store();const top=Math.max(...ids.map(x=>OUTF[x].r));sfx(top>=3?'legend':'card');
 $('#hatres').innerHTML=`<div class="hrt">👕 ¡TU ROPA NUEVA!</div><div class="hrg">${res.map(r=>`<div class="hc oc" data-e="${r.id}" style="--rc:${RC(OUTF[r.id].r)};animation-delay:${res.indexOf(r)*.15}s"><img src="${icon(r.id)}" width="74" height="89"><b>${OUTF[r.id].n}</b><small>${OLBL[OUTF[r.id].r]}${OUTF[r.id].acc||OUTF[r.id].fx?' ✨':''}</small><span>${r.nw?'¡NUEVA!':'+'+r.coins+'🪙'}</span><u>TOCA = PONERTE</u></div>`).join('')}</div><button class="btn main" id="hr-ok">OK</button>`;
 $('#hatres').classList.remove('hidden');if(top>=2)confetti(RC(top),top>=3?50:20);
 $$('#hatres .oc').forEach(e=>e.onclick=()=>{save.of=+e.dataset.e;store();sfx('card');$$('#hatres .oc').forEach(x=>x.classList.remove('worn'));e.classList.add('worn')});
 $('#hr-ok').onclick=()=>{$('#hatres').classList.add('hidden');renderOutfits()}}
window.openOPack=openOPack;
})();
