const { Pool } = require('pg')
const configs = require('./connection.json')

const config = {
  user: configs.user,
  host: configs.host,
  database: configs.database,
  password: configs.password,
  port: configs.port,
}

const connectionPool = new Pool(config);

module.exports = connectionPool;