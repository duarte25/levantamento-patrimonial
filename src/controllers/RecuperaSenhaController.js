import Usuario from "../models/Usuario.js"
import enviaemail from "../utils/enviaEmail.js";
import crypto from 'crypto';
import jwt from "jsonwebtoken";

export default class RecuperaSenhaController {

    static async recuperarSenha(req, res) {

        const { email } = req.body

        const findUser = await Usuario.findOne({ email: email })

        const token = jwt.sign({ id: findUser._id, email: findUser.email, nome: findUser.nome }, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIREINRECUPERASENHA
        })

        if (!token) {
            return res.status(500).json({ error: true, code: 500, mensagem: "Erro ao gerar o token de recuperação de senha!" })
        }

        await Usuario.findByIdAndUpdate(findUser._id, {
            $set: { tokenRecuperaSenha: token }
        })

        let info = ({
            from: '"Levantamento Patrimonial: Alteração de Senha "' + ' <' + (process.env.API_SEND_EMAIL) + '>',
            to: findUser.email,
            subject: "Solicitação de recuperação de senha - Solicitação #" + await crypto.randomBytes(6).toString('hex'),
            //text: "Click no link abaixo para alterar sua senha!",
            html: "Olá " + findUser.nome + ", você solicitou a recuperação de senha! <br> <a href='" + (process.env.FRONT_URL + "alterarsenha?token=" + token + "&email=" + findUser.nome) + "'>Clique aqui para alterar sua senha!</a>",
        })

        await enviaemail(info).then(() => {
            return res.status(201).json({ error: false, code: 201, dados: { mensagem: "Se Email Pertencer a uma conta Solicitação de alteração de senha enviada com sucesso!" } })
        })


    }

    static async alteraSenha(req, res) {

        const {token,email} = req.query
            const {senha} = req.body

            let tokendecoded = null

            if (!token) {
                return res.status(498).json({ error:true, code: 498, mensagem: "Token de autenticação não recebido na rota!" })
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

                await this.controllers.atualizar(user._id, {
                    senha: senha,
                    tokenRecuperaSenha: null
                }).then(()=>{
                    return res.status(201).json({error:false, code: 201, mensagem: "Senha alterada com sucesso!" })
                })
            })


    }
}