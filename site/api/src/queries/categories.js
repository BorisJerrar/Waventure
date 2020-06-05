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

const createCategories = (request, response) => {
    const name = request.query.name

    db.query('INSERT INTO categories ( name ) VALUES ($1)', [ name ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`categories added with ID: ${results.insertId}`)
    })
}

const updateCategories = (request, response) => {
    const categories_id = parseInt(request.params.categories_id)
    const name = request.query.name

    db.query(
        'UPDATE categories SET name = $1 WHERE categories_id = $2', [name, categories_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`categories modified with ID: ${categories_id}`)
        }
    )
}

const deleteCategories = (request, response) => {
    const categories_id = parseInt(request.params.categories_id)

    db.query('DELETE FROM categories WHERE categories_id = $1', [categories_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`categories deleted with ID: ${categories_id}`)
    })
}


  module.exports = {
      getCategories,
      getCategoriesById,
      createCategories,
      updateCategories,
      deleteCategories
  }
