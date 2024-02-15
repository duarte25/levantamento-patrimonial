import jwt from "jsonwebtoken"
import messages from "../utils/mensagens.js"

export const AuthMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if (!token) {
            res.status(498).json({data: [], error: true, code: 498, message: messages.httpCodes[498], errors: [messages.customValidation.invalidToken] })
        }

        [,token] = token.split(' ')
    
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded){
            req.user_id = decoded.id;
            next()
        }

    } catch(err) {
        //console.log(err.message)
        return res.status(498).json({data: [], error: true, code: 498, message: messages.httpCodes[498], errors: [messages.customValidation.invalidToken] })
    }
}