import messages, { sendError } from "../../utils/mensagens.js";
import Inventario from "../../models/Inventario.js";
import Setor from "../../models/Setor.js";
import Usuario from "../../models/Usuario.js";

import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateInventario {

    static async validateCriar(req, res, next) {
        // Setores, responsavel, auditores, data_inicio, data_fim data fim apenas ao finalizar que seria editado
        const val = new Validator(req.body);

        await val.validate("setores", v.required());

        for (const setor of val.body.setores) {
            const valorID = setor._id;

            // CORRIGIDO O v.mongooseID = coloque o valor dessa forma que ele aparecera lá 1-1
            await val.validate("setores", v.mongooseID({ valorMongo: valorID }), v.exists({ model: Setor, query: { _id: setor } }));
        }

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
        const val = new Validator(req.body);

        await val.validate("setores", v.required());

        for (const setor of val.body.setores) {
            await val.validate("setores", v.mongooseID(), v.exists({ model: Setor, query: { _id: setor } }));
        }

        await val.validate("responsavel", v.optional(), v.mongooseID(), v.exists({ model: Usuario, query: { etiqueta: req.body.responsavel } }));
        await val.validate("auditores", v.optional());

        for (const auditor of val.body.auditores) {
            await val.validate("auditores", v.mongooseID(), v.exists({ model: Usuario, query: { _id: auditor } }));
        }

        await val.validate("data_inicio", v.optional(), v.toUTCDate());
        await val.validate("data_fim", v.optional(), v.toUTCDate());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }
}

export default ValidateInventario;
