'use strict';
const express = require('express');
const { moviesMock } = require('../utils/mocks/moviesData');
const router = express.Router();

//Get a list of movies
router.get('/', async (req, res, next) => {
  try {
    const movies = await Promise.resolve(moviesMock);
    res.statusCode = 200;
    res.json({
      data: movies
    });

  } catch (err) {
    next(err);
  }
});

//Get a single movie
router.get('/:movieId', async (req, res, next) => {
  try {
    //This code is just an example, we're not using yet any service to retrieve information
    const movie = await Promise.resolve(moviesMock[0]);
    res.statusCode = 200;
    res.json({
      data: movie
    });

  } catch (err) {
    next(err);
  }
});

//Create a movie
router.post('/', async (req, res, next) => {
  try {
    //This code is just an example, we're not using yet any service to retrieve information
    const movieCreatedId = await Promise.resolve(moviesMock[0].id);
    res.statusCode = 201;
    res.json({
      data: movieCreatedId
    });

  } catch (err) {
    next(err);
  }
});

//Update the movie
router.put('/:movieId', async (req, res, next) => {
  try {
    //This code is just an example, we're not using yet any service to retrieve information
    const movieUpdatedId = await Promise.resolve(moviesMock[0].id);
    res.statusCode = 200;
    res.json({
      data: movieUpdatedId
    });

  } catch (err) {
    next(err);
  }
});

//Delete the movie
router.delete('/:movieId', async (req, res, next) => {
  try {
    //This code is just an example, we're not using yet any service to retrieve information
    const movieDeletedId = await Promise.resolve(moviesMock[0].id);
    res.statusCode = 200;
    res.json({
      data: movieDeletedId
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;