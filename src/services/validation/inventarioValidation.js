import messages, { sendError } from "../../utils/mensagens.js";
import Inventario from "../../models/Inventario.js";
import Setor from "../../models/Setor.js";
import Usuario from "../../models/Usuario.js";

import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateInventario {

    static async validateCriar(req, res, next) {
        // Setores, responsavel, auditores, data_inicio, data_fim data fim apenas ao finalizar que seria editado
        const val = new Validator(req.body);
        const valuesEstado = ["Bem danificado", "Bem em condições de uso", "Bem inservível"];
        const valuesAtivo = ["Ativo", "Inativo", "Pendente"];

        await val.validate("setores", v.required(), v.mongooseID());

        for (const setor of val.body.setores) {
            await val.validate("setores", v.exists({ model: Setor, query: { _id: setor } }));
        }

        await val.validate("responsavel", v.required(), v.mongooseID(), v.exists({ model: Usuario, query: { etiqueta: req.body.responsavel } }));
        await val.validate("auditores", v.required());

        for (const auditor of val.body.auditores) {
            await val.validate("auditores",  v.mongooseID(), v.exists({ model: Usuario, query: { _id: auditor } }));
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
        const valuesEstado = ["Bem danificado", "Bem em condições de uso", "Bem inservível"];
        const valuesAtivo = ["Ativo", "Inativo", "Pendente"];

        await val.validate("setores", v.required(), v.mongooseID());

        for (const setor of val.body.setores) {
            await val.validate("setores", v.exists({ model: Setor, query: { _id: setor } }));
        }

        await val.validate("responsavel", v.optional(), v.mongooseID(), v.exists({ model: Usuario, query: { etiqueta: req.body.responsavel } }));
        await val.validate("auditores", v.optional(), v.mongooseID());

        for (const auditor of val.body.auditores) {
            await val.validate("auditores", v.exists({ model: Usuario, query: { _id: auditor } }));
        }

        await val.validate("data_inicio", v.optional(), v.toUTCDate());
        await val.validate("data_fim", v.optional(), v.toUTCDate());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }
}

export default ValidateInventario;
