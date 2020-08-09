'use strict';
const supertest = require('supertest');
const express =  require('express');
function testServer(router, groupRoute) {
  const app = express();
  if (!groupRoute) {
    app.use(router);
  } else {
    app.use(groupRoute, router);
  }
  return supertest(app);
}

module.exports = testServer;
