const mongoose = require("mongoose");

const resenaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  puntuacion: { type: Number, required: true},
  descripcion: { type: String },

});

const Resena = mongoose.model("Resena", resenaSchema);

module.exports = Resena;