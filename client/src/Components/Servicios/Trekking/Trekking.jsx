import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './imagenes/image1.jpg'
import image2 from './imagenes/image2.jpg'
import image3 from './imagenes/image3.jpg'
import image4 from './imagenes/image4.jpg'
import image5 from './imagenes/image5.jpg'
import image6 from './imagenes/image6.jpg'
import style from './Trekking.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHippo, faRunning, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



const Trekking = () => {
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
      <h1 className={style.titulo}>Trekking</h1>
        <div className={style.texto}>
        
       
          <p>
          Con senderos autoguiados, podrás recorrer 300 <br></br>
          hectáreas en las que te rodearás de flora <br></br>
          endémica y especies como el maqui, coigües, <br></br>
          hualles, ligues y maitenes, además de sorprenderte <br></br>
          con el avistamiento de aves como el carpintero <br></br>
          negro, chucao, martín pescador y pato cortacorrientes.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}> <FontAwesomeIcon icon={faHippo} /></div>
      
     
      
    </div>
      <p>En 300 hectáreas de bosque endémico a recorrer, podrás <br></br>
      escuchar el sonido del viento entre la copa de los árboles,<br></br>
       el canto del chucao y avistar especies increíbles en <br></br>
       medio de su hábitat como el carpintero negro y martín<br></br>
        pescador.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}><FontAwesomeIcon icon={faRunning} /></div>
      <p>Esta actividad es autoguiada, por lo que sólo debes <br></br>
      programar tus tiempos mientras te encuentres en Huife y<br></br>
       así aprovechar al máximo de la excursión.</p>
    </div>
  
  
    <div className={style.center}>
    <div className={style.image3}><FontAwesomeIcon icon={faExclamationTriangle} /></div>
     
      <p>Actividad no guiada. Se recomienda seguir senderos demarcados.</p>
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
        </Carousel>
      </div>
      <div className={style.espacio}></div>
      
        <FooterBar className={style.footer} />
      
      
    </div>
  );
};

export default Trekking;
