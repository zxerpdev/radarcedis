/* Radar CEDIS: conecta la app a Firestore.
   La app pedía su base con window.claude.use("db") y su usuario con window.claude.use("user").
   Este archivo define esas dos funciones con Firestore, así el resto del HTML no cambia.
   Requiere cargar antes: firebase-app-compat.js, firebase-firestore-compat.js y firebase-config.js. */
(function(){
  "use strict";

  var db = null;
  try{
    var cfg = window.FIREBASE_CONFIG || {};
    if(window.firebase && cfg.apiKey && cfg.projectId){
      if(!firebase.apps.length) firebase.initializeApp(cfg);
      db = firebase.firestore();
    }
  }catch(e){
    console.error("Firestore no pudo iniciar:", e);
    db = null;
  }

  /* Sin inicio de sesión de Firebase todavía, cada navegador recibe un id anónimo propio.
     Sirve para guardar "creado_por"; no identifica personas (ver DESVIACIONES.md). */
  function localId(){
    var k = "radarcedis_anon_id", v = null;
    try{ v = localStorage.getItem(k); }catch(e){}
    if(!v){
      v = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ("anon-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10));
      try{ localStorage.setItem(k, v); }catch(e){}
    }
    return v;
  }

  var user = {
    id: function(){ return Promise.resolve(localId()); },
    me: function(){ return Promise.resolve({name: null, avatarUrl: null}); },
    profiles: function(){ return Promise.resolve({}); }
  };

  window.claude = window.claude || {};
  window.claude.use = function(name){
    if(name === "db") return Promise.resolve(db);
    if(name === "user") return Promise.resolve(user);
    return Promise.resolve(null);
  };
})();
