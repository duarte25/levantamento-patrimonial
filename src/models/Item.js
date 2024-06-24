import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

export const ESTADO_ITEM = {
    DANIFICADO: "Bem danificado",
    CONDICAO_USO: "Bem em condições de uso",
    INSERSIVEL:  "Bem inservível"
};

export const ATIVO_ITEM = {
    ATIVO: "Ativo",
    INATIVO: "Inativo",
    PENDENTE: "Pendente"
};

const itemSchema = new mongoose.Schema({
    etiqueta: {
        type: Number,
        required: false
    },
    nao_etiquetado: {
        type: Boolean,
        default: false
    },
    encontrado: {
        type: Boolean,
        default: true
    },
    nome: {
        type: String,
        minlength: 4,
        maxlength: 200,
        index: true
    },
    estado: {
        type: String, // Bem danificado, Bem em condições de uso, Bem inservivel
        enum: Object.values(ESTADO_ITEM),
        default: ESTADO_ITEM.CONDICAO_USO
    },
    ativo: {
        type: String,
        enum: Object.values(ATIVO_ITEM),
        default: ATIVO_ITEM.ATIVO  // Ativo, Inativo, Pendente
    },
    ocioso: {
        type: Boolean, // Não está sendo usado
        default: false
    },
    descricao: {
        type: String, // Alterar para ter um maximo de texto
        maxlength: 256,
    },
    inventario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventarios", // Ja tem que puxar automatico
        required: true
    },
    setor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "setores",
        required: true
    },
    auditor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    }, 
    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    imagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "imagens" // Incluir regra de negocio 
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// O item pode ser criado apenas uma uma vez em cada inventario
itemSchema.index({ inventario: 1, etiqueta: 1 }, { unique: true });

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
itemSchema.plugin(paginate);

const item = mongoose.model("itens", itemSchema);

export default item;