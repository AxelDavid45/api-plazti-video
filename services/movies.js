'use strict';
const mongolib = require('../libs/mongolib');

class MoviesService {
  constructor () {
    this.collection = 'movies';
    this.db = new mongolib();
  }

  async getMovies () {
    try {
      let query = {};
      const movies = await this.db.getAll(this.collection, query);
      return movies || [];
    } catch (err) {
      return {
        error: err.message
      };
    }
  }

  async getMovie (movieId = '') {
    let id = movieId !== '' ? movieId : '';
    console.log(id);
    const movie = await this.db.getOne(this.collection, id);
    return movie || {};
  }

  async createMovie (data = {}) {
    try {
      return await this.db.create(this.collection, data);
    } catch (err) {
      console.log(err);
    }
  }

  async updateMovie (movieId = '', movieData = {}) {
    let id = movieId !== '' ? movieId : '';
    let data = movieData.length !== 0 ? movieData : {};

    const movieUpdatedId = await this.db.update(this.collection, id, data);
    return movieUpdatedId || {};
  }

  async deleteMovie (movieId = '') {
    let id = movieId !== '' ? movieId : '';
    const movieDeletedId = await this.db.delete(this.collection, id);
    return movieDeletedId || {};
  }
}

module.exports = MoviesService;