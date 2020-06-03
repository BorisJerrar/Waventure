const db = require('../../db/database')


const getSynopsis = (request, response) => {
  db.query('SELECT * FROM synopsis ORDER BY synopsis_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getSynopsis
}
