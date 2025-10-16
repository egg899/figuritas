import express from "express";
import Figurita from "../models/Figurita.js";

const router = express.Router();

//Obtener todas las figuritas
router.get("/", async (req, res) => {
    try {
        const figuritas = await Figurita.find();
        res.json(figuritas);
    }
    catch(err) {
        res.status(500).json({error: "Error al obtener figuritas"});
    }




});

export default router;