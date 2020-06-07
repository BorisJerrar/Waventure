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

const createSeries = (request, response) => {
    const { title, image, imagelg, autor, duration, uploaddate, creationdate } = request.body

    db.query('INSERT INTO series ( title, image, imagelg, autor, duration, uploaddate, creationdate ) VALUES ($1, $2, $3, $4, $5, $6, $7)', [title, image, imagelg, autor, duration, uploaddate, creationdate], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateSeries = (request, response) => {
    const series_id = parseInt(request.params.series_id)
    const { title, image, imagelg, autor, duration, uploaddate, creationdate } = request.body

    db.query(
        'UPDATE series SET title = $1, image = $2, imagelg = $3, autor = $4, duration = $5, uploaddate = $6, creationdate = $7 WHERE series_id = $8', [title, image, imagelg, autor, duration, uploaddate, creationdate, series_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${series_id}`)
        }
    )
}

const deleteSeries = (request, response) => {
    const series_id = parseInt(request.params.series_id)

    db.query('DELETE FROM series WHERE series_id = $1', [series_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${series_id}`)
    })
}

module.exports = {
    getSeries,
    getSerieById,
    createSeries,
    updateSeries,
    deleteSeries
}
