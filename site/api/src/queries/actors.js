const db = require('../../db/database')


const getActors = (request, response) => {
  db.query('SELECT * FROM actors ORDER BY  roles_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getActors
}