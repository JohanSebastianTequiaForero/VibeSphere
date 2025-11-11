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

    // ✅ NO agregar URL completa. 
    // El frontend y navbar construyen la URL.

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
    const nuevaFoto = req.file ? req.file.filename : null;

    // ✅ Obtener foto anterior real desde la DB
    const contratistaExistente = await ContratistaInfo.obtenerContratista(usuario_id);

    if (!contratistaExistente) {
      return res.status(404).json({
        success: false,
        message: "Contratista no encontrado",
      });
    }

    // ✅ foto_perfil existente es solo nombre de archivo
    const fotoAnterior = contratistaExistente.foto_perfil;

    // ✅ Si no enviaron nueva foto, conservar la anterior
    const fotoFinal = nuevaFoto || fotoAnterior;

    // ✅ Guardar solo si se envió un archivo nuevo
    const result = await ContratistaInfo.actualizarContratista(
      usuario_id,
      categoria_id,
      descripcion,
      nuevaFoto
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Contratista no encontrado o sin cambios",
      });
    }

    // ✅ IMPORTANTE:
    // Siempre enviamos SOLO el nombre del archivo (como artista)
    // Nunca una URL completa → navbar funciona perfecto
    const fotoNormalizada = fotoFinal?.replace("http://localhost:5000/uploads/", "");

    res.json({
      success: true,
      message: "Información actualizada correctamente",
      data: {
        usuario_id,
        categoria_id,
        descripcion,
        foto_perfil: fotoNormalizada, // ✅ navbar recibe lo esperado
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
