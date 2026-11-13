/* PASE DE TEMPORADA NAVIDEÑO 2026: 30 niveles, pista gratis + premium, árbol que se decora, nieve, luces y auroras */
(()=>{
const W=window.WARD;if(!W||!window.OUTF)return;
const END=Date.UTC(2026,11,26,22,59,59),SID='navidad26',PREM=150,PERL=100,MAXL=30;
/* ---------- ropa navideña (índices nuevos al final del armario) ---------- */
const O0=OUTF.length,I=(n,r,o)=>Object.assign({n,r,slot:'j',lim:1},o);
W.PAL.sw={a:'#bfe3ff',b:'#ffffff',c:'#e0f7ff',o:'#5b8db8',k:'#aee6ff',glow:'#9be7ff'};
W.ACC.santa=(g,u,f)=>{g.save();g.scale(u,u);const w=Math.sin(f*.1)*3;g.fillStyle='#d4141c';g.strokeStyle='#4a0508';g.lineWidth=2;g.beginPath();g.moveTo(-17,4);g.quadraticCurveTo(-15,-22,4,-26);g.quadraticCurveTo(18+w,-26,22+w,-10);g.lineTo(17,4);g.closePath();g.fill();g.stroke();g.fillStyle='#fff';g.beginPath();g.roundRect(-20,-1,40,10,5);g.fill();g.stroke();g.beginPath();g.arc(22+w,-10,6,0,7);g.fill();g.stroke();g.restore()};
W.ACC.antlers=(g,u,f)=>{for(const s of[-1,1]){g.save();g.scale(s*u*1.5,u*1.5);g.strokeStyle='#5a3a1c';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(8,2);g.quadraticCurveTo(13,-14,10,-30);g.moveTo(11,-12);g.lineTo(23,-18);g.moveTo(11,-22);g.lineTo(20,-32);g.stroke();g.strokeStyle='#8a5a2c';g.lineWidth=2;g.stroke();g.restore()}};
W.ACC.sgoggles=(g,u,f)=>{g.save();g.scale(u,u);g.fillStyle='#0b2a44';g.strokeStyle='#bfe3ff';g.lineWidth=2;g.shadowColor='#9be7ff';g.shadowBlur=8;g.beginPath();g.roundRect(-22,54,44,13,6);g.fill();g.stroke();const x=((f*1.1)%46)-23;g.fillStyle='#e0f7ff99';g.fillRect(Math.max(-20,x),57,7,7);g.restore()};
W.ACC.swings=(g,u,f)=>{W.wingShape(g,u,f,W.PAL.sw,-1);W.wingShape(g,u,f,W.PAL.sw,1)};
W.BACK.add('swings');W.WING.add('swings');W.FACE.add('sgoggles');
OUTF.push(
 I('Gorro de Santa',1,{slot:'h',acc:'santa',bn:{pas:3,agu:2}}),
 I('Gafas de Nieve',1,{slot:'f',acc:'sgoggles',c:'#9be7ff',bn:{tir:3,reg:2}}),
 I('Cuernos de Reno',2,{slot:'h',acc:'antlers',bn:{vel:4,agu:3}}),
 I('Camiseta Navidad',2,{col:'#b91c1c',pat:3,pc:'#ffffff',fx:'spark',c:'#fff3b0',bn:{tir:4,pas:4,reg:2}}),
 I('Capa Polar',2,{slot:'b',acc:'cape',cc:'#bfdbfe',bn:{vel:4,def:3}}),
 I('Alas de Nieve',3,{slot:'b',acc:'swings',fx:'spark',c:'#9be7ff',bn:{agu:5,def:4,vel:4}}),
 I('Traje Aurora Polar',3,{slot:'z',col:'#0b3b66',pat:11,pc:'#7dfcd0',acc:'swings',fx:'orbit',em:['❄','✨'],c:'#7dfcd0',bn:{vel:6,tir:6,def:5,agu:6,mat:4},perk:'❄ Tus tiros dejan estela de aurora'}));
const OI={santa:O0,gog:O0+1,ant:O0+2,jer:O0+3,cape:O0+4,wing:O0+5,suit:O0+6};
/* ---------- Nicolás Polar (leyenda parodia) ---------- */
const NID=CH.length;
CH.push({id:NID,name:'Nicolás Polar',title:'Guardián de la Nochebuena',rar:3,arch:'all',pos:'PF',h:1.3,wd:1.18,pw:'VENTISCA',hd:60,jc:'#c81e2b',hide:1,
 base:{vel:84,tir:92,mat:90,reg:86,def:92,pas:94,reb:90,agu:96}});
Object.assign(RCOL,{VENTISCA:'#bfe9ff'});Object.assign(PWN,{VENTISCA:'VENTISCA'});Object.assign(SKLBL,{VENTISCA:'❄<br>ESCARCHA'});
L2.pw.VENTISCA=(p,c)=>{c.cd(20000);rageStart(p,'¡VENTISCA POLAR!');p.fire=3;for(const q of G.P)if(q.t!==p.t&&q.st!=='dunk'){q.frz=110;pop(q.x,q.y-260,'❄ CONGELADO','#bfe9ff',30);fxRing(q.x,q.y,'#bfe9ff',230,24)}for(let i=0;i<30;i++)burst(p.x+(Math.random()-.5)*500,p.y-100-Math.random()*200,'#e0f7ff',3,8)};
L2.sk.VENTISCA=(p,n,B,has)=>{if(!has){pop(p.x,p.y-260,'NECESITAS EL BALÓN','#aaa',24);return}p.skT=n+8000;doShoot(p);if(p.st==='shoot'){p.fire=3;p.fade=1;pop(p.x,p.y-290,'¡ESCARCHA!','#bfe9ff',38);fxRing(p.x,p.y,'#bfe9ff',250,24)}};
/* ---------- recompensas: [nivel]: {f:gratis, p:premium} ---------- */
const C=n=>({c:n}),Gm=n=>({g:n}),O=i=>({o:i});
const RW={};for(let l=1;l<=MAXL;l++)RW[l]={f:C(100+l*20),p:C(200+l*30)};
Object.assign(RW,{
 3:{f:C(300),p:Gm(2)},5:{f:Gm(2),p:C(800)},6:{f:C(250),p:O(OI.jer)},8:{f:O(OI.santa),p:Gm(3)},10:{f:Gm(3),p:C(1500)},12:{f:C(500),p:Gm(3)},
 14:{f:O(OI.gog),p:C(1200)},15:{f:Gm(4),p:Gm(5)},16:{f:C(600),p:O(OI.cape)},20:{f:O(OI.ant),p:Gm(6)},22:{f:C(800),p:C(2000)},
 24:{f:Gm(5),p:O(OI.wing)},25:{f:C(1000),p:Gm(8)},28:{f:Gm(6),p:O(OI.suit)},30:{f:C(2500),p:{ch:NID}}});
const rd=r=>r.c?{i:'🪙',t:r.c+' 🪙'}:r.g?{i:'💎',t:r.g+' 💎'}:r.o!=null?{i:['🎅','🥽','🦌','👕','🧣','🪽','🌌'][r.o-O0],t:OUTF[r.o].n,big:1}:{i:'🎅',t:CH[r.ch].name,big:1,leg:1};
const SP=()=>{let s=save.sp;if(!s||s.id!==SID)s=save.sp={id:SID,xp:0,claimed:{},prem:0};return s};
const lvOf=x=>Math.min(MAXL,Math.floor(x/PERL)+1);
/* ---------- XP ---------- */
let lvUp=0;
function xp(n){const s=SP(),a=lvOf(s.xp);s.xp=Math.min(MAXL*PERL,s.xp+Math.max(0,n|0));const b=lvOf(s.xp);store();if(b>a){lvUp=b;try{SND.play('levelup')}catch(e){}if(typeof toast==='function')toast('🎄 ¡Pase navideño nivel '+b+'!')}}
const _em=window.endMatch;
window.endMatch=function(){const g=G;if(g&&!g.__spx&&g.s&&g.mode!=='end'){g.__spx=1;const w=g.s[0]>g.s[1];try{xp((w?70:30)+(g.net&&w?25:0))}catch(e){}}return _em.apply(this,arguments)};
/* ---------- reclamar ---------- */
function give(r){if(r.c){save.coins+=Math.min(3500,r.c)}if(r.g)addGems(Math.min(14,r.g),'Pase');if(r.o!=null){(save.oo||(save.oo={}))[r.o]=(save.oo[r.o]||0)+1}if(r.ch!=null){if(window.grantChar)grantChar(CH[r.ch])}store()}
function claim(l,t){const s=SP(),k=l+t;if(!reached(l)||s.claimed[k]||(t==='p'&&!s.prem))return;s.claimed[k]=1;give(RW[l][t]);try{SND.play('claim')}catch(e){}pop2(RW[l][t])}
const reached=l=>SP().xp>=(l-1)*PERL;
/* ---------- interfaz ---------- */
let el=null,raf=0,cv,cx,fl=[],au=0,reduce=false;try{reduce=matchMedia('(prefers-reduced-motion:reduce)').matches}catch(e){}
const cd=()=>{const d=END-Date.now();if(d<=0)return'TERMINADA';const D=Math.floor(d/864e5),H=Math.floor(d%864e5/36e5);return D+' d '+H+' h'};
function ensure(){if(el)return el;el=document.createElement('section');el.id='sp';el.className='screen hidden';document.body.appendChild(el);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-sp]');if(!b)return;const a=b.dataset.sp;if(a==='back'){stop();renderMenu()}else if(a==='buy')buy();else if(a==='claim')claim(+b.dataset.l,b.dataset.t),draw(1);else if(a==='all')claimAll(),draw(1);else if(a==='go'){const sc=el.querySelector('.sptr');if(sc)sc.scrollTo({left:Math.max(0,(lvOf(SP().xp)-2)*118),behavior:'smooth'})}});return el}
function claimAll(){const s=SP();let n=0;for(let l=1;l<=MAXL;l++)for(const t of['f','p']){if(reached(l)&&!s.claimed[l+t]&&(t==='f'||s.prem)){s.claimed[l+t]=1;give(RW[l][t]);n++}}if(n){try{SND.play('claim')}catch(e){}confetti(60);toast('🎁 '+n+' recompensas reclamadas')}}
function buy(){const s=SP();if(s.prem)return;if((save.gems||0)<PREM){toast('Necesitas '+PREM+' 💎');try{SND.play('buzz')}catch(e){}return}save.gems-=PREM;s.prem=1;store();try{SND.play('legend')}catch(e){}confetti(120);draw(1)}
function treeSVG(l){const pts=[];for(let i=0;i<MAXL;i++){const r=i/MAXL,y=24+r*150,half=10+r*52,x=100+((i*37)%100/100-.5)*2*half;pts.push([x,y])}
 const cols=['#ff3b3b','#ffd23d','#4fc3ff','#ff7ad9','#7dfcd0'];
 return`<svg viewBox="0 0 200 215" class="sptree"><defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fa24f"/><stop offset="1" stop-color="#0d4a26"/></linearGradient></defs><rect x="92" y="180" width="16" height="30" fill="#6b3f1d"/>${[0,1,2].map(i=>`<path d="M100 ${10+i*45} L${100-35-i*20} ${70+i*45} L${100+35+i*20} ${70+i*45}Z" fill="url(#tg)" stroke="#07301a" stroke-width="2"/>`).join('')}<path d="M100 2l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="${l>=MAXL?'#fff27a':'#8a7a2a'}" class="${l>=MAXL?'spstar':''}"/>${pts.slice(0,l).map((p,i)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.6" fill="${cols[i%5]}" stroke="#fff8" stroke-width="1" class="spo" style="animation-delay:${(i%7)*.3}s"/>`).join('')}</svg>`}
function card(l,t){const s=SP(),r=RW[l][t],d=rd(r),ok=reached(l),got=s.claimed[l+t],lock=t==='p'&&!s.prem;
 return`<div class="spc${d.big?' big':''}${d.leg?' leg':''}${got?' got':''}${ok?' ok':''}${t==='p'?' prem':''}" ><i>${d.i}</i><b>${d.t}</b>${got?'<u>✔</u>':lock?'<u>🔒</u>':ok?`<button data-sp="claim" data-l="${l}" data-t="${t}">¡RECLAMAR!</button>`:'<u class="dim">·</u>'}</div>`}
function draw(keep){ensure();const s=SP(),l=lvOf(s.xp),into=s.xp>=MAXL*PERL?PERL:s.xp%PERL,pend=[];for(let i=1;i<=MAXL;i++)for(const t of['f','p'])if(reached(i)&&!s.claimed[i+t]&&(t==='f'||s.prem))pend.push(1);
 const sc=keep&&el.querySelector('.sptr'),sl=sc?sc.scrollLeft:0;
 el.innerHTML=`<canvas id="spc"></canvas><div class="splights">${'<i></i>'.repeat(26)}</div>
 <div class="sph"><button class="btn small" data-sp="back">◀ MENÚ</button><div class="spt"><small>PASE DE TEMPORADA</small><b>NAVIDAD 2026</b></div><div class="spg">💎 ${save.gems||0}<br><small>⏳ ${cd()}</small></div></div>
 <div class="spmain"><div class="sptw">${treeSVG(l)}<div class="splv">NIVEL <b>${l}</b></div></div>
  <div class="spinfo"><div class="spx"><i style="width:${into/PERL*100}%"></i><span>${into} / ${PERL} XP</span></div><p>Gana XP jugando: victoria +70 · derrota +30 · online +25. Cada nivel decora el árbol 🎄</p>
  <div class="spbt">${s.prem?'<span class="sppm">👑 PREMIUM ACTIVO</span>':`<button class="btn main sppb" data-sp="buy">👑 PASE PREMIUM · ${PREM} 💎</button>`}${pend.length?`<button class="btn" data-sp="all">🎁 RECLAMAR TODO (${pend.length})</button>`:''}<button class="btn ghost small" data-sp="go">📍 MI NIVEL</button></div></div></div>
 <div class="sptr"><div class="spl"><span class="sprl">GRATIS</span><span class="sprl pr">PREMIUM</span></div>${Array.from({length:MAXL},(_,i)=>i+1).map(n=>`<div class="spcol${n===l?' cur':''}${n>l?' lk':''}"><em>${n}</em>${card(n,'f')}${card(n,'p')}</div>`).join('')}</div>`;
 cv=el.querySelector('#spc');cx=cv.getContext('2d');rs();if(sc||keep){const t=el.querySelector('.sptr');if(t)t.scrollLeft=sl}else{const t=el.querySelector('.sptr');if(t)t.scrollLeft=Math.max(0,(l-2)*118)}}
function rs(){if(!cv)return;cv.width=innerWidth;cv.height=innerHeight}
/* aurora + nieve en 3 capas */
function fx(t){if(!el||el.classList.contains('hidden')){raf=0;return}raf=requestAnimationFrame(fx);if(!cx)return;const w=cv.width,h=cv.height;cx.clearRect(0,0,w,h);
 const g=cx.createLinearGradient(0,0,0,h);g.addColorStop(0,'#04102e');g.addColorStop(.6,'#0a2a4a');g.addColorStop(1,'#10304a');cx.fillStyle=g;cx.fillRect(0,0,w,h);
 if(!reduce){cx.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const gr=cx.createLinearGradient(0,0,w,0),c=['#2affb0','#5b8cff','#c05bff'][k];gr.addColorStop(0,'#0000');gr.addColorStop(.5,c+'55');gr.addColorStop(1,'#0000');cx.fillStyle=gr;cx.beginPath();cx.moveTo(0,h*.1);for(let x=0;x<=w;x+=24)cx.lineTo(x,h*(.16+k*.07)+Math.sin(x*.004+t*.0006*(k+1)+k)*h*.06);for(let x=w;x>=0;x-=24)cx.lineTo(x,h*(.42+k*.05)+Math.sin(x*.003+t*.0005+k*2)*h*.07);cx.fill()}cx.globalCompositeOperation='source-over'}
 if(!fl.length)for(let i=0;i<130;i++)fl.push({x:Math.random()*w,y:Math.random()*h,z:Math.random(),p:Math.random()*6});
 for(const f of fl){const sp=.4+f.z*1.6;if(!reduce){f.y+=sp;f.x+=Math.sin(t*.001+f.p)*.5*sp}if(f.y>h+5){f.y=-5;f.x=Math.random()*w}cx.globalAlpha=.35+f.z*.6;cx.fillStyle='#fff';cx.beginPath();cx.arc(f.x,f.y,.8+f.z*2.4,0,7);cx.fill()}cx.globalAlpha=1;
 /* confeti */
 for(let i=cf.length-1;i>=0;i--){const c=cf[i];c.x+=c.vx;c.y+=c.vy;c.vy+=.18;c.r+=c.vr;c.life--;if(c.life<=0||c.y>h+20){cf.splice(i,1);continue}cx.save();cx.translate(c.x,c.y);cx.rotate(c.r);cx.fillStyle=c.c;cx.fillRect(-4,-2,8,4);cx.restore()}
 if(lvUp){confetti(90);lvUp=0}}
const cf=[];function confetti(n){if(!cv)return;const C=['#ff3b3b','#ffd23d','#4fc3ff','#7dfcd0','#fff','#ff7ad9'];for(let i=0;i<n;i++)cf.push({x:cv.width/2+(Math.random()-.5)*200,y:cv.height*.4,vx:(Math.random()-.5)*14,vy:-Math.random()*13-2,r:0,vr:(Math.random()-.5)*.4,c:C[i%6],life:140})}
function pop2(r){const d=rd(r);confetti(r.o!=null||r.ch!=null?110:36);toast('🎁 '+d.t)}
function stop(){cancelAnimationFrame(raf);raf=0}
function open(){ensure();SP();const a=document.querySelector('#hud'),b=document.querySelector('#controls');if(a)a.classList.add('hidden');if(b)b.classList.add('hidden');draw();show('#sp');try{musicPlay('menu');SND.play('open')}catch(e){}if(!raf)raf=requestAnimationFrame(fx);addEventListener('resize',rs)}
window.SEASON={open,xp,lv:()=>lvOf(SP().xp),SP,NID,OI,END};
})();
