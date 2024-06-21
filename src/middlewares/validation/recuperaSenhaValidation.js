import messages from "../../utils/mensagens.js";
import enviaEmailErro from "../../utils/enviaEmailErro.js";
import senhaValidate from "../../utils/senhaValidate.js";
import jwt from "jsonwebtoken";
import Usuario from "../../models/Usuario.js";
import emailValidate from "../../utils/emailValidate.js";

export default class recuperaSenhaValidation {
    static async recuperaSenhaValidate(req, res, next) {
        try {
            const erros = [];

            const { email } = req.body;

            if (emailValidate(email)) {

                const findUser = await Usuario.findOne({ email });
    
                if (!findUser) {
                    return res.status(200).json({ data: [], error: false, code: 200, message: "Solicitação de alteração de senha enviada com sucesso!", errors: [] });
                } else {
    
                    if (!findUser.ativo) {
                        erros.push("Usuário inativo!");
                    }
                }
                
            } else {
                erros.push(messages.customValidation.invalidMail);
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

    static async alteraSenhaValidate(req, res, next) {
        try {
            const erros = [];

            const { token, email } = req.query;
            const { senha } = req.body;

            if (!token) {
                erros.push = ("O Token é obrigatório!");
            } else {
                try {
                    await jwt.verify(token, process.env.JWT_SECRET);
                } catch (err) {
                    //console.log(err.message)
                    return res.status(498).json({data: [], error: true, code: 498, message: messages.httpCodes[498], errors: ["Token inválido!"] });
                }
            }

            const findUser = await Usuario.findOne({ email: email }).select("+tokenRecuperaSenha");

            if (!findUser) {
                erros.push(messages.validationGeneric.mascCamp("Usuário"));
            } else {

                if (!findUser.ativo) {
                    return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: ["Usuário inativo!"] });
                }

                if (!findUser.tokenRecuperaSenha) {
                    return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: ["Recuperação de senha não solicitada ou já efetuada!"] });
                }
                if (token != findUser.tokenRecuperaSenha) {
                    return res.status(498).json({ data: [], error: true, code: 498, message: messages.httpCodes[422], errors: ["Token não corresponde com o enviado ao usuário!"] });
                }
            }

            if (!senha) {
                erros.push(messages.validationGeneric.fieldIsRequired("senha"));
            } else {
                await senhaValidate(senha, erros);
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
