const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Ruta del JSON local (simula base de datos por ahora)
const dataPath = path.join(__dirname, "../data/vacantes.json");

// Obtener todas las vacantes
router.get("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al leer las vacantes." });
  }
});

// Crear una vacante (para contratista)
router.post("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const nuevaVacante = { id: Date.now(), ...req.body };
    data.push(nuevaVacante);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(nuevaVacante);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar la vacante." });
  }
});

module.exports = router;
