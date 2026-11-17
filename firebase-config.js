/* Configuración de Firebase para Radar CEDIS.
   Pega aquí los valores de tu app web de Firebase (Configuración del proyecto > Tus apps > Configuración del SDK).
   NO pegues este archivo con valores en chats. Solo estos campos hacen falta; Analytics no se usa. */

/* Configuración de Firebase - Radar CEDIS */
 
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyA1Vhtfmz2un-6gld448w-_HVjf_HJCN0I",
  authDomain: "radar-cedis.firebaseapp.com",
  projectId: "radar-cedis",
  storageBucket: "radar-cedis.firebasestorage.app",
  messagingSenderId: "630114081260",
  appId: "1:630114081260:web:deec0b35f405c4c0b648c9",
  measurementId: "G-B6HBG845N9"
};
 
// Inicializar Firebase
if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(window.FIREBASE_CONFIG);
  }
}
