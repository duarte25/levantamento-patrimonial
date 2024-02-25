import messages from "../../utils/mensagens.js";
import Usuario from "../../models/Usuario.js";
import emailValidate from "../../utils/emailValidate.js";
import cpfValidate from "cpf-cnpj-validator";
import senhaValidate from "../../utils/senhaValidate.js";
import enviaEmailErro from "../../utils/enviaEmailErro.js";
import idValidate from "../../utils/idValidate.js";
export default class usuarioValidation {

    static async criarUsuarioValidate(req, res, next) {
        try {
            const erros = [];
            const { nome, email, senha, cpf } = req.body;

            if (!nome) {
                erros.push(messages.validationGeneric.fieldIsRequired("nome"));
            } else {

                if (nome.length < 3) {
                    erros.push("O Campo nome deve ter no mínimo 3 caracteres!");
                }
                if (nome.length > 200) {
                    erros.push("O Campo nome deve ter no máximo 200 caracteres!");
                }
            }

            if (!cpf) {
                erros.push(messages.validationGeneric.fieldIsRequired("CPF"));
            } else if (!cpfValidate.cpf.isValid(cpf)) {
                erros.push(messages.validationGeneric.invalid("CPF"));
            } else {
                const findUser = await Usuario.findOne({ cpf });

                if (findUser) {
                    erros.push(messages.validationGeneric.fieldIsRepeated("CPF"));
                }
            }

            if (!email) {
                erros.push(messages.validationGeneric.fieldIsRequired("e-mail"));
            } else if (!emailValidate(email)) {
                erros.push(messages.validationGeneric.invalid("e-mail"));
            } else {
                const findUser = await Usuario.findOne({ email });

                if (findUser) {
                    erros.push(messages.validationGeneric.fieldIsRepeated("e-mail"));
                }
            }

            if (!senha) {
                erros.push(messages.validationGeneric.fieldIsRequired("senha"));
            } else {
                senhaValidate(senha, erros);
            }

            return erros.length > 0 ? res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: erros }) : next();

        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req);
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }
    }

    static async alterarUsuarioValidate(req, res, next) {
        try {
            const erros = [];

            const { nome, email, senha, cpf } = req.body;
            const { id } = req.params;

            if (!idValidate(id)) {
                return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: [messages.error.invalidID] });
            }

            const findUser = await Usuario.findById(id);

            if (!findUser) {
                return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: [messages.validationGeneric.mascCamp("Usuário")] });
            }

            if (nome) {

                if (nome.length < 3) {
                    erros.push("O Campo nome deve ter no mínimo 3 caracteres!");
                }
                if (nome.length > 200) {
                    erros.push("O Campo nome deve ter no máximo 200 caracteres!");
                }
            }

            if (cpf) {
                if (findUser.cpf !== cpf) {
                    if (!cpfValidate.cpf.isValid(cpf)) {
                        erros.push(messages.validationGeneric.invalid("CPF"));
                    } else {
                        // eslint-disable-next-line no-shadow
                        const findUser = await Usuario.findOne({ cpf });

                        if (findUser) {
                            erros.push(messages.validationGeneric.fieldIsRepeated("CPF"));
                        }
                    }
                }
            }

            if (email) {
                if (findUser.email !== email) {
                    if (!emailValidate(email)) {
                        erros.push(messages.validationGeneric.invalid("e-mail"));
                    } else {
                        // eslint-disable-next-line no-shadow
                        const findUser = await Usuario.findOne({ email });

                        if (findUser) {
                            erros.push(messages.validationGeneric.fieldIsRepeated("e-mail"));
                        }
                    }
                }
            }


            if (senha) {
                senhaValidate(senha, erros);
            }

            return erros.length > 0 ? res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: erros }) : next();

        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req);
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }
    }
}