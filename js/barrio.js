// ===== BARRIO v2: mapa abierto 2D (vista 3/4) con 5 zonas, 8 edificios únicos, vecinos, retadores, misiones y monedas =====
(()=>{
const WW=4200,WH=3000,VH=640,SC=.5;
const BR=window.BARRIO={from:0};
const $q=s=>document.querySelector(s);
const go=f=>()=>{BR.from=1;stop();try{f()}catch(e){console.error('barrio',e);BR.from=0;open()}};
const ZONES=[
 {k:'res',n:'BARRIO RESIDENCIAL',e:'🏘',x:0,y:0,w:1425,h:1090,c:'#3f9a4f',lv:0},
 {k:'dep',n:'ZONA DEPORTIVA',e:'🏟',x:2775,y:0,w:1425,h:1090,c:'#3a8f55',lv:2},
 {k:'plz',n:'PLAZA CENTRAL',e:'⛲',x:1425,y:1090,w:1350,h:860,c:'#9a9fb0',lv:1},
 {k:'par',n:'PARQUE Y LAGO',e:'🌳',x:0,y:1950,w:1425,h:1050,c:'#2f8a48',lv:1},
 {k:'ali',n:'ZONA ALIEN',e:'👽',x:2775,y:1950,w:1425,h:1050,c:'#c9a66b',lv:2}];
const ROADS=[[0,1050,WW,120],[0,1950,WW,120],[1480,0,110,WH],[2720,0,110,WH]];
// edificios: x,y = centro del frente (base). st = estilo.
const B=[
 {k:'casa',st:'cabin',x:420,y:520,w:230,fh:120,rd:70,n:'MI CASA',e:'🏠',d:'Armario: ropa y traje',c:'#c47a3a',r:'#7a3b1c',stay:1,act:()=>WARD.openWardrobe()},
 {k:'v1',st:'mansion',x:800,y:540,w:300,fh:150,rd:70,n:'MANSIÓN',c:'#e8dcc2',r:'#6b2a2a',closed:1},
 {k:'v2',st:'modern',x:1160,y:520,w:240,fh:140,rd:60,n:'CASA MODERNA',c:'#8fb4d6',r:'#33506e',closed:1},
 {k:'v3',st:'house',x:480,y:900,w:230,fh:110,rd:60,n:'CASA AZUL',c:'#5d8bd6',r:'#a03a2a',closed:1},
 {k:'v4',st:'house',x:860,y:910,w:220,fh:110,rd:60,n:'CASA VERDE',c:'#79c27a',r:'#4a5568',closed:1},
 {k:'v5',st:'cafe',x:1200,y:920,w:240,fh:110,rd:60,n:'CAFÉ DEL BARRIO',e:'☕',d:'Bebidas con ventajas',c:'#d89a5a',r:'#5a2d12',stay:1,act:()=>shop('cafe')},
 {k:'tienda',st:'boutique',x:1860,y:1450,w:310,fh:150,rd:60,n:'TIENDA DE ROPA',e:'👕',d:'Sobres de ropa y accesorios',c:'#e0589a',r:'#7a1f52',act:()=>{gReset();show('#gacha');renderOutfits();store()}},
 {k:'cajero',st:'casino',x:2350,y:1450,w:310,fh:160,rd:60,n:'CAJERO DE SOBRES',e:'🎰',d:'Consigue jugadores',c:'#6a2fc8',r:'#2a0e66',act:()=>$('#b-gacha').onclick()},
 {k:'gym',st:'warehouse',x:3000,y:600,w:300,fh:140,rd:60,n:'GIMNASIO',e:'⭐',d:'Tu equipo: elige y mejora',c:'#4b5a72',r:'#2a3446',act:()=>$('#b-team').onclick()},
 {k:'pabellon',st:'dome',x:3500,y:620,w:440,fh:170,rd:50,n:'PABELLÓN 3 vs 3',e:'👥',d:'Arma tu equipo',c:'#2fb86e',r:'#0b5a34',act:()=>$('#b-3v3').onclick()},
 {k:'alien',st:'ufo',x:3400,y:2400,w:360,fh:150,rd:60,n:'ZONA ALIEN',e:'👽',d:'Evento: gana tickets',c:'#3fa83a',r:'#0d4a1a',act:()=>$('#b-event').onclick()},
 {k:'clanes',st:'castle',x:1100,y:2320,w:380,fh:170,rd:50,n:'SEDE DE CLANES',e:'🛡',d:'Únete y busca clanes',c:'#a8a8b8',r:'#6a130e',act:()=>$('#b-clan').onclick()},
 {k:'moto',st:'garage',x:1860,y:1900,w:310,fh:140,rd:60,n:'MOTOS Y COCHES',e:'🏍',d:'Patines, skate, moto, coche, platillo',c:'#e8762c',r:'#8a2a0e',stay:1,act:()=>shop('veh')},
 {k:'estela',st:'neon',x:2350,y:1900,w:310,fh:140,rd:60,n:'ESTELAS',e:'✨',d:'Deja un rastro espectacular',c:'#1d2a5c',r:'#0c1440',stay:1,act:()=>shop('tr')},
 {k:'burger',st:'burger',x:1250,y:2850,w:300,fh:120,rd:60,n:'BURGER DUNK',e:'🍔',d:'Comida con ventajas',c:'#f0b64a',r:'#b3261e',stay:1,act:()=>shop('burger')},
 {k:'arcade',st:'arcade',x:3950,y:600,w:260,fh:140,rd:60,n:'ARCADE',e:'🕹',d:'Tiro libre: gana monedas',c:'#3a1f7a',r:'#1a0c40',stay:1,act:()=>shop('arc')},
 {k:'emote',st:'emotes',x:3000,y:985,w:260,fh:130,rd:60,n:'EMOTES',e:'😎',d:'Gestos y animaciones brutales',c:'#ff5ca8',r:'#5a1650',stay:1,act:()=>shop('emo')},
 {k:'v6',st:'stadium',x:2100,y:2500,w:560,fh:190,rd:80,n:'ESTADIO VIEJO',c:'#b8b0a0',r:'#5a5448',closed:1}];
const COURT={x:3400,y:910,w:500,h:230};
const FOUNT={x:2100,y:1640,r:78},BOARD={x:2100,y:1290};
const LAKE={x:700,y:2640,rx:300,ry:150};
const CRASH={x:3000,y:2700};
const LINES={res:['¡Mi casa es la del tejado rojo!','Qué tranquilo está el barrio hoy.','Dicen que la mansión tiene una cancha secreta.'],plz:['¡Ese traje de dragón es de otro mundo!','El cajero da un legendario cada 10 sobres.','¿Has visto las alas de la tienda?'],dep:['Hoy hay partido en el pabellón.','El gimnasio mejora a tus jugadores.','Aquí solo se juega en serio.'],par:['Qué paz junto al lago…','La sede de clanes es un castillo de verdad.','Llevo horas pescando y nada.'],ali:['Vi una luz verde anoche…','No te acerques al platillo.','Los aliens dan tickets, ¡pero no se dejan ganar!']};
const MIS=[{t:'Recoge 6 monedas',k:'coins',n:6,r:120},{t:'Visita 3 edificios distintos',k:'vis',n:3,r:150},{t:'Habla con 3 vecinos',k:'talk',n:3,r:100},{t:'Juega 1 partida en el arcade',k:'arc',n:1,r:80},{t:'Compra algo en una tienda',k:'buy',n:1,r:100}];
const DU={out:null,inc:null,seen:{},going:0};let cv,g,raf=0,run=0,W0=0,H0=0,S=1,P,NP=[],COINS=[],TREES=[],keys={},joy={x:0,y:0},cx=0,cy=0,fr=0,near=null,bub=null,zone=null,zt=0,pat={},RECT=[];
const rng=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(1234);
const hour=()=>{const d=new Date();return d.getHours()+d.getMinutes()/60};
const night=()=>{const h=hour();return h>=21||h<6?1:h>=19?(h-19)/2:h<7?1-(h-6):0};
const zoneAt=(x,y)=>ZONES.find(z=>x>=z.x&&x<z.x+z.w&&y>=z.y&&y<z.y+z.h)||null;
const inRoad=(x,y,m=0)=>ROADS.some(r=>x>r[0]-m&&x<r[0]+r[2]+m&&y>r[1]-m&&y<r[1]+r[3]+m);
function bq(){const d=new Date().toDateString();if(!save.bq||save.bq.d!==d)save.bq={d,coins:0,vis:[],talk:[],claim:[0,0,0,0,0],cg:[],arc:0,buy:0};return save.bq}
function prog(i){const q=bq(),m=MIS[i];return Math.min(m.n,m.k==='coins'?q.coins:m.k==='vis'?q.vis.length:m.k==='talk'?q.talk.length:(q[m.k]||0))}
// ---- vehículos, estelas, comida, tiendas, arcade ----
const VEH=[{id:'patines',n:'Patines Turbo',e:'🛼',sp:1.45,p:150,c:'#ff4fa0'},{id:'skate',n:'Skate Rayo',e:'🛹',sp:1.7,p:300,c:'#2fd0ff'},{id:'bici',n:'BMX Cometa',e:'🚲',sp:1.95,p:550,c:'#7dff5a'},{id:'moto',n:'Moto Trueno',e:'🏍',sp:2.5,p:1200,c:'#ff3b2f'},{id:'coche',n:'Deportivo Fénix',e:'🚗',sp:3,p:2600,c:'#ffb020'},{id:'ovni',n:'Platillo Nova',e:'🛸',sp:3.6,p:5500,c:'#9b6bff',fly:1,d:'Vuela por encima de los árboles'}];
const VL={patines:6,skate:9,bici:14,moto:20,coche:26,ovni:34};
const TRAILS=[{id:'none',n:'Sin estela',e:'🚫',p:0},{id:'humo',n:'Humo',e:'💨',p:0},{id:'fuego',n:'Fuego',e:'🔥',p:250},{id:'arco',n:'Arcoíris',e:'🌈',p:450},{id:'estrella',n:'Estrellas',e:'⭐',p:700},{id:'rayo',n:'Rayos',e:'⚡',p:1000},{id:'galaxia',n:'Galaxia',e:'🌌',p:1600}];
const FOODS={cafe:[{id:'cafe',n:'Café Turbo',e:'☕',b:'spd',m:3,p:50,d:'+30% velocidad · 3 min'},{id:'batido',n:'Batido Imán',e:'🥤',b:'mag',m:4,p:70,d:'Atrae las monedas · 4 min'},{id:'tarta',n:'Tarta Doble',e:'🍰',b:'x2',m:4,p:120,d:'Monedas x2 · 4 min'}],burger:[{id:'burger',n:'Burger Dunk',e:'🍔',b:'spd',m:5,p:60,d:'+30% velocidad · 5 min'},{id:'pizza',n:'Pizza Dorada',e:'🍕',b:'x2',m:5,p:150,d:'Monedas x2 · 5 min'},{id:'combo',n:'Combo Leyenda',e:'🍟',b:'all',m:3,p:260,d:'Velocidad + imán + x2 · 3 min'}]};
const vs=()=>{const h=save.vh;return h&&h.sel&&h.own[h.sel]?VEH.find(v=>v.id===h.sel):null};
const buf=k=>(save.bf&&save.bf[k]||0)>Date.now();
function vh(){if(!save.vh)save.vh={own:{},sel:null,tr:{humo:1},st:'humo'};if(!save.vh.tr)save.vh.tr={humo:1};return save.vh}
function wheel(c,x,y,r,t){c.fillStyle='#1b1b22';c.beginPath();c.arc(x,y,r,0,7);c.fill();c.strokeStyle='#cfd4e0';c.lineWidth=2;c.beginPath();c.arc(x,y,r*.55,0,7);c.stroke();const a=t*.25;c.lineWidth=1.5;c.beginPath();c.moveTo(x+Math.cos(a)*r*.5,y+Math.sin(a)*r*.5);c.lineTo(x-Math.cos(a)*r*.5,y-Math.sin(a)*r*.5);c.stroke()}
function vUnder(c,id,x,y,f,t,mv){const v=VEH.find(q=>q.id===id),col=v.c,tt=mv?t:0;c.save();c.translate(x,y);c.scale(f,1);
 if(id==='patines'){for(const o of[-14,12]){c.fillStyle=col;c.beginPath();c.roundRect(o-12,-16,28,12,4);c.fill();for(const w of[-8,0,8])wheel(c,o+w+1,-4,4.5,tt)}}
 else if(id==='skate'){c.fillStyle=col;c.beginPath();c.roundRect(-38,-14,76,9,5);c.fill();c.fillStyle='rgba(255,255,255,.4)';c.fillRect(-30,-12,60,2);wheel(c,-26,-6,6,tt);wheel(c,26,-6,6,tt)}
 else if(id==='bici'){wheel(c,-34,-26,24,tt);wheel(c,34,-26,24,tt);c.strokeStyle=col;c.lineWidth=5;c.beginPath();c.moveTo(-34,-26);c.lineTo(-6,-56);c.lineTo(28,-52);c.lineTo(34,-26);c.moveTo(-6,-56);c.lineTo(8,-26);c.lineTo(-34,-26);c.moveTo(28,-52);c.lineTo(24,-72);c.lineTo(38,-74);c.stroke();c.fillStyle='#222';c.fillRect(-18,-62,22,6)}
 else if(id==='moto'){wheel(c,-40,-22,20,tt);wheel(c,42,-22,20,tt);c.fillStyle='#444';c.fillRect(-14,-40,30,18);c.fillStyle=col;c.beginPath();c.roundRect(-34,-58,64,24,10);c.fill();c.fillStyle='#222';c.fillRect(-22,-64,34,8);c.strokeStyle='#bfc6d4';c.lineWidth=5;c.beginPath();c.moveTo(42,-22);c.lineTo(36,-70);c.lineTo(50,-74);c.stroke()}
 else if(id==='ovni'){c.globalCompositeOperation='lighter';const gl=c.createRadialGradient(0,0,2,0,0,80);gl.addColorStop(0,'rgba(155,107,255,.6)');gl.addColorStop(1,'rgba(155,107,255,0)');c.fillStyle=gl;c.fillRect(-90,-40,180,80);c.globalCompositeOperation='source-over'}
 c.restore()}
function vOver(c,id,x,y,f,t,mv){const v=VEH.find(q=>q.id===id),col=v.c,tt=mv?t:0;c.save();c.translate(x,y);c.scale(f,1);
 if(id==='moto'){c.fillStyle=col;c.beginPath();c.roundRect(14,-62,34,26,9);c.fill();c.fillStyle='rgba(170,225,255,.7)';c.beginPath();c.moveTo(30,-62);c.lineTo(46,-84);c.lineTo(50,-62);c.fill();c.fillStyle='#fff6a0';c.fillRect(46,-50,6,7)}
 else if(id==='coche'){wheel(c,-48,-16,17,tt);wheel(c,48,-16,17,tt);c.fillStyle=col;c.beginPath();c.roundRect(-80,-46,160,34,12);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.fillRect(-70,-40,80,4);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-80,-22,160,6);c.fillStyle='rgba(170,225,255,.55)';c.beginPath();c.moveTo(8,-46);c.lineTo(30,-72);c.lineTo(40,-72);c.lineTo(40,-46);c.fill();c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.moveTo(8,-46);c.lineTo(30,-72);c.lineTo(40,-72);c.stroke();c.fillStyle='#fff6a0';c.fillRect(74,-38,8,9);c.fillStyle='#ff3030';c.fillRect(-82,-38,6,9)}
 else if(id==='ovni'){c.fillStyle='#aab6cc';c.beginPath();c.ellipse(0,-22,66,17,0,0,7);c.fill();c.fillStyle='#7d8aa2';c.beginPath();c.ellipse(0,-14,66,12,0,0,Math.PI);c.fill();c.fillStyle='rgba(155,107,255,.9)';c.beginPath();c.ellipse(0,-22,66,17,0,.1,Math.PI-.1);c.fill();c.fillStyle='rgba(180,255,220,.4)';c.beginPath();c.ellipse(0,-30,38,40,0,Math.PI,0);c.fill();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;c.stroke();for(let i=-3;i<=3;i++){c.fillStyle=((i+(t>>3))&1)?'#ffe45c':'#fff';c.beginPath();c.arc(i*18,-16+Math.abs(i)*2,3,0,7);c.fill()}}
 c.restore()}
function carSide(c,x,y,f,col,t){c.save();c.translate(x,y);c.scale(f*.8,.8);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,0,80,10,0,0,7);c.fill();wheel(c,-46,-17,17,t);wheel(c,46,-17,17,t);c.fillStyle=col;c.beginPath();c.roundRect(-78,-52,156,36,12);c.fill();c.fillStyle=shade(col,-.22);c.beginPath();c.roundRect(-40,-80,78,32,10);c.fill();c.fillStyle='rgba(170,225,255,.85)';c.beginPath();c.roundRect(-32,-74,28,22,5);c.roundRect(2,-74,28,22,5);c.fill();c.fillStyle='#fff6a0';c.fillRect(70,-44,8,8);c.fillStyle='#ff3030';c.fillRect(-80,-44,6,8);c.restore()}
function carFB(c,x,y,col,up){c.save();c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x,y,38,9,0,0,7);c.fill();c.fillStyle='#111';c.fillRect(x-38,y-22,10,20);c.fillRect(x+28,y-22,10,20);c.fillStyle=col;c.beginPath();c.roundRect(x-34,y-46,68,36,9);c.fill();c.fillStyle=shade(col,-.2);c.beginPath();c.roundRect(x-25,y-72,50,32,9);c.fill();c.fillStyle='rgba(170,225,255,.85)';c.beginPath();c.roundRect(x-20,y-67,40,20,5);c.fill();c.fillStyle=up?'#fff6a0':'#ff3030';c.fillRect(x-30,y-38,12,8);c.fillRect(x+18,y-38,12,8);c.restore()}
const TR=[];
function emit(k,x,y,f){const p={k,x,y,vx:-f*(.4+Math.random()*.6),vy:(Math.random()-.5)*.8,l:28,m:28,h:(fr*9)%360,r:Math.random()*6};if(k==='humo'){p.vy=-.5;p.l=p.m=34}if(k==='fuego'){p.vy=-1.1-Math.random();p.l=p.m=22}if(k==='estrella'){p.vy=-.8+Math.random()*-.6;p.vx=(Math.random()-.5)*2.4;p.l=p.m=36}if(k==='galaxia'){p.vx=(Math.random()-.5)*2;p.vy=(Math.random()-.5)*2;p.l=p.m=40}if(k==='rayo'){p.l=p.m=10}TR.push(p);if(TR.length>260)TR.shift()}
function drawTrail(){for(let i=TR.length-1;i>=0;i--){const p=TR[i];p.x+=p.vx;p.y+=p.vy;if(--p.l<=0){TR.splice(i,1);continue}const a=p.l/p.m;g.save();g.globalAlpha=a;
 if(p.k==='humo'){g.fillStyle='#d4d7e0';g.beginPath();g.arc(p.x,p.y-6,5+(1-a)*14,0,7);g.fill()}
 else{g.globalCompositeOperation='lighter';
  if(p.k==='fuego'){g.fillStyle=a>.5?'#ffd23d':'#ff4a1a';g.beginPath();g.arc(p.x,p.y-8,3+a*11,0,7);g.fill()}
  else if(p.k==='arco'){g.fillStyle=`hsl(${p.h},100%,60%)`;g.beginPath();g.arc(p.x,p.y-8,8,0,7);g.fill()}
  else if(p.k==='estrella'){g.fillStyle=p.r>3?'#ffe45c':'#ff9ae8';g.font=(10+a*16|0)+'px sans-serif';g.textAlign='center';g.fillText('★',p.x,p.y-10)}
  else if(p.k==='rayo'){g.strokeStyle='#8ff';g.lineWidth=3;g.beginPath();g.moveTo(p.x,p.y-8);for(let j=1;j<4;j++)g.lineTo(p.x+j*8*Math.sign(p.vx||1)+(Math.random()-.5)*14,p.y-8+(Math.random()-.5)*22);g.stroke()}
  else if(p.k==='galaxia'){g.fillStyle=`hsl(${250+p.r*20},100%,${60+a*20}%)`;g.beginPath();g.arc(p.x,p.y-10,1.5+p.r*.6*a,0,7);g.fill()}}
 g.restore()}}
// tiendas
const hud2=()=>{const e=$q('#bcoin');if(e)e.textContent=save.coins;const s=$q('#bs-c');if(s)s.textContent='🪙 '+save.coins};
function shopOpen(){return $q('#bshop')&&$q('#bshop').classList.contains('on')}
function ensureShop(){let m=$q('#bshop');if(m)return m;m=document.createElement('div');m.id='bshop';m.innerHTML='<div class="shb"><div class="shh"><b id="bs-t"></b><span id="bs-c"></span><button class="btn small" id="bs-x">✕</button></div><div id="bs-b"></div></div>';$q('#barrio').appendChild(m);$q('#bs-x').onclick=closeShop;return m}
function closeShop(){AR.on=0;const m=$q('#bshop');if(m)m.classList.remove('on');hud();vbtn()}
function spend(p){if(save.coins<p){try{sfx('buzz')}catch(e){}toast('No tienes monedas suficientes');return 0}save.coins-=p;const q=bq();q.buy=(q.buy||0)+1;try{sfx('legend')}catch(e){}return 1}
function shop(kind){ensureShop().classList.add('on');keys={};joy.x=joy.y=0;renderShop(kind)}
function renderShop(kind){const b=$q('#bs-b'),h=vh();hud2();const T={veh:'🏍 MOTOS, PATINES Y COCHES',tr:'✨ ESTELAS ESPECTACULARES',cafe:'☕ CAFÉ DEL BARRIO',burger:'🍔 BURGER DUNK',arc:'🕹 ARCADE · TIRO LIBRE',emo:'😎 TIENDA DE EMOTES'};$q('#bs-t').textContent=T[kind];
 if(kind==='arc'){arcUI();return}
 if(kind==='emo'){const E=emv();b.innerHTML='<div style="font:11px system-ui;color:#9ab;margin-bottom:8px">Equipa hasta 4 emotes (teclas 1-4 o botón 😎). Funcionan en el barrio y en los partidos. Ahora: '+E.sel.length+'/4</div><div class="shg">'+EMOTES.map(m=>{const own=E.own[m.id]||m.p===0,sl=E.sel.indexOf(m.id);return`<div class="shc${sl>=0?' on':''}" style="${sl>=0?'':'border-color:'+m.c+'66'}"><div class="big emo-b">${m.e}</div><b>${m.n}</b><small>${AN[m.an]}</small><div style="display:flex;gap:4px;width:100%">${own?`<button class="btn small" data-p="${m.id}" style="flex:0 0 34px">▶</button>`:''}<button class="btn small${own&&sl<0?' main':''}" data-e="${m.id}" ${!own&&save.coins<m.p?'disabled':''}>${sl>=0?'EN RUEDA '+(sl+1)+' ✓':own?'EQUIPAR':'COMPRAR '+m.p+'🪙'}</button></div></div>`}).join('')+'</div>';
  b.querySelectorAll('button[data-p]').forEach(bt=>bt.onclick=()=>{const m=$q('#bshop');m.classList.add('peek');setTimeout(()=>playEmote(bt.dataset.p),250);setTimeout(()=>m.classList.remove('peek'),2600)});
  b.querySelectorAll('button[data-e]').forEach(bt=>bt.onclick=()=>{const m=EMOTES.find(q=>q.id===bt.dataset.e),i=E.sel.indexOf(m.id);if(i>=0){E.sel.splice(i,1)}else{if(!(E.own[m.id]||m.p===0)){if(!spend(m.p))return;E.own[m.id]=1}if(E.sel.length>=4)E.sel.shift();E.sel.push(m.id)}store();emoBar();renderShop('emo')});return}
 if(kind==='veh'){b.innerHTML='<div class="shg">'+VEH.map(v=>{const own=h.own[v.id],sel=h.sel===v.id;return`<div class="shc${sel?' on':''}"><canvas width="150" height="96" data-v="${v.id}"></canvas><b>${v.e} ${v.n}</b><div class="bar"><i style="width:${v.sp/3.6*100}%"></i></div><small>⚡ Velocidad ×${v.sp}${v.d?' · '+v.d:''}</small><button class="btn small${own&&!sel?' main':''}" data-v="${v.id}" ${sel||(!own&&save.coins<v.p)?'disabled':''}>${sel?'EQUIPADO ✓':own?'EQUIPAR':'COMPRAR '+v.p+'🪙'}</button></div>`}).join('')+'</div>';
  b.querySelectorAll('canvas').forEach(cn=>{const c=cn.getContext('2d'),id=cn.dataset.v,v=VEH.find(q=>q.id===id);const gr=c.createLinearGradient(0,0,0,96);gr.addColorStop(0,'#27306a');gr.addColorStop(1,'#12163a');c.fillStyle=gr;c.fillRect(0,0,150,96);c.fillStyle='#ffffff14';c.beginPath();c.ellipse(75,84,58,9,0,0,7);c.fill();c.save();c.translate(75,84);c.scale(.78,.78);vUnder(c,id,0,0,1,0,0);vOver(c,id,0,0,1,0,0);c.restore()});
  b.querySelectorAll('button[data-v]').forEach(bt=>bt.onclick=()=>{const v=VEH.find(q=>q.id===bt.dataset.v);if(!h.own[v.id]){if(!spend(v.p))return;h.own[v.id]=1}h.sel=v.id;MNT=1;store();renderShop('veh')});return}
 if(kind==='tr'){b.innerHTML='<div class="shg">'+TRAILS.map(t=>{const own=h.tr[t.id]||t.p===0,sel=h.st===t.id;return`<div class="shc${sel?' on':''}"><div class="big">${t.e}</div><b>${t.n}</b><small>${t.id==='none'?'Sin efectos':'Rastro al caminar y al conducir'}</small><button class="btn small${own&&!sel?' main':''}" data-t="${t.id}" ${sel||(!own&&save.coins<t.p)?'disabled':''}>${sel?'EQUIPADA ✓':own?'EQUIPAR':'COMPRAR '+t.p+'🪙'}</button></div>`}).join('')+'</div>';
  b.querySelectorAll('button[data-t]').forEach(bt=>bt.onclick=()=>{const t=TRAILS.find(q=>q.id===bt.dataset.t);if(!(h.tr[t.id]||t.p===0)){if(!spend(t.p))return;h.tr[t.id]=1}h.st=t.id;store();renderShop('tr')});return}
 b.innerHTML='<div class="shg">'+FOODS[kind].map(f=>`<div class="shc"><div class="big">${f.e}</div><b>${f.n}</b><small>${f.d}</small><button class="btn small main" data-f="${f.id}" ${save.coins<f.p?'disabled':''}>COMPRAR ${f.p}🪙</button></div>`).join('')+'</div>';
 b.querySelectorAll('button[data-f]').forEach(bt=>bt.onclick=()=>{const f=FOODS[kind].find(q=>q.id===bt.dataset.f);if(!spend(f.p))return;if(!save.bf)save.bf={};const ks=f.b==='all'?['spd','mag','x2']:[f.b];for(const k of ks)save.bf[k]=Math.max(Date.now(),save.bf[k]||0)+f.m*60000;store();toast(f.e+' ¡'+f.n+' activo!');renderShop(kind)})}
const AR={on:0};
function arcUI(){const q=bq(),b=$q('#bs-b'),left=5-(q.arc||0);
 if(!AR.on){b.innerHTML=`<div class="arc"><div style="font-size:54px">🏀</div><div>5 tiros · para el marcador en la zona <b style="color:#7dff5a">verde</b>.<br>Zona <b style="color:#ffd23d">dorada</b> = ¡SWISH! +40🪙 · verde +20🪙<br><small>Entrada 30🪙 · Partidas hoy: ${q.arc||0}/5</small></div><button class="btn main" id="ar-go" ${left<=0||save.coins<30?'disabled':''}>${left<=0?'VUELVE MAÑANA':'JUGAR · 30🪙'}</button><div id="ar-r">${AR.res||''}</div></div>`;AR.res='';const bt=$q('#ar-go');if(bt)bt.onclick=arcStart;return}
 b.innerHTML=`<div class="arc"><div class="arm"><div class="arz"><i></i></div><div class="arp" id="arp"></div></div><div id="ar-s"></div><button class="btn main" id="ar-go">¡TIRA!</button><div id="ar-r"></div></div>`;$q('#ar-go').onclick=arcShoot;arcInfo()}
function arcInfo(){const s=$q('#ar-s');if(s)s.textContent='Tiro '+Math.min(5,AR.n+1)+'/5 · Ganado: '+AR.pts+'🪙'}
function arcStart(){const q=bq();if((q.arc||0)>=5||save.coins<30)return;save.coins-=30;q.arc=(q.arc||0)+1;AR.on=1;AR.n=0;AR.pts=0;AR.pos=0;AR.d=1;AR.lock=0;store();hud2();arcUI();cancelAnimationFrame(AR.raf);const lp=()=>{if(!AR.on)return;AR.pos+=AR.d*(.016+AR.n*.005);if(AR.pos>=1){AR.pos=1;AR.d=-1}if(AR.pos<=0){AR.pos=0;AR.d=1}const p=$q('#arp');if(p)p.style.left=`calc(${AR.pos*100}% - 4px)`;AR.raf=requestAnimationFrame(lp)};lp()}
function arcShoot(){if(!AR.on||AR.lock)return;const d=Math.abs(AR.pos-.5),r=$q('#ar-r');let t,pts=0;if(d<.045){pts=40;t='🔥 ¡SWISH!';try{sfx('legend')}catch(e){}}else if(d<.11){pts=20;t='✅ ¡Dentro!';try{sfx('card')}catch(e){}}else{t='❌ Fallo';try{sfx('buzz')}catch(e){}}
 AR.pts+=pts;AR.n++;if(r)r.textContent=t;AR.lock=1;setTimeout(()=>{AR.lock=0},350);arcInfo();
 if(AR.n>=5){AR.on=0;cancelAnimationFrame(AR.raf);save.coins+=AR.pts;store();hud2();AR.res='Total: +'+AR.pts+'🪙';setTimeout(()=>{if(shopOpen())arcUI()},900)}}
// vehículo montado
let MNT=0,MAPBIG=0;
const myName=()=>String((window.FBX&&FBX.user&&FBX.user.name)||'Jugador').slice(0,14);
const oIds=()=>{const o=(save.os)||{};return[save.of,save.ob,o.h,o.f,o.b].map(v=>v==null?-1:v)};
const stNow=()=>{const V=MNT?vs():null;return{n:myName(),c:save.sel,o:oIds(),x:Math.round(P.x),y:Math.round(P.y),d:P.f,m:P.mv|0,v:V?V.id:'',t:vh().st||'',e:'',es:0,hb:Date.now()}};
let lastSig='';
const myInfo=()=>{const m=save.owned[save.sel]||{};return{c:save.sel,l:m.lvl||1,s:m.st||0,o:oIds(),n:myName()}};
let roomMem=null;
function onlJoin(code){const c0=code;code=code||roomMem;return ONL.join(stNow(),code).then(()=>{lastSig='';if(ONL.status==='on'){roomMem=ONL.room;ONL.set({n:myName(),c:save.sel,o:oIds()})}else if(ONL.status==='full'&&!c0&&roomMem){roomMem=null;ONL.status='off';return onlJoin()}return ONL.status})}
function salaOpen(){let p=$q('#bsala');if(!p){p=document.createElement('div');p.id='bsala';$q('#barrio').appendChild(p)}
 const on=ONL.status==='on',msg=on?(ONL.n+1)+'/10 jugadores · pásale este código a tu amigo':ONL.status==='full'?'Sala llena':ONL.status==='guest'?'Inicia sesión para jugar online':save.bonl===0?'Estás en modo solo':'Sin conexión';
 p.innerHTML='<div class="sbox"><b>🔑 SALA ONLINE</b><div class="scode">'+(on?ONL.room:'—')+'</div><small>'+msg+'</small><div id="slist"></div><input id="sin" maxlength="8" placeholder="CÓDIGO DE TU AMIGO" autocapitalize="characters" autocomplete="off"><button class="btn main" id="sgo">UNIRME A LA SALA</button><button class="btn small" id="snew">🎲 CREAR SALA NUEVA</button><button class="btn small" id="scp">📋 COPIAR CÓDIGO</button><button class="btn small" id="stg">'+(save.bonl===0?'🌐 ACTIVAR ONLINE':'🚫 MODO SOLO')+'</button><button class="btn small" id="sx">CERRAR</button></div>';
 p.classList.add('on');
 const join=c=>{c=ONL.norm(c);if(c.length<2){toast('Escribe un código (2-8 letras o números)');return}save.bonl=1;store();ONL.leave();toast('Entrando a '+c+'…');onlJoin(c).then(st=>{if(st==='on'){toast('🌐 Estás en la sala '+ONL.room);salaOpen()}else{toast(st==='full'?'⛔ Sala llena (10/10)':'No se pudo entrar a la sala');onlJoin().then(()=>salaOpen())}})};
 $q('#sgo').onclick=()=>join($q('#sin').value);$q('#sin').onkeydown=e=>{if(e.key==='Enter')join(e.target.value)};
 $q('#snew').onclick=()=>{const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let c='';for(let i=0;i<4;i++)c+=A[Math.random()*A.length|0];join(c)};
 $q('#scp').onclick=()=>{if(!on)return;try{navigator.clipboard.writeText(ONL.room).then(()=>toast('📋 Código copiado'),()=>toast('Código: '+ONL.room))}catch(e){toast('Código: '+ONL.room)}};
 $q('#stg').onclick=()=>{if(save.bonl===0){save.bonl=1;onlJoin().then(()=>salaOpen())}else{save.bonl=0;ONL.leave()}store();salaOpen()};
 const lst=()=>{const l=$q('#slist');if(!l)return;const ps=ONL.status==='on'?Object.values(ONL.peers).filter(q=>q&&q.uid):[];
  l.innerHTML=ps.length?'<small>Jugadores en la sala · reta a quien quieras, esté donde esté:</small>'+ps.map(q=>'<div class="srow"><span>'+String(q.n||'Jugador').replace(/[<>&]/g,'')+'</span><button class="btn small" data-u="'+q.uid+'">⚔ RETAR 1vs1</button></div>').join(''):'';
  l.querySelectorAll('button').forEach(b=>b.onclick=()=>{const q=ONL.peers[b.dataset.u];if(q){p.classList.remove('on');challenge(q)}})};
 lst();clearInterval(p._t);p._t=setInterval(()=>{if(!p.classList.contains('on'))return clearInterval(p._t);lst()},1500);
 $q('#sx').onclick=()=>p.classList.remove('on')}
function challenge(p){if(DU.out||!p||!p.uid)return;const cid='d'+Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4);DU.out={uid:p.uid,cid,t:fr,n:p.n};
 DUEL.invite(cid,myInfo()).then(()=>{if(DU.out){ONL.set({ch:p.uid,cid});toast('⚔ Reto enviado a '+(p.n||'jugador')+'…')}}).catch(()=>{DU.out=null;toast('No se pudo enviar el reto')})}
function chalCancel(){if(DU.out){DU.out=null;if(!DU.going)DUEL.close();ONL.set({ch:'',cid:''})}}
function chalShow(){let e=$q('#bchal');if(!e){e=document.createElement('div');e.id='bchal';$q('#barrio').appendChild(e)}const i=DU.inc;if(!i){e.classList.remove('on');return}
 e.innerHTML='<div class="sbox"><b>⚔ ¡'+(i.n||'Un jugador')+' te reta!</b><small>Partido 1 vs 1 en directo</small><button class="btn main" id="cok">ACEPTAR</button><button class="btn small" id="cno">RECHAZAR</button></div>';e.classList.add('on');
 $q('#cok').onclick=()=>{const c=DU.inc;DU.inc=null;e.classList.remove('on');if(!c)return;toast('Conectando…');DUEL.onFail=()=>toast('El duelo no pudo empezar');DUEL.accept(c.cid,myInfo()).catch(()=>toast('No se pudo conectar'))};
 $q('#cno').onclick=()=>{DU.inc=null;e.classList.remove('on')}}
DUEL.leave=()=>{DU.going=1;DU.out=null;DU.inc=null;BR.from=1;stop();DU.going=0};
function onlStep(){const V=MNT?vs():null,sig=[Math.round(P.x/3),Math.round(P.y/3),P.f,P.mv|0,V?V.id:'',vh().st].join();if(fr%15===0&&sig!==lastSig){lastSig=sig;ONL.set({x:Math.round(P.x),y:Math.round(P.y),d:P.f,m:P.mv|0,v:V?V.id:'',t:vh().st||''})}if(fr%300===0)ONL.set({hb:Date.now()});
 for(const u in ONL.peers){const p=ONL.peers[u];if(p.ch&&p.cid&&p.ch===ONL.uid&&!DU.out&&!DU.inc&&!DU.seen[p.cid]){DU.seen[p.cid]=1;DU.inc={uid:u,cid:p.cid,n:p.n,t:fr};chalShow()}if(DU.inc&&DU.inc.uid===u&&!p.cid){DU.inc=null;chalShow()}if(p.x==null)continue;p.dx+=(p.x-p.dx)*.3;p.dy+=(p.y-p.dy)*.3;if(p._es===undefined)p._es=p.es;else if(p.es&&p.es!==p._es){p._es=p.es;const e=EMOTES.find(q=>q.id===p.e);if(e){p.em={e,t:0,T:96};emoFx(e,p.dx,p.dy)}}if(p.em&&++p.em.t>=p.em.T)p.em=null;if(p.m&&p.t&&p.t!=='none'&&fr%3===0)emit(p.t,p.dx-p.d*16,p.dy,p.d)}
 if(fr%30===0){const b=$q('#bonl');if(b){const s=ONL.status;b.textContent=s==='on'?'🌐 '+(ONL.n+1)+' · '+ONL.room:s==='full'?'🌐 sala llena':s==='error'?'🌐 sin conexión':s==='guest'?'🌐 inicia sesión':s==='joining'?'🌐 …':'🌐 solo'}}}
function peerDraw(p){if(!Number.isInteger(p.c)||!CH[p.c])return;const V=VEH.find(q=>q.id===p.v),E=window.WARD&&WARD.eqOf?WARD.eqOf(p.o):null,x=p.dx,y=p.dy,f=p.d===-1?-1:1,col=CH[p.c].jc,em=p.em;
 let hv=0;if(V){hv=V.fly?16+Math.sin(fr*.08)*5:0;const vy=y-hv;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y,V.id==='coche'||V.id==='ovni'?70:V.id==='moto'?56:34,8,0,0,7);g.fill();vUnder(g,V.id,x,vy,f,fr,p.m);rider(x,vy,f,col,p.c,0,V,p.m,E);vOver(g,V.id,x,vy,f,fr,p.m)}
 else{const X=emoXf(em);if(X){g.save();g.translate(x+X.dx,y);g.rotate(X.rot);g.scale(X.sx,X.sy);g.translate(-x,-y+X.dy)}person(x,y,f,col,p.c,0,p.m&&!em,undefined,E);if(X)g.restore()}
 g.save();g.font='bold 11px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';const nm=String(p.n||'Jugador').slice(0,14),w=g.measureText(nm).width+14,ny=y-(V?VL[V.id]+hv:0)-148;g.fillStyle='rgba(0,0,0,.65)';g.beginPath();g.roundRect(x-w/2,ny-9,w,18,9);g.fill();g.fillStyle='#7dff9a';g.fillText(nm,x,ny+1);
 if(em){const t=em.t,sc=t<10?1+Math.sin(t/10*Math.PI)*.35:1,a=Math.min(1,(em.T-t)/14);g.globalAlpha=Math.max(0,a);g.translate(x,ny-42-Math.sin(t*.12)*5);g.scale(sc,sc);g.fillStyle='#fff';g.strokeStyle=em.e.c;g.lineWidth=5;g.beginPath();g.roundRect(-30,-26,60,52,16);g.fill();g.stroke();g.font='36px sans-serif';g.fillText(em.e.e,0,2)}g.restore()}
function emoBar(){const E=emv(),r=$q('#bemr');if(!r)return;r.innerHTML=E.sel.map((id,i)=>{const m=EMOTES.find(q=>q.id===id);return`<button class="btn small" data-i="${id}">${m.e}<i>${i+1}</i></button>`}).join('')||'<span>Compra emotes en la tienda 😎</span>';r.querySelectorAll('button').forEach(b=>b.onclick=()=>{playEmote(b.dataset.i);r.classList.remove('on')})}
function mapRect(){if(MAPBIG){let mh=H0-24,mw=mh*WW/WH;if(mw>W0-24){mw=W0-24;mh=mw*WH/WW}return{x:(W0-mw)/2,y:(H0-mh)/2,w:mw,h:mh}}const mw=Math.min(170,W0*.24);return{x:W0-mw-10,y:58,w:mw,h:mw*WH/WW}}
function mapTap(e){if(!run)return;const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W0/r.width,y=(e.clientY-r.top)*H0/r.height;if(MAPBIG){MAPBIG=0;return}const m=mapRect();if(x>m.x-6&&x<m.x+m.w+6&&y>m.y-6&&y<m.y+m.h+6)MAPBIG=1}
const CLOUDS=Array.from({length:9},(_,i)=>({x:i*520,y:200+(i*337)%2600,s:.8+(i%3)*.4,v:.25+(i%4)*.08}));
const BFS=Array.from({length:30},(_,i)=>({x:200+(i*131)%1200+(i%2)*0,y:i%2?300+(i*97)%700:2050+(i*61)%800,a:i,h:[320,45,280,190][i%4]}));
const FFS=Array.from({length:60},(_,i)=>({x:(i*733)%WW,y:(i*541)%WH,a:i}));
const EQ=['👋','😂','💪','🔥','🕺','😎','💖','👏'];

function vbtn(){const b=$q('#bveh');if(!b)return;const v=vs();b.classList.toggle('hidden',!v);if(v)b.textContent=(MNT?'⬇ BAJAR ':'⬆ MONTAR ')+v.e}
// ---- emotes ----
const EMOTES=[
 {id:'wave',n:'Saludo',e:'👋',p:0,an:'bounce',fx:'stars',c:'#ffe45c'},
 {id:'laugh',n:'Carcajada',e:'😂',p:0,an:'shake',fx:'tears',c:'#5cf1ff'},
 {id:'clap',n:'Aplauso',e:'👏',p:120,an:'bounce',fx:'stars',c:'#ffd23d'},
 {id:'dance',n:'Baile Fiebre',e:'🕺',p:250,an:'dance',fx:'notes',c:'#ff5ce1'},
 {id:'flex',n:'Músculo',e:'💪',p:300,an:'flex',fx:'stars',c:'#ff9a3c'},
 {id:'cool',n:'Chulo',e:'😎',p:350,an:'spin',fx:'sparkle',c:'#5cf1ff'},
 {id:'heart',n:'Cariño',e:'💖',p:400,an:'float',fx:'hearts',c:'#ff6ba8'},
 {id:'fire',n:'En Llamas',e:'🔥',p:500,an:'jump',fx:'fire',c:'#ff6a1a'},
 {id:'brain',n:'Mente Rota',e:'🤯',p:600,an:'shake',fx:'confetti',c:'#ffe45c'},
 {id:'king',n:'Rey de la Cancha',e:'👑',p:900,an:'jump',fx:'crown',c:'#ffd23d'},
 {id:'rain',n:'Arcoíris',e:'🌈',p:1100,an:'spin',fx:'rainbow',c:'#7dff5a'},
 {id:'bolt',n:'Tormenta',e:'⚡',p:1400,an:'shake',fx:'bolt',c:'#8ff'},
 {id:'alien',n:'Abducción',e:'👽',p:2000,an:'float',fx:'ufo',c:'#7dff5a'},
 {id:'dragon',n:'Dragón',e:'🐲',p:3000,an:'flex',fx:'dragon',c:'#ff3b2f'}];
const AN={bounce:'Salto alegre',shake:'Temblor',dance:'Baile',flex:'Pose de fuerza',spin:'Giro',float:'Levitar',jump:'Súper salto'};
function emv(){if(!save.em)save.em={own:{wave:1,laugh:1},sel:['wave','laugh']};if(!save.em.sel)save.em.sel=['wave','laugh'];return save.em}
const EP=[];let EM=null;
function epart(k,x,y,o){EP.push(Object.assign({k,x,y,vx:0,vy:-1,l:60,m:60,r:Math.random()*6.28,s:1},o))}
function emoFx(e,x,y,P0){ // x,y suelo del jugador (mundo); P0: función extra
 const f=e.fx,n=(a,b)=>a+Math.random()*(b-a);
 for(let i=0;i<22;i++){
  if(f==='stars'||f==='sparkle')epart('t',x+n(-30,30),y-n(40,110),{t:Math.random()<.5?'★':'✦',vx:n(-3,3),vy:n(-4,-1),l:50,m:50,c:Math.random()<.5?e.c:'#fff',s:n(.8,1.6)});
  else if(f==='tears')epart('t',x+n(-40,40),y-n(60,110),{t:'😂',vx:n(-4,4),vy:n(-5,-1),l:55,m:55,s:n(.6,1)});
  else if(f==='notes')epart('t',x+n(-50,50),y-n(30,100),{t:['🎵','🎶','✨'][i%3],vx:n(-2,2),vy:n(-3,-1),l:70,m:70,s:n(.8,1.3)});
  else if(f==='hearts')epart('t',x+n(-50,50),y-n(20,80),{t:['💖','💗','💕'][i%3],vx:n(-1,1),vy:n(-3,-1),l:80,m:80,s:n(.8,1.4)});
  else if(f==='fire')epart('c',x+n(-40,40),y-n(0,30),{vx:n(-1,1),vy:n(-6,-2),l:45,m:45,c:i%2?'#ffd23d':'#ff4a1a',s:n(8,18)});
  else if(f==='confetti')epart('c',x+n(-20,20),y-90,{vx:n(-7,7),vy:n(-9,-2),l:70,m:70,c:`hsl(${i*16},100%,60%)`,s:n(4,8),g:.3});
  else if(f==='crown')epart('t',x+n(-40,40),y-n(100,190),{t:i%3?'✨':'👑',vx:n(-1,1),vy:n(-2,1),l:70,m:70,s:n(.8,1.4)});
  else if(f==='rainbow')epart('c',x+(i-11)*7,y-60-Math.sin(i/22*Math.PI)*110,{vx:0,vy:-.3,l:70,m:70,c:`hsl(${i*16},100%,60%)`,s:11});
  else if(f==='bolt')epart('b',x+n(-80,80),y-200,{vx:0,vy:0,l:14+i%8,m:22,len:n(100,200)});
  else if(f==='ufo')epart('t',x+n(-30,30),y-n(40,140),{t:i%2?'👽':'✨',vx:n(-1,1),vy:n(-2,-1),l:80,m:80,s:n(.7,1.2)});
  else if(f==='dragon')epart('c',x+(P0&&0)+n(20,160),y-n(60,110),{vx:n(2,7),vy:n(-1.5,1.5),l:50,m:50,c:i%2?'#ffd23d':'#ff3b2f',s:n(8,20)})}
 if(f==='ufo')epart('u',x,y-200,{l:80,m:80,vx:0,vy:0});
 EPR.push({x,y,l:30,m:30,c:e.c})}
const EPR=[];
function playEmote(id,fromShop){const e=EMOTES.find(q=>q.id===id);if(!e||!run||EM&&EM.t<20)return;EM={e,t:0,T:96};try{sfx('legend')}catch(x){}emoFx(e,P.x,P.y);ONL.set({e:e.id,es:Date.now()});if(e.fx==='bolt'){eflash=8}}
let eflash=0;
function drawEP(){for(let i=EPR.length-1;i>=0;i--){const r=EPR[i];r.l--;if(r.l<=0){EPR.splice(i,1);continue}const a=r.l/r.m;g.save();g.globalAlpha=a;g.strokeStyle=r.c;g.lineWidth=6*a;g.beginPath();g.ellipse(r.x,r.y,(1-a)*170+20,(1-a)*50+6,0,0,7);g.stroke();g.restore()}
 for(let i=EP.length-1;i>=0;i--){const p=EP[i];p.x+=p.vx;p.y+=p.vy;if(p.g)p.vy+=p.g;if(--p.l<=0){EP.splice(i,1);continue}const a=p.l/p.m;g.save();g.globalAlpha=Math.min(1,a*1.6);
  if(p.k==='t'){g.font=(26*p.s|0)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle=p.c||'#fff';g.fillText(p.t,p.x,p.y)}
  else if(p.k==='c'){g.globalCompositeOperation=p.c&&p.c[0]==='#'?'lighter':'source-over';g.fillStyle=p.c;g.beginPath();g.arc(p.x,p.y,p.s*(p.k==='c'?(.4+a*.6):1),0,7);g.fill()}
  else if(p.k==='b'){g.globalCompositeOperation='lighter';g.strokeStyle='#bff';g.lineWidth=5;g.beginPath();let x=p.x,y=p.y;g.moveTo(x,y);for(let j=0;j<6;j++){x+=(Math.random()-.5)*40;y+=p.len/6;g.lineTo(x,y)}g.stroke();g.strokeStyle='#fff';g.lineWidth=2;g.stroke()}
  else if(p.k==='u'){const t=1-a;g.globalCompositeOperation='lighter';const bm=g.createLinearGradient(0,p.y,0,p.y+190);bm.addColorStop(0,'rgba(125,255,90,.6)');bm.addColorStop(1,'rgba(125,255,90,0)');g.fillStyle=bm;g.beginPath();g.moveTo(p.x-20,p.y);g.lineTo(p.x+20,p.y);g.lineTo(p.x+70,p.y+190);g.lineTo(p.x-70,p.y+190);g.fill();g.globalCompositeOperation='source-over';ufo(p.x,p.y-8,.8)}
  g.restore()}}
// transformación corporal del jugador durante el emote
function emoXf(em=EM){if(!em)return null;const t=em.t,u=t/em.T,an=em.e.an;let dy=0,dx=0,rot=0,sx=1,sy=1;const s=Math.sin(t*.35);
 if(an==='bounce'){dy=-Math.abs(Math.sin(t*.28))*26}
 else if(an==='shake'){dx=Math.sin(t*1.3)*8;rot=Math.sin(t*1.1)*.05}
 else if(an==='dance'){dx=Math.sin(t*.3)*14;rot=Math.sin(t*.3)*.13;dy=-Math.abs(Math.sin(t*.3))*10}
 else if(an==='flex'){sx=1+Math.sin(Math.min(1,u*3)*Math.PI)*.14+Math.sin(t*.4)*.03;sy=sx}
 else if(an==='spin'){sx=Math.cos(t*.3);dy=-Math.sin(Math.min(1,u*1.4)*Math.PI)*30}
 else if(an==='float'){dy=-30*Math.sin(Math.min(1,u*1.2)*Math.PI)-Math.sin(t*.2)*4;rot=Math.sin(t*.15)*.04}
 else if(an==='jump'){dy=-Math.abs(Math.sin(u*Math.PI*2.5))*70}
 return{dy,dx,rot,sx,sy}}
// ---- mundo ----
function build(){RECT=[];TREES=[];
 for(const b of B){b.top=b.y-b.fh-b.rd;RECT.push({x:b.x-b.w/2,y:b.top,w:b.w,h:b.fh+b.rd,b})}
 RECT.push({x:FOUNT.x-FOUNT.r,y:FOUNT.y-FOUNT.r*.6,w:FOUNT.r*2,h:FOUNT.r*1.2});RECT.push({x:BOARD.x-40,y:BOARD.y-30,w:80,h:30});
 RECT.push({x:LAKE.x-LAKE.rx*.85,y:LAKE.y-LAKE.ry*.8,w:LAKE.rx*1.7,h:LAKE.ry*1.6});
 RECT.push({x:COURT.x-COURT.w/2-14,y:COURT.y-COURT.h/2-14,w:COURT.w+28,h:12});RECT.push({x:COURT.x-COURT.w/2-14,y:COURT.y-COURT.h/2-14,w:12,h:COURT.h*.38});RECT.push({x:COURT.x-COURT.w/2-14,y:COURT.y+COURT.h*.12,w:12,h:COURT.h*.4});
 RECT.push({x:COURT.x+COURT.w/2+2,y:COURT.y-COURT.h/2-14,w:12,h:COURT.h*.38});RECT.push({x:COURT.x+COURT.w/2+2,y:COURT.y+COURT.h*.12,w:12,h:COURT.h*.4});
 const bad=(x,y)=>inRoad(x,y,50)||B.some(b=>x>b.x-b.w/2-50&&x<b.x+b.w/2+50&&y>b.top-60&&y<b.y+80)||Math.hypot(x-FOUNT.x,(y-FOUNT.y)*1.5)<170||Math.abs(x-BOARD.x)<100&&Math.abs(y-BOARD.y)<90||((x-LAKE.x)/(LAKE.rx+40))**2+((y-LAKE.y)/(LAKE.ry+40))**2<1||Math.abs(x-COURT.x)<COURT.w/2+60&&Math.abs(y-COURT.y)<COURT.h/2+60||Math.hypot(x-CRASH.x,y-CRASH.y)<160;
 for(let i=0;i<340;i++){const x=60+rng()*(WW-120),y=120+rng()*(WH-200),z=zoneAt(x,y);if(bad(x,y))continue;if(z&&z.k==='plz'&&rng()<.85)continue;const k=z&&z.k==='ali'?'cactus':'tree';TREES.push({x,y,k,s:.8+rng()*.5});}
 for(const t of TREES)RECT.push({x:t.x-9,y:t.y-12,w:18,h:12,t:1})}
function mkNPC(i){const zs=ZONES,z=zs[i%zs.length],pool=CH.filter(c=>!c.hide&&c.rar<=2),c=pool[(rng()*pool.length)|0];let x,y,t=0;do{x=z.x+80+rng()*(z.w-160);y=z.y+100+rng()*(z.h-200);t++}while((hit(x,y)||inRoad(x,y,0)&&0)&&t<40);return{id:c.id,col:c.jc,x,y,z,tx:x,ty:y,w:rng()*100,f:rng()<.5?1:-1,mv:0,say:0,rival:i%3===0}}
function hit(x,y,r=14,fly){for(const q of RECT)if(!(fly&&q.t)&&x+r>q.x&&x-r<q.x+q.w&&y>q.y&&y-8<q.y+q.h)return 1;return x<20||x>WW-20||y<40||y>WH-20}
function spawnCoins(){COINS=[];const q=bq();if(!q.cg)q.cg=[];let sd=0;for(const ch of q.d)sd=(sd*31+ch.charCodeAt(0))%2147483647;const R=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(sd||7);for(let i=0;i<20;i++){let x,y,t=0;do{x=100+R()*(WW-200);y=140+R()*(WH-260);t++}while((hit(x,y,24)||inRoad(x,y,0))&&t<60);if(!q.cg.includes(i))COINS.push({x,y,t:R()*6,i})}}
function open(){show('#barrio');if(!cv){cv=$q('#bcv');g=cv.getContext('2d');build();bind()}
 if(!P){P={x:(save.bp&&save.bp.x2)||2100,y:(save.bp&&save.bp.y2)||1560,f:1,mv:0};MNT=(save.bp&&save.bp.m)?1:0}if(!NP.length)for(let i=0;i<20;i++)NP.push(mkNPC(i));unstick();onlJoin();try{PL.use('domingo')}catch(e){}if(!CARS.length)mkCars();spawnCoins();resize();run=1;vh();vbtn();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);try{musicPlay('menu')}catch(e){}hud();zone=null;snapCam()}
function unstick(){if(!hit(P.x,P.y))return;for(let r=20;r<900;r+=20)for(let a=0;a<6.28;a+=.4){const x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;if(!hit(x,y)){P.x=x;P.y=y;return}}P.x=2100;P.y=1560}
const CARS=[];const CC=['#e23b3b','#2f6bff','#ffd23d','#2fcf7a','#ff7a1a','#9b6bff','#f0f0f0','#ff5ce1'];
function mkCars(){let k=0;for(const r of ROADS){const h=r[2]>r[3];for(let d=0;d<2;d++)for(let j=0;j<3;j++){const len=h?r[2]:r[3];CARS.push({h,d:d?-1:1,c:CC[(k++)%CC.length],p:Math.random()*len,sp:1.6+Math.random()*1.4,v:0,lane:h?(d?r[1]+92:r[1]+38):(d?r[0]+30:r[0]+80),len})}}}
function stepCars(){for(const c of CARS){const sp=c.sp;let stop=0;const px=c.h?P.x:P.y,py=c.h?P.y:P.x,pos=c.p;const ahead=(px-pos)*c.d,lat=Math.abs(py-(c.h?c.lane:c.lane));if(ahead>0&&ahead<170&&lat<70)stop=1;c.v+=((stop?0:sp)-c.v)*.08;c.p+=c.v*c.d;if(c.p>c.len+200)c.p=-200;if(c.p<-200)c.p=c.len+200}}
function stop(){if(!DU.going&&DU.out)chalCancel();ONL.leave();run=0;cancelAnimationFrame(raf);if(P)save.bp={x2:Math.round(P.x),y2:Math.round(P.y),m:MNT};try{store()}catch(e){}}
BR.open=open;BR.tp=(x,y)=>{if(!P)P={x:0,y:0,f:1,mv:0};P.x=x;P.y=y;snapCam()};
function hud(){const e=$q('#bcoin');if(e)e.textContent=save.coins}
function resize(){if(!cv)return;const r=cv.parentElement.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);W0=Math.round(r.width);H0=Math.round(r.height);cv.width=Math.round(W0*d);cv.height=Math.round(H0*d);cv.style.width=W0+'px';cv.style.height=H0+'px';S=H0/VH}
function snapCam(){cx=P.x-W0/S/2;cy=P.y-VH/2;clampCam()}
function clampCam(){cx=Math.max(0,Math.min(WW-W0/S,cx));cy=Math.max(0,Math.min(WH-VH,cy))}
addEventListener('resize',()=>{if(run)resize()});
function bind(){
 addEventListener('keydown',e=>{if(!run)return;if(shopOpen()){if(AR.on&&(e.code==='Space'||e.code==='Enter')){arcShoot();e.preventDefault()}if(e.code==='Escape')closeShop();return}keys[e.code]=1;if(e.code==='KeyV'){togV();return}if(e.code==='KeyM'){MAPBIG=!MAPBIG;return}if(/^Digit[1-4]$/.test(e.code)){const id=emv().sel[+e.code[5]-1];if(id)playEmote(id);return}if(e.code==='Escape'&&MAPBIG){MAPBIG=0;return}if(e.code==='KeyE'||e.code==='Enter'||e.code==='Space'){act();e.preventDefault()}});addEventListener('blur',()=>{keys={};joy.x=joy.y=0});addEventListener('keyup',e=>{keys[e.code]=0});
 const jb=$q('#bjoy'),st=$q('#bjoy i');let pid=null,ox=0,oy=0;
 const mv=e=>{let dx=e.clientX-ox,dy=e.clientY-oy;const m=Math.hypot(dx,dy),R=46;if(m>R){dx*=R/m;dy*=R/m}st.style.transform=`translate(${dx}px,${dy}px)`;joy.x=dx/R;joy.y=dy/R};
 {const br=$q('#barrio');for(const ev of['touchstart','touchmove','gesturestart'])br.addEventListener(ev,e=>{if(!e.target.closest('button,input,a,#bshop,#bq,#bemr,#bsala,#bchal'))e.preventDefault()},{passive:false});br.addEventListener('contextmenu',e=>e.preventDefault());br.addEventListener('selectstart',e=>e.preventDefault())}
 jb.addEventListener('pointerdown',e=>{pid=e.pointerId;jb.setPointerCapture(pid);const r=jb.getBoundingClientRect();ox=r.left+r.width/2;oy=r.top+r.height/2;mv(e);e.preventDefault()});
 jb.addEventListener('pointermove',e=>{if(e.pointerId===pid)mv(e)});
 const up=e=>{if(e.pointerId===pid){pid=null;joy.x=joy.y=0;st.style.transform=''}};jb.addEventListener('pointerup',up);jb.addEventListener('pointercancel',up);
 $q('#bonl').onclick=salaOpen;$q('#bgo').onclick=act;$q('#bveh').onclick=togV;$q('#bemo').onclick=()=>$q('#bemr').classList.toggle('on');emoBar();$q('#sp-cancel').addEventListener('click',()=>{const bb=$q('#barrio');if(bb&&!bb.classList.contains('hidden')&&!run){BR.from=0;open()}});cv.addEventListener('pointerdown',mapTap);$q('#bback').onclick=()=>{stop();BR.from=0;renderMenu()};$q('#bq-x').onclick=()=>{$q('#bq').classList.remove('on')}}
function togV(){if(!vs())return;MNT=MNT?0:1;try{sfx('card')}catch(e){}vbtn()}
function act(){if(!run||!near||shopOpen()||$q('#bq').classList.contains('on'))return;try{sfx('card')}catch(e){}
 const n=near;if(n.t==='b'){const b=n.o;if(b.closed){toast('🔒 Cerrado. Solo es decoración.');return}const q=bq();if(!q.vis.includes(b.k)){q.vis.push(b.k)}if(b.stay){b.act();return}stop();go(b.act)()}
 else if(n.t==='court'){stop();go(()=>{curDiff=1;curMode=1;beginVs()})()}
 else if(n.t==='npc'){const v=n.o,q=bq();if(!q.talk.includes(v.id))q.talk.push(v.id);if(v.rival){stop();go(()=>{curDiff=v.z.lv;curMode=1;beginVs()})()}}
 else if(n.t==='peer')challenge(n.o)
 else if(n.t==='wait')chalCancel()
 else if(n.t==='board')panel()}
function toast(t){const e=$q('#toast');if(e){e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1800)}}
function panel(){const q=bq(),p=$q('#bq');p.classList.add('on');
 $q('#bq-b').innerHTML=MIS.map((m,i)=>{const v=prog(i),ok=v>=m.n,cl=q.claim[i];return`<div class="bqm${cl?' done':''}"><div><b>${m.t}</b><div class="bqp"><i style="width:${v/m.n*100}%"></i></div><small>${v}/${m.n}</small></div><button class="btn small${ok&&!cl?' main':''}" data-i="${i}" ${ok&&!cl?'':'disabled'}>${cl?'✓':ok?'COBRAR +'+m.r+'🪙':m.r+'🪙'}</button></div>`}).join('');
 p.querySelectorAll('button[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,m=MIS[i];if(prog(i)>=m.n&&!q.claim[i]){q.claim[i]=1;save.coins+=m.r;store();hud();try{sfx('legend')}catch(e){}panel()}})}
// ---- lógica ----
function step(){const kx=(keys.ArrowRight||keys.KeyD?1:0)-(keys.ArrowLeft||keys.KeyA?1:0),ky=(keys.ArrowDown||keys.KeyS?1:0)-(keys.ArrowUp||keys.KeyW?1:0);
 let dx=Math.abs(joy.x)>.12?joy.x:kx,dy=Math.abs(joy.y)>.12?joy.y:ky;const m=Math.hypot(dx,dy);if(m>1){dx/=m;dy/=m}
 P.mv=m>.1?1:0;const V=MNT?vs():null,modal=$q('#bq').classList.contains('on')||shopOpen()||MAPBIG;
 if(P.mv&&!modal){const sp=4.6*(V?V.sp:1)*(buf('spd')?1.3:1),n=Math.ceil(sp/4),s1=sp/n;for(let i=0;i<n;i++){const nx=P.x+dx*s1,ny=P.y+dy*s1;if(!hit(nx,P.y,14,V&&V.fly))P.x=nx;if(!hit(P.x,ny,14,V&&V.fly))P.y=ny}if(Math.abs(dx)>.15)P.f=dx>0?1:-1;const tk=vh().st;if(tk&&tk!=='none'&&(fr%(sp>8?1:2)===0))emit(tk,P.x-P.f*(V?50:16),P.y,P.f)}
 stepCars();onlStep();if(EM&&++EM.t>=EM.T)EM=null;if(eflash>0)eflash--;for(const q of NP){if(q.em){if(++q.em.t>110)q.em=null}else if(Math.random()<.0007)q.em={e:EQ[Math.random()*EQ.length|0],t:0}}for(const c of CLOUDS){c.x+=c.v;if(c.x>WW+500)c.x=-500}for(const b of BFS){b.a+=.04;b.x+=Math.cos(b.a*.7+b.h)*1.1;b.y+=Math.sin(b.a*.5)*.8}for(const f of FFS){f.a+=.02;f.x+=Math.cos(f.a)*.5;f.y+=Math.sin(f.a*1.3)*.5}
 near=null;
 {let bd=99;for(const b of B)if(Math.abs(P.x-b.x)<55&&P.y>b.y-6&&P.y<b.y+70&&Math.abs(P.x-b.x)<bd){bd=Math.abs(P.x-b.x);near={t:'b',o:b,n:b.closed?'🔒 '+b.n:(b.e||'')+' '+b.n,d:b.closed?'Cerrado':b.d}}}
 if(!near&&Math.abs(P.x-COURT.x)<COURT.w/2-30&&Math.abs(P.y-COURT.y)<COURT.h/2-20)near={t:'court',n:'🏀 CANCHA CALLEJERA',d:'Partido 1 vs 1'};
 if(!near&&Math.abs(P.x-BOARD.x)<80&&P.y>BOARD.y-6&&P.y<BOARD.y+70)near={t:'board',n:'📋 MISIONES DEL DÍA',d:'Cobra monedas'};
 bub=null;for(const n of NP){if(--n.w<=0){const z=n.z;n.tx=z.x+60+Math.random()*(z.w-120);n.ty=z.y+90+Math.random()*(z.h-160);n.w=140+Math.random()*320;n.mv=Math.random()<.8}
  if(n.mv){const ex=n.tx-n.x,ey=n.ty-n.y,d=Math.hypot(ex,ey);if(d>6){const vx=ex/d*1.15,vy=ey/d*1.15;if(!hit(n.x+vx,n.y))n.x+=vx;else n.w=0;if(!hit(n.x,n.y+vy))n.y+=vy;else n.w=0;if(Math.abs(vx)>.1)n.f=vx>0?1:-1}else n.mv=0}
  if(Math.hypot(n.x-P.x,(n.y-P.y)*1.6)<120){if(!n.say)n.say=((n.id*7)%3)+1;bub=n;if(!near)near={t:'npc',o:n,n:n.rival?'⚔ RETADOR':'💬 VECINO',d:n.rival?'Partido 1 vs 1 · dificultad '+(['FÁCIL','NORMAL','DIFÍCIL'][n.z.lv]):'Charla (cuenta para la misión)'}}else n.say=0}
 if(!near&&!DU.out&&!DU.inc&&ONL.status==='on'){for(const u in ONL.peers){const p=ONL.peers[u];if(p.x==null||!Number.isInteger(p.c)||p.cid)continue;if(Math.hypot(p.dx-P.x,(p.dy-P.y)*1.6)<130){near={t:'peer',o:p,n:'⚔ '+(p.n||'Jugador'),d:'Retar a 1 vs 1 online'};break}}}
 if(DU.out){if(fr-DU.out.t>1500){chalCancel();toast('Sin respuesta al reto')}near={t:'wait',n:'⏳ Esperando a '+(DU.out.n||'jugador'),d:'Toca CANCELAR para anular'}}
 if(DU.inc&&fr-DU.inc.t>1500){DU.inc=null;chalShow()}
 const b=$q('#bgo'),nm=$q('#bnm');if(near&&EM)nm.classList.add('hidden');if(near){b.classList.remove('hidden');if(!EM)nm.classList.remove('hidden');b.textContent=near.t==='b'&&near.o.closed?'🔒':near.t==='npc'&&!near.o.rival?'HABLAR':near.t==='board'?'VER ▶':near.t==='npc'?'RETAR ⚔':near.t==='peer'?'RETAR ⚔':near.t==='wait'?'CANCELAR':'ENTRAR ▶';nm.innerHTML=`<b>${near.n}</b><small>${near.d}</small>`}else{b.classList.add('hidden');nm.classList.add('hidden')}
 const mg=buf('mag'),gain=buf('x2')?40:20;for(let i=COINS.length-1;i>=0;i--){const c=COINS[i];if(mg){const ex=P.x-c.x,ey=P.y-c.y,d=Math.hypot(ex,ey);if(d<260&&d>1){c.x+=ex/d*6;c.y+=ey/d*6}}if(Math.abs(c.x-P.x)<34&&Math.abs(c.y-P.y)<30){COINS.splice(i,1);const q=bq();q.cg.push(c.i);save.coins+=gain;q.coins++;hud();try{sfx('card')}catch(e){}pops.push({x:c.x,y:c.y-50,t:0,v:gain})}}
 if(fr%20===0){const bf=$q('#bbuf');if(bf){const nm={spd:'⚡ Velocidad',mag:'🧲 Imán',x2:'✖2 Monedas'};bf.innerHTML=['spd','mag','x2'].filter(buf).map(k=>{const t=Math.ceil((save.bf[k]-Date.now())/1000);return`<span>${nm[k]} ${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}</span>`}).join('')}}
 const z=zoneAt(P.x,P.y);if(z&&z!==zone){zone=z;zt=150;const zb=$q('#bzone');zb.textContent=z.e+' '+z.n;zb.classList.remove('on');void zb.offsetWidth;zb.classList.add('on')}
 const tx=P.x-W0/S/2,ty=P.y-VH/2+30;cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;clampCam()}
const pops=[];
// ---- dibujo ----
function tex(k){if(pat[k])return pat[k];const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');const R=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(k.length*77+5);
 const base={grass:'#3f9a4f',grass2:'#379048',stone:'#a3a8b8',sand:'#d2b27a',road:'#3a3f4c'}[k];q.fillStyle=base;q.fillRect(0,0,64,64);
 if(k.startsWith('grass'))for(let i=0;i<26;i++){q.fillStyle=R()<.5?'#4bab5c':'#2f8340';q.fillRect(R()*62,R()*62,2,4)}
 if(k==='stone'){q.strokeStyle='#8a90a2';q.lineWidth=2;q.strokeRect(1,1,31,31);q.strokeRect(33,1,30,31);q.strokeRect(1,33,31,30);q.strokeRect(33,33,30,30)}
 if(k==='sand')for(let i=0;i<20;i++){q.fillStyle=R()<.5?'#e0c690':'#c29a5c';q.fillRect(R()*62,R()*62,3,2)}
 if(k==='road')for(let i=0;i<16;i++){q.fillStyle='#454a58';q.fillRect(R()*62,R()*62,3,3)}
 return pat[k]=g.createPattern(c,'repeat')}
function ground(n){const vw=W0/S,vh=VH;g.fillStyle=tex('grass');g.fillRect(cx,cy,vw,vh);
 for(const z of ZONES){if(z.x>cx+vw||z.x+z.w<cx||z.y>cy+vh||z.y+z.h<cy)continue;if(z.k==='plz'){g.fillStyle=tex('stone');g.fillRect(z.x,z.y,z.w,z.h)}if(z.k==='ali'){g.fillStyle=tex('sand');g.fillRect(z.x,z.y,z.w,z.h)}if(z.k==='dep'){g.fillStyle=tex('grass2');g.fillRect(z.x,z.y,z.w,z.h)}}
 for(const r of ROADS){g.fillStyle='#8c92a0';g.fillRect(r[0]-10,r[1]-10,r[2]+20,r[3]+20);g.fillStyle=tex('road');g.fillRect(r[0],r[1],r[2],r[3]);g.fillStyle='#ecebe0';if(r[2]>r[3])for(let x=Math.max(0,Math.floor(cx/110)*110);x<cx+vw;x+=110)g.fillRect(x,r[1]+r[3]/2-3,56,6);else for(let y=Math.max(0,Math.floor(cy/110)*110);y<cy+vh;y+=110)g.fillRect(r[0]+r[2]/2-3,y,6,56)}
 // lago
 g.fillStyle='#2a8fd8';g.beginPath();g.ellipse(LAKE.x,LAKE.y,LAKE.rx,LAKE.ry,0,0,7);g.fill();g.strokeStyle='#e6dcb0';g.lineWidth=10;g.stroke();g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=3;for(let i=0;i<5;i++){g.beginPath();g.ellipse(LAKE.x-120+i*60,LAKE.y-30+(i%2)*40,26,6,0,0,Math.PI);g.stroke()}
 // cancha
 g.fillStyle='#c96a2b';g.fillRect(COURT.x-COURT.w/2,COURT.y-COURT.h/2,COURT.w,COURT.h);g.strokeStyle='#fff';g.lineWidth=4;g.strokeRect(COURT.x-COURT.w/2+10,COURT.y-COURT.h/2+10,COURT.w-20,COURT.h-20);g.beginPath();g.moveTo(COURT.x,COURT.y-COURT.h/2+10);g.lineTo(COURT.x,COURT.y+COURT.h/2-10);g.stroke();g.beginPath();g.arc(COURT.x,COURT.y,34,0,7);g.stroke();g.fillStyle='rgba(255,255,255,.25)';g.fillRect(COURT.x-COURT.w/2+10,COURT.y-40,60,80);g.fillRect(COURT.x+COURT.w/2-70,COURT.y-40,60,80)
 // cráter / plaza
 g.fillStyle='rgba(60,40,10,.35)';g.beginPath();g.ellipse(CRASH.x,CRASH.y+10,150,60,0,0,7);g.fill();
 g.fillStyle='rgba(60,40,10,.25)';for(const[x,y,r]of[[3700,2150,60],[3900,2650,80],[3200,2200,50]]){g.beginPath();g.ellipse(x,y,r,r*.4,0,0,7);g.fill()}
 // fuente base
 g.fillStyle='#7e8497';g.beginPath();g.ellipse(FOUNT.x,FOUNT.y,FOUNT.r,FOUNT.r*.55,0,0,7);g.fill();g.fillStyle='#46b6ff';g.beginPath();g.ellipse(FOUNT.x,FOUNT.y,FOUNT.r-10,FOUNT.r*.55-8,0,0,7);g.fill()}
function shade(h,a){const p=[1,3,5].map(i=>parseInt(h.substr(i,2),16));return'rgb('+p.map(v=>Math.max(0,Math.min(255,Math.round(v*(1+a))))).join(',')+')'}
function door(b,lit){const dx=b.x,dy=b.y;const gr=g.createLinearGradient(0,dy-76,0,dy);gr.addColorStop(0,'#3a2412');gr.addColorStop(1,'#5a3a20');g.fillStyle=gr;g.fillRect(dx-22,dy-76,44,76);g.fillStyle=lit?'#ffd86a':'#9ad3ff';g.fillRect(dx-14,dy-66,28,28);g.fillStyle='#ffd23d';g.beginPath();g.arc(dx+14,dy-30,3,0,7);g.fill();if(near&&near.o===b){g.save();g.globalCompositeOperation='lighter';const gl=g.createRadialGradient(dx,dy-30,4,dx,dy-30,110);gl.addColorStop(0,'rgba(255,235,130,.6)');gl.addColorStop(1,'rgba(255,235,130,0)');g.fillStyle=gl;g.fillRect(dx-120,dy-150,240,200);g.restore()}}
function win(x,y,w,h,lit,col){g.fillStyle=lit?'#ffe9a0':'#bfe3ff';g.fillRect(x,y,w,h);g.strokeStyle=col;g.lineWidth=3;g.strokeRect(x,y,w,h);g.beginPath();g.moveTo(x+w/2,y);g.lineTo(x+w/2,y+h);g.moveTo(x,y+h/2);g.lineTo(x+w,y+h/2);g.stroke()}
function ufo(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#9fb0c8';g.beginPath();g.ellipse(0,0,46,13,0,0,7);g.fill();g.fillStyle='#7dff5a';g.beginPath();g.ellipse(0,-9,22,15,0,Math.PI,0);g.fill();g.fillStyle='#ffe45c';for(let i=-2;i<=2;i++){g.beginPath();g.arc(i*16,2,3,0,7);g.fill()}g.restore()}
function sign(b,txt){g.fillStyle=b.r;const w=Math.min(b.w-20,txt.length*11+30);g.fillRect(b.x-w/2,b.y-b.fh-4,w,22);g.fillStyle='#fff';g.font='bold 11px "Press Start 2P",monospace';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,b.x,b.y-b.fh+7,w-8)}
function building(b,n){const x=b.x-b.w/2,y=b.y-b.fh,lit=n>.3,t=b.top,w=b.w;g.save();
 g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x+8,b.y-4,w,14);
 const fg=g.createLinearGradient(0,y,0,b.y);fg.addColorStop(0,b.c);fg.addColorStop(1,shade(b.c,-.28));
 const st=b.st;
 if(st==='house'||st==='cabin'||st==='mansion'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle=b.r;g.beginPath();g.moveTo(x-14,y+4);g.lineTo(x+w*.12,t-14);g.lineTo(x+w*.88,t-14);g.lineTo(x+w+14,y+4);g.closePath();g.fill();g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x-14,y,w+28,6);
  if(st==='cabin'){g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2;for(let i=1;i<6;i++){g.beginPath();g.moveTo(x,y+i*20);g.lineTo(x+w,y+i*20);g.stroke()}g.fillStyle='#5a2a18';g.fillRect(x+w-50,t-30,20,40)}
  if(st==='mansion'){g.fillStyle='#fff';for(let i=0;i<4;i++)g.fillRect(x+16+i*(w-48)/3,y+8,10,b.fh-8);g.fillStyle='#d8c27a';g.fillRect(x+w/2-34,t+6,68,12)}
  win(x+16,y+30,54,46,lit,b.r);win(x+w-70,y+30,54,46,lit,b.r)}
 else if(st==='modern'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle='#e8eef5';g.fillRect(x-6,t+6,w+12,y-t-6+4);g.fillStyle='#2b3a4d';g.fillRect(x-6,t+2,w+12,8);g.fillStyle=lit?'#ffe9a0':'#5aa3e0';for(let i=0;i<3;i++)g.fillRect(x+12+i*(w-24)/3,y+24,(w-24)/3-8,b.fh-40);g.fillStyle='rgba(255,255,255,.35)';g.fillRect(x+12,y+24,18,b.fh-40)}
 else if(st==='cafe'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle=b.r;g.fillRect(x-6,t+14,w+12,y-t-10);for(let i=0;i<8;i++){g.fillStyle=i%2?'#fff':'#d23a3a';g.fillRect(x-6+i*(w+12)/8,y-6,(w+12)/8,22)}win(x+14,y+34,56,44,lit,b.r);g.font='22px sans-serif';g.fillText('☕',x+w-40,y+60)}
 else if(st==='boutique'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle=b.r;g.fillRect(x-8,t+10,w+16,y-t-6);for(let i=0;i<10;i++){g.fillStyle=i%2?'#fff':'#ff3d8f';g.fillRect(x-8+i*(w+16)/10,y-10,(w+16)/10,26)}g.fillStyle='rgba(255,255,255,.85)';g.fillRect(x+16,y+30,w/2-40,b.fh-44);for(let i=0;i<3;i++){g.fillStyle=['#ff3b2f','#2f6bff','#2fcf7a'][i];g.beginPath();g.arc(x+34+i*36,y+54,11,0,7);g.fill();g.fillRect(x+25+i*36,y+64,18,34)}win(x+w-90,y+34,64,48,lit,b.r)}
 else if(st==='casino'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle=b.r;g.fillRect(x-8,t+8,w+16,y-t-4);const f=fr>>3;for(let i=0;i<14;i++){g.fillStyle=(i+f)%2?'#ffe45c':'#ff5ce1';g.beginPath();g.arc(x-4+i*(w+8)/13,t+14,4,0,7);g.fill()}g.save();g.shadowColor='#ff5ce1';g.shadowBlur=18;g.fillStyle='#ff5ce1';g.font='bold 28px sans-serif';g.textAlign='center';g.fillText('🎰 7 7 7',b.x,t+60);g.restore();win(x+14,y+36,50,44,1,'#ff5ce1');win(x+w-64,y+36,50,44,1,'#5cf1ff')}
 else if(st==='warehouse'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle='#3a4458';g.fillRect(x-6,t+10,w+12,y-t-6);g.strokeStyle='#566178';g.lineWidth=2;for(let i=0;i<9;i++){g.beginPath();g.moveTo(x,t+14+i*(y-t)/9);g.lineTo(x+w,t+14+i*(y-t)/9);g.stroke()}g.fillStyle='#d9d9e0';g.fillRect(x+w-110,y+30,90,b.fh-30);g.strokeStyle='#8a90a0';for(let i=1;i<6;i++){g.beginPath();g.moveTo(x+w-110,y+30+i*(b.fh-30)/6);g.lineTo(x+w-20,y+30+i*(b.fh-30)/6);g.stroke()}g.font='28px sans-serif';g.fillStyle='#fff';g.fillText('🏋️',x+40,y+66)}
 else if(st==='dome'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle=b.r;g.beginPath();g.ellipse(b.x,y,w/2+12,b.fh+b.rd+10,0,Math.PI,0);g.fill();g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=3;for(let i=1;i<5;i++){g.beginPath();g.ellipse(b.x,y,(w/2+12)*i/5,b.fh+b.rd+10,0,Math.PI,0);g.stroke()}g.fillStyle='#fff';g.font='34px sans-serif';g.textAlign='center';g.fillText('🏀',b.x,t+70);win(x+20,y+28,60,50,lit,b.r);win(x+w-80,y+28,60,50,lit,b.r)}
 else if(st==='ufo'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle='#8a98ac';g.beginPath();g.ellipse(b.x,y,w/2+30,36,0,0,7);g.fill();g.fillStyle='rgba(125,255,90,.8)';g.beginPath();g.ellipse(b.x,y-14,w/3,b.fh*.8,0,Math.PI,0);g.fill();g.fillStyle='#ffe45c';for(let i=-4;i<=4;i++){g.beginPath();g.arc(b.x+i*34,y+14+Math.abs(i)*-1.5,5,0,7);g.fill()}
  g.save();g.globalCompositeOperation='lighter';const t2=fr*.04,bm=g.createLinearGradient(0,t-80,0,b.y);bm.addColorStop(0,'rgba(125,255,90,.45)');bm.addColorStop(1,'rgba(125,255,90,0)');g.fillStyle=bm;g.beginPath();g.moveTo(b.x-26,t-20);g.lineTo(b.x+26,t-20);g.lineTo(b.x+130,b.y);g.lineTo(b.x-130,b.y);g.fill();g.restore();ufo(b.x+Math.sin(fr*.03)*60,t-70+Math.sin(fr*.06)*8,.9)}
 else if(st==='castle'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle='#8a8aa0';g.fillRect(x,t+20,w,y-t-16);for(let i=0;i<10;i++)g.fillRect(x+i*w/10+2,t+8,w/10-6,14);g.fillStyle='#7d7d92';for(const s of[0,w-70]){g.fillRect(x+s-6,t-36,82,b.fh+b.rd+34);for(let i=0;i<4;i++)g.fillRect(x+s-6+i*22,t-48,16,14)}g.fillStyle='#e0463c';for(const s of[36,w-34]){g.fillRect(x+s,t-100,3,56);g.beginPath();g.moveTo(x+s+3,t-100);g.lineTo(x+s+34,t-88);g.lineTo(x+s+3,t-76);g.fill()}g.fillStyle='#34364a';for(let i=0;i<3;i++)g.fillRect(x+90+i*60,y+24,16,34);g.fillStyle=b.r;g.fillRect(b.x-34,y+4,68,12)}
 else if(st==='stadium'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle='#8a8272';g.beginPath();g.ellipse(b.x,y,w/2+20,b.fh+b.rd,0,Math.PI,0);g.fill();g.fillStyle='#6a6458';g.beginPath();g.ellipse(b.x,y,w/2-60,b.fh*.6,0,Math.PI,0);g.fill();for(let i=0;i<8;i++){g.fillStyle='#d8d4c4';g.fillRect(x+30+i*(w-60)/7-6,y+30,12,b.fh-30)}}
 else if(st==='garage'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle=b.r;g.fillRect(x-8,t+8,w+16,y-t-4);for(let i=0;i<12;i++){g.fillStyle=i%2?'#fff':'#111';g.fillRect(x-8+i*(w+16)/12,y-8,(w+16)/12,14)}g.fillStyle='#d9dbe4';g.fillRect(x+14,y+28,w/2-30,b.fh-28);g.strokeStyle='#8a90a0';g.lineWidth=2;for(let i=1;i<6;i++){g.beginPath();g.moveTo(x+14,y+28+i*(b.fh-28)/6);g.lineTo(x+w/2-16,y+28+i*(b.fh-28)/6);g.stroke()}g.fillStyle='#222';g.fillRect(x+w/2+18,y+30,w/2-34,b.fh-34);g.fillStyle=lit?'#ffe9a0':'#9ad3ff';g.fillRect(x+w/2+22,y+34,w/2-42,b.fh-48);g.font='30px sans-serif';g.textAlign='center';g.fillStyle='#fff';g.fillText('🏍',x+w/2+52,y+88);g.fillText('🚗',x+w-52,y+88);g.font='34px sans-serif';g.fillText('🛞',b.x-50,t+54);g.fillText('🏁',b.x+50,t+54)}
 else if(st==='neon'){g.fillStyle='#10163a';g.fillRect(x,y,w,b.fh);g.fillStyle='#0a0e2a';g.fillRect(x-8,t+8,w+16,y-t-4);g.save();g.shadowBlur=16;const cs=['#ff5ce1','#5cf1ff','#ffe45c'];for(let i=0;i<3;i++){g.shadowColor=cs[i];g.strokeStyle=cs[i];g.lineWidth=4;g.strokeRect(x+14+i*8,t+18+i*8,w-28-i*16,y-t-22-i*16)}g.shadowColor='#ff5ce1';g.fillStyle='#ff9ae8';g.font='bold 26px sans-serif';g.textAlign='center';g.fillText('✨ ESTELAS ✨',b.x,t+(y-t)/2+12);g.restore();for(let i=0;i<6;i++){const a=(fr*.05+i*1.1);g.fillStyle=['#ffe45c','#5cf1ff','#ff5ce1'][i%3];g.font='16px sans-serif';g.fillText('★',x+30+i*(w-60)/5,y+30+Math.sin(a)*10)}win(x+14,y+50,60,60,1,'#5cf1ff');win(x+w-74,y+50,60,60,1,'#ff5ce1')}
 else if(st==='burger'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle='#c98a3a';g.fillRect(x-6,t+30,w+12,y-t-26);for(let i=0;i<8;i++){g.fillStyle=i%2?'#fff':'#e23b3b';g.fillRect(x-6+i*(w+12)/8,y-8,(w+12)/8,24)}const bx=b.x,by=t+10;g.fillStyle='#e8a23a';g.beginPath();g.ellipse(bx,by,60,34,0,Math.PI,0);g.fill();g.fillStyle='#fff6d0';for(let i=-3;i<=3;i+=2)g.fillRect(bx+i*14-3,by-24+Math.abs(i)*3,6,3);g.fillStyle='#4aa83a';g.fillRect(bx-62,by,124,8);g.fillStyle='#e23b3b';g.fillRect(bx-56,by+8,112,6);g.fillStyle='#6a3a1a';g.fillRect(bx-60,by+14,120,14);g.fillStyle='#e8a23a';g.beginPath();g.ellipse(bx,by+28,60,12,0,0,Math.PI);g.fill();win(x+14,y+34,60,48,lit,b.r);g.font='28px sans-serif';g.textAlign='center';g.fillStyle='#fff';g.fillText('🍟',x+w-44,y+62)}
 else if(st==='emotes'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle=b.r;g.fillRect(x-6,t+8,w+12,y-t-4);const hu=fr*3%360;for(let i=0;i<10;i++){g.fillStyle=`hsl(${(hu+i*36)%360},100%,60%)`;g.beginPath();g.arc(x-2+i*(w+4)/9,y-6,5,0,7);g.fill()}g.save();g.translate(b.x,t+38);g.rotate(fr*.02);g.fillStyle='#dfe6ff';g.beginPath();g.arc(0,0,20,0,7);g.fill();g.fillStyle='#fff';for(let i=0;i<8;i++){g.fillRect(Math.cos(i)*14-3,Math.sin(i*1.7)*14-3,6,6)}g.restore();g.font='26px sans-serif';g.textAlign='center';const es=['😎','😂','🔥','💖','👑','🤯'];for(let i=0;i<3;i++){g.fillText(es[(i+(fr>>5))%6],x+34+i*(w-68)/2,y+62+Math.sin(fr*.1+i*2)*6)}g.fillStyle='#000a';g.fillRect(x+w/2-30,y+78,0,0)}
 else if(st==='arcade'){g.fillStyle=fg;g.fillRect(x,y,w,b.fh);g.fillStyle='#120a2e';g.fillRect(x-6,t+8,w+12,y-t-4);const f=fr>>2;for(let i=0;i<12;i++){g.fillStyle=(i+f)%3===0?'#ff5ce1':(i+f)%3===1?'#5cf1ff':'#ffe45c';g.beginPath();g.arc(x-2+i*(w+4)/11,t+14,4,0,7);g.fill()}g.save();g.shadowColor='#5cf1ff';g.shadowBlur=14;g.fillStyle='#5cf1ff';g.font='bold 22px sans-serif';g.textAlign='center';g.fillText('🕹 ARCADE',b.x,t+60);g.restore();for(let i=0;i<2;i++){const sx=x+16+i*(w-96);g.fillStyle='#000';g.fillRect(sx,y+30,64,56);for(let k=0;k<8;k++){g.fillStyle=['#5cf1ff','#ff5ce1','#ffe45c','#7dff5a'][(k+((fr>>3)+i))%4];g.fillRect(sx+6+(k%4)*14,y+36+((k>>2)*18),10,12)}}}
 g.restore();
 if(b.k!=='v5'||1)sign(b,(b.e?b.e+' ':'')+b.n);door(b,lit);
 if(!b.closed&&!(near&&near.o===b)){const bob=Math.sin(fr*.12)*5;g.fillStyle='#ffd23d';g.strokeStyle='#5a3a00';g.lineWidth=2;g.beginPath();g.moveTo(b.x-12,b.y-b.fh-44+bob);g.lineTo(b.x+12,b.y-b.fh-44+bob);g.lineTo(b.x,b.y-b.fh-24+bob);g.closePath();g.fill();g.stroke()}}
function tree(t,n){g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(t.x,t.y,22*t.s,8*t.s,0,0,7);g.fill();if(t.k==='cactus'){g.fillStyle='#2f8a3a';g.strokeStyle='#17501e';g.lineWidth=2;g.beginPath();g.roundRect(t.x-7*t.s,t.y-52*t.s,14*t.s,52*t.s,6);g.fill();g.stroke();g.beginPath();g.roundRect(t.x+6*t.s,t.y-38*t.s,16*t.s,8*t.s,4);g.fill();g.stroke();g.beginPath();g.roundRect(t.x+16*t.s,t.y-50*t.s,8*t.s,20*t.s,4);g.fill();g.stroke();return}
 g.fillStyle='#6b4a2a';g.fillRect(t.x-6*t.s,t.y-34*t.s,12*t.s,34*t.s);g.fillStyle=n>.5?'#14602f':'#2a9a45';g.beginPath();g.arc(t.x,t.y-52*t.s,30*t.s,0,7);g.arc(t.x-20*t.s,t.y-34*t.s,22*t.s,0,7);g.arc(t.x+20*t.s,t.y-34*t.s,22*t.s,0,7);g.fill();g.fillStyle='rgba(255,255,255,.12)';g.beginPath();g.arc(t.x-8*t.s,t.y-62*t.s,14*t.s,0,7);g.fill()}
function person(x,y,f,col,id,mine,mv,sy,ex,ps){g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,sy||y,24,7,0,0,7);g.fill();if(!mine)window.__BP=ex?{E:ex}:{};try{const o=mv?{mv:true,gait:1,cy:(fr*.035)%1,an:fr,ball:false,dr:[Math.abs(Math.cos(fr*.14)),6]}:{mv:false,gait:0,cy:0,an:fr,ball:false};if(ps){o.mv=false;o.gait=0;o.ps=ps}drawRigFig(g,x,y,SC,f,col,id,o)}catch(e){}window.__BP=null}
const RIDE={
 patines:{cr:8,ln:.14,tg:30,h:[[34,-70],[-14,-66]],f:(t,m)=>{const s=m?Math.sin(t*.3)*10:0;return[[16+s,0],[-14-s,0]]}},
 skate:{cr:10,ln:.06,tg:34,h:[[40,-68],[-26,-64]],f:()=>[[20,0],[-18,0]]},
 bici:{cr:20,ln:.26,tg:50,h:[[46,-84],[42,-80]],f:(t,m)=>{const a=m?t*.3:0;return[[8+Math.cos(a)*10,-8+Math.sin(a)*8],[8-Math.cos(a)*10,-8-Math.sin(a)*8]]}},
 moto:{cr:28,ln:.3,tg:46,h:[[52,-82],[46,-76]],f:()=>[[24,-12],[16,-12]]},
 coche:{cr:34,ln:.04,tg:34,h:[[30,-62],[26,-60]],f:()=>[[26,-4],[22,-4]]},
 ovni:{cr:36,ln:.04,tg:36,h:[[26,-58],[20,-56]],f:()=>[[24,-4],[20,-4]]}};
function rider(x,y,f,col,id,mine,V,mv,E){const R=RIDE[V.id],hh=(CH[id]&&CH[id].h)||1,lift=R.tg-(56-R.cr)*.55*hh;person(x,y-lift,f,col,id,mine,false,-9999,E,{ln:R.ln,cr:R.cr,h:R.h,f:R.f(fr,mv),b:null})}
function lamp(x,y,n){g.fillStyle='#2a2f3d';g.fillRect(x-3,y-90,6,90);g.fillRect(x-3,y-90,26,5);if(n>.2){g.save();g.globalCompositeOperation='lighter';const l=g.createRadialGradient(x+20,y-84,2,x+20,y-60,120);l.addColorStop(0,'rgba(255,230,150,.7)');l.addColorStop(1,'rgba(255,230,150,0)');g.fillStyle=l;g.fillRect(x-100,y-210,240,260);g.restore()}}
function skyTint(n){if(n<=0)return;g.setTransform(S*cv.width/W0,0,0,S*cv.width/W0,0,0);g.fillStyle=`rgba(8,12,44,${.5*n})`;g.fillRect(0,0,W0/S,VH)}
function draw(){const d=cv.width/W0,n=night();g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cv.width,cv.height);g.setTransform(S*d,0,0,S*d,-cx*S*d,-cy*S*d);
 ground(n);
 const vw=W0/S,L=[],vis=(x,y,m=200)=>x>cx-m&&x<cx+vw+m&&y>cy-m&&y<cy+VH+m+200;
 g.save();g.fillStyle='rgba(0,0,0,'+(.11*(1-n*.7))+')';for(const c of CLOUDS)if(vis(c.x,c.y,300)){g.beginPath();g.ellipse(c.x,c.y,230*c.s,90*c.s,0,0,7);g.ellipse(c.x+130*c.s,c.y+20,160*c.s,70*c.s,0,0,7);g.fill()}g.restore();
 for(const b of B)if(vis(b.x,b.y,320))L.push({y:b.y,f:()=>building(b,n)});
 for(const bf of BFS)if(vis(bf.x,bf.y,40)&&n<.7)L.push({y:bf.y+40,f:()=>{const w=Math.abs(Math.sin(fr*.4+bf.a*3));g.save();g.translate(bf.x,bf.y-30+Math.sin(bf.a)*10);g.fillStyle=`hsl(${bf.h},90%,62%)`;g.beginPath();g.ellipse(-5,0,6*w+1,8,-.4,0,7);g.ellipse(5,0,6*w+1,8,.4,0,7);g.fill();g.fillStyle='#222';g.fillRect(-1,-5,2,10);g.restore()}});
 for(const t of TREES)if(vis(t.x,t.y,60))L.push({y:t.y,f:()=>tree(t,n)});
 for(const l of[[1420,1010],[1420,2010],[2780,1010],[2780,2010],[1540,1470],[2660,1470],[1540,1700],[2660,1700],[800,1010],[3600,1010],[3600,2010],[800,2010]])if(vis(l[0],l[1],120))L.push({y:l[1],f:()=>lamp(l[0],l[1],n)});
 L.push({y:FOUNT.y,f:()=>{g.fillStyle='#9aa0b4';g.fillRect(FOUNT.x-12,FOUNT.y-70,24,70);g.fillStyle='#b6bccc';g.beginPath();g.ellipse(FOUNT.x,FOUNT.y-70,34,12,0,0,7);g.fill();g.strokeStyle='rgba(180,230,255,.85)';g.lineWidth=3;for(let i=0;i<6;i++){const a=i*1.05+fr*.01;g.beginPath();g.moveTo(FOUNT.x,FOUNT.y-76);g.quadraticCurveTo(FOUNT.x+Math.cos(a)*40,FOUNT.y-120+Math.sin(fr*.1+i)*6,FOUNT.x+Math.cos(a)*64,FOUNT.y-8);g.stroke()}}});
 L.push({y:BOARD.y,f:()=>{g.fillStyle='#6b4a2a';g.fillRect(BOARD.x-36,BOARD.y-60,6,60);g.fillRect(BOARD.x+30,BOARD.y-60,6,60);g.fillStyle='#e8d6a0';g.strokeStyle='#5a3a18';g.lineWidth=4;g.fillRect(BOARD.x-44,BOARD.y-100,88,50);g.strokeRect(BOARD.x-44,BOARD.y-100,88,50);g.fillStyle='#222';g.font='bold 10px "Press Start 2P",monospace';g.textAlign='center';g.fillText('MISIONES',BOARD.x,BOARD.y-80);g.fillText('📋',BOARD.x,BOARD.y-62);if(MIS.some((m,i)=>prog(i)>=m.n&&!bq().claim[i])){g.fillStyle='#ff3d3d';g.beginPath();g.arc(BOARD.x+40,BOARD.y-100,9,0,7);g.fill();g.fillStyle='#fff';g.fillText('!',BOARD.x+40,BOARD.y-96)}}});
 for(const hx of[COURT.x-COURT.w/2+24,COURT.x+COURT.w/2-24])L.push({y:COURT.y+COURT.h/2,f:()=>{g.fillStyle='#8a90a0';g.fillRect(hx-3,COURT.y-90,6,90);g.fillStyle='#fff';g.fillRect(hx-26,COURT.y-100,52,36);g.strokeStyle='#d23a3a';g.lineWidth=3;g.strokeRect(hx-12,COURT.y-86,24,18);g.strokeStyle='#ff7a1a';g.beginPath();g.ellipse(hx,COURT.y-62,12,4,0,0,7);g.stroke()}});
 L.push({y:CRASH.y,f:()=>{g.save();g.translate(CRASH.x,CRASH.y);g.rotate(-.25);ufo(0,-26,1.6);g.restore();g.save();g.globalCompositeOperation='lighter';const gl=g.createRadialGradient(CRASH.x,CRASH.y-20,4,CRASH.x,CRASH.y-20,140);gl.addColorStop(0,'rgba(125,255,90,.5)');gl.addColorStop(1,'rgba(125,255,90,0)');g.fillStyle=gl;g.fillRect(CRASH.x-150,CRASH.y-170,300,300);g.restore()}});
 for(const c of COINS)if(vis(c.x,c.y,40))L.push({y:c.y,f:()=>{const bob=Math.sin(fr*.1+c.t)*4;g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(c.x,c.y,10,4,0,0,7);g.fill();g.fillStyle='#ffd23d';g.strokeStyle='#8a5a00';g.lineWidth=3;g.beginPath();g.ellipse(c.x,c.y-26+bob,11,13,0,0,7);g.fill();g.stroke();g.fillStyle='#fff6a0';g.fillRect(c.x-2,c.y-33+bob,4,9)}});
 for(const q of NP)if(vis(q.x,q.y,100))L.push({y:q.y,f:()=>{const em=q.em,hp=em?Math.abs(Math.sin(em.t*.28))*14:0;if(em){g.save();g.translate(0,-hp)}person(q.x,q.y,q.f,q.col,q.id,0,q.mv);if(em){g.restore();const a=Math.min(1,em.t/8,(110-em.t)/10);g.save();g.globalAlpha=Math.max(0,a);g.fillStyle='#fff';g.strokeStyle='#222';g.lineWidth=2;g.beginPath();g.roundRect(q.x-20,q.y-172-hp,40,36,12);g.fill();g.stroke();g.font='24px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(em.e,q.x,q.y-153-hp);g.restore()}if(q.rival){g.font='20px sans-serif';g.textAlign='center';g.fillText('⚔',q.x,q.y-118+Math.sin(fr*.1)*3)}}});
 for(const u in ONL.peers){const p=ONL.peers[u];if(p.x!=null&&vis(p.dx,p.dy,200))L.push({y:p.dy,f:()=>peerDraw(p)})}
 L.push({y:P.y-1,f:drawTrail});
 L.push({y:P.y,f:()=>{const V=MNT?vs():null;if(!V){const X=emoXf();if(X){g.save();g.translate(P.x+X.dx,P.y);g.rotate(X.rot);g.scale(X.sx,X.sy);g.translate(-P.x,-P.y+X.dy)}person(P.x,P.y,P.f,CH[save.sel].jc,save.sel,1,P.mv&&!EM);if(X)g.restore();return}const hv=V.fly?16+Math.sin(fr*.08)*5:0,vy=P.y-hv;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(P.x,P.y,V.id==='coche'||V.id==='ovni'?70:V.id==='moto'?56:34,V.fly?9-hv*.1:8,0,0,7);g.fill();vUnder(g,V.id,P.x,vy,P.f,fr,P.mv);rider(P.x,vy,P.f,CH[save.sel].jc,save.sel,1,V,P.mv);vOver(g,V.id,P.x,vy,P.f,fr,P.mv)}});
 for(const c of CARS){const x=c.h?c.p:c.lane,y=c.h?c.lane:c.p;if(vis(x,y,200))L.push({y,f:()=>{if(c.h)carSide(g,x,y,c.d,c.c,fr*c.v*.4);else carFB(g,x,y,c.c,c.d<0);if(n>.3){g.save();g.globalCompositeOperation='lighter';const gl=g.createRadialGradient(x+(c.h?c.d*100:0),y-(c.h?22:-c.d*60+30),2,x+(c.h?c.d*100:0),y-22,90);gl.addColorStop(0,'rgba(255,240,170,.5)');gl.addColorStop(1,'rgba(255,240,170,0)');g.fillStyle=gl;g.fillRect(x-160,y-120,320,200);g.restore()}}})}
 L.sort((a,b)=>a.y-b.y).forEach(o=>o.f());drawEP();
 if(EM){const t=EM.t,sc=t<10?1+Math.sin(t/10*Math.PI)*.35:1,a=Math.min(1,(EM.T-t)/14),by=P.y-(MNT?210:178)-Math.sin(t*.12)*5;g.save();g.globalAlpha=Math.max(0,a);g.translate(P.x,by);g.scale(sc*Math.min(1,t/4+.2),sc*Math.min(1,t/4+.2));g.fillStyle='#fff';g.strokeStyle=EM.e.c;g.lineWidth=5;g.beginPath();g.roundRect(-34,-30,68,60,18);g.fill();g.stroke();g.beginPath();g.moveTo(-8,28);g.lineTo(0,44);g.lineTo(8,28);g.fill();g.font='42px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(EM.e.e,0,2);g.restore()}
 if(n>.3){g.save();g.globalCompositeOperation='lighter';for(const f of FFS)if(vis(f.x,f.y,20)){const r=7+Math.sin(fr*.08+f.a)*3,gl=g.createRadialGradient(f.x,f.y,0,f.x,f.y,r*2.4);gl.addColorStop(0,'rgba(220,255,120,'+(.8*Math.min(1,n))+')');gl.addColorStop(1,'rgba(220,255,120,0)');g.fillStyle=gl;g.fillRect(f.x-r*2.4,f.y-r*2.4,r*4.8,r*4.8)}g.restore()}
 if(bub){const t=LINES[bub.z.k][bub.say-1]||'¡Hola!';g.font='bold 13px system-ui,sans-serif';const w=Math.min(300,g.measureText(t).width+24),bx=bub.x-w/2,by=bub.y-150;g.fillStyle='rgba(255,255,255,.95)';g.strokeStyle='#222';g.lineWidth=2;g.beginPath();g.roundRect(bx,by,w,32,10);g.fill();g.stroke();g.fillStyle='#111';g.textAlign='center';g.textBaseline='middle';g.fillText(t,bub.x,by+16,w-16)}
 for(let i=pops.length-1;i>=0;i--){const p=pops[i];p.t++;g.globalAlpha=Math.max(0,1-p.t/40);g.fillStyle='#ffe45c';g.font='bold 20px "Press Start 2P",monospace';g.textAlign='center';g.fillText('+'+(p.v||20),p.x,p.y-p.t);g.globalAlpha=1;if(p.t>40)pops.splice(i,1)}
 skyTint(n);
 // minimapa
 g.setTransform(d,0,0,d,0,0);if(eflash>0){g.fillStyle='rgba(220,255,255,'+eflash/10+')';g.fillRect(0,0,W0,H0)}
 if(MAPBIG){g.fillStyle='rgba(4,6,20,.78)';g.fillRect(0,0,W0,H0)}
 drawMap(mapRect(),MAPBIG)}
function drawMap(m,big){const k=m.w/WW,X=x=>m.x+x*k,Y=y=>m.y+y*k;g.save();g.shadowColor='#000';g.shadowBlur=10;g.fillStyle='#2f7a3e';g.beginPath();g.roundRect(m.x,m.y,m.w,m.h,big?14:10);g.fill();g.restore();g.save();g.beginPath();g.roundRect(m.x,m.y,m.w,m.h,big?14:10);g.clip();
 g.fillStyle='#3b8a47';g.fillRect(m.x,m.y,m.w,m.h);for(const z of ZONES){g.fillStyle=z.c;g.fillRect(X(z.x),Y(z.y),z.w*k,z.h*k)}
 g.fillStyle='#3f4350';for(const r of ROADS)g.fillRect(X(r[0]),Y(r[1]),r[2]*k,r[3]*k);g.strokeStyle='#e8e4b0aa';g.lineWidth=Math.max(.6,k*8);g.setLineDash([k*40,k*40]);for(const r of ROADS){g.beginPath();if(r[2]>r[3]){g.moveTo(X(r[0]),Y(r[1]+r[3]/2));g.lineTo(X(r[0]+r[2]),Y(r[1]+r[3]/2))}else{g.moveTo(X(r[0]+r[2]/2),Y(r[1]));g.lineTo(X(r[0]+r[2]/2),Y(r[1]+r[3]))}g.stroke()}g.setLineDash([]);
 g.fillStyle='#4aa8ff';g.beginPath();g.ellipse(X(LAKE.x),Y(LAKE.y),LAKE.rx*k,LAKE.ry*k,0,0,7);g.fill();g.fillStyle='#c9803a';g.fillRect(X(COURT.x-COURT.w/2),Y(COURT.y-COURT.h/2),COURT.w*k,COURT.h*k);g.fillStyle='#7fd0ff';g.beginPath();g.arc(X(FOUNT.x),Y(FOUNT.y),FOUNT.r*k*.8,0,7);g.fill();
 g.fillStyle='#1f6a34';if(big)for(const t of TREES){g.beginPath();g.arc(X(t.x),Y(t.y),Math.max(1.2,k*26),0,7);g.fill()}
 for(const b of B){const bw=Math.max(4,b.w*k),bh=Math.max(3,(b.fh+b.rd)*k*.7);g.fillStyle=b.closed?'#8a8a94':b.c;g.fillRect(X(b.x)-bw/2,Y(b.y)-bh,bw,bh);g.strokeStyle=b.closed?'#5a5a64':'#ffd23d';g.lineWidth=1;g.strokeRect(X(b.x)-bw/2,Y(b.y)-bh,bw,bh)}
 g.fillStyle='#ffd23d';for(const c of COINS){g.beginPath();g.arc(X(c.x),Y(c.y),big?2.5:1.6,0,7);g.fill()}
 g.fillStyle='#5cff7a';g.strokeStyle='#000';g.lineWidth=1;for(const u in ONL.peers){const p=ONL.peers[u];if(p.x==null)continue;g.beginPath();g.arc(X(p.dx),Y(p.dy),big?4:2.6,0,7);g.fill();g.stroke()}
 for(const q of NP){g.fillStyle=q.rival?'#ff3d3d':'#cfe0ff';g.beginPath();g.arc(X(q.x),Y(q.y),q.rival?(big?3.4:2.4):(big?2:1.1),0,7);g.fill()}
 if(big){for(const z of ZONES){g.fillStyle='rgba(255,255,255,.55)';g.font='bold 13px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(z.e+' '+z.n,X(z.x+z.w/2),Y(z.y+z.h-70))}g.font='bold 9px system-ui,sans-serif';for(const b of B)if(!b.closed){const bx=X(b.x),by=Y(b.y)-(b.fh+b.rd)*k*.7;g.font='16px sans-serif';g.textAlign='center';g.textBaseline='bottom';g.fillText(b.e,bx,by);g.font='bold 9px system-ui,sans-serif';g.lineWidth=3;g.strokeStyle='#000c';g.strokeText(b.n,bx,Y(b.y)+11);g.fillStyle='#fff';g.fillText(b.n,bx,Y(b.y)+11)}g.font='16px sans-serif';g.fillText('⛲',X(FOUNT.x),Y(FOUNT.y));g.fillText('📋',X(BOARD.x),Y(BOARD.y));g.fillText('🛸',X(CRASH.x),Y(CRASH.y));g.fillText('🏀',X(COURT.x),Y(COURT.y))}
 else{g.font='9px sans-serif';g.textAlign='center';g.textBaseline='middle';for(const b of B)if(!b.closed&&b.e)g.fillText(b.e,X(b.x),Y(b.y)-(b.fh+b.rd)*k*.35)}
 g.strokeStyle='#fff';g.lineWidth=1.5;g.strokeRect(X(cx),Y(cy),W0/S*k,VH*k);
 const px=X(P.x),py=Y(P.y),pu=1+Math.sin(fr*.15)*.25;g.fillStyle='rgba(255,60,60,.35)';g.beginPath();g.arc(px,py,(big?9:6)*pu,0,7);g.fill();g.fillStyle='#ff3d3d';g.strokeStyle='#fff';g.lineWidth=1.5;g.beginPath();const a=big?7:5;g.moveTo(px+P.f*a,py);g.lineTo(px-P.f*a*.6,py-a*.8);g.lineTo(px-P.f*a*.6,py+a*.8);g.closePath();g.fill();g.stroke();
 g.restore();g.save();g.strokeStyle='#ffd23d';g.lineWidth=2;g.shadowColor='#ffd23d';g.shadowBlur=big?14:6;g.beginPath();g.roundRect(m.x,m.y,m.w,m.h,big?14:10);g.stroke();g.restore();
 if(!big){g.fillStyle='#fff';g.font='bold 9px system-ui,sans-serif';g.textAlign='center';g.textBaseline='top';g.fillText('🔍 toca · M',m.x+m.w/2,m.y+m.h+4)}
 else{g.fillStyle='#fff';g.textAlign='center';g.textBaseline='top';g.font='bold 12px system-ui,sans-serif';g.fillText('MAPA DEL BARRIO · toca para cerrar',W0/2,3);g.textBaseline='bottom';g.font='11px system-ui,sans-serif';g.fillText('🔴 Tú   ⚔ Retadores   🟡 Monedas   ▭ Tu vista',W0/2,H0-2)}}

// emotes en partido
let ECD=0;
function matchEmote(id){const e=EMOTES.find(q=>q.id===id);if(!e||typeof G==='undefined'||!G||!G.hu||G.mode==='end'||G.paused||Date.now()<ECD)return;ECD=Date.now()+2600;const p=G.hu;try{sfx('legend')}catch(x){}
 try{pop(p.x,p.y-330,e.e,'#ffffff',120);pop(p.x,p.y-250,e.n.toUpperCase(),e.c,34);burst(p.x,p.y-130,e.c,36,13);burst(p.x,p.y-200,'#ffffff',16,8);if(typeof fxRing==='function')fxRing(p.x,p.y,e.c,320,26);if(e.fx==='bolt'||e.fx==='dragon'||e.fx==='fire')flashFx(e.c)}catch(x){console.error(x)}}
function mkMatchEmo(){if($q('#gemo'))return;const w=document.createElement('div');w.id='gemo';w.innerHTML='<div id="gemr"></div><button class="btn small" id="gemb">😎</button>';document.body.appendChild(w);$q('#gemb').onclick=()=>$q('#gemr').classList.toggle('on');}
function gemRefresh(){const hd=$q('#hud'),on=hd&&!hd.classList.contains('hidden')&&typeof G!=='undefined'&&G&&G.mode!=='end';let w=$q('#gemo');if(on&&!w){mkMatchEmo();w=$q('#gemo')}if(!w)return;w.style.display=on?'flex':'none';if(!on)return;const E=emv(),r=$q('#gemr'),key=E.sel.join(',');if(r.dataset.k!==key){r.dataset.k=key;r.innerHTML=E.sel.map(id=>{const m=EMOTES.find(q=>q.id===id);return`<button class="btn small" data-i="${id}">${m.e}</button>`}).join('');r.querySelectorAll('button').forEach(b=>b.onclick=()=>{matchEmote(b.dataset.i);r.classList.remove('on')})}}
setInterval(()=>{try{gemRefresh()}catch(e){}},500);
addEventListener('keydown',e=>{if(run||typeof G==='undefined'||!G)return;if(/^Digit[5-8]$/.test(e.code)){const id=emv().sel[+e.code[5]-5];if(id)matchEmote(id)}});
window.EMO={list:EMOTES,play:matchEmote};
function loop(){if(!run)return;fr++;step();draw();raf=requestAnimationFrame(loop)}
const _rm=window.renderMenu;window.renderMenu=function(){if(BR.from){BR.from=0;open();return}return _rm.apply(this,arguments)};
const hook=()=>{const b=$q('#b-barrio');if(b)b.onclick=()=>{BR.from=0;open()}};
document.addEventListener('DOMContentLoaded',hook);if(document.readyState!=='loading')hook();
})();
