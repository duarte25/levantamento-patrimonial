import express from "express";
import InventarioController from "../controllers/InventarioController.js";
import ValidateItem from "../services/validation/itemValidation.js";

const router = express.Router();

router.get("/inventarios", InventarioController.pesquisarInventario);
router.get("/inventarios/:id", InventarioController.listarInventarioID);
router.post("/inventarios", InventarioController.criarInventario);
router.delete("/inventarios/:id", InventarioController.deletarInventario);

export default router;