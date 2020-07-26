'use strict';
const { MongoClient } = require('mongodb');
const configs = require('../config/index');

class MongoLib {
  constructor () {
    this.uri = `mongodb+srv://${configs.dbUser}:${configs.dbPassword}@${configs.dbHost}/${configs.dbName}`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true });
  }

  async connection () {
    try {
      const connection = await this.client.connect();
      return connection.db(configs.dbName);
    } catch (err) {
      console.log(err);
    }
  }

  //Crud methods
  async getAll (collection, query) {
    const db = await this.connection();
    try {
      return await db.collection(collection).find(query) || [];
    } catch (err) {
      console.log(err);
    }
  }

  async getOne (collection, id) {
    const db = await this.connection();
    try {
      return await db.collection(collection).findOne({ '_id': id });
    } catch (err) {
      console.log(err);
    }
  }

  async create (collection, data) {
    const db = this.connection();
    try {
      const insert = await db.collection(collection).insertOne(data);
      return insert.insertedId;
    } catch (err) {
      console.log(err);
    }
  }

  async update (collection, id, data) {
    const db = this.connection();
    try {
      const updated = await db.collection(collection).updateOne({ '_id': id }, { $set: data }, { upsert: true });
      return updated.upsertedId;
    } catch (err) {
      console.log('error');
    }
  }

  async delete (collection, id) {
    const db = this.connection();
    try {
      const deleted = await db.collection(collection).deleteOne({"_id": id});
      return deleted.result;
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = MongoLib;
