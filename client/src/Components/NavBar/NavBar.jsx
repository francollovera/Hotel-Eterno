import { Button, Container, Nav, NavDropdown, NavItem, NavLink, Navbar } from "react-bootstrap";
import React from "react";
import style from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  
} from "@fortawesome/free-brands-svg-icons";
import { faCartPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import imagen from "./logo hotel.png";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUsuario,getUsuarioByCorreo, deleteStateResenaAndUserArr,getUsuariobyEmail} from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import Carrito from "../Carrito/Carrito";
import { onAuthStateChanged } from "firebase/auth";
import { setUsuario } from "../redux/action";
import { auth } from "../Loging/firebase";
import Cookies from "js-cookie";

const NavBar = () => {
  const token = Cookies.get("token");
  const emailToken = Cookies.get("emailToken");
  const location = useLocation();
  const dispatch = useDispatch();
  const usuarioArray = useSelector(state => state.usuarioArray);
  const usuario = useSelector((state) => state.usuario);
  const [currentPage, setCurrentPage] = useState(1);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [reserva, setReserva] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  let usuarioReg = useSelector((state) => state.usuarioXid);

  useEffect(() => {
    if(emailToken!=undefined)
      dispatch(getUsuarioByCorreo(emailToken));
      dispatch(getUsuariobyEmail(emailToken))
  }, [dispatch])

  useEffect(() => {
    let timeout;
    if (token) {
      dispatch(setUsuario(emailToken));
    }
    if (mostrarCarrito && !reserva) {
      setMostrarMensaje(true);

      timeout = setTimeout(() => {
        setMostrarMensaje(false);
      }, 2000);
    }

    if(usuarioReg.admin!==true)
      setMostrarMensaje(false);

    return () => clearTimeout(timeout);
  }, [mostrarCarrito, reserva]);
  

  onAuthStateChanged(auth, (user) => {
    if (user) {
        Cookies.set("emailToken", user.email, { expires: 8, secure: true });
        dispatch(setUsuario(user.email))

      // User is signed in, see docs for a list of available properties
      //console.log(user.email);
      // ...
    }
  });

  // Función para agregar la reserva al carrito
  const agregarAlCarrito = (nuevaReserva) => {
    setReserva(nuevaReserva);
    setMostrarCarrito(true);
  };

  // Función para ocultar el carrito
  const ocultarCarrito = () => {
    setMostrarCarrito(false);
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/hoteleternotermal/", "_blank");
  };
  const handleTwitterClick = () => {
    window.open("https://twitter.com/Hoteltereterno", "_blank");
  };
  const handleFacebookClick = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=100093402330219",
      "_blank"
    );
  };

  const handleLogOut = async() => {
    if (usuario){
      await auth.signOut();
      Cookies.remove('emailToken');
      localStorage.clear();
    }
    Cookies.remove('token');
    Cookies.remove('emailToken');
    dispatch(deleteUsuario());
    dispatch(deleteStateResenaAndUserArr());
    localStorage.clear();
    
  };
  useEffect(()=>{
    if(usuario!==undefined) dispatch(getUsuariobyEmail(usuario))

  }
  , [usuario])

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className={style.contenedor} variant="dark">
      <Container>
      <Navbar.Brand className="logo" href="#home">
      <img className={style.imagen} src={imagen} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle className={style.navHotel} aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

      <Nav className={style.navHotel}>
        {location.pathname !== "/" && usuarioReg.admin !== true &&         
          <Link className={style.link} to='/'>Inicio</Link>          
        }  
          <div className={style.dropdown} > 
            {usuarioReg.admin === true &&                         
              <Link className={style.link} >Administrar</Link> 
            } 
       
            <div className={style.dropdowncontent}>
              <Link className={style.link} to='/adminHabitaciones'>Habitaciones</Link>
              <Link className={style.link} to='/adminPaquetes'>Paquetes</Link>
              <Link className={style.link} to='/adminServicios'>Servicios</Link>
              <Link className={style.link} to='/adminUsuarios'>Usuarios</Link>
            </div>
          </div>   
          <div className={style.dropdown} > 
            {usuarioReg.admin === true &&                         
              <Link className={style.link} >Indicadores</Link> 
            } 
            <div className={style.dropdowncontent}>
              <Link className={style.link} to='/indicadorReservas'>Reservas</Link>
              <Link className={style.link} to='/indicadorReclamos'>Reclamos</Link>
              <Link className={style.link} to='/indicadorUsuarios'>Usuarios</Link>
            </div>
          </div> 
          <div className={style.dropdown} >     
          {usuarioReg.admin !== true &&                         
            <Link className={style.link} >El hotel</Link>   
          }         
            <div className={style.dropdowncontent}>
              <Link className={style.link} to='/historia'>Historia</Link>
              <Link className={style.link} to='/filosofia'>Filosofía</Link>
              <Link className={style.link} to='/bienestar'>Bienestar</Link>
            </div>
          </div> 
          {usuarioReg.admin !== true &&                 
            <Link className={style.link} to='/paquetes'>Paquetes</Link>
          } 
                
          {usuarioReg.admin !== true &&                 
            <Link className={style.link} to='/contacto'>Contacto</Link>
          } 

          <Nav.Item  href="#" onClick={handleInstagramClick} className={style.icon}><FontAwesomeIcon icon={faInstagram} /></Nav.Item>
          <Nav.Item  href="#" onClick={handleFacebookClick} className={style.icon}><FontAwesomeIcon icon={faFacebook} /></Nav.Item>
          <Nav.Item  href="#" onClick={handleTwitterClick} className={style.icon}><FontAwesomeIcon icon={faTwitter} /></Nav.Item>
          <Link  to='/reserva' className={style.button}>RESERVAR AHORA</Link>
        
        
         

          
        
          <button className={style.carrito} onClick={() => {
            if (mostrarCarrito) {
              setMostrarCarrito(false);
              setMostrarMensaje(false); // Restablecer el estado de mostrarMensaje al ocultar el carrito
            } else {
              setMostrarCarrito(true);
                    }
          }}>
            {/* Agrega el botón para mostrar el carrito */}
            {usuarioReg.admin !== true && (
              <Link className={style.carritolink} to="/detallereserva">
                <FontAwesomeIcon icon={faCartPlus} />
              </Link>
            )}
          </button>

{/* Agrega el enlace al perfil de usuario */}
{usuario && (
  <Link className={style.linkusuario} to="/perfilUsuario">
    <div className={style.iconContainer}>
      {usuarioArray.image && usuarioArray.image.length > 0 ? (
        <FontAwesomeIcon className={style.imagenusuario} icon={faUser} />
      ) : (
        <FontAwesomeIcon className={style.imagenusuario} icon={faUser} />
      )}
      <h4 className={style.perfilusuario}>{usuarioArray?.nombre}</h4>
    </div>
  </Link>
)}


{mostrarCarrito ? (
  reserva ? (
    <Carrito reserva={reserva} />
  ) : (
    mostrarMensaje && <div className={style.contenedormensaje}><p className={style.mensajeee}>Aun no posee Reservas</p></div>
  )
) : null}
{usuario === undefined &&
  <Link className={style.linksesion} to='/contenedor'>Iniciar sesión</Link>
}
{usuario !== undefined &&
          <Link className={style.linksesion} onClick={handleLogOut}>Cerrar sesión</Link>
        }







        
          
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;
