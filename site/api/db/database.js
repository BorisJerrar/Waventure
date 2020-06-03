const Pool = require('pg').Pool
const connect = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'waventure',
  password: '',
  port: 5432,
})

module.exports = connect