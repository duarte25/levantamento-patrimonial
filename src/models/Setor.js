import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        minlength: 4,
        maxlength: 200,
        index: true
    },
    bloco: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
usuarioSchema.plugin(paginate);

const usuario = mongoose.model('setores', usuarioSchema);

export default usuario;