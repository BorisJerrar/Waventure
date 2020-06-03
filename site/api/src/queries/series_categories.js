const db = require('../../db/database')


const getSeriesCategories = (request, response) => {
  db.query('SELECT * FROM series_categories', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getSeriesCategories
}
