<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <div class=" ">
        <h5> Вы вошли с email: {{this.CURRENTUSER.email}} </h5>
        <h4>Вы можете Создать заметку</h4>
      </div>
      <form @submit.prevent="submitHandler">
          
            
        <div class="input-field">
          <input v-model="title" placeholder="" id="title" type="text" required class="validate">
           <span class="helper-text" data-error="Title is required" > </span>
          <label for="title">Добавьте заголовок для записи</label>
        </div>
         <div class="input-field  ">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Сделайте вашу запись</label>
          <span class="character-counter" style="float:right; font-size:12px;">{{description.length}}/2048</span>
        </div>
        <input type="text"  v-model = "dateNoteCreate" >
          <label for="dateNoteCreate">Дата и время создания записи</label>
         <input type="text" id="datepicker"   ref="datepicker">
          <label for="datepicker">Дата пока запись будет актуальна</label>
           <div>
            <button class="btn" type="submit">Создать запись</button>
          </div>
      </form>
    
           
       
       
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'create',
  data: ()=>({
    description: '',
    title: '',
    chips: null,
    dateNoteCreate: null,
    dateNoteCreateTimeStemp: null,
    date: null,
     


  }),
    computed:{
      ...mapGetters([
      'CURRENTUSER',
      'USERUIDFROMFBASE'
    ]),
     
  },
  methods:{
     ...mapActions([
      'USERS',
      'GETUID',
      'CREATENOTE'
    ]),
     
    submitHandler() {
      const note = {
        email: this.CURRENTUSER.email,
        userIdFromFirebase: this.CURRENTUSER.uid,
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: 'active',
        tags: this.chips.chipsData,
        dateNoteCreate: this.getTimeOfNote(),
        dateNoteCreateTimeStemp: this.getTimeOfNoteTimeStemp(),
        dateActual: this.getDateActualStemp(),
       
      }
      
      alert('Запись создана успешно')
      this.$store.dispatch('CREATENOTE', note)
      
      this.$router.push('/list')

    },
    getTimeOfNote(){
      let Data = new Date();
      let Year = Data.getFullYear();
      let Month = Data.getMonth()+1;
      let Day = Data.getDate();
      let Hour = Data.getHours();
      let Minutes = Data.getMinutes();
      let Seconds = Data.getSeconds();
      let GMT = Data.getTimezoneOffset()/60; 
      let TimeStemp = Data.getTime()
      let DateAndTime = `Дата: ${Day}.${Month}.${Year}
                          Время: ${Hour}:${Minutes} `;
       
      return DateAndTime

       
     },
      getDateActualStemp(){
        // console.log(' date: this.date.date !!!!+++',   this.date.date)
        // console.log(' date: this.date.date !!!!+++',   this.date.date.getTime())
        return   this.date.date.getTime()
         

      },
      getTimeOfNoteTimeStemp(){
     return new Date().getTime()
      
     },


    destroyed(){
      if (this.date && this.date.destroy){
        this.date.destroy()
      }
       if (this.chips && this.chips.destroy){
        this.chips .destroy()
      }
    }
  },
  mounted() {
   
   this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    });
   
    this.dateActual=new Date(this.date.date)
  

    this.dateNoteCreate = this.getTimeOfNote() 
     
     
    
    

  }

     
}
</script>

<style scoped lang="scss">

.btn{
  margin-top: 20px;
}
</style>
