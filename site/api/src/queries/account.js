const db = require('../../db/database')


const getAccount = (request, response) => {
  db.query('SELECT * FROM account ORDER BY account_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAccountById = (request, response) => {
  const account_id = parseInt(request.params.account_id)
  db.query('SELECT * FROM account WHERE account_id = $1', [account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAccount = (request, response) => {
    const { accountname, first_name, last_name, email, birth_date, password } = request.body

    db.query('INSERT INTO account ( username, first_name, last_name, email, birth_date, password ) VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt(\'md5\')))', [username, first_name, last_name, email, birth_date, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`account added with ID: ${results.insertId}`)
    })
}

const updateAccount = (request, response) => {
    const account_id = parseInt(request.params.account_id)
    const { accountname, first_name, last_name, email, birth_date, password } = request.body

    db.query(
        'UPDATE account SET username = $1, first_name = $2, last_name = $3, email = $4, birth_date = $5, password = $6 WHERE account_id = $7', [username, first_name, last_name, email, birth_date, password, account_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`account modified with ID: ${account_id}`)
        }
    )
}

const deleteAccount = (request, response) => {
    const account_id = parseInt(request.params.account_id)

    db.query('DELETE FROM account WHERE account_id = $1', [account_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`account deleted with ID: ${account_id}`)
    })
}

module.exports = {
    getAccount,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}
