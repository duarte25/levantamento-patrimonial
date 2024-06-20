import GrupoService from "../services/auth/GrupoService.js";
import { sendError } from "../utils/mensagens.js";

export const verificarPermissao = (qualPermissao, qualAcao = false, modificadores = false) => async (req, res, next) => {
    try {
        let usuarioGrupos = req.decodedToken ? req.decodedToken.grupos : [];
        
        if(GrupoService.possuiPermissao(usuarioGrupos, qualPermissao, qualAcao, modificadores)) {
            return next();
        } else {
            // https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
            // I’m sorry. I know who you are–I believe who you say you are–but you just don’t have permission to access this resource. 
            // Maybe if you ask the system administrator nicely, you’ll get permission. 
            // But please don’t bother me again until your predicament changes.
            return sendError(res, 403, "Você não possui a permissão necessária");
        }
    } catch(err) {
        console.error(err);
        sendError(res, 500, "Erro ao verificar permissões");
    }
};
