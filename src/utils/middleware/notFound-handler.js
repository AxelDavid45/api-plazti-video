'use strict'
const boom = require('@hapi/boom')

const notFoundHandler = (req, res) => {
  const { output: { statusCode, payload } } = boom.notFound()
  res.statusCode = statusCode
  res.json(payload)
}

module.exports = notFoundHandler
