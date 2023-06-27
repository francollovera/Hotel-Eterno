import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import FooterBar from "../FooterBar/FooterBar";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUndo } from "@fortawesome/free-solid-svg-icons";
import style from "./AdminUsuarios.module.css";
import Table from "react-bootstrap/Table";
import { getUsuariosAdmin, setFilters } from "../redux/action";
import Swal from "sweetalert2";
// import AdminEditaUsuario from "./AdminEditaUsuario";

// import AdminCreaUsuario from "./AdminCreaUsuario";

const AdminUsuario = () => {
  const dispatch = useDispatch();
  let filters = useSelector((state) => state.filters);
  let data = useSelector((state) => state.allusuarios);
  const [modoEdicion, setModoEdicion] = useState(false);
  // const [modoCreacion, setModoCreacion] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    telefono: "",
  });

  useEffect(() => {
    dispatch(getUsuariosAdmin());
  }, [dispatch]);

  if (filters.searchQuery !== "") {
    data = data.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  const handleFiltersChange = (event) => {
    dispatch(setFilters(event.target.name, event.target.value));
  };
  // const handleSaveEdit = async (usuarioEditado) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:3001/usuarios/usuarioPut/${usuarioEditado._id}`,
  //       usuarioEditado
  //     );
  //     dispatch(getUsuariosAdmin());
  //     console.log("Usuario actualizado exitosamente");
  //     setModoEdicion(false);
  //   } catch (error) {
  //     console.error("Error al actualizar el usuario", error);
  //   }
  // };
  // const handleEdit = (usuarioId) => {
  //   console.log("Entre al handleEdit");
  //   setModoEdicion(true);
  //   const usuario = data.find((usuario) => usuario._id === usuarioId);
  //   setUsuarioEditado(usuario);
  // };
  const handleActivate = async (id) => {
    try {
      await axios.put(`http://localhost:3001/usuarios/activar/${id}`);
      dispatch(getUsuariosAdmin());
      Swal.fire({
        icon: "success",
        title: "Usuario activado con éxito",
        text: "El usuario ha sido activado exitosamente.",
      });
    } catch (error) {
      console.error("Error al realizar la activación", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/usuarios/usuarioDelete/${id}`, {
        activo: false,
      });
      dispatch(getUsuariosAdmin());
      console.log("Borrado lógico exitoso");
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado con éxito",
        text: "El usuario ha sido eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Error al realizar el borrado lógico", error);
    }
  };

  return (
    <div>
      <NavBar />
      <center>
        <h2>Lista de Usuarios</h2>{" "}
      </center>
      <br />
      <div className="col-md-4">
        <div className="form-inline">
          <input
            type="text"
            placeholder="Buscar usuarios"
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
            <th>Correo</th>
            {/* <th>Contraseña</th> */}
            <th>Telefono</th>
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
                <td>{atributo.correo}</td>
                {/* <td>{atributo.contraseña}</td> */}
                <td>{atributo.telefono}</td>
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
                    {/* <FontAwesomeIcon
                      className={style.edit_btn}
                      onClick={() => handleEdit(atributo._id)}
                      icon={faEdit}
                    /> */}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* {modoEdicion && (
        <AdminEditaUsuario
          servicio={usuarioEditado}
          handleCancelEdit={() => setModoEdicion(false)}
          onSaveEdit={handleSaveEdit}
        />
      )} */}
      {/* {modoCreacion ? (
        <AdminCreaUsuario handleCancelEdit={() => setModoCreacion(false)} />
      ) : (
        <div className="btn_crearsusuario">
          <button className={style.boton} onClick={() => setModoCreacion(true)}>
            Crear Usuario
          </button>
        </div>
      )} */}

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
};

export default AdminUsuario;
