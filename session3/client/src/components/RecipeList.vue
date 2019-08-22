<template>
  <div>
    <ul id="app-recipe-list">
      <li v-for="recipe of recipes" :key="recipe.id" @click="sendSelected(recipe.id)">{{ recipe.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecipeList',
  props: {
    recipes: Array
  },
  methods: {
    sendSelected(id) {
      this.$emit('selected', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
