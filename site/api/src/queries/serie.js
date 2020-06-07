const db = require('../../db/database')

const getSerie = (request, response) => {
    db.query('SELECT * FROM serie ORDER BY serie_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSerieById = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)

    db.query('SELECT * FROM serie WHERE serie_id = $1', [serie_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createSerie = (request, response) => {
    const { title, image, imagelg, autor, duration, uploaddate, creationdate } = request.body

    db.query('INSERT INTO serie ( title, image, imagelg, autor, duration, uploaddate, creationdate ) VALUES ($1, $2, $3, $4, $5, $6, $7)', [title, image, imagelg, autor, duration, uploaddate, creationdate], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateSerie = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)
    const { title, image, imagelg, autor, duration, uploaddate, creationdate } = request.body

    db.query(
        'UPDATE serie SET title = $1, image = $2, imagelg = $3, autor = $4, duration = $5, uploaddate = $6, creationdate = $7 WHERE serie_id = $8', [title, image, imagelg, autor, duration, uploaddate, creationdate, serie_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${serie_id}`)
        }
    )
}

const deleteSerie = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)

    db.query('DELETE FROM serie WHERE serie_id = $1', [serie_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${serie_id}`)
    })
}

module.exports = {
    getSerie,
    getSerieById,
    createSerie,
    updateSerie,
    deleteSerie
}
