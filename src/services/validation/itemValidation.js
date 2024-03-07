import messages, { sendError } from "../../utils/mensagens.js";
import Item from "../../models/Item.js";
import Inventario from "../../models/Inventario.js";
import Setor from "../../models/Setor.js";
import Usuario from "../../models/Usuario.js";

import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidadeItem {

    static async validateCriar(req, res, next) {

        // Etiqueta, nao_etiquetado, encontrado, nome, estado, ativo, ocioso, descricao, inventario, setor, auditor, responsavel, imagem
        const val = new Validator(req.body);
        const valuesEstado = ["Bem danificado", "Bem em condições de uso", "Bem inservível"];
        const valuesAtivo = ["Ativo", "Inativo", "Pendente"];

        await val.validate("etiqueta", v.required(), v.toInt(), v.unique({ model: Item, query: { etiqueta: req.body.item } }));
        await val.validate("nao_etiquetado", v.optional(), v.toBoolean());
        await val.validate("encontrado", v.optional(), v.toBoolean());
        await val.validate("nome", v.required());
        await val.validate("estado", v.optional(), v.enum(valuesEstado));
        await val.validate("ativo", v.optional(), v.enum(valuesAtivo));
        await val.validate("ocioso", v.optional(), v.toBoolean());
        await val.validate("descricao", v.optional(), v.length({ max: 256 }));
        // PUXARA PELO TOKEN QUANDO ESTIVER LOGADO OU VER OUTRA FORMA PARA NÃO FICAR ESCOLHENDO TODA HORA
        await val.validate("inventario", v.required(), v.mongooseID(), v.exists({ model: Inventario, query: { _id: req.body.inventario } })); 
        await val.validate("setor", v.required(), v.mongooseID(), v.exists({ model: Setor, query: { _id: req.body.setor } }));
        // PUXARA TAMBÉM AUTOMATICAMENTE, ELE E RESPONSAVEL VAMOS VE COMO FAREMOS (ESTUDAR O CASO)
        await val.validate("auditor", v.required(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.auditor } }));
        await val.validate("responsavel", v.required(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.responsavel } }));

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }

    // Crie uma rota PATCH para alterar amigo
    static async validateAlterar(req, res, next) {

        // Etiqueta, nao_etiquetado, encontrado, nome, estado, ativo, ocioso, descricao, inventario, setor, auditor, responsavel, imagem
        const val = new Validator(req.body);
        const valuesEstado = ["Bem danificado", "Bem em condições de uso", "Bem inservível"];
        const valuesAtivo = ["Ativo", "Inativo", "Pendente"];

        await val.validate("etiqueta", v.optional(), v.toInt(), v.unique({ model: Item, query: { etiqueta: req.body.item } }));
        await val.validate("nao_etiquetado", v.optional(), v.toBoolean());
        await val.validate("encontrado", v.optional(), v.toBoolean());
        await val.validate("nome", v.optional());
        await val.validate("estado", v.optional(), v.enum(valuesEstado));
        await val.validate("ativo", v.optional(), v.enum(valuesAtivo));
        await val.validate("ocioso", v.optional(), v.toBoolean());
        await val.validate("descricao", v.optional(), v.length({ max: 256 }));
        // PUXARA PELO TOKEN QUANDO ESTIVER LOGADO OU VER OUTRA FORMA PARA NÃO FICAR ESCOLHENDO TODA HORA
        await val.validate("inventario", v.optional(), v.mongooseID(), v.exists({ model: Inventario, query: { _id: req.body.inventario } })); 
        await val.validate("setor", v.optional(), v.mongooseID(), v.exists({ model: Setor, query: { _id: req.body.setor } }));
        // PUXARA TAMBÉM AUTOMATICAMENTE, ELE E RESPONSAVEL VAMOS VE COMO FAREMOS (ESTUDAR O CASO)
        await val.validate("auditor", v.optional(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.auditor } }));
        await val.validate("responsavel", v.optional(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.responsavel } }));

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }


}

export default ValidadeItem;
