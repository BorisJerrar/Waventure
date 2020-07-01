const db = require('../../db/database')
const jwt = require('jsonwebtoken')

/**
 * use to request all listen
 * @returns {Object} listen 
 */
const getListen = (request, response) => {
  db.query('SELECT * FROM listen', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/**
 * use to add listen for user
 * @param {headers} token 
 * @param {query} episode_id
 * @param {query} serie_id 
 * @return {string} listen
 */
const addListen = (request, response) => {
  const token = request.headers['x-access-token'];
  const decoded = jwt.verify(token, process.env.SECRET)
  const episode_id = request.query.episode_id    
  const serie_id = request.query.serie_id
   db.query("INSERT INTO listen (account_id, serie_id, episode_id, duration) VALUES ($1 , $2 , $3 , '00:00:00')", [decoded.account_id, serie_id ,episode_id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(`listen added`)
  })
}


/**
 * use to request listen by serie_id and account_id
 * @param {headers} token 
 * @param {query} serie_id 
 * @returns {object} listen
 */
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

/**
 * use to create listen with account_id, episode_id, duration
 * @param {query} account_id 
 * @param {query} episode_id 
 * @param {query} duration
 * @return {string} response
 */
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

/**
 * use to update listen
 * @param {query} serie_id
 * @param {query} episode_id
 * @param {query} duration  
 * @returns {string} response 
 */
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

/**
 * use to delete listen by listen_id 
 * @param {query} listen_id 
 * @returns {string} response 
 */
const deleteListen = (request, response) => {
    const listen_id = request.query.listen_id

    db.query('DELETE FROM listen WHERE listen_id = $1', [listen_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`listen deleted with ID: ${listen_id}`)
    })
}


module.exports = {
    getListen,
    addListen,
    getListenById,
    createListen,
    updateListen,
    deleteListen
}
