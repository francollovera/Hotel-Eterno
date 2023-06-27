import React from 'react';
import style from './ContenedorLogin.module.css';
import { Link } from 'react-router-dom';

function ContenedorLogin() {
  const handleClose = () => {
    // Acciones a realizar al hacer clic en el botón de cerrar
    console.log('Cerrar');
  };

  return (
  
      <div className={style.container}>
          <div className={style.contenedor}>
      <Link className={style.linkContainer} to="/">
        <button className={style.botoncerrar} onClick={handleClose}>
          X
        </button>
      </Link>
        <div className={style.encierro}>
          <Link to="/ingresar">
            <button className={style.button}>
              Ingresar
            </button>
          </Link>
          <Link to="/registrarse">
            <button className={style.button}>
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContenedorLogin;
