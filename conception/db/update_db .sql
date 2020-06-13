ALTER TABLE episode
RENAME COLUMN duration TO episode_duration;

ALTER TABLE episode
RENAME COLUMN title TO episode_title;

UPDATE serie
SET upload_date = '2020-06-13'
WHERE serie_id = 4; 