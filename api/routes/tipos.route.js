const express =require('express')
const tiposRoute=express.Router()
const Tipo_habitacion = require("../models/Tipo_habitacion");

tiposRoute
    .get('/', async (req,res) => {
        try {
            const tipos = await Tipo_habitacion.find({activo:true});

            res.status(200).json(tipos);
        } catch (error) {
            res.send(error.message);
        };
    })
    .get('/:id', async (req,res) => {
        const {id} = req.params;
        try {
            const tipo = await Tipo_habitacion.findById(id);
            res.status(200).json(tipo);
        } catch (error) {
            res.send(error.message);
        }
    });

module.exports = tiposRoute;
 