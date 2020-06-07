const db = require('../../db/database')


const getListen = (request, response) => {
  db.query('SELECT * FROM listen ORDER BY listen_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getListenById = (request, response) => {
  const listen_id = parseInt(request.params.listen_id)
  db.query('SELECT * FROM listen WHERE listen_id = $1 ', [listen_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createListen = (request, response) => {
    const account_id = request.query.account_id
    const episodeid = request.query.episodeid
    const duration = request.query.duration

    db.query('INSERT INTO listen ( account_id, episodeid, duration ) VALUES ($1, $2, $3)', [ account_id, episodeid, duration ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`listen added with ID: ${results.insertId}`)
    })
}

const updateListen = (request, response) => {
    const listen_id = parseInt(request.params.listen_id)
    const account_id = request.query.account_id
    const episodeid = request.query.episodeid
    const duration = request.query.duration
    db.query(
        'UPDATE listen SET account_id = $1, episodeid = $2, duration = $3 WHERE listen_id = $4', [account_id, episodeid, duration, listen_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`listen modified with ID: ${listen_id}`)
        }
    )
}

const deleteListen = (request, response) => {
    const listen_id = parseInt(request.params.listen_id)

    db.query('DELETE FROM listen WHERE listen_id = $1', [listen_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`listen deleted with ID: ${listen_id}`)
    })
}


module.exports = {
    getListen,
    getListenById,
    createListen,
    updateListen,
    deleteListen
}
