import express from "express";
import {
  obtenerVacantesContratista,
  obtenerPostulados,
  contratarArtista,
} from "../controllers/contratistaController.js";

const router = express.Router();

router.get("/:idContratista/vacantes", obtenerVacantesContratista);
router.get("/vacantes/:id/postulados", obtenerPostulados);
router.post("/vacantes/:id/contratar/:artistaId", contratarArtista);

export default router;
