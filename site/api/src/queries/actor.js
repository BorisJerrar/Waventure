const db = require('../../db/database')


const getActor = (request, response) => {
  db.query('SELECT * FROM actor ORDER BY actor_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getActorById = (request, response) => {
  const actor_id = parseInt(request.params.actor_id)
  db.query('SELECT * FROM actor WHERE actor_id = $1', [actor_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createActor = (request, response) => {
    const name = request.query.name

    db.query('INSERT INTO actor ( name ) VALUES ($1)', [ name ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Actor added with ID: ${results.actor_Id}`)
    })
}

const updateActor = (request, response) => {
    const actor_id = parseInt(request.params.actor_id)
    const name = request.query.name
    db.query(
        'UPDATE actor SET name = $1 WHERE actor_id = $2', [name, actor_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`actor modified with ID: ${actor_id}`)
        }
    )
}

const deleteActor = (request, response) => {
    const actor_id = parseInt(request.params.actor_id)

    db.query('DELETE FROM actor WHERE actor_id = $1', [actor_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`actor deleted with ID: ${actor_id}`)
    })
}




module.exports = {
    getActor,
    getActorById,
    createActor,
    updateActor,
    deleteActor
}
