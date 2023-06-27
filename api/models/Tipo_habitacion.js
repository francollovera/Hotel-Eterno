const mongoose = require("mongoose");

const tipoHabitacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: false },
  activo: { type: Boolean, default: true },
});

const Tipo_habitacion = mongoose.model("Tipo_habitacion", tipoHabitacionSchema);

module.exports = Tipo_habitacion;
