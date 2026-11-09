// ===== EVENTO: INVASIÓN ALIEN (3 aliens, ticket para conseguir al pívot alienígena) =====
(()=>{
const A=[71,75,76],COL='#58d63a',WID=67;
const css=document.createElement('style');css.textContent=`
#event{justify-content:flex-start;align-items:stretch;padding:0;overflow:hidden;font-family:system-ui,sans-serif;color:#eaffea;background:radial-gradient(circle at 50% 0%,#1d5a2acc,#050a12f5 70%),#04070d}
#event .evbg{position:absolute;inset:0;pointer-events:none;overflow:hidden}
#event .evbg i{position:absolute;width:3px;height:3px;border-radius:50%;background:#bfffc4;box-shadow:0 0 6px #7dff5a;animation:twk 2.4s infinite ease-in-out}
@keyframes twk{0%,100%{opacity:.15;transform:scale(.6)}50%{opacity:1;transform:scale(1.4)}}
#event .ufo{position:absolute;top:8%;left:-10%;font-size:44px;filter:drop-shadow(0 0 14px #7dff5a);animation:ufo 14s linear infinite}
@keyframes ufo{0%{left:-12%;top:12%;transform:rotate(-6deg)}50%{top:20%;transform:rotate(6deg)}100%{left:108%;top:10%;transform:rotate(-6deg)}}
.evh{position:relative;z-index:3;flex:none;display:flex;align-items:center;gap:10px;padding:max(8px,env(safe-area-inset-top)) 12px 8px;background:linear-gradient(#050a12f2,#050a12b0);border-bottom:2px solid #2e7a3a}
.evh .evt{flex:1;font:11px 'Press Start 2P',monospace;color:#7dff5a;text-shadow:0 0 10px #7dff5a88;animation:glw 2s infinite}
@keyframes glw{50%{text-shadow:0 0 18px #7dff5a}}
.evh .evtk{font:10px 'Press Start 2P',monospace;color:#ffd23d;border:2px solid #ffd23d66;border-radius:12px;padding:6px 10px;background:#1b1a05}
.evbody{position:relative;z-index:2;flex:1;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch;padding:12px;display:flex;flex-direction:column;gap:12px;touch-action:pan-y!important}
.evcrew{display:flex;gap:10px;justify-content:center;align-items:flex-end}
.eval{flex:1;max-width:150px;text-align:center;border:2px solid #3fb24f;border-radius:16px;padding:8px 4px 6px;background:linear-gradient(#0f2a15,#08140c);box-shadow:0 0 16px #58d63a55;animation:fl 3s infinite ease-in-out}
.eval:nth-child(2){animation-delay:.6s}.eval:nth-child(3){animation-delay:1.2s}
@keyframes fl{50%{transform:translateY(-6px)}}
.eval img{height:84px;image-rendering:pixelated;filter:drop-shadow(0 0 10px #7dff5a)}
.eval b{display:block;font-size:11px;margin-top:2px}.eval small{color:#9be6a4;font-size:10px}
.evcard{background:linear-gradient(160deg,#0f2a15,#08140c);border:2px solid #2e7a3a;border-radius:16px;padding:12px;font-size:13px;line-height:1.5}
.evcard h3{font:9px 'Press Start 2P',monospace;color:#ffd23d;margin-bottom:8px}
.evcard li{margin-left:16px;margin-bottom:4px}
.evbtns{display:flex;gap:10px;flex-wrap:wrap}.evbtns .btn{flex:1 1 200px}
.evprize{display:flex;gap:12px;align-items:center}.evprize img{height:110px;image-rendering:pixelated;filter:drop-shadow(0 0 14px #7dff5a);animation:fl 2.6s infinite}
#evrw{position:fixed;inset:0;z-index:260;display:none;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:radial-gradient(circle,#1d6a2aee,#020508fa 75%);color:#fff;font-family:'Press Start 2P',monospace;text-align:center;padding:16px}
#evrw.on{display:flex;animation:fin .5s}@keyframes fin{from{opacity:0}}
#evrw .mph{position:relative;height:min(46vh,300px);aspect-ratio:1/1}#evrw .mph img{position:absolute;inset:0;margin:auto;height:100%;image-rendering:pixelated;filter:drop-shadow(0 0 20px #7dff5a)}
#evrw .mph img.a{animation:mp1 3.2s infinite}#evrw .mph img.b{animation:mp2 3.2s infinite}
@keyframes mp1{0%,40%{opacity:1;transform:scale(1)}50%,90%{opacity:0;transform:scale(1.4) rotate(6deg)}100%{opacity:1}}
@keyframes mp2{0%,40%{opacity:0;transform:scale(.7)}50%,90%{opacity:1;transform:scale(1.05)}100%{opacity:0}}
#evrw h2{font-size:14px;color:#7dff5a;text-shadow:0 0 14px #7dff5a}#evrw p{font:13px system-ui,sans-serif;max-width:420px;line-height:1.5}
`;document.head.appendChild(css);
const sec=document.createElement('section');sec.id='event';sec.className='screen hidden';document.body.appendChild(sec);
const rw=document.createElement('div');rw.id='evrw';document.body.appendChild(rw);
const stars=Array.from({length:40},()=>`<i style="left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${(Math.random()*2.4).toFixed(2)}s"></i>`).join('');
const img=(id)=>figImg(id,CH[id].jc);
function render(){const own=!!save.owned[WID],tk=save.tk||0;
 sec.innerHTML=`<div class="evbg">${stars}<div class="ufo">🛸</div></div>
 <div class="evh"><button class="btn small" data-e="back">◀ VOLVER</button><div class="evt">👽 INVASIÓN ALIEN</div><div class="evtk">🎟 <b>${tk}</b></div></div>
 <div class="evbody">
  <div class="evcrew">${A.map(i=>`<div class="eval"><img src="${img(i)}"><b>${CH[i].name.split(' ')[0]}</b><small>${CH[i].title}</small></div>`).join('')}</div>
  <div class="evcard"><h3>⚔ EL RETO</h3><ul><li>Juega un <b>3 vs 3</b> contra los 3 aliens. Son <b>MUY difíciles</b>: rápidos, con poderes y casi no fallan.</li><li>Si los vences consigues un <b>🎟 TICKET DEL EVENTO</b> (la primera vez).</li><li>El ticket se canjea por <b>Víctor Wamba</b>, el pívot alienígena. ¡Solo se consigue aquí!</li><li>Usa a tus mejores jugadores y sus poderes. Consejo: ¡el equipo importa!</li></ul></div>
  <div class="evcard evprize"><img src="${img(WID)}"><div><h3>🎁 PREMIO: ${CH[WID].name.toUpperCase()}</h3>Se transforma en <b>ALIEN</b> por unos segundos: más grande, más rápido y mete <b>mates desde muy lejos y hasta de espaldas</b>. Ficha de Pívot con defensa y rebote de otro planeta.${own?'<br><b style="color:#7dff5a">✅ ¡Ya lo tienes!</b>':''}</div></div>
  <div class="evbtns"><button class="btn main" data-e="play">⚔ ENFRENTAR A LOS ALIENS</button>${own?'':`<button class="btn ${tk?'main':''}" data-e="redeem" ${tk?'':'disabled style="opacity:.45"'}>🎟 CANJEAR TICKET${tk?'':' (0)'}</button>`}</div>
 </div>`}
window.openEvent=()=>{render();show('#event')};
sec.addEventListener('click',e=>{const b=e.target.closest('[data-e]');if(!b)return;const k=b.dataset.e;
 if(k==='back')renderMenu();else if(k==='play')play();else if(k==='redeem')redeem()});
function play(){while(TEAMS.length&&TEAMS[TEAMS.length-1].evt)TEAMS.pop();
 TEAMS.push({name:'ALIENS',col:COL,ids:A.slice(),ovr:96,evt:1});curTeam=TEAMS.length-1;curMode=3;show(null);window.NOPICK=1;try{startMatch3()}finally{window.NOPICK=0}
 if(!G)return;G.ev=1;G.stx=3;G.diff=2;G.t=150;for(const p of G.P)if(p.t===1){p.s=Object.fromEntries(SK.map(k=>[k,Math.min(99,p.s[k]+6)]))}}
function redeem(){if(!(save.tk>0)||save.owned[WID])return;save.tk--;save.owned[WID]={lvl:1,st:0};store();
 rw.innerHTML=`<div class="mph"><img class="a" src="${img(WID)}"><img class="b" src="${img(72)}"></div><h2>🛸 ¡${CH[WID].name.toUpperCase()}!</h2><p>${CH[WID].title}. Desbloqueado para tu colección.<br>Poder: <b>FORMA ALIEN</b> · Habilidad: <b>MATE ALIENÍGENA</b></p><button class="btn main" id="evrw-ok">¡INCREÍBLE!</button>`;
 rw.classList.add('on');try{sfx('legend')}catch(e){}$('#evrw-ok').onclick=()=>{rw.classList.remove('on');render()}}
/* resultado del evento */
const _em=endMatch;endMatch=function(){const g=G,ev=g&&g.ev,w=g&&g.s[0]>g.s[1];const r=_em.apply(this,arguments);
 if(ev){while(TEAMS.length&&TEAMS[TEAMS.length-1].evt)TEAMS.pop();curTeam=0;let m;
  if(w){if(!save.evWon){save.evWon=1;save.tk=(save.tk||0)+1;m='🎟 ¡HAS GANADO UN TICKET DEL EVENTO!<br>Canjéalo en el evento por Víctor Wamba'}else{save.coins+=500;m='👽 ¡Otra vez a los aliens! +500 🪙'}}else m='👽 Los aliens te han vencido... ¡inténtalo otra vez!';
  save.evPlays=(save.evPlays||0)+1;store();setTimeout(()=>{const e=$('#eC');if(e)e.innerHTML+='<br><b style="color:#7dff5a">'+m+'</b>'},1100)}
 return r};
const _rm=renderMenu;renderMenu=function(){while(TEAMS.length&&TEAMS[TEAMS.length-1].evt)TEAMS.pop();_rm.apply(this,arguments);try{const t=$('#evtk');if(t)t.textContent=save.tk||0}catch(e){}};
$('#b-event').onclick=()=>window.openEvent();
const bg=$('#m2bg');if(bg){const E=['🏀','⭐','👽','🏆','💎','🔥','🛸','🏀'];bg.insertAdjacentHTML('afterbegin',E.map((x,i)=>`<i style="left:${6+i*12}%;font-size:${22+(i*7)%26}px;animation-duration:${14+(i*5)%12}s;animation-delay:-${(i*3)%14}s">${x}</i>`).join(''))}
})();
