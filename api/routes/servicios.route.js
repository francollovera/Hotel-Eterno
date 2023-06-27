const {getServicios,postServicio,putServicio,deleteServicio} = require('../controllers/controllerServicios');
const express = require('express');
const routerServicios = express.Router();

routerServicios
    .get('/', getServicios)
    .post('/', postServicio)
    .put('/:id', putServicio)
    .delete('/:id', deleteServicio);

module.exports = routerServicios;