<template>
  <div id="">
    <div class="row flex">
       <h5> Вы вошли с email: {{this.CURRENTUSER.email}} </h5>
    <h3>Список заметок</h3>
    <h5> Вы можете просмотреть свои заметки</h5>
    </div>
    <div class="row flex">
      <div class="input-field S6 col">
        <select ref="select" v-model="filter">
          <option value="" disabled selected>Все записи</option>
          <option value="Актуально">Актуальные</option>
          <option value="Просрочено">Просроченные</option>
           
        </select>
        
        <label>Status filter</label>
      </div>
      <div class="input-field S6 col">
         <h5>{{timeNow}}</h5>
          
         <!-- <h5>{{ dateToday()}}</h5> -->
         <!-- <h5>{{timePass(1613071416713)}}</h5> -->
       
        
         
      </div>
    </div>
    <button v-if="filter" class="btn btn-small" @click="filter = null">Очистить фильтр</button>
     
    <hr>
    <table v-if="notesByUser.length">
      <thead>
        <tr>
        <th>#</th>
        
        <th>Название</th>
        <th>Заметка создана</th>
        <th>Прошло времени</th>
        <th>Актульно до</th>
        <th>Описание</th>
        <th>Статус</th>
        
        </tr>
      </thead>
       <tbody>
         <tr 
         v-for="(note, index) of displayNotes"
         :key="note.id"
         > 
         <td>{{index+1}}</td>
         <td>{{note.title}}</td>
         <td>{{note.dateNoteCreate}}</td>
         <td>{{timePass(note.dateNoteCreateTimeStemp)}}</td>
         <td>{{dateActual(note.dateActual)}}</td>
         <!-- <td class="td"><div class="text">{{note.description}}</div></td> -->
         <td>{{note.description}}</td>
         <td>{{noteStatus(note.dateActual, note.id)}}</td>
         
         </tr>
       </tbody>       

     </table>
     <p v-else>Задач нет</p> 
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
   data: ()=>({
     filter:null,
     timeNow:'',
     timeNowTimeStemp:''
    }),

  computed:{
      ...mapGetters([
      'CURRENTUSER',
      
      'NOTESBYUSER',
      'LOGIN'
    ]),

     
    notesByUser(){
     
         return  this.$store.getters.NOTESBYUSER
      
     
    },
    
    
    displayNotes() {
     let vm = this
       
      return this.notesByUser.filter(function(elem){
        if(!vm.filter){
          
          return true
        }
        
         return elem.status === vm.filter
          
          
      })
         
    }
  },
  methods:{

    dateActual(dateActual){
       let dateAct = new Date(dateActual).toLocaleDateString()
      //  console.log('new Date(dateActual)', dateAct)
       return  dateAct
    },
    dateToday(){
    let Year = new Date().getFullYear().toString()
    let Month = new Date().getMonth().toString()
    let Day = new Date().getDate().toString()
    let today = new Date(`${Year}-${Month+1}-${Day}`).getTime()
    
      let dateToday = {
        year: Year,
        month: Month,
        day: Day

      }
      return  today
 

    },

    noteStatus(dateActual){
       
    let Year = new Date().getFullYear().toString()
    let Month = new Date().getMonth()
    let Day = new Date().getDate().toString()
    let today = new Date(`${Year}-${Month+1}-${Day}`).getTime()

    
      // console.log('dateActual', dateActual)
      // console.log('today', today)
        

      for(let i=0; i<this.notesByUser.length; i++){
            if(this.notesByUser[i].dateActual>today){
          
            this.notesByUser[i].status = 'Актуально'
              
            }else{
             
              this.notesByUser[i].status = 'Просрочено'
               
            }
      }

          if(dateActual>today){
            return 'Актуально'
            
          }else{
            return 'Просрочено'
               
          }
     
    },
    
    notesFromFbase(){
      this.$store.dispatch('GETNOTEFROMFIREBASE')
      
    },
    usersFromFbase(){
      this.$store.dispatch('GETUSERFROMFIREBASE')
      
    },
     
    timePass(ts){
      //let tb=1613110931075
      let tb= this.timeNowTimeStemp
         //ts=1613071416713
       //  let ts=1613070000000
      let tpSeconds = ((tb - ts)/1000).toFixed() //милисекуны в секунды
      let tpMinutes = Number((tpSeconds/60).toFixed())//секунды в минуты округлено до целого
      let tpHoursTrunc = Math.trunc(tpMinutes/60)//минуты в фиксированное кол часов
      //let tpHoursFixed = (tpMinutes/60).toFixed()//минуты в фиксированное кол часов
      let tpMinutesinHourseAfterTrunc = tpHoursTrunc*60
      //let tpHoursRoundDown = (tpHoursFixed-1)
      //let tpHoursRoundDownToMin = tpHoursRoundDown*60
      let tpMinutesResult = tpMinutes - tpMinutesinHourseAfterTrunc
      let tpDays = 0
      let tpWeeks = 0
      gettpWeeks()
      gettpDays()
      function gettpDays(){
        if(tpHoursTrunc>=24){
          tpHoursTrunc=tpHoursTrunc-24
          tpDays = tpDays + 1
        }
      }
      function  gettpWeeks(){
        if(tpDays>7){
         tpDays=tpDays-7
          tpWeeks = tpWeeks + 1
        }
      }  
       
        
      return `Нед:${tpWeeks} Сут:${tpDays} Ч:${tpHoursTrunc} M:${tpMinutesResult} 
       `

    },
          
    timeNowIs(){
      let Data = new Date();
      let Year = Data.getFullYear();
      let Month = Data.getMonth()+1;
      let Day = Data.getDate();
      let Hour = Data.getHours();
      let Minutes = Data.getMinutes();
      let Seconds = Data.getSeconds();
      let GMT = Data.getTimezoneOffset()/-60; 
      let DateAndTime = `Дата: ${Day}.${Month}.${Year} 
                        Время: ${Hour}:${Minutes}:${Seconds}`; 
      this.timeNow = DateAndTime
      
    },
     timeNowIsTimeStemp(){
     return this.timeNowTimeStemp = new Date().getTime()
      
     },
  },
  mounted(){
   
     M.FormSelect.init(this.$refs.select);
    let vm = this
    
    setInterval(()=>{
       
        vm.timeNowIs() 
         vm.timeNowIsTimeStemp() 
    }, 1000) 
    if(this.$store.getters.LOGIN){
      this.$store.dispatch('GETNOTEFROMFIREBASE'),
      this.$store.dispatch('GETUID')
    }
  
  }
     
}
</script>

<style lang="scss">
.text {
  white-space: nowrap;
  text-overflow: ellipsis ;
  overflow: hidden;
}
.td {
  max-width: 400px  ;
}
.flex{
   
   display: flex;  
  justify-content: space-between;
  align-items: center;
}
 
 
</style>
