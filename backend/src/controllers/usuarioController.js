// backend/src/controllers/usuarioController.js
const Usuario = require("../models/usuario");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ==========================
// Validación de edad
// ==========================
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

// ==========================
// GET: Obtener todos los usuarios
// ==========================
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getUsuarios();
    res.json({
      success: true,
      message: "Usuarios obtenidos con éxito",
      data: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

// ==========================
// POST: Crear un nuevo usuario
// ==========================
const createUsuario = async (req, res) => {
  try {
    const { fecha_nacimiento, correo } = req.body;

    if (!fecha_nacimiento) {
      return res.status(400).json({
        success: false,
        message: "La fecha de nacimiento es obligatoria",
      });
    }

    if (!esMayorDeEdad(fecha_nacimiento)) {
      return res.status(400).json({
        success: false,
        message: "Debes ser mayor de edad para registrarte",
      });
    }

    const foto_perfil = req.file ? req.file.filename : null;

    const payload = {
      ...req.body,
      foto_perfil,
    };

    if (payload.rol_id) payload.rol_id = Number(payload.rol_id);
    if (payload.categoria_id)
      payload.categoria_id = Number(payload.categoria_id);
    if (payload.rol_id === 2) {
      payload.descripcion = req.body.descripcion || null;
    }

    // Guardar en DB y generar token
    const { usuarioId, token } = await Usuario.createUsuario(payload);

    // 🚀 Configurar transporte de nodemailer (usa Gmail o SMTP que configuraste en .env)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Enviar email con link de verificación
    const verifyUrl = `http://localhost:3000/verify/${token}`;
    await transporter.sendMail({
      from: `"VibeSphere" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Verifica tu cuenta en VibeSphere",
      html: `
        <h2>¡Bienvenido a VibeSphere!</h2>
        <p>Gracias por registrarte. Antes de comenzar, debes verificar tu cuenta.</p>
        <a href="${verifyUrl}" style="padding:10px 15px; background:#006eff; color:white; text-decoration:none; border-radius:5px;">
          Verificar mi cuenta
        </a>
        <p>Este enlace expira en 1 hora.</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Usuario creado. Revisa tu correo para verificar la cuenta.",
      data: { id: usuarioId },
    });
  } catch (error) {
    console.error("Error en createUsuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

// ==========================
// GET: Verificar usuario con token
// ==========================
const verifyUsuario = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_dev");

    // Actualizar usuario a verificado
    await db.query(
      "UPDATE usuarios SET verificado = 1, token_verificacion = NULL WHERE correo = ?",
      [decoded.correo]
    );

    res.json({ success: true, message: "Cuenta verificada con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Token inválido o expirado" });
  }
};

module.exports = { getUsuarios, createUsuario, verifyUsuario };
