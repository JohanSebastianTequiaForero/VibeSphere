const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/postulaciones.json");

// Obtener todas las postulaciones
router.get("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error al leer las postulaciones." });
  }
});

// Crear una nueva postulación
router.post("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const nuevaPostulacion = { id: Date.now(), ...req.body };
    data.push(nuevaPostulacion);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(nuevaPostulacion);
  } catch {
    res.status(500).json({ error: "Error al guardar la postulación." });
  }
});

module.exports = router;
