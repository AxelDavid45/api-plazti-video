const joi = require('@hapi/joi')

const { movieIdSchema } = require('./movies')
const { userIdSchema } = require('./users')

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUserMovieIdSchema = {
  userId: userIdSchema,
  movieIdSchema: movieIdSchema
}

module.exports = {
  userMovieIdSchema,
  createUserMovieIdSchema
}
