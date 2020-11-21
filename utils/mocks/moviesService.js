const mocks = require('./moviesData')
class MoviesService {
  getMovies () {
    return Promise.resolve(mocks)
  }

  getMovie (movieId) {
    return Promise.resolve(mocks[movieId])
  }
}

module.exports = MoviesService
