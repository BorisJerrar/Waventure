const db = require('../../db/database')


/**
 * use to request all serie_actor
 * @return {object} serie_actor 
 */
const getSerieActor = (request, response) => {
  db.query('SELECT * FROM serie_actor ORDER BY serie_actor_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/**
 * use to request serie_actor by serie_actor_id
 * @param {params} serie_actor_id 
 * @returns {object} serie_actor by id 
 */
const getSerieActorById = (request, response) => {
  const serie_actor_id = parseInt(request.params.serie_actor_id)
  db.query('SELECT * FROM serie_actor WHERE serie_actor_id = $1', [serie_actor_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/**
 * use to create serie_actor
 * @param {query} serie_id 
 * @param {query} actor_id 
 * @return {string} response
 */
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

/**
 * use to update serie_actor by id
 * @param {params} serie_actor_id 
 * @param {query} serie_id
 * @param {query} actor_id
 * @returns {string} response
 */
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

/**
 * use to delete serie_actor by id
 * @param {params} serie_actor_id 
 * @returns {string} response 
 */
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
