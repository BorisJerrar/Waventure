const db = require('../../db/database')

const getSerieRole = (request, response) => {
        const serieId = request.params.id
        
        
        db.query('SELECT * FROM serie INNER JOIN serie_actor on serie.serie_id = serie_actor.serie_id INNER JOIN actor on actor.actor_id = serie_actor.actor_id INNER JOIN role on role.actor_id = actor.actor_id where serie.serie_id = $1 AND serie_actor.serie_id = $1 AND role.serie_id = $1', [serieId], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
    

module.exports = {
    getSerieRole
}