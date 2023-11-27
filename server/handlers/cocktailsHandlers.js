const database = require("../database");

const getCocktails = (req, res) => {
  let sql = "select * from cocktail";
  const sqlValues = [];

  if (req.query.final_flavour !== undefined) {
    sql +=
      sqlValues.length < 1
        ? " WHERE final_flavour = ?"
        : " AND final_flavour = ?";
    sqlValues.push(req.query.final_flavour);
  }

  if (req.query.name !== undefined) {
    sql +=
      sqlValues.length < 1
        ? " WHERE name = ?"
        : " AND name = ?";
    sqlValues.push(req.query.name);
  }

  database
    .query(sql, sqlValues)
    .then((data) => {
      const cocktails = data[0];
      res.status(200).json(cocktails);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getCocktailById = (req, res) => {
  const id = req.params.id;
  database
    .query("SELECT * FROM cocktail WHERE id = ?", [id])
    .then((data) => {
      const cocktail = data[0][0];
      res.status(200).json(cocktail);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  getCocktails,
  getCocktailById,
};
