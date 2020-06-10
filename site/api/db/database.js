const Pool = require('pg').Pool
const connect = new Pool({
<<<<<<< HEAD
  user: 'postgres',
=======
  user: 'borisjerrar',
>>>>>>> ba9541f26635bc726ea56a1650e43cc89e5958d7
  host: 'localhost',
  database: 'waventure',
  password: '',
  port: 5432,
})

module.exports = connect
