// ===== ARMARIO v20: camisetas, accesorios por ranuras (cabeza/cara/espalda) y TRAJE limitado con alas, ventajas y fondo animado =====
(()=>{
const {tip,RC,confetti,pick,obar,odl,pityBar}=SB;
const LIM_END=Date.UTC(2026,10,30,22,59,59);
const I=(n,r,o)=>Object.assign({n,r,slot:'j'},o);
const OUTF=[
 I('Callejero Gris',0,{col:'#6b7280',pat:1,pc:'#d1d5db'}),
 I('Verde Neón',0,{col:'#16a34a',pat:2,pc:'#bbf7d0'}),
 I('Rojo Barrio',0,{col:'#dc2626',pat:3,pc:'#ffffff'}),
 I('Azul Rey',0,{col:'#1d4ed8',pat:5,pc:'#facc15'}),
 I('Ninja Sombra',1,{col:'#111827',pat:6,pc:'#ef4444',acc:'band',c:'#ef4444',bn:{reg:3,vel:2}}),
 I('Gatito Rosa',1,{col:'#ec4899',pat:10,pc:'#ffffff',acc:'ears',fx:'spark',c:'#ff9ad5',bn:{vel:3}}),
 I('Robot Chip',1,{col:'#64748b',pat:1,pc:'#22d3ee',acc:'ant',fx:'spark',c:'#22d3ee',bn:{pas:3,tir:2}}),
 I('Demonio Infernal',2,{col:'#7f1d1d',pat:8,pc:'#fb923c',acc:'horns',hc:'#ff3b2f',fx:'ember',c:'#ff4a1a',em:['🔥'],bn:{mat:4,vel:2}}),
 I('Ángel Celestial',2,{col:'#f8fafc',pat:5,pc:'#fcd34d',acc:'halo',fx:'spark',c:'#fde68a',bn:{def:3,agu:4}}),
 I('Vampiro Nocturno',2,{col:'#2e1065',pat:12,pc:'#dc2626',acc:'wings',fx:'orbit',em:['🦇'],c:'#a855f7',bn:{def:4,vel:3}}),
 I('Dragón Esmeralda',2,{col:'#065f46',pat:12,pc:'#34d399',acc:'horns',hc:'#22c55e',fx:'ember',c:'#34d399',em:['🐉'],bn:{reb:4,def:3}}),
 I('Rey Demonio',3,{col:'#0a0a0a',pat:8,pc:'#ff2d2d',acc:'horns',hc:'#ff1a1a',hb:1.45,fx:'ember',c:'#ff1a1a',em:['🔥','💀'],bg:'demon',bn:{mat:7,vel:3,def:3}}),
 I('Dios del Trueno',3,{col:'#1e3a8a',pat:9,pc:'#fde047',acc:'crown',fx:'bolt',c:'#fde047',bg:'storm',bn:{tir:7,vel:4,reg:3}}),
 I('Cósmico Galáctico',3,{col:'#1e1b4b',pat:11,pc:'#c084fc',acc:'halo',hc:'#c084fc',fx:'orbit',em:['⭐','🪐'],c:'#c084fc',bg:'cosmic',bn:{pas:6,reg:5,agu:3}}),
 I('Fénix Ardiente',3,{col:'#b45309',pat:8,pc:'#fde047',acc:'flames',fx:'ember',c:'#ffa500',em:['🔥'],bg:'phoenix',bn:{agu:7,vel:4,mat:3}}),
 I('Traje Dragón Carmesí',3,{slot:'z',lim:1,col:'#5b0a14',pat:12,pc:'#f5b82e',acc:'dwings',fx:'ember',c:'#ff6a1a',em:['🔥','🐉'],bg:'dragon',bn:{vel:6,mat:8,def:6,agu:7,reb:4},perk:'🔥 Tus mates explotan en llamas'}),
 // accesorios
 I('Gorro de Chef',0,{slot:'h',acc:'chef',bn:{pas:2}}),
 I('Sombrero Vaquero',0,{slot:'h',acc:'cowboy',bn:{tir:2}}),
 I('Orejas de Conejo',1,{slot:'h',acc:'bunny',bn:{vel:3}}),
 I('Corona Real',2,{slot:'h',acc:'crown',bn:{mat:3,pas:2}}),
 I('Halo Divino',2,{slot:'h',acc:'halo',hc:'#ffe27a',bn:{def:3,agu:2}}),
 I('Cuernos de Diablo',2,{slot:'h',acc:'horns',hc:'#ff3b2f',bn:{mat:4}}),
 I('Aureola de Fuego',3,{slot:'h',acc:'flames',fx:'ember',c:'#ffa500',bn:{tir:4,vel:2}}),
 I('Gafas de Sol',0,{slot:'f',acc:'shades',bn:{tir:2}}),
 I('Antifaz Dorado',1,{slot:'f',acc:'mask',bn:{reg:3}}),
 I('Visor Cyber',2,{slot:'f',acc:'visor',c:'#22d3ee',bn:{pas:4,tir:2}}),
 I('Capa Roja',1,{slot:'b',acc:'cape',cc:'#c1121f',bn:{vel:3}}),
 I('Mochila Cohete',2,{slot:'b',acc:'jet',fx:'spark',c:'#ffb347',bn:{vel:4,agu:3}}),
 I('Alas de Ángel',2,{slot:'b',acc:'awings',bn:{agu:4,def:3}}),
 I('Alas Nocturnas',3,{slot:'b',acc:'wings',fx:'orbit',em:['🦇'],c:'#a855f7',bn:{def:5,vel:4,mat:3}})];
window.OUTF=OUTF;
const OW=[55,28,13,4],ODUP=[60,150,400,1000],OLBL=['Común','Raro','Épico','Legendario'];
const SH={vel:'VEL',tir:'TIRO',mat:'MATE',reg:'MANEJO',def:'DEF',pas:'PASE',reb:'REB',agu:'AGUANTE'};
const OPACKS=[{n:'ROPA CALLEJERA',cost:150,cnt:1,min:0,b:0,e:'👕'},{n:'ROPA PLATA',cost:600,cnt:3,min:1,b:.2,e:'🧥'},{n:'ROPA ORO',cost:1400,cnt:4,min:1,b:.5,e:'🥋'},{n:'ROPA INFERNAL',cost:3200,cnt:4,min:2,b:1,e:'😈',pity:1}];
const oo=()=>save.oo||(save.oo={}),has=i=>!!oo()[i],os=()=>save.os||(save.os={});
const BACK=new Set(['wings','dwings','awings','cape','jet']),FACE=new Set(['shades','mask','visor','band']),WING=new Set(['wings','dwings','awings']);
function eq(){const E={j:null,z:null,h:null,f:null,b:null},g=i=>i!=null&&OUTF[i]&&has(i)?OUTF[i]:null;
 let o=g(save.of);if(o&&o.slot==='j')E.j=o;o=g(save.ob);if(o&&o.slot==='z')E.z=o;const s=os();for(const k of'hfb'){o=g(s[k]);if(o&&o.slot===k)E[k]=o}return E}
const any=E=>!!(E.j||E.z||E.h||E.f||E.b);
const jer=E=>E.z||E.j;
function items(E){const L=[E.j,E.z,E.h,E.f,E.b].filter(Boolean);
 const bk=E.b||E.z||(E.j&&BACK.has(E.j.acc)?E.j:null),hd=E.h||(E.j&&E.j.acc&&!BACK.has(E.j.acc)&&!FACE.has(E.j.acc)?E.j:null),fc=E.f||(E.j&&FACE.has(E.j.acc)?E.j:null);
 return{L,bk,hd,fc,fx:L.slice().reverse().find(o=>o.fx)||null}}
function perks(E){const t={};for(const o of items(E).L)for(const k in o.bn)t[k]=(t[k]||0)+o.bn[k];return t}
const perkTxt=(o,n)=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n||9).map(([k,v])=>`+${v} ${SH[k]}`).join(' ');
const hex2=(c,a)=>c+('0'+Math.round(a*255).toString(16)).slice(-2);
// ---- estampados 8-12 ----
const _jp=window.jPat;
window.jPat=function(g,pat,pc,tor){if(!pat||pat<8)return _jp(g,pat,pc,tor);if(!pc)return;g.save();g.clip();g.fillStyle=pc;g.strokeStyle=pc;const P=new Path2D();
 if(tor){switch(pat){
  case 8:for(let x=-20;x<20;x+=10){P.moveTo(x,4);P.quadraticCurveTo(x+1,-10,x+5,-24);P.quadraticCurveTo(x+9,-10,x+10,4)}g.fill(P);break;
  case 9:P.moveTo(-5,-44);P.lineTo(6,-28);P.lineTo(-4,-24);P.lineTo(7,-4);g.lineWidth=5;g.stroke(P);break;
  case 10:for(let y=-38;y<2;y+=11)for(let x=-14+(((y+38)/11|0)&1)*5;x<18;x+=10){P.moveTo(x+2.4,y);P.arc(x,y,2.4,0,7)}g.fill(P);break;
  case 11:P.moveTo(-20,-46);P.lineTo(20,-46);P.lineTo(-20,4);P.closePath();g.fill(P);break;
  case 12:g.lineWidth=1.8;for(let y=-40;y<6;y+=9)for(let x=-20+(((y+40)/9|0)&1)*6;x<22;x+=12){P.moveTo(x+6,y);P.arc(x,y,6,0,Math.PI)}g.stroke(P);break}}
 else{g.fillRect(-16,12,32,4);g.fillRect(-16,-4,4,6)}g.restore()};
// ---- accesorios ----
function wingShape(g,u,f,P,s){const fl=Math.sin(f*.12)*10;g.save();g.scale(s*u,u);g.shadowColor=P.glow;g.shadowBlur=14*u;const gr=g.createLinearGradient(10,50,90,-10);gr.addColorStop(0,P.a);gr.addColorStop(.55,P.b);gr.addColorStop(1,P.c);g.fillStyle=gr;g.strokeStyle=P.o;g.lineWidth=2.2;g.beginPath();g.moveTo(11,44);g.quadraticCurveTo(30,14+fl*.5,50,4+fl);g.quadraticCurveTo(70,-10+fl*1.2,92,-20+fl*1.5);g.quadraticCurveTo(88,6+fl,80,24+fl*.8);g.quadraticCurveTo(76,20+fl*.7,70,38+fl*.5);g.quadraticCurveTo(62,32+fl*.4,56,50+fl*.2);g.quadraticCurveTo(46,44+fl*.1,38,62);g.quadraticCurveTo(26,58,14,66);g.closePath();g.fill();g.stroke();g.shadowBlur=0;g.strokeStyle=P.k;g.lineWidth=1.8;g.beginPath();g.moveTo(50,4+fl);g.lineTo(80,24+fl*.8);g.moveTo(50,4+fl);g.lineTo(56,50+fl*.2);g.moveTo(50,4+fl);g.lineTo(38,62);g.moveTo(14,48);g.lineTo(50,4+fl);g.stroke();g.fillStyle=P.k;g.beginPath();g.moveTo(92,-20+fl*1.5);g.lineTo(100,-30+fl*1.6);g.lineTo(94,-14+fl*1.4);g.fill();g.restore()}
const PAL={dw:{a:'#4a0612',b:'#c4161c',c:'#ff9a2e',o:'#1c0308',k:'#ffd27a',glow:'#ff6a1a'},aw:{a:'#cfd8e8',b:'#ffffff',c:'#fff3b0',o:'#7a8aa8',k:'#ffe27a',glow:'#fff3b0'},bw:{a:'#1e0a4a',b:'#5b1fb0',c:'#9b4dff',o:'#0d0420',k:'#dc2626',glow:'#a855f7'}};
const ACC={
 horns(g,u,f,o){const c=o.hc||'#e11d2e',b=o.hb||1;for(const s of[-1,1]){g.save();g.scale(s*u*b,u*b);const gr=g.createLinearGradient(8,6,22,-30);gr.addColorStop(0,'#2a0505');gr.addColorStop(1,c);g.fillStyle=gr;g.strokeStyle='#150303';g.lineWidth=2;g.beginPath();g.moveTo(6,5);g.quadraticCurveTo(7,-14,24,-32);g.quadraticCurveTo(21,-10,15,7);g.closePath();g.fill();g.stroke();g.restore()}},
 halo(g,u,f,o){const c=o.hc||'#ffe27a',y=-17*u+Math.sin(f*.08)*2*u;g.save();g.globalCompositeOperation='lighter';g.shadowColor=c;g.shadowBlur=18*u;g.strokeStyle=c;g.lineWidth=4.5*u;g.beginPath();g.ellipse(0,y,18*u,5.5*u,0,0,7);g.stroke();g.strokeStyle='#fff';g.lineWidth=1.6*u;g.stroke();g.restore()},
 crown(g,u){g.save();g.scale(u,u);const gr=g.createLinearGradient(0,-20,0,5);gr.addColorStop(0,'#fff3a0');gr.addColorStop(1,'#d89a0b');g.fillStyle=gr;g.strokeStyle='#5a3a00';g.lineWidth=2;g.beginPath();g.moveTo(-17,5);g.lineTo(-18,-14);g.lineTo(-9,-5);g.lineTo(0,-21);g.lineTo(9,-5);g.lineTo(18,-14);g.lineTo(17,5);g.closePath();g.fill();g.stroke();for(const[x,c]of[[-11,'#ef4444'],[0,'#38bdf8'],[11,'#ef4444']]){g.fillStyle=c;g.beginPath();g.arc(x,-2,2.6,0,7);g.fill()}g.restore()},
 ears(g,u){for(const s of[-1,1]){g.save();g.scale(s*u,u);g.fillStyle='#ec4899';g.strokeStyle='#1a1020';g.lineWidth=2;g.beginPath();g.moveTo(5,3);g.lineTo(10,-20);g.lineTo(21,-3);g.closePath();g.fill();g.stroke();g.fillStyle='#ffc1e3';g.beginPath();g.moveTo(9,-2);g.lineTo(11,-13);g.lineTo(16,-4);g.closePath();g.fill();g.restore()}},
 ant(g,u,f){g.save();g.scale(u,u);g.strokeStyle='#cbd5e1';g.lineWidth=2.4;g.beginPath();g.moveTo(0,2);g.lineTo(0,-22);g.stroke();const on=(f>>4)&1;g.fillStyle=on?'#22d3ee':'#0e7490';g.shadowColor='#22d3ee';g.shadowBlur=on?12:2;g.beginPath();g.arc(0,-26,5,0,7);g.fill();g.restore()},
 band(g,u,f,o,fc){fc=fc||1;g.save();g.scale(u,u);g.fillStyle=o.c||'#ef4444';g.strokeStyle='#1a1020';g.lineWidth=1.6;g.fillRect(-17,12,34,6);g.strokeRect(-17,12,34,6);const w=Math.sin(f*.2)*4;g.beginPath();g.moveTo(-fc*17,14);g.quadraticCurveTo(-fc*(28+w),10+w,-fc*(38+w),19+w*.5);g.lineTo(-fc*30,21);g.quadraticCurveTo(-fc*22,18,-fc*17,18);g.closePath();g.fill();g.stroke();g.restore()},
 flames(g,u,f){g.save();g.globalCompositeOperation='lighter';g.scale(u,u);for(let i=-2;i<=2;i++){const h=18+9*Math.sin(f*.3+i*1.7)+(2-Math.abs(i))*5;const gr=g.createLinearGradient(0,4,0,-h);gr.addColorStop(0,'#ff3b00');gr.addColorStop(.6,'#ffb100');gr.addColorStop(1,'#fff6a0');g.fillStyle=gr;g.beginPath();g.moveTo(i*8-6,4);g.quadraticCurveTo(i*8-5,-h*.5,i*8+Math.sin(f*.25+i)*3,-h);g.quadraticCurveTo(i*8+5,-h*.5,i*8+6,4);g.closePath();g.fill()}g.restore()},
 chef(g,u){g.save();g.scale(u,u);g.fillStyle='#fff';g.strokeStyle='#8a8fa0';g.lineWidth=2;for(const[x,y,r]of[[-11,-12,10],[11,-12,10],[0,-19,11]]){g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke()}g.fillRect(-15,-4,30,10);g.strokeRect(-15,-4,30,10);g.restore()},
 cowboy(g,u){g.save();g.scale(u,u);g.fillStyle='#8b5a2b';g.strokeStyle='#2a1608';g.lineWidth=2;g.beginPath();g.ellipse(0,3,33,8,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(-14,3);g.quadraticCurveTo(-15,-18,-6,-17);g.quadraticCurveTo(0,-11,6,-17);g.quadraticCurveTo(15,-18,14,3);g.closePath();g.fill();g.stroke();g.fillStyle='#3b210d';g.fillRect(-14,-3,28,5);g.restore()},
 bunny(g,u,f){for(const s of[-1,1]){g.save();g.scale(s*u,u);g.rotate(Math.sin(f*.1+s)*.06);g.fillStyle='#f4f4f8';g.strokeStyle='#8a8fa0';g.lineWidth=2;g.beginPath();g.ellipse(10,-22,6,19,.12,0,7);g.fill();g.stroke();g.fillStyle='#ffb3d1';g.beginPath();g.ellipse(10,-21,2.8,13,.12,0,7);g.fill();g.restore()}},
 shades(g,u){g.save();g.scale(u,u);g.fillStyle='#0b0b12';g.strokeStyle='#000';g.lineWidth=1.5;for(const s of[-1,1]){g.beginPath();g.roundRect(s>0?3:-19,18,16,10,3);g.fill()}g.fillRect(-4,20,8,2.4);g.fillStyle='#ffffff66';g.fillRect(5,20,5,2);g.fillRect(-17,20,5,2);g.restore()},
 mask(g,u){g.save();g.scale(u,u);g.fillStyle='#e8b923';g.strokeStyle='#5a3a00';g.lineWidth=1.8;g.beginPath();g.moveTo(-21,17);g.quadraticCurveTo(0,13,21,17);g.lineTo(19,29);g.quadraticCurveTo(10,31,4,26);g.lineTo(-4,26);g.quadraticCurveTo(-10,31,-19,29);g.closePath();g.fill();g.stroke();g.fillStyle='#0b0b12';for(const s of[-1,1]){g.beginPath();g.ellipse(s*10,23,5,3.2,0,0,7);g.fill()}g.restore()},
 visor(g,u,f,o){g.save();g.scale(u,u);g.fillStyle='#0b1220';g.strokeStyle='#22d3ee';g.shadowColor='#22d3ee';g.shadowBlur=10;g.lineWidth=2;g.beginPath();g.roundRect(-21,17,42,12,5);g.fill();g.stroke();g.fillStyle='#22d3ee';const x=((f*1.4)%50)-25;g.fillRect(Math.max(-19,x),21,8,4);g.restore()},
 cape(g,u,f,o){g.save();g.scale(u,u);const w=Math.sin(f*.1)*5,c=o.cc||'#c1121f',gr=g.createLinearGradient(0,0,0,100);gr.addColorStop(0,c);gr.addColorStop(1,'#4a0510');g.fillStyle=gr;g.strokeStyle='#1a0308';g.lineWidth=2;g.beginPath();g.moveTo(-15,2);g.lineTo(15,2);g.quadraticCurveTo(28+w,50,24+w*1.5,98);g.quadraticCurveTo(10,92+w,0,98);g.quadraticCurveTo(-10,92-w,-24+w*1.5,98);g.quadraticCurveTo(-28+w,50,-15,2);g.closePath();g.fill();g.stroke();g.strokeStyle='#f5c542';g.lineWidth=2.4;g.beginPath();g.moveTo(-24+w*1.5,98);g.quadraticCurveTo(-10,92-w,0,98);g.quadraticCurveTo(10,92+w,24+w*1.5,98);g.stroke();g.restore()},
 jet(g,u,f){g.save();g.scale(u,u);for(const s of[-1,1]){g.fillStyle='#8a94a6';g.strokeStyle='#1a1f2b';g.lineWidth=2;g.beginPath();g.roundRect(s*11-6,4,12,40,5);g.fill();g.stroke();g.fillStyle='#d1342c';g.fillRect(s*11-6,14,12,5);
  g.save();g.globalCompositeOperation='lighter';const h=22+Math.sin(f*.7+s)*7,gr=g.createLinearGradient(0,44,0,44+h);gr.addColorStop(0,'#fff6a0');gr.addColorStop(.5,'#ff9a1a');gr.addColorStop(1,'#ff3b0000');g.fillStyle=gr;g.beginPath();g.moveTo(s*11-5,44);g.lineTo(s*11+5,44);g.lineTo(s*11,44+h);g.fill();g.restore()}g.restore()},
 wings(g,u,f){wingShape(g,u,f,PAL.bw,-1);wingShape(g,u,f,PAL.bw,1)},
 dwings(g,u,f){wingShape(g,u,f,PAL.dw,-1);wingShape(g,u,f,PAL.dw,1)},
 awings(g,u,f){wingShape(g,u,f,PAL.aw,-1);wingShape(g,u,f,PAL.aw,1)}};
const sr=(i,f)=>{const x=Math.sin(i*127.1+f*311.7)*43758.5453;return x-Math.floor(x)};
function auraFx(g,o,x,yb,H,u,f,rr){const c=o.c||'#fff';g.save();g.globalCompositeOperation='lighter';
 if(o.r>=2||o.lim){const gr=g.createRadialGradient(x,yb,2,x,yb,62*u);gr.addColorStop(0,hex2(c,.5+.15*Math.sin(f*.2)));gr.addColorStop(1,hex2(c,0));g.fillStyle=gr;g.beginPath();g.ellipse(x,yb,62*u,17*u,0,0,7);g.fill()}
 if(o.fx==='ember'){for(let i=0;i<10;i++){const k=((f*.9+i*29)%70)/70,px=x+Math.sin(i*5+k*6)*30*u,py=yb-k*H*1.02,r=(1-k)*4.2*u+1;g.fillStyle=hex2(i%2?c:'#ffd27a',1-k);g.beginPath();g.arc(px,py,r,0,7);g.fill()}
  if(o.em){g.globalCompositeOperation='source-over';g.font=Math.round(17*u)+'px sans-serif';g.textAlign='center';for(let i=0;i<3;i++){const k=((f*.6+i*40)%120)/120;g.globalAlpha=1-k;g.fillText(o.em[i%o.em.length],x+Math.sin(i*2+k*5)*26*u,yb-H*.1-k*H*.9)}}}
 else if(o.fx==='spark'){for(let i=0;i<8;i++){const a=f*.03+i*.9,px=x+Math.cos(a*1.3+i)*38*u,py=yb-H*(.08+.9*((i*.137+f*.004)%1)),s=(2.5+4*Math.abs(Math.sin(f*.12+i)))*u;g.strokeStyle=hex2(i%2?c:'#ffffff',.9);g.lineWidth=1.6*u;g.beginPath();g.moveTo(px-s,py);g.lineTo(px+s,py);g.moveTo(px,py-s);g.lineTo(px,py+s);g.stroke()}}
 else if(o.fx==='orbit'){g.globalCompositeOperation='source-over';g.font=Math.round(20*u)+'px sans-serif';g.textAlign='center';const n=(o.em?o.em.length:1)*2;for(let i=0;i<n;i++){const a=f*.05+i*Math.PI*2/n;g.globalAlpha=.55+.45*Math.sin(a+1.57);g.fillText(o.em?o.em[i%o.em.length]:'✦',x+Math.cos(a)*H*.36,yb-H*.5+Math.sin(a)*H*.1)}
  g.globalCompositeOperation='lighter';g.globalAlpha=1;for(let i=0;i<6;i++){const k=((f*.7+i*23)%80)/80;g.fillStyle=hex2(c,1-k);g.beginPath();g.arc(x+Math.sin(i*3+k*4)*26*u,yb-k*H,(1-k)*3.5*u+.8,0,7);g.fill()}}
 else if(o.fx==='bolt'){const s0=f>>2;for(let b=0;b<2;b++){let px=x+(sr(b,s0)-.5)*60*u,py=yb-H*(.2+sr(b+9,s0)*.5);g.strokeStyle=hex2(c,.9);g.lineWidth=3*u;g.shadowColor=c;g.shadowBlur=14*u;g.beginPath();g.moveTo(px,py);for(let k=1;k<6;k++){px+=(sr(b*7+k,s0)-.5)*30*u;py+=14*u*(sr(k,s0+b)+.3);g.lineTo(px,py)}g.stroke();g.strokeStyle='#fff';g.lineWidth=1*u;g.stroke()}}
 g.restore()}
// atrás (alas, capa, mochila) — se dibuja ANTES del jugador, a la altura de los hombros
function backDraw(g,E,x,yf,sc,hh,f,fc){const it=items(E).bk;if(!it||!ACC[it.acc])return;const H=210*sc*hh,u=sc*hh/.85*.9,sh=yf-H*.98+44*u;g.save();g.translate(x-fc*4*u,WING.has(it.acc)?yf-H*.98+88*u:sh);if(WING.has(it.acc)){g.scale(.74,.56);g.translate(0,-44*u)}else if(it.acc==='cape'||it.acc==='jet')g.translate(0,0);ACC[it.acc](g,u,f,it,fc);g.restore()}
// delante (cabeza, cara, aura, joyas del traje)
function frontDraw(g,E,x,yf,sc,hh,f,fc){const H=210*sc*hh,u=sc*hh/.85*.9,yh=yf-H*.98,I=items(E);if(I.fx)auraFx(g,I.fx,x,yf,H,sc/.85,f);
 for(const it of[I.hd,I.fc]){if(!it||!ACC[it.acc])continue;g.save();g.translate(x,yh);ACC[it.acc](g,u,f,it,fc);g.restore()}
 if(E.z){const cy=yf-H*.6,pu=.7+.3*Math.sin(f*.15);g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,cy,1,x,cy,16*u);gr.addColorStop(0,'#fff6b0');gr.addColorStop(.4,hex2('#ff9a1a',pu));gr.addColorStop(1,'#ff3b0000');g.fillStyle=gr;g.beginPath();g.arc(x,cy,16*u,0,7);g.fill();g.restore();
  g.save();g.fillStyle='#d99a1f';g.strokeStyle='#3a1a00';g.lineWidth=1.6;for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*10*u,yf-H*.78);g.lineTo(x+s*22*u,yf-H*.86);g.lineTo(x+s*20*u,yf-H*.72);g.closePath();g.fill();g.stroke()}g.restore()}}
// ---- enganche en los dibujos de jugador ----
const MINE='#detail,#vL,#wmod,#gpk,#pf-body,#barrio',PX={drawFig:{x:2,y:3,sc:4,fl:5,col:6,hid:7},drawRigFig:{x:1,y:2,sc:3,fl:4,col:5,hid:6,o:7}};
let depth=0;const fr=()=>typeof G!=='undefined'&&G?G.fr:(typeof pf!=='undefined'?pf:0);
const _fo=window.frameOf;window.frameOf=function(p){window.__BP=p;return _fo.apply(this,arguments)};
for(const n of['drawFig','drawRigFig']){const _f=window[n],ix=PX[n];window[n]=function(){const a=Array.prototype.slice.call(arguments);let E=null,mine=0;
 if(depth===0){const p=window.__BP;if(p&&p.E)E=p.E;else if(!p){const cv=a[0]&&a[0].canvas;if(cv&&cv.closest&&cv.closest(MINE)){const e=eq();if(any(e)){E=e;mine=1}}}}
 const hid=a[ix.hid];if(E&&CH[hid]){const hh=CH[hid].h||1,f=fr();try{
  if(mine){const j=jer(E);if(j){a[ix.col]=j.col;if(ix.o)a[ix.o]=Object.assign({},a[ix.o],{pat:j.pat,pc:j.pc})}}
  backDraw(a[0],E,a[ix.x],a[ix.y],a[ix.sc],hh,f,a[ix.fl]||1)}catch(e){}}
 depth++;try{return _f.apply(this,a)}finally{if(--depth===0){window.__BP=null;if(mine&&E)try{frontDraw(a[0],E,a[ix.x],a[ix.y],a[ix.sc],CH[hid].h||1,fr(),a[ix.fl]||1)}catch(e){}}}}}
const _ov=MV.over;
MV.over=function(g,p,sc){_ov.apply(this,arguments);try{const E=p.E;if(!E||!G||G.mode==='end')return;const hh=CH[p.hdo||p.id].h||1;if(p.st==='fall'){const I=items(E);if(I.fx)auraFx(g,I.fx,p.x,p.y-p.z,60,sc/.85,G.fr);return}frontDraw(g,E,p.x,p.y-p.z,sc,hh,G.fr,p.f||1)}catch(e){}};
// ---- partido: color, estampado y VENTAJAS ----
const _mk=window.mkP;
window.mkP=function(t){const p=_mk.apply(this,arguments);try{if(t===0){const E=eq();if(any(E)){p.E=E;const j=jer(E);if(j){p.col=j.col;p.pat=j.pat;p.pc=j.pc}const b=perks(E);for(const k in b)if(p.s[k]!=null)p.s[k]=Math.min(99,p.s[k]+b[k]);if(b.vel)p.spd+=b.vel*.04*(CH[p.id].pw==='TITÁN'?.82:1)}}}catch(e){}return p};
const _rc=window.rivalColor;
window.rivalColor=function(own,pref){try{const j=jer(eq());if(j&&own===CH[save.sel].jc)own=j.col}catch(e){}return _rc.call(this,own,pref)};
const _mt=MV.tick;
MV.tick=function(p){_mt.apply(this,arguments);try{if(p.E&&p.E.z&&p.st==='dunk'&&p.tt-p.dk0===22){const h=hoopOf(p);FX.shock(h.x,h.y,'#ff6a1a',340,30);G.shake=Math.max(G.shake,14);burst(h.x,h.y-150,'#ff6a1a',26,12);burst(h.x,h.y-150,'#ffd27a',14,8);pop(p.x,p.y-330,'¡MATE EN LLAMAS!','#ff8a3d',34)}}catch(e){}};
// ---- cartas con fondo animado ----
const _chm=window.cardHTML;
window.cardHTML=function(id){let h=_chm.apply(this,arguments);h=h.replace('<div class="pcard"','<div data-rk="'+CH[id].rar+'" class="pcard"');const k=h.indexOf('>',h.indexOf('class="pcard"'))+1;return h.slice(0,k)+'<div class="cbg"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>'+h.slice(k)};
setInterval(()=>{try{const E=eq(),bg=(E.z||E.j||{}).bg||'';if(document.body.dataset.bg!==bg){if(bg)document.body.dataset.bg=bg;else delete document.body.dataset.bg}}catch(e){}},600);
// ---- iconos ----
const icoC={};
function icon(i){if(icoC[i])return icoC[i];const o=OUTF[i],cv=document.createElement('canvas');cv.width=100;cv.height=120;const g=cv.getContext('2d'),col=o.col||'#334155';
 if(o.acc&&BACK.has(o.acc)){g.save();g.translate(50,58);if(WING.has(o.acc)){g.scale(1,.8);g.translate(0,-25)}ACC[o.acc](g,.55,6,o,1);g.restore()}
 g.save();g.translate(50,116);g.scale(1.5,1.5);g.beginPath();g.moveTo(-14,2);g.lineTo(14,2);g.lineTo(17,-38);g.quadraticCurveTo(0,-45,-17,-38);g.closePath();g.fillStyle=col;g.fill();window.jPat(g,o.pat||0,o.pc,1);g.lineWidth=1.8;g.strokeStyle='#1a1020';g.stroke();g.restore();
 g.fillStyle='#e8b48a';g.strokeStyle='#1a1020';g.lineWidth=2;g.beginPath();g.arc(50,40,15,0,7);g.fill();g.stroke();g.fillStyle='#1a1020';g.fillRect(44,40,3,4);g.fillRect(54,40,3,4);
 if(o.acc&&!BACK.has(o.acc)){g.save();g.translate(50,25);ACC[o.acc](g,.78,20,o,1);g.restore()}
 return icoC[i]=cv.toDataURL()}
// ---- UI ----
const CAT=[['j','👕 CAMISETAS'],['z','🐲 TRAJE LIMITADO'],['h','🎩 CABEZA'],['f','🕶 CARA'],['b','🪽 ESPALDA']];
const limOn=()=>Date.now()<LIM_END;
const limTxt=()=>{const ms=LIM_END-Date.now();if(ms<=0)return'TERMINADO';const d=ms/864e5|0,h=(ms%864e5)/36e5|0;return`⏳ ${d}d ${h}h`};
function slotsHTML(){const E=eq(),none=!any(E);let h=`<div class="wgrid"><div class="osl orig${none?' eq':''}" data-s="-1"><div class="oi">🏀</div><b>Original</b><small>Quitar todo</small></div></div>`;
 for(const[sl,lb]of CAT){const L=OUTF.map((o,i)=>[o,i]).filter(([o])=>o.slot===sl);h+=`<div class="glt2">${lb}</div><div class="wgrid">${L.map(([o,i])=>{const hv=has(i),on=hv&&E[sl]===o;return`<div class="osl${hv?'':' off'}${on?' eq':''}${o.lim?' lim':''}" data-s="${i}" style="--rc:${RC(Math.min(o.r,3))}"><img src="${icon(i)}"><b>${hv?o.n:'???'}</b><small>${OLBL[o.r]}${o.fx||o.acc&&!o.col?' ✨':''}</small>${hv?`<small class="pk">${perkTxt(o.bn||{},2)}</small>`:''}${hv&&oo()[i]>1?`<i>x${oo()[i]}</i>`:''}${on?'<em>PUESTO</em>':''}${o.lim?'<u class="lm">LIMITADO</u>':''}</div>`}).join('')}</div>`}
 return h}
function equip(i){if(i<0){save.of=null;save.ob=null;save.os={}}else{const o=OUTF[i];if(!has(i)){sfx('buzz');return false}if(o.slot==='j')save.of=save.of===i?null:i;else if(o.slot==='z')save.ob=save.ob===i?null:i;else{const s=os();s[o.slot]=s[o.slot]===i?null:i}}store();sfx('card');return true}
function bindSlots(root,again){root.querySelectorAll('.osl').forEach(e=>e.onclick=()=>{if(equip(+e.dataset.s))again()})}
function infoHTML(){const E=eq(),I=items(E),nm=I.L.map(o=>o.n),pk=perks(E);return`<b>${nm.length?nm[0]+(nm.length>1?' +'+(nm.length-1):''):'Equipación original'}</b><small>${nm.length?nm.join(' · '):'Toca una prenda para ponértela'}</small><small class="pkl">${Object.keys(pk).length?'⚡ VENTAJAS: '+perkTxt(pk):'⚡ Sin ventajas (equípate ropa legendaria o el traje)'}</small>${E.z&&E.z.perk?`<small class="pkl">${E.z.perk}</small>`:''}<small>Se aplica a todo tu equipo en los partidos</small>`}
const tabs=SB.tabs;
let oq=0;
function opCard(i,p){const ok=save.coins>=p.cost,o=OW.map((w,k)=>k<p.min?0:w*(k===0?1-p.b:1+p.b*k*1.5)),T=o.reduce((a,c)=>a+c,0),pc=PKC[i];
 return`<button class="pk2${ok?'':' dis'}" data-o="${i}" style="--pc:${pc[0]};--pg:${pc[1]}"><div class="p2art"><span>${p.e}</span><i class="sh"></i><em></em></div><b>${p.n}</b><small>${p.cnt} prenda${p.cnt>1?'s':''}${p.min?' · mín. '+OLBL[p.min]:''}</small>${obar(o.map(w=>w/T*100))}<div class="p2od">${odl(o.map(w=>w/T*100))}</div><div class="p2pr">${p.cost} 🪙</div></button>`}
const limCard=()=>`<button class="pk2 limp${save.coins>=6500?'':' dis'}" data-o="L" style="--pc:#ff6a1a;--pg:rgba(255,106,26,.6)"><div class="p2art"><span>🐲</span><i class="sh"></i><em></em></div><b>SOBRE DRAGÓN</b><small>LIMITADO · ${limTxt()}</small><div class="p2od"><u style="--c:#ff9a2e">3 prendas · mín. Raro</u><u style="--c:#ff6a1a">16% TRAJE por carta</u></div><div class="p2od"><u style="--c:#ffd27a">¡Traje seguro cada 5!</u></div>${pityBar(save.lpity||0,5,'','gold')}<div class="p2pr">6500 🪙</div></button>`;
window.renderOutfits=function(){gTab='o';const n=Object.keys(oo()).length;
 $('#gpk').innerHTML=tabs('o')+`<div class="wr"><canvas id="wrc" width="200" height="230"></canvas><div class="wri">${infoHTML()}${pityBar(save.opity||0,5,'😈 ROPA INFERNAL: ¡cada 5 sobres = ROPA LEGENDARIA!','gold')}<small class="wrc">👕 ${n}/${OUTF.length} prendas</small></div></div>
 <div class="pkrow">${limOn()?limCard():''}${OPACKS.map((p,i)=>opCard(i,p)).join('')}</div>${slotsHTML()}`;
 $$('#gpk .pk2[data-o]').forEach(b=>b.onclick=()=>b.dataset.o==='L'?openPack(-1):openPack(+b.dataset.o));$$('#gpk .gtabs button').forEach(b=>b.onclick=()=>{b.dataset.t==='o'?renderOutfits():renderPacks()});bindSlots($('#gpk'),renderOutfits)};
let wf=0;setInterval(()=>{wf++;for(const[sel,hid]of[['#wrc',()=>save.sel],['#wrc2',()=>window.tSel!=null&&save.owned[tSel]?tSel:save.sel]]){const c=$(sel);if(!c||!c.offsetParent)continue;const g=c.getContext('2d'),id=hid();g.clearRect(0,0,200,230);try{drawRigFig(g,100,215,.8,1,CH[id].jc,id,{mv:false,gait:0,cy:0,an:wf,ball:false,pat:patOf(CH[id].jc),pc:pcOf(CH[id].jc)})}catch(e){}}},60);
function rollOutfit(minR,b){const W=OW.map((w,i)=>i<minR?0:w*(i===0?1-b:1+b*i*1.5)),T=W.reduce((a,c)=>a+c,0);let x=rnd()*T,ri=0;for(let i=0;i<W.length;i++){if(x<W[i]){ri=i;break}x-=W[i]}return pick(OUTF.map((o,i)=>o.r===ri&&!o.lim?i:-1).filter(i=>i>=0))}
const suitId=OUTF.findIndex(o=>o.lim);
function openPack(i){const lim=i<0,pk=lim?{n:'SOBRE DRAGÓN',cost:6500,cnt:3,min:1,b:.4}:OPACKS[i];if(lim&&!limOn()){tip('El Sobre Dragón ya terminó');return}if(save.coins<pk.cost){sfx('buzz');tip('Faltan monedas 😢');return}save.coins-=pk.cost;let ids=[],lg=false;
 if(!lim&&pk.pity){save.opity=(save.opity||0)+1;if(save.opity>=5){save.opity=0;lg=true}}
 if(lim){save.lpity=(save.lpity||0)+1}
 for(let k=0;k<pk.cnt;k++)ids.push(lim&&rnd()<.16?suitId:rollOutfit(k===pk.cnt-1?pk.min:0,pk.b));
 if(lim&&save.lpity>=5){save.lpity=0;ids[ids.length-1]=suitId}
 if(lg&&!ids.some(x=>OUTF[x].r===3))ids[ids.length-1]=pick(OUTF.map((o,x)=>o.r===3&&!o.lim?x:-1).filter(x=>x>=0));
 ids.sort((a,b)=>OUTF[a].r-OUTF[b].r||(OUTF[a].lim?1:0)-(OUTF[b].lim?1:0));
 const res=ids.map(id=>{const had=oo()[id]||0;oo()[id]=had+1;let coins=0;if(had>0){coins=OUTF[id].lim?2000:ODUP[OUTF[id].r];save.coins+=coins}return{id,nw:had===0,coins}});
 store();const top=Math.max(...ids.map(x=>OUTF[x].r));sfx(top>=3?'legend':'card');
 $('#hatres').innerHTML=`<div class="hrt">👕 ¡TU ROPA NUEVA!</div><div class="hrg">${res.map(r=>{const o=OUTF[r.id];return`<div class="hc oc${o.lim?' lim':''}" data-e="${r.id}" style="--rc:${RC(Math.min(o.r,3))};animation-delay:${res.indexOf(r)*.15}s"><img src="${icon(r.id)}" width="74" height="89"><b>${o.n}</b><small>${OLBL[o.r]}${o.lim?' · LIMITADO':''}</small><small>${perkTxt(o.bn||{},2)}</small><span>${r.nw?'¡NUEVO!':'+'+r.coins+'🪙'}</span><u>TOCA = PONÉRTELO</u></div>`}).join('')}</div><button class="btn main" id="hr-ok">OK</button>`;
 $('#hatres').classList.remove('hidden');if(top>=2)confetti(RC(top),top>=3?50:20);
 $$('#hatres .oc').forEach(e=>e.onclick=()=>{equip(+e.dataset.e);$$('#hatres .oc').forEach(x=>x.classList.remove('worn'));e.classList.add('worn')});
 $('#hr-ok').onclick=()=>{$('#hatres').classList.add('hidden');renderOutfits()}}
// ---- armario desde EQUIPO (debajo del jugador) ----
function openWardrobe(){let m=$('#wmod');if(!m){m=document.createElement('div');m.id='wmod';document.body.appendChild(m)}
 const draw=()=>{m.innerHTML=`<div class="wbox"><div class="wh"><b>👕 ROPA Y TRAJES</b><button class="btn small" id="wm-x">✕ CERRAR</button></div><div class="wr"><canvas id="wrc2" width="200" height="230"></canvas><div class="wri">${infoHTML()}</div></div>${slotsHTML()}</div>`;$('#wm-x').onclick=()=>{m.className='';renderTeamSafe()};bindSlots(m,draw)};draw();m.className='on'}
const renderTeamSafe=()=>{try{renderTeam()}catch(e){}};
const _rt=window.renderTeam;
window.renderTeam=function(){_rt.apply(this,arguments);try{const d=$('#detail .dbtns');if(d&&!$('#d-wr')){d.insertAdjacentHTML('beforeend','<button class="btn" id="d-wr">👕 ROPA Y TRAJES</button>');$('#d-wr').onclick=openWardrobe}
 const E=eq(),pk=perks(E);if(any(E)&&Object.keys(pk).length&&!$('#detail .perk'))$('#detail').insertAdjacentHTML('beforeend',`<div class="perk">⚡ ${perkTxt(pk)}</div>`)}catch(e){}};
const _rp=window.renderProfile;
window.renderProfile=function(){_rp.apply(this,arguments);try{const s=save.owned[save.sel];if(s){$('#pf-body').insertAdjacentHTML('afterbegin',`<div class="pflook">${cardHTML(save.sel,s)}</div>`);mountPreviews($('#pf-body'))}}catch(e){}};
function eqOf(a){const E={j:null,z:null,h:null,f:null,b:null};if(!a||typeof a!=='object')return E;['j','z','h','f','b'].forEach((k,i)=>{const id=+a[i],o=id>=0&&OUTF[id];if(o&&o.slot===k)E[k]=o});return E}
window.WARD={eq,eqOf,equip,openWardrobe,openPack,perks};
})();
