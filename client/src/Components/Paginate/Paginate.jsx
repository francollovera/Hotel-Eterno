
import React from "react";
import style from './Paginate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Paginado({ habsPerPage, habitaciones, paginado, currentPage }) {
  let filteredhabitaciones = useSelector(state => state.filteredhabitaciones);

  const pageNumbers = [];
  if (filteredhabitaciones.length > 0) {
    for (let i = 0; i <= filteredhabitaciones.length-1; i++) {
      pageNumbers.push(filteredhabitaciones[i].numero);
    }
  }
  else {
    for (let i = 1; i <= habitaciones-1; i++) {
      pageNumbers.push(i);
    }
  }
  
  const navigate = useNavigate();

  return (
    <nav>
      <div className={style.paginado}>
        {/* {currentPage !== 1 && !filteredhabitaciones.length && (
          <div className={style.number}>
            <a className={style.link} href={`/habitacion/${currentPage - 1}`} onClick={(e) => (e.preventDefault(), navigate(`/habitacion/${currentPage - 1}`))}>
              <FontAwesomeIcon  className={style.flecha} icon={faChevronLeft} />
            </a>
          </div>
        )} */}
        {pageNumbers.length ? (
          pageNumbers.map((number) => (
            <div key={number} className={style.number}>
              <a
                className={`${style.link} ${currentPage === number ? style.active : ''}`}
                href={`/habitacion/${number}`} onClick={(e) => (e.preventDefault(), navigate(`/habitacion/${number}`))}
              >
                {number }
              </a>
            </div>
          ))
        ) : (
          ''
        )}
        {/* {currentPage !== pageNumbers.length && !filteredhabitaciones.length && (
          <div className={style.number}>
            <a className={style.link} href={`/habitacion/${currentPage + 1}`} onClick={(e) => (e.preventDefault(), navigate(`/habitacion/${currentPage + 1}`))}>
              <FontAwesomeIcon className={style.flecha} icon={faChevronRight} />
            </a>
          </div>
        )} */}
      </div>
    </nav>
  );
}

export default Paginado;
