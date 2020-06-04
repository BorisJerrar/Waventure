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

const createSeriesCategories = (request, response) => {
    const serieid = request.query.serieid
    const categoryid = request.query.categoryid

    db.query('INSERT INTO series_categories ( serieid, categoryid ) VALUES ($1, $2)', [ serieid, categoryid ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Series_categories added with ID: ${results.insertId}`)
    })
}

const updateSeriesCategories = (request, response) => {
    const series_categories_id = parseInt(request.params.series_categories_id)
    const serieid = request.query.serieid
    const categoryid = request.query.categoryid

    db.query(
        'UPDATE series_categories SET serieid = $1, categoryid = $2 WHERE series_id = $3', [serieid, categoryid, series_categories_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Series_categories modified with ID: ${series_categories_id}`)
        }
    )
}

const deleteSeriesCategories = (request, response) => {
    const series_categories_id = parseInt(request.params.series_categories_id)

    db.query('DELETE FROM series_categories WHERE series_id = $1', [series_categories_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Series_categories deleted with ID: ${series_categories_id}`)
    })
}


module.exports = {
    getSeriesCategories,
    getSeriesCategoriesById,
    createSeriesCategories,
    updateSeriesCategories,
    deleteSeriesCategories
}
