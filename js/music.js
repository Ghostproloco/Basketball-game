// ===== Música de menú (lista de canciones), cartel "suena ahora" y pantallas de carga =====
(()=>{
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
/* ---------- música ORIGINAL (sintetizada, sin canciones con copyright) ---------- */
const MNf=m=>440*Math.pow(2,(m-69)/12);
const TH={
 luces:{n:'Luces del Barrio',bpm:84,sw:.16,chords:[[57,60,64,67,71],[53,57,60,64,67],[48,55,60,64,67],[55,59,62,66,69]],root:[45,41,36,43],
  mel:[[0,76,3],[4,72,2],[6,74,2],[8,76,4],[16,77,3],[20,72,2],[22,76,2],[24,77,4],[32,76,3],[36,79,2],[38,76,2],[40,72,4],[48,74,3],[52,71,2],[54,74,2],[56,79,6]],kick:[0,6,10],snare:[4,12],hat:8,vinyl:1,kind:'soft'},
 domingo:{n:'Domingo en el Barrio',bpm:98,sw:.1,chords:[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],root:[45,41,36,43],
  mel:[[0,81,2],[3,79,1],[4,76,2],[8,79,2],[11,76,1],[12,72,3],[16,77,2],[19,76,1],[20,72,2],[24,76,2],[27,77,1],[28,81,3],[32,79,2],[35,76,1],[36,72,2],[40,76,2],[44,79,3],[48,74,2],[51,76,1],[52,79,2],[56,83,2],[59,81,1],[60,79,3]],kick:[0,3,6,10],snare:[4,12],hat:16,conga:[2,7,9,14],kind:'funk'},
 medianoche:{n:'Medianoche en el Asfalto',bpm:72,sw:0,chords:[[50,53,57,60,64],[46,50,53,57,60],[53,57,60,64],[48,52,55,59]],root:[38,34,41,36],
  mel:[[0,74,6],[8,77,4],[16,72,6],[24,74,4],[32,69,6],[40,72,4],[48,67,6],[56,69,8]],kick:[0,10,22],snare:[8],hat:16,kind:'trap'},
 match:{n:'Fuego en la Cancha',bpm:112,sw:0,chords:[[57,60,64],[53,57,60],[55,59,62],[52,56,59]],root:[45,41,43,40],
  mel:[[0,81,2],[2,84,1],[3,81,1],[4,88,3],[8,86,2],[10,84,2],[12,81,4],[16,79,2],[18,81,1],[19,79,1],[20,84,3],[24,83,2],[26,81,2],[28,76,4]],kick:[0,4,8,12],snare:[4,12],hat:16,kind:'drive'}};
const LIST=['luces','domingo','medianoche'];
let M={on:0,th:null,tm:null,step:0,next:0,bus:null,rev:null,cur:'luces',li:0,loops:0,t0:0,paused:false};
function setup(){const A=musCtx();if(M.bus)return A;M.bus=A.createGain();M.bus.gain.value=.6;M.bus.connect(MUS.gain);
 const len=A.sampleRate*2,ir=A.createBuffer(2,len,A.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
 const cv=A.createConvolver();cv.buffer=ir;M.rev=A.createGain();M.rev.gain.value=.32;M.rev.connect(cv);cv.connect(M.bus);return A}
function nt(t,m,d,type,v,o){o=o||{};const A=AC,os=A.createOscillator(),g=A.createGain();os.type=type;os.frequency.setValueAtTime(MNf(m),t);if(o.det)os.detune.value=o.det;if(o.glide)os.frequency.exponentialRampToValueAtTime(MNf(m+o.glide),t+d);
 const at=o.at||.01;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+at);g.gain.exponentialRampToValueAtTime(.0001,t+d);let out=g;
 if(o.lp){const f=A.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(o.lp,t);if(o.lpEnd)f.frequency.exponentialRampToValueAtTime(o.lpEnd,t+d);os.connect(f);f.connect(g)}else os.connect(g);
 g.connect(M.bus);if(o.rv){const s=A.createGain();s.gain.value=o.rv;g.connect(s);s.connect(M.rev)}os.start(t);os.stop(t+d+.05)}
function nz(t,d,f,v,type,q){const A=AC;if(!MUS.nb){const b=A.createBuffer(1,A.sampleRate*.5,A.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;MUS.nb=b}const s=A.createBufferSource(),fl=A.createBiquadFilter(),g=A.createGain();s.buffer=MUS.nb;fl.type=type;fl.frequency.value=f;if(q)fl.Q.value=q;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(M.bus);s.start(t);s.stop(t+d+.02);return g}
function kick(t,v,deep){const A=AC,o=A.createOscillator(),g=A.createGain();o.frequency.setValueAtTime(deep?120:150,t);o.frequency.exponentialRampToValueAtTime(deep?38:44,t+(deep?.22:.13));g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+(deep?.55:.3));o.connect(g);g.connect(M.bus);o.start(t);o.stop(t+.6)}
function step(th,s,t,hype){const bar=(s>>4)&3,st=s&15,ch=th.chords[bar],L=th.kind,lp=(s>>6),sd=60/th.bpm/4;
 const sw=(st%2===1)?th.sw*sd:0,T=t+sw;
 // batería
 if(th.kick.includes(s%(L==='trap'?32:16)))kick(T,L==='trap'?1:.9,L==='trap');
 if(th.snare.includes(st)){if(L==='trap'){nz(T,.35,1400,.5,'bandpass',.8);nz(T,.2,4500,.3,'highpass');}else{nz(T,.16,L==='soft'?1500:2000,L==='soft'?.28:.45,'bandpass');nt(T,52,.1,'triangle',L==='soft'?.1:.18)}}
 if(th.hat===16||(th.hat===8&&st%2===0)){const acc=st%4===2;nz(T,.04,8500,acc?.2:(L==='soft'?.07:.11),'highpass');if(L==='trap'&&(bar===1||bar===3)&&st>=12)nz(T+sd/2,.03,9000,.1,'highpass')}
 if(th.conga&&th.conga.includes(st)){nt(T,64+(st%3)*3,.1,'sine',.16,{glide:-3});nz(T,.05,1200,.12,'bandpass',2)}
 if(th.vinyl&&st%2===0&&Math.random()<.5)nz(t,.012,5000+Math.random()*3000,.05,'highpass');
 // bajo
 const r=th.root[bar];
 if(L==='soft'){if([0,6,10].includes(st))nt(T,r,.5,'sine',.42,{lp:600})}
 else if(L==='funk'){const p={0:0,3:0,6:7,8:0,10:12,11:7,14:5};if(st in p)nt(T,r+p[st],.2,'sawtooth',.26,{lp:700,lpEnd:260})}
 else if(L==='trap'){if(st===0||st===10)nt(T,r,.7,'sine',.55,{glide:-2})}
 else {if(st%2===0)nt(T,r+(st%8===6?12:0),.18,'sawtooth',.28,{lp:900,lpEnd:300})}
 // acordes
 if(L==='soft'||L==='trap'){if(st===0){for(const n of ch){nt(t,n,sd*14,'triangle',.07,{at:.18,lp:1400,rv:.35,det:-6});nt(t,n,sd*14,'triangle',.05,{at:.22,lp:1400,rv:.35,det:6})}}
  if(L==='soft'&&(st===6||st===10)){for(const n of ch.slice(1,4))nt(T,n+12,.35,'sine',.05,{rv:.3})}}
 else if(L==='funk'){if([2,5,7,10,13,15].includes(st))for(const n of ch)nt(T,n+12,.12,'square',.04,{lp:2600,lpEnd:900})}
 else {if([0,6,8,14].includes(st))for(const n of ch)nt(T,n+12,.2,'sawtooth',.045,{lp:2200,lpEnd:600,rv:.1})}
 // melodía
 if(lp>0||s>=16){const ms=s%64;for(const m of th.mel)if(m[0]===ms){const d=m[2]*sd;
  if(L==='soft')nt(T,m[1],d*1.3,'triangle',.11,{at:.012,lp:2800,rv:.45});
  else if(L==='funk')nt(T,m[1],d*1.1,'sine',.13,{at:.015,rv:.3});
  else if(L==='trap'){nt(T,m[1],d*1.2,'sine',.12,{rv:.7});nt(T,m[1]+12,d*.8,'sine',.04,{rv:.7})}
  else {nt(T,m[1]+(hype?12:0),d*1.1,'sawtooth',.075,{lp:3500,lpEnd:1200,rv:.15});nt(T,m[1]+(hype?24:12),d*.6,'square',.025,{lp:3000})}}}
 // arpegio extra en partido
 if(L==='drive'&&st%2===1&&lp>0)nt(T,ch[(st>>1)%3]+24,.1,'triangle',.04,{rv:.1});
 // destellos
 if((L==='soft'||L==='trap')&&st%4===2&&Math.random()<.22)nt(T,[81,84,86,88,91][(Math.random()*5)|0],.5,'sine',.045,{rv:.6})}
function sched(){if(!AC||!M.th)return;const th=M.th,sd=60/th.bpm/4,hype=!!(typeof G!=='undefined'&&G&&G.P&&typeof rageOn==='function'&&G.P.some(rageOn));while(M.next<AC.currentTime+.2){step(th,M.step,M.next,hype);M.next+=sd;M.step++;if(M.step%64===0)M.loops++}
 if(M.cur!=='match'&&M.loops>=3&&!M.paused&&performance.now()-M.t0>150000)PL.next(true)}
function runTheme(id){const A=setup();if(A.state==='suspended')A.resume();clearInterval(M.tm);M.cur=id;M.th=TH[id];M.step=0;M.loops=0;M.t0=performance.now();M.next=A.currentTime+.1;M.on=1;M.tm=setInterval(sched,30);PL.cur={t:M.th.n,a:'Gacha Hoops · música original'};const t=$('#np-t'),a=$('#np-a');if(t)t.textContent=PL.cur.t;if(a)a.textContent=PL.cur.a;const pp=$('#np-pp');if(pp)pp.textContent='⏸'}
function halt(){clearInterval(M.tm);M.tm=null;M.on=0}
const PL=window.PL={cur:null,tracks:LIST.map(k=>({t:TH[k].n,a:'Gacha Hoops'})),
 start(){if(!save.snd||!cfgv('mus'))return;M.paused=false;if(M.on&&M.cur!=='match')return;try{runTheme(LIST[M.li])}catch(e){}},
 next(quiet){M.li=(M.li+1)%LIST.length;M.paused=false;if(!save.snd||!cfgv('mus'))return;try{runTheme(LIST[M.li])}catch(e){}if(!quiet)banner(true)},
 use(i){const k=typeof i==='string'?LIST.indexOf(i):i;if(k<0||k===M.li&&M.on&&M.cur!=='match')return;M.li=k;if(M.on&&M.cur!=='match'&&save.snd&&cfgv('mus'))runTheme(LIST[M.li])},
 match(){if(!save.snd||!cfgv('mus'))return;if(M.on&&M.cur==='match')return;M.paused=false;try{runTheme('match')}catch(e){}},
 pause(){M.paused=true;halt();banner(false);const pp=$('#np-pp');if(pp)pp.textContent='▶'},
 toggle(){if(M.on)PL.pause();else{M.paused=false;PL.start();banner(true)}},
 show(){if(!M.on)PL.start();banner(true)},get playing(){return !!M.on}};
function banner(on){clearTimeout(hideT);np.classList.toggle('on',!!on);if(on)hideT=setTimeout(()=>np.classList.remove('on'),6000)}
let hideT=null;
$('#np-nx').onclick=()=>{if(M.cur==='match')return;PL.next();};$('#np-pp').onclick=()=>{PL.toggle();banner(true)};
const unlock=()=>{if(!M.on&&!M.paused&&save&&save.snd&&cfgv('mus')){const mt=typeof MUS!=='undefined'?MUS.tr:'menu';if(mt==='match')PL.match();else PL.start()}else if(AC&&AC.state==='suspended')AC.resume()};
['pointerdown','keydown','touchend'].forEach(ev=>document.addEventListener(ev,unlock,{passive:true}));
/* sustituye el motor antiguo: menú = lista original; partido = tema de partido */
window.musicPlay=function(tr){if(!save.snd||!cfgv('mus')){halt();return}const t=tr||(typeof MUS!=='undefined'?MUS.tr:'menu');if(typeof MUS!=='undefined')MUS.tr=t;if(t==='match')PL.match();else{if(M.on&&M.cur==='match')halt();if(!M.on&&!M.paused)PL.start()}};
window.musicStop=function(){halt()};
/* ---------- carga inicial: 5 segundos con barra y música ---------- */
const T0=performance.now();
window.bootWait=(ms=5000)=>new Promise(res=>{const ls=document.querySelector('#load');if(ls&&!ls.querySelector('.bar')){const b=document.createElement('div');b.className='bar';b.innerHTML='<i></i>';const t=document.createElement('div');t.className='tip';t.textContent=tip();const h=document.createElement('div');h.className='hint';ls.append(b,t,h)}
 const bar=ls&&ls.querySelector('.bar i');const tick=()=>{const k=Math.min(1,(performance.now()-T0)/ms);if(bar)bar.style.width=(k*100)+'%';if(k<1)requestAnimationFrame(tick);else res()};tick();PL.start()});
document.addEventListener('visibilitychange',()=>{if(!AC)return;if(document.hidden)AC.suspend();else AC.resume()});
LDR.hook();
})();
