import React from "react";
import style from "./Bienestar.module.css";
import NavBar from '../NavBar/NavBar';
import Imagen from "./img/yoga.jpg";
import Imagen1 from "./img/natacion.jpg";
import FooterBar from '../FooterBar/FooterBar'




function Bienestar() {
  
  return (
    
    <div className={style.body}>
    <NavBar />   
    <div className={style.container}>  
      <img src={Imagen} className={style.Image}  alt="yoga" ></img> 
      <h2 className={style.title} >Yoga</h2>  
      <div className={style.centerleft}></div>  
      <p className={style.parrafo1}>
      Ofrecemos clases de Yoga que nos ayuda a relajarnos,<br></br>
      a reducir el estrés, a mejorar nuestra concentración y <br></br>
      nos ayuda a mejorar la confianza en uno mismo.Contamos<br></br>
       con profesionales especializados en el tema. Nada <br></br>
       mejor que iniciar el día con estas clases.</p>
    
    </div>
   
    <div className={style.container}>  
    <h2 className={style.title2} >Natación</h2>  
      <div className={style.centerleft}></div>  
      <p className={style.parrafo2}>
      Este es un deporte que también ofrecemos ya que contamos<br></br>
       con una enorme piscina y con profesionales que se encuentran <br></br>
       disponibles para impartir sus conocimientos con las personas<br></br>
        que aún no saben nadar. Además la natación nos permite<br></br>
         mejorar la capacidad cardiorrespiratoria, la fuerza, la<br></br>
          resistencia y la elasticidad. </p>
      <img src={Imagen1} className={style.Image}  alt="natación" ></img> 
    </div>
    <FooterBar/>
</div>
  
    
  );
}

export default Bienestar;
