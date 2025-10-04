const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { createUsuario, getUsuarios } = require('../controllers/usuarioController');

// Configuración de Multer para archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// 🔥 Verificar si correo o usuario ya existen
router.get('/check', async (req, res) => {
  const { nombre_usuario, correo } = req.query;

  try {
    let query = '';
    let values = [];

    if (nombre_usuario) {
      query = 'SELECT usuario_id FROM usuarios WHERE nombre_usuario = ?';
      values = [nombre_usuario];
    } else if (correo) {
      query = 'SELECT usuario_id FROM usuarios WHERE correo = ?';
      values = [correo];
    } else {
      return res.status(400).json({
        success: false,
        message: 'Debes enviar nombre_usuario o correo'
      });
    }

    const [rows] = await db.query(query, values);
    res.json({
      success: true,
      message: rows.length > 0 ? "El usuario/correo ya existe" : "Disponible",
      exists: rows.length > 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al verificar usuario/correo",
      error: error.message
    });
  }
});

// 📌 Endpoint de verificación de cuenta
router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Verificar firma del token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_dev");

    // Buscar usuario por token
    const [rows] = await db.query(
      "SELECT usuario_id FROM usuarios WHERE correo = ? AND token_verificacion = ?",
      [decoded.correo, token]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Token inválido o ya usado ❌"
      });
    }

    // Marcar usuario como verificado
    await db.query(
      "UPDATE usuarios SET verificado = 1, token_verificacion = NULL WHERE usuario_id = ?",
      [rows[0].usuario_id]
    );

    res.json({
      success: true,
      message: "✅ Cuenta verificada con éxito. Ya puedes iniciar sesión."
    });

  } catch (error) {
    console.error("Error en verificación:", error);
    res.status(400).json({
      success: false,
      message: "Token inválido o expirado ❌",
      error: error.message
    });
  }
});

// 📌 Endpoints principales
router.get('/', getUsuarios); 
router.post('/', upload.single('foto_perfil'), createUsuario);

module.exports = router;
