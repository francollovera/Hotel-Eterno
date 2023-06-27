import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar";
import FooterBar from "../../FooterBar/FooterBar";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Habitacion1.module.css";
import { Link, animateScroll as scroll } from "react-scroll";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faMoneyBill,
  faPersonBooth,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../../Paginate/Paginate";
import { set_Currents_Page, getHabitaciones } from "../../redux/action";

const Habitacion1 = () => {
  const dispatch = useDispatch();
  const habitaciones = useSelector((state) => state.gethabitaciones);
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const habsPerPage = 1;

  let imagenes = useSelector(state => state.gethabitaciones[0]);
  
  useEffect(() => {
    if (!imagenes) {
      dispatch(getHabitaciones());
    }
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(set_Currents_Page(currentPage));
  }, [dispatch, currentPage]);
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
      <section>
        <h1 className={style.titulo}>Suite Roma</h1>
        <div className={style.texto}>
          <p>
            Disfruta de la máxima comodidad en nuestra Suite Roma. <br></br>La
            habitación perfecta para relajarte y disfrutar de las <br></br>
            vistas panorámicas.
          </p>
        </div>
        

        <div className={style.container}>
          <h2 className={style.title}>Características</h2>

          <div className={style.centerleft}>
            <div>
              <div className={style.image1}>
                <FontAwesomeIcon icon={faBed} />
              </div>
            </div>
            <p>
              Esta habitación posee cama súper King con la posibilidad de{" "}
              <br></br>cama adicional, tina con agua termal, caja de seguridad,
              <br></br> minibar, aire acondicionado y calefacción termal, TV
              cable, batas,<br></br> mesa de desayuno, desayuno buffet,<br></br>{" "}
              teléfono, vistas al bosque y río.
            </p>
          </div>

          <div className={style.centerrigth}>
            <div className={style.image2}>
              <FontAwesomeIcon icon={faPersonBooth} />
            </div>
            <p>
              Este tipo de habitación se encuentra disponible para <br></br>un
              máximo de dos personas.
            </p>
          </div>

          <div className={style.center}>
            <div className={style.image3}>
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
            <p>
              Revisa el detalle de los valores de esta habitación en <br></br>
              nuestra política de precios y estadía en nuestro<br></br> Centro
              de Ayuda.
            </p>
          </div>
        </div>
      </section>

      <div className="container w-100">
        {imagenes && <Carousel activeIndex={index} onSelect={handleSelect}>
          {imagenes.image.map(imagen => {
            return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imagen}
                alt="Slide"
                width="100%"
                height="650px"
              />
              <Carousel.Caption>
                {/* <h3>Second slide label</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption> 
            </Carousel.Item> 
            )
          })}
        </Carousel>}
      </div>

      <div>
        <h2 className={style.caracteristicastitulo}>Incluye</h2>
      </div>
      <section className={style.caracteristicas}>
        <ul>
          <li>Vistas panorámicas</li>
          <li>Cama king-size</li>
          <li>Hidromasaje</li>
          <li>Chimenea</li>
          <li>TV de pantalla plana</li>
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

      <Paginado
        gamesPerPage={habsPerPage}
        habitaciones={habitaciones.length}
        paginado={setCurrentPage}
        currentPage={currentPage}
      />

      <FooterBar className={style.footer} />
    </div>
  );
};

export default Habitacion1;
