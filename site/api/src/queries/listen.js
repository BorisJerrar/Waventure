const db = require('../../db/database')
const jwt = require('jsonwebtoken')


const getListen = (request, response) => {
  const token = request.headers['x-access-token'];
  const episode_id = request.query.episode_id
  const serie_id = request.query.serie_id
  const decoded = jwt.verify(token, process.env.SECRET)
  db.query("INSERT INTO listen (account_id, serie_id, episode_id, duration) VALUES ($1 , $2 , $3 , '00:00:00')", [decoded.account_id, serie_id ,episode_id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })

}


const getListenById = (request, response) => {
  const token = request.headers['x-access-token'];
  const serie_id = request.query.serie_id
  const decoded = jwt.verify(token, process.env.SECRET)
  db.query('SELECT * FROM listen WHERE serie_id = $1 AND account_id = $2', [serie_id, decoded.account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createListen = (request, response) => {
    const account_id = request.query.account_id
    const episode_id = request.query.episode_id
    const duration = request.query.duration

    db.query('INSERT INTO listen ( account_id, episode_id, duration ) VALUES ($1, $2, $3)', [ account_id, episode_id, duration ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`listen added with ID: ${results}`)
    })
}

const updateListen = (request, response) => {
    const token = request.headers['x-access-token'];
    const serie_id = request.query.serie_id
    const decoded = jwt.verify(token, process.env.SECRET)
    const episodeid = request.query.episode_id
    const duration = request.query.duration
    db.query(
        'UPDATE listen SET episode_id = $2, duration = $3 WHERE account_id = $1 and serie_id = $4', [decoded.account_id, episodeid, duration, serie_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`listen modified`)
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
