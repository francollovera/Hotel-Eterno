import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider,signInWithPopup,sendEmailVerification  } from "firebase/auth";
import { auth } from "../Loging/firebase";
import style from './Login2.module.css';
import { Link } from 'react-router-dom';
import validate from './validate';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setUsuario,getUsuarioByCorreo,getReservaByUsuario , getUsuariobyEmail, getResenaUsuario} from '../redux/action';
import foto from './logo gogle.png'
import Cookies from 'js-cookie';
import axios from "axios";
function Login2() {
  const token = Cookies.get('token');
  const usuario = useSelector(state => state.usuario);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
   
  const [form, setForm] = useState({correo:"",contraseña:""});
  const [errors, setErrors] = useState({count: 1});
  let usuarioReg = useSelector((state) => state.usuarioXid);

  useEffect(() => { 
    if (usuario)  {
      dispatch(getResenaUsuario(usuario))
        dispatch(getUsuariobyEmail(usuario))
        dispatch(getReservaByUsuario(usuario))
    }  
        
  }, [dispatch, usuario])
  function changeHandler(e){  
    const property = e.target.name;
    const value = e.target.value;
    setForm({...form, [property]:value});
    setErrors(validate({...form, [property]:value}));
    return;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider)
      //console.log(credentials);
      const user={
        correo:credentials.user.email,
        nombre:credentials.user.displayName  
      }
      const {userGoogle}= await axios.post("/auth/registro/google", {
    "correo":user.correo,
    "nombre":user.nombre
}); 
      //console.log(userGoogle);
      
  //     const userCurrent = auth.currentUser;
  //     if(!userCurrent.emailVerified){
  //        sendEmailVerification(auth.currentUser)
  // .then(() => {
  //   console.log("verification");
  //   // Email verification sent!
  //   // ...
  // });
  //     }
     
  const {data}= await axios.post("/payment/custumer", {
    correo:user.correo,
    nombre:user.nombre
}); 
    window.localStorage.setItem("client", JSON.stringify(data.custumer));
     
  //   if (userCurrent && userCurrent.emailVerified) {
  //       dispatch(setUsuario(user.correo));
  //       console.log(userCurrent.emailVerified);
  //   // El correo electrónico ha sido verificado
  // } else { 
  //   navigate("/")
  //   // El correo electrónico no ha sido verificado
  // }
  
     
        //console.log(data.custumer);
      if(window.localStorage.getItem("dataReservation")){       
        if(usuarioReg.admin !== true ){
          navigate("/detalleReserva");
        }else{
          navigate("/")
        } 
      }else{
        navigate("/")
      }
      
      // Close the login modal
      //const modalInstance = bootstrap.Modal.getInstance(googleButton.closest('.modal'));
      //modalInstance.hide();
      // show welcome message
      //showMessage("Welcome " + credentials.user.displayName);
    } catch (error) {
      console.log(error);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
      
    
    // Aquí puedes realizar acciones con los datos enviados, como enviarlos a un servidor
    // Envío de datos al servidor
    fetch('https://hotelreservation-production.up.railway.app/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    correo: form.correo,
    contraseña: form.contraseña
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})

  .then(response => {
    if (response.ok) {
      
      return response.json(); // Devolver la promesa
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  })
  .then(data => {
    const user = {
      email: form.correo,
      name: data.usuario,
      token:data.token
    };

      const COOKIE_NAME = 'token';
      const COOKIE_EMAIL = 'emailToken';
      Cookies.set(COOKIE_NAME, user.token, { expires: 8, secure: true });
      Cookies.set(COOKIE_EMAIL, user.email, { expires: 8, secure: true });

    
      
    
    dispatch(setUsuario(form.correo));
    fetch("https://hotelreservation-production.up.railway.app/payment/custumer", {
        method: 'POST',
        body: JSON.stringify({correo:user.email,nombre:data.usuario}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        return  response.json()
        
      })
      .then(data => {
        console.log(data);
        window.localStorage.setItem("client", JSON.stringify(data.custumer));
      })

    if (window.localStorage.getItem('dataReservation')) {
      if(usuarioReg.admin !== true ){
        navigate("/detalleReserva");
      }else{
        navigate("/")
      }
    } else {
      navigate("/");
    }
  })
  .catch(error => {
    alert("Se produjo un error: " + error.message);
  })
}

  return (
    <div className={style.contenedor}>
      <Link className={style.linkContainer} to="/contenedor">
        <button className={style.botoncerrar} onClick={handleClose}>
          X
        </button>
      </Link>
      <div className={style.tamano}>
        <h3 className={style.title}>Ingresar</h3>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="correo" className={style.label}>
              Correo Electrónico:
            </label>
            <input
              type="email"
              name="correo"
              className={style.input}
              value={form.correo}
              onChange={changeHandler}
            />
            {errors.correo && <p>{errors.correo}</p>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="contraseña" className={style.label}>
              Contraseña:
            </label>
            <input
              type="password"
              name="contraseña"
              className={style.input}
              value={form.contraseña}
              onChange={changeHandler}
            />
            {errors.contraseña && <p>{errors.contraseña}</p>}
          </div>
          {errors.count < 1 ? (
						<button type="submit" className={style.button}>
							Enviar
						</button>
					) : (
						<button type="submit" disabled className={style.button}>
							Enviar
						</button>
					)} 
          <button type="button" onClick={handleLogin} className={style.buttongoogle}>
        Ingresar con Google
        <img src={foto} alt="Google logo" className={style.googleicon}/>
        
        </button>
        </form>
        
        
        
      </div>
    </div>
  );
}

export default Login2;
