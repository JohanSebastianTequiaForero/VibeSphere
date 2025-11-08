// src/models/artista.js
const db = require("../config/db");

const Artista = {
  // 🔹 Obtener info de un artista por usuario_id
  async obtenerArtista(usuario_id) {
    const [rows] = await db.query(
      `SELECT a.usuario_id AS usuario_id,
              u.nombre,
              u.apellidos,
              u.nombre_usuario,
              a.competencias,
              a.foto_perfil
       FROM artista_info a
       INNER JOIN usuarios u ON a.usuario_id = u.usuario_id
       WHERE a.usuario_id = ?`,
      [usuario_id]
    );

    // Si no hay resultados, retorna null
    if (!rows.length) return null;

    const artista = rows[0];

    // 🔹 Agregar URL completa para la imagen si existe
    if (artista.foto_perfil) {
      artista.foto_perfil = `http://localhost:5000/uploads/${artista.foto_perfil}`;
    } else {
      artista.foto_perfil = null; // o podrías poner una imagen por defecto
    }

    return artista;
  },

  // 🔹 Actualizar competencias y/o foto
  async actualizarArtista(usuario_id, competencias, foto_perfil) {
    const [result] = await db.query(
      `UPDATE artista_info 
       SET competencias = COALESCE(?, competencias),
           foto_perfil = COALESCE(?, foto_perfil)
       WHERE usuario_id = ?`,
      [competencias, foto_perfil, usuario_id]
    );
    return result;
  },
};

module.exports = Artista;
