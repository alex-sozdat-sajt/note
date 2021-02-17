<template>
  <div id="" class="row">
      <h5>Для использования приложения Вам необходимо зарегистрироваться</h5>
       
    <div   class="col s6 offset-s3">
       <form @submit.prevent="registrationForm">
          
  
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="text" class="" v-model="email">
          <label for="email">Введите ваш e mail</label>
        </div>
       
      </div>
      
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="text" :style="{color: color}" @input="onChange()" v-model="password">
          <span class="character-counter"  :style="{color: color}"  style="float:right; font-size:12px;" >{{password.length}}</span>
        </div>
      </div>
       <div class="row">
        <div class="input-field col s12">
          <input id="password_confirm" type="text" class="" v-model="passwordConfirm">
          <label for="password_coferm">Повторите пароль</label>
        </div>
      </div>
       
        <button class="btn " :class="{ disabled: !isActive }" type="submit">Зарегистрироваться</button>   
         <div class="row">
        <div class="input-field col s12">
          
              <div v-if="registered"><h5>Вы зарегистрированны, войдите со своим логином и паролем</h5></div>
 


        </div>
         
      </div>
    </form>
    </div>
 
    
    
      
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'registration',
  data() {
        return {
        name:'',
        password:'',
        email:'',
        passwordConfirm:'',
        user:{},
        registered:false,
        isActive: false,
        color: 'red'
      }
  },
  
      
  methods:{
     ...mapActions([
        'ADDUSER',
        'REGISTER'
           
    ]),
    onChange(){
      if(this.password.length>=7){
        this.color = 'green'
        this.isActive = true
        
      }else{
         this.color = 'red'
          this.isActive = false
      }
    },
   

   async registrationForm(){
      this.user.password = this.password
      this.user.email = this.email
      
       
        if (this.password === this.passwordConfirm){
            try{
            await this.REGISTER(this.user)  
              
            this.registered = true
              
            setTimeout(()=>{this.$router.push('/login')},3000)
            }catch (e){
               console.log('catch', e)
            }
            
            
          }else{
            alert('Пароли  должны совпадать')
 
            return
          }
    }
  },  
      
 
     
}
</script>

<style lang="scss">
 
</style>
