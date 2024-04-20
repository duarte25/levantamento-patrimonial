import express from "express";
import InventarioController from "../controllers/InventarioController.js";
import ValidateInventario from "../services/validation/inventarioValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { GrupoMiddleware } from "../middlewares/GrupoMiddleware.js";

const router = express.Router();

router.get("/inventarios", AuthMiddleware, GrupoMiddleware("visualizar_inventarios"),  InventarioController.pesquisarInventario);
router.get("/inventarios/:id", AuthMiddleware, GrupoMiddleware("visualizar_inventarios"),  InventarioController.listarInventarioID);
router.patch("/inventarios/:id", AuthMiddleware, GrupoMiddleware("alterar_inventarios"),  ValidateInventario.validateAlterar, InventarioController.atualizarInventario);
router.post("/inventarios", AuthMiddleware, GrupoMiddleware("criar_inventarios"),  ValidateInventario.validateCriar, InventarioController.criarInventario);
router.delete("/inventarios/:id", AuthMiddleware, GrupoMiddleware("deletar_inventarios"),  InventarioController.deletarInventario);

export default router;