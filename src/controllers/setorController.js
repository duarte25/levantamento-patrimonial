import Setor from "../models/Setor.js";
import messages, { sendError, sendResponse } from "../utils/mensagens.js";
import { Validator, ValidationFuncs as v } from "../services/validation/validation.js";
import { paginateOptions } from "./common.js";
import Campus from "../models/Campus.js";

export default class SetorController {
    static async criarSetor(req, res) {
        try {
            const {local, campus } = req.body;
      
            const setor = new Setor({ local, campus});
            const savedSetor = await setor.save();

            return sendResponse(res, 201, { data: savedSetor });
        } catch (err) {
          console.log(err);
            return sendError(res, 500, messages.httpCodes[500]);
        }

    }

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

            return sendResponse(res, 200, setores );
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

    static async atualizarSetor(req, res) {
        try {
            const { id } = req.params;
            const { local, status } = req.body;
            const setor = await Setor.findByIdAndUpdate(id, { local, status}, { new: true });


            if (!setor) {
              return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
            }

            return sendResponse(res, 200, { data: setor });
        }
        catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static async deletarSetor(req, res) {
        try {
            const { id } = req.params;
            const setor = await Setor.findByIdAndDelete(id);

            if (!setor) {
                return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
            }

            return sendResponse(res, 200, { data: setor });
        } catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }
}
