
CREATE TABLE users(
users_id SERIAL NOT NULL PRIMARY KEY ,
userName varchar(25),
firstName varchar(25),
lastName varchar(25),
email varchar(100),
birthDate DATE,
password varchar(64)
        );

CREATE TABLE series(
series_id SERIAL NOT NULL PRIMARY KEY ,
title varchar(100),
image varchar(150),
saison smallint,
autor varchar(60),
duration time,
uploadDate DATE,
creationDate DATE
            );

CREATE TABLE favorites(
favorites_id SERIAL NOT NULL PRIMARY KEY ,
userID serial,
serieID serial,
FOREIGN KEY (userID) REFERENCES users (users_id),
FOREIGN KEY (serieID) REFERENCES series (series_id)
        );

CREATE TABLE saisons(
saisons_id SERIAL NOT NULL PRIMARY KEY ,
serieID serial,
title varchar(100),
saison_number smallint,
quantite smallint,
FOREIGN KEY (serieID) REFERENCES series (series_id)
            );

CREATE TABLE episodes(
episodes_id SERIAL NOT NULL PRIMARY KEY ,
saisonID serial,
title varchar(100),
episode_number smallint,
duration time,
mp3File varchar(255),
FOREIGN KEY (saisonID) REFERENCES saisons (saisons_id)
        );


CREATE TABLE categories(
categories_id SERIAL NOT NULL PRIMARY KEY ,
name varchar(100)
            );

CREATE TABLE series_categories(
series_id SERIAL NOT NULL PRIMARY KEY ,
serieID serial,
categoryID serial,
FOREIGN KEY (serieID) REFERENCES series (series_id),
FOREIGN KEY (categoryID) REFERENCES categories (categories_id)
        );
        
CREATE TABLE synopsis(
synopsis_id SERIAL NOT NULL PRIMARY KEY ,   
serieID serial,
body TEXT,
FOREIGN KEY (serieID) REFERENCES series (series_id)
            );

CREATE TABLE actors(
actors_id SERIAL NOT NULL PRIMARY KEY ,   
name varchar(100)
            );

CREATE TABLE role(
roles_id SERIAL NOT NULL PRIMARY KEY ,   
actorID serial,
character varchar(100),
FOREIGN KEY (actorID) REFERENCES actors (actors_id)
            );

CREATE TABLE series_actors(
series_actors_id SERIAL NOT NULL PRIMARY KEY ,   
serieID serial,
actorID serial,
FOREIGN KEY (serieID) REFERENCES series (series_id),
FOREIGN KEY (actorID) REFERENCES actors (actors_id)
            );


CREATE TABLE listen(
listen_id SERIAL NOT NULL PRIMARY KEY ,
userID serial,
episodeID serial,
duration time,
FOREIGN KEY (userID) REFERENCES users (users_id),
FOREIGN KEY (episodeID) REFERENCES episodes (episodes_id)
        );


