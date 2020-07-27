'use strict'
const boom = require('@hapi/boom');

const validate =  () => false;

const validationHandler = (schema, check = 'body') =>{
  return function handler(req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;