<template>

  <form class="card" @submit.prevent="createAnswer" >
    <h2>Отправка информации в бд</h2>
   <div class="form-control" >
      <label for="numberNote">Введите номер заявки...</label>
      <input type="number" class="inputLine" id="numberNote"  v-model.trim="numberNote" >
    </div>

    <div class="form-control">
      <label for="keyWord">Введите ключевое слово</label>
      <input type="text" class="inputLine" id="keyWord"  v-model.trim="keyWord">
    </div>


    <div class="form-control">
      <label for="discription">Введите краткое описание...</label>
      <textarea class="inputLineBig1" v-model="discription" id="discription"  cols="20" rows="10"></textarea>
    </div>

    <div class="form-control">
      <label for="answer">Введите текст ответа...</label>
       <textarea class="inputLineBig" id="answer" v-model="answer" cols="100" rows="20"></textarea>
    </div>
  <div class="form-control">
      <select v-model="select">
        <option disabled value="">Выберите статус</option>
        <option v-for="(selectItem, id) in arraySelect" :key="selectItem" >{{arraySelect[id]}}</option>
       
    </select>
    </div>

    <button class="btn primary" type="submit" @click="$emit('loadLinks')">Отправить</button>
    
   
      
  </form>
</template>

<script>
import axios from 'axios'



export default {
emits:['loadLinks'], 
  data() {
    return {
        numberNote: '',
        discription: '',
        select: '',
        keyWord: '',
        answer: '',
    }
  },
  computed: {
    /* isValid() {
      return this.email !== '' && this.password !== ''
      
    } */
  },
 
  methods: {
     async createAnswer() {
      
      this.keyWord = this.keyWord.toUpperCase();
      const response =  await axios.post(`https://fireguard-e136d-default-rtdb.firebaseio.com/answers.json?auth=${this.token}`, 
      {numberBD: this.numberNote,keyWordBD:this.keyWord, answerBD: this.answer, statusBD: this.select, discriptionBD: this.discription })
      this.keyWord = ''
      this.answer = ''
      this.numberNote = ''
      this.discription = ''
      this.select = ''
      console.log(response)
    },
 

  searchKey(){
      this.searchKeyWord = this.searchKeyWord.toUpperCase();
      this.answers = this.answers.filter(answers => answers.keyWordBD === this.searchKeyWord)
    },
 
  },

inject: ['arraySelect', 'token']
}
</script>

<style scoped>

</style>