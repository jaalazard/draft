const express = require("express");
const database = require("./database");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jose = require("jose");

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

authRouter.get("/check", (req, res) => {
  const jwt = req.cookies.token;
  const isStillConnected = false;
  try {
    const check = await.jose.JWT.verify(jwt, SECRET);
    return res.json({ isStillConnected: true });
  } catch (error) {
    return res.json({ isStillConnected: false });
  }
});

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
  try {
    const [users] = await database.query("SELECT * FROM user WHERE email = ?", [
      req.body.email,
    ]);
    const user = users[0];
    if (!user) {
      return res.status(400).json({ error: "Cannot find user" });
    }

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    const jwt = await new jose.SignJWT({ sub: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("http://localhost")
      .setAudience("http://localhost")
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(SECRET)); // SECRET should be a Uint8Array or similar
    res.cookie('token', jwt, { httpOnly: true, secure: IS_PRODUCTION, sameSite: 'lax' });
    res.json({ message: "Success", token: jwt });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = authRouter;
