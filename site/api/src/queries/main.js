const db = require('../../db/database')

/**
 * use to request saga infos by serie_id
 * @param {params} serie_id 
 * @return {object} episode, season, serie, synopsis 
 */
const getSagaInfosBySerieId = (request, response) => {
    const serie_id = parseInt(request.params.serie_id)
    db.query(`SELECT * FROM episode 
        INNER JOIN season ON episode.season_id = season.season_id 
        INNER JOIN serie ON season.serie_id = serie.serie_id 
        INNER JOIN synopsis ON synopsis.serie_id = serie.serie_id 
        WHERE serie.serie_id = $1`, [serie_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * use to request serie and synopsis by id
 * @param {params} serie_id 
 * @returns {object} serie, synopsis 
 */
const getSerieSynopsisBySerieId = (req, res) => {
    const serieId = parseInt(req.params.id)
    db.query("select * FROM serie NATURAL JOIN synopsis WHERE serie_id = $1", [serieId], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    }
    );
}

/**
 * use to request serie by search
 * @param {query} search 
 * @returns {object} serie 
 */
const getSerieSynopsis = (request, response) => {
    const map = {
        '%20': " ",
        '%27': "'",
        '%C3%A9': "é"
    }
    const search = request.query.search.replace(/%20|%27|%C3%A9/gi, (item) => {
        return map[item]
    })

    db.query(
        "SELECT * FROM search_serie_synopsis WHERE title LIKE $1;",
        [search],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};


/**
 * use to request actor by serie
 * @param {params} serie_id 
 * @returns {object} actor, serie 
 */
const getSerieRole = (request, response) => {
    const serieId = request.params.id
    db.query(`SELECT author, serie_role.name, array_agg(serie_role.character) AS role 
                FROM ( SELECT actor.name, role.character, serie.title,serie.serie_id, role.actor_id, serie.author 
                FROM actor, role, serie_actor, serie 
                WHERE actor.actor_id = role.actor_id AND role.actor_id = serie_actor.actor_id AND serie_actor.serie_id = serie.serie_id 
                AND serie.serie_id = $1 AND serie_actor.serie_id = $1 AND role.serie_id = $1) 
                AS serie_role GROUP BY (serie_role.name, author);`, [serieId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getSagaInfosBySerieId,
    getSerieSynopsisBySerieId,
    getSerieSynopsis,
    getSerieRole
}

