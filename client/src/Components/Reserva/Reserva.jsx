import React, { useEffect, useState } from 'react';
import style from './Reserva.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getHabitacionesDisponibles , getPaquetesDisponibles, createReserva, getPaqueteById, setSelectedPaqueteA, setPrecioA, setSelectedServiceA, setSelectedRoomA, setDatesA, setAdultsA, setChildrenA, setFilteredHabitaciones } from '../redux/action';
import axios from 'axios';
import Swal from 'sweetalert2';
import { navigate } from 'react-router-dom';



function Reserva() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadedForm = useSelector(state => state.formulario);
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const usuario = useSelector(state => state.usuario);
  const rooms = useSelector(state => state.habitaciones);
  const paquetes = useSelector((state) => state.allpaquetes);

  useEffect( () => {
    if (loadedForm.dates.checkIn && loadedForm.dates.checkOut) {
      if (loadedForm.dates.checkIn > loadedForm.dates.checkOut) {
        alert('Error. La fecha de fin debe ser mayor a la de inicio');
        dispatch(setDatesA({...loadedForm.dates, checkOut:''}));
      }
      else{
        dispatch(getHabitacionesDisponibles(loadedForm.dates.checkIn,loadedForm.dates.checkOut));
        dispatch(getPaquetesDisponibles(loadedForm.dates.checkIn,loadedForm.dates.checkOut));
      }
    }
  }, [loadedForm.dates]);

  useEffect( () => {
    dispatch(setFilteredHabitaciones([]));
    axios.get('http://localhost:3001/servicio')
      .then((response) => {setServices(response.data)})
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
  }, [])

 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      usuarioCorreo: usuario,      
      arrHabitacion: loadedForm.selectedRoom,
      arrServicio: loadedForm.selectedService,
      arrPaquete:loadedForm.selectedPaquete,
      fechaInicio: loadedForm.dates.checkIn,
      fechaFin: loadedForm.dates.checkOut,
      costo: loadedForm.precio,
      nroPerson:(loadedForm.adults+loadedForm.children)
    };
    window.localStorage.setItem("dataReservation", JSON.stringify(data));
  
    if(usuario){
      createReserva(data).then((response) => {    
        console.log("response.data");                        
        console.log(response.data);
        window.localStorage.setItem("dataReservation", JSON.stringify(data));
        navigate("/detalleReserva")
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      });
    }else {
      window.localStorage.setItem('dataReservation', JSON.stringify(data));
      Swal.fire({
        icon: 'warning',
        title: 'Ingrese a su cuenta para continuar...',
        showCancelButton: false,
        showConfirmButton: false,
      });
      navigate('/contenedor');
    }}

  const handleAdultsChange = (e) => {
    dispatch(setAdultsA(parseInt(e.target.value)));
  };

  const handleChildrenChange = (e) => {
    dispatch(setChildrenA(parseInt(e.target.value)));
  };

  const handleDatesChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    dispatch(setDatesA({...loadedForm.dates, [property]:value}))
  }

  const handleRoomChange = (e) => {
    const value = e.target.value;
    let activeRoom = rooms.find(room => room._id === value)
    if (e.target.checked) {
      dispatch(setSelectedRoomA([...loadedForm.selectedRoom, value]));
      dispatch(setPrecioA(loadedForm.precio + activeRoom.precio));
    } else {
      dispatch(setSelectedRoomA(loadedForm.selectedRoom.filter(room => room !== value)));
      dispatch(setPrecioA(loadedForm.precio - activeRoom.precio));
    }   
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    let activeService = services.find(service => service._id === value);
    if (e.target.checked) {
      dispatch(setSelectedServiceA([...loadedForm.selectedService, value]));
      dispatch(setPrecioA(loadedForm.precio + activeService.precio));
    } else {
      dispatch(setSelectedServiceA(loadedForm.selectedService.filter(service => service !== value)));
      dispatch(setPrecioA(loadedForm.precio - activeService.precio));
    }
  };

  const handlePaqueteChange = (e) => {
    const value = e.target.value;
    let activeRoom = paquetes.find(room => room._id === value)
    if (e.target.checked) {      
      dispatch(setSelectedPaqueteA([...loadedForm.selectedPaquete, value]));
      dispatch(setPrecioA(loadedForm.precio + activeRoom.costo));
    } else {      
      dispatch(setSelectedPaqueteA(loadedForm.selectedPaquete.filter(room => room !== value))); 
      dispatch(setPrecioA(loadedForm.precio - activeRoom.costo));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Return null to hide the component when it's not open
  }

  return (
    <div className={style.contenedor}>
      <div className={style.tamano}>
        <Link className={style.linkContainer} to="/">
          <button className={style.closeButton} onClick={handleClose}>
            X
          </button>
        </Link>

        <h3 className={style.title}>Reserva tu estadía</h3>

        <form onSubmit={handleSubmit}  >
          <div className="d-flex align-items-start bg-light mb-3" style={{ height: "30px" }}>
            <label htmlFor="check-in" className={style.label}>
              Fecha de entrada:
            </label>
            <input type="date" id="check-in" name="checkIn" value={loadedForm.dates.checkIn} onChange={handleDatesChange} className={style.inputFecha} required />
            <label htmlFor="check-in" className={style.label}>
              
            </label>
            <label htmlFor="check-in" className={style.label}>
              Fecha de salida:
            </label>
            <input type="date" id="check-out" name="checkOut" value={loadedForm.dates.checkOut} onChange={handleDatesChange} className={style.inputFecha} required />
            <label htmlFor="check-in" className={style.label}>
             
            </label>
            <label htmlFor="check-in" className={style.label}>
              Adultos:
            </label>
            <input
              type="number"
              id="adults"
              className={style.input}
              min="1"
              value={loadedForm.adults}
              onChange={handleAdultsChange}
              required
            />

            <label htmlFor="check-in" className={style.label}>
             
            </label>
            <label htmlFor="check-in" className={style.label}>
              Niños:
            </label>
            <input
              type="number"
              id="children"
              className={style.input}
              min="0"
              value={loadedForm.children}
              onChange={handleChildrenChange}
              required
            />
          </div>

          {loadedForm.precio !== 0 && (
            <div className={style.formGroup}>
              <label htmlFor="precio" className={style.precio}>
                Precio: ${loadedForm.precio}
              </label>
              <br/>
              {loadedForm.selectedRoom.length > 0 && (
                <><label className={style.label}>
                  Habitacion/es seleccionada/s:&nbsp;
                  {loadedForm.selectedRoom.map(roomId => {
                    const habitacion = rooms.find(room => room._id === roomId);
                    if (habitacion) {
                      return habitacion.nombre;
                    }
                  }).join(', ')}
                </label>
                <br/></>
              )} 
              {loadedForm.selectedPaquete.length > 0 && (
                <><label className={style.label}>
                  Paquete/s seleccionado/s:
                  {loadedForm.selectedPaquete.map(paqueteId => {
                    const paq = paquetes.find(pa => pa._id === paqueteId);
                    if (paq) {
                      return paq.nombre;
                    }
                  }).join(', ')}
                </label>
                <br/></>
              )}
              {loadedForm.selectedService.length > 0 && (
                <><label className={style.label}>
                  Servicio/s seleccionado/s:
                  {loadedForm.selectedService.map(servicioId => {
                    const ser = services.find(se => se._id === servicioId);
                    if (ser) {
                      return ser.nombre;
                    }
                  }).join(', ')}
                </label>
                <br/></>
              )}  
            </div>
          )}
          <br></br>
          {loadedForm.adults !== 0 && rooms.length && (
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione la habitación:
              </label>
              <div className={style.containercheckbox}>
                {rooms.map((room) =>
                  <label className={style.nomobrehab} key={room._id}>
                  {room.disponible === false ? (
                    <>
                      <input
                        type="checkbox"
                        disabled
                        value={room._id}
                        onChange={handleRoomChange}
                      />
                        <span className={style.nombrehab}>
                          No disponible: {room.nombre}
                          <Link className={style.linkkk} to={`/habitacion/${room._id}`}>
                            <button className={style.hab}>Ver Habitación</button>
                          </Link> 
                        </span>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        value={room._id}
                        onChange={handleRoomChange}
                        checked={loadedForm.selectedRoom.includes(room._id)}
                      />
                      <span className={style.nombrehab}>
                        <br></br>
                        {room.nombre} Capacidad: {room.capacidad}<br></br> Precio: ${room.precio}
                        <Link className={style.linkkk} to={`/habitacion${room.numero}`}>
                              <button className={style.hab}>Ver Habitación</button>
                        </Link>
                      </span>
                    </>
                  )} 
                  </label>
                )}
              </div>
            </div>
          )}

          <br></br>

          {loadedForm.adults !== 0 && rooms.length && paquetes.length && (  
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione el paquete:
              </label>
              <div className={style.containercheckbox}>
                {paquetes.map((paquete) =>
                  <label key={paquete._id}>
                    {paquete.disponible === false ? (
                      <>
                      <input
                        disabled
                        type="checkbox"
                        value={paquete._id}
                        onChange={handlePaqueteChange}
                      />
                      <span className={style.nombrehab}>
                        No disponible: {paquete.nombre}
                        <Link className={style.linkkk} to={`/detail/${paquete._id}`}>
                          <button className={style.hab}>Ver Paquete</button>
                        </Link>
                      </span>
                      </>
                    ) : (
                      <>
                      <input
                        type="checkbox"
                        value={paquete._id}
                        onChange={handlePaqueteChange}
                        checked={loadedForm.selectedPaquete.includes(paquete._id)}
                      />
                      <span className={style.nombrehab}>
                        {paquete.nombre} Capacidad: {paquete.capacidad}
                        <br></br>
                        Precio: ${paquete.costo}
                        <Link className={style.linkkk} to={`/detail/${paquete.numero}`}>
                          <button className={style.hab}>Ver Paquete</button>
                        </Link>
                      </span>
                      </>
                    )}
                  </label>
                )}
              </div>
            </div>
          )}

          <br></br>

          {loadedForm.adults !== 0 && rooms.length && services.length && (  
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione el servicio:
              </label>
              <div className={style.containercheckbox}>
                {services.map((servicio) =>
                  <label key={servicio._id}>
                      <input
                        type="checkbox"
                        value={servicio._id}
                        onChange={handleServiceChange}
                        checked={loadedForm.selectedService.includes(servicio._id)}
                      />
                      <span className={style.nombreservicio}>
                        {servicio.nombre} 
                        <br></br>
                        Precio: ${servicio.precio}
                      </span>
                  </label>
                )}
              </div>
            </div>
          )}
          <br/>
          {/* <button type='submit' className={style.button}>Reservar ahora</button>     */}
          <button type='submit' className={style.button}>Añadir al Carrito</button>       
        </form>
      </div>
    </div>
  );
}

export default Reserva;