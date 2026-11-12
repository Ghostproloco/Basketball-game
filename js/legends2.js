// ===== Motor de poderes y animaciones de los nuevos legendarios (L2) =====
const L2=(()=>{
const NEW={LADRÓN:1,MAESTRO:1,ALIEN:1,CEREBRO:1,SHOWTIME:1,ATÓMICO:1,REGATE:1,EUROSTEP:1};
Object.assign(RCOL,{LADRÓN:'#ff5a5a',MAESTRO:'#4fa0ff',ALIEN:'#7dff5a',CEREBRO:'#ffd23d',SHOWTIME:'#ff4fd8',ATÓMICO:'#ff8a1a',REGATE:'#46e8ff',EUROSTEP:'#3be08a'});
Object.assign(PWN,{LADRÓN:'MANOS',MAESTRO:'MAGIA',ALIEN:'ALIEN',CEREBRO:'VISIÓN',SHOWTIME:'SHOW',ATÓMICO:'ÁTOMO',REGATE:'MAGO',EUROSTEP:'GRIEGO'});
Object.assign(SKLBL,{MAESTRO:'🔙<br>STEPBACK',ALIEN:'🛸<br>MATE',CEREBRO:'🧠<br>PASE',SHOWTIME:'🎯<br>LOGO',ATÓMICO:'💥<br>EXPLOTA',REGATE:'🌀<br>COMBO',EUROSTEP:'🦌<br>EUROSTEP'});
const W=p=>CH[p.id].pw,mine=p=>NEW[W(p)],R=p=>rageOn(p),pk=a=>a[(rnd()*a.length)|0];
const hoopX=p=>Math.abs(p.x-hoopOf(p).x);
const XV=['spin','behind','between','hesi','snake','double'];
const XVT={spin:'¡GIRO!',behind:'¡POR LA ESPALDA!',between:'¡ENTRE LAS PIERNAS!',hesi:'¡HESITACIÓN!',snake:'¡SERPIENTE!',double:'¡DOBLE GIRO!'};
const L={pw:{},sk:{},
/* ---------- poderes (botón de poder) ---------- */
rage(p){if(W(p)==='ALIEN'){p.alien=1;p.hdo=72;p.euro=0;try{FX.alien(p)}catch(e){}}},
spd(p){let k=1;const w=W(p);if(NEW[w]){if(w==='LADRÓN')k=(p.lad||0)>performance.now()?1.35:1.05;else if(w==='ATÓMICO')k=R(p)?1.3:1.03;else if(w==='ALIEN')k=p.alien?1.12:1;else if(w==='REGATE')k=R(p)?1.14:1.02}
 const o=G&&G.P?opp(p):null;if(o&&mine(o)&&W(o)==='CEREBRO'&&R(o))k*=.88;return k},
/* ---------- dibujo ---------- */
draw(g,p,sc,fn){if(!mine(p)){fn();return}
 const w=W(p),H=210*sc*(CH[p.hdo||p.id].h||1),cy=p.y-p.z-H*.5,a0=g.globalAlpha;let sx=1,sy=1,rot=0,tx=0,tr=0;const d=p.f;
 if(p.alien){sx*=1.1;sy*=1.1;tr=1}
 if(p.st==='cross'&&p.xv){const u=clamp(p.tt/(p.cl||26),0,1);tr=1;
  switch(p.xv){case'spin':sx*=Math.cos(u*6.2832);break;case'double':sx*=Math.cos(u*12.566);break;
   case'behind':sx*=u<.3||u>.7?1:-1;tx=d*Math.sin(u*3.1416)*18;break;
   case'between':rot=d*.2*Math.sin(u*3.1416);sy*=1-.08*Math.sin(u*3.1416);break;
   case'hesi':tx=d*Math.sin(u*3.1416)*-16;sy*=1-.07*Math.sin(u*6.2832);break;
   case'snake':rot=Math.sin(u*18.85)*.12;tx=Math.sin(u*9.4)*10;break}}
 if(p.st==='dunk'){const u=p.tt-p.dk0;if(p.dkind===7&&u>=4&&u<30){sx*=-1;rot=-d*.3;tr=1}
  if(p.es&&u>=-14&&u<18){tx=d*Math.sin((u+14)/32*6.2832)*26;rot=Math.sin((u+14)/32*6.2832)*.14;tr=1}}
 if(p.sbk&&p.st==='cross'){tr=1;rot=-p.dir*.12}
 const trail=p.st==='cross'&&(w==='REGATE'||p.xv)||p.st==='dunk'&&(p.es||p.alien||w==='ATÓMICO'&&R(p))||(w==='ATÓMICO'&&R(p)&&p.mv)||(w==='LADRÓN'&&(p.lad||0)>performance.now())||(w==='MAESTRO'&&p.st==='cross'&&p.sbk&&R(p));
 if(trail){const c=RCOL[w];for(let i=2;i>=1;i--){g.save();g.globalAlpha=a0*.26/i;g.translate(p.x-d*i*20,cy);g.scale(sx,sy);g.rotate(rot);g.translate(-p.x,-cy);g.globalCompositeOperation='lighter';fn();g.restore();void c}}
 if(!tr){fn();return}
 g.save();g.translate(p.x+tx,cy);g.rotate(rot);g.scale(sx,sy);g.translate(-p.x,-cy);fn();g.restore()},
over(g,p,sc){try{MV.over(g,p,sc)}catch(e){}if(!mine(p)||!G||G.mode==='end')return;const w=W(p),H=210*sc*(CH[p.hdo||p.id].h||1),x=p.x,y=p.y-p.z,f=G.fr;
 if(p.alien&&R(p)){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const a=f*.09+i*2.094;g.fillStyle='rgba(125,255,90,.8)';g.beginPath();g.arc(x+Math.cos(a)*H*.32,y-H*.55+Math.sin(a)*H*.12,6*sc/.85,0,7);g.fill()}g.restore()}
 if(w==='ATÓMICO'&&R(p)&&p.mv){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#ff8a1a';g.lineWidth=3;for(let i=0;i<4;i++){const yy=y-H*(.2+i*.18);g.globalAlpha=.5;g.beginPath();g.moveTo(x-p.f*30,yy);g.lineTo(x-p.f*(70+rnd()*30),yy);g.stroke()}g.restore()}
 if(w==='CEREBRO'&&R(p)){g.save();g.font=Math.round(26*sc/.85)+'px sans-serif';g.textAlign='center';g.globalAlpha=.9;g.fillText('🧠',x,y-H-16+Math.sin(f/8)*4);g.restore()}
 if(w==='SHOWTIME'&&R(p)){g.save();g.font=Math.round(24*sc/.85)+'px sans-serif';g.textAlign='center';g.fillText(f%40<20?'✨':'⭐',x+p.f*30,y-H-14);g.restore()}},
/* ---------- por frame ---------- */
tick(p){if(!mine(p))return;const w=W(p),now=performance.now();
 if(p.alien&&!R(p)){p.alien=0;p.hdo=0;fxRing(p.x,p.y,'#7dff5a',260,26);burst(p.x,p.y-90,'#7dff5a',20,9);pop(p.x,p.y-290,'FIN DE LA FORMA ALIEN','#7dff5a',24)}
 if(p.st!=='cross'&&p.xv&&p.st!=='shoot')p.xv=null;
 if(G.mode==='play'){
  if(p.alien&&G.fr%5===0)burst(p.x+(rnd()-.5)*50,p.y-p.z-40-rnd()*150,'#7dff5a',1,3);
  if(w==='ATÓMICO'&&R(p)&&G.fr%4===0)burst(p.x,p.y-p.z-30,'#ff8a1a',1,4);
  /* combo de regates de Kyro: cadena de cruces seguidos */
  if(p.combo>0&&p.st==='idle'&&G.B.h===p){p.cd=0;p.combo--;const dir=p.cmbD=-(p.cmbD||1);doCross(p,dir,rnd()<.5?.4:-.4);
   if(p.combo===0){p.cmbEnd=G.fr+((p.cl||26)+4)}}
  else if(p.combo>0&&G.B.h!==p)p.combo=0;
  if(p.cmbEnd&&G.fr>=p.cmbEnd&&p.st==='idle'){p.cmbEnd=0;const o=opp(p);if(G.B.h===p){if(o&&o.st==='fall'){pop(p.x,p.y-300,'¡LO DEJAS SENTADO!','#46e8ff',40);if(driveable(p)){doDunk(p)}else doShoot(p)}else if(driveable(p)&&rnd()<.5)doDunk(p)}}
  /* onda expansiva al machacar (atómico / alien) */
  if(p.st==='dunk'&&(w==='ATÓMICO'&&(R(p)||p.shk)||p.alien)&&p.tt-p.dk0===22){if(p.alien){try{FX.cracks(p.x,p.y,'#7dff5a',420);FX.fleet(p.y-720,p.dir,'#7dff5a');FX.sparks(p.x,p.y-120,'#7dff5a',30,14)}catch(e){}}G.shake=Math.max(G.shake,22);fxRing(p.x,p.y,RCOL[w],380,34);fxRing(p.x,p.y,'#fff',230,26);burst(p.x,p.y-60,RCOL[w],30,12);for(const q of G.P)if(q.t!==p.t&&dist(q,p)<300&&(q.st==='idle'||q.st==='cross')){q.st='fall';q.tt=0;q.vx=(q.x>=p.x?1:-1)*10;q.vy=0;pop(q.x,q.y-250,'¡BOOM!',RCOL[w],34)}p.shk=0}
  if(p.st==='dunk'&&p.es&&p.tt-p.dk0===20){burst(p.x,p.y-80,'#3be08a',22,10);fxRing(p.x,p.y,'#3be08a',260,26)}
 }},
cross(p){const w=W(p);if(!mine(p))return;
 const big=w==='REGATE',some=w==='MAESTRO'||w==='SHOWTIME'||w==='CEREBRO';
 if(big||(some&&rnd()<.4)){p.xv=pk(XV);if(G.n!==3||p===G.hu||big){pop(p.x,p.y-270,XVT[p.xv],RCOL[w],30)}}
 if(big){const o=opp(p);if(o&&dist(p,o)<320&&(o.st==='idle'||o.st==='cross')&&rnd()<(R(p)?.7:.34+(p.s.reg-60)/300)){o.st='fall';o.tt=0;o.vx=(o.x>=p.x?1:-1)*9;o.vy=0;pop(o.x,o.y-260,'¡TOBILLOS!','#46e8ff',44);G.shake=Math.max(G.shake,10);burst(o.x,o.y-60,'#46e8ff',16,9);fxRing(p.x,p.y,'#46e8ff',230,26);sfx('fall');taunt(p,'ankle')}}},
dunk(p){const w=W(p);if(!mine(p))return;
 if(p.alien){p.dkind=hoopX(p)>420?7:pk([3,4,5,6,7])}
 else if(w==='EUROSTEP'){p.dkind=pk(R(p)?[3,4,5,8,8]:[3,6,8,8]);p.es=p.dkind===8?1:0}
 else if(w==='ATÓMICO'){p.dkind=pk(R(p)?[3,4,6]:[3,6]);p.shk=R(p)?1:0}},
fade(p){const w=W(p);return mine(p)&&(w==='MAESTRO'&&(R(p)||p.sb2)||w==='SHOWTIME'&&p.logo)},
shot(p,pr,three,d,cont){if(!mine(p))return pr;const w=W(p);
 if(w==='EUROSTEP'){if(three||d>620)pr*=.42;else pr-=.03}
 else if(w==='MAESTRO'){pr+=.1+(R(p)?.26:0)+(p.sb2?.16:0)+(three?.05:0)}
 else if(w==='SHOWTIME'){if(three||d>600)pr+=.12;if(R(p))pr+=.14;if(p.logo){pr+=.25;p.logo=0}}
 else if(w==='ALIEN'){pr+=p.alien?.12:.03}else if(w==='CEREBRO'){pr+=R(p)?.1:.02}
 else if(w==='ATÓMICO'||w==='REGATE'){pr+=R(p)?.08:0}
 if(p.sb2)p.sb2=0;return clamp(pr,.03,.98)},
pass(p,t){if(!mine(p))return;const w=W(p),B=G.B;if(w==='CEREBRO'||(R(p)&&(w==='MAESTRO'||w==='SHOWTIME'))){if(B.ps)B.ps.T=Math.max(6,B.ps.T-3);if(t&&(R(p)||w==='CEREBRO')){t.sh=performance.now()+(R(p)?2200:1400);if(p===G.hu||rnd()<.4)pop(p.x,p.y-270,R(p)?'¡PASE MÁGICO!':'¡VISIÓN!',RCOL[w],30)}}},
/* ---------- IA de los nuevos ---------- */
ai(p){if(p.st!=='idle')return;const now=performance.now(),B=G.B,has=B.h===p,o=opp(p),near=dist(p,o),k=(G.diff+1),w=W(p);
 if(w==='LADRÓN'&&(p.lad||0)>now&&B.h&&B.h.t!==p.t&&dist(p,B.h)<250&&rnd()<.05*k){doSteal(p);return}
 if(now>=(p.pwT||0)&&rnd()<.0045*k){if(w==='LADRÓN'&&!(B.h&&B.h.t!==p.t&&dist(p,B.h)<380))return;usePower(p);return}
 if(now>=(p.skT||0)&&L.sk[w]){const pr=.011*k;if(has&&rnd()<pr)useSkill(p);else if(w==='REGATE'&&has&&near<340&&rnd()<pr*2)useSkill(p)}}
};
/* ---------- habilidades (botón de habilidad) ---------- */
const T=(p,s,c)=>pop(p.x,p.y-290,s,c||RCOL[W(p)],38);
const need=(p,has)=>{if(!has){pop(p.x,p.y-260,'NECESITAS EL BALÓN','#aaa',24);return true}return false};
const farDunk=(p,k,txt)=>{if(hoopX(p)>(p.alien&&R(p)?900:780)){pop(p.x,p.y-260,'DEMASIADO LEJOS DEL ARO','#aaa',24);return false}p.kiaR=1;doDunk(p);p.kiaR=0;if(p.st==='dunk'){if(k)p.dkind=k;T(p,txt);G.shake=Math.max(G.shake,10);fxRing(p.x,p.y,RCOL[W(p)],240,24);sfx('legend');return true}return false};
L.sk.MAESTRO=(p,now,B,has)=>{if(need(p,has))return;p.skT=now+8000;doStepback(p);T(p,'¡STEPBACK MAESTRO!');fxRing(p.x,p.y,'#4fa0ff',200,22);sfx('perfect')};
L.sk.ALIEN=(p,now,B,has)=>{if(need(p,has))return;if(farDunk(p,hoopX(p)>420?7:pk([3,4,6,7]),'¡MATE ALIENÍGENA!'))p.skT=now+(p.alien?7000:11000)};
L.sk.CEREBRO=(p,now,B,has)=>{if(need(p,has))return;const t=G.n===3?bestOpen(p):null;p.skT=now+8000;if(t){doPass(p,t);if(G.B.ps){G.B.ps.T=Math.max(6,G.B.ps.T-4);t.sh=now+2600;t.pw=1}T(p,'¡PASE LÁSER!');sfx('perfect')}else{doShoot(p);p.pw=1;T(p,'¡TIRO FRÍO!');sfx('perfect')}};
L.sk.SHOWTIME=(p,now,B,has)=>{if(need(p,has))return;p.skT=now+9000;p.logo=1;doShoot(p);p.pw=1;T(p,'¡DESDE EL LOGO!');fxRing(p.x,p.y,'#ff4fd8',220,22);sfx('perfect')};
L.sk.ATÓMICO=(p,now,B,has)=>{if(need(p,has))return;p.shk=1;if(farDunk(p,6,'¡EXPLOSIÓN ATÓMICA!'))p.skT=now+9000;else p.shk=0};
L.sk.REGATE=(p,now,B,has)=>{if(need(p,has))return;p.skT=now+9000;p.combo=3;p.cmbD=1;T(p,'¡COMBO DE REGATES!');fxRing(p.x,p.y,'#46e8ff',210,22);sfx('swish')};
L.sk.EUROSTEP=(p,now,B,has)=>{if(need(p,has))return;if(farDunk(p,8,'¡EUROSTEP DUNK!')){p.es=1;p.skT=now+9000}};
/* ---------- poderes ---------- */
L.pw.LADRÓN=(p,c)=>{c.cd(14000);p.lad=performance.now()+6000;T(p,'¡MODO LADRÓN! ¡PULSA ROBAR!');flashFx('#ff5a5a');fxRing(p.x,p.y,'#ff5a5a',230,24);sfx('legend')};
const rg=(w,t,ms)=>(p,c)=>{c.cd(ms||18000);rageStart(p,t)};
L.pw.MAESTRO=(p,c)=>{c.cd(18000);rageStart(p,'¡MAGO DEL STEPBACK!');if(G.B.h!==p)return;let n=0,tm=0;const iv=setInterval(()=>{tm+=60;if(!G||G.B.h!==p||tm>5000){clearInterval(iv);return}if(p.st!=='idle'||p.cd>0)return;
 if(n<2){n++;const col=n===1?'#4fa0ff':'#ffd23d';doStepback(p);p.sbk=1;T(p,n===1?'¡STEPBACK!':'¡OTRO MÁS ATRÁS!');G.shake=Math.max(G.shake,14);fxRing(p.x,p.y,col,280,26);fxRing(p.x,p.y,'#fff',160,18);burst(p.x,p.y-60,col,22,11);flashFx(col);sfx('perfect')}
 else{clearInterval(iv);p.sb2=1;p.pw=1;doShoot(p);T(p,'¡DESDE EL LOGO!');fxBeam(p.x,p.y,'#4fa0ff');coinRain&&0;burst(p.x,p.y-100,'#ffd23d',26,12)}},60)};
L.pw.ALIEN=rg('ALIEN','¡FORMA ALIEN!',20000);L.pw.CEREBRO=rg('CEREBRO','¡VISIÓN TOTAL!');
L.pw.SHOWTIME=rg('SHOWTIME','¡SHOWTIME!');L.pw.ATÓMICO=rg('ATÓMICO','¡MODO ATÓMICO!');L.pw.REGATE=rg('REGATE','¡MAGO DEL BALÓN!');L.pw.EUROSTEP=rg('EUROSTEP','¡FUERZA GRIEGA!');
/* Yanis (Eurostep): rango de mate ampliado siempre */
const _mk=mkP;mkP=function(){const q=_mk.apply(this,arguments);try{if(CH[q.id].pw==='EUROSTEP')q.euro=1}catch(e){}return q};
return L})();
