// backend/src/models/usuario.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

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
  const [rows] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
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
    competencias,
    foto_perfil,
    categoria_id,
  } = usuario;

  // 🔐 Encriptar contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  // 1. Insertar usuario en la tabla "usuarios"
  const [result] = await db.query(
    `INSERT INTO usuarios (nombre, apellidos, correo, fecha_nacimiento, nombre_usuario, password, rol_id, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [nombre, apellidos, correo, fecha_nacimiento, nombre_usuario, hashedPassword, rol_id]
  );

  const usuarioId = result.insertId; // ID del nuevo usuario

  // 2. Si es Artista → insertar en "artista_info"
  if (rol_id == 1) {
    await db.query(
      `INSERT INTO artista_info (usuario_id, competencias, foto_perfil)
       VALUES (?, ?, ?)`,
      [usuarioId, competencias || null, foto_perfil || null]
    );
  }

  // 3. Si es Contratista → insertar en "contratista_categoria"
  if (rol_id == 2 && categoria_id) {
    await db.query(
      `INSERT INTO contratista_categoria (usuario_id, categoria_id)
       VALUES (?, ?)`,
      [usuarioId, categoria_id]
    );
  }

  return usuarioId;
};

// ==========================
// Exportar todos los métodos
// ==========================
module.exports = {
  getUsuarios,
  createUsuario,
  getUsuarioByCorreo,
};
