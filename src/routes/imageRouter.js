import express from "express";
import ImagemController from "../controllers/imageController.js";
import upload from "../config/multer.js";

const router = express.Router();

router
    .post("/uploads", upload.single("file"), ImagemController.uploadImage)
    .get("/images", ImagemController.findAllImage)
    .delete("/remover/:id", ImagemController.removeImage)

export default router;
