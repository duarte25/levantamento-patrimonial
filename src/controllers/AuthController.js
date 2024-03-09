import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export default class AuthController{

    static logarTeste = async (req, res) => {
        const { email, senha } = req.body;
        const userExist = await Usuario.findOne({ email }).select("+senha");
    
        if (!userExist || !await bcrypt.compare(senha, userExist.senha)) {
          return res.status(400).json([{ code: 400, message: "Usuário ou Senha inválida!" }]);
        }
    
        // se o usuário não estiver ativo
        if (userExist.ativo === false) {
          return res.status(400).json([{ code: 400, message: "Usuário inativo!" }]);
        }
    
        return res.status(200).json({
            Usuario: {
            id: userExist._id,
            nome: userExist.nome,
            email: userExist.email,
            ativo: userExist.ativo,
            rotas: userExist.rotas
          },
          token: jwt.sign(
            {
              id: userExist._id,
              nome: userExist.nome,
              email: userExist.email,
              ativo: userExist.ativo
            },
            process.env.SECRET,
            { expiresIn: process.env.EXPIREIN }
          )
        });
      };
    

    static async logar (req,res){

        const {email} = req.body;

        const userExist = await Usuario.findOne({ email });

        return res.status(200).json({
            
            token: jwt.sign(
                {   
                    id: userExist._id,
                    nome: userExist.nome,
                    email: userExist.email,
                    user: userExist.user,
                    ativo: userExist.ativo
                },
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIREIN}
            ),
    
            user: {
                id: userExist._id,
                nome: userExist.nome,
                email: userExist.email,
                user: userExist.user,
                ativo: userExist.ativo
            }   
        });

    }

}