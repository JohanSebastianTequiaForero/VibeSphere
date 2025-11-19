// src/middlewares/uploadPublicaciones.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Asegúrate de tener la carpeta uploads/publicaciones
const UPLOAD_DIR = path.join(__dirname, "../../uploads/publicaciones");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// MIME types permitidos (imagenes y videos)
const ALLOWED_MIMES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime", // mov
  "video/x-msvideo"  // avi
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, base + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIMES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo imágenes o videos."), false);
  }
};

const limits = {
  fileSize: 50 * 1024 * 1024 // 50 MB máximo por archivo (ajusta si quieres)
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
