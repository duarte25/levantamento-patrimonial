import express from "express";
import SetorController from "../controllers/SetorController.js";
import ValidateSetor from "../middlewares/validation/setorValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { verificarPermissao } from "../middlewares/PermissaoMiddleware.js";
import { ACAO, PERM } from "../models/Grupo.js";

const router = express.Router();

router.get("/setores", AuthMiddleware,
    verificarPermissao(PERM.SETOR, ACAO.VER),
    SetorController.pesquisarSetor);

router.get("/setores/:id", AuthMiddleware,
    verificarPermissao(PERM.SETOR, ACAO.VER),
    SetorController.listarSetorID);

router.post("/setores", AuthMiddleware,
    verificarPermissao(PERM.SETOR, ACAO.CRIAR),
    ValidateSetor.validateCriar, SetorController.criarSetor);

router.patch("/setores/:id", AuthMiddleware,
    verificarPermissao(PERM.SETOR, ACAO.EDITAR),
    ValidateSetor.validateAlterar, SetorController.atualizarSetor);

router.delete("/setores/:id", AuthMiddleware,
    verificarPermissao(PERM.SETOR, ACAO.DELETAR),
    ValidateSetor.validateDeletar, SetorController.deletarSetor);

export default router;
