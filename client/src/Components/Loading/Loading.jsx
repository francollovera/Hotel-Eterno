import React from 'react';
import  style  from  './Loading.module.css'; // Archivo CSS para estilos

const Loading = () => {
  return (
    <div className={style.loading_container}>
      <div className={style.loading_spinner}></div>
    </div>
  );
};

export default Loading;