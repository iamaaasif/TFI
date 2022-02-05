const jwt = require("jsonwebtoken");

function CheckLogin(req, res, next) {
  //check cookie available or not
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookie) {
    //retrive jwt_token from cookies
    jwt_token = cookie[process.env.COOKIE_NAME];
    //decode jwt token
    jwt.verify(jwt_token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        return res.status(403).json({ message: "Authentication Failure!" });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "Authentication Failure!" });
  }
}

module.exports = { CheckLogin };
