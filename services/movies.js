'use strict'
const Mongolib = require('../libs/mongolib')

class MoviesService {
  constructor () {
    this.collection = 'movies'
    this.db = new Mongolib()
  }

  async getMovies () {
    const query = {}
    const movies = await this.db.getAll(this.collection, query)
    return movies || []
  }

  async getMovie (movieId = '') {
    const id = movieId !== '' ? movieId : ''
    const movie = await this.db.getOne(this.collection, id)
    return movie || {}
  }

  async createMovie (data = {}) {
    return await this.db.create(this.collection, data)
  }

  async updateMovie (movieId = '', movieData = {}) {
    const id = movieId !== '' ? movieId : ''
    const data = movieData.length !== 0 ? movieData : {}
    const movieUpdatedId = await this.db.update(this.collection, id, data)
    return movieUpdatedId || {}
  }

  async deleteMovie (movieId = '') {
    const id = movieId !== '' ? movieId : ''
    const movieDeletedId = await this.db.delete(this.collection, id)
    return movieDeletedId || {}
  }
}

module.exports = MoviesService
