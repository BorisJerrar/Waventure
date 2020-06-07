const db = require('../../db/database')


const getFavorites = (request, response) => {
  db.query('SELECT * FROM favorite ORDER BY favorite_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFavoritesById = (request, response) => {
    const favorite_id = parseInt(request.params.favorite_id)

    db.query('SELECT * FROM favorite WHERE favorite_id = $1', [favorite_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createFavorites = (request, response) => {
    const account_id = request.query.account_id
    const serie_id = request.query.serie_id

    db.query('INSERT INTO favorite ( account_id, serie_id ) VALUES ($1, $2)', [ account_id, serie_id ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`favorite added with ID: ${results.insertId}`)
    })
}


const updateFavorites = (request, response) => {
    const favorite_id = parseInt(request.params.favorite_id)
    const account_id = request.query.account_id
    const serie_id = request.query.serie_id
    db.query(
        'UPDATE favorite SET account_id = $1, serie_id = $2 WHERE favorite_id = $3', [account_id, serie_id, favorite_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`favorite modified with ID: ${favorite_id}`)
        }
    )
}

const deleteFavorites = (request, response) => {
    const favorite_id = parseInt(request.params.favorite_id)

    db.query('DELETE FROM favorite WHERE favorite_id = $1', [favorite_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`favorite deleted with ID: ${favorite_id}`)
    })
}

module.exports = {
    getFavorites,
    getFavoritesById,
    createFavorites,
    updateFavorites,
    deleteFavorites
}
