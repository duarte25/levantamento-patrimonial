import express from "express";
import SetorController from "../controllers/setorController.js";
import ValidadeSetor from "../middlewares/validation/setorValidation.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
//import setorValidation from "../services/validation/setorValidation.js";

const router = express.Router();

router.get("/setores", AuthMiddleware, SetorController.pesquisarSetor);
router.get("/setores/:id", AuthMiddleware, SetorController.listarSetorID);
router.post("/setores", AuthMiddleware, ValidadeSetor.validateCriar, SetorController.criarSetor);
router.patch("/setores/:id", AuthMiddleware, ValidadeSetor.validateAlterar, SetorController.atualizarSetor);
router.delete("/setores/:id", AuthMiddleware, SetorController.deletarSetor);

export default router;
