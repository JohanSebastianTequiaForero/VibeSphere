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

    if (!rows.length) return null;

    const artista = rows[0];

    // ✅ Ya NO armamos la URL completa aquí
    // ✅ Devolvemos solo el nombre del archivo
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
