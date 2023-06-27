const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  telefono: { type: String, required: true },
  activo: { type: Boolean, default: true },
  image: { type: Array },
  admin: { type: Boolean, default: false },
  // Otros campos según tus necesidades
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
