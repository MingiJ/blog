const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.ensureAuthenticated = async (req, res, next) => {
  try {
    //Get the token from the header
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("No token provided");
    }
    const token = req.headers.authorization.split(" ")[1];
    req.user = await jwt.verify(token, process.env.JWTSECRET);
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};
