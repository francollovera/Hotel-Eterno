import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUsuariosAdmin } from "../redux/action";
import style from "./AdminEditaUsuarios.module.css";
import Swal from "sweetalert2";

const AdminCreaUsuario = ({ handleCancelEdit }) => {
  const dispatch = useDispatch();
  const [usuarioEditado, setUsuarioEditado] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    telefono: "",
  });

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:3001/usuarios/registro",
        usuarioEditado
      );
      dispatch(getUsuariosAdmin());
      Swal.fire({
        icon: "success",
        title: "Usuario creado exitosamente",
      });
      handleCancelEdit();
    } catch (error) {
      console.error("Error al crear el usuario", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear el usuario",
        text:
          "Ocurrió un error al intentar crear el usuario. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <div>
      <center>
        <h3>Crear Usuario</h3>
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
              value={usuarioEditado.nombre}
              onChange={(e) =>
                setUsuarioEditado({
                  ...usuarioEditado,
                  nombre: e.target.value,
                })
              }
            />
          </div>

          <div className="col-1">
            <label>correo:</label>
          </div>
          <div className="col-2">
            <textarea
              cols="50"
              rows="4"
              contentEditable="true"
              type="text"
              value={usuarioEditado.correo}
              onChange={(e) =>
                setUsuarioEditado({
                  ...usuarioEditado,
                  correo: e.target.value,
                })
              }
            />
          </div>
          <div className="col-1">
            <label>contraseña:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={usuarioEditado.contraseña}
              onChange={(e) =>
                setUsuarioEditado({
                  ...usuarioEditado,
                  contraseña: e.target.value,
                })
              }
            />
          </div>
          <div className="col-1">
            <label>Telefono:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={usuarioEditado.telefono}
              onChange={(e) =>
                setUsuarioEditado({
                  ...usuarioEditado,
                  telefono: e.target.value,
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <center>
              <button className={style.boton} type="submit">
                Crear usuario
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

export default AdminCreaUsuario;
