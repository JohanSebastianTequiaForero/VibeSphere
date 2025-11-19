// src/routes/publicacionesRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadPublicaciones");
const publicacionesController = require("../controllers/publicacionesController");
const auth = require("../middlewares/uploadMiddleware"); // opcional: si ya tienes middleware de auth

// Crear publicación (archivo obligatorio)
// Si no usas autenticación, elimina "auth" y envía usuario_id en body FormData.
router.post(
  "/",
  // auth,        // descomenta si quieres que solo usuarios autenticados suban
  upload.single("archivo"),
  publicacionesController.crearPublicacion
);

// Obtener publicaciones por usuario
router.get("/:id", publicacionesController.obtenerPublicacionesUsuario);

// Eliminar publicación
router.delete("/:id",
  // auth,       // opcional: proteger con auth
  publicacionesController.eliminarPublicacion
);

module.exports = router;
