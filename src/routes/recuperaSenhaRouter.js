import express from "express";
import RecuperaSenhaController from "../controllers/RecuperaSenhaController.js";

const router = express.Router()

router
    .post("/recuperarsenha", RecuperaSenhaController.recuperarSenha)

export default router