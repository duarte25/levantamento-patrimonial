import express from "express";
import ItemController from "../controllers/ItemController.js";

const router = express.Router();

router.get("/itens", ItemController.pesquisarItem);
router.get("/itens/:id", ItemController.listarItemID);
router.post("/itens", ItemController.criarItem);
router.delete("/itens/:id", ItemController.deletarItem);

export default router;