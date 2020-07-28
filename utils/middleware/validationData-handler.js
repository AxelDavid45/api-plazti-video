'use strict'
const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

const validate =   async (data, schema) => {
  if (!joi.isSchema(schema)) {
    schema = joi.object(schema);
  }
  const { error } = await schema.validateAsync(data);
  return error;
}

const validationHandler = (schema, check = 'body') =>{
  return async (req, res, next) => {
    const error = await validate(req[check], schema);
    error ? next(boom.badRequest()) : next();
  };
}

module.exports = validationHandler;