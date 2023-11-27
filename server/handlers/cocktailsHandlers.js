const database = require("../database");

const getCocktails = (req, res) => {
  database
    .query("SELECT * FROM cocktail")
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
