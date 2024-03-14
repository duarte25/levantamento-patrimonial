import Item from "../models/Item.js";
import messages from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";

export default class ItemController {
    static async pesquisarItem(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;

            // Atributos esperados na requisição, validação foi feita no middleware antes de chegar aqui
            const {
                etiqueta,
                nao_tiquetado,
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

            const filtros = {};

            if (etiqueta) filtros.etiqueta = etiqueta;
            if (nao_tiquetado) filtros.nao_tiquetado = nao_tiquetado;
            if (encontrado) filtros.encontrado = encontrado;
            if (nome) filtros.nome = { $regex: new RegExp(nome, "i") };
            if (estado) filtros.estado = estado;
            if (ativo) filtros.ativo = ativo;
            if (ocioso) filtros.ocioso = ocioso;
            if (inventario) filtros.inventario = inventario;
            if (setor) filtros.setor = setor;
            if (auditor) filtros.auditor = auditor;
            if (responsavel) filtros.responsavel = responsavel;

            const itens = await Item.paginate(
                { ...filtros },
                {
                    ...paginateOptions, ...{
                        sort: { sigla: 1 },
                        page: pagina,
                    },
                });

            itens.code = 200;
            itens.error = false;
            itens.errors = [];

            res.status(200).json({ ...itens, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static async listarItemID(req, res) {
        try {
            const { id } = req.params;
            const item = await Item.findById(id);

            if (!item) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Item não encontrada!"] });
            }

            res.status(200).json({ item, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }

    static atualizarItem = async (req, res) => {
        try {
            const { id } = req.params;
            let item = await Item.findById(id);
            if (!item) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Item não encontrado!"] });
            }
            item = await Item.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({ data: [], error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        }
        catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    };

    static async criarItem(req, res) {
        try {
            const item = new Item(req.body);
            const savedItem = await item.save();

            // Corrigir ****
            // O campos inventario tem que vim automaticamente ao ser definido pelo responsavel?
            return res.status(201).json({
                data: savedItem, error: false, code: 201, message: messages.httpCodes[201], errors: []
            });
        } catch (err) {
            console.log("erro", err);
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }

    static async deletarItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Item.findById(id);

            if (!item) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Item não encontrado!"] });
            }
            
            await Item.findByIdAndDelete(id);
            res.status(200).json({ data: item, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }
}