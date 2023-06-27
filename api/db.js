const mongoose = require('mongoose');
require('dotenv').config()
const dbMongo = process.env.DATABASE_URL
const db = async () => {
    await mongoose
      .connect(dbMongo)
      .then(() => console.log('DB funcionando'))
      .catch((error) => console.error(error));
  };
  
  

  module.exports=db;