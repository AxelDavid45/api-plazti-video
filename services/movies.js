const { moviesMock } = require('../utils/mocks/moviesData');
class MoviesService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }

  async createMovie() {
    const movieCreatedId = await Promise.resolve(moviesMock[0].id);
    return movieCreatedId;
  }

  async updateMovie() {
    const movieUpdatedId = await Promise.resolve(moviesMock[0].id);
    return movieUpdatedId || {};
  }

  async deleteMovie() {
    const movieDeletedId = await Promise.resolve(moviesMock[0].id);
    return movieDeletedId || {};
  }
}

module.exports = MoviesService;