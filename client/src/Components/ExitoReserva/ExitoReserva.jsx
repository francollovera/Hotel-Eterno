import React ,  { useEffect, useState }from 'react';
import style from './ExitoReserva.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {getReservaByUsuario } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
function ExitoReserva() {
    const navigate=useNavigate()
    const stripe = Cookies.get("stripe");
    const emailToken = Cookies.get('emailToken');
    const usuario = useSelector(state => state.usuario);
    //console.log("usuario");
    //console.log(usuario);
    const dispatch = useDispatch();
    let reserva = useSelector((state) => state.reserva);
    
    useEffect(() => { 
      if (usuario||emailToken)    
          dispatch(getReservaByUsuario(usuario||emailToken));
    }, [dispatch])
    
    
    const handleClose=() => {
        navigate("/")

    }
    const handleBack = async() => {
    const paymentStatusResponse = await axios.post("http://localhost:3001/payment/status", { "sessionId":stripe });
        console.log(paymentStatusResponse.data);
      if (paymentStatusResponse.status === 200) {
        
        if (reserva && reserva.length > 0) {
          const idReserva = reserva[0]._id;
          console.log(idReserva);
          const reservaPaid = await axios.put(`http://localhost:3001/reservation/${idReserva}`,{"estado":"pagado"});
          console.log(reservaPaid.data);
          Cookies.remove('stripePay');
          Cookies.remove('stripe');
          navigate("/")
        }
        
      } if (paymentStatusResponse.status === 202){
        console.log("El pago no fue exitoso");
        navigate("/detallereserva")
    }
  };

  const renderDetalleReserva = () => {   
    if (Array.isArray(reserva)) {      
      return reserva.map((re) => {       
        return (         
        <div key={re._id} > 
          <div className={style.encierro}>
              <h1 className={style.tit}>SU RESERVA FUE REALIZADA CON EXITO</h1>
              <h2 className={style.mail} >{re.usuario}</h2>  
              <p className={style.label}>Fecha de entrada:</p>
              <p className={style.label2}>{re.fechaInicio.substring(0,10)}</p>
              <p className={style.label}>Fecha de salida:</p>
              <p className={style.label2}>{re.fechaFin.substring(0,10)}</p>
              
              <p className={style.label}>Precio:</p>
              <p className={style.label2}>${re.costo}</p>    
              <button onClick={handleBack} className={style.buttonpago} >Regresar</button>
          </div>
        </div>
        );
      });
    
  }
  };

  return (
    <div className={style.container}>
      <div >
        <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} onClick={handleClose}>
            X
          </button>
        </Link>        
       
        <div >{renderDetalleReserva()}</div>
        
      </div>
    </div>
  );
}

export default ExitoReserva;
