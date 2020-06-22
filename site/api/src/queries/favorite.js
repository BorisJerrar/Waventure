const db = require('../../db/database')
const jwt = require('jsonwebtoken')

const getFavorites = (request, response) => {
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)
  db.query('SELECT * FROM favorite WHERE account_id = $1', [decoded.account_id], (error, results) => {
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
    const favorite = request.query.favorite

    db.query('INSERT INTO favorite ( account_id, serie_id, favorite ) VALUES ($1, $2, $3)', [ account_id, serie_id, favorite ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`favorite added with ID: ${results.insertId}`)
    })
}


const updateFavorites = (request, response) => {
    const favorite_id = parseInt(request.params.favorite_id)
    const favorite = request.body.favorite
    db.query(
        'UPDATE favorite SET favorite = $1 WHERE favorite_id = $2', [favorite, favorite_id],
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
