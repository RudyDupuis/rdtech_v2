const jwt = require("jsonwebtoken");
require("dotenv").config();
require("dotenv").config({ path: ".env.local" });

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authenticateToken };
