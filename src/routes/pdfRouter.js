import express from "express";
import PdfController from "../controllers/pdfController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/relatorio/itens", AuthMiddleware, PdfController.gerarPdf);

export default router;