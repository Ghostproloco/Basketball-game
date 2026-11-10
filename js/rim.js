// ===== Protectores de aro: Coloso (TITÁN) y Altaír (ALIEN) bloquean solos; Altaír machaca los alley-oops =====
(()=>{
const isRim=p=>{const w=CH[p.id].pw;return w==='TITÁN'||w==='ALIEN'},isAl=p=>CH[p.id].pw==='ALIEN';
// BLOQUEO AUTOMÁTICO: si un rival con balón / tiro / mate está en el área cerca de él, salta a taponar
const _t=MV.tick;
MV.tick=function(p){_t.apply(this,arguments);try{
 if(!isRim(p)||!G||G.mode!=='play'||G.n!==3||p.st!=='idle'||p.cd>0||p.frz>0||G.fr<(p.abk||0))return;
 const B=G.B,dh=HOOP[p.dir>0?0:1];
 if(isAl(p)){for(const o of G.P)if(o.t!==p.t&&o.st==='dunk'&&o.pbk&&G.fr-o.pbk<150&&dist(o,p)<520&&G.fr>=(p.abk2||0)){p.abk2=G.fr+240;p.f=o.x>=p.x?1:-1;swat(o,p);return}}
 for(const o of G.P){if(o.t===p.t||o.st==='fall')continue;
  const th=B.h===o||(B.dk&&B.dk.p===o)||(B.fl&&B.fl.p===o)||o.st==='dunk'||o.st==='shoot';
  if(th&&dist(o,dh)<470&&dist(o,p)<(isAl(p)?290:240)){p.f=o.x>=p.x?1:-1;p.abk=G.fr+80;doBlock(p);pop(p.x,p.y-300,'¡BLOQUEO!','#7ff',30);break}}
}catch(e){}};
// PLATILLOS: quien recibe un tapón de Altaír cae rodeado de ovnis y Altaír se queda con el balón
function ufoFx(v){const c='#7dff5a';FX.add(190,(g,e,k)=>{const al=Math.min(1,k*8,(1-k)*5);g.globalAlpha=al;
 for(let i=0;i<3;i++){const a=e.t*.09+i*2.094,ux=v.x+Math.cos(a)*115,uy=v.y-270+Math.sin(a)*26-Math.sin(e.t*.12+i)*8;
  g.save();g.globalCompositeOperation='lighter';const bm=g.createLinearGradient(ux,uy,ux,v.y);bm.addColorStop(0,c+'66');bm.addColorStop(1,c+'00');g.fillStyle=bm;g.beginPath();g.moveTo(ux-12,uy+10);g.lineTo(ux+12,uy+10);g.lineTo(v.x+Math.cos(a)*40+34,v.y);g.lineTo(v.x+Math.cos(a)*40-34,v.y);g.fill();g.restore();
  FX.ufo(g,ux,uy,.8,e.t+i*9,c)}
 g.save();g.globalCompositeOperation='lighter';g.strokeStyle=c;g.shadowColor=c;g.shadowBlur=14;g.lineWidth=3;g.beginPath();g.ellipse(v.x,v.y,70+Math.sin(e.t*.2)*8,18,0,0,7);g.stroke();g.restore();g.globalAlpha=1})}
const _sw=window.swat;
window.swat=function(p,o){_sw.apply(this,arguments);try{if(isAl(o)){const B=G.B;B.h=o;B.fl=B.dk=B.ps=null;B.last=null;B.vx=B.vy=B.vz=0;o.cd=Math.max(o.cd,12);ufoFx(p);G.shake=Math.max(G.shake,16);pop(o.x,o.y-330,'¡ABDUCIDO!','#7fffb0',40)}}catch(e){}};
// ALLEY-OOP: pase a Altaír cerca del aro → atrapa en el aire y machaca
window.ALLEY=function(t,s){try{
 if(!isAl(t)||G.n!==3||t.st!=='idle'||t.frz>0)return false;const h=hoopOf(t);if(dist(t,h)>560)return false;
 const B=G.B;B.h=t;t.cd=0;t.f=t.dir;t.x=h.x-t.dir*290;t.y=h.y+clamp(t.y-h.y,-110,110);
 pop(t.x,t.y-340,'¡ALLEY-OOP!','#7fffb0',42);G.lastPass={f:s.from,to:t,fr:G.fr};
 doDunk(t);if(t.st==='dunk'){G.shake=Math.max(G.shake,14);return true}return false}catch(e){return false}};
})();
