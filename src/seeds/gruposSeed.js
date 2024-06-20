import Grupo, { ACAO, GRUPO, PERM } from "../models/Grupo.js";

const recriarGruposPadrao = async () => {
    await Grupo.deleteMany();

    // ---------------------------------------------------------------
    // grupos base
    // ---------------------------------------------------------------

    // Todo usuário logado deve ter este grupo
    await Grupo.create({
        nome: GRUPO.USUARIO,
        nivel: 1,
        oculto: false,
        permissoes: [
            {
                nome: PERM.CAMPUS,
                acoes: [{nome: ACAO.VER}]
            },
            {
                nome: PERM.INVENTARIO,
                acoes: [{nome: ACAO.VER}]
            },
            {
                nome: PERM.GRUPO,
                acoes: [{nome: ACAO.VER}]
            },
            {
                nome: PERM.ITEM,
                acoes: [{nome: ACAO.VER}, {nome: ACAO.CRIAR}, {nome: ACAO.EDITAR}]
            },
            {
                nome: PERM.SETOR,
                acoes: [{nome: ACAO.VER}]
            },
            {
                nome: PERM.USUARIO,
                acoes: [{nome: ACAO.VER}]
            }
        ]
    });

    await Grupo.create({
        nome: GRUPO.SECRETARIO,
        nivel: 2,
        oculto: false,
        permissoes: [
            {
                nome: PERM.CAMPUS,
                acoes: [{nome: ACAO.VER}]
            },
            {
                nome: PERM.INVENTARIO,
                acoes: [{nome: ACAO.CRIAR}, {nome: ACAO.VER, qualquer_campus: true}, {nome: ACAO.EDITAR}, {nome: ACAO.DELETAR}]
            },
            {
                nome: PERM.ITEM,
                acoes: [{nome: ACAO.CRIAR}, {nome: ACAO.VER}, {nome: ACAO.EDITAR}, {nome: ACAO.DELETAR}]
            },
            {
                nome: PERM.SETOR,
                acoes: [{nome: ACAO.CRIAR}, {nome: ACAO.VER}, {nome: ACAO.EDITAR}, {nome: ACAO.DELETAR}]
            },
            {
                nome: PERM.USUARIO,
                acoes: [{nome: ACAO.CRIAR}, {nome: ACAO.VER, qualquer_usuario: true}, {nome: ACAO.EDITAR}, {nome: ACAO.DELETAR}]
            }
        ]
    });

    await Grupo.create({
        nome: GRUPO.ADMINISTRADOR,
        nivel: 3,
        oculto: false,
        permissoes: [
            {
                nome: PERM.CAMPUS,
                acoes: [{nome: ACAO.CRIAR, qualquer_campus: true}, {nome: ACAO.VER, qualquer_campus: true}, {nome: ACAO.EDITAR, qualquer_campus: true}, {nome: ACAO.DELETAR, qualquer_campus: true}]
            },
            {
                nome: PERM.INVENTARIO,
                acoes: [{nome: ACAO.CRIAR, qualquer_campus: true}, {nome: ACAO.VER, qualquer_campus: true}, {nome: ACAO.EDITAR, qualquer_campus: true}, {nome: ACAO.DELETAR, qualquer_campus: true}]
            },
            {
                nome: PERM.ITEM,
                acoes: [{nome: ACAO.CRIAR}, {nome: ACAO.VER}, {nome: ACAO.EDITAR}, {nome: ACAO.DELETAR}]
            },
            {
                nome: PERM.SETOR,
                acoes: [{nome: ACAO.CRIAR}, {nome: ACAO.VER}, {nome: ACAO.EDITAR}, {nome: ACAO.DELETAR}]
            },
            {
                nome: PERM.USUARIO,
                acoes: [{nome: ACAO.CRIAR, qualquer_campus: true}, {nome: ACAO.VER, qualquer_usuario: true}, {nome: ACAO.EDITAR, qualquer_usuario: true}, {nome: ACAO.DELETAR, qualquer_usuario: true}]
            }
        ]
    });

    console.log("Grupos padrão recriados");
};

export default recriarGruposPadrao;
