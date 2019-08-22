<template>
  <div>
    <h2 style="margin-left: 10px;">{{ operationType === 'add' ? 'Add recipe' : 'Selected' }}</h2>
    <form action="javascript:void(0);">
      <label for="recipe-name">Name</label>
      <br/>
      <input type="text" v-model="selectedRecipe.name"/>

      <br />
      <br />

      <label for="recipe-steps">Steps</label><br/>
      <textarea name="recipe-steps" cols="35" rows="10" v-model="selectedRecipe.steps">
      </textarea>
      
      <br />
      <br />

      <label for="recipe-name">Chef</label>
      <br/>
      <input type="text" v-model="selectedRecipe.chef"/>

      <br />
      <br />

      <button v-if="operationType === 'add'">Add</button>
      <button v-else>Update</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SelectedRecipe',
  props: {
    'selectedRecipe': Object,
    'operationType': String
  },
  methods: {
    sendNewData() {
      this.$emit('newRecipe', {
        name: selectedRecipe.name,
        steps: selectedRecipe.steps,
        chef: selectedRecipe.chef
      })
    }
  }
}
</script>

<style scoped>

</style>