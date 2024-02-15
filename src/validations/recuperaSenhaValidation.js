import messages from "../utils/mensagens.js";
import enviaEmailErro from "../utils/enviaEmailErro.js";

export default class recuperaSenhaValidation{

    static async alteraSenhaValidate(req, res, next){
        try {
            const erros = []
            
            const {token,email} = req.query
            const {senha} = req.body

            let tokendecoded = null

            if (!token) {
                erros.push = { error:true, code: 498, mensagem: "Token de autenticação não recebido na rota!" })
            }
            
            try{
                tokendecoded =jwt.verify(token, process.env.SECRET)
            }catch(err){
                return res.status(498).json({error:true, code: 498, mensagem: "Token inválido!" })
            }

            await usuario.findOne({ email: email }).select('+tokenRecuperaSenha').then(async (user) => {

                if(!user){
                    return res.status(404).json({ error: true, code: 404, mensagem: "Usuário não encontrado!" })
                }
                
                if(!user.tokenRecuperaSenha){
                    return res.status(422).json({error:true, code: 422, mensagem: "Recuperação de senha não solicitada ou já efetuada!"})
                }

                if(token != user.tokenRecuperaSenha){
                    return res.status(498).json({error:true, code: 498, mensagem: "Token não corresponde com o enviado ao usuário!" })
                }

                if(senha.length < 8){
                    return res.status(422).json({error:true, code: 422, mensagem: "Senha não pode ter menos de 8 caracteres!"})
                }

            return erros.length > 0 ? res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: erros }) : next();

        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req)
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