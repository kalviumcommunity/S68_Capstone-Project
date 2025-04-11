const jwt = require("jsonwebtoken");
require('dotenv').config()

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to req object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });

  }
};

module.exports = authMiddleware;
