import React from 'react';
import DetalleReserva from '../DetalleReserva/DetalleReserva';

function Carrito({ reserva }) {
  return (
    <div>
      <DetalleReserva />
      
      {/* Mostrar más detalles de la reserva aquí */}
    </div>
  );
}

export default Carrito;
