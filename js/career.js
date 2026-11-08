// ===== MODO CARRERA · crea tu jugador, ficha por un equipo y sube de división =====
(()=>{
const KEY='gh_career_v1',COLS=["#d83636", "#36d836", "#d88736", "#36d836", "#3687d8", "#d83636", "#3687d8", "#d88736", "#3687d8", "#3687d8", "#36d8d8", "#d83636", "#3687d8", "#8736d8", "#3687d8", "#d88736", "#d83636", "#d88736", "#3636d8", "#d88736", "#8736d8", "#3687d8", "#d88736", "#d88736", "#3687d8", "#d83636", "#d83636", "#d88736", "#3687d8", "#3687d8", "#d83636", "#3687d8", "#d83687", "#d88736", "#3687d8", "#3687d8", "#3687d8", "#3687d8", "#36d836", "#7f7f99", "#d88736", "#3687d8", "#8736d8", "#d83636", "#3687d8", "#8736d8", "#d83636", "#d88736", "#3687d8", "#3687d8"];
const TN=['Dragones Rojos','Wyverns Verdes','Águilas Doradas','Tréboles','Panteras Azules','Meteoros','Brújula FC','Espadas Reales','Lobos Grises','Torbellino','Avispas','Tigres','Delfines','Gárgolas','Gorilas','Estrellas','Cometas de Fuego','Coronas','Mosqueteros','Montañeses','Castillo Púrpura','Pegasos','Águilas Calvas','Anclas','Olas del Norte','Tornados','Torres de Piedra','Tiburones','Yetis','Lises','Fénix','Caballitos de Mar','Remolinos','Llaves Cruzadas','Glaciares','Coyotes','Patriotas','Cohetes','Escarabajos','Viudas Negras','Valientes','Llamas Azules','Caballeros','Huracanes','Corceles','Cometas Violeta','Guardianes','Halcones de Oro','Osos Polares','Eclipse'];
const FN=['Marcos','Leo','Dani','Hugo','Iker','Nico','Saúl','Adrián','Luka','Omar','Tomás','Aitor','Jonás','Bruno','Kevin','Darius','Malik','Pablo','Rubén','Ian','Gael','Ismael','Yago','Cris'],LN=['Vela','Ortega','Ruiz','Nieto','Cano','Bravo','Lobo','Sierra','Mora','Quintana','Rivas','Soler','Ferrer','Duarte','Campos','Ibarra','Paz','Roca','Salas','Toro','Vidal','Zamora','Pardo','Luna'];
const POS=['PG','SG','SF','PF','C'],PN={PG:'Base',SG:'Escolta',SF:'Alero',PF:'Ala-Pívot',C:'Pívot'};
const SKS=['vel','tir','mat','reg','def','pas','reb','agu'],STN={vel:'Explosión',tir:'Puntería',mat:'Al aro',reg:'Manejo',def:'Muro',pas:'Visión',reb:'Garra',agu:'Aguante'};
const W={PG:[2,2,.5,3,1,3,.3,1],SG:[2,3.5,1,2,1,1.5,.5,1],SF:[2,2.5,2,1.5,1.5,1.2,1.2,1.2],PF:[1,1,3,.7,2.5,.8,3,1.5],C:[.7,.5,3.5,.4,3,.6,3.5,1.5]};
const DN=['ÉLITE','PLATA','BRONCE'],DC=['#ffd23d','#c0c8d8','#d98a4a'],DSAL=[1800,600,200],DDIF=[2,1,0];
const SHOP=[{n:'Zapatillas Rayo',d:'+3 Explosión',k:'vel',p:2500},{n:'Muñequera Sniper',d:'+3 Puntería',k:'tir',p:2500},{n:'Rodilleras Muro',d:'+3 Muro',k:'def',p:2500},{n:'Guantes Pegajosos',d:'+3 Manejo',k:'reg',p:2500},{n:'Entrenador personal',d:'+25% éxito al entrenar',k:'pt',p:6000}];
const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[r(0,a.length-1)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),avg=a=>a.reduce((x,y)=>x+y,0)/(a.length||1);
let C=null;try{C=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(C&&!C.p)C=null;
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}};
for(const k of Object.keys(save.owned))if(+k>=65)delete save.owned[k];
const slotOf=p=>p=='PG'||p=='SG'?0:p=='SF'?1:2;
const ovrSt=(st,pos)=>{const w=W[pos];return Math.round(SKS.reduce((a,k,i)=>a+st[k]*w[i],0)/w.reduce((a,b)=>a+b,0))};
const ovrP=()=>ovrSt(C.p.st,C.p.pos),str=t=>Math.round(avg(C.t[t].pl.slice(0,3).map(p=>p.o)));
const divOf=t=>C.dv.findIndex(d=>d.includes(t)),logo=(i,s=40)=>`<img class="clg" src="assets/logos/${i}.png" style="width:${s}px;height:${s}px">`;
/* ---- jugadores del motor (entradas CH ocultas) ---- */
const CID={};
function baseFrom(o,pos){const M=POSM[pos],b={};for(const k of['vel','tir','mat','reg','def'])b[k]=cl(o+M[k],20,99);b.pas=cl(o+(pos=='PG'?6:pos=='C'?-6:0),20,99);b.reb=cl(o+(pos=='PF'||pos=='C'?7:-5),20,99);b.agu=cl(o,20,99);return b}
function mkCH(key,name,pos,cm,base,jc,hd){const h=.9+(cl(cm,170,225)-170)/55*.4;let id=CID[key];const e={name,title:'',rar:0,arch:'all',pos,h,pw:POW[pos][0],base:{...base},jc,hd,hide:true};
 if(id==null){id=CID[key]=CH.length;CH.push({id,...e})}else Object.assign(CH[id],e);delete CH[id].b8;Object.keys(figC).forEach(k=>{if(k.startsWith(id+'|'))delete figC[k]});delete skinCache[id];return id}
const meId=()=>mkCH('me',C.p.name,C.p.pos,C.p.cm,effBase(),C.t[C.myT]?C.t[C.myT].col:'#2f6fe4',C.p.hd);
function effBase(){const m=.9+.1*C.en/100,b={};for(const k of SKS)b[k]=cl(Math.round(C.p.st[k]*m),20,99);return b}
const npcId=(ti,k,p,col)=>mkCH('t'+ti+':'+k,p.n,p.pos,p.cm,baseFrom(p.o,p.pos),col||C.t[ti].col,p.hd);
/* ---- liga ---- */
const mkNpc=(pos,o)=>({n:pick(FN)+' '+pick(LN),pos,o:cl(o,35,95),hd:r(0,64),cm:{PG:185,SG:192,SF:199,PF:205,C:212}[pos]+r(-5,5)});
function mkPl(s){const sl=[['PG','SG'],['SF','SG'],['PF','C']],pl=[];for(let k=0;k<3;k++)pl.push(mkNpc(pick(sl[k]),s+r(-4,4)));for(let k=0;k<4;k++)pl.push(mkNpc(pick(POS),s-r(6,14)));return pl}
function sched(ts){ts=ts.slice().sort(()=>Math.random()-.5);if(ts.length%2)ts.push(-1);const n=ts.length,R=[];for(let k=0;k<n-1;k++){const p=[];for(let i=0;i<n/2;i++){let a=ts[i],b=ts[n-1-i];if(k%2)[a,b]=[b,a];p.push([a,b])}R.push(p);ts.splice(1,0,ts.pop())}return R}
function newSeasonTables(){C.rec=C.t.map(()=>({w:0,l:0,pf:0,pa:0}));C.fx=C.dv.map(sched);C.rd=0;C.res=[]}
function createLeague(){const ord=[...Array(50).keys()].sort(()=>Math.random()-.5);C.dv=[ord.slice(0,16),ord.slice(16,33),ord.slice(33)];C.t=[];
 C.dv.forEach((d,di)=>d.forEach(t=>{C.t[t]={n:TN[t],col:COLS[t],pl:mkPl([78,66,55][di]+r(-4,4))}}));newSeasonTables()}
function simGame(a,b){const sa=str(a),sb=str(b),w=Math.random()<1/(1+Math.exp(-(sa-sb)/7)),ws=58+r(0,24),ls=ws-r(1,15);return w?[ws,ls]:[ls,ws]}
function rec(a,b,sa,sb){const A=C.rec[a],B=C.rec[b];A.pf+=sa;A.pa+=sb;B.pf+=sb;B.pa+=sa;sa>sb?(A.w++,B.l++):(B.w++,A.l++)}
function simRound(skipMine){C.dv.forEach((d,di)=>{const R=C.fx[di][C.rd];if(!R)return;for(const[a,b]of R){if(a<0||b<0)continue;if(skipMine&&(a===C.myT||b===C.myT))continue;const[x,y]=simGame(a,b);rec(a,b,x,y)}})}
const table=d=>C.dv[d].slice().sort((a,b)=>C.rec[b].w-C.rec[a].w||(C.rec[b].pf-C.rec[b].pa)-(C.rec[a].pf-C.rec[a].pa));
/* ---- entrenador IA ---- */
function coach(){const t=C.t[C.myT],k=slotOf(C.p.pos),st=t.pl[k],me=ovrP(),pr=C.rd<10?C.prom:0,eff=me+(C.trust-50)*.15+pr,d=eff-st.o;let role,why,at=0;
 if(C.en<25&&d>=-1){role='BANQUILLO';why='Vienes muy cansado, hoy descansas un rato.';at=70}
 else if(d>=-1){role='TITULAR';why=d>5?'Estás en gran momento, eres indiscutible.':'Te has ganado el puesto en el cinco inicial.'}
 else if(d>=-9){role='BANQUILLO';at=d>=-4?100:60;why=`${st.n} (${st.o}) está por delante de ti (${me}). Tendrás minutos al final.`}
 else{role='NO CONVOCADO';why=`Aún te falta nivel (${me}) frente a ${st.n} (${st.o}). Entrena y demuestra.`}
 return{role,why,at,st}}
const CO={n:'',s:''};
function coachMsg(nota){const e=C.co.s;if(nota==null)return pick(['Concentrados. Quiero intensidad desde el primer segundo.','Hoy toca disciplina atrás y balón en movimiento.','Confío en el grupo, vamos a por el partido.']);
 if(nota>=8)return pick(['¡Partidazo! Así se gana un sitio en mi quinteto.','Eso es jugar al baloncesto. Sigue así.']);if(nota>=6.5)return e=='Exigente'?'Bien, pero sé que puedes dar más.':'Buen trabajo hoy, vas por el buen camino.';
 return e=='Exigente'?'Esto no es suficiente. Quiero ver más trabajo en los entrenos.':'Hoy no salió, pero hay que seguir trabajando.'}
/* ---- UI base ---- */
const css=document.createElement('style');css.textContent=`#career{justify-content:flex-start;align-items:stretch;gap:6px;background:radial-gradient(circle at 50% 0,#1b1f4a,#080a18 70%);font-family:system-ui,sans-serif;color:#e8ecff}
#career h2,#career .pxt{font:12px 'Press Start 2P',monospace;color:#ffd23d;margin:4px 0}#career .ch{display:flex;align-items:center;gap:8px;background:#121638;border:2px solid #2c3a8a;border-radius:12px;padding:6px 10px}
#career .ch b{font-size:13px}#career .ch small{display:block;color:#9ab;font-size:10px}#career .bar{height:7px;border-radius:5px;background:#222a55;overflow:hidden;width:70px}#career .bar i{display:block;height:100%;background:#4ade80}
#career #cbody{flex:1;overflow:auto;display:flex;flex-direction:column;gap:8px;padding-bottom:4px}#career .card{background:#101433;border:2px solid #2c3a8a;border-radius:12px;padding:10px}
#career .nav{display:flex;gap:4px}#career .nav button{flex:1;padding:9px 2px;font:8px 'Press Start 2P',monospace;color:#9ab;background:#121638;border:2px solid #2c3a8a;border-radius:9px}#career .nav button.on{color:#fff;background:#2a3a7a;border-color:#5aa0ff}
#career .cb{padding:11px 12px;font:9px 'Press Start 2P',monospace;color:#fff;background:linear-gradient(#2a3a7a,#1a2556);border:3px solid #5aa0ff;border-radius:10px;box-shadow:0 4px 0 #0c1433}#career .cb.go{background:linear-gradient(#1fae5a,#0f7a3a);border-color:#6bff9c}#career .cb.no{opacity:.4}
#career .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}#career .sp{flex:1}#career .clg{object-fit:contain;filter:drop-shadow(0 2px 3px #000)}
#career .tag{font:8px 'Press Start 2P',monospace;padding:4px 6px;border-radius:6px;background:#2a3a7a}#career .st{display:flex;align-items:center;gap:6px;font-size:11px;margin:3px 0}#career .st b{width:74px;font-size:10px;color:#9ab}#career .st i{flex:1;height:8px;background:#222a55;border-radius:4px;overflow:hidden}#career .st u{display:block;height:100%;background:linear-gradient(90deg,#4aa8ff,#c05cff)}
#career table{width:100%;border-collapse:collapse;font-size:11px}#career td,#career th{padding:4px 3px;text-align:center}#career td:nth-child(2){text-align:left}#career tr.me{background:#27409a}#career tr.up td:first-child{color:#4ade80}#career tr.dn td:first-child{color:#ff6a6a}
#career .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}#career input[type=text]{width:100%;padding:10px;border-radius:8px;border:2px solid #5aa0ff;background:#0b0d1a;color:#fff;font-size:14px}
#career .hds{display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:4px;max-height:150px;overflow:auto;background:#0b0d1a;padding:4px;border-radius:8px}#career .hds canvas{width:100%;border:2px solid transparent;border-radius:8px;background:#1b2155}#career .hds canvas.on{border-color:#ffd23d}
#cres{position:absolute;inset:0;z-index:60;background:rgba(5,7,20,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#fff;padding:12px;overflow:auto;text-align:center}#cres.hidden{display:none}`;document.head.appendChild(css);
const sec=document.createElement('section');sec.id='career';sec.className='screen hidden';document.body.appendChild(sec);
const res=document.createElement('div');res.id='cres';res.className='hidden';document.body.appendChild(res);
let TAB='home',LIVE=null,CRE=null;
const ACT={};
sec.onclick=e=>{const a=e.target.closest('[data-a]');if(a&&ACT[a.dataset.a])ACT[a.dataset.a](a.dataset.v,a)};res.onclick=sec.onclick;
function paint(root){root.querySelectorAll('canvas[data-hd]').forEach(c=>{const g=c.getContext('2d');c.width=88;c.height=98;g.clearRect(0,0,88,98);const id=+c.dataset.hd;if(IM.heads&&IM.heads.naturalWidth)g.drawImage(IM.heads,(id%HM.cols)*HM.cw,((id/HM.cols)|0)*HM.ch,HM.cw,HM.ch,0,0,88,98)});
 root.querySelectorAll('canvas[data-fig]').forEach(c=>{const g=c.getContext('2d');c.width=88;c.height=98;try{g.drawImage(figImg(+c.dataset.fig,c.dataset.col),0,0,88,98)}catch(e){}})}
function toastC(t){try{toast(t)}catch(e){}}
function openHub(){if(!C)return create();$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');if(C.phase==='offers')return offers();show('#career');draw()}
function draw(){const t=C.t[C.myT],d=divOf(C.myT),R=C.fx[d].length;
 sec.innerHTML=`<div class="ch">${logo(t.n&&C.myT,40)}<div class="sp"><b>${t.n}</b><small style="color:${DC[d]}">DIVISIÓN ${DN[d]} · Temp. ${C.season} · Jornada ${Math.min(C.rd+1,R)}/${R}</small></div><div><small>⚡ Energía</small><div class="bar"><i style="width:${C.en}%"></i></div></div><div><small>🤝 Míster</small><div class="bar"><i style="width:${C.trust}%;background:#ffd23d"></i></div></div><div class="pxt" style="font-size:9px">💰${C.money}</div></div>
 <div id="cbody"></div><div class="nav">${[['home','🏠 INICIO'],['liga','🏆 LIGA'],['team','👥 PLANTEL'],['me','🧍 YO'],['train','💪 ENTRENO']].map(([k,l])=>`<button data-a="tab" data-v="${k}" class="${TAB==k?'on':''}">${l}</button>`).join('')}<button data-a="exit">⏏</button></div>`;
 ({home:vHome,liga:vLiga,team:vTeam,me:vMe,train:vTrain})[TAB]($('#cbody'));paint(sec)}
ACT.tab=v=>{TAB=v;draw()};ACT.exit=()=>{persist();LIVE=null;sec.classList.add('hidden');renderMenu()};
/* ---- vistas ---- */
function nextFx(){const R=C.fx[divOf(C.myT)][C.rd];if(!R)return null;const p=R.find(x=>x[0]===C.myT||x[1]===C.myT);return p&&p[0]>=0&&p[1]>=0?{opp:p[0]===C.myT?p[1]:p[0],home:p[0]===C.myT}:{bye:1}}
function vHome(b){const fx=nextFx(),d=divOf(C.myT);if(!C.fx[d][C.rd])return b.innerHTML=`<div class="card"><h2>🏁 TEMPORADA TERMINADA</h2><button class="cb go" data-a="endseason">VER RESUMEN Y OFERTAS</button></div>`;
 if(fx.bye)return b.innerHTML=`<div class="card"><h2>😴 JORNADA DE DESCANSO</h2><p>Tu equipo no juega esta jornada. Aprovecha para entrenar.</p><button class="cb go" data-a="skip">AVANZAR JORNADA ▶</button></div>`;
 const o=C.t[fx.opp],co=coach(),od=divOf(fx.opp);
 b.innerHTML=`<div class="card"><div class="row" style="justify-content:space-around"><div style="text-align:center">${logo(C.myT,64)}<div class="pxt" style="font-size:8px">${C.t[C.myT].n}</div></div><div class="pxt">VS</div><div style="text-align:center">${logo(fx.opp,64)}<div class="pxt" style="font-size:8px">${o.n}</div><small>⭐ ${str(fx.opp)} · ${fx.home?'🏟 Local':'✈ Visitante'}</small></div></div></div>
 <div class="card"><div class="row"><span class="tag" style="background:${co.role=='TITULAR'?'#1fa35c':co.role=='BANQUILLO'?'#c98a12':'#a02a3a'}">${co.role}</span><b>Míster ${C.co.n}</b><small>(${C.co.s})</small></div><p style="margin:6px 0">🗣 ${co.why}</p><p style="margin:6px 0;color:#9ab">${coachMsg()}</p>
 <div class="row"><button class="cb go ${co.role=='NO CONVOCADO'?'no':''}" data-a="play">▶ JUGAR PARTIDO</button><button class="cb" data-a="sim">⏩ SIMULAR</button>${co.role!='TITULAR'?`<button class="cb ${C.asked?'no':''}" data-a="ask">🙋 PEDIR MINUTOS</button>`:''}</div></div>
 <div class="card"><div class="pxt" style="font-size:9px">📰 ÚLTIMAS NOTICIAS</div>${C.log.slice(-4).reverse().map(x=>`<div style="font-size:12px;margin:4px 0">• ${x}</div>`).join('')||'<small>Aún sin noticias.</small>'}</div>`}
function vLiga(b){const d=C.vd!=null?C.vd:divOf(C.myT),mine=divOf(C.myT);
 b.innerHTML=`<div class="row">${[0,1,2].map(i=>`<button class="cb ${i==d?'go':''}" data-a="vd" data-v="${i}" style="font-size:8px">${DN[i]}${i==mine?' ★':''}</button>`).join('')}</div><div class="card"><table><tr><th>#</th><th>Equipo</th><th>G</th><th>P</th><th>Dif</th></tr>${table(d).map((t,i)=>{const n=C.dv[d].length,cls=(t===C.myT?'me ':'')+(d>0&&i<2?'up':d<2&&i>=n-2?'dn':'');const R=C.rec[t];return`<tr class="${cls}"><td>${i+1}</td><td>${logo(t,20)} ${C.t[t].n}</td><td>${R.w}</td><td>${R.l}</td><td>${R.pf-R.pa}</td></tr>`}).join('')}</table><small style="color:#9ab">🟢 Los 2 primeros suben · 🔴 Los 2 últimos bajan</small></div>`}
ACT.vd=v=>{C.vd=+v;draw()};
function vTeam(b){const t=C.t[C.myT],k=slotOf(C.p.pos),co=coach();b.innerHTML=`<div class="card"><div class="pxt" style="font-size:9px">QUINTETO · ${t.n}</div>${t.pl.map((p,i)=>`<div class="row" style="padding:5px 0;border-bottom:1px solid #223"><canvas data-hd="${p.hd}" style="width:34px;height:38px"></canvas><b>${p.n}</b><span class="tag">${p.pos}</span><span class="sp"></span><small>${i<3?'TITULAR':'RESERVA'}</small><b style="font-size:15px;color:#ffd23d">${p.o}</b></div>`).join('')}
 <div class="row" style="padding:5px 0"><canvas data-fig="${meId()}" data-col="${t.col}" style="width:34px;height:38px"></canvas><b>${C.p.name} (TÚ)</b><span class="tag">${C.p.pos}</span><span class="sp"></span><small>${co.role}</small><b style="font-size:15px;color:#4ade80">${ovrP()}</b></div></div>`}
function vMe(b){const p=C.p,S=C.ss,g=S.g||1;b.innerHTML=`<div class="card"><div class="row"><canvas data-fig="${meId()}" data-col="${C.t[C.myT].col}" style="width:88px;height:98px"></canvas><div class="sp"><b style="font-size:16px">${p.name}</b><small>${PN[p.pos]} · ${p.cm} cm · ${p.age} años</small><div class="pxt" style="font-size:20px;color:#4ade80;margin-top:4px">${ovrP()}</div><small>Potencial ★ ${p.pot} · Fama ${C.fame}</small></div></div>${SKS.map(k=>`<div class="st"><b>${STN[k]}</b><i><u style="width:${p.st[k]}%"></u></i><span>${p.st[k]}</span></div>`).join('')}</div>
 <div class="card"><div class="pxt" style="font-size:9px">TEMPORADA ${C.season}</div><p style="font-size:12px">Partidos ${S.g||0} · Nota media <b>${S.g?(S.n/S.g).toFixed(1):'-'}</b><br>PTS ${(S.pts/g).toFixed(1)} · REB ${(S.reb/g).toFixed(1)} · AST ${(S.ast/g).toFixed(1)} · ROB ${(S.stl/g).toFixed(1)} · TAP ${(S.blk/g).toFixed(1)}</p></div>
 <div class="card"><button class="cb" data-a="reset" style="font-size:8px">🗑 NUEVA CARRERA</button></div><div class="card"><div class="pxt" style="font-size:9px">PALMARÉS</div>${C.hist.length?C.hist.map(h=>`<div style="font-size:12px;margin:3px 0">${h.c?'🏆':'•'} Temp. ${h.s}: ${h.tn} (${DN[h.d]}) · ${h.pos}º · nota ${h.nota}</div>`).join(''):'<small>Tu historia empieza ahora.</small>'}</div>`}
function vTrain(b){const out=C.tp<=0||C.en<10;b.innerHTML=`<div class="card"><div class="pxt" style="font-size:9px">PLAN DE LA SEMANA · ${C.tp} acciones libres</div><p style="font-size:11px;color:#9ab">Cada acción gasta energía. El míster valora a quien se esfuerza.</p><div class="grid">${SKS.map(k=>`<button class="cb ${out?'no':''}" data-a="train" data-v="${k}">🏋 ${STN[k]} <small>${C.p.st[k]}/${C.p.pot}</small></button>`).join('')}</div></div>
 <div class="card"><div class="grid"><button class="cb ${C.tp<=0||C.en<15?'no':''}" data-a="street">🏙 PRACTICAR EN LA CALLE<br><small>1v1 callejero · sube stats</small></button><button class="cb ${C.tp<=0?'no':''}" data-a="rest">😴 DESCANSAR<br><small>+35 energía</small></button></div></div>
 <div class="card"><div class="pxt" style="font-size:9px">🛒 TIENDA · 💰${C.money}</div>${SHOP.map((s,i)=>`<div class="row" style="padding:5px 0"><div class="sp"><b>${s.n}</b><small style="display:block;color:#9ab">${s.d}</small></div><button class="cb ${C.own[i]||C.money<s.p?'no':''}" data-a="buy" data-v="${i}">${C.own[i]?'✔':'💰'+s.p}</button></div>`).join('')}</div>`}
/* ---- acciones ---- */
const log=t=>{C.log.push(t);if(C.log.length>12)C.log.shift()};
function grow(k,n=1){const p=C.p;if(p.st[k]>=p.pot||p.st[k]>=99)return false;p.st[k]=Math.min(p.pot,p.st[k]+n);return true}
ACT.train=k=>{if(C.tp<=0||C.en<10)return;C.tp--;C.en-=10;const pr=cl(.85-(C.p.st[k]-45)/80,.12,.9)*(C.own[4]?1.25:1)*(C.p.age>29?.7:1),ok=Math.random()<pr&&grow(k);C.trust=cl(C.trust+1,0,100);persist();draw();toastC(ok?`¡+1 ${STN[k]}!`:'Sesión dura, sin mejora visible…')};
ACT.rest=()=>{if(C.tp<=0)return;C.tp--;C.en=Math.min(100,C.en+35);persist();draw();toastC('Has recuperado energía 😴')};
ACT.buy=i=>{const s=SHOP[i];if(C.own[i]||C.money<s.p)return;C.money-=s.p;C.own[i]=1;if(s.k!='pt')C.p.st[s.k]=Math.min(99,C.p.st[s.k]+3);persist();draw();toastC('¡Comprado!')};
ACT.ask=()=>{if(C.asked)return;C.asked=1;const ok=Math.random()<.3+C.trust/200+(ovrP()>=coach().st.o-4?.2:0);if(ok){C.prom=Math.max(C.prom,4);C.trust=cl(C.trust+3,0,100);log('El míster te promete más minutos.')}else{C.trust=cl(C.trust-2,0,100);log('El míster: «Gánatelo en los entrenos».')}persist();draw()};
ACT.skip=()=>{simRound(false);nextRound()};
function nextRound(){C.rd++;C.tp=3;C.asked=0;C.en=Math.min(100,C.en+15);persist();draw()}
ACT.sim=()=>{const fx=nextFx();if(!fx||fx.bye)return ACT.skip();const co=coach(),pl=co.role!='NO CONVOCADO',m=co.role=='TITULAR'?1:.5,o=ovrP(),me=pl?{pts:Math.round(o/9*m*(.4+Math.random())),reb:Math.round(o/25*m*Math.random()*2),ast:Math.round(o/30*m*Math.random()*2),stl:r(0,1),blk:r(0,1),fgm:0,fga:0,sec:co.role=='TITULAR'?150:co.at}:null;
 const[x,y]=simGame(C.myT,fx.opp);done({opp:fx.opp,mine:x,theirs:y,me,played:false})};
ACT.play=()=>{const fx0=nextFx();if(!fx0||fx0.bye)return;const co=coach();if(co.role=='NO CONVOCADO'){toastC('El míster no te ha convocado. Usa SIMULAR.');return}const fx=nextFx();startCar(fx,co)};
ACT.street=()=>{if(C.tp<=0||C.en<15)return;const id=meId();LIVE={k:'street',id,sel:save.sel,lineup:save.lineup};save.owned[id]={lvl:1,st:0};save.sel=id;window.STAD_PICK=2;const rv=pickRival(1);rv.col=rivalColor(CH[id].jc,CH[rv.id].jc);sec.classList.add('hidden');startMatch(1,rv)};
/* ---- partido ---- */
function startCar(fx,co){const my=C.t[C.myT],op=C.t[fx.opp],cid=meId(),k=slotOf(C.p.pos),L=my.pl.slice(0,3).map((p,i)=>npcId(C.myT,i,p)),oi=op.pl.slice(0,3).map((p,i)=>npcId(fx.opp,i,p));
 const st=co.role=='TITULAR';if(st)L[k]=cid;L.forEach(i=>save.owned[i]={lvl:1,st:0});save.owned[cid]={lvl:1,st:0};
 LIVE={k:'game',fx,co,cid,slot:k,start:st,subbed:st,sel:save.sel,lineup:save.lineup,ids:[...L,cid]};save.lineup=L;
 const tm={name:op.n,col:op.col,ids:oi,ovr:str(fx.opp)};TEAMS.push(tm);curTeam=TEAMS.length-1;curMode=3;window.STAD_PICK=STADS.findIndex(s=>s.k==='neon');
 sec.classList.add('hidden');show(null);startMatch3();TEAMS.pop();G.diff=DDIF[divOf(fx.opp)];G.hu=G.P[st?k:0];
 hudPortrait($('#hpL'),G.hu.id,G.mc);$('#nL').textContent=my.n}
setInterval(()=>{if(!LIVE)return;if(!G||G.mode==='end'&&!G.endPending){if(!G&&!CRE){cleanTemp();LIVE=null}return}
 if(LIVE.k==='game'&&!LIVE.subbed&&G.mode==='play'&&G.t<=LIVE.co.at){LIVE.subbed=true;if(doSub(LIVE.slot,LIVE.cid)!==false){G.hu=G.P[LIVE.slot];hudPortrait($('#hpL'),G.hu.id,G.mc);try{msg('¡ENTRAS A LA PISTA!',80)}catch(e){}}}},400);
function cleanTemp(){if(!LIVE)return;(LIVE.ids||[]).concat(LIVE.id!=null?[LIVE.id]:[]).forEach(i=>delete save.owned[i]);if(LIVE.cid!=null)delete save.owned[LIVE.cid];for(const k of Object.keys(save.owned))if(+k>=65)delete save.owned[k];save.sel=LIVE.sel;save.lineup=LIVE.lineup;if(window.STAD_PICK!=null)window.STAD_PICK=null;store()}
const _end=endMatch;endMatch=function(){if(!LIVE)return _end();const g=G,L=LIVE;G.endPending=1;_end();setTimeout(()=>{if(!LIVE)return;
 const mine=g.P.concat(Object.values(g.bn||{}).filter(q=>q.pl)).filter(q=>q.t===0&&q.id===(L.k==='street'?L.id:L.cid)),me=mine[0],w=g.s[0]>g.s[1];
 cleanTemp();LIVE=null;$('#end').classList.add('hidden');
 if(L.k==='street')return streetDone(w,me&&me.gs);
 const s=me?me.gs:null;done({opp:L.fx.opp,me:s&&{...s,sec:L.start?150:L.co.at},played:true,mine:g.s[0],theirs:g.s[1]})},1050)};
function streetDone(w,gs){C.tp--;C.en=Math.max(0,C.en-15);C.fame+=w?3:1;const ks=[];for(let i=0;i<(w?2:1);i++){const k=pick(SKS);if(Math.random()<.7&&grow(k)){ks.push(STN[k])}}log(w?'Ganas en la calle y subes tu fama 🔥':'Pierdes en la calle, pero aprendes.');persist();res.innerHTML=`<h2 class="pxt">${w?'🏆 ¡GANAS EN LA CALLE!':'DERROTA CALLEJERA'}</h2><p>${ks.length?'Mejoras: '+ks.map(x=>'+1 '+x).join(', '):'Sin mejoras esta vez'}</p><button class="cb go" data-a="back">VOLVER</button>`;res.classList.remove('hidden');CRE=1}
ACT.back=()=>{res.classList.add('hidden');CRE=null;$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');if(C.phase==='offers')return offers();show('#career');draw()};
function done(o){const fx=nextFx(),myHome=fx.home,sa=o.mine,sb=o.theirs;
 const mw=sa>sb,a=myHome?C.myT:fx.opp,b=myHome?fx.opp:C.myT;rec(a,b,myHome?sa:sb,myHome?sb:sa);simRound(true);
 let nota=null,m=o.me,S=C.ss;if(m){const mn=m.sec||0;nota=cl(5+(mw?.7:-.3)+m.pts*.12+m.reb*.15+m.ast*.25+m.stl*.3+m.blk*.3+((m.fgm||0)-((m.fga||0)-(m.fgm||0))*.35)*.1+(mn/150-.5)*.5+Math.random()*.4,1,10);nota=Math.round(nota*10)/10;
  S.g++;S.n+=nota;for(const k of['pts','reb','ast','stl','blk'])S[k]+=m[k]||0;C.trust=cl(C.trust+(nota>=7.5?5:nota>=6?1:-3),0,100);C.fame+=Math.round(nota/3);
  if(nota>=6.5&&Math.random()<nota/14){const k=pick(SKS);if(grow(k))log(`Mejoras tras el partido: +1 ${STN[k]}`)}}else C.trust=cl(C.trust-1,0,100);
 C.en=Math.max(0,C.en-(m&&o.played?28:6));const pay=Math.round(DSAL[divOf(C.myT)]*(.6+ovrP()/100)*(mw?1.4:1));C.money+=pay;
 log(`${mw?'Victoria':'Derrota'} ${sa}-${sb} ${myHome?'vs':'en'} ${C.t[fx.opp].n}${nota?' · nota '+nota:''}`);
 const line=`${C.t[C.myT].n} ${sa} - ${sb} ${C.t[fx.opp].n}`;persist();
 res.innerHTML=`<div class="pxt" style="font-size:11px">${mw?'🏆 VICTORIA':'DERROTA'}</div><div style="display:flex;align-items:center;gap:10px">${logo(C.myT,56)}<b style="font-size:26px">${sa} - ${sb}</b>${logo(fx.opp,56)}</div>
 ${m?`<div class="card" style="min-width:250px"><div class="pxt" style="font-size:9px">TU ACTUACIÓN</div><div style="font-size:34px;font-weight:800;color:${nota>=7?'#4ade80':nota>=5.5?'#ffd23d':'#ff6a6a'}">${nota.toFixed(1)}</div><div style="font-size:12px">PTS ${m.pts} · REB ${m.reb} · AST ${m.ast} · ROB ${m.stl} · TAP ${m.blk}</div></div>`:`<div class="card">No has jugado minutos hoy.</div>`}
 <div class="card" style="max-width:420px;font-size:12px">🗣 Míster ${C.co.n}: «${coachMsg(nota)}»<br><small style="color:#9ab">+💰${pay}</small></div><button class="cb go" data-a="next">CONTINUAR ▶</button>`;res.classList.remove('hidden');CRE=1}
ACT.next=()=>{res.classList.add('hidden');CRE=null;nextRound();$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');show('#career');draw()};
/* ---- fin de temporada ---- */
ACT.endseason=()=>{const my=C.myT,d=divOf(my);while(C.dv.some((x,i)=>C.fx[i][C.rd])){simRound(false);C.rd++}
 const tb=C.dv.map((_,i)=>table(i)),pos=tb[d].indexOf(my)+1,ch=d==0&&pos==1,S=C.ss,nota=S.g?(S.n/S.g).toFixed(1):'-',R=C.rec[my];
 C.hist.push({s:C.season,tn:C.t[my].n,d,pos,nota,c:ch});if(ch)C.fame+=30;
 C.dv=[tb[0].slice(0,14).concat(tb[1].slice(0,2)),tb[1].slice(2,15).concat(tb[0].slice(14),tb[2].slice(0,2)),tb[2].slice(2).concat(tb[1].slice(15))];
const seen=new Set();C.dv=C.dv.map(a=>a.filter(t=>!seen.has(t)&&seen.add(t)));
 const all=[...Array(50).keys()].filter(t=>!seen.has(t));all.forEach(t=>C.dv[2].push(t));
 C.sum={pos,d,ch,nota,w:R.w,l:R.l,up:d>0&&pos<=2,dn:d<2&&pos>tb[d].length-2};C.phase='offers';persist();offers()};
function offers(){const d=divOf(C.myT),av=C.ss.g?C.ss.n/C.ss.g:5,me=ovrP(),first=!C.t,list=[];
 const cand=(di,rk)=>{const t=C.dv[di];return table(di)[cl(rk,0,t.length-1)]};
 if(!C.sum){/* inicio */list.push(cand(2,1),cand(1,8),cand(0,13))}else{list.push(C.myT);const up=av>=7?Math.max(0,d-1):d,dn=Math.min(2,d+(av<5?1:0));[up,dn].forEach((di,i)=>{let t=cand(di,i?3:5+r(0,2));if(!list.includes(t))list.push(t)})}
 C.off=list.filter((v,i,a)=>a.indexOf(v)==i).slice(0,3);persist();show('#career');
 const sm=C.sum;sec.innerHTML=`<h2>${sm?'📋 FIN DE TEMPORADA '+C.season:'📨 TUS OFERTAS'}</h2>${sm?`<div class="card">${sm.ch?'🏆 ¡CAMPEÓN DE LA ÉLITE! ':''}Terminas ${sm.pos}º en ${DN[sm.d]} (${sm.w}-${sm.l}) · nota media ${sm.nota}${sm.up?'<br>⬆ ¡Ascenso de división!':''}${sm.dn?'<br>⬇ Descenso de división…':''}</div>`:'<div class="card">Tres equipos quieren ficharte. Elige dónde empezar tu carrera.</div>'}
 <div id="cbody"><div class="grid">${C.off.map(t=>{const di=divOf(t),k=slotOf(C.p.pos),sd=C.t[t].pl[k].o,role=me>=sd-1?'TITULAR garantizado':me>=sd-9?'Rotación: pelearás por minutos':'Proyecto: empezarás en el banquillo';return`<div class="card"><div class="row">${logo(t,48)}<div class="sp"><b>${C.t[t].n}</b><small style="color:${DC[di]};display:block">DIVISIÓN ${DN[di]}</small></div></div><p style="font-size:12px">⭐ Nivel equipo ${str(t)}<br>🎽 ${role}<br>💰 ${Math.round(DSAL[di]*(.6+me/100))}/partido</p><button class="cb go" data-a="sign" data-v="${t}">${t===C.myT&&sm?'RENOVAR':'FICHAR'}</button></div>`}).join('')}</div></div>`}
ACT.sign=v=>{const t=+v,k=slotOf(C.p.pos),sd=C.t[t].pl[k].o,me=ovrP(),first=!C.sum;if(!first)startSeason(t);C.myT=t;C.prom=me>=sd-1?8:me>=sd-9?3:0;if(first)C.trust=50;C.phase='hub';persist();TAB='home';show('#career');draw()};
function startSeason(t){const same=t===C.myT;C.season++;const p=C.p;p.age++;const y=p.age<24?2:p.age<29?1:0;for(let i=0;i<y+r(0,1);i++)grow(pick(SKS));if(p.age>31)p.st.vel=Math.max(30,p.st.vel-1);
 C.t.forEach((tm,i)=>{const b=[78,66,55][divOf(i)];tm.pl.forEach((q,j)=>{q.o=cl(Math.round(q.o+(b-(j<3?0:9)-q.o)*.2+r(-2,2)),35,95)})});
 newSeasonTables();C.ss={g:0,n:0,pts:0,reb:0,ast:0,stl:0,blk:0};C.sum=null;C.en=100;C.tp=3;C.asked=0;if(!same)C.trust=50;C.co={n:pick(LN),s:pick(['Exigente','Paciente','Táctico'])}}
ACT.reset=()=>{if(!confirm('¿Borrar esta carrera y empezar otra?'))return;C=null;try{localStorage.removeItem(KEY)}catch(e){}window._cd=null;create()};
/* ---- crear jugador ---- */
function create(){const s=window._cd||(window._cd={name:'',pos:'SG',cm:195,hd:r(0,64)});$('#hud').classList.add('hidden');show('#career');
 sec.innerHTML=`<h2>🏀 CREA TU JUGADOR</h2><div id="cbody"><div class="card"><div class="row"><canvas id="cprev" style="width:88px;height:98px"></canvas><div class="sp"><input type="text" id="cname" maxlength="14" placeholder="Nombre del jugador" value="${s.name}"><div class="pxt" style="font-size:9px;margin-top:6px" id="cinfo"></div></div></div></div>
 <div class="card"><div class="pxt" style="font-size:9px">POSICIÓN</div><div class="row">${POS.map(p=>`<button class="cb ${s.pos==p?'go':''}" data-a="cpos" data-v="${p}" style="font-size:8px">${p}<br><small>${PN[p]}</small></button>`).join('')}</div></div>
 <div class="card"><div class="pxt" style="font-size:9px">ALTURA: <span id="ccm">${s.cm}</span> cm</div><input type="range" id="crange" min="170" max="225" value="${s.cm}" style="width:100%"><small style="color:#9ab">Más alto: más mates, rebotes y muro · Más bajo: más velocidad y manejo</small></div>
 <div class="card"><div class="pxt" style="font-size:9px">CABEZA</div><div class="hds">${[...Array(65).keys()].map(i=>`<canvas data-hd="${i}" data-a="chd" data-v="${i}" class="${s.hd==i?'on':''}"></canvas>`).join('')}</div></div>
 <button class="cb go" data-a="cdone">✔ CREAR Y VER OFERTAS</button></div>`;paint(sec);prev();
 $('#cname').oninput=e=>{s.name=e.target.value};$('#crange').oninput=e=>{s.cm=+e.target.value;$('#ccm').textContent=s.cm;prev()}}
function draftStats(s){const t=(s.cm-170)/55,M=POSM[s.pos],b={};for(const k of['vel','tir','mat','reg','def'])b[k]=Math.round(46+M[k]*.9);b.mat+=Math.round(t*12-6);b.def+=Math.round(t*8-4);b.vel-=Math.round(t*10-5);b.reg-=Math.round(t*8-4);b.pas=46+(s.pos=='PG'?8:s.pos=='C'?-4:0);b.reb=46+Math.round(t*16-5)+(s.pos=='PF'||s.pos=='C'?5:0);b.agu=50;for(const k of SKS)b[k]=cl(b[k],30,80);return b}
function prev(){const s=window._cd,st=draftStats(s),id=mkCH('me',s.name||'Tú',s.pos,s.cm,st,'#2f6fe4',s.hd);const c=$('#cprev');if(c){c.width=88;c.height=98;const g=c.getContext('2d');g.clearRect(0,0,88,98);try{g.drawImage(figImg(id,'#2f6fe4'),0,0,88,98)}catch(e){}}$('#cinfo').textContent=`${PN[s.pos]} · ${s.cm} cm · NIVEL ${ovrSt(st,s.pos)}`}
ACT.cpos=v=>{window._cd.pos=v;const n=$('#cname').value;window._cd.name=n;create();$('#cname').value=n};
ACT.chd=v=>{window._cd.hd=+v;$$('#career .hds canvas').forEach(c=>c.classList.toggle('on',c.dataset.hd==v));prev()};
ACT.cdone=()=>{const s=window._cd,n=(s.name||'').trim();if(n.length<2){toastC('Pon un nombre (mín. 2 letras)');return}
 C={v:1,p:{name:n,pos:s.pos,cm:s.cm,hd:s.hd,age:18,st:draftStats(s),pot:r(84,95)},season:1,phase:'offers',en:100,tp:3,trust:50,prom:0,money:500,fame:0,own:{},log:['Empieza tu carrera profesional 🏀'],hist:[],ss:{g:0,n:0,pts:0,reb:0,ast:0,stl:0,blk:0},asked:0,co:{n:pick(LN),s:pick(['Exigente','Paciente','Táctico'])},sum:null,myT:0};createLeague();window._cd=null;persist();offers()};
/* ---- entrada desde el menú ---- */
const tile=document.createElement('button');tile.className='tile';tile.id='b-career';tile.innerHTML='<span class="ti">🏆</span><b>CARRERA</b><small>Sé una estrella</small>';tile.style.background='linear-gradient(#e8a400,#8a5a00)';
const tl=$('.mtiles');if(tl)tl.insertBefore(tile,tl.firstChild);tile.onclick=openHub;
})();
