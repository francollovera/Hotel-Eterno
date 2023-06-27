
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllResena } from '../redux/action';
import style from './Resena.module.css';

const Resena = () => {
  const { allResena } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllResena());
  }, [dispatch]);

  useEffect(() => {
    if (allResena) {
      setData(allResena);
    }
  }, [allResena.length]);

  return (
    <div className={style.container}>
      {data.map((item) => (
        <div className={style.row} key={item._id}>
          <p>{item.descripcion}</p>
          <span><h4>⭐️{item.puntuacion}</h4><h4>{item.nombre}</h4></span>
        </div>
      ))}
    </div>
  );
};

export default Resena;
