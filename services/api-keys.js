const MongoLib = require('../libs/mongolib')

class ApiKeysService {
  constructor () {
    this.collection = 'apikeys'
    this.db = new MongoLib()
  }

  async getApiKey ({ token }) {
    const [apiKey] = await this.db.getAll(this.collection, { token })
    return apiKey
  }
}

module.exports = ApiKeysService
