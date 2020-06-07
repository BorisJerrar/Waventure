const db = require('../../db/database')


const getSerieActor = (request, response) => {
  db.query('SELECT * FROM serie_actor ORDER BY serie_actor_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSerieActorById = (request, response) => {
  const serie_actor_id = parseInt(request.params.serie_actor_id)
  db.query('SELECT * FROM serie_actor WHERE serie_actor_id = $1', [serie_actor_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSerieActor = (request, response) => {
    const serie_id = request.query.serie_id
    const actor_id = request.query.actor_id

    db.query('INSERT INTO serie_actor ( serie_id, actor_id ) VALUES ($1, $2)', [ serie_id, actor_id ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Series_actor added with ID: ${results.insertId}`)
    })
}

const updateSerieActor = (request, response) => {
    const serie_actor_id = parseInt(request.params.serie_actor_id)
    const serie_id = request.query.serie_id
    const actor_id = request.query.actor_id

    db.query(
        'UPDATE serie_actor SET serie_id = $1, actor_id = $2 WHERE serie_actor_id = $3', [serie_id, actor_id, serie_actor_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Series_actor modified with ID: ${serie_actor_id}`)
        }
    )
}

const deleteSerieActor = (request, response) => {
    const serie_actor_id = parseInt(request.params.serie_actor_id)

    db.query('DELETE FROM serie_actor WHERE serie_actor_id = $1', [serie_actor_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Series_actor deleted with ID: ${serie_actor_id}`)
    })
}



module.exports = {
    getSerieActor,
    getSerieActorById,
    createSerieActor,
    updateSerieActor,
    deleteSerieActor
}
