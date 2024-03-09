import express from "express";
import SetorController from "../controllers/setorController.js";
import ValidadeSetor from "../services/validation/setorValidation.js";
//import setorValidation from "../services/validation/setorValidation.js";

const router = express.Router();

router.get("/setores", SetorController.pesquisarSetor);
router.get("/setores/:id", SetorController.listarSetorID);
router.post("/setores", ValidadeSetor.validateCriar, SetorController.criarSetor);
router.patch("/setores/:id", SetorController.atualizarSetor);
router.delete("/setores/:id", SetorController.deletarSetor);

export default router;
