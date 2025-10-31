// frontend/src/services/vacantesService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/vacantes"; // Base URL de vacantes
const API_CONTRATISTAS = "http://localhost:5000/api/contratistas/vacantes"; // Vacantes de contratistas

// ===============================
// 🎵 Obtener todas las vacantes
// ===============================
export async function getVacantes() {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("❌ Error al obtener vacantes:", err);
    return [];
  }
}

// ===============================
// 🧾 Crear una nueva vacante (solo contratista)
// ===============================
export async function createVacante(vacanteData) {
  try {
    const res = await axios.post(API_URL, vacanteData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error al crear la vacante:", err);
    return null;
  }
}

// ===============================
// 🗑️ Eliminar una vacante (solo contratista)
// ===============================
export async function deleteVacante(vacanteId) {
  try {
    const res = await axios.delete(`${API_CONTRATISTAS}/${vacanteId}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error al eliminar vacante:", err);
    return null;
  }
}

// ===============================
// 🧑‍🎤 Obtener vacantes publicadas por un contratista
// ===============================
export async function getVacantesContratista() {
  try {
    const res = await axios.get(API_CONTRATISTAS);
    return res.data;
  } catch (err) {
    console.error("❌ Error al obtener vacantes del contratista:", err);
    return [];
  }
}

// ===============================
// 💼 Postularse a una vacante (para artistas)
// ===============================
export async function postularVacante(idVacante, usuario) {
  try {
    await axios.post(`${API_URL}/${idVacante}/postular`, { usuario });
  } catch (err) {
    console.error("❌ Error al postularse:", err);
  }
}
