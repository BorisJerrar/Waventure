const db = require("../../db/database");

const getSerieSynopsis = (request, response) => {
  const regex = /%20/gi
  const search = request.query.search.replace(regex,' ')
    console.log(search);
    
    db.query(
      "SELECT * FROM search_serie_synopsis WHERE title LIKE $1;",
      [search],
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