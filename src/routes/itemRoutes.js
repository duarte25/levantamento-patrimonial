import express from "express";
import ItemController from "../controllers/ItemController.js";
import ValidateItem from "../services/validation/itemValidation.js";

const router = express.Router();

router.get("/itens", ItemController.pesquisarItem);
router.get("/itens/:id", ItemController.listarItemID);
router.patch("/itens/:id", ItemController.atualizarItem);
router.post("/itens", ValidateItem.validateCriar, ItemController.criarItem);
router.delete("/itens/:id", ItemController.deletarItem);

export default router;