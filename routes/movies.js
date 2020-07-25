'use strict'
const express = require('express');
const { moviesMock } = require('../utils/mocks/moviesData');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Promise.resolve(moviesMock);
    res.statusCode = 200;
    res.json({
      data: movies
    })
  } catch(error) {
    console.log(error.message);
  }
});

module.exports = router;