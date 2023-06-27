require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const {SENDGRID_API_KEY} = process.env
//            SENDGRID_API_KEY
//SENDGRID_API_KEY=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

sgMail.setApiKey(SENDGRID_API_KEY);


async function sendWelcomeEmail(correo,nombre) {

  const msg = {
    to: correo,
    from: 'hoteleterno5@gmail.com',
    subject:`Welcome ${nombre}`,
    html: `<html>
    <head>
      <title>Bienvenido al Hotel Eterno</title>
      <style>
        @media screen and (max-width: 600px) {
          .container {
            width: 100%;
            padding: 10px;
          }
          img {
            width: 100%;
            max-width: 200px;
          }
          h1 {
            font-size: 24px;
          }
          p {
            font-size: 14px;
            line-height: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container" style="text-align: center; max-width: 600px; margin: 0 auto;">
        <h1 style="font-size: 36px;">Bienvenido al Hotel Eterno</h1>
        <img src="https://i.pinimg.com/564x/04/19/60/0419601405d7508a8a92c042675bee2d.jpg" alt="Logo del Hotel Eterno" style="max-width: 200px;">
        <p>¡Nos complace darle la bienvenida, al Hotel Eterno ! Estamos encantados de que sea parte de la comunidad y esperamos que pronto pueda visitar las instalaciones.</p>
        <p>Algunas de las comodidades que disfrutara son amenas habitaciones, deliciosas opciones gastronómicas, instalaciones de lujo y servicios exclusivos durante su estadía en el Hotel Eterno.</p>
        <p>Desde nuestro equipo, nos esforzaremos al máximo para brindarle una experiencia inolvidable y asegurarnos de que todas sus necesidades sean atendidas.</p>
        <p>Si tiene alguna pregunta o solicitud especial, no dude en ponerse en contacto con nuestro amable personal de recepción. Estamos aquí para ayudarlo en todo momento.</p>
        <p>¡Esperamos que tenga una estancia inolvidable!</p>
        <p>Atentamente,</p>
        <p>Llovera Franco Gerente General.</p>
        <div style="text-align: start; max-width: 600px; padding: 0vh 6vh;">
          <hr> 
          <span>Tucuman, Termas Huife,Calle Principal 123</span>
          <br>
          <span>Email:hoteleterno5@gmail.com</span>
          <br>
          <span>Teléfono: (+123) 456-7890</span>
          <hr>
        </div>
    </body>
  </html>`
};

try {
  await sgMail.send(msg);
  console.log('Correo electrónico enviado correctamente');
} catch (error) {
  console.error('Error al enviar el correo electrónico', error);
}
   
  };

    async function checkReservation({ usuarioCorreo,nombresHabitaciones,nombresServicios,nombresPaquetes,fechaInicio,fechaFin,costo }) {
                                      
    
      const msg = {
      to:usuarioCorreo,
      from: 'hoteleterno5@gmail.com',
      subject:`Reserva, Hotel Eterno`,
      html: `<html>
      <head>
        <title>Detalle de Reserva - Hotel Eterno</title>
        <style>
          @media screen and (max-width: 600px) {
            .container {
              width: 100%;
              padding: 10px;
            }
            img {
              width: 100%;
              max-width: 200px;
            }
            h1 {
              font-size: 24px;
            }
            p {
              font-size: 14px;
              line-height: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container" style="text-align: center; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 36px;">Detalle de Reserva - Hotel Eterno</h1>
          <img src="https://i.pinimg.com/564x/04/19/60/0419601405d7508a8a92c042675bee2d.jpg" alt="Logo del Hotel Eterno" style="max-width: 200px;">
          <p>Estimado/a miembro,</p>
          <p>Le agradecemos por su reserva en el Hotel Eterno. A continuación, le proporcionamos los detalles de su reserva:</p>
          <p><strong>Fecha de Entrada:</strong> ${fechaInicio}</p>
          <p><strong>Fecha de Salida:</strong> ${fechaFin}</p>
          <p><strong>Habitaciones:</strong></p>
          <ul>
          ${nombresHabitaciones}
          </ul>
          <p><strong>Servicios Adicionales:</strong></p>
          <ul>
          ${nombresServicios}
          </ul>
          <p><strong>Paquetes Especiales:</strong></p>
          <ul>
          ${nombresPaquetes}
          </ul>
          <p><strong>Costo:</strong></p>
          <ul>
          USD ${costo}
          </ul>
          <p>Si tiene alguna pregunta o requiere asistencia adicional, no dude en contactarnos. ¡Estamos aquí para ayudarlo!</p>
          <p>Esperamos que disfrute de su estadía en el Hotel Eterno y que tenga una experiencia inolvidable.</p>
          <p>Atentamente,</p>
          <p>El equipo del Hotel Eterno</p>
        </div>
      </body>
    </html>
    `
  }
  try {
    await sgMail.send(msg);
    console.log('Correo electrónico enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo electrónico', error);
  }
  }

  async function sugerenciaCliente(name, email,phone,subject,description ) {

    const msg = {
      to: 'hoteleterno5@gmail.com',
      from: 'corolimajose@proton.me',
      subject:subject,
      html:`
        <div class="container" style="text-align: center; max-width: 600px; margin: 0 auto;">
          <h2>Sugerencia de cliente</h2>
          <hr>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Descripción:</strong> ${description}</p>
        </div>
      `
    } 
    
    try {
      await sgMail.send(msg);
      console.log('Correo electrónico enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
    }
  }

module.exports = { sendWelcomeEmail, checkReservation, sugerenciaCliente}