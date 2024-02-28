import messages, { sendError } from "../../utils/mensagens.js";
import Item from "../../models/Item.js";
import Inventario from "../../models/Inventario.js";
import Setor from "../../models/Setor.js";
import Usuario from "../../models/Usuario.js";
import validateID from "./validateId.js";

import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidadeItem {

    static async validate(req, res, next) {
        const val = new Validator(req.body);

        await val.validate("etiqueta", v.required(), v.toInt(), v.unique({ model: Item, query: { item: req.body.item } }));

        const { estado } = req.body;

        // eslint-disable-next-line no-shadow
        const validarEstado = () => async (value, val) => {
            const estadosValidos = ["Bem danificado", "Bem em condições de uso", "Bem inservivel"];

            if (!estadosValidos.includes(estado)) {
                // return sendError(res, 422, messages.validationGeneric.invalid("estado"));
                return  messages.validationGeneric.invalid(val.path).message;
            }
            return true;
        };

        await val.validate("nome", v.required());

        await val.validate("estado", v.required(), validarEstado("estado"));

        // if (!["Bem danificado", "Bem em condições de uso", "Bem inservivel"].includes(estado)) {
        //     return sendError(res, 422, messages.validationGeneric.invalid("estado"));
        //     // erros.errors.push(messages.validationGeneric.invalid("estado"));
        // }

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }

    static async validateCriar(req, res, next) {
        try {
            const erros = {
                "error": "true",
                "code": "422",
                "data": null,
                "message": messages.httpCodes[422],
                "errors": []
            };

            const { etiqueta, nome, estado, ativo, inventario, setor, auditor, responsavel } = req.body;

            // Provavelmente API quebrara aqui por conta que o inventario é um ID e nem busquei se ele é valido
            const etiquetaExiste = await Item.find({
                inventario: inventario,
                etiqueta: etiqueta
            });

            if (!etiqueta) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("etiqueta"));
            } else if (etiquetaExiste[0]) {
                erros.errors.push(messages.validationGeneric.fieldIsRepeated("etiqueta"));
            }

            if (!nome) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("nome"));
            }

            if (!estado) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("estado"));
            } else if (!["Bem danificado", "Bem em condições de uso", "Bem inservivel"].includes(estado)) {
                erros.errors.push(messages.validationGeneric.invalid("estado"));
            }

            if (!ativo) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("ativo"));
            } else if (!["Ativo", "Inativo", "Pendente"].includes(ativo)) {
                erros.errors.push(messages.validationGeneric.invalid("ativo"));
            }

            // O ID tem que vim automatico??
            if (!inventario) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("inventario"));
            } else if (!validateID(inventario)) {
                erros.push("O ID informado ao veiculo deve estar em um formato válido (12 bytes)!");
            } else {
                const findInventario = await Inventario.findById(inventario);

                if (!findInventario) {
                    erros.errors.push(messages.error.resourceNotFound(inventario));
                }
            }

            if (!setor) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("setor"));
            } else if (!validateID(setor)) {
                erros.push("O ID informado ao veiculo deve estar em um formato válido (12 bytes)!");
            } else {
                const findSetor = await Setor.findById(setor);

                if (!findSetor) {
                    erros.errors.push(messages.error.resourceNotFound(setor));
                }
            }

            // Conferir se seria melhor criar uam função para puxar esse usuario e confirmar se ele existe
            if (!auditor) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("auditor"));
            } else if (!validateID(auditor)) {
                erros.push("O ID informado ao veiculo deve estar em um formato válido (12 bytes)!");
            } else {
                const findUsuario = await Usuario.findById(auditor);

                if (!findUsuario) {
                    erros.errors.push(messages.error.resourceNotFound(auditor));
                }
            }

            if (!responsavel) {
                erros.errors.push(messages.validationGeneric.fieldIsRequired("responsavel"));
            } else if (!validateID(responsavel)) {
                erros.push("O ID informado ao veiculo deve estar em um formato válido (12 bytes)!");
            } else {
                const findUsuario = await Usuario.findById(responsavel);

                if (!findUsuario) {
                    erros.errors.push(messages.error.resourceNotFound(responsavel));
                }
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

export default ValidadeItem;
