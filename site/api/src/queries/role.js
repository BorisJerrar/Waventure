const db = require('../../db/database')


const getRole = (request, response) => {
  db.query('SELECT * FROM role ORDER BY roles_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRoleById = (request, response) => {
  const roles_id = parseInt(request.params.roles_id)
  db.query('SELECT * FROM role WHERE roles_id = $1 ', [roles_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
    getRole,
    getRoleById
}
