const database = require('../database');

const getCocktails = (req, res) => {
  database
    .query("SELECT * FROM cocktail")
    .then((data) => {
        const cocktails = data[0];
      res.status(200).json(cocktails);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
    getCocktails,
}