const Paquete = require('../models/Paquete');
const Habitacion = require('../models/Habitacion');
const Servicio = require('../models/Servicio');
const Reservacion = require('../models/Reservacion');

const getPaquetes = async (req,res) => {
    try {
        const paquetes = await Paquete.find({activo:true});
        let paquetesCompleto=[];
        for(let paquete of paquetes) {
          
            let numerosHabitaciones = [];
            let cantHabitacion=0;
            for (let habitacionId of paquete.arrIdHabitaciones) {               
                let HabitacionXpaquete = await Habitacion.findOne({ _id: habitacionId, activo: true });
                if(HabitacionXpaquete)
                    cantHabitacion+=HabitacionXpaquete.capacidad;                
                //numerosHabitaciones.push(nombre);
            }
            paquete.capacidad=cantHabitacion;
            let nombresServicios = [];
            for (let servicioId of paquete.arrIdServicios) {
                const {nombre} = await Servicio.find({_id:servicioId});
                nombresServicios.push(nombre);
            }
            paquete.habitaciones = numerosHabitaciones;
            paquete.servicios = nombresServicios;
            paquetesCompleto.push(paquete);
        }

        
        return res.status(200).json(paquetesCompleto);
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};

const getPaquetesDisponibles = async (req,res) => {
    let fechaInicio = req.query.fechaInicio;
    let fechaFin = req.query.fechaFin;
    
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin);
    try {
        let reservaciones = await Reservacion.find({
            $or: [
            { fechaInicio: { $lte: fechaFin }, fechaFin: { $gte: fechaInicio }},
            { fechaInicio: { $gte: fechaInicio, $lte: fechaFin }},
            { fechaFin: { $gte: fechaInicio, $lte: fechaFin }}
            ]
        });
        let paquetes = await Paquete.find({activo:true});

        for (let paquete of paquetes) {
            for (let reservacion of reservaciones) {
                for (let habitacionReservada of reservacion.habitaciones) {
                    let habitacion = paquete.arrIdHabitaciones.find(a => a === habitacionReservada.toString());
        
                    if (habitacion) {
                        paquete.disponible = false;
                        break;
                    };
                };
                if (!paquete.disponible) {
                    break;
                };
            };
        };
        return res.status(200).json(paquetes);
    } 
    catch (error) {
        res.status(500).send(error.message);
    }
};

const getPaqueteById = async (req,res) => {
    const {id} = req.params;

    try {
        let paqueteXid=[];
        let paquete = await Paquete.findOne({_id:id,activo:true});
        if (!paquete) {return res.status(400).send("El paquete no existe")};

        let numerosHabitaciones = [];
        for (let habitacionId of paquete.habitaciones) {
            const {nombre} = await Habitacion.find({_id:habitacionId});
            numerosHabitaciones.push(nombre);
        }

        let nombresServicios = [];
        for (let servicioId of paquete.servicios) {
            const {nombre} = await Servicio.find({_id:servicioId});
            nombresServicios.push(nombre);
        }

        paquete.habitaciones = numerosHabitaciones;
        paquete.servicios = nombresServicios;
        paqueteXid.push(paquete);
        //return res.status(200).json(paquete);
        return res.status(200).json(paqueteXid);
    } 
    catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const postPaquete = async (req,res) => {
    // const {nombre,arrIdHabitaciones,arrIdServicios,costo} = req.body;    
    const {nombre,desc,costo,habitacion,servicio,url_imagen} = req.body; 
    let activo=true;
    

    if (!nombre || !costo) {return res.status(400).send("Error. No se enviaron los datos necesarios para crear el paquete")};

    try {
        // const data = new Paquete ({nombre,habitaciones:arrIdHabitaciones,servicios:arrIdServicios,costo});
        const data = new Paquete ({nombre:nombre,desc:desc,arrIdHabitaciones:habitacion,arrIdServicios:servicio,costo:costo,image:url_imagen,activo:activo});
        //return res.status(201).json(await data.save());
        await data.save();
        return res.status(200).send({message:"Paquete creado con éxito"});
    } 
    catch (error) {
        console.log("error");
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send(error.message);
        }
        if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(500).send('Duplicate key error');
        }
        return res.status(500).send('Internal server error');
    }
};

const putPaquete = async (req,res) => {
    //const {id} = req.params;
    const {_id,nombre,desc,costo,arrIdHabitaciones,arrIdServicios,image} = req.body; 
    //const {nombre,arrIdHabitaciones,arrIdServicios,costo} = req.body;

    //if (!nombre || !arrIdHabitaciones || !arrIdServicios || !costo) {return res.status(400).send("Error. No se enviaron los datos necesarios para actualizar")};

    try {
        const paquete = await Paquete.findOne({_id:_id,activo:true});
        if (!paquete) {return res.status(400).send("El paquete no existe")};

        paquete.nombre = nombre;
        //paquete.habitaciones = arrIdHabitaciones;
        //paquete.servicios = arrIdServicios;
        paquete.desc = desc;
        paquete.arrIdHabitaciones = arrIdHabitaciones;
        paquete.arrIdServicios = arrIdServicios;
        paquete.image = image;
        paquete.costo = costo;
        await paquete.save();
        //return res.status(200).json(await paquete.save());
        return res.status(200).json("Paquete actualizado correctamente");
    } 
    catch (error) {
        return res.status(500).send('Internal server error');
    }
};

const deletePaquete = async (req,res) => {    
    const {id} = req.params;
    try {
        //const paquete = await Paquete.findOne({_id:id,activo:true});
        const paquete = await Paquete.findByIdAndDelete({ _id: id });
        if (!paquete) {return res.status(400).send("El paquete no existe o ya ha sido eliminado")};

        //paquete.activo = false;
        //await paquete.save();
        return res.status(200).send("Paquete eliminado correctamente");
    } 
    catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const getPaquetesAdmin = async (req,res) => {
    try {
        const paquetes = await Paquete.find();        
        return res.status(200).json(paquetes);
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};

const activaDesactivaPaquete = async (req,res) => {    
    const {_id,activo} = req.body;
    try {
        let estado=false;
        const paquete = await Paquete.findOne({_id:_id});
        if (!paquete) {return res.status(400).send({message:"El paquete no existe o ya ha sido eliminado"})};
        await Paquete.findByIdAndUpdate(_id, { $set: { activo }});
        return res.status(200).send({message: activo===true ? "Paquete activado con éxito":"Paquete desactivado con éxito"});
    } 
    catch (error) {
        return res.status(500).send( {message:"Internal server error"});
    }
};

module.exports = {getPaquetes, getPaquetesDisponibles, getPaqueteById, postPaquete, putPaquete, deletePaquete,getPaquetesAdmin,activaDesactivaPaquete};