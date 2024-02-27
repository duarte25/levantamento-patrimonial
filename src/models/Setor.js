import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const setorSchema = new mongoose.Schema({
    local: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
setorSchema.plugin(paginate);

const setor = mongoose.model("setores", setorSchema);

export default setor;