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

const createActors = (request, response) => {
    const name = request.query.name

    db.query('INSERT INTO Actors ( name ) VALUES ($1)', [ name  ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Actors added with ID: ${results.actors_Id}`)
    })
}

const updateActors = (request, response) => {
    const actors_id = parseInt(request.params.actors_id)
    const name = request.query.name
    db.query(
        'UPDATE Actors SET name = $1 WHERE actors_id = $2', [name, actors_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`actors modified with ID: ${actors_id}`)
        }
    )
}

const deleteActors = (request, response) => {
    const actors_id = parseInt(request.params.actors_id)

    db.query('DELETE FROM actors WHERE actors_id = $1', [actors_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`actors deleted with ID: ${actors_id}`)
    })
}




module.exports = {
    getActors,
    getActorById,
    createActors,
    updateActors,
    deleteActors
}
