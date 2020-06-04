const db = require('../../db/database')


const getSeriesCategories = (request, response) => {
  db.query('SELECT * FROM series_categories', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSeriesCategoriesById = (request, response) => {
  const series_categories_id = parseInt(request.params.series_categories_id)
  db.query('SELECT * FROM series_categories WHERE series_id = $1', [series_categories_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getSeriesCategories,
    getSeriesCategoriesById
}
