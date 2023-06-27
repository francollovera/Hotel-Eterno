import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Habitacion5.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../../Paginate/Paginate';
import { set_Currents_Page, getHabitaciones } from '../../redux/action';
import { useEffect } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Habitacion1 = () => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const habitaciones = useSelector((state) => state.gethabitaciones);
  const [currentPage, setCurrentPage] = useState(5);
  const habsPerPage = 1;
  const indexofLastRoom = currentPage * habsPerPage;
  const indexofFirstRoom = indexofLastRoom - habsPerPage;

  const imagenes = useSelector(state => state.gethabitaciones[4]);

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
      <h1 className={style.titulo}>Suite Rio</h1>
        <div className={style.texto}>
        
       
          <p>
          Con lindas vistas hacia el río, el bosque, y en medio<br></br>
           de un entorno natural único, nuestras habitaciones<br></br> 
            destacan por su acogedor entorno, luminosidad y<br></br> 
             decoración con cálidos materiales y elementos sureños. <br></br> 
             Queremos que tengas la más cómoda y acogedora estadía.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>Posee 3 habitaciones, dos con cama súper King <br></br>
      y baño privado, una habitación mansarda con 3 <br></br>
      camas de 1 plaza. Cuenta con: 4 ambientes, vistas<br></br>
       frente al río y bosque, living con mesa de desayuno,<br></br>
        pileta termal dentro del living rodeada de<br></br>
         cristales con vistas al río, jardín privado,<br></br>
          minibar, teléfono, caja de seguridad, <br></br>
          TV cable, desayuno buffet y batas.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Este tipo de habitación se encuentra disponible para <br></br>un máximo de siete personas.</p>
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
        <div >
            <h2 className={style.caracteristicastitulo}>Incluye</h2>
            </div>
        <section className={style.caracteristicas}>
          
          
          <ul>
            <li>Cama Super King</li>
            <li>Baño Privado</li>
            <li>1 Habitacion con 3 camas de un plaza</li>
            <li>Pileta termal en el living</li>
            <li>Vista al rio</li>
            <li>Jardin privado</li>
            <li>Minibar</li>
            <li>TV por cable</li>
            <li>Telefono</li>
            <li>Caja de Seguridad</li>
          </ul>
        </section>

        <Paginado gamesPerPage={habsPerPage} habitaciones={habitaciones.length} paginado={setCurrentPage} currentPage={currentPage} />
        <FooterBar className={style.footer} />      
    </div>
  );
};

export default Habitacion1;
