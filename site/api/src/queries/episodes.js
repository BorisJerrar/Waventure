const db = require('../../db/database')


const getEpisodes = (request, response) => {
  db.query('SELECT * FROM episodes ORDER BY episodes_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getEpisodes
}