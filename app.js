'use strict'
const express = require('express')
const app = express()
const moviesRoutes = require('./routes/movies')
const errorsMiddleware = require('./utils/middleware/error-handling')
const notFoundHandler = require('./utils/middleware/notFound-handler')
// Parses incoming request with json payload
app.use(express.json())

// Use routes movies
moviesRoutes(app)
// Not found route
app.use(notFoundHandler)

// Error handling
app.use(errorsMiddleware.logErrors)
app.use(errorsMiddleware.boomHandler)
app.use(errorsMiddleware.errorHandler)

module.exports = app
