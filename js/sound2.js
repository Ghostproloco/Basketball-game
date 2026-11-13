// ===== SONIDO v2: efectos sintetizados (pasos, bote, canasta, público, poderes, interfaz) =====
(()=>{
let C=null,master=null,noiseBuf=null;
const on=()=>{try{return save.snd!==0&&save.snd!==false&&(!save.cfg||save.cfg.sfx!==0)}catch(e){return true}};
const ctx=()=>{if(C)return C;try{C=(typeof AC!=='undefined'&&AC)||new(window.AudioContext||window.webkitAudioContext)();master=C.createGain();master.gain.value=.9;const cp=C.createDynamicsCompressor();cp.threshold.value=-14;cp.ratio.value=5;master.connect(cp);cp.connect(C.destination);
 const n=C.sampleRate*1.2,b=C.createBuffer(1,n,C.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;noiseBuf=b}catch(e){C=null}return C};
const run=()=>{const c=ctx();if(c&&c.state==='suspended')c.resume();return c};
// tono: f0->f1, dur, tipo, volumen, retardo
function tone(f0,d,type,v,f1,dl){const c=run();if(!c)return;const t=c.currentTime+(dl||0),o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+d);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+Math.min(.012,d/3));g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.02)}
// ruido filtrado
function noise(d,v,ft,fq,type,dl,f1){const c=run();if(!c||!noiseBuf)return;const t=c.currentTime+(dl||0),s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=noiseBuf;s.loop=true;f.type=type||'bandpass';f.frequency.setValueAtTime(ft||1000,t);if(f1)f.frequency.exponentialRampToValueAtTime(Math.max(40,f1),t+d);f.Q.value=fq||1;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+Math.min(.02,d/3));g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(master);s.start(t,Math.random());s.stop(t+d+.02)}
const crowd=(v,d)=>{noise(d||1.1,v,900,.7,'bandpass',0,1800);noise((d||1.1)*.9,v*.7,2400,1.2,'bandpass',.05,1200)};
const S={
 click(){tone(520,.07,'triangle',.07,760);tone(980,.05,'sine',.04,1300,.03)},
 hover(){tone(1400,.03,'sine',.018)},
 open(){tone(300,.18,'triangle',.07,720);tone(600,.2,'sine',.05,1200,.06);noise(.16,.04,2600,1,'highpass',0,6000)},
 back(){tone(620,.09,'triangle',.06,360)},
 coin(){tone(1318,.07,'square',.05);tone(1760,.16,'square',.05,null,.06)},
 claim(){[523,659,784,1047,1319].forEach((f,i)=>tone(f,.22,'triangle',.07,null,i*.06));noise(.5,.05,5000,1,'highpass',.1,9000);tone(2093,.5,'sine',.04,null,.3)},
 levelup(){[392,523,659,784,1047,1319,1568].forEach((f,i)=>{tone(f,.3,'square',.045,null,i*.07);tone(f*2,.3,'sine',.03,null,i*.07)});noise(1.2,.06,4000,.8,'highpass',.2,9000);crowd(.05,1.4)},
 evolve(){tone(80,1.4,'sawtooth',.09,520);noise(1.4,.09,300,1.5,'bandpass',0,5200);setTimeout(()=>{tone(60,.6,'sine',.2,30);noise(.8,.12,500,.6,'lowpass',0,80);[523,659,784,1047,1568].forEach((f,i)=>tone(f,.5,'triangle',.07,null,i*.04));crowd(.07,1.6)},1300)},
 whoosh(){noise(.28,.09,500,1.2,'bandpass',0,3800)},
 step(){noise(.05,.05,260+Math.random()*120,2,'bandpass');tone(110,.04,'sine',.03)},
 dribble(){tone(170,.07,'sine',.12,90);noise(.04,.05,700,2,'bandpass')},
 swish(){noise(.34,.09,3200,1.5,'bandpass',0,5600);tone(1046,.16,'sine',.035,1568,.03)},
 rim(){tone(1180,.4,'triangle',.06,1120);tone(2360,.3,'sine',.03,2300);noise(.08,.07,1600,3,'bandpass')},
 score(){crowd(.1,1.2);tone(660,.1,'triangle',.04,990,.02)},
 three(){crowd(.14,1.7);[784,988,1175].forEach((f,i)=>tone(f,.16,'triangle',.05,null,i*.06))},
 dunk(){tone(95,.45,'sine',.2,36);noise(.35,.1,200,.8,'lowpass');crowd(.17,1.8);tone(1300,.1,'square',.04,520,.05)},
 block(){noise(.09,.16,1500,2,'bandpass');tone(230,.16,'square',.1,110)},
 steal(){noise(.12,.1,2100,2,'bandpass');tone(520,.1,'square',.06,260)},
 fall(){tone(300,.24,'sawtooth',.07,100);noise(.18,.08,350,1,'lowpass')},
 power(){noise(.9,.12,200,1.2,'bandpass',0,3800);tone(110,.9,'sawtooth',.09,660);tone(880,.3,'triangle',.06,1760,.7);crowd(.06,1.2)},
 whistle(){tone(2900,.09,'sine',.07);tone(3100,.22,'sine',.06,null,.1)},
 buzz(){tone(140,.9,'sawtooth',.14,120);tone(210,.9,'square',.06,190)},
 legend(){[523,659,784,1047].forEach((f,i)=>{tone(f,.4,'square',.05,null,i*.1);tone(f/2,.4,'sine',.07,null,i*.1)});crowd(.08,1.5)},
 perfect(){tone(1500,.1,'triangle',.07,2200);tone(2200,.2,'triangle',.06,null,.07);noise(.2,.04,6000,1,'highpass')},
 card(){tone(600,.08,'triangle',.07,900);tone(900,.12,'triangle',.07,1300,.07);tone(1300,.2,'triangle',.06,null,.14)}};
window.SND={play(n,o){if(!on())return false;try{if(S[n]){S[n](o);return true}}catch(e){}return false},has:n=>!!S[n],S};
/* ----- el sfx del juego pasa por aquí (mejor sonido; lo desconocido sigue por el sistema antiguo) ----- */
const _sfx=window.sfx,MAP={swish:'swish',dunk:'dunk',block:'block',steal:'steal',fall:'fall',buzz:'buzz',card:'card',legend:'legend',perfect:'perfect',bounce:'dribble'};
let lastB=0;
window.sfx=function(t){if(MAP[t]&&on()){if(t==='bounce'){const n=performance.now();if(n-lastB<90)return;lastB=n}if(SND.play(MAP[t]))return}return _sfx.apply(this,arguments)};
const _rs=window.rageStart;if(_rs)window.rageStart=function(){try{SND.play('power')}catch(e){}return _rs.apply(this,arguments)};
/* ----- interfaz: clic en todos los botones ----- */
let lh=0;
document.addEventListener('pointerdown',e=>{const t=e.target&&e.target.closest&&e.target.closest('button,.tile,.btn,[data-a],.osl,.pcard,.mmcard');if(!t||t.disabled)return;if(t.closest('#controls'))return;SND.play(t.classList.contains('main')||t.id==='b-play'?'open':'click')},true);
document.addEventListener('mouseover',e=>{const t=e.target&&e.target.closest&&e.target.closest('.tile,.btn,.mmcard,.m2dock button');if(!t||t.closest('#controls'))return;const n=performance.now();if(n-lh<120||t===window.__lht)return;lh=n;window.__lht=t;SND.play('hover')},true);
/* ----- partido: pasos, canasta, público (vigilante independiente, sirve también al invitado del duelo) ----- */
let ls=[0,0],lastStep=0,lastFr=-1,lastMode='';
setInterval(()=>{try{if(typeof G==='undefined'||!G||!G.P||G.paused||G.mode==='end'){lastFr=-1;return}
 const sc=G.s[0]+G.s[1];if(ls[2]==null)ls[2]=G.id||0;
 if(G.fr!==lastFr||true){const d0=G.s[0]-ls[0],d1=G.s[1]-ls[1];if(d0>0||d1>0){const pts=Math.max(d0,d1);const dk=G.B&&G.B.dk;try{SND.play(dk?'dunk':pts>=3?'three':'score')}catch(e){}}ls=[G.s[0],G.s[1]]}
 if(G.mode!=='play'){lastMode=G.mode;return}
 const now=performance.now(),hu=G.hu||G.P[0];
 if(hu&&hu.mv&&hu.z<4&&hu.st==='idle'&&now-lastStep>(hu.sprint?190:290)){lastStep=now;SND.play('step')}
 if(lastMode==='tip'||lastMode==='intro'){SND.play('whistle')}lastMode=G.mode}catch(e){}},60);
})();
