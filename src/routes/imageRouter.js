import ImagensControllers from "../controllers/imageController.js";
import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { createStorage, upload } from "../config/image_config.js";
import { GrupoMiddleware } from "../middlewares/GrupoMiddleware.js";

const router = express.Router();

router
    .post("/imagens", AuthMiddleware, GrupoMiddleware("criar_imagens"),  createStorage, upload.single("image"), ImagensControllers.enviarImagem)
    .get("/imagens", AuthMiddleware, GrupoMiddleware("visualizar_imagens"),  ImagensControllers.listarImagens)
    .delete("/imagens/:id", AuthMiddleware, GrupoMiddleware("deletar_imagens"),  ImagensControllers.deletarImagem)
    .get("/imagens/:id", AuthMiddleware, GrupoMiddleware("visualizar_imagens"),  ImagensControllers.mostrarImagem);

export default router;