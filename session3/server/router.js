const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/ping", controller.ping);

router.post('/recipes', controller.addRecipe)
  .get('/recipes', controller.getAllRecipes);

router.get('/recipes/:id', controller.getRecipeDetails);

module.exports = router;
