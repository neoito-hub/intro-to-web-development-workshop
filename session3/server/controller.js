const db = require('./db')

const { buildResponse } = require("./util");

// extra fns
const getChefData = async (chefName) => {
  try {
    const sql = `SELECT id, name FROM chefs WHERE name='${chefName}'`
    const chefData = await db.asyncGetOne(sql);
    if (!chefData) {
      return null
    }
    return chefData;
  } catch (e) {
    return null
  }
}


// start of controller fns
const ping = (req, res, next) => {
  try {
    const result = buildResponse(false, "pong", {});
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const sql = `SELECT id, name FROM recipes ORDER BY updated_at DESC`;
    const recipes = await db.asyncGetMany(sql);
    if (!recipes) {
      res.status(500).json(
        buildResponse(true, 'Failed to find recipes', {})
      );
    }

    res.status(200).json(
      buildResponse(false, '', recipes)
    );
  } catch (e) {
    next(e)
  }
}

const getRecipeDetails = async (req, res, next) => {
  try {
    const sql = `
    select r.id, r.name, r.steps, r.updated_at ,r.chef_id, c.name as chef_name 
    from recipes r
    join chefs c on c.id = r.chef_id
    where r.id=${req.params.id}
    `
    const recipeData = await db.asyncGetOne(sql)
    if (!recipeData) {
      res.status(404).json(
        buildResponse(true, 'Did not find recipe', {})
      )
    } else {
      const response = {
        id: recipeData.id,
        name: recipeData.name,
        steps: recipeData.steps,
        updated_at: recipeData.updated_at,
        by: {
          id: recipeData.chef_id,
          name: recipeData.chef_name
        }
      }
      res.status(200).json(
        buildResponse(false, 'Recipe found', response)
      )
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
}

const addRecipe = async (req, res, next) => {
  try {
    let response = {
      id: null,
      name: null,
      steps: null,
      by: {
        id: null,
        name: null
      },
    };
    let sql = "";
    const chefName = req.body.chef
    let chefData = await getChefData(chefName)

    // create a chef, if we get string
    if (!chefData) {
      sql = `INSERT INTO chefs(name) VALUES ('${chefName}')`;
      // console.log(sql);
      const chef_id = await db.asyncRun(sql)
      if (!chef_id) {
        res.status(500).json(
          buildResponse(true, 'Failed to create chef', {})
        )
      } else {
        chefData = {
          id: chef_id,
          name: chefName
        }
      }
    }

    // add the recipe
    const keys = '(chef_id, name, steps, created_at, updated_at)';
    const values = `(${chefData.id}, '${req.body.name}', '${req.body.steps}', datetime('now'), datetime('now'))`;
    sql = `INSERT INTO recipes ${keys} VALUES ${values}`
    // console.log(sql)
    const recipe_id = await db.asyncRun(sql)
    if (!recipe_id) {
      res.status(500).json(
        buildResponse(true, 'Failed to create chef', {})
      )
    } else {
      response.id = recipe_id;
      response.name = req.body.name;
      response.steps = req.body.steps;
      response.by = chefData;
    }

    res.status(201).json(
      buildResponse(false, 'Created recipe', response)
    )
  } catch (e) {
    console.log(e)
    next(e)
  }
}

const updateRecipe = async (req, res, next) => {
  try {

    // check if the recipe exists
    let sql = `SELECT chef_id, name, steps FROM recipes WHERE id=${req.params.id}`;
    const recipe = await db.asyncGetOne(sql);

    if (!recipe) {
      res.status(404).json(
        buildResponse(true, 'Recipe not found', {})
      )
    } else {
      // chef check
      const chefName = req.body.chef
      let chefData = await getChefData(chefName)

      // create a chef, if we get string
      if (!chefData) {
        sql = `INSERT INTO chefs(name) VALUES ('${chefName}')`;
        // console.log(sql);
        const chef_id = await db.asyncRun(sql)
        if (!chef_id) {
          res.status(500).json(
            buildResponse(true, 'Failed to create chef', {})
          )
        } else {
          chefData = {
            id: chef_id,
            name: chefName
          }
        }
      }
      // chef check ends
      sql = `UPDATE recipes SET 
            chef_id=${chefData.id}, name='${req.body.name}', 
            steps='${req.body.steps}', updated_at=datetime('now') 
            WHERE id=${req.params.id}`;

      const update = await db.asyncRun(sql)

      console.log(update)
      res.status(200).json(
        buildResponse(false, 'Updated successfully', {})
      )
    }

  } catch (e) {
    console.log(e)
    next(e)
  }
}


module.exports = {
  ping,
  addRecipe,
  getAllRecipes,
  getRecipeDetails,
  updateRecipe
};
