const validate =  () => false;

const validationHandler = (schema, check = 'body') =>{
  return function handler(req, res, next) {
    const error = validate(req[check], schema);
    error ? next(new Error(error)) : next();
  };
}

module.exports = validationHandler;