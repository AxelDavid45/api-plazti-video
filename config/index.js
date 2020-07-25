require('dotenv').config();

const configs = {
  env: process.env.NODE_ENV !== 'production',
  port: process.env.PORT | 3000
};

module.exports = configs;