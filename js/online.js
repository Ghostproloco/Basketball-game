// ===== Barrio ONLINE: presencia de jugadores (Realtime Database gratis o BroadcastChannel en modo local) =====
(function(){
const cfg=window.FIREBASE_CONFIG,use=!!(cfg&&cfg.apiKey&&!/TU_|YOUR_/i.test(cfg.apiKey));
const MAXR=10; // jugadores por sala
const O=window.ONL={peers:{},status:'off',n:0,uid:null,room:null};
let tr=null,cur={};
const rid=()=>{try{let v=sessionStorage.getItem('ghuid');if(!v){v='l'+Math.random().toString(36).slice(2,8);sessionStorage.setItem('ghuid',v)}return v}catch(e){return 'l'+Math.random().toString(36).slice(2,8)}};
function apply(map){const now=Date.now();for(const u in map){if(u===O.uid)continue;const d=map[u];if(!d||typeof d!=='object')continue;let p=O.peers[u];if(!p)p=O.peers[u]={dx:d.x,dy:d.y,uid:u};const raw=JSON.stringify(d);if(p._raw!==raw){p._raw=raw;p.seen=now}for(const k in d)p[k]=d[k]}
 for(const u in O.peers)if(!map[u]||now-O.peers[u].seen>25000)delete O.peers[u];O.n=Object.keys(O.peers).length}
function localT(room){const ch=new BroadcastChannel('gh-barrio-'+room),map={};O.room=room;
 ch.onmessage=e=>{const m=e.data;if(!m||!m.u||m.u===O.uid)return;if(m.ask){if(cur.x!=null)ch.postMessage({u:O.uid,d:cur});return}if(m.bye)delete map[m.u];else map[m.u]=Object.assign(map[m.u]||{},m.d);apply(map)};
 return{join(d){cur=Object.assign({},d);ch.postMessage({u:O.uid,d:cur});ch.postMessage({u:O.uid,ask:1});return Promise.resolve()},set(p){Object.assign(cur,p);ch.postMessage({u:O.uid,d:p})},leave(){try{ch.postMessage({u:O.uid,bye:1});ch.close()}catch(e){}}}}
const norm=c=>String(c||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8);O.norm=norm;
const wait=(p,ms)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),ms))]);
async function fbT(want){const b='https://www.gstatic.com/firebasejs/10.12.2/';const[a,d]=await Promise.all([import(b+'firebase-app.js'),import(b+'firebase-database.js')]);
 const app=a.getApps().length?a.getApp():a.initializeApp(cfg);const db=d.getDatabase(app,cfg.databaseURL);let room=want||'R1';
 if(want){const s=await wait(d.get(d.ref(db,'barrio/'+want)),9000);const v=s.val()||{};if(!v[O.uid]&&Object.keys(v).length>=MAXR)throw new Error('full')}
 else for(let i=1;i<=5;i++){const s=await wait(d.get(d.ref(db,'barrio/R'+i)),9000);const v=s.val()||{};if(v[O.uid]||Object.keys(v).length<MAXR){room='R'+i;break}}
 O.room=room;let r=null,un=null;
 return{join(dd){cur=Object.assign({},dd);r=d.ref(db,'barrio/'+room+'/'+O.uid);d.onDisconnect(r).remove();un=d.onValue(d.ref(db,'barrio/'+room),s=>apply(s.val()||{}));return wait(d.set(r,cur),9000)},set(p){Object.assign(cur,p);if(r)d.update(r,p).catch(()=>{})},leave(){try{if(un)un();if(r)d.remove(r)}catch(e){}}}}
O.join=async(st,code)=>{if(O.status==='on'||O.status==='joining')return;if(window.save&&save.bonl===0){O.status='off';return}
 O.status='joining';try{if(use&&!(window.FBX&&FBX.user)){O.status='guest';return}O.uid=use?FBX.user.uid:rid();const want=norm(code)||null;tr=use?await fbT(want):localT(want||'R1');await tr.join(st);O.status='on'}catch(e){console.warn('online',e);O.status=e&&e.message==='full'?'full':'error';try{tr&&tr.leave()}catch(x){}tr=null}};
O.go=async(code,st)=>{const old=O.room;O.leave();O.status='off';await O.join(st,code);return O.status};
O.set=p=>{if(O.status==='on'&&tr)tr.set(p)};
O.leave=()=>{if(tr){try{tr.leave()}catch(e){}tr=null}O.status='off';O.peers={};O.n=0};
// ---- canal de DUELO 1 vs 1 (mensajes rápidos entre dos jugadores) ----
O.duel=async(id,onmsg)=>{id=String(id).replace(/[^A-Za-z0-9_-]/g,'');
 if(!use){const ch=new BroadcastChannel('gh-duel-'+id);ch.onmessage=e=>{const m=e.data;if(m&&m.u!==O.uid)onmsg(m.o)};return{send(o){try{ch.postMessage({u:O.uid,o})}catch(e){}},close(){try{ch.close()}catch(e){}}}}
 const b='https://www.gstatic.com/firebasejs/10.12.2/';const[a,d]=await Promise.all([import(b+'firebase-app.js'),import(b+'firebase-database.js')]);
 const app=a.getApps().length?a.getApp():a.initializeApp(cfg),db=d.getDatabase(app,cfg.databaseURL),me=d.ref(db,'duel/'+id+'/'+O.uid);let n=0;const seen={};
 d.onDisconnect(me).remove();
 const un=d.onValue(d.ref(db,'duel/'+id),s=>{const v=s.val()||{};for(const u in v){if(u===O.uid)continue;const x=v[u];if(x&&x.s&&seen[u]!==x.n){seen[u]=x.n;try{onmsg(JSON.parse(x.s))}catch(e){}}}});
 return{send(o){n++;d.set(me,{s:JSON.stringify(o),n}).catch(()=>{})},close(){try{un();d.remove(me)}catch(e){}}}};
addEventListener('pagehide',()=>O.leave());
})();
