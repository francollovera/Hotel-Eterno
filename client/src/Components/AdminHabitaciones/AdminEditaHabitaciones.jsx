import React, { useState, useEffect } from "react";
import { getHabitacionesAdmin } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./AdminEditaHabitaciones.module.css";
import Swal from "sweetalert2";

const AdminEditaHabitaciones = ({ habitacion, handleCancelEdit }) => {
  const dispatch = useDispatch();
  const [habitacionEditada, setHabitacionEditada] = useState({...habitacion, imageEdit: []});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHabitacionEditada(habitacion);
  }, [habitacion]);

  const tipos = useSelector(state => state.tipos);

  const validateForm = () => {
    const errors = {};
    if (!habitacionEditada.nombre || habitacionEditada.nombre.trim() === "") {
      errors.nombre = "El nombre es requerido";
    }
    if (!habitacionEditada.precio || isNaN(habitacionEditada.precio)) {
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
      const formData = new FormData();
      formData.append("nombre", habitacionEditada.nombre);
      formData.append("numero", habitacionEditada.numero);
      formData.append("tipo", habitacionEditada.tipo);
      formData.append("descripcion", habitacionEditada.descripcion);
      formData.append("precio", habitacionEditada.precio);
      formData.append("capacidad", habitacionEditada.capacidad);

      if (habitacionEditada.imageEdit) {
        for (let i = 0; i < habitacionEditada.imageEdit.length; i++) {
          formData.append("image", habitacionEditada.imageEdit[i]);
        }
      }

      await axios.put(`http://localhost:3001/habitacion/${habitacionEditada._id}`, formData, {
        headers: {"Content-Type": "multipart/form-data"}
      });
      dispatch(getHabitacionesAdmin());
      Swal.fire({
        icon: "success",
        title: "Habitación actualizada exitosamente",
        text: "Los cambios han sido guardados exitosamente.",
      });
      handleCancelEdit();
    } 
    catch (error) {
      console.error("Error al actualizar la habitación", error);
    }
  };

  return (
    <div>
      <center>
        <h3>Editar Habitación</h3>
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
              value={habitacionEditada.nombre}
              onChange={(e) =>
                setHabitacionEditada({
                  ...habitacionEditada,
                  nombre: e.target.value,
                })
              }
            />
          </div>
          <br />
            
          <div className="col-1">
            <label>Número:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={habitacionEditada.numero}
              onChange={(e) =>
                setHabitacionEditada({
                  ...habitacionEditada,
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
            <select className="form-select" value={habitacionEditada.tipo} onChange={(e) => 
              setHabitacionEditada({...habitacionEditada, tipo: e.target.value})
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
              value={habitacionEditada.descripcion}
              onChange={(e) =>
                setHabitacionEditada({
                  ...habitacionEditada,
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
              value={habitacionEditada.precio}
              onChange={(e) =>
                setHabitacionEditada({
                  ...habitacionEditada,
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
              value={habitacionEditada.capacidad}
              onChange={(e) =>
                setHabitacionEditada({
                  ...habitacionEditada,
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
                setHabitacionEditada({
                  ...habitacionEditada,
                  imageEdit: e.target.files,
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <button
              className={style.boton}
              type="submit"
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

export default AdminEditaHabitaciones;