<template>
  <div id="app" class="container">
    <h1>Recipe App</h1>
    <div class="add">
      <button>Add New</button>
    </div>

    <div class="row">
      <div class="col list">
        <RecipeList :recipes="allRecipes" @selected="setSelected"/>
      </div>
    
      <div class="col selected">
        <h2 style="margin-left: 10px;">Change Me</h2>
        <SelectedRecipe />
      </div>

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
      allRecipes: [],
      selectedId: null,
      selectedData: {}
    }
  },
  async mounted() {
    await this.getAllRecipes()
  },
  methods: {
    async getAllRecipes() {
      try {
        const recipesResponse = await get('/recipes')
        if (recipesResponse['error'] === false) {
          this.allRecipes = recipesResponse['data'];
        } else {
          // alert
          alert(recipesResponse['message'])
        }
      } catch(e) {
        // console.log(e);
      }
    },
    async getRecipeInfo() {
      try {
        const recipeResponse = await get('/recipes', this.selectedId)
        if (recipeResponse['error'] === false) {
          this.selectedData = recipeResponse['data'];
        } else {
          // alert
          alert(recipeResponse['message'])
        }
      } catch(e) {
        // ahah!
      }
    },
    async setSelected(params) {
      // const selected = this.allRecipes.find(r => r.id === params)
      this.selectedId = params;
      await this.getRecipeInfo()
    }
  }
}
</script>

<style>

</style>
