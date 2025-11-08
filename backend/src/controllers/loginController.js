// backend/src/controllers/loginController.js
const bcrypt = require("bcrypt");
const { getUsuarioByCorreo } = require("../models/usuario");

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // 1. Buscar usuario en la BD
    const usuario = await getUsuarioByCorreo(correo);
    if (!usuario) {
      return res.status(400).json({
        success: false,
        message: "Correo o contraseña incorrectos ❌",
      });
    }

    // 2. Validar si el usuario ya verificó su correo
    if (!usuario.verificado) {
      return res.status(403).json({
        success: false,
        message: "Debes verificar tu correo antes de iniciar sesión 📧",
      });
    }

    // 3. Comparar contraseñas
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Correo o contraseña incorrectos ❌",
      });
    }

    // 4. Respuesta con datos básicos (sin password)
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso ✅",
      data: {
        id: usuario.usuario_id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol_id,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

module.exports = { login };
