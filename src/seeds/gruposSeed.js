import Grupo, { ACAO, GRUPO, PERM } from "../models/Grupo.js";

const recriarGruposPadrao = async () => {
    await Grupo.deleteMany();

    // ---------------------------------------------------------------
    // grupos base
    // ---------------------------------------------------------------

    /* Todo usúario que efetuara a checagem dos itens devera ser do grupo USUARIO porem ele não tera acesso a outros atributos 
    como inventario, setor, usuario somente poderá ver esses campos!*/
    await Grupo.create({
        nome: GRUPO.USUARIO,
        nivel: 1,
        oculto: false,
        permissoes: [
            {
                nome: PERM.INVENTARIO,
                acoes: [{ nome: ACAO.VER }]
            },
            {
                nome: PERM.GRUPO,
                acoes: [{ nome: ACAO.VER }]
            },
            {
                nome: PERM.ITEM,
                acoes: [{ nome: ACAO.VER }, { nome: ACAO.CRIAR }, { nome: ACAO.EDITAR }, { nome: ACAO.DELETAR }]
            },
            {
                nome: PERM.SETOR,
                acoes: [{ nome: ACAO.VER }]
            },
            {
                nome: PERM.USUARIO,
                acoes: [{ nome: ACAO.VER }]
            }
        ]
    });

    /*GRUPO Secretaria, secretario apenas podera editar e criar em setor, inventario e usuario o campus ele fica imposibilitado e 
    nao terá permissão de acessar item somente ver */
    await Grupo.create({
        nome: GRUPO.SECRETARIO,
        nivel: 2,
        oculto: false,
        permissoes: [
            {
                nome: PERM.CAMPUS,
                acoes: [{ nome: ACAO.VER }]
            },
            {
                nome: PERM.INVENTARIO,
                acoes: [{ nome: ACAO.CRIAR }, { nome: ACAO.VER }, { nome: ACAO.EDITAR }, { nome: ACAO.DELETAR }]
            },
            {
                nome: PERM.ITEM,
                acoes: [{ nome: ACAO.VER }]
            },
            {
                nome: PERM.SETOR,
                acoes: [{ nome: ACAO.CRIAR }, { nome: ACAO.VER }, { nome: ACAO.EDITAR }, { nome: ACAO.DELETAR }]
            },
            {
                nome: PERM.USUARIO,
                acoes: [{ nome: ACAO.CRIAR }, { nome: ACAO.VER, qualquer_usuario: true }, { nome: ACAO.EDITAR, qualquer_usuario: true}, { nome: ACAO.DELETAR, qualquer_usuario: true }]
            }
        ]
    });

    /*Usuario do grupo administrador apenas poderá ver o item e ele tera acesso a qualquer usuario e a qualquer campus de tudo pois ele é o administrador então delimita tudo*/

    await Grupo.create({
        nome: GRUPO.ADMINISTRADOR,
        nivel: 3,
        oculto: false,
        permissoes: [
            {
                nome: PERM.CAMPUS,
                acoes: [{ nome: ACAO.CRIAR, qualquer_campus: true }, { nome: ACAO.VER, qualquer_campus: true }, { nome: ACAO.EDITAR, qualquer_campus: true }, { nome: ACAO.DELETAR, qualquer_campus: true }]
            },
            {
                nome: PERM.INVENTARIO,
                acoes: [{ nome: ACAO.VER, qualquer_campus: true }]
            },
            {
                nome: PERM.ITEM,
                acoes: [{ nome: ACAO.VER, qualquer_campus: true, qualquer_usuario: true }]
            },
            {
                nome: PERM.SETOR,
                acoes: [{ nome: ACAO.CRIAR, qualquer_campus: true }, { nome: ACAO.VER, qualquer_campus: true }, { nome: ACAO.EDITAR, qualquer_campus: true }, { nome: ACAO.DELETAR, qualquer_campus: true }]
            },
            {
                nome: PERM.USUARIO,
                acoes: [{ nome: ACAO.CRIAR, qualquer_campus: true }, { nome: ACAO.VER, qualquer_usuario: true, qualquer_campus: true }, { nome: ACAO.EDITAR, qualquer_usuario: true, qualquer_campus: true }, { nome: ACAO.DELETAR, qualquer_usuario: true, qualquer_campus: true }]
            }
        ]
    });

    console.log("Grupos padrão recriados");
};

export default recriarGruposPadrao;
