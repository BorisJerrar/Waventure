const db = require('../../db/database')


const getFavorites = (request, response) => {
  db.query('SELECT * FROM favorites ORDER BY favorites_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getFavorites
}
