/* execute into psql to update your db  */

DELETE FROM serie_category WHERE serie_category_id = 90;
DELETE FROM serie_category WHERE serie_category_id = 35; 

ALTER TABLE episode
RENAME COLUMN duration TO episode_duration;

ALTER TABLE episode
RENAME COLUMN title TO episode_title;

UPDATE serie
SET upload_date = '2020-06-13'
WHERE serie_id = 4; 