const db = require('./db')

const { buildResponse } = require("./util");

// extra fns
const getChefName = async (chef_id) => {
  try {
    const sql = `SELECT name FROM chefs WHERE id=${chef_id}`
    const chefName = await db.asyncGetOne(sql);
    if (!chefName) {
      return null
    }
    return chefName.name;
  } catch (e) {
    return null
  }
}



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
    let chef = req.body.chef
    // create a chef, if we get string
    if (typeof (chef) === 'string') {
      sql = `INSERT INTO chefs(name) VALUES ('${chef}')`;
      console.log(sql);
      const chef_id = await db.asyncRun(sql)
      if (!chef_id) {
        res.status(500).json(
          buildResponse(true, 'Failed to create chef', {})
        )
      } else {
        response.by.id = chef_id;
        response.by.name = chef;
        chef = chef_id;
      }
    }

    // get chef data
    const chefName = await getChefName(chef)
    if (!chefName) {
      res.status(500).json(
        buildResponse(true, 'Failed to find chef', {})
      )
    }

    // add the recipe
    const keys = '(chef_id, name, steps, created_at, updated_at)';
    const values = `(${chef}, '${req.body.name}', '${req.body.steps}', date(\'now\'), date(\'now\'))`;
    sql = `INSERT INTO recipes ${keys} VALUES ${values}`
    console.log(sql)
    const recipe_id = await db.asyncRun(sql)
    if (!recipe_id) {
      res.status(500).json(
        buildResponse(true, 'Failed to create chef', {})
      )
    } else {
      response = {
        id: recipe_id,
        name: req.body.name,
        steps: req.body.steps,
        by: {
          id: chef,
          name: chefName
        },
      };
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
