import messages, { sendError } from "../../utils/mensagens.js";
import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidadeSetor {

    static async validateCriar(req, res, next) {
        // local e Status depois incluiremos campus
        const val = new Validator(req.body);

        await val.validate("local", v.required(), v.length({ max: 256 }));

        await val.validate("status", v.optional(), v.toBoolean());

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }
}

export default ValidadeSetor;