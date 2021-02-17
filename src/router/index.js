import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '@/views/Create.vue'
import List from '@/views/List.vue'
import Registration from '@/views/Registration.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import store from '@/store'
 
 

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/create',
    name: 'create',
    component: Create,
    beforeEnter (to, from, next) {
      console.log('beforeenter')
      if(store.getters.LOGIN){
        next()
      }
    } 
 

  },
  {

    path: '/list',
    name: 'list',
    component: List,
    beforeEnter (to, from, next) {
      console.log('beforeenter')
      if(store.getters.LOGIN){
        next()
      }
    }

  },
   
  {
    path: '/registration',
    name: 'registration',
    component: Registration
     
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
   
})

export default router
