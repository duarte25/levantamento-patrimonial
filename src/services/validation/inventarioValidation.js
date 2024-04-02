import messages, { sendError } from "../../utils/mensagens.js";
import Inventario from "../../models/Inventario.js";
import Setor from "../../models/Setor.js";
import Campus from "../../models/Campus.js";
import Usuario from "../../models/Usuario.js";
import { jwtDecode } from "jwt-decode";

import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateInventario {

    static async validateCriar(req, res, next) {
        // Setores, responsavel, auditores, data_inicio, data_fim data fim apenas ao finalizar que seria editado
        const val = new Validator(req.body);
        const token = req.headers.authorization;
        const tokenDecoded = jwtDecode(token);
        const campus = tokenDecoded.campus;

        // Inseri em val.body o id do usuario e o campus
        val.body.responsavel = tokenDecoded.id;
        val.body.campus = campus;

        const inventario = await Inventario.distinct("_id", {
            $and: [
                { campus: campus },
                { data_fim: { $exists: false } }
            ]
        });

        if (inventario != 0) {
            return sendError(res, 422, messages.customValidation.inventarioAndamento);
        }

        await val.validate("campus", v.required(), v.mongooseID(), v.exists({ model: Campus, query: { _id: req.body.campus } }));
        await val.validate("responsavel", v.required(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.responsavel } }));
        await val.validate("auditores", v.required());

        for (const auditor of val.body.auditores) {
            const valorID = auditor._id;

            await val.validate("auditores", v.mongooseID({ valorMongo: valorID }), v.exists({ model: Usuario, query: { _id: valorID } }));
        }

        await val.validate("data_inicio", v.required(), v.toUTCDate());
        await val.validate("data_fim", v.optional(), v.toUTCDate());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }

    // Crie uma rota PATCH para alterar amigo
    static async validateAlterar(req, res, next) {
        // Setores, responsavel, auditores, data_inicio, data_fim data fim apenas ao finalizar que seria editado
        // * INCLUIR NO CODIGO REGRA DE NEGOCIO PARA DATA QUE A DATA FINAL NUNCA PODERA SER MENOR QUE DATA INICIO
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
        val = new Validator(req.body);

        await val.validate("responsavel", v.optional(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.responsavel } }));
        await val.validate("auditores", v.optional());

        if (req.body.auditores) {
            for (const auditor of val.body.auditores) {
                const valorID = auditor._id;

                await val.validate("auditores", v.mongooseID({ valorMongo: valorID }), v.exists({ model: Usuario, query: { _id: valorID } }));
            }
        }

        await val.validate("data_inicio", v.optional(), v.toUTCDate());
        await val.validate("data_fim", v.optional(), v.toUTCDate());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        req.body = val.getSanitizedBody();
        req.validateResult = {
            inventario: inventario,
        };

        return next();
    }
}

export default ValidateInventario;
