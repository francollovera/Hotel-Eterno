import React, { useState } from 'react';
import style from './Login.module.css';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import validate from './validate';
import NavBar from '../NavBar/NavBar';

function Login() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [usuarioCreado, setUsuarioCreado] = useState(false); // Estado para controlar si el usuario se ha creado exitosamente

  const [form,setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    telefono: ""
  });

  const [validatePass, setValidatePass] = useState("");

  const [errors, setErrors] = useState({count: 1});

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

  const handlerValidatePasswordChange = (e) => {
    setValidatePass(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos enviados, como enviarlos a un servidor
    // Envío de datos al servidor
    fetch('https://hotelreservation-production.up.railway.app/auth/registro', {
      method: 'POST',
      body: JSON.stringify({
        nombre: form.nombre,
        correo: form.correo,
        contraseña: form.contraseña,
        telefono: form.telefono
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Manejar la respuesta del servidor
        if (response.ok) {
          setUsuarioCreado(true); // Actualizar el estado para indicar que el usuario se ha creado exitosamente
          navigate("/ingresar");
        }
      })
      .catch(error => {
        // Manejar errores
        alert("Se produjo un error: " + error.message);
      });

      if (usuarioCreado) {
        setForm({
          nombre: "",
          correo: "",
          contraseña: "",
          telefono: ""
        });
        setErrors({count: 1});
      }
  };

  return (
    <div className={style.contenedor}>
      <Link className={style.linkContainer} to="/contenedor">
        <button className={style.botoncerrar} onClick={handleClose}>
          X
        </button>
      </Link>
      <div className={style.tamano}>
        <h3 className={style.title}>Crear Nueva Cuenta</h3>
        {usuarioCreado && <div className={style.mensajeExito}>Usuario creado con éxito</div>}
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="nombre" className={style.label}>
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              className={style.input}
              value={form.nombre}
              onChange={changeHandler}
              
            />
            {errors.nombre && <p>{errors.nombre}</p>}
          </div>
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
          <div className={style.formGroup}>
            <label htmlFor="validarContraseña" className={style.label}>
              Validar contraseña:
            </label>
            <input
              type="password"
              name="validarContraseña"
              className={style.input}
              value={validatePass}
              onChange={handlerValidatePasswordChange}
            />
            {validatePass !== form.contraseña && <p>Las contraseñas no son iguales</p>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="telefono" className={style.label}>
              Teléfono:
            </label>
            <input
              type="tel"
              name="telefono"
              className={style.input}
              value={form.telefono}
              onChange={changeHandler}
            
            />
            {errors.telefono && <p>{errors.telefono}</p>}
          </div>
          {errors.count < 1 && validatePass === form.contraseña ? (
						<button type="submit" className={style.button}>
							Enviar
						</button>
					) : (
						<button type="submit" disabled className={style.button}>
							Enviar
						</button>
					)}
        </form>
      </div>
    </div>
  );
}

export default Login;