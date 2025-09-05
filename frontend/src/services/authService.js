// Simulación de un servicio de autenticación
export function login(user, pass) {
  if (user === "admin" && pass === "1234") {
    return { status: "success", user: { name: "Admin" } };
  } else {
    return { status: "error", message: "Credenciales inválidas" };
  }
}

export function register(user, email, pass) {
  return { status: "success", user: { name: user, email } };
}
