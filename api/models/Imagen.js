//TODO esto tambien se debe ignorar porque no esta
//TODO creado en la base de datos

const mongoose = require("mongoose");
const fs = require("fs");

const imagenSchema = new mongoose.Schema({
  url: { type: String, required: true },
  // Otros campos
  //Imagen.find({ habitacion: habitacionId });
});

const Imagen = mongoose.model("Imagen", imagenSchema);

const guardarImagenEnDB = async (nombreArchivo) => {
  try {
    const datosImagen = fs.readFileSync(nombreArchivo);

    const imagen = new Imagen({
      nombre: nombreArchivo,
      datos: datosImagen,
    });

    await imagen.save();

    console.log("Imagen almacenada en la base de datos");
  } catch (error) {
    console.error("Error al almacenar la imagen:", error);
  }
};

// Llama a la función para almacenar la imagen
guardarImagenEnDB("../../client/src/Components/Bienestar/img/natacion.jpg");
module.exports = Imagen;
