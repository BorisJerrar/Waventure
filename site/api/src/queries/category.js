const db = require('../../db/database')

const getCategory = (request, response) => {
    db.query('select * from category ORDER BY category_id ASC;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getCategoryById = (request, response) => {
    const category_id = parseInt(request.params.category_id)

    db.query('SELECT * FROM category WHERE category_id = $1', [category_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCategory = (request, response) => {
    const name = request.query.name

    db.query('INSERT INTO category ( name ) VALUES ($1)', [ name ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`category added with ID: ${results.insertId}`)
    })
}

const updateCategory = (request, response) => {
    const category_id = parseInt(request.params.category_id)
    const name = request.query.name

    db.query(
        'UPDATE category SET name = $1 WHERE category_id = $2', [name, category_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`category modified with ID: ${category_id}`)
        }
    )
}

const deleteCategory = (request, response) => {
    const category_id = parseInt(request.params.category_id)

    db.query('DELETE FROM category WHERE category_id = $1', [category_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`category deleted with ID: ${category_id}`)
    })
}


  module.exports = {
      getCategory,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory
  }
