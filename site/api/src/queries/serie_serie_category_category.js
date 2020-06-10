const db = require('../../db/database')

const getSerieByCategory = (request, response) =>{
    db.query('SELECT * FROM catgeory INNER JOIN serie_category ON serie_category.category_id = category.category_id INNER JOIN serie ON serie.serie_id = serie_category.serie_id WHERE category.category_id')
}