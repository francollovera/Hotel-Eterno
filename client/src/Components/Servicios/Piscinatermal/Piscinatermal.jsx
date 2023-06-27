import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './image1.jpg'
import image2 from './image2.jpg'
import image3 from './image3.jpg'
import image4 from './image4.jpg'
import image5 from './image5.jpg'
import image6 from './image6.jpg'
import image7 from './image7.jpg'
import image8 from './image8.jpg'
import style from './Piscinatermal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faTemperatureLow, faSwimmer } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Piscinatermal = () => {
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
      <h1 className={style.titulo}>Piscina Semitechada Hidroterapéutica</h1>
        <div className={style.texto}>
        
       
          <p>
          Nuestra piscina semi techada hidroterapéutica se encuentra<br></br>
           aislada de las piscinas exteriores y posee paneles de <br></br>
           vidrio que te permitirán tener vistas privilegiadas del<br></br>
            bosque nativo. Cuenta con hidromasajes, cama de burbujas,<br></br>
             masaje cervical, nado contra corriente y géiser. Su <br></br>
             propósito, es el de brindar relajo, confort y bienestar.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faTree} /></div>
      
     
      
    </div>
      <p>En medio de árboles nativos como coigües, lingues,<br></br>
       Maitenes y hualles, podrás descansar sumergido en <br></br> 
       la calidez del agua termal, escuchando el sonido <br></br> 
       del río y de noche, observando el inigualable y <br></br> 
       estrellado cielo sureño.</p>
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
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image6}
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
              src={image7}
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
              src={image8}
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

export default Piscinatermal;
