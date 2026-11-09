// ===== Música de menú (lista de canciones), cartel "suena ahora" y pantallas de carga =====
(()=>{
const TRACKS=[
 {f:'m1',t:'Una Locura',a:'Ozuna, J Balvin & Chencho Corleone'},
 {f:'m2',t:'Toxic',a:'Britney Spears'},
 {f:'m3',t:'Mo Bamba',a:'Sheck Wes'},
 {f:'m4',t:'Doja',a:'Central Cee'},
 {f:'m5',t:'Going Bad',a:'Meek Mill feat. Drake'},
 {f:'m6',t:"Feet Don't Fail Me Now",a:'Joy Crookes'}];
const css=document.createElement('style');css.textContent=`
#nowp{position:fixed;top:calc(8px + env(safe-area-inset-top));left:50%;transform:translate(-50%,-90px);z-index:200;display:flex;align-items:center;gap:8px;max-width:92vw;padding:6px 8px 6px 12px;border-radius:16px;background:linear-gradient(90deg,#1b1450f2,#0b1038f2);border:2px solid #ff4fd8;box-shadow:0 0 16px #ff4fd877;color:#fff;font-family:system-ui,sans-serif;transition:transform .45s cubic-bezier(.2,1.2,.3,1);pointer-events:none}
#nowp.on{transform:translate(-50%,0);pointer-events:auto}
#nowp .eq{display:flex;gap:2px;align-items:flex-end;height:16px}#nowp .eq i{width:3px;background:#7dff7d;border-radius:2px;animation:eq 0.9s infinite ease-in-out}#nowp .eq i:nth-child(2){animation-delay:.2s;background:#6fdcff}#nowp .eq i:nth-child(3){animation-delay:.4s;background:#ff4fd8}
@keyframes eq{0%,100%{height:4px}50%{height:16px}}
#nowp .tx{display:flex;flex-direction:column;line-height:1.25;min-width:0}#nowp b{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#nowp small{font-size:10px;color:#cfd8ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#nowp button{border:0;background:#2a2f7a;color:#fff;border-radius:9px;min-width:32px;height:30px;font-size:14px}
#ldov{position:fixed;inset:0;z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:radial-gradient(circle at 50% 30%,#2b2f86f2,#070921fa 70%);color:#fff;font-family:'Press Start 2P',monospace;opacity:0;pointer-events:none;transition:opacity .25s}
#ldov.on{opacity:1;pointer-events:auto}#ldov .bl{font-size:44px;animation:bnc .7s infinite ease-in}@keyframes bnc{0%,100%{transform:translateY(-22px) rotate(0)}50%{transform:translateY(8px) rotate(180deg)}}
#ldov .tt{font-size:11px;color:#ffd23d}#ldov .bar,#load .bar{width:min(300px,70vw);height:12px;border-radius:8px;background:#141a52;border:2px solid #4a5ad8;overflow:hidden}#ldov .bar i,#load .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#4ade80,#ffd23d,#ff4fd8);transition:width .2s linear}
#ldov .tip,#load .tip{font:11px system-ui,sans-serif;color:#9fb0e0;max-width:80vw;text-align:center;min-height:30px}
#load .hint{font:10px system-ui,sans-serif;color:#ffd23d;margin-top:4px;min-height:14px}`;document.head.appendChild(css);
const np=document.createElement('div');np.id='nowp';np.innerHTML='<div class="eq"><i></i><i></i><i></i></div><div class="tx"><b id="np-t"></b><small id="np-a"></small></div><button id="np-pp">⏸</button><button id="np-nx">⏭</button>';document.body.appendChild(np);
const ld=document.createElement('div');ld.id='ldov';ld.innerHTML='<div class="bl">🏀</div><div class="tt">CARGANDO...</div><div class="bar"><i></i></div><div class="tip"></div>';document.body.appendChild(ld);
const TIPS=['💡 Pide el balón a tus compañeros: si hay confianza, te la darán.','💡 Charla con tu equipo en el VESTUARIO para mejorar la química.','💡 Cuida tu energía: un jugador cansado rinde menos.','💡 Los clanes te permiten jugar con amigos y ver sus perfiles.','💡 Gasta tus gemas 💎 con cabeza: cambiar de nombre cuesta 150.','💡 Tus redes sociales dan fama y dinero cada jornada.','💡 Los playoffs son a partido único: ¡no falles!','💡 Una buena rueda de prensa sube tu confianza con el míster.'];
const tip=()=>TIPS[(Math.random()*TIPS.length)|0];
/* ---------- pantalla de carga entre secciones ---------- */
let ldT=null;
const LDR={flash(ms=700){ms=Math.max(350,ms);ld.querySelector('.tip').textContent=tip();const bar=ld.querySelector('.bar i');bar.style.transition='none';bar.style.width='0';ld.classList.add('on');requestAnimationFrame(()=>{bar.style.transition='width '+ms+'ms linear';bar.style.width='100%'});clearTimeout(ldT);ldT=setTimeout(()=>ld.classList.remove('on'),ms)},
 hook(){/* partidas: pantalla de carga al empezar */const w=n=>{const f=window[n];if(typeof f!=='function'||f._ld)return;const g=function(){LDR.flash(1100);return f.apply(this,arguments)};g._ld=1;window[n]=g};w('startMatch');w('startMatch3')}};
window.LDR=LDR;
/* ---------- lista de canciones ---------- */
let au=null,order=[],idx=-1,blocked=false,wantPlay=false,hideT=null;
const shuffle=()=>{order=TRACKS.map((_,i)=>i).sort(()=>Math.random()-.5);idx=-1};
function banner(on){clearTimeout(hideT);np.classList.toggle('on',!!on);if(on)hideT=setTimeout(()=>np.classList.remove('on'),7000)}
function load(i){const T=TRACKS[i];if(!au){au=new Audio();au.preload='auto';au.volume=.85;au.addEventListener('ended',()=>PL.next());au.addEventListener('error',()=>{setTimeout(()=>{if(wantPlay)PL.next()},800)})}
 au.src='assets/music/'+T.f+'.mp3';$('#np-t').textContent=T.t;$('#np-a').textContent=T.a;PL.cur=T}
const PL=window.PL={cur:null,tracks:TRACKS,
 start(){if(!save.snd||!cfgv('mus'))return;wantPlay=true;if(!order.length)shuffle();if(!au||!PL.cur)PL.next(true);else tryPlay()},
 next(quiet){if(!order.length)shuffle();idx=(idx+1)%order.length;load(order[idx]);if(wantPlay)tryPlay(quiet)},
 pause(){wantPlay=false;if(au)au.pause();banner(false);$('#np-pp').textContent='▶'},
 toggle(){if(au&&!au.paused){wantPlay=false;au.pause();$('#np-pp').textContent='▶'}else{wantPlay=true;tryPlay()}},
 show(){banner(true)},get playing(){return !!au&&!au.paused}};
function tryPlay(quiet){if(!au)return;const p=au.play();if(p&&p.then)p.then(()=>{blocked=false;$('#np-pp').textContent='⏸';if(!quiet||true)banner(true);const h=$('#load .hint');if(h)h.textContent=''}).catch(()=>{blocked=true;const h=$('#load .hint');if(h)h.textContent='🔊 Toca la pantalla para activar la música'})}
const unlock=()=>{if(blocked&&wantPlay){blocked=false;tryPlay()}};
['pointerdown','keydown','touchend'].forEach(ev=>document.addEventListener(ev,unlock,{passive:true}));
$('#np-nx').onclick=()=>{wantPlay=true;PL.next();banner(true)};$('#np-pp').onclick=()=>{PL.toggle();banner(true)};
/* reemplaza la música de menú por la lista; en partido sigue la música del juego */
const _mp=window.musicPlay,_ms=window.musicStop;
window.musicPlay=function(tr){if(!save.snd||!cfgv('mus')){PL.pause();_ms();return}
 const t=tr||(typeof MUS!=='undefined'?MUS.tr:'menu');if(t==='menu'){_ms();if(typeof MUS!=='undefined')MUS.tr='menu';if(!PL.playing)PL.start();return}
 PL.pause();return _mp(tr)};
window.musicStop=function(){PL.pause();_ms()};
/* ---------- carga inicial: 5 segundos con barra y música ---------- */
const T0=performance.now();
window.bootWait=(ms=5000)=>new Promise(res=>{const ls=document.querySelector('#load');if(ls&&!ls.querySelector('.bar')){const b=document.createElement('div');b.className='bar';b.innerHTML='<i></i>';const t=document.createElement('div');t.className='tip';t.textContent=tip();const h=document.createElement('div');h.className='hint';ls.append(b,t,h)}
 const bar=ls&&ls.querySelector('.bar i');const tick=()=>{const k=Math.min(1,(performance.now()-T0)/ms);if(bar)bar.style.width=(k*100)+'%';if(k<1)requestAnimationFrame(tick);else res()};tick();PL.start()});
document.addEventListener('visibilitychange',()=>{if(au&&document.hidden)au.pause();else if(au&&wantPlay&&!document.hidden)tryPlay(true)});
LDR.hook();
})();
