CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE account (
      account_id serial NOT NULL PRIMARY KEY,
      username varchar(25),
      first_name varchar(25),
      last_name varchar(25),
      email varchar(100),
      birth_date date,
      avatar varchar(64),
      password varchar(64)
);

INSERT INTO account (username, first_name, last_name, email, birth_date, avatar, PASSWORD)
      VALUES ('Clorge', 'Gravely', 'Rodney', 'Rondey@mail.com', '1961-06-16', 'avatar.jpg', crypt('password', gen_salt('md5')));

CREATE TABLE serie (
      serie_id serial NOT NULL PRIMARY KEY,
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

CREATE TABLE favorite (
      favorite_id serial NOT NULL PRIMARY KEY,
      account_id serial,
      serie_id serial,
      FOREIGN KEY (account_id) REFERENCES account (account_id),
      FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);



CREATE TABLE season (
      season_id serial NOT NULL PRIMARY KEY,
      serie_id serial,
      title varchar(100),
      season_nb smallint,
      quantite smallint,
      FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);

CREATE TABLE episode (
      episode_id serial NOT NULL PRIMARY KEY,
      season_id serial,
      title varchar(100),
      episode_nb smallint,
      duration time,
      mp3_file varchar(255),
      FOREIGN KEY (season_id) REFERENCES season (season_id)
);

CREATE TABLE category (
      category_id serial NOT NULL PRIMARY KEY,
      name varchar(100)
);
CREATE TABLE serie_category (
      serie_id serial NOT NULL PRIMARY KEY,
      serie_id serial,
      category_id serial,
      FOREIGN KEY (serie_id) REFERENCES serie (serie_id),
      FOREIGN KEY (category_id) REFERENCES category (category_id)
);

INSERT INTO serie_category (serie_id, category_id)
      VALUES ('1', '1');

CREATE TABLE synopsis (
      synopsis_id serial NOT NULL PRIMARY KEY,
      serie_id serial,
      body text,
      FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);

CREATE TABLE actor (
      actor_id serial NOT NULL PRIMARY KEY,
      name varchar(100)
);

INSERT INTO actor (name)
      VALUES ('jean phil');

CREATE TABLE role (
      role_id serial NOT NULL PRIMARY KEY,
      actor_id serial,
      character varchar(100),
      FOREIGN KEY (actor_id) REFERENCES actor (actor_id)
);

INSERT INTO ROLE (character)
      VALUES ('poisson rouge');

CREATE TABLE serie_actor (
      serie_actor_id serial NOT NULL PRIMARY KEY,
      serie_id serial,
      actor_id serial,
      FOREIGN KEY (serie_id) REFERENCES serie (serie_id),
      FOREIGN KEY (actor_id) REFERENCES actor (actor_id)
);

CREATE TABLE LISTEN (
      listen_id serial NOT NULL PRIMARY KEY,
      account_id serial,
      episode_id serial,
      duration time,
      FOREIGN KEY (account_id) REFERENCES account (account_id),
      FOREIGN KEY (episode_id) REFERENCES episode (episode_id)
);

INSERT INTO serie (title, image, image_lg, image_bg, season, author, duration, upload_date, creation_date)
      VALUES ('Clyde Vanilla', 'clydevanilla.jpg', 'clydevanillaLg.jpg', 'clydevanillaBg.jpg', '1', 'Antoine Daniel', '00:03:11.00', '2020-06-03', '2017-09-17'),
      ('Le Donjon de Naheulbeuk', 'ledonjondenaheulbeuk.jpg', 'ledonjondenaheulbeukLg.jpg', 'ledonjondenaheulbeukBg.jpg', '4', 'Pen of Chaos', '00:04:53.00', '2020-06-03', '2001-01-01'),
      ('Adoprixtoxis', 'adoprixtoxis.jpg', 'adoprixtoxisLg.jpg', 'adoprixtoxisBg.jpg','1', 'Nico et Matt', '00:03:44.00', '2020-06-03', '2002-01-01'),
      ('La légende de Xantah', 'Xantah.jpg', 'XantahLg.jpg', 'XantahBg.jpg', '1', 'Nico et Matt', '00:03:36.39', '2020-06-03', '2010-01-01'),
      ('Reflets d''Acide', 'rda.jpg', 'rdaLg.jpg', 'rdaBg.jpg', '1', 'JBX', '00:09:14.00', '2020-06-03', '2002-12-01'),
      ('Les Aventuriers du NHL2987 Survivaure', 'survivaure.jpg', 'survivaureLg.jpg', 'survivaureBg.jpg', '1', 'Knarf', '00:03:26.41', '2020-06-03', '2001-12-24'),
      ('Agent 0', 'agent0.jpg', 'agent0Lg.jpg', 'agent0Bg.jpg', '1', 'Flo', '00:03:31.00', '2020-06-03', '2006-08-25'),
      ('Trimoria', 'trimoria.jpg', 'trimoriaLg.jpg', 'trimoriaBg.jpg', '1', 'Flo', '00:02:07.35', '2020-06-03', '2008-03-19');

INSERT INTO category (name)
      VALUES ('Aventure Médiéval'),('Aventure Spatiale');

INSERT INTO favorite (account_id, serie_id)
      VALUES ('1', '1');

INSERT INTO season (serie_id, title, season_nb, quantite)
      VALUES ('2', 'season 1', '1', '13');

INSERT INTO episode (season_id, title, episode_nb, duration, mp3_file)
      VALUES ('2', 'first aventure', '1', '00:06:49.00', 'titletest');

INSERT INTO category (name)
      VALUES ('heroic fantasy');




