const db = require('../../db/database')


const getSynopsis = (request, response) => {
  db.query('SELECT * FROM synopsis ORDER BY synopsis_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSynopsisById = (request, response) => {
  const synopsis_id = parseInt(request.params.synopsis_id)
  db.query('SELECT * FROM synopsis WHERE synopsis_id = $1', [synopsis_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
    getSynopsis,
    getSynopsisById
}
