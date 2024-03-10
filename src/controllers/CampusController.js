import Campus from "../models/Campus.js";
import messages from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";

export default class CampusController {
    static async pesquisarCampus(req, res) {
        try {
         const pagina = parseInt(req.query.pagina) || 1;
            const { nome, cidade, ativo } = req.query;
            const filtros = {};
            if (nome) filtros.nome = { $regex: new RegExp(nome, "i") };
            if (cidade) filtros.cidade = cidade;
            if (ativo) filtros.ativo = ativo;
            
            const campus = await Campus.paginate(
                { ...filtros },
                {
                    ...paginateOptions, ...{
                        sort: { nome: 1 },
                        page: pagina,
                    },
                });

            campus.code = 200;
            campus.error = false;
            campus.errors = [];

            res.status(200).json({ ...campus, error: false, code: 200, message: messages.httpCodes[200], errors: [] });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static async listarCampusID(req, res) {
        try {
            const { id } = req.params;
            const campus = await Campus.findById(id);

            if (!campus) {
                return res.status(404).json({ error: true, code: 404, message: "Campus não encontrado" });
            }

            return res.status(200).json({ error: false, code: 200, message: messages.httpCodes[200], campus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static async criarCampus(req, res) {
        try {
            const { nome, cidade, ativo } = req.body;
            const campus = await Campus.create({ nome, cidade, ativo });

            return res.status(201).json({ error: false, code: 201, message: messages.httpCodes[201], campus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static async atualizarCampus(req, res) {
        try {
            const { id } = req.params;
            const { nome, cidade, ativo } = req.body;
            const campus = await Campus.findByIdAndUpdate(id, { nome, cidade, ativo }, { new: true });

            if (!campus) {
                return res.status(404).json({ error: true, code: 404, message: "Campus não encontrado" });
            }

            return res.status(200).json({ error: false, code: 200, message: messages.httpCodes[200], campus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static async deletarCampus(req, res) {
        try {
            const { id } = req.params;
            const campus = await Campus.findByIdAndDelete(id);

            if (!campus) {
                return res.status(404).json({ error: true, code: 404, message: "Campus não encontrado" });
            }

            return res.status(200).json({ error: false, code: 200, message: messages.httpCodes[200] });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }
}