// backend/src/models/contratistaInfo.js
const db = require("../config/db");

const ContratistaInfo = {
  // ✅ Obtener información de un contratista por su usuario_id
  async obtenerContratista(usuario_id) {
    const [rows] = await db.query(
      `SELECT c.usuario_id,
              u.nombre,
              u.apellidos,
              u.nombre_usuario,
              cat.nombre AS categoria_nombre,
              c.descripcion,
              c.foto_perfil
       FROM contratista_info c
       INNER JOIN usuarios u ON c.usuario_id = u.usuario_id
       LEFT JOIN categorias cat ON c.categoria_id = cat.categoria_id
       WHERE c.usuario_id = ?`,
      [usuario_id]
    );
    return rows[0];
  },

  // ✅ Actualizar datos del contratista (foto o descripción o categoría)
  async actualizarContratista(usuario_id, categoria_id, descripcion, foto_perfil) {
    const [result] = await db.query(
      `UPDATE contratista_info
       SET 
         categoria_id = COALESCE(?, categoria_id),
         descripcion = COALESCE(?, descripcion),
         foto_perfil = COALESCE(?, foto_perfil)
       WHERE usuario_id = ?`,
      [categoria_id, descripcion, foto_perfil, usuario_id]
    );
    return result;
  },
};

module.exports = ContratistaInfo;
