const db = require('../../db/database')
const jwt = require('jsonwebtoken')

/**
 * use to request all favorite for user
 * @param {headers} token 
 * @return {object} favorite 
 */
const getFavorites = (request, response) => {
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)
    db.query('SELECT * FROM favorite WHERE account_id = $1', [decoded.account_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * use to request serie info by user
 * @param {headers} token 
 * @returns {object} favorite, serie, synopsis 
 */
const getFavoritesInfo = (request, response) => {
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)
    db.query(`SELECT * FROM favorite INNER JOIN serie
    ON favorite.serie_id = serie.serie_id
    INNER JOIN synopsis
    ON serie.serie_id = synopsis.serie_id
    WHERE account_id = $1
    ;`
    , [decoded.account_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


/**
 * use to request response if relation favorite/account exists
 * @param {headers} token 
 * @param {params} serie_id
 * @returns {boolean} true false
 */
const getFavoritesById = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)
    db.query('SELECT EXISTS (SELECT favorite FROM favorite WHERE serie_id = $1 AND account_id = $2)', [serie_id, decoded.account_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

/**
 * use to create favorite for user
 * @param {headers} token 
 * @param {params} serie_id 
 * @returns {string} response
 */
const createFavorites = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)

    db.query('INSERT INTO favorite ( account_id, serie_id ) VALUES ($1, $2)', [decoded.account_id, serie_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send({message: `favori ajouter à votre liste`})
    })
}

/**
 * 
 * @param {headers} token 
 * @param {params} serie_id
 * @returns {string} response 
 */
const deleteFavorites = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)
    const token = request.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET)
    db.query('DELETE FROM favorite WHERE serie_id = $1 AND account_id = $2', [serie_id, decoded.account_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({message: `favori supprimer de votre liste`})
    })
}

module.exports = {
    getFavorites,
    getFavoritesById,
    createFavorites,
    deleteFavorites,
    getFavoritesInfo,
}
