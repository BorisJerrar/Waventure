const db = require("../../db/database");

const getSerieSynopsis = (request, response) => {
    const serieId = parseInt(request.params.id)
    
    db.query(
      "SELECT * FROM serie NATURAL JOIN synopsis WHERE serie.serie_id= $1;",
      [serieId],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
};

module.exports = {
    getSerieSynopsis,
};