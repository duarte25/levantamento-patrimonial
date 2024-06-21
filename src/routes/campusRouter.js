import express from "express";
import CampusController from "../controllers/CampusController.js";
import ValidateCampus from "../middlewares/validation/campusValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { verificarPermissao } from "../middlewares/PermissaoMiddleware.js";
import { ACAO, PERM } from "../models/Grupo.js";

const router = express.Router();

router.get("/campus", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    CampusController.pesquisarCampus);

router.get("/campus/:id", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    CampusController.listarCampusID);

router.post("/campus", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.CRIAR),
    ValidateCampus.validateCriar, CampusController.criarCampus);

router.patch("/campus/:id", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.EDITAR),
    CampusController.atualizarCampus);

router.delete("/campus/:id", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.DELETAR),
    CampusController.deletarCampus);

export default router;