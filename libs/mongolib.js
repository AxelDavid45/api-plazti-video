'use strict'
const { MongoClient } = require('mongodb');
const configs = require('../config/index');
class MongoLib {
  constructor() {
    this.uri = `mongodb+srv://${configs.dbUser}:${configs.dbPassword}@${configs.dbHost}/${configs.dbName}`
    this.client = new MongoClient(this.uri, { useNewUrlParser: true });
  }

  getConnection() {
    if(!MongoLib.connection) {
      MongoLib.connection = new Promise(((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected successfully to mongo');
          resolve(this.client.db(configs.dbName));
        })
      }))
    }
    return MongoLib.connection
  }
}
module.exports = MongoLib;
