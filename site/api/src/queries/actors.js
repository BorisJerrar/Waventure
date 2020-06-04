const db = require('../../db/database')


const getActors = (request, response) => {
  db.query('SELECT * FROM actors ORDER BY actors_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getActorById = (request, response) => {
  const actors_id = parseInt(request.params.actors_id)
  db.query('SELECT * FROM actors WHERE actors_id = $1', [actors_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getActors,
    getActorById
}
