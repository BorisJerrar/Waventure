CREATE TABLE series (
    series_id serial NOT NULL PRIMARY KEY,
    title varchar(100),
    image varchar(150),
    image_lg varchar(150),
    image_bg varchar(150),
    season smallint,
    author varchar(60),
    duration time,
    upload_date date,
    creation_date date
);



COPY series(title,image,image_lg,image_bg,season,author,duration,upload_date,creation_date)
FROM '/Users/borisjerrar/waventure/conception/db/seriesdb/series.csv' DELIMITER ';' CSV HEADER;
