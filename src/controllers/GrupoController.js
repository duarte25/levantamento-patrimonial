import Grupo, { ACAO, GRUPO, PERM } from "../models/Grupo.js";
import { sendError, sendResponse } from "../utils/mensagens.js";
import GrupoService, { grupos } from "../services/auth/GrupoService.js";
import { Validator, ValidationFuncs as v } from "../services/validation/validation.js";

export default class GrupoController {
    // Obtêm todos os grupos, permissões e suas ações
    static async getGrupos(req, res) {
        const listaGrupos = await Grupo.find({});

        return sendResponse(res, 200, { data: listaGrupos });
    }

    // Rota para verificar uma permissão, caso não queira implementar no front-end
    // Ou para testar a API e coisas assim
    static async verificarPermissao(req, res) {
        const usuarioGrupos = req.decodedToken?.grupos;

        const possiveisPermissoes = Object.values(PERM);
        const possiveisAcoes = Object.values(ACAO);

        const val = new Validator(req.body);
        await val.validate("permissao", v.required(), v.trim(), v.toUpperCase(), v.enum({ values: possiveisPermissoes }));
        await val.validate("acao", v.optional(), v.trim(), v.toUpperCase(), v.enum({ values: possiveisAcoes }));
        await val.validate("modificadores", v.optional(), v.isObject());

        if(val.isValid("modificadores") && val.getValue("modificadores") !== undefined) {
            await val.validate("modificadores.qualquer_usuario", v.optional(), v.toBoolean());
            await val.validate("modificadores.qualquer_secretaria", v.optional(), v.toBoolean());
            await val.validate("modificadores.qualquer_grupo", v.optional(), v.toBoolean());
        }

        if(val.anyErrors()) return sendError(res, 422, val.getErrors());

        const { permissao, acao, modificadores } = val.getSanitizedBody();
        
        //console.log(usuarioGrupos, permissao, acao, modificadores);
        if(GrupoService.possuiPermissao(usuarioGrupos, permissao, acao, modificadores)) {
            return sendResponse(res, 200, { data: {
                permitido: true
            }});
        } else {
            return sendResponse(res, 200, { data: {
                permitido: false
            }});
        }
    }

    // EXPERIMENAL
    // Middleware chamado antes de todas as rotas da API
    // Objetivo é que quando tiver usando Redis vai verificar se precisa atualizar as informações logo antes
    // de processar a requisição, e assim os métodos de verificar permissões não precisam de await
    static async carregarGrupos(req, res, next) {
        try {
            if(Object.keys(grupos).length === 0) {
                await GrupoService.inicializarGrupos();
            }

            return next();
        } catch(err) {
            console.error(err);
            return sendError(res, 500, [{ message: "Erro interno ao carregar grupos de permissões." }, { message: err.message || ""+err }]);
        }
    }
}
