'use strict'
require('dotenv').config()

const configs = {
  env: process.env.NODE_ENV !== 'production',
  port: process.env.PORT | 3000,
  cors: process.env.CORS,
  dbUser: encodeURIComponent(process.env.MONGO_USER),
  dbName: encodeURIComponent(process.env.MONGO_DBNAME),
  dbHost: encodeURIComponent(process.env.MONGO_HOST),
  dbPassword: encodeURIComponent(process.env.MONGO_PASSWORD),
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
}
module.exports = configs
