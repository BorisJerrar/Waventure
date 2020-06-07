const Pool = require('pg').Pool
const connect = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'root',
  port: 5432,
})

module.exports = connect
