'use strict'
const configs = require('../../config/index')
const boom = require('@hapi/boom')

const verifyEnvironment = (err, stack) => {
  if (configs.env) {
    return { ...err, stack }
  }
  return { error: 'Something went wrong, please give us a moment' }
}

const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err)
  next(err)
}

const boomHandler = (err, req, res, next) => {
  if (!boom.isBoom(err)) {
    next(boom.badImplementation(err))
  }
  next(err)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { output: { statusCode, payload } } = boom.boomify(err)
  res.statusCode = statusCode
  res.json(verifyEnvironment(payload, err.stack))
}

module.exports = {
  logErrors, errorHandler, boomHandler
}
