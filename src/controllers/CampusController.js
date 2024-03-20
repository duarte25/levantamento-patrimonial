import Campus from "../models/Campus.js";
import messages, { sendError, sendResponse } from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";
import { Validator, ValidationFuncs as v } from "../services/validation/validation.js";

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
        } catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static async listarCampusID(req, res) {
        try {
            let val = new Validator(req.params);
            await val.validate("id", v.required(), v.mongooseID());
            if (val.anyErrors()) return sendError(res, 400, val.getErrors());

            const campus = await Campus.findById(req.params.id);

            if (!campus) {
                return sendError(res, 404);
            }

            return sendResponse(res, 200, { data: campus });
        } catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static async criarCampus(req, res) {
        try {
            const { nome, cidade, ativo } = req.body;
            const campus = await Campus.create({ nome, cidade, ativo });

            return sendResponse(res, 201, { data: campus });
        } catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
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
            return sendError(res, 500, messages.httpCodes[500]);
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
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }
}