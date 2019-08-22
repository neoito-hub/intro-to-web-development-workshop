<template>
  <div>
    <form action="javascript:void(0);">
      <label for="recipe-name">Name</label>
      <br/>
      <input type="text" />

      <br />
      <br />

      <label for="recipe-steps">Steps</label><br/>
      <textarea name="recipe-steps" cols="35" rows="10">
      </textarea>
      
      <br />
      <br />

      <button>Update</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SelectedRecipe'
}
</script>

<style scoped>

</style>