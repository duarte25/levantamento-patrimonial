import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const itemSchema = new mongoose.Schema({
    etiqueta: {
        type: Number,
        unique: true,
        required: false
    },
    nao_tiquetado: {
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
        type: String,
        required: true, // Bem danificado, Bem em condições de uso, Bem inservivel
        index: true
    },
    ativo: {
        type: String,
        default: "Ativo"  // Ativo, Inativo, Pendente
    },
    ocioso: {
        type: Boolean, // Não está sendo usado
        default: false
    },
    descricao: {
        type: String
    },
    inventario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventarios",
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
    imagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "imagens"
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
itemSchema.plugin(paginate);

const item = mongoose.model('itens', itemSchema);

export default item;
