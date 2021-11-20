<template>

 
  <p v-if="catchError" style="color:red; text-align:center;">Отсутствуют данные в базе данных</p>
<div class="cardBig" >
  
  <p  v-if="answers.length===0">Ничего не найдено!</p>

     <div  class="card marked" v-for="(item,id) in answers.type" :key="item.id">
  <tr><td>
  <h5 >{{answers.type[id].keyWordBD}}</h5>

  <h5 style="color: red; cursor: pointer;" v-scroll-to="`#${item.id}`" >Найти</h5>
  </td></tr>
  </div>
</div>



  
 
 
</template>

<script>
import cardsCompVue from './cardsComp.vue'




export default {
emits: ['removeNote'],
  data(){
    return{
      searchKeyWord: '',
       catchError:false,  
       
    }
  },
  inject:['answers'],
 

  // components: {AppanswerBody},


methods:{




},

components:{
'cards-comp':cardsCompVue,
}

}




</script>

<style scoped>
  .card {
    display: flex;
  }

  .card.no-padding {
    padding: 0;
  }

  .card-nav {
    max-width: 300px;
    border-right: 1px solid #999999;
  }

  .card-body {
    padding: 0 1rem;
  }

  .list-item {
    padding: .5rem;
    cursor: pointer;
  }

  .list-item a {
    color: #2c3e50;
  }

  .list-item a.active {
    color: #3eaf7c;
    font-weight: bold;
  }
</style>