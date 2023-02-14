const jwt = require("jsonwebtoken");
const SECRET = "jwt secret";
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).josn({ err: "you are required to log in" });
    }
    const TOken = authHeader.split(" ")[1];
    if (!TOken) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decodedToken = jwt.verify(TOken, SECRET);
    const user = await User.findOne({
      where: {
        id: decodedToken.user.id,
      },
    });
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const isSeller = (req, res, next) => {
  if (req.user.dataValues.isSeller) {
    next();
  } else {
    res.status(401).json({ err: "You are not a seller" });
  }
};

module.exports = { isAuthenticated, isSeller };
