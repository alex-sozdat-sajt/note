<template>
  <div id="" class="row">
       
     
    <div class="col s6 offset-s3">
       <h4>Вы вышли</h4>
        
         
 
    </div>
    
    
      
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'registration',
  data: ()=>({
      password:'',
      name:'',
      email:'',
      userout:{
          email:'',
          name:'',
          password:''
      }
      
     

  }),
  computed:{
     ...mapGetters([
       
    ]),
  },
  methods:{
      ...mapActions([
        'ADDCURRENTUSER',
        'LOGOUT'
           
    ]),
    async logout(){
        
      
       await this.LOGOUT(this.userout)
       
            let vm = this
            setTimeout(()=>{vm.$router.push('/login')},3000)
            
      
            
       
         
    }

 
 
 

  },
  mounted() {
     this.logout()
    
  },

 
     
}
</script>

<style lang="scss">
 
</style>