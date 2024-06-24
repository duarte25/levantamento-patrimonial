import Setor from "../models/Setor.js";
import messages, { sendError, sendResponse } from "../utils/mensagens.js";
import { Validator, ValidationFuncs as v } from "../middlewares/validation/validation.js";
import { paginateOptions } from "./common.js";
import { ACAO, PERM } from "../models/Grupo.js";
import GrupoService from "../services/auth/GrupoService.js";

export default class SetorController {
    static async pesquisarSetor(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;

            const {
                local,
                status,
                campus
            } = req.query;

            const filtros = {};

            if (local) filtros.local = { $regex: new RegExp(local, "i") };
            if (status) filtros.status = status;
            if (campus) filtros.campus = campus;

            const setores = await Setor.paginate(
                { ...filtros },
                {
                    ...paginateOptions, ...{
                        sort: { local: 1 },
                        page: pagina,
                    },
                });

            return sendResponse(res, 200, setores);
        } catch (error) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static async listarSetorID(req, res) {
        try {
            let val = new Validator(req.params);
            await val.validate("id", v.required(), v.mongooseID());
            if (val.anyErrors()) return sendError(res, 400, val.getErrors());

            const setor = await Setor.findById(req.params.id);

            if (!setor) {
                return sendError(res, 404);
            }

            return sendResponse(res, 200, { data: setor });
        } catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static async criarSetor(req, res) {

        const campus = req.body.campus;

        let permissaoRecurso = GrupoService.possuiPermissaoRecurso(req, "reserva", campus, false, PERM.SETOR, ACAO.CRIAR);
        if (permissaoRecurso !== true) {
            return sendError(res, 403, "Você não tem permissão para criar um setor neste campus");
        }

        if (!req.body.campus) {
            req.body.campus = req.decodedToken.campus;
        }

        const setor = await Setor.create({ ...req.body });

        return sendResponse(res, 201, {
            data: setor
        });
    }

    static async atualizarSetor(req, res) {

        // Capturar do validador
        const { setor } = req.validateResult;

        for (let key in req.body) {
            setor[key] = req.body[key];
        }

        await setor.save();

        return sendResponse(res, 200, {
            data: setor
        });

    }

    static async deletarSetor(req, res) {

        const { id } = req.params;

        await Setor.deleteOne({ _id: id });
        return sendResponse(res, 200);
    }
}
