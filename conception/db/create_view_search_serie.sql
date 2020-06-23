CREATE VIEW search_serie AS 
SELECT LOWER(title), serie_id, author, image
FROM serie;

CREATE VIEW search_serie_synopsis AS
SELECT LOWER(title) AS title, serie.serie_id, author, image, body
FROM serie inner join synopsis on synopsis.serie_id = serie.serie_id;