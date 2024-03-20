import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

export default class AuthController{

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
                    ativo: userExist.ativo,
                    campus: userExist.campus
                },
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIREIN}
            ),
    
            user: {
                id: userExist._id,
                nome: userExist.nome,
                email: userExist.email,
                user: userExist.user,
                ativo: userExist.ativo,
                campus: userExist.campus
            }   
        });

    }

}