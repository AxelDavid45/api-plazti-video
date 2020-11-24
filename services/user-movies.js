const MongoLib = require('../libs/mongolib')

class UserMoviesService {
  constructor () {
    this.collection = 'user-movies'
    this.mongoDb = new MongoLib()
  }

  async getUserMovies ({ userId }) {
    const query = userId && { userId }
    const userMovies = await this.mongoDb.getAll(this.collection, query)
    return userMovies || []
  }

  async createUserMovie ({ userMovie }) {
    return await this.mongoDb.create(this.collection, userMovie)
  }

  async deleteUserMovie ({ userMovieId }) {
    return await this.mongoDb.delete(this.collection, userMovieId)
  }
}

module.exports = UserMoviesService
