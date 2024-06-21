import Grupo, { ACAO, GRUPO, PERM } from "../../models/Grupo.js";
import recriarGruposPadrao from "../../seeds/gruposSeed.js";


export const grupos = {};

/**
 * Classe de serviço para verificar permissões de grupos
 * 
 * Alterar um Grupo no banco exigirá reiniciar o app, pois irá ser mantido um cache disso
 * FAZER DEPOIS: SALVAR EM SISTEMA DE CACHE NO REDIS
 */
export default class GrupoService {
    /** Inicializa o cache de grupos para ser o mais rápido possível verificar
    as permissões de um usuário */
    static async inicializarGrupos() {
        let listaGrupos = await Grupo.find({});
        if(!(listaGrupos.length > 0)) {
            if(process.env.DEBUGLOG === "true") {
                console.log("Nenhum grupo no banco, recriando grupos padrão...");
            }

            await recriarGruposPadrao();
            
            listaGrupos = await Grupo.find({});
        }

        // Transforma a lista de grupos retornada do banco em um objeto para ficar mais fácil de verificar
        //grupos = {};
        for(let grupo of listaGrupos) {
            const permissoes = {
                _nivel: grupo.nivel,
                _oculto: grupo.oculto,
                _id: grupo._id
            };
            for(let permissao of grupo.permissoes) {
                let acoes = {};
                if(permissao.acoes && Array.isArray(permissao.acoes)) for(let acao of permissao.acoes) {
                    acoes[acao.nome] = acao;
                }
                permissoes[permissao.nome] = acoes;
            }
            grupos[grupo.nome] = permissoes;
        }

        //if(process.env.DEBUGLOG === "true")
        //{
            //console.log(grupos);
        //}
    }

    /** verifica se um usuário possui UMA permissão:ação em QUALQUER um dos grupos
     * 
     * @param {Array} usuarioGrupos - Array de nomes de grupos do usuário ex: req.decodedToken.grupos
     * @param {String} qualPermissao - Nome da permissão que deseja verificar
     * @param {String} qualAcao - Nome da ação que deseja verificar
     * @param {Object} modificadores - Objeto com os modificadores que deseja verificar
     * 
     * @example
     * // Verifica se pode ver usuário
     * GrupoService.possuiPermissao(req.decodedToken.grupos, PERM.USUARIO, ACAO.VER);
     * 
     * // Verifica se o usuário possui a permissão de editar qualquer usuário
     * GrupoService.possuiPermissao(req.decodedToken.grupos, PERM.USUARIO, ACAO.EDITAR, { qualquer_usuario: true });
    */
    static possuiPermissao(usuarioGrupos, qualPermissao, qualAcao = false, modificadores = false) {
        // Caso a variável de ambiente esteja definida
        // A autorização por permissões é desativada E TODO MUNDO PODE TUDO. 
        if(process.env.DISABLE_PERMISSION === "true") {
            return true;
        }

        // se não tem nenhum grupo é VISITANTE
        if(!usuarioGrupos || !(usuarioGrupos.length > 0)) {
            usuarioGrupos = [GRUPO.VISITANTE];
        }

        for(let nomeGrupo of usuarioGrupos) {
            let grupo = grupos[nomeGrupo];
            if(!grupo) {
                // Grupo não encontrado, continua para ver os outros grupos do usuario
                console.error("Problema ao verificar permissão, Usuário com grupo inválido: '"+nomeGrupo+"', ignorando...");
                continue;
            }

            // Obtêm as permissões deste grupo
            let permissao = grupo[qualPermissao];

            // Este grupo não possui esta permissão, mas outros podem ter, continua procurando
            if(!permissao) continue;

            // Quando não é especificado uma ação (colocando false em qualAcao) é porque só quer saber se possui a permissão
            // sem saber qual ação específica.
            if(!qualAcao) return true;

            // se possui a ação TUDO é porque pode tudo, inclusive esta ação seja qual ela for
            if(ACAO.TUDO in permissao) return true;

            // Verifica se possui esta ação, se não possuir, continua procurando
            let acao = permissao[qualAcao];
            if(!acao) continue;

            // Se não precisa checagem de modificadores, retorna verdadeiro já
            if(!modificadores) return true;

            // Chegou até aqui é porque precisa de modificadores, verifica se possui todos os necessários
            if(modificadores.qualquer_usuario && acao.qualquer_usuario !== true) continue;
            if(modificadores.qualquer_secretaria && acao.qualquer_secretaria !== true) continue;
            if(modificadores.qualquer_grupo && acao.qualquer_grupo !== true) continue;

            // Se passou por todos os modificadores, retorna verdadeiro
            return true;
        }

        // Se chegou aqui é porque nenhum grupo possui a permição:ação especificada, retorna falso
        return false;
    }

    // Utilizado ao atualizar grupos de um usuário
    static validarGrupos(opcoes = {}) {
        return async (value, val) => {
            if(!value || !Array.isArray(value)) return "O valor em grupos deve ser um array";
            if(value.length <= 0) return "É necessário especificar pelo menos um grupo";          

            for(let grupo of value) {
                if(!grupo || typeof grupo !== "string") {
                    return "Especificou um grupo com texto vazio ou inválido";
                }

                if(!grupos[grupo] || grupos[grupo]._oculto) {
                    return "O grupo "+grupo+" não existe";
                }
            }

            return true;
        };
    }

    // Utilizado ao atualizar grupos de um usuário
    static verificaPodeAtribuirGrupos(usuarioGrupos, gruposAtribuir) {
        if(!usuarioGrupos || !(usuarioGrupos.length > 0)) {
            usuarioGrupos = [GRUPO.VISITANTE];
        }

        if(!GrupoService.possuiPermissao(usuarioGrupos, PERM.GRUPO, ACAO.ATRIBUIR)) {
            return "Você não tem permissão para atribuir permissões de grupos a usuários.";
        }

        let podeAtribuirQualquer = GrupoService.possuiPermissao(usuarioGrupos, PERM.GRUPO, ACAO.ATRIBUIR, { qualquer_grupo: true });
        let usuarioMaiorNivel = 0;
        usuarioGrupos.forEach(g => {
            if(grupos[g]._nivel > usuarioMaiorNivel) {
                usuarioMaiorNivel = grupos[g]._nivel;
            }
        });

        for(let g of gruposAtribuir) {
            let grupo = grupos[g];

            if(!grupo || grupo._oculto) {
                return "Não é possível atribuir o grupo "+g+", pois não existe";
            }

            if(!podeAtribuirQualquer && grupo._nivel >= usuarioMaiorNivel) {
                return "Você não tem permissão para atribuir o grupo "+g+" a usuários.";
            }
        }

        return true;
    }

    // Usado ao retornar enums para aplicativo
    static obterListagemPermissoes() {
        const auth = [];
        for (const nomeGrupo of Object.keys(grupos)) {
            let grupo = grupos[nomeGrupo];
            if(grupo._oculto) continue;
            for (const nomePermissao of Object.keys(grupo)) {
                let permissao = grupo[nomePermissao];
                for (const nomeAcao of Object.keys(permissao)) {
                    auth.push(`${nomeGrupo}:${nomePermissao}:${nomeAcao}`);
                }
            }
        }
        return auth;
    }

    static possuiPermissaoQualquerUsuario(req, usuarioRecurso, qualPermissao, qualAcao = false) { 
        // Se é o mesmo usuário ou o recurso não possui usuário, retorna verdadeiro
        let mesmoUsuario = !usuarioRecurso || (usuarioRecurso._id ? usuarioRecurso._id : usuarioRecurso).toString() === req.decodedToken._id;
        // Se possui a permissão de ver qualquer usuário desta permissão/ação, retorna verdadeiro
        let podeQualquerUsuario = GrupoService.possuiPermissao(req.decodedToken.grupos, qualPermissao, qualAcao, { qualquer_usuario: true });

        return mesmoUsuario || podeQualquerUsuario;
    }

    
    static possuiPermissaoQualquerSecretaria(req, secretariaRecurso, qualPermissao, qualAcao = false) {
        // Se é a mesma secretaria ou o recurso não possui secretaria, retorna verdadeiro
        let mesmaSecretaria = !secretariaRecurso || (secretariaRecurso._id ? secretariaRecurso._id : secretariaRecurso).toString() === req.decodedToken.secretaria;
        // Se possui a permissão de ver qualquer secretaria desta permissão/ação, retorna verdadeiro
        let podeQualquerSecretaria = GrupoService.possuiPermissao(req.decodedToken.grupos, qualPermissao, qualAcao, { qualquer_secretaria: true });

        return mesmaSecretaria || podeQualquerSecretaria;
    }

    /**
        Retorna verdadeiro se o usuário possui a permissão

        ## Exemplo código antes
        
            let mesmaSecretaria = deslocamento.secretaria._id.toString() === req.decodedToken.secretaria;
            let verSecretaria = GrupoService.possuiPermissao(req.decodedToken.grupos, PERM.DESLOCAMENTO, ACAO.VER, { qualquer_secretaria: true });

            if (!mesmaSecretaria && !verSecretaria) {
                return sendError(res, 403, "Você não tem permissão para ver deslocamentos de outras secretarias.");
            }

            let mesmoUsuario = deslocamento.usuario?.toString() === req.decodedToken._id;
            let verDeslocamento = GrupoService.possuiPermissao(req.decodedToken.grupos, PERM.DESLOCAMENTO, ACAO.VER, { qualquer_usuario: true });

            if (!mesmoUsuario && !verDeslocamento) {
                return sendError(res, 403, "Você não tem permissão para ver esse deslocamento.");
            }
        
        ## Exemplo código depois

            let permissaoRecurso = GrupoService.possuiPermissaoRecurso(req, "deslocamento", deslocamento.secretaria, deslocamento.usuario, PERM.DESLOCAMENTO, ACAO.VER);
            if(permissaoRecurso !== true) {
                return sendError(res, 403, permissaoRecurso);
            }
     */
    static possuiPermissaoRecurso(req, nomeRecurso, usuarioRecurso, qualPermissao, qualAcao = false) {

        if(usuarioRecurso) {
            if (!GrupoService.possuiPermissaoQualquerUsuario(req, usuarioRecurso, qualPermissao, qualAcao)) {
                return `Você não tem permissão para manipular um ${nomeRecurso} que não é seu`;
            }
        }

        return true;
    }
}