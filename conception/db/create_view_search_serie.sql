CREATE VIEW search_serie AS 
SELECT LOWER(title), serie_id, author, image
FROM serie;

CREATE VIEW search_serie_synopsis AS
SELECT LOWER(title) AS title_lower, title, serie.serie_id, author, image, body, image_lg, image_bg, duration, season, upload_date,  creation_date
FROM serie inner join synopsis on synopsis.serie_id = serie.serie_id;