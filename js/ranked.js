/* RANKEADO 1v1 vs IA: ligas, trofeos, país en el perfil, top global y por país */
(()=>{
if(!window.MMX)return;
const {launch,view,pay,toMenu}=MMX;
const LG=[{n:'BRONCE',t:0,c:'#b9794a',i:'🥉',r:[100,0]},{n:'PLATA',t:300,c:'#cbd5e1',i:'🥈',r:[300,1]},{n:'ORO',t:700,c:'#facc15',i:'🥇',r:[600,2]},{n:'PLATINO',t:1200,c:'#67e8f9',i:'💠',r:[1000,3]},{n:'DIAMANTE',t:1900,c:'#60a5fa',i:'💎',r:[1500,5]},{n:'MAESTRO',t:2800,c:'#c084fc',i:'👑',r:[2200,8]},{n:'LEYENDA',t:4000,c:'#fb7185',i:'🔥',r:[3500,14]}];
const CTRY=[['ES','España','🇪🇸'],['MX','México','🇲🇽'],['AR','Argentina','🇦🇷'],['CO','Colombia','🇨🇴'],['CL','Chile','🇨🇱'],['PE','Perú','🇵🇪'],['VE','Venezuela','🇻🇪'],['EC','Ecuador','🇪🇨'],['UY','Uruguay','🇺🇾'],['US','EE. UU.','🇺🇸'],['BR','Brasil','🇧🇷'],['PT','Portugal','🇵🇹'],['FR','Francia','🇫🇷'],['IT','Italia','🇮🇹'],['DE','Alemania','🇩🇪'],['GB','Reino Unido','🇬🇧'],['CA','Canadá','🇨🇦'],['PH','Filipinas','🇵🇭'],['LT','Lituania','🇱🇹'],['RS','Serbia','🇷🇸'],['GR','Grecia','🇬🇷'],['NG','Nigeria','🇳🇬'],['JP','Japón','🇯🇵'],['AU','Australia','🇦🇺'],['XX','Otro','🌍']];
const cinfo=c=>CTRY.find(x=>x[0]===c)||CTRY[CTRY.length-1];
const TZ={'Europe/Madrid':'ES','Atlantic/Canary':'ES','America/Mexico_City':'MX','America/Monterrey':'MX','America/Argentina/Buenos_Aires':'AR','America/Buenos_Aires':'AR','America/Bogota':'CO','America/Santiago':'CL','America/Lima':'PE','America/Caracas':'VE','America/Guayaquil':'EC','America/Montevideo':'UY','America/Sao_Paulo':'BR','Europe/Lisbon':'PT','Europe/Paris':'FR','Europe/Rome':'IT','Europe/Berlin':'DE','Europe/London':'GB','America/Toronto':'CA','America/Vancouver':'CA','Asia/Manila':'PH','Europe/Vilnius':'LT','Europe/Belgrade':'RS','Europe/Athens':'GR','Africa/Lagos':'NG','Asia/Tokyo':'JP','Australia/Sydney':'AU','America/New_York':'US','America/Chicago':'US','America/Denver':'US','America/Los_Angeles':'US'};
function detect(){// país aproximado por zona horaria / idioma del navegador (sin enviar nada a ningún servidor)
 try{const z=Intl.DateTimeFormat().resolvedOptions().timeZone;if(TZ[z])return TZ[z]}catch(e){}
 try{const l=(navigator.languages&&navigator.languages[0])||navigator.language||'';const m=l.split('-')[1];if(m&&CTRY.some(x=>x[0]===m.toUpperCase()))return m.toUpperCase()}catch(e){}return 'XX'}
const R=()=>{const r=save.rk||(save.rk={t:0,best:0,w:0,l:0,streak:0,cc:null,claimed:0,auto:1});if(!r.cc){r.cc=detect()}return r};
const lgOf=t=>{let k=0;LG.forEach((l,i)=>{if(t>=l.t)k=i});return k};
const uid=()=>{try{if(window.FBX&&FBX.user&&FBX.user.uid)return FBX.user.uid;let v=localStorage.getItem('gh_rk_uid');if(!v){v='L'+Math.random().toString(36).slice(2,9);localStorage.setItem('gh_rk_uid',v)}return v}catch(e){return 'L0'}};
const myName=()=>window.FBX&&FBX.user&&FBX.user.name?FBX.user.name:'Invitado';
window.RANK={R,lgOf,LG,cinfo,detect,flag:()=>cinfo(R().cc)[2],trophies:()=>R().t};
/* ---- bots simulados (modo local) ---- */
const BN=['Rafa','Dani','Luna','Kike','Nora','Tano','Iris','Marlo','Zeta','Pipo','Ámbar','Brais','Cleo','Dídac','Elio','Fran','Gala','Hugo','Ivo','Jara','Koke','Lola','Mateo','Nilo','Olga','Pau','Quim','Rita','Saúl','Teo'];
function bots(){const r=(()=>{let a=1234567;return()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296}})(),out=[];
 for(let i=0;i<60;i++){const cc=CTRY[Math.floor(r()*(CTRY.length-1))][0],t=Math.floor(Math.pow(r(),2.2)*4800);out.push({u:'b'+i,n:BN[i%BN.length]+(10+Math.floor(r()*89)),t,cc,bot:1})}return out}
/* ---- Firebase (si está configurado) ---- */
let fb=null;
async function fbInit(){if(fb!==null)return fb;fb=false;try{const cfg=window.FIREBASE_CONFIG;if(!(cfg&&cfg.apiKey&&!/TU_|YOUR_/i.test(cfg.apiKey)))return fb;if(!(window.FBX&&FBX.user))return fb;const b='https://www.gstatic.com/firebasejs/10.12.2/';const[a,d]=await Promise.all([import(b+'firebase-app.js'),import(b+'firebase-database.js')]);const app=a.getApps().length?a.getApp():a.initializeApp(cfg);fb={d,db:d.getDatabase(app,cfg.databaseURL)}}catch(e){fb=false}return fb}
let lastPush=0;
async function push(){try{const f=await fbInit();if(!f)return;const r=R();await f.d.set(f.d.ref(f.db,'rank/'+uid()),{n:myName().slice(0,14),t:Math.max(0,Math.min(9999,r.t|0)),cc:String(r.cc).slice(0,2),w:r.w|0})}catch(e){}}
async function fetchTop(){const f=await fbInit();if(f){try{const q=f.d.query(f.d.ref(f.db,'rank'),f.d.orderByChild('t'),f.d.limitToLast(100)),s=await Promise.race([f.d.get(q),new Promise((_,j)=>setTimeout(()=>j(0),7000))]),v=s.val()||{},L=[];for(const u in v)L.push({u,n:v[u].n,t:v[u].t,cc:v[u].cc});return{L,real:1}}catch(e){}}
 return{L:bots(),real:0}}
/* ---- rivales IA por liga ---- */
function rival(){const r=R(),k=lgOf(r.t),pool=CH.filter(c=>!c.hide&&c.rar<=Math.min(4,1+Math.ceil(k*.7))),c=pool[Math.floor(Math.random()*pool.length)],diff=k<2?0:k<5?1:2;
 const nm=BN[Math.floor(Math.random()*BN.length)]+(10+Math.floor(Math.random()*89)),cc=CTRY[Math.floor(Math.random()*(CTRY.length-1))][0];
 return{c,diff,lvl:3+k*2+(Math.random()*3|0),st:Math.min(5,Math.floor(k*.8)+(Math.random()*2|0)),nm,cc}}
const A=MMX.ACT;
const bar=r=>{const k=lgOf(r.t),l=LG[k],n=LG[k+1],p=n?(r.t-l.t)/(n.t-l.t):1;return`<div class="rkbar"><i style="width:${Math.round(p*100)}%;background:${l.c}"></i></div><small>${n?`${r.t} / ${n.t} 🏆 → ${n.i} ${n.n}`:'¡LIGA MÁXIMA!'}</small>`};
A.rank=()=>{const r=R(),k=lgOf(r.t),l=LG[k],ci=cinfo(r.cc);
 view(`${MMX.head('🏅 RANKEADO 1 vs 1','hub')}<div class="mmbody rk"><div class="rkhero" style="--lc:${l.c}"><div class="rkic">${l.i}</div><b>${l.n}</b><div class="rkt">🏆 ${r.t}</div>${bar(r)}</div>
 <div class="rkrow"><span>🌍 Tu país: <b>${ci[2]} ${ci[1]}</b></span><button class="btn small" data-a="rkCountry">CAMBIAR</button></div>
 <div class="mmrec">Victorias ${r.w} · Derrotas ${r.l} · Racha ${r.streak}🔥 · Récord ${r.best} 🏆</div>
 <div class="mmbtns"><button class="btn main" data-a="rkGo">⚔ BUSCAR PARTIDA</button><button class="btn" data-a="rkTop" data-v="g">🌎 TOP GLOBAL</button><button class="btn" data-a="rkTop" data-v="c">${ci[2]} TOP PAÍS</button><button class="btn ghost" data-a="rkLeagues">📜 LIGAS Y PREMIOS</button></div></div>`)};
A.rkLeagues=()=>{const r=R();view(`${MMX.head('📜 LIGAS','rank')}<div class="mmbody"><div class="rklist">${LG.map((l,i)=>{const got=r.claimed>=i,can=r.t>=l.t&&!got&&i>0&&r.claimed===i-1;return`<div class="rkl${r.t>=l.t?' ok':''}" style="--lc:${l.c}"><i>${l.i}</i><b>${l.n}</b><small>desde ${l.t} 🏆</small><span>${i?`+${l.r[0]} 🪙${l.r[1]?` +${l.r[1]} 💎`:''}`:'Inicio'}</span>${i?got?'<em>✔</em>':can?`<button class="btn small main" data-a="rkClaim" data-v="${i}">RECLAMAR</button>`:'<em>🔒</em>':''}</div>`}).join('')}</div></div>`)};
A.rkClaim=v=>{const r=R(),i=+v;if(!(r.t>=LG[i].t&&r.claimed===i-1))return;r.claimed=i;const w=pay(LG[i].r[0],LG[i].r[1],'Liga');if(window.SEASON)SEASON.xp(60);try{SND.play('claim')}catch(e){}toast(`¡Premio de ${LG[i].n}! +${w.c} 🪙${w.g?` +${w.g} 💎`:''}`);A.rkLeagues()};
A.rkCountry=()=>{const r=R();view(`${MMX.head('🌍 TU PAÍS','rank')}<div class="mmbody"><p>Lo detectamos por la zona horaria de tu dispositivo (sin pedir ubicación). Cámbialo si no es correcto:</p><div class="rkc">${CTRY.map(c=>`<button class="btn small${c[0]===r.cc?' main':''}" data-a="rkSet" data-v="${c[0]}">${c[2]} ${c[1]}</button>`).join('')}</div></div>`)};
A.rkSet=v=>{R().cc=v;store();push();A.rank()};
A.rkTop=async v=>{const r=R();view(`${MMX.head(v==='c'?'🏅 TOP '+cinfo(r.cc)[1].toUpperCase():'🌎 TOP GLOBAL','rank')}<div class="mmbody"><p>Cargando…</p></div>`);
 const {L,real}=await fetchTop();let me=L.find(x=>x.u===uid());if(!me){me={u:uid(),n:myName(),t:r.t,cc:r.cc,me:1};L.push(me)}else{me.t=r.t;me.cc=r.cc}
 let X=L.filter(x=>v!=='c'||x.cc===r.cc).sort((a,b)=>b.t-a.t);const pos=X.findIndex(x=>x.u===uid())+1;
 view(`${MMX.head(v==='c'?'🏅 TOP '+cinfo(r.cc)[1].toUpperCase():'🌎 TOP GLOBAL','rank')}<div class="mmbody"><div class="mmrec">Tu puesto: <b>#${pos}</b> · ${r.t} 🏆</div><div class="rktop">${X.slice(0,50).map((x,i)=>{const l=LG[lgOf(x.t)];return`<div class="rkp${x.u===uid()?' me':''}"><b>${i<3?['🥇','🥈','🥉'][i]:'#'+(i+1)}</b><span>${cinfo(x.cc)[2]}</span><em>${x.u===uid()?'TÚ · ':''}${String(x.n||'?').replace(/[<>&]/g,'')}</em><i>${l.i}</i><strong>${x.t} 🏆</strong></div>`}).join('')}</div><small class="mmsm">${real?'Clasificación real de jugadores conectados.':'Modo local: se muestran jugadores simulados para probar. Con Firebase configurado verás jugadores reales.'}</small></div>`)};
A.rkGo=()=>{const r=R(),k=lgOf(r.t),V=rival(),rv={id:V.c.id,lvl:V.lvl,st:V.st};
 launch(V.diff,rv,G=>{G.t=100;G.rkn=V.nm},(w,g)=>{const r=R();let d;
  if(w){r.streak++;d=25+Math.min(10,r.streak)*2+(g.s[0]-g.s[1]>=10?5:0);r.w++}else{r.streak=0;d=-(12+k*2);r.l++}
  const before=lgOf(r.t);r.t=Math.max(0,r.t+d);r.best=Math.max(r.best,r.t);const after=lgOf(r.t);store();push();
  
  view(`${MMX.head(w?'🏆 ¡VICTORIA!':'💔 DERROTA','rank')}<div class="mmbody"><div class="mmres ${w?'':'bad'}">${g.s[0]} - ${g.s[1]}</div><p>vs <b>${cinfo(V.cc)[2]} ${V.nm}</b></p><p class="mmwin" style="color:${w?'#4ade80':'#f87171'}">${d>0?'+':''}${d} 🏆</p>${after>before?`<p class="mmwin">🎉 ¡SUBES A ${LG[after].i} ${LG[after].n}!</p>`:after<before?`<p>Bajas a ${LG[after].n}</p>`:''}<div class="mmrec">🏆 ${r.t}</div><div class="mmbtns"><button class="btn main" data-a="rkGo">⚔ OTRA PARTIDA</button><button class="btn" data-a="rank">PANEL</button></div></div>`);try{SND.play(w?'levelup':'buzz')}catch(e){}})};
window.RANK.open=()=>A.rank();
setTimeout(push,4000);
})();
