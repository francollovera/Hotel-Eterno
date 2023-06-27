const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  stripeCustomerId:{type: String}
});

const Pago = mongoose.model('Pago', usuarioSchema);

module.exports = Pago;