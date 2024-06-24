import messages, { sendError } from "../../utils/mensagens.js";
import Inventario, { STATUS_INVENTARIO } from "../../models/Inventario.js";
import Campus from "../../models/Campus.js";
import Usuario from "../../models/Usuario.js";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateInventario {

    static async validateCriar(req, res, next) {
        // Setores, responsavel, auditores, data_inicio, data_fim data fim apenas ao finalizar que seria editado
        const val = new Validator(req.body);
        const tokenDecoded = req.decodedToken;
        const campus = tokenDecoded.campus;

        /*e Código faz uma consulta ao banco de dados Inventario para obter uma lista de valores distintos
         para o campo _id de documentos que pertencem a um determinado campus e onde o campo data_fim não está presente. */
        const inventario = await Inventario.distinct("_id", {
            $and: [
                { campus: campus },
                { data_fim: null }
            ]
        });

        console.log(inventario);
        if (inventario.length !== 0) {
            return sendError(res, 422, messages.customValidation.inventarioAndamento);
        }

        await val.validate("auditores", v.required());

        // Esses auditores devem pertencer a o mesmo campus? ou não importa??
        for (const auditor of val.body.auditores) {
            const valorID = auditor._id;

            await val.validate("auditores", v.mongooseID({ valorMongo: valorID }), v.exists({ model: Usuario, query: { _id: valorID } }));
        }

        const dataAtual = moment().format("YYYY-MM-DD");

        await val.validate("data_inicio", v.required(), v.toUTCDate(), v.min({ min: moment(dataAtual).toDate() }));
        await val.validate("data_fim", v.optional(), v.toUTCDate(), v.min({ min: moment(req.body.data_inicio).toDate() }));

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());
        req.body = val.getSanitizedBody();

        return next();
    }

    static async validateAlterar(req, res, next) {

        let val = new Validator(req.params);

        // Validar id
        await val.validate("id",
            v.required(),
            v.mongooseID(),
            v.toMongooseObj({ model: Inventario, query: { _id: req.params.id } })
        );

        // Erro 404 quando id não existe
        if (val.anyErrors()) return sendError(res, 404, val.getErrors());

        const inventario = val.getValue("id");

        // Se o inventario já estiver em finalizada 
        if (inventario.status === STATUS_INVENTARIO.FINALIZADA) {
            return sendError(res, 422, messages.customValidation.statusFinalizado);
        }

        val = new Validator(req.body);

        await val.validate("auditores", v.optional());

        if (req.body.auditores) {
            for (const auditor of val.body.auditores) {
                const valorID = auditor._id;

                await val.validate("auditores", v.mongooseID({ valorMongo: valorID }), v.exists({ model: Usuario, query: { _id: valorID } }));
            }
        }

        const dataAtual = moment().format("YYYY-MM-DD");

        await val.validate("data_inicio", v.optional(), v.toUTCDate(), v.min({ min: moment(dataAtual).toDate() }));

        if (req.body.status === STATUS_INVENTARIO.FINALIZADA) {
            await val.validate("data_fim", v.required(), v.toUTCDate(), v.min({ min: moment(req.body.data_inicio || inventario.data_inicio).toDate() }));
            await val.validate("status", v.required(), v.enum({ values: [STATUS_INVENTARIO.FINALIZADA] }));
        }

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        req.body = val.getSanitizedBody();
        req.validateResult = {
            inventario: inventario,
        };

        return next();
    }

    static async validateDeletar(req, res, next) {
        let val = new Validator(req.params);

        // Validar id
        await val.validate("id",
            v.required(),
            v.mongooseID(),
            v.toMongooseObj({ model: Inventario, query: { _id: req.params.id } })
        );

        // Erro 404 quando id não existe
        if (val.anyErrors()) return sendError(res, 404, val.getErrors());

        const inventario = val.getValue("id");

        req.body = val.getSanitizedBody();
        req.validateResult = {
            inventario: inventario,
        };

        return next();
    }
}

export default ValidateInventario;