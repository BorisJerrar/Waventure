const db = require('../../db/database')

const getSeries = (request, response) => {
    db.query('SELECT * FROM series ORDER BY series_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSeries
}
