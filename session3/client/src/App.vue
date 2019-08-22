<template>
  <div id="app" class="container">
    <RecipeList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import RecipeList from './components/RecipeList.vue'

import { get } from './api';

export default {
  name: 'app',
  components: {
    RecipeList
  },
  data() {
    return {
      recipes: []
    }
  },
  async mounted() {
    await this.getAllRecipes()
  },
  methods: {
    async getAllRecipes() {
      try {
        this.recipes = await get('/recipes')
      } catch(e) {
        // console.log(e);
      }
    }
  }
}
</script>

<style>

</style>
