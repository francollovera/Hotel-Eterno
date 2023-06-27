const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  reservacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservacion', required: true },
  costo: { type: Number, required: true},
  activo: { type: Boolean, default: true },
});

const Transaccion = mongoose.model('Transaccion', transaccionSchema);


module.exports =  Transaccion;
