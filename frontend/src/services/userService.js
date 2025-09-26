const API_URL = "http://localhost:5000/api";

// 🔥 Crear usuario (con archivo)
export async function createUsuario(usuario) {
  const formData = new FormData();

  // 🔹 Agregar cada campo al FormData
  for (const key in usuario) {
    if (usuario[key] !== null && usuario[key] !== undefined) {
      formData.append(key, usuario[key]);
    }
  }

  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    body: formData, // 🔥 Aquí va multipart/form-data
  });

  return res.json();
}

// 🔍 Verificar si un nombre de usuario o correo existe
export async function checkUsuarioOCorreo({ nombre_usuario, correo }) {
  const params = new URLSearchParams();

  if (nombre_usuario) params.append("nombre_usuario", nombre_usuario);
  if (correo) params.append("correo", correo);

  const res = await fetch(`${API_URL}/usuarios/check?${params.toString()}`);
  return res.json();
}
