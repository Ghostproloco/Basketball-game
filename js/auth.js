// ===== Cuentas: Firebase (Auth + Firestore) o modo demo local =====
(function(){
const cfg=window.FIREBASE_CONFIG,use=!!(cfg&&cfg.apiKey&&!/TU_|YOUR_/i.test(cfg.apiKey));
const FBX=window.FBX={mode:use?'firebase':'local',user:null,status:'',onStatus:null};
const st=s=>{FBX.status=s;if(FBX.onStatus)FBX.onStatus(s)};
const hhmm=()=>{const d=new Date();return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')};
const ES={'auth/invalid-email':'Correo no válido','auth/user-not-found':'No existe esa cuenta','auth/wrong-password':'Contraseña incorrecta','auth/invalid-credential':'Correo o contraseña incorrectos','auth/email-already-in-use':'Ese correo ya está registrado','auth/weak-password':'Contraseña muy débil (mínimo 6 caracteres)','auth/too-many-requests':'Demasiados intentos, espera un poco','auth/network-request-failed':'Sin conexión','auth/operation-not-allowed':'Activa Correo/contraseña en Firebase Authentication'};
const err=e=>new Error(ES[e&&e.code]||(e&&e.message)||'Error');
let timer=null,pending=null;
FBX.queueSave=s=>{pending=s;clearTimeout(timer);st('⏳ Guardando...');timer=setTimeout(()=>FBX.flush(),2500)};
FBX.flush=async()=>{clearTimeout(timer);if(!pending||!FBX.user)return;const s=pending;pending=null;try{await FBX.saveNow(s);st('☁ Guardado '+hhmm()+' ✓')}catch(e){pending=s;st('⚠ Sin conexión, se reintentará')}};
if(use){
 let M={},auth,db;
 const ready=(async()=>{const b='https://www.gstatic.com/firebasejs/10.12.2/';
  const[a,au,fs]=await Promise.all([import(b+'firebase-app.js'),import(b+'firebase-auth.js'),import(b+'firebase-firestore.js')]);
  const app=a.initializeApp(cfg);auth=au.getAuth(app);db=fs.getFirestore(app);M={...au,...fs}})();
 const mk=(u,name)=>({uid:u.uid,email:u.email,name:name||u.displayName||(u.email||'jugador').split('@')[0]});
 FBX.init=async()=>{await ready;return new Promise(res=>{const un=M.onAuthStateChanged(auth,u=>{un();FBX.user=u?mk(u):null;res(FBX.user)})})};
 FBX.signUp=async(name,email,pass)=>{await ready;try{const c=await M.createUserWithEmailAndPassword(auth,email,pass);if(name)await M.updateProfile(c.user,{displayName:name});FBX.user=mk(c.user,name);return FBX.user}catch(e){throw err(e)}};
 FBX.signIn=async(email,pass)=>{await ready;try{const c=await M.signInWithEmailAndPassword(auth,email,pass);FBX.user=mk(c.user);return FBX.user}catch(e){throw err(e)}};
 FBX.google=async()=>{await ready;const prov=new M.GoogleAuthProvider();
  try{const c=await M.signInWithPopup(auth,prov);FBX.user=mk(c.user);return FBX.user}
  catch(e){if(e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment'){await M.signInWithRedirect(auth,prov);return null}
   if(e.code==='auth/popup-closed-by-user'||e.code==='auth/cancelled-popup-request')throw new Error('Cancelaste el acceso con Google');throw err(e)}};
 FBX.signOut=async()=>{await ready;await M.signOut(auth);FBX.user=null};
 FBX.reset=async email=>{await ready;try{await M.sendPasswordResetEmail(auth,email)}catch(e){throw err(e)}};
 FBX.updateName=async n=>{await ready;await M.updateProfile(auth.currentUser,{displayName:n});FBX.user.name=n};
 FBX.loadSave=async()=>{await ready;const s=await M.getDoc(M.doc(db,'users',FBX.user.uid));return s.exists()&&s.data().data?JSON.parse(s.data().data):null};
 FBX.saveNow=async sv=>{await ready;const u=FBX.user;await M.setDoc(M.doc(db,'users',u.uid),{name:u.name,email:u.email,coins:sv.coins,gems:sv.gems||0,played:sv.played,wins:sv.wins,players:Object.keys(sv.owned).length,welcome:!!sv.welcome,data:JSON.stringify(sv),updated:M.serverTimestamp()},{merge:true});
  if(FBX.pubHook){try{const pr=FBX.pubHook(sv);if(pr)await M.setDoc(M.doc(db,'profiles',u.uid),{...pr,updated:M.serverTimestamp()},{merge:true})}catch(e){console.warn('perfil público',e)}}};
 const PP=p=>p.split('/');
 FBX.dbGet=async(path,id)=>{await ready;const s=await M.getDoc(M.doc(db,...PP(path),id));return s.exists()?{...s.data(),_id:s.id}:null};
 FBX.dbSet=async(path,id,data,merge=true)=>{await ready;await M.setDoc(M.doc(db,...PP(path),id),data,{merge})};
 FBX.dbDel=async(path,id)=>{await ready;await M.deleteDoc(M.doc(db,...PP(path),id))};
 FBX.dbList=async(path,o={})=>{await ready;const c=[];for(const w of o.where||[])c.push(M.where(...w));if(o.order)c.push(M.orderBy(o.order,o.desc?'desc':'asc'));c.push(M.limit(o.limit||30));const s=await M.getDocs(M.query(M.collection(db,...PP(path)),...c));return s.docs.map(d=>({...d.data(),_id:d.id}))};
 /* nombre de jugador único: usernames/{nombre en minúsculas} */
 FBX.claim=async(name,oldLower)=>{await ready;const low=name.toLowerCase(),u=FBX.user,ref=M.doc(db,'usernames',low),s=await M.getDoc(ref);if(s.exists()){return s.data().uid===u.uid}await M.setDoc(ref,{uid:u.uid,name});if(oldLower&&oldLower!==low){try{await M.deleteDoc(M.doc(db,'usernames',oldLower))}catch(e){}}return true};
}else{
 const U=()=>{try{return JSON.parse(localStorage.getItem('gh_users'))||{}}catch(e){return{}}},SU=o=>localStorage.setItem('gh_users',JSON.stringify(o));
 const hash=async s=>{try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return''+h}};
 const mk=(email,o)=>({uid:o.uid,email,name:o.name});
 FBX.init=async()=>{const e=localStorage.getItem('gh_sess'),o=U()[e];FBX.user=o?mk(e,o):null;return FBX.user};
 FBX.signUp=async(name,email,pass)=>{const u=U();if(u[email])throw new Error('Ese correo ya está registrado');u[email]={uid:'l'+Date.now().toString(36),name,h:await hash(email+pass)};SU(u);localStorage.setItem('gh_sess',email);FBX.user=mk(email,u[email]);return FBX.user};
 FBX.signIn=async(email,pass)=>{const u=U(),o=u[email];if(!o)throw new Error('No existe esa cuenta');if(o.h!==await hash(email+pass))throw new Error('Contraseña incorrecta');localStorage.setItem('gh_sess',email);FBX.user=mk(email,o);return FBX.user};
 FBX.google=async()=>{throw new Error('El acceso con Google se activa al conectar Firebase (ver README_FIREBASE.md)')};
 FBX.signOut=async()=>{localStorage.removeItem('gh_sess');FBX.user=null};
 FBX.reset=async()=>{throw new Error('En modo demo no hay correo de recuperación')};
 FBX.updateName=async n=>{const u=U();u[FBX.user.email].name=n;SU(u);FBX.user.name=n};
 FBX.loadSave=async()=>{const o=U()[FBX.user.email];return o&&o.data?JSON.parse(o.data):null};
 FBX.saveNow=async sv=>{const u=U(),o=u[FBX.user.email];if(!o)return;o.data=JSON.stringify(sv);SU(u);if(FBX.pubHook){const pr=FBX.pubHook(sv);if(pr)await FBX.dbSet('profiles',FBX.user.uid,pr)}};
 const DB=()=>{try{return JSON.parse(localStorage.getItem('gh_db'))||{}}catch(e){return{}}},SDB=o=>localStorage.setItem('gh_db',JSON.stringify(o));
 FBX.dbGet=async(path,id)=>{const d=DB();return d[path]&&d[path][id]?{...d[path][id],_id:id}:null};
 FBX.dbSet=async(path,id,data,merge=true)=>{const d=DB();d[path]=d[path]||{};d[path][id]=merge?{...(d[path][id]||{}),...data}:data;SDB(d)};
 FBX.dbDel=async(path,id)=>{const d=DB();if(d[path])delete d[path][id];SDB(d)};
 FBX.dbList=async(path,o={})=>{const d=DB();let a=Object.entries(d[path]||{}).map(([k,v])=>({...v,_id:k}));for(const[f,op,v]of o.where||[])a=a.filter(x=>op=='=='?x[f]===v:op=='>='?x[f]>=v:op=='<='?x[f]<=v:true);if(o.order)a.sort((x,y)=>(x[o.order]>y[o.order]?1:-1)*(o.desc?-1:1));return a.slice(0,o.limit||30)};
 FBX.claim=async(name,oldLower)=>{const low=name.toLowerCase(),d=DB();d.usernames=d.usernames||{};const c=d.usernames[low];if(c&&c.uid!==FBX.user.uid)return false;d.usernames[low]={uid:FBX.user.uid,name};if(oldLower&&oldLower!==low&&d.usernames[oldLower]&&d.usernames[oldLower].uid===FBX.user.uid)delete d.usernames[oldLower];SDB(d);return true};
}
})();
