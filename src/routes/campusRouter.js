import express from "express";
import CampusController from "../controllers/CampusController.js";
import ValidateCampus from "../services/validation/campusValidation.js";

const router = express.Router();

router
    .get("/campus", CampusController.pesquisarCampus)
    .get("/capus/:id", CampusController.listarCampusID)
    .post("/campus", ValidateCampus.validateCriar, CampusController.criarCampus)
    .delete("/campus/:id", CampusController.deletarCampus);

export default router;