// frontend/src/services/loginService.js
const API_URL = "http://localhost:5000/api/login";

// 🔐 Servicio de login
export async function login(correo, password) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    });

    const data = await res.json();

    // 🔥 Mantener el formato uniforme con backend
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "❌ Error en el login",
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "🚨 Error de conexión con el servidor",
    };
  }
}
