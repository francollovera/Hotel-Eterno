const {
  getPaquetes,
  getPaqueteById,
  postPaquete,
  putPaquete,
  deletePaquete,
  getPaquetesDisponibles,
  getPaquetesAdmin,
  activaDesactivaPaquete
} = require("../controllers/controllerPaquetes");
const express = require("express");
const routerPaquetes = express.Router();
const fileUpload = require("express-fileupload");

routerPaquetes
  .get("/", getPaquetes)
  .get("/admin", getPaquetesAdmin)
  .post("/admin", activaDesactivaPaquete)
  .post("/admin/paquete", postPaquete)
  .get('/disponible', getPaquetesDisponibles)
  .get("/:id", getPaqueteById)
  .post(
    "/",
    fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
    postPaquete
  )
  .put("/:id", putPaquete)
  .delete("/:id", deletePaquete);

module.exports = routerPaquetes;
