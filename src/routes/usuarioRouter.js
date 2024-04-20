import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import UsuarioController from "../controllers/usuarioController.js";
import usuarioValidation from "../services/validation/usuarioValidation.js";
import { GrupoMiddleware } from "../middlewares/GrupoMiddleware.js";

const router = express.Router();

router
    .post("/usuarios", AuthMiddleware,GrupoMiddleware("criar_usuarios"), usuarioValidation.criarUsuarioValidate, UsuarioController.CriarUsuario)
    .get("/usuarios", AuthMiddleware, GrupoMiddleware("visualizar_usuarios"), UsuarioController.listarUsuario)
    .get("/usuarios/:id", AuthMiddleware, GrupoMiddleware("criar_usuarios"), UsuarioController.listarUsuarioID)
    .patch("/usuarios/:id", AuthMiddleware, GrupoMiddleware("criar_usuarios"), usuarioValidation.alterarUsuarioValidate, UsuarioController.alterarUsuario)
    .delete("/usuarios/:id", AuthMiddleware, GrupoMiddleware("criar_usuarios"), UsuarioController.deletarUsuario);

export default router;