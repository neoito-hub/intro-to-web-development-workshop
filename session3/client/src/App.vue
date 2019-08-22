<template>
  <div id="app" class="container">
    <h1>Recipe App</h1>
    <div class="add">
      <button @click="toggleAdd()">Add New</button>
    </div>

    <div class="row">
      <div class="col list">
        <RecipeList :recipes="allRecipes" @selected="setSelected"/>
      </div>
    
      <div class="col selected">
        <SelectedRecipe :selectedRecipe="selectedData" 
          :operationType="operation" 
          @newRecipe="addUpdateRecipe"
          @deleteRecipe="doDeleteRecipe"/>
      </div>

    </div>
    
  </div>
</template>

<script>
import RecipeList from './components/RecipeList.vue'
import SelectedRecipe from './components/SelectedRecipe.vue'

import { get, post, put, del } from './api';

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
      selectedData: {
        name: '',
        steps: '',
        chef: ''
      },
      operation: 'select'
    }
  },
  async mounted() {
    await this.getAllRecipes()
  },
  methods: {
    async reset() {
      await this.getAllRecipes();
      this.selectedData = {
        name: '',
        steps: '',
        chef: ''
      };
      this.operation = 'select';
      this.selectedId = null;
    },
    toggleAdd() {
      this.operation = 'add';
      this.selectedData = {
        name: '',
        steps: '',
        chef: ''
      };
    },
    async getAllRecipes() {
      try {
        const recipesResponse = await get('/recipes')
        if (recipesResponse['error'] === false) {
          this.allRecipes = recipesResponse['data'];

          if (this.allRecipes.length > 0) {
            this.selectedId = this.allRecipes[0]['id']
            await this.getRecipeInfo()
          }
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
          this.selectedData.chef = recipeResponse['data']['by']['name']
        } else {
          // alert
          alert(recipeResponse['message'])
        }
      } catch(e) {
        // ahah!
      }
    },
    async doDeleteRecipe() {
      try { 
        const resp = await del('/recipes', this.selectedId)
        if (resp['error'] === false) {
          // boo!
          await this.getAllRecipes()
        } else {
          // alert
          alert(resp['message'])
        }
      } catch(e) {
        // argh!
      }
    },
    async setSelected(params) {
      // const selected = this.allRecipes.find(r => r.id === params)
      this.operation = 'select';
      this.selectedId = params;
      await this.getRecipeInfo()
    },
    async addUpdateRecipe(params) {
      try {
        let response = {}
        if (this.operation === 'add') {
          // post request
          response = await post('/recipes', params)
        } else {
          // put request
          response = await put('/recipes', this.selectedId, params)
        }
        if (response['error'] === false) {
          if (this.operation === 'add') {
            // this.allRecipes.push(response['data'])
            await this.getAllRecipes()
          } else {
            await this.getAllRecipes()
          }
        } else {
          // alert
          alert(response['message'])
        }
      } catch(e) {
        // hoo!
      }
    }
  }
}
</script>

<style>

</style>
