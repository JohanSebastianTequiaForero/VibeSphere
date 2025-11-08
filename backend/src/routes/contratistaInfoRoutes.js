// backend/src/routes/contratistaInfoRoutes.js
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  obtenerContratista,
  actualizarContratista,
} = require("../controllers/contratistaInfoController");

// ✅ Configuración de multer (para foto de perfil)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.mimetype)) {
      return cb(new Error("Solo se permiten imágenes PNG o JPG"));
    }
    cb(null, true);
  },
});

// ✅ Rutas
router.get("/:usuario_id", obtenerContratista);
router.put("/:usuario_id", upload.single("foto_perfil"), actualizarContratista);

module.exports = router;
