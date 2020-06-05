const db = require('../../db/database')


const getUsers = (request, response) => {
  db.query('SELECT * FROM users ORDER BY users_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsersById = (request, response) => {
  const users_id = parseInt(request.params.users_id)
  db.query('SELECT * FROM users WHERE users_id = $1', [users_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUsers = (request, response) => {
    const { username, firstname, lastname, email, birthdate, password } = request.body

    db.query('INSERT INTO users ( username, firstname, lastname, email, birthdate, password ) VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt(\'md5\')))', [username, firstname, lastname, email, birthdate, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUsers = (request, response) => {
    const users_id = parseInt(request.params.users_id)
    const { username, firstname, lastname, email, birthdate,  password } = request.body

    db.query(
        'UPDATE users SET username = $1, firstname = $2, lastname = $3, email = $4, birthdate = $5, password = $6 WHERE users_id = $7', [username, firstname, lastname, email, birthdate, password, users_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${users_id}`)
        }
    )
}

const deleteUsers = (request, response) => {
    const users_id = parseInt(request.params.users_id)

    db.query('DELETE FROM users WHERE users_id = $1', [users_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${users_id}`)
    })
}

module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
}
