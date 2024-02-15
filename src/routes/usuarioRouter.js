import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router()

router
    .post("/usuarios", AuthMiddleware, UsuarioController.CriarUsuario)
    .get("/usuarios", AuthMiddleware, UsuarioController.listarUsuario)
    .get("/usuarios/:id", AuthMiddleware, UsuarioController.listarUsuarioID)
    .delete("/usuarios/:id", AuthMiddleware, UsuarioController.deletarUsuario)

export default router