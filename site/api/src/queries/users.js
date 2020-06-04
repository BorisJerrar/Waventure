const db = require('../../db/database')


const getUsers = (request, response) => {
  db.query('SELECT * FROM users ORDER BY users_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsersById = (request, response) => {
  const users_id = parseInt(request.params.users_id)
  db.query('SELECT * FROM users WHERE users_id = $1', [users_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
    getUsers,
    getUsersById
}
