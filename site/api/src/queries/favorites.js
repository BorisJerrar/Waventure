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


module.exports = {
    getFavorites,
    getFavoritesById
}
