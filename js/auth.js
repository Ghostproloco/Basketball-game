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
 FBX.saveNow=async sv=>{await ready;const u=FBX.user;await M.setDoc(M.doc(db,'users',u.uid),{name:u.name,email:u.email,coins:sv.coins,played:sv.played,wins:sv.wins,players:Object.keys(sv.owned).length,welcome:!!sv.welcome,data:JSON.stringify(sv),updated:M.serverTimestamp()},{merge:true})};
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
 FBX.saveNow=async sv=>{const u=U(),o=u[FBX.user.email];if(!o)return;o.data=JSON.stringify(sv);SU(u)};
}
})();
