const db = require('../../db/database')


const getEpisodes = (request, response) => {
  db.query('SELECT * FROM episodes ORDER BY episodes_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEpisodesById = (request, response) => {
    const episodes_id = parseInt(request.params.episodes_id)

    db.query('SELECT * FROM episodes WHERE episodes_id = $1', [episodes_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getEpisodes,
    getEpisodesById
}
