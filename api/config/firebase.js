const admin = require('firebase-admin');
const { initializeApp,applicationDefault } = require('firebase-admin/app');

require('dotenv').config();
const dbMongo = process.env.DATABASE_URL


initializeApp({
  credential: applicationDefault(),
  databaseURL:dbMongo
});

const auth = admin.auth();

module.exports = auth;
