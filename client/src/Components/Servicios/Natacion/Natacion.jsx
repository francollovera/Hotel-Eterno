import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './iamge1.jpg'
import image2 from './image2.jpg'
import image3 from './image3.jpg'
import image4 from './image4.jpg'
import image5 from './image5.jpg'
import { Link } from 'react-router-dom';

import style from './Natacion.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faTemperatureLow, faSwimmer } from '@fortawesome/free-solid-svg-icons';

const Natacion = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={style.containertotal}>
      <NavBar></NavBar>
      <Link  to="/">
          <button className={style.closeButton} >
            X
          </button>
        </Link>
      <section >
      <h1 className={style.titulo}>Natacion</h1>
        <div className={style.texto}>
        
       
          <p>
          Aprender a nadar debe ser una prioridad para todas<br></br>
           las familias. Es una destreza importante que puede<br></br>
            jugar un papel esencial para ayudar a los niños <br></br>
            a prevenir las tragedias, y brindar una diversion <br></br>
            y entretenimiento sano. Los niños, y sus padres <br></br>
            necesitan aprender a nadar para ayudar a que el<br></br>
             tiempo que pasen en el agua sea seguro y divertido.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faTree} /></div>
      
     
      
    </div>
      <p>En medio de árboles nativos pueden disfrutar <br></br>
      clases personalizadas con nuestro panel de <br></br>
      educadores profesional, con todo el apoyo y <br></br>
      la mejor tecnica para que los niños y los <br></br>
      adultos puedan ademas de disfrutar una <br></br>
      estancia unica, obtener un aprendizaje<br></br>
       especializado y unico..</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}><FontAwesomeIcon icon={faTemperatureLow} /></div>
      <p>La temperatura de las piscinas, oscila <br></br>
      entre los 35 y 40 grados celsius. El <br></br>
      recambio de agua es permanente ya que su<br></br>
       fuente es de origen 100% termal.</p>
    </div>
  
  
    <div className={style.center}>
    <div className={style.image3}><FontAwesomeIcon icon={faSwimmer} /></div>
     
      <p>Estas piscinas pueden ser utilizadas por nuestros<br></br>
       huéspedes, visitantes y miembros del club de socios.<br></br> 
        Quienes se hospeden en nuestro hotel, pueden <br></br> 
        disfrutar de estas instalaciones hasta las<br></br> 
         22:00 horas todos los días, durante toda su<br></br> 
          estadía.</p>
    </div>
    </div>
        
        </section>
      <div 
      className="container w-100">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image1}
              alt="First slide"
              width={"100%"}
              height={"750px"}
            />
            
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image2}
              alt="First slide"
              width="100%"
              height="750px"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image3}
              alt="First slide"
              width="100%"
              height="750px"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image4}
              alt="First slide"
              width="100%"
              height="750px"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image5}
              alt="First slide"
              width="100%"
              height="750px"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
         
        </Carousel>
      </div>
      
      <div className={style.espacio}></div>
        <FooterBar className={style.footer} />
      
      
    </div>
  );
};

export default Natacion;
