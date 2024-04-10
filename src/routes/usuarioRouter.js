import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import UsuarioController from "../controllers/usuarioController.js";
import usuarioValidation from "../services/validation/usuarioValidation.js";
import { GrupoMiddleware } from "../middlewares/GrupoMiddleware.js";

const router = express.Router();

router
    .post("/usuarios", AuthMiddleware,GrupoMiddleware("criar_usuarioss"), usuarioValidation.criarUsuarioValidate, UsuarioController.CriarUsuario)
    .get("/usuarios", AuthMiddleware, UsuarioController.listarUsuario)
    .get("/usuarios/:id", AuthMiddleware, UsuarioController.listarUsuarioID)
    .patch("/usuarios/:id", AuthMiddleware, usuarioValidation.alterarUsuarioValidate, UsuarioController.alterarUsuario)
    .delete("/usuarios/:id", AuthMiddleware, UsuarioController.deletarUsuario);

export default router;