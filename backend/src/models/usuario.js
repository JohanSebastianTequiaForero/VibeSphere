// backend/src/models/usuario.js
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==========================
// Obtener todos los usuarios
// ==========================
const getUsuarios = async () => {
  const [rows] = await db.query("SELECT * FROM usuarios");
  return rows;
};

// ==========================
// Obtener usuario por correo (para login)
// ==========================
const getUsuarioByCorreo = async (correo) => {
  const [rows] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [
    correo,
  ]);
  return rows[0]; // Retorna solo un usuario
};

// ==========================
// Crear usuario (registro)
// ==========================
const createUsuario = async (usuario) => {
  const {
    nombre,
    apellidos,
    fecha_nacimiento,
    correo,
    nombre_usuario,
    password,
    rol_id,
    competencias, // solo para artista
    foto_perfil,
    categoria_id, // contratista
    descripcion, // opcional
  } = usuario;

  // 🔐 Encriptar contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  // 1. Generar token de verificación (1h de validez)
  const token = jwt.sign({ correo }, process.env.JWT_SECRET || "secreto_dev", {
    expiresIn: "1h",
  });

  // 2. Insertar usuario en la tabla "usuarios" con token_verificacion y verificado=0
  const [result] = await db.query(
    `INSERT INTO usuarios (nombre, apellidos, correo, fecha_nacimiento, nombre_usuario, password, rol_id, created_at, verificado, token_verificacion)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 0, ?)`,
    [
      nombre,
      apellidos,
      correo,
      fecha_nacimiento,
      nombre_usuario,
      hashedPassword,
      rol_id,
      token,
    ]
  );

  const usuarioId = result.insertId; // ID del nuevo usuario

  // 3. Si es Artista → insertar en "artista_info"
  if (rol_id == 1) {
    await db.query(
      `INSERT INTO artista_info (usuario_id, competencias, foto_perfil)
       VALUES (?, ?, ?)`,

      [usuarioId, competencias || null, foto_perfil || null]
    );
  }

  // 4. Si es Contratista → insertar en "contratista_info"
  if (rol_id == 2 && categoria_id) {
    await db.query(
      `INSERT INTO contratista_info (usuario_id, categoria_id, descripcion, foto_perfil)
       VALUES (?, ?, ?, ?)`,
      [usuarioId, categoria_id, descripcion || null, foto_perfil || null]
    );
  }

  return { usuarioId, token };
};

// ==========================
// Exportar todos los métodos
// ==========================
module.exports = {
  getUsuarios,
  createUsuario,
  getUsuarioByCorreo,
};
