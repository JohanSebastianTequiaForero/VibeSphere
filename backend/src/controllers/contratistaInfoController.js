// backend/src/controllers/contratistaInfoController.js
const ContratistaInfo = require("../models/contratistaInfo");

const obtenerContratista = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const contratista = await ContratistaInfo.obtenerContratista(usuario_id);

    if (!contratista) {
      return res.status(404).json({
        success: false,
        message: "Contratista no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Datos del contratista obtenidos correctamente",
      data: contratista,
    });
  } catch (error) {
    console.error("❌ Error al obtener contratista:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener datos del contratista",
      error: error.message,
    });
  }
};

const actualizarContratista = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const categoria_id = req.body?.categoria_id || null;
    const descripcion = req.body?.descripcion || null;
    const foto_perfil = req.file ? req.file.filename : null;

    if (!categoria_id && !descripcion && !foto_perfil) {
      return res.status(400).json({
        success: false,
        message: "No se envió información para actualizar",
      });
    }

    const result = await ContratistaInfo.actualizarContratista(
      usuario_id,
      categoria_id,
      descripcion,
      foto_perfil
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Contratista no encontrado o sin cambios",
      });
    }

    res.json({
      success: true,
      message: "Información actualizada correctamente",
      data: {
        usuario_id,
        categoria_id,
        descripcion,
        foto_perfil:
          foto_perfil && `http://localhost:5000/uploads/${foto_perfil}`,
      },
    });
  } catch (error) {
    console.error("❌ Error al actualizar contratista:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar información del contratista",
      error: error.message,
    });
  }
};

module.exports = { obtenerContratista, actualizarContratista };
