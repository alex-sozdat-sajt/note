import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
// Your web app's Firebase configuration
 
  // Initialize Firebase
 
   
  firebase.initializeApp( {
    apiKey: "AIzaSyCVbzjjja_9-ZmGsXiNr-KYl7-ebeygScA",
    authDomain: "note-f1921.firebaseapp.com",
    databaseURL: "https://note-f1921-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "note-f1921",
    storageBucket: "note-f1921.appspot.com",
    messagingSenderId: "815553208476",
    appId: "1:815553208476:web:903304e6b1dc4709b94d59"
  });

 let app

firebase.auth().onAuthStateChanged(()=>{
  if (!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
    
})

 
 