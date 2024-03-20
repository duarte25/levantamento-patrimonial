import pdfConfig from '../config/pdf_config.js';
import { tabela } from "../services/relatorios/relatorioteste1.js";
import messages from "../utils/mensagens.js";
import { v4 as uuidv4 } from "uuid";

export default class PdfController {
    static async gerarPdf(req, res) {
        try {

            const htmlContent = tabela;
            const pdf = await pdfConfig({ htmlContent });
            console.log(tabela)

            const fileName = uuidv4();

            res.contentType('application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`); // Define o cabeçalho para fazer o download do PDF
            res.send(pdf);

        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            res.status(500).send(messages.httpCodes[500]);
        }
    }
}