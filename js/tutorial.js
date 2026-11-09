// ===== TUTORIAL GUIADO por Karusso: solo puedes tocar lo que él te indica =====
(()=>{
const KID=65;
const css=document.createElement('style');css.textContent=`
#tut{position:fixed;inset:0;z-index:240;display:none;pointer-events:none;font-family:system-ui,sans-serif}
#tut.on{display:block}
#tut .tring{position:fixed;border-radius:18px;border:3px solid #ffd23d;box-shadow:0 0 0 4000px #000a,0 0 22px #ffd23d;pointer-events:none;transition:all .35s cubic-bezier(.2,1.2,.3,1);animation:tpl 1s infinite}
#tut .tring.none{box-shadow:0 0 0 4000px #0007;border-color:transparent;animation:none;width:0!important;height:0!important}
@keyframes tpl{50%{border-color:#fff}}
#tut .tbub{position:fixed;left:50%;top:max(8px,env(safe-area-inset-top));transform:translateX(-50%);width:min(560px,92vw);display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:18px;background:linear-gradient(160deg,#1c2468f8,#0a0e38f8);border:3px solid #ffd23d;box-shadow:0 8px 30px #000a;color:#fff;pointer-events:auto;animation:tin .4s cubic-bezier(.2,1.3,.4,1)}
#tut .tbub.low{top:auto;bottom:max(10px,env(safe-area-inset-bottom))}
@keyframes tin{from{opacity:0;transform:translate(-50%,-20px) scale(.9)}}
#tut .tbub img{height:74px;image-rendering:pixelated;flex:none;filter:drop-shadow(0 0 8px #ffd23d88);animation:tbob 1.6s infinite ease-in-out}
@keyframes tbob{50%{transform:translateY(-4px)}}
#tut .tx{flex:1;min-width:0}#tut .tn{font:8px 'Press Start 2P',monospace;color:#ffd23d;margin-bottom:5px}
#tut .tt{font-size:14px;line-height:1.45}#tut .tt b{color:#ffd23d}
#tut .tb{display:flex;gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap}
#tut .tb button{padding:9px 14px;border-radius:12px;border:2px solid #fff;font:9px 'Press Start 2P',monospace;color:#fff;background:linear-gradient(#3be08a,#0b6a3c)}
#tut .tb .tsk{background:linear-gradient(#556,#334);border-color:#99a;font-size:8px}
#tut .hint{font-size:11px;color:#9fb0e0}
#tut .dots{display:flex;gap:4px;margin-left:auto}#tut .dots i{width:7px;height:7px;border-radius:50%;background:#34408f}#tut .dots i.on{background:#ffd23d}
#tskip{position:fixed;top:max(8px,env(safe-area-inset-top));right:max(8px,env(safe-area-inset-right));z-index:245;display:none;padding:8px 12px;border-radius:12px;border:2px solid #aab;background:#222a5acc;color:#fff;font:8px 'Press Start 2P',monospace;pointer-events:auto}
#tskip.on{display:block}
#tutp{position:fixed;inset:0;z-index:250;display:none;align-items:center;justify-content:center;background:#05071af0;padding:14px;font-family:system-ui,sans-serif;color:#fff}
#tutp.on{display:flex;animation:tin .3s}
#tutp .bx{width:min(480px,94vw);text-align:center;padding:16px;border-radius:20px;background:linear-gradient(160deg,#1c2468,#0a0e38);border:3px solid #ffd23d;box-shadow:0 0 30px #ffd23d55}
#tutp img{height:120px;image-rendering:pixelated;filter:drop-shadow(0 0 12px #ffd23d88);animation:tbob 1.6s infinite}
#tutp h2{font:12px 'Press Start 2P',monospace;color:#ffd23d;margin:6px 0}#tutp p{font-size:14px;line-height:1.5;margin-bottom:12px}
#tutp .row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}#tutp button{padding:12px 16px;border-radius:14px;border:2px solid #fff;font:9px 'Press Start 2P',monospace;color:#fff;background:linear-gradient(#3be08a,#0b6a3c)}#tutp button.s{background:linear-gradient(#556,#334);border-color:#99a}`;
document.head.appendChild(css);
const el=document.createElement('div');el.id='tut';el.innerHTML='<div class="tring none"></div><div class="tbub"><img id="tutk"><div class="tx"><div class="tn">ENTRENADOR KARUSSO</div><div class="tt"></div><div class="tb"><button class="nx">SIGUIENTE ▶</button><span class="hint"></span><div class="dots"></div></div></div></div>';document.body.appendChild(el);
const sk=document.createElement('button');sk.id='tskip';sk.textContent='SALTAR ▶▶';document.body.appendChild(sk);
const pr=document.createElement('div');pr.id='tutp';document.body.appendChild(pr);
const ring=el.querySelector('.tring'),bub=el.querySelector('.tbub'),tt=el.querySelector('.tt'),nx=el.querySelector('.nx'),hint=el.querySelector('.hint'),dots=el.querySelector('.dots');
let S=null,poll=null,stepT=0;
const me=()=>G&&G.P&&G.P[0],hoop=p=>hoopOf(p);
const tp=(p,x,y)=>{p.x=x;p.y=y;p.vx=p.vy=0};
const give=p=>{const B=G.B;B.h=p;B.fl=null;B.dk=null;B.ps=null;B.net=false;B.rim=null;p.st='idle';p.cd=0;p.tt=0};
const seen={};
const STEPS=[
 {t:'¡Hola! Soy <b>Karusso</b>, tu entrenador. En un minuto te enseño lo básico. ¡Solo podrás tocar lo que yo te diga!',btn:1},
 {t:'Primero, <b>muévete</b>. Arrastra el <b>joystick</b> (círculo de abajo a la izquierda) para correr por la cancha.',hl:'#joystick-base',allow:['#joystick-base'],init:()=>{S.d=0;S.lx=me().x;S.ly=me().y;give(me())},ok:()=>{const p=me();S.d+=Math.hypot(p.x-S.lx,p.y-S.ly);S.lx=p.x;S.ly=p.y;return S.d>420}},
 {t:'Bien. Ahora <b>TURBO</b>: mantenlo pulsado mientras mueves el joystick para correr más rápido. Gasta energía, ¡no abuses!',hl:'#btn-t',allow:['#btn-t','#joystick-base'],init:()=>{S.hold=0},ok:()=>{if(TURBO)S.hold+=120;return S.hold>=700}},
 {t:'Con el balón, pulsa <b>REGATE</b> para driblar. Cruzas a un lado y a otro; contra un rival cerca puedes hacerle caer.',hl:'#btn-c',allow:['#btn-c','#joystick-base','#btn-t'],init:()=>{give(me());seen.c=0},ok:()=>{if(me().st==='cross')seen.c=1;return seen.c&&me().st!=='cross'}},
 {t:'Ahora vamos al aro. <b>Corre hacia la canasta rival</b> (la de la derecha) con el joystick y el turbo.',hl:'#joystick-base',allow:['#joystick-base','#btn-t','#btn-c'],init:()=>give(me()),ok:()=>{const p=me(),h=hoop(p);return Math.abs(p.x-h.x)<620&&Math.abs(p.y-h.y)<320}},
 {t:'<b>Tirar y saltar:</b> pulsa <b>TIRAR</b> para saltar con el balón y vuelve a pulsarlo en el momento justo (¡SUELTA!) para lanzar. Cuanto más exacto, más puntería. Cerca del aro es una bandeja.',hl:'#btn-a',allow:['#btn-a','#joystick-base','#btn-t'],init:()=>{give(me());seen.s=0},ok:()=>{if(me().st==='shoot')seen.s=1;return seen.s&&me().st!=='shoot'&&!G.B.dk&&!G.B.fl}},
 {t:'¡Ahora un <b>MATE</b>! Te pongo cerca del aro. Pulsa <b>MATE</b> para machacar. Puedes mover el joystick hacia el aro.',hl:'#btn-b',allow:['#btn-b','#joystick-base','#btn-t'],init:()=>{const p=me(),h=hoop(p);tp(p,h.x-p.dir*240,h.y+8);give(p);seen.d=0;burst(p.x,p.y-60,'#ffd23d',16,8)},ok:()=>{if(me().st==='dunk')seen.d=1;return seen.d&&me().st!=='dunk'&&!G.B.dk}},
 {t:'<b>Defensa:</b> sin balón el botón cambia a <b>ROBAR</b> (quitar el balón) y <b>TAPÓN</b> (taponar un tiro). Prueba a pulsar <b>TAPÓN</b>.',hl:'#btn-b',allow:['#btn-b','#btn-a','#joystick-base','#btn-t'],init:()=>{const o=G.P[1],p=me();give(o);tp(o,p.x+p.dir*220,p.y);o.f=-p.dir},ok:()=>{if(me().st==='block'||me().st==='steal')seen.b=1;return seen.b&&me().st!=='block'&&me().st!=='steal'}},
 {t:'<b>Poderes:</b> los jugadores especiales tienen botón de <b>PODER</b> (y a veces <b>HABILIDAD</b>). Actívalo para entrar en un modo brutal. ¡Pruébalo ahora!',hl:'#btn-p',allow:['#btn-p','#btn-x','#joystick-base'],init:()=>{const p=me();give(p);p.pwT=0;p.skT=0;seen.p=0},ok:()=>seen.p||(me().pwT||0)>performance.now()+1500},
 {t:'¡Genial, ya eres un crack! Para celebrarlo te doy <b>💰 300 monedas</b>. Y recuerda: con las <b>🪙</b> abres sobres y con los <b>💎</b> cambias tu nombre. ¡A jugar!',btn:1,last:1}];
function pos(sel){const e=sel&&document.querySelector(sel);if(!e||!e.offsetParent&&getComputedStyle(e).position!=='fixed'){ring.classList.add('none');return}const r=e.getBoundingClientRect();ring.classList.remove('none');Object.assign(ring.style,{left:r.left-6+'px',top:r.top-6+'px',width:r.width+12+'px',height:r.height+12+'px'})}
function go(i){S.i=i;const st=STEPS[i];stepT=performance.now();for(const k in seen)delete seen[k];
 tt.innerHTML=st.t;dots.innerHTML=STEPS.map((_,k)=>`<i class="${k<=i?'on':''}"></i>`).join('');
 nx.style.display=st.btn?'':'none';nx.textContent=st.last?'¡A JUGAR! ▶':'SIGUIENTE ▶';hint.textContent=st.btn?'':'👆 Hazlo para continuar';
 bub.style.animation='none';void bub.offsetWidth;bub.style.animation='';
 bub.classList.toggle('low',/#btn|#joystick/.test(st.hl||'')&&false);
 if(st.init)try{st.init()}catch(e){console.warn(e)}
 setTimeout(()=>pos(st.hl),60);
 clearInterval(poll);poll=setInterval(()=>{if(!S||!G){return}G.t=999;G.sc=16;if(G.mode==='play'&&G.P[1])G.P[1].frz=0;pos(st.hl);
  if(!st.btn&&(st.ok&&st.ok()||performance.now()-stepT>(st.max||22000))){clearInterval(poll);setTimeout(()=>{if(S)next()},st.ok&&st.ok()?600:0);if(!(st.ok&&st.ok()))pop(me().x,me().y-260,'¡Sigamos!','#ffd23d',30)}},120)}
function next(){if(S.i>=STEPS.length-1)return finish(true);go(S.i+1)}
function finish(done){clearInterval(poll);const first=!save.tutDone;if(done||true){save.tutDone=1;if(done&&first){save.coins+=300}store()}
 S=null;window.__tut=0;el.classList.remove('on');sk.classList.remove('on');pr.classList.remove('on');
 if(G){G=null;$('#hud').classList.add('hidden');$('#controls').classList.add('hidden')}
 try{musicPlay('menu')}catch(e){}renderMenu();if(done&&first)setTimeout(()=>{try{msg&&0}catch(e){}const n=$('#nowp');},0)}
/* bloqueo de toques fuera de lo permitido */
const BLK=['pointerdown','touchstart','mousedown','click'];
BLK.forEach(ev=>addEventListener(ev,e=>{if(!S||!window.__tut)return;const t=e.target;if(!t||!t.closest)return;if(t.closest('#tut,#tskip,#tutp'))return;
 const st=STEPS[S.i];const ok=st&&st.allow&&st.allow.some(s=>t.closest(s));if(!ok){e.stopImmediatePropagation();e.preventDefault()}else if(ev==='pointerdown'&&(t.closest('#btn-p')||t.closest('#btn-x')))seen.p=1},true));
nx.onclick=()=>{S&&next()};sk.onclick=()=>{if(S)finish(false)};
/* el rival del tutorial se queda quieto */
const _ai=ai;ai=function(p,o){if(G&&G.tut&&p.t===1)return[0,0];return _ai.apply(this,arguments)};
function begin(){window.__tut=1;S={i:0};pr.classList.remove('on');show(null);
 startMatch(0,{id:0,lvl:1,st:0});G.tut=1;G.t=999;
 el.classList.add('on');sk.classList.add('on');$('#tutk').src=figImg(KID,CH[KID].jc);
 const w=setInterval(()=>{if(!S){clearInterval(w);return}if(G&&G.mode==='play'){clearInterval(w);G.P[1].tutDummy=1;go(0)}},150)}
window.startTutorial=begin;
function offer(){save.karNew=0;pr.innerHTML=`<div class="bx"><img src="${figImg(KID,CH[KID].jc)}"><h2>¡BIENVENIDO!</h2><p>Soy <b>Karusso</b>. ¿Quieres un tutorial rápido (1 minuto) para aprender a mover, tirar, regatear, machacar y usar poderes? Ganas 💰300. <b>¡Y te regalo mi ficha (Calvo Karusso, ÉPICO 75)!</b></p><div class="row"><button id="tp-go">EMPEZAR TUTORIAL</button><button class="s" id="tp-no">SALTAR</button></div></div>`;pr.classList.add('on');
 $('#tp-go').onclick=begin;$('#tp-no').onclick=()=>{pr.classList.remove('on');save.tutDone=1;store()}}
const _rm=renderMenu;renderMenu=function(){_rm.apply(this,arguments);try{if(save.tutDone&&save.karNew&&!pr.classList.contains('on')&&!window.__tut){setTimeout(()=>{if(!save.karNew)return;pr.innerHTML=`<div class="bx"><img src="${figImg(KID,CH[KID].jc)}"><h2>🎁 ¡REGALO PARA TODOS!</h2><p><b>${CH[KID].name}</b> (ÉPICO · 75 de media) ya está en tu colección. Roba balones como nadie.</p><div class="row"><button id="tp-ok">¡GENIAL!</button></div></div>`;pr.classList.add('on');$('#tp-ok').onclick=()=>{pr.classList.remove('on');save.karNew=0;store()}},600)}if(!save.tutDone&&!window.__tut&&!pr.classList.contains('on')){const n=$('#news');if(n)n.classList.add('hidden');save.newsSeen=NEWS[0].v;setTimeout(()=>{if(!save.tutDone&&!window.__tut&&!document.querySelector('#auth:not(.hidden)'))offer()},700)}}catch(e){}};
})();
