// ===== DUELO ONLINE 1 vs 1 (el anfitrión simula; el invitado manda sus controles y ve el partido en espejo) =====
(function(){
const D=window.DUEL={active:0};
let tr=null,st=null,pend=[],aid=0,evs=[],eid=0,lastE=0;
const KT=['rage','bst','twr','gho','reb','lck','sh','lad','pwT','skT','nst','mmb','k1T','k2T'];
const PF=['f','dir','st','tt','an','mv','ph','ratio','gait','cyc','sprint','lay','dkind','fade','sbk','cx','cy','cl','dk0','x0','y0','tx','ty','fl','mega','kia','frz','stam','tired','gd','cd','slow','lt','vk','ck','sb2','fadeS','vx','vy','hkp','hook','kh','gp','alien','hdo','mamba','euro','logo','bolt','pw','xv','kd','kdT','es','shk','fire','bolt'];
const OKACT={A:1,B:1,C:1,P:1,X:1,K1:1,K2:1};
const cl=(v,a,b)=>Math.max(a,Math.min(b,+v||0));
const myName=()=>String((window.FBX&&FBX.user&&FBX.user.name)||'Jugador').slice(0,14);
const okCh=c=>Number.isInteger(c)&&typeof CH!=='undefined'&&!!CH[c];
function close(){if(tr){try{tr.close()}catch(e){}tr=null}clearInterval(D.t1);clearInterval(D.t2);clearInterval(D.t3);st=null;D.active=0;pend=[];evs=[];eid=0;if(D.pickSet){window.STAD_PICK=D.oldPick;D.pickSet=0}}
D.close=close;
const ev=a=>{evs.push({i:++eid,e:a});if(evs.length>44)evs.shift()};
// ---------- conexión ----------
D.invite=async(cid,info)=>{close();st={role:'host',cid,info,started:0,lastA:0};tr=await ONL.duel(cid,hostMsg);D.active=1};
D.accept=async(cid,info)=>{close();st={role:'guest',cid,info,started:0};D.active=1;tr=await ONL.duel(cid,guestMsg);
 const hi=()=>{if(!st||st.started||!tr)return clearInterval(D.t1);tr.send({k:'hi',c:info.c,l:info.l,s:info.s,o:info.o,n:info.n})};hi();D.t1=setInterval(hi,500);
 setTimeout(()=>{if(st&&!st.started){close();if(D.onFail)D.onFail()}},10000)};
// ---------- anfitrión ----------
function hostMsg(m){if(!m||!st||st.role!=='host')return;
 if(m.k==='hi'&&!st.started){if(!okCh(m.c))return;st.started=1;startHost(m)}
 else if(m.k==='in'&&(typeof G!=='undefined'&&G)&&G.net&&G.net.role==='host'){const n=G.net;n.rin={x:cl(m.x,-1,1),y:cl(m.y,-1,1),t:m.t?1:0,g:m.g?1:0};n.last=Date.now();n.gone=0;st.ready=1;
  if(Array.isArray(m.a))for(const a of m.a){if(a&&a.i>st.lastA&&OKACT[a.k]){st.lastA=a.i;remoteAct(a.k)}}}}
function startHost(m){const me=save.owned[save.sel]||{lvl:1,st:3},info=st.info,gl=Math.min(60,Math.max(1,m.l|0||1)),gs=Math.min(10,Math.max(0,m.s|0));
 D.oldPick=window.STAD_PICK;D.pickSet=1;window.STAD_PICK=0;if(D.leave)D.leave();show(null);$('#b-again').style.display='none';
 startMatch(1,{id:m.c,lvl:gl,st:gs});
 try{if(window.WARD&&WARD.dress){WARD.dress(G.P[0],info.o,G.mc);WARD.dress(G.P[1],m.o,G.rc)}}catch(e){}
 G.net={role:'host',rin:{x:0,y:0,t:0,g:0},as:0,last:Date.now(),peerName:String(m.n||'Rival').slice(0,14)};
 try{const pf=G.fx.push;G.fx.push=function(o){if(o&&o.k!=='p'&&o.k!=='sh'&&G&&G.net&&G.net.role==='host'){try{ev(['f',JSON.parse(JSON.stringify(o))])}catch(e){}}return pf.apply(this,arguments)}}catch(e){}
 $('#nR').textContent=G.net.peerName;
 const ini={k:'init',ids:[G.P[0].id,G.P[1].id],lv:[me.lvl,gl],s:[me.st,gs],col:[G.mc,G.rc],o:[info.o,m.o],n:[info.n,G.net.peerName]};
 const snd=()=>{if(!st||st.ready||!tr||!G||!G.net)return clearInterval(D.t1);tr.send(ini)};snd();D.t1=setInterval(snd,400)}
function remoteAct(k){if(!(typeof G!=='undefined'&&G)||G.mode!=='play'||!G.net)return;const h=G.hu,n=G.net;G.hu=G.P[1];n.as=1;try{_act(k)}finally{G.hu=h;n.as=0}}
function hostSend(){if(!tr||!G||!G.net||G.paused)return;const B=G.B,now=performance.now();
 if(!G.net.gone&&st.ready&&Date.now()-G.net.last>8000){G.net.gone=1;G.net.rin={x:0,y:0,t:0,g:0};try{pop(G.P[1].x,G.P[1].y-260,'RIVAL DESCONECTADO','#ff6a6a',30)}catch(e){}}
 const snap={k:'s',m:G.mode,mt:G.mt,s:G.s,t:+G.t.toFixed(2),sc:G.sc==null?16:+(+G.sc).toFixed(1),sd:G.sd?1:0,ack:st.lastA,ev:evs.slice(-22),
  B:{x:Math.round(B.x),y:Math.round(B.y),z:Math.round(B.z),h:G.P.indexOf(B.h),fl:B.fl?{fire:B.fl.fire?1:0,ice:B.fl.ice?1:0,bolt:B.fl.bolt?1:0,hook:B.fl.hook?1:0}:0},
  P:G.P.map(p=>{const o={x:Math.round(p.x),y:Math.round(p.y),z:Math.round(p.z)};for(const k of PF){const v=p[k];if(typeof v==='number')o[k]=+v.toFixed(2);else if(typeof v==='boolean')o[k]=v?1:0;else if(v!=null&&typeof v!=='object')o[k]=v}
   for(const k of KT)o['T'+k]=Math.max(0,Math.round((p[k]||0)-now));return o})};
 tr.send(snap)}
// ---------- invitado ----------
function guestMsg(m){if(!m||!st||st.role!=='guest')return;
 if(m.k==='init'&&!st.started){if(!okCh(m.ids&&m.ids[0])||!okCh(m.ids[1]))return;st.started=1;startGuest(m)}
 else if(m.k==='s'&&(typeof G!=='undefined'&&G)&&G.net&&G.net.role==='guest')applySnap(m);
 else if(m.k==='end'&&(typeof G!=='undefined'&&G)&&G.net)endMsg(m)}
function startGuest(m){lastE=0;D.oldPick=window.STAD_PICK;D.pickSet=1;window.STAD_PICK=0;if(D.leave)D.leave();show(null);$('#b-again').style.display='none';
 const lv=m.lv.map(v=>Math.min(60,Math.max(1,v|0||1))),ss=m.s.map(v=>Math.min(10,Math.max(0,v|0)));
 startMatch(1,{id:m.ids[0],lvl:lv[0],st:ss[0],col:m.col[1]});
 window.__duelMk=1;const a=mkP(0,m.ids[0],lv[0],ss[0],1,m.col[0]),b=mkP(1,m.ids[1],lv[1],ss[1],1,m.col[1]);window.__duelMk=0;delete a.E;delete b.E;
 try{if(window.WARD&&WARD.dress){WARD.dress(a,m.o[0],m.col[0]);WARD.dress(b,m.o[1],m.col[1])}}catch(e){}
 G.P=[a,b];G.hu=b;G.mc=m.col[0];G.rc=m.col[1];
 hudPortrait($('#hpL'),a.id,G.mc);hudPortrait($('#hpR'),b.id,G.rc);$('#nL').textContent=String(m.n[0]||a.name).slice(0,14);$('#nR').textContent=String(m.n[1]||b.name).slice(0,14);
 $('.hp.l').style.setProperty('--cl',G.mc);$('.hp.r').style.setProperty('--cr',G.rc);
 G.net={role:'guest',tg:null,last:Date.now(),got:0};introSetup();
 const sendIn=()=>{if(!tr||!G||!G.net||G.net.role!=='guest')return clearInterval(D.t2);const x=humanIn();tr.send({k:'in',x:+x[0].toFixed(2),y:+x[1].toFixed(2),t:(TURBO||K.ShiftLeft||K.ShiftRight)?1:0,g:G.hu.gd?1:0,a:pend})};
 D.sendIn=sendIn;D.t2=setInterval(sendIn,34);sendIn();
 D.t3=setInterval(()=>{if(G&&G.net&&G.net.role==='guest'&&G.net.got&&Date.now()-G.net.last>9000&&!G.dend){try{msg('CONEXIÓN PERDIDA',90)}catch(e){}duelEnd()}},1500)}
function applySnap(m){const n=G.net;n.last=Date.now();n.got=1;n.tg=m;
 if(m.ack!=null)pend=pend.filter(a=>a.i>m.ack);
 if(Array.isArray(m.ev))for(const e of m.ev){if(e.i>lastE){lastE=e.i;const a=e.e;try{if(a[0]==='m')_msg(a[1],a[2]);else if(a[0]==='p')_pop(a[1],a[2],a[3],a[4],a[5]);else if(a[0]==='s')_sfx(a[1]);else if(a[0]==='f'&&a[1]&&G.fx.length<400){a[1].t=0;G.fx.push(a[1])}else if(a[0]==='b')_bu(a[1],a[2],a[3],a[4],a[5])}catch(x){}}}
 const now=performance.now();
 m.P.forEach((o,i)=>{const p=G.P[i];if(!p)return;for(const k of PF)if(o[k]!==undefined)p[k]=o[k];for(const k of KT)p[k]=now+(o['T'+k]||0);p.tired=!!p.tired;p.sprint=!!p.sprint;p.mv=!!p.mv;p.gd=!!p.gd;
  if(Math.abs(o.x-p.x)>260||Math.abs(o.y-p.y)>200){p.x=o.x;p.y=o.y}});
 const B=G.B;B.h=m.B.h>=0?G.P[m.B.h]:null;B.fl=m.B.fl||null;if(Math.abs(m.B.x-B.x)>300){B.x=m.B.x;B.y=m.B.y;B.z=m.B.z}
 G.s=m.s;G.t=m.t;G.sc=m.sc;G.sd=!!m.sd;G.mode=m.m;G.mt=m.mt}
function gtick(){if(!G||G.paused||!G.net)return;G.fr++;const n=G.net,m=n.tg,B=G.B;
 let pred=false;const me=G.P[1];
 if(m&&G.mode==='play'&&me.st==='idle'&&!(me.frz>0)&&typeof move==='function'){try{const[ix,iy]=humanIn();if(Math.hypot(ix,iy)>.25){let k=1;if((TURBO||K.ShiftLeft||K.ShiftRight)&&me.stam>0&&!me.tired)k=1.2;if(me.slow>0)k*=.5;move(me,ix,iy,k);clampP(me);pred=true}}catch(e){}}
 if(m){m.P.forEach((o,i)=>{const p=G.P[i];if(i===1&&pred){if(Math.abs(o.x-p.x)>70)p.x+=(o.x-p.x)*.2;if(Math.abs(o.y-p.y)>50)p.y+=(o.y-p.y)*.2}else{p.x+=(o.x-p.x)*.5;p.y+=(o.y-p.y)*.5}p.z+=(o.z-p.z)*.6});B.x+=(m.B.x-B.x)*.5;B.y+=(m.B.y-B.y)*.5;B.z+=(m.B.z-B.z)*.5}
 for(const p of G.P){p.an++;if(p.st!=='idle')p.tt++}
 for(let i=G.fx.length-1;i>=0;i--){const e=G.fx[i];e.t++;if(e.k==='p'||e.k==='sh'){e.x+=e.vx;e.y+=e.vy;e.vy+=(e.g==null?.5:e.g);if(e.k==='sh')e.r+=e.vr}if(e.t>e.T)G.fx.splice(i,1)}
 if(G.shake>0)G.shake--;
 if(m&&m.m==='end'&&!G.dend)return duelEnd();
 if(G.fr%6===0)ghud()}
function ghud(){const p=G.hu,B=G.B,a=B.h===p,ba=$('#btn-a'),bb=$('#btn-b'),bc=$('#btn-c');
 ba.textContent=a?(p.st==='shoot'?'¡SUELTA!':(hoopClose(p)?'BANDEJA':'TIRAR')):'ROBAR';bb.textContent=a?'MATE':'TAPÓN';bc.textContent='REGATE';bc.style.display=a?'':'none';
 $('#btn-q').style.display='none';$('#btn-s').style.display='none';
 const bx=$('#btn-x'),bp=$('#btn-p'),w=CH[p.id].pw,lb=SKLBL[w],nw=performance.now(),rs=(p.skT||0)-nw,rp=(p.pwT||0)-nw;
 if(bx){bx.style.display=lb?'':'none';const h2=rs>0?'⏱<br>'+Math.ceil(rs/1000)+'s':(lb||'');if(bx.dataset.h!==h2){bx.dataset.h=h2;bx.innerHTML=h2}bx.dataset.w=w;bx.style.opacity=rs>0?.45:1}
 if(bp){const h3=rp>0?'⏱ '+Math.ceil(rp/1000)+'s':(PWN[w]||w);if(bp.dataset.h!==h3){bp.dataset.h=h3;bp.textContent=h3}bp.style.opacity=rp>0?.5:1}
 bb.classList.toggle('dim',a&&!driveable(p));$('#stam i').style.width=p.stam+'%';$('#stam').classList.toggle('low',!!p.tired);
 $('#sL').textContent=G.s[0];$('#sR').textContent=G.s[1];$('#sclk').textContent=Math.ceil(G.sc==null?16:G.sc);$('#sclk').classList.toggle('w',G.sc<=5);const t=Math.ceil(G.t);$('#clock').textContent=G.sd?'¡YA!':Math.floor(t/60)+':'+String(t%60).padStart(2,'0')}
function endMsg(m){if(m.s)G.s=m.s;if(m.gs)G.P.forEach((p,i)=>{if(m.gs[i])p.gs=m.gs[i]});duelEnd()}
function duelEnd(){if(!G||!G.net||G.dend)return;G.dend=1;const g=G,mine=g.net.role==='host'?0:1,w=g.s[mine]>g.s[1-mine];g.mode='end';try{musicPlay('menu')}catch(e){}
 if(g.net.role==='host'&&tr){const f={k:'end',s:g.s,gs:g.P.map(p=>p.gs)};for(let i=0;i<5;i++)setTimeout(()=>{if(tr)tr.send(f)},i*250)}
 setTimeout(()=>{$('#eT').textContent=w?'🏆 ¡VICTORIA!':'DERROTA';$('#eS').textContent=g.s[0]+' - '+g.s[1];try{$('#eStats').innerHTML=statTable(g)}catch(e){}$('#eC').innerHTML='⚔ Duelo amistoso online<br>sin monedas';$('#controls').classList.add('hidden');$('#hud').classList.add('hidden');show('#end')},900);
 setTimeout(()=>{if(tr)close()},2500)}
// ---------- enganches en el juego ----------
const _bu=window.burst;window.burst=function(x,y,c,n,sp){if((typeof G!=='undefined'&&G)&&G.net&&G.net.role==='host'&&(n==null?14:n)>=6)ev(['b',Math.round(x),Math.round(y),c,n,sp]);return _bu.apply(this,arguments)};
const _act=window.act,_msg=window.msg,_pop=window.pop,_sfx=window.sfx,_tick=window.tick,_hi=window.humanIn,_ai=window.ai,_em=window.endMatch;
window.humanIn=function(){if((typeof G!=='undefined'&&G)&&G.net&&G.net.as)return[G.net.rin.x,G.net.rin.y];return _hi.apply(this,arguments)};
window.ai=function(p,o){const n=(typeof G!=='undefined'&&G)&&G.net;if(n&&n.role==='host'&&p===G.P[1]&&!n.gone){p.aiTurbo=!!n.rin.t;p.gd=!!n.rin.g;return[n.rin.x,n.rin.y]}return _ai.apply(this,arguments)};
window.act=function(k){const n=(typeof G!=='undefined'&&G)&&G.net;if(n&&n.role==='guest'){if(G.mode!=='play'||!OKACT[k])return;pend.push({i:++aid,k});if(pend.length>8)pend.shift();if(D.sendIn)D.sendIn();return}return _act.apply(this,arguments)};
window.tick=function(){const n=(typeof G!=='undefined'&&G)&&G.net;if(n&&n.role==='guest')return gtick();_tick.apply(this,arguments);if(n&&n.role==='host'&&G&&G.fr%2===0&&st)hostSend()};
window.msg=function(t,f){if((typeof G!=='undefined'&&G)&&G.net&&G.net.role==='host')ev(['m',t,f]);return _msg.apply(this,arguments)};
window.pop=function(x,y,t,c,s){if((typeof G!=='undefined'&&G)&&G.net&&G.net.role==='host')ev(['p',Math.round(x),Math.round(y),t,c,s]);return _pop.apply(this,arguments)};
window.sfx=function(t){if((typeof G!=='undefined'&&G)&&G.net&&G.net.role==='host'&&t!=='bounce')ev(['s',t]);return _sfx.apply(this,arguments)};
window.endMatch=function(){if((typeof G!=='undefined'&&G)&&G.net&&G.net.role==='host')return duelEnd();return _em.apply(this,arguments)};
document.addEventListener('click',e=>{if(e.target&&e.target.id==='b-menu'){D.close();const b=$('#b-again');if(b)b.style.display=''}},true);
})();
