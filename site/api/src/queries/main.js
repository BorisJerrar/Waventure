const db = require('../../db/database')


const getSagaInfosBySerieId = (request, response) => {
    const series_id = parseInt(request.params.serie_id)

    db.query('SELECT * FROM episode INNER JOIN season ON episode.season_id = season.season_id INNER JOIN serie ON season.serie_id = serie.serie_id INNER JOIN synopsis ON synopsis.serie_id = serie.serie_id WHERE serie.serie_id = $1', [series_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



module.exports = {
    getSagaInfosBySerieId
}

