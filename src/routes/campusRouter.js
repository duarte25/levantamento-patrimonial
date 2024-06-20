import express from "express";
import CampusController from "../controllers/CampusController.js";
import ValidateCampus from "../services/validation/campusValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { verificarPermissao } from "../middlewares/PermissaoMiddleware.js";
import { ACAO, PERM } from "../models/Grupo.js";

const router = express.Router();

router.get("/campus", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    CampusController.pesquisarCampus);


router.get("/campus/:id", AuthMiddleware, CampusController.listarCampusID);
router.post("/campus", AuthMiddleware, ValidateCampus.validateCriar, CampusController.criarCampus);
router.patch("/campus/:id", AuthMiddleware, CampusController.atualizarCampus);
router.delete("/campus/:id", AuthMiddleware, CampusController.deletarCampus);

export default router;