const Pago= require('../models/Pago');
const Habitacion= require('../models/Habitacion');
const Paquete= require('../models/Paquete');
const Servicio = require('../models/Servicio');
require('dotenv').config()
const keyStripe = process.env.STRIPE_PRIVATE_KEY
const stripe = require('stripe')(keyStripe);


const createSession = async (req, res) => {
  const { arrIdHabitaciones, customerId,arrIdPaquetes,arrServicios } = req.body;
  try {
    const lineItems = [];
    if (arrIdHabitaciones){
      for (const habitacionId of arrIdHabitaciones) {
      const habitacion = await Habitacion.findById(habitacionId);
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: habitacion.nombre,
            description: habitacion.descripcion
          },
          unit_amount: habitacion.precio * 100 // Asegúrate de convertir el precio a centavos si Stripe trabaja con la menor unidad monetaria
        },
        quantity: 1
      });
    }
    }
    if (arrIdPaquetes){
      for (const IdPaquete of arrIdPaquetes) {
      const paquete = await Paquete.findById(IdPaquete);
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: paquete.nombre,
            description: paquete.desc
          },
          unit_amount: paquete.costo * 100 // Asegúrate de convertir el precio a centavos si Stripe trabaja con la menor unidad monetaria
        },
        quantity: 1
      });
    }
    }
    if (arrServicios){
      for (const IdServicio of arrServicios) {
      const servicio = await Servicio.findById(IdServicio);
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: servicio.nombre,
            description: servicio.descripcion
          },
          unit_amount: servicio.precio * 100 // Asegúrate de convertir el precio a centavos si Stripe trabaja con la menor unidad monetaria
        },
        quantity: 1
      });
    }
    }
    

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      customer: customerId,
      mode: 'payment',
      success_url: "http://localhost:3000/exitoreserva",
      cancel_url: "http://localhost:3000/detallereserva",
    });

    //console.log(session);
    res.status(200).json({ sessionId: session.id, payment:session.url});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createCustumer= async (req, res) => {
  const { nombre, correo } = req.body;
  try {
      
    const usuario = await Pago.findOne({ correo });
      if (usuario) {
        //console.log(usuario);
        return res.status(203).json({ custumer:usuario.stripeCustomerId });
} else{



      const customer = await stripe.customers.create({ 
          name: nombre,
          email: correo
         
      });
      const crearUsuario = new Pago({
        nombre,
        correo,
        stripeCustomerId: customer.id
      });
      //console.log(customer);
      console.log("Email",customer.email);
      await crearUsuario.save();
   
      res.json({ message: "Cliente creado exitosamente",custumer:customer.id });
  }} catch (error) {
      return res.status(500).json({ error: error.message });
  }
};
const paymentStatus =async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verificar el estado del pago y realizar acciones adicionales según sea necesario
    if (session.payment_status === 'paid') {
      // Actualizar el estado del pedido en la base de datos
      // Realizar cualquier acción adicional necesaria
      res.status(200).json({ message: 'Pago exitoso' });
    } else {
      res.status(202).json({ message: 'El pago no fue exitoso' });
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).json({ message: 'Error al procesar el pago' });
  }
};
module.exports ={createSession,createCustumer,paymentStatus};