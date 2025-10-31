import fs from "fs";
import path from "path";

const vacantesPath = path.resolve("backend/data/vacantes.json");

// 📍 Obtener todas las vacantes
export const getVacantes = (req, res) => {
  try {
    const data = fs.readFileSync(vacantesPath, "utf-8");
    const vacantes = JSON.parse(data);
    res.json(vacantes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las vacantes" });
  }
};

// 📍 Postular a una vacante
export const postularVacante = (req, res) => {
  try {
    const { id } = req.params;
    const { usuario } = req.body;
    const data = fs.readFileSync(vacantesPath, "utf-8");
    const vacantes = JSON.parse(data);

    const vacante = vacantes.find((v) => v.id === parseInt(id));
    if (!vacante)
      return res.status(404).json({ error: "Vacante no encontrada" });

    // Evitar postulación repetida
    if (!vacante.postulados.includes(usuario)) {
      vacante.postulados.push(usuario);
    }

    fs.writeFileSync(vacantesPath, JSON.stringify(vacantes, null, 2));
    res.json({ message: "Postulación exitosa" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al postular a la vacante" });
  }
};
// 📍 Eliminar una vacante
