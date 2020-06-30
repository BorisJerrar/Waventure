const db = require("../../db/database");


const getSerieSynopsisBySerieId = (req, res) =>{
    const serieId = parseInt(req.params.id) 
   db.query("select * FROM serie NATURAL JOIN synopsis WHERE serie_id = $1", [serieId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  ); 
}

module.exports = {
    getSerieSynopsisBySerieId
}

