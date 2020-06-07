const db = require('../../db/database')


const getFavorites = (request, response) => {
  db.query('SELECT * FROM favorites ORDER BY favorites_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFavoritesById = (request, response) => {
    const favorites_id = parseInt(request.params.favorites_id)

    db.query('SELECT * FROM favorites WHERE favorites_id = $1', [favorites_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createFavorites = (request, response) => {
    const userid = request.query.userid
    const serieid = request.query.serieid

    db.query('INSERT INTO favorites ( userid, serieid ) VALUES ($1, $2)', [ userid, serieid ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`favorites added with ID: ${results.insertId}`)
    })
}


const updateFavorites = (request, response) => {
    const favorites_id = parseInt(request.params.favorites_id)
    const userid = request.query.userid
    const serieid = request.query.serieid
    db.query(
        'UPDATE favorites SET userid = $1, serieid = $2 WHERE favorites_id = $3', [userid, serieid, favorites_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`favorites modified with ID: ${favorites_id}`)
        }
    )
}

const deleteFavorites = (request, response) => {
    const favorites_id = parseInt(request.params.favorites_id)

    db.query('DELETE FROM favorites WHERE favorites_id = $1', [favorites_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`favorites deleted with ID: ${favorites_id}`)
    })
}

module.exports = {
    getFavorites,
    getFavoritesById,
    createFavorites,
    updateFavorites,
    deleteFavorites
}
