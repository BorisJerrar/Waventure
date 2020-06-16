CREATE VIEW search_serie AS 
SELECT LOWER(title), serie_id, author, image
FROM serie