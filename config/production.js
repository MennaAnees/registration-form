'use strict';

module.exports = {
  env: 'production',
  db: process.env.MONGO_URL,
  port: process.env.PORT
};
