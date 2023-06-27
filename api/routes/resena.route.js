const {getResena,getEmailResena, postResena, deleteResena, getUsuarioEmail,
    getReservacionUsuario, putImageUser} = require('../controllers/controllerResenas');
const express =require('express')
const resenaRoute=express.Router()
const infoUsuarioRoute=express.Router()
const infoUsuarioReserva=express.Router()

resenaRoute
    .get('/', getResena)
    .get('/:email', getEmailResena)
    .post('/', postResena)
    .delete('/:id', deleteResena);

infoUsuarioRoute 
.get('/:email', getUsuarioEmail)
.delete('/:id', putImageUser)

infoUsuarioReserva
.get('/:email', getReservacionUsuario)

module.exports={resenaRoute, infoUsuarioRoute, infoUsuarioReserva};
 
