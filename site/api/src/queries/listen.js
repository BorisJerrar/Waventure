const db = require('../../db/database')


const getListen = (request, response) => {
  db.query('SELECT * FROM listen ORDER BY listen_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getListenById = (request, response) => {
  const listen_id = parseInt(request.params.listen_id)
  db.query('SELECT * FROM listen WHERE listen_id = $1 ', [listen_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getListen,
    getListenById
}
