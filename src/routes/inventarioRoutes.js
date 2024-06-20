import express from "express";
import InventarioController from "../controllers/InventarioController.js";
import ValidateInventario from "../services/validation/inventarioValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/inventarios", AuthMiddleware, InventarioController.pesquisarInventario);
router.get("/inventarios/:id", AuthMiddleware, InventarioController.listarInventarioID);
router.patch("/inventarios/:id", AuthMiddleware, ValidateInventario.validateAlterar, InventarioController.atualizarInventario);
router.post("/inventarios", AuthMiddleware, ValidateInventario.validateCriar, InventarioController.criarInventario);
router.delete("/inventarios/:id", AuthMiddleware, InventarioController.deletarInventario);

export default router;