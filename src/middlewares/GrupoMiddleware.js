import Usuario from "../models/Usuario.js";
import messages from "../utils/mensagens.js";
import Grupo from "../models/GruposUsuarios.js";
import jwt from "jsonwebtoken";


export function GrupoMiddleware(regra) {
    return async (req, res, next) => {
        try {
            let token = req.headers.authorization;

            [, token] = token.split(" ");

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decoded.id;

            const findUser = await Usuario.findById(userid);
            const grupos = findUser.grupos;

            for (let grupo of grupos) {

                const findGrupo = await Grupo.findById(grupo);
                
                const regras = findGrupo.regras

                for(let categoria in regras){
                    const permissoes = regras[categoria]
                    if(permissoes.includes(regra)){
                        return next()
                    }
                }
            }

            return res.status(401).json({ data: [], error: true, code: 401, message: messages.httpCodes[401], errors: [messages.auth.invalidPermission] });

        } catch (err) {
            if (process.env.DEBUGLOG) console.log(err.message)

            return res.status(498).json({ data: [], error: true, code: 498, message: messages.httpCodes[498], errors: [messages.auth.invalidToken] });
        }
    };
}