   +----------------+         +----------------+         +-------------------+
   |    Usuario     |         |   Habitacion   |         |    Reservacion    |
   +----------------+         +----------------+         +-------------------+
   | _id            |         | _id            |         | _id               |
   | nombre         |         | número         |         | usuario (ref)     |
   | correo         |         | tipo           |         | habitacion (ref)  |
   | contraseña     |         | precio         |         | fechaInicio       |
   | ...            |         | descripción    |         | fechaFin          |
   +----------------+         +----------------+         | ...               |
                                                          +-------------------+
