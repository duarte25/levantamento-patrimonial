import Item from "../models/Item.js";
import PdfPrinter from "pdfmake";
import messages from "../utils/mensagens.js";

export default class PdfController {

    static async gerarPdf(req, res) {
        try {
            // Extrair parâmetros da consulta
            const {
                etiqueta,
                nao_etiquetado,
                encontrado,
                nome,
                estado,
                ativo,
                ocioso,
                inventario,
                setor,
                auditor,
                responsavel
            } = req.query;

            // Criar objeto de filtro com os parâmetros da consulta
            const filtro = {};
            if (etiqueta) filtro.etiqueta = etiqueta;
            if (nao_etiquetado) filtro.nao_etiquetado = nao_etiquetado;
            if (encontrado) filtro.encontrado = encontrado;
            if (nome) filtro.nome = new RegExp(nome, "i");
            if (estado) filtro.estado = estado;
            if (ativo) filtro.ativo = ativo;
            if (ocioso) filtro.ocioso = ocioso;
            if (inventario) filtro.inventario = inventario;
            if (setor) filtro.setor = setor;
            if (auditor) filtro.auditor = auditor;
            if (responsavel) filtro.responsavel = responsavel;

            // Buscar itens com base no objeto de filtro
            const itens = await Item.find(filtro)
                .populate('setor', 'local')
                .populate('auditor', 'nome')
                .populate('responsavel', 'nome')
                .lean();

            const fonts = {
                Roboto: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                }
            };
            const printer = new PdfPrinter(fonts);
            const body = [];
            for (let item of itens) {
                const rows = new Array();
                rows.push(item.etiqueta.toString());
                rows.push(item.responsavel.nome);
                rows.push(item.nome);
                rows.push(item.estado);
                rows.push(item.ocioso = item.ocioso ? 'Sim' : 'Não');
                rows.push(item.setor.local);
                rows.push(item.encontrado = item.encontrado ? 'Sim' : 'Não');
                rows.push(item.nao_etiquetado = item.nao_etiquetado ? 'Sim' : 'Não');
                body.push(rows);
            }




            const docDefinition = {
                footer: function (currentPage, pageCount) {
                    return (
                        currentPage.toString() + ' de ' + pageCount
                    )
                },
                content: [
                    {
                        columns: [
                            {
                                image: 'imagens/8eba5fa8-6fba-46ab-b5be-7c885e3eac8d.jpeg',
                                width: 60,
                                height: 40,

                            },
                            {
                                image: 'imagens/c4e16b16-b791-4f89-b037-1aafff8391f4.png',
                                width: 150,
                                height: 40,
                                margin: [20, 0, 0, 0]
                            }
                        ],
                        alignment: 'justify',
                        margin: [0, 0, 0, 20]
                    },
                    { text: 'Relatório de Inventario', style: 'header' },
                    { text: 'Relatório gerado em ' + new Date().toLocaleString(), style: 'R_data' },
                    { text: 'Auditoria feita por:  ', style: 'R_data' },
                    { text: 'Filtros aplicados:', style: 'subheader' },
                    {
                        stack: [
                            { text: etiqueta ? `Etiqueta: ${etiqueta}` : '' },
                            { text: responsavel ? `Responsável: ${responsavel}` : '' },
                            { text: nome ? `Nome: ${nome}` : '' },
                            { text: estado ? `Estado: ${estado}` : '' },
                            { text: ocioso ? `Ocioso: ${ocioso}` : '' },
                            { text: setor ? `Setor: ${setor}` : '' },
                            { text: encontrado ? `Encontrado: ${encontrado}` : '' },
                            { text: nao_etiquetado ? `Não Etiquetado: ${nao_etiquetado}` : '' }
                        ],

                        margin: [0, 0, 0, 20],
                    },
                    {
                        table: {
                            headerRows: 1,
                            body: [
                                [
                                    { text: 'Etiqueta', style: 'tableHeader' },
                                    { text: 'Responsavel', style: 'tableHeader' },
                                    { text: 'Nome', style: 'tableHeader' },
                                    { text: 'Estado', style: 'tableHeader' },
                                    { text: 'Ocioso', style: 'tableHeader' },
                                    { text: 'Setor', style: 'tableHeader' },
                                    { text: 'Encontrado', style: 'tableHeader' },
                                    { text: 'Não Etiquetado', style: 'tableHeader' }
                                ],
                                ...body
                            ]
                        }
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 10,
                        color: "white",
                        alignment: "center",
                        fillColor: "#2c3e50"
                    },
                    R_data: {
                        fontSize: 12,
                        italics: true,
                        alignment: "right"
                    },
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinition);
            // res.setHeader('Content-Disposition', 'attachment; filename="relatorio-itens.pdf"');
            // pdfDoc.pipe(res);
            const chunks = [];
            pdfDoc.on("data", (chunk) => {
                chunks.push(chunk);
            });
            pdfDoc.end();
            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks);
                res.end(result);
            });
        } catch (error) {
            // console.error("Erro ao gerar PDF:", error);
            res.status(500).send(messages.httpCodes[500]);
        }
    }


};