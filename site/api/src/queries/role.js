const db = require('../../db/database')


const getRole = (request, response) => {
  db.query('SELECT * FROM role ORDER BY role_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRoleById = (request, response) => {
  const role_id = parseInt(request.params.role_id)
  db.query('SELECT * FROM role WHERE role_id = $1 ', [role_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRole = (request, response) => {
    const actor_id = request.query.actor_id
    const character = request.query.character

    db.query('INSERT INTO role ( actor_id, character ) VALUES ($1, $2)', [ actor_id, character ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`role added with ID: ${results.insertId}`)
    })
}

const updateRole = (request, response) => {
    const role_id = parseInt(request.params.role_id)
    const actor_id = request.query.actor_id
    const character = request.query.character

    db.query(
        'UPDATE role SET actor_id = $1, character = $2 WHERE role_id = $3', [actor_id, character, role_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Role modified with ID: ${role_id}`)
        }
    )
}

const deleteRole = (request, response) => {
    const role_id = parseInt(request.params.role_id)

    db.query('DELETE FROM role WHERE role_id = $1', [role_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`role deleted with ID: ${role_id}`)
    })
}


module.exports = {
    getRole,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}
