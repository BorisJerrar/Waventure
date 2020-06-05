CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
      users_id serial NOT NULL PRIMARY KEY,
      userName varchar(25),
      firstName varchar(25),
      lastName varchar(25),
      email varchar(100),
      birthDate date,
      password varchar(64)
);

INSERT INTO users (userName, firstName, lastName, email, birthDate, PASSWORD)
      VALUES ('Clorge', 'Gravely', 'Rodney', 'Rondey@mail.com', '1961-06-16', crypt('password', gen_salt('md5')));

CREATE TABLE series (
      series_id serial NOT NULL PRIMARY KEY,
      title varchar(100),
      image varchar(150),
      imageLg varchar(150),
      saison smallint,
      autor varchar(60),
      duration time,
      uploadDate date,
      creationDate date
);

CREATE TABLE favorites (
      favorites_id serial NOT NULL PRIMARY KEY,
      userID serial,
      serieID serial,
      FOREIGN KEY (userID) REFERENCES users (users_id),
      FOREIGN KEY (serieID) REFERENCES series (series_id)
);

INSERT INTO favorites (userID, serieID)
      VALUES ('1', '1');

CREATE TABLE saisons (
      saisons_id serial NOT NULL PRIMARY KEY,
      serieID serial,
      title varchar(100),
      saison_number smallint,
      quantite smallint,
      FOREIGN KEY (serieID) REFERENCES series (series_id)
);

INSERT INTO saisons (serieID, title, saison_number, quantite)
      VALUES ('2', 'saison 1', '1', '13');

CREATE TABLE episodes (
      episodes_id serial NOT NULL PRIMARY KEY,
      saisonID serial,
      title varchar(100),
      episode_number smallint,
      duration time,
      mp3File varchar(255),
      FOREIGN KEY (saisonID) REFERENCES saisons (saisons_id)
);

INSERT INTO episodes (saisonID, title, episode_number, duration, mp3File)
      VALUES ('2', 'first aventure', '1', '00:06:49.00', 'titletest');

CREATE TABLE categories (
      categories_id serial NOT NULL PRIMARY KEY,
      name varchar(100)
);

INSERT INTO categories (name)
      VALUES ('heroic fantasy');

CREATE TABLE series_categories (
      series_id serial NOT NULL PRIMARY KEY,
      serieID serial,
      categoryID serial,
      FOREIGN KEY (serieID) REFERENCES series (series_id),
      FOREIGN KEY (categoryID) REFERENCES categories (categories_id)
);

INSERT INTO series_categories (serieID, categoryID)
      VALUES ('1', '1');

CREATE TABLE synopsis (
      synopsis_id serial NOT NULL PRIMARY KEY,
      serieID serial,
      body text,
      FOREIGN KEY (serieID) REFERENCES series (series_id)
);

CREATE TABLE actors (
      actors_id serial NOT NULL PRIMARY KEY,
      name varchar(100)
);

INSERT INTO actors (name)
      VALUES ('jean phil');

CREATE TABLE ROLE (
      roles_id serial NOT NULL PRIMARY KEY,
      actorID serial,
      character varchar(100),
      FOREIGN KEY (actorID) REFERENCES actors (actors_id)
);

INSERT INTO ROLE (character)
      VALUES ('poisson rouge');

CREATE TABLE series_actors (
      series_actors_id serial NOT NULL PRIMARY KEY,
      serieID serial,
      actorID serial,
      FOREIGN KEY (serieID) REFERENCES series (series_id),
      FOREIGN KEY (actorID) REFERENCES actors (actors_id)
);

CREATE TABLE LISTEN (
      listen_id serial NOT NULL PRIMARY KEY,
      userID serial,
      episodeID serial,
      duration time,
      FOREIGN KEY (userID) REFERENCES users (users_id),
      FOREIGN KEY (episodeID) REFERENCES episodes (episodes_id)
);

INSERT INTO series (title, image, imageLg, saison, autor, duration, uploadDate, creationDate)
      VALUES ('Clyde Vanilla', 'clydevanilla.jpg', 'clydevanillaLg.jpg', '1', 'Antoine Daniel', '00:03:11.00', '2020-06-03', '2017-09-17'), ('Le Donjon de Naheulbeuk', 'ledonjondenaheulbeuk.jpg', 'ledonjondenaheulbeukLg.jpg', '4', 'Pen of Chaos', '00:04:53.00', '2020-06-03', '2001-01-01'), ('Adoprixtoxis', 'adoprixtoxis.jpg', 'adoprixtoxisLg.jpg', '1', 'Nico et Matt', '00:03:44.00', '2020-06-03', '2002-01-01'), ('La légende de Xantah', 'Xantah.jpg', 'XantahLg.jpg', '1', 'Nico et Matt', '00:03:36.39', '2020-06-03', '2010-01-01'), ('Reflets d''Acide', 'rda.jpg', 'rdaLg.jpg', '1', 'JBX', '00:09:14.00', '2020-06-03', '2002-12-01'), ('Les Aventuriers du NHL2987 Survivaure', 'survivaure.jpg', 'survivaureLg.jpg', '1', 'Knarf', '00:03:26.41', '2020-06-03', '2001-12-24'), ('Agent 0', 'agent0.jpg', 'agent0Lg.jpg', '1', 'Flo', '00:03:31.00', '2020-06-03', '2006-08-25'), ('Trimoria', 'trimoria.jpg', 'trimoriaLg.jpg', '1', 'Flo', '00:02:07.35', '2020-06-03', '2008-03-19');
INSERT INTO categories (name)
      VALUES ('Aventure Médiéval'),('Aventure Spatiale');
