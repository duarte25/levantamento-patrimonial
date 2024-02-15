import emailValidate from "../utils/emailValidate.js"
import bcript from "bcryptjs"
import messages from "../utils/mensagens.js"
import Usuario from "../models/Usuario.js"

export default class AuthValidate {

    static async loginValidate(req, res, next) {

        const erros = []
        
        const { email, senha } = req.body
        let userExist

        if (emailValidate(email)) {
            
            userExist = await Usuario.findOne({ email }).select('+senha')

            if (!userExist) {
                return res.status(400).json({ data: [], error: true, code: 400, message: messages.httpCodes[400], errors: messages.auth.authenticationFailed})
            }

            if (!(await bcript.compare(senha, userExist.senha))) {
                return res.status(400).json({ error: true, code: 400, message: "Usuário ou senha incorretos!" })
            }

            if (!userExist.ativo) {
                return res.status(400).json({ error: true, code: 400, message: "Usuário inativo!" })
            }

        } else {
            erros.push(messages.customValidation.invalidMail)
        }
       

        return  erros.length > 0 ? res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: erros }) : next();
    }
}