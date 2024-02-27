import messages from "../../utils/mensagens.js";
import Setor from "../models/Setor.js";
import validateID from "./validateId.js";

class ValidadeSetor {

    static async validateCriar(req, res, next) {
        try {
            const erros = {
                "error": "true",
                "code": "422",
                "data": null,
                "message": messages.httpCodes[422],
                "errors": []
            };

            const { local, status } = req.body;

            if (!local) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("local"));
            }

            if (!status) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("status"));
            } else if (!["Ativo", "Inativo"].includes(status)) {
                erros.errors.push(messages.validationGeneric.invalid("status"));
            }

            // remover todos os elementos undefined do array de erros
            erros.errors = erros.errors.filter((element) => element);

            //percorre o array de erros e verifica se todos os elementos são diferentes de null, undefined, 0, false, NaN, ""
            if (erros.errors.length > 0) {
                if (erros.errors.every((element) => element)) {
                    return res.status(422).json(erros);
                }
            }

            next();
        }
        catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: [] });
        }
    }
}

export default ValidadeSetor;