const db = require('../../db/database')


const getSaisons = (request, response) => {
  db.query('SELECT * FROM saisons ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getSaisons
}
