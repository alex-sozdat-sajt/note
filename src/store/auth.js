import firebase from 'firebase/app'
 
export default {
    actions: {
        async LOGIN({dispatch, commit}, {email, password}) {

            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                const uid = await dispatch('GETUID')
                       
                
                let user={}
                user.uid = uid
                user.email = email
                 commit('ADDCURRENTUSER', user)
                    

            }catch(error) {
                alert(error)
                throw error
            }
        },
        async LOGOUT() {

            try {
                await firebase.auth().signOut()

            }catch(e) {
 
                throw e
            }
        },
        async REGISTER({dispatch, commit}, user) {
             
            try {
                await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                const uid = await dispatch('GETUID')
                 
                console.log('GETUID', uid)
                user.uid = uid
                commit('ADDUSER', user)


                
                
                //  await firebase.database().ref(`/users/${uid}/info`).set({
                //      bill: 10000,
                //      name: name
                     

                //  })
            //      await firebase.database().ref(`/users/${uid}/info`).set(state.tasks)
            }catch(e) {
                console.log(e)
                throw e
            }
        },
        async GETUID({commit}) {
          const currentUserFromFb =  await firebase.auth().currentUser 
          console.log('currentUserFromFb', currentUserFromFb.uid)
          commit('USERUIDFROMFBASE', currentUserFromFb.uid)
          return currentUserFromFb.uid ? currentUserFromFb.uid : null
          
        },
        
    }
}