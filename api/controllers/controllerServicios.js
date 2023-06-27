const Servicio = require("../models/Servicio");

const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();

    return res.status(200).json(servicios);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const postServicio = async (req, res) => {
  console.log(req.body);
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !precio) {
    return res
      .status(400)
      .send(
        "Error. No se enviaron los datos necesarios para crear la servicio"
      );
  }

  try {
    const data = new Servicio({ nombre, precio, descripcion });
    return res.status(201).json(await data.save());
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send(error.message);
    }
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(500).send("Duplicate key error");
    }
    return res.status(500).send("Internal server error");
  }
};

const putServicio = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !precio) {
    return res
      .status(400)
      .send("Error. No se enviaron los datos necesarios para actualizar");
  }

  try {
    const servicio = await Servicio.findOne({ _id: id, activo: true });
    if (!servicio) {
      return res.status(400).send("El servicio no existe");
    }

    servicio.nombre = nombre;
    servicio.descripcion = descripcion;
    servicio.precio = precio;
    return res.status(200).json(await servicio.save());
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const deleteServicio = async (req, res) => {
  const { id } = req.params;

  try {
    const servicio = await Servicio.findOne({ _id: id });

    servicio.activo = false;
    await servicio.save();

    return res.status(200).send("Servicio eliminado exitosamente");
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};
module.exports = { getServicios, postServicio, putServicio, deleteServicio };
