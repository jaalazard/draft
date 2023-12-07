const express = require("express");
const database = require("./database");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jose = require("jose");

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const IS_PRODUCTION = process.env.NODE_ENV === "production";

authRouter.get("/check", async (req, res) => {
  const jwt = req.cookies.token;

  if (jwt === undefined) {
    return res.json({ isLoggedIn: false });
  }
  try {
    const check = await jose.JWT.verify(jwt, SECRET);
    return res.json({ isLoggedIn: true });
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {

    }
    return res.json({ isLoggedIn: false });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const hadshedPassword = await bcrypt.hash(req.body.password, 10);
    const insertedUser = await database.query(
      "INSERT INTO user (email, password) VALUES (?, ?)",
      [req.body.email, hadshedPassword]
    );
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const [users] = await database.query("SELECT * FROM user WHERE email = ?", [
      req.body.email,
    ]);
    const user = users[0];

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    const jwt = await new jose.SignJWT({ sub: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("http://localhost")
      .setAudience("http://localhost")
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(SECRET));
    res.cookie("token", jwt, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    return res.json({
      message: "Success",
      token: jwt,
      ok: true,
      isLoggedIn: isCorrectPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = authRouter;
