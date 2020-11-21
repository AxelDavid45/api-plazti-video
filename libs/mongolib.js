'use strict'
const { MongoClient, ObjectId } = require('mongodb')
const configs = require('../config/index')

class MongoLib {
  constructor () {
    this.dbName = configs.dbName
    this.uri = `mongodb+srv://${configs.dbUser}:${configs.dbPassword}@${configs.dbHost}/${configs.dbName}?retryWrites=true&w=majority`
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async connection () {
    await this.client.connect()
    return this.client.db(this.dbName)
  }

  // Crud methods
  async getAll (collection, query) {
    const db = await this.connection()
    return await db.collection(collection).find(query).toArray() || []
  }

  async getOne (collection, id) {
    const db = await this.connection()
    return await db.collection(collection).findOne({ _id: ObjectId(id) })
  }

  async create (collection = '', data) {
    const db = await this.connection()
    const insert = await db.collection(collection).insertOne(data)
    return insert.insertedId
  }

  async update (collection, id, data) {
    const db = await this.connection()
    const updated = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data })
    return updated.modifiedCount
  }

  async delete (collection, id) {
    const db = await this.connection()
    const deleted = await db.collection(collection).deleteOne({ _id: ObjectId(id) })
    return deleted.deletedCount
  }
}

module.exports = MongoLib
