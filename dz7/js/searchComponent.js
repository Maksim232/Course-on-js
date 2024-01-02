Vue.component('search', {

  template:

    `
    <form action="#" class="search-form"  @submit.prevent='$parent.filter'>
      <input type="text" class="search-field" v-model='$parent.userSearch'>
      <button type="submit" class="btn-search">
          <i class="fas fa-search"></i>
      </button>
    </form>
    `
})

//изменил лишь схему для обращения к файлу js - добавил @submit.prevent='$parent.filter' вместо @submit.prevent="filter" и v-model='$parent.userSearch' вместо v-model="userSearch".  $parent. нужен для вызова функции фильтр из главного файла js, т.е для облегчения кода и процесса
