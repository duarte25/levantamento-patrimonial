import express from "express";
import RecuperaSenhaController from "../controllers/RecuperaSenhaController.js";
import recuperaSenhaValidation from "../middlewares/validation/recuperaSenhaValidation.js";

const router = express.Router();

router
    .post("/recuperarsenha", recuperaSenhaValidation.recuperaSenhaValidate, RecuperaSenhaController.recuperarSenha)
    .post("/alterarsenha", recuperaSenhaValidation.alteraSenhaValidate, RecuperaSenhaController.alteraSenha);

export default router;