import express from "express";
import ItemController from "../controllers/ItemController.js";
import ValidateItem from "../services/validation/itemValidation.js";

const router = express.Router();

router.get("/itens", ItemController.pesquisarItem);
router.get("/itens/:id", ItemController.listarItemID);
router.patch("/alterarItnens/:id", ValidateItem.validateAlterar, ItemController.atualizarItem);
router.post("/cadastrarItens", ValidateItem.validateCriar, ItemController.criarItem);
router.delete("/excluirItens/:id", ItemController.deletarItem);

export default router;