const db = require('../../db/database')


const getSeason = (request, response) => {
  db.query('SELECT * FROM season ORDER BY season_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getSeasonById = (request, response) => {
    const season_id = parseInt(request.params.season_id)

    db.query('SELECT * FROM season WHERE season_id = $1', [season_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createSeason = (request, response) => {
    const serie_id = request.query.serie_id
    const { title, season_nb, quantite } = request.body

    db.query('INSERT INTO season ( serie_id, title, season_nb, quantite ) VALUES ($1, $2, $3, $4)', [ serie_id, title, season_nb, quantite ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Season added with ID: ${results.insertId}`)
    })
}

const updateSeason = (request, response) => {
    const season_id = parseInt(request.params.season_id)
    const serie_id = request.query.serie_id
    const { title, season_nb, quantite } = request.body

    db.query(
        'UPDATE season SET serie_id = $1, title = $2, season_nb = $3, quantite = $4 WHERE season_id = $5', [serie_id, title, season_nb, quantite, season_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Season modified with ID: ${season_id}`)
        }
    )
}

const deleteSeason = (request, response) => {
    const season_id = parseInt(request.params.season_id)

    db.query('DELETE FROM season WHERE season_id = $1', [season_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Season deleted with ID: ${season_id}`)
    })
}



module.exports = {
    getSeason,
    getSeasonById,
    createSeason,
    updateSeason,
    deleteSeason
}
