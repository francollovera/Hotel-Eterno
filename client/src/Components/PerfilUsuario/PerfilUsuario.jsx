import React, { useEffect, useState } from 'react';
import style from './PerfilUsuario.module.css';
import {postResena, deleteResena,deleteImageUser,getUsuarioByCorreo} from '../redux/action.js'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {validate,validate2}from './validate';
import {getResenaUsuario,getReservationUsuario,getUsuariobyEmail,getReservaByUsuario} from '../redux/action';
import axios from 'axios';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { navigate } from 'react-router-dom';

const PerfilUsuario=()=>{
   const token = Cookies.get("token");
   const emailToken = Cookies.get("emailToken");
     const dispatch = useDispatch();
     useEffect(() => {
       if(emailToken!=undefined)
         dispatch(getUsuarioByCorreo(emailToken));
     }, [dispatch])
     const { resenaByUsuario, usuarioArray, reserva, usuario} = useSelector((state) => state);
     const [data,setData ] = useState(usuarioArray);
     const dataReservacion= Array.isArray(reserva)?reserva:[reserva]
     const resenaArray = Array.isArray(resenaByUsuario) ? resenaByUsuario : [resenaByUsuario];
     let usuarioReg = useSelector((state) => state.usuarioXid);
     
   
    const [resena, setResena] = useState({
      nombre: "",
      correo: "",
      puntuacion: 0,
      descripcion: "",
    });
    const [error, setError]=useState({
      puntuacion: 0,
      descripcion: "",
    })
    const [error2,setError2]=useState({
      nombre: "",
      phone:'',
    })
    const [datos, setDatos] = useState({
      nombre:'',
      phone:'',
    });
    
    const [imagen, setImagen] = useState(null);
    const [editing, setEditing] = useState(false);
    const [imageKey, setImageKey] = useState(Date.now());

    const handleDatoChange = (event) => {
      setDatos({...datos,[event.target.name]:event.target.value}); 
      setError2(validate2( {...datos,[event.target.name]:event.target.value}));

    };

    const handleImagenChange = (event) => {
    setImagen(event.target.files[0]);
    };

    const handleUpUser = (event) => {
      event.preventDefault();

    if (datos.nombre && datos.phone && imagen) {
      const formData = new FormData();
      formData.append('nombre', datos.nombre);
      formData.append('telefono', datos.phone);
      formData.append('image', imagen);

      axios.put(`auth/usuario/${data._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Actualización exitosa',
        }).then(() => {
          setTimeout(() => {
            dispatch(getUsuarioByCorreo(usuario));
            dispatch(getUsuariobyEmail(usuario));
          }, 100);
          setImageKey(Date.now()); // Actualiza la clave de imagen
        });
      })
      .catch(error => { 
        console.error(error);
      });
    }
    setDatos({
      nombre:'',
      phone:'',
    });
    setImagen(null)
  };
    const handleChange = (event) => {
      setResena({
        ...resena,
        [event.target.name]: event.target.value,
        nombre: data.nombre,
        correo: data.correo,
      });
    setError(validate({...resena, [event.target.name]: event.target.value}));
    };
    
    const handlerDelete = (event) => {
      const id = event.target.value;
      dispatch(deleteResena(id));
      setTimeout(()=>{
        dispatch(getResenaUsuario(data.correo)) }
        , 1000)
    };
    useEffect(() => {
      if(usuario!==undefined)dispatch(getResenaUsuario( usuario));
      if(usuario!==undefined)dispatch(getReservationUsuario(usuario));
      if(usuario!==undefined)dispatch(getReservaByUsuario(usuario));
       
    }, [resenaByUsuario.length, usuario]);
    useEffect(() => {
      dispatch(getUsuarioByCorreo(usuario))
      setData(usuarioArray)
    },[ usuarioArray.image.length, ])
    const handleSubmit = (event) => {
      event.preventDefault();
      
      if(validateResena(dataReservacion)&& Object.values(error).length === 0){
        dispatch(postResena(resena));
        setResena({
          nombre: "",
          correo: "",
          puntuacion: 0,
          descripcion: "",
        });
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Envío exitoso',
          timer: 1500,
          showConfirmButton: false
        });
        
        setTimeout(() => {
          dispatch(getResenaUsuario(data.correo));
        }, 1000);
     } else { return Swal.fire({
      icon: 'warning',
      title: 'No puede realizar comentario',
      showConfirmButton: false,
      timer: 1500
    })};

      
    };
    const validateResena=(dataReservacion)=> {
      const currentDate = new Date();
      if (!Array.isArray(dataReservacion) || dataReservacion.length===false ) {
        return false; 
      }
      return dataReservacion.some((item) => new Date(item.fechaInicio) <= currentDate);//true 15<14
    }
    const handleEditarClick = () => {
      if(!editing){setEditing(true)
      }else{setEditing(false)};
     };
  
  const deleteImageUsuario = (id) => {
    
    dispatch(deleteImageUser(id))
        setTimeout(()=>{
        dispatch(getUsuarioByCorreo(usuario));
        dispatch(getUsuariobyEmail(usuario));
        setImageKey(Date.now()); // Actualiza la clave de imagen
        },700 )
        
        Swal.fire({
          icon: 'success',
          title: 'Imagen eliminada',
          showConfirmButton: false,
          timer: 1500
        });;
  
  };
  
 

  return (
    <div className={style.containertotal}>
    <div className={style.container}>
      <div className={style.usuario}>
        <div>
          <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} >
            X
          </button>
          </Link>
        </div>
        <h2>Usuario</h2>
        
        {!editing && (
          <div>
            {data.image && data.image?.length <=0? (
            <img key={imageKey} src={"https://res.cloudinary.com/djm04ajb0/image/upload/v1687125700/usuarioImage/czdnwyiy4ngf9frawohq.png"} />
            ) : (
              <div>
              <img  src={data.image} alt={"imagen"} />
              <button className={style.buttoneliminarimagen} value={data._id} onClick={() => deleteImageUsuario(data._id)}>Eliminar Img</button>
            </div>
            )}
            <h3>{data.nombre}</h3>
            <h3>{data.correo}</h3>
            <h3>{data.telefono}</h3>
            </div>
            )}

        <div className={style.contenedor}>
        {!editing && (
          <button className={style.comentariobutton} onClick={handleEditarClick}>Editar</button>
        )}
        {editing && (
          <form onSubmit={handleUpUser}>
            <div> <button onClick={handleEditarClick}>x</button></div>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" name="nombre" value={datos.nombre} onChange={handleDatoChange} placeholder="..."/>
            </div>
            {error2.nombre&& <p>{error2.nombre}</p>}
            <div>
              <label htmlFor="correo">Correo:</label>
              <input type="correo" name="correo" defaultValue={data.correo}  />
            </div>
            <div>
              <label htmlFor="phone">Telefono:</label>
              <input type="phone" name='phone' value={datos.phone} onChange={handleDatoChange} placeholder="+1223242"/>
            </div>
            {error2.phone&& <p>{error2.phone}</p>}
            <div>
              <label htmlFor="imagen">Imagen:</label>
              <input type="file" id="imagen" accept="image/jpeg, image/jpg, image/png, image/gif" onChange={handleImagenChange} />
            </div>
            <button type="submit">Enviar</button>
          </form>
        )}
        </div>
      </div>
      
      
      {usuarioReg&&usuarioReg.admin === false && 
      <div className={usuarioReg.admin === false?style.resena:style.ocultarDiv} >
        <div >
        <h2 className={style.titulototal}>Reserva del usuario:</h2></div>
          {!Array.isArray(dataReservacion)||dataReservacion.length <= 0? (
          <p>No hay reservacion.</p>
          ) : (
            dataReservacion.map((reserva) => (
              <div key={reserva._id}>
        {reserva.Arrayhabitaciones && (
        <div className={style.titulos}>
          <h4>Habitaciones:</h4>
          {reserva.Arrayhabitaciones.map((habitacion) => (
            <div key={habitacion._id}>
              <p>Nombre: {habitacion.nombre}</p>
              <p>Capacidad: {habitacion.capacidad}</p>
              <p>Precio: {habitacion.precio}</p>
            </div>
          ))}
        </div>
      )}
        {reserva.Arraypaquete && reserva.Arraypaquete.length > 0 ? (
        <div className={style.titulos}>
          <h4 className={style.titulos}>Paquetes:</h4>
          {reserva.Arraypaquete.map((paquete) => (
            <div key={paquete._id}>
              <p>Nombre: {paquete.nombre}</p>
              <p>Precio: {paquete.precio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Paquetes: No hay paquetes.</p>
      )}
      {reserva.ArrayServicio && reserva.ArrayServicio.length > 0 ? (
        <div className={style.titulos}>
          <h4 className={style.titulos} >Servicios:</h4>
          {reserva.ArrayServicio.map((servicio,index) => (
            <div key={servicio.index}>
              <p>Nombre: {servicio.nombre}</p>
              <p>Descripción: {servicio.descripcion}</p>
              <p>Precio: {servicio.precio}</p>
            </div>
          ))}
        </div >
      ) : (
        <p>Servicios: No hay servicios.</p>
      )}
          {reserva.estado&&reserva.estado!=='I'? <h4>Estado: Pagado.</h4>:<h4>Estado: Pendiente de Pago.</h4>}
        {reserva && reserva.fechaInicio && (
          <h4>Fecha de inicio: {reserva.fechaInicio.substring(0, 10)}</h4>
        )}
        {reserva && reserva.fechaFin && (
          <h4>Fecha de fin: {reserva.fechaFin.substring(0, 10)}</h4>
        )}

      </div>
          ))
        )}
        { resenaArray.length === 0? (<p>No hay comentarios.</p>)
        :(resenaArray.map((item) => (
              <div key={item._id}>
                <h4>⭐️{item.puntuacion}</h4>
                <h4>{item.descripcion}</h4>
                <div> <button onClick={handlerDelete} 
                        value={item._id} name={"id"}>❌</button></div>
              </ div>
          )))}
          
          <div className={style.comentario}>
  <form>
    <h2>Editar un comentario y puntuación</h2>
    {!validateResena(dataReservacion) && <p>No se pueden dejar comentarios y puntuaciones hasta que realices una reservación y comiences tu estadía</p>}
    <label>Puntuación:
      <input
        type="number"
        min="0"
        max="5"
        step="1"
        name="puntuacion"
        value={resena && resena.puntuacion} // Agrega una verificación de nulo para resena
        onChange={handleChange}
        placeholder="..."
      />
    </label>
    {error && error.puntuacion ? <p>{error.puntuacion}</p> : null}
            
    <textarea
    className={style.escribe}
      id="descripcion"
      value={resena && resena.descripcion} // Agrega una verificación de nulo para resena
      onChange={handleChange}
      name="descripcion"
      placeholder="Escribe..."
      required
    ></textarea>
    {error && error.descripcion ? <p>{error.descripcion}</p> : null}
    <button onClick={handleSubmit}>Enviar</button>
  </form>
</div>

      </div>
      }
    </div>
    </div>
  );
};

export default PerfilUsuario;