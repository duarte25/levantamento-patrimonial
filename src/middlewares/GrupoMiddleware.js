import Usuario from "../models/Usuario.js";
import messages from "../utils/mensagens.js";
import jwt  from "jsonwebtoken";


export function GrupoMiddleware(regras) {
    return async (req, res, next) => {
        try {
            let token = req.headers.authorization;

            [, token] = token.split(" ");

            const decoded = await jwt.verify(token, process.env.JWT_SECRET);

            const userid = decoded.id

            const usuario = Usuario.aggregate([  { $match: { _id: userid } },{ $project: {grupos} }])

            console.log(userid)

            console.log(usuario.nome)

            return res.status(498).json({ data: ["oito"], error: true, code: 498, message: messages.httpCodes[498], errors: [messages.auth.invalidToken] });
            next();

        } catch (err) {
            console.log(err.message)
            return res.status(498).json({ data: [], error: true, code: 498, message: messages.httpCodes[498], errors: [messages.auth.invalidToken] });
        }
    }
}