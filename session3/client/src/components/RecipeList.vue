<template>
  <div>
    <ul id="app-recipe-list">
      <li v-for="recipe of recipes" :key="recipe.id">{{ recipe.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecipeList',
  props: {
    recipes: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
