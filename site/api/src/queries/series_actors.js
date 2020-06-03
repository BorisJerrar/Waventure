const db = require('../../db/database')


const getSeriesActors = (request, response) => {
  db.query('SELECT * FROM series_actors ORDER BY series_actors_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getSeriesActors
}
