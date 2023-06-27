const Resena = require("../models/Resena");
const Habitacion = require("../models/Habitacion");
const Servicio = require("../models/Servicio");
const Reservacion= require('../models/Reservacion');
const Usuario= require('../models/Usuario');


const getResena = async (req, res) => {
  try {
    const Resenas = await Resena.find({});

    return res.status(200).json(Resenas);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const postResena = async (req, res) => {
    const { nombre, correo, puntuacion, descripcion } = req.body;
  
    if ( !nombre || !correo ||!puntuacion || !descripcion ) {
      return res
        .status(400)
        .send("Error. No se enviaron los datos necesarios para crear reseña");
    }
    try {

      const data = new Resena ({ nombre, correo, puntuacion, descripcion });
      return res.status(201).json(await data.save());

    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).send(error.message);
      }
      if (error.name === "MongoError" && error.code === 11000) {
        return res.status(500).send("Duplicate key error");
      }
      return res.status(500).json({message:error.messsage});
    }
  };


const deleteResena = async (req, res) => {
    const { id } = req.params;
    try {
      const resena = await Resena.findByIdAndDelete({ _id: id });
        if (!resena) return res.status(404).json({message: 'No hay datos'})
          
        return res.status(200).json(resena);
      } 
      catch (error) {
    return res.status(500).json({ message: error.message });
      }
  };
  
  const getEmailResena = async (req, res)=>{
    const { email } = req.params;
    try {
 
      const resenas = await Resena.find({correo: email});
    
      res.status(200).json(resenas);
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  }
  const getUsuarioEmail=async (req, res) => { 
    const { email } = req.params;
    try {
 
      const usuario = await Usuario.findOne({ correo:email }).select('-contraseña');
      console.log(usuario)
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  }
  const putImageUser = async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findById(id);
      if (!usuario) return res.status(404).json({ message: 'No hay Usuario' });
  
      usuario.image = []; // Asigna un array vacío al atributo "image"
      await usuario.save(); // Guarda los cambios en la base de datos
      console.log(usuario)
      return res.status(200).json(usuario);

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  const getReservacionUsuario = async (req,res) => {
    const {usuario} = req.params;
    try {
          
      let ReservaUsu = [];
      let reservacion = await Reservacion.find({usuario:usuario,activo:true,estado:'I'});       
      if (reservacion.length==0) {    
        return res.status(200).send(ReservaUsu)
      };
      let ReservacionDeUsuario=reservacion.slice(-1);        
      for (let habitacionId of ReservacionDeUsuario) {
          
          let hab=[];     
          let habFin=[];     
          for (let habId of habitacionId.habitaciones) { 
            let habitacionXReserva = await Habitacion.findOne({_id:habId});
            hab.push(habitacionXReserva);        
            
            for (let h of hab) {           
              var obj={
                _id:habId,
                nombre:h.nombre,
                capacidad: h.capacidad,
                precio: h.precio,
                image: h.image
              };        
            }
            habFin.push(obj);        
                    
          }
          let serv=[];     
          let servFin=[]; 
          for (let servId of habitacionId.servicios) {         
            
            let servXReserva = await Servicio.findOne({_id:servId});
            serv.push(servXReserva);    
            for (let s of serv) {           
              var obj={
                _id:servId,
                nombre:s.nombre,
                descripcion: s.descripcion,
                precio: s.precio
              };        
            }
            servFin.push(obj);        
                    
          }
          let paq=[];     
          let paqFin=[]; 
          for (let paqId of habitacionId.paquetes) { 
            let paqXReserva = await Paquete.findOne({_id:paqId});
            paq.push(paqXReserva);        
            console.log("paq");
            console.log(paq);
            for (let p of paq) {           
              var obj={
                _id:paqId,
                nombre:p.nombre,
                // capacidad: p.capacidad,
                precio: p.costo,
                image: p.image
              };        
            }
            paqFin.push(obj);        
                    
          }
  
          var objh={
            _id:habitacionId._id,
            usuario: habitacionId.usuario,
            fechaInicio: habitacionId.fechaInicio,
            fechaFin:habitacionId.fechaFin,
            image:habitacionId.image,
            costo:habitacionId.costo,
            Arrayhabitaciones:habFin,
            Arraypaquete:paqFin,
            ArrayServicio:servFin,
            fechaReserva:habitacionId.fechaReserva,
            nroPerson:habitacionId.nroPerson
          };  
      }
      ReservaUsu.push(objh);
      return res.status(200).json(ReservaUsu);
  } 
  catch (error) {
      return res.status(500).send("Internal server error");
  }
  };

module.exports = {getResena, getEmailResena,postResena, deleteResena,putImageUser, getUsuarioEmail, getReservacionUsuario}