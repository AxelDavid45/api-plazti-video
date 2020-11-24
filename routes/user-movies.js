const express = require('express')
const router = express.Router()
const UserMoviesService = require('../services/user-movies')
const validationHandler = require('../utils/middleware/validationData-handler')
const { movieIdSchema } = require('../utils/schemas/movies')
const { userIdSchema } = require('../utils/schemas/users')
const { createUserMovieSchema } = require('../utils/schemas/user-movies')
const userMoviesService = new UserMoviesService()

router.get('/', validationHandler({ userId: userIdSchema }, 'query'), async (req, res, next) => {
  const { userId } = req.query
  try {
    const userMovies = await userMoviesService.getUserMovies({ userId })
    res.status(200).json({
      data: userMovies
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', validationHandler(createUserMovieSchema), async (req, res, next) => {
  const { userMovie } = req.body
  try {
    const createdUserMovieId = await userMoviesService.createUserMovie({ userMovie })
    res.status(201).json({
      data: createdUserMovieId
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:userMovieId', validationHandler({ userMovieId: movieIdSchema }, 'params'), async (req, res, next) => {
  const { userMovieId } = req.params
  try {
    const deletedUserMovieId = userMoviesService.deleteUserMovie({ userMovieId })
    res.status(200).json({
      data: deletedUserMovieId
    })
  } catch (err) {
    next(err)
  }
})
module.exports = router
