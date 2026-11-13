// ===== Leyendas v3: Teodoro Pelón, Eugenio Tablero, Gunter Berkenfeld, Marcus Olmedo, Darnell Castaño y Dante Vipérez (+ Forma Mamba) + canje de códigos =====
(()=>{
const A=(id,o)=>{const c=Object.assign({id,rar:3,arch:'all',h:1,wd:1},o);CH.push(c);return c};
// cabezas 75..81 del atlas nuevo (assets/heads.png)
A(77,{name:'Teodoro Pelón ★ Dorado',title:'Edición Especial · El Perro Guardián',rar:3,arch:'def',pos:'SG',h:1.0,wd:1.0,pw:'GUARDIÁN',hd:75,hide:1,code:1,jc:'#f2b705',
 base:{vel:80,tir:83,mat:78,reg:84,def:94,pas:86,reb:78,agu:93}});                                  // media 85
A(78,{name:'Eugenio Tablero',title:'El Rey del Poste',rar:4,arch:'def',pos:'C',h:1.3,wd:1.04,pw:'POSTE',hd:76,jc:'#6b2fa0',
 base:{vel:72,tir:88,mat:94,reg:78,def:92,pas:98,reb:96,agu:92}});
A(79,{name:'Gunter Berkenfeld',title:'El Alemán Imposible',rar:4,arch:'tir',pos:'PF',h:1.3,wd:1.0,pw:'ALEMÁN',hd:77,jc:'#1d3fa8',
 base:{vel:70,tir:99,mat:90,reg:82,def:82,pas:88,reb:92,agu:94}});
A(80,{name:'Marcus Olmedo',title:'El Escolta Total',rar:3,arch:'all',pos:'SF',h:1.12,wd:1.02,pw:'ESCOLTA',hd:78,jc:'#1fa35c',
 base:{vel:88,tir:92,mat:90,reg:90,def:86,pas:86,reb:82,agu:92}});
A(81,{name:'Darnell Castaño',title:'El Huracán',rar:3,arch:'vol',pos:'SG',h:1.08,wd:1.04,pw:'HURACÁN',hd:79,jc:'#0f9d7a',
 base:{vel:94,tir:86,mat:94,reg:84,def:90,pas:78,reb:80,agu:94}});
A(82,{name:'Dante Vipérez',title:'La Víbora Eterna · 105',rar:3,arch:'all',pos:'SG',h:1.08,wd:1.02,pw:'MAMBA',hd:80,hide:1,code:1,cap:112,jc:'#6a2c91',
 base:{vel:104,tir:108,mat:106,reg:106,def:104,pas:103,reb:101,agu:108}});                          // media 105
A(83,{name:'Dante Vipérez · Forma Mamba',title:'Modo Mamba',rar:3,arch:'all',pos:'SG',h:1.14,wd:1.08,pw:'MAMBA',hd:81,hide:1,form:1,cap:112,jc:'#6a2c91',
 base:{vel:104,tir:108,mat:106,reg:106,def:104,pas:103,reb:101,agu:108}});
SPEC.push(80,81);
// stats con tope propio (Kobi llega a 105)
const _so=statsOf;statsOf=function(id,lvl,st,mul){const c=CH[id];if(!c||!c.cap)return _so.apply(this,arguments);const b=baseOf(c),o={};for(const k of SK)o[k]=clamp(Math.round(b[k]*(1+STB*(st||0))*(mul==null?1:mul)),1,c.cap);return o};

/* ================= poderes ================= */
const NEW3={GUARDIÁN:1,POSTE:1,ALEMÁN:1,ESCOLTA:1,HURACÁN:1,MAMBA:1};
Object.assign(RCOL,{GUARDIÁN:'#ffc21a',POSTE:'#b266ff',ALEMÁN:'#4fc3ff',ESCOLTA:'#2fe08a',HURACÁN:'#00e0b0',MAMBA:'#b45cff'});
Object.assign(PWN,{GUARDIÁN:'GUARDIÁN',POSTE:'REY POSTE',ALEMÁN:'MÁQUINA',ESCOLTA:'ANOTADOR',HURACÁN:'HURACÁN',MAMBA:'MAMBA'});
Object.assign(SKLBL,{GUARDIÁN:'🐕<br>ZARPAZO',POSTE:'🏹<br>GANCHO',ALEMÁN:'🦵<br>FADEAWAY',ESCOLTA:'⭐<br>TÁTEM',HURACÁN:'🌪<br>EMBESTIDA',MAMBA:'🐍<br>COBRA'});
const W=p=>CH[p.id].pw,m3=p=>NEW3[W(p)],R=p=>rageOn(p),pk=a=>a[(rnd()*a.length)|0],nw=()=>performance.now();
const hoopX=p=>Math.abs(p.x-hoopOf(p).x);
const T=(p,s,c)=>pop(p.x,p.y-290,s,c||RCOL[W(p)],38);
const need=(p,has)=>{if(!has){pop(p.x,p.y-260,'NECESITAS EL BALÓN','#aaa',24);return true}return false};
const XVT={spin:'¡GIRO!',behind:'¡POR LA ESPALDA!',between:'¡ENTRE LAS PIERNAS!',hesi:'¡HESITACIÓN!',snake:'¡SERPIENTE!',double:'¡DOBLE GIRO!',cobra:'¡COBRA!',fakeshot:'¡FINTA MAMBA!'};
const fx=(f,...a)=>{try{FX[f](...a)}catch(e){}};
const L=L2;
/* --- carrera dirigida (zarpazo / dive / embestida) --- */
function dash(p,tx,ty,n,cb){p.dv={tx,ty,n,k:0,cb};p.st='steal';p.tt=2;p.f=tx>=p.x?1:-1;p.vx=0}
function dashTick(p){const d=p.dv;if(!d)return;
 if(p.st!=='steal'){p.dv=null;return}
 d.k++;const r=1/Math.max(1,d.n-d.k+1);p.x+=(d.tx-p.x)*r;p.y+=(d.ty-p.y)*r;try{clampP(p)}catch(e){}p.tt=2;p.vx=0;
 const c=RCOL[W(p)]||'#fff';if(G.fr%2===0)burst(p.x-p.f*20,p.y-p.z-50-rnd()*80,c,2,5);
 if(d.k>=d.n){p.dv=null;p.st='idle';p.tt=0;p.cd=0;if(d.cb)d.cb()}}
/* ---------- KOBI: DIVE y GANCHO (botones extra) ---------- */
function landing(B){let t=0;if(!B.fl&&!B.ps&&!B.dk&&B.vz!=null){const z=Math.max(0,B.z||0);t=Math.max(0,(B.vz+Math.sqrt(B.vz*B.vz+2.2*z))/1.1);t=Math.min(t,40)}return{x:clamp(B.x+(B.vx||0)*t*.8,60,LW-60),y:clamp(B.y+(B.vy||0)*t*.8,60,LH-60)}}
function kobeDive(p){const n=nw(),B=G.B;if(p.st!=='idle'||p.frz>0)return;if(n<(p.k2T||0)){if(p===G.hu)pop(p.x,p.y-260,'RECARGANDO','#aaa',30);return}
 if(B.h===p){pop(p.x,p.y-260,'YA TIENES EL BALÓN','#aaa',24);return}
 const h=B.h,tg=h?{x:h.x,y:h.y}:landing(B);if(dist(p,tg)>900){pop(p.x,p.y-260,'DEMASIADO LEJOS','#aaa',24);return}
 p.k2T=n+(p.mamba?3500:6500);p.mmb=n+1100;const fr=clamp(Math.round(dist(p,tg)/55),7,16);
 T(p,'¡DIVE MAMBA!');fxRing(p.x,p.y,'#b45cff',260,24);sfx('legend');
 dash(p,tg.x-(h?p.f*40:0),tg.y,fr,()=>{const B2=G.B,h2=B2.h;p.mmb=nw()+700;
  if(h2&&h2.t!==p.t){if(h2.st!=='shoot'&&h2.st!=='dunk'&&dist(p,h2)<260){stolen(p,h2);pop(p.x,p.y-300,'¡IMPARABLE!','#b45cff',40);G.shake=Math.max(G.shake,14);fxRing(p.x,p.y,'#fff',220,24)}}
  else if(!h2&&dist(p,B2)<230&&(B2.z||0)<230&&!B2.net){B2.h=p;B2.fl=B2.dk=B2.ps=null;B2.vx=B2.vy=B2.vz=0;B2.pcd=0;pop(p.x,p.y-300,'¡BALÓN MÍO!','#b45cff',40);burst(p.x,p.y-60,'#b45cff',24,10);fxRing(p.x,p.y,'#b45cff',240,26)}})}
function kobeHook(p){const n=nw();if(p.st!=='idle'||p.frz>0)return;if(n<(p.k1T||0)){if(p===G.hu)pop(p.x,p.y-260,'RECARGANDO','#aaa',30);return}
 if(need(p,G.B.h===p))return;if(hoopX(p)>1000){pop(p.x,p.y-260,'DEMASIADO LEJOS','#aaa',24);return}
 p.k1T=n+(p.mamba?3000:6000);doShoot(p);if(p.st==='shoot'){p.hook=1;p.kh=1;p.hkp=1;p.pw=1;T(p,'¡GANCHO MAMBA!');fxRing(p.x,p.y,'#b45cff',220,22);sfx('perfect')}}
const _act=window.act;window.act=function(k){if(k==='Q'&&G&&G.mode==='play'&&G.n===3&&G.hu){const p=G.hu,B=G.B;if(p.st==='shoot'&&B.h===p&&p.tt<(p.lay?20:29)&&!p.frz){p.st='idle';p.tt=0;p.z=0;p.cd=0;p.hook=p.fade=p.leg=p.dfa=p.kh=p.hkp=p.gp=p.lay=0;p.vx=p.vy=0;pop(p.x,p.y-270,'¡PASE!','#7ff',30)}}if(k==='K1'||k==='K2'){if(!G||G.mode!=='play'||!G.hu)return;const p=G.hu;if(W(p)!=='MAMBA')return;if(k==='K1')kobeHook(p);else kobeDive(p);return}return _act.apply(this,arguments)};
/* botones extra */
{const c=$('#controls');if(c){for(const[id,t]of[['k1','🏹<br>HOOK'],['k2','🐍<br>DIVE']]){const b=document.createElement('button');b.id='btn-'+id;b.className='action-btn '+id;b.style.display='none';b.innerHTML=t;b.addEventListener('pointerdown',e=>{e.preventDefault();act(id==='k1'?'K1':'K2')});c.appendChild(b)}}
 addEventListener('keydown',e=>{if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.code==='KeyN')act('K1');if(e.code==='KeyM')act('K2')});
 setInterval(()=>{try{const k1=$('#btn-k1'),k2=$('#btn-k2');if(!k1)return;const on=typeof G!=='undefined'&&G&&G.P&&G.hu&&W(G.hu)==='MAMBA'&&G.mode!=='end'&&!G.dend&&!(G.net&&G.net.role==='guest');k1.style.display=k2.style.display=on?'':'none';if(on){const p=G.hu,n=nw(),a=(p.k1T||0)-n,b=(p.k2T||0)-n;const h1=a>0?'⏱<br>'+Math.ceil(a/1000)+'s':'🏹<br>HOOK',h2=b>0?'⏱<br>'+Math.ceil(b/1000)+'s':'🐍<br>DIVE';if(k1.dataset.h!==h1){k1.dataset.h=h1;k1.innerHTML=h1}if(k2.dataset.h!==h2){k2.dataset.h=h2;k2.innerHTML=h2}k1.style.opacity=a>0?.45:1;k2.style.opacity=b>0?.45:1}}catch(e){}},150)}
/* ---------- Forma Mamba ---------- */
function mambaOn(p){p.mamba=1;p.hdo=83;fxRing(p.x,p.y,'#b45cff',420,40);fxRing(p.x,p.y,'#ffd23d',300,32);fxRing(p.x,p.y,'#fff',200,26);burst(p.x,p.y-90,'#b45cff',40,14);burst(p.x,p.y-90,'#ffd23d',24,11);fx('cracks',p.x,p.y,'#b45cff',460);fx('sparks',p.x,p.y-120,'#ffd23d',36,15);flashFx('#b45cff');G.shake=Math.max(G.shake,34);
 pop(p.x,p.y-340,'¡LA VÍBORA DESPIERTA!','#ffd23d',44);try{sfx('legend')}catch(e){}}
const _rage=L.rage;L.rage=function(p){if(W(p)==='MAMBA')mambaOn(p);return _rage.apply(this,arguments)};
/* ---------- poderes (botón) ---------- */
const rg=(w,t,ms,fn)=>(p,c)=>{c.cd(ms||18000);rageStart(p,t);if(fn)fn(p)};
L.pw.GUARDIÁN=(p,c)=>{c.cd(14000);p.lad=nw()+7500;T(p,'¡GUARDIÁN DORADO! ¡PULSA ROBAR!');flashFx('#ffc21a');fxRing(p.x,p.y,'#ffc21a',260,26);fxRing(p.x,p.y,'#fff',160,18);burst(p.x,p.y-80,'#ffc21a',26,11);sfx('legend')};
L.pw.POSTE=rg('POSTE','¡REY DEL POSTE!',18000);
L.pw.ALEMÁN=rg('ALEMÁN','¡MÁQUINA ALEMANA!',19000);
L.pw.ESCOLTA=rg('ESCOLTA','¡MODO ANOTADOR!',18000,p=>{p.fire=3});
L.pw.HURACÁN=rg('HURACÁN','¡HURACÁN!',18000);
L.pw.MAMBA=(p,c)=>{c.cd(24000);rageStart(p,'¡MODO MAMBA!');p.rage=nw()+15000};
/* ---------- habilidades (botón X) ---------- */
L.sk.GUARDIÁN=(p,n,B,has)=>{const h=B.h;
 if(h&&h.t!==p.t&&dist(p,h)<560){p.skT=n+7000;if((p.lad||0)<n+1800)p.lad=n+1800;T(p,'¡ZARPAZO!');fxRing(p.x,p.y,'#ffc21a',220,22);dash(p,h.x-p.f*70,h.y,9,()=>{p.cd=0;doSteal(p)})}
 else if(!h&&dist(p,B)<420){p.skT=n+7000;T(p,'¡A POR EL BALÓN!');dash(p,B.x,B.y,9,()=>{const b=G.B;if(!b.h&&dist(p,b)<200&&b.z<200&&!b.net){b.h=p;b.fl=b.dk=b.ps=null;b.vx=b.vy=b.vz=0;b.pcd=0;burst(p.x,p.y-60,'#ffc21a',18,9)}})}
 else pop(p.x,p.y-260,'SIN OBJETIVO','#aaa',24)};
L.sk.POSTE=(p,n,B,has)=>{if(need(p,has))return;if(hoopX(p)>560){pop(p.x,p.y-260,'DEMASIADO LEJOS DEL ARO','#aaa',24);return}
 p.skT=n+8000;doShoot(p);if(p.st==='shoot'){p.hook=1;p.gp=1;p.hkp=1;p.pw=1;T(p,'¡GANCHO CELESTIAL!');fxRing(p.x,p.y,'#b266ff',230,24);sfx('perfect')}};
L.sk.ALEMÁN=(p,n,B,has)=>{if(need(p,has))return;p.skT=n+8000;doShoot(p);if(p.st==='shoot'){p.fade=1;p.leg=1;p.dfa=1;T(p,'¡FADEAWAY A UNA PIERNA!');fxRing(p.x,p.y,'#4fc3ff',230,24);sfx('perfect')}};
L.sk.ESCOLTA=(p,n,B,has)=>{if(need(p,has))return;p.skT=n+9000;
 if(hoopX(p)>640){doStepback(p);p.sb2=1;T(p,'¡STEPBACK DE TÁTEM!');fxRing(p.x,p.y,'#2fe08a',210,22);sfx('perfect')}
 else if(hoopX(p)<=800){p.kiaR=1;doDunk(p);p.kiaR=0;if(p.st==='dunk'){p.dkind=8;p.es=1;T(p,'¡EUROSTEP TÁTEM!');G.shake=Math.max(G.shake,10);fxRing(p.x,p.y,'#2fe08a',240,24);sfx('legend')}}
 else pop(p.x,p.y-260,'DEMASIADO LEJOS','#aaa',24)};
L.sk.HURACÁN=(p,n,B,has)=>{if(need(p,has))return;const h=hoopOf(p);if(hoopX(p)>950){pop(p.x,p.y-260,'DEMASIADO LEJOS DEL ARO','#aaa',24);return}
 p.skT=n+9000;p.shk=1;T(p,'¡EMBESTIDA!');fxRing(p.x,p.y,'#00e0b0',240,24);sfx('legend');
 const k=hoopX(p)>380?.62:.1;dash(p,p.x+(h.x-p.x)*k,p.y+(h.y-p.y)*k*.7,9,()=>{p.cd=0;if(driveable(p))doDunk(p);else doShoot(p)})};
L.sk.MAMBA=(p,n,B,has)=>{if(need(p,has))return;p.skT=n+9000;p.combo3=4;p.cmbD3=1;T(p,'¡COMBO COBRA!');fxRing(p.x,p.y,'#b45cff',230,24);sfx('swish')};
/* ---------- velocidad ---------- */
const _spd=L.spd;L.spd=function(p){let k=_spd.apply(this,arguments);if(m3(p)){const w=W(p);if(w==='GUARDIÁN'&&(p.lad||0)>nw())k*=1.4;else if(w==='ESCOLTA'&&R(p))k*=1.15;else if(w==='HURACÁN')k*=R(p)?1.3:1.04;else if(w==='MAMBA')k*=p.mamba?1.35:1.08}return k};
/* ---------- regates ---------- */
const _cross=L.cross;L.cross=function(p){_cross.apply(this,arguments);if(!m3(p))return;const w=W(p),o=opp(p);let want=null,big=false;
 if(w==='POSTE'&&rnd()<.4)want=pk(['spin','hesi']);else if(w==='ESCOLTA'&&rnd()<.45)want=pk(['hesi','between','snake']);
 else if(w==='MAMBA'){want=pk(['cobra','fakeshot','snake','double','behind','spin','cobra','fakeshot']);big=true}
 if(!want)return;p.xv=want;if(G.n!==3||p===G.hu||big)pop(p.x,p.y-270,XVT[want],RCOL[w],30);
 if(big&&o&&dist(p,o)<330&&(o.st==='idle'||o.st==='cross')&&rnd()<(p.mamba?.85:.42+(p.s.reg-60)/300)){o.st='fall';o.tt=0;o.vx=(o.x>=p.x?1:-1)*9;o.vy=0;pop(o.x,o.y-260,'¡TOBILLOS!','#b45cff',44);G.shake=Math.max(G.shake,10);burst(o.x,o.y-60,'#b45cff',18,9);fxRing(p.x,p.y,'#b45cff',240,26);sfx('fall');try{taunt(p,'ankle')}catch(e){}}};
/* ---------- mates ---------- */
const _dunk=L.dunk;L.dunk=function(p){_dunk.apply(this,arguments);if(!m3(p))return;const w=W(p);
 if(w==='MAMBA'){p.dkind=pk(p.mamba?[4,6,7,7]:[3,4,5,6,7]);p.kd=1+((rnd()*4)|0);p.kdT=0;const nm=['¡COBRA SLAM!','¡ECLIPSE!','¡TORMENTA!','¡FÉNIX!'][p.kd-1];pop(p.x,p.y-300,nm,['#b45cff','#ffd23d','#9fd8ff','#ff8a2a'][p.kd-1],46)}
 else if(w==='HURACÁN'){p.dkind=pk([3,4,6]);if(R(p)||rnd()<.4)p.shk=1}
 else if(w==='ESCOLTA'&&!p.es){p.dkind=pk([1,2,3,8]);p.es=p.dkind===8?1:0}
 else if(w==='POSTE'){p.dkind=pk([1,3])}};
const _fade=L.fade;L.fade=function(p){return _fade.apply(this,arguments)||(m3(p)&&(W(p)==='ALEMÁN'||p.dfa||W(p)==='MAMBA'&&(p.mamba||R(p)||rnd()<.45)))};
/* ---------- tiro ---------- */
const _shot=L.shot;L.shot=function(p,pr,three,d,cont){pr=_shot.apply(this,arguments);if(!m3(p))return pr;const w=W(p);
 if(w==='GUARDIÁN')pr+=.05;
 else if(w==='POSTE'){if(d<420)pr+=.1;if(R(p))pr+=.2;if(p.gp){pr=Math.max(pr,.95);p.gp=0}}
 else if(w==='ALEMÁN'){pr+=.1+cont*.35;if(R(p))pr+=.25;if(p.dfa){pr=Math.max(pr,three?.84:.95);p.dfa=0;p.leg=0}}
 else if(w==='ESCOLTA'){pr+=.07+(R(p)?.2:0)}
 else if(w==='HURACÁN'){pr+=R(p)?.1:.02}
 else if(w==='MAMBA'){pr+=.14+cont*.6+(p.mamba||R(p)?.22:0)+(three?.04:0);if(p.kh){pr=Math.max(pr,.97);p.kh=0}}
 return clamp(pr,.03,.98)};
/* ---------- pase ---------- */
const _pass=L.pass;L.pass=function(p,t){_pass.apply(this,arguments);if(!m3(p))return;const w=W(p),B=G.B;
 if(w==='POSTE'||w==='MAMBA'){if(B.ps)B.ps.T=Math.max(6,B.ps.T-(w==='MAMBA'?4:3));if(t){t.sh=nw()+(w==='MAMBA'?2000:1200);if(w==='MAMBA'){p.nl=G.fr+26;if(p===G.hu||rnd()<.5)pop(p.x,p.y-270,'¡SIN MIRAR!','#b45cff',30)}else if(p===G.hu||rnd()<.4)pop(p.x,p.y-270,'¡PASE EN EL POSTE!','#b266ff',28)}}};
/* ---------- IA ---------- */
const _ai=L.ai;L.ai=function(p){_ai.apply(this,arguments);if(W(p)!=='MAMBA'||p.st!=='idle'||!G||G.mode!=='play'||p.dv)return;const B=G.B,n=nw();
 if(n>=(p.k2T||0)&&!B.h&&dist(p,B)>230&&dist(p,B)<820&&rnd()<.03)kobeDive(p);
 else if(B.h===p&&n>=(p.k1T||0)&&hoopX(p)<520&&rnd()<.012)kobeHook(p)};
/* ================= dibujo ================= */
const _draw=L.draw;
L.draw=function(g,p,sc,fn){if(!m3(p))return _draw.call(this,g,p,sc,fn);
 const w=W(p),H=210*sc*(CH[p.hdo||p.id].h||1),cy=p.y-p.z-H*.5,a0=g.globalAlpha,d=p.f,n=nw();let sx=1,sy=1,rot=0,tx=0,tr=0;
 if(p.mamba){sx*=1.06;sy*=1.06;tr=1}
 if(p.st==='cross'&&p.xv){const u=clamp(p.tt/(p.cl||26),0,1);tr=1;
  switch(p.xv){case'spin':sx*=Math.cos(u*6.2832);break;case'double':sx*=Math.cos(u*12.566);break;
   case'behind':sx*=u<.3||u>.7?1:-1;tx=d*Math.sin(u*3.1416)*18;break;
   case'between':rot=d*.2*Math.sin(u*3.1416);sy*=1-.08*Math.sin(u*3.1416);break;
   case'hesi':tx=d*Math.sin(u*3.1416)*-16;sy*=1-.07*Math.sin(u*6.2832);break;
   case'snake':rot=Math.sin(u*18.85)*.12;tx=Math.sin(u*9.4)*10;break;
   case'cobra':rot=d*.34*Math.sin(u*3.1416);tx=d*Math.sin(u*6.2832)*20;sy*=1-.1*Math.sin(u*3.1416);break;
   case'fakeshot':sy*=1+.12*Math.sin(u*3.1416);tx=-d*14*Math.sin(u*3.1416);rot=-d*.1*Math.sin(u*3.1416);break}}
 if(p.st==='dunk'){const u=p.tt-p.dk0;if(p.dkind===7&&u>=4&&u<30){sx*=-1;rot=-d*.3;tr=1}
  if(p.es&&u>=-14&&u<18){tx=d*Math.sin((u+14)/32*6.2832)*26;rot=Math.sin((u+14)/32*6.2832)*.14;tr=1}}
 if(p.sbk&&p.st==='cross'){tr=1;rot=-p.dir*.12}
 if(p.st==='shoot'&&p.leg){const u=clamp(p.tt/30,0,1);tr=1;rot=-d*.2*Math.sin(u*3.1416);tx=-d*12*Math.sin(u*3.1416)}
 if(p.st==='shoot'&&p.hook&&w==='MAMBA'){tr=1;rot=d*.1}
 if(p.dv){tr=1;rot=d*.55;sy*=.82}
 if(p.st==='shoot'&&p.hkp){hookDraw(g,p,H,cy,fn);return}
 const trail=p.dv||p.mamba&&(p.mv||p.st==='cross'||p.st==='dunk')||(w==='GUARDIÁN'&&(p.lad||0)>n&&p.mv)||(p.st==='cross'&&p.xv&&w==='MAMBA')||(p.st==='dunk'&&(p.es||p.shk))||(w==='HURACÁN'&&R(p)&&p.mv)||(p.st==='shoot'&&p.leg)||(w==='ESCOLTA'&&R(p)&&p.mv);
 if(trail){for(let i=3;i>=1;i--){g.save();g.globalAlpha=a0*.24/i;g.translate(p.x-d*i*22,cy);g.scale(sx,sy);g.rotate(rot);g.translate(-p.x,-cy);g.globalCompositeOperation='lighter';fn();g.restore()}}
 if(!tr){fn();return}
 g.save();g.translate(p.x+tx,cy);g.rotate(rot);g.scale(sx,sy);g.translate(-p.x,-cy);fn();g.restore()};
function hookDraw(g,p,H,cy,fn){const d=p.f,x=p.x,top=p.y-p.z-H*.98,hr=H*.17,u=clamp(p.tt/36,0,1),lean=-d*(.06+.12*Math.sin(u*3.1416)),hy=top+hr*1.2;
 const ny=hy+hr*1.25;
 g.save();g.beginPath();g.rect(x-H*2,ny,H*4,H*3);g.clip();g.translate(x,cy);g.rotate(lean);g.scale(-1,1);g.translate(-x,-cy);fn();g.restore();
 g.save();g.beginPath();g.rect(x-H*2,top-H*.8,H*4,ny-(top-H*.8));g.clip();fn();g.restore();
 if(p.tt>8&&p.tt<34&&G.fr%2===0)burst(p.x+d*30,p.y-p.z-H*.85,'#b45cff',1,3)}
const KDC=['#b45cff','#ffd23d','#9fd8ff','#ff8a2a'];
function kdFx(g,p,sc,H){const f=G.fr,k=p.kd,x=p.x,y=p.y-p.z,ln=sc/.85;if(!k)return;
 const u=p.st==='dunk'?p.tt-p.dk0:null;
 if(u!=null&&u>=-14&&u<22&&k===4){g.save();g.globalCompositeOperation='lighter';for(const s of[-1,1])for(let i=0;i<4;i++)flame(g,x+s*(H*.14+i*H*.1),y-H*.45+i*H*.03,H*(.5-i*.05),H*.06,(f*.3+i)*s,'rgba(255,200,60,.8)','rgba(255,90,20,.5)');g.restore()}
 const t=p.kdT?f-p.kdT:-1;if(t<0||t>70||!p.kdX)return;const hx=p.kdX,hy=p.kdY-RIM_Z,e=1-t/70;
 g.save();g.globalCompositeOperation='lighter';
 if(k===1){const Ln=H*1.25*Math.min(1,t/12);g.globalAlpha=Math.min(1,e*1.2);g.lineCap='round';
  for(const[w,c]of[[H*.16,'rgba(110,30,200,.5)'],[H*.09,'rgba(180,92,255,.9)'],[H*.03,'#f3dcff']]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();for(let i=0;i<=24;i++){const q=i/24,yy=hy+H*.9-q*Ln,xx=hx+Math.sin(q*9+f*.25)*H*.18*(1-q*.4);i?g.lineTo(xx,yy):g.moveTo(xx,yy)}g.stroke()}
  const top=hy+H*.9-Ln;g.fillStyle='rgba(180,92,255,.85)';g.beginPath();g.ellipse(hx,top,H*.26,H*.2,0,0,7);g.fill();g.fillStyle='#ffd23d';for(const s of[-1,1]){g.beginPath();g.ellipse(hx+s*H*.09,top-H*.02,H*.035,H*.05,0,0,7);g.fill()}
  g.fillStyle='#fff';g.beginPath();g.moveTo(hx-H*.03,top+H*.05);g.lineTo(hx-H*.012,top+H*.15);g.lineTo(hx,top+H*.05);g.moveTo(hx,top+H*.05);g.lineTo(hx+H*.012,top+H*.15);g.lineTo(hx+H*.03,top+H*.05);g.fill()}
 else if(k===2){const r=H*(.25+.55*Math.min(1,t/14));g.globalAlpha=Math.max(0,e);
  const gd=g.createRadialGradient(hx,hy,r*.6,hx,hy,r*1.7);gd.addColorStop(0,'rgba(255,230,120,0)');gd.addColorStop(.4,'rgba(255,210,61,.9)');gd.addColorStop(1,'rgba(255,140,0,0)');g.fillStyle=gd;g.beginPath();g.arc(hx,hy,r*1.7,0,7);g.fill();
  g.globalCompositeOperation='source-over';g.fillStyle='rgba(5,0,15,.95)';g.beginPath();g.arc(hx,hy,r,0,7);g.fill();g.globalCompositeOperation='lighter';
  g.strokeStyle='rgba(255,230,140,.85)';g.lineWidth=3*ln;for(let i=0;i<16;i++){const aa=i*.3927+f*.02,rr=r*(1.5+.5*Math.sin(f*.3+i));g.beginPath();g.moveTo(hx+Math.cos(aa)*r*1.1,hy+Math.sin(aa)*r*1.1);g.lineTo(hx+Math.cos(aa)*rr,hy+Math.sin(aa)*rr);g.stroke()}}
 else if(k===3){g.globalAlpha=Math.min(1,e*1.6);
  if(t<40&&t%3!==2){for(let b=0;b<5;b++){let px=hx+(b-2)*H*.22+(rnd()-.5)*20,py=hy-H*1.6;g.beginPath();g.moveTo(px,py);for(let s2=1;s2<=9;s2++){px+=(hx+(b-2)*H*.05-px)*.3+(rnd()-.5)*H*.18;py+=(hy-py)/(10-s2);g.lineTo(px,py)}g.strokeStyle='rgba(120,190,255,.6)';g.lineWidth=9*ln;g.stroke();g.strokeStyle='#fff';g.lineWidth=2.5*ln;g.stroke()}}
  const cg=g.createRadialGradient(hx,hy,5,hx,hy,H*.7);cg.addColorStop(0,'rgba(255,255,255,.9)');cg.addColorStop(1,'rgba(120,190,255,0)');g.fillStyle=cg;g.beginPath();g.arc(hx,hy,H*.7*Math.min(1,t/8),0,7);g.fill()}
 else if(k===4){const q=Math.min(1,t/60),py=hy-q*H*1.4;g.globalAlpha=Math.max(0,e*1.2);
  for(const s of[-1,1])for(let i=0;i<5;i++)flame(g,hx+s*(H*.1+i*H*.12),py+H*.1*i,H*(.55-i*.07),H*.07,(f*.25+i)*s,'rgba(255,215,70,.9)','rgba(255,90,20,.55)');
  g.fillStyle='rgba(255,230,120,.95)';g.beginPath();g.ellipse(hx,py,H*.07,H*.12,0,0,7);g.fill();g.font=Math.round(H*.35)+'px sans-serif';g.textAlign='center';g.fillText('🔥',hx,py-H*.08)}
 g.restore()}
const _over=L.over;
function flame(g,x,y,h,w,ph,c1,c2){const sw=Math.sin(ph)*w*.7;const gr=g.createLinearGradient(0,y,0,y-h);gr.addColorStop(0,c1);gr.addColorStop(.55,c2);gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.beginPath();g.moveTo(x-w,y);g.quadraticCurveTo(x-w*.5,y-h*.45,x+sw,y-h);g.quadraticCurveTo(x+w*.5,y-h*.45,x+w,y);g.closePath();g.fill()}
L.over=function(g,p,sc){_over.apply(this,arguments);if(!m3(p)||!G||G.mode==='end')return;const w=W(p),H=210*sc*(CH[p.hdo||p.id].h||1),x=p.x,y=p.y-p.z,f=G.fr,u=sc/.85,n=nw();
 if(p.mamba){g.save();g.globalCompositeOperation='lighter';
  // aura y llamas moradas/doradas
  const rg=g.createRadialGradient(x,y-H*.5,H*.1,x,y-H*.5,H*.75);rg.addColorStop(0,'rgba(180,92,255,.0)');rg.addColorStop(.6,'rgba(180,92,255,.22)');rg.addColorStop(1,'rgba(120,40,200,0)');g.fillStyle=rg;g.fillRect(x-H,y-H*1.4,H*2,H*1.6);
  for(let i=0;i<7;i++){const ox=(i-3)*H*.13,ph=f*.22+i*1.3,hh=H*(.42+.16*Math.abs(Math.sin(f*.13+i)));flame(g,x+ox,y-H*.05,hh,H*.07,ph,i%2?'rgba(255,210,61,.75)':'rgba(180,92,255,.85)',i%2?'rgba(255,120,30,.45)':'rgba(110,30,200,.5)')}
  // relámpagos
  if(f%6<3){g.lineJoin='round';for(let k=0;k<2;k++){let px=x+(k?1:-1)*H*.28,py=y-H*.1;g.beginPath();g.moveTo(px,py);for(let s=0;s<6;s++){px+=(rnd()-.5)*H*.22;py-=H*.17;g.lineTo(px,py)}g.strokeStyle='rgba(190,120,255,.55)';g.lineWidth=7*u;g.stroke();g.strokeStyle='#f3dcff';g.lineWidth=2*u;g.stroke()}}
  // chispas doradas orbitando
  for(let i=0;i<5;i++){const a=f*.11+i*1.256;g.fillStyle='rgba(255,215,80,.95)';g.beginPath();g.arc(x+Math.cos(a)*H*.34,y-H*.5+Math.sin(a)*H*.3,5*u,0,7);g.fill()}
  g.restore()}
 else if(w==='GUARDIÁN'&&(p.lad||0)>n){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const a=f*.13+i*1.57;g.fillStyle='rgba(255,194,26,.9)';g.beginPath();g.arc(x+Math.cos(a)*H*.3,y-H*.5+Math.sin(a)*H*.12,5*u,0,7);g.fill()}g.font=Math.round(24*u)+'px sans-serif';g.textAlign='center';g.globalAlpha=.9;g.fillText('🐕',x,y-H-14+Math.sin(f/8)*4);g.restore()}
 else if(w==='ALEMÁN'&&R(p)){g.save();g.font=Math.round(20*u)+'px sans-serif';g.textAlign='center';for(let i=0;i<3;i++){g.globalAlpha=.85;g.fillText('❄',x+Math.cos(f*.07+i*2.1)*H*.3,y-H*(.6+.15*Math.sin(f*.1+i)))}g.restore()}
 else if(w==='ESCOLTA'&&R(p)){g.save();g.font=Math.round(22*u)+'px sans-serif';g.textAlign='center';g.fillText(f%30<15?'⭐':'✨',x+p.f*28,y-H-12);g.restore()}
 else if(w==='HURACÁN'&&R(p)){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(0,224,176,.7)';g.lineWidth=4*u;for(let i=0;i<3;i++){const a=f*.25+i*2.09;g.beginPath();g.ellipse(x,y-H*(.25+i*.22),H*.3,H*.07,0,a,a+2.2);g.stroke()}g.restore()}
 else if(w==='POSTE'&&R(p)){g.save();g.font=Math.round(24*u)+'px sans-serif';g.textAlign='center';g.fillText('👑',x,y-H-14+Math.sin(f/9)*4);g.restore()}
 if(w==='MAMBA')kdFx(g,p,sc,H)};
/* ================= por frame ================= */
const _tick=L.tick;
L.tick=function(p){_tick.apply(this,arguments);if(!m3(p))return;const w=W(p),n=nw(),B=G.B,c=RCOL[w];
 if(p.dv)dashTick(p);
 if(p.mamba&&!R(p)){p.mamba=0;p.hdo=0;fxRing(p.x,p.y,'#b45cff',280,28);burst(p.x,p.y-90,'#b45cff',22,9);pop(p.x,p.y-290,'FIN DEL MODO MAMBA','#b45cff',24)}
 if(G.mode!=='play')return;
 if(p.mamba){if(G.fr%2===0){burst(p.x+(rnd()-.5)*60,p.y-p.z-30-rnd()*170,rnd()<.5?'#b45cff':'#ffd23d',1,4)}if(G.fr%26===0)fxRing(p.x,p.y,'#b45cff',210,22)}
 if(w==='GUARDIÁN'&&(p.lad||0)>n&&G.fr%4===0)burst(p.x+(rnd()-.5)*40,p.y-p.z-40-rnd()*120,'#ffc21a',1,3);
 if(w==='ALEMÁN'&&R(p)&&G.fr%4===0)burst(p.x+(rnd()-.5)*40,p.y-p.z-40-rnd()*140,'#4fc3ff',1,3);
 if(w==='ESCOLTA'&&R(p)&&G.fr%4===0)burst(p.x+(rnd()-.5)*40,p.y-p.z-40-rnd()*140,'#2fe08a',1,3);
 if(w==='HURACÁN'&&R(p)){if(G.fr%3===0)burst(p.x,p.y-p.z-30,c,1,5);
  if(p.mv&&G.fr>=(p.trmp||0)){for(const q of G.P)if(q.t!==p.t&&dist(q,p)<115&&(q.st==='idle'||q.st==='cross')){q.st='fall';q.tt=0;q.vx=(q.x>=p.x?1:-1)*11;q.vy=0;q.fl=0;p.trmp=G.fr+50;pop(q.x,q.y-260,'¡ARROLLADO!',c,40);G.shake=Math.max(G.shake,12);fxRing(q.x,q.y,c,240,24);burst(q.x,q.y-60,c,18,10);sfx('fall');break}}}
 // combo de Kobi (cadena de regates nuevos)
 if(w==='MAMBA'){
  if(p.combo3>0&&p.st==='idle'&&B.h===p){p.cd=0;p.combo3--;const dir=p.cmbD3=-(p.cmbD3||1);doCross(p,dir,rnd()<.5?.45:-.45);if(p.combo3===0)p.cmbEnd3=G.fr+((p.cl||26)+4)}
  else if(p.combo3>0&&B.h!==p)p.combo3=0;
  if(p.cmbEnd3&&G.fr>=p.cmbEnd3&&p.st==='idle'){p.cmbEnd3=0;const o=opp(p);if(B.h===p){if(o&&o.st==='fall')pop(p.x,p.y-300,'¡LO DEJAS SENTADO!','#b45cff',40);if(driveable(p))doDunk(p);else{doShoot(p);if(p.st==='shoot'){p.pw=1;p.fade=1}}}}}
 if(w==='MAMBA'){
  if(p.st!=='shoot')p.hkp=0;
  if(p.st==='dunk'&&p.kd){const u=p.tt-p.dk0,hh=hoopOf(p),kc=KDC[p.kd-1];
   if(u>=-14&&u<22){const a=u*.6;burst(p.x+Math.cos(a)*46*p.f,p.y-p.z-100+Math.sin(a)*70,kc,1,2);burst(p.x-Math.cos(a)*46*p.f,p.y-p.z-100-Math.sin(a)*70,'#fff',1,2)}
   if(u===22){p.kdT=G.fr;p.kdX=hh.x;p.kdY=hh.y;fxRing(hh.x,hh.y-RIM_Z,kc,380,36);fxRing(hh.x,hh.y-RIM_Z,'#fff',220,26);burst(hh.x,hh.y-RIM_Z,kc,40,13);G.shake=Math.max(G.shake,26);flashFx(kc);fx('cracks',p.x,p.y,kc,420)}}
  if(B.fl&&B.fl.p===p){if(G.fr%2===0)burst(B.x,B.y-B.z,G.fr%4?'#b45cff':'#ffd23d',1,3);if(B.fl.ok&&!B.fl.kfx&&B.fl.t>=B.fl.T-3){B.fl.kfx=1;const hh=hoopOf(p);fxRing(hh.x,hh.y-RIM_Z,'#b45cff',300,28);fxRing(hh.x,hh.y-RIM_Z,'#ffd23d',200,22);burst(hh.x,hh.y-RIM_Z,'#ffd23d',22,9)}}
  if(p.st==='cross'&&p.xv&&p.tt===3)fxRing(p.x,p.y,'#b45cff',150,18)}
 // onda expansiva al machacar
 if(p.st==='dunk'&&(p.shk||p.mamba)&&p.tt-p.dk0===22){fx('cracks',p.x,p.y,c,380);G.shake=Math.max(G.shake,p.mamba?30:22);fxRing(p.x,p.y,c,380,34);fxRing(p.x,p.y,'#fff',230,26);burst(p.x,p.y-60,c,30,12);
  for(const q of G.P)if(q.t!==p.t&&dist(q,p)<300&&(q.st==='idle'||q.st==='cross')){q.st='fall';q.tt=0;q.vx=(q.x>=p.x?1:-1)*10;q.vy=0;pop(q.x,q.y-250,'¡BOOM!',c,34)}p.shk=0}
 if(p.st==='dunk'&&p.es&&p.tt-p.dk0===20){burst(p.x,p.y-80,c,22,10);fxRing(p.x,p.y,c,260,26)}
 if(p.st!=='cross'&&p.xv&&p.st!=='shoot')p.xv=null;
 if(p.st==='idle'&&p.leg)p.leg=0;
 // pase sin mirar: estela morada
 if(p.nl&&G.fr<p.nl&&B.ps&&G.fr%2===0)burst(B.x,B.y-B.z,'#b45cff',2,4)};
/* ================= canje de códigos ================= */
const H=s=>{let h1=0xdeadbeef,h2=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^h1>>>16,2246822507)^Math.imul(h2^h2>>>13,3266489909);h2=Math.imul(h2^h2>>>16,2246822507)^Math.imul(h1^h1>>>13,3266489909);return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)};
window.__codeHash=H;
const CODES={"2l7ij81zhl":77,"iexin3nqu5":82,"1vgsvtwkqtp":86};
function openCode(){let o=$('#rdm');if(!o){o=document.createElement('div');o.id='rdm';document.body.appendChild(o)}
 o.innerHTML='<div class="sbox"><b>🎟 CANJEAR CÓDIGO</b><small>Escribe un código especial para desbloquear jugadores exclusivos</small><input id="rdm-in" maxlength="20" placeholder="TU CÓDIGO" autocapitalize="characters" autocomplete="off" spellcheck="false"><div id="rdm-m" style="min-height:18px;font-size:12px;color:#ffd23d"></div><button class="btn main" id="rdm-go">CANJEAR</button><button class="btn small" id="rdm-x">CERRAR</button></div>';o.classList.add('on');
 const inp=$('#rdm-in'),m=$('#rdm-m');setTimeout(()=>{try{inp.focus()}catch(e){}},50);
 const go=()=>{const c=String(inp.value||'').toUpperCase().replace(/[^A-Z0-9]/g,'');const id=CODES[H('GH#'+c)];
  if(!c){m.textContent='Escribe un código';return}
  if(id==null){m.textContent='❌ Código no válido';try{sfx('fall')}catch(e){}return}
  if(save.owned[id]){m.textContent='Ya tienes a '+CH[id].name;return}
  save.owned[id]={lvl:1,st:0};save.codes=save.codes||{};save.codes[H('GH#'+c)]=1;store();
  o.innerHTML='<div class="sbox"><b>🎉 ¡CÓDIGO CANJEADO!</b><img src="'+figImg(id,CH[id].jc)+'" style="height:150px;margin:0 auto;image-rendering:pixelated"><div class="scode" style="font-size:12px;letter-spacing:1px;color:#ffd23d">'+CH[id].name.toUpperCase()+'</div><small>'+CH[id].title+'</small><button class="btn main" id="rdm-ok">¡INCREÍBLE!</button></div>';
  try{sfx('legend')}catch(e){}$('#rdm-ok').onclick=()=>{o.classList.remove('on');try{renderMenu()}catch(e){}}};
 $('#rdm-go').onclick=go;inp.onkeydown=e=>{if(e.key==='Enter')go()};$('#rdm-x').onclick=()=>o.classList.remove('on')}
const bc=$('#b-code');if(bc)bc.addEventListener('click',openCode);
window.__L3={dash,dashTick,need};
})();
