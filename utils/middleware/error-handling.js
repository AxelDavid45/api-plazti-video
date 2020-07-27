'use strict'
const configs = require('../../config/index');

const verifyEnvironment = (err, stack) => {
  if (configs.env) {
    return { err, stack };
  }
  return {
    error: 'Something went wrong, please give us a moment'};
};

const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.statusCode = 500;
  res.json(verifyEnvironment(err.message, err.stack));
};

module.exports = {
  logErrors, errorHandler
};