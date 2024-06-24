import mongoose, { mongo } from "mongoose";
import paginate from "mongoose-paginate-v2";

export const STATUS_INVENTARIO = {
    ANDAMENTO: "Em andamento",
    FINALIZADA: "Finalizada"
};  

const inventarioSchema = new mongoose.Schema({
    campus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campus"
    },
    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    auditores: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "usuarios",
                required: true
            }
        }
    ],
    data_inicio: {
        type: Date,
        require: true,
    },
    data_fim: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: Object.values(STATUS_INVENTARIO),
        required: true
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
inventarioSchema.plugin(paginate);

const inventario = mongoose.model("inventarios", inventarioSchema);

export default inventario;