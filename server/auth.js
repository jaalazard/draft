const express = require('express');
const database = require('./database');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

authRouter.post("/register", async (req, res) => {
  try {
  const hadshedPassword = await bcrypt.hash(req.body.password, 10);
  const insertedUser = await database.query(
    "INSERT INTO user (email, password) VALUES (?, ?)",
    [req.body.email, hadshedPassword]
  );
  } catch (error) {
    res.status(500).send(error);
  }
});

authRouter.post("/login", async (req, res) => {
  const result = await database.query(
    "SELECT * FROM user WHERE email = ?",
    [req.body.email]
  );
  const user = result[0];
  if (user.length === 0) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user[0].password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = authRouter;