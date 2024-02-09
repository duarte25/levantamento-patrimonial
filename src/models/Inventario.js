import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const inventarioSchema = new mongoose.Schema({
    setor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "setores"
        }
    ],
    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    },
    data_inicio: {
        type: Date,
        require: true,
    },
    data_fim: {
        type: Date
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
inventarioSchema.plugin(paginate);

const inventario = mongoose.model('inventarios', inventarioSchema);

export default inventario;