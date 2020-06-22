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

    const serie_id = parseInt(request.params.serie_id)
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)
    db.query('SELECT EXISTS (SELECT favorite FROM favorite WHERE serie_id = $1 AND account_id = $2)', [serie_id, decoded.account_id], (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).send(results.rows)
    })
}

const createFavorites = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)

    db.query('INSERT INTO favorite ( account_id, serie_id ) VALUES ($1, $2)', [ decoded.account_id, serie_id ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`favorite added with ID: ${results.insertId}`)
    })
}



const deleteFavorites = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)

    db.query('DELETE FROM favorite WHERE serie_id = $1 AND account_id = $2', [serie_id, decoded.account_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`favorite deleted with ID: ${serie_id}`)
    })
}

module.exports = {
    getFavorites,
    getFavoritesById,
    createFavorites,
    deleteFavorites
}
