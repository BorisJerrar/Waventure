

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
id uuid DEFAULT uuid_generate_v4(),
userName varchar(25),
firstName varchar(25),
lastName varchar(25),
email varchar(100),
birthDate DATE,
password varchar(64)
        );

CREATE TABLE series(
id uuid DEFAULT uuid_generate_v4(),
title varchar(100),
image varchar(150),
saison int,
autor varchar(60),
duration time,
uploadDate DATE,
creationDate DATE
            );

CREATE TABLE favorites(
id uuid DEFAULT uuid_generate_v4(),
userID varchar(36),
serieID varchar(36)
        );

CREATE TABLE saisons(
id uuid DEFAULT uuid_generate_v4(),
serieID varchar(36),
title varchar(100),
quantite int
            );

CREATE TABLE episodes(
id uuid DEFAULT uuid_generate_v4(),
saisonID varchar(36),
title varchar(100),
duration time,
mp3File varchar(255)
        );

CREATE TABLE series_categories(
id uuid DEFAULT uuid_generate_v4(),
serieID varchar(36),
categoryID varchar(36)
        );

CREATE TABLE categories(
id uuid DEFAULT uuid_generate_v4(),
name varchar(100)
            );

CREATE TABLE synopsis(
id uuid DEFAULT uuid_generate_v4(),   
serieID varchar(36),
body TEXT
            );

CREATE TABLE actors(
id uuid DEFAULT uuid_generate_v4(),   
name varchar(100)
            );

CREATE TABLE role(
id uuid DEFAULT uuid_generate_v4(),   
actorID varchar(36),
character varchar(100)
            );

CREATE TABLE series_actors(
id uuid DEFAULT uuid_generate_v4(),   
serieID varchar(36),
actorID varchar(36)
            );


CREATE TABLE listen(
id uuid DEFAULT uuid_generate_v4(),
userID varchar(36),
episodeID varchar(36),
duration time
        );


