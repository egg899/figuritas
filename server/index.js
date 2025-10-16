import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios.js";
import figuritasRoutes from "./routes/figuritas.js";
import authRoutes from "./routes/auth.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// COnexion a Mongo
import Figurita from "./models/Figurita.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB local");

    // ⚠️ solo para probar: si no hay figuritas, las creamos
    const count = await Figurita.countDocuments();
    if (count === 0) {
      await Figurita.insertMany([
        { nombre: "Figurita 1", imagen: "/img/fig1.jpeg", codigo: "ABC123" },
        { nombre: "Figurita 2", imagen: "/img/fig2.jpeg", codigo: "DEF456" },
        { nombre: "Figurita 3", imagen: "/img/fig3.jpeg", codigo: "GHI789" },
      ]);
      console.log("✨ Figuritas iniciales cargadas en MongoDB");
    }
  })
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));







    
// endpoint temporal para probar
app.get("/", (req, res) =>{
    res.send("Servidor funcionando correctamente");
});    

app.use("/usuarios", usuariosRoutes);

app.use("/figuritas", figuritasRoutes);

app.use("/auth", authRoutes);

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto http://localhost:${PORT}`));
