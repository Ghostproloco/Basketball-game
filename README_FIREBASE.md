# Firebase para Gacha Hoops

El juego guarda en Firebase: cuenta (Authentication, correo y contraseña) y progreso (Firestore, documento `users/{uid}`).
Con `js/firebase-config.js` en `null` funciona en **modo demo** (cuentas solo en el navegador).

## Pasos
1. https://console.firebase.google.com -> **Añadir proyecto**.
2. **Authentication** -> Comenzar -> proveedor **Correo electrónico/contraseña** -> activar.
3. **Firestore Database** -> Crear base de datos (modo producción).
4. **Configuración del proyecto** -> Tus apps -> **Web (</>)** -> copia el objeto `firebaseConfig` en `js/firebase-config.js`
   (sustituye `window.FIREBASE_CONFIG = null;`).
5. **Authentication -> Configuración -> Dominios autorizados**: añade el dominio donde alojes el juego.
6. **Firestore -> Reglas** (cada jugador solo toca su documento):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
7. Sube la carpeta a **Firebase Hosting** (`firebase init hosting` y `firebase deploy`) o a cualquier hosting https.

## Login con Google
En Authentication -> Método de acceso -> **Google** -> Habilitar (elige un correo de asistencia). El dominio donde alojes el juego
debe estar en **Dominios autorizados**. El botón "Continuar con Google" sirve para registrarse y entrar (si es la primera vez recibe el sobre de bienvenida).
En modo demo (sin Firebase) el botón solo muestra un aviso.

## Administrar desde la consola
En Firestore -> `users` ves por jugador: `name`, `email`, `coins`, `played`, `wins`, `players`, `welcome` y `data` (progreso completo en JSON).
Puedes editar monedas/`data` a mano para dar premios o arreglar cuentas.

## Aviso
El progreso se guarda desde el cliente, así que un jugador con conocimientos podría modificar su propio documento.
Para un juego competitivo habría que mover premios y tiradas a Cloud Functions.
