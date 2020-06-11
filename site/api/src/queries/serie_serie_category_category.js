const db = require('../../db/database')

const getSerieByCategory = (request, response) =>{
    const categoryName = request.params.categoryName    
    db.query('SELECT * FROM category INNER JOIN serie_category ON serie_category.category_id = category.category_id INNER JOIN serie ON serie.serie_id = serie_category.serie_id WHERE category.name = $1', [categoryName], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSerieByCategory
}