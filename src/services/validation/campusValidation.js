import { sendError } from "../../utils/mensagens.js";
import Campus from "../../models/Campus.js";
import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateCampus {
    
        static async validateCriar(req, res, next) {
    
            const val = new Validator(req.body);
    
            await val.validate("nome", v.required(),v.unique({ model: Campus, query: { nome: req.body.nome } }));
            await val.validate("cidade", v.required());
            await val.validate("ativo", v.optional(), v.toBoolean());
    
            if (val.anyErrors()) return sendError(res, 422, val.getErrors());
    
            return next();
        }
    
    }

export default ValidateCampus;
