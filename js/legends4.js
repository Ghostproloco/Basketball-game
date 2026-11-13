// ===== Leyendas v4: Ibrahim Nkoulou, Silas Brumo, Octavio Zarza (La Garza), Ulises Cejas, Bruno Salpicón y Nacho Rosales =====
(()=>{
const A=(id,o)=>{const c=Object.assign({id,rar:3,arch:'all',h:1,wd:1},o);if(CH.length!==id)console.warn('legends4: id',id,'vs',CH.length);CH.push(c);return c};
// cabezas 82..87 del atlas (assets/heads.png)
A(84,{name:'Ibrahim Nkoulou',title:'El Coloso de Piedra',rar:3,arch:'def',pos:'C',h:1.32,wd:1.08,pw:'COLOSO',hd:82,jc:'#2c5fb3',
 base:{vel:70,tir:86,mat:94,reg:70,def:94,pas:80,reb:96,agu:92}});
A(85,{name:'Silas Brumo',title:'Manos de Pulpo · El Ladrón Silencioso',rar:3,arch:'def',pos:'SF',h:1.16,wd:1.02,pw:'GARRA',hd:83,jc:'#6b7a8f',
 base:{vel:86,tir:90,mat:86,reg:86,def:99,pas:78,reb:88,agu:95}});
A(86,{name:'Octavio Zarza',title:'La Garza · Rayo Dorado',rar:4,arch:'tir',pos:'SF',h:1.36,wd:.96,pw:'GARZA',hd:84,jc:'#e8b30e',
 base:{vel:90,tir:99,mat:94,reg:92,def:86,pas:86,reb:82,agu:92}});
A(87,{name:'Ulises Cejas',title:'El Cuervo Altísimo',rar:3,arch:'def',pos:'PF',h:1.34,wd:1.0,pw:'CUERVO',hd:85,jc:'#5a2d91',
 base:{vel:82,tir:88,mat:93,reg:74,def:97,pas:78,reb:94,agu:90}});
A(88,{name:'Bruno Salpicón',title:'Hermano Salpicadura',rar:2,arch:'tir',pos:'SG',h:1.1,wd:1.0,pw:'SALPICÓN',hd:86,jc:'#1d86c9',
 base:{vel:78,tir:95,mat:72,reg:74,def:76,pas:70,reb:62,agu:90}});
CH[69].rar=2;{const i=SPEC.indexOf(69);if(i>=0)SPEC.splice(i,1)}
const NEW4={COLOSO:1,GARRA:1,GARZA:1,CUERVO:1,SALPICÓN:1,SHOWMAN:1};
Object.assign(RCOL,{COLOSO:'#6fb0ff',GARRA:'#9fe8e0',GARZA:'#ffd23d',CUERVO:'#a45cff',SALPICÓN:'#4fc3ff',SHOWMAN:'#ff5cc8'});
Object.assign(PWN,{COLOSO:'COLOSO',GARRA:'MANOS',GARZA:'MODO GARZA',CUERVO:'ALAS',SALPICÓN:'SALPICÓN',SHOWMAN:'SHOW'});
Object.assign(SKLBL,{COLOSO:'🗿<br>EMBESTIDA',GARRA:'🐙<br>ZARPAZO',GARZA:'⚡<br>ESTRATO',CUERVO:'🪽<br>TAPÓN',SALPICÓN:'💦<br>RÁFAGA',SHOWMAN:'🎪<br>CENTRO'});
const L=L2,W=p=>CH[p.id].pw,m4=p=>NEW4[W(p)],R=p=>rageOn(p),nw=()=>performance.now(),pk=a=>a[(rnd()*a.length)|0];
const hoopX=p=>Math.abs(p.x-hoopOf(p).x),T=(p,s,c)=>pop(p.x,p.y-290,s,c||RCOL[W(p)],38);
const D=()=>window.__L3||{},FXF={fxBeam:(...a)=>fxBeam(...a),fxBolt:(...a)=>fxBolt(...a),coinRain:(...a)=>coinRain(...a)},fx=(f,...a)=>{try{FXF[f](...a)}catch(e){}};
const rg=(t,ms,fn)=>(p,c)=>{c.cd(ms);rageStart(p,t);if(fn)fn(p)};
const need=(p,has)=>{if(!has){pop(p.x,p.y-260,'NECESITAS EL BALÓN','#aaa',24);return true}return false};
/* ---------- poderes (botón) ---------- */
L.pw.COLOSO=rg('¡COLOSO DE PIEDRA!',18000);
L.pw.GARRA=(p,c)=>{c.cd(15000);p.lad=nw()+10000;T(p,'¡MANOS DE PULPO! ¡PULSA ROBAR!');flashFx('#9fe8e0');fxRing(p.x,p.y,'#9fe8e0',260,26);fxRing(p.x,p.y,'#fff',150,18);burst(p.x,p.y-80,'#9fe8e0',26,11);sfx('legend')};
L.pw.GARZA=rg('¡MODO GARZA!',20000,p=>{p.fire=3});
L.pw.CUERVO=rg('¡ALAS DEL CUERVO!',18000);
L.pw.SALPICÓN=rg('¡FUEGO SALPICÓN!',18000,p=>{p.fire=3});
L.pw.SHOWMAN=rg('¡SHOW TIME!',18000);
/* ---------- habilidades (botón X) ---------- */
L.sk.COLOSO=(p,n,B,has)=>{const d=D(),h=B.h,o=opp(p);
 if(has){const hp=hoopOf(p);if(hoopX(p)>900){pop(p.x,p.y-260,'DEMASIADO LEJOS DEL ARO','#aaa',24);return}
  p.skT=n+9000;T(p,'¡EMBESTIDA DE PIEDRA!');fxRing(p.x,p.y,'#6fb0ff',250,24);sfx('legend');const k=hoopX(p)>380?.6:.1;
  d.dash&&d.dash(p,p.x+(hp.x-p.x)*k,p.y+(hp.y-p.y)*k*.7,9,()=>{p.cd=0;if(driveable(p)){doDunk(p);p.cs=1}else doShoot(p)})}
 else if(h&&h.t!==p.t&&dist(p,h)<650){p.skT=n+8000;T(p,'¡MURO DE PIEDRA!');fxRing(p.x,p.y,'#6fb0ff',240,22);d.dash&&d.dash(p,h.x-p.f*60,h.y,9,()=>{p.cd=0;doBlock(p);p.cs=1})}
 else pop(p.x,p.y-260,'SIN OBJETIVO','#aaa',24)};
L.sk.GARRA=(p,n,B,has)=>{const d=D(),h=B.h;
 if(h&&h.t!==p.t&&dist(p,h)<600){p.skT=n+7000;if((p.lad||0)<n+1800)p.lad=n+1800;T(p,'¡ZARPAZO DE PULPO!');fxRing(p.x,p.y,'#9fe8e0',220,22);d.dash&&d.dash(p,h.x-p.f*70,h.y,8,()=>{p.cd=0;doSteal(p)})}
 else if(!h&&dist(p,B)<450){p.skT=n+7000;T(p,'¡A POR EL BALÓN!');d.dash&&d.dash(p,B.x,B.y,9,()=>{const b=G.B;if(!b.h&&dist(p,b)<210&&b.z<210&&!b.net){b.h=p;b.fl=b.dk=b.ps=null;b.vx=b.vy=b.vz=0;b.pcd=0;burst(p.x,p.y-60,'#9fe8e0',18,9)}})}
 else pop(p.x,p.y-260,'SIN OBJETIVO','#aaa',24)};
L.sk.GARZA=(p,n,B,has)=>{if(need(p,has))return;p.skT=n+9000;doShoot(p);if(p.st==='shoot'){p.fade=1;p.gz=1;p.gzS=1;p.bolt=1;p.fire=3;T(p,'¡TIRO DE ESTRATOSFERA!');
  fxRing(p.x,p.y,'#ffd23d',260,26);fxRing(p.x,p.y,'#fff',160,18);fx('fxBeam',p.x,p.y,'#ffd23d');flashFx('#ffd23d');for(let i=0;i<5;i++)fx('fxBolt',p.x+(rnd()-.5)*300,p.y-60,'#ffd23d');sfx('perfect')}};
L.sk.CUERVO=(p,n,B,has)=>{const d=D(),h=B.h;
 if(has){if(hoopX(p)>820){pop(p.x,p.y-260,'DEMASIADO LEJOS DEL ARO','#aaa',24);return}p.skT=n+9000;T(p,'¡ALLEY DEL CUERVO!');fxRing(p.x,p.y,'#a45cff',240,24);sfx('legend');
  const hp=hoopOf(p),k=hoopX(p)>380?.6:.1;d.dash&&d.dash(p,p.x+(hp.x-p.x)*k,p.y+(hp.y-p.y)*k*.7,8,()=>{p.cd=0;if(driveable(p)){doDunk(p);p.dkind=pk([3,6,8])}else doShoot(p)})}
 else if(h&&h.t!==p.t&&dist(p,h)<700){p.skT=n+8000;T(p,'¡TAPÓN DEL CUERVO!');fxRing(p.x,p.y,'#a45cff',260,24);G.shake=Math.max(G.shake,10);d.dash&&d.dash(p,h.x-p.f*60,h.y,8,()=>{p.cd=0;doBlock(p);p.cs=1})}
 else pop(p.x,p.y-260,'SIN OBJETIVO','#aaa',24)};
L.sk.SALPICÓN=(p,n,B,has)=>{if(need(p,has))return;p.skT=n+7500;p.nst=n+1200;doShoot(p);if(p.st==='shoot'){p.qk=1;p.fire=2;T(p,'¡RÁFAGA!');for(let i=0;i<3;i++)setTimeout(()=>{try{fxRing(p.x,p.y,i%2?'#fff':'#4fc3ff',180+i*50,20);burst(p.x,p.y-90,'#4fc3ff',14,9)}catch(e){}},i*90);sfx('perfect')}};
L.sk.SHOWMAN=(p,n,B,has)=>{if(need(p,has))return;p.skT=n+9000;doShoot(p);if(p.st==='shoot'){p.hv=1;T(p,'¡DESDE EL CENTRO!');fxRing(p.x,p.y,'#ff5cc8',250,24);for(let i=0;i<14;i++)burst(p.x+(rnd()-.5)*160,p.y-100-rnd()*120,i%2?'#ffd23d':'#ff5cc8',3,7);sfx('perfect')}};
/* ---------- velocidad ---------- */
const _spd=L.spd;L.spd=function(p){let k=_spd.apply(this,arguments);if(m4(p)){const w=W(p);if(w==='GARRA'&&(p.lad||0)>nw())k*=1.3;else if(w==='CUERVO')k*=R(p)?1.2:1.03;else if(w==='SHOWMAN')k*=R(p)?1.25:1.05;else if(w==='COLOSO'&&R(p))k*=1.12}return k};
/* ---------- regates (SHOWMAN) ---------- */
const XN={spin:'¡GIRO!',behind:'¡POR LA ESPALDA!',snake:'¡SERPIENTE!',hesi:'¡HESITACIÓN!',double:'¡DOBLE GIRO!'};
const _cross=L.cross;L.cross=function(p){_cross.apply(this,arguments);if(!m4(p)||W(p)!=='SHOWMAN')return;const o=opp(p),want=pk(['spin','behind','snake','hesi','double']);p.xv=want;
 if(G.n!==3||p===G.hu)pop(p.x,p.y-270,XN[want],'#ff5cc8',30);
 if(o&&dist(p,o)<320&&(o.st==='idle'||o.st==='cross')&&rnd()<(R(p)?.7:.3+(p.s.reg-60)/350)){o.st='fall';o.tt=0;o.vx=(o.x>=p.x?1:-1)*9;o.vy=0;pop(o.x,o.y-260,'¡TOBILLOS!','#ff5cc8',44);G.shake=Math.max(G.shake,10);burst(o.x,o.y-60,'#ff5cc8',18,9);sfx('fall');try{taunt(p,'ankle')}catch(e){}}};
/* ---------- mates ---------- */
const _dunk=L.dunk;L.dunk=function(p){_dunk.apply(this,arguments);if(!m4(p))return;const w=W(p);
 if(w==='COLOSO'){p.dkind=pk([1,3,6]);p.cs=1}else if(w==='CUERVO'){p.dkind=pk([3,6,7,8]);p.cs=1}else if(w==='GARZA')p.dkind=pk([2,4,5,6])};
/* ---------- tiro ---------- */
const _shot=L.shot;L.shot=function(p,pr,three,d,cont){pr=_shot.apply(this,arguments);if(!m4(p))return pr;const w=W(p);
 if(w==='COLOSO'){if(d<420)pr+=.1;if(R(p))pr+=.12}
 else if(w==='GARRA'){pr+=.04}
 else if(w==='GARZA'){pr+=.1+cont*.3+(three?.05:0)+(R(p)?.25:0);if(p.gz){pr=Math.max(pr,.97);p.gz=0}}
 else if(w==='CUERVO'){pr+=.05+(R(p)?.12:0)}
 else if(w==='SALPICÓN'){pr+=.1+(three?.07:0)+cont*.25+(R(p)?.28:0);if(p.qk){pr=Math.max(pr,three?.82:.92);p.qk=0}}
 else if(w==='SHOWMAN'){pr+=.03+(R(p)?.1:0);if(p.hv){pr=R(p)?.78:.5;p.hv=0}}
 return clamp(pr,.03,.98)};
const _fade=L.fade;L.fade=function(p){return _fade.apply(this,arguments)||(m4(p)&&(W(p)==='GARZA'&&(p.fade||rnd()<.35)))};
/* ---------- efectos al anotar ---------- */
const _lf=window.legendFx;window.legendFx=function(p,kind,pts){_lf.apply(this,arguments);if(!G||!m4(p))return;const w=W(p),h=hoopOf(p),c=RCOL[w];
 if(w==='GARZA'&&(R(p)||p.gzS)){p.gzS=0;fx('fxBeam',h.x,h.y,c);fxRing(h.x,h.y,c,360);fxRing(h.x,h.y,'#fff',240);fx('coinRain',h.x,h.y-300);for(let i=0;i<4;i++)fx('fxBolt',h.x+(rnd()-.5)*340,h.y,c);if(pts===3)pop(h.x,h.y-330,'¡DESDE LA LUNA!',c,46)}
 else if(w==='SALPICÓN'&&R(p)){fxRing(h.x,h.y,c,300);burst(h.x,h.y,c,34,12);burst(h.x,h.y,'#fff',16,9)}
 else if(w==='SHOWMAN'&&R(p)){fxRing(h.x,h.y,c,300);for(let i=0;i<20;i++)burst(h.x+(rnd()-.5)*300,h.y-rnd()*200,i%2?'#ffd23d':c,2,8)}
 else if(w==='COLOSO'&&kind==='dunk'&&R(p)){fxRing(h.x,h.y,c,430);fxRing(h.x,h.y,'#fff',300);G.shake=Math.max(G.shake,16)}
 else if(w==='CUERVO'&&kind==='dunk'&&R(p)){fxRing(h.x,h.y,c,400);burst(h.x,h.y-60,c,30,12)}};
/* ---------- robos de Silas Brumo ---------- */
const _st=window.stolen;window.stolen=function(th,v){_st.apply(this,arguments);try{if(m4(th)&&W(th)==='GARRA'){fxRing(th.x,th.y,'#9fe8e0',260,24);burst(th.x,th.y-70,'#9fe8e0',22,10);pop(th.x,th.y-310,pk(['¡MANOS DE PULPO!','¡TE LA QUITÓ!','¡LADRÓN!']),'#9fe8e0',40);G.shake=Math.max(G.shake,8)}}catch(e){}};
/* ---------- IA ---------- */
const _ai=L.ai;L.ai=function(p){_ai.apply(this,arguments);if(!m4(p)||p.st!=='idle'||!G||G.mode!=='play'||p.dv||nw()<(p.skT||0))return;const B=G.B,w=W(p),has=B.h===p,r=rnd();
 if(has&&r<.008&&(w==='GARZA'||w==='SALPICÓN'||w==='SHOWMAN')&&(w==='SHOWMAN'?hoopX(p)>900:hoopX(p)<900)&&G.sc>3)L.sk[w](p,nw(),B,true);
 else if(has&&r<.008&&(w==='COLOSO'||w==='CUERVO')&&hoopX(p)<700)L.sk[w](p,nw(),B,true);
 else if(!has&&B.h&&B.h.t!==p.t&&r<.01&&dist(p,B.h)<520&&(w==='GARRA'||w==='COLOSO'||w==='CUERVO'))L.sk[w](p,nw(),B,false)};
/* ---------- dibujo: regates del Showman + auras ---------- */
const _draw=L.draw;L.draw=function(g,p,sc,fn){
 if(m4(p)&&W(p)==='SHOWMAN'&&p.st==='cross'&&p.xv){const H=210*sc*(CH[p.id].h||1),cy=p.y-p.z-H*.5,d=p.f,u=clamp(p.tt/(p.cl||26),0,1);let sx=1,rot=0,tx=0;
  switch(p.xv){case'spin':sx=Math.cos(u*6.2832);break;case'double':sx=Math.cos(u*12.566);break;case'behind':sx=u<.3||u>.7?1:-1;tx=d*Math.sin(u*3.1416)*18;break;case'snake':rot=Math.sin(u*18.85)*.12;tx=Math.sin(u*9.4)*10;break;case'hesi':tx=d*Math.sin(u*3.1416)*-16}
  g.save();g.translate(p.x+tx,cy);g.rotate(rot);g.scale(sx||.02,1);g.translate(-p.x,-cy);const r=_draw.call(this,g,p,sc,fn);g.restore();return r}
 return _draw.call(this,g,p,sc,fn)};
const _over=L.over;L.over=function(g,p,sc){_over.apply(this,arguments);if(!m4(p)||!G||G.mode==='end')return;const w=W(p),H=210*sc*(CH[p.id].h||1),x=p.x,y=p.y-p.z,f=G.fr,c=RCOL[w],on=R(p);
 const glow=(col,a)=>{const r=g.createRadialGradient(x,y-H*.5,H*.1,x,y-H*.5,H*.8);r.addColorStop(0,col+'00');r.addColorStop(.6,col+a);r.addColorStop(1,col+'00');g.fillStyle=r;g.fillRect(x-H,y-H*1.5,H*2,H*1.8)};
 if(w==='GARRA'&&(p.lad||0)>nw()){g.save();g.globalCompositeOperation='lighter';glow('#9fe8e0','44');g.strokeStyle='rgba(200,255,250,.85)';g.lineWidth=3*sc/.85;for(let i=0;i<3;i++){const ox=(i-1)*H*.1+Math.sin(f*.3+i)*4;g.beginPath();g.moveTo(x+ox-p.f*H*.28,y-H*.78);g.lineTo(x+ox-p.f*H*.1,y-H*.38);g.stroke()}g.restore();return}
 if(!on)return;g.save();g.globalCompositeOperation='lighter';
 if(w==='GARZA'){glow('#ffd23d','55');g.fillStyle='rgba(255,236,150,.5)';for(let i=0;i<6;i++){const a=f*.04+i*1.047;g.save();g.translate(x,y-H*.55);g.rotate(a);g.fillRect(H*.35,-3,H*.5,6);g.restore()}
  g.fillStyle='rgba(255,215,60,.35)';g.fillRect(x-H*.06,y-H*2.2,H*.12,H*2.2)}
 else if(w==='CUERVO'){glow('#a45cff','33');g.fillStyle='rgba(120,50,200,.55)';for(const s of[-1,1]){const fl=Math.sin(f*.2)*H*.06;g.beginPath();g.moveTo(x+s*H*.1,y-H*.62);g.bezierCurveTo(x+s*H*.5,y-H*(1.0)-fl,x+s*H*.8,y-H*.72-fl,x+s*H*.9,y-H*.38);g.bezierCurveTo(x+s*H*.65,y-H*.5,x+s*H*.45,y-H*.45,x+s*H*.1,y-H*.5);g.fill()}}
 else if(w==='COLOSO'){glow('#6fb0ff','33');g.fillStyle='rgba(150,190,255,.7)';for(let i=0;i<6;i++){const a=f*.05+i*1.047,rx=x+Math.cos(a)*H*.5,ry=y-H*.5+Math.sin(a)*H*.18;g.fillRect(rx-5,ry-5,10,10)}}
 else if(w==='SALPICÓN'){glow('#4fc3ff','44');g.fillStyle='rgba(180,235,255,.8)';for(let i=0;i<8;i++){const t=(f*.05+i*.125)%1;g.beginPath();g.arc(x+(i-3.5)*H*.1,y-H*.1-t*H*.9,3+(1-t)*3,0,6.3);g.fill()}}
 else if(w==='SHOWMAN'){glow('#ff5cc8','33');g.fillStyle='rgba(255,230,120,.8)';for(let i=0;i<7;i++){const a=f*.06+i*.9,rx=x+Math.cos(a)*H*.45,ry=y-H*.55+Math.sin(a*1.3)*H*.35;g.beginPath();for(let k=0;k<10;k++){const r=k%2?5:12,t=k*.628+f*.05;g.lineTo(rx+Math.cos(t)*r,ry+Math.sin(t)*r)}g.closePath();g.fill()}}
 g.restore()};
/* ---------- tick ---------- */
const _tick=L.tick;L.tick=function(p){_tick.apply(this,arguments);if(!m4(p))return;const w=W(p),B=G.B,c=RCOL[w],n=nw();
 if(p.dv&&D().dashTick)D().dashTick(p);
 if(p.cs&&p.st!=='dunk'&&p.st!=='block'&&p.st!=='steal'&&!p.dv){p.cs=0;const o=opp(p);fxRing(p.x,p.y,c,320,26);fxRing(p.x,p.y,'#fff',200,20);burst(p.x,p.y-30,c,24,11);G.shake=Math.max(G.shake,14);
  if(o&&dist(p,o)<300&&o.st==='idle'&&w!=='CUERVO'){o.st='fall';o.tt=0;o.vx=(o.x>=p.x?1:-1)*8;o.vy=0;pop(o.x,o.y-260,'¡ONDA DE CHOQUE!',c,36)}}
 if(G.mode!=='play')return;
 if(R(p)){if(G.fr%4===0)burst(p.x+(rnd()-.5)*70,p.y-p.z-40-rnd()*160,c,1,4);
  if(w==='COLOSO'&&G.fr%40===0){const o=opp(p);fxRing(p.x,p.y,c,200,18);if(o&&dist(p,o)<190&&o.st==='idle'){o.st='fall';o.tt=0;o.vx=(o.x>=p.x?1:-1)*8;o.vy=0;pop(o.x,o.y-260,'¡APLASTADO!',c,36)}}
  if(w==='GARZA'&&B.fl&&B.h==null&&G.fr%2===0&&B.fl.owner===p)burst(B.x,B.y-B.z,'#ffd23d',2,4)}
 if(w==='GARZA'&&p.gz&&B.fl&&G.fr%2===0)burst(B.x,B.y-B.z,'#ffe45c',2,5)};
})();
