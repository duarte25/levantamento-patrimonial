import idValidate from "../utils/idValidate.js";
import Usuario from "../models/Usuario.js";
import messages from "../utils/mensagens.js";
import paginateOptions from "../utils/paginateOptions.js";
import bcrypt from "bcryptjs";
import enviaEmailErro from "../utils/enviaEmailErro.js";

export default class UsuarioController {

    static async CriarUsuario(req, res) {
        try {

            const dados = { ...req.body, senha: await bcrypt.hashSync(req.body.senha, 10) };

            const usuario = new Usuario(dados);

            const saveUser = await usuario.save();
            saveUser.senha = undefined;

            return res.status(201).json({
                data: saveUser,
                error: false,
                code: 201,
                message: messages.httpCodes[201],
                errors: []
            });

        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req);
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }

    }

    static async listarUsuario(req, res) {
        try {

            const pagina = parseInt(req.query.pagina);
            const {limite} = parseInt(req.query.limite);

            const { cpf } = req.query;

            const filtros = {};

            if (cpf) filtros.cpf = cpf;

            const findUser = await Usuario.paginate(filtros, {
                ...paginateOptions, ...{
                    sort: { nome: 1 },
                    page: pagina || 1,
                    limit: limite || 10
                }
            });

            if (pagina > findUser.totalPaginas) {
                let link = `/usuarios?pagina=${findUser.totalPaginas}`;
                if(limite) link += `&limite=${limite}`;
                if(cpf) link += `&cpf=${cpf}`;

                return res.redirect(link);
            }

            return res.status(200).json({
                ...findUser,
                error: false,
                code: 200,
                message: messages.httpCodes[200],
                errors: []
            });


        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req);
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }
    }

    static async listarUsuarioID(req, res) {
        try {

            const { id } = req.params;

            if (!idValidate(id)) {
                return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: [messages.error.invalidID] });
            }

            const findUser = await Usuario.findById(id);

            if (!findUser) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: [messages.validationGeneric.mascCamp("Usuário")] });
            }

            return res.status(200).json({ data: findUser, error: false, code: 200, message: messages.httpCodes[200], errors: [] });

        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req);
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }

    }

    static async alterarUsuario(req,res){
        try{

            const { id } = req.params;
            const {senha} = req.body;

            const dados = req.body;

            if(senha){
                dados.senha = bcrypt.hashSync(senha, 10);
            }

            await Usuario.findByIdAndUpdate(id,dados);

            return res.status(200).json({ data: [], error: false, code: 200, message: messages.httpCodes[200], errors: [] });

        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req);
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }
    }

    static async deletarUsuario(req, res) {
        try {

            const { id } = req.params;

            if (!idValidate(id)) {
                return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: [messages.error.invalidID] });
            }

            const findUser = await Usuario.findByIdAndDelete(id);

            if (!findUser) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: [messages.validationGeneric.mascCamp("Usuário")] });
            }

            return res.status(200).json({
                data: [],
                error: false,
                code: 200,
                message: messages.httpCodes[200],
                errors: []
            });

        } catch (err) {
            enviaEmailErro(err.message, new URL(import.meta.url).pathname, req);
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }
    }
}