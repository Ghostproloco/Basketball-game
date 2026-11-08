// ===== MODO CARRERA v3 · creador, liga, playoffs, derbis, insignias, logros, tienda, prensa y eventos =====
(()=>{
const KEY='gh_career_v2',TMPK='gh_career_tmp',COLS=["#d83636","#36d836","#d88736","#36d836","#3687d8","#d83636","#3687d8","#d88736","#3687d8","#3687d8","#36d8d8","#d83636","#3687d8","#8736d8","#3687d8","#d88736","#d83636","#d88736","#3636d8","#d88736","#8736d8","#3687d8","#d88736","#d88736","#3687d8","#d83636","#d83636","#d88736","#3687d8","#3687d8","#d83636","#3687d8","#d83687","#d88736","#3687d8","#3687d8","#3687d8","#3687d8","#36d836","#7f7f99","#d88736","#3687d8","#8736d8","#d83636","#3687d8","#8736d8","#d83636","#d88736","#3687d8","#3687d8"];
const TN=['Dragones Rojos','Wyverns Verdes','Águilas Doradas','Tréboles','Panteras Azules','Meteoros','Brújula FC','Espadas Reales','Lobos Grises','Torbellino','Avispas','Tigres','Delfines','Gárgolas','Gorilas','Estrellas','Cometas de Fuego','Coronas','Mosqueteros','Montañeses','Castillo Púrpura','Pegasos','Águilas Calvas','Anclas','Olas del Norte','Tornados','Torres de Piedra','Tiburones','Yetis','Lises','Fénix','Caballitos de Mar','Remolinos','Llaves Cruzadas','Glaciares','Coyotes','Patriotas','Cohetes','Escarabajos','Viudas Negras','Valientes','Llamas Azules','Caballeros','Huracanes','Corceles','Cometas Violeta','Guardianes','Halcones de Oro','Osos Polares','Eclipse'];
const POS=['PG','SG','SF','PF','C'],PN={PG:'Base',SG:'Escolta',SF:'Alero',PF:'Ala-Pívot',C:'Pívot'};
const SKS=['vel','tir','mat','reg','def','pas','reb','agu'],STN={vel:'Explosión',tir:'Puntería',mat:'Al aro',reg:'Manejo',def:'Muro',pas:'Visión',reb:'Garra',agu:'Aguante'};
const W={PG:[2,2,.5,3,1,3,.3,1],SG:[2,3.5,1,2,1,1.5,.5,1],SF:[2,2.5,2,1.5,1.5,1.2,1.2,1.2],PF:[1,1,3,.7,2.5,.8,3,1.5],C:[.7,.5,3.5,.4,3,.6,3.5,1.5]};
const DN=['ÉLITE','PLATA','BRONCE'],DC=['#ffd23d','#c0c8d8','#d98a4a'],DSAL=[1800,600,200],DDIF=[2,1,0],DSZ=[6,5,5];
const STY={eq:{n:'Equilibrado',e:'⚖',d:'Sin puntos débiles',m:{}},anot:{n:'Anotador',e:'🎯',d:'+Puntería · +Al aro',m:{tir:6,mat:5}},def:{n:'Defensor',e:'🧱',d:'+Muro · +Garra',m:{def:7,reb:6}},crea:{n:'Creador',e:'🪄',d:'+Manejo · +Visión',m:{reg:6,pas:7,vel:2}},atle:{n:'Atleta',e:'🚀',d:'+Explosión · +Aguante',m:{vel:6,agu:6,mat:2}}};
const NOMBRES=['Rayo','Dani','Marc','Leo','Nico','Álex','Kai','Iván','Hugo','Sergi','Max','Toni','Lucas','Dario','Axel','Bruno','Jonás','Pau','Teo','Gael','Rubén','Samu','Oriol','Nando','Yago','Cris','Mateo','Biel','Aitor','Enzo'];
const SHOP=[{n:'Zapatillas Rayo',d:'+3 Explosión',k:'vel',p:2500,e:'👟'},{n:'Muñequera Sniper',d:'+3 Puntería',k:'tir',p:2500,e:'🎯'},{n:'Rodilleras Muro',d:'+3 Muro',k:'def',p:2500,e:'🛡'},{n:'Guantes Pegajosos',d:'+3 Manejo',k:'reg',p:2500,e:'🧤'},{n:'Entrenador personal',d:'+25% éxito al entrenar',k:'pt',p:6000,e:'🧑‍🏫'},
 {n:'Agente deportivo',d:'+20% de sueldo por partido',k:'ag',p:5000,e:'🕴'},{n:'Fisioterapeuta',d:'Lesiones 1 jornada más cortas',k:'fi',p:4500,e:'🩺'},{n:'Nutricionista',d:'+10 energía extra cada jornada',k:'nu',p:4000,e:'🥗'},{n:'Pista en casa',d:'+1 acción de entreno por jornada',k:'pi',p:9000,e:'🏠'}];
const CONS=[{n:'Bebida isotónica',d:'+30 energía',p:300,e:'🥤',f:()=>{C.en=Math.min(100,C.en+30)}},{n:'Masaje deportivo',d:'+10 energía y -1 jornada de lesión',p:600,e:'💆',f:()=>{if(C.inj>0)C.inj--;C.en=Math.min(100,C.en+10)}},{n:'Corte de pelo',d:'+5 moral y +2 fama',p:400,e:'💈',f:()=>{C.mor=cl(C.mor+5,0,100);C.fame+=2}},{n:'Cena con el equipo',d:'+6 confianza del míster',p:700,e:'🍕',f:()=>{C.trust=cl(C.trust+6,0,100)}}];
const INT=[{n:'SUAVE',e:6,m:.7,r:0},{n:'NORMAL',e:10,m:1,r:0},{n:'INTENSO',e:16,m:1.5,r:.1}];
const BDG=[{k:'tir',e:'🎯',n:'Francotirador',d:'Puntería 70+: +3 en partido'},{k:'vel',e:'⚡',n:'Cohete',d:'Explosión 70+: +3 en partido'},{k:'def',e:'🧱',n:'Muro',d:'Muro 70+: +3 en partido'},{k:'reb',e:'🦍',n:'Imán de rebotes',d:'Garra 70+: +3 en partido'},{k:'reg',e:'🪄',n:'Mago del balón',d:'Manejo 70+: +3 en partido'},{k:'mat',e:'💥',n:'Matador',d:'Al aro 70+: +3 en partido'},{k:'agu',e:'🫀',n:'Pulmones',d:'Aguante 75+: +3 en partido'}];
const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[r(0,a.length-1)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),avg=a=>a.reduce((x,y)=>x+y,0)/(a.length||1),shuf=a=>a.slice().sort(()=>Math.random()-.5);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let C=null;try{C=JSON.parse(localStorage.getItem(KEY))}catch(e){}if(C&&(!C.p||!C.t))C=null;
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}};
/* restos de un partido que se cortó (cierre del navegador) */
try{const tm=JSON.parse(localStorage.getItem(TMPK));if(tm){(tm.added||[]).forEach(i=>delete save.owned[i]);if(tm.sel!=null&&save.owned[tm.sel])save.sel=tm.sel;save.lineup=tm.lineup||null;localStorage.removeItem(TMPK);store()}}catch(e){}
const slotOf=p=>p=='PG'||p=='SG'?0:p=='SF'?1:2,ov=id=>ovrOf(statsOf(id,1,0));
const ovrSt=(st,pos)=>{const w=W[pos];return Math.round(SKS.reduce((a,k,i)=>a+st[k]*w[i],0)/w.reduce((a,b)=>a+b,0))};
const ovrP=()=>ovrSt(C.p.st,C.p.pos),str=t=>Math.round(avg(C.t[t].ids.slice(0,3).map(ov)));
const divOf=t=>C.dv.findIndex(d=>d.includes(t));
const logo=(t,s=40)=>{const T=C.t[t];return`<img class="clg" alt="" src="${crest(T.lg,T.col)}" style="width:${s}px;height:${Math.round(s*1.12)}px">`};
const fig=(id,col,w=44,cls='')=>`<canvas class="fg ${cls}" data-fig="${id}" data-col="${col}" style="width:${w}px;height:${Math.round(w*1.11)}px"></canvas>`;
const badgesOf=st=>BDG.filter(b=>st[b.k]>=(b.k=='agu'?75:70));
const form=()=>Math.round(((.9+.1*C.en/100)*(.94+.06*C.mor/100)-1)*100);
/* ---- migración de partidas guardadas ---- */
function migrate(){if(!C)return;C.v=3;
 C.tot=Object.assign({g:0,pts:0,reb:0,ast:0,stl:0,blk:0,w:0,l:0,street:0,streetW:0,press:0,titles:0,best:0,maxp:0,dbl:0,derby:0},C.tot||{});
 C.ach=C.ach||{};C.res=C.res||[];C.streak=C.streak||0;C.bst=C.bst||0;C.aw=C.aw||[];C.cons=C.cons||0;C.own=C.own||{};C.hist=C.hist||[];C.log=C.log||[];
 if(C.p.num==null)C.p.num=r(1,99);if(!C.p.sty)C.p.sty='eq';if(C.bd==null)C.bd=divOf(C.myT);if(C.rival==null)setRival();if(C.phase==null)C.phase='hub'}
function setRival(){const d=divOf(C.myT),c=C.dv[d].filter(t=>t!==C.myT);C.rival=c.length?pick(c):null}
/* ---- mi jugador usa la cara/personaje de un ÉPICO (se aplica solo durante el partido) ---- */
let ORIG=null;
function clearFig(id){Object.keys(figC).forEach(k=>{if(k.startsWith(id+'|'))delete figC[k]});Object.keys(figK).forEach(k=>{if(k.startsWith(id+'|'))delete figK[k]})}
function effBase(){const m=(.9+.1*C.en/100)*(.94+.06*C.mor/100)*(1+(C.buff||0)),b={},bd=badgesOf(C.p.st).map(x=>x.k);for(const k of SKS)b[k]=cl(Math.round(C.p.st[k]*m)+(bd.includes(k)?3:0),20,99);return b}
function applyMe(col){const c=CH[C.p.cid];ORIG={id:c.id,name:c.name,h:c.h,base:c.base,jc:c.jc,b8:c.b8};c.name=C.p.name;c.h=.9+(C.p.cm-170)/55*.4;c.base=effBase();c.jc=col;delete c.b8;clearFig(c.id)}
function restoreMe(){if(!ORIG)return;const c=CH[ORIG.id];Object.assign(c,{name:ORIG.name,h:ORIG.h,base:ORIG.base,jc:ORIG.jc});if(ORIG.b8)c.b8=ORIG.b8;else delete c.b8;clearFig(c.id);ORIG=null}
/* ---- liga con los personajes del juego ---- */
function orderSlots(ids){const s=ids.slice().sort((a,b)=>ov(b)-ov(a)),st=s.slice(0,3),out=[null,null,null],P=[['PG','SG'],['SF','SG'],['PF','C']];
 st.forEach(id=>{const k=P.findIndex((q,i)=>!out[i]&&q.includes(CH[id].pos));if(k>=0)out[k]=id});st.forEach(id=>{if(!out.includes(id))out[out.indexOf(null)]=id});return out.concat(s.slice(3))}
function sched(ts){ts=shuf(ts);if(ts.length%2)ts.push(-1);const n=ts.length,R=[];for(let k=0;k<n-1;k++){const p=[];for(let i=0;i<n/2;i++){let a=ts[i],b=ts[n-1-i];if(k%2)[a,b]=[b,a];p.push([a,b])}R.push(p);ts.splice(1,0,ts.pop())}return R.concat(R.map(q=>q.map(([a,b])=>[b,a])))}
const tables=()=>{C.rec=C.t.map(()=>({w:0,l:0,pf:0,pa:0}));C.fx=C.dv.map(sched);C.rd=0;C.pl=null;C.res=[]};
function createLeague(){const pool=CH.filter(c=>c.id!==C.p.cid&&!c.hide).map(c=>c.id).sort((a,b)=>ov(b)-ov(a)),lg=shuf([...Array(50).keys()]).slice(0,16);let off=0,ti=0;C.t=[];C.dv=[];
 DSZ.forEach((n,di)=>{const ch=pool.slice(off,off+n*4);off+=n*4;const ts=Array.from({length:n},()=>[]);ch.forEach((id,i)=>{const q=Math.floor(i/n);ts[q%2?n-1-i%n:i%n].push(id)});C.dv[di]=[];
  ts.forEach(ids=>{C.t[ti]={n:TN[lg[ti]],lg:lg[ti],col:COLS[lg[ti]],ids:orderSlots(ids)};C.dv[di].push(ti++)})});tables()}
/* fuerza de un equipo para simular (si soy titular cuenta mi nivel) */
function pw(t){const ids=C.t[t].ids.slice(0,3);if(t===C.myT&&C.p){const co=coach();if(co.role=='TITULAR'){const k=slotOf(C.p.pos);return avg(ids.map((id,i)=>i===k?ovrP():ov(id)))}}return avg(ids.map(ov))}
function simGame(a,b){const sa=pw(a),sb=pw(b),w=Math.random()<1/(1+Math.exp(-(sa-sb)/9)),ws=56+r(0,24),ls=ws-r(1,14);return w?[ws,ls]:[ls,ws]}
function rec(a,b,sa,sb){const A=C.rec[a],B=C.rec[b];A.pf+=sa;A.pa+=sb;B.pf+=sb;B.pa+=sa;sa>sb?(A.w++,B.l++):(B.w++,A.l++)}
function simRound(skip){C.dv.forEach((d,di)=>{const R=C.fx[di][C.rd];if(!R)return;for(const[a,b]of R){if(a<0||b<0||skip&&(a===C.myT||b===C.myT))continue;const[x,y]=simGame(a,b);rec(a,b,x,y);
 if(x-y>=22&&Math.random()<.35)log('📰 '+C.t[a].n+' arrasa a '+C.t[b].n+' ('+x+'-'+y+')');else if(y-x>=22&&Math.random()<.35)log('📰 '+C.t[b].n+' arrasa a '+C.t[a].n+' ('+y+'-'+x+')')}})}
const table=d=>C.dv[d].slice().sort((a,b)=>C.rec[b].w-C.rec[a].w||(C.rec[b].pf-C.rec[b].pa)-(C.rec[a].pf-C.rec[a].pa));
/* ---- playoffs (partido único: semifinales y final) ---- */
function initPlayoffs(){const d=divOf(C.myT),s=table(d).slice(0,4);C.pl={d,seeds:s,stage:0,g:[[s[0],s[3]],[s[1],s[2]]],out:false,champ:null,ev:[]};if(!s.includes(C.myT)){C.pl.out=true;plAuto()}}
function plStep(forced){const P=C.pl,win=[];P.g.forEach(g=>{let w;if(forced&&g.includes(C.myT))w=forced.w;else{const[x,y]=simGame(g[0],g[1]);w=x>y?g[0]:g[1];P.ev.push(`${C.t[g[0]].n} ${x}-${y} ${C.t[g[1]].n}`)}win.push(w)});
 if(P.stage===0){const sd=win.slice().sort((a,b)=>P.seeds.indexOf(a)-P.seeds.indexOf(b));P.g=[[sd[0],sd[1]]];P.stage=1}else{P.champ=win[0];P.stage=2}
 if(!win.includes(C.myT))P.out=true}
function plAuto(){while(C.pl.stage<2)plStep(null)}
/* ---- entrenador IA ---- */
function coach(){const t=C.t[C.myT],k=slotOf(C.p.pos),sid=t.ids[k],st=CH[sid],so=ov(sid),me=ovrP(),pr=C.rd<5?C.prom:0,eff=me+(C.trust-50)*.15+(C.mor-60)*.05+pr,d=eff-so;let role,why,at=0;
 if(C.inj>0){role='LESIONADO';why=`Estás lesionado ${C.inj} jornada(s) más. Descansa y recupérate.`}
 else if(C.en<25&&d>=-1){role='BANQUILLO';why='Vienes muy cansado, hoy descansas un rato.';at=70}
 else if(d>=-1){role='TITULAR';why=d>5?'Estás en gran momento, eres indiscutible.':'Te has ganado el puesto en el cinco inicial.'}
 else if(d>=-9){role='BANQUILLO';at=d>=-4?100:60;why=`${st.name} (${so}) va por delante de ti (${me}). Tendrás minutos al final.`}
 else{role='NO CONVOCADO';why=`Aún te falta nivel (${me}) frente a ${st.name} (${so}). Entrena y demuestra.`}
 return{role,why,at,sid}}
function coachMsg(n){const e=C.co.s;if(n==null)return pick(['Concentrados. Quiero intensidad desde el primer segundo.','Hoy toca disciplina atrás y balón en movimiento.','Confío en el grupo, vamos a por el partido.','Defensa primero, el ataque llegará solo.']);
 if(n>=8)return pick(['¡Partidazo! Así se gana un sitio en mi quinteto.','Eso es jugar al baloncesto. Sigue así.']);if(n>=6.5)return e=='Exigente'?'Bien, pero sé que puedes dar más.':'Buen trabajo hoy, vas por el buen camino.';
 return e=='Exigente'?'Esto no es suficiente. Quiero ver más trabajo en los entrenos.':'Hoy no salió, pero hay que seguir trabajando.'}
/* ---- estilos ---- */
const css=document.createElement('style');css.textContent=`#career{justify-content:flex-start;align-items:stretch;gap:6px;padding-bottom:6px;background:radial-gradient(circle at 70% -10%,#26307a,#090b1f 60%);font-family:system-ui,sans-serif;color:#eaf0ff;overflow:hidden}
#career *{box-sizing:border-box}#career h2,.pxt{font:11px 'Press Start 2P',monospace;color:#ffd23d;margin:2px 0;text-shadow:0 2px 0 #000}.pxt.sm{font-size:9px}
.chd{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:14px;background:linear-gradient(90deg,rgba(18,24,70,.95),rgba(30,20,70,.9)),url(assets/neon.jpg) center/cover;border:2px solid #3a4ab0;box-shadow:0 0 14px #3a4ab055;flex:none}
.chd b{font-size:13px;display:block}.chd small{font-size:10px;color:#9fb0e0}.chips{display:flex;gap:5px;flex-wrap:wrap;margin-left:auto;justify-content:flex-end}
.chip{display:flex;flex-direction:column;gap:2px;font-size:8px;color:#9fb0e0;min-width:54px}.chip i{display:block;height:7px;border-radius:4px;background:#1a2050;overflow:hidden}.chip u{display:block;height:100%}.chip b{font-size:11px;color:#ffd23d}
#cbody{flex:1;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:8px;align-content:start;padding:2px}
.cd{background:linear-gradient(160deg,#141a4a,#0d1030);border:2px solid #2c3a9a;border-radius:14px;padding:10px;box-shadow:0 4px 0 #070920}.cd.wide{grid-column:1/-1}.cd.gold{border-color:#ffd23d;box-shadow:0 0 16px #ffd23d55}.cd.ok{border-color:#4ade80}
.tabs{display:flex;gap:4px;overflow-x:auto;flex:none;scrollbar-width:none}.tabs::-webkit-scrollbar{display:none}.tabs button{flex:1 0 auto;padding:9px 8px;font:8px 'Press Start 2P',monospace;color:#9fb0e0;background:#10153d;border:2px solid #2c3a9a;border-radius:10px;white-space:nowrap}.tabs button.on{color:#fff;background:linear-gradient(#3550d0,#22318f);border-color:#8fb6ff;box-shadow:0 0 10px #5aa0ff88}
.cb{min-height:44px;padding:10px 12px;font:9px 'Press Start 2P',monospace;color:#fff;background:linear-gradient(#3550d0,#1f2b82);border:3px solid #8fb6ff;border-radius:12px;box-shadow:0 4px 0 #0a1040;line-height:1.5;text-align:center;cursor:pointer}.cb:active{transform:translateY(3px);box-shadow:0 1px 0 #0a1040}
.cb.go{background:linear-gradient(#22c35f,#0f7a3a);border-color:#8bffb3;box-shadow:0 4px 0 #064420}.cb.red{background:linear-gradient(#e0403f,#8a1717);border-color:#ff9a9a}.cb.no{opacity:.35;filter:grayscale(.6)}.cb small{display:block;font:10px system-ui;color:#cfe0ff;margin-top:3px}
.rw{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.rw.center{justify-content:center}.sp{flex:1}.clg{object-fit:contain;filter:drop-shadow(0 2px 3px #000)}.fg{border-radius:10px;background:radial-gradient(#2a3590,#12163f);border:2px solid #3a4ab0}.fg.me{border-color:#4ade80;box-shadow:0 0 10px #4ade80aa}
.tag{font:8px 'Press Start 2P',monospace;padding:5px 7px;border-radius:7px;color:#fff}.stb{display:flex;align-items:center;gap:6px;font-size:11px;margin:4px 0}.stb b{width:76px;font-size:10px;color:#9fb0e0}.stb i{flex:1;height:9px;background:#1a2050;border-radius:5px;overflow:hidden}.stb u{display:block;height:100%;background:linear-gradient(90deg,#4aa8ff,#c05cff,#ff5ac8)}.stb span{width:24px;text-align:right}
#career table{width:100%;border-collapse:collapse;font-size:12px}#career td,#career th{padding:5px 3px;text-align:center}#career td:nth-child(2){text-align:left}#career tr.me{background:#2c45b0}#career tr.up td:first-child{color:#4ade80}#career tr.dn td:first-child{color:#ff6a6a}#career td img{vertical-align:middle}
#career input[type=text],#career input[type=number]{width:100%;padding:10px;border-radius:10px;border:2px solid #8fb6ff;background:#080a20;color:#fff;font-size:15px}
.faces{display:grid;grid-template-columns:repeat(auto-fill,minmax(72px,1fr));gap:6px;max-height:56vh;overflow:auto;padding:2px}.faces .fc{padding:4px;border:3px solid transparent;border-radius:12px;background:#10153d;text-align:center;font-size:9px;color:#9fb0e0;cursor:pointer}.faces .fc.on{border-color:#ffd23d;box-shadow:0 0 12px #ffd23d}.faces canvas{width:100%;height:auto;aspect-ratio:176/196;border-radius:8px;background:radial-gradient(#2a3590,#12163f)}
.stys{display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:6px}.stys .cb{padding:8px 4px;font-size:8px}.bigfig{width:128px;height:128px;border-radius:14px;background:radial-gradient(#2a3590,#12163f);border:2px solid #4ade80;box-shadow:0 0 14px #4ade8099;flex:none}
#cres{position:absolute;inset:0;z-index:60;background:radial-gradient(circle at 50% 0,#222a70f2,#05071af8 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#fff;padding:12px;overflow:auto;text-align:center;font-family:system-ui,sans-serif}#cres.hidden{display:none}
#cres .opts{display:flex;flex-direction:column;gap:7px;width:min(520px,94vw)}#cres .mic{font-size:34px}.news{font-size:12px;padding:6px 0;border-bottom:1px dashed #2c3a9a}.big{font-size:30px;font-weight:900}
.fm{display:inline-block;width:20px;height:20px;line-height:20px;border-radius:5px;font:9px 'Press Start 2P',monospace;text-align:center;margin:0 1px}.fm.w{background:#1fa35c}.fm.l{background:#a02a3a}
.bdg{display:flex;gap:8px;align-items:center;padding:5px 0;border-bottom:1px solid #1d2560;font-size:12px}.bdg i{font-style:normal;font-size:22px;width:30px;text-align:center}.bdg.off{opacity:.4;filter:grayscale(1)}.bdg small{display:block;color:#9fb0e0;font-size:10px}
.sh{display:flex;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid #1d2560}.sh i{font-style:normal;font-size:24px;width:32px;text-align:center}.sh small{display:block;color:#9fb0e0;font-size:10px}.sh .cb{min-width:84px;padding:8px}
.vs3{display:flex;justify-content:space-around;align-items:center;margin:8px 0}.vs3>div{text-align:center;min-width:90px}.vs3 .pxt{font-size:7px;max-width:130px;margin:3px auto}
.fxr{display:flex;gap:8px;align-items:center;font-size:12px;padding:4px 0;border-bottom:1px dashed #1d2560}.fxr .sp{flex:1}.sc{font:9px 'Press Start 2P',monospace;color:#ffd23d}
.brk{display:flex;flex-direction:column;gap:5px}.brk .g{display:flex;align-items:center;gap:6px;padding:5px 7px;border-radius:9px;background:#10153d;font-size:12px}.brk .g.me{outline:2px solid #4ade80}.brk .g b{flex:1}
@media (max-height:470px){#career{gap:4px;padding-top:6px}.chd{padding:3px 8px;gap:6px}.chd b{font-size:12px}.chd img{width:34px!important;height:38px!important}.chd small{font-size:9px}.chip{min-width:46px;font-size:7px}.chip b{font-size:10px}.tabs button{padding:6px 7px;font-size:7px}.cd{padding:8px}.cb{min-height:38px;padding:7px 9px;font-size:8px}#cbody{gap:6px}.bigfig{width:96px;height:96px}}`;document.head.appendChild(css);
const sec=document.createElement('section');sec.id='career';sec.className='screen hidden';document.body.appendChild(sec);
const res=document.createElement('div');res.id='cres';res.className='hidden';document.body.appendChild(res);
let TAB='home',LIVE=null,CRE=0,DTAB=null;const ACT={};
sec.onclick=e=>{const a=e.target.closest('[data-a]');if(a&&ACT[a.dataset.a]){try{ACT[a.dataset.a](a.dataset.v,a)}catch(err){console.error(err);toastC('Algo falló, vuelve a intentarlo')}}};res.onclick=sec.onclick;
/* pinta las caras: usa el canvas del personaje (antes se intentaba dibujar una URL y salían vacías) */
function paint(root){root.querySelectorAll('canvas[data-fig]').forEach(c=>{try{const src=figCanvas(+c.dataset.fig,c.dataset.col||undefined);c.width=176;c.height=196;const g=c.getContext('2d');g.clearRect(0,0,176,196);g.drawImage(src,0,0)}catch(e){console.warn('cara',e)}});try{mountPreviews(root)}catch(e){}}
const toastC=t=>{try{toast(t)}catch(e){}},log=t=>{C.log.push(t);if(C.log.length>30)C.log.shift()},pay=n=>{C.money=Math.max(0,C.money+n)};
const bar=(l,v,c)=>`<div class="chip">${l}<i><u style="width:${cl(v,0,100)}%;background:${c}"></u></i></div>`;
function hideHud(){$('#hud').classList.add('hidden');$('#controls').classList.add('hidden')}
function openHub(){hideHud();if(!C)return create();migrate();if(C.phase==='offers')return offers();show('#career');draw()}
function draw(){const old=$('#cbody'),sc=old&&DTAB===TAB?old.scrollTop:0,t=C.t[C.myT],d=divOf(C.myT),R=C.fx[d].length;
 sec.innerHTML=`<div class="chd">${logo(C.myT,42)}<div><b>${t.n}</b><small style="color:${DC[d]}">DIV. ${DN[d]} · Temp ${C.season} · Jornada ${Math.min(C.rd+1,R)}/${R}${C.inj>0?' · 🩹 lesionado':''}</small></div><div class="chips">${bar('⚡ ENERGÍA',C.en,'#4ade80')}${bar('😊 MORAL',C.mor,'#ffb23d')}${bar('🤝 MÍSTER',C.trust,'#5aa0ff')}<div class="chip">📣 FAMA<b>${C.fame}</b></div><div class="chip">💰 DINERO<b>${C.money}</b></div></div></div>
 <div class="tabs">${[['home','🏠 INICIO'],['liga','🏆 LIGA'],['team','👥 EQUIPO'],['me','🧍 YO'],['train','💪 ENTRENO'],['shop','🛒 TIENDA'],['ach','🏅 LOGROS'],['prensa','📰 PRENSA']].map(([k,l])=>`<button data-a="tab" data-v="${k}" class="${TAB==k?'on':''}">${l}</button>`).join('')}<button data-a="exit" style="flex:.4">⏏ MENÚ</button></div><div id="cbody"></div>`;
 ({home:vHome,liga:vLiga,team:vTeam,me:vMe,train:vTrain,shop:vShop,ach:vAch,prensa:vPrensa})[TAB]($('#cbody'));paint(sec);const nb=$('#cbody');if(nb)nb.scrollTop=sc;DTAB=TAB}
ACT.tab=v=>{TAB=v;draw()};ACT.exit=()=>{persist();LIVE=null;sec.classList.add('hidden');renderMenu()};
/* ---- calendario ---- */
function nextFx(){const d=divOf(C.myT),R=C.fx[d][C.rd];
 if(!R){if(!C.pl)initPlayoffs();const P=C.pl;if(P.stage<2&&!P.out){const g=P.g.find(x=>x.includes(C.myT));if(g)return{po:1,stage:P.stage,opp:g[0]===C.myT?g[1]:g[0],home:g[0]===C.myT}}return{end:1}}
 const p=R.find(x=>x[0]===C.myT||x[1]===C.myT);return p&&p[0]>=0&&p[1]>=0?{opp:p[0]===C.myT?p[1]:p[0],home:p[0]===C.myT}:{bye:1}}
const poName=s=>s?'FINAL':'SEMIFINAL';
const formChips=()=>C.res.slice(-5).map(x=>`<span class="fm ${x.w?'w':'l'}">${x.w?'V':'D'}</span>`).join('')||'<small style="color:#9fb0e0">—</small>';
/* ---- vistas ---- */
function objH(){const ob=C.obj;if(!ob)return'';const ok=objOk();return`<div class="cd"><div class="pxt sm">🎯 OBJETIVO DE LA DIRECTIVA</div><p style="margin:6px 0">${ob.t}<br><small style="color:${ok?'#4ade80':'#9fb0e0'}">${ok?'✔ ¡Cumplido por ahora!':'En progreso'} · Premio 💰${ob.pr}</small></p></div>`}
function calH(){const d=divOf(C.myT),out=[];for(let k=C.rd;k<C.fx[d].length&&out.length<4;k++){const p=C.fx[d][k].find(x=>x[0]===C.myT||x[1]===C.myT);out.push(p&&p[0]>=0&&p[1]>=0?(()=>{const o=p[0]===C.myT?p[1]:p[0];return`<div class="fxr"><span class="sc">J${k+1}</span>${logo(o,24)}<span class="sp">${C.t[o].n}${o===C.rival?' 🔥':''}</span><small>${p[0]===C.myT?'🏟 Local':'✈ Fuera'} · ⭐${str(o)}</small></div>`})():`<div class="fxr"><span class="sc">J${k+1}</span><span class="sp">😴 Descanso</span></div>`)}
 return out.length?`<div class="cd"><div class="pxt sm">📅 PRÓXIMAS JORNADAS</div>${out.join('')}</div>`:''}
function newsH(){return`<div class="cd"><div class="pxt sm">📣 ÚLTIMAS NOTICIAS</div>${C.log.slice(-4).reverse().map(x=>`<div class="news">• ${x}</div>`).join('')||'<small>Aún sin noticias.</small>'}</div>`}
function vHome(b){const fx=nextFx(),d=divOf(C.myT);
 if(fx.end){const P=C.pl,pos=table(d).indexOf(C.myT)+1,q=P.seeds.includes(C.myT);return b.innerHTML=`<div class="cd wide gold" style="text-align:center"><h2>🏁 TEMPORADA TERMINADA</h2><p>Terminas <b>${pos}º</b> en ${DN[d]} (${C.rec[C.myT].w}-${C.rec[C.myT].l}).</p><p style="color:#9fb0e0;font-size:13px">${q?(P.champ===C.myT?'🏆 ¡Eres el CAMPEÓN de los playoffs!':'Tu equipo cae en los playoffs.'):'Tu equipo no se clasifica para los playoffs.'}${P.champ!=null&&P.champ!==C.myT?'<br>Campeón: <b>'+C.t[P.champ].n+'</b>':''}</p><button class="cb go" data-a="endseason">📋 RESUMEN Y OFERTAS</button></div>${objH()}${newsH()}`}
 if(fx.bye)return b.innerHTML=`<div class="cd wide" style="text-align:center"><h2>😴 JORNADA DE DESCANSO</h2><p>Tu equipo no juega. Aprovecha para entrenar o recuperarte.</p><button class="cb go" data-a="skip">AVANZAR JORNADA ▶</button></div>${objH()}${calH()}${newsH()}`;
 const o=C.t[fx.opp],co=coach(),col={TITULAR:'#1fa35c',BANQUILLO:'#c98a12','NO CONVOCADO':'#a02a3a',LESIONADO:'#a02a3a'}[co.role],dby=fx.opp===C.rival;
 b.innerHTML=`<div class="cd gold"><div class="pxt sm">${fx.po?'🏆 PLAYOFFS · '+poName(fx.stage)+' · ':'PRÓXIMO PARTIDO · '}${fx.home?'🏟 LOCAL':'✈ VISITANTE'}${dby?' · 🔥 DERBI':''}</div><div class="vs3"><div>${logo(C.myT,60)}<div class="pxt">${C.t[C.myT].n}</div></div><div class="pxt" style="font-size:16px">VS</div><div>${logo(fx.opp,60)}<div class="pxt">${o.n}</div><small>⭐ Nivel ${str(fx.opp)} · Div. ${DN[divOf(fx.opp)]}</small></div></div><div class="rw center">${o.ids.slice(0,3).map(i=>fig(i,o.col,44)).join('')}</div><div class="rw center" style="margin-top:6px"><small style="color:#9fb0e0">Forma:</small> ${formChips()}</div></div>
 <div class="cd"><div class="rw"><span class="tag" style="background:${col}">${co.role}</span><b>Míster ${C.co.n}</b><small style="color:#9fb0e0">${C.co.s}</small></div><p style="margin:7px 0">🗣 ${co.why}</p><p style="margin:7px 0;color:#9fb0e0;font-size:12px">«${coachMsg()}»</p><p style="margin:4px 0;font-size:11px;color:#9fb0e0">Tu forma hoy: <b style="color:${form()>=-3?'#4ade80':'#ffb23d'}">${form()>0?'+':''}${form()}%</b> (energía y moral)</p>
 <div class="rw"><button class="cb go ${co.role=='NO CONVOCADO'||co.role=='LESIONADO'?'no':''}" data-a="play">▶ JUGAR</button><button class="cb" data-a="sim">⏩ SIMULAR</button>${co.role!='TITULAR'&&co.role!='LESIONADO'?`<button class="cb ${C.asked?'no':''}" data-a="ask">🙋 PEDIR MINUTOS</button>`:''}</div></div>${objH()}${fx.po?'':calH()}${newsH()}`}
function vLiga(b){const d=C.vd!=null?C.vd:divOf(C.myT),mine=divOf(C.myT),n=C.dv[d].length,pl=C.pl&&C.pl.d===d?C.pl:null;
 b.innerHTML=`<div class="rw cd wide">${[0,1,2].map(i=>`<button class="cb ${i==d?'go':''} sp" data-a="vd" data-v="${i}" style="font-size:8px">${DN[i]}${i==mine?' ★':''}</button>`).join('')}</div><div class="cd wide"><table><tr><th>#</th><th>Equipo</th><th>G</th><th>P</th><th>Dif</th></tr>${table(d).map((t,i)=>{const cls=(t===C.myT?'me ':'')+(d>0&&i==0?'up':d<2&&i==n-1?'dn':''),R=C.rec[t];return`<tr class="${cls}"><td>${i+1}</td><td>${logo(t,22)} ${C.t[t].n}${t===C.rival&&t!==C.myT?' 🔥':''}</td><td>${R.w}</td><td>${R.l}</td><td>${R.pf-R.pa}</td></tr>`}).join('')}</table><small style="color:#9fb0e0">🟢 El 1º sube de división · 🔴 El último baja · Los 4 primeros juegan playoffs</small></div>
 ${pl?`<div class="cd"><div class="pxt sm">🏆 PLAYOFFS ${DN[d]}</div><div class="brk">${pl.stage<2?pl.g.map(g=>`<div class="g ${g.includes(C.myT)?'me':''}">${logo(g[0],22)}<b>${C.t[g[0]].n}</b><span class="sc">VS</span><b style="text-align:right">${C.t[g[1]].n}</b>${logo(g[1],22)}</div>`).join(''):`<div class="g me">${logo(pl.champ,26)}<b>Campeón: ${C.t[pl.champ].n}</b></div>`}</div>${pl.ev.slice(-4).map(x=>`<div class="news">${x}</div>`).join('')}</div>`:''}
 <div class="cd"><div class="pxt sm">🧾 MIS RESULTADOS</div>${C.res.slice(-8).reverse().map(x=>`<div class="fxr"><span class="fm ${x.w?'w':'l'}">${x.w?'V':'D'}</span>${logo(x.opp,22)}<span class="sp">${x.po?'🏆 ':''}${C.t[x.opp].n}</span><span class="sc">${x.sa}-${x.sb}</span>${x.nota?`<small>⭐${x.nota}</small>`:''}</div>`).join('')||'<small style="color:#9fb0e0">Aún no has jugado.</small>'}</div>`}
ACT.vd=v=>{C.vd=+v;draw()};
function vTeam(b){const t=C.t[C.myT],co=coach(),tag=i=>i<3?'TITULAR':'RESERVA',row=(id,i)=>`<div class="rw" style="padding:5px 0;border-bottom:1px solid #1d2560">${fig(id,t.col,40)}<div class="sp"><b>${CH[id].name}</b><small>${CH[id].pos} · ${tag(i)}</small></div><b style="font-size:17px;color:#ffd23d">${ov(id)}</b></div>`;
 b.innerHTML=`<div class="cd wide"><div class="rw">${logo(C.myT,46)}<div class="sp"><div class="pxt sm">PLANTILLA · ${t.n}</div><small style="color:#9fb0e0">Nivel del equipo ${str(C.myT)} · Míster ${C.co.n} (${C.co.s}) · Confianza ${C.trust}%</small></div></div>${t.ids.map(row).join('')}<div class="rw" style="padding:5px 0">${fig(C.p.cid,t.col,40,'me')}<div class="sp"><b>${esc(C.p.name)} (TÚ) #${C.p.num}</b><small>${C.p.pos} · ${co.role}</small></div><b style="font-size:17px;color:#4ade80">${ovrP()}</b></div></div>
 ${C.rival!=null?`<div class="cd"><div class="pxt sm">🔥 RIVAL DE LA TEMPORADA</div><div class="rw" style="margin-top:6px">${logo(C.rival,44)}<div class="sp"><b>${C.t[C.rival].n}</b><small style="display:block;color:#9fb0e0">Ganar el derbi da +fama y moral</small></div><b style="color:#ffd23d;font-size:17px">${str(C.rival)}</b></div></div>`:''}`}
function vMe(b){const p=C.p,S=C.ss,g=S.g||1,T=C.tot,bd=badgesOf(p.st).map(x=>x.k);b.innerHTML=`<div class="cd"><div class="rw"><canvas class="bigfig" data-id="${p.cid}" data-col="${C.t[C.myT].col}" width="300" height="300"></canvas><div class="sp"><b style="font-size:17px">${esc(p.name)} <span style="color:#ffd23d">#${p.num}</span></b><small style="display:block">${PN[p.pos]} · ${p.cm} cm · ${p.age} años</small><small style="display:block;color:#9fb0e0">${STY[p.sty].e} ${STY[p.sty].n}</small><div class="pxt" style="font-size:22px;color:#4ade80;margin-top:6px">${ovrP()}</div><small>Potencial ★ ${p.pot}</small></div></div>${SKS.map(k=>`<div class="stb"><b>${STN[k]}</b><i><u style="width:${p.st[k]}%"></u></i><span>${p.st[k]}</span>${bd.includes(k)?'<span>★</span>':''}</div>`).join('')}</div>
 <div class="cd"><div class="pxt sm">🎖 INSIGNIAS</div>${BDG.map(x=>`<div class="bdg ${bd.includes(x.k)?'':'off'}"><i>${x.e}</i><div><b>${x.n}</b><small>${x.d}</small></div></div>`).join('')}</div>
 <div class="cd"><div class="pxt sm">TEMPORADA ${C.season}</div><p style="font-size:13px;line-height:1.7">Partidos <b>${S.g||0}</b> · Nota media <b>${S.g?(S.n/S.g).toFixed(1):'-'}</b><br>PTS ${(S.pts/g).toFixed(1)} · REB ${(S.reb/g).toFixed(1)} · AST ${(S.ast/g).toFixed(1)}<br>ROB ${(S.stl/g).toFixed(1)} · TAP ${(S.blk/g).toFixed(1)}</p><div class="pxt sm" style="margin-top:8px">TOTAL CARRERA</div><p style="font-size:13px;line-height:1.7">${T.g} partidos · ${T.w}V-${T.l}D · ${T.pts} pts · ${T.reb} reb · ${T.ast} ast<br>Mejor nota ${T.best||'-'} · Máx. puntos ${T.maxp} · Racha récord ${C.bst} · 🏆 ${T.titles}</p></div>
 <div class="cd"><div class="pxt sm">PALMARÉS</div>${C.hist.length?C.hist.slice().reverse().map(h=>`<div class="news">${h.c?'👑':h.t?'🏆':h.up?'⬆':'•'} Temp. ${h.s}: ${h.tn} (${DN[h.d]}) · ${h.pos}º · nota ${h.nota}${h.t?' · CAMPEÓN':''}</div>`).join(''):'<small>Tu historia empieza ahora.</small>'}${C.aw.length?`<div class="pxt sm" style="margin-top:8px">PREMIOS</div>${C.aw.slice(-6).reverse().map(a=>`<div class="news">🏅 ${a}</div>`).join('')}`:''}<button class="cb red" data-a="reset" style="font-size:8px;margin-top:10px">🗑 NUEVA CARRERA</button></div>`}
function vTrain(b){const I=INT[C.int],out=C.tp<=0||C.en<I.e||C.inj>0;b.innerHTML=`<div class="cd"><div class="pxt sm">INTENSIDAD</div><div class="rw" style="margin:6px 0">${INT.map((x,i)=>`<button class="cb sp ${C.int==i?'go':''}" data-a="int" data-v="${i}" style="font-size:8px">${x.n}<small>⚡-${x.e}${x.r?' · riesgo lesión':''}</small></button>`).join('')}</div>
 <div class="pxt sm">🎯 FOCO SEMANAL <small style="font-family:system-ui;color:#9fb0e0">(+25% éxito y mejora pasiva)</small></div><div class="rw" style="margin:6px 0">${SKS.map(k=>`<button class="cb ${C.focus==k?'go':''}" data-a="focus" data-v="${k}" style="font-size:7px;padding:7px 6px">${STN[k]}</button>`).join('')}</div>
 <div class="pxt sm">ENTRENAR · ${C.tp} acciones</div><div class="rw" style="margin-top:6px">${SKS.map(k=>`<button class="cb ${out?'no':''}" data-a="train" data-v="${k}" style="flex:1 1 45%">🏋 ${STN[k]}${C.focus==k?' 🎯':''}<small>${C.p.st[k]} / ${C.p.pot}</small></button>`).join('')}</div></div>
 <div class="cd"><div class="rw"><button class="cb sp ${C.tp<=0||C.en<15||C.inj>0?'no':''}" data-a="street">🏙 CALLE 1v1<small>Sube stats y fama</small></button><button class="cb sp ${C.tp<=0?'no':''}" data-a="rest">😴 DESCANSAR<small>+35 ⚡ · +4 😊</small></button></div></div>`}
function vShop(b){b.innerHTML=`<div class="cd wide"><div class="pxt sm">💰 TU DINERO: ${C.money}</div></div><div class="cd"><div class="pxt sm">🛒 MEJORAS PERMANENTES</div>${SHOP.map((s,i)=>`<div class="sh"><i>${s.e}</i><div class="sp"><b>${s.n}</b><small>${s.d}</small></div><button class="cb ${C.own[i]||C.money<s.p?'no':''}" data-a="buy" data-v="${i}">${C.own[i]?'✔':'💰'+s.p}</button></div>`).join('')}</div>
 <div class="cd"><div class="pxt sm">🧃 CONSUMIBLES</div>${CONS.map((s,i)=>`<div class="sh"><i>${s.e}</i><div class="sp"><b>${s.n}</b><small>${s.d}</small></div><button class="cb ${C.money<s.p?'no':''}" data-a="cons" data-v="${i}">💰${s.p}</button></div>`).join('')}</div>`}
function vAch(b){const n=ACH.filter(a=>C.ach[a.id]).length;b.innerHTML=`<div class="cd wide"><div class="pxt sm">🏅 LOGROS ${n}/${ACH.length}</div></div><div class="cd wide">${ACH.map(a=>{const ok=C.ach[a.id];return`<div class="bdg ${ok?'':'off'}"><i>${a.e}</i><div class="sp"><b>${a.n}</b><small>${a.d}</small></div><small style="text-align:right">${ok?'✔ Temp '+C.ach[a.id]:'🎁 '+(a.rw?'💰'+a.rw:'📣'+(a.fame||0))}</small></div>`}).join('')}</div>`}
function vPrensa(b){b.innerHTML=`<div class="cd wide"><div class="pxt sm">📰 EL DIARIO DEL ASFALTO</div>${C.log.length?C.log.slice().reverse().map(x=>`<div class="news">🗞 ${x}</div>`).join(''):'<small>Sin titulares todavía.</small>'}</div>`}
/* ---- logros ---- */
const ACH=[
{id:'deb',e:'🎽',n:'Debutante',d:'Juega tu primer partido',f:()=>C.tot.g>=1,rw:200},
{id:'w1',e:'✅',n:'Primera victoria',d:'Gana un partido',f:()=>C.tot.w>=1,rw:200},
{id:'r3',e:'🔥',n:'En racha',d:'Encadena 3 victorias',f:()=>C.bst>=3,rw:400},
{id:'r6',e:'🌋',n:'Imparable',d:'Encadena 6 victorias',f:()=>C.bst>=6,rw:900},
{id:'n8',e:'⭐',n:'Gran noche',d:'Nota 8.5 o más en un partido',f:()=>C.tot.best>=8.5,rw:600},
{id:'p20',e:'🏀',n:'Anotador',d:'Anota 20 puntos en un partido',f:()=>C.tot.maxp>=20,rw:600},
{id:'dd',e:'💪',n:'Doble-doble',d:'10 puntos y 10 rebotes en un partido',f:()=>C.tot.dbl>=1,rw:800},
{id:'o60',e:'📈',n:'Promesa',d:'Alcanza 60 de nivel',f:()=>ovrP()>=60,rw:500},
{id:'o70',e:'📈',n:'Jugador de élite',d:'Alcanza 70 de nivel',f:()=>ovrP()>=70,rw:1000},
{id:'o80',e:'🚀',n:'Superestrella',d:'Alcanza 80 de nivel',f:()=>ovrP()>=80,rw:2500},
{id:'bd',e:'🎖',n:'Especialista',d:'Consigue tu primera insignia',f:()=>badgesOf(C.p.st).length>=1,rw:500},
{id:'f1',e:'📣',n:'Conocido',d:'Alcanza 100 de fama',f:()=>C.fame>=100,rw:500},
{id:'f5',e:'🌟',n:'Icono',d:'Alcanza 500 de fama',f:()=>C.fame>=500,rw:2000},
{id:'ri',e:'💰',n:'Ahorrador',d:'Ten 10.000 en la cuenta',f:()=>C.money>=10000,rw:0,fame:20},
{id:'st',e:'🏙',n:'Rey de la calle',d:'Gana 5 retos callejeros',f:()=>C.tot.streetW>=5,rw:700},
{id:'pr',e:'🎤',n:'Estrella mediática',d:'Da 10 ruedas de prensa',f:()=>C.tot.press>=10,rw:500},
{id:'de',e:'⚔',n:'Rey del derbi',d:'Gana 3 derbis',f:()=>C.tot.derby>=3,rw:600},
{id:'s3',e:'📅',n:'Veterano',d:'Completa 3 temporadas',f:()=>C.hist.length>=3,rw:1000},
{id:'up',e:'⬆',n:'Ascenso',d:'Asciende de división',f:()=>C.hist.some(h=>h.up),rw:1500},
{id:'pl',e:'🥈',n:'Jugador de Plata',d:'Juega en la División Plata',f:()=>C.bd<=1,rw:800},
{id:'el',e:'🥇',n:'Llegaste a la Élite',d:'Juega en la División Élite',f:()=>C.bd<=0,rw:2000},
{id:'ch',e:'🏆',n:'Campeón',d:'Gana unos playoffs',f:()=>C.tot.titles>=1,rw:3000},
{id:'ce',e:'👑',n:'Rey de la Élite',d:'Gana los playoffs de la Élite',f:()=>C.hist.some(h=>h.c),rw:6000}];
function checkAch(){if(!C)return;C.bd=Math.min(C.bd==null?2:C.bd,divOf(C.myT));const got=[];for(const a of ACH)if(!C.ach[a.id]&&a.f()){C.ach[a.id]=C.season;if(a.rw)pay(a.rw);if(a.fame)C.fame+=a.fame;got.push(a);log(`🏅 Logro: ${a.n}`)}
 if(got.length)toastC('🏅 '+got.map(a=>a.n).join(' · ')+'  ¡Logro!')}
/* ---- acciones ---- */
function grow(k,n=1){const p=C.p;if(p.st[k]>=p.pot||p.st[k]>=99)return false;p.st[k]=Math.min(p.pot,p.st[k]+n);return true}
ACT.int=v=>{C.int=+v;draw()};ACT.focus=v=>{C.focus=C.focus===v?null:v;persist();draw()};
ACT.train=k=>{const I=INT[C.int];if(C.tp<=0||C.en<I.e||C.inj>0)return;C.tp--;C.en-=I.e;const ok=Math.random()<cl(.9-(C.p.st[k]-40)/85,.12,.95)*I.m*(C.own[4]?1.25:1)*(C.focus===k?1.25:1)*(C.p.age>29?.7:1)&&grow(k);C.trust=cl(C.trust+1,0,100);let ex='';if(Math.random()<I.r){C.inj=2;C.mor=cl(C.mor-5,0,100);ex=' ¡Pero te lesionas! 🩹';log('Te lesionas en un entrenamiento intenso.')}checkAch();persist();draw();toastC((ok?`¡+1 ${STN[k]}!`:'Sesión dura, sin mejora visible…')+ex)};
ACT.rest=()=>{if(C.tp<=0)return;C.tp--;C.en=Math.min(100,C.en+35);C.mor=cl(C.mor+4,0,100);if(C.inj>0)C.inj--;persist();draw();toastC('Has recuperado energía 😴')};
ACT.buy=i=>{const s=SHOP[i];if(C.own[i]||C.money<s.p)return;pay(-s.p);C.own[i]=1;if(s.k.length==3&&C.p.st[s.k]!=null&&SKS.includes(s.k))C.p.st[s.k]=Math.min(99,C.p.st[s.k]+3);if(s.k=='pi')C.tp++;checkAch();persist();draw();toastC('¡Comprado! '+s.e)};
ACT.cons=i=>{const s=CONS[i];if(C.money<s.p)return;pay(-s.p);s.f();persist();draw();toastC(s.e+' '+s.d)};
ACT.ask=()=>{if(C.asked)return;C.asked=1;const ok=Math.random()<.25+C.trust/200+(ovrP()>=ov(coach().sid)-4?.2:0);if(ok){C.prom=Math.max(C.prom,4);C.trust=cl(C.trust+3,0,100);log('El míster te promete más minutos.')}else{C.trust=cl(C.trust-2,0,100);log('El míster: «Gánatelo en los entrenos».')}persist();draw()};
ACT.skip=()=>{simRound(false);nextRound(true)};
function nextRound(adv){if(adv)C.rd++;C.tp=3+(C.own[8]?1:0);C.asked=0;C.buff=0;C.en=Math.min(100,C.en+15+(C.own[7]?10:0));if(C.inj>0){C.inj--;if(C.own[6]&&C.inj>0)C.inj--}
 if(C.focus&&Math.random()<.3&&grow(C.focus))log(`🎯 Tu foco semanal da frutos: +1 ${STN[C.focus]}`);checkAch();persist();draw()}
ACT.sim=()=>{const fx=nextFx();if(!fx||fx.bye||fx.end)return ACT.skip();const co=coach(),pl=co.role=='TITULAR'||co.role=='BANQUILLO',m=co.role=='TITULAR'?1:.5,o=ovrP(),me=pl?{pts:Math.round(o/9*m*(.4+Math.random())),reb:Math.round(o/25*m*Math.random()*2),ast:Math.round(o/30*m*Math.random()*2),stl:r(0,1),blk:r(0,1),fgm:0,fga:0,sec:co.role=='TITULAR'?150:co.at}:null;const[x,y]=simGame(C.myT,fx.opp);if(fx.po&&x===y)return ACT.sim();done({opp:fx.opp,mine:x,theirs:y,me,played:false})};
/* ---- vestuario + rueda de prensa previa ---- */
ACT.play=()=>{const fx=nextFx();if(!fx||fx.bye||fx.end)return;const co=coach();if(co.role=='NO CONVOCADO'||co.role=='LESIONADO'){toastC(co.role=='LESIONADO'?'Estás lesionado 🩹':'No estás convocado. Usa SIMULAR.');return}
 const my=C.t[C.myT],o=C.t[fx.opp],k=slotOf(C.p.pos),L=my.ids.slice(0,3);if(co.role=='TITULAR')L[k]=-1;
 res.innerHTML=`<div class="pxt">🎤 ${fx.po?'PLAYOFFS · '+poName(fx.stage)+' · ':''}ANTES DEL PARTIDO</div><div class="rw" style="justify-content:center;gap:14px">${logo(C.myT,46)}<div class="rw">${L.map(i=>i<0?fig(C.p.cid,my.col,50,'me'):fig(i,my.col,50)).join('')}</div><b>VS</b><div class="rw">${o.ids.slice(0,3).map(i=>fig(i,o.col,50)).join('')}</div>${logo(fx.opp,46)}</div>
 <div class="mic">🎙</div><p style="max-width:480px">«${pick(['¿Cómo afrontas el partido contra '+o.n+'?','Los aficionados esperan mucho de ti hoy, ¿qué les dices?','¿Te ves capaz de ganar a '+o.n+'?'])}»</p><div class="opts">
 <button class="cb" data-a="pre" data-v="hum">🙏 «Respeto al rival, trabajaremos duro»<small>+2% rendimiento · +3 confianza míster</small></button>
 <button class="cb" data-a="pre" data-v="con">😎 «Vamos a ganar, estoy en forma»<small>+5% rendimiento · si pierdes, -fama</small></button>
 <button class="cb red" data-a="pre" data-v="pro">🔥 «Les voy a hacer un póster»<small>+8% rendimiento · si pierdes, -fama y -confianza</small></button>
 <button class="cb" data-a="pre" data-v="no" style="opacity:.8">🤐 Sin comentarios</button><button class="cb ghost" data-a="precancel" style="opacity:.6;font-size:8px">← VOLVER</button></div>`;res.classList.remove('hidden');paint(res);CRE=1;C.pre={fx,co}};
ACT.precancel=()=>{res.classList.add('hidden');CRE=0};
ACT.pre=v=>{const p=C.pre;if(!p)return;C.pk=v;C.buff={hum:.02,con:.05,pro:.08,no:0}[v];if(v=='hum')C.trust=cl(C.trust+3,0,100);if(v=='pro')C.fame+=4;res.classList.add('hidden');CRE=0;startCar(p.fx,p.co)};
/* ---- partido en el motor (3v3, estadio neón, solo personajes del juego) ---- */
function abortMatch(err){console.error('Partido de carrera',err);try{cleanTemp()}catch(e){}LIVE=null;try{G=null}catch(e){}hideHud();res.classList.add('hidden');CRE=0;show('#career');draw();toastC('No se pudo iniciar el partido. Inténtalo de nuevo o usa SIMULAR')}
function startCar(fx,co){const my=C.t[C.myT],op=C.t[fx.opp],cid=C.p.cid,k=slotOf(C.p.pos),L=my.ids.slice(0,3),st=co.role=='TITULAR';if(st)L[k]=cid;
 const all=[...L,cid,...op.ids.slice(0,3)],prev={};all.forEach(i=>{prev[i]=save.owned[i]?{...save.owned[i]}:null});
 LIVE={k:'game',fx,co,cid,slot:k,start:st,subbed:st,sel:save.sel,lineup:save.lineup,prev,jc:{id:L[0],jc:CH[L[0]].jc}};
 try{localStorage.setItem(TMPK,JSON.stringify({added:all.filter(i=>!prev[i]),sel:save.sel,lineup:save.lineup}))}catch(e){}
 let pushed=false;
 try{applyMe(my.col);CH[L[0]].jc=my.col;[...L,cid].forEach(i=>save.owned[i]={lvl:1,st:0});save.lineup=L;
  const tm={name:op.n,col:op.col,ids:op.ids.slice(0,3),ovr:str(fx.opp)};TEAMS.push(tm);pushed=true;curTeam=TEAMS.length-1;curMode=3;window.STAD_PICK=STADS.findIndex(s=>s.k==='neon');
  sec.classList.add('hidden');show(null);
  window.NOPICK=1;try{startMatch3()}finally{window.NOPICK=0}   /* sin selector de estadio: antes dejaba el partido a medias y se quedaba pillado */
  if(!G)throw new Error('startMatch3 no creó el partido');
  G.diff=DDIF[divOf(fx.opp)];G.hu=G.P[st?k:0];hudPortrait($('#hpL'),G.hu.id,G.mc);$('#nL').textContent=my.n}
 catch(e){if(pushed)TEAMS.pop();pushed=false;abortMatch(e);return}
 TEAMS.pop()}
setInterval(()=>{if(!LIVE)return;if(!G){if(!CRE){cleanTemp();LIVE=null;hideHud();show('#career');draw()}return}
 if(LIVE.k==='game'&&!LIVE.subbed&&G.mode==='play'&&G.t<=LIVE.co.at){LIVE.subbed=true;if(doSub(LIVE.slot,LIVE.cid)!==false){G.hu=G.P[LIVE.slot];hudPortrait($('#hpL'),G.hu.id,G.mc);try{msg('¡ENTRAS A LA PISTA!',80)}catch(e){}}}},400);
function cleanTemp(){const L=LIVE;if(!L)return;restoreMe();if(L.jc&&CH[L.jc.id])CH[L.jc.id].jc=L.jc.jc;if(L.prev)for(const i in L.prev){if(L.prev[i])save.owned[i]=L.prev[i];else delete save.owned[i]}save.sel=L.sel;save.lineup=L.lineup;window.STAD_PICK=null;window.NOPICK=0;try{localStorage.removeItem(TMPK)}catch(e){}store()}
window.careerQuit=()=>{if(!LIVE)return false;cleanTemp();LIVE=null;CRE=0;res.classList.add('hidden');hideHud();try{musicPlay('menu')}catch(e){}show('#career');draw();toastC('Partido abandonado: no cuenta para tu carrera');return true};
const _end=endMatch;endMatch=function(){if(!LIVE)return _end();const g=G,L=LIVE;_end();setTimeout(()=>{if(!LIVE||LIVE!==L)return;const mid=L.k==='street'?L.id:L.cid,me=g.P.concat(Object.values(g.bn||{}).filter(q=>q.pl)).filter(q=>q.t===0&&q.id===mid)[0],w=g.s[0]>g.s[1];
 cleanTemp();LIVE=null;$('#end').classList.add('hidden');hideHud();if(L.k==='street')return streetDone(w);
 const s=me?me.gs:null;try{done({opp:L.fx.opp,me:s&&{...s,sec:L.start?150:L.co.at},played:true,mine:g.s[0],theirs:g.s[1]})}catch(e){console.error(e);show('#career');draw()}},1050)};
ACT.street=()=>{if(C.tp<=0||C.en<15||C.inj>0)return;const id=C.p.cid,prev={};prev[id]=save.owned[id]?{...save.owned[id]}:null;LIVE={k:'street',id,sel:save.sel,lineup:save.lineup,prev};try{localStorage.setItem(TMPK,JSON.stringify({added:prev[id]?[]:[id],sel:save.sel,lineup:save.lineup}))}catch(e){}
 try{applyMe(C.t[C.myT].col);save.owned[id]={lvl:1,st:0};save.sel=id;window.STAD_PICK=2;const rv=pickRival(1);rv.col=rivalColor(CH[id].jc,CH[rv.id].jc);sec.classList.add('hidden');show(null);window.NOPICK=1;try{startMatch(1,rv)}finally{window.NOPICK=0}if(!G)throw new Error('startMatch no creó el partido')}catch(e){abortMatch(e)}};
function streetDone(w){C.tp--;C.en=Math.max(0,C.en-15);C.fame+=w?3:1;C.mor=cl(C.mor+(w?4:-2),0,100);C.tot.street++;if(w)C.tot.streetW++;const ks=[];for(let i=0;i<(w?2:1);i++){const k=pick(SKS);if(Math.random()<.75&&grow(k))ks.push(STN[k])}log(w?'Ganas un 1v1 en la calle y subes tu fama 🔥':'Pierdes en la calle, pero aprendes.');checkAch();persist();
 res.innerHTML=`<h2>${w?'🏆 ¡GANAS EN LA CALLE!':'DERROTA CALLEJERA'}</h2><p>${ks.length?'Mejoras: '+ks.map(x=>'+1 '+x).join(', '):'Sin mejoras esta vez'}</p><button class="cb go" data-a="back">VOLVER</button>`;res.classList.remove('hidden');CRE=1}
ACT.back=()=>{res.classList.add('hidden');CRE=0;hideHud();show('#career');draw()};
/* ---- resultado, prensa posterior y eventos ---- */
function done(o){const fx=nextFx(),myHome=fx.home,sa=o.mine,sb=o.theirs,mw=sa>sb,a=myHome?C.myT:fx.opp,b=myHome?fx.opp:C.myT,po=!!fx.po,dby=fx.opp===C.rival;
 if(po){plStep({w:mw?C.myT:fx.opp});if(C.pl.out&&C.pl.stage<2)plAuto()}else{rec(a,b,myHome?sa:sb,myHome?sb:sa);simRound(true)}
 let nota=null,m=o.me,S=C.ss,T=C.tot;
 if(m){nota=cl(5+(mw?.7:-.3)+m.pts*.12+m.reb*.15+m.ast*.25+m.stl*.3+m.blk*.3+((m.fgm||0)-((m.fga||0)-(m.fgm||0))*.35)*.1+((m.sec||0)/150-.5)*.5+Math.random()*.4,1,10);nota=Math.round(nota*10)/10;
  S.g++;S.n+=nota;for(const k of['pts','reb','ast','stl','blk'])S[k]+=m[k]||0;for(const k of['pts','reb','ast','stl','blk'])T[k]+=m[k]||0;T.best=Math.max(T.best,nota);T.maxp=Math.max(T.maxp,m.pts||0);if((m.pts||0)>=10&&(m.reb||0)>=10)T.dbl++;
  C.trust=cl(C.trust+(nota>=7.5?5:nota>=6?1:-3),0,100);C.fame+=Math.round(nota/3);C.mor=cl(C.mor+(mw?5:-4)+(nota>=7?3:0),0,100);
  if(nota>=6.5&&Math.random()<nota/12){const k=pick(SKS);if(grow(k))log(`Mejoras tras el partido: +1 ${STN[k]}`)}}else C.trust=cl(C.trust-1,0,100);
 T.g++;if(mw){T.w++;C.streak++;C.bst=Math.max(C.bst,C.streak);if(dby){T.derby++;C.fame+=6;C.mor=cl(C.mor+3,0,100);log('🔥 ¡Ganas el derbi contra '+C.t[fx.opp].n+'!')}}else{T.l++;C.streak=0}
 if(C.pk=='con'&&!mw&&o.played)C.fame=Math.max(0,C.fame-5);if(C.pk=='pro'&&!mw&&o.played){C.fame=Math.max(0,C.fame-8);C.trust=cl(C.trust-4,0,100);log('Tu provocación te sale cara: te critican en la prensa.')}if(C.pk=='pro'&&mw&&o.played){C.fame+=10;log('¡Cumples tu palabra y la afición te adora!')}C.pk=null;
 C.en=Math.max(0,C.en-(m&&o.played?28:6));if(o.played&&C.en<20&&Math.random()<.2){C.inj=r(1,2)-(C.own[6]?1:0);if(C.inj>0)log('🩹 Te lesionas por el cansancio acumulado.');else C.inj=0}
 const pr=Math.round(DSAL[divOf(C.myT)]*(.6+ovrP()/100)*(mw?1.4:1)*(C.own[5]?1.2:1)*(po?1.5:1));pay(pr);C.lastR={mw,nota,sa,sb,m,pr,opp:fx.opp,played:o.played,po,dby};
 C.res.push({opp:fx.opp,sa,sb,w:mw,nota,po,home:myHome});if(C.res.length>40)C.res.shift();
 log(`${po?'🏆 '+poName(fx.stage)+': ':''}${mw?'Victoria':'Derrota'} ${sa}-${sb} ${myHome?'vs':'en'} ${C.t[fx.opp].n}${nota?' · nota '+nota:''}`);if(mw&&sa-sb>=15)log(`${C.t[C.myT].n} aplasta a ${C.t[fx.opp].n}: «Exhibición total»`);
 if(po&&C.pl.stage===2&&C.pl.champ===C.myT)log('🏆 ¡'+C.t[C.myT].n+' gana los playoffs!');
 checkAch();persist();showRes()}
function showRes(){const R=C.lastR,m=R.m,n=R.nota;res.innerHTML=`<div class="pxt" style="font-size:12px">${R.po?'🏆 PLAYOFFS · ':''}${R.mw?'🏆 VICTORIA':'DERROTA'}${R.dby&&R.mw?' · 🔥 DERBI':''}</div><div class="rw" style="gap:14px">${logo(C.myT,56)}<span class="big">${R.sa} - ${R.sb}</span>${logo(R.opp,56)}</div>
 ${m?`<div class="cd" style="min-width:270px"><div class="pxt sm">TU ACTUACIÓN</div><div class="big" style="color:${n>=7?'#4ade80':n>=5.5?'#ffd23d':'#ff6a6a'}">${n.toFixed(1)}</div><div style="font-size:12px">PTS ${m.pts} · REB ${m.reb} · AST ${m.ast} · ROB ${m.stl} · TAP ${m.blk}</div></div>`:`<div class="cd">${C.inj>0?'Lesionado: no juegas':'No has jugado minutos hoy.'}</div>`}
 <div class="cd" style="max-width:440px;font-size:12px">🗣 Míster ${C.co.n}: «${coachMsg(n)}»<br><small style="color:#9fb0e0">+💰${R.pr}</small></div><button class="cb go" data-a="press">${m?'🎤 RUEDA DE PRENSA':'CONTINUAR ▶'}</button>`;res.classList.remove('hidden');CRE=1;paint(res)}
ACT.press=()=>{const R=C.lastR;if(!R.m)return maybeEvent();const n=R.nota,mw=R.mw;let q,o;
 if(R.dby&&mw){q='«¡Has ganado el derbi! ¿Un mensaje para la afición rival?»';o=[['🙏 «Respeto, son un gran equipo»',{trust:3,mor:2},'Elegancia tras el derbi.'],['😏 «La ciudad es nuestra»',{fame:7,trust:-1},'Los hinchas lo corean toda la noche.'],['🤐 «Hablamos en el campo»',{fame:2},'Misterio y poca palabra.']]}
 else if(n>=8){q='«¡Gran partido! ¿Eres el MVP de hoy?»';o=[['🙏 «Es mérito de todo el equipo»',{trust:4,mor:3},'La afición aplaude tu humildad.'],['😎 «Sí, soy el mejor»',{fame:8,trust:-2},'Titular en todos los medios… y algún enfado en el vestuario.'],['😄 «Hoy salió todo»',{fame:3,mor:2},'Sonrisa y a casa.']]}
 else if(!mw){q='«Habéis perdido… ¿de quién es la culpa?»';o=[['🙋 «Mía, tengo que mejorar»',{trust:3,mor:-2},'El míster valora tu honestidad.'],['👥 «Del equipo, no nos entendimos»',{trust:-4,fame:2},'Se arma revuelo en el vestuario.'],['🤐 «No voy a hablar de eso»',{},'Los periodistas se quedan con las ganas.']]}
 else if(n<5.5){q='«Hoy no has estado fino… ¿qué pasó?»';o=[['💪 «Trabajaré el doble»',{trust:3,mor:-1},'El míster asiente.'],['😤 «El árbitro nos ha perjudicado»',{fame:3,trust:-3},'Polémica asegurada.'],['😅 «Todos tenemos días malos»',{mor:2},'Algunos sonríen.']]}
 else{q='«Victoria del equipo. ¿Qué tal el ambiente en el vestuario?»';o=[['❤ «Somos una familia»',{trust:3,mor:4},'Ambientazo, la afición lo ama.'],['🏆 «Vamos a por el título»',{fame:4,trust:1},'Titulares ambiciosos.'],['📊 «Hay que seguir mejorando»',{trust:2},'Respuesta profesional.']]}
 C.po=o;res.innerHTML=`<div class="mic">🎤</div><div class="pxt" style="font-size:10px">RUEDA DE PRENSA</div><p style="max-width:460px;font-size:15px">${q}</p><div class="opts">${o.map((x,i)=>`<button class="cb" data-a="ans" data-v="${i}">${x[0]}</button>`).join('')}</div>`};
ACT.ans=v=>{const[,e,t]=C.po[+v];C.tot.press++;C.trust=cl(C.trust+(e.trust||0),0,100);C.fame=Math.max(0,C.fame+(e.fame||0));C.mor=cl(C.mor+(e.mor||0),0,100);log('Prensa: '+t);checkAch();persist();
 res.innerHTML=`<div class="mic">📰</div><p style="max-width:440px;font-size:14px">${t}</p><div style="font-size:12px;color:#9fb0e0">${e.trust?(e.trust>0?'🤝+':'🤝')+e.trust+' ':''}${e.fame?(e.fame>0?'📣+':'📣')+e.fame+' ':''}${e.mor?(e.mor>0?'😊+':'😊')+e.mor:''}</div><button class="cb go" data-a="evt">CONTINUAR ▶</button>`};
const EVT=[
{t:'🤝 PATROCINADOR',x:'Una marca de zapatillas te ofrece 1500 💰 por llevar sus botas.',o:[['Aceptar',()=>{pay(1500);C.fame+=4;C.mor=cl(C.mor-2,0,100);return'Firmas el contrato: +1500 💰 y más fama.'}],['Rechazar',()=>{C.mor=cl(C.mor+3,0,100);return'Prefieres tu libertad. Moral +3.'}]]},
{t:'🎉 FIESTA',x:'Tus amigos te invitan a una fiesta hasta la madrugada.',o:[['Ir a la fiesta',()=>{C.mor=cl(C.mor+12,0,100);C.en=Math.max(0,C.en-25);C.fame+=2;return'Lo pasas genial (+moral) pero acabas agotado.'}],['Quedarme en casa',()=>{C.en=Math.min(100,C.en+12);C.trust=cl(C.trust+2,0,100);return'Descansas bien y el míster lo nota.'}]]},
{t:'🏀 EL COMPAÑERO',x:'Un compañero te pide que le pases más el balón.',o:[['Pasar más',()=>{C.trust=cl(C.trust+3,0,100);C.mor=cl(C.mor+2,0,100);return'Mejora el ambiente en el vestuario.'}],['Seguir a lo mío',()=>{C.fame+=3;C.trust=cl(C.trust-2,0,100);return'Más protagonismo, menos química.'}]]},
{t:'🎯 SESIÓN EXTRA',x:'El míster te propone una sesión extra de tiro.',o:[['Aceptar',()=>{C.en=Math.max(0,C.en-10);C.tp++;const g=Math.random()<.6&&grow('tir');return g?'¡Mejoras +1 Puntería!':'Buena sesión, pero sin mejora visible.'}],['Descansar',()=>{C.en=Math.min(100,C.en+8);return'Prefieres recuperar fuerzas.'}]]},
{t:'📱 VIRAL',x:'Un mate tuyo se está haciendo viral en redes.',o:[['Subir tu propio vídeo',()=>{C.fame+=14;C.mor=cl(C.mor+4,0,100);return'¡Explotas en redes! Fama +14.'}],['Ignorarlo',()=>{C.fame+=5;return'La fama sube sola (+5).'}]]},
{t:'🩹 MOLESTIA',x:'Notas una molestia en el tobillo antes del próximo partido.',o:[['Jugar con dolor',()=>{if(Math.random()<.35){C.inj=2;return'¡Mala idea! Te lesionas 2 jornadas.'}C.trust=cl(C.trust+3,0,100);return'Aguantas y el míster lo valora.'}],['Parar un poco',()=>{C.inj=Math.max(C.inj,1);C.en=Math.min(100,C.en+20);return'Descansas 1 jornada y te recuperas.'}]]},
{t:'🏙 RETO CALLEJERO',x:'Un rival te reta a un 1v1 por 800 💰.',o:[['Aceptar el reto',()=>{if(Math.random()<.35+ovrP()/200){pay(800);C.fame+=6;return'¡Ganas! +800 💰 y mucha fama.'}pay(-300);C.fame=Math.max(0,C.fame-2);return'Pierdes… -300 💰.'}],['Pasar',()=>'Prefieres no arriesgar.']]},
{t:'📺 TELEVISIÓN',x:'Un programa de TV te invita a una entrevista.',o:[['Ir al plató',()=>{C.fame+=9;C.en=Math.max(0,C.en-10);return'Te ven miles de personas: Fama +9.'}],['Declinar',()=>{C.en=Math.min(100,C.en+5);return'Te centras en entrenar.'}]]},
{t:'🎓 MENTOR VETERANO',x:'Una leyenda retirada se ofrece a darte consejos después del entreno.',o:[['Escucharle',()=>{const k=pick(['pas','def','reg','reb']);grow(k);C.en=Math.max(0,C.en-8);return`Aprendes mucho: +1 ${STN[k]}.`}],['Ir a mi aire',()=>{C.mor=cl(C.mor+3,0,100);return'Prefieres no complicarte. Moral +3.'}]]},
{t:'❤ ACTO BENÉFICO',x:'Un colegio de tu barrio te invita a jugar con los peques.',o:[['Donar 500 💰 y jugar con ellos',()=>{if(C.money<500)return'No tienes dinero suficiente, pero les saludas.';pay(-500);C.fame+=8;C.mor=cl(C.mor+6,0,100);return'¡Qué ambiente! Fama +8 y moral +6.'}],['Pasar de largo',()=>'Hoy no tienes tiempo.']]},
{t:'📻 PROVOCACIÓN EN REDES',x:'Un jugador rival se burla de ti en redes sociales.',o:[['Responder con humor',()=>{C.fame+=5;return'Tu respuesta se hace viral. Fama +5.'}],['Responder enfadado',()=>{C.fame+=8;C.trust=cl(C.trust-3,0,100);return'Más fama, pero el míster no está contento.'}],['Ignorar',()=>{C.mor=cl(C.mor+2,0,100);return'Mejor centrarse en jugar.'}]]},
{t:'🏕 CAMPUS DE VERANO',x:'Te ofrecen un campus intensivo de tecnificación por 800 💰.',o:[['Apuntarme',()=>{if(C.money<800)return'No te llega el dinero.';pay(-800);C.en=Math.max(0,C.en-15);let t='';for(let i=0;i<2;i++){const k=pick(SKS);if(grow(k))t+=` +1 ${STN[k]}`}return t?'Mejoras:'+t:'Sin mejoras visibles.'}],['Descansar en casa',()=>{C.en=Math.min(100,C.en+15);return'Recargas pilas.'}]]},
{t:'🤕 BAJA EN EL EQUIPO',x:'Un compañero se lesiona y el míster cuenta contigo.',o:[['Estoy listo',()=>{C.prom=Math.max(C.prom,5);C.trust=cl(C.trust+3,0,100);return'Más oportunidades: el míster confía en ti.'}],['Que juegue otro',()=>{C.mor=cl(C.mor-2,0,100);return'Pierdes una oportunidad.'}]]},
{t:'💼 LLAMA TU AGENTE',x:'Tu agente dice que hay una marca de bebidas interesada en ti.',o:[['Negociar fuerte',()=>{if(Math.random()<.5){pay(2200);C.fame+=3;return'¡Gran acuerdo! +2200 💰.'}return'La marca se echa atrás.'}],['Aceptar lo que ofrecen',()=>{pay(900);return'Firmas un contrato pequeño: +900 💰.'}]]}];
ACT.evt=()=>maybeEvent();
function maybeEvent(){if(C.evDone===C.rd+':'+C.season+':'+(C.lastR&&C.lastR.po?1:0)||Math.random()>.55){return finish()}C.evDone=C.rd+':'+C.season+':'+(C.lastR&&C.lastR.po?1:0);const e=pick(EVT);C.ev=e;
 res.innerHTML=`<div class="pxt">${e.t}</div><p style="max-width:440px;font-size:15px">${e.x}</p><div class="opts">${e.o.map((x,i)=>`<button class="cb" data-a="evo" data-v="${i}">${x[0]}</button>`).join('')}</div>`;res.classList.remove('hidden');CRE=1}
ACT.evo=v=>{const t=C.ev.o[+v][1]();log(t);checkAch();persist();res.innerHTML=`<p style="max-width:440px;font-size:15px">${t}</p><button class="cb go" data-a="fin">CONTINUAR ▶</button>`};
ACT.fin=()=>finish();
function finish(){res.classList.add('hidden');CRE=0;nextRound(!(C.lastR&&C.lastR.po));hideHud();show('#career');draw()}
/* las acciones de las ventanas post-partido solo valen mientras la ventana está abierta (evita dobles toques y botones antiguos) */
['pre','press','ans','evt','evo','fin'].forEach(k=>{const f=ACT[k];ACT[k]=(...a)=>{if(!CRE||res.classList.contains('hidden'))return;return f(...a)}});
/* ---- fin de temporada ---- */
const objOk=()=>{const o=C.obj,S=C.ss,R=C.rec[C.myT];return o.k=='nota'?S.g>=3&&S.n/S.g>=o.v:o.k=='games'?S.g>=o.v:R.w>=o.v};
function newObj(){const k=pick(['nota','games','win']);C.obj=k=='nota'?{k,v:6.5,t:'Nota media de 6.5 o más.',pr:1200}:k=='games'?{k,v:6,t:'Juega al menos 6 partidos.',pr:900}:{k,v:6,t:'Que tu equipo gane 6 partidos.',pr:1000}}
ACT.endseason=()=>{const my=C.myT,d=divOf(my);if(!C.pl)initPlayoffs();while(C.pl.stage<2)plStep(null);
 const tb=C.dv.map((_,i)=>table(i)),pos=tb[d].indexOf(my)+1,champ=C.pl.champ===my,ch=champ&&d==0,S=C.ss,nota=S.g?(S.n/S.g).toFixed(1):'-',R=C.rec[my],up=d>0&&pos==1,dn=d<2&&pos==tb[d].length,ok=C.obj&&objOk(),aw=[];
 if(champ){C.tot.titles++;C.fame+=ch?40:15;pay(ch?5000:2000+(2-d)*600);log(`🏆 ¡${C.t[my].n} campeón de ${DN[d]}!`)}
 if(S.g>=4&&S.n/S.g>=7.5)aw.push(`Mejor quinteto ${DN[d]} (Temp. ${C.season})`);if(C.p.age<=21&&S.g>=4&&S.n/S.g>=7)aw.push(`Jugador revelación (Temp. ${C.season})`);if(S.g>=4&&S.pts/S.g>=14)aw.push(`Máximo anotador del equipo (Temp. ${C.season})`);
 aw.forEach(a=>{C.aw.push(a);C.fame+=6;log('🏅 Premio: '+a)});
 C.hist.push({s:C.season,tn:C.t[my].n,d,pos,nota,c:ch,t:champ,up});if(ok){pay(C.obj.pr);C.trust=cl(C.trust+5,0,100)}
 C.dv=[tb[0].slice(0,-1).concat(tb[1][0]),[tb[0][tb[0].length-1]].concat(tb[1].slice(1,-1),tb[2][0]),tb[2].slice(1).concat(tb[1][tb[1].length-1])];
 C.sum={pos,d,ch,champ,nota,w:R.w,l:R.l,up,dn,ok,pr:C.obj&&C.obj.pr,aw};C.phase='offers';checkAch();persist();offers()};
function offers(){const d=divOf(C.myT),av=C.ss.g?C.ss.n/C.ss.g:5,me=ovrP(),sm=C.sum;let list=[];
 if(!sm){list=shuf(C.dv[2]).slice(0,3)}else{list.push(C.myT);const up=av>=7?Math.max(0,d-1):d,dn=Math.min(2,d+(av<5?1:0));[up,dn].forEach((di,i)=>{const t=table(di)[i?Math.min(2,C.dv[di].length-1):Math.min(1,C.dv[di].length-1)];if(!list.includes(t))list.push(t)})}
 C.off=list.slice(0,3);persist();hideHud();show('#career');const k=slotOf(C.p.pos);
 sec.innerHTML=`<div class="chd"><div><b style="font-size:15px">${sm?'📋 FIN DE TEMPORADA '+C.season:'📨 TUS OFERTAS'}</b><small>${sm?'':'Empiezas desde abajo: ¡sube división a división!'}</small></div></div>${sm?`<div class="cd gold">${sm.ch?'🏆 ¡CAMPEÓN DE LA ÉLITE! ':sm.champ?'🏆 ¡CAMPEÓN DE PLAYOFFS! ':''}Terminas <b>${sm.pos}º</b> en ${DN[sm.d]} (${sm.w}-${sm.l}) · nota media <b>${sm.nota}</b>${sm.up?'<br>⬆ ¡Ascenso de división!':''}${sm.dn?'<br>⬇ Descenso de división…':''}${sm.ok?`<br>🎯 Objetivo cumplido: +💰${sm.pr}`:''}${(sm.aw||[]).map(a=>'<br>🏅 '+a).join('')}</div>`:''}
 <div id="cbody">${C.off.map(t=>{const di=divOf(t),ids=C.t[t].ids,sd=ov(ids[k]),role=me>=sd-1?'TITULAR garantizado':me>=sd-9?'Rotación: pelearás por minutos':'Proyecto: empiezas en el banquillo';return`<div class="cd"><div class="rw">${logo(t,50)}<div class="sp"><b>${C.t[t].n}</b><small style="color:${DC[di]};display:block">DIVISIÓN ${DN[di]}</small></div></div><div class="rw" style="margin:8px 0">${ids.map(i=>fig(i,C.t[t].col,38)).join('')}</div><p style="font-size:12px;line-height:1.6">⭐ Nivel del equipo ${str(t)}<br>🎽 ${role}<br>💰 ${Math.round(DSAL[di]*(.6+me/100))} por partido</p><button class="cb go" style="width:100%" data-a="sign" data-v="${t}">${t===C.myT&&sm?'RENOVAR':'FICHAR'}</button></div>`}).join('')}</div>`;paint(sec)}
ACT.sign=v=>{const t=+v,k=slotOf(C.p.pos),sd=ov(C.t[t].ids[k]),me=ovrP(),first=!C.sum;if(!first)startSeason(t);C.myT=t;C.prom=me>=sd-1?8:me>=sd-9?3:0;if(first)C.trust=50;C.phase='hub';setRival();C.vd=null;checkAch();persist();TAB='home';show('#career');draw()};
function startSeason(t){const same=t===C.myT;C.season++;const p=C.p;p.age++;const y=p.age<24?2:p.age<29?1:0;for(let i=0;i<y+r(0,1);i++)grow(pick(SKS));if(p.age>31)p.st.vel=Math.max(30,p.st.vel-1);
 tables();C.ss={g:0,n:0,pts:0,reb:0,ast:0,stl:0,blk:0};C.sum=null;C.en=100;C.tp=3+(C.own[8]?1:0);C.asked=0;C.inj=0;C.streak=0;C.mor=cl(C.mor+10,0,100);if(!same)C.trust=50;C.co={n:pick(['Ortega','Vela','Salas','Ferrer','Mora','Duarte']),s:pick(['Exigente','Paciente','Táctico'])};newObj()}
/* ---- crear jugador: cara/personaje de un ÉPICO ---- */
const epics=()=>CH.filter(c=>c.rar==2&&!c.hide).map(c=>c.id);
function draftStats(s){const t=(s.cm-170)/55,M=POSM[s.pos],b={};for(const k of['vel','tir','mat','reg','def'])b[k]=Math.round(36+M[k]*.8);b.mat+=Math.round(t*10-5);b.def+=Math.round(t*7-3);b.vel-=Math.round(t*8-4);b.reg-=Math.round(t*7-3);b.pas=36+(s.pos=='PG'?7:s.pos=='C'?-3:0);b.reb=36+Math.round(t*14-4)+(s.pos=='PF'||s.pos=='C'?5:0);b.agu=42;const m=(STY[s.sty]||STY.eq).m;for(const k in m)b[k]+=m[k];for(const k of SKS)b[k]=cl(b[k],25,78);return b}
function create(){const D=window._cd||(window._cd={name:'',pos:'SG',cm:195,cid:epics()[0],sty:'eq',num:r(1,99)});hideHud();show('#career');
 sec.innerHTML=`<div class="chd"><b style="font-size:15px">🏀 CREA TU JUGADOR</b><small>Elige tu estilo entre los personajes ÉPICOS</small></div><div id="cbody"><div class="cd"><div class="rw"><canvas class="bigfig" id="cprev" data-id="${D.cid}" data-col="#2f6fe4" width="300" height="300"></canvas><div class="sp"><input type="text" id="cname" maxlength="14" placeholder="Nombre del jugador" value="${esc(D.name)}"><div class="rw" style="margin-top:6px"><button class="cb" data-a="cdice" style="font-size:8px;padding:8px">🎲 NOMBRE</button><span class="pxt sm">DORSAL</span><input type="number" id="cnum" min="0" max="99" value="${D.num}" style="width:70px"></div><div class="pxt sm" style="margin-top:8px" id="cinfo"></div></div></div>
 <div class="pxt sm" style="margin:10px 0 4px">POSICIÓN</div><div class="rw">${POS.map(p=>`<button class="cb sp ${D.pos==p?'go':''}" data-a="cpos" data-v="${p}" style="font-size:8px;padding:8px 2px">${p}<small>${PN[p]}</small></button>`).join('')}</div>
 <div class="pxt sm" style="margin:10px 0 4px">ESTILO DE JUEGO</div><div class="stys">${Object.entries(STY).map(([k,s])=>`<button class="cb ${D.sty==k?'go':''}" data-a="csty" data-v="${k}">${s.e} ${s.n}<small>${s.d}</small></button>`).join('')}</div>
 <div class="pxt sm" style="margin:10px 0 4px">ALTURA: <span id="ccm">${D.cm}</span> cm</div><input type="range" id="crange" min="170" max="225" value="${D.cm}" style="width:100%"><small style="color:#9fb0e0">Más alto: mates, rebotes y muro · Más bajo: velocidad y manejo</small><div id="cbars" style="margin-top:8px"></div></div>
 <div class="cd"><div class="pxt sm" style="margin-bottom:6px">TU CARA Y PERSONAJE (Épicos)</div><div class="faces">${epics().map(i=>`<div class="fc ${D.cid==i?'on':''}" data-a="chd" data-v="${i}" data-id="${i}"><canvas data-fig="${i}" data-col="#2f6fe4"></canvas>${ARN[CH[i].arch]||''}</div>`).join('')}</div></div>
 <button class="cb go cd wide" data-a="cdone" style="width:100%">✔ CREAR Y VER OFERTAS</button></div>`;paint(sec);info();
 $('#cname').oninput=e=>{D.name=e.target.value};$('#cnum').oninput=e=>{D.num=cl(parseInt(e.target.value)||0,0,99)};$('#crange').oninput=e=>{D.cm=+e.target.value;$('#ccm').textContent=D.cm;info()}}
function info(){const D=window._cd,st=draftStats(D);$('#cinfo').textContent=`${PN[D.pos]} · ${D.cm} cm · NIVEL INICIAL ${ovrSt(st,D.pos)}`;$('#cbars').innerHTML=SKS.map(k=>`<div class="stb"><b>${STN[k]}</b><i><u style="width:${st[k]}%"></u></i><span>${st[k]}</span></div>`).join('')}
function refreshCreate(){const D=window._cd;$$('#career [data-a=cpos]').forEach(b=>b.classList.toggle('go',b.dataset.v==D.pos));$$('#career [data-a=csty]').forEach(b=>b.classList.toggle('go',b.dataset.v==D.sty));$$('#career .fc').forEach(f=>f.classList.toggle('on',+f.dataset.id==D.cid));
 try{const pv=prevs.find(p=>p.c===$('#cprev'));if(pv)pv.id=D.cid}catch(e){}info()}
ACT.cpos=v=>{window._cd.pos=v;refreshCreate()};ACT.csty=v=>{window._cd.sty=v;refreshCreate()};ACT.chd=v=>{window._cd.cid=+v;refreshCreate()};
ACT.cdice=()=>{const n=pick(NOMBRES);window._cd.name=n;$('#cname').value=n};
ACT.cdone=()=>{const D=window._cd,n=($('#cname').value||D.name||'').trim();D.name=n;if(n.length<2){toastC('Pon un nombre (mín. 2 letras)');return}
 C={v:3,p:{name:n,pos:D.pos,cm:D.cm,cid:D.cid,age:18,st:draftStats(D),pot:r(84,95),num:D.num,sty:D.sty},season:1,phase:'offers',en:100,mor:70,tp:3,trust:50,prom:0,money:500,fame:0,own:{},int:1,inj:0,buff:0,log:['Empieza tu carrera profesional 🏀'],hist:[],ss:{g:0,n:0,pts:0,reb:0,ast:0,stl:0,blk:0},asked:0,co:{n:pick(['Ortega','Vela','Salas','Ferrer']),s:pick(['Exigente','Paciente','Táctico'])},sum:null,myT:0};createLeague();newObj();migrate();C.bd=2;window._cd=null;persist();offers()};
ACT.reset=()=>{if(!confirm('¿Borrar esta carrera y empezar otra?'))return;C=null;try{localStorage.removeItem(KEY)}catch(e){}window._cd=null;TAB='home';create()};
/* ---- botón del menú ---- */
const tile=document.createElement('button');tile.className='tile';tile.id='b-career';tile.innerHTML='<span class="ti">🏆</span><b>CARRERA</b><small>Sé una estrella</small>';tile.style.background='linear-gradient(#e8a400,#8a5a00)';
const tl=$('.mtiles');if(tl)tl.insertBefore(tile,tl.firstChild);tile.onclick=openHub;
if(C)try{migrate()}catch(e){console.warn(e)}
window.CAREER_DBG={get C(){return C},ACT,draw,nextFx};
})();
