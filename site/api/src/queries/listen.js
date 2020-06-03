const db = require('../../db/database')


const getListen = (request, response) => {
  db.query('SELECT * FROM listen ORDER BY listen_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getListen
}
