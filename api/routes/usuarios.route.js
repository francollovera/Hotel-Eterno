const express = require("express");
const router = express.Router();
const {
  getUsuarios,
  postLogin,
  postRegistro,
  putUsuario,
  putActivarUsuario,
  postNotification,
  getUsuario,
  deleteUsuario,
  deleteUsuarioAdmin,
  getUsuarioByCorreo,
  postRegistroGoogle,
} = require("../controllers/controllerUsuarios");
const fileUpload = require("express-fileupload");

// ...
router.get("/", getUsuarios);
// Ruta de inicio de sesión
router.post("/registro", postRegistro);
router.post("/registro/google", postRegistroGoogle);

// Ruta de cierre de sesión
router.post("/login", postLogin);
router.put(
  "/usuario/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  putUsuario
);
router.put("/activar/:id", putActivarUsuario);
router.get("/usuario", getUsuario);
router.delete("/usuario/:id", deleteUsuario);
router.delete("/usuarioDelete/:id", deleteUsuarioAdmin);
router.post("/notification", postNotification);
router.get("/correo/:correo", getUsuarioByCorreo);

module.exports = router;
