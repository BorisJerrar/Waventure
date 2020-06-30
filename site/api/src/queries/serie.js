const db = require("../../db/database");

/**
 * use to request all serie
 * @returns {object} serie 
 */
const getSerie = (request, response) => {
  if(Object.keys(request.query).length === 0){
     db.query("SELECT * FROM serie ORDER BY serie_id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
  }else if(request.query.search !== undefined){
   const map = {
     '%20': " ",
     '%27': "'",
     '%C3%A9':"é",
   }
    const search = request.query.search.replace(/%20|%27|%C3%A9/gi,(item)=>{
      return map[item]
    })
    db.query(`SELECT * FROM search_serie WHERE lower LIKE $1` ,[search], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }else if(request.query.author !== undefined){
    const author = request.query.author
    db.query(`SELECT * FROM serie WHERE author = $1` ,[author], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
};

/**
 * use to request serie by serie_id
 * @param {string} serie_id 
 * @return {object} serie 
 */
const getSerieById = (request, response) => {
  const serie_id = parseInt(request.params.serie_id);
  db.query(
    "SELECT * FROM serie WHERE serie_id = $1",
    [serie_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

/**
 * use to request serie by upload date
 * @returns {object} serie 
 */
const getSerieByUploadDate = (request, response) => {
  db.query(
    "SELECT * FROM serie INNER JOIN synopsis ON synopsis.serie_id = serie.serie_id ORDER BY upload_date DESC LIMIT 10",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


/**
 * use to create serie
 * @param {object} request 
 * @returns {string} response 
 */
const createSerie = (request, response) => {
  const {
    title,
    image,
    image_lg,
    author,
    duration,
    upload_date,
    creation_date,
  } = request.body;

  db.query(
    "INSERT INTO serie ( title, image, image_lg, author, duration, upload_date, creation_date ) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [title, image, image_lg, author, duration, upload_date, creation_date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

/**
 * use to update serie by serie_id 
 * @param {string} serie_id
 * @param {object} serie 
 * @returns {string} response 
 */
const updateSerie = (request, response) => {
  const serie_id = parseInt(request.params.serie_id);
  const {
    title,
    image,
    image_lg,
    author,
    duration,
    upload_date,
    creation_date,
  } = request.body;

  db.query(
    "UPDATE serie SET title = $1, image = $2, image_lg = $3, author = $4, duration = $5, upload_date = $6, creation_date = $7 WHERE serie_id = $8",
    [
      title,
      image,
      image_lg,
      author,
      duration,
      upload_date,
      creation_date,
      serie_id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${serie_id}`);
    }
  );
};

/**
 * use to delete serie by serie_id 
 * @param {string} serie_id 
 * @returns {string} response 
 */
const deleteSerie = (request, response) => {
  const serie_id = parseInt(request.params.serie_id);

  db.query(
    "DELETE FROM serie WHERE serie_id = $1",
    [serie_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${serie_id}`);
    }
  );
};

module.exports = {
  getSerie,
  getSerieById,
  getSerieByUploadDate,
  createSerie,
  updateSerie,
  deleteSerie,
};
