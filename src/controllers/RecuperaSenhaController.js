import Usuario from "../models/Usuario.js";
import enviaemail from "../utils/enviaEmail.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import enviaEmailErro from "../utils/enviaEmailErro.js";
import messages from "../utils/mensagens.js";

export default class RecuperaSenhaController {

    static async recuperarSenha(req, res) {
        try {

            const { email } = req.body;

            const findUser = await Usuario.findOne({ email: email });

            const token = jwt.sign({ id: findUser._id, email: findUser.email, nome: findUser.nome }, process.env.JWT_SECRET, {
                expiresIn: process.env.EXPIREINRECUPERASENHA
            });

            if (!token) {
                return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Erro ao gerar o token de recuperação de senha!"] });
            }

            await Usuario.findByIdAndUpdate(findUser._id, {
                $set: { tokenRecuperaSenha: token }
            });

            let info = ({
                // eslint-disable-next-line quotes
                from: "\"Levantamento Patrimonial: Alteração de Senha \"" + ' <' + (process.env.API_SEND_EMAIL) + '>',
                to: findUser.email,
                subject: "Solicitação de recuperação de senha - Solicitação #" + crypto.randomBytes(6).toString("hex"),
                html: "Olá " + findUser.nome + ", você solicitou a recuperação de senha! <br> <a href='" + (process.env.FRONT_URL + "alterarsenha?token=" + token + "&email=" + findUser.email) + "'>Clique aqui para alterar sua senha!</a>",
            });

            await enviaemail(info).then(() => {
                return res.status(200).json({ data: [], error: false, code: 200, message: "Solicitação de alteração de senha enviada com sucesso!", errors: [] });
            });

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

    static async alteraSenha(req, res) {
        try {
            const { email } = req.query;
            const { senha } = req.body;

            await Usuario.findOneAndUpdate({ email: email }, {
                senha: bcrypt.hashSync(senha, 10),
                tokenRecuperaSenha: null
            });

            res.status(200).json({
                data: [],
                error: true,
                code: 200,
                message: "Senha atualizada com sucesso!",
                errors: []
            });

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
