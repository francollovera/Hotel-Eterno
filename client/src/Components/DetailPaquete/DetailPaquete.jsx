import React, { useState, useEffect } from 'react';
import style from "./DetailPaquete.module.css";
import NavBar from '../NavBar/NavBar';
import { useParams } from "react-router-dom";
import FooterBar from '../FooterBar/FooterBar'
import { Link } from "react-router-dom";
import { getPaqueteById } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from "react-bootstrap/Carousel";



function DetailPaquete() {
  const { id } = useParams();
  let detallePaquete = useSelector((state) => state.paqueteXid);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaqueteById(id));
  }, [dispatch])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let ArrayImagen = [];
  let urlImage = "";
  const renderPaquetes = () => {
    if (Array.isArray(detallePaquete)) {
      return detallePaquete.map((pack) => {
        ArrayImagen = pack.image;
        if (ArrayImagen) {
          ArrayImagen.map((img) => {
            urlImage = img;
          })
        }
        return (
          // <div className={style.container}>
          <div className={style.container}>

            <div className="container w-20" >
              {pack.image.length && <Carousel onSelect={handleSelect}>
                {pack.image.map(imagen => {
                  return (
                    <Carousel.Item>
                      <img

                        className="d-block w-20"
                        src={imagen}
                        alt="Slide"
                        width="100%"
                        height="580px"
                      />

                      <Carousel.Caption>

                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })}
              </Carousel>}
            </div >
            <h2 className={style.title} >{pack.nombre}</h2>
            <p>{pack.desc} </p>
            <h4>Costo: {pack.costo}</h4>
            <Link className={style.link} to='/paquetes'>PAQUETES</Link>

          </div>
        );
      });
    }
  };
  return (
    <div className={style.body}>
      <NavBar />
      <div >{renderPaquetes()}</div>
      <br></br>
      <br></br>
      <FooterBar />
    </div>


  );
}

export default DetailPaquete;
