import mongoose from "mongoose";

const FiguritaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  codigo: { type: String, required: true, unique: true }, // código para desbloquear
});

export default mongoose.model("Figurita", FiguritaSchema);