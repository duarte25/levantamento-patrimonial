import { sendError } from "../../utils/mensagens.js";
import Campus from "../../models/Campus.js";
import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateCampus {

    static async validateCriar(req, res, next) {

        const val = new Validator(req.body);

        await val.validate("nome", v.required(), v.trim(), v.unique({ model: Campus, query: { nome: req.body.nome } }));
        await val.validate("cidade", v.required(), v.trim());
        await val.validate("ativo", v.optional(), v.toBoolean());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        req.body = val.getSanitizedBody();

        return next();
    }

    static async validateAtualizar(req, res, next) {

        let val = new Validator(req.params);

        // Validar id
        await val.validate("id",
            v.required(),
            v.mongooseID(),
            v.toMongooseObj({ model: Campus, query: { _id: req.params.id } })
        );

        // Erro 404 quando id não existe
        if (val.anyErrors()) return sendError(res, 404, val.getErrors());

        const campus = val.getValue("id");

        val = new Validator(req.body);

        await val.validate("nome", v.optional(), v.trim(), v.length({ max: 50 }), v.unique({ model: Campus, query: { nome: req.body.nome } }));
        await val.validate("cidade", v.optional(), v.trim(), v.length({ max: 50 }));
        await val.validate("ativo", v.optional(), v.toBoolean());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());
        req.body = val.getSanitizedBody();

        req.validateResult = {
            campus: campus
        };

        return next();
    }

    static async validateDeletar(req, res, next) {
        let val = new Validator(req.params);

        // Validar id
        await val.validate("id",
            v.required(),
            v.mongooseID(),
            v.toMongooseObj({ model: Campus, query: { _id: req.params.id } })
        );

        // Erro 404 quando id não existe
        if (val.anyErrors()) return sendError(res, 404, val.getErrors());

        return next();
    }
}

export default ValidateCampus;
