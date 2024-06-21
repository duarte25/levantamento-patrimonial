import Campus from "../models/Campus.js";
import messages, { sendError, sendResponse } from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";
import { Validator, ValidationFuncs as v } from "../middlewares/validation/validation.js";

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

        const campus = await Campus.create({ ...req.body });

        return sendResponse(res, 201, {
            data: campus
        });
    }

    static async atualizarCampus(req, res) {
        // Capturar do validador
        const { campus } = req.validateResult;

        for (let key in req.body) {
            campus[key] = req.body[key];
        }

        await campus.save();

        return sendResponse(res, 200, {
            data: campus
        });
    }

    static async deletarCampus(req, res) {

        const { id } = req.params;

        await Campus.deleteOne({ _id: id });
        return sendResponse(res, 200);
    }
}