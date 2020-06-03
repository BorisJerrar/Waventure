const db = require('../../db/database')


const getRole = (request, response) => {
  db.query('SELECT * FROM role ORDER BY roles_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getRole
}