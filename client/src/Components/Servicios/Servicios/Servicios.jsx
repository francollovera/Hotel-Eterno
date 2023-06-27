import React from "react";
import { Link } from "react-router-dom";
import styles from "./Servicios.module.css";
import image1 from './imagenes/image1.png'
import image2 from './imagenes/image2.jpg'
import image3 from  "./imagenes/image3.jpg"
import image4 from  "./imagenes/image4.jpg"

const Servicios = () => {
  return (
    
    <>
        
          <div className={styles.container}>
        
          <div >
          <h2 className={styles.titulo}>Descubre<br></br> Nuestros<br></br> Programas</h2>
          </div>
      <div className={styles.buttonContainer1}>
        <Link to="/piscina"  className={styles.button}>
          <img src={image2} alt="Imagen 1" />
          <span className={styles.text} >Piscinas Termales con<br />temperaturas entre 35<br />y 40 grados</span>
        </Link>
      </div>
      <div className={styles.buttonContainer2}>
        <Link to="/trekking" className={styles.button}>
          <img src={image1} alt="Imagen 2" />
          <span className={styles.text}>Trekking</span>
        </Link>
      </div>
      <div className={styles.buttonContainer2}>
        <Link to="/yoga" className={styles.button}>
          <img src={image3} alt="Imagen 2" />
          <span className={styles.text}>Yoga en el <br></br>
          fondo de la naturaleza
        </span>
        </Link>
      </div>
      <div className={styles.buttonContainer2}>
        <Link to="/natacion" className={styles.button}>
          <img src={image4} alt="Imagen 2" />
          <span className={styles.text}>Clases de<br></br>
          natacion
        </span>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Servicios;

