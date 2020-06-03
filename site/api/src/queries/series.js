const db = require('../../db/database')

const getSeries = (request, response) => {
    db.query('SELECT * FROM series ORDER BY series_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSerieById = (request, response) => {
    const series_id = parseInt(request.params.series_id)

    db.query('SELECT * FROM series WHERE series_id = $1', [series_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getSeries,
    getSerieById

}
