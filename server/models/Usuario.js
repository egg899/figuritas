import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    equipo: {type: String, required: true},
    password: {type: String, required: true},
    figuritasDesbloqueadas: [{type:mongoose.Schema.Types.ObjectId, ref:"Figurita"}],
    rol: {type: String, default: "equipo"}

});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;