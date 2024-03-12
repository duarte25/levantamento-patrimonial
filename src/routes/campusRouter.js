import express from "express";
import CampusController from "../controllers/CampusController.js";
import ValidateCampus from "../services/validation/campusValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .get("/campus", AuthMiddleware, CampusController.pesquisarCampus)
    .get("/campus/:id", AuthMiddleware, CampusController.listarCampusID)
    .post("/campus", AuthMiddleware, ValidateCampus.validateCriar, CampusController.criarCampus)
    .delete("/campus/:id", AuthMiddleware, CampusController.deletarCampus);

export default router;