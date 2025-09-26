const bcrypt = require("bcrypt");
const { getUsuarioByCorreo } = require("../models/usuario");

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // 1. Buscar usuario en la BD
    const usuario = await getUsuarioByCorreo(correo);
    if (!usuario) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos ❌" });
    }

    // 2. Comparar contraseñas
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos ❌" });
    }

    // 3. Respuesta con datos básicos (sin password)
    res.json({
      message: "Inicio de sesión exitoso ✅",
      usuario: {
        id: usuario.usuario_id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { login };
