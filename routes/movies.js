'use strict';
const express = require('express');
const router = express.Router();
const MoviesService = require('../services/movies');
const movieService = new MoviesService();
const validateData = require('../utils/middleware/validationData-handler');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');

//Get a list of movies
router.get('/', async (req, res, next) => {
  try {
    const movies = await movieService.getMovies();
    res.statusCode = 200;
    res.json({
      data: movies
    });

  } catch (err) {
    next(err);
  }
});

//Get a single movie
router.get('/:movieId', validateData({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    //This code is just an example, we're not using yet any service to retrieve information
    const movie = await movieService.getMovie(movieId);
    res.statusCode = 200;
    res.json({
      data: movie
    });

  } catch (err) {
    next(err);
  }
});

//Create a movie
router.post('/', validateData(createMovieSchema), async (req, res, next) => {
  try {
    const movieData = req.body;
    //This code is just an example, we're not using yet any service to retrieve information
    const movieCreatedId = await movieService.createMovie(movieData);
    res.statusCode = 201;
    res.json({
      data: movieCreatedId
    });

  } catch (err) {
    next(err);
  }
});

//Update the movie
router.put('/:movieId', [validateData({ movieId: movieIdSchema }, 'params'), validateData(updateMovieSchema)], async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movieData = req.body;
    //This code is just an example, we're not using yet any service to retrieve information
    const movieUpdatedId = await movieService.updateMovie(movieId, movieData);
    res.statusCode = 200;
    res.json({
      data: movieUpdatedId
    });

  } catch (err) {
    next(err);
  }
});

//Delete the movie
router.delete('/:movieId', validateData( { movieId: movieIdSchema }, 'params'), async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    //This code is just an example, we're not using yet any service to retrieve information
    const movieDeletedId = await movieService.deleteMovie(movieId);
    res.statusCode = 200;
    res.json({
      data: movieDeletedId
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;