import express from "express";
import ImagemController from "../controllers/ImageController.js";
import upload from "../config/multer.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .post("/images/uploads", AuthMiddleware, upload.single("file"), ImagemController.uploadImage)
    .get("/images", ImagemController.findAllImage)
    .delete("/images/remover/:id", ImagemController.removeImage)

export default router;
