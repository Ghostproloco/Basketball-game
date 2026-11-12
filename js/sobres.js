// ===== SOBRES v20: sobres rediseñados, garantía de legendario, rango Leyenda, ropa (outfits) con accesorios y auras =====
(()=>{
PACKS.push({n:'SOBRE CLÁSICO',cost:5000,cnt:3,min:2,b:0,e:'🏆',lm:0,cl:1});
// ---- helpers de UI ----
const tip=t=>{const e=$('#gtip');if(e)e.textContent=t};
const RC=r=>RAR[r].c;
function confetti(c,n){const host=$('#gacha');for(let i=0;i<n;i++){const s=document.createElement('span');s.className='cf';const a=Math.random()*6.283,d=120+Math.random()*260;s.style.cssText=`--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d-80}px;--r:${Math.random()*720-360}deg;background:${i%3?c:'#fff'};animation-delay:${Math.random()*.15}s`;host.appendChild(s);setTimeout(()=>s.remove(),1500)}}
const leg=()=>SPEC.map(id=>CH[id]).filter(c=>c&&!c.hide&&c.rar===3),ley=()=>CH.filter(c=>c.rar===4);
const pick=a=>a[rnd()*a.length|0];window.LEYS=ley;
function odds(pk){ // % de la carta garantizada del sobre
 if(pk.cl)return[0,0,55,25,20];const mx=pk.max==null?2:pk.max,W=RAR.map((r,i)=>(i<pk.min||i>mx||i>3)?0:r.w*(i==0?1-pk.b:1+pk.b*i*1.5)),T=W.reduce((a,c)=>a+c,0)||1;return W.map(w=>w/T*100)}
function rollClassic(){const x=rnd();if(x<.2)return pick(ley());if(x<.45)return pick(leg());return pick(CH.filter(c=>c.rar===2&&!c.hide))}
const tabs=t=>`<div class="gtabs g2"><button data-t="p" class="${t==='p'?'on':''}">🃏 JUGADORES</button><button data-t="o" class="${t==='o'?'on':''}">👕 ROPA</button></div>`;
const obar=a=>`<div class="obar">${a.map((w,i)=>w>0?`<i style="flex:${w};background:${RC(i)}" title="${RAR[i].k} ${w.toFixed(1)}%"></i>`:'').join('')}</div>`;
const odl=a=>a.map((w,i)=>w>0?`<u style="--c:${RC(i)}">${RAR[i].k.slice(0,3)} ${w<1?w.toFixed(1):Math.round(w)}%</u>`:'').join('');
function packCard(i,p,kind){const pc=PKC[Math.min(i,4)]||PKC[2],ok=save.coins>=p.cost,o=odds(p),sub=p.cl?`${p.cnt} cartas · ¡LEYENDAS!`:`${p.cnt} carta${p.cnt>1?'s':''}${p.min?' · mín. '+RAR[p.min].k:''}`;
 const col=p.cl?['#ff5ce1','rgba(255,92,225,.55)']:pc;
 return`<button class="pk2${ok||!p.cost?'':' dis'}${p.welcome?' wel':''}${p.cl?' clas':''}" data-i="${i}" style="--pc:${col[0]};--pg:${col[1]}"><div class="p2art"><span>${p.e}</span><i class="sh"></i><em></em></div><b>${p.n}</b><small>${sub}</small>${obar(o)}<div class="p2od">${odl(o)}</div><div class="p2pr">${p.cost?p.cost+' 🪙':'¡GRATIS!'}</div></button>`}
function pityBar(n,max,lbl,cls){let h='';for(let i=0;i<max;i++)h+=`<i class="${i<n?'on':''}"></i>`;return`<div class="pity ${cls||''}"><b>${lbl}</b><div class="pbar">${h}</div><small>${n}/${max}</small></div>`}
let oddsOpen=false;
window.renderPacks=function(){gTab='p';const own=Object.keys(save.owned).length,tot=CH.filter(c=>!c.hide).length,lo=ley().filter(c=>save.owned[c.id]).length,lg=leg().filter(c=>save.owned[c.id]).length;
 const wel=save.welcome?`<div class="pkrow">${packCard(4,PACKS[4])}</div>`:'';
 const main=[0,1,2,3].map(i=>packCard(i,PACKS[i])).join('');
 const mini=(ids,cls)=>`<div class="glr">${ids.map(id=>{const c=CH[id],h=!!save.owned[id];return`<div class="gl ${cls}${h?' own':''}" style="--c:${RC(c.rar)}"><img src="${figImg(id,c.jc)}"><b>${c.name.split(' ')[0]}</b>${h?'<i>✓</i>':''}</div>`}).join('')}</div>`;
 $('#gpk').innerHTML=tabs('p')+wel+pityBar(save.pity||0,10,'🌟 SOBRE LEYENDA: ¡cada 10 sobres te da un LEGENDARIO seguro!','gold')+`<div class="pkrow">${main}</div>`+pityBar(save.cpity||0,5,'🏆 SOBRE CLÁSICO: ¡cada 5 sobres te da una LEYENDA segura!','holo')+`<div class="pkrow">${packCard(5,PACKS[5])}</div>
 <div class="coll"><span>📚 Colección <b>${own}/${tot}</b></span><span>⭐ Legendarios <b>${lg}/${leg().length}</b></span><span>💎 Leyendas <b>${lo}/${ley().length}</b></span><button id="g-odds" class="btn small ghost">ℹ PROBABILIDADES</button></div>
 ${oddsOpen?`<div class="oddsp">${[0,1,2,3,5].map(i=>{const p=PACKS[i];return`<div><b>${p.e} ${p.n}</b><span>${odl(odds(p))}${i<4?` · Legendario extra ${(LEGP*(p.lm||1)*100).toFixed(3)}%/carta`:''}${i===3?' · Leyenda 0.4%/carta':''}${i===5?' · garantiza ≥1 Legendario':''}</span></div>`}).join('')}</div>`:''}
 <div class="glt2">💎 LEYENDAS (solo Sobre Clásico)</div>${mini(ley().map(c=>c.id),'ly')}<div class="glt2">⭐ LEGENDARIOS</div>${mini(leg().map(c=>c.id),'lg')}`;
 bindP()};
function bindP(){$$('#gpk .pk2').forEach(b=>b.onclick=()=>gOpen(+b.dataset.i));$$('#gpk .gtabs button').forEach(b=>b.onclick=()=>{b.dataset.t==='o'?renderOutfits():renderPacks()});const bo=$('#g-odds');if(bo)bo.onclick=()=>{oddsOpen=!oddsOpen;renderPacks()}}
// ---- abrir sobre de jugadores ----
window.gOpen=function(n){const pk=PACKS[n];if(!pk)return;if(save.coins<pk.cost){tip('No tienes monedas suficientes 😢 ¡Juega partidos para ganar más!');sfx('buzz');return}
 save.coins-=pk.cost;if(pk.welcome)save.welcome=0;let guar=0,cs=[];
 if(n===3){save.pity=(save.pity||0)+1;if(save.pity>=10){save.pity=0;guar=3}}
 if(pk.cl){save.cpity=(save.cpity||0)+1;if(save.cpity>=5){save.cpity=0;guar=4}}
 for(let i=0;i<pk.cnt;i++){let c=pk.cl?rollClassic():rollGacha((pk.all||i==pk.cnt-1)?pk.min:0,pk.b,pk);if(n===3&&rnd()<.004)c=pick(ley());cs.push(c)}
 if(guar===3&&!cs.some(c=>c.rar>=3))cs[cs.length-1]=pick(leg());
 if(guar===4&&!cs.some(c=>c.rar===4))cs[cs.length-1]=pick(ley());
 if(pk.cl&&!cs.some(c=>c.rar>=3))cs[cs.length-1]=pick(leg());
 gres=cs.map(c=>({c,r:grantChar(c)})).sort((a,b)=>a.c.rar-b.c.rar);store();gi=0;gMode('reveal');
 const best=Math.max(...gres.map(x=>x.c.rar));$('#gcard').classList.add('hidden');$('#g-next').classList.add('hidden');
 playOpen(pk,best,guar,()=>gShow())};
function playOpen(pk,best,guar,done){let o=$('#gpo');if(!o){o=document.createElement('div');o.id='gpo';$('#gacha').appendChild(o)}
 const c=RC(best);o.style.setProperty('--c',c);o.innerHTML=`<div class="po-r"></div><div class="po-p">${pk.e}</div><div class="po-t">${guar?(guar===4?'💎 ¡LEYENDA GARANTIZADA!':'🌟 ¡LEGENDARIO GARANTIZADO!'):'ABRIENDO…'}</div>`;o.className='on';sfx('card');
 let fin=false;const end=()=>{if(fin)return;fin=true;o.className='boom';if(best>=2){const f=$('#flash');f.style.background=c;f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}setTimeout(()=>{o.className='';done()},420)};
 o.onclick=end;setTimeout(end,1500)}
window.gShow=function(){const{c,r}=gres[gi],R=RAR[c.rar],card=$('#gcard'),fr=$('#gfront');
 card.classList.remove('flip','shake','hidden');card.style.setProperty('--rc',R.c);card.dataset.r=c.rar;void card.offsetWidth;fr.dataset.r=c.rar;
 const o=save.owned[c.id];fr.style.setProperty('--rc',R.c);fr.parentElement.style.setProperty('--rc',R.c);
 const s=statsOf(c.id,o.lvl,o.st);
 fr.innerHTML=`${c.rar>=3?`<div class="rib">${c.rar===4?'💎 LEYENDA':'⭐ LEGENDARIO'}</div>`:''}<canvas width="300" height="300" data-id="${c.id}" data-col="${c.jc}"></canvas><div class="nm">${c.name}</div><div class="rr">★ ${R.k} · ${c.pos} · ${PWN[c.pw]||c.pw} · ${c.title||ARN[c.arch]}</div><div class="ovrb">OVR ${ovrOf(s)}</div>${r.isNew?'<div class="new">¡NUEVO!</div>':r.star?'<div class="new" style="color:#ffe45c">¡COPIA! +1★ (+'+Math.round(STB*100)+'% stats)</div>':`<div class="new" style="color:#ffb347">Copia máx → +${r.coins}🪙</div>`}`;
 mountPreviews(fr);card.classList.add('shake');gstate='back';$('#g-next').classList.add('hidden');
 let ry=$('#grays');if(!ry){ry=document.createElement('div');ry.id='grays';$('#gstage').insertBefore(ry,$('#gstage').firstChild)}ry.className='';ry.style.setProperty('--rc',R.c);
 tip(gres.length>1?`Carta ${gi+1}/${gres.length} · ¡Tócala!`:'¡Toca la carta!')};
$('#gcard').onclick=()=>{if(gstate!=='back')return;gstate='front';const c=gres[gi].c,card=$('#gcard');card.classList.remove('shake');card.classList.add('flip');
 if(c.rar>=2){const f=$('#flash');f.style.background=RAR[c.rar].c;f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}
 sfx(c.rar>=3?'legend':'card');if(c.rar>=3){const ry=$('#grays');if(ry)ry.className='on';confetti(RAR[c.rar].c,c.rar===4?60:36)}else if(c.rar===2)confetti(RAR[2].c,14);
 setTimeout(()=>{const last=gi>=gres.length-1,nb=$('#g-next');nb.classList.remove('hidden');nb.textContent=last?(gres.length>1?'RESUMEN ▶':'OTRA VEZ ▶'):'SIGUIENTE ▶';tip('')},700)};
$('#g-next').onclick=()=>{const ry=$('#grays');if(ry)ry.className='';if(gstate==='sum'){gReset();return}
 if(gi<gres.length-1){gi++;gShow();return}
 if(gres.length>1){gMode('sum');$('#gcard').classList.add('hidden');gstate='sum';
  $('#gsum').innerHTML=gres.map(({c,r})=>`<div class="rc rk${c.rar}" style="--rc:${RAR[c.rar].c}"><img src="${figImg(c.id,c.jc)}"><b>${c.name}</b><small>${RAR[c.rar].k}</small><i>${r.isNew?'¡NUEVO!':r.star?'+1★':'+'+r.coins+'🪙'}</i></div>`).join('');
  $('#gsum').classList.remove('hidden');$('#g-next').textContent='OTRO SOBRE ▶';$('#g-next').classList.remove('hidden');tip('¡Contenido del sobre!')}
 else gReset()};
window.SB={tip,RC,confetti,pick,obar,odl,pityBar,tabs};

})();
