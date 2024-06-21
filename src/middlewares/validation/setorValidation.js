import Campus from "../../models/Campus.js";
import Setor from "../../models/Setor.js";
import messages, { sendError } from "../../utils/mensagens.js";
import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateSetor {

    static async validateCriar(req, res, next) {
        // local e Status depois incluiremos campus
        const val = new Validator(req.body);

        await val.validate("campus", v.optional(), v.mongooseID(), v.exists({ model: Campus, query: { _id: req.body.campus } }));
        await val.validate("local", v.required(), v.trim(), v.length({ max: 256 }));
        await val.validate("status", v.optional(), v.toBoolean());

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
            v.toMongooseObj({ model: Setor, query: { _id: req.params.id } })
        );

        // Erro 404 quando id não existe
        if (val.anyErrors()) return sendError(res, 404, val.getErrors());

        const setor = val.getValue("id");

        val = new Validator(req.body);

        await val.validate("campus", v.optional(), v.mongooseID(), v.exists({ model: Campus, query: { _id: req.body.campus } }));
        await val.validate("local", v.optional(), v.trim(), v.length({ max: 256 }));
        await val.validate("status", v.optional(), v.toBoolean());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());
        req.body = val.getSanitizedBody();

        req.validateResult = {
            setor: setor
        };

        return next();
    }

    static async validateDeletar(req, res, next) {
        let val = new Validator(req.params);

        // Validar id
        await val.validate("id",
            v.required(),
            v.mongooseID(),
            v.toMongooseObj({ model: Setor, query: { _id: req.params.id } })
        );

        // Erro 404 quando id não existe
        if (val.anyErrors()) return sendError(res, 404, val.getErrors());

        return next();
    }
}

export default ValidateSetor;