import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const usuarioSchema = new mongoose.Schema({
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
    setor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "setores"
    },
    estado: {
        type: String,
        required: true,
        index: true
    },
    ativo: {
        type: String,
        default: "Ativo"  // Ativo, Inativo, Pendente
    },
    descricao: {
        type: String,
        required: true
    },
    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    }, 
    imagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "imagens"
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
usuarioSchema.plugin(paginate);

const usuario = mongoose.model('itens', usuarioSchema);

export default usuario;