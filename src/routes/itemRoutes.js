import express from "express";
import ItemController from "../controllers/ItemController.js";
import ValidateItem from "../services/validation/itemValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { GrupoMiddleware } from "../middlewares/GrupoMiddleware.js";

const router = express.Router();

router.get("/itens", AuthMiddleware, GrupoMiddleware("visualizar_itens"),  ItemController.pesquisarItem);
router.get("/itens/:id", AuthMiddleware, GrupoMiddleware("visualizar_itens"),  ItemController.listarItemID);
router.patch("/itens/:id", AuthMiddleware, GrupoMiddleware("alterar_itens"),  ValidateItem.validateAlterar, ItemController.atualizarItem);
router.post("/itens", AuthMiddleware, GrupoMiddleware("criar_itens"),  ValidateItem.validateCriar, ItemController.criarItem);
router.delete("/itens/:id", AuthMiddleware, GrupoMiddleware("deletar_itens"),  ItemController.deletarItem);

export default router;