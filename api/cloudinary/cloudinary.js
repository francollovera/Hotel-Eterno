require("dotenv").config();
const { v2 } = require("cloudinary");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } =
  process.env;
//apikey y lo demas esta comentado abajo
v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const paqueteImage = async (filePath) => {
  return await v2.uploader.upload(filePath, {
    folder: "paqueteImage",
  });
};
const serviciosImage = async (filePath) => {
  return await v2.uploader.upload(filePath, {
    folder: "servicioImage",
  });
};
const habitacionImage = async (filePath) => {
  return await v2.uploader.upload(filePath, {
    folder: "habitacionImage",
  });
};
const usuarioImage = async (filePath) => {
  return await v2.uploader.upload(filePath, {
    folder: "usuarioImage",
  });
};
const reservationImage = async (filePath) => {
  return await v2.uploader.upload(filePath, {
    folder: "reservationImage",
  });
};
const deleteImage = async (publicId) => {
  return await v2.uploader.destroy(publicId);
};
module.exports = {
  usuarioImage,
  serviciosImage,
  paqueteImage,
  deleteImage,
  habitacionImage,
  reservationImage,
};
// CLOUDINARY_CLOUD_NAME= djm04ajb0
// CLOUDINARY_API_SECRET=fF2I57aS1Edem91a5zHSAw3f534
// CLOUDINARY_API_KEY=518672254367446
