import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import style from './VillaTilo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../../Paginate/Paginate';
import { getHabitaciones, set_Currents_Page } from '../../redux/action';
import { useEffect } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Habitacion1 = () => {
  const [index, setIndex] = useState(0);
  
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const habitaciones = useSelector((state) => state.gethabitaciones);
  const [currentPage, setCurrentPage] = useState(7);
  const habsPerPage = 1;
  const indexofLastRoom = currentPage * habsPerPage;
  const indexofFirstRoom = indexofLastRoom - habsPerPage;

  const imagenes = useSelector(state => state.gethabitaciones[6]);

  useEffect(() => {
    if (!imagenes) {
      dispatch(getHabitaciones());
    }
  }, []);

  useEffect(() => {
    dispatch(set_Currents_Page(currentPage));
  }, [dispatch, currentPage]);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 900, // Duración de la animación en milisegundos
      smooth: true, // Desplazamiento suave habilitado
    });
  };

  return (
    <div className={style.containertotal}>
      <NavBar></NavBar>
      <section >
      <h1 className={style.titulo}>Villa Tilo</h1>
        <div className={style.texto}>
        
       
          <p>
          Esta cabaña, totalmente independiente, amplia<br></br>
           y confortable, se encuentra rodeada por tilos,<br></br>
            que brindan abundante sombra y que en otoño<br></br>
             impactan con sus hojas amarillas. Está elevada<br></br>
              sobre pilares de madera dura, por lo que las<br></br>
               vistas desde su balcón son increíbles.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>Cuenta con dormitorio matrimonial, baño con<br></br> 
      lavatorio en antebaño, living-comedor, cocina <br></br>
      semi separada y entrepiso en balcón hacia el <br></br>
      living con dos camas simples y una cama marinera.<br></br>
       Además, puede ubicarse una cuna a voluntad.<br></br>
       Dispone de estacionamiento techado, para <br></br>
       protección de un vehículo contra granizo.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Este tipo de habitación se encuentra disponible para <br></br>un máximo de seis personas.</p>
    </div>
  
  
    <div className={style.center}>
    <div className={style.image3}>< FontAwesomeIcon icon={faMoneyBill} /></div>
     
      <p>Revisa el detalle de los valores de esta habitación en <br></br>nuestra política de precios y estadía en nuestro<br></br> Centro de Ayuda.</p>
    </div>
    </div>
        
        </section>
      <div 
      className="container w-100">
        {imagenes && 
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {imagenes.image.map(imagen => {
            return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imagen}
                alt="Slide"
                width="100%"
                height="750px"
              />
              <Carousel.Caption>
                {/* <h3>Second slide label</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption> 
            </Carousel.Item> 
            )
          })}
        </Carousel>
        }
      </div>
      
        <div >
            <h2 className={style.caracteristicastitulo}>Incluye</h2>
            </div>
        <section className={style.caracteristicas}>
          
        
          <ul>
            <li>Cama Super King</li>
            <li>Calefacción de tiro balanceado</li>
            <li>Cocina de cuatro hornallas con horno</li>
            <li> Vajilla completa</li>
            <li>Cocina de cuatro hornallas con horno</li>
            <li>Heladera</li>
            <li>Microondas</li>
            <li>TV satelital LED 32</li>
            <li>TV por cable</li>
            <li>Ropa blanca</li>
            <li>Bañeritas, sillitas altas y cuna para bebés</li>
          </ul>
        </section>
        <Link
        to="top"
        spy={true}
        smooth={true}
        duration={500}
        className={`${style.scroll} ${isVisible ? style.show : ""}`}
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Link>

        <Paginado gamesPerPage={habsPerPage} habitaciones={habitaciones.length} paginado={setCurrentPage} currentPage={currentPage} />
        <FooterBar className={style.footer} />
    </div>
  );
};

export default Habitacion1;
