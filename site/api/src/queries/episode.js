const db = require("../../db/database");

const getEpisode = (request, response) => {
  db.query(
    "SELECT * FROM episode ORDER BY episode_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getEpisodeById = (request, response) => {
  const episode_id = parseInt(request.params.episode_id);

  db.query(
    "SELECT * FROM episode WHERE episode_id = $1",
    [episode_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getEpisodeBySeasonAndSaga = (request, response) => {
  const serie_id = parseInt(request.params.serie_id);

  db.query(
    `SELECT testing.title, testing.season_nb, array_agg(testing.episode_id) AS 
    episode_id, array_agg(testing.episode_nb) AS 
    episode_number ,array_agg(testing.episode_title)  
    AS episode_title, array_agg(testing.mp3_file) AS 
    mp3_file FROM ( SELECT serie.serie_id, season.serie_id, 
    serie.title, episode.season_id, 
    season.season_id, season.season_nb, episode.episode_id, episode.episode_nb, 
    episode.episode_title, episode.mp3_file FROM serie, season, episode WHERE episode.season_id  = 
    season.season_id AND serie.serie_id = season.serie_id AND serie.serie_id = $1 
    AND season.serie_id = $1) AS testing GROUP BY (testing.season_nb, testing.title) 
    ORDER BY testing.season_nb ASC`,

    [serie_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getEpisodeByEpisodeNumber = (request, response) => {
  const episode_nb = parseInt(request.params.episode_nb);
  db.query(
    "SELECT * FROM episode WHERE episode_nb = $1",
    [episode_nb],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createEpisode = (request, response) => {
  const saison_id = request.query.saisonid;
  const { title, episode_nb, duration, mp3file } = request.body;

  db.query(
    "INSERT INTO episode ( saison_id, title, episode_nb, duration, mp3file ) VALUES ($1, $2, $3, $4, $5)",
    [saison_id, title, episode_nb, duration, mp3file],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Episode added with ID: ${results.insertId}`);
    }
  );
};

const updateEpisode = (request, response) => {
  const episode_id = parseInt(request.params.episode_id);
  const saison_id = request.query.saisonid;
  const { title, episode_nb, duration, mp3file } = request.body;

  db.query(
    "UPDATE episode SET saison_id = $1, title = $2, episode_nb = $3, duration = $4, mp3file = $5 WHERE episode_id = $6",
    [saison_id, title, episode_nb, duration, mp3file, episode_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Episode modified with ID: ${episode_id}`);
    }
  );
};

const deleteEpisode = (request, response) => {
  const episode_id = parseInt(request.params.episode_id);

  db.query(
    "DELETE FROM episode WHERE episode_id = $1",
    [episode_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Episode deleted with ID: ${episode_id}`);
    }
  );
};

module.exports = {
  getEpisode,
  getEpisodeById,
  getEpisodeByEpisodeNumber,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getEpisodeBySeasonAndSaga,
};
