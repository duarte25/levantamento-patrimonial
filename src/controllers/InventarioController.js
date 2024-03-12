import Inventario from "../models/Inventario.js";
import messages from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";
import { jwtDecode } from "jwt-decode";
import Setor from "../models/Setor.js";
import { ObjectId } from "mongodb";

export default class InventarioController {
    static async pesquisarInventario(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const token = req.headers.authorization;
            const tokenDecoded = jwtDecode(token);
            const campus = tokenDecoded.campus;
            console.log(campus);

            // Atributos esperados na requisição, validação foi feita no middleware antes de chegar aqui
            const {
                responsavel,
                auditores
            } = req.query;

            const filtros = { campus };

            const idSetor = await Setor.find({ campus }).select("_id");
            const idsArray = idSetor.map(setor => setor._id);

            console.log("ids",idsArray);
            // Se houver setores associados ao campus, aplicar o filtro de setores
            if (idSetor.length > 0) {
                filtros.setores = { $in: idsArray };
            }

            if (responsavel) filtros.responsavel = responsavel;
            if (auditores) filtros.auditores = auditores;

            console.log("filtros ", filtros);

            const inventarios = await Inventario.paginate(
                filtros.setores,
                { ...paginateOptions, sort: { sigla: 1 }, page: pagina }
            );

            inventarios.code = 200;
            inventarios.error = false;
            inventarios.errors = [];

            res.status(200).json({ ...inventarios, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static async listarInventarioID(req, res) {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findById(id);

            if (!inventario) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Inventario não encontrada!"] });
            }

            res.status(200).json({ inventario, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }

    static atualizarInventario = async (req, res) => {
        try {
            const { id } = req.params;
            let inventario = await Inventario.findById(id);
            if (!inventario) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Inventario não encontrado!"] });
            }
            inventario = await Inventario.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({ data: [], error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        }
        catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    };

    static async criarInventario(req, res) {
        try {
            const inventario = new Inventario(req.body);
            const savedInventario = await inventario.save();


            return res.status(201).json({
                data: savedInventario, error: false, code: 201, message: messages.httpCodes[201], errors: []
            });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }

    static async deletarInventario(req, res) {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findById(id);

            if (!inventario) {
                return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: ["Inventario não encontrado!"] });
            }

            await Inventario.findByIdAndDelete(id);
            res.status(200).json({ data: inventario, error: false, code: 200, message: messages.httpCodes[200], errors: [] });
        } catch (err) {
            return res.status(500).json({ data: [], error: true, code: 500, message: messages.httpCodes[500], errors: ["Servidor encontrou um erro interno."] });
        }
    }
}