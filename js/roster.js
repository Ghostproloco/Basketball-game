// ===== Plantel, estadísticas, guardado y gacha =====
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),rnd=Math.random;
const SK5=['vel','tir','mat','reg','def'],SK=[...SK5,'pas','reb','agu'],SN={vel:'EXPLOSIÓN',tir:'PUNTERÍA',mat:'AL ARO',reg:'MANEJO',def:'MURO',pas:'VISIÓN',reb:'GARRA',agu:'AGUANTE'},DS=1,STB=.04,STCAP=99;
const RAR=[
 {k:'Común',c:'#b9c0cc',base:43,g:1.8,w:55,dup:40},
 {k:'Raro',c:'#4aa8ff',base:54,g:2.0,w:30,dup:80},
 {k:'Épico',c:'#c05cff',base:65,g:2.2,w:12,dup:160},
 {k:'Legendario',c:'#ffc21a',base:72,g:2.4,w:3,dup:400}];
const NAMES=['Kenji Ryu','Rayo Solar','Leo Montaña','Cool Max','Doc Afro','Akira Blaze','Zuri Rayas','Tito Cicatriz','Sunny Rubio','El Muro',
'Nico Tormenta','Pablo Sonrisas','Marcus Roots','Dylan Gold','Tanque Ruiz','Hiro Cinta','Dante Trenzas','Kai Braids','Rubito Trenza','Coach Barba',
'Rufo Fuego','Mango Trenzas','Azul Nova','Brócoli Jr.','Guiño Pérez','Samu Liso','Zen Trenzas','Aqua Trenza','Lima Rizos','Tío Bruno',
'Electro Blue','Punky Rosa','Ghost Frost','Plata Cool','Mega Afro','Rosa Neón','Rasta Rey','Samurái Nudo','Cap Azul','Barbas Mayor',
'Lima Rayo','Verde Cap','Roja Cap','Violeta Storm','Mr. Shades','Cresta Roja','Gafas Dre','Capitán Parche','Zanahoria','Fuego Trenza',
'Morada Wave','Rubio Platino','Trenza Noche','Visor Verde','Gorro Violeta','Sombra Shades'];
const LEG=[],EPI=[1,5,31,33,36,37,43,50,53,22,44,3,30,32,34,35,40,47],
 RARE=[4,6,7,8,13,15,17,21,23,27,28,38,41,42,45,46,49,54];
const ARCH={def:[9,14,19,29,39,55,44],vel:[1,5,15,30,40,22],tir:[4,3,33,13,8,35],vol:[32,43,47,37,45,31,36],reg:[7,6,17,21,27,46,53,16]};
const ARN={tir:'Tirador',vol:'Volador',vel:'Velocista',reg:'Manejador',def:'Muro',all:'Completo'};
const PAL=['#e63946','#2f6fe4','#f4c20d','#1fa35c','#8e44ad','#ff7a00','#14b8a6','#ec4899','#262b36','#f2f2f2','#1b2a6b','#8b1e3f','#7bd33c','#3fb5ff'];
function mul32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const hdi=id=>CH[id]&&CH[id].hd!=null?CH[id].hd:id;
const POSM={C:{vel:-12,tir:-6,mat:10,reg:-12,def:10},PF:{vel:-5,tir:-2,mat:7,reg:-8,def:6},SF:{vel:0,tir:2,mat:2,reg:0,def:0},SG:{vel:3,tir:9,mat:-4,reg:2,def:-5},PG:{vel:8,tir:3,mat:-9,reg:10,def:-4}},POW={C:['MURO','TERREMOTO'],PF:['TOMAHAWK','CAÑON'],SF:['RAYO','ESCUDO'],SG:['STEPBACK','FUEGO'],PG:['TURBO','CRUCE']},HGT={C:1.14,PF:1.08,SF:1.02,SG:.97,PG:.93};
const CH=NAMES.map((name,id)=>{
 const rar=LEG.includes(id)?3:EPI.includes(id)?2:RARE.includes(id)?1:0;
 let arch='all';for(const k in ARCH)if(ARCH[k].includes(id))arch=k;
 if(arch=='all'&&(id%3==0))arch=['tir','vol','vel','reg','def'][id%5];
 const r=mul32(id*7919+13),R=RAR[rar],base={};
 for(const k of SK5){let b=R.base+(r()-.5)*8;
  if(arch=='tir'&&k=='tir'||arch=='vol'&&k=='mat'||arch=='vel'&&k=='vel'||arch=='reg'&&k=='reg'||arch=='def'&&k=='def')b+=16;
  else if(arch=='vol'&&k=='vel'||arch=='tir'&&k=='reg'||arch=='def'&&k=='mat'||arch=='reg'&&k=='tir'||arch=='vel'&&k=='reg')b+=6;
  else if(arch!='all')b-=3;
  base[k]=b}
 const pos={def:'C',vol:'PF',all:'SF',tir:'SG',reg:'PG',vel:'PG'}[arch],M=POSM[pos];for(const k of SK5)base[k]=clamp(Math.round(base[k]*.45+(R.base+M[k])*.55),15,95);
 return{id,name,rar,arch,pos,h:HGT[pos]+(r()-.5)*.03,pw:POW[pos][id%2],base,jc:PAL[(id*3+(id>>2))%PAL.length]}});
function baseOf(c){if(c.b8)return c.b8;const b=c.base,id=c.id,cl=x=>clamp(Math.round(x),15,115);
 return c.b8={vel:b.vel,tir:b.tir,mat:b.mat,reg:b.reg,def:b.def,pas:b.pas!=null?b.pas:cl(b.reg*.75+b.tir*.25+(id%7)-3),reb:b.reb!=null?b.reb:cl(b.def*.55+b.mat*.45+(id%5)-2),agu:b.agu!=null?b.agu:cl((b.vel+b.def)/2+(id%9)-4)}}
// stats con tope 99 (nadie llega a 100 de overall); cada ★ (copia repetida) da +4% a todos los stats
function statsOf(id,lvl=1,st=0,mul=1){const c=CH[id],b=baseOf(c),o={};for(const k of SK)o[k]=clamp(Math.round(b[k]*(1+STB*st)*mul),1,STCAP);return o}
const ovrOf=s=>Math.round(SK.reduce((a,k)=>a+s[k],0)/SK.length*DS);
CH.push({id:56,name:'Coloso Okonkwo',title:'El Coloso Imparable',rar:3,arch:'def',pos:'C',h:1.22,wd:1.34,pw:'TITÁN',base:{vel:70,tir:80,mat:99,reg:76,def:99},jc:'#8e44ad'},
 {id:57,name:'Leandro Jaimes',title:'El Rey Corona',rar:3,arch:'all',pos:'SF',h:1.08,wd:1.08,pw:'CORONA',base:{vel:92,tir:88,mat:97,reg:88,def:92},jc:'#f4c20d'},
 {id:58,name:'Esteban Kuro',title:'Chef Triple',rar:3,arch:'tir',pos:'PG',h:.95,pw:'REY 3PT',base:{vel:94,tir:99,mat:62,reg:98,def:72},jc:'#2f6fe4'},
{id:59,name:'Long Chen',title:'Muralla de Jade',rar:3,arch:'def',pos:'C',h:1.3,wd:1.0,pw:'MURALLA',base:{vel:62,tir:78,mat:99,reg:60,def:99},jc:'#d0202e'},
{id:60,name:'Brandon Volcán',title:'El Póster Volador',rar:3,arch:'vol',pos:'PF',h:1.1,wd:1.08,pw:'PÓSTER',base:{vel:86,tir:62,mat:99,reg:78,def:84},jc:'#1d6fe0'},
{id:61,name:'Sael Volt',title:'El Relámpago',rar:3,arch:'reg',pos:'SG',h:1.04,wd:1.0,pw:'FANTASMA',base:{vel:97,tir:92,mat:82,reg:96,def:80},jc:'#2bb5e8'},
{id:62,name:'Milan Jokar',title:'El Mago del Pase',rar:3,arch:'all',pos:'C',h:1.14,wd:1.12,pw:'JOKER',base:{vel:66,tir:93,mat:94,reg:97,def:80},jc:'#e6b422'},
{id:63,name:'Darío Locura',title:'El Rebotador Loco',rar:3,arch:'def',pos:'PF',h:1.06,wd:1.0,pw:'REBOTE',base:{vel:86,tir:50,mat:88,reg:70,def:99},jc:'#d4146a'},
{id:64,name:'Benito Acero',title:'Muro de Acero',rar:3,arch:'def',pos:'C',h:1.04,wd:1.16,pw:'CANDADO',base:{vel:70,tir:45,mat:90,reg:55,def:99},jc:'#1f3fa8'});
Object.assign(CH[56].base,{vel:68,tir:62,mat:99,reg:70,def:97,reb:99,pas:60,agu:88});
Object.assign(CH[57].base,{vel:88,tir:86,mat:94,reg:86,def:88,pas:94,reb:86,agu:96});
Object.assign(CH[58].base,{vel:92,tir:99,mat:60,reg:98,def:70,pas:92,reb:58,agu:98});
Object.assign(CH[59].base,{vel:66,tir:70,mat:98,reg:64,def:99,pas:70,reb:98,agu:86});
Object.assign(CH[60].base,{vel:86,tir:62,mat:99,reg:76,def:82,pas:72,reb:92,agu:94});
Object.assign(CH[61].base,{vel:97,tir:92,mat:80,reg:99,def:78,pas:86,reb:58,agu:94});
Object.assign(CH[62].base,{vel:64,tir:93,mat:92,reg:95,def:78,pas:99,reb:92,agu:82});
Object.assign(CH[63].base,{vel:84,tir:50,mat:84,reg:68,def:97,pas:60,reb:99,agu:99});
Object.assign(CH[64].base,{vel:76,tir:56,mat:92,reg:66,def:99,pas:66,reb:99,agu:98});
const TEAMN=['Tigres del Asfalto','Cóndores Neón','Halcones de Barrio','Lobos del Muelle','Dragones Rojos','Reyes del Aro','Los Intocables','Fénix Urbano','Cobras de Acero','Titanes del Bloque','Panteras Nocturnas','Toros del Sur','Águilas del Puerto','Relámpagos','Samuráis del Parque','Gigantes de la 5ª','Vaqueros del Concreto'];
const TEAMS=(()=>{const by=(a,b)=>b.rar-a.rar||a.id-b.id,Gd=CH.filter(c=>c.id<56&&!c.hide&&(c.pos=='PG'||c.pos=='SG')).sort(by),Wg=CH.filter(c=>c.id<56&&!c.hide&&c.pos=='SF').sort(by),Bg=CH.filter(c=>c.id<56&&!c.hide&&(c.pos=='PF'||c.pos=='C')).sort(by),T=[];
 while(Wg.length&&Gd.length&&Bg.length)T.push([Gd.shift(),Wg.shift(),Bg.shift()]);
 while(Gd.length>=2&&Bg.length)T.push([Gd.shift(),Gd.pop(),Bg.shift()]);
 T[0][2]=CH[56];T[1][1]=CH[57];T[2][0]=CH[58];
 return T.map((m,i)=>{const ids=m.map(c=>c.id);return{name:TEAMN[i%TEAMN.length],col:PAL[(i*5+2)%PAL.length],ids,ovr:Math.round(ids.reduce((a,id)=>a+ovrOf(statsOf(id,1,0)),0)/3)}})})();
// ---- guardado ----
let SAVEKEY='gh3';
const newSave=()=>({coins:800,gems:0,owned:{12:{lvl:1,st:0},0:{lvl:1,st:0},2:{lvl:1,st:0},51:{lvl:1,st:0},9:{lvl:1,st:0}},sel:12,wins:0,played:0,snd:1,hats:{},hat:null,cfg:{sfx:1,mus:1,shake:1,taunt:1,stad:0}});
function fixSave(){
 if(save.gems==null)save.gems=0;
 if(!save.hidFix){save.hidFix=1;save.lineup=null;if(!save.owned[save.sel])save.sel=+Object.keys(save.owned)[0]}
 if(!save.hatOf)save.hatOf={};if(save.hat!=null){if(save.hatOf[save.sel]==null)save.hatOf[save.sel]=save.hat;save.hat=null}
 if(!save.career)save.career={games:0,wins:0,pts:0,reb:0,ast:0,stl:0,blk:0,dnk:0,tpm:0};if(!save.cpts)save.cpts={};if(!save.used)save.used={};const need={PG:12,SG:0,SF:2,PF:51,C:9};for(const p in need)if(!Object.keys(save.owned).some(i=>CH[i].pos===p))save.owned[need[p]]={lvl:1,st:0};
 if(!save.gift1){save.gift1=1;save.lineup=null}
 for(const id in save.owned){const o=save.owned[id];if(!o.v2){o.st=Math.min(5,(o.st||0)+Math.floor(((o.lvl||1)-1)/2));o.lvl=1;o.v2=1}}
 if(!save.cfg)save.cfg={sfx:1,mus:1,shake:1,taunt:1,stad:0};if(!save.hats)save.hats={};if(save.cfg.v!==3){delete save.cfg.btn;save.cfg.v=3}if(save.hat===undefined)save.hat=null;
 if(!save.owned[save.sel])save.sel=+Object.keys(save.owned)[0];if(save.lineup&&save.lineup.some(i=>i<0))save.lineup=null}
let save=(()=>{try{const s=JSON.parse(localStorage.getItem(SAVEKEY));if(s&&s.owned)return s}catch(e){}return newSave()})();
fixSave();
function adoptSave(o,key){if(key)SAVEKEY=key;for(const k of Object.keys(save))delete save[k];Object.assign(save,o);fixSave()}
const cfgv=k=>!save.cfg||save.cfg[k]!==0;
const store=()=>{try{localStorage.setItem(SAVEKEY,JSON.stringify(save))}catch(e){}$$('.cn').forEach(e=>e.textContent=save.coins);$$('.gm').forEach(e=>e.textContent=save.gems||0);if(window.FBX&&FBX.user)FBX.queueSave(save)};
const MAXLV=10,MAXST=5,upCost=lv=>80*lv;
const myStats=id=>{const o=save.owned[id];return statsOf(id,o.lvl,o.st)};
const PACKS=[{n:'SOBRE BÁSICO',cost:100,cnt:1,min:0,b:0,e:'📦',lm:1},{n:'SOBRE PLATA',cost:450,cnt:3,min:1,b:.15,e:'🥈',lm:2},{n:'SOBRE ORO',cost:1000,cnt:5,min:1,b:.35,e:'🥇',lm:3},{n:'SOBRE LEYENDA',cost:2500,cnt:5,min:2,b:.8,e:'👑',lm:4},{n:'SOBRE DE BIENVENIDA',cost:0,cnt:10,min:2,max:2,all:1,nl:1,b:0,e:'🎁',welcome:1}];
const SPEC=[56,57,58,59,60,61,62,63,64],LEGP=.00015; // los 9 legendarios: solo por probabilidad ultra baja (0.015% cada uno por carta x multiplicador del sobre)
function rollGacha(minR=0,b=0,pk={}){if(!pk.nl)for(const id of SPEC)if(rnd()<LEGP*(pk.lm||1))return CH[id];
 const mx=pk.max==null?2:pk.max,W=RAR.map((r,i)=>(i<minR||i>mx)?0:r.w*(i==0?1-b:1+b*i*1.5)),TT=W.reduce((a,c)=>a+c,0);let x=rnd()*TT,ri=0;for(let i=0;i<W.length;i++){if(x<W[i]){ri=i;break}x-=W[i]}
 const pool=CH.filter(c=>c.rar==ri&&!c.hide&&!SPEC.includes(c.id)&&!c.hide);return pool.length?pool[rnd()*pool.length|0]:CH[rnd()*50|0]}
function grantChar(c){ // devuelve {isNew,coins,star}
 const o=save.owned[c.id];
 if(!o){save.owned[c.id]={lvl:1,st:0};return{isNew:true}}
 if(o.st<MAXST){o.st++;return{star:true}}
 const g=RAR[c.rar].dup;save.coins+=g;return{coins:g}}
// ---- rival ----
function pickRival(diff){
 const w=[[70,25,5,0],[35,35,22,8],[8,25,40,27]][diff];let x=rnd()*100,ri=0;
 for(let i=0;i<4;i++){if(x<w[i]){ri=i;break}x-=w[i]}
 let pool=CH.filter(c=>c.rar==ri&&c.id!=save.sel&&!c.hide);if(!pool.length)pool=CH.filter(c=>c.id!=save.sel&&!c.hide);
 const c=pool[rnd()*pool.length|0];
 const lv=[[1,3],[3,6],[6,10]][diff],lvl=lv[0]+(rnd()*(lv[1]-lv[0]+1)|0);
 return{id:c.id,lvl,st:diff==2?2+(rnd()*3|0):diff==1?rnd()*3|0:0}}
const hexRgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
function colDist(a,b){const x=hexRgb(a),y=hexRgb(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])}
function rivalColor(own,pref){if(colDist(own,pref)>170)return pref;
 const c=PAL.filter(p=>colDist(own,p)>190);return c[rnd()*c.length|0]}
