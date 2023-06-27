import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getServiciosAdmin } from "../redux/action";
import style from "./AdminEditaServicios.module.css";
import Swal from "sweetalert2";

const AdminCreaServicio = ({ handleCancelEdit }) => {
  const dispatch = useDispatch();
  const [servicioEditado, setServicioEditado] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
  });

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:3001/servicio", servicioEditado);
      dispatch(getServiciosAdmin());
      Swal.fire({
        icon: "success",
        title: "Servicio creado exitosamente",
      });
      handleCancelEdit();
    } catch (error) {
      console.error("Error al crear el servicio", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear el servicio",
        text:
          "Ocurrió un error al intentar crear el servicio. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <div>
      <center>
        <h3>Crear Servicio</h3>
      </center>
      <br />

      <center>
        <form onSubmit={handleSave}>
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
            <center>
              <button className={style.boton} type="submit">
                Crear servicio
              </button>
            </center>
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

export default AdminCreaServicio;
