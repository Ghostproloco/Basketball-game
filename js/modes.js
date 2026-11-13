/* MODOS: Torre Infinita, Reto diario con racha, Torneo offline vs IA + botones de ataque/defensa */
(()=>{
const MM={cur:null,launching:0};window.MM=MM;
const DEFP=new Set(['MURALLA','CANDADO','GUARDIÁN','LADRÓN','POSTE','REBOTE']),DEFX=new Set(['MURALLA','CANDADO','REBOTE','FANTASMA']);
const M=()=>{const m=save.modes||(save.modes={});if(!m.tower)m.tower={best:0,run:null};if(!m.daily)m.daily={day:'',done:[0,0,0],streak:0,last:''};if(!m.tour)m.tour={trophies:0,cur:null,played:0};return m};
const dstr=d=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const yest=()=>dstr(new Date(Date.now()-864e5));
const seedRng=s=>{let a=0;for(const c of s)a=(Math.imul(a,31)+c.charCodeAt(0))>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}};
const shuf=(a,r)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pay=(c,g,why)=>{c=Math.max(0,Math.min(3500,c|0));g=Math.max(0,Math.min(14,g|0));save.coins+=c;store();if(g&&window.addGems)addGems(g,why);return{c,g}};
const bump=(p,k,n)=>{p.s[k]=Math.min(99,p.s[k]+n)};

/* ---------- lanzar partido ---------- */
function launch(diff,rv,apply,done){
 const me=save.owned[save.sel];if(!me)return;
 rv.col=rivalColor(CH[save.sel].jc,CH[rv.id].jc);
 MM.cur={done};MM.launching=1;window.NOPICK=1;
 try{show(null);startMatch(diff,rv);if(G&&apply)apply(G)}catch(e){MM.cur=null;console.error(e);renderMenu();toast('No se pudo empezar el partido')}
 finally{MM.launching=0;window.NOPICK=0}}
const _sm=window.startMatch;window.startMatch=function(){if(!MM.launching)MM.cur=null;return _sm.apply(this,arguments)};
const _s3=window.startMatch3;if(_s3)window.startMatch3=function(){MM.cur=null;return _s3.apply(this,arguments)};
const _em=window.endMatch;
window.endMatch=function(){const g=G,cur=MM.cur;const r=_em.apply(this,arguments);
 if(cur&&g&&!g.dend&&!g.net){MM.cur=null;const w=g.s[0]>g.s[1];setTimeout(()=>{try{cur.done(w,g)}catch(e){console.error(e);renderMenu()}},1150)}
 return r};

/* ---------- panel ---------- */
let mm=null;
function ensure(){if(mm)return mm;mm=document.createElement('section');mm.id='mm';mm.className='screen hidden';document.body.appendChild(mm);
 mm.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b&&ACT[b.dataset.a]){try{sfx('card')}catch(_){}ACT[b.dataset.a](b.dataset.v)}});return mm}
function view(html){ensure();mm.innerHTML=html;$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');show('#mm');try{musicPlay('menu')}catch(e){}}
const toMenu=()=>{G=null;$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');renderMenu()};
const head=(t,back)=>`<div class="mmh"><button class="btn small" data-a="${back||'hub'}">◀ VOLVER</button><div class="mmt">${t}</div><div class="mmc">🪙 ${save.coins} · 💎 ${save.gems||0}</div></div>`;

const ACT={};
ACT.hub=()=>{if(!ACT.rank&&window.RANK)setTimeout(()=>{},0);const m=M(),d=daily(),dn=d.done.filter(Boolean).length,tr=m.tower.run;
 view(`<div class="mmh"><button class="btn small" data-a="menu">◀ MENÚ</button><div class="mmt">🎮 MODOS DE JUEGO</div><div class="mmc">🪙 ${save.coins} · 💎 ${save.gems||0}</div></div>
 <div class="mmg">
  <button class="mmcard tw" data-a="tower"><i>🗼</i><b>TORRE INFINITA</b><small>Sube pisos, elige mejoras. ¡Récord piso ${m.tower.best}!</small>${tr?`<span class="mmb">PISO ${tr.f} · ${'❤'.repeat(tr.lives)}</span>`:''}</button>
  <button class="mmcard dy" data-a="daily"><i>📅</i><b>RETO DIARIO</b><small>3 retos al día · Racha 🔥 ${m.daily.streak}</small><span class="mmb">${dn}/3 HECHOS</span></button>
  <button class="mmcard rkc" data-a="rank"><i>🏅</i><b>RANKEADO</b><small>Liga, trofeos y top mundial</small><span class="mmb">${window.RANK?RANK.LG[RANK.lgOf(RANK.R().t)].n+' · '+RANK.R().t+'🏆':''}</span></button>
  <button class="mmcard tn" data-a="tour"><i>🏆</i><b>TORNEO</b><small>8 jugadores contra la IA · Trofeos ${m.tour.trophies}</small>${m.tour.cur?'<span class="mmb">EN CURSO</span>':''}</button>
 </div>`)};
ACT.menu=toMenu;

/* ================= TORRE INFINITA ================= */
const PK={
 mun:{e:'🎯',n:'Muñeca de oro',d:'+12 PUNTERÍA',f:(G,p)=>bump(p,'tir',12)},
 sal:{e:'🦘',n:'Resortes',d:'+12 AL ARO (mates)',f:(G,p)=>bump(p,'mat',12)},
 mur:{e:'🛡',n:'Muralla',d:'+12 MURO (defensa)',f:(G,p)=>bump(p,'def',12)},
 man:{e:'🌀',n:'Manos de seda',d:'+12 MANEJO',f:(G,p)=>bump(p,'reg',12)},
 gar:{e:'🧲',n:'Garra',d:'+12 GARRA (rebotes)',f:(G,p)=>bump(p,'reb',12)},
 vel:{e:'⚡',n:'Zapatillas turbo',d:'+10% velocidad',f:(G,p)=>{p.spd*=1.1}},
 tie:{e:'⏱',n:'Prórroga',d:'+10 s por partido',f:G=>{G.t+=10}},
 cal:{e:'🔥',n:'Calentón',d:'Empiezas ganando 4-0',f:G=>{G.s[0]+=4;$('#sL').textContent=G.s[0]}},
 hie:{e:'🧊',n:'Rival congelado',d:'El rival pierde un 6% a todo',f:(G,p,o)=>{for(const k of SK)o.s[k]=Math.round(o.s[k]*.94);o.spd*=.97}},
 vid:{e:'❤',n:'Vida extra',d:'+1 vida ahora mismo',inst:1},
 bot:{e:'💰',n:'Botín',d:'+50% monedas al acabar',pass:1}};
const tRival=f=>{const diff=f<4?0:f<10?1:2,boss=f%5===0;let pool=CH.filter(c=>c.id!=save.sel&&!c.hide&&(boss?c.rar>=2:c.rar<=Math.min(3,Math.floor(f/4))));if(!pool.length)pool=CH.filter(c=>c.id!=save.sel&&!c.hide);
 const c=pool[rnd()*pool.length|0];return{diff,boss,rv:{id:c.id,lvl:Math.min(30,1+Math.floor(f*1.3)+(boss?3:0)),st:Math.min(5,Math.floor(f/3)+(boss?1:0))}}};
ACT.tower=()=>{const m=M(),T=m.tower;let r=T.run;
 if(r&&r.pend){r.pend=0;r.lives--;toast('Abandonaste el partido: pierdes una vida');if(r.lives<=0){return towerEnd()}store()}
 r=T.run;
 if(!r){view(`${head('🗼 TORRE INFINITA')}<div class="mmbody"><p>Sube piso a piso. Cada partido dura <b>60 segundos</b> y el rival es más fuerte. Tras cada victoria eliges <b>1 de 3 mejoras</b> que se quedan toda la subida. Cada 5 pisos hay un <b>JEFE</b>.<br>Tienes <b>2 vidas</b>: si pierdes una, repites el piso.</p><div class="mmrec">🏅 Récord: piso ${T.best}</div><button class="btn main" data-a="towerNew">🗼 EMPEZAR</button></div>`);return}
 const nx=r.nx||(r.nx=tRival(r.f));store();
 view(`${head('🗼 TORRE · PISO '+r.f)}<div class="mmbody"><div class="mmrow"><span class="mmlife">${'❤'.repeat(r.lives)||'💀'}</span><span class="mmrec">🏅 Récord ${T.best}</span></div>
 <div class="mmperks">${r.perks.length?r.perks.map(k=>`<span title="${PK[k].d}">${PK[k].e}</span>`).join(''):'<small>Sin mejoras todavía</small>'}</div>
 <div class="mmnext">${nx.boss?'<b class="boss">☠ ¡JEFE DEL PISO!</b>':'<b>PRÓXIMO RIVAL</b>'}<div class="mmrv">${cardHTML(nx.rv.id,{lvl:nx.rv.lvl,st:nx.rv.st,mul:SKL[nx.diff].stat},CH[nx.rv.id].jc)}</div></div>
 <div class="mmbtns"><button class="btn main" data-a="towerGo">▶ JUGAR PISO ${r.f}</button><button class="btn ghost" data-a="towerQuit">🏳 RENDIRSE</button></div></div>`)};
ACT.towerNew=()=>{M().tower.run={f:1,lives:2,perks:[],nx:null,pend:0};store();ACT.tower()};
ACT.towerQuit=()=>towerEnd();
ACT.towerGo=()=>{const r=M().tower.run,nx=r.nx;r.pend=1;store();
 launch(nx.diff,Object.assign({},nx.rv),G=>{const p=G.P[0],o=G.P[1];G.t=60;for(const k of r.perks)if(PK[k].f)PK[k].f(G,p,o);
   if(r.f>14){const f=1+.012*(r.f-14);for(const k of SK)o.s[k]=Math.min(99,Math.round(o.s[k]*f))}
   if(nx.boss)setTimeout(()=>{try{msg('☠ ¡JEFE DEL PISO '+r.f+'!',110)}catch(e){}},400)},
  (w,g)=>{const r2=M().tower.run;if(!r2)return toMenu();r2.pend=0;
   if(w){M().tower.best=Math.max(M().tower.best,r2.f);r2.f++;r2.nx=null;store();return towerPerk()}
   r2.lives--;store();if(r2.lives<=0)return towerEnd();
   view(`${head('💔 PISO PERDIDO')}<div class="mmbody"><div class="mmres bad">${g.s[0]} - ${g.s[1]}</div><p>Pierdes una vida. Te quedan <b>${'❤'.repeat(r2.lives)}</b>. Repites el piso ${r2.f}.</p><button class="btn main" data-a="tower">🔁 REINTENTAR</button></div>`)})};
function towerPerk(){const r=M().tower.run,keys=Object.keys(PK).filter(k=>!(PK[k].pass&&r.perks.includes(k)));
 const opt=shuf(keys,Math.random).slice(0,3);
 view(`${head('🎁 ¡PISO SUPERADO!','tower')}<div class="mmbody"><p class="mmwin">Subes al piso <b>${r.f}</b>. Elige una mejora:</p><div class="mmopts">${opt.map(k=>`<button class="mmopt" data-a="perk" data-v="${k}"><i>${PK[k].e}</i><b>${PK[k].n}</b><small>${PK[k].d}</small></button>`).join('')}</div></div>`)}
ACT.perk=k=>{const r=M().tower.run;if(!r||!PK[k])return;if(PK[k].inst)r.lives=Math.min(4,r.lives+1);else r.perks.push(k);store();ACT.tower()};
function towerEnd(){const T=M().tower,r=T.run;T.run=null;const f=r?r.f-1:0,bonus=r&&r.perks.includes('bot')?1.5:1;
 const rw=f>0?pay(f*50*bonus,Math.floor(f/4),'Torre'):{c:0,g:0};T.best=Math.max(T.best,f);store();
 view(`${head('🗼 FIN DE LA SUBIDA','hub')}<div class="mmbody"><div class="mmres">${f}</div><p>Pisos superados. Récord: <b>${T.best}</b>.</p><p class="mmwin">+${rw.c} 🪙 ${rw.g?`· +${rw.g} 💎`:''}</p><button class="btn main" data-a="towerNew">🗼 OTRA SUBIDA</button></div>`)}

/* ================= RETO DIARIO ================= */
const CH_E=[['Gana un partido',(s,x)=>x.w],['Mete 2 triples',(s)=>s.tpm>=2],['Anota 14 puntos',s=>s.pts>=14],['Roba 2 balones',s=>s.stl>=2],['Consigue 2 mates',s=>s.dnk>=2]];
const CH_M=[['Gana y mete 3 triples',(s,x)=>x.w&&s.tpm>=3],['Gana sin encajar más de 12',(s,x)=>x.w&&x.r<=12],['Mete 4 mates',s=>s.dnk>=4],['Pon 2 tapones y gana',(s,x)=>x.w&&s.blk>=2],['Anota 22 puntos',s=>s.pts>=22]];
const CH_H=[['Gana por 12 o más',(s,x)=>x.w&&x.m>=12],['Gana sin encajar más de 8',(s,x)=>x.w&&x.r<=8],['Gana con 3 triples y 3 mates',(s,x)=>x.w&&s.tpm>=3&&s.dnk>=3],['Anota 30 puntos',s=>s.pts>=30],['Roba 4 balones y gana',(s,x)=>x.w&&s.stl>=4]];
const REW=[[300,0],[600,2],[1000,4]];
function daily(){const D=M().daily,t=dstr();if(D.last&&D.last!==t&&D.last!==yest())D.streak=0;if(D.day!==t){D.day=t;D.done=[0,0,0]}return D}
function dailyList(){const r=seedRng('GH'+dstr());return[CH_E,CH_M,CH_H].map((L,i)=>{const k=Math.floor(r()*L.length);return{i,t:L[k][0],f:L[k][1],tier:i}})}
ACT.daily=()=>{const D=daily(),L=dailyList(),n=D.done.filter(Boolean).length;store();
 view(`${head('📅 RETO DIARIO')}<div class="mmbody"><div class="mmrow"><span class="mmstreak">🔥 Racha: <b>${D.streak}</b> día${D.streak===1?'':'s'}</span><span class="mmrec">Hoy ${n}/3</span></div>
 <p class="mmsm">Completa al menos 1 reto cada día para mantener la racha. Más racha = más premio (+ 💎 el día 7, 14, 21…).</p>
 <div class="mmch">${L.map(c=>`<div class="mmc3 t${c.tier}${D.done[c.i]?' ok':''}"><div class="mmct">${['FÁCIL','MEDIO','DIFÍCIL'][c.tier]}</div><b>${c.t}</b><small>Premio: ${REW[c.tier][0]} 🪙${REW[c.tier][1]?' + '+REW[c.tier][1]+' 💎':''}</small>${D.done[c.i]?'<span class="mmdone">✅ HECHO</span>':`<button class="btn main small" data-a="dgo" data-v="${c.i}">▶ JUGAR</button>`}</div>`).join('')}</div>
 ${n===3?'<p class="mmwin">🎉 ¡Todos completados! Vuelve mañana.</p>':''}</div>`)};
ACT.dgo=i=>{i=+i;const c=dailyList()[i];if(!c)return;const rv=pickRival(c.tier);
 launch(c.tier,rv,null,(w,g)=>{const s=g.P[0].gs,x={w,r:g.s[1],m:g.s[0]-g.s[1]};let ok=false;try{ok=!!c.f(s,x)}catch(e){}
  const D=daily();let html='';
  if(ok&&!D.done[i]){D.done[i]=1;const first=D.done.filter(Boolean).length===1;let c0=REW[i][0],g0=REW[i][1],extra='';
   if(first&&D.last!==dstr()){D.streak=(D.last===yest()?D.streak:0)+1;D.last=dstr();c0+=Math.min(D.streak,10)*100;if(D.streak%7===0)g0+=5;extra=`<p>🔥 Racha de ${D.streak} día${D.streak===1?'':'s'}: +${Math.min(D.streak,10)*100} 🪙${D.streak%7===0?' +5 💎':''}</p>`}
   if(D.done.every(Boolean)){c0+=500;g0+=3;extra+='<p>🎉 ¡Los 3 retos! Bonus +500 🪙 +3 💎</p>'}
   const rw=pay(c0,g0,'Reto diario');html=`<p class="mmwin">+${rw.c} 🪙 ${rw.g?`· +${rw.g} 💎`:''}</p>${extra}`}
  else if(ok)html='<p>Ya tenías este reto completado.</p>';
  store();
  view(`${head(ok?'✅ ¡RETO CUMPLIDO!':'❌ RETO NO CUMPLIDO','daily')}<div class="mmbody"><div class="mmres ${ok?'':'bad'}">${g.s[0]} - ${g.s[1]}</div><p>${c.t}</p>${html}<div class="mmbtns">${ok?'':`<button class="btn main" data-a="dgo" data-v="${i}">🔁 REINTENTAR</button>`}<button class="btn" data-a="daily">RETOS</button></div></div>`)})};

/* ================= TORNEO OFFLINE ================= */
const RN=['CUARTOS','SEMIS','FINAL'];
const ovrS=s=>{try{return ovrOf(s)}catch(e){return 60}};
function tourNew(){const pool=CH.filter(c=>!c.hide&&c.id!=save.sel&&c.rar<=3),r=Math.random,ai=shuf(pool,r).slice(0,7).map(c=>({id:c.id,lvl:3+(r()*6|0),st:r()*3|0})),me=save.owned[save.sel];
 const sl=shuf([{id:save.sel,lvl:me.lvl,st:me.st,me:1}].concat(ai),r);M().tour.cur={r:0,s:sl,R:[sl.map((_,i)=>i)],out:0};M().tour.played++;store()}
const pw=i=>{const T=M().tour.cur,s=T.s[i];return Math.pow(ovrS(statsOf(s.id,s.lvl,s.st,1)),3)};
function tourAdvance(win){const T=M().tour.cur,cur=T.R[T.r],my=cur.findIndex(i=>T.s[i].me),nxt=[];
 for(let k=0;k<cur.length;k+=2){const a=cur[k],b=cur[k+1];let w;if(k===(my&~1)){w=win?cur[my]:cur[my^1]}else{const pa=pw(a),pb=pw(b);w=Math.random()<pa/(pa+pb)?a:b}nxt.push(w)}
 T.R.push(nxt);T.r++;if(!win)T.out=1;store()}
const tourPrize=T=>{const champ=T.R.length===4&&T.R[3].length===1&&T.s[T.R[3][0]].me,stage=T.r;
 if(champ)return[2500,8];if(T.out)return[[150,0],[500,1],[1000,2]][Math.min(2,T.r-1)];return[0,0]};
ACT.tour=()=>{const t=M().tour;if(!t.cur){view(`${head('🏆 TORNEO')}<div class="mmbody"><p>8 jugadores, eliminatorias de 1 contra 1 contra la IA. <b>Cuartos, semis y final</b>. Juegas con tu jugador seleccionado. Cada ronda es más dura.</p><div class="mmrec">🏆 Trofeos: ${t.trophies}</div><p class="mmsm">Premios: cuartos 150 🪙 · semis 500 🪙 + 1 💎 · final 1000 🪙 + 2 💎 · ¡CAMPEÓN 2500 🪙 + 8 💎 y trofeo!</p><button class="btn main" data-a="tourNew">🏆 EMPEZAR TORNEO</button></div>`);return}
 const T=t.cur,done=T.R.length===4,cur=T.R[T.r]||T.R[3];
 const chip=(i,r,c)=>{const s=T.s[i],alive=T.R[r+1]?T.R[r+1].includes(i):(r===3||(T.R[r].includes(i)&&!T.out)),lost=T.R[r+1]&&!T.R[r+1].includes(i);return`<div class="tc${s.me?' me':''}${lost?' lost':''}" style="--c:${CH[s.id].jc}"><b>${s.me?'TÚ':CH[s.id].name}</b></div>`};
 const cols=[0,1,2,3].map(r=>T.R[r]?`<div class="tcol"><small>${r<3?RN[r]:'🏆'}</small>${T.R[r].map(i=>chip(i,r)).join('')}</div>`:`<div class="tcol"><small>${r<3?RN[r]:'🏆'}</small>${'<div class="tc empty">?</div>'.repeat([8,4,2,1][r])}</div>`).join('');
 const champ=done&&T.s[T.R[3][0]].me,over=T.out||done;
 let btn;if(over){const pz=tourPrize(T);btn=`<button class="btn main" data-a="tourEnd">${champ?'🏆 ¡RECLAMAR COPA! ('+pz[0]+' 🪙 +'+pz[1]+' 💎)':'RECLAMAR '+pz[0]+' 🪙'+(pz[1]?' +'+pz[1]+' 💎':'')}</button>`}
 else{const my=cur.findIndex(i=>T.s[i].me),op=T.s[cur[my^1]];btn=`<p class="mmsm">Tu rival: <b>${CH[op.id].name}</b> (nv ${op.lvl})</p><button class="btn main" data-a="tourGo">▶ JUGAR ${RN[T.r]}</button><button class="btn ghost small" data-a="tourQuit">ABANDONAR</button>`}
 view(`${head('🏆 TORNEO · '+(champ?'¡CAMPEÓN!':T.out?'ELIMINADO':RN[T.r]))}<div class="mmbody"><div class="tbr">${cols}</div><div class="mmbtns">${btn}</div></div>`)};
ACT.tourNew=()=>{tourNew();ACT.tour()};
ACT.tourQuit=()=>{M().tour.cur=null;store();ACT.tour()};
ACT.tourGo=()=>{const T=M().tour.cur,cur=T.R[T.r],my=cur.findIndex(i=>T.s[i].me),op=T.s[cur[my^1]],diff=T.r===0?0:T.r===1?1:2;
 launch(diff,{id:op.id,lvl:op.lvl+T.r*2,st:Math.min(5,op.st+T.r)},G=>{G.t=90},(w,g)=>{if(!M().tour.cur)return toMenu();tourAdvance(w);
  view(`${head(w?'✅ ¡PASAS DE RONDA!':'❌ ELIMINADO','tour')}<div class="mmbody"><div class="mmres ${w?'':'bad'}">${g.s[0]} - ${g.s[1]}</div><button class="btn main" data-a="tour">VER CUADRO</button></div>`)})};
ACT.tourEnd=()=>{const t=M().tour,T=t.cur;if(!T)return ACT.hub();const champ=T.R.length===4&&T.s[T.R[3][0]].me,pz=tourPrize(T);if(champ)t.trophies++;t.cur=null;const rw=pay(pz[0],pz[1],'Torneo');
 view(`${head(champ?'🏆 ¡CAMPEÓN!':'🏁 TORNEO TERMINADO','hub')}<div class="mmbody"><div class="mmres">${champ?'🏆':'🏁'}</div><p class="mmwin">+${rw.c} 🪙 ${rw.g?`· +${rw.g} 💎`:''}</p>${champ?`<p>Trofeos: <b>${t.trophies}</b></p>`:''}<button class="btn main" data-a="tourNew">🏆 OTRO TORNEO</button><button class="btn" data-a="hub">MODOS</button></div>`)};

window.MMX={launch,ACT,view,head,pay,M,toMenu,shuf};
/* ---------- entrada ---------- */
const bm=document.getElementById('b-modes');if(bm)bm.onclick=()=>{M();ACT.hub()};
window.openModes=()=>{M();ACT.hub()};

/* ---------- botones de ataque / defensa ---------- */
function phase(){const B=G.B,h=G.hu;if(!h)return null;const t=h.t;if(B.h)return B.h.t===t?'atk':'def';if(B.ps&&B.ps.from)return B.ps.from.t===t?'atk':'def';if(B.last)return B.last.t===t?'atk':'def';return null}
let lastPh=null;
setInterval(()=>{try{const c=document.getElementById('controls');if(!c)return;
 if(typeof G==='undefined'||!G||!G.P||G.tut||G.mode==='end'||G.mode==='intro'||c.classList.contains('hidden')){c.removeAttribute('data-ph');c.classList.remove('mmhx','mmhp');lastPh=null;return}
 const ph=phase()||lastPh;if(!ph)return;lastPh=ph;c.dataset.ph=ph;const w=CH[G.hu.id].pw;
 c.classList.toggle('mmhp',ph==='atk'?DEFP.has(w):!DEFP.has(w));c.classList.toggle('mmhx',ph==='atk'?DEFX.has(w):!DEFX.has(w))}catch(e){}},90);

/* ---------- red de seguridad: si algo falla en pleno partido, el juego se recupera solo ---------- */
{const _t=window.tick;let bad=0,rec=0,okFr=0,stallT=0,lastFr=-1,zeroN=0;
 window.tick=function(){try{const r=_t.apply(this,arguments);if(bad>0&&++okFr>60){bad=0;okFr=0}return r}catch(e){
  if(!bad)console.error('tick',e);okFr=0;bad++;
  if(bad===4&&typeof G!=='undefined'&&G&&G.P&&G.B&&G.mode!=='end'){rec++;try{const B=G.B,tm=B.h?B.h.t:0;G.paused=false;for(const p of G.P){p.st='idle';p.tt=0;p.z=0;p.vx=p.vy=0;p.frz=0;p.slow=0;p.cd=20}B.fl=B.dk=B.ps=null;B.rim=null;B.net=false;B.vx=B.vy=B.vz=0;G.mode='play';G.mt=0;G.slow=0;inbound(1-tm);msg('¡REANUDAMOS!',70);
    if(rec>=3&&G.s[0]!==G.s[1])endMatch()}catch(e2){console.error('recover',e2)}}
  if(bad>400&&G&&G.mode!=='end'){try{endMatch()}catch(e3){}bad=0}}};
 /* vigilante: tiempo agotado y el partido no acaba */
 setInterval(()=>{try{if(typeof G==='undefined'||!G||!G.P||G.paused||G.mode==='end'||G.net){zeroN=0;lastFr=-1;stallT=0;return}
  if(G.t<=0&&G.mode==='play'&&G.s[0]!==G.s[1]){if(++zeroN>=5){zeroN=0;try{sfx('buzz')}catch(e){}endMatch()}}else zeroN=0;
  const vis=!document.hidden&&!document.getElementById('pause').classList.contains('hidden')===false;
  if(G.fr===lastFr&&vis&&G.mode!=='intro'&&!G.tut){if(++stallT>=4){stallT=0;G.mode='play';G.mt=0;G.slow=0;try{inbound(0)}catch(e){}}}else stallT=0;lastFr=G.fr}catch(e){}},1000)}
/* pausa: el botón REANUDAR responde también al soltar el dedo */
{const r=document.getElementById('p-res');if(r)r.addEventListener('pointerup',e=>{e.preventDefault();if(typeof G!=='undefined'&&G&&G.paused)pauseOff()})}
})();
