import express from "express";
import ItemController from "../controllers/ItemController.js";
import ValidateItem from "../services/validation/itemValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/itens", ItemController.pesquisarItem);
router.get("/itens/:id", AuthMiddleware, ItemController.listarItemID);
router.patch("/itens/:id", AuthMiddleware, ValidateItem.validateAlterar, ItemController.atualizarItem);
router.post("/itens", AuthMiddleware, ValidateItem.validateCriar, ItemController.criarItem);
router.delete("/itens/:id", AuthMiddleware, ItemController.deletarItem);

export default router;