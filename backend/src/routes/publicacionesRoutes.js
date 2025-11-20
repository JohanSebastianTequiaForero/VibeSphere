const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadPublicaciones");
const publicacionesController = require("../controllers/publicacionesController");

// Crear publicación
router.post("/", upload.single("archivo"), publicacionesController.crearPublicacion);

// Obtener publicaciones por usuario
router.get("/:id", publicacionesController.obtenerPublicacionesUsuario);

// Eliminar publicación
router.delete("/:id", publicacionesController.eliminarPublicacion);

module.exports = router;
