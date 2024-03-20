import Inventario from "../models/Inventario.js";
import messages, { sendError, sendResponse } from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";
import { jwtDecode } from "jwt-decode";
import { Validator, ValidationFuncs as v } from "../services/validation/validation.js";

export default class InventarioController {
    static async pesquisarInventario(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const token = req.headers.authorization;
            const tokenDecoded = jwtDecode(token);
            const campus = tokenDecoded.campus;

            const {
                responsavel,
                data_inicial_inicial: data_inicial_inicial,
                data_inicial_final: data_final_inicial,
                data_final_inicial: data_inicial_final,
                data_final_final: data_final_final,
            } = req.query;

            const filtros = { campus };
            let sort = { sigla: 1 };

            // const idSetor = await Setor.find({ campus }).select("_id");
            // const idsArray = idSetor.map(setor => setor._id);

            if (responsavel) filtros.responsavel = responsavel;

            if (data_inicial_inicial || data_final_inicial) {
                filtros.data_inicial_reserva = {};
                if (data_inicial_inicial) filtros.data_inicial_reserva.$gte = new Date(data_inicial_inicial);
                if (data_final_inicial) {
                    const dataFinal = new Date(data_final_inicial);
                    dataFinal.setDate(dataFinal.getDate() + 1); // Adiciona 1 dia para incluir a data final
                    filtros.data_inicial_reserva.$lte = dataFinal;
                }

                sort = { data_inicial_reserva: -1, _id: -1 }; // Se não é único precisa ter um segundo campo único para ordenar
            }

            if (data_inicial_final || data_final_final) {
                filtros.data_final_reserva = {};
                if (data_inicial_final) filtros.data_final_reserva.$gte = new Date(data_inicial_final);
                if (data_final_final) {
                    const dataFinal = new Date(data_final_final);
                    dataFinal.setDate(dataFinal.getDate() + 1); // Adiciona 1 dia para incluir a data final
                    filtros.data_final_reserva.$lte = dataFinal;
                }

                sort = { data_final_reserva: -1, _id: -1 }; // Se não é único precisa ter um segundo campo único para ordenar
            }

            const inventarios = await Inventario.paginate(
                { campus: { $elemMatch: { _id: campus } }, ...filtros },
                {
                    ...paginateOptions, ...{
                        sort: sort,
                        page: pagina,
                    }
                }
            );

            inventarios.code = 200;
            inventarios.error = false;
            inventarios.errors = [];

            res.status(200).json({ ...inventarios, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (error) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static async listarInventarioID(req, res) {
        try {
            let val = new Validator(req.params);
            await val.validate("id", v.required(), v.mongooseID());
            if (val.anyErrors()) return sendError(res, 400, val.getErrors());

            // DEFINIR OQ O MOBILE NECESSITA E SOMENTE PUXAR ISSO PLEASE
            const inventario = await Inventario.findById(req.params.id);

            if (!inventario) {
                return sendError(res, 404);
            }

            return sendResponse(res, 200, { data: inventario });
        } catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static async criarInventario(req, res) {
        try {
            const inventario = new Inventario(req.body);
            const savedInventario = await inventario.save();

            return sendResponse(res, 201, { data: savedInventario });
        } catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    }

    static atualizarInventario = async (req, res) => {
        try {
            const inventario = req.validateResult.inventario;

            // Só atualiza os campos que foram enviados
            for (let key in req.body) {
                inventario[key] = req.body[key];
            }

            await inventario.save();
            return sendResponse(res, 200, { data: inventario });
        }
        catch (err) {
            return sendError(res, 500, messages.httpCodes[500]);
        }
    };

    static async deletarInventario(req, res) {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findById(id);

            if (!inventario) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Inventario não encontrado!"] });
            }

            await Inventario.findByIdAndDelete(id);
            res.status(200).json({ data: inventario, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }

}