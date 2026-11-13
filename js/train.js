/* ENTRENAMIENTO Y EVOLUCIÓN: puntos por jugar, árbol de 3 ramas, 3 evoluciones con aura y súper poder */
(()=>{
const BR=[{k:'o',n:'OFENSIVA',c:'#ff7a3c',i:'🔥'},{k:'d',n:'DEFENSA',c:'#4fc3ff',i:'🛡'},{k:'f',n:'FÍSICO',c:'#7dfc9a',i:'💪'}];
const ND={
 o:[{n:'Muñeca de Seda',d:'+3 TIRO',b:{tir:3}},{n:'Manos de Mago',d:'+3 MATE · +3 PASE',b:{mat:3,pas:3}},{n:'Balón Pegado',d:'+5 MANEJO',b:{reg:5}},{n:'Mano Caliente',d:'+4 TIRO · 2 canastas seguidas = tiros en llamas 🔥',b:{tir:4},x:'hot'}],
 d:[{n:'Brazos Largos',d:'+3 DEFENSA',b:{def:3}},{n:'Escalador',d:'+4 REBOTE',b:{reb:4}},{n:'Manos de Ladrón',d:'+4 DEF · +3 VEL',b:{def:4,vel:3}},{n:'Muro de Hielo',d:'+3 DEF · no te congelan ni electrizan 🧊',b:{def:3},x:'wall'}],
 f:[{n:'Piernas de Muelle',d:'+3 VELOCIDAD',b:{vel:3}},{n:'Pulmones de Acero',d:'+5 AGUANTE',b:{agu:5}},{n:'Turbo Infinito',d:'+2 VEL · turbo casi sin gasto ⚡',b:{vel:2},x:'turbo'},{n:'Escudo de Energía',d:'+4 AGUANTE · nunca te cansas 💫',b:{agu:4},x:'shield'}]};
const COST=[1,2,3,4],EV=[{n:'DESPERTAR',nodes:3,coins:800,b:3,c:'#7dd3fc',d:'+3 a todo · aura brillante'},{n:'ASCENSO',nodes:7,coins:2500,b:6,c:'#c084fc',d:'+6 a todo · estrellas orbitando · poder dura +4 s'},{n:'FORMA SUPREMA',nodes:11,coins:6000,b:10,c:'#ffd23d',d:'+10 a todo · SÚPER PODER: al usar tu poder congela al rival y tiras en llamas'}];
const T=id=>{const t=save.tr||(save.tr={});return t[id]||(t[id]={xp:0,pts:0,n:{},evo:0})};
const nn=t=>Object.keys(t.n).filter(k=>t.n[k]).length;
const has=(t,k)=>!!t.n[k];
function addXp(id,n){if(!save.owned||!save.owned[id])return;const t=T(id),a=Math.floor(t.xp/100);t.xp+=n;const b=Math.floor(t.xp/100);if(b>a)t.pts+=b-a;store()}
/* ---------- XP de partidos y duplicados ---------- */
const _em=window.endMatch;
window.endMatch=function(){const g=typeof G!=='undefined'?G:null;if(g&&!g.__trx&&g.s&&g.mode!=='end'){g.__trx=1;try{const w=g.s[0]>g.s[1],seen=new Set();for(const p of g.P.concat(Object.values(g.bn||{}).filter(q=>q.pl)))if(p.t===0&&!seen.has(p.id)){seen.add(p.id);addXp(p.id,w?60:25)}}catch(e){}}return _em.apply(this,arguments)};
const _gc=window.grantChar;if(_gc)window.grantChar=function(c){const r=_gc.apply(this,arguments);try{if(r&&(r.star||r.coins)){T(c.id).pts+=r.star?3:2;store()}}catch(e){}return r};
/* ---------- bonos en partido (solo tu jugador; no en duelo online) ---------- */
const bonus=(id)=>{const t=T(id),o={},ev=EV.slice(0,t.evo).reduce((a,e)=>a+e.b,0);for(const b of BR)ND[b.k].forEach((nd,i)=>{if(has(t,b.k+i))for(const s in nd.b)o[s]=(o[s]||0)+nd.b[s]});if(ev)for(const s of['vel','tir','mat','reg','def','pas','reb','agu'])o[s]=(o[s]||0)+ev;return o};
const _mk=window.mkP;
window.mkP=function(t,id){const p=_mk.apply(this,arguments);try{if(t===0&&!window.__duelMk&&save.tr&&save.tr[id]){const o=bonus(id);for(const s in o)p.s[s]=Math.min(99,p.s[s]+o[s]);p.spd=(4.5+p.s.vel*.04)*(CH[id].pw==='TITÁN'?.82:1);const tt=save.tr[id];p.tr={evo:tt.evo,hot:has(tt,'o3'),wall:has(tt,'d3'),turbo:has(tt,'f2'),shield:has(tt,'f3')}}}catch(e){}return p};
/* efectos activos */
let last=[0,0],streak=0;
setInterval(()=>{try{const g=typeof G!=='undefined'?G:null;if(!g||!g.P||g.mode!=='play'||g.paused)return;
 if(g.s[0]>last[0]){streak++;}if(g.s[1]>last[1])streak=0;last=[g.s[0],g.s[1]];
 for(const p of g.P){if(p.t!==0||!p.tr)continue;
  if(p.tr.turbo&&p.sprint&&p.stam<100)p.stam=Math.min(100,p.stam+2.4);
  if(p.tr.shield){p.tired=false;if(p.stam<30)p.stam=30}
  if(p.tr.wall&&p.frz>0)p.frz=0;
  if(p.tr.hot&&streak>=2&&!(p.fire>0)){p.fire=2;streak=0;try{pop(p.x,p.y-290,'🔥 MANO CALIENTE','#ff7a3c',34)}catch(e){}}}
 }catch(e){}},80);
const _rs=window.rageStart;
window.rageStart=function(p){const r=_rs.apply(this,arguments);try{if(p&&p.t===0&&p.tr&&p.tr.evo>=2)p.rage+=4000;if(p&&p.t===0&&p.tr&&p.tr.evo>=3){p.fire=3;for(const q of G.P)if(q.t!==p.t&&q.st!=='dunk'){q.frz=70;fxRing(q.x,q.y,'#ffd23d',230,24)}fxRing(p.x,p.y,'#ffd23d',420,30);G.shake=Math.max(G.shake||0,34);burst(p.x,p.y-90,'#ffd23d',40,14);pop(p.x,p.y-340,'★ FORMA SUPREMA ★','#ffd23d',44)}}catch(e){}return r};
/* aura según evolución */
const L=typeof L2!=="undefined"?L2:null,_ov=L&&L.over;
if(L)L.over=function(g,p,sc){_ov.apply(this,arguments);if(p.t!==0||!p.tr||!p.tr.evo||typeof G==='undefined'||!G||G.mode==='end'||window.__duelMk)return;const e=p.tr.evo,H=210*sc*(CH[p.id].h||1),x=p.x,y=p.y-p.z,f=G.fr,c=EV[e-1].c;
 g.save();g.globalCompositeOperation='lighter';const r=g.createRadialGradient(x,y-H*.5,H*.08,x,y-H*.5,H*(.55+e*.12));r.addColorStop(0,c+'00');r.addColorStop(.65,c+(e===3?'66':'38'));r.addColorStop(1,c+'00');g.fillStyle=r;g.fillRect(x-H,y-H*1.5,H*2,H*1.8);
 if(e>=2){g.fillStyle=c+'cc';for(let i=0;i<4+e;i++){const a=f*.05+i*(6.283/(4+e)),rx=x+Math.cos(a)*H*.48,ry=y-H*.55+Math.sin(a*1.2)*H*.3;g.beginPath();for(let k=0;k<10;k++){const rr=k%2?4:10,t=k*.628+f*.06;g.lineTo(rx+Math.cos(t)*rr,ry+Math.sin(t)*rr)}g.closePath();g.fill()}}
 if(e>=3){g.fillStyle=c+'55';for(let i=0;i<5;i++){const a=f*.03+i*1.257;g.save();g.translate(x,y-H*.55);g.rotate(a);g.fillRect(H*.3,-2.5,H*.55,5);g.restore()}g.fillRect(x-H*.05,y-H*2,H*.1,H*2)}
 g.restore()};
/* ---------- interfaz ---------- */
let el=null,sel=null;
const owned=()=>Object.keys(save.owned||{}).map(Number).filter(i=>CH[i]).sort((a,b)=>(T(b).evo-T(a).evo)||(CH[b].rar-CH[a].rar)||a-b);
function ensure(){if(el)return el;el=document.createElement('section');el.id='tr';el.className='screen hidden';document.body.appendChild(el);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-tr]');if(!b)return;const a=b.dataset.tr,v=b.dataset.v;if(a==='back'){renderMenu()}else if(a==='pick'){sel=+v;draw()}else if(a==='buy')buy(v,b);else if(a==='evo')evolve()})
 return el}
function reqNode(t,k,i){return i===0||has(t,k+(i-1))}
function buy(v,b){const t=T(sel),k=v[0],i=+v[1];if(has(t,v)||!reqNode(t,k,i)||t.pts<COST[i]){try{SND.play('buzz')}catch(e){}return}t.pts-=COST[i];t.n[v]=1;store();try{SND.play('levelup')}catch(e){}draw(v)}
function evolve(){const t=T(sel),e=EV[t.evo];if(!e||nn(t)<e.nodes||save.coins<e.coins){try{SND.play('buzz')}catch(e){}return}save.coins-=e.coins;t.evo++;store();try{SND.play('evolve')}catch(e){}
 const o=document.createElement('div');o.className='tro';o.style.setProperty('--c',e.c);o.innerHTML=`<div class="trof"></div><div class="trop">${portrait(sel)}</div><b>¡EVOLUCIÓN ${['I','II','III'][t.evo-1]}!</b><small>${e.n}</small>${'<i></i>'.repeat(18)}`;el.appendChild(o);setTimeout(()=>{o.remove();draw()},2800)}
function draw(flash){ensure();const ids=owned();if(sel==null||!save.owned[sel])sel=(save.owned[save.sel]?save.sel:ids[0]);const c=CH[sel],t=T(sel),nx=EV[t.evo],evc=t.evo?EV[t.evo-1].c:'#6b7a8f';
 const ok=nx&&nn(t)>=nx.nodes&&save.coins>=nx.coins;
 el.innerHTML=`<div class="trh"><button class="btn small" data-tr="back">◀ MENÚ</button><div class="trt">🏋 ENTRENAMIENTO</div><div class="trc">🪙 ${save.coins} · <b>${t.pts}</b> PTS</div></div>
 <div class="trs">${ids.map(i=>`<div class="trch${i===sel?' on':''}" data-tr="pick" data-v="${i}" style="--rc:${RAR[CH[i].rar].c}">${portrait(i,.5)}<em>${'★'.repeat(T(i).evo)||'·'}</em></div>`).join('')}</div>
 <div class="trm"><div class="trhero" style="--ec:${evc}"><div class="trpt${t.evo?' ev'+t.evo:''}">${portrait(sel)}</div><b>${c.name}</b><div class="trst">${[0,1,2].map(i=>`<span class="${i<t.evo?'on':''}">★</span>`).join('')}</div><div class="trxp"><i style="width:${t.xp%100}%"></i><span>${t.xp%100}/100 XP → +1 PTS</span></div><small>Gana XP jugando (+60 victoria, +25 derrota). Los repetidos de sobres dan puntos.</small>
  ${nx?`<button class="btn main trevo${ok?' rdy':''}" data-tr="evo" style="--ec:${nx.c}">✨ EVOLUCIÓN ${['I','II','III'][t.evo]} · ${nx.coins} 🪙<br><small>${nn(t)}/${nx.nodes} nodos · ${nx.d}</small></button>`:'<div class="trmax">★ FORMA SUPREMA ALCANZADA ★</div>'}</div>
  <div class="trtree">${BR.map(b=>`<div class="trbr" style="--bc:${b.c}"><h4>${b.i} ${b.n}</h4>${ND[b.k].map((nd,i)=>{const k=b.k+i,got=has(t,k),av=!got&&reqNode(t,b.k,i),aff=av&&t.pts>=COST[i];return`<div class="trn${got?' got':av?' av':' lk'}${aff?' aff':''}${flash===k?' pop':''}" data-tr="buy" data-v="${k}"><i>${got?'✔':i+1}</i><b>${nd.n}</b><small>${nd.d}</small>${got?'':`<u>${COST[i]} PTS</u>`}</div>`}).join('')}</div>`).join('')}</div></div>`}
function open(id){ensure();if(id!=null&&save.owned[id])sel=id;const a=document.querySelector('#hud'),b=document.querySelector('#controls');if(a)a.classList.add('hidden');if(b)b.classList.add('hidden');draw();show('#tr');try{musicPlay('menu');SND.play('open')}catch(e){}}
window.TRAIN={open,addXp,T,bonus,EV};
})();
