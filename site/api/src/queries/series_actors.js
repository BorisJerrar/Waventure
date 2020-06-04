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

const createSeriesActors = (request, response) => {
    const serieid = request.query.serieid
    const actorid = request.query.actorid

    db.query('INSERT INTO series_actors ( serieid, actorid ) VALUES ($1, $2)', [ serieid, actorid ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Series_actors added with ID: ${results.insertId}`)
    })
}

const updateSeriesActors = (request, response) => {
    const series_actors_id = parseInt(request.params.series_actors_id)
    const serieid = request.query.serieid
    const actorid = request.query.actorid

    db.query(
        'UPDATE series_actors SET serieid = $1, actorid = $2 WHERE series_actors_id = $3', [serieid, actorid, series_actors_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Series_actors modified with ID: ${series_actors_id}`)
        }
    )
}

const deleteSeriesActors = (request, response) => {
    const series_actors_id = parseInt(request.params.series_actors_id)

    db.query('DELETE FROM series_actors WHERE series_actors_id = $1', [series_actors_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Series_actors deleted with ID: ${series_actors_id}`)
    })
}



module.exports = {
    getSeriesActors,
    getSeriesActorsById,
    createSeriesActors,
    updateSeriesActors,
    deleteSeriesActors
}
