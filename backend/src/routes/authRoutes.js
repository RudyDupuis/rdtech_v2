const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
require("dotenv").config({ path: ".env.local" });

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

const upload = multer({ dest: "uploads/" });

router.post("/", upload.none(), async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe manquant" });
  }

  if (username !== USERNAME) {
    return res
      .status(401)
      .json({ message: "Nom d'utilisateur ou mot de passe invalide" });
  }

  if (password !== PASSWORD) {
    return res
      .status(401)
      .json({ message: "Nom d'utilisateur ou mot de passe invalide" });
  }

  try {
    const token = jwt.sign({ userId: 1 }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router;
