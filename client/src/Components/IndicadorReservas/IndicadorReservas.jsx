import React, { useEffect, useState } from "react";
import style from "./IndicadorReservas.module.css";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PaymentStatusChart from "./PaymentStatusChart";
import ReservationCount from "./ReservationCount";
import CostDistributionChart from "./CostDistributionChart";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { getReserva } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo, faEdit  } from "@fortawesome/free-solid-svg-icons";
import AdminCreaReserva from "./AdminCrearReserva";
import Swal from "sweetalert2";
//import roomData from "../../../src/reservacions.json";
function IndicadorReservas() {
  const [mostrarComponente, setMostrarComponente] = useState(false);
//   const servicios = data.servicios.map(servicio => servicio);
// const paquetes = data.paquetes.map(paquete => paquete);
let reservas = useSelector((state) => state.reservas);
const dispatch=useDispatch()
useEffect(() => {
  dispatch(getReserva());
  
}, [dispatch]);
const handleChart=() => {
  setMostrarComponente(!mostrarComponente);

}
const handleDelete = async (id) => {
  try {
    await axios.delete(`/reservation/${id}`, {
      activo: false,
    });
    
    Swal.fire({
      icon: "success",
      title: "Habitación eliminada con éxito",
      text: "La habitación ha sido eliminada exitosamente.",
    });
    dispatch(getReserva())
  } catch (error) {
    console.error("Error al realizar el borrado lógico", error);
  }
};
const handleActivate = async (id) => {
  try {
    console.log(id);
    await axios.put(`/reservation/activar/${id}`);
    
    Swal.fire({
      icon: "success",
      title: "Habitación activada con éxito",
      text: "La habitación ha sido activada exitosamente.",
    });
    dispatch(getReserva())
  } catch (error) {
    console.error("Error al realizar la activación", error);
  }
};
  const roomData=[ { roomType: 'Individual', revenue: 1200 },
  { roomType: 'Doble', revenue: 2500 },
  { roomType: 'Suite', revenue: 4000 },]
  //const data =roomData.map(room=>room.precio)
    return (
      <div>
        <NavBar />
        <center>
          <h2>Lista de Reservaciones</h2>{" "}
        </center>
        <br />
       
        <br />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Costo</th>
              <th>No. Personas</th>
              <th>Habitaciones</th>
              <th>Paquetes</th>
              <th>Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((atributo, id) => {
              return (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{atributo.usuario}</td>
                  <td>{atributo.fechaInicio}</td>
                  <td>{atributo.fechaFin}</td>
                  <td>{atributo.costo + "USD"}</td>
                  <td>{atributo.nroPerson}</td>
                  <td>{atributo.nombres.habitaciones.join(", ")}</td>
                  <td>{atributo.nombres.paquetes.join(", ")}</td>
                  <td>{atributo.estado}</td>
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
  
                      
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="btn_crearservicio">
          <button className={style.boton} onClick={() => handleChart()}>
            Generar Indicadores
          </button>
          {mostrarComponente && (
          <div>
            <PaymentStatusChart />
            <ReservationCount />
            <CostDistributionChart/>
          </div>
        )}
        </div>
        
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
  
  

export default IndicadorReservas;
