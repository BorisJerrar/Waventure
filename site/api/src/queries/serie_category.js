const db = require('../../db/database')


const getSerieCategory = (request, response) => {
  db.query('SELECT * FROM serie_category', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSerieCategoryById = (request, response) => {
  const serie_category_id = parseInt(request.params.serie_category_id)
  db.query('SELECT * FROM serie_category WHERE serie_id = $1', [serie_category_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSerieCategory = (request, response) => {
    const serie_id = request.query.serie_id
    const categoryid = request.query.categoryid

    db.query('INSERT INTO serie_category ( serie_id, categoryid ) VALUES ($1, $2)', [ serie_id, categoryid ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Serie_category added with ID: ${results.insertId}`)
    })
}

const updateSerieCategory = (request, response) => {
    const serie_category_id = parseInt(request.params.serie_category_id)
    const serie_id = request.query.serie_id
    const categoryid = request.query.categoryid

    db.query(
        'UPDATE serie_category SET serie_id = $1, categoryid = $2 WHERE serie_id = $3', [serie_id, categoryid, serie_category_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Serie_category modified with ID: ${serie_category_id}`)
        }
    )
}

const deleteSerieCategory = (request, response) => {
    const serie_category_id = parseInt(request.params.serie_category_id)

    db.query('DELETE FROM serie_category WHERE serie_id = $1', [serie_category_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Serie_category deleted with ID: ${serie_category_id}`)
    })
}


module.exports = {
    getSerieCategory,
    getSerieCategoryById,
    createSerieCategory,
    updateSerieCategory,
    deleteSerieCategory
}
