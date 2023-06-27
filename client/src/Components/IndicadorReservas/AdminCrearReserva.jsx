import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getHabitacionesAdmin } from "../redux/action";
import style from "./AdminCrearReserva.module.css";
import Swal from "sweetalert2";

const AdminCreaHabitaciones = ({ handleCancelCreate }) => {
  const dispatch = useDispatch();
  const [habitacionCreada, setHabitacionCreada] = useState({
    nombre: "",
    numero: 0,
    tipo: "",
    descripcion: "",
    precio: 0,
    capacidad: 0,
    image: []
  });

  const tipos = useSelector(state => state.tipos);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre", habitacionCreada.nombre);
      formData.append("numero", habitacionCreada.numero);
      formData.append("tipo", habitacionCreada.tipo);
      formData.append("descripcion", habitacionCreada.descripcion);
      formData.append("precio", habitacionCreada.precio);
      formData.append("capacidad", habitacionCreada.capacidad);

      for (let i = 0; i < habitacionCreada.image.length; i++) {
        formData.append("image", habitacionCreada.image[i]);
      }

      await axios.post("http://localhost:3001/habitacion", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      dispatch(getHabitacionesAdmin());
      Swal.fire({
        icon: "success",
        title: "Habitación creada exitosamente",
      });
      handleCancelCreate();
    } 
    catch (error) {
      console.error("Error al crear la habitación", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la habitación",
        text:
          "Ocurrió un error al intentar crear la habitación. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <div>
      <center>
        <h3>Crear Habitación</h3>
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
              value={habitacionCreada.nombre}
              onChange={(e) =>
                setHabitacionCreada({
                  ...habitacionCreada,
                  nombre: e.target.value,
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <label>Numero:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={habitacionCreada.numero}
              onChange={(e) =>
                setHabitacionCreada({
                  ...habitacionCreada,
                  numero: parseInt(e.target.value),
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <label>Tipo:</label>
          </div>
          <div className="col-2">
            <select className="form-select" value={habitacionCreada.tipo} onChange={(e) => 
              setHabitacionCreada({...habitacionCreada, tipo: e.target.value})
            }>
              <option value="">Seleccione uno</option>
              <option value={tipos[0]._id}>{tipos[0].nombre}</option>
              <option value={tipos[1]._id}>{tipos[1].nombre}</option>
            </select>
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
              value={habitacionCreada.descripcion}
              onChange={(e) =>
                setHabitacionCreada({
                  ...habitacionCreada,
                  descripcion: e.target.value,
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <label>Precio:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={habitacionCreada.precio}
              onChange={(e) =>
                setHabitacionCreada({
                  ...habitacionCreada,
                  precio: parseInt(e.target.value),
                })
              }
            />
          </div>
          <br />
          
          <div className="col-1">
            <label>Capacidad:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={habitacionCreada.capacidad}
              onChange={(e) =>
                setHabitacionCreada({
                  ...habitacionCreada,
                  capacidad: parseInt(e.target.value),
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <label>Imágenes:</label>
          </div>
          <div className="col-2">
            <input
              type="file"
              multiple
              onChange={(e) =>
                setHabitacionCreada({
                  ...habitacionCreada,
                  image: e.target.files,
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <center>
              <button className={style.boton} type="submit">
                Crear Habitación
              </button>
            </center>
          </div>
          <br />
          <div className="col-1">
            <button className={style.boton} onClick={handleCancelCreate}>
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

export default AdminCreaHabitaciones;