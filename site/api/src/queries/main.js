const db = require('../../db/database')


const getSagaInfosBySerieId = (request, response) => {
    const series_id = parseInt(request.params.series_id)

    db.query('SELECT * FROM episode INNER JOIN season ON episode.saisonid = season.season_id INNER JOIN series ON season.serie_id = series.series_id INNER JOIN synopsis ON synopsis.serie_id = series.series_id WHERE series.series_id = $1', [series_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



module.exports = {
    getSagaInfosBySerieId
}

