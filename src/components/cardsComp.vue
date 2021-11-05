<template>


    <div class="card">
       <div class="form-control">
        <h2 style="font-size: 2rem;">{{item.keyWordBD}}</h2>
        <input v-if="changeAnswer" class="inputLine" v-model="modelKeyWord">
        <hr/>
        
        <h2 style="font-size: 1.5rem; color: green; text-align: left;">Номер заявки: {{item.numberBD}}</h2>
        <input v-if="changeAnswer" class="inputLine" v-model="modelNumber">
        <hr/>
        <p>Расшифровка:</p>
        <p>{{item.discriptionBD}}</p>
        <textarea v-if="changeAnswer" class="inputLineBig1" v-model="modelDiscription"></textarea>
         <hr/>
         <p>Ответ:</p>
        <pre >{{item.answerBD}}</pre>
        <textarea v-if="changeAnswer" class="inputLineBig" v-model="modelAnswer"></textarea>
          
         
        <hr/>
           <select v-if="changeAnswer" v-model="modelSelect" >
        <option disabled value="">Выберите статус</option>
        <option v-for="(selectItem, id) in arraySelect" :key="selectItem" >{{arraySelect[id]}}</option>
       
    </select>
         <p style="font-size: 1.5rem;">Статус заявки: {{item.statusBD}}</p>
          <button v-if="changeAnswer" class="btn primary" @click="$emit('loadLinks'), changeAnswerMeth(item.id)">Отправить</button>
         <button :class="changeAnswer===true? 'btn danger':'btn primary'"  
         @click="openWindowChange(item.id) ,modelAnswer=item.answerBD, modelKeyWord=item.keyWordBD, modelNumber=item.numberBD, modelDiscription=item.discriptionBD, modelSelect=item.statusBD">
         {{changeAnswer===false? 'Изменить':'Отмена'}}</button>

         
<button class="btn danger" @click="$emit('removeNote', item.id) ">Удалить запись</button>
</div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
    
emits: ['loadLinks', 'removeNote'],
props: ['item','id'],
    data(){
        return{
        changeAnswer:false,
        modelAnswer: '',
        modelKeyWord:'',
        modelNumber: '',
        modelDiscription: '',
        modelSelect: '',
        
        }
    },


//сделать работу методов удаления изменения и отправки
    methods:{
    openWindowChange()
    {
    this.changeAnswer = !this.changeAnswer
    }, 
  async changeAnswerMeth(id)
    {
        this.modelKeyWord = this.modelKeyWord.toUpperCase();
        const response =  await axios.patch(`https://fireguard-e136d-default-rtdb.firebaseio.com/answers/${id}.json?auth=${this.token}`, 
       {answerBD: this.modelAnswer , discriptionBD: this.modelDiscription, keyWordBD: this.modelKeyWord, numberBD: this.modelNumber, statusBD: this.modelSelect})
        console.log(response)
        this.changeAnswer=false
    },
           },
   inject:['answers','arraySelect','token'],

}
</script>

<style>
pre {

   white-space: pre-wrap;       /* css-3 */

   white-space: -moz-pre-wrap;  /* Mozilla, с 1999 года*/

   white-space: -pre-wrap;      /* Opera 4-6 */

   white-space: -o-pre-wrap;    /* Opera 7 */

   word-wrap: break-word;       /* Internet Explorer 5.5+ */

}

</style>