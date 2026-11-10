// ===== FX: motor de efectos (brillo aditivo, cinemáticas) y nuevos movimientos (MV) =====
const FX=(()=>{
const css=document.createElement('style');css.textContent=`
#fxb{position:fixed;inset:0;z-index:6;pointer-events:none}
#fxb i{position:absolute;left:0;right:0;height:0;background:#000;transition:height .35s cubic-bezier(.2,1,.3,1)}
#fxb i:first-child{top:0;border-bottom:2px solid var(--c,#7dff5a)}#fxb i:last-child{bottom:0;border-top:2px solid var(--c,#7dff5a)}
#fxb.on i{height:9vh}
#fxv{position:fixed;inset:0;z-index:5;pointer-events:none;opacity:0;transition:opacity .4s;background:radial-gradient(ellipse at 50% 55%,transparent 38%,var(--c,#7dff5a) 140%);mix-blend-mode:screen}
#fxv.on{opacity:.55}`;document.head.appendChild(css);
const bars=document.createElement('div');bars.id='fxb';bars.innerHTML='<i></i><i></i>';document.body.appendChild(bars);
const vg=document.createElement('div');vg.id='fxv';document.body.appendChild(vg);
let bt=0;
const F={
 cine(ms,c){bars.style.setProperty('--c',c);vg.style.setProperty('--c',c);bars.classList.add('on');vg.classList.add('on');clearTimeout(bt);bt=setTimeout(()=>{bars.classList.remove('on');vg.classList.remove('on')},ms)},
 add(T,f,o){if(!G)return;G.fx.push(Object.assign({k:'fn',t:0,T,f},o||{}))},
 ease:t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3),
 /* platillo volador dibujado a mano (pixel-neón) */
 ufo(g,x,y,s,t,c){c=c||'#7dff5a';g.save();g.translate(x,y);g.scale(s,s);
  const gl=g.createRadialGradient(0,10,4,0,10,90);gl.addColorStop(0,c+'aa');gl.addColorStop(1,c+'00');g.globalCompositeOperation='lighter';g.fillStyle=gl;g.fillRect(-100,-70,200,180);g.globalCompositeOperation='source-over';
  g.fillStyle='#9fe8ff88';g.beginPath();g.ellipse(0,-12,26,22,0,Math.PI,0);g.fill();g.strokeStyle='#e8ffff';g.lineWidth=2;g.stroke();
  const hg=g.createLinearGradient(0,-8,0,14);hg.addColorStop(0,'#e8eef8');hg.addColorStop(.5,'#8a96b0');hg.addColorStop(1,'#3a4260');g.fillStyle=hg;g.beginPath();g.ellipse(0,0,64,16,0,0,7);g.fill();g.strokeStyle='#1a2040';g.lineWidth=3;g.stroke();
  for(let i=0;i<7;i++){const a=-2.6+i*.87,lx=Math.cos(a)*50,ly=Math.sin(a)*11+2,on=((t>>2)+i)%3===0;g.fillStyle=on?'#fff':c;g.globalAlpha=on?1:.65;g.beginPath();g.arc(lx,ly,3.4,0,7);g.fill()}
  g.globalAlpha=1;g.fillStyle='#ffd23d';g.beginPath();g.ellipse(0,15,18,5,0,0,7);g.fill();g.restore()},
 /* grietas radiales en el suelo */
 cracks(x,y,c,R){const a=[];for(let i=0;i<9;i++){const an=i/9*6.283+Math.random()*.3,pts=[[0,0]];let r=0;while(r<R){r+=30+Math.random()*40;pts.push([Math.cos(an)*r+(Math.random()-.5)*18,Math.sin(an)*r*.38+(Math.random()-.5)*8])}a.push(pts)}
  F.add(60,(g,e,k)=>{g.globalCompositeOperation='lighter';g.strokeStyle=c;g.shadowColor=c;g.shadowBlur=12;g.lineWidth=4*(1-k)+1;g.globalAlpha=1-k*k;const grow=Math.min(1,k*3.2);for(const pts of a){g.beginPath();const n=Math.max(2,Math.ceil(pts.length*grow));for(let i=0;i<n;i++){const q=pts[i];i?g.lineTo(x+q[0],y+q[1]):g.moveTo(x+q[0],y+q[1])}g.stroke()}})},
 /* onda de choque con brillo */
 shock(x,y,c,R,T){T=T||34;F.add(T,(g,e,k)=>{const r=R*F.ease(k);g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.strokeStyle=c;g.shadowColor=c;g.shadowBlur=22;g.lineWidth=16*(1-k)+2;g.beginPath();g.ellipse(x,y,Math.max(1,r),Math.max(1,r*.38),0,0,7);g.stroke();g.lineWidth=5*(1-k);g.strokeStyle='#fff';g.beginPath();g.ellipse(x,y,Math.max(1,r*.82),Math.max(1,r*.82*.38),0,0,7);g.stroke()})},
 /* chispas con estela */
 sparks(x,y,c,n,sp){const a=[];for(let i=0;i<n;i++){const an=Math.random()*6.283,v=(.4+Math.random())*(sp||12);a.push([Math.cos(an)*v,Math.sin(an)*v-4,3+Math.random()*3])}
  F.add(44,(g,e,k)=>{g.globalCompositeOperation='lighter';g.strokeStyle=c;g.shadowColor=c;g.shadowBlur=10;g.globalAlpha=1-k;for(const s of a){const t=e.t,px=x+s[0]*t,py=y+s[1]*t+.28*t*t;g.lineWidth=s[2]*(1-k);g.beginPath();g.moveTo(px,py);g.lineTo(px-s[0]*2.4,py-(s[1]+.56*t)*2.4);g.stroke()}})},
 /* estela cometa */
 streak(x1,y1,x2,y2,c,T){F.add(T||26,(g,e,k)=>{const x=x1+(x2-x1)*k,y=y1+(y2-y1)*k;g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(x,y,x-(x2-x1)*.35,y-(y2-y1)*.35);gr.addColorStop(0,c);gr.addColorStop(1,c+'00');g.strokeStyle=gr;g.lineWidth=18*(1-k*.4);g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x-(x2-x1)*.35,y-(y2-y1)*.35);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(x,y,8,0,7);g.fill()})},
 /* Wamba: abducción con platillo y rayo tractor + transformación */
 alien(p){const c='#7dff5a';F.cine(1900,c);
  F.add(75,(g,e,k)=>{const t=e.t,x=p.x,y=p.y,ty=y-440;
   const ux=x-250*(p.dir||1)+Math.sin(t*.1)*16,uy=t<16?y-1200+(ty-(y-1200))*F.ease(t/16):t<46?ty+Math.sin(t*.25)*9:ty+(y-1900-ty)*F.ease((t-46)/22);
   if(t>=12&&t<50){const a=t<20?(t-12)/8:t>44?(50-t)/6:1;g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,uy,0,y+10);gr.addColorStop(0,c+'cc');gr.addColorStop(1,c+'33');g.globalAlpha=a*.7;g.fillStyle=gr;g.beginPath();g.moveTo(ux-34,uy+20);g.lineTo(ux+34,uy+20);g.lineTo(x+150,y+10);g.lineTo(x-150,y+10);g.closePath();g.fill();
    for(let j=0;j<4;j++){const l=((t*.025+j/4)%1),yy=y+(uy+40-y)*l,rx=150+(34-150)*l;g.globalAlpha=a*(1-l*.5);g.strokeStyle='#eaffea';g.lineWidth=4;g.beginPath();g.ellipse(ux+(x-ux)*(1-l),yy,rx,rx*.3,0,0,7);g.stroke()}
    for(let i=0;i<18;i++){const l=((t*.022+i/18)%1),px=x+Math.sin(i*7.3+t*.09)*120*(1-l*.8),py=y+(uy+40-y)*l;g.globalAlpha=a*(1-l);g.fillStyle='#fff';g.fillRect(px-3,py-3,6,6)}g.restore()}
   F.ufo(g,ux,uy,2.1,t,c);
   if(t>=44&&!e.f1){e.f1=1;flashFx('#eaffea');G.shake=Math.max(G.shake,26);F.shock(x,y,c,520,40);F.shock(x,y,'#fff',340,30);F.cracks(x,y,c,380);F.sparks(x,y-120,c,40,16);for(let i=0;i<10;i++)fxBolt(x+(Math.random()-.5)*300,y,c)}
   if(t>=30&&!e.f2){e.f2=1;G.shake=Math.max(G.shake,10)}})},
 /* escuadrón de platillos cruzando el cielo (celebración del mate alien) */
 fleet(y,dir,c){const x0=dir>0?-300:LW+300,x1=dir>0?LW+300:-300;F.add(70,(g,e,k)=>{for(let i=0;i<3;i++){const kk=Math.min(1,Math.max(0,k*1.25-i*.09)),x=x0+(x1-x0)*kk,yy=y+Math.sin(kk*9+i)*30-i*50;g.save();g.globalAlpha=.9;F.ufo(g,x,yy,.8+(i?0:.3),e.t+i*3,c);g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(x,yy,x-dir*260,yy);gr.addColorStop(0,c+'88');gr.addColorStop(1,c+'00');g.fillStyle=gr;g.fillRect(Math.min(x,x-dir*260),yy-6,260,12);g.restore()}})}
};
window.FX=F;return F})();
/* ================= Nuevos regates y mates (MV) ================= */
const MV=(()=>{
const pk=a=>a[(rnd()*a.length)|0];
const DKN={9:'¡MOLINO!',10:'¡TOMAHAWK!',11:'¡MATE 360!',12:'¡DE ESPALDAS!',13:'¡DOBLE PUMP!',14:'¡ENTRE LAS PIERNAS!',15:'¡SUPERMAN!',16:'¡COBRA!'};
const DKC={9:'#ffd23d',10:'#ff5a3d',11:'#46e8ff',12:'#b266ff',13:'#3be08a',14:'#ff4fd8',15:'#4fa0ff',16:'#ff8a1a'};
const XN={11:'¡POR LA ESPALDA!',12:'¡ENTRE LAS PIERNAS!',13:'¡TIRÓN ATRÁS!',14:'¡HESITACIÓN!',15:'¡SERPIENTE!',16:'¡DOBLE GIRO!',17:'¡CAMBIO DE RITMO!',18:'¡RODILLAZO!'};
const M={H:{9:190,10:196,11:205,12:186,13:186,14:166,15:220,16:200},
 vk(p){return rnd()<.35?(rnd()*5|0):11+(rnd()*8|0)},
 cross(p){const k=p.vk|0;if(k<11)return;const hu=p===G.hu;if(hu||rnd()<.2)pop(p.x,p.y-270,XN[k],'#46e8ff',28);
  const o=opp(p);if(o&&o.t!==p.t&&dist(p,o)<260&&(o.st==='idle'||o.st==='cross')&&rnd()<.1+(p.s.reg-60)/450){o.st='fall';o.tt=0;o.fl=190;o.vx=(o.x>=p.x?1:-1)*8;o.vy=0;pop(o.x,o.y-280,'¡TOBILLOS!','#46e8ff',40);G.shake=Math.max(G.shake,10);burst(o.x,o.y-60,'#46e8ff',16,9);FX.shock(o.x,o.y,'#46e8ff',230,26);sfx('fall')}},
 dunk(p){if(p.alien||p.kia||p.mega||rageOn(p)||p.st!=='dunk')return;if(p.dkind>=1&&p.dkind<=5&&rnd()<.75){p.dkind=pk([9,10,11,12,13,14,15,16]);p.mvd=1}},
 tick(p){if(p.st!=='dunk'){p.mvd=0;return}const u=p.tt-p.dk0,k=p.dkind;
  if(k>=9&&k<=16){const c=DKC[k];
   if(u===2){pop(p.x,p.y-300,DKN[k],c,34);FX.sparks(p.x,p.y-60,c,10,8)}
   if(u>=3&&u<30&&G.fr%2===0)G.fx.push({k:'p',x:p.x-p.f*(10+rnd()*20),y:p.y-p.z-60-rnd()*120,vx:-p.f*2,vy:(rnd()-.5)*2,t:0,T:18,c,sz:12,g:0});
   if(u===20){const h=hoopOf(p),big=k===10||k===15;G.shake=Math.max(G.shake,big?16:9);FX.shock(h.x,h.y,c,big?420:300,big?36:28);FX.sparks(h.x,h.y-RIM_Z,c,big?36:22,big?15:11);
    if(k===9){FX.add(30,(g,e,q)=>{g.globalCompositeOperation='lighter';g.strokeStyle=c;g.shadowColor=c;g.shadowBlur=16;g.lineWidth=10*(1-q);g.globalAlpha=1-q;g.beginPath();g.arc(h.x,h.y-RIM_Z,60+q*150,0,6.283*Math.min(1,q*2.2));g.stroke()})}
    if(k===10){FX.cracks(h.x,h.y,c,320)}
    if(k===15){FX.streak(p.x0,p.y0-120,h.x,h.y-RIM_Z,c,24)}
    if(k===11||k===14)for(let i=0;i<14;i++)G.fx.push({k:'sh',x:h.x,y:h.y-RIM_Z,vx:(rnd()-.5)*14,vy:-rnd()*10,vr:(rnd()-.5)*.4,r:rnd()*6,s:10+rnd()*10,t:0,T:46,c,g:.6})}}},
 over(g,p,sc){if(!p.alien||!G||G.mode==='end')return;const H=210*sc*(CH[p.hdo||p.id].h||1),x=p.x,y=p.y-p.z-H*.5,f=G.fr;g.save();g.globalCompositeOperation='lighter';const r=H*(.78+.06*Math.sin(f*.2)),gr=g.createRadialGradient(x,y,r*.1,x,y,r);gr.addColorStop(0,'rgba(125,255,90,.28)');gr.addColorStop(1,'rgba(125,255,90,0)');g.fillStyle=gr;g.beginPath();g.ellipse(x,y,r*.8,r,0,0,7);g.fill();
  g.strokeStyle='rgba(200,255,180,.55)';g.lineWidth=2;for(let i=0;i<3;i++){const a=f*.07+i*2.09;g.beginPath();g.ellipse(x,y+H*.45,H*.38,H*.1,0,a,a+1.4);g.stroke()}g.restore()}};
return M})();
window.MV=MV;
