'use strict';
const { MongoClient, ObjectId } = require('mongodb');
const configs = require('../config/index');

class MongoLib {
  constructor () {
    this.dbName = configs.dbName;
    this.uri = `mongodb+srv://${configs.dbUser}:${configs.dbPassword}@${configs.dbHost}/${configs.dbName}?retryWrites=true&w=majority`
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },);
  }

  async connection () {
    try {
      await this.client.connect();
      return this.client.db(this.dbName);
    } catch (err) {
      console.log(err);
    }
  }

  //Crud methods
  async getAll (collection, query) {
    const db = await this.connection();
    try {
      return await db.collection(collection).find(query).toArray() || [];
    } catch (err) {
      console.log(err);
    }
  }

  async getOne (collection, id) {
    const db = await this.connection();
    try {
      return await db.collection(collection).findOne({ _id: ObjectId(id)});
    } catch (err) {
      console.log(err);
    }
  }

  async create (collection = '', data) {
    const db = await this.connection();
    try {

      const insert = await db.collection(collection).insertOne(data);
      return insert.insertedId;
    } catch (err) {
      console.log(err);
    }
  }

  async update (collection, id, data) {
    const db = await this.connection();
    try {
      const updated = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data });
      return updated.modifiedCount;
    } catch (err) {
      console.log('error');
    }
  }

  async delete (collection, id) {
    const db = await this.connection();
    try {
      const deleted = await db.collection(collection).deleteOne({"_id": ObjectId(id)});
      return deleted.deletedCount;
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = MongoLib;
