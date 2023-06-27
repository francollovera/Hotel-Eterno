import React, { useEffect, useState } from "react";
import style from "./AdminServicios.module.css";
import NavBar from "../NavBar/NavBar";
import FooterBar from "../FooterBar/FooterBar";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { setFilters, getServiciosAdmin } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo, faEdit } from "@fortawesome/free-solid-svg-icons";
import AdminEditaServicio from "./AdminEditaServicio";
import AdminCreaServicio from "./AdminCreaServicio";
import Swal from "sweetalert2";

function AdminServicios() {
  let data = useSelector((state) => state.allservicios);
  let filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [servicioEditado, setServicioEditado] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
  });

  useEffect(() => {
    dispatch(getServiciosAdmin());
  }, [dispatch]);

  if (filters.searchQuery !== "") {
    data = data.filter((servicio) =>
      servicio.nombre.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  if (filters.minPrice !== "") {
    data = data.filter((servicio) => servicio.precio >= filters.minPrice);
  }
  if (filters.maxPrice !== "") {
    data = data.filter((servicio) => servicio.precio <= filters.maxPrice);
  }
  const handleFiltersChange = (event) => {
    dispatch(setFilters(event.target.name, event.target.value));
  };

  const handleSaveEdit = async (servicioEditado) => {
    try {
      await axios.put(
        `http://localhost:3001/servicio/${servicioEditado._id}`,
        servicioEditado
      );
      dispatch(getServiciosAdmin());
      console.log("Servicio actualizado exitosamente");
      setModoEdicion(false);
    } catch (error) {
      console.error("Error al actualizar el servicio", error);
    }
  };

  const handleEdit = (servicioId) => {
    setModoEdicion(true);
    const servicio = data.find((servicio) => servicio._id === servicioId);
    setServicioEditado(servicio);
  };
  const handleActivate = async (id) => {
    try {
      await axios.put(`http://localhost:3001/servicio/activar/${id}`);
      dispatch(getServiciosAdmin());
      Swal.fire({
        icon: "success",
        title: "Servicio activado con éxito",
        text: "El servicio ha sido activado exitosamente.",
      });
    } catch (error) {
      console.error("Error al realizar la activación", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/servicio/${id}`, {
        activo: false,
      });
      dispatch(getServiciosAdmin());
      console.log("Borrado lógico exitoso");
      Swal.fire({
        icon: "success",
        title: "Servicio eliminado con éxito",
        text: "El servicio ha sido eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Error al realizar el borrado lógico", error);
    }
  };

  return (
    <div>
      <NavBar />
      <center>
        <h2>Lista de Servicios</h2>{" "}
      </center>
      <br />
      <div className="col-md-4">
        <div className="form-inline">
          <input
            type="text"
            placeholder="Buscar servicios"
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
            <th>Descripción</th>
            <th>Precio</th>
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
                <td className="expand">{atributo.descripcion}</td>
                <td>{atributo.precio + "USD"}</td>
                <td>{atributo.activo === true ? "Activo" : "Inactivo"}</td>
                <td className={style.fit}>
                  <span className={style.actions}>
                    {atributo.activo === true ? (
                      <FontAwesomeIcon
                        className={style.delete_btn}
                        onClick={() => handleDelete(atributo._id)}
                        icon={faTrash}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className={style.delete_btn}
                        onClick={() => handleActivate(atributo._id)}
                        icon={faUndo}
                      />
                    )}
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
        <AdminEditaServicio
          servicio={servicioEditado}
          handleCancelEdit={() => setModoEdicion(false)}
          onSaveEdit={handleSaveEdit}
        />
      )}
      {modoCreacion ? (
        <AdminCreaServicio handleCancelEdit={() => setModoCreacion(false)} />
      ) : (
        <div className="btn_crearservicio">
          <button className={style.boton} onClick={() => setModoCreacion(true)}>
            Crear Servicio
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

export default AdminServicios;
