<template>
  <div id="app" class="container">
    <h1>Recipe App</h1>
    <div class="add">
      <button>Add New</button>
    </div>

    <div class="row">
      <div class="col list">
        <RecipeList :recipes="allRecipes"/>
      </div>
    </div>
    
    <div class="col selected">
      <h2 style="margin-left: 10px;">Change Me</h2>
      <SelectedRecipe />
    </div>

  </div>
</template>

<script>
import RecipeList from './components/RecipeList.vue'
import SelectedRecipe from './components/SelectedRecipe.vue'

import { get } from './api';

export default {
  name: 'app',
  components: {
    RecipeList,
    SelectedRecipe
  },
  data() {
    return {
      allRecipes: []
    }
  },
  async mounted() {
    await this.getAllRecipes()
  },
  methods: {
    async getAllRecipes() {
      try {
        this.allRecipes = await get('/recipes')
      } catch(e) {
        // console.log(e);
      }
    }
  }
}
</script>

<style>

</style>
