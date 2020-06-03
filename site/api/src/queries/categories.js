const db = require('../../db/database')

const getCategories = (request, response) => {
    db.query('select * from categories ORDER BY categories_id ASC;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getCategoriesById = (request, response) => {
    const categories_id = parseInt(request.params.categories_id)

    db.query('SELECT * FROM categories WHERE categories_id = $1', [categories_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


  module.exports = {
      getCategories,
      getCategoriesById
  }
