// src/models/publicaciones.js
const db = require("../config/db");

const Publicaciones = {
  async crear({ usuario_id, nombre_archivo, descripcion, archivo_url, tipo_publicacion }) {
    const sql = `
      INSERT INTO publicaciones
      (usuario_id, nombre_archivo, descripcion, archivo_url, tipo_publicacion)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      usuario_id,
      nombre_archivo,
      descripcion,
      archivo_url,
      tipo_publicacion
    ]);

    return { insertId: result.insertId };
  },

  async obtenerPorUsuario(usuario_id) {
    const sql = `
      SELECT publicacion_id, usuario_id, nombre_archivo, descripcion,
             archivo_url, tipo_publicacion, fecha_publicacion
      FROM publicaciones
      WHERE usuario_id = ?
      ORDER BY fecha_publicacion DESC
    `;
    const [rows] = await db.execute(sql, [usuario_id]);
    return rows;
  },

  async obtenerPorId(publicacion_id) {
    const sql = `SELECT * FROM publicaciones WHERE publicacion_id = ?`;
    const [rows] = await db.execute(sql, [publicacion_id]);
    
    // ⛔ YA NO DEVUELVO rows[0]
    return rows.length > 0 ? rows[0] : null; 
  },

  async eliminar(publicacion_id) {
    const sql = `DELETE FROM publicaciones WHERE publicacion_id = ?`;
    const [result] = await db.execute(sql, [publicacion_id]);
    return result;
  }
};

module.exports = Publicaciones;
