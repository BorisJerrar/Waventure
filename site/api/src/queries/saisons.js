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


module.exports = {
    getSaisons,
    getSaisonById
}
