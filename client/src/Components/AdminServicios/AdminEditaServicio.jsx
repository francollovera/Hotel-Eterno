import React, { useState, useEffect } from "react";
import { getServiciosAdmin } from "../redux/action";
import { useDispatch } from "react-redux";
import axios from "axios";
import style from "./AdminEditaServicios.module.css";
import Swal from "sweetalert2";

const AdminEditaServicio = ({ servicio, handleCancelEdit, onSaveEdit }) => {
  const dispatch = useDispatch();
  // const servicio = useSelector((state) => state.allservicios);
  const [servicioEditado, setServicioEditado] = useState(servicio);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setServicioEditado(servicio);
  }, [servicio]);
  const validateForm = () => {
    const errors = {};

    if (!servicioEditado.nombre || servicioEditado.nombre.trim() === "") {
      errors.nombre = "El nombre es requerido";
    }
    if (!servicioEditado.precio || isNaN(servicioEditado.precio)) {
      errors.precio = "El precio es requerido y debe ser un número";
    }

    return errors;
  };
  const renderErrors = (errors) => {
    return Object.values(errors).map((error, index) => (
      <div key={index}>{error}</div>
    ));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        html: renderErrors(validationErrors),
      });
      return;
    }
    try {
      await axios.put(
        `http://localhost:3001/servicio/${servicioEditado._id}`,
        servicioEditado
      );

      dispatch(getServiciosAdmin());
      console.log("Borrado lógico exitoso");
      Swal.fire({
        icon: "success",
        title: "Servicio actualizado exitosamente",
        text: "Los cambios han sido guardados exitosamente.",
      });
    } catch (error) {
      console.error("Error al actualizar el servicio", error);
    }
  };

  return (
    <div>
      <center>
        <h3>Editar Servicio</h3>
      </center>
      <br />

      <center>
        <form onSubmit={handleSubmit}>
          <div className="col-1">
            <label>Nombre:</label>
          </div>

          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={servicioEditado.nombre}
              onChange={(e) =>
                setServicioEditado({
                  ...servicioEditado,
                  nombre: e.target.value,
                })
              }
            />
          </div>
          <br />
          <div className="col-1">
            <label>Descripción:</label>
          </div>
          <div className="col-2">
            <textarea
              cols="50"
              rows="4"
              contentEditable="true"
              type="text"
              value={servicioEditado.descripcion}
              onChange={(e) =>
                setServicioEditado({
                  ...servicioEditado,
                  descripcion: e.target.value,
                })
              }
            />
          </div>
          <div className="col-1">
            <label>Precio:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={servicioEditado.precio}
              onChange={(e) =>
                setServicioEditado({
                  ...servicioEditado,
                  precio: parseInt(e.target.value),
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <button
              className={style.boton}
              type="submit"
              onClick={() => onSaveEdit(servicioEditado)}
            >
              Guardar cambios
            </button>
          </div>
          <br />
          <div className="col-1">
            <button className={style.boton} onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        </form>
      </center>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AdminEditaServicio;
