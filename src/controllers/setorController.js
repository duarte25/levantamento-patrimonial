import Setor from "../models/Setor.js";
import messages from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";

export default class SetorController {
    static async pesquisarSetor(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;

            const {
                local,
                status
            } = req.query;

            const filtros = {};

            if (local) filtros.local = { $regex: new RegExp(local, "i") };
            if (status) filtros.status = status;

            const setores = await Setor.paginate(
                { ...filtros },
                {
                    ...paginateOptions, ...{
                        sort: { nome: 1 },
                        page: pagina,
                    },
                });

            setores.code = 200;
            setores.error = false;
            setores.errors = [];

            return res.status(200).json(setores);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static async listarSetorID(req, res) {
        try {
            const { id } = req.params;
            const setor = await Setor.findById(id);

            if (!setor) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Setor não encontrado!"] });
            }

            res.status(200).json({ data: setor, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }

    static async atualizarSetor(req, res) {
        try {
            const { id } = req.params;
            let setor = await Setor.findById(id);
            if (!setor) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Setor não encontrado!"] });
            }
            setor = await Setor.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({ data: setor, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        }
        catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    };

    static async criarSetor(req, res) {
        try {
            const setor = new Setor(req.body);
            const savedSetor = await setor.save();

            return res.status(201).json({
                data: savedSetor, error: false, code: 201, message: messages.httpCodes[201], errors: []
            });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }

    static async deletarSetor(req, res) {
        try {
            const { id } = req.params;
            const setor = await Setor.findById(id);

            if (!setor) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Setor não encontrado!"] });
            }
            
            await Setor.findByIdAndDelete(id);
            res.status(200).json({ data: setor, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }
}
