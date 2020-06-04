const db = require('../../db/database')


const getSeriesActors = (request, response) => {
  db.query('SELECT * FROM series_actors ORDER BY series_actors_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSeriesActorsById = (request, response) => {
  const series_actors_id = parseInt(request.params.series_actors_id)
  db.query('SELECT * FROM series_actors WHERE series_actors_id = $1', [series_actors_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getSeriesActors,
    getSeriesActorsById
}
