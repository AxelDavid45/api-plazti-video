'use strict'
require('dotenv').config();

const configs = {
  env: process.env.NODE_ENV !== 'production',
  port: process.env.PORT | 3000,
  cors: process.env.CORS,
  dbUser: process.env.MONGO_USER,
  dbName: process.env.MONGO_DBNAME,
  dbHost: process.env.MONGO_HOST,
  dbPassword: process.env.MONGO_PASSWORD
};

module.exports = configs;