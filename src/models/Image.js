import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  nome: { type: String },
  src: { type: String, require: true },
  createdAt: { type: Date, default: Date.now}
});

const image = mongoose.model('imagens', imageSchema);
export default image;
