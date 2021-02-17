
 <template>
 
 <nav class=" cyan darken-1">
    <div class="nav-wrapper "  >
      
       
      <ul id=" " class="left">
         <router-link 
         tag="li"
          active-class="active" 
          exact 
          to="/create"
          v-show="this.LOGIN"
          >
          <a href="#">Добавить заметку</a>
          </router-link>
         <router-link
          tag="li" 
          to="/list"
           v-show="this.LOGIN"
          >
          <a href="#">Список заметок</a>
          </router-link>
          <router-link
          tag="li" 
          to="/login"
           v-show="!this.LOGIN"
          >
          <a href="#">Войти</a>

          </router-link>
          <router-link
          tag="li" 
          to="/logout"
           v-show="this.LOGIN"
          >
          <a href="#">Выйти</a>
          </router-link>
          

          <router-link
          tag="li" 
          to="/registration"
           v-show="!this.LOGIN"
          >
          <a href="#">Зарегистрироваться</a>
          </router-link>
          
      </ul>
        
    </div>
  </nav>
        
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
     ...mapGetters([
       'LOGIN'
  ])
  },
  mounted(){
    console.log('LOGIN', this.LOGIN)
  }

  
    
}
</script>

<style lang="scss">
  nav {
    padding: 0 2rem;
  }
  .brand-logo{
    position: relative;
    left: 0;
     
  }
</style>


  