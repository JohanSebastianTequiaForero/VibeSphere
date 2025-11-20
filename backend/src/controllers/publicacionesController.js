const path = require("path");
const fs = require("fs");
const Publicaciones = require("../models/publicaciones");

// Si tienes auth puedes obtener usuario desde req.user
function obtenerUsuarioId(req) {
  if (req.user && (req.user.usuario_id || req.user.id)) {
    return req.user.usuario_id || req.user.id;
  }
  // fallback si envían en el body
  return req.body.usuario_id ? Number(req.body.usuario_id) : null;
}

exports.crearPublicacion = async (req, res) => {
  try {
    const usuario_id = obtenerUsuarioId(req);
    if (!usuario_id) return res.status(400).json({ error: "usuario_id requerido" });

    const file = req.file;
    const descripcion = req.body.descripcion || null;

    if (!file) {
      return res.status(400).json({ error: "Debes subir una imagen o un video." });
    }

    const nombre_archivo = file.filename;
    const archivo_url = `/uploads/publicaciones/${nombre_archivo}`;

    const mimetype = file.mimetype || "";
    const tipo_publicacion =
      mimetype.startsWith("image") ? "imagen" :
      mimetype.startsWith("video") ? "video" :
      "otro";

    const result = await Publicaciones.crear({
      usuario_id,
      nombre_archivo,
      descripcion,
      archivo_url,
      tipo_publicacion
    });

    res.json({
      mensaje: "Publicación creada",
      publicacion_id: result.insertId,
      archivo_url,
      tipo_publicacion
    });

  } catch (error) {
    console.error("Error crearPublicacion:", error);
    res.status(500).json({ error: "Error al crear publicación" });
  }
};

exports.obtenerPublicacionesUsuario = async (req, res) => {
  try {
    const usuario_id = req.params.id;
    const publicaciones = await Publicaciones.obtenerPorUsuario(usuario_id);
    res.json(publicaciones);
  } catch (error) {
    console.error("Error obtenerPublicacionesUsuario:", error);
    res.status(500).json({ error: "Error al obtener publicaciones" });
  }
};

exports.eliminarPublicacion = async (req, res) => {
  try {
    const publicacion_id = req.params.id;

    const publicacion = await Publicaciones.obtenerPorId(publicacion_id);

    if (!publicacion) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    // 🔐 validar dueño (si estás usando auth)
    if (req.user && (req.user.usuario_id || req.user.id)) {
      const userId = req.user.usuario_id || req.user.id;
      if (userId !== publicacion.usuario_id) {
        return res.status(403).json({ error: "No autorizado" });
      }
    }

    // 🗑 borrar archivo físico
    if (publicacion.nombre_archivo) {
      const filePath = path.join(__dirname, "../../uploads/publicaciones", publicacion.nombre_archivo);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Publicaciones.eliminar(publicacion_id);

    res.json({ mensaje: "Publicación eliminada correctamente" });

  } catch (error) {
    console.error("Error eliminarPublicacion:", error);
    res.status(500).json({ error: "Error al eliminar la publicación" });
  }
};
