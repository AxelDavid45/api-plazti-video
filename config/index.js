'use strict'
require('dotenv').config()

const configs = {
  env: process.env.NODE_ENV !== 'production',
  port: process.env.PORT | 3000,
  cors: process.env.CORS,
  dbUser: encodeURIComponent(process.env.MONGO_USER),
  dbName: encodeURIComponent(process.env.MONGO_DBNAME),
  dbHost: encodeURIComponent(process.env.MONGO_HOST),
  dbPassword: encodeURIComponent(process.env.MONGO_PASSWORD)
}
module.exports = configs
