import React, { useEffect, useState } from "react";
import style from "./AdminHabitaciones.module.css";
import NavBar from "../NavBar/NavBar";
import FooterBar from "../FooterBar/FooterBar";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { getHabitacionesAdmin, getTipos, setFilters } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo, faEdit  } from "@fortawesome/free-solid-svg-icons";
import AdminEditaHabitaciones from "./AdminEditaHabitaciones";
import AdminCreaHabitaciones from "./AdminCreaHabitaciones";
import Swal from "sweetalert2";

function AdminHabitaciones() {
  const dispatch = useDispatch();
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [habitacionEditada, setHabitacionEditada] = useState({
    nombre: "",
    numero: 0,
    tipo: "",
    descripcion: "",
    precio: 0,
    capacidad: 0,
    image: []
  });

  useEffect(() => {
    dispatch(getHabitacionesAdmin());
    dispatch(getTipos());
  }, [dispatch]);

  let data = (useSelector((state) => state.gethabitaciones)).slice();
  let tipos = useSelector((state) => state.tipos);
  let filters = useSelector((state) => state.filters);

  if (filters.searchQuery !== '') {
    data = data.filter(habitacion => habitacion.nombre.toLowerCase().includes(filters.searchQuery.toLowerCase()))
  }
  if (filters.minPrice !== '') {
    data = data.filter((habitacion) => habitacion.precio >= filters.minPrice)
  }
  if (filters.maxPrice !== '') {
    data = data.filter((habitacion) => habitacion.precio <= filters.maxPrice)
  };   
  
  const logTipoNombre = (id) => {
    let tipo = tipos.find(tipo => tipo._id.toString() === id)
    return tipo.nombre;
  };

  const handleFiltersChange = (event) => {
    dispatch(setFilters(event.target.name, event.target.value ));
  };

  const handleEdit = (habitacionId) => {
    setModoEdicion(true);
    const habitacion = data.find((habitacion) => habitacion._id === habitacionId);
    setHabitacionEditada(habitacion);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/habitacion/${id}`, {
        activo: false,
      });
      dispatch(getHabitacionesAdmin());
      Swal.fire({
        icon: "success",
        title: "Habitación eliminada con éxito",
        text: "La habitación ha sido eliminada exitosamente.",
      });
    } catch (error) {
      console.error("Error al realizar el borrado lógico", error);
    }
  };
  const handleActivate = async (id) => {
    try {
      await axios.put(`http://localhost:3001/habitacion/activar/${id}`);
      dispatch(getHabitacionesAdmin());
      Swal.fire({
        icon: "success",
        title: "Habitación activada con éxito",
        text: "La habitación ha sido activada exitosamente.",
      });
    } catch (error) {
      console.error("Error al realizar la activación", error);
    }
  };

  if (tipos.length > 0) {
  return (
    <div>
      <NavBar />
      <center>
        <h2>Lista de Habitaciones</h2>{" "}
      </center>
      <br />
      <div className="col-md-4">
        <div className="form-inline">
          <input
            type="text"
            placeholder="Buscar habitaciones"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleFiltersChange}
            className={`form-control + ${style.searchInput}`}
          />
        </div>
      </div>
      <br />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((atributo, id) => {
            return (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{atributo.nombre}</td>
                <td>{atributo.numero}</td>
                <td>{logTipoNombre(atributo.tipo)}</td>
                <td className="expand">{atributo.descripcion}</td>
                <td>{atributo.precio + "USD"}</td>
                <td>{atributo.capacidad}</td>
                <td>{atributo.activo === true ? "Activo" : "Inactivo"}</td>
                <td className={style.fit}>
                  <span className={style.actions}>
                    {atributo.activo === true ?
                      <FontAwesomeIcon
                      className={style.delete_btn}
                      onClick={() => handleDelete(atributo._id)}
                      icon={faTrash}
                      />
                    :
                      <FontAwesomeIcon
                      className={style.delete_btn}
                      onClick={() => handleActivate(atributo._id)}
                      icon={faUndo}
                      />
                    }

                    <FontAwesomeIcon
                      className={style.edit_btn}
                      onClick={() => handleEdit(atributo._id)}
                      icon={faEdit}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {modoEdicion && (
        <AdminEditaHabitaciones
          habitacion={habitacionEditada}
          handleCancelEdit={() => setModoEdicion(false)}
        />
      )}
      {modoCreacion ? (
        <AdminCreaHabitaciones handleCancelCreate={() => setModoCreacion(false)} />
      ) : (
        <div className="btn_crearservicio">
          <button className={style.boton} onClick={() => setModoCreacion(true)}>
            Crear Habitacion
          </button>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterBar />
    </div>
  );
  }
}

export default AdminHabitaciones;
