import ImagensControllers from "../controllers/imageController.js";
import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { createStorage, upload } from "../config/image_config.js";

const router = express.Router();

router
    .post("/imagens", AuthMiddleware, createStorage, upload.single("image"), ImagensControllers.enviarImagem)
    .get("/imagens", ImagensControllers.listarImagens)
    .delete("/imagens/:id", ImagensControllers.deletarImagem)
    .get("/imagens/:id", ImagensControllers.mostrarImagem);

export default router;