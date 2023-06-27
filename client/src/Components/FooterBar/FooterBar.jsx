import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import style from "./FooterBar.module.css";
import imagen from './logo hotel.png'

function FooterBar() {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hoteleternotermal/', '_blank');
  }
    const handleTwitterClick = () => {
    window.open('https://twitter.com/Hoteltereterno', '_blank');
  }
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100093402330219', '_blank');
  }
  return (
  
      <div className={style.footerBar}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={style.logo}>
                <img src={imagen} alt="Logo" />
              </div>
            </div>
            <div className="col-md-4">
              <div className={style.linkawesome}>
                <a href="#" onClick={handleFacebookClick}><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="#" onClick={handleInstagramClick}><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" onClick={handleTwitterClick}><FontAwesomeIcon icon={faTwitter} /></a>
              </div>
            </div>
            <div className="col-md-4">
              <p className={style.footerText}>&copy; 2023 Eterno Hotel. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default FooterBar;