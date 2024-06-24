import messages, { sendError } from "../../utils/mensagens.js";
import Item, { ATIVO_ITEM, ESTADO_ITEM } from "../../models/Item.js";
import Inventario from "../../models/Inventario.js";
import Setor from "../../models/Setor.js";
import Usuario from "../../models/Usuario.js";
import { jwtDecode } from "jwt-decode";

import { Validator, ValidationFuncs as v } from "./validation.js";

class ValidateItem {

    static async validateCriar(req, res, next) {

        // Etiqueta, nao_etiquetado, encontrado, nome, estado, ativo, ocioso, descricao, inventario, setor, auditor, responsavel, imagem
        const val = new Validator(req.body);
        const auditor = req.decodedToken.id;

        // Isso e lá em inventario bora mudar para o status se status tiver finalizada não utilizamos
        // Para alterar isso o usuario devera somente se incluir a inventarios que são do campus dele
        // Já tenho em mente
        const inventario = await Inventario.distinct("_id", {
            $and: [
                { auditor: { $elemMatch: { _id: auditor } } },
                { data_fim: null }
            ]
        });

        val.body.inventario = inventario.toString();

        const etiqueta = req.body.etiqueta;

        const etiquetaUnica = await Item.find({ etiqueta, inventario });

        if (etiquetaUnica.length != 0) {
            return sendError(res, 422, messages.customValidation.itemCadastrado);
        }

        await val.validate("etiqueta", v.required(), v.toInt());
        await val.validate("nao_etiquetado", v.optional(), v.toBoolean());
        await val.validate("encontrado", v.optional(), v.toBoolean());
        await val.validate("nome", v.required());
        await val.validate("estado", v.optional(), v.enum({ values: Object.values(ESTADO_ITEM) }));
        await val.validate("ativo", v.optional(), v.enum({ values: Object.values(ATIVO_ITEM) }));
        await val.validate("ocioso", v.optional(), v.toBoolean());
        await val.validate("descricao", v.optional(), v.length({ max: 256 }));
        await val.validate("setor", v.required(), v.mongooseID(), v.exists({ model: Setor, query: { _id: req.body.setor } }));

        // Discutir sobre este responsavel, todos os responsaveis por itens no ifro serão cadastrado??
        await val.validate("responsavel", v.required(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.responsavel } }));

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());
        req.body = val.getSanitizedBody();

        return next();
    }

    // Crie uma rota PATCH para alterar amigo
    static async validateAlterar(req, res, next) {
        // Etiqueta, nao_etiquetado, encontrado, nome, estado, ativo, ocioso, descricao, inventario, setor, auditor, responsavel, imagem
        const val = new Validator(req.body);
        const token = req.headers.authorization;
        const tokenDecoded = jwtDecode(token);
        const auditor = tokenDecoded.id;

        val.body.auditor = auditor;

        const inventario = await Inventario.distinct("_id", {
            $and: [
                { auditor: { $elemMatch: { _id: auditor } } },
                { data_fim: { $exists: false } }
            ]
        });

        val.body.inventario = inventario.toString();

        const valuesEstado = ["Bem danificado", "Bem em condições de uso", "Bem inservível"];
        const valuesAtivo = ["Ativo", "Inativo", "Pendente"];

        await val.validate("etiqueta", v.optional(), v.toInt(), v.exists({ model: Item, query: { etiqueta: req.body.etiqueta } }));
        await val.validate("nao_etiquetado", v.optional(), v.toBoolean());
        await val.validate("encontrado", v.optional(), v.toBoolean());
        await val.validate("nome", v.optional());
        await val.validate("estado", v.optional(), v.enum(valuesEstado));
        await val.validate("ativo", v.optional(), v.enum(valuesAtivo));
        await val.validate("ocioso", v.optional(), v.toBoolean());
        await val.validate("descricao", v.optional(), v.length({ max: 256 }));
        await val.validate("inventario", v.optional(), v.mongooseID(), v.exists({ model: Inventario, query: { _id: req.body.inventario } }));
        await val.validate("setor", v.optional(), v.mongooseID(), v.exists({ model: Setor, query: { _id: req.body.setor } }));
        await val.validate("auditor", v.optional(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.auditor } }));
        await val.validate("responsavel", v.optional(), v.mongooseID(), v.exists({ model: Usuario, query: { _id: req.body.responsavel } }));

        if (val.anyErrors()) return sendError(res, 422, val.getErrors());

        return next();
    }
}

export default ValidateItem;
