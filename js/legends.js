// ===== Nuevos jugadores: Rocco (épico regalo), 6 legendarios nuevos, Altaír (evento alien) y los invasores =====
(()=>{
window.hdi=id=>{const c=CH[id];return c&&c.hd!=null?c.hd:id};
const A=(id,o)=>{const c=Object.assign({id,rar:3,arch:'all',h:1,wd:1},o);CH.push(c);return c};
A(65,{name:'Calvo Rocco',title:'El Perro Guardián',rar:2,arch:'def',pos:'SG',h:1.0,wd:1.0,pw:'LADRÓN',gift:1,jc:'#c0392b',
 base:{vel:76,tir:72,mat:70,reg:76,def:84,pas:76,reb:68,agu:80}});            // media 75
A(66,{name:'Ladislao Brújula',title:'El Mago del Stepback',rar:3,arch:'all',pos:'SF',h:1.1,wd:1.08,pw:'MAESTRO',jc:'#2f6fe4',
 base:{vel:70,tir:99,mat:84,reg:95,def:68,pas:99,reb:84,agu:90}});
A(67,{name:'Zenón Altaír',title:'El Alien de 2,30',rar:3,arch:'def',pos:'C',h:1.44,wd:.98,pw:'ALIEN',jc:'#161b2e',hide:1,ev:1,
 base:{vel:80,tir:92,mat:98,reg:80,def:99,pas:82,reb:97,agu:92}});
A(68,{name:'Tomás Vigía',title:'El Cerebro de la Cancha',rar:3,arch:'reg',pos:'PG',h:1.0,wd:1.0,pw:'CEREBRO',jc:'#f4c20d',
 base:{vel:88,tir:92,mat:70,reg:94,def:74,pas:99,reb:60,agu:96}});
A(69,{name:'Nelo Brisa',title:'El Showman',rar:3,arch:'tir',pos:'PG',h:1.08,wd:1.0,pw:'SHOWTIME',jc:'#ec4899',
 base:{vel:90,tir:95,mat:80,reg:96,def:66,pas:98,reb:72,agu:84}});
A(70,{name:'Aníbal Ródenas',title:'La Hormiga Atómica',rar:3,arch:'vol',pos:'SG',h:1.0,wd:1.06,pw:'ATÓMICO',jc:'#ff7a00',
 base:{vel:97,tir:86,mat:96,reg:88,def:82,pas:76,reb:74,agu:96}});
A(71,{name:'Zorg Invasor',title:'Líder de la Invasión',rar:3,arch:'all',pos:'PF',h:1.22,wd:1.1,pw:'ALIEN',jc:'#3a2a8a',hide:1,ev:1,sk:'#7fc65a',
 base:{vel:92,tir:90,mat:97,reg:90,def:96,pas:88,reb:96,agu:99}});
A(72,{name:'Altaír Forma Alien',title:'Forma Alienígena',rar:3,arch:'def',pos:'C',h:1.55,wd:1.08,pw:'ALIEN',jc:'#161b2e',hide:1,form:1,sk:'#9bb83a',
 base:{vel:90,tir:96,mat:99,reg:86,def:99,pas:86,reb:99,agu:99}});
A(73,{name:'Kiro Brumas',title:'El Mago del Balón',rar:3,arch:'reg',pos:'PG',h:.98,wd:1.0,pw:'REGATE',jc:'#1d6fe0',
 base:{vel:96,tir:92,mat:86,reg:99,def:62,pas:90,reb:50,agu:90}});
A(74,{name:'Yago Antares',title:'El Griego Imparable',rar:3,arch:'vol',pos:'PF',h:1.2,wd:1.16,pw:'EUROSTEP',jc:'#2f8f3f',
 base:{vel:90,tir:48,mat:99,reg:78,def:95,pas:80,reb:96,agu:99}});
A(75,{name:'Blip Invasor',title:'Soldado Alien',rar:3,arch:'tir',pos:'SG',h:1.06,wd:1.0,pw:'ALIEN',jc:'#2a6a8a',hide:1,ev:1,hd:71,sk:'#6fbf55',
 base:{vel:96,tir:94,mat:88,reg:92,def:86,pas:86,reb:80,agu:98}});
A(76,{name:'Xark Invasor',title:'Soldado Alien',rar:3,arch:'def',pos:'C',h:1.28,wd:1.18,pw:'ALIEN',jc:'#6a2a5a',hide:1,ev:1,hd:71,sk:'#88c95e',
 base:{vel:84,tir:80,mat:99,reg:78,def:99,pas:80,reb:99,agu:99}});
// legendarios que salen por probabilidad ultra baja en los sobres (Altaír y los invasores: solo evento)
SPEC.push(66,68,69,70,73,74);
// regalo: Rocco para todo el mundo (cuentas nuevas y antiguas)
const _fx=fixSave;
fixSave=function(){const r=_fx.apply(this,arguments);try{if(save&&save.owned&&!save.owned[65]&&!save.karGift){save.owned[65]={lvl:1,st:0};save.karGift=1;save.karNew=1}else if(save&&save.owned&&save.owned[65])save.karGift=1;if(save&&save.tk==null)save.tk=0}catch(e){}return r};
try{fixSave()}catch(e){}
})();
