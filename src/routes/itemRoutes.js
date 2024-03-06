import express from "express";
import ItemController from "../controllers/ItemController.js";
import ValidateItem from "../services/validation/itemValidation.js";

const router = express.Router();

router.get("/buscarItens", ItemController.pesquisarItem);
router.get("/buscarItens/:id", ItemController.listarItemID);
router.post("/cadastrarItens", ValidateItem.validateCriar, ItemController.criarItem);
router.delete("/excluirItens/:id", ItemController.deletarItem);

export default router;