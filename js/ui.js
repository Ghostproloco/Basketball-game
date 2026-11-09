// ===== Menús, equipo, gacha =====
const LDS=new Set(['#career','#gacha','#pick','#team','#lineup','#teams','#profile','#account','#social','#how']);
const show=id=>{const was=id&&$(id)&&!$(id).classList.contains('hidden');$$('.screen').forEach(s=>s.classList.add('hidden'));if(id){const e=$(id);e.classList.remove('hidden');mountPreviews(e);if(!was&&LDS.has(id)&&window.LDR&&!window.NOLOAD)LDR.flash(700)}};
const myCard=()=>cardHTML(save.sel,save.owned[save.sel]);
function fillMenu(){try{window.dailyGems&&dailyGems()}catch(e){}$$('.gm').forEach(e=>e.textContent=save.gems||0);$('#mPl').textContent=save.played;$('#mWi').textContent=save.wins;$('#mRo').textContent=Object.keys(save.owned).length+'/'+CH.length;$('#mUser').textContent=window.FBX&&FBX.user?FBX.user.name:'Invitado';
 $('#mlegs').innerHTML=SPEC.slice().sort(()=>Math.random()-.5).slice(0,3).map((i,k)=>`<div class="lg" style="--c:${RCOL[CH[i].pw]};animation-delay:${k*.5}s"><img src="${figImg(i,CH[i].jc)}"><b>${CH[i].name}</b><small>${CH[i].title}</small></div>`).join('')}
function menuFx(){const cv=$('#mcv');if(!cv||menuFx.on)return;menuFx.on=true;const g=cv.getContext('2d'),P=[],cr=[];
 for(let i=0;i<70;i++)P.push({x:Math.random(),y:Math.random(),s:.4+Math.random()*1.4,v:.0004+Math.random()*.0012,c:['#ffd23d','#ff7a1a','#b266ff','#6fdcff'][i%4],p:Math.random()*6});
 for(let i=0;i<36;i++)cr.push({x:i/35,h:.55+Math.random()*.4,p:Math.random()*6,c:['#10142e','#171c3c','#0d1128'][i%3]});
 let t=0;(function L(){if($('#menu').classList.contains('hidden')){menuFx.on=false;return}requestAnimationFrame(L);t++;
  const W=cv.clientWidth|0,H=cv.clientHeight|0;if(cv.width!==W)cv.width=W;if(cv.height!==H)cv.height=H;
  const bg=g.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#0a0b24');bg.addColorStop(.55,'#2a1050');bg.addColorStop(1,'#43154f');g.fillStyle=bg;g.fillRect(0,0,W,H);
  g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const a=Math.sin(t*.008+i*1.7)*.5,x=W*(.12+.25*i),gr=g.createLinearGradient(x,0,x+a*H,H);gr.addColorStop(0,['#ffd23d66','#b266ff66','#6fdcff66','#ff7a1a66'][i]);gr.addColorStop(1,'#0000');g.fillStyle=gr;g.beginPath();g.moveTo(x-12,0);g.lineTo(x+12,0);g.lineTo(x+a*H+W*.1,H);g.lineTo(x+a*H-W*.1,H);g.fill()}
  g.globalCompositeOperation='source-over';
  for(const c of cr){const x=c.x*W,bob=Math.sin(t*.05+c.p)*H*.008,hh=H*.14*c.h;g.fillStyle=c.c;g.beginPath();g.arc(x,H*.7-hh+bob,H*.035,0,7);g.fill();g.fillRect(x-H*.045,H*.7-hh+H*.03+bob,H*.09,hh)}
  const fl=g.createLinearGradient(0,H*.7,0,H);fl.addColorStop(0,'#4d2412');fl.addColorStop(1,'#b8631f');g.fillStyle=fl;g.fillRect(0,H*.7,W,H*.3);g.strokeStyle='#ffffff22';g.lineWidth=2;
  for(let i=-8;i<=8;i++){g.beginPath();g.moveTo(W/2+i*W*.02,H*.7);g.lineTo(W/2+i*W*.16,H);g.stroke()}for(let k=1;k<6;k++){const y=H*.7+H*.3*Math.pow(k/6,1.6);g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
  g.globalCompositeOperation='lighter';for(const p of P){p.y-=p.v;p.x+=Math.sin(t*.02+p.p)*.0006;if(p.y<-.05){p.y=1.05;p.x=Math.random()}g.fillStyle=p.c;g.globalAlpha=.55;g.beginPath();g.arc(p.x*W,p.y*H,p.s*H*.004+1,0,7);g.fill()}g.globalAlpha=1;g.globalCompositeOperation='source-over'})()}
function renderMenu(){store();fillMenu();show('#menu');menuFx();musicPlay('menu')}
$('#b-play').onclick=()=>{curDiff=1;curMode=1;beginVs()};
$('#b-gacha').onclick=()=>{gReset();show('#gacha');store()};
$('#b-team').onclick=()=>{backTo='menu';openTeam()};
$('#b-change').onclick=()=>{backTo='pick';openTeam()};
$('#b-how').onclick=()=>show('#how');
$('#b-snd').onclick=()=>{save.snd=save.snd?0:1;$('#b-snd span').textContent=save.snd?'🔊':'🔇';store();save.snd?musicPlay(MUS.tr):musicStop()};
$$('[data-back]').forEach(b=>b.onclick=()=>show('#menu'));
$('#t-back').onclick=()=>{if(backTo==='pick'){$('#b-play').onclick()}else renderMenu()};
$('#g-back').onclick=()=>renderMenu();
// ---- equipo ----
let backTo='menu',tSel=0;let curMode=1,lSlot=0,curTeam=0;
function lineupAuto(){const used=new Set(),L=[];SLOTPOS.forEach(ps=>{const c=CH.filter(x=>save.owned[x.id]&&ps.includes(x.pos)&&!used.has(x.id)).sort((a,b)=>b.rar*100+save.owned[b.id].lvl-a.rar*100-save.owned[a.id].lvl)[0];if(c){used.add(c.id);L.push(c.id)}else L.push(-1)});return L}
function renderLineup(){const L=save.lineup;$('#lslots').innerHTML=L.map((id,k)=>`<div class="ls${lSlot==k?' on':''}" data-k="${k}"><small>${SLOTN[k]}</small>${id>=0?'<div class="lsp">'+portrait(id)+'</div>':'<div class="inv">🎲</div>'}<b>${id>=0?CH[id].name:'INVITADO'}</b><small>${id>=0?CH[id].pos+' · '+CH[id].pw+' · Nv'+save.owned[id].lvl:SLOTPOS[k].join('/')+' · gratis'}</small></div>`).join('');
 $$('#lslots .ls').forEach(e=>e.onclick=()=>{lSlot=+e.dataset.k;renderLineup()});
 const ok=CH.filter(c=>save.owned[c.id]&&SLOTPOS[lSlot].includes(c.pos)).sort((a,b)=>b.rar-a.rar||a.id-b.id);
 $('#lhint').textContent=`Posición ${SLOTN[lSlot]}: elige un ${SLOTPOS[lSlot].join(' o ')} de tus jugadores (si no tienes, entra un invitado)`;
 $('#lgrid').innerHTML=ok.map(c=>`<div class="slot${L[lSlot]==c.id?' sel':''}" style="--rc:${RAR[c.rar].c}" data-id="${c.id}">${portrait(c.id)}<span class="nmb">${shortN(c.name)}</span></div>`).join('')+`<div class="slot inv2" data-id="-1">🎲</div>`;
 $$('#lgrid .slot').forEach(e=>e.onclick=()=>{const id=+e.dataset.id;if(id>=0)for(let i=0;i<3;i++)if(L[i]==id)L[i]=-1;L[lSlot]=id;store();renderLineup()});mountPreviews($('#lslots'))}
$('#b-3v3').onclick=()=>{if(!save.lineup||save.lineup.length!==3)save.lineup=lineupAuto();lSlot=0;renderLineup();show('#lineup')};
$('#l-auto').onclick=()=>{save.lineup=lineupAuto();renderLineup()};
$('#l-go').onclick=()=>{renderTeams();show('#teams')};
$('#tm-back').onclick=()=>{renderLineup();show('#lineup')};
function renderTeams(){$('#tmgrid').innerHTML=TEAMS.map((t,i)=>`<div class="tm" data-i="${i}" style="--tc:${t.col}"><b>${t.name}</b><div class="tmf">${t.ids.map(id=>'<span class="tmp">'+portrait(id,1,t.col)+'</span>').join('')}</div><small>${t.ids.map(id=>CH[id].pos).join(' · ')} · OVR ${t.ovr}</small></div>`).join('');
 $$('#tmgrid .tm').forEach(e=>e.onclick=()=>{curTeam=+e.dataset.i;curMode=3;show(null);startMatch3()})}

function openTeam(){tSel=save.sel;renderTeam();show('#team')}
function renderTeam(){
 const owned=Object.keys(save.owned).length;$('#tCount').textContent=`${owned}/${CH.length}`;
 const list=CH.filter(c=>save.owned[c.id]).sort((a,b)=>b.rar-a.rar||a.id-b.id);if(!save.owned[tSel])tSel=save.sel;
 $('#grid').innerHTML=list.map(c=>{const o=save.owned[c.id];return`<div class="slot${tSel==c.id?' sel':''}${save.sel==c.id?' cur':''}" style="--rc:${RAR[c.rar].c}" data-id="${c.id}">${portrait(c.id)}<span class="nmb">${shortN(c.name)}</span></div>`}).join('');
 $$('#grid .slot').forEach(e=>e.onclick=()=>{tSel=+e.dataset.id;renderTeam()});
 const c=CH[tSel],o=save.owned[tSel];let h='';
 if(o){h=cardHTML(tSel,o);{const k=h.indexOf('class="lv"'),e=h.indexOf('</div>',k)+6;h=h.slice(0,e)+hatRow(tSel)+h.slice(e)}
  h+=`<div class="dbtns"><button class="btn main" id="d-sel" ${save.sel==tSel?'disabled':''}>${save.sel==tSel?'✓ ELEGIDO':'ELEGIR'}</button></div><div style="font-size:7px;color:#9ad;text-align:center;line-height:1.7">${o.st>=MAXST?'★ MÁXIMO · las copias dan monedas':'Si te toca otra vez en un sobre sube a ★'+(o.st+1)+' (+'+Math.round(STB*100)+'% a todos los stats)'}</div>`}
 else h=`<div class="pcard" style="--rc:${RAR[c.rar].c}"><div class="nm">???</div><div class="rr">★ ${RAR[c.rar].k} · ${c.pos} · ${PWN[c.pw]||c.pw} · ${c.title||ARN[c.arch]}</div><div class="lv" style="line-height:1.8">No lo tienes todavía.<br>¡Consíguelo en el Gacha!</div></div>`;
 $('#detail').innerHTML=h;mountPreviews($('#detail'));
 const ds=$('#d-sel');if(ds)ds.onclick=()=>{save.sel=tSel;store();renderTeam()};const dh=$('#d-hat');if(dh)dh.onclick=()=>openHatPick(tSel);
 }
// ---- gacha ----
let gres=[],gi=0,gstate='idle';
function gMode(m){const g=$('#gacha');g.classList.remove('m-packs','m-reveal','m-sum');g.classList.add('m-'+m)}
function gReset(){gres=[];gi=0;gstate='idle';gMode('packs');renderPacks();$('#gcard').classList.add('hidden');$('#gsum').classList.add('hidden');$('#g-next').classList.add('hidden');$('#gtip').textContent='Toca la carta para revelarla'}
function gOpen(n){const pk=PACKS[n],cost=pk.cost;if(save.coins<cost){$('#gtip').textContent='No tienes monedas suficientes 😢 ¡Juega partidos para ganar más!';return}
 save.coins-=cost;if(pk.welcome)save.welcome=0;gres=[];for(let i=0;i<pk.cnt;i++){const c=rollGacha((pk.all||i==pk.cnt-1)?pk.min:0,pk.b,pk);gres.push({c,r:grantChar(c)})}store();gi=0;gMode('reveal');gShow()}
function gShow(){const{c,r}=gres[gi],R=RAR[c.rar],card=$('#gcard');
 card.classList.remove('flip','shake','hidden');card.style.setProperty('--rc',R.c);void card.offsetWidth;
 const o=save.owned[c.id];
 $('#gfront').style.setProperty('--rc',R.c);$('#gfront').parentElement.style.setProperty('--rc',R.c);
 const s=statsOf(c.id,o.lvl,o.st);
 $('#gfront').innerHTML=`<canvas width="300" height="300" data-id="${c.id}" data-col="${c.jc}"></canvas><div class="nm">${c.name}</div><div class="rr">★ ${R.k} · ${c.pos} · ${PWN[c.pw]||c.pw} · ${c.title||ARN[c.arch]}</div><div style="font-size:7px;color:#cde">OVR ${ovrOf(s)}</div>${r.isNew?'<div class="new">¡NUEVO!</div>':r.star?'<div class="new" style="color:#ffe45c">¡COPIA! +1★ (+'+Math.round(STB*100)+'% stats)</div>':`<div class="new" style="color:#ffb347">Copia máx → +${r.coins}🪙</div>`}`;
 mountPreviews($('#gfront'));card.classList.add('shake');gstate='back';$('#g-next').classList.add('hidden');
 $('#gtip').textContent=gres.length>1?`Carta ${gi+1}/${gres.length} · ¡Tócala!`:'¡Toca la carta!'}
$('#gcard').onclick=()=>{if(gstate!=='back')return;gstate='front';const c=gres[gi].c;$('#gcard').classList.remove('shake');$('#gcard').classList.add('flip');
 if(c.rar>=2){const f=$('#flash');f.style.background=RAR[c.rar].c;f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}sfx(c.rar==3?'legend':'card');
 setTimeout(()=>{const last=gi>=gres.length-1;const nb=$('#g-next');nb.classList.remove('hidden');nb.textContent=last?(gres.length>1?'RESUMEN ▶':'OTRA VEZ ▶'):'SIGUIENTE ▶';$('#gtip').textContent=''},700)};
$('#g-next').onclick=()=>{if(gstate==='sum'){gReset();return}
 if(gi<gres.length-1){gi++;gShow();return}
 if(gres.length>1){gMode('sum');$('#gcard').classList.add('hidden');gstate='sum';
  $('#gsum').innerHTML=gres.map(({c,r})=>`<div class="rc" style="--rc:${RAR[c.rar].c}"><img src="${figImg(c.id,c.jc)}"><b>${c.name}</b><small>${RAR[c.rar].k}</small><i>${r.isNew?'¡NUEVO!':r.star?'+1★':'+'+r.coins+'🪙'}</i></div>`).join('');
  $('#gsum').classList.remove('hidden');$('#g-next').textContent='OTRO SOBRE ▶';$('#g-next').classList.remove('hidden');$('#gtip').textContent='¡Contenido del sobre!'}
 else gReset()};
let gTab='p';
const HPACKS=[{n:'GORRO BÁSICO',cost:60,cnt:1,min:0,b:0,e:'🧢'},{n:'GORRO PLATA',cost:260,cnt:3,min:1,b:.2,e:'🎩'},{n:'GORRO ORO',cost:700,cnt:5,min:1,b:.45,e:'👑'}],HDUP=[15,50,160,500],HW=[58,28,11,3];
const hatCell=(id,w)=>{const hh=Math.round(w*.875);return`<div class="hcell" style="width:${w}px;height:${hh}px;background-image:var(--hats);background-size:${12*w}px ${9*hh}px;background-position:-${(id%12)*w}px -${((id/12)|0)*hh}px"></div>`};
function rollHat(minR,b){const W=HW.map((w,i)=>i<minR?0:w*(i===0?1-b:1+b*i*1.5)),T=W.reduce((a,c)=>a+c,0);let x=Math.random()*T,ri=0;for(let i=0;i<W.length;i++){if(x<W[i]){ri=i;break}x-=W[i]}
 const pool=HATS.map((h,i)=>h.r===ri?i:-1).filter(i=>i>=0);return pool[Math.random()*pool.length|0]}
function openHatPack(i){const pk=HPACKS[i];if(save.coins<pk.cost){sfx('buzz');return}save.coins-=pk.cost;const res=[];
 for(let k=0;k<pk.cnt;k++){const id=rollHat(k===pk.cnt-1?pk.min:0,pk.b),had=save.hats[id]||0;save.hats[id]=had+1;let coins=0;if(had>0){coins=HDUP[HATS[id].r];save.coins+=coins}res.push({id,nw:had===0,coins})}
 store();sfx(res.some(r=>HATS[r.id].r>=3)?'legend':'card');
 $('#hatres').innerHTML=`<div class="hrt">🎩 ¡TUS GORROS!</div><div class="hrg">${res.map(r=>`<div class="hc" style="--rc:${RAR[HATS[r.id].r].c}">${hatCell(r.id,72)}<b>${HATS[r.id].n}</b><small>${RAR[HATS[r.id].r].k}${HATS[r.id].fx?' ✨':''}</small><span>${r.nw?'¡NUEVO!':'+'+r.coins+'🪙'}</span></div>`).join('')}</div><button class="btn main" id="hr-ok">OK</button>`;
 $('#hatres').classList.remove('hidden');$('#hr-ok').onclick=()=>{$('#hatres').classList.add('hidden');renderPacks()}}
let hpT=null;
const hatRow=id=>{return'';const c=save.hatOf[id];return`<div class="dhat"><span>🎩 GORRO</span>${c!=null?hatCell(c,36)+`<b>${HATS[c].n}</b>`:'<b>Sin gorro</b>'}<button class="btn small" id="d-hat">ELEGIR</button></div>`};
function openHatPick(id){hpT=id;renderHatPick();$('#hatpick').classList.remove('hidden')}
function renderHatPick(){const cur=save.hatOf[hpT],own=Object.keys(save.hats).length;
 const ids=HATS.map((x,i)=>i).sort((a,b)=>HATS[b].r-HATS[a].r||a-b);
 $('#hatpick').innerHTML=`<div class="hpb"><div class="hph"><b>🎩 Gorro de ${CH[hpT].name}</b><small>${own}/${HATS.length} gorros</small></div>
 <div class="hpg">${ids.map(i=>{const n=save.hats[i]||0;return`<div class="hslot${n?'':' off'}${cur===i?' on':''}" style="--rc:${RAR[HATS[i].r].c}" data-i="${i}">${hatCell(i,52)}${n>1?`<i>x${n}</i>`:''}</div>`}).join('')}</div>
 <div class="hpf"><button class="btn small" id="hp-none">QUITAR GORRO</button><button class="btn main small" id="hp-ok">LISTO</button></div></div>`;
 $$('#hatpick .hslot').forEach(e=>e.onclick=()=>{const i=+e.dataset.i;if(!save.hats[i])return;save.hatOf[hpT]=save.hatOf[hpT]===i?null:i;store();sfx('card');renderHatPick()});
 $('#hp-none').onclick=()=>{save.hatOf[hpT]=null;store();renderHatPick()};
 $('#hp-ok').onclick=()=>{$('#hatpick').classList.add('hidden');if(typeof renderTeam==='function')renderTeam()}}
const PKC=[['#8ea3c4','rgba(142,163,196,.4)'],['#4aa3ff','rgba(74,163,255,.45)'],['#ffc533','rgba(255,197,51,.5)'],['#b266ff','rgba(178,102,255,.55)'],['#ffe45c','rgba(255,228,92,.6)']];
const packCard=(i,p,pc,desc,hat)=>`<button class="pk pkc${p.welcome?' pkw':''}" ${hat?`data-h="${i}"`:`data-i="${i}"`} style="--pc:${pc[0]};--pg:${pc[1]}"><div class="pka"><span>${p.e}</span><i></i></div><div class="pkt"><b>${p.n}</b><small>${desc}</small></div><div class="pkp">${p.cost?p.cost+' 🪙':'¡GRATIS!'}</div></button>`;
const gtabs=t=>'';
function bindPacks(){$$('#gpk .pk[data-i]').forEach(b=>b.onclick=()=>gOpen(+b.dataset.i));$$('#gpk .pk[data-h]').forEach(b=>b.onclick=()=>openHatPack(+b.dataset.h));$$('#gpk .gtabs button').forEach(b=>b.onclick=()=>{gTab=b.dataset.t;renderPacks()})}
function renderHatPacks(){$('#gpk').innerHTML=gtabs('h')+`<div class="pkrow">`+HPACKS.map((p,i)=>packCard(i,p,PKC[[0,1,2][i]],`${p.cnt} gorro${p.cnt>1?'s':''}${p.min?' · mín. '+RAR[p.min].k:''}`,true)).join('')+`</div><div class="hnote">Común 58% · Raro 28% · Épico 11% · Legendario 3% · los épicos y legendarios tienen efectos ✨ · repetidos dan monedas</div>`;bindPacks()}
function renderPacks(){gTab='p';
 const pc=x=>(+(LEGP*x*100).toFixed(3))+'%',ps=PACKS.filter(p=>!p.welcome);
 const SN={56:'Okonkwo',57:'Jaimes',58:'Kuro',59:'Long',60:'Brandon',61:'Sael',62:'Milan',63:'Darío',64:'Benito'};
 const leg=`<div id="gleg"><div class="glt">⭐ 9 LEYENDAS ULTRA RARAS · prob. por carta de cada una: ${ps.map(p=>p.e+pc(p.lm)).join(' ')}</div><div class="glr">${SPEC.map(id=>`<div class="gl" style="--c:${RCOL[CH[id].pw]}"><img src="${figImg(id,CH[id].jc)}"><b>${SN[id]}</b></div>`).join('')}</div></div>`;
 const wel=save.welcome?packCard(4,PACKS[4],PKC[4],`${PACKS[4].cnt} jugadores · todos ${RAR[2].k}`,false):'';
 $('#gpk').innerHTML=gtabs('p')+wel+`<div class="pkrow">`+ps.map((p,i)=>packCard(i,p,PKC[[0,1,2,3][i]],`${p.cnt} carta${p.cnt>1?'s':''}${p.min?' · mín. '+RAR[p.min].k:''}`,false)).join('')+`</div>`+leg;bindPacks()}
// ---- partida ----
let curDiff=1,curRival=null;
$$('[data-d]').forEach(b=>b.onclick=()=>{curDiff=+b.dataset.d;beginVs()});
function beginVs(){curRival=pickRival(curDiff);const me=save.owned[save.sel],mc=CH[save.sel].jc,rc=rivalColor(mc,CH[curRival.id].jc);
 $('#vL').outerHTML=cardHTML(save.sel,me,mc).replace('class="pcard"','class="pcard" id="vL"');
 $('#vR').outerHTML=cardHTML(curRival.id,{lvl:curRival.lvl,st:curRival.st,mul:SKL[curDiff].stat},rc).replace('class="pcard"','class="pcard" id="vR"');
 show('#vs');curRival.col=rc;setTimeout(()=>{if($('#vs').classList.contains('hidden'))return;show(null);startMatch(curDiff,curRival)},2600)}
$('#b-again').onclick=()=>{$('#end').classList.add('hidden');curMode===3?(show(null),startMatch3()):beginVs()};
$('#b-menu').onclick=()=>{G=null;$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');renderMenu()};
// ---- cuenta / ajustes ----
let authTab='in',busy=false;
const amsg=(t,ok)=>{const m=$('#a-msg');m.textContent=t;m.className=ok?'ok':''};
function setTab(t){authTab=t;$('#at-in').classList.toggle('on',t==='in');$('#at-up').classList.toggle('on',t==='up');
 $('#a-name').style.display=$('#a-pass2').style.display=$('#agift').style.display=t==='up'?'block':'none';$('#a-reset').style.display=t==='in'?'':'none';
 $('#a-go').textContent=t==='up'?'CREAR CUENTA':'ENTRAR';$('#a-google').lastChild.textContent=t==='up'?' Registrarse con Google':' Entrar con Google';$('#a-pass').autocomplete=t==='up'?'new-password':'current-password';amsg('')}
function showAuth(tab){setTab(tab||'in');$('#a-mode').textContent=FBX.mode==='firebase'?'☁ Cuenta en la nube (Firebase)':'💾 Modo demo: las cuentas se guardan solo en este dispositivo';$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');show('#auth')}
async function enterAccount(u,isNew,carry){let d=null;
 if(!isNew){try{d=await FBX.loadSave()}catch(e){}}
 if(!d||!d.owned){try{d=JSON.parse(localStorage.getItem('gh3_'+u.uid))}catch(e){}}
 if(isNew||!d||!d.owned){d=(carry&&carry.owned)?carry:newSave();d.welcome=1}
 d.name=u.name;adoptSave(d,'gh3_'+u.uid);localStorage.removeItem('gh_guest');store();
 try{if(window.ensureName)await ensureName(u,!!save.welcome,$('#a-name')&&authTab==='up'?$('#a-name').value.trim():'')}catch(e){console.warn(e)}
 try{await FBX.saveNow(save)}catch(e){}
 applyBtn();$('#b-snd span').textContent=save.snd?'🔊':'🔇';
 if(save.welcome){gReset();show('#gacha');$('#gtip').textContent='🎁 ¡Bienvenido! Abre tu SOBRE ÉPICO GRATIS de 10 jugadores'}else renderMenu()}
function startGuest(){let d=null;try{d=JSON.parse(localStorage.getItem('gh3'))}catch(e){}adoptSave(d&&d.owned?d:newSave(),'gh3');localStorage.setItem('gh_guest','1');FBX.user=null;applyBtn();$('#b-snd span').textContent=save.snd?'🔊':'🔇';renderMenu()}
$('#at-in').onclick=()=>setTab('in');$('#at-up').onclick=()=>setTab('up');
$('#a-go').onclick=async()=>{if(busy)return;const email=$('#a-mail').value.trim().toLowerCase(),pass=$('#a-pass').value,name=$('#a-name').value.trim();
 if(!/^\S+@\S+\.\S+$/.test(email))return amsg('Escribe un correo válido');if(pass.length<6)return amsg('La contraseña debe tener mínimo 6 caracteres');
 if(authTab==='up'){if(!name)return amsg('Elige un nombre de jugador');if(window.validName&&!validName(name))return amsg('El nombre debe tener 3-14 letras, números o _ (sin espacios)');if(pass!==$('#a-pass2').value)return amsg('Las contraseñas no coinciden')}
 busy=true;$('#a-go').disabled=true;amsg('Un momento...',1);
 try{if(authTab==='up'){const carry=!FBX.user&&localStorage.getItem('gh_guest')?JSON.parse(JSON.stringify(save)):null;const u=await FBX.signUp(name,email,pass);await enterAccount(u,true,carry)}
  else{const u=await FBX.signIn(email,pass);await enterAccount(u,false)}}
 catch(e){amsg(e.message||'Error')}finally{busy=false;$('#a-go').disabled=false}};
$('#a-guest').onclick=startGuest;
$('#a-google').onclick=async()=>{if(busy)return;busy=true;amsg('Abriendo Google...',1);
 try{const carry=!FBX.user&&localStorage.getItem('gh_guest')?JSON.parse(JSON.stringify(save)):null;const u=await FBX.google();if(u)await enterAccount(u,false,carry)}
 catch(e){amsg(e.message||'Error')}finally{busy=false}};
$('#a-reset').onclick=async()=>{const email=$('#a-mail').value.trim();if(!email)return amsg('Escribe tu correo arriba');try{await FBX.reset(email);amsg('Te enviamos un correo para restablecer la contraseña',1)}catch(e){amsg(e.message)}};
['#a-mail','#a-pass','#a-pass2','#a-name'].forEach(s=>$(s).addEventListener('keydown',e=>{if(e.key==='Enter')$('#a-go').click()}));
// cuenta
FBX.onStatus=s=>{const e=$('#ac-sync');if(e&&FBX.user)e.textContent=s};
function renderAcc(){const u=FBX.user;$('#ac-name').textContent=u?u.name:'Invitado';$('#ac-mail').textContent=u?u.email:'Sin cuenta: tu progreso solo está en este dispositivo';
 $('#ac-stats').innerHTML=`<span>🪙 ${save.coins}</span><span>💎 ${save.gems||0}</span><span>🎮 ${save.played}</span><span>🏆 ${save.wins}</span><span>👥 ${Object.keys(save.owned).length}/${CH.length}</span>`;
 $('#ac-sync').textContent=u?(FBX.status||'☁ Guardado automático activado'):'';$('#ac-user').style.display=u?'':'none';$('#ac-guest').style.display=u?'none':'';
 $('#ac-newname').value=u?u.name:'';$('#ac-ren').textContent=window.renameLabel?renameLabel():'✏ CAMBIAR NOMBRE';$('#ac-mode').textContent=FBX.mode==='firebase'?'Servidor: Firebase':'Servidor: modo demo (local)';$('#ac-del').textContent='🗑 BORRAR PROGRESO';$('#ac-del').dataset.s=''}
$('#b-acc').onclick=()=>{renderAcc();show('#account')};
$('#ac-now').onclick=async()=>{try{await FBX.saveNow(save);$('#ac-sync').textContent='☁ Sincronizado ✓'}catch(e){$('#ac-sync').textContent='⚠ No se pudo sincronizar'}};
$('#ac-ren').onclick=async()=>{const n=$('#ac-newname').value.trim().slice(0,14);if(!n||!FBX.user)return;try{await window.renameFlow(n);renderAcc()}catch(e){$('#ac-sync').textContent='⚠ '+e.message}};
$('#ac-out').onclick=async()=>{try{await FBX.flush()}catch(e){}await FBX.signOut();adoptSave(newSave(),'gh3_nouser');showAuth('in')};
$('#ac-create').onclick=()=>showAuth('up');
$('#ac-del').onclick=e=>{const b=e.currentTarget;if(b.dataset.s!=='1'){b.dataset.s='1';b.textContent='¿SEGURO? TOCA OTRA VEZ';return}const n=newSave();n.name=save.name;adoptSave(n);store();renderAcc();$('#ac-sync').textContent='Progreso reiniciado'};
$('#ac-back').onclick=()=>renderMenu();
// ajustes
const SETROWS=[['snd','🔊 Sonido general',0],['sfx','🔔 Efectos de sonido',1],['mus','🎵 Música',1],['shake','📳 Sacudida de pantalla',1],['taunt','💬 Mensajes de jugadores',1],['vib','📳 Vibración',1],['ask','🏟 Elegir estadio al jugar',1]];
const IS_MOBILE=(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const bsz=()=>save.cfg&&save.cfg.btn!=null?save.cfg.btn:(IS_MOBILE?0:1);
function applyBtn(){const r=document.documentElement;r.style.removeProperty('--k');const b=parseFloat(getComputedStyle(r).getPropertyValue('--k'))||1;r.style.setProperty('--k',b*[.85,1,1.2][bsz()]);
 const bop=save.cfg.bop==null?1:save.cfg.bop;r.style.setProperty('--bo',[.12,.22,.36,.6][bop]);const c=$('#controls');if(c)c.classList.toggle('mono',save.cfg.bcol!==1)}
function applyAudio(){if(save.snd&&cfgv('mus'))musicPlay(MUS.tr);else musicStop();$('#b-snd span').textContent=save.snd?'🔊':'🔇'}
addEventListener('resize',applyBtn);
function renderSet(){$('#setlist').innerHTML=SETROWS.map(([k,l,c])=>{const on=c?cfgv(k):!!save.snd;return`<button class="setrow${on?' on':''}" data-k="${k}" data-c="${c}"><span>${l}</span><b>${on?'SÍ':'NO'}</b></button>`}).join('')+`<button class="setrow on" id="set-stad"><span>🏟 Estadio</span><b>${(save.cfg.stad||0)>=STADS.length?'ALEATORIO':STADS[save.cfg.stad||0].n}</b></button>`+(document.fullscreenEnabled?`<button class="setrow on" id="set-fs"><span>⛶ Pantalla completa</span><b>ACTIVAR</b></button>`:'')+`<button class="setrow on" id="set-bst"><span>🎨 Estilo de botones</span><b>${save.cfg.bcol===1?'COLORES':'TRANSPARENTE'}</b></button><button class="setrow on" id="set-bop"><span>◐ Transparencia</span><b>${['MUY ALTA','ALTA','MEDIA','BAJA'][save.cfg.bop==null?1:save.cfg.bop]}</b></button><div class="setrow dev"><span>${IS_MOBILE?'📱':'🖥'} Dispositivo detectado</span><b>${IS_MOBILE?'MÓVIL':'ORDENADOR'}</b></div>`+`<button class="setrow on" id="set-btn"><span>🎮 Tamaño de botones</span><b>${['PEQUEÑO','NORMAL','GRANDE'][bsz()]}</b></button>`;
 $$('#setlist .setrow[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(b.dataset.c==='0')save.snd=save.snd?0:1;else save.cfg[k]=cfgv(k)?0:1;store();applyAudio();renderSet()});
 const sfs=$('#set-fs');if(sfs)sfs.onclick=()=>toggleFS();
 $('#set-bst').onclick=()=>{save.cfg.bcol=save.cfg.bcol===1?0:1;store();applyBtn();renderSet()};
 $('#set-bop').onclick=()=>{save.cfg.bop=((save.cfg.bop==null?1:save.cfg.bop)+1)%4;store();applyBtn();renderSet()};
 $('#set-stad').onclick=()=>{save.cfg.stad=((save.cfg.stad||0)+1)%(STADS.length+1);store();renderSet()};
  $('#set-btn').onclick=()=>{save.cfg.btn=(bsz()+1)%3;store();applyBtn();renderSet()}}
$('#b-set').onclick=()=>{renderSet();show('#settings')};
$('#set-acc').onclick=()=>{renderAcc();show('#account')};
$('#set-back').onclick=()=>renderMenu();
addEventListener('pagehide',()=>{try{FBX.flush()}catch(e){}});
// ---- pausa ----

// ---- banquillo (3 vs 3) ----
let bSel=null;
const enCol=e=>e>=60?'#34d399':e>=30?'#fbbf24':'#ef4444';
const benchPort=(id,col)=>`<div class="bnp">${portrait(id,1,col)}</div>`;
const shortN=n=>n.length>11?n.slice(0,10)+'…':n;
function renderBench(){const el=$('#bench'),box=$('#pbox');
 if(!G||G.n!==3||G.car){el.classList.add('hidden');box.classList.remove('wide');return}
 box.classList.add('wide');el.classList.remove('hidden');
 const court=G.P.slice(0,3),sug=suggestSubs(),ids=benchIds().sort((a,b)=>CH[b].rar-CH[a].rar||ovrOf(statsOf(b,1,save.owned[b].st))-ovrOf(statsOf(a,1,save.owned[a].st)));
 const tired=court.filter(p=>p.en<30).length;
 const cc=court.map((p,k)=>{const R=RAR[CH[p.id].rar],ov=ovrOf(p.s);return`<div class="bcc${bSel&&bSel.k===k?' on':''}${p.en<30?' tired':''}" data-k="${k}" style="--rc:${R.c}">${benchPort(p.id,G.mc)}<div class="bci"><b>${shortN(p.name)}</b><small>${CH[p.id].pos} · OVR ${ov}</small><div class="ebar"><i style="width:${Math.round(p.en)}%;background:${enCol(p.en)}"></i></div><small class="ens">${p.en<30?'😮‍💨 CANSADO':'⚡ '+Math.round(p.en)+'%'}</small></div></div>`}).join('');
 const bc=ids.map(id=>{const R=RAR[CH[id].rar],e=benchEn(id),ov=ovrOf(statsOf(id,1,save.owned[id].st));return`<div class="bbc${bSel&&bSel.id===id?' on':''}" data-id="${id}" style="--rc:${R.c}">${benchPort(id,G.mc)}<b>${shortN(CH[id].name)}</b><small>${CH[id].pos} · ${ov}</small><div class="ebar"><i style="width:${Math.round(e)}%;background:${enCol(e)}"></i></div></div>`}).join('');
 const sg=sug.length?`<div class="bsug"><div class="bsh">💡 CAMBIOS SUGERIDOS${tired?' · ¡hay jugadores cansados!':''}</div>${sug.map(x=>`<button class="btn small bsb" data-k="${x.k}" data-id="${x.id}">${shortN(G.P[x.k].name)} <span>😮‍💨${Math.round(G.P[x.k].en)}%</span> ⇄ ${shortN(CH[x.id].name)} <span>⚡${Math.round(benchEn(x.id))}%</span></button>`).join('')}</div>`:`<div class="bsug ok"><div class="bsh">✅ Tu quinteto está fresco</div></div>`;
 el.innerHTML=`<div class="bcol"><div class="bt">🏀 EN CANCHA</div>${cc}</div><div class="bcol bwide"><div class="bt">🪑 BANQUILLO <small>${ids.length} jugador${ids.length==1?'':'es'}</small></div>${sg}<div class="bgrid">${bc||'<small class="bemp">No tienes más jugadores. ¡Abre sobres para ampliar tu banca!</small>'}</div><div class="bhint">${bSel?'Elige con quién cambiarlo':'Toca un jugador de la cancha y luego uno del banquillo'}</div></div>`;
 $$('#bench .bcc').forEach(e=>e.onclick=()=>{const k=+e.dataset.k;if(bSel&&bSel.id!=null){if(doSub(k,bSel.id)){bSel=null}renderBench();return}bSel=bSel&&bSel.k===k?null:{k};renderBench()});
 $$('#bench .bbc').forEach(e=>e.onclick=()=>{const id=+e.dataset.id;if(bSel&&bSel.k!=null){if(doSub(bSel.k,id))bSel=null;renderBench();return}bSel=bSel&&bSel.id===id?null:{id};renderBench()});
 $$('#bench .bsb').forEach(e=>e.onclick=()=>{doSub(+e.dataset.k,+e.dataset.id);bSel=null;renderBench()});
 mountPreviews(el)}
function toggleFS(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen()}catch(e){}}
const PKEYS=['skT','pwT','bst','twr','gho','reb','lck','sh','nst'];
function pauseOn(){if(!G||G.mode==='end'||G.paused)return;G.paused=true;G.pAt=performance.now();bSel=null;renderBench();$('#pause').classList.remove('hidden');$('#p-snd').textContent=save.snd?'🔊 SONIDO: SÍ':'🔇 SONIDO: NO';$('#p-fs').style.display=document.fullscreenEnabled?'':'none'}
function pauseOff(){if(G&&G.paused){bSel=null;const d=performance.now()-G.pAt;for(const p of G.P)for(const k of PKEYS)if(p[k]>0)p[k]+=d;G.paused=false}$('#pause').classList.add('hidden');const q=$('#p-quit');q.dataset.s='';q.textContent='↩ SALIR AL MENÚ'}
$('#pbtn').onclick=pauseOn;$('#p-res').onclick=pauseOff;$('#p-fs').onclick=toggleFS;
$('#p-snd').onclick=()=>{save.snd=save.snd?0:1;store();applyAudio();$('#p-snd').textContent=save.snd?'🔊 SONIDO: SÍ':'🔇 SONIDO: NO'};
$('#p-quit').onclick=e=>{const b=e.currentTarget;if(b.dataset.s!=='1'){b.dataset.s='1';b.textContent='¿SEGURO? TOCA OTRA VEZ';return}pauseOff();G=null;$('#hud').classList.add('hidden');$('#controls').classList.add('hidden');if(window.careerQuit&&window.careerQuit())return;renderMenu()};
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseOn()});
addEventListener('keydown',e=>{if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.code==='Escape'||e.code==='KeyP'){G&&G.paused?pauseOff():pauseOn()}});
setInterval(()=>{const on=!!G&&G.mode!=='end'&&!$('#hud').classList.contains('hidden');$('#pbtn').classList.toggle('hidden',!on)},300);
// ---- selector de estadio ----
let STAD_SKIP=false;window.STAD_PICK=null;
function pickStad(cb){if(window.NOPICK||STAD_SKIP||!cfgv('ask')){STAD_SKIP=false;cb();return}
 $('#spg').innerHTML=STADS.map((s,i)=>`<button class="spc" data-i="${i}"><canvas width="168" height="94"></canvas><b>${s.n}</b></button>`).join('')+`<button class="spc" data-i="${STADS.length}"><div class="spr">🎲</div><b>ALEATORIO</b></button>`;
 $$('#spg .spc canvas').forEach((cv,i)=>{const im=IM[STADS[i].img];if(im&&im.naturalWidth)cv.getContext('2d').drawImage(im,0,0,im.naturalWidth,im.naturalHeight,0,0,168,94)});
 $$('#spg .spc').forEach(b=>b.onclick=()=>{window.STAD_PICK=+b.dataset.i;$('#stadpick').classList.add('hidden');cb()});
 $('#sp-cancel').onclick=()=>$('#stadpick').classList.add('hidden');$('#stadpick').classList.remove('hidden')}
const _bv=beginVs,_sm3=startMatch3;
beginVs=function(){pickStad(()=>_bv())};
startMatch3=function(){pickStad(()=>_sm3())};
$('#b-again').onclick=()=>{$('#end').classList.add('hidden');STAD_SKIP=true;curMode===3?(show(null),startMatch3()):beginVs()};
// ---- novedades ----
const NEWS=[
 {v:'v19',t:'Menú sin scroll, aliens más fáciles y carrera ampliada',d:'9 nov 2026',n:['📱 Menú principal rediseñado: todo cabe en pantalla, sin arrastrar. El EVENTO ALIEN está siempre a la vista','👽 Evento Alien con 2 dificultades: FÁCIL (reclutas flojos) y NORMAL. ¡Ya se puede ganar el ticket de Wamba!','💼 Carrera: nueva pestaña NEGOCIOS con agente (subidas de sueldo), patrocinadores y misiones con premios','🗣 Carrera: vestuario, redes sociales, retos de otros jugadores, valor de mercado, edad y retiro','💎 Gemas: gana gemas con logros, títulos, misiones y redes; cambia tu nombre por 150💎'],f:['🛠 Evento Alien arreglado: ya no se quedaba sin crear el partido','🛠 Botones de cerrar siempre visibles en clanes y perfiles']},
 {v:'v18',t:'Invasión alienígena y 10 nuevos jugadores',d:'9 nov 2026',n:['👽 EVENTO ALIEN: derrota a Zorg, Blip y Xark (3 aliens) para ganar un 🎟 TICKET y canjearlo por Víctor Wamba, el pívot alienígena','🧑‍🦲 Calvo Karusso (ÉPICO, 75 de media) ¡de regalo para todos! Además te guía en el tutorial','⭐ Nuevos legendarios en sobres ultra raros: Luko Dómnik (stepback y magia), Tyrone Halbert (visión de juego), Lamar Bell (showtime y logo 3), Antón Edmonds (explosión atómica), Kyro Irwin (combos de regate) y Yanis Anteto (eurostep dunk, no tira triples)','🛸 Víctor Wamba: se transforma en alien, mata desde muy lejos y hasta de espaldas','🎓 Tutorial inicial paso a paso: mover, tirar, regatear, saltar, mates y poderes','🎨 Menú nuevo con animaciones y botones mejor organizados','🎵 Música de menú, 💎 gemas, 🛡 clanes, perfiles y búsqueda, carrera con redes, vestuario y retos'],f:['🛠 Los clanes y los perfiles ya se pueden cerrar con el botón fijo arriba','🛠 En carrera tus compañeros son IA y deciden si te pasan según la confianza']},
 {v:'v17',t:'Banquillo, energía y nuevo balance',d:'8 nov 2026',n:['🔄 3 vs 3: pulsa ⏸ para ver tu formación y cambiar jugadores con tu banquillo','⚡ Energía: correr, el turbo y tirar cansan; un jugador cansado va más lento y falla más. Los del banquillo recuperan','💡 Cambios sugeridos cuando alguien se cansa','📉 Estadísticas rebajadas: Legendarios 80-95 de overall, Épicos ~65, Raros ~55, Comunes ~45. Nadie llega a 100','🎯 Los triples son mucho más difíciles, sobre todo para los Épicos','👑 Los 9 legendarios son aún más raros en los sobres','🔒 Se quita el modo de desbloquear todos los jugadores'],f:[]},
 {v:'v16',t:'Solo 9 legendarios',d:'8 nov 2026',n:['⭐ Los únicos legendarios son los 9 de los sobres ultra raros','🔁 Los demás personajes que eran legendarios (Electro Blue, Ghost Frost, Mega Afro, Rosa Neón, Lima Rayo y Capitán Parche) pasan a Épico'],f:[]},
 {v:'v15',t:'Marcador centrado y sin gorros',d:'8 nov 2026',n:['📍 El marcador vuelve al centro de la pantalla','🧢 Se quitan los gorros del juego','👥 Vuelven al juego los jugadores que llevaban gorro dibujado'],f:['🛠 El marcador se desplazaba hacia la derecha en móvil']},
 {v:'v14',t:'Gran actualización: móvil, perfil y estadios',d:'7 nov 2026',n:['⏸ Pausa en los partidos con opción de salir al menú','🏀 Bandeja: cerca del aro el botón TIRAR se convierte en BANDEJA','📊 Estadísticas al terminar el partido y nuevo PERFIL con tu jugador más usado y tus puntos totales','🏟 Elige estadio antes de cada partido (1 vs 1 y 3 vs 3)','📦 Sobres rediseñados y resumen del sobre más claro','👕 Camisetas con rayas, bandas, mitades y más diseños','🤖 IA mejorada en 3 vs 3: usa todo el campo, ayuda en defensa, corre al contraataque y pasa mejor','📱 Móvil: vibración, pantalla completa, aviso para girar el móvil y HUD más cómodo','✏ Nombres de los legendarios cambiados','📰 Esta ventana de NOVEDADES'],f:['🛠 El resumen del sobre ya no se superpone con el título']},
 {v:'v13',t:'Stats y estadios',d:'6 nov 2026',n:['8 stats nuevos con otros nombres y estrellas por copias repetidas (hasta ★5)','Sael: TORMENTA con rayos','3 estadios y flashes de la gente al anotar'],f:[]},
 {v:'v12',t:'9 leyendas y login con Google',d:'5 nov 2026',n:['Seis legendarios nuevos con poderes propios','Acceso con Google (con Firebase)'],f:[]},
 {v:'v11',t:'Cuentas y ajustes',d:'5 nov 2026',n:['Registro, login y guardado en la nube','Ajustes y perfil de cuenta','Sobre de bienvenida'],f:[]}];
function showNews(){$('#news-body').innerHTML=NEWS.map((n,k)=>`<div class="nv${k?' old':''}"><div class="nvh"><b>${n.v}</b><span>${n.t}</span><small>${n.d}</small></div>${n.n.length?`<div class="nvs">✨ NOVEDADES</div><ul>${n.n.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${n.f.length?`<div class="nvs">🛠 ARREGLOS</div><ul>${n.f.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}</div>`).join('');$('#news').classList.remove('hidden')}
$('#b-news').onclick=showNews;
$('#news-ok').onclick=()=>{save.newsSeen=NEWS[0].v;store();$('#news').classList.add('hidden');$('#newsdot').style.display='none'};
const _rm=renderMenu;renderMenu=function(){_rm();const un=save.newsSeen!==NEWS[0].v;$('#newsdot').style.display=un?'inline-block':'none';if(un&&!window._ns){window._ns=1;showNews()}};
// ---- perfil ----
function renderProfile(){const c=save.career,own=Object.keys(save.owned).length,used=Object.entries(save.used||{}).sort((a,b)=>b[1]-a[1])[0],top=Object.entries(save.cpts||{}).sort((a,b)=>b[1]-a[1])[0];
 const pc=(id,txt)=>id==null?'<small>Todavía no hay datos</small>':`<div class="pfp"><img src="${figImg(+id,CH[+id].jc)}"><b>${CH[+id].name}</b><small>${txt}</small></div>`;
 const items=[['🎮','Partidos',c.games],['🏆','Victorias',c.wins],['📈','% victoria',c.games?Math.round(c.wins/c.games*100)+'%':'—'],['🏀','Puntos',c.pts],['📥','Rebotes',c.reb],['🤝','Asistencias',c.ast],['✋','Robos',c.stl],['🚫','Tapones',c.blk],['💥','Mates',c.dnk],['🎯','Triples',c.tpm],['🪙','Monedas',save.coins],['👥','Jugadores',own+'/'+CH.filter(x=>!x.hide).length]];
 $('#pf-body').innerHTML=`<div class="pfh"><div class="acav">🏀</div><div><b>${FBX.user?FBX.user.name:'Invitado'}</b><small>${FBX.user?FBX.user.email:'Sin cuenta'}</small></div></div><div class="pfg">${items.map(([i,l,v])=>`<div class="pfs"><span>${i}</span><b>${v}</b><small>${l}</small></div>`).join('')}</div>
 <div class="pfr"><div><small>⭐ JUGADOR MÁS USADO</small>${pc(used&&used[0],used?used[1]+' partidos':'')}</div><div><small>🏀 MÁXIMO ANOTADOR</small>${pc(top&&top[0],top?top[1]+' puntos':'')}</div></div>`}
$('#b-prof').onclick=()=>{renderProfile();show('#profile')};$('#pf-back').onclick=()=>renderMenu();
// ---- arranque ----
requestAnimationFrame(loop);
Promise.all([loadImgs(),window.bootWait?bootWait(5000):0]).then(async()=>{$('#b-snd span').textContent=save.snd?'🔊':'🔇';applyBtn();let u=null,fe=null;try{u=await FBX.init()}catch(e){fe=e;console.warn(e)}
 if(u)await enterAccount(u,false);else if(localStorage.getItem('gh_guest'))startGuest();else{showAuth();if(fe)amsg('No se pudo conectar con Firebase. Revisa tu configuración o juega como invitado.')}});
