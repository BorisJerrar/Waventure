const db = require('../../db/database')


const getSaisons = (request, response) => {
  db.query('SELECT * FROM saisons ORDER BY saisons_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getSaisonById = (request, response) => {
    const saisons_id = parseInt(request.params.saisons_id)

    db.query('SELECT * FROM saisons WHERE saisons_id = $1', [saisons_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createSaisons = (request, response) => {
    const serieid = request.query.serieid
    const { title, saison_number, quantite } = request.body

    db.query('INSERT INTO saisons ( serieid, title, saison_number, quantite ) VALUES ($1, $2, $3, $4)', [ serieid, title, saison_number, quantite ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Saison added with ID: ${results.insertId}`)
    })
}

const updateSaisons = (request, response) => {
    const saisons_id = parseInt(request.params.saisons_id)
    const serieid = request.query.serieid
    const { title, saison_number, quantite } = request.body

    db.query(
        'UPDATE saisons SET serieid = $1, title = $2, saison_number = $3, quantite = $4 WHERE saisons_id = $5', [serieid, title, saison_number, quantite, saisons_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Saison modified with ID: ${saisons_id}`)
        }
    )
}

const deleteSaisons = (request, response) => {
    const saisons_id = parseInt(request.params.saisons_id)

    db.query('DELETE FROM saisons WHERE saisons_id = $1', [saisons_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Saison deleted with ID: ${saisons_id}`)
    })
}



module.exports = {
    getSaisons,
    getSaisonById,
    createSaisons,
    updateSaisons,
    deleteSaisons
}
