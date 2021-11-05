<template>
    <header class="navbar" >
    <h3>FireGuardBD</h3>
    <ul class="navbar-menu">
     <li> <button class="btn center"  @click="loadLinks">Загрузить данные</button></li>
 
      <li><a :style="answerVisible? 'border-bottom: 2px solid #3eaf7c;':''" @click="answerVisible=true; cardInfoVisible=false">Отправка информации</a></li>
      <li>
        <a :style="cardInfoVisible? 'border-bottom: 2px solid #3eaf7c;':''" @click="cardInfoVisible=true; answerVisible=false">Перейти к заявкам</a>
      
      </li>
      
      
    </ul>
  </header>
 <div class="container with-nav">
   <div class="form-control">
  <input  v-if="cardInfoVisible" class="inputLine" @keypress.enter="searchKey" placeholder="Введите ключевое слово"  type="text" v-model.trim="searchKeyWord">

  </div>
    <request-answer @loadLinks="test" v-if="answerVisible"></request-answer>
    <card-info @removeNote="removeNote" v-if="cardInfoVisible"></card-info>
    <div v-if="cardInfoVisible">
    <cards-comp @loadLinks="test" @removeNote="removeNote" v-for="(item,id) in answers" :key="item.id"  :item="item" :id="id"></cards-comp>
    </div>
  </div>

</template>

<script>
import cardInfoVue from './components/cardInfo.vue'
import requestAnswerVue from './components/requestAnswer.vue'
import cardsCompVue from './components/cardsComp.vue'
import axios from 'axios'



export default {
  mounted(){
    this.loadLinks()
  },
  provide(){
  let answers = {}
 Object.defineProperty(answers, 'type', { enumerable: true, get: () => this.answers })
  return { 
  answers,
  token:this.token,
  arraySelect: ['Решена','Ответ направлен','Жду ответа','Создана задача','Не удовлетворительно','Удовлетворительно'],
  }

},
  data(){
    return{
    cardInfoVisible: false,
    answerVisible: true,
    catchError:false,
    answers: [],
    token: '9VIfEVIaYVIWjgWJUxbdd6TqHEHIeIqBbxdUXsfh',
    }
  },
  methods:{
      searchKey()
    {
      this.searchKeyWord = this.searchKeyWord.toUpperCase();
      this.answers = this.answers.filter(answers => answers.keyWordBD === this.searchKeyWord)
     
    },
    test(){
       setTimeout(() => {
      this.loadLinks()
       }, 800);
    },
     async loadLinks() {
        try {
        
        const{data} = await axios.get(`https://fireguard-e136d-default-rtdb.firebaseio.com/answers.json?auth=${this.token}`)
        
         this.answers = Object.keys(data).map(key=> {
          return {
            id: key,
            ...data[key]
          }
         
      })
       
       console.log(this.answers)
       
       
        }
        catch {
          this.catchError=true
        }
        
        
        
      },
     
      async removeNote(id){
        
         
        await axios.delete(`https://fireguard-e136d-default-rtdb.firebaseio.com/answers/${id}.json?auth=${this.token}`)
        this.answers = this.answers.filter(answers => answers.id !==id)
      },
  
  },

 components: {

    'card-info': cardInfoVue,
    'request-answer': requestAnswerVue,
    'cards-comp': cardsCompVue
    },

}

</script>

<style>

</style>