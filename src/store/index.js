import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    currentuser: {},
    notesByUser:[],
    userUidFromFB:'',
    login:false
    

  },
  mutations: {
    
    USERUIDFROMFBASE(state, uid){
      state.userUidFromFB = uid
      console.log('USERUIDFROMFBASE uid', uid)
    },
    GETNOTEFROMFIREBASE(state, notesFromFbase){
      state.notesByUser = notesFromFbase
      console.log('notesFromFbase', notesFromFbase)
    },
    
    ADDCURRENTUSER(state, user){
       
      state.currentuser = user
      state.login = true
      
      
    },
    LOGOUT(state, user){
      state.notesByUser = []
      state.currentuser = user
      state.login = false
     
    },

    
    CREATENOTE(state, note){
    
      state.notesByUser.push(note)
       
      
      // localStorage.setItem('tasks', JSON.stringify(state.tasks))
      // localStorage.setItem('notesByUser', JSON.stringify(state.notesByUser))
      
    },
    
    
    

  },
  actions: {

    LOGOUT({commit}, user){
      commit('LOGOUT', user)
    }, 

    


   async GETNOTEFROMFIREBASE({commit, getters}){
      try {
       
        const fbVal =  await firebase.database().ref('notes').once('value')
              const notes = fbVal.val()   
              console.log('notes FB ', notes)
              // console.log('notes FB ', typeof(notes))
              var keys = Object.keys(notes); //получаем ключи объекта в виде массива
              // console.log('keys', keys);  
              // console.log(' ', keys); 
             
             
            //  console.log(' USERUIDFROMFBASE ' ,  getters.USERUIDFROMFBASE)
              let vm=this
              let result = []
              let results = []
              let uid = getters.USERUIDFROMFBASE

              for (let key in notes) {
                // console.log(' notes[key] ' ,  notes[key] )
                result.push(notes[key])
               
              }
              // console.log('result ' ,  result )
              
                for(let i=0; i<result.length; i++) {
                  
                   
                  for(let key in result[i]) {
                     
                     if(result[i][key] === uid) {
                      // console.log('!!!!!!!!!!!', result[i])
                       results.push(result[i]);
                      // console.log('results', results)
                    }
                  }
                } 
               commit('GETNOTEFROMFIREBASE', results)
                           
      }catch(e) {
        console.log(e)
        throw e
      }
    },
    
    ADDCURRENTUSER({commit}, user){
      commit('ADDCURRENTUSER', user)
    },

    
    


    async CREATENOTE({commit}, note){
      console.log('CREATENOTE', note)
      try {
         
         const uid = note.userIdFromFirebase
       
        await firebase.database().ref(`/notes`).push(note)
       
         commit('CREATENOTE', note) //может сдесь нужно добавить then 
    }catch(e) {
        alert(e)
        console.log(e)
        throw e
    }
       
      
    },
    UPDATETASK({commit}, task){
      commit('UPDATETASK',  task)
    }
    
  },
  getters:{
    LOGIN(state){
      return state.login
    },
    USERUIDFROMFBASE(state){
      return state.userUidFromFB
    },
    CURRENTUSER(state){
      return state.currentuser
    },
   
   
    NOTESBYUSER(state){
      return state.notesByUser
    },
      
    
  },
  modules: {
    auth
  }
})
 