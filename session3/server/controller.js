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

const getAllRecipes = (req, res, next) => {
  try {

  } catch (e) {
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
    const chefData = await getChefData(chefName)

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
        response.by.id = chef_id;
        response.by.name = chefName;
      }
    }

    // add the recipe
    const keys = '(chef_id, name, steps, created_at, updated_at)';
    const values = `(${chefData.id}, '${req.body.name}', '${req.body.steps}', date(\'now\'), date(\'now\'))`;
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


module.exports = {
  ping,
  addRecipe,
};
