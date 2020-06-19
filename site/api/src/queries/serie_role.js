const db = require('../../db/database')

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
    getSerieRole
}