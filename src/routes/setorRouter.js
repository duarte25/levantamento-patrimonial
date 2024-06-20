import express from "express";
import SetorController from "../controllers/setorController.js";
import ValidadeSetor from "../services/validation/setorValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { GrupoMiddleware } from "../middlewares/GrupoMiddleware.js";
//import setorValidation from "../services/validation/setorValidation.js";

const router = express.Router();

router.get("/setores", AuthMiddleware, GrupoMiddleware("visualizar_setores"),  SetorController.pesquisarSetor);
router.get("/setores/:id", AuthMiddleware, GrupoMiddleware("visualizar_setores"), SetorController.listarSetorID);
router.post("/setores", AuthMiddleware, GrupoMiddleware("criar_setores"), ValidadeSetor.validateCriar, SetorController.criarSetor);
router.patch("/setores/:id", AuthMiddleware, GrupoMiddleware("alterar_setores"), ValidadeSetor.validateAlterar, SetorController.atualizarSetor);
router.delete("/setores/:id", AuthMiddleware, GrupoMiddleware("deletar_setores"), SetorController.deletarSetor);

export default router;
