import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        minlength: 3,
        maxlength: 200,
        required: true,
        index: true
    },
    cpf: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    },
    codigo_confirma_email: {
        type: String,
        trim: true,
        index: true,
        select: false
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
},
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
        versionKey: "_version"
    }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
usuarioSchema.plugin(paginate);

const usuario = mongoose.model('usuarios', usuarioSchema);

export default usuario;