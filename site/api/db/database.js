const Pool = require('pg').Pool
const connect = new Pool({
<<<<<<< HEAD
  user: 'me',
  host: 'localhost',
  database: 'waventure',
  password: 'password',
=======
  user: 'postgres',
  host: 'localhost',
  database: 'waventure',
  password: 'root',
>>>>>>> charlesTest
  port: 5432,
})

module.exports = connect
