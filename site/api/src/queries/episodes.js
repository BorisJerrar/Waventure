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
const getEpisodesByEpisodeNumber = (request, response) => {
    const episodes_number = parseInt(request.params.episodes_number)
    db.query('SELECT * FROM episodes WHERE episode_number = $1', [episodes_number], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createEpisodes = (request, response) => {
    const saisonid = request.query.saisonid
    const { title, episode_number, duration, mp3file } = request.body

    db.query('INSERT INTO episodes ( saisonid, title, episode_number, duration, mp3file ) VALUES ($1, $2, $3, $4, $5)', [ saisonid, title, episode_number, duration, mp3file ], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Episode added with ID: ${results.insertId}`)
    })
}

const updateEpisodes = (request, response) => {
    const episodes_id = parseInt(request.params.episodes_id)
    const saisonid = request.query.saisonid
    const { title, episode_number, duration, mp3file } = request.body

    db.query(
        'UPDATE episodes SET saisonid = $1, title = $2, episode_number = $3, duration = $4, mp3file = $5 WHERE episodes_id = $6', [saisonid, title, episode_number, duration, mp3file, episodes_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Episode modified with ID: ${episodes_id}`)
        }
    )
}

const deleteEpisodes = (request, response) => {
    const episodes_id = parseInt(request.params.episodes_id)

    db.query('DELETE FROM episodes WHERE episodes_id = $1', [episodes_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Episode deleted with ID: ${episodes_id}`)
    })
}



module.exports = {
    getEpisodes,
    getEpisodesById,
    getEpisodesByEpisodeNumber,
    createEpisodes,
    updateEpisodes,
    deleteEpisodes
}
