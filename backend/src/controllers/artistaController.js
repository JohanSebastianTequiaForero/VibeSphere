// backend/src/controllers/artistaController.js
const db = require("../config/db");
const Artista = require("../models/artista"); // ✅ importa el modelo correctamente

// ======================================================
// Obtener información del artista
// ======================================================
const obtenerArtista = async (req, res) => {
  try {
    const { usuario_id } = req.params;
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

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Artista no encontrado",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("❌ Error al obtener artista:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la información del artista",
      error: error.message,
    });
  }
};

// ======================================================
// Actualizar competencias o foto
// ======================================================
const actualizarArtista = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const competencias = req.body?.competencias || null;
    const foto_perfil = req.file ? req.file.filename : null;

    if (!competencias && !foto_perfil) {
      return res.status(400).json({
        success: false,
        message: "No se envió ninguna información para actualizar.",
      });
    }

    const result = await Artista.actualizarArtista(
      usuario_id,
      competencias,
      foto_perfil
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontró el artista o no hubo cambios.",
      });
    }

    res.json({
      success: true,
      message: "Información del artista actualizada correctamente",
      data: {
        usuario_id,
        competencias,
        foto_perfil:
          foto_perfil && `http://localhost:5000/uploads/${foto_perfil}`,
      },
    });
  } catch (error) {
    console.error("❌ Error al actualizar artista:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar la información del artista",
      error: error.message,
    });
  }
};

module.exports = { obtenerArtista, actualizarArtista }; // ✅ Exporta ambas funciones
