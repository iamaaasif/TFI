const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/connection");

async function userRegistration(req, res, next) {
  const { username, password, firstName, lastName } = req.body;

  //hash plain password using bcrypt  with salt round 10
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const dbres = await pool.query(
      "INSERT INTO users (username, password,firstName, lastName) VALUES($1,$2,$3,$4)",
      [username, hashedPassword, firstName, lastName]
    );
    res.status(200).json({ message: "Registration Successfull" });
  } catch (error) {
    res.status(500).json({ message: error.detail });
  }
}

async function userLogin(req, res, next) {
  try {
    const { username, password } = req.body;

    const dbres = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    let hashedPassword;
    if (dbres.rowCount) {
      hashedPassword = dbres.rows[0].password;
    } else {
      return res.status(404).json({ message: "user not found!" });
    }

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (isValidPassword) {
      //generate jwt token (payload = username)
      const jwt_token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      //set jwt token into cookie
      res.cookie(process.env.COOKIE_NAME, jwt_token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
      });
      res.status(200).json({ message: "login succesfull" });
    } else {
      res.status(401).json({ message: "Wrong password!" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { userRegistration, userLogin };
