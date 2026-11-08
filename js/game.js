// ===== Motor del juego 1 vs 1 =====
const LW=2576,LH=1438,HOOP=[{x:366,y:1090},{x:2210,y:1090}],RIM_Z=298,BASE=.85;
const RA=[0,1,2,3,4,5,6,7].map(i=>'RA'+i),SPR=[0,1,2,3,4,5,6,7].map(i=>'RB'+i),RUN=[...RA,...SPR],
IDB=['ID1','ID2','ID4','ID2'],HOLD=['ID1','ID2','ID4','ID2'],NIDLE=['ID0','ID3','IH1','ID3'],DSH=['DS0','DS1','DS2','DS1'],WALKB=['WR1','WR2','WR3','WR5','WL0','WL1','WL3','WL4','WL5'],WALKALL=['WR0','WR1','WR2','WR4','WR5','WL0','WL1','WL2','WL4','WL5'],
XS=[[['CR0',5],['CR1',6],['CR2',7],['CR1',6],['CR0',5]],[['CR0',4],['BB0',8],['BB1',8],['CR2',6],['CR1',5]],[['CR1',5],['SP0',9],['BB1',6],['SP0',6],['CR2',5],['CR0',5]]],XL=XS.map(q=>q.reduce((a,b)=>a+b[1],0)),CEL=['CE0','CE1','CE3','CE2'];
(function(){const q=WALKALL;for(let i=0;i<q.length;i++){const f=FR[q[i]];if(f.ball)continue;let a=null,b=null;
 for(let k=1;k<q.length&&!a;k++){const g=FR[q[(i-k+q.length)%q.length]];if(g.ball)a=g.ball}
 for(let k=1;k<q.length&&!b;k++){const g=FR[q[(i+k)%q.length]];if(g.ball)b=g.ball}
 f.ball=[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2]}})();
const LGP={"WR0":[-28.0,-3.8],"WR1":[-29.0,-20.6],"WR2":[-25.0,-21.7],"WR4":[-30.0,-14.5],"WR5":[-31.0,-16.9],"WL0":[-22.0,6.2],"WL1":[-23.0,2.5],"WL2":[-22.0,-4.6],"WL4":[-29.0,-7.7],"WL5":[-22.0,-5.8],"RA0":[-41.0,-49.6],"RA1":[-40.0,-53.2],"RA2":[-44.0,-50.1],"RA3":[-40.0,-52.1],"RA4":[-44.0,-50.2],"RA5":[-40.0,-47.3],"RA6":[-37.0,-59.0],"RA7":[-38.0,-53.1],"RB0":[-45.0,-39.5],"RB1":[-47.0,-40.9],"RB2":[-48.0,-43.9],"RB3":[-47.0,-38.1],"RB4":[-44.0,-41.6],"RB5":[-46.0,-44.4],"RB6":[-46.0,-44.3],"RB7":[-47.0,-39.4]};
function drawLegs(g,hx,hy,cy,gt,sk){const A=[28,40,44][gt],H=[8,14,18][gt],L=-hy+12,L1=L*.52,L2=L*.6,px=hx,py=hy-10;
 g.lineCap=g.lineJoin='round';
 for(const i of[1,0]){const s=(cy+i*.5)%1;let fx,fy;
  if(s<.55){fx=A*(1-2*s/.55);fy=0}else{const t=(s-.55)/.45;fx=-A+2*A*t;fy=-H*Math.sin(Math.PI*t)}
  const tx=hx+fx,ty=fy-6,dx=tx-px,dy=ty-py,d=Math.min(Math.hypot(dx,dy),(L1+L2)*.985),an=Math.atan2(dy,dx);
  const ca=Math.max(-1,Math.min(1,(L1*L1+d*d-L2*L2)/(2*L1*d))),a=Math.acos(ca);
  const kx=px+L1*Math.cos(an-a),ky=py+L1*Math.sin(an-a),ax=px+d*Math.cos(an),ay=py+d*Math.sin(an);
  g.beginPath();g.moveTo(px,py);g.lineTo(kx,ky);g.lineTo(ax,ay);
  g.strokeStyle='#2a1620';g.lineWidth=14;g.stroke();g.strokeStyle=sk;g.lineWidth=9.5;g.stroke();
  if(i){g.strokeStyle='rgba(0,0,0,.28)';g.stroke()}
  g.save();g.translate(ax,ay);g.rotate(Math.max(-.5,Math.min(.5,(fy<0?-.25:.1)+(s>.45&&s<.55?.3:0))));
  g.fillStyle='#1d1a40';g.beginPath();g.roundRect(-9,-6,27,13,5);g.fill();
  g.fillStyle=i?'#3b3a86':'#4a49a8';g.beginPath();g.roundRect(-7.5,-5,24,8,4);g.fill();
  g.fillStyle='#f2f2f2';g.fillRect(-8,4,26,2.5);g.restore()}}
const CYL=[WALKALL,RA,SPR].map(q=>{let bi=0,by=-1e9;q.forEach((n,i)=>{const b=FR[n].ball;if(b&&b[1]>by){by=b[1];bi=i}});return(bi+.5)/q.length});
const isShaq=p=>CH[p.id].pw==='TITÁN',isLeb=p=>CH[p.id].pw==='CORONA',isCur=p=>CH[p.id].pw==='REY 3PT',boostOn=p=>(p.bst||0)>performance.now(),
stealRes=h=>(isShaq(h)?.3:1)*(boostOn(h)?.3:1)*(ghostOn(h)?.1:1)*((h.nst||0)>performance.now()?.25:1),
SKLBL={'REY 3PT':'🔙<br>STEPBACK','CORONA':'👑<br>MEJORA','TITÁN':'💥<br>SMASH','MURALLA':'🗼<br>TORRE','PÓSTER':'🚗<br>VUELO','FANTASMA':'⚡<br>TORMENTA','JOKER':'🤠<br>SOMBRERO','REBOTE':'🌈<br>REBOTE','CANDADO':'🔒<br>CANDADO'};
const PWN={FANTASMA:'RAYO'};
const isYao=p=>CH[p.id].pw==='MURALLA',isBlake=p=>CH[p.id].pw==='PÓSTER',isSga=p=>CH[p.id].pw==='FANTASMA',isJok=p=>CH[p.id].pw==='JOKER',isRod=p=>CH[p.id].pw==='REBOTE',isWal=p=>CH[p.id].pw==='CANDADO',
towerOn=p=>(p.twr||0)>performance.now(),ghostOn=p=>(p.gho||0)>performance.now(),rebOn=p=>(p.reb||0)>performance.now(),lockOn=p=>(p.lck||0)>performance.now(),
lockedBy=p=>!!G&&G.P.some(q=>q.t!==p.t&&lockOn(q)&&dist(q,p)<460);
const cv=$('#gameCanvas'),ctx=cv.getContext('2d');
let S=1,offY=0,dpr=1;
function resize(){dpr=Math.min(2.5,devicePixelRatio||1);cv.width=Math.round(innerWidth*dpr);cv.height=Math.round(innerHeight*dpr)}
addEventListener('resize',resize);resize();
const IM={};
function loadImgs(){return Promise.all(['stadium.jpg','stad1.jpg','stad2.jpg','body.png','jersey.png','skin.png','heads.png','ball.png'].map(n=>new Promise(r=>{const i=new Image();i.onload=()=>r();i.onerror=()=>r();i.src='assets/'+n;IM[n.split('.')[0]]=i})))}
// ---- sprites ----
const mkc=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const skinCache={};
function skinOf(id){if(skinCache[id])return skinCache[id];let col='#d9a070';
 try{const c=mkc(HM.cw,HM.ch),g=c.getContext('2d');g.drawImage(IM.heads,(id%HM.cols)*HM.cw,((id/HM.cols)|0)*HM.ch,HM.cw,HM.ch,0,0,HM.cw,HM.ch);
  const d=g.getImageData(HM.ax-15,HM.ay-50,30,22).data,R=[],G=[],B=[];
  for(let i=0;i<d.length;i+=4){if(d[i+3]<200)continue;const m=(d[i]+d[i+1]+d[i+2])/3;if(m<80||m>240||d[i]<d[i+1])continue;R.push(d[i]);G.push(d[i+1]);B.push(d[i+2])}
  const md=a=>a.sort((x,y)=>x-y)[a.length>>1];if(R.length>20)col=`rgb(${md(R)},${md(G)},${md(B)})`}catch(e){}
 return skinCache[id]=col}
const tintCache=new Map();
function tinted(jc,sc){const key=jc+'|'+sc;let c=tintCache.get(key);if(c)return c;
 const W=IM.body.width,H=IM.body.height;c=mkc(W,H);const x=c.getContext('2d');x.drawImage(IM.body,0,0);
 for(const[img,col]of[[IM.jersey,jc],[IM.skin,sc]]){const t=mkc(W,H),tx=t.getContext('2d');tx.drawImage(img,0,0);tx.globalCompositeOperation='multiply';tx.fillStyle=col;tx.fillRect(0,0,W,H);tx.globalCompositeOperation='destination-in';tx.drawImage(img,0,0);x.drawImage(t,0,0)}
 if(tintCache.size>7)tintCache.delete(tintCache.keys().next().value);tintCache.set(key,c);return c}
function gaitOf(ph,ratio,an){if(ratio>0)return{z:0,rot:.5+.8*Math.min(1.2,ratio),sx:1,sy:1};return{z:0,rot:0,sx:1,sy:1+.014*Math.sin(an*.09)}}
function ballImg(g,cx,cy,r){g.drawImage(IM.ball,cx-r,cy-r,2*r,2*r)}
const lrp=(a,b,u)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u],RIG_ST=['idle','shoot','dunk','block','steal','shove','cross','win','lose','fall'];
function rigBall(p){const t=p.tt;
 if(p.st==='shoot')return t<8?lrp([30,-60],[20,-52],t/8):t<18?lrp([20,-52],[14,-118],(t-8)/10):t<30?lrp([14,-118],[26,-140],(t-18)/12):[26,-140];
 if(p.st==='dunk'){const u=t-p.dk0,k=p.dkind,top=k?[46,-156]:[34,-146];if(k===3&&u>=6&&u<14)return[-6,-162];if(k===6&&u>=2&&u<22){const a=(u-2)/20*6.2832;return[14+44*Math.sin(a),-128-38*Math.cos(a)]}if(k===4&&u>=3&&u<20){const a=(u-3)/17*6.2832;return[10+34*Math.sin(a),-125-30*Math.cos(a)]}return u<0?[30,-62]:u<5?lrp([30,-62],[20,-96],u/5):u<12?lrp([20,-96],[14,-140],(u-5)/7):u<20?lrp([14,-140],top,(u-12)/8):top}
 return null}
function rigOf(p,dr){const t=p.tt,B=G.B,s=p.st,o={hat:hatOf(p),pat:p.pat,pc:p.pc,big:boostOn(p)?1.16:1,tall:towerOn(p)?1.28:1,mv:p.mv,gait:p.gait||0,cy:p.cyc||0,an:p.an,ball:B.h===p,dr,def:!!B.h&&B.h!==p&&!p.mv};
 const pose=(ln,cr,h0,h1,f,b,run)=>{o.ps={ln,cr,h:[h0,h1],f,b};if(run){o.mv=true;o.gait=2;o.cy=(t/14)%1;o.ps.f=null}};
 if(p.gd&&s==='idle'&&G.B.h&&G.B.h!==p){const w=p.mv?5*Math.sin(p.an*.45):0;pose(.12,10,[48,-104+5*Math.sin(p.an*.2)],[-26,-96],[[16+w,0],[-14-w,0]],null)}
 else if(s==='shoot'){const b=rigBall(p),c=t<8?10*t/8:t<18?10*(1-(t-8)/10):0,hd=t<30;
  pose(p.fade?-.32:(p.hook||p.lay)?.3:CH[p.id].pw==='CORONA'?-.26:p.pw?-.2:.04,c,hd?[b[0]+6,b[1]+9]:[30,t<44?-150:-70],hd?[b[0]-10,b[1]+13]:[22,t<44?-142:-70],t>4&&t<44?(p.fade?[[20,-16],[-24,0]]:[[10,-7],[-8,-4]]):null,b)}
 else if(s==='dunk'){const u=t-p.dk0,b=rigBall(p),k=p.dkind||0;
  if(u<0)pose(.3,0,[b[0]+4,b[1]+2],[8,-70],null,b,1);
  else{const hg=u>=20;pose(u<5?.15:u<14?-.04:.2,u<5?12*u/5:0,hg?[b[0]+4,b[1]+14]:[b[0]+6,b[1]+9],k===1?[-16,-128]:hg?[-10,-120]:[b[0]-10,b[1]+13],k>2?[[26,-24],[-18,-12]]:[[22,-17],[-14,-7]],b);if(k===5&&u>=4&&u<30)o.ps.sx=Math.cos(6.2832*(u-4)/26)}}
 else if(s==='block'){const up=t>5;pose(up?-.03:.1,up?0:8,up?[22,-180]:[34,-92],up?[8,-174]:[26,-96],up?[[8,-6],[-6,-4]]:null)}
 else if(s==='steal')pose(.28,8,[50+14*Math.sin(t*.5),-62],[-6,-58],[[18,0],[-10,0]]);
 else if(s==='shove')pose(.22,6,[50,-82],[44,-90],[[14,0],[-12,0]]);
 else if(s==='win'){const v=p.id%4,j=Math.sin(t*.25);
  if(v===0)pose(-.05,0,[28,-165+8*j],[10,-165-8*j],null);else if(v===1)pose(.05,0,[20,-124],[-6,-124],[[10,0],[-10,0]]);
  else if(v===2)pose(.1,0,[40,-170],[-4,-60],null);else pose(0,4+3*j,[12,-86+6*j],[-2,-86-6*j],[[8,0],[-8,0]])}
 else if(s==='lose')pose(.35,6,[14,-36],[-2,-36],[[8,0],[-8,0]]);
 else if(s==='fall'){const th=t<12?.7*t/12:t<28?.7+.75*(t-12)/16:t<112?1.45:t<134?1.45-.95*(t-112)/22:.5*(1-(t-134)/12);pose(0,0,[26,-52],[14,-44],[[16,-10],[-4,-4]],null);o.ps.rot=Math.max(0,th)}
 else if(s==='cross'){const u=t/(p.cl||30),k=p.vk|0,TW=6.2832,c=Math.cos(TW*u),lo=-23-16*(.5+.5*Math.cos(TW*2*u));
  let b,f=null,cr=0,ln=.12,run=0,h1=[-4,-66],h0=null;
  if(k===0){b=[24+20*c,lo];run=1;ln=.12+.1*Math.sin(TW*u)}
  else if(k===1){b=[34-60*Math.sin(Math.PI*u),-23-10*Math.sin(Math.PI*u)];f=[[20,0],[-18,0]];cr=8;ln=.2}
  else if(k===2){b=[-24,-62+8*Math.cos(TW*2*u)];h1=[-22,b[1]+4];h0=[20,-66];run=1}
  else if(k===3){b=[30,-62];run=1}
  else if(k===5){b=[36,-34+6*Math.sin(TW*3*u)];run=1;cr=10;ln=.34;h1=[26,-86]}
  else if(k===6){b=[30,-40+8*Math.sin(TW*2*u)];run=1;cr=8;ln=.42;h1=[36,-94]}
  else if(k===7){b=[10+32*Math.sin(TW*2*u),-30-10*Math.abs(Math.sin(TW*2*u))];f=[[16,0],[-16,0]];cr=9;ln=.1+.1*Math.sin(TW*u)}
  else if(k===8){b=[34-16*u,-60];f=[[22*(1-u),0],[-18-10*u,-10*Math.sin(Math.PI*u)]];cr=6;ln=-.2;h1=[-8,-70]}
  else if(k===9){b=[34+10*Math.sin(TW*3*u),-30-14*Math.abs(Math.sin(TW*3*u))];f=[[18,0],[-18,0]];cr=10;ln=.15;h1=[20,-80]}
  else if(k===10){b=[26,-50+30*Math.sin(TW*2*u)];run=1;cr=8;ln=.2;h1=[-6,-70]}
  else{b=[30,lo];f=[[12,0],[-12,0]];cr=12*Math.sin(Math.PI*u);ln=.2-.25*u}
  pose(ln,cr,h0||[b[0]-2,b[1]-18],h1,f,b,run);if(k===3)o.ps.sx=c}
 return o}
function drawRigFig(g,x,y,sc,flip,col,hid,o){
 const hh=CH[hid].h||1,wd=(CH[hid].wd||1)*(o.big||1)*Math.pow(o.tall||1,.6),hv=(1+((o.big||1)-1)*.45)*(o.tall||1),sk=skinOf(hid),OL='#1a1020',mv=o.mv,gt=o.gait,cy=o.cy,TW=6.2832,A=[20,28,32][gt],H=[8,14,18][gt],cr=o.ps?o.ps.cr:o.def?10:0;
 const bob=o.ps?0:mv?[2.5,5,6][gt]*Math.abs(Math.sin(cy*TW)):1.2*Math.sin(o.an*.07);
 const ln=o.ps?o.ps.ln:mv?[.07,.18,.3][gt]:(o.ball?.1:o.def?.14:.02),cs=Math.cos(ln),sn=Math.sin(ln),hy=-56+cr-bob;
 const rot=(a,b)=>[a*cs-b*sn,hy+a*sn+b*cs];
 g.save();g.translate(x,y);g.scale(flip*sc*1.1*hh*wd,sc*1.1*hh*hv);if(o.ps&&o.ps.sx!=null)g.scale(o.ps.sx,1);if(o.ps&&o.ps.rot){g.translate(-10*Math.sin(o.ps.rot),-12*Math.sin(o.ps.rot));g.rotate(-o.ps.rot)}g.lineCap=g.lineJoin='round';
 const line=(p,w,c)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)g.lineTo(p[i][0],p[i][1]);g.lineWidth=w;g.strokeStyle=c;g.stroke()};
 const limb=(p,w,c)=>{line(p,w+4,OL);line(p,w,c)};
 const leg=i=>{let fx,fy,s=0;
  if(o.ps&&o.ps.f){fx=o.ps.f[i][0];fy=o.ps.f[i][1]}else if(mv){s=(cy+i*.5)%1;if(s<.55){fx=A*(1-2*s/.55);fy=0}else{const t=(s-.55)/.45;fx=-A+2*A*t;fy=-H*Math.sin(Math.PI*t)}}
  else{fx=(i?-1:1)*(o.def?17:8);fy=0}
  const px=i?-2:2,py=hy+6,L=27,dx=fx-px,dy=fy-5-py,d=Math.min(Math.hypot(dx,dy),2*L*.985),an=Math.atan2(dy,dx),a=Math.acos(d/(2*L));
  const l={px,py,kx:px+L*Math.cos(an-a),ky:py+L*Math.sin(an-a),ax:px+d*Math.cos(an),ay:py+d*Math.sin(an),fy};
  limb([[l.px,l.py],[l.kx,l.ky],[l.ax,l.ay]],10,sk);if(i)line([[l.px,l.py],[l.kx,l.ky],[l.ax,l.ay]],10,'rgba(0,0,0,.25)');
  const ux=l.kx-l.ax,uy=l.ky-l.ay,m=Math.hypot(ux,uy)||1;limb([[l.ax,l.ay],[l.ax+ux/m*11,l.ay+uy/m*11]],10,'#f4f4f4');
  g.save();g.translate(l.ax,l.ay);g.rotate(l.fy<0?-.3:.05);g.fillStyle='#f4f4f4';g.strokeStyle=OL;g.lineWidth=2.5;g.beginPath();g.roundRect(-8,-7,26,12,5);g.fill();g.stroke();g.fillStyle=col;g.fillRect(-2,-3,12,4);g.restore()};
 const S=rot(2,-37),dr=o.dr||[1,0],by=-23-37*dr[0],bx=30+dr[1]*(1-dr[0])+ln*25;
 const arm=i=>{let E,W;
  if(o.ps&&o.ps.h||i===0&&o.ball){const hh=o.ps&&o.ps.h?o.ps.h[i]:[bx-2,by-21],tx=hh[0],ty=hh[1],dx=tx-S[0],dy=ty-S[1],d=Math.min(Math.hypot(dx,dy),43),an=Math.atan2(dy,dx),a=Math.acos(d/44);
   E=[S[0]+22*Math.cos(an+a),S[1]+22*Math.sin(an+a)];W=[S[0]+d*Math.cos(an),S[1]+d*Math.sin(an)]}
  else{let al,bd;
   if(mv){const sw=[.45,.8,.95][gt];al=(i?1:-1)*Math.sin(cy*TW)*sw+.1;bd=[.3,1.2,1.4][gt]}
   else if(o.def){al=i?-.7:.9;bd=.3}else{al=i?-.15:.15;bd=.25}
   E=[S[0]+22*Math.sin(al),S[1]+22*Math.cos(al)];W=[E[0]+20*Math.sin(al+bd),E[1]+20*Math.cos(al+bd)]}
  limb([S,E,W],8,sk);limb([S,[S[0]+(E[0]-S[0])*.5,S[1]+(E[1]-S[1])*.5]],11,col);
  g.fillStyle=sk;g.strokeStyle=OL;g.lineWidth=2.5;g.beginPath();g.arc(W[0],W[1],5.5,0,7);g.fill();g.stroke()};
 arm(1);leg(1);leg(0);
 g.save();g.translate(0,hy);g.rotate(ln);g.lineWidth=2.5;g.strokeStyle=OL;
 g.beginPath();g.moveTo(-14,2);g.lineTo(14,2);g.lineTo(17,-38);g.quadraticCurveTo(0,-45,-17,-38);g.closePath();g.fillStyle=col;g.fill();jPat(g,o.pat,o.pc,1);g.stroke();
 g.beginPath();g.roundRect(-16,-4,32,20,6);g.fillStyle=col;g.fill();g.fillStyle='rgba(0,0,0,.28)';g.fill();jPat(g,o.pat,o.pc,0);g.stroke();
 g.fillStyle='#fff';g.fillRect(-15,12,30,3);g.restore();
 const N=rot(0,-42);g.save();g.translate(N[0],N[1]+2);g.rotate(ln*.3);g.scale(.7/hh/wd,.7/hh/hv);
 g.drawImage(IM.heads,(hid%HM.cols)*HM.cw,((hid/HM.cols)|0)*HM.ch,HM.cw,HM.ch,-HM.ax,-HM.ay,HM.cw,HM.ch);if(o.hat!=null)drawHatCell(g,o.hat,hid);g.restore();
 if(o.ball){const pb=o.ps&&o.ps.b;g.save();g.translate(pb?pb[0]:bx,pb?pb[1]:by);g.scale(1/wd,1/hv);ballImg(g,0,0,23/hh);g.restore()}
 arm(0);g.restore()}
function drawFig(g,fn,x,y,sc,flip,col,hid,ball,bpos,gt,dr,cyp){
 const f=FR[fn];g.save();g.translate(x,y-(gt?gt.z*sc:0));if(gt&&gt.rot)g.rotate(gt.rot*flip*Math.PI/180);const kk=f.k||1;g.scale(flip*sc*kk*(gt?gt.sx:1),sc*kk*(gt?gt.sy:1));
 const lg=cyp&&LGP[fn];if(lg){drawLegs(g,lg[1],lg[0],cyp[0],cyp[1],skinOf(hid));g.save();g.beginPath();g.rect(f.ox-4,f.oy-4,f.w+8,lg[0]-f.oy+4);g.clip();g.drawImage(tinted(col,skinOf(hid)),f.sx,f.sy,f.w,f.h,f.ox,f.oy,f.w,f.h);g.restore()}else g.drawImage(tinted(col,skinOf(hid)),f.sx,f.sy,f.w,f.h,f.ox,f.oy,f.w,f.h);
 const bb=ball?(bpos||f.ball):null,back=fn==='LU1'&&false;
 g.save();g.translate(f.chin[0],f.chin[1]);g.rotate(f.rot*Math.PI/180);g.scale(f.hs,f.hs);
 g.drawImage(IM.heads,(hid%HM.cols)*HM.cw,((hid/HM.cols)|0)*HM.ch,HM.cw,HM.ch,-HM.ax,-HM.ay,HM.cw,HM.ch);g.restore();
 if(bb){let by=bb[1],bx=bb[0];if(dr!=null){const fl=-bb[2];by=fl+(bb[1]-fl)*dr[0];bx+=dr[1]*(1-dr[0])}ballImg(g,bx,by,bb[2])}g.restore()}
// ---- helpers de UI ----
const figC={};
function figImg(id,col){col=col||CH[id].jc;const k=id+'|'+col;if(figC[k])return figC[k];const c=mkc(176,196),g=c.getContext('2d');
 drawRigFig(g,88,192,.72,1,col,id,{mv:false,gait:0,cy:0,an:0,ball:false,dr:null,def:false});return figC[k]=c.toDataURL()}
const portrait=(id,sc=1,col)=>`<div class="hd" style="background-image:url(${figImg(id,col)});background-size:100% 100%;${sc!=1?`transform:scale(${sc});transform-origin:top left;`:''}"></div>`;
function hudPortrait(el,id,col){el.style.backgroundImage=`url(${figImg(id,col)})`;el.style.backgroundRepeat='no-repeat';el.style.backgroundSize='auto 190%';el.style.backgroundPosition='50% 6%'}
const prevs=[];
function mountPreviews(root){root.querySelectorAll('canvas[data-id]').forEach(c=>{if(!prevs.find(p=>p.c===c))prevs.push({c,id:+c.dataset.id,col:c.dataset.col})});drawPreviews()}
let pf=0;function drawPreviews(){pf++;for(let i=prevs.length-1;i>=0;i--){const p=prevs[i];if(!p.c.isConnected){prevs.splice(i,1);continue}if(!p.c.offsetParent)continue;
 const g=p.c.getContext('2d');g.clearRect(0,0,300,300);const ph=pf*.3;drawRigFig(g,150,285,.95,1,p.col,p.id,{mv:true,gait:1,cy:(ph*.07)%1,an:pf,ball:true,dr:[Math.abs(Math.cos(ph*.45)),6]})}}
setInterval(drawPreviews,95);
function statBars(s){return SK.map(k=>`<div class="stat"><b>${SN[k]}</b><i><u style="width:${Math.min(100,Math.round(s[k]/1.35))}%"></u></i><span>${Math.round(s[k]*DS)}</span></div>`).join('')}
function cardHTML(id,o,col,extra=''){const c=CH[id],R=RAR[c.rar],s=statsOf(id,o.lvl,o.st,o.mul||1);
 return `<div class="pcard" style="--rc:${R.c}"><div class="ovr">${ovrOf(s)}<small>OVR</small></div><canvas width="300" height="300" data-id="${id}" data-col="${col||c.jc}"></canvas>
 <div class="nm">${c.name}</div><div class="rr">★ ${R.k} · ${c.pos} · ${PWN[c.pw]||c.pw} · ${c.title||ARN[c.arch]}</div><div class="lv">${'★'.repeat(o.st)}${'☆'.repeat(MAXST-o.st)} <small>${o.st}/${MAXST}</small></div>${statBars(s)}${extra}</div>`}
// ---- audio ----
let AC=null;function sfx(t){if(!save.snd||!cfgv('sfx'))return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const T={bounce:[[180,.05,'square',.04]],swish:[[880,.08,'triangle',.08],[1320,.12,'triangle',.08]],dunk:[[110,.2,'sawtooth',.12],[70,.3,'square',.1]],steal:[[500,.06,'square',.06],[300,.1,'square',.06]],fall:[[260,.1,'sawtooth',.07],[120,.25,'sawtooth',.07]],buzz:[[140,.7,'sawtooth',.14]],block:[[300,.05,'square',.1],[160,.15,'square',.08]],card:[[600,.08,'triangle',.08],[900,.12,'triangle',.08],[1200,.2,'triangle',.08]],legend:[[523,.12,'square',.08],[659,.12,'square',.08],[784,.12,'square',.08],[1047,.4,'square',.1]],perfect:[[1200,.06,'triangle',.09],[1600,.1,'triangle',.09]]}[t]||[];
 let at=AC.currentTime;for(const[f,d,w,v]of T){const o=AC.createOscillator(),g=AC.createGain();o.type=w;o.frequency.value=f;g.gain.setValueAtTime(v,at);g.gain.exponentialRampToValueAtTime(.0001,at+d);o.connect(g);g.connect(AC.destination);o.start(at);o.stop(at+d);at+=d*.8}}catch(e){}}
// ---- entrada ----
const IN={x:0,y:0},K={};let TURBO=false;const jb=$('#joystick-base'),js=$('#joystick-stick');let jid=null;
function jmove(e){const r=jb.getBoundingClientRect();let dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,d=Math.hypot(dx,dy),m=r.width*.42;if(d>m){dx*=m/d;dy*=m/d}js.style.transform=`translate(${dx}px,${dy}px)`;IN.x=dx/m;IN.y=dy/m}
jb.addEventListener('pointerdown',e=>{jid=e.pointerId;jb.setPointerCapture(jid);jmove(e)});jb.addEventListener('pointermove',e=>{if(e.pointerId==jid)jmove(e)});
const jend=e=>{if(e.pointerId==jid){jid=null;IN.x=IN.y=0;js.style.transform=''}};jb.addEventListener('pointerup',jend);jb.addEventListener('pointercancel',jend);
for(const[id,k]of[['a','A'],['b','B'],['c','C']])$('#btn-'+id).addEventListener('pointerdown',e=>{e.preventDefault();act(k)});
const bt=$('#btn-t');bt.addEventListener('pointerdown',e=>{e.preventDefault();TURBO=true;bt.classList.add('hold')});
for(const ev of['pointerup','pointercancel','pointerleave'])bt.addEventListener(ev,()=>{TURBO=false;bt.classList.remove('hold')});
addEventListener('keydown',e=>{if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;if(K[e.code])return;K[e.code]=1;if(e.code=='KeyJ'||e.code=='Space')act('A');if(e.code=='KeyK')act('B');if(e.code=='KeyL')act('C');if(e.code=='KeyU')act('P');if(e.code=='KeyY')act('X')});$('#btn-x').addEventListener('pointerdown',e=>{e.preventDefault();act('X')});
$('#btn-p').addEventListener('pointerdown',e=>{e.preventDefault();act('P')});const gb=$('#btn-g'),gset=v=>{if(G&&G.hu)G.hu.gd=v;gb.style.filter=v?'brightness(1.6)':''};gb.addEventListener('pointerdown',e=>{e.preventDefault();gset(true)});['pointerup','pointercancel','pointerleave'].forEach(ev=>gb.addEventListener(ev,()=>gset(false)));addEventListener('keydown',e=>{if(e.code=='KeyH')gset(true)});addEventListener('keyup',e=>{if(e.code=='KeyH')gset(false)});$('#btn-q').addEventListener('pointerdown',e=>{e.preventDefault();act('Q')});$('#btn-s').addEventListener('pointerdown',e=>{e.preventDefault();act('S')});addEventListener('keydown',e=>{if(e.code=='KeyI')act('Q');if(e.code=='KeyO')act('S')});setInterval(()=>{try{if(G&&G.P){const p=G.hu,b=$('#btn-p');b.textContent=CH[p.id].pw;b.style.opacity=performance.now()<(p.pwT||0)?.4:1}}catch(e){}},300);addEventListener('keyup',e=>K[e.code]=0);
function humanIn(){const x=(K.KeyD||K.ArrowRight?1:0)-(K.KeyA||K.ArrowLeft?1:0),y=(K.KeyS||K.ArrowDown?1:0)-(K.KeyW||K.ArrowUp?1:0);return[x||IN.x,y||IN.y]}
// ---- partida ----
let G=null;const persp=y=>(y-108)/1042,scl=p=>BASE*persp(p.y);
const SKL=[{spd:.88,steal:.006,block:.012,cross:.6,stat:.82,sb:0,turbo:0,perf:.08},{spd:1,steal:.011,block:.02,cross:1,stat:1,sb:0,turbo:.5,perf:.18},{spd:1.03,steal:.019,block:.04,cross:1.5,stat:1.15,sb:.1,turbo:1,perf:.32}];
const xr=y=>{const m=Math.max(40,390-1.13*(y-955)+10);return[m,LW-m]};
const patOf=col=>{const h=[...col].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);return[0,0,0,1,2,3,4,5,6,7][h%10]};
const pcOf=col=>{const[r,g,b]=hexRgb(col),l=r*.3+g*.59+b*.11,f=l>140?(v=>Math.round(v*.35)):(v=>Math.round(v+(255-v)*.75));return'#'+[r,g,b].map(f).map(v=>v.toString(16).padStart(2,'0')).join('')};
function jPat(g,pat,pc,tor){if(!pat||!pc)return;g.save();g.clip();g.fillStyle=pc;g.strokeStyle=pc;
 if(tor){switch(pat){case 1:for(let y=-44;y<4;y+=10)g.fillRect(-20,y,40,5);break;
  case 2:for(let x=-18;x<18;x+=9)g.fillRect(x,-46,4.5,50);break;
  case 3:g.lineWidth=10;g.beginPath();g.moveTo(-18,-42);g.lineTo(18,-2);g.stroke();break;
  case 4:g.fillRect(0,-46,20,50);break;
  case 5:g.fillRect(-20,-30,40,9);break;
  case 6:for(let x=-17;x<18;x+=5)g.fillRect(x,-46,1.8,50);break;
  case 7:{const gr=g.createLinearGradient(0,-45,0,2);gr.addColorStop(0,pc);gr.addColorStop(1,pc+'00');g.fillStyle=gr;g.fillRect(-20,-46,40,50);break}}}
 else{if(pat===1||pat===5||pat===7)g.fillRect(-16,12,32,4);else{g.fillRect(-16,-4,4,20);g.fillRect(12,-4,4,20)}}
 g.restore()}
function mkP(t,id,lvl,st,mul,col){const s=statsOf(id,lvl,st,mul);
 return{t,id,col,s,name:CH[id].name,x:0,y:0,z:0,vx:0,vy:0,f:t?-1:1,dir:t?-1:1,st:'idle',tt:0,cd:0,an:0,mv:false,spd:(4.5+s.vel*.04)*(CH[id].pw==='TITÁN'?.82:1),ph:0,ratio:0,stam:100,tired:false,sprint:false,slow:0,ct:0,aiTurbo:false,pat:patOf(col),pc:pcOf(col),gs:{pts:0,reb:0,ast:0,stl:0,blk:0,dnk:0,tpm:0,fgm:0,fga:0}}}
function startMatch(diff,rv){
 const me=save.owned[save.sel],mc=CH[save.sel].jc,rc=rv.col||rivalColor(mc,CH[rv.id].jc);
 const a=mkP(0,save.sel,me.lvl,me.st,1,mc),b=mkP(1,rv.id,rv.lvl,rv.st,SKL[diff].stat,rc);
 G={P:[a,b],hu:a,B:{h:null,fl:null,dk:null,net:false,x:0,y:0,z:0,vx:0,vy:0,vz:0,last:null,pcd:0},s:[0,0],t:120,mode:'intro',mt:170,diff,rv,fx:[],fr:0,poss:0,sd:false,shake:0,rc,mc,cam:-1};
 hudPortrait($('#hpL'),a.id,mc);hudPortrait($('#hpR'),b.id,rc);$('#nL').textContent=a.name;$('#nR').textContent=b.name;
 $('.hp.l').style.setProperty('--cl',mc);$('.hp.r').style.setProperty('--cr',rc);$('#sL').textContent=$('#sR').textContent=0;
 $('#hud').classList.remove('hidden');$('#controls').classList.remove('hidden');musicPlay('match');restart(0)}
const opp=p=>{let b=null,bd=1e9;for(const q of G.P)if(q.t!==p.t){const d=dist(p,q);if(d<bd){bd=d;b=q}}return b};
const SLOTPOS=[['PG','SG'],['SF','SG'],['PF','C']],SLOTN=['BASE','ALERO','PÍVOT'];
function pickHu(){const B=G.B,h=G.hu;if(B.h&&B.h.t===0){if(h!==B.h&&!G.noSw){h.gd=false;G.hu=B.h}return}
 if(h.st!=='idle'&&h.st!=='cross')return;const tg=B.h||{x:B.x,y:B.y};let best=h,bd=dist(h,tg)-70;
 for(const q of G.P)if(q.t===0&&q!==h&&q.st==='idle'){const d=dist(q,tg);if(d<bd){bd=d;best=q}}if(best!==h){h.gd=false;G.hu=best}}
function switchHu(){if(G.n!==3)return;const B=G.B,tg=B.h||{x:B.x,y:B.y};let best=null,bd=1e9;for(const q of G.P)if(q.t===0&&q!==G.hu&&q.st==='idle'){const d=dist(q,tg);if(d<bd){bd=d;best=q}}if(best){G.hu.gd=false;G.hu=best;G.noSw=0;sfx('card')}}
function bestOpen(p){let b=null,bs=-1;for(const q of G.P)if(q.t===p.t&&q!==p){let m=1e9;for(const o of G.P)if(o.t!==p.t)m=Math.min(m,dist(o,q));if(m>bs){bs=m;b=q}}return b}
function choosePass(p){const[ix,iy]=p===G.hu?humanIn():[0,0],m=Math.hypot(ix,iy);if(m>.3){let b=null,bs=-9;for(const q of G.P)if(q.t===p.t&&q!==p){const dx=q.x-p.x,dy=q.y-p.y,s=(dx*ix+dy*iy)/((Math.hypot(dx,dy)||1)*m);if(s>bs){bs=s;b=q}}return b}return bestOpen(p)}
function doPass(p,t){const B=G.B;if(G.n!==3||B.h!==p||p.st!=='idle'||p.cd>0)return;t=t||choosePass(p);if(!t)return;B.h=null;B.ps={t:0,T:Math.max(8,Math.round((14+(dist(p,t)/60|0))*clamp(1-(p.s.pas-70)/300,.72,1.15))),x0:p.x+p.f*30,y0:p.y,z0:70,tgt:t,from:p};B.x=B.ps.x0;B.y=p.y;B.z=70;p.cd=16;p.f=t.x>=p.x?1:-1;if(isJok(p)){pop(p.x,p.y-260,'¡SIN MIRAR!','#e6c86a',32);t.sh=performance.now()+1500;B.ps.T=Math.max(7,B.ps.T-3)}sfx('bounce')}
function ai3(p){const B=G.B,h=hoopOf(p),sk=SKL[G.diff],guy=B.h,SP=[[520,-190],[520,190],[240,0]][p.sl];p.aiTurbo=false;p.gd=false;
 const rot=(G.fr/260|0)+p.sl,SPS=[[600,-250],[600,250],[330,0],[480,-130],[480,130],[700,0],[260,-170],[260,170]];
 const spot=()=>{const k=SPS[(p.sl*3+rot)%SPS.length];return[h.x-p.dir*k[0],clamp(h.y+k[1],1030,1315)+Math.sin(G.fr/50+p.sl*2)*30]};
 const go=(tx,ty)=>{const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);return d<14?[0,0]:[dx/Math.max(1,d)*Math.min(1,d/90),dy/Math.max(1,d)*Math.min(1,d/90)]};
 const oD=q=>{let m=1e9;for(const o of G.P)if(o.t!==q.t)m=Math.min(m,dist(o,q));return m};
 if(guy===p){const o=opp(p);
  if(p.ask&&p.cd===0&&p.st==='idle'){const a=p.ask;p.ask=null;if(a.st!=='fall'){doPass(p,a);return[0,0]}}
  if(p.cd===0&&p.st==='idle'){const m=bestOpen(p);if(m&&((dist(p,o)<260&&oD(m)>260)||(dist(m,hoopOf(p))<340&&oD(m)>200))&&rnd()<.04*(1+G.diff*.3)){doPass(p,m);return[0,0]}}
  return ai1(p,o)}
 if(guy&&guy.t===p.t){
  if((p.cut||0)>G.fr){const g2=hoopOf(p);return go(g2.x-p.dir*150,g2.y+(p.sl===1?100:-100))}
  if(p.sl!==2&&rnd()<.004&&dist(p,guy)>220)p.cut=G.fr+75;
  const s=spot();p.aiTurbo=Math.hypot(s[0]-p.x,s[1]-p.y)>420;return go(s[0],s[1])}
 if(guy){if(G.P[(guy.t?0:3)+guy.sl]===p)return ai1(p,guy);const m=G.P[(p.t?0:3)+p.sl],g=hoopOf(m);
  if(p.cd===0&&(guy.st==='shoot'&&guy.tt>=6&&guy.tt<=26||guy.st==='dunk')&&dist(p,guy)<260&&rnd()<sk.block*3)doBlock(p);
  const gh=hoopOf(guy);if(dist(guy,gh)<400&&dist(m,gh)>380&&G.P.filter(q=>q.t===p.t&&dist(q,gh)<300).length<2)return go(gh.x+(guy.x-gh.x)*.35,gh.y+(guy.y-gh.y)*.35);
  p.gd=dist(p,m)<220;return go(m.x+(g.x-m.x)*.3,m.y+(g.y-m.y)*.3)}
 if(B.ps){const s=spot();return p===B.ps.tgt?[0,0]:go(s[0],s[1])}
 const air=B.fl||B.rim||B.dk,mates=G.P.filter(q=>q.t===p.t);
 if(air){const hh=B.last?hoopOf(B.last):h,sd=hh.x<LW/2?1:-1,order=mates.slice().sort((a,b)=>Math.hypot(a.x-hh.x,(a.y-hh.y)*1.6)-Math.hypot(b.x-hh.x,(b.y-hh.y)*1.6)),r=order.indexOf(p);
  if(r<2||p.sl===2)return go(hh.x+sd*(80+r*55),hh.y+(r?70:-40));const s=spot();return go(s[0],s[1])}
 const ord=mates.slice().sort((a,b)=>dist(a,B)-dist(b,B));
 if(G.mode==='play'&&ord.indexOf(p)<2){p.aiTurbo=dist(p,B)>300;return go(B.x,B.y)}
 const s=spot();return go(s[0],s[1])}
function restart3(t){G.poss++;const od=t?-1:1;for(const p of G.P){p.st='idle';p.tt=0;p.z=0;p.vx=p.vy=0;p.cd=20;p.slow=0}
 for(const p of G.P){const k=p.sl,off=p.t===t;p.x=LW/2-od*(170+60*k)+(off?0:od*210);p.y=(off?[1170,1090,1260]:[1235,1150,1310])[k];p.f=off?od:-od}
 const o=G.P[t*3],B=G.B;B.fl=B.dk=B.ps=null;B.net=false;B.rim=null;B.h=o;B.last=null;B.pcd=0;G.noSw=0;G.hu=t===0?o:(G.hu||G.P[0])}
function startMatch3(){const L=(save.lineup||lineupAuto()).slice(),used=new Set(L.filter(i=>i>=0)),tm=TEAMS[curTeam],P=[];
 const own=k=>{let id=L[k];if(id>=0&&save.owned[id])return{id,lvl:save.owned[id].lvl,st:save.owned[id].st};let pool=CH.filter(c=>c.rar==0&&SLOTPOS[k].includes(c.pos)&&!used.has(c.id)&&!c.hide);if(!pool.length)pool=CH.filter(c=>!used.has(c.id)&&!c.hide);const c=pool[rnd()*pool.length|0];used.add(c.id);return{id:c.id,lvl:1,st:0}};
 const mine=[0,1,2].map(own),mc=CH[mine[0].id].jc,rc=rivalColor(mc,tm.col),al=Math.max(1,Math.round(mine.reduce((a,m)=>a+m.lvl,0)/3));
 mine.forEach((m,k)=>{const q=mkP(0,m.id,m.lvl,m.st,1,mc);q.sl=k;P.push(q)});
 tm.ids.forEach((id,k)=>{const q=mkP(1,id,al,0,1,rc);q.sl=k;P.push(q)});
 G={P,n:3,hu:P[0],B:{h:null,fl:null,dk:null,ps:null,net:false,x:0,y:0,z:0,vx:0,vy:0,vz:0,last:null,pcd:0},s:[0,0],t:150,mode:'intro',mt:170,diff:1,rv:tm,fx:[],fr:0,poss:0,sd:false,shake:0,rc,mc,cam:-1};
 hudPortrait($('#hpL'),P[0].id,mc);hudPortrait($('#hpR'),P[3].id,rc);$('#nL').textContent='TU EQUIPO';$('#nR').textContent=tm.name;
 $('.hp.l').style.setProperty('--cl',mc);$('.hp.r').style.setProperty('--cr',rc);$('#sL').textContent=$('#sR').textContent=0;
 $('#hud').classList.remove('hidden');$('#controls').classList.remove('hidden');musicPlay('match');restart(0)}
const rageOn=p=>(p.rage||0)>performance.now(),RCOL={'TITÁN':'#b266ff','CORONA':'#ffd23d','REY 3PT':'#ff6a1a','MURALLA':'#ff3b3b','PÓSTER':'#3b8bff','FANTASMA':'#7fe8ff','JOKER':'#e6c86a','REBOTE':'#ff4fd8','CANDADO':'#8aa0c0'};
const blkP=(p,o,b)=>rageOn(p)?rnd()<clamp((o.s.def-80)/110,0,.4):(o.pw2||towerOn(o)||rnd()<b);
function flashFx(c){const f=$('#flash');if(!f)return;f.style.background=`radial-gradient(circle,${c}00 30%,${c}cc 100%)`;f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}
function rageStart(p,txt){const c=RCOL[CH[p.id].pw]||'#ffffff';p.rage=performance.now()+9000;G.shake=26;flashFx(c);msg(txt,90);burst(p.x,p.y-80,c,30,12);pop(p.x,p.y-300,txt,c,40);sfx('perfect');taunt(p,'rage');G.slow=60;cinematic(p);const w=CH[p.id].pw;fxRing(p.x,p.y,c,320);setTimeout(()=>{if(G)fxRing(p.x,p.y,'#fff',460,40)},150);fxBeam(p.x,p.y,c);if(w==='TITÁN')for(let i=0;i<8;i++)fxBolt(p.x+(rnd()-.5)*320,p.y+(rnd()-.5)*40,c);if(w==='CORONA')coinRain(p.x,p.y-60);if(w==='REY 3PT'){burst(p.x,p.y-60,'#ff6a1a',40,14);burst(p.x,p.y-60,'#ffd23d',26,10)}}
function drawAura(g,p,sc){const t=G.fr,w=CH[p.id].pw,col=RCOL[w]||'#ffffff',hh=CH[p.id].h||1,H=210*sc*hh,x=p.x,y=p.y-p.z;g.save();g.globalCompositeOperation='lighter';const r=Math.max(2,H*.62*(1+.08*Math.sin(t*.3))),gr=g.createRadialGradient(x,y-H*.45,5,x,y-H*.45,r);gr.addColorStop(0,col+'99');gr.addColorStop(1,col+'00');g.fillStyle=gr;g.beginPath();g.ellipse(x,y-H*.45,r*.8,r,0,0,7);g.fill();g.restore();
 if(w==='CORONA'){g.save();g.font=Math.round(46*sc*hh)+'px serif';g.textAlign='center';g.fillText('👑',x,y-H*1.04+Math.sin(t*.2)*4*sc);g.restore()}}
const TP={
ankle:['¡Te dejé en el suelo!','¿Dónde estás? ¡Aquí no!','Ata los cordones, campeón','Eso fue un tobillo roto','Te mareé con un solo toque','Sigue buscándome…','¡Cuidado con las rodillas!','Me debes unas zapatillas','Qué lento eres, hermano','¡Ni lo viste venir!','Eso fue arte callejero','¡Pídele ayuda a tu mamá!'],
score:['¡Esta cancha es mía!','Fácil, otra más','¡Anótalo en tu libreta!','Sin sudar','¡Qué calidad!','Aquí mando yo','Dos puntos al bolsillo','Ni mirando fallo','¡A casa con esa!','Te lo dije, soy el mejor','¡Siguiente!','Siéntate y mira'],
three:['¡Desde el barrio!','¡Más lejos, más bonito!','Red, solo red','¡Lluvia de triples!','Dime que no es de 3…','¡Ni tocó el aro!','Mi muñeca no falla','¡Cuenta tres, mi amigo!','¡Desde el parking!','Fría como el hielo'],
dunk:['¡Cuidado con el aro!','¡Te pasé por encima!','Esto es altura, no suerte','¡Rompe-aros!','¡Aquí no se pasa!','¡Mira desde abajo!','Vuelo directo','¡Con furia!','Sin visa para entrar','El aro tiembla'],
block:['¡Aquí no pasa nada!','¡Vete de aquí!','¡Prohibido anotar!','Fuera de mi casa','¡No en mi cancha!','¡Rechazado!','Devuélvelo al remitente','¡Puerta cerrada!','¡Nada de eso!','Hoy no, amigo'],
steal:['¡Mía, gracias!','¡Manos de seda!','Se te cayó, tranquilo','¡Qué descuido!','Lo tomé prestado','¡Con permiso!','¡Robo en la calle!','Te lo devuelvo… nunca','¡Pillado!','Ojo con la pelota'],
rage:['¡MODO FURIA!','¡Ahora sí van a sufrir!','¡Nadie me para!','¡Siente el poder!','¡Esto se acaba YA!','¡Desatado!']};
const TL={'TITÁN':['¡Soy el Coloso!','¡Quítense del camino!','¡Nadie me para!','¡El aro es mío!'],'CORONA':['¡El Rey está en casa!','¡Mírenme, soy el Rey!','¡Inclínense ante el Rey!'],'REY 3PT':['¡Desde donde quiera!','¡El Chef está cocinando!','¡Buenas noches!','¡Chapuzón!'],'MURALLA':['¡Nadie pasa!','¡Muralla de jade!','¡Aquí mando yo!'],'PÓSTER':['¡Al póster!','¡Salto sobre todos!','¡Vuelo bajo cero!'],'FANTASMA':['¡Rayo!','¡Los electrizo!','¡Imposible pararme!'],'JOKER':['¡Sombrero!','¡Sin mirar!','¡Magia pura!'],'REBOTE':['¡Mío el rebote!','¡Locura total!','¡Todo es mío!'],'CANDADO':['¡Candado puesto!','¡No pasa nadie!','¡Defensa de acero!']};
function taunt(p,ev){if(!G||(G.tc||0)>G.fr||!cfgv('taunt'))return;const t=$('#taunt');if(!t)return;let a=TP[ev];const w=CH[p.id].pw;if(TL[w]&&rnd()<.45)a=TL[w];G.tc=G.fr+150;
 t.className=p.t===0?'L':'R';t.innerHTML=`<img src="${figImg(p.id,p.col)}"><div><b>${CH[p.id].name}</b><span>${a[rnd()*a.length|0]}</span></div>`;void t.offsetWidth;t.classList.add('on');clearTimeout(taunt.o);taunt.o=setTimeout(()=>t.classList.remove('on'),2300)}
function shotClock(){const B=G.B;if(G.sc==null)G.sc=16;
 if(B.h){if((G.loose||0)>20||B.h.t!==G.scT){G.sc=16;G.scT=B.h.t}G.loose=0;
  if(B.h.st==='idle'||B.h.st==='cross'){G.sc-=1/60;if(G.sc<=0){const h=B.h;sfx('buzz');msg('¡TIEMPO DE POSESIÓN!',80);pop(h.x,h.y-260,'RELOJ','#f66',44);G.sc=16;G.scT=-1;inbound(1-h.t)}}}else G.loose=(G.loose||0)+1}
function inbound(t){G.poss++;G.sc=16;G.scT=-1;const dT=t?-1:1,hd=HOOP[t?1:0],bx=hd.x-dT*170,YS=[1090,1010,1250];
 for(const p of G.P){p.st='idle';p.tt=0;p.z=0;p.vx=p.vy=0;p.cd=20;p.slow=0}
 G.P.forEach(p=>{const k=G.n===3?p.sl:0;if(p.t===t){p.x=k?bx+dT*340:bx;p.y=YS[k];p.f=dT}else{p.x=LW/2+dT*(230+90*k);p.y=YS[k];p.f=-dT}});
 const o=G.n===3?G.P[t*3]:G.P[t],B=G.B;B.fl=B.dk=B.ps=null;B.net=false;B.rim=null;B.h=o;B.last=null;B.pcd=0;G.noSw=0;if(G.n===3)G.hu=t===0?o:(G.hu||G.P[0])}
function startTip(){G.mode='tip';G.mt=140;const B=G.B;B.h=null;B.fl=B.dk=B.ps=null;B.net=false;B.rim=null;B.vx=B.vy=B.vz=0;msg('¡SALTO INICIAL!',70);
 G.tipP=G.n===3?[G.P[2],G.P[5]]:[G.P[0],G.P[1]];
 for(const p of G.P){p.st='idle';p.tt=0;p.z=0;p.vx=p.vy=0;p.mv=false;p.gd=false}
 G.P.forEach(p=>{if(G.tipP.includes(p)){p.x=LW/2+(p.t?60:-60);p.y=1150;p.f=p.t?-1:1}else{const k=G.n===3?p.sl:0;p.x=LW/2+(p.t?1:-1)*(260+70*k);p.y=[1060,1250,1320][k%3];p.f=p.t?-1:1}})}
function tipTick(){const B=G.B,m=G.mt--;B.x=LW/2;B.y=1150;B.z=m>90?(140-m)*6:Math.max(70,300-(90-m)*3);
 if(m===100)for(const q of G.tipP){q.st='block';q.tt=0}
 if(m===55){const sc=q=>(q.s.mat*.5+q.s.def*.5)*(CH[q.id].h||1)+rnd()*12,w=sc(G.tipP[0])>=sc(G.tipP[1])?G.tipP[0]:G.tipP[1];G.tipW=w;pop(w.x,w.y-260,'¡GANA EL SALTO!','#ffe45c',44);msg(CH[w.id].name+' gana el salto',60);sfx('swish')}
 if(m<=0){const w=G.tipW||G.tipP[0];G.mode='play';initTimers();restart(w.t);msg('¡YA!',40);return}
 for(const q of G.tipP)if(q.st==='block')stepP(q)}
const fxRing=(x,y,c,r1=260,T=34)=>G.fx.push({k:'ring',x,y,t:0,T,c,r1});
const fxBolt=(x,y,c)=>{const pts=[[0,0]];let px=0,py=0;for(let i=0;i<7;i++){px+=(rnd()-.5)*46;py-=60+rnd()*40;pts.push([px,py])}G.fx.push({k:'bolt',x,y,t:0,T:14,c,pts})};
const fxBeam=(x,y,c)=>G.fx.push({k:'beam',x,y,t:0,T:46,c});
const coinRain=(x,y)=>{for(let i=0;i<26;i++)G.fx.push({k:'p',x:x+(rnd()-.5)*320,y:y-rnd()*160,vx:(rnd()-.5)*3,vy:rnd()*2,t:0,T:50+rnd()*20,c:i%3?'#ffd23d':'#fff3a0',sz:12+rnd()*8})};
function cinematic(p){const e=$('#cine');if(!e)return;e.style.setProperty('--c',RCOL[CH[p.id].pw]||'#ffffff');e.innerHTML=`<img src="${figImg(p.id,CH[p.id].jc)}"><div><small>${CH[p.id].title||''}</small><b>${CH[p.id].pw}</b></div>`;e.classList.remove('on');void e.offsetWidth;e.classList.add('on')}
function legendFx(p,kind,pts){if(!rageOn(p))return;const w=CH[p.id].pw,c=RCOL[w],h=hoopOf(p);
 if(w==='TITÁN'&&kind=='dunk'){fxRing(h.x,h.y,c,430);fxRing(h.x,h.y,'#fff',300);for(let i=0;i<7;i++)fxBolt(h.x+(rnd()-.5)*380,h.y,c)}
 else if(w==='CORONA'){fxBeam(h.x,h.y,c);coinRain(h.x,h.y-300);fxRing(h.x,h.y,c,300)}
 else if(w==='REY 3PT'){burst(h.x,792,'#ff6a1a',44,14);burst(h.x,792,'#ffd23d',26,10);fxRing(h.x,h.y,c,320);if(pts==3)coinRain(h.x,h.y-300)}}
const MUS={tr:'menu',step:0,next:0,timer:null,gain:null,nb:null};
function musCtx(){AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(!MUS.gain){MUS.gain=AC.createGain();MUS.gain.gain.value=1.25;const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=9000;const cp=AC.createDynamicsCompressor();MUS.gain.connect(lp);lp.connect(cp);cp.connect(AC.destination)}return AC}
const mN=m=>440*Math.pow(2,(m-69)/12);
function mTone(t,m,d,ty,v){const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.value=mN(m);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(MUS.gain);o.start(t);o.stop(t+d+.05)}
function mNoise(t,d,f,v,type){if(!MUS.nb){const b=AC.createBuffer(1,AC.sampleRate*.5,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;MUS.nb=b}const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=MUS.nb;fl.type=type;fl.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(MUS.gain);s.start(t);s.stop(t+d+.02)}
function mKick(t,v){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.28);o.connect(g);g.connect(MUS.gain);o.start(t);o.stop(t+.3)}
const CHORDS=[[57,60,64,67],[53,57,60,64],[50,53,57,60],[52,56,59,62]],ROOTS=[33,29,26,28],PENT=[69,72,74,76,79,81];
function musStep(s,t){const m=MUS.tr==='match',bar=(s>>4)&3,st=s&15,ch=CHORDS[bar],hype=!!(G&&G.P&&G.P.some(rageOn));
 if((m?[0,4,8,10,12]:[0,7,10]).includes(st))mKick(t,.9);
 if(st===4||st===12){mNoise(t,.16,1800,.5,'bandpass');mTone(t,52,.1,'triangle',.25)}
 if(st%2===0||m)mNoise(t,.04,8000,st%4===2?.22:.12,'highpass');
 if([0,3,6,10,12,14].includes(st)||(m&&st%2===0))mTone(t,ROOTS[bar]+(st===14?12:0),.22,'sawtooth',.2);
 if(st===0||st===6||(m&&(st===8||st===14)))for(const n of ch)mTone(t,n,m?.22:.5,'triangle',.07);
 if((m||hype)&&st%2===1)mTone(t,ch[(st>>1)%4]+12,.12,'square',.05);
 if(st%4===2&&Math.random()<(m?.7:.5))mTone(t,PENT[(Math.random()*PENT.length)|0]+(hype?12:0),.28,'sine',.12);
 if(hype&&st%4===0)mTone(t,ch[0]+24,.25,'sawtooth',.06)}
function musicPlay(tr){if(!save.snd||!cfgv('mus')){musicStop();return}try{musCtx();if(AC.state==='suspended')AC.resume()}catch(e){return}if(tr)MUS.tr=tr;if(MUS.timer)return;MUS.step=0;MUS.next=AC.currentTime+.08;
 MUS.timer=setInterval(()=>{if(!AC)return;const dt=60/(MUS.tr==='match'?108:92)/4;while(MUS.next<AC.currentTime+.18){musStep(MUS.step,MUS.next);MUS.next+=dt;MUS.step++}},30)}
function musicStop(){clearInterval(MUS.timer);MUS.timer=null}
document.addEventListener('pointerdown',()=>{if(save.snd)musicPlay(MUS.tr);else if(AC&&AC.state==='suspended')AC.resume()});
function restart(t){if(G.n===3)return restart3(t);const o=G.P[t],d=G.P[1-t];G.poss++;
 for(const p of G.P){p.st='idle';p.tt=0;p.z=0;p.vx=p.vy=0;p.cd=20;p.slow=0}
 o.x=LW/2-o.dir*170;o.y=1170;d.x=o.x+o.dir*210;d.y=1235;o.f=o.dir;d.f=-o.dir;
 const B=G.B;B.fl=B.dk=null;B.net=false;B.rim=null;B.h=o;B.last=null;B.pcd=0}
function msg(t,f=60){const m=$('#msg');m.textContent=t;m.classList.add('on');clearTimeout(msg.o);msg.o=setTimeout(()=>m.classList.remove('on'),f*16)}
function pop(x,y,txt,c='#ffe45c',s=64){G.fx.push({k:'t',x,y,t:0,T:70,txt,c,s})}
function burst(x,y,c,n=14,sp=9){for(let i=0;i<n;i++){const a=rnd()*6.28,v=sp*(.3+rnd());G.fx.push({k:'p',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,t:0,T:30+rnd()*20,c})}}
const dist=(a,b)=>Math.hypot(a.x-b.x,(a.y-b.y)*1.6);
const hoopOf=p=>HOOP[p.dir>0?1:0];
const dunkable=p=>{const h=hoopOf(p);return Math.abs(p.x-h.x)<(rageOn(p)||isShaq(p)?400:280)&&Math.abs(p.y-h.y)<170};
const driveable=p=>{const h=hoopOf(p);return Math.abs(p.x-h.x)<(p.kiaR?780:rageOn(p)?520:isShaq(p)?560:430)&&Math.abs(p.y-h.y)<(isShaq(p)?240:210)};
// frameOf -> [frame, ballAnchored, ballPos]
function frameOf(p){const hb=G.B.h===p,a=p.an,t=p.tt;
 switch(p.st){
  case'shoot':return t<8?['LU0',hb]:t<18?['LU1',hb]:t<32?['LU2',hb]:t<44?['LU1',0]:['DF0',0];
  case'dunk':{if(t<p.dk0)return[SPR[(a/3|0)%8],hb];const u=t-p.dk0;return u<8?['LU0',hb]:u<22?['LU1',hb]:u<38?['LU2',hb]:u<52?['LU1',0]:['DF0',0]}
  case'steal':return[t<16?'DF1':'DF0',0];
  case'shove':return['DF1',0];
  case'block':return['LU1',0];
  case'cross':{const q=XS[p.ck];let a2=t;for(const[n,d]of q){if(a2<d)return[n,hb];a2-=d}return[q[q.length-1][0],hb]}
  case'fall':return t<12?['E1',0]:t<28?['E2',0]:t<80?['E3',0]:t<112?['E4',0]:t<122?['E3',0]:t<134?['DZ0',0]:['DZ1',0];
  case'win':return[CEL[(t/22|0)%4],0];case'lose':return[(t/24|0)%2?'TR1':'TR0',0]}
 if(p.mv){const c=p.cyc||0,g=p.gait||0;if(g===2)return[SPR[(c*8|0)%8],hb];if(g===1)return[(hb?RA:SPR)[(c*8|0)%8],hb];return[WALKALL[(c*WALKALL.length|0)%WALKALL.length],hb]}
 if(hb){const o=opp(p);if(dist(p,o)<230)return[HOLD[(a/14|0)%4],1];return[IDB[(a/8|0)%4],1]}
 if(G.B.h&&G.B.h!==p)return[DSH[(a/14|0)%4],0];
 return[NIDLE[(a/16|0)%4],0]}
function ballScreen(p){if(p.st==='shoot'||p.st==='dunk'){const r=rigBall(p),k=scl(p)*1.1*(CH[p.id].h||1);return[p.x+p.f*r[0]*k,p.y-p.z+r[1]*k]}const[fn,bf,bp]=frameOf(p),f=FR[fn],b=bp||f.ball,sc=scl(p)*(f.k||1);if(!b)return[p.x,p.y-p.z-120*sc];return[p.x+p.f*b[0]*sc,p.y-p.z+b[1]*sc]}
// ---- acciones ----
function act(k){if(!G||G.mode!=='play')return;const p=G.hu,B=G.B;if(k==='S')return switchHu();if(p.frz>0)return;if(k==='X')return useSkill(p);if(k==='Q')return doPass(p);if(k==='P')return usePower(p);
 if(p.st==='shoot'&&k==='A'&&B.h===p&&p.tt>=8&&p.tt<=38){release(p,p.tt);return}
 if(p.st==='dunk'&&k==='A'&&B.h===p&&!p.dkind&&p.lt==null&&p.tt-p.dk0>=0&&p.tt-p.dk0<20){p.lt=p.tt-p.dk0+10;return}
 if(p.st!=='idle')return;
 if(k==='A'){if(B.h===p)doShoot(p);else if(B.h&&B.h.t!==p.t)doSteal(p);else if(B.h&&B.h!==p){B.h.ask=p;pop(p.x,p.y-260,'¡PASA!','#7ff',30)}}
 else if(k==='B'){if(B.h===p)doDunk(p);else doBlock(p)}
 else if(B.h===p)doCross(p,...humanIn());}
function usePower(p){const now=performance.now();if(p.st!=='idle')return;if(now<(p.pwT||0)){if(p===G.hu)pop(p.x,p.y-260,'RECARGANDO','#aaa',30);return}
 const w=CH[p.id].pw,o=opp(p),has=G.B.h===p,dd=dist(p,o),tx=(s,c='#ffe45c')=>pop(p.x,p.y-270,s,c,38),cd=ms=>p.pwT=now+ms,fall=()=>{o.st='fall';o.tt=0;o.vx=-p.dir*6};
 switch(w){
 case'TITÁN':{const B=G.B,h=hoopOf(p);if(!has&&!B.dk&&(B.fl||B.z>30)&&Math.abs(p.x-h.x)<520){cd(12000);rageStart(p,'¡PUTBACK TITÁN!');const f=B.fl,rm=B.rim;B.fl=null;B.rim=null;B.h=p;doDunk(p);if(p.st!=='dunk'){B.h=null;B.fl=f;B.rim=rm}else{p.dkind=5;B.x=p.x;B.y=p.y}}else{cd(16000);rageStart(p,'¡MODO TITÁN!')}break}
 case'CORONA':cd(16000);rageStart(p,'¡CORONA DEL REY!');break;
 case'MURALLA':case'PÓSTER':case'FANTASMA':case'JOKER':case'REBOTE':case'CANDADO':cd(16000);rageStart(p,{MURALLA:'¡MURALLA DE JADE!',PÓSTER:'¡PÓSTER VOLADOR!',FANTASMA:'¡MODO RAYO!',JOKER:'¡EL JOKER!',REBOTE:'¡REBOTE LOCO!',CANDADO:'¡DEFENSA DE ACERO!'}[w]);break;
 case'REY 3PT':cd(16000);rageStart(p,'¡3 POINT KING!');if(has){doShoot(p);p.pw=1}break;
 case'TURBO':{const s0=p.spd;p.spd=s0*1.4;p.stam=100;cd(9000);setTimeout(()=>p.spd=s0,2500);tx('¡TURBO!','#7fff9f');break}
 case'CRUCE':if(!has)return;cd(10000);if(dd<320){fall();taunt(p,'ankle');tx('¡TOBILLOS!','#ffb347')}else tx('¡CRUCE!','#ffb347');doCross(p,p.dir,0);break;
 case'STEPBACK':case'RAYO':if(!has)return;cd(9000);doShoot(p);p.pw=1;tx(w==='STEPBACK'?'¡STEPBACK!':'¡TIRO RAYO!');sfx('perfect');break;
 case'FUEGO':cd(14000);p.fire=3;tx('¡EN LLAMAS! x3','#ff8a3d');break;
 case'ESCUDO':cd(12000);p.sh=now+5000;tx('¡ESCUDO! (sin marca)','#7ff');break;
 case'TOMAHAWK':case'CAÑON':if(!has||!driveable(p)){pop(p.x,p.y-260,'CERCA DEL ARO CON BALÓN','#aaa',24);return}cd(10000);doDunk(p);p.dkind=w==='TOMAHAWK'?3:4;if(w==='CAÑON'&&dd<320)fall();tx('¡'+w+'!','#ff7a7a');break;
 case'MURO':if(has&&driveable(p)){cd(10000);doDunk(p);p.dkind=5;tx('¡360 SMASH!','#ff7a7a')}else if(!has){cd(9000);p.pw2=1;setTimeout(()=>p.pw2=0,1400);doBlock(p);tx('¡MURO!','#7ff')}break;
 case'TERREMOTO':cd(14000);if(dd<380){if(!has)stolen(p,o);else fall()}tx('¡TERREMOTO!','#ffb347');G.shake=14;break}}
function useSkill(p){const now=performance.now(),B=G.B,has=B.h===p;if(p.st!=='idle'||p.frz>0)return;
 if(now<(p.skT||0)){if(p===G.hu)pop(p.x,p.y-260,'RECARGANDO','#aaa',30);return}
 const tx=(s,c)=>pop(p.x,p.y-290,s,c,38);
 if(isCur(p)){if(!has){pop(p.x,p.y-260,'NECESITAS EL BALÓN','#aaa',24);return}p.skT=now+9000;p.chef=G.fr+150;doStepback(p);tx('¡STEPBACK!','#6fdcff')}
 else if(isLeb(p)){p.skT=now+25000;startBoost(p)}
 else if(isShaq(p)){if(!has||!driveable(p)){pop(p.x,p.y-260,'CERCA DEL ARO CON BALÓN','#aaa',24);return}p.skT=now+15000;doDunk(p);if(p.st==='dunk'){p.dkind=5;p.mega=1;megaStart(p);tx('¡SMASH TITÁN!','#b266ff')}}
 else if(isYao(p)){p.skT=now+22000;p.twr=now+8000;G.shake=14;flashFx('#ff3b3b');pop(p.x,p.y-300,'¡TORRE!','#ff3b3b',46);pop(p.x,p.y-255,'BLOQUEA TODO','#fff',26);fxRing(p.x,p.y,'#ff3b3b',340,34);fxRing(p.x,p.y,'#ffd23d',220,26);fxBeam(p.x,p.y,'#ff3b3b');sfx('legend')}
 else if(isBlake(p)){if(!has){pop(p.x,p.y-260,'NECESITAS EL BALÓN','#aaa',24);return}p.kiaR=1;const okk=driveable(p);p.kiaR=0;if(!okk){pop(p.x,p.y-260,'MUY LEJOS','#aaa',30);return}
  p.skT=now+14000;p.kiaR=1;doDunk(p);p.kiaR=0;if(p.st==='dunk'){p.kia=1;p.dkind=3;G.shake=12;pop(p.x,p.y-300,'¡SALTO VOLADOR!','#3b8bff',44);fxRing(p.x,p.y,'#3b8bff',300,30);burst(p.x,p.y,'#ff7a1a',24,11);sfx('perfect')}else p.skT=0}
 else if(isSga(p)){p.skT=now+20000;stormStart(p)}
 else if(isJok(p)){if(!has){pop(p.x,p.y-260,'NECESITAS EL BALÓN','#aaa',24);return}p.skT=now+10000;p.jk=1;p.hat=G.fr+170;pop(p.x,p.y-300,'¡SOMBRERO!','#e6c86a',42);fxRing(p.x,p.y,'#e6c86a',220,24);doShoot(p)}
 else if(isRod(p)){p.skT=now+20000;p.reb=now+8000;G.shake=12;flashFx('#ff4fd8');pop(p.x,p.y-300,'¡REBOTE LOCO!','#ff4fd8',44);fxRing(p.x,p.y,'#ff4fd8',320,30);fxRing(p.x,p.y,'#46e0ff',210,24);burst(p.x,p.y-80,'#ffd23d',24,10);sfx('legend');const hd=B.h;if(hd&&hd.t!==p.t&&dist(hd,p)<300&&(hd.st==='idle'||hd.st==='cross'))stolen(p,hd)}
 else if(isWal(p)){p.skT=now+22000;p.lck=now+7000;G.shake=10;flashFx('#8aa0c0');pop(p.x,p.y-300,'¡CANDADO!','#8aa0c0',44);pop(p.x,p.y-255,'DEFENSA DE ACERO','#fff',24);fxRing(p.x,p.y,'#8aa0c0',320,30);sfx('legend')}}
function aiSkill(p){if(p.st!=='idle'||performance.now()<(p.skT||0)||p.frz>0)return;const B=G.B,has=B.h===p,o=opp(p),near=dist(p,o);
 if(isCur(p)&&has&&near<240&&rnd()<.012*(G.diff+1))useSkill(p);
 else if(isLeb(p)&&rnd()<.0015*(G.diff+1)&&(has||(B.h&&B.h.t===p.t)))useSkill(p);
 else if(isShaq(p)&&has&&driveable(p)&&rnd()<.04*(G.diff+1))useSkill(p);
 else if(isYao(p)&&B.h&&B.h.t!==p.t&&dist(p,B.h)<450&&rnd()<.012*(G.diff+1))useSkill(p);
 else if(isBlake(p)&&has&&near>260&&rnd()<.03*(G.diff+1)&&Math.abs(p.x-hoopOf(p).x)<780)useSkill(p);
 else if(isSga(p)&&has&&near<260&&rnd()<.012*(G.diff+1))useSkill(p);
 else if(isJok(p)&&has&&near<250&&rnd()<.02*(G.diff+1)&&Math.abs(p.x-hoopOf(p).x)<650)useSkill(p);
 else if(isRod(p)&&(!B.h||(B.h.t!==p.t&&dist(p,B.h)<300))&&rnd()<.01*(G.diff+1))useSkill(p);
 else if(isWal(p)&&B.h&&B.h.t!==p.t&&dist(p,B.h)<400&&rnd()<.012*(G.diff+1))useSkill(p)}
function doStepback(p){p.cx=-p.dir;p.cy=0;p.vk=8;p.sb2=0;p.sbk=1;p.ck=0;p.cl=34;p.st='cross';p.tt=0;p.cd=30;p.f=p.dir;fxRing(p.x,p.y,'#6fdcff',170,20);burst(p.x,p.y,'#6fdcff',12,7);sfx('swish')}
function crossEnd(p){const B=G.B;if(p.fadeS){p.fadeS=0;if(B.h===p){p.sh=performance.now()+2200;p.bolt=1;doShoot(p)}return}if(p.sbk){p.sbk=0;if(B.h===p){p.sh=performance.now()+2200;p.sb2=1;doShoot(p)}return}
 if(p.ai&&B.h===p&&(p.sh||0)>performance.now()&&Math.abs(p.x-hoopOf(p).x)<800)doShoot(p)}
function stormStart(p){const B=G.B,has=B.h===p;G.shake=16;flashFx('#ffe45c');pop(p.x,p.y-300,'⚡ ¡TORMENTA!','#ffe45c',46);fxRing(p.x,p.y,'#ffe45c',380,34);fxRing(p.x,p.y,'#6fe8ff',250,28);sfx('legend');
 for(let i=0;i<8;i++)fxArc(p.x+(rnd()-.5)*60,p.y-300,p.x+(rnd()-.5)*500,p.y+(rnd()-.5)*80,i%2?'#ffe45c':'#6fe8ff');
 for(const q of G.P)if(q.t!==p.t&&dist(q,p)<620&&q.st!=='dunk'){q.frz=85;q.zap=G.fr+85;pop(q.x,q.y-260,'¡ELECTRIZADO!','#6fe8ff',30);for(let i=0;i<4;i++)fxArc(q.x,q.y-250,q.x+(rnd()-.5)*120,q.y-20,'#ffe45c')}
 if(has&&p.st==='idle'){p.cd=0;p.fadeS=1;doCross(p,p.dir,(rnd()-.5)*1.4);if(p.st!=='cross'){p.fadeS=0;p.bolt=1;p.sh=performance.now()+2200;doShoot(p)}}}
function yaoFx(p){const h=hoopOf(p),c='#ff3b3b';fxRing(h.x,h.y,c,320,32);fxRing(h.x,h.y,'#ffd23d',200,24);G.shake=Math.max(G.shake,16);burst(h.x,792,c,22,11);pop(h.x-p.dir*20,h.y-430,'¡MURALLA!',c,40)}
function blakeFx(p){const h=hoopOf(p),c='#ff7a1a';fxRing(h.x,h.y,c,320,32);fxRing(h.x,h.y,'#3b8bff',200,24);G.shake=Math.max(G.shake,14);burst(h.x,792,c,26,12);pop(h.x-p.dir*20,h.y-430,'¡AL PÓSTER!','#3b8bff',40)}
function rodFx(p){const cs=['#ff4fd8','#46e0ff','#ffd23d','#7dff7d'];for(let i=0;i<4;i++)burst(p.x,p.y-90,cs[i],8,9);fxRing(p.x,p.y,'#ff4fd8',240,24);p.nst=performance.now()+1200;pop(p.x,p.y-300,'¡REBOTE LOCO!','#ff4fd8',34)}
function startBoost(p){if(boostOn(p))return;p.bst=performance.now()+8000;p.s0=p.s;p.s=Object.fromEntries(SK.map(k=>[k,Math.min(99,p.s[k]+14)]));p.spd0=p.spd;p.spd*=1.18;
 G.shake=16;flashFx('#ffd23d');pop(p.x,p.y-310,'¡MODO REY!','#ffd23d',46);pop(p.x,p.y-255,'TODO +14','#fff',28);fxRing(p.x,p.y,'#ffd23d',340,34);fxRing(p.x,p.y,'#fff',220,26);fxBeam(p.x,p.y,'#ffd23d');burst(p.x,p.y-80,'#ffd23d',28,12);sfx('legend')}
function endBoost(p){if(!p.s0)return;p.s=p.s0;p.spd=p.spd0;p.s0=null}
function megaStart(p){G.shake=Math.max(G.shake,18);fxRing(p.x,p.y,'#b266ff',420,40);fxRing(p.x,p.y,'#fff',260,30);for(let i=0;i<5;i++)fxBolt(p.x+(rnd()-.5)*260,p.y,'#b266ff');flashFx('#b266ff');sfx('perfect')}
function legendCross(p){const now=performance.now(),o=opp(p),d=dist(p,o),ok=o&&(o.st==='idle'||o.st==='cross');
 if(isLeb(p)){const r=rnd();
  if(ok&&d<300&&r<.38){o.st='fall';o.tt=0;o.vx=(o.x>=p.x?1:-1)*9;o.vy=0;pop(o.x,o.y-260,'¡TIRADO!','#ffd23d',44);G.shake=Math.max(G.shake,10);burst(o.x,o.y-60,'#ffd23d',16,9);fxRing(p.x,p.y,'#ffd23d',230,26);sfx('fall')}
  else if(ok&&d<340&&r<.7){o.frz=55;pop(o.x,o.y-260,'¡PARADO!','#7ff',40);fxRing(o.x,o.y,'#7ff',210,24)}
  else{p.nst=now+1600;pop(p.x,p.y-270,'¡BALÓN PROTEGIDO!','#ffd23d',28)}}
 else if(isShaq(p)){p.nst=now+1400;fxRing(p.x,p.y,'#b266ff',250,28);if(ok&&d<300){o.st='fall';o.tt=0;o.vx=(o.x>=p.x?1:-1)*10;o.vy=0;pop(o.x,o.y-260,'¡APLASTADO!','#b266ff',40);G.shake=Math.max(G.shake,12);sfx('fall')}}
 else if(isSga(p)){p.nst=now+1000;fxRing(p.x,p.y,'#6fe8ff',200,22);for(let i=0;i<3;i++)fxArc(p.x+p.f*20,p.y-70,p.x+p.f*(60+rnd()*60),p.y-rnd()*20,i%2?'#ffe45c':'#6fe8ff');if(ok&&d<260&&rnd()<.5){o.frz=45;o.zap=G.fr+45;pop(o.x,o.y-260,'¡ELECTRIZADO!','#6fe8ff',32)}}
 else if(isCur(p)){p.sh=now+1500;pop(p.x,p.y-270,'¡ABIERTO!','#6fdcff',30);fxRing(p.x,p.y,'#6fdcff',190,22)}}
function trample(p){for(const q of G.P)if(q.t!==p.t&&dist(q,p)<170&&(q.st==='idle'||q.st==='cross'||q.st==='block')){q.st='fall';q.tt=0;q.vx=(q.x>=p.x?1:-1)*11;q.vy=0;pop(q.x,q.y-250,'¡APARTA!','#b266ff',34);burst(q.x,q.y-60,'#b266ff',12,9);sfx('fall');G.shake=Math.max(G.shake,12)}}
function kingFx(p){const h=hoopOf(p),c='#ffd23d';fxRing(h.x,h.y,c,360,36);fxRing(h.x,h.y,'#fff',240,28);fxBeam(h.x,h.y,c);coinRain(h.x,h.y-300);G.shake=Math.max(G.shake,16);pop(h.x-p.dir*20,h.y-430,'¡EL REY!',c,46);burst(h.x,792,c,30,12);sfx('legend')}
function shaqSlam(p){const h=hoopOf(p),c='#b266ff';fxRing(h.x,h.y,c,320,32);for(let i=0;i<4;i++)fxBolt(h.x+(rnd()-.5)*260,h.y,c);G.shake=Math.max(G.shake,18);burst(h.x,792,c,20,11)}
function splashFx(p){const h=hoopOf(p),c='#6fdcff';fxRing(h.x,h.y,c,300,30);fxRing(h.x,h.y,'#fff',200,24);for(let i=0;i<26;i++){const a=-Math.PI/2+(rnd()-.5)*2.2,v=5+rnd()*9;G.fx.push({k:'p',x:h.x,y:792,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,T:34+rnd()*16,c:i%2?c:'#fff',sz:7+rnd()*7})}pop(h.x-p.dir*30,h.y-430,'¡SPLASH!',c,44)}
function breakBoard(i){G.brk=G.brk||[null,null];const h=HOOP[i],bx=h.x+(i?79:-79),by=(STADS[G.stx||0].by)||660,L=[];
 for(let k=0;k<11;k++){const a=k/11*6.2832+rnd()*.4;let px=bx,py=by+70;const pts=[[px,py]],n=3+(rnd()*3|0);for(let j=0;j<n;j++){px+=Math.cos(a)*(14+rnd()*22)+(rnd()-.5)*10;py+=Math.sin(a)*(18+rnd()*26)+(rnd()-.5)*10;pts.push([px,py])}L.push(pts)}
 G.brk[i]={bx,by,L,t:G.fr};
 for(let k=0;k<34;k++){const a=rnd()*6.28,v=3+rnd()*9;G.fx.push({k:'sh',x:bx+(rnd()-.5)*90,y:by+(rnd()-.5)*160,vx:Math.cos(a)*v*.7+(i?-2:2),vy:-4-rnd()*7,r:rnd()*6,vr:(rnd()-.5)*.5,t:0,T:70+rnd()*30,s:10+rnd()*22,c:k%3?'#bfefff':'#ffffff'})}
 fxRing(bx,by+70,'#bfefff',300,36);G.shake=Math.max(G.shake,32);sfx('block')}
function scoredFx(p,pts,kind,fire){G.flashT=G.fr+130;if(p.t===0)vib(kind==='dunk'?[40,30,40]:25);const h=hoopOf(p),el=$(p.t?'#sR':'#sL');if(el){el.classList.remove('bump');void el.offsetWidth;el.classList.add('bump')}
 if(fire==='bolt'){fxRing(h.x,h.y,'#ffe45c',360,34);fxRing(h.x,h.y,'#6fe8ff',240,28);for(let i=0;i<6;i++)fxArc(h.x+(rnd()-.5)*40,792-300,h.x+(rnd()-.5)*300,792+rnd()*120,i%2?'#ffe45c':'#6fe8ff');for(let i=0;i<4;i++)fxBolt(h.x+(rnd()-.5)*300,h.y,'#6fe8ff');burst(h.x,792,'#ffe45c',34,13);flashFx('#ffe45c');msg('⚡ ¡RAYO!',90)}else if(fire==='ice'){fxRing(h.x,h.y,'#9fe8ff',340,34);fxRing(h.x,h.y,'#fff',220,26);burst(h.x,792,'#9fe8ff',40,14);burst(h.x,792,'#fff',24,10);flashFx('#9fe8ff');msg('❄ ¡BOLA DE HIELO!',90)}else if(fire){fxRing(h.x,h.y,'#ff6a1a',340,34);burst(h.x,792,'#ff6a1a',40,14);burst(h.x,792,'#ffd23d',24,10);flashFx('#ff6a1a');msg('🔥 ¡TIRO DE FUEGO!',90)}
 if(isCur(p)&&pts===3)splashFx(p);
 if(p.kia){for(const q of G.P)if(q.t!==p.t&&dist(q,p)<420){q.st='fall';q.tt=0;q.vx=(q.x>=p.x?1:-1)*14;q.vy=0}fxRing(h.x,h.y,'#3b8bff',360,34);burst(h.x,792,'#ff7a1a',36,13);pop(h.x-p.dir*20,h.y-430,'¡PÓSTER!','#3b8bff',46);p.kia=0}
 if(p.mega){for(const q of G.P)if(q.t!==p.t&&dist(q,p)<700){q.st='fall';q.tt=0;q.vx=(q.x>=p.x?1:-1)*34;q.vy=0}breakBoard(p.dir>0?1:0);shaqSlam(p);msg('💥 ¡TABLERO ROTO!',90);p.mega=0}}
function putback(){if(!G.pb||G.fr<G.pbT)return;const p=G.pb,B=G.B;G.pb=null;
 if(G.mode!=='play'||B.h||B.dk||B.ps||B.fl||p.st!=='idle'||p.frz>0)return;const h=hoopOf(p);if(!driveable(p))return;
 const rm=B.rim;B.rim=null;B.h=p;doDunk(p);if(p.st!=='dunk'){B.h=null;B.rim=rm}else{p.dkind=5;B.x=p.x;B.y=p.y;pop(p.x,p.y-300,'¡REBOTE Y MATE!','#b266ff',42);fxRing(p.x,p.y,'#b266ff',280,28);sfx('perfect')}}
function fireTrail(ice,bolt,hook){const B=G.B,pal=bolt?['#fffbd0','#6fe8ff','#ffe45c']:ice?['#9fe8ff','#ffffff','#6fdcff']:hook?['#ffd23d','#fff3a0','#ffb347']:['#ff4a1a','#ff8a1a','#ffd23d'];
 for(let i=0;i<3;i++)G.fx.push({k:'p',x:B.x+(rnd()-.5)*18,y:B.y-B.z+(rnd()-.5)*18,vx:(rnd()-.5)*2,vy:(ice||bolt)?-.5+rnd():-1-rnd()*2,t:0,T:16+rnd()*10,c:pal[i%3],sz:(ice||bolt)?8+rnd()*10:14+rnd()*14,g:ice?.06:bolt?0:-.12});
 if(bolt&&G.fr%2===0)fxArc(B.x,B.y-B.z,B.x+(rnd()-.5)*140,B.y-B.z+(rnd()-.5)*120,rnd()<.5?'#ffe45c':'#6fe8ff')}
let RHATS=null;
const hatOf=p=>{return null;if(p.t===0)return save.hatOf&&save.hatOf[p.id]!=null?save.hatOf[p.id]:null;if(p.hatR===undefined){RHATS=RHATS||HATS.map((h,i)=>h.r<=1?i:-1).filter(i=>i>=0);p.hatR=Math.random()<.4?RHATS[Math.random()*RHATS.length|0]:null}return p.hatR};
function drawHatCell(g,id,hid){if(!IM.hats||!IM.hats.naturalWidth)return;const H=HATS[id],top=HEADTOP[hid]==null?20:HEADTOP[hid],s=H.s||1,w=128*s,hh=112*s;g.drawImage(IM.hats,(id%12)*128,((id/12)|0)*112,128,112,-w/2+(H.dx||0),top+(H.o||44)-(hh-2)-HM.ay,w,hh)}
const HFX={flame:['#ff4a1a','#ff8a1a','#ffd23d'],flameP:['#b266ff','#ff4fd8','#7a2bd0'],flameB:['#6fdcff','#2f8cff','#e6faff'],gold:['#ffd23d','#fff3a0'],star:['#ffe45c','#ffffff'],devil:['#ff2a2a','#a00a0a','#ff7a3a'],wings:['#ffffff','#cfe8ff'],music:['#ffffff','#7dff7d','#ff4fd8','#6fdcff'],rainbow:['#ff4fd8','#46e0ff','#ffd23d','#7dff7d'],neon:['#ff4fd8','#7dff7d','#6fdcff'],sparkle:['#ffffff','#cfe8ff'],electric:['#6fdcff','#ffffff'],electricY:['#ffe45c','#ffffff'],scan:['#6fe8ff','#ff4fd8'],glitch:['#ff4fd8','#7dff7d'],tech:['#6fe8ff','#e6faff'],halo:['#7dff7d','#ffffff'],dark:['#b266ff','#3a0a6a','#ff4fd8']};
function hatFx(p){const id=hatOf(p);if(id==null||!G||G.mode==='intro'||G.mode==='end')return;const h=HATS[id],fx=h.fx;if(!fx)return;const f=G.fr,sc=scl(p),hh=CH[p.id].h||1,hy=p.y-p.z-210*sc*hh*.98,hx=p.x+p.f*4*sc;
 if(f%(h.r>=3?2:3))return;const P=HFX[fx]||HFX.sparkle,col=P[Math.random()*P.length|0],R=Math.random;
 const add=o=>G.fx.push(Object.assign({k:'p',t:0,T:22,c:col,sz:8,g:0,vx:0,vy:0},o));
 if(fx.startsWith('flame'))add({x:hx+(R()-.5)*50*sc/.85,y:hy-R()*20,vx:(R()-.5)*1.2,vy:-1.5-R()*2,T:20+R()*8,sz:10+R()*10,g:-.08});
 else if(fx==='wings'){add({x:hx+(R()<.5?-1:1)*(40+R()*30)*sc/.85,y:hy+R()*20,vx:(R()-.5)*1.4,vy:.5+R()*.8,T:40,sz:6+R()*5})}
 else if(fx==='music')add({x:hx+(R()-.5)*70,y:hy+30,vx:(R()-.5)*1.4,vy:-1.4-R(),T:34,sz:7+R()*4,g:-.01});
 else if(fx==='devil')add({x:hx+(R()-.5)*60,y:hy,vx:(R()-.5),vy:-.8-R()*1.2,T:30,sz:5+R()*6,g:-.02});
 else if(fx==='electric'||fx==='electricY')fxArc(hx+(R()-.5)*30,hy,hx+(R()-.5)*110*sc/.85,hy+(R()-.5)*70,col);
 else if(fx==='halo'){const a=f*.2;add({x:hx+Math.cos(a)*44*sc/.85,y:hy-8+Math.sin(a)*10,T:14,sz:7})}
 else if(fx==='scan'||fx==='glitch'){add({x:hx-30+R()*60,y:hy+46+R()*10,vx:(R()-.5)*5,vy:0,T:12,sz:4+R()*4})}
 else if(fx==='rainbow')add({x:hx+(R()-.5)*60,y:hy+10,vx:(R()-.5)*2,vy:-1-R(),T:26,sz:6+R()*6,g:.04});
 else add({x:hx+(R()-.5)*70*sc/.85,y:hy+R()*30,vx:(R()-.5)*.8,vy:-.4-R()*.8,T:18+R()*10,sz:4+R()*6,g:-.02})}
function fxArc(x1,y1,x2,y2,c){G.fx.push({k:'arc',x:x1,y:y1,x2,y2,t:0,T:7,c:c||'#9ff'})}
function legendTick(p){if(!G||G.mode!=='play')return;const B=G.B;
 if((p.zap||0)>G.fr&&G.fr%3===0)fxArc(p.x,p.y-p.z-190,p.x+(rnd()-.5)*90,p.y-p.z-20,rnd()<.5?'#ffe45c':'#6fe8ff');
 if(lockOn(p)&&p.cd===0&&B.h&&B.h.t!==p.t&&(B.h.st==='idle'||B.h.st==='cross')&&dist(p,B.h)<170&&rnd()<.05)stolen(p,B.h)}
function drawHint(g,p,sc){const hh=CH[p.id].h||1,y=p.y-p.z-210*sc*hh-26+Math.sin(G.fr/6)*5;g.save();g.fillStyle='#7dff7d';g.strokeStyle='#05200a';g.lineWidth=3;g.beginPath();g.moveTo(p.x-11,y);g.lineTo(p.x+11,y);g.lineTo(p.x,y+15);g.closePath();g.stroke();g.fill();g.font='9px "Press Start 2P",monospace';g.textAlign='center';g.fillStyle='#fff';g.fillText('PASA',p.x,y-6);g.restore()}
function drawGlow(g,p,sc,c1,c2){const t=G.fr,hh=CH[p.id].h||1,H=210*sc*hh,x=p.x,y=p.y-p.z;g.save();g.globalCompositeOperation='lighter';
 for(let i=0;i<9;i++){const ph=(t*.03+i/9)%1,fx=x+Math.sin(i*2.3+t*.05)*H*.28,fy=y-ph*H*1.15,w=H*.12*(1-ph)+4;const gr=g.createRadialGradient(fx,fy,1,fx,fy,w);gr.addColorStop(0,c1+'cc');gr.addColorStop(1,c1+'00');g.fillStyle=gr;g.beginPath();g.ellipse(fx,fy,w,w*1.8,0,0,7);g.fill()}
 g.strokeStyle=c2+'aa';g.lineWidth=5*sc;g.beginPath();g.ellipse(x,y-H*.5,H*.34,H*.58,0,0,7);g.stroke();g.restore()}
function drawSombrero(g,p,sc){const hh=CH[p.id].h||1,H=210*sc*hh,u=Math.min(1,(p.hat-G.fr)/18),s=sc*hh*1.15*Math.max(.01,u),x=p.x+p.f*3*sc,y=p.y-p.z-H*.97;
 g.save();g.translate(x,y);g.scale(s,s);g.lineJoin='round';g.lineWidth=3;g.strokeStyle='#6a4a14';g.fillStyle='#e6c86a';
 g.beginPath();g.ellipse(0,-6,64,16,0,0,7);g.fill();g.stroke();
 g.beginPath();g.moveTo(-26,-8);g.quadraticCurveTo(-24,-52,0,-54);g.quadraticCurveTo(24,-52,26,-8);g.closePath();g.fill();g.stroke();
 g.fillStyle='#c0392b';g.fillRect(-26,-22,52,9);g.restore()}
function drawLock(g,p,sc){const hh=CH[p.id].h||1,H=210*sc*hh,x=p.x,y=p.y-p.z-H*.5;g.save();g.strokeStyle='#d6e2f5';g.lineWidth=4*sc+1;g.setLineDash([10,6]);g.lineDashOffset=-G.fr;g.beginPath();g.ellipse(x,y,H*.3,H*.52,0,0,7);g.stroke();g.setLineDash([]);g.font=Math.round(30*sc*hh)+'px sans-serif';g.textAlign='center';g.fillText('🔒',x,p.y-p.z-H*1.0);g.restore()}
function ambFx(p){const w=CH[p.id].pw,c=RCOL[w];if(!c||G.mode==='intro'||G.mode==='end')return;const f=G.fr;
 if(f%8===0)G.fx.push({k:'p',x:p.x+(rnd()-.5)*46,y:p.y-p.z-20-rnd()*150,vx:(rnd()-.5)*1.2,vy:-1-rnd()*1.5,t:0,T:26,c:w==='CORONA'?'#ffe45c':w==='REY 3PT'?(rnd()<.5?'#6fdcff':'#ff9a3d'):'#c98bff',sz:5+rnd()*6,g:-.04});
 if(p.st==='cross'&&f%2===0)G.fx.push({k:'p',x:p.x-p.f*10,y:p.y-30-rnd()*60,vx:-p.f*1.5,vy:-.5,t:0,T:18,c:c+'cc',sz:16+rnd()*10,g:0});
 if(isSga(p)&&p.st==='cross'&&f%2===0)fxArc(p.x+p.f*(20+rnd()*20),p.y-40-rnd()*80,p.x+p.f*(40+rnd()*60),p.y-rnd()*10,rnd()<.5?'#ffe45c':'#6fe8ff');
 if(isSga(p)&&f%14===0)fxArc(p.x+(rnd()-.5)*40,p.y-p.z-170,p.x+(rnd()-.5)*80,p.y-p.z-30,'#6fe8ff');
 if(ghostOn(p)&&f%2===0)G.fx.push({k:'p',x:p.x-p.f*(10+rnd()*20),y:p.y-p.z-20-rnd()*150,vx:-p.f*2,vy:0,t:0,T:20,c:'#6fe8ffaa',sz:12+rnd()*10,g:0});
 if(rebOn(p)&&f%2===0)G.fx.push({k:'p',x:p.x+(rnd()-.5)*80,y:p.y-p.z-rnd()*170,vx:(rnd()-.5)*3,vy:-2,t:0,T:22,c:['#ff4fd8','#46e0ff','#ffd23d','#7dff7d'][rnd()*4|0],sz:7+rnd()*8,g:-.05});
 if(p.kia&&p.st==='dunk')for(let i=0;i<2;i++)G.fx.push({k:'p',x:p.x+(rnd()-.5)*40,y:p.y-p.z-rnd()*120,vx:-p.dir*2,vy:1+rnd()*2,t:0,T:20,c:['#ff4a1a','#ff8a1a','#3b8bff'][i%3],sz:14+rnd()*12,g:0});
 if(lockOn(p)&&f%6===0)G.fx.push({k:'p',x:p.x+(rnd()-.5)*60,y:p.y-p.z-rnd()*140,vx:0,vy:-1,t:0,T:24,c:'#d6e2f5',sz:6+rnd()*6,g:-.03});
 if(p.mega&&p.st==='dunk')G.fx.push({k:'p',x:p.x+(rnd()-.5)*60,y:p.y-p.z-rnd()*160,vx:(rnd()-.5)*4,vy:(rnd()-.5)*4,t:0,T:24,c:rnd()<.5?'#b266ff':'#fff',sz:10+rnd()*10,g:0})}
function legendAmb(g,p,sc){const c=RCOL[CH[p.id].pw];if(!c||!G||G.mode==='end')return;const x=p.x,r=(54+6*Math.sin(G.fr*.12))*sc/.85;
 g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,p.y,2,x,p.y,r*1.5);gr.addColorStop(0,c+'88');gr.addColorStop(1,c+'00');g.fillStyle=gr;g.beginPath();g.ellipse(x,p.y,r*1.5,r*.55,0,0,7);g.fill();g.restore()}
function drawBoost(g,p,sc){const t=G.fr,hh=CH[p.id].h||1,H=210*sc*hh,x=p.x,y=p.y-p.z;g.save();g.globalCompositeOperation='lighter';
 for(let i=0;i<9;i++){const ph=(t*.03+i/9)%1,fx=x+Math.sin(i*2.3+t*.05)*H*.28,fy=y-ph*H*1.15,w=H*.12*(1-ph)+4;const gr=g.createRadialGradient(fx,fy,1,fx,fy,w);gr.addColorStop(0,'#fff6b0cc');gr.addColorStop(1,'#ffb30000');g.fillStyle=gr;g.beginPath();g.ellipse(fx,fy,w,w*1.8,0,0,7);g.fill()}
 g.strokeStyle='#ffd23daa';g.lineWidth=5*sc;g.beginPath();g.ellipse(x,y-H*.5,H*.34,H*.58,0,0,7);g.stroke();g.restore()}
function drawMega(g,p,sc){const t=G.fr,hh=CH[p.id].h||1,H=210*sc*hh,x=p.x,y=p.y-p.z-H*.5;g.save();g.globalCompositeOperation='lighter';
 for(let i=0;i<14;i++){const a=t*.08+i*.4488,L=H*(1.1+.5*Math.sin(t*.3+i));g.strokeStyle=i%2?'#b266ffaa':'#ffffff88';g.lineWidth=6*sc;g.beginPath();g.moveTo(x+Math.cos(a)*H*.3,y+Math.sin(a)*H*.3);g.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);g.stroke()}
 const r=H*.95,gr=g.createRadialGradient(x,y,5,x,y,r);gr.addColorStop(0,'#ffffffcc');gr.addColorStop(.35,'#b266ff99');gr.addColorStop(1,'#b266ff00');g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.restore()}
function drawChef(g,p,sc){const hh=CH[p.id].h||1,H=210*sc*hh,u=Math.min(1,(p.chef-G.fr)/18),s=sc*hh*1.1*Math.max(.01,u),x=p.x+p.f*3*sc,y=p.y-p.z-H*.98;
 g.save();g.translate(x,y);g.scale(s,s);g.lineJoin='round';g.fillStyle='#fff';g.strokeStyle='#c9d0e4';g.lineWidth=3;
 for(const[cx,cy,r]of[[-22,-40,22],[0,-56,27],[22,-40,22]]){g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.stroke()}
 g.beginPath();g.roundRect(-30,-38,60,40,6);g.fill();g.stroke();g.fillStyle='#e8ecf8';g.fillRect(-30,-8,60,10);
 g.strokeStyle='#dfe4f2';g.lineWidth=2;g.beginPath();g.moveTo(-10,-36);g.lineTo(-10,-10);g.moveTo(10,-36);g.lineTo(10,-10);g.stroke();g.restore()}
function drawFrz(g,p,sc){const hh=CH[p.id].h||1,H=210*sc*hh;const zp=(p.zap||0)>G.fr;g.save();g.globalAlpha=.32;g.fillStyle=zp?'#ffe45c':'#7ff';g.beginPath();g.ellipse(p.x,p.y-p.z-H*.45,H*.24,H*.5,0,0,7);g.fill();g.globalAlpha=1;g.font=Math.round(34*sc*hh)+'px sans-serif';g.textAlign='center';g.fillText(zp?'⚡':'❄',p.x,p.y-p.z-H*1.0+Math.sin(G.fr/5)*4);g.restore()}
function drawCracks(g){if(!G||!G.brk)return;for(const b of G.brk){if(!b)continue;g.save();g.lineCap='round';
 g.strokeStyle='#9fe8ff';g.globalAlpha=.4;g.lineWidth=8;for(const pts of b.L){g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()}
 g.strokeStyle='#fff';g.globalAlpha=.9;g.lineWidth=3;for(const pts of b.L){g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()}g.restore()}}
function initTimers(){const n=performance.now();for(const p of G.P){const L=!!SKLBL[CH[p.id].pw];p.pwT=Math.max(p.pwT||0,n+(L?30000:12000));p.skT=Math.max(p.skT||0,n+20000)}}
function usePowerOld(p){const now=performance.now();if(p.st!=='idle')return;if(now<(p.pwT||0)){if(p===G.hu)pop(p.x,p.y-260,'RECARGANDO','#aaa',30);return}
 const ps=CH[p.id].pos,has=G.B.h===p,tx=(s,c='#ffe45c')=>pop(p.x,p.y-270,s,c,38);
 if(ps==='SG'||ps==='SF'){if(!has)return;p.pwT=now+9000;doShoot(p);p.pw=1;tx(ps==='SG'?'¡STEPBACK!':'¡TIRO RAYO!');sfx('perfect')}
 else if(ps==='PF'){if(!has||!driveable(p)){pop(p.x,p.y-260,'CERCA DEL ARO CON BALÓN','#aaa',24);return}p.pwT=now+10000;doDunk(p);p.dkind=3;tx('¡TOMAHAWK!','#ff7a7a')}
 else if(ps==='C'){if(has&&driveable(p)){p.pwT=now+10000;doDunk(p);p.dkind=5;tx('¡360 SMASH!','#ff7a7a')}else if(!has){p.pwT=now+9000;p.pw2=1;setTimeout(()=>p.pw2=0,1400);doBlock(p);tx('¡MURO!','#7ff')}}
 else{const s0=p.spd;p.spd=s0*1.4;p.stam=100;p.pwT=now+9000;setTimeout(()=>p.spd=s0,2500);tx('¡TURBO!','#7fff9f')}}
function doShoot(p){if(G.B.h!==p||p.st!=='idle')return;p.f=p.dir;p.tt=0;p.st='shoot';p.lay=0;p.fade=isSga(p)?1:0;p.hook=((isJok(p)||isYao(p))&&Math.abs(p.x-hoopOf(p).x)<380)?1:0;p.lay=(!p.hook&&hoopClose(p))?1:0;sfx('bounce')}
function doDunk(p){if(G.B.h!==p||p.st!=='idle'||!driveable(p)){if(p===G.hu&&G.B.h===p)pop(p.x,p.y-260,'MUY LEJOS','#aaa',34);return}
 const h=hoopOf(p);p.f=p.dir;p.tt=0;p.st='dunk';p.x0=p.x;p.y0=p.y;p.tx=h.x-p.dir*(dunkable(p)?92:120);p.ty=clamp(h.y+(p.y-h.y)*.3,1010,1330);
 p.dk0=clamp(Math.hypot(p.tx-p.x,p.ty-p.y)/12,14,40)|0;p.dkind=dunkable(p)?(rageOn(p)?3+(rnd()*3|0):1+(rnd()*5|0)):0;p.lt=null;if(isLeb(p)&&p.dkind&&rnd()<.75)p.dkind=6;if(isBlake(p)&&p.dkind)p.dkind=[3,4,4][rnd()*3|0];sfx('bounce')}
function doSteal(p){if(p.st!=='idle'||p.cd>0)return;p.st='steal';p.tt=0;p.cd=34}
function doBlock(p){if(p.st!=='idle'||p.cd>0)return;p.st='block';p.tt=0;p.cd=55}
function doShove(p){return}
function doCross(p,ix,iy){if(G.B.h!==p||p.st!=='idle'||p.cd>0)return;let m=Math.hypot(ix,iy);if(m<.2){ix=p.dir;iy=0;m=1}p.cx=ix/m;p.cy=iy/m;p.ck=rnd()*3|0;p.sbk=0;p.vk=isShaq(p)?6:isLeb(p)?5:isCur(p)?[7,7,1,2,4][rnd()*5|0]:isSga(p)?[9,10][rnd()*2|0]:rnd()*5|0;p.cl=XL[p.ck];p.st='cross';p.tt=0;p.cd=75;if(p.cx)p.f=p.cx>0?1:-1;burst(p.x,p.y,'#ddd',8,6);legendCross(p)}
function stolen(th,v){const B=G.B;taunt(th,'steal');th.gs.stl++;if(th.t===0)vib(30);if(isRod(th))rodFx(th);if(isWal(th))fxRing(th.x,th.y,'#8aa0c0',260,26);B.h=th;th.cd=26;v.st='fall';v.tt=0;v.vx=(v.x>=th.x?1:-1)*7;v.vy=0;burst(v.x,v.y-90,'#fff',10,8);pop(th.x,th.y-250,'¡ROBO!','#7ff');sfx('steal');setTimeout(()=>sfx('fall'),120)}
const ARCP=[[976,400],[987,600],[1020,733],[1047,827],[1073,887],[1093,916],[1160,893],[1200,853],[1243,747],[1273,600],[1291,400],[1303,173]];
function arcX(y){if(y<=ARCP[0][0])return 400;for(let i=1;i<ARCP.length;i++)if(y<=ARCP[i][0]){const a=ARCP[i-1],b=ARCP[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return 100}
const isThree=(p,h)=>(h.x<LW/2?p.x:LW-p.x)>arcX(p.y)+8;
function gcl(p){const o=opp(p);if(!o||G.B.h!==p||o.st!=='idle'||(p.sh||0)>performance.now())return 0;return Math.max(0,1-dist(o,p)/250)*(o.gd?1:.35)*(o.ai?[.5,.8,1][G.diff]:1)}
function zoneW(st,d,dd,three,gc=0){let g=(1.3+(st-35)/16)*(1.35-.6*clamp((d-250)/600,0,1))*(1+(three?(st-62)/90:0));g*=(1-.45*Math.max(0,1-dd/230))*(1-.85*gc);g=clamp(g,gc>.05?.1:.8,7);const y=(g*.9+1.6)*(1-.6*gc);return{g,y,ye:y*.5}}
function zoneOf(W,te){const e=te-24;if(Math.abs(e)<=W.g)return'g';if(e<0)return-e-W.g<=W.y?'y':'o';return e-W.g<=W.ye?'y':'o'}
function layZone(p,u){const h=hoopOf(p),d=Math.hypot(Math.abs(p.x-h.x),(p.y-h.y)*1.6),o=opp(p),st=(p.s.mat+p.s.tir)/2,W=zoneW(st,d,dist(o,p),false,gcl(p));
 const te=p.lt!=null?p.lt:p.ai?24+(rnd()+rnd()-1)*[5,3.5,2.2][G.diff]*(1.15-st/170):u+10,zn=zoneOf(W,te);p.mk={te,zn,W,age:0};
 if(zn==='g'&&p.t===0){pop(p.x,p.y-300,'¡VERDE!','#6f6',40);sfx('perfect')}return zn}
function drawMeter(g,p,sc){const mk=p.mk,gc=gcl(p);if(p===G.hu&&p.gd&&G.B.h&&G.B.h.t!==p.t){const t=G.B.h;g.save();g.setLineDash([14,10]);g.strokeStyle='#ff4d4dcc';g.lineWidth=4*sc;g.beginPath();g.moveTo(p.x,p.y-70*sc);g.lineTo(t.x,t.y-70*sc);g.stroke();g.setLineDash([]);g.beginPath();g.ellipse(t.x,t.y,Math.max(1,52*sc),Math.max(1,26*sc),0,0,7);g.stroke();g.beginPath();g.moveTo(t.x-70*sc,t.y);g.lineTo(t.x+70*sc,t.y);g.moveTo(t.x,t.y-36*sc);g.lineTo(t.x,t.y+36*sc);g.stroke();g.restore()}if(gc>.25&&p.t===0){g.save();g.font=Math.round(24*sc)+'px "Press Start 2P",monospace';g.textAlign='center';g.fillStyle='#ff5252';g.strokeStyle='#000';g.lineWidth=4*sc;g.strokeText('🛡 MARCADO',p.x,p.y-p.z-290*sc);g.fillText('🛡 MARCADO',p.x,p.y-p.z-290*sc);g.restore()}let te=null,W=null,zn=null,fin=false;
 if(false&&p===G.hu&&G.B.h===p&&(p.st==='shoot'&&p.tt>=2||p.st==='dunk'&&!p.dkind&&p.tt-p.dk0>=0&&p.lt==null&&p.tt-p.dk0<20)){const h=hoopOf(p),d=Math.hypot(Math.abs(p.x-h.x),(p.y-h.y)*1.6),dk=p.st==='dunk';
  W=zoneW(dk?(p.s.mat+p.s.tir)/2:p.s.tir,d,dist(opp(p),p),!dk&&isThree(p,h),gcl(p));te=dk?p.tt-p.dk0+10:p.tt}
 else if(false&&mk&&mk.age<50){W=mk.W;te=mk.te;zn=mk.zn;fin=true;mk.age++}
 if(!W)return;
 const[X,Y]=ballScreen(p),bx=X-p.f*58*sc,H=190*sc,top=Y-H*.62,bot=top+H,t0=8,t1=24+W.g+W.ye+2,Yt=t=>bot-(clamp(t,t0,t1)-t0)/(t1-t0)*H,w=22*sc;
 const zs=[[t0,24-W.g-W.y,'#ff7a1a'],[24-W.g-W.y,24-W.g,'#ffd23d'],[24-W.g,24+W.g,'#3df05a'],[24+W.g,24+W.g+W.ye,'#ffd23d'],[24+W.g+W.ye,t1,'#ff7a1a']];
 g.save();g.globalAlpha=fin?Math.min(1,(50-mk.age)/20):1;g.fillStyle='#000d';g.fillRect(bx-w/2-4*sc,top-4*sc,w+8*sc,H+8*sc);
 for(const[a,b,c]of zs){g.fillStyle=c;g.fillRect(bx-w/2,Yt(b),w,Yt(a)-Yt(b))}
 const live=!fin&&zoneOf(W,te)==='g',mc=fin?{g:'#3df05a',y:'#ffd23d',o:'#ff7a1a'}[zn]:live?'#7fff9f':'#fff';g.strokeStyle=live||(fin&&zn==='g')?'#7fff9f':'#fff';g.lineWidth=3*sc;g.strokeRect(bx-w/2-4*sc,top-4*sc,w+8*sc,H+8*sc);
 g.fillStyle='#000';g.fillRect(bx-w*1.3-2*sc,Yt(te)-6*sc,w*2.6+4*sc,12*sc);g.fillStyle=mc;g.fillRect(bx-w*1.3,Yt(te)-4*sc,w*2.6,8*sc);
 if(fin&&zn==='g'){g.strokeStyle='#3df05a';g.shadowColor='#3df05a';g.shadowBlur=12;g.lineWidth=7*sc;g.beginPath();g.moveTo(bx,top);g.lineTo(bx,bot);g.stroke()}
 g.restore()}
function release(p,t=29){p.gs.fga++;const B=G.B,o=opp(p),h=hoopOf(p),dx=Math.abs(p.x-h.x),d=Math.hypot(dx,(p.y-h.y)*1.6),three=isThree(p,h),dd=dist(o,p);
 const yw=G.P.find(q=>q.t!==p.t&&towerOn(q)&&dist(q,p)<440);if(yw&&!p.jk&&!p.hook&&!p.bolt&&!towerOn(p))return swat(p,yw);
 if(!p.jk&&!p.hook&&!p.bolt&&!towerOn(p)&&o.st==='block'&&o.z>25&&dd<180&&blkP(p,o,clamp(.42+(o.s.def-p.s.tir)/220,.12,.8))){return swat(p,o)}
 const own=p.dir>0?p.x<LW/2:p.x>LW/2;let cont=clamp(1-dd/260,0,1);if(o.gd)cont=clamp(cont*1.5,0,1);if((p.sh||0)>performance.now())cont=0;
 let pr=.9-.00056*d+(p.s.tir-50)/260;if(three)pr+=(p.s.tir-62)/400;pr*=1-.85*cont;if(p.pw){pr=.97;p.pw=0}else if(p.fire>0){pr=.97;p.fire--}
 if(rageOn(p)){const nm=CH[p.id].pw;if(nm==='REY 3PT')pr=three||d>600?.99:Math.min(.97,pr+.2);else if(nm==='CORONA')pr=Math.min(.97,pr+.25);else pr=Math.min(.97,pr+.1)}
 const layS=!!p.lay;if(p.lay){pr=Math.min(.95,Math.max(pr,.66)+(p.s.mat-70)/500);p.lay=0}const jkS=!!p.jk,boltS=!!p.bolt,hookS=!!p.hook;if(p.bolt){pr=Math.max(pr,three?.88:.96);p.bolt=0}if(p.hook)pr=Math.min(.97,pr+.12);if(p.jk){pr=three?.8:.96;p.jk=0}if(towerOn(p))pr=Math.min(.97,pr+.12);if(ghostOn(p))pr=Math.min(.97,pr+.15);if(G.P.some(q=>q.t!==p.t&&lockOn(q)&&dist(q,p)<460))pr-=.35;const iceS=!!p.sb2;if(p.sb2){pr=Math.max(pr+.3,three?.9:.8);p.sb2=0}if(isShaq(p)&&three)pr=Math.min(pr,.04);pr=own?0:clamp(pr,.03,.97);const ok=rnd()<pr,fireS=ok&&!own&&!iceS&&pr>=.8&&cont<.12;
 if(p.t===0&&!own){if(cont>.55)pop(p.x,p.y-300,'MUY MARCADO','#ff6a6a',34);else if(cont<.12)pop(p.x,p.y-300,'¡DESMARCADO!','#6f6',34)}else if(p.t===0&&own)pop(p.x,p.y-300,'MUY LEJOS','#aaa',34);
 const[X,Y]=ballScreen(p);B.h=null;B.last=p;const T=Math.round(clamp(34+d*.028,36,68)*(jkS?1.25:1)*(layS?.62:1)),g=.55,z0=p.y-Y;
 B.fl={t:0,T,ok,p,three,fire:fireS,ice:iceS,bolt:boltS,hook:hookS,x0:X,y0:p.y,z0,tx:h.x+(ok?0:(rnd()-.5)*90),ty:h.y+(ok?0:(rnd()-.5)*70),g,vz:(RIM_Z-z0+.5*g*T*T)/T};B.x=X;B.y=p.y;B.z=z0;sfx('bounce');if(fireS)pop(p.x,p.y-330,'¡TIRO DE FUEGO!','#ff8a3d',40);if(iceS)pop(p.x,p.y-330,'❄ BOLA DE HIELO','#9fe8ff',38);if(boltS)pop(p.x,p.y-330,'⚡ TIRO RAYO','#ffe45c',38);if(hookS)pop(p.x,p.y-330,'¡GANCHO!','#ffd23d',36)}
function swat(p,o){const B=G.B;taunt(o,'block');o.gs.blk++;if(o.t===0)vib([20,20,40]);if(isWal(o)){pop(o.x,o.y-280,'¡NO EN MI CASA!','#8aa0c0',36);fxRing(o.x,o.y,'#8aa0c0',300,28);G.shake=Math.max(G.shake,16);p.frz=40}if(isYao(o)){pop(o.x,o.y-280,'¡NO PASAN!','#ff3b3b',36);fxRing(o.x,o.y,'#ff3b3b',300,28);G.shake=Math.max(G.shake,16)}const[X,Y]=ballScreen(p);B.h=null;B.fl=B.dk=null;B.last=p;B.x=X;B.y=p.y;B.z=Math.max(10,p.y-Y);B.vx=-p.dir*(7+rnd()*5);B.vy=(rnd()-.5)*7;B.vz=5;
 G.shake=8;pop(o.x,o.y-260,'¡TAPÓN!','#ff8a3d');sfx('block')}
function scored(p,pts,kind,fire){scored1(p,pts,kind);scoredFx(p,pts,kind,fire)}
function scored1(p,pts,kind){const B=G.B,h=hoopOf(p);G.s[p.t]+=pts;{const gs=p.gs;gs.pts+=pts;gs.fgm++;if(kind=='dunk'){gs.dnk++;gs.fga++}if(pts===3)gs.tpm++;const lp=G.lastPass;if(lp&&lp.to===p&&lp.f.t===p.t&&lp.f!==p&&G.fr-lp.fr<160){lp.f.gs.ast++;G.lastPass=null}}$('#sL').textContent=G.s[0];$('#sR').textContent=G.s[1];
 B.fl=B.dk=null;B.h=null;B.net=true;B.x=h.x;B.y=h.y;B.z=RIM_Z;B.vx=B.vy=0;B.vz=-1;B.last=p;
 G.mode='score';G.mt=150;G.who=p.t;taunt(p,kind=='dunk'?'dunk':pts==3?'three':'score');flashFx('#ffd23d');if(kind=='dunk'&&(rageOn(p)||isShaq(p))){for(const q of G.P)if(q.t!==p.t&&dist(q,p)<420){q.st='fall';q.tt=0;q.vx=q.x>=p.x?7:-7;q.vy=0}burst(p.x,p.y-40,'#fff',30,13);G.shake=28}legendFx(p,kind,pts);const txt=kind=='dunk'?'¡MATE!':pts==3?'¡TRIPLE!':'¡CANASTA!';msg(txt,90);if(kind=='dunk')G.shake=16;
 pop(h.x+(p.dir>0?-120:120),600,'+'+pts,'#ffe45c',90);burst(h.x,792,'#ffd23a',22,11);sfx(kind=='dunk'?'dunk':'swish');
 for(const q of G.P)if(q.st==='idle'){q.st=q.t===p.t?'win':'lose';q.tt=0}}
function rimMiss(p,hard){const B=G.B,h=hoopOf(p);B.fl=B.dk=null;B.x=h.x;B.y=h.y;B.z=RIM_Z;B.vx=-p.dir*(2+rnd()*5);B.vy=(rnd()-.5)*6;B.vz=hard?8:5+rnd()*4;B.pcd=22;sfx('block');if(rnd()<(hard?.45:.7))B.rim={t:0,T:(14+rnd()*38)|0,vx:B.vx,vy:B.vy,vz:B.vz,h};if(hard)pop(h.x-p.dir*100,650,'¡FALLÓ!','#f66',50);if(isShaq(p)){G.pb=p;G.pbT=G.fr+18}}
// ---- movimiento ----
function move(p,ix,iy,k=1){const B=G.B,m=Math.hypot(ix,iy),sp=p.spd*k*(B.h===p?.93:1)*(p.gd?.8:1)*(rageOn(p)&&CH[p.id].pw==='CORONA'?1.25:1)*(ghostOn(p)?1.5:1)*(rebOn(p)?1.2:1)*(lockedBy(p)?.55:1)*(p.ai?SKL[G.diff].spd:1);
 const tx=m>.08?ix/Math.max(1,m)*sp:0,ty=m>.08?iy/Math.max(1,m)*sp*.58:0;p.vx+=(tx-p.vx)*.3;p.vy+=(ty-p.vy)*.3;
 p.x+=p.vx;p.y+=p.vy;p.mv=Math.hypot(p.vx,p.vy)>1.3;
 if(Math.abs(p.vx)>1.3)p.f=p.vx>0?1:-1;else{const o=opp(p);p.f=B.h===p?p.dir:(o.x>=p.x?1:-1)}}
function clampP(p){p.y=clamp(p.y,1010,1330);const[a,b]=xr(p.y);p.x=clamp(p.x,a,b)}
const lerp=(a,b,t)=>a+(b-a)*t;
function stepP(p){p.an++;if(p.cd>0)p.cd--;const B=G.B,o=opp(p),play=G.mode==='play';if(p.s0&&!boostOn(p))endBoost(p);if(p.frz>0&&p.st==='idle'){p.frz--;p.mv=false;p.vx=p.vy=0;return}
 let ix=0,iy=0;
 if(p.st==='idle'){let want=false;if(play){if(p===G.hu){[ix,iy]=humanIn();want=TURBO||K.ShiftLeft||K.ShiftRight}else{[ix,iy]=ai(p,o);want=p.aiTurbo}}
  const mv=Math.hypot(ix,iy)>.25;let k=1;
  if(want&&mv&&p.stam>0&&!p.tired){k=1.2;p.stam-=1.7*clamp(80/(p.s.agu||80),.55,1.4);if(p.stam<=0){p.stam=0;p.tired=true}}else{p.stam=Math.min(100,p.stam+(mv?.14:.55)*clamp((p.s.agu||80)/80,.7,1.6));if(p.tired&&p.stam>=30)p.tired=false}
  p.sprint=k>1;if(p.slow>0){k*=.5;p.slow--}
  move(p,ix,iy,k);clampP(p);if(G.mode==='score')p.mv=false;
  if(p.mv){p.ratio=Math.min(1.5,Math.hypot(p.vx,p.vy*1.7)/p.spd);p.ph+=.13+.2*p.ratio;const gp=p.gait||0;p.gait=p.sprint?2:(gp===1?(p.ratio>.5?1:0):(p.ratio>.66?1:0));const sc=scl(p),D=[105,165,205][p.gait]*sc,c0=p.cyc||0;p.cyc=(c0+Math.hypot(p.vx,p.vy)/D)%1;if(p.gait>0&&((c0*2)|0)!==((p.cyc*2)|0)&&G.mode==='play')G.fx.push({k:'p',x:p.x-p.f*16,y:p.y-3,vx:-p.f*1.4,vy:-.8,t:0,T:12,c:'#fff7'})}else p.ratio=0}
 else{p.tt++;const t=p.tt;p.sprint=false;
  if(p.st==='shoot'){p.vx*=.8;p.vy*=.8;if(p.fade&&t<26){p.x-=p.dir*1.7;clampP(p)}if(p.lay&&t<18){p.x+=p.dir*3;clampP(p)}p.z=t>4&&t<44?(p.lay?72:90)*Math.sin(Math.PI*(t-4)/40):0;if(t===(p.lay?20:29)&&B.h===p)release(p,29);if(t>=48){p.st='idle';p.z=0;p.cd=8}}
  else if(p.st==='dunk'){const T0=p.dk0,e=t<T0?t/T0:1;p.x=lerp(p.x0,p.tx,e);p.y=lerp(p.y0,p.ty,e);p.mv=t<T0;
   const u=t-T0;if((isShaq(p)||p.kia||isYao(p))&&u<8)trample(p);if(u>0)p.x=p.tx+p.dir*(p.dkind?46:30)*Math.min(1,u/22);p.z=u>0&&u<50?(p.dkind===6?210:p.kia?270:p.mega?235:p.dkind?178:150)*Math.pow(Math.sin(Math.PI*u/50),.75):0;if(u===1)burst(p.x,p.y,'#fff8',10,6);
   if(u===20&&B.h===p){const[X,Y]=ballScreen(p);B.h=null;B.dk={t:0,T:7,x0:X,y0:p.y,z0:p.y-Y,p};p.lz=null;B.x=X;B.y=p.y;B.z=p.y-Y;if(p.dkind===6)kingFx(p);if(isShaq(p)&&!p.mega)shaqSlam(p);if(isYao(p))yaoFx(p);if(isBlake(p)&&!p.kia)blakeFx(p)}
   if(u>=64){p.st='idle';p.z=0;p.cd=10;p.mv=false;p.mega=0;p.kia=0}}
  else if(p.st==='steal'){if(t<10){p.vx=p.f*5;p.x+=p.vx;clampP(p)}else{p.vx*=.7}
   if(t===7){const h=B.h;if(h&&h.t!==p.t&&Math.abs(h.x-p.x)<165&&Math.abs(h.y-p.y)<95&&h.st!=='shoot'&&h.st!=='dunk'){
     if(h.st==='cross'&&h.tt<20){if(rageOn(h)||rnd()<clamp(.55+(h.s.reg-p.s.def)/200,.25,.9)){p.st='fall';p.tt=0;p.vx=-p.f*6;pop(h.x,h.y-270,'¡TOBILLOS!','#ffb347',44);taunt(h,'ankle');sfx('fall')}}
     else if(rnd()<clamp(.24+(p.s.def-h.s.reg)/200+(p.ai?SKL[G.diff].sb:0),.07,.75)*stealRes(h))stolen(p,h)}}
   if(t>=22&&p.st==='steal')p.st='idle'}
  else if(p.st==='shove'){if(t===6){const h=B.h;if(h&&h.t!==p.t&&Math.abs(h.x-p.x)<150&&Math.abs(h.y-p.y)<95&&h.st==='idle'&&rnd()<.55+(p.s.def-h.s.reg)/300){h.slow=80;h.vx+=p.f*9;pop(h.x,h.y-260,'¡EMPUJÓN!','#ffb347',40);sfx('block')}}if(t>=16)p.st='idle'}
  else if(p.st==='block'){p.vx*=.8;p.z=t<38?120*Math.sin(Math.PI*t/38):0;if(t>=40){p.st='idle';p.z=0}}
  else if(p.st==='cross'){const f=Math.max(0,1-t/p.cl),sp=p.spd*(p.sbk?1.05:isCur(p)?1.25:1);p.vx=p.cx*sp*1.9*f;p.vy=p.cy*sp*1.1*f;p.x+=p.vx;p.y+=p.vy;clampP(p);p.mv=false;if(!p.sbk&&Math.abs(p.vx)>1)p.f=p.vx>0?1:-1;if(t>=p.cl){p.st='idle';crossEnd(p)}}
  else if(p.st==='fall'){p.x+=p.vx;p.vx*=.9;clampP(p);if(t>146){p.st='idle';p.cd=16}}
  else if(p.st==='win'){p.z=(CEL[(t/22|0)%4]=='CE0'||CEL[(t/22|0)%4]=='CE1')&&t%22<11?Math.abs(Math.sin(t/3.5))*26:0}
  else if(p.st==='lose'){p.vx=p.vy=0}}
 if(G.mode==='play'&&p.st==='idle'&&dist(p,o)<62&&o.st==='idle'){const s=(p.x<o.x?-1:1)*1.6;p.x+=s;clampP(p)}}
// ---- IA ----
function ai(p,o){const r=G.n===3?ai3(p):ai1(p,o);p.aiTurbo=p.aiTurbo&&rnd()<.3;return r}
function ai1(p,o){const B=G.B,sk=SKL[G.diff],h=hoopOf(p);let tx=p.x,ty=p.y;p.aiTurbo=false;p.gd=!!B.h&&B.h===o&&p.st==='idle'&&dist(p,o)<300;if(G.diff&&p.st==='idle'&&rnd()<.0025*G.diff&&Math.abs(p.x-h.x)<760)usePower(p);if(p.st==='idle')aiSkill(p);
 if(B.h===p){const d=Math.hypot(h.x-p.x,(h.y-p.y)*1.6),near=dist(o,p);
  if(!p.plan||p.plan.id!==G.poss)p.plan={id:G.poss,t:0,style:(p.s.mat>p.s.tir+6||rnd()<.35)?'drive':'jump',w:rnd()*6.28,sh:(p.s.tir>60?640:540)+rnd()*130};
  const pl=p.plan;pl.t++;
  if(pl.style==='drive'){tx=h.x-p.dir*70;ty=h.y+Math.sin(pl.t/45+pl.w)*100}else{tx=h.x-p.dir*pl.sh;ty=h.y+Math.sin(pl.t/40+pl.w)*150}
  if(near<200)ty+=(p.y>=o.y?1:-1)*140;
  p.aiTurbo=sk.turbo>0&&Math.abs(tx-p.x)>300&&rnd()<sk.turbo+.4;
  if(p.cd===0){
   if(near<260&&rnd()<(.022+(isCur(p)?.014:0)+((isLeb(p)||isShaq(p))?.01:0))*sk.cross)doCross(p,tx-p.x,ty-p.y);
   else if(pl.style==='drive'&&driveable(p)&&Math.abs(h.x-p.x)<(isShaq(p)?560:520)&&rnd()<.06)doDunk(p);
   else if(pl.style==='jump'&&Math.abs(h.x-p.x)<pl.sh+50&&rnd()<(near>240?.06:.014))doShoot(p);
   else if(d<420&&rnd()<.03)doShoot(p);
   else if(pl.t>420)doShoot(p)}
 }else if(B.h){const hh=B.h,g=hoopOf(hh);tx=hh.x+(g.x-hh.x)*.2;ty=hh.y+(g.y-hh.y)*.12;const near=dist(p,hh);
  p.aiTurbo=sk.turbo>0&&near>260&&rnd()<sk.turbo;
  if(p.cd===0){if(near<150&&rnd()<sk.steal*(hh.st==='cross'?.4:1))doSteal(p);else if((hh.st==='shoot'&&hh.tt>=6&&hh.tt<=26||hh.st==='dunk'&&hh.tt<hh.dk0+10)&&near<250&&rnd()<sk.block*3)doBlock(p)}
 }else{if(G.mode==='play'){tx=B.x;ty=B.y;p.aiTurbo=sk.turbo>0&&Math.hypot(tx-p.x,ty-p.y)>250}}
 const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);return d<14?[0,0]:[dx/Math.max(1,d)*Math.min(1,d/90),dy/Math.max(1,d)*Math.min(1,d/90)]}
// ---- balón ----
function stepBall(){const B=G.B;if(B.pcd>0)B.pcd--;
 if(B.h)return;
 if(B.ps){const s=B.ps;s.t++;const k=s.t/s.T,t=s.tgt;B.x=lerp(s.x0,t.x,k);B.y=lerp(s.y0,t.y,k);B.z=lerp(s.z0,80,k)+Math.sin(Math.PI*k)*34;
  if(s.t>=s.T){B.ps=null;let q=null,bd=75;for(const o of G.P)if(o.t!==s.from.t&&o.st!=='fall'){const d=dist(o,t);if(d<bd){bd=d;q=o}}
   if(q&&rnd()<.45){B.h=q;q.cd=22;pop(q.x,q.y-250,'¡PASE ROBADO!','#7ff')}else{B.h=t;t.cd=Math.max(t.cd,10);G.lastPass={f:s.from,to:t,fr:G.fr};if(t.t===0&&t!==G.hu)G.noSw=1}}return}
 if(B.dk){const d=B.dk;d.t++;const k=d.t/d.T,h=hoopOf(d.p);B.x=lerp(d.x0,h.x,k);B.y=lerp(d.y0,h.y,k);B.z=lerp(d.z0,RIM_Z+10,k);
  if(d.t>=d.T){const p=d.p,o=opp(p);const base=clamp((.72+(p.s.mat-50)/200+(p.dkind?.18:0))*(1-.6*clamp(1-dist(o,p)/230,0,1)*(o.gd?1.4:1)),.1,.97),ok=isShaq(p)||p.kia||rnd()<base;
   if(!isShaq(p)&&!p.kia&&o.st==='block'&&o.z>20&&dist(o,p)<230&&blkP(p,o,clamp(.38+(o.s.def-p.s.mat)/220,.15,.75))){swat(p,o);return}
   if(ok)scored(p,2,'dunk');else rimMiss(p,true)}return}
 if(B.fl){const f=B.fl;f.t++;const k=f.t/f.T;B.x=lerp(f.x0,f.tx,k);B.y=lerp(f.y0,f.ty,k);B.z=f.z0+f.vz*f.t-.5*f.g*f.t*f.t;
  if(f.t>=f.T){if(f.ok){if(rnd()<.28){B.fl=null;B.rim={t:0,T:(12+rnd()*16)|0,h:hoopOf(f.p),sc:f.p,pts:f.three?3:2,fire:f.bolt?'bolt':f.ice?'ice':f.fire}}else scored(f.p,f.three?3:2,'shot',f.bolt?'bolt':f.ice?'ice':f.fire)}else rimMiss(f.p,false)}return}
 if(B.rim){const r=B.rim;r.t++;const a=r.t*.45;B.x=r.h.x+Math.cos(a)*20;B.y=r.h.y+Math.sin(a)*8;B.z=RIM_Z+Math.abs(Math.sin(a*1.3))*10;if(r.t===1)sfx('block');if(r.t>=r.T){B.rim=null;if(r.sc){scored(r.sc,r.pts,'shot',r.fire);return}B.vx=r.vx;B.vy=r.vy;B.vz=r.vz;B.pcd=10}return}
 if(B.net){B.vz-=.5;B.z+=B.vz;if(B.z<=0){B.z=0;B.vz=-B.vz*.4;if(Math.abs(B.vz)<2)B.vz=0}return}
 B.x+=B.vx;B.y+=B.vy;B.z+=B.vz;B.vz-=.55;
 if(B.z<=0){B.z=0;B.vz=Math.abs(B.vz)>3?-B.vz*.55:0;B.vx*=.93;B.vy*=.93;if(B.vz>2.5)sfx('bounce')}
 B.y=clamp(B.y,1000,1340);const[a,b]=xr(B.y);B.x=clamp(B.x,a-30,b+30);
 if(G.mode==='play'&&B.pcd<=0){const cs=[];const rb=G.P.find(q=>rebOn(q)&&['idle','cross','block','steal'].includes(q.st)&&Math.hypot(q.x-B.x,(q.y-B.y)*1.6)<420&&B.z<260);if(rb)cs.push([rb,1]);for(const p of G.P){if(p.st==='fall'||p.st==='dunk'||p.st==='shoot')continue;const d=Math.hypot(p.x-B.x,(p.y-B.y)*1.6);if(d<110&&B.z<190)cs.push([p,d])}
  if(cs.length){let best=null,bs=-1e9;for(const[p,d]of cs){const s=(p.s.mat*.3+p.s.def*.3+p.s.reb*.4)*(CH[p.id].h||1)-d*.25+rnd()*22;if(s>bs){bs=s;best=p}}if(rb)best=rb;
   if(B.z>35){for(const[p]of cs)if(p.st==='idle'){p.st='block';p.tt=6}pop(best.x,best.y-260,'¡REBOTE!','#7ff',40);sfx('bounce')}
   B.h=best;best.cd=Math.max(best.cd,22);if(B.last)best.gs.reb++;if(isRod(best)&&B.z>35)rodFx(best);if(isShaq(best)&&B.last&&B.last.t===best.t&&driveable(best)){best.st='idle';best.cd=0;doDunk(best);if(best.st==='dunk'){best.dkind=5;pop(best.x,best.y-300,'¡REBOTE Y MATE!','#b266ff',42);fxRing(best.x,best.y,'#b266ff',280,28);sfx('perfect')}}}}}
// ---- ciclo ----
function tick(){if(!G||G.paused)return;G.fr++;if(G.slow>0){G.slow--;if(G.fr%3)return}const B=G.B;
 if(G.shake>0)G.shake--;if(G.fr%10===0)G.passHint=(G.n===3&&G.mode==='play'&&B.h&&B.h===G.hu)?bestOpen(G.hu):null;
 if(G.mode==='intro'){G.mt--;const n=Math.ceil(G.mt/50);if(G.mt%50===0&&n>0&&n<4)msg(String(n),40);if(G.mt<=0)startTip()}
 else if(G.mode==='score'){if(--G.mt<=0){if(G.sd||G.t<=0)return endMatch();inbound(1-G.who);G.mode='play'}}
 else if(G.mode==='tip')tipTick();
 else if(G.mode==='play'){shotClock();G.t-=1/60;if(G.t<=0){G.t=0;const busy=B.fl||B.dk||G.P.some(p=>p.st==='shoot'||p.st==='dunk');if(!busy){if(G.s[0]!==G.s[1]){sfx('buzz');return endMatch()}if(!G.sd){G.sd=true;msg('¡MUERTE SÚBITA!',90)}}}}
 for(const p of G.P)p.ai=p!==G.hu;if(G.n===3)pickHu();if(G.mode!=='tip'){for(const p of G.P)stepP(p);stepBall();putback();if(B.fl&&(B.fl.fire||B.fl.ice||B.fl.bolt||B.fl.hook))fireTrail(B.fl.ice,B.fl.bolt,B.fl.hook);if(B.fl||B.dk||B.ps){const rg=B.last&&rageOn(B.last);G.fx.push({k:'p',x:B.x,y:B.y-B.z,vx:0,vy:0,t:0,T:rg?18:10,c:rg?RCOL[CH[B.last.id].pw]:'#ffb347',sz:rg?24:12,g:0})};
  for(const p of G.P){ambFx(p);hatFx(p);legendTick(p);if(p.gd&&B.h&&B.h.t!==p.t&&p.st==='idle')p.f=B.h.x>=p.x?1:-1;if(rageOn(p)&&G.fr%2==0){const c=RCOL[CH[p.id].pw]||'#ffffff';if(G.fr%14===0){const w=CH[p.id].pw;if(w==='TITÁN')fxBolt(p.x+(rnd()-.5)*140,p.y,c);else if(w==='CORONA'&&G.fr%28===0)fxBeam(p.x,p.y,c);else if(w==='REY 3PT')burst(p.x,p.y-90,'#ffd23d',3,5)}G.fx.push({k:'p',x:p.x+(rnd()-.5)*50,y:p.y-p.z-rnd()*150,vx:(rnd()-.5)*2,vy:-2-rnd()*3,t:0,T:22,c,sz:8+rnd()*8,g:-.05});if(p.mv)G.fx.push({k:'p',x:p.x,y:p.y,vx:0,vy:0,t:0,T:46,c:c+'aa',sz:22,g:0})}}}
 for(let i=G.fx.length-1;i>=0;i--){const e=G.fx[i];e.t++;if(e.k==='p'||e.k==='sh'){e.x+=e.vx;e.y+=e.vy;e.vy+=(e.g==null?.5:e.g);if(e.k==='sh')e.r+=e.vr}if(e.t>e.T)G.fx.splice(i,1)}
 if(G.mode==='end')return;
 if(G.fr%6===0){const p=G.hu,a=B.h===p,ba=$('#btn-a'),bb=$('#btn-b'),bc=$('#btn-c');
  $('#btn-q').style.display=$('#btn-s').style.display=G.n===3?'':'none';const mateHas=B.h&&B.h.t===p.t&&B.h!==p;ba.textContent=a?(p.st==='shoot'?'¡SUELTA!':(hoopClose(p)?'BANDEJA':'TIRAR')):mateHas?'PEDIR':'ROBAR';bb.textContent=a?'MATE':'TAPÓN';bc.textContent='REGATE';bc.style.display=a?'':'none';
  const bx=$('#btn-x'),bp=$('#btn-p'),w=CH[p.id].pw,lb=SKLBL[w],nw=performance.now(),rs=(p.skT||0)-nw,rp=(p.pwT||0)-nw;
  if(bx){bx.style.display=lb?'':'none';const h2=rs>0?'⏱<br>'+Math.ceil(rs/1000)+'s':(lb||'');if(bx.dataset.h!==h2){bx.dataset.h=h2;bx.innerHTML=h2}bx.dataset.w=w;bx.style.opacity=rs>0?.45:1}
  if(bp){const h3=rp>0?'⏱ '+Math.ceil(rp/1000)+'s':(PWN[w]||w);if(bp.dataset.h!==h3){bp.dataset.h=h3;bp.textContent=h3}bp.style.opacity=rp>0?.5:1}
  bb.classList.toggle('dim',a&&!driveable(p));$('#stam i').style.width=p.stam+'%';$('#stam').classList.toggle('low',p.tired);
  $('#sclk').textContent=Math.ceil(G.sc==null?16:G.sc);$('#sclk').classList.toggle('w',G.sc<=5);const t=Math.ceil(G.t);$('#clock').textContent=G.sd?'¡YA!':Math.floor(t/60)+':'+String(t%60).padStart(2,'0')}}
function statTable(g){const rows=g.P.slice().sort((a,b)=>a.t-b.t),sc=p=>p.gs.pts*2+p.gs.reb+p.gs.ast*1.5+p.gs.stl*2+p.gs.blk*2,mvp=rows.reduce((a,b)=>sc(b)>sc(a)?b:a,rows[0]);
 const row=p=>{const s=p.gs;return`<tr class="${p===mvp?'mvp':''}"><td>${p===mvp?'⭐ ':''}${p.name}${p.t?'':' (tú)'}</td><td>${s.pts}</td><td>${s.reb}</td><td>${s.ast}</td><td>${s.stl}</td><td>${s.blk}</td><td>${s.dnk}</td><td>${s.tpm}</td><td>${s.fga?Math.round(s.fgm/s.fga*100)+'%':'—'}</td></tr>`};
 return`<table class="est"><tr><th>JUGADOR</th><th>PTS</th><th>REB</th><th>AST</th><th>ROB</th><th>TAP</th><th>MAT</th><th>3PT</th><th>TC%</th></tr>${rows.map(row).join('')}</table>`}
function endMatch(){G.mode='end';musicPlay('menu');const w=G.s[0]>G.s[1],c=(w?150:40)+G.s[0]*(w?10:8)+(w?G.diff*50:0);save.coins+=c;save.played++;if(w)save.wins++;vib([60,40,60]);{const cr=save.career;cr.games++;if(w)cr.wins++;for(const p of G.P)if(p.t===0){const s=p.gs;cr.pts+=s.pts;cr.reb+=s.reb;cr.ast+=s.ast;cr.stl+=s.stl;cr.blk+=s.blk;cr.dnk+=s.dnk;cr.tpm+=s.tpm;save.cpts[p.id]=(save.cpts[p.id]||0)+s.pts;save.used[p.id]=(save.used[p.id]||0)+1}}store();
 const g=G;setTimeout(()=>{$('#eT').textContent=w?'🏆 ¡VICTORIA!':'DERROTA';$('#eS').textContent=g.s[0]+' - '+g.s[1];$('#eStats').innerHTML=statTable(g);$('#eC').innerHTML=`+${c} 🪙<br>Partidos ${save.played} · Victorias ${save.wins}`;$('#controls').classList.add('hidden');$('#hud').classList.add('hidden');show('#end')},900)}
// ---- cámara / dibujo ----
const vib=m=>{try{if(cfgv('vib')&&navigator.vibrate)navigator.vibrate(m)}catch(e){}};
const hoopClose=p=>{const h=hoopOf(p);return Math.abs(p.x-h.x)<300&&Math.abs(p.y-h.y)<150};
const wyM=y=>y<=590?y+202:y<=1020?792+(y-590)*.693:1090+(y-1020)*.833,wr4=q=>[q[0],wyM(q[1]),q[2],wyM(q[3])];
const STADS=[
 {k:'arena',n:'ARENA',img:'stadium',hx:[366,2210],by:660,sb:1,cr:[[400,390,990,760],[1010,390,1575,760],[1600,390,2175,760],[0,520,200,800],[2380,520,2576,800]]},
 {k:'azotea',n:'AZOTEA NOCTURNA',img:'stad1',warp:1,hx:[410,2176],by:700,sb:0,cr:[[1370,650,1680,870],[1700,420,1980,570],[2250,60,2490,180],[2290,290,2440,420]].map(wr4)},
 {k:'calle',n:'CALLE ATARDECER',img:'stad2',warp:1,hx:[410,2176],by:700,sb:2,cr:[[640,490,1170,760],[1440,480,1990,760],[1190,410,1420,570],[700,430,820,520]].map(wr4)}];
const STC={},ST=()=>STADS[G&&G.stx||0];
function stadImg(){const i=G&&G.stx||0,S=STADS[i];if(!S.warp)return IM.stadium;if(STC[i])return STC[i];const im=IM[S.img];if(!im||!im.complete||!im.naturalWidth)return IM.stadium;
 const c=mkc(LW,LH),g=c.getContext('2d');g.imageSmoothingEnabled=true;const W=im.naturalWidth;
 g.drawImage(im,0,0,W,6,0,0,LW,204);const gr=g.createLinearGradient(0,0,0,204);gr.addColorStop(0,'rgba(0,0,0,.6)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,LW,204);
 g.drawImage(im,0,0,W,590,0,202,LW,590);g.drawImage(im,0,590,W,430,0,792,LW,298);g.drawImage(im,0,1020,W,418,0,1090,LW,348);STC[i]=c;return c}
function ensureStad(){if(G&&G.stx==null){const c=window.STAD_PICK!=null?window.STAD_PICK:(save.cfg&&save.cfg.stad!=null?save.cfg.stad:0);G.stx=c>=STADS.length?(Math.random()*STADS.length|0):c;HOOP[0].x=STADS[G.stx].hx[0];HOOP[1].x=STADS[G.stx].hx[1]}}
function signBoard(t){const g=ctx,a=wyM(338),b=wyM(398);g.save();g.textAlign='center';g.textBaseline='middle';g.fillStyle='#14040a';g.fillRect(1545,a,195,b-a);g.shadowColor='#ff3b5c';g.shadowBlur=14;g.fillStyle='#ff5a7a';g.font='28px "Press Start 2P",monospace';g.fillText(t,1643,(a+b)/2+2);g.restore()}
function drawFlashes(){if(!G)return;G.fl2=G.fl2||[];const cr=ST().cr;
 if((G.flashT||0)>G.fr&&G.fr%2===0)for(let k=0;k<3;k++){const R=cr[Math.random()*cr.length|0];G.fl2.push({x:R[0]+Math.random()*(R[2]-R[0]),y:R[1]+Math.random()*(R[3]-R[1]),t:0,T:9+Math.random()*6,s:10+Math.random()*16})}
 const g=ctx;g.save();g.globalCompositeOperation='lighter';
 for(const f of G.fl2){const a=1-f.t/f.T,r=f.s*(1.4-.4*a);const gr=g.createRadialGradient(f.x,f.y,0,f.x,f.y,r*2);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.beginPath();g.arc(f.x,f.y,r*2,0,7);g.fill();
  g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=2;g.beginPath();g.moveTo(f.x-r*2.2,f.y);g.lineTo(f.x+r*2.2,f.y);g.moveTo(f.x,f.y-r*2.2);g.lineTo(f.x,f.y+r*2.2);g.stroke();f.t++}
 g.restore();G.fl2=G.fl2.filter(f=>f.t<f.T)}
function sboard(t,s0,s1){const g=ctx,c0=(G&&G.mc)||'#ff5a45',c1=(G&&G.rc)||'#ff5a45';g.save();g.textAlign='center';g.textBaseline='middle';
 for(const m of[0,1]){const X=x=>m?LW-x:x;
  g.fillStyle='#0d0810';g.fillRect(m?LW-212:96,268,116,60);g.fillRect(m?LW-112:52,354,60,56);g.fillRect(m?LW-176:146,372,30,44);g.fillRect(m?LW-268:210,378,58,50);
  g.lineWidth=2;for(const[a,b,w,h,c]of[[96,268,116,60,'#7dff7d'],[52,354,60,56,c0],[210,378,58,50,c1]]){g.strokeStyle=c+'aa';g.strokeRect(m?LW-a-w:a,b,w,h)}
  g.shadowColor='#5f5';g.shadowBlur=12;g.fillStyle='#7dff7d';g.font='26px "Press Start 2P",monospace';g.fillText(t,X(153),298);
  g.font='32px "Press Start 2P",monospace';g.shadowColor=c0;g.shadowBlur=16;g.fillStyle='#fff';g.fillText(String(s0).padStart(2,'0'),X(82),392);
  g.shadowColor=c1;g.fillText(String(s1).padStart(2,'0'),X(240),400);
  g.shadowBlur=8;g.shadowColor='#ffb52e';g.fillStyle='#ffb52e';g.font='28px "Press Start 2P",monospace';g.fillText('1',X(161),396)}g.restore()}
function draw(){const w=innerWidth,h=innerHeight,port=h>w*1.05,VW=port?950:1900;ctx.setTransform(dpr,0,0,dpr,0,0);
 const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#05060f');bg.addColorStop(1,'#10162e');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 S=w/VW;offY=port?Math.max(.47*h-1150*S,150-792*S):Math.max(.5*h-1150*S,62-792*S);
 let cam=0;if(G){const a=G.hu,b=opp(a),B=G.B;let fx=(a.x+b.x)/2;if(!B.h&&G.mode!=='intro')fx=fx*.6+B.x*.4;const tg=clamp(fx-VW/2,0,LW-VW);G.cam=G.cam<0?tg:G.cam+(tg-G.cam)*.1;cam=G.cam}else cam=(LW-VW)/2;
 let sx=0,sy=0;if(G&&G.shake>0&&cfgv('shake')){sx=(rnd()-.5)*G.shake;sy=(rnd()-.5)*G.shake}
 ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.save();ctx.translate(sx,offY+sy);ctx.scale(S,S);ctx.translate(-cam,0);
 ensureStad();ctx.drawImage(stadImg(),0,0,LW,LH);
 if(!G){ctx.restore();return}drawCracks(ctx);drawFlashes();
 const t=Math.ceil(G.t),tstr=G.sd?'0:00':Math.floor(t/60)+':'+String(t%60).padStart(2,'0');if(ST().sb===1)sboard(tstr,G.s[0],G.s[1]);else if(ST().sb===2)signBoard(tstr);
 const B=G.B;
 for(const p of G.P){const sc=scl(p);ctx.fillStyle=`rgba(0,0,0,${.32-Math.min(.2,p.z/700)})`;ctx.beginPath();ctx.ellipse(p.x,p.y,(p.st==='fall'?70:42)*sc/.85*.9,13*sc/.85,0,0,7);ctx.fill()}
 if(!B.h){const k=persp(B.y)*BASE;ctx.fillStyle=`rgba(0,0,0,${.35-Math.min(.2,B.z/900)})`;ctx.beginPath();ctx.ellipse(B.x,B.y,Math.max(1,24*k/.85),Math.max(1,8*k/.85),0,0,7);ctx.fill()}
 const L=[...G.P.map(p=>({y:p.y,p})),...(!B.h?[{y:B.y+(B.z>200?-30:0),b:1}]:[])].sort((a,b)=>a.y-b.y);
 for(const o of L){if(o.b){const k=persp(B.y)*BASE,r=26*k;if(B.fl&&(B.fl.fire||B.fl.ice||B.fl.bolt||B.fl.hook)){const ic=B.fl.ice||B.fl.bolt;ctx.save();ctx.globalCompositeOperation='lighter';const gg=ctx.createRadialGradient(B.x,B.y-B.z-r,2,B.x,B.y-B.z-r,r*3);gg.addColorStop(0,ic?'#ffffffee':'#ffd23dcc');gg.addColorStop(.5,ic?'#6fdcff99':'#ff6a1a88');gg.addColorStop(1,ic?'#6fdcff00':'#ff2a0000');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(B.x,B.y-B.z-r,r*3,0,7);ctx.fill();ctx.restore()}ballImg(ctx,B.x,B.y-B.z-r,r);continue}
  const p=o.p,[fn,bl,bp]=frameOf(p),sc=scl(p);let dr=null;if(B.h===p&&bl&&(p.st==='idle'||p.st==='cross')){const mvg=p.st==='idle'&&p.mv;let u;if(mvg){u=((((p.cyc||0)-CYL[p.gait||0]-.04+.5)%1)+1)%1}else{u=(p.an%24)/24}dr=[Math.abs(Math.cos(Math.PI*u)),mvg?6+14*Math.min(1.2,p.ratio):0];if(p.t===0&&(p.dbp||0)<.5&&u>=.5)sfx('bounce');p.dbp=u}else p.dbp=0;legendAmb(ctx,p,sc);ctx.globalAlpha=ghostOn(p)?.5:1;RIG_ST.includes(p.st)?drawRigFig(ctx,p.x,p.y-p.z,sc,p.f,p.col,p.id,rigOf(p,dr)):drawFig(ctx,fn,p.x,p.y-p.z,sc,p.f,p.col,p.id,bl&&B.h===p,bp,(p.st==='idle'||p.st==='cross'&&0)?gaitOf(p.ph,p.mv?p.ratio:0,p.an):null,dr,p.st==='idle'&&p.mv?[p.cyc||0,p.gait||0]:null);ctx.globalAlpha=1;drawMeter(ctx,p,sc);if(G.passHint===p)drawHint(ctx,p,sc);if(rageOn(p))drawAura(ctx,p,sc);if(boostOn(p))drawBoost(ctx,p,sc);if(towerOn(p))drawGlow(ctx,p,sc,'#ff6b6b','#ffd23d');if(ghostOn(p))drawGlow(ctx,p,sc,'#6fe8ff','#ffffff');if(rebOn(p))drawGlow(ctx,p,sc,['#ff4fd8','#46e0ff','#ffd23d','#7dff7d'][(G.fr>>3)&3],'#ffffff');if(lockOn(p))drawGlow(ctx,p,sc,'#8aa0c0','#d6e2f5');if(p.kia&&p.st==='dunk')drawGlow(ctx,p,sc,'#ff9a3d','#3b8bff');if((p.hat||0)>G.fr)drawSombrero(ctx,p,sc);if(lockedBy(p))drawLock(ctx,p,sc);if(p.mega&&p.st==='dunk')drawMega(ctx,p,sc);if((p.chef||0)>G.fr)drawChef(ctx,p,sc);if(p.frz>0)drawFrz(ctx,p,sc);
  if(p.st==='fall'&&p.tt>24&&p.tt<110){ctx.font=`${40*sc/.85}px sans-serif`;ctx.textAlign='center';for(let i=0;i<3;i++){const a=G.fr/8+i*2.1;ctx.fillText('⭐',p.x+Math.cos(a)*55*sc,p.y-95*sc+Math.sin(a)*10-p.z)}}
  if(p.sprint&&G.fr%3==0)G.fx.push({k:'p',x:p.x-p.f*30,y:p.y-8,vx:-p.f*2,vy:-1,t:0,T:14,c:'#fff8'})}
 const hp=G.hu;if(G.mode!=='end'){const sc=scl(hp),x=hp.x,y=hp.y-hp.z-310*sc+Math.sin(G.fr/6)*6;ctx.fillStyle='#ffe45c';ctx.strokeStyle='#000';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x-18,y-22);ctx.lineTo(x+18,y-22);ctx.lineTo(x,y+4);ctx.closePath();ctx.fill();ctx.stroke()
  }
 for(const e of G.fx){if(e.k==='t'){const a=1-e.t/e.T;ctx.globalAlpha=Math.max(0,a);ctx.font=`${e.s}px "Press Start 2P",monospace`;ctx.textAlign='center';ctx.lineWidth=8;ctx.strokeStyle='#000';ctx.strokeText(e.txt,e.x,e.y-e.t*2);ctx.fillStyle=e.c;ctx.fillText(e.txt,e.x,e.y-e.t*2);ctx.globalAlpha=1}
  else if(e.k==='ring'){const k=e.t/e.T,r=e.r1*k;ctx.save();ctx.globalAlpha=1-k;ctx.strokeStyle=e.c;ctx.lineWidth=10*(1-k)+2;ctx.beginPath();ctx.ellipse(e.x,e.y,Math.max(1,r),Math.max(1,r*.38),0,0,7);ctx.stroke();ctx.restore()}
  else if(e.k==='bolt'){ctx.save();ctx.globalAlpha=1-e.t/e.T;ctx.strokeStyle='#fff';ctx.shadowColor=e.c;ctx.shadowBlur=18;ctx.lineWidth=5;ctx.beginPath();e.pts.forEach(([a,b],i)=>i?ctx.lineTo(e.x+a,e.y+b):ctx.moveTo(e.x,e.y));ctx.stroke();ctx.restore()}
  else if(e.k==='beam'){const k=e.t/e.T,w=60*(1-k*.5),gr=ctx.createLinearGradient(0,e.y-900,0,e.y);gr.addColorStop(0,e.c+'00');gr.addColorStop(1,e.c+'cc');ctx.save();ctx.globalAlpha=1-k;ctx.globalCompositeOperation='lighter';ctx.fillStyle=gr;ctx.fillRect(e.x-w/2,e.y-900,w,900);ctx.restore()}
  else if(e.k==='arc'){ctx.save();ctx.globalAlpha=Math.max(0,1-e.t/e.T);ctx.strokeStyle=e.c;ctx.lineWidth=3;ctx.shadowColor=e.c;ctx.shadowBlur=10;ctx.beginPath();ctx.moveTo(e.x,e.y);const n=5;for(let i=1;i<n;i++){const k=i/n;ctx.lineTo(e.x+(e.x2-e.x)*k+(Math.random()-.5)*26,e.y+(e.y2-e.y)*k+(Math.random()-.5)*26)}ctx.lineTo(e.x2,e.y2);ctx.stroke();ctx.restore()}
  else if(e.k==='sh'){ctx.save();ctx.globalAlpha=Math.max(0,1-e.t/e.T);ctx.translate(e.x,e.y);ctx.rotate(e.r);ctx.fillStyle=e.c;ctx.beginPath();ctx.moveTo(0,-e.s);ctx.lineTo(e.s*.7,e.s*.5);ctx.lineTo(-e.s*.6,e.s*.4);ctx.closePath();ctx.fill();ctx.restore()}
  else{ctx.globalAlpha=Math.max(0,1-e.t/e.T);ctx.fillStyle=e.c;{const z=e.sz||10;ctx.fillRect(e.x-z/2,e.y-z/2,z,z)};ctx.globalAlpha=1}}
 ctx.restore()}
let last=0,acc=0;
function loop(ts){requestAnimationFrame(loop);const dt=Math.min(100,ts-last);last=ts;acc+=dt;while(acc>=16.667){tick();acc-=16.667}draw()}
