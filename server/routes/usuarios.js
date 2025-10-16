import express from "express";
import Usuario from "../models/Usuario.js";
import Figurita from "../models/Figurita.js";

const router = express.Router();

// Crear usuario nuevo
router.post("/", async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
});


//Obtener todos lo usuarios
router.get("/", async(req, res) => {
    const usuarios = await Usuario.find().populate("figuritasDesbloqueadas");
    res.json(usuarios);
});


// Desbloquear una figurita por código
router.post("/:id/desbloquear", async (req, res) => {
    try {
        const { codigo } = req.body;// codigo de la figurita
        const usuarioId = req.params.id;

        //Buscamos la figurita por codigo
        const figurita = await Figurita.findOne({ codigo });
        if(!figurita) {
            return res.status(404).json({ error: "Código inválido" });
        }

        // Buscamos al usuario
        const usuario = await Usuario.findById(usuarioId);
        if(!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Si ya la tenía desbloqueada, no hacemos nada
        if(usuario.figuritasDesbloqueadas.includes(figurita._id)) {
            return res.status(400).json({ error: "Figurita ya desbloqueada" });
        }

        // Agregamos la figurita
        usuario.figuritasDesbloqueadas.push(figurita._id);
        await usuario.save();

        res.json({ mensaje: "Figurita desbloqueada", usuario });
    
    }   catch(err) {
            res.status(500).json({ error: err.message });
    }

});// router post para desbloquear

// ver el álbum de un usuario (sus figuritas)
router.get("/:id/album", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).populate("figuritasDesbloqueadas");
        if(!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json(usuario.figuritasDesbloqueadas);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});


//Obtener Usuario por su ID
router.get("/:id", async (req, res) => {
    try{
        const usuario = await Usuario.findById(req.params.id);
        if(!usuario) {
            return res.status(404).json({ erro: "Usuario no encontrado" })
        }

        res.json(usuario);// Rrsponde al cliente con los datps
    } catch (err){
        res.status(500).json({error:err.message});
    }
});




export default router;