const db = require('../../db/database')


const getUsers = (request, response) => {
  db.query('SELECT * FROM users ORDER BY users_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getUsers
}
