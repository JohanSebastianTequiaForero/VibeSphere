// src/controllers/publicacionesController.js
const path = require("path");
const fs = require("fs");
const Publicaciones = require("../models/publicaciones");

// Helper para obtener usuario_id (desde req.user si hay auth, sino desde body)
function obtenerUsuarioId(req) {
  if (req.user && (req.user.usuario_id || req.user.id)) {
    return req.user.usuario_id || req.user.id;
  }
  // fallback al body (frontend puede enviar usuario_id en FormData)
  return req.body.usuario_id ? Number(req.body.usuario_id) : null;
}

exports.crearPublicacion = async (req, res) => {
  try {
    const usuario_id = obtenerUsuarioId(req);
    if (!usuario_id) return res.status(400).json({ error: "usuario_id requerido" });

    // Multer puso el archivo en req.file
    const file = req.file;
    const descripcion = req.body.descripcion || null;

    if (!file) {
      // permitir publicaciones solo texto si quieres: aquí lo consideramos obligatorio
      return res.status(400).json({ error: "Se requiere archivo (imagen o video)." });
    }

    const nombre_archivo = file.filename;
    // archivo_url público que consumirá el frontend
    const archivo_url = `/uploads/publicaciones/${nombre_archivo}`;

    // Determinar tipo_publicacion según mimetype
    const mimetype = file.mimetype || "";
    const tipo_publicacion = mimetype.startsWith("image") ? "imagen" : mimetype.startsWith("video") ? "video" : "otro";

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
    res.status(500).json({ error: "Error al crear la publicación" });
  }
};

exports.obtenerPublicacionesUsuario = async (req, res) => {
  try {
    const usuario_id = req.params.id;
    if (!usuario_id) return res.status(400).json({ error: "usuario_id requerido" });

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
    if (!publicacion) return res.status(404).json({ error: "Publicación no encontrada" });

    // opcional: validar que req.user sea dueño de la publicación
    if (req.user && (req.user.usuario_id || req.user.id)) {
      const usuarioIdToken = req.user.usuario_id || req.user.id;
      if (usuarioIdToken !== publicacion.usuario_id) {
        return res.status(403).json({ error: "No autorizado para eliminar esta publicación" });
      }
    }

    // borrar archivo físico
    if (publicacion.nombre_archivo) {
      const filePath = path.join(__dirname, "../../uploads/publicaciones", publicacion.nombre_archivo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Publicaciones.eliminar(publicacion_id);
    res.json({ mensaje: "Publicación eliminada" });

  } catch (error) {
    console.error("Error eliminarPublicacion:", error);
    res.status(500).json({ error: "Error al eliminar publicación" });
  }
};
