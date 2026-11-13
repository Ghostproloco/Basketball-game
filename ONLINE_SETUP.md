# Barrio online (gratis) — puesta en marcha

El barrio ya trae el código online (js/online.js). Para que funcione en rimverse.onrender.com solo hay que activar una base de datos en Firebase (gratis, plan Spark, sin tarjeta):

1. Consola de Firebase → tu proyecto `basketball-game-of` → **Build → Realtime Database → Crear base de datos**.
2. Elige la región (si es Europa, mira el paso 5) y empieza en **modo bloqueado**.
3. Pestaña **Reglas** → pega el contenido de `DATABASE_RULES.json` → **Publicar**.
4. Listo: al entrar al barrio con sesión iniciada verás el chip `🌐 N en línea`.
5. Solo si la base está en Europa u otra región distinta a EE. UU.: copia la URL que aparece arriba en la pestaña Datos
   (algo como `https://basketball-game-of-default-rtdb.europe-west1.firebasedatabase.app`) y añádela en `js/firebase-config.js`:
   `databaseURL: "ESA_URL",`

Detalles: salas de 10 jugadores (la 11.ª persona entra en otra sala), se envía posición solo al moverse (~4/s), y al salir te borras solo.
Sin Firebase (modo demo/local) funciona entre pestañas del mismo navegador.

## Salas por código y duelos 1 vs 1
- Pega el contenido nuevo de `DATABASE_RULES.json` en Realtime Database > Reglas (ahora incluye la ruta `duel`).
- Botón 🌐 del barrio: ves el código de tu sala; tu amigo lo escribe y entra. También puedes crear una sala nueva.
- Si estáis juntos en el barrio, acércate y pulsa RETAR: el otro acepta y juega un 1 vs 1 en directo (el que reta hace de anfitrión).

## Códigos de canje (menú > 🎟 CÓDIGO)
- `CALVOORO` → Teodoro Pelón ★ Dorado (85)
- `MAMBA24` → Dante Vipérez (105, con Forma Mamba, HOOK y DIVE)


## Códigos nuevos
- `GARZA35` → Octavio Zarza (Leyenda; también sale en sobres)


## Rankeado (v24)
Pega de nuevo el contenido de `DATABASE_RULES.json` en Firebase > Realtime Database > Reglas (añade el nodo `rank` con índice por `t`). Sin eso el TOP muestra jugadores simulados.
