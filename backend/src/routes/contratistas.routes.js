import express from "express";
import {
  getVacantesContratista,
  crearVacante,
  eliminarVacante,
} from "../controllers/contratistasController.js";

const router = express.Router();

// Obtener vacantes publicadas por el contratista
router.get("/vacantes", getVacantesContratista);

// Crear nueva vacante
router.post("/vacantes", crearVacante);

// Eliminar vacante
router.delete("/vacantes/:id", eliminarVacante);

export default router;
