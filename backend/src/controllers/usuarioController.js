const Usuario = require('../models/usuario');

// GET: Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const usuarioId = await Usuario.createUsuario(req.body);
    res.status(201).json({ message: "Usuario creado", id: usuarioId });
  } catch (error) {
    res.status(400).json({ error: error.message }); // 🔥 Ahora devuelve error si existe
  }
};



module.exports = { getUsuarios, createUsuario };
