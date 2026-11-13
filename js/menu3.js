/* MENÚ 3.0: nuevas entradas (Rankeado, Pase navideño, Entrenar), nieve, perfil con bandera/liga y avisos vivos */
(()=>{
const g=document.querySelector('.m2grid'),top=document.querySelector('.m2chips');if(!g)return;
const mk=(id,cl,ic,t,s,fn)=>{const b=document.createElement('button');b.className='tile '+cl;b.id=id;b.innerHTML=`<span class="ti">${ic}</span><b>${t}</b><small>${s}</small><span class="bdg" hidden></span>`;b.onclick=()=>{try{fn()}catch(e){console.error(e);toast('No se pudo abrir')}};g.appendChild(b);return b};
const bS=mk('b-season','season','🎄','PASE NAVIDAD','Recompensas épicas',()=>SEASON.open());
const bR=mk('b-rank','rank','🏅','RANKEADO','Liga y top mundial',()=>{if(window.MMX)MMX.ACT.rank()});
const bT=mk('b-train','train','🏋','ENTRENAR','Evoluciona a tus jugadores',()=>TRAIN.open());
/* perfil: bandera + liga */
const pc=document.createElement('button');pc.className='m2lg';pc.id='m2lg';pc.onclick=()=>{if(window.MMX)MMX.ACT.rank()};if(top)top.insertBefore(pc,top.firstChild);
function bdg(t0,t){const b=t0.querySelector('.bdg');if(!b)return;b.hidden=!t;b.textContent=t||''}
function upd(){try{if(window.RANK){const r=RANK.R(),l=RANK.LG[RANK.lgOf(r.t)];pc.innerHTML=`<span>${RANK.cinfo(r.cc)[2]}</span><i>${l.i}</i><b>${r.t}🏆</b>`;pc.style.setProperty('--lc',l.c);bR.querySelector('small').textContent=l.n+' · '+r.t+' 🏆'}
 if(window.SEASON){const s=SEASON.SP(),lv=SEASON.lv();let n=0;for(let l=1;l<=30;l++)for(const t of['f','p'])if(s.xp>=(l-1)*100&&!s.claimed[l+t]&&(t==='f'||s.prem))n++;bS.querySelector('small').textContent='Nivel '+lv+' · '+(n?n+' premios listos':'30 niveles');bdg(bS,n?'🎁 '+n:'NUEVO')}
 if(window.TRAIN){let p=0;for(const id in save.owned)p+=TRAIN.T(+id).pts;bT.querySelector('small').textContent=p?p+' puntos para gastar':'Evoluciona a tus jugadores';bdg(bT,p?'+'+p:'NUEVO')}}catch(e){}}
const _fm=window.fillMenu;if(_fm)window.fillMenu=function(){const r=_fm.apply(this,arguments);upd();return r};upd();
/* nieve en el fondo del menú */
const bg=document.getElementById('m2bg');
if(bg&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const cv=document.createElement('canvas');cv.className='m2snow';bg.appendChild(cv);const c=cv.getContext('2d'),F=[];for(let i=0;i<90;i++)F.push({x:Math.random(),y:Math.random(),z:Math.random(),p:Math.random()*6});
 (function L(t){requestAnimationFrame(L);const m=document.getElementById('menu');if(!m||m.classList.contains('hidden'))return;const w=cv.clientWidth|0,h=cv.clientHeight|0;if(cv.width!==w)cv.width=w;if(cv.height!==h)cv.height=h;c.clearRect(0,0,w,h);c.fillStyle='#fff';
  for(const f of F){f.y+=(.0006+f.z*.0022);f.x+=Math.sin(t*.001+f.p)*.0004;if(f.y>1.02){f.y=-.02;f.x=Math.random()}c.globalAlpha=.3+f.z*.6;c.beginPath();c.arc(f.x*w,f.y*h,.8+f.z*2.2,0,7);c.fill()}})()}
/* luces de navidad en el borde superior */
const ls=document.createElement('div');ls.className='m2lights';ls.innerHTML='<i></i>'.repeat(28);const m=document.getElementById('menu');if(m)m.appendChild(ls);
})();
