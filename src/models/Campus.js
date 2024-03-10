import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";



const campusSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    cidade: {
        type: String,
    },
    ativo: {
        type: Boolean,
        default: true
    }
},
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

campusSchema.plugin(paginate);

const campus = mongoose.model("campus", campusSchema);

export default campus;


