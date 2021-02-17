<template>
  <div id="" class="row">
      <div class=" ">
        <h5>Для использования приложения Вам необходимо авторизоваться</h5>
      </div>
     
    <div class="col s6 offset-s3">
       
       <form @submit.prevent="login">
         
      <div class="row">
        <div class="input-field col s12">
          <input id="first_name" type="text" class="validate" v-model='email'>
          <label for="first_name">Введите ваш email</label>
        </div>
       
      </div>
      
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="text" class="" v-model='password'>
          <label for="password">Введите пароль</label>
        </div>
      </div>
      
        <button class="btn" type="submit" @click="login">Войти</button> 
        
              <div v-if="!unregistered"><h5>Такой пользователь не найден, зарегистрируйтесь</h5></div>
               <div v-if="logedIn"><h5>Вы вошли, приятной работы {{this.name}}</h5></div>
             
               <div class="row">
                  <div class="input-field col s12">
                    <div ><h6>зарегистрированные email: 1@mail.ru q1@mail.ru q2@mail.ru</h6></div>
                    <div ><h6>текущий  пароль: 1111111</h6></div>
                  </div>
                </div>  
       
    </form>
         
 
    </div>
     
    
    
      
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'login',
  data: ()=>({
      password:'',
      name:'',
      email:'',
      unregistered:true,
      logedIn: false
     

  }),
  computed:{
     ...mapGetters([
      'CURRENTUSER'
    ]),
  },
  methods:{
      ...mapActions([
        'ADDCURRENTUSER',
        'LOGIN'
           
    ]),

    async login(){
       let vm = this
      const formData = {
            email: this.email,
            password: this.password
            
        }
         console.log(formData)
          try {
             
            await this.LOGIN(formData)
            .then(() => {
               console.log('Вы вошли')
               this.logedIn = true;
              
               setTimeout(()=>{this.$router.push('/create')},2000) 
            })
            .catch((e) => {
               
            }); 
           
          }catch(e) {
             
          }
           
     
    },

  },
 
     
}
</script>

<style lang="scss">
 
</style>