const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db'); // 🔥 Necesario para las consultas
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

// 🔥 Nueva ruta para verificar correo y usuario
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
      return res.status(400).json({ error: 'Debes enviar nombre_usuario o correo' });
    }

    const [rows] = await db.query(query, values);
    res.json({ exists: rows.length > 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas normales
router.get('/', getUsuarios);
router.post('/', upload.single('foto_perfil'), createUsuario);

module.exports = router;
