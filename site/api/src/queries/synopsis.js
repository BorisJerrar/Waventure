const db = require('../../db/database')


const getSynopsis = (request, response) => {
  db.query('SELECT * FROM synopsis ORDER BY synopsis_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSynopsisById = (request, response) => {
  const synopsis_id = parseInt(request.params.synopsis_id)
  db.query('SELECT * FROM synopsis WHERE synopsis_id = $1', [synopsis_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSynopsis = (request, response) => {
    const serie_id = request.query.serie_id
    const body = request.query.body

    db.query('INSERT INTO synopsis ( serie_id, body ) VALUES ($1, $2)', [ serie_id, body ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`synopsis added with ID: ${results.insertId}`)
    })
}

const updateSynopsis = (request, response) => {
    const synopsis_id = parseInt(request.params.synopsis_id)
    const serie_id = request.query.serie_id
    const body = request.query.body

    db.query(
        'UPDATE synopsis SET serie_id = $1, body = $2 WHERE synopsis_id = $3', [serie_id, body, synopsis_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Synopsis modified with ID: ${synopsis_id}`)
        }
    )
}

const deleteSynopsis = (request, response) => {
    const synopsis_id = parseInt(request.params.synopsis_id)

    db.query('DELETE FROM synopsis WHERE synopsis_id = $1', [synopsis_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Synopsis deleted with ID: ${synopsis_id}`)
    })
}


module.exports = {
    getSynopsis,
    getSynopsisById,
    createSynopsis,
    updateSynopsis,
    deleteSynopsis
}
