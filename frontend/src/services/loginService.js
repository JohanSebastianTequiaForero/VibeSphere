const API_URL = "http://localhost:5000/api/login";

export async function login(correo, password) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error en login");
  }

  return res.json();
}
