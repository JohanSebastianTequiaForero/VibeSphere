const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// ✅ Controlador
const {
  obtenerArtista,
  actualizarArtista,
} = require("../controllers/artistaController");

// =====================================
// 1️⃣ Configuración de Multer (subida de fotos)
// =====================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // 📂 carpeta donde se guardan fotos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5MB
  fileFilter: (req, file, cb) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.mimetype)) {
      return cb(new Error("Solo se permiten imágenes PNG o JPG"));
    }
    cb(null, true);
  },
});

// =====================================
// 2️⃣ Rutas del artista
// =====================================

// 🟢 Obtener info de artista
router.get("/:usuario_id", obtenerArtista);

// 🟡 Actualizar info del artista (competencias o foto)
router.put("/:usuario_id", upload.single("foto_perfil"), actualizarArtista);
// =====================================
// 3️⃣ Exportar rutas
// =====================================
module.exports = router;
