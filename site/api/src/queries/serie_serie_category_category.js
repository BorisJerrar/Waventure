const db = require('../../db/database')

const getSerieByCategory = (request, response) =>{
    const category_id = parseInt(request.params.category_id)
    console.log(category_id);
    
    db.query('SELECT * FROM category INNER JOIN serie_category ON serie_category.category_id = category.category_id INNER JOIN serie ON serie.serie_id = serie_category.serie_id WHERE category.category_id = $1', [category_id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSerieByCategory
}