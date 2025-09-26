const Usuario = require('../models/usuario');

function esMayorDeEdad(fecha_nacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fecha_nacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad >= 18;
}

// GET: Obtener todos los usuarios (queda igual)
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
    // === DEPURACIÓN: ver qué llega desde el frontend/multer
    console.log('-> req.file (archivo):', req.file);
    console.log('-> req.body (campos):', req.body);

    const { fecha_nacimiento } = req.body;

    // Validación: fecha existente
    if (!fecha_nacimiento) {
      return res.status(400).json({ error: 'La fecha de nacimiento es obligatoria' });
    }

    // Validación: mayor de 18
    if (!esMayorDeEdad(fecha_nacimiento)) {
      return res.status(400).json({ error: 'Debes ser mayor de edad para registrarte' });
    }

    // OJO: aquí tomamos el nombre del archivo que genera multer
    const foto_perfil = req.file ? req.file.filename : null;

    // Normalizar tipos (rol_id y categoria_id suelen llegar como strings desde form-data)
    const payload = {
      ...req.body,
      foto_perfil,
    };
    if (payload.rol_id) payload.rol_id = Number(payload.rol_id);
    if (payload.categoria_id) payload.categoria_id = Number(payload.categoria_id);

    // Pasar al modelo
    const usuarioId = await Usuario.createUsuario(payload);

    res.status(201).json({ message: 'Usuario creado', id: usuarioId });
  } catch (error) {
    console.error('Error en createUsuario:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsuarios, createUsuario };
