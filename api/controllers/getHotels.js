// const mongoose = require('mongoose');
// const fs = require ('fs-extra')

// const Hotel= require('../models/Hotel')

// const getIdHotel =async (req, res) => {
//     try {
//         const hotel = await Hotel.findById(req.params.id);
//         if (!hotel) {
//           return res.status(404).json({ message: 'Hotel not found' });
//         }
//         res.status(200).json(hotel);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//   }

// const getAllCollections =async (req, res) => {
//     try {
//         const db = mongoose.connection;
//         const hotels = await Hotel.find().lean();
//         const otherColeccion = await db.collection('reservation').find().toArray();
        
//         const result = [...hotels, ...otherColeccion];
        
//         res.status(200).json(result);
//         } catch (error) {
//         res.status(500).json({ error: error.message });
//         }
//         }
  
// const postDataHotel= async (req, res) => {
//     const {location, status, room, reservation}= req.body
//     const newHotel = new Hotel({
//         location,
//         status,
//         room,
//         reservation
//     })

//     try {
//       if (req.files?.image) {
//         const result = await uploadImage(req.files.image.tempFilePath)
//         console.log(result)
//         newHotel.image = {
//           public_id: result.public_id,
//           secure_url: result.secure_url
//         }
//         await fs.unlink(req.files.image.tempFilePath)
//       }
//       const dateToSave =  await newHotel.save();
//       res.status(201).json(dateToSave)
//     }
//     catch (error) {
//       if (error.name === 'ValidationError') {
//         return res.status(400).json({ message: error.message });
//       }
//       if (error.name === 'MongoError' && error.code === 11000) {
//         return res.status(400).json({ message: 'Duplicate key error' });
//       }
//       return res.status(500).json({ message: 'Internal server error' });
//     }
// }

// const deleteHotel = async (req, res) => {
//     try {
//       const deleteHotel= await Hotel.findByIdAndDelete(req.params.id);

//       if (deleteHotel.image && deleteHotel.image.public_id) {
//         await deleteImage(deleteHotel.image.public_id);
//       } 

//       res.status(200).json({ message: 'Hotel deleted successfully' });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
// module.exports= {getAllCollections, getIdHotel, postDataHotel, deleteHotel} ;