import express from 'express';
import PdfController from '../controllers/pdfController.js';
import { GrupoMiddleware } from '../middlewares/GrupoMiddleware.js';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/relatorio/itens', AuthMiddleware, GrupoMiddleware("visualizar_setores"), PdfController.gerarPdf);

export default router;