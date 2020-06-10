const Pool = require('pg').Pool
const connect = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'waventure',
  password: 'password',
  port: 5432,
})

module.exports = connect
