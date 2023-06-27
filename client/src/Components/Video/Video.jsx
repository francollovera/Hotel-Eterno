import React from 'react';
import style from './Video.module.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const videoUrl = 'https://res.cloudinary.com/dmpbajdrk/video/upload/v1686278066/vhqhlp6bv7u1uvwerlkh.mp4';

const VideoPlayer = () => {
  return (
    <Container className={style.containerVideo} style={{ position: "relative", bottom: "86.3px", margin: '0' , padding: 0}}>
      <div>
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className={style.video}
          style={{ clipPath: "inset(10% 0 10% 0)" }}
        />
        <div className={style.overlay}>
          <div className={style.overlayContent + " text-white mt-5 mb-5 text-left pl-3"}>
          <h2  className={ style.overlay + "text-white mt-5  text-left"} >La experiencia de<br></br> Eterno te revitaliza!</h2>
          <h3 className={style.overlay + "text-white  text-left"}  >¡Descubre la belleza y la tranquilidad de la montaña en<br></br> nuestro hotel único!
              Imagina despertar cada mañana con<br></br> vistas panorámicas de majestuosas montañas, respirar el<br></br> aire fresco y puro mientras te relajas en nuestro entorno<br></br> natural y disfrutar de actividades<br></br>  emocionantes al aire libre.</h3>
           
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VideoPlayer;