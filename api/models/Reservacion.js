const mongoose = require("mongoose");

const reservacionSchema = new mongoose.Schema({
  usuario: { type: String, ref: "Usuario", required: true },
  //habitaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habitacion" }],
  //servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }],
  //paquete: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paquete"}],
  nombres: {type: Object},
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  activo: { type: Boolean, default: true },
  image: { type: Array },
  costo: { type: Number, required: true },
  estado: { type: String, required: true },
  habitaciones:  { type: Array },
  servicios:  { type: Array },
  paquetes: { type: Array },
  Arrayhabitaciones: { type: Array },
  Arraypaquete: { type: Array },
  ArrayServicio: { type: Array },
  fechaReserva: { type: Date, required: true },
  nroPerson: { type: Number, required: true },
  //Mas campos
});

// Reservacion.find({ user: userId })

const Reservacion = mongoose.model("Reservacion", reservacionSchema);

module.exports = Reservacion;
