import express from "express";
import InventarioController from "../controllers/InventarioController.js";
import ValidateInventario from "../middlewares/validation/inventarioValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { verificarPermissao } from "../middlewares/PermissaoMiddleware.js";
import { ACAO, PERM } from "../models/Grupo.js";

const router = express.Router();

router.get("/inventarios", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    InventarioController.pesquisarInventario);

router.get("/inventarios/:id", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    InventarioController.listarInventarioID);

router.patch("/inventarios/:id", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    ValidateInventario.validateAlterar, InventarioController.atualizarInventario);

router.post("/inventarios", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    ValidateInventario.validateCriar, InventarioController.criarInventario);

router.delete("/inventarios/:id", AuthMiddleware,
    verificarPermissao(PERM.CAMPUS, ACAO.VER),
    ValidateInventario.validateDeletar, InventarioController.deletarInventario);

export default router;