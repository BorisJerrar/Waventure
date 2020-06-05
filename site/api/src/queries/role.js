const db = require('../../db/database')


const getRole = (request, response) => {
  db.query('SELECT * FROM role ORDER BY roles_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRoleById = (request, response) => {
  const roles_id = parseInt(request.params.roles_id)
  db.query('SELECT * FROM role WHERE roles_id = $1 ', [roles_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRole = (request, response) => {
    const actorid = request.query.actorid
    const character = request.query.character

    db.query('INSERT INTO role ( actorid, character ) VALUES ($1, $2)', [ actorid, character ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`role added with ID: ${results.insertId}`)
    })
}

const updateRole = (request, response) => {
    const roles_id = parseInt(request.params.roles_id)
    const actorid = request.query.actorid
    const character = request.query.character

    db.query(
        'UPDATE role SET actorid = $1, character = $2 WHERE roles_id = $3', [actorid, character, roles_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Role modified with ID: ${roles_id}`)
        }
    )
}

const deleteRole = (request, response) => {
    const roles_id = parseInt(request.params.roles_id)

    db.query('DELETE FROM role WHERE roles_id = $1', [roles_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`role deleted with ID: ${roles_id}`)
    })
}


module.exports = {
    getRole,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}
