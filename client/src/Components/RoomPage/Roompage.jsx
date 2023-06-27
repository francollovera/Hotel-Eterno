import React from 'react';


function RoomPage() {
  return (
    <div className="room-page">
      <div className="room-details">
        <h1>Villa Bosque</h1>
        <p>Texto de descripción de la habitación...</p>

        <div className="image-gallery">
          <img src="imagen1.jpg" alt="Imagen 1" />
          <img src="imagen2.jpg" alt="Imagen 2" />
          <img src="imagen3.jpg" alt="Imagen 3" />
        </div>

        <div className="room-features">
          <h2>Características:</h2>
          <ul>
            <li>Característica 1</li>
            <li>Característica 2</li>
            <li>Característica 3</li>
          </ul>
        </div>
      </div>

      <div className="other-rooms">
        <h2>Otras habitaciones disponibles:</h2>
        <ul>
          <li>Habitación 1</li>
          <li>Habitación 2</li>
          <li>Habitación 3</li>
        </ul>
      </div>
    </div>
  );
}

export default RoomPage;
