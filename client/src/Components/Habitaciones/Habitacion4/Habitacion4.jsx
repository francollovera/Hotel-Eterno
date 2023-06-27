import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import style from './Habitacion4.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../../Paginate/Paginate';
import { getHabitaciones, set_Currents_Page } from '../../redux/action';
import { useEffect } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Habitacion1 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const habitaciones = useSelector((state) => state.gethabitaciones);
  const [currentPage, setCurrentPage] = useState(4);
  const habsPerPage = 1;
  const indexofLastRoom = currentPage * habsPerPage;
  const indexofFirstRoom = indexofLastRoom - habsPerPage;

  const imagenes = useSelector(state => state.gethabitaciones[3]);

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
      <h1 className={style.titulo}>Suite Bosque</h1>
        <div className={style.texto}>
        
       
          <p>
          Con lindas vistas hacia el bosque, y en medio de un <br></br>
          entorno natural único, nuestras habitaciones destacan <br></br>
          por su acogedor entorno, luminosidad y decoración con<br></br>
           cálidos materiales y elementos sureños. Queremos que <br></br>
           tengas la más cómoda y acogedora estadía.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>Posee 1 habitación con cama súper King, <br></br>
      Tv cable y baño en suite con ducha de agua termal,<br></br>
       1 habitación con dos camas de una plaza, dos baños,<br></br>
        uno con bañera de agua termal y el segundo con <br></br>
        ducha de agua termal, living con cama Nido <br></br>
        (para 2 personas), futón para una persona, mesa<br></br>
         de desayuno, TV cable, caja de seguridad, minibar,<br></br>
          jardín privado, batas, desayuno buffet y vistas <br></br>
          al bosque.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Este tipo de habitación se encuentra disponible para <br></br>un máximo de sieste personas.</p>
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
          <ul>
            <li>Vistas al Bosque</li>
            <li>TV por cable</li>
            <li>Cama Super King</li>
            <li>Baño de agua termal</li>
            <li>Living con cama nido</li>
            <li>MiniBar</li>
            <li>Caja de seguridad</li>
            <li>Jardin privado</li>
            <li>Batas</li>

          </ul>
        </section>

        <div className={style.containerlink}><a className={style.linka} href="#">Ver disponibilidad</a></div>
        <Paginado gamesPerPage={habsPerPage} habitaciones={habitaciones.length} paginado={setCurrentPage} currentPage={currentPage} />
        <FooterBar className={style.footer} />
    </div>
  );
};

export default Habitacion1;
