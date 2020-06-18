const db = require('../../db/database')

const getAvatar = (request, response) => {
    db.query('SELECT * FROM avatar ORDER BY avatar_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getAvatar,
  }
 