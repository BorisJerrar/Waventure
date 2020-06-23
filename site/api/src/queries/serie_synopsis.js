const db = require("../../db/database");

const getSerieSynopsis = (request, response) => {
   const map = {
     '%20': " ",
     '%27': "'",
     '%C3%A9':"é"
   }
    const search = request.query.search.replace(/%20|%27|%C3%A9/gi,(item)=>{
      return map[item]
    })
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