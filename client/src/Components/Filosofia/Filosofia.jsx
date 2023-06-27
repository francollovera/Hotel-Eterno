import React from "react";
import style from "./Filosofia.module.css";
import NavBar from '../NavBar/NavBar';
import Imagen from "./img/filosofia.jpg";
import FooterBar from '../FooterBar/FooterBar'


function Filosofia() {
  
  return (
    
    <div className={style.body}>
    <NavBar />   
    <div className={style.container}>  
      <img src={Imagen} className={style.Image}  alt="puesta-del-sol" ></img> 
      <h2 className={style.title} >Filosofía</h2>  
      <div className={style.centerleft}></div>  
      <p>Nuestro logo nos identifica con las montañas y detras de ellas esta la puesta al sol, este es el panorama que uno puede apreciar desde las instalaciones del hotel. Definitivamente los atardeceres en el Eterno son fantásticas porque te transmiten calma y una profunda plenitud. En el Eterno estamos enfocados en la calidad de vida y en conectarnos con nosotros mismos, nos gusta la comida natural y saludable, estar rodeados de un ambiente sano y exuberante, amar, reír y jugar, y vivir el presente a ritmo pausado. Pero también recorrer las montañas, los nevados y practicar uno de los deportes mas completos que es la natación.</p>
    </div>
    <FooterBar/>
</div>
      
    
  );
}

export default Filosofia;
