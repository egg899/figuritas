import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios.js";
import figuritasRoutes from "./routes/figuritas.js";
import authRoutes from "./routes/auth.js";
import Figurita from "./models/Figurita.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { dbName: "album_figuritas" })
  .then(async () => {
    console.log("✅ Conectado correctamente a MongoDB Atlas");

    // ⚠️ Insertar figuritas iniciales solo si no hay ninguna
    const count = await Figurita.countDocuments();
    if (count === 0) {
      await Figurita.insertMany([
        { nombre: "Figurita 1", imagen: "/img/fig1.jpeg", codigo: "ABC123" },
        { nombre: "Figurita 2", imagen: "/img/fig2.jpeg", codigo: "DEF456" },
        { nombre: "Figurita 3", imagen: "/img/fig3.jpeg", codigo: "GHI789" },
      ]);
      console.log("✨ Figuritas iniciales cargadas en MongoDB Atlas");
    }
  })
  .catch((err) => console.error("❌ Error al conectar con MongoDB Atlas:", err));

// Rutas
app.use("/usuarios", usuariosRoutes);
app.use("/figuritas", figuritasRoutes);
app.use("/auth", authRoutes);

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
