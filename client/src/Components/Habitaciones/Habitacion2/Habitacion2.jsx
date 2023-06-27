import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import style from './Habitacion2.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';
import Paginado from '../../Paginate/Paginate';
import { set_Currents_Page, getHabitaciones } from '../../redux/action';
import { useEffect } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Habitacion2 = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const habitaciones = useSelector((state) => state.gethabitaciones);
  const [currentPage, setCurrentPage] = useState(2);
  const habsPerPage = 1;
  const indexofLastRoom = currentPage * habsPerPage;
  const indexofFirstRoom = indexofLastRoom - habsPerPage;

  const imagenes = useSelector(state => state.gethabitaciones[1]);

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
      <h1 className={style.titulo}>Suite Canell</h1>
        <div className={style.texto}>
        
       
          <p>
          Con una cómoda tinaja privada a los pies del río,<br></br>  vistas hacia el bosque,y en medio de un entorno<br></br>  natural único, suite Canell destaca por por su acogedor<br></br>  entorno, 2 ambientes, luminosidad y decoración con <br></br>cálidos materiales y elementos sureños.<br></br> Queremos que tengas la más cómoda y acogedora estadía.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>Esta habitación posee cama súper King,<br></br> cama Nido y/o camas adicionales. Cuenta con<br></br> terraza y salida directa al río Liucura, vistas al<br></br> bosque, caja de seguridad, aire acondicionado y<br></br> calefacción termal, Tv cable,<br></br> batas, desayuno buffet y teléfono.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Este tipo de habitación se encuentra disponible <br></br>para un máximo de 4 personas.</p>
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
            <li>Vistas panorámicas</li>
            <li>Aire Acondicionado</li>
            <li>Calefaccion termal</li>
            <li>Cama Super King</li>
            <li>Hidromasaje</li>
            <li>Telefono</li>
            <li>Salida al rio</li>
            <li>Terraza</li>
            <li>Caja de Seguridad</li>
            <li>TV por cable</li>
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

export default Habitacion2;
