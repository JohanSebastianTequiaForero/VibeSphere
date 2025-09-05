const db = require('../config/db');

const getUsuarios = async () => {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
};

const createUsuario = async (usuario) => {
  const { 

    nombre, 
    apellidos, 
    correo, 
    nombre_usuario, 
    password, 
    rol_id, 
    competencias, 
    foto_perfil, 
    categoria_id } = usuario;

  const [result] = await db.query(
    `INSERT INTO usuarios (nombre_usuario, nombre, apellidos, correo, password, rol_id, created_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [nombre, apellidos, correo,nombre_usuario,password, rol_id]
  );

  const usuarioId = result.insertId;

  // Si es artista, insertar en artista_info
  if (rol_id == 1) {
    await db.query(
      `INSERT INTO artista_info (usuario_id, competencias, foto_perfil)
       VALUES (?, ?, ?)`,
      [usuarioId, competencias || null, foto_perfil || null]
    );
  }

  // Si es contratista, insertar en contratista_categoria
  if (rol_id == 2 && categoria_id) {
    await db.query(
      `INSERT INTO contratista_categoria (usuario_id, categoria_id)
       VALUES (?, ?)`,
      [usuarioId, categoria_id]
    );
  }

  return usuarioId;
};


module.exports = { getUsuarios, createUsuario };
