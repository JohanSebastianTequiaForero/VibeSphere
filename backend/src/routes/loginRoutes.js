const express = require("express");
const { login } = require("../controllers/loginController");

const router = express.Router();

// Ruta para login
router.post("/", login);

module.exports = router;
