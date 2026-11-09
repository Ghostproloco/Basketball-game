// ===== Cuenta ADMIN: todos los jugadores (con todos sus poderes) al máximo, siempre =====
(()=>{
const ADMIN=['ricardojmrxd@gmail.com'];
const isAdmin=()=>{try{const u=FBX&&FBX.user;return !!(u&&u.email&&ADMIN.includes(String(u.email).trim().toLowerCase()))}catch(e){return false}};
function apply(){if(!isAdmin()||typeof save==='undefined'||!save)return false;
 let ch=0;const ids=Array.isArray(CH)?CH.map((_,i)=>i):Object.keys(CH).map(Number);
 if(!save.owned)save.owned={};
 for(const id of ids){if(!CH[id])continue;const o=save.owned[id];if(!o){save.owned[id]={lvl:1,st:5,v2:1};ch=1}else if(o.st<5||!o.v2){o.st=5;o.v2=1;o.lvl=o.lvl||1;ch=1}}
 if((save.coins||0)<999999){save.coins=999999;ch=1}if((save.gems||0)<9999){save.gems=9999;ch=1}
 if(!save.admin){save.admin=1;ch=1}
 return ch}
window.__adm=apply;
const _ea=window.enterAccount;
if(typeof _ea==='function')window.enterAccount=async function(){const r=await _ea.apply(this,arguments);try{if(apply()){store();try{renderMenu()}catch(e){}}const n=document.querySelector('#mUser');if(n&&isAdmin()&&!/👑/.test(n.textContent))n.textContent='👑 '+n.textContent}catch(e){}return r};
window.isAdmin=isAdmin;
})();
