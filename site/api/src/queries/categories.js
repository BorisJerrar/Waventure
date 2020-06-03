const db = require('../../db/database')

const getCategories = (request, response) => {
    db.query('select * from categories ORDER BY categories_id ASC;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  module.exports = {
      getCategories
  }