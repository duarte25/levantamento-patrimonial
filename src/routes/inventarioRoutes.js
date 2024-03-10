import express from "express";
import InventarioController from "../controllers/InventarioController.js";
import ValidateInventario from "../services/validation/inventarioValidation.js";

const router = express.Router();

router.get("/inventarios", InventarioController.pesquisarInventario);
router.get("/inventarios/:id", InventarioController.listarInventarioID);
router.post("/inventarios", ValidateInventario.validateCriar, InventarioController.criarInventario);
router.delete("/inventarios/:id", InventarioController.deletarInventario);

export default router;