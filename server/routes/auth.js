import express from "express";
import Usuario from "../models/Usuario.js";



const router = express.Router();

router.post("/login", async (req, res) => {
    const {equipo, password} = req.body;
    try{
        const usuario = await Usuario.findOne({ equipo, password });
        if(!usuario) return res.status(401).json({ error: "Credenciales Incorrectas" });

        res.json(usuario);

    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }

});//router post



router.post("/register", async(req, res) =>{

    try{
        const { nombre, equipo, password, rol } = req.body;

        console.log("Datos recibidis en el reegistro:", {
            nombre, password, equipo, rol
        });


        if (!nombre || !equipo || !password) {
            return res.status(400).json({
                message: "Por favor, complete todos los campos"
            });
        }//if !nombre or !password


        //Verifcar si ya existe
        const existente = await Usuario.findOne({ 
            $or: [{ nombre }, { equipo }] 
            });
            if (existente) {
            return res.status(400).json({ message: "El usuario o equipo ya ha sido registrado" });
            }
        //if existentes

        //Crear nuevo usuario
        const nuevoUsuario = new Usuario({
        nombre,
        equipo,
        password,
        rol: rol || "equipo",
        }); //nuevoUsuario


        await nuevoUsuario.save();

        res.status(201).json({
            message: "Usuario registrado con éxito",
            usuario: nuevoUsuario,
        });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }




});//register


export default router;