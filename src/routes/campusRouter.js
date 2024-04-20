import express from "express";
import CampusController from "../controllers/CampusController.js";
import ValidateCampus from "../services/validation/campusValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { GrupoMiddleware } from "../middlewares/GrupoMiddleware.js";

const router = express.Router();

router
    .get("/campus", AuthMiddleware, GrupoMiddleware("visualizar_campus"),  CampusController.pesquisarCampus)
    .get("/campus/:id", AuthMiddleware, GrupoMiddleware("visualizar_campus"),  CampusController.listarCampusID)
    .post("/campus", AuthMiddleware, GrupoMiddleware("criar_campus"),  ValidateCampus.validateCriar, CampusController.criarCampus)
    .patch("/campus/:id", AuthMiddleware, GrupoMiddleware("alterar_campus"),  CampusController.atualizarCampus)
    .delete("/campus/:id", AuthMiddleware, GrupoMiddleware("deletar_campus"),  CampusController.deletarCampus);

export default router;