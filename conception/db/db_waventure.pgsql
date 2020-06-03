CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users(
users_id SERIAL NOT NULL PRIMARY KEY ,
userName varchar(25),
firstName varchar(25),
lastName varchar(25),
email varchar(100),
birthDate DATE,
password varchar(64)
        );

INSERT INTO users(userName, firstName, lastName, email, birthDate, password)
VALUES(
'Clorge',
'Gravely',
'Rodney',
'Rondey@mail.com',
'1961-06-16',
crypt('password', gen_salt('md5'))
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

INSERT INTO series(title, image, saison, autor, duration, uploadDate, creationDate)
VALUES(
'Donjon de naheulbeuk',
'/img/image.png',
'1',
'pen of Chaos',
'00:00:60.00',
'2020-06-03',
'1998-05-16'
      );

CREATE TABLE favorites(
favorites_id SERIAL NOT NULL PRIMARY KEY ,
userID serial,
serieID serial,
FOREIGN KEY (userID) REFERENCES users (users_id),
FOREIGN KEY (serieID) REFERENCES series (series_id)
        );

INSERT INTO favorites(userID, serieID)
VALUES (
'1',
'1'
       );

CREATE TABLE saisons(
saisons_id SERIAL NOT NULL PRIMARY KEY ,
serieID serial,
title varchar(100),
saison_number smallint,
quantite smallint,
FOREIGN KEY (serieID) REFERENCES series (series_id)
            );

INSERT INTO saisons(serieID, title, saison_number, quantite)
VALUES(
'1',
'saison 1',
'1',
'13'
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

INSERT INTO episodes(saisonID, title, episode_number, duration, mp3File)
VALUES(
'1',
'first aventure',
'1',
'00:06:49.00',
'/mp3Files/file.mp3'
      );

CREATE TABLE categories(
categories_id SERIAL NOT NULL PRIMARY KEY ,
name varchar(100)
            );

INSERT INTO categories(name)
VALUES(
'heroic fantasy'
      );

CREATE TABLE series_categories(
series_id SERIAL NOT NULL PRIMARY KEY ,
serieID serial,
categoryID serial,
FOREIGN KEY (serieID) REFERENCES series (series_id),
FOREIGN KEY (categoryID) REFERENCES categories (categories_id)
        );

INSERT INTO series_categories(serieID, categoryID)
VALUES(
'1',
'1'
      );
        
CREATE TABLE synopsis(
synopsis_id SERIAL NOT NULL PRIMARY KEY ,   
serieID serial,
body TEXT,
FOREIGN KEY (serieID) REFERENCES series (series_id)
            );

INSERT INTO synopsis(serieID, body)
VALUES(
'1',
'Les aventuriers téméraires partent à l aventure'
      );

CREATE TABLE actors(
actors_id SERIAL NOT NULL PRIMARY KEY,   
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


