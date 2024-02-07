import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const usuarioSchema = new mongoose.Schema({
    setor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "setores"
    },
    itens: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'itens'
        }
    ]
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
usuarioSchema.plugin(paginate);

const usuario = mongoose.model('inventarios', usuarioSchema);

export default usuario;