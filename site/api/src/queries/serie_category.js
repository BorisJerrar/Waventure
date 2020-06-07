const db = require('../../db/database')


const getSeriesCategory = (request, response) => {
  db.query('SELECT * FROM series_category', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSeriesCategoryById = (request, response) => {
  const series_category_id = parseInt(request.params.series_category_id)
  db.query('SELECT * FROM series_category WHERE series_id = $1', [series_category_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSeriesCategory = (request, response) => {
    const serie_id = request.query.serie_id
    const categoryid = request.query.categoryid

    db.query('INSERT INTO series_category ( serie_id, categoryid ) VALUES ($1, $2)', [ serie_id, categoryid ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Series_category added with ID: ${results.insertId}`)
    })
}

const updateSeriesCategory = (request, response) => {
    const series_category_id = parseInt(request.params.series_category_id)
    const serie_id = request.query.serie_id
    const categoryid = request.query.categoryid

    db.query(
        'UPDATE series_category SET serie_id = $1, categoryid = $2 WHERE series_id = $3', [serie_id, categoryid, series_category_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Series_category modified with ID: ${series_category_id}`)
        }
    )
}

const deleteSeriesCategory = (request, response) => {
    const series_category_id = parseInt(request.params.series_category_id)

    db.query('DELETE FROM series_category WHERE series_id = $1', [series_category_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Series_category deleted with ID: ${series_category_id}`)
    })
}


module.exports = {
    getSeriesCategory,
    getSeriesCategoryById,
    createSeriesCategory,
    updateSeriesCategory,
    deleteSeriesCategory
}
