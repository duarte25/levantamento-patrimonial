import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2"

const grupoSchema = new mongoose.Schema({
    nome: {
        type: String,
        minlength: 3,
        maxlength: 200,
        required: true,
        index: true
    },

    regras: [
        {
            nome: {
                type: String,
                minlength: 3,
                maxlength: 200,
                required: true,
                index: true
            },

            descricao: {
                type: String,
                minlength: 3,
                maxlength: 200,
                required: true,
            }
        }
    ]
},
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
        versionKey: "_version"
    }
)

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
grupoSchema.plugin(paginate)

const grupo = mongoose.model("grupos", grupoSchema)

export default grupo