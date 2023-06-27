import React from 'react';
import {Link} from 'react-router-dom';
import style from './Error.module.css';

const Error = ()=>{

    return(
        <div className={style.container}>
            <div className={style.container1}>
            <Link to={'/'} className={style.link}>Ir a Home</Link>
            <p >¡Error! la ruta solicitada no existe...</p>
            <img src={"https://res.cloudinary.com/djm04ajb0/image/upload/v1687132141/usuarioImage/qoyjtw4lbrrmpjeq5amm.png"} alt={'img Alert'}  />
            </div>
        </div>
    )
}
export default Error;
