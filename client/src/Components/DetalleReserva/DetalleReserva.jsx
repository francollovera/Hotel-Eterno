import React, { useEffect, useState } from 'react';
import style from './DetalleReserva.module.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getReservaByUsuario, ClearAllCarrito } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import Carousel from "react-bootstrap/Carousel";

function DetalleReserva() {
  const emailToken = Cookies.get('emailToken');
  const usuario = useSelector(state => state.usuario);
  const dispatch = useDispatch();
  let reserva = useSelector((state) => state.reserva);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (emailToken)
      dispatch(getReservaByUsuario(emailToken));
  }, [dispatch]);
  console.log(reserva[0]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleClose = () => {
    // Acciones a realizar al hacer clic en el botón de cerrar
    console.log('Cerrar');
  };
  const handleClearAllCarrito = (event) => {
    event.preventDefault();
    dispatch(ClearAllCarrito("clear"));
    Cookies.remove('stripe');
    Cookies.remove('stripePay');
    window.localStorage.setItem("dataReservation", []);
  };
  const handlePayment = async () => {
    const stripe = Cookies.get("stripe");
    const stripePay = Cookies.get("stripePay");
    if (!stripe || !stripePay) {

      const localData = window.localStorage.getItem("client");
      const localReservation = window.localStorage.getItem("dataReservation");

      if (localData && reserva) {
        const data = JSON.parse(localData);
        const datares = JSON.parse(localReservation);
        console.log(reserva);
        const habitaciones = reserva[0].Arrayhabitaciones;
        const paquetes = reserva[0].Arraypaquete;
        const servicios = reserva[0].ArrayServicio;
        try {
          const response = await axios.post("http://localhost:3001/payment/checkout", {
            "custumerId": data,
            "arrIdHabitaciones": habitaciones,
            "arrIdPaquetes": paquetes,
            "arrServicios":servicios
          });

          const { payment, sessionId } = response.data;
          Cookies.set("stripe", sessionId, { expires: 1, secure: true });
          Cookies.set("stripePay", payment, { expires: 1, secure: true });
          window.location.href = payment;
        } catch (error) {
          console.error(error);
        }
      }
    }else{
      const paymentStatusResponse = await axios.post("http://localhost:3001/payment/status", { "sessionId": stripe });
    console.log(paymentStatusResponse.data);

    if (paymentStatusResponse.status === 202) {
      console.log("El pago no fue exitoso");
      window.location.href = stripePay;
    }

    }


    
  };

  const renderDetailHabiReserva = (habi) => {
    if (Array.isArray(habi)) {
      return habi?.map((h) => {
        return (
          <div  key={h._id}>
            <p className={style.label2}>Habitación: {h.nombre}</p>
            <p className={style.label}>Capacidad: {h.capacidad}</p>
            <p className={style.label}>Precio: ${h.precio}</p>
            <Link className={style.linkContainer} to="/">
          <button className={style.closeButton} onClick={handleClose}>
            X
          </button>
        </Link>
          </div>
        );
      });
    }
  };

  const renderDetailPaqReserva = (habi) => {
    if (Array.isArray(habi)) {
      return habi?.map((h) => {
        return (
          <div  key={h._id}>
             
              
              <p className={style.label2}>Paquete:  </p>
              <p className={style.labell}>Nombre: {h.nombre}</p>  
            
           
            <p className={style.label}></p>
            
            <p className={style.label}>Precio: ${h.precio}</p>
          </div>
        );
      });
    }
  };

  const renderDetailServReserva = (habi) => {
    if (Array.isArray(habi)) {
      return habi?.map((h) => {
        return (
          <div  key={h._id}>
            <p className={style.label2}>Servicio:</p>
            <p className={style.label}>{h.nombre}</p>
           
            <p className={style.label}> Precio del Servicio: ${h.precio}</p>
          </div>
        );
      });
    }
  };

  if (Array.isArray(reserva)) {
    if (reserva.length > 0) {
      console.log("mayor a cero");
      console.log(reserva.length);
      return (
        <div className={style.container}>
          <NavBar></NavBar>
          <div className={style.Body}>
            {reserva.map((re) => (
              <div className={`wholeCart ${style.encierro}`} key={re._id}>
                
                <div className={style.label}>
                  <h1 className={style.tit}>SU RESERVA</h1>
                  <div>
                
                </div>
                  {re.Arrayhabitaciones && <div>{renderDetailHabiReserva(re.Arrayhabitaciones)}</div>}
                  {re.Arrayhabitaciones && re.Arraypaquete && <div>{renderDetailPaqReserva(re.Arraypaquete)}</div>}
                  {re.Arrayhabitaciones && <div>{renderDetailServReserva(re.ArrayServicio)}</div>}
                  <div>
                    <p className={style.label3}>Total Compra:</p>
                    <p className={style.label3}>${re.costo}</p>
                  </div>
                </div>
                <div className={style.label}>
                <button className={style.bottonborrartodo} onClick={handleClearAllCarrito}>
                    Borrar todo
                  </button>
                  <button onClick={handlePayment} className={style.buttonpago}>
                    Realizar Pago
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          
        </div>
      );
    } else {
      return (
        <div className={style.container}>
          <NavBar></NavBar>
          <div className={style.Body}>
            <div className={style.label}>
              <div className={style.label2}>
                <Link className={style.linkContainer} to="/">
                  <button className={style.botoncerrar} onClick={handleClose}>
                    X
                  </button>
                </Link>
              </div>
              <div className={style.titleCartContainerVacio}>
                <h3 className={style.mensajevacio}>Tu carrito de Compras<br></br> esta vacío :(</h3>
              </div>
            </div>
          </div>
          
          
        </div>
      );
    }
  }

  return (
    <div className={style.containertotal}>
      <NavBar></NavBar>
    <div className={style.container}>
      
      <div className={style.Body}>
     
        
        <div>{renderDetailServReserva()}</div>
        
      </div>
    </div>
    </div>
  );
}

export default DetalleReserva;
