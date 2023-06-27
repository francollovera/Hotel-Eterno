const { Router } = require("express");

// const hotelsRoute = require('./hotels.route')
const reservationsRoute = require("./reservations.route");
const habitacionesRoute = require("./habitaciones.route");
const serviciosRoute = require("./servicios.route");
const usuariosRoute = require("./usuarios.route");
const paquetesRoute = require("./paquetes.route");
const {
  resenaRoute,
  infoUsuarioRoute,
  infoUsuarioReserva,
} = require("./resena.route");
const paymentRoute = require("./payment.route");
const tiposRoute = require("./tipos.route");
const router = Router();

// router.use('/hotel', hotelsRoute)
router.use("/reservation", reservationsRoute);
router.use("/habitacion", habitacionesRoute);
router.use("/auth", usuariosRoute);
router.use("/usuarios", usuariosRoute);
router.use("/servicio", serviciosRoute);
router.use("/paquete", paquetesRoute);
router.use("/payment", paymentRoute);
router.use("/resena", resenaRoute);
router.use("/infoUsuario", infoUsuarioRoute);
router.use("/tipo", tiposRoute);
router.use("/infoUsuarioReserva", infoUsuarioReserva);

module.exports = router;
