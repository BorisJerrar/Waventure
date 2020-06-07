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

CREATE TABLE season (
    season_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
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

CREATE TABLE favorite (
    favorite_id serial NOT NULL PRIMARY KEY,
    account_id serial,
    serie_id serial,
    FOREIGN KEY (account_id) REFERENCES account (account_id),
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);

CREATE TABLE synopsis (
    synopsis_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
    body text,
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);

CREATE TABLE category (
    category_id serial NOT NULL PRIMARY KEY,
    name varchar(100)
);

CREATE TABLE serie_category (
    serie_category_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
    category_id serial,
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id),
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

CREATE TABLE actor (
    actor_id serial NOT NULL PRIMARY KEY,
    name varchar(100)
);

CREATE TABLE serie_actor (
    serie_actor_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
    actor_id serial,
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id),
    FOREIGN KEY (actor_id) REFERENCES actor (actor_id)
);

CREATE TABLE role (
    role_id serial NOT NULL PRIMARY KEY,
    actor_id serial,
    character varchar(100),
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
VALUES ('Clyde Vanilla', 'clydevanilla.jpg', 'clydevanillaLg.jpg', 'clydevanillaBg.jpg', 1, 'Antoine Daniel', '3:11:00.000', '2020-06-08', '2017-09-17'),
('Le Donjon de Naheulbeuk', 'ledonjondenaheulbeuk.jpg', 'ledonjondenaheulbeukLg.jpg', 'ledonjondenaheulbeukBg.jpg', 4, 'Pen of Chaos', '4:53:00.000', '2020-06-08', '2001-01-01'),
('Adoprixtoxis', 'adoprixtoxis.jpg', 'adoprixtoxisLg.jpg', 'adoprixtoxisBg.jpg', 1, 'Nico et Matt', '3:44:00.000', '2020-06-08', '2002-01-01'),
('La légende de Xantah', 'xantah.jpg', 'xantahLg.jpg', 'xantahBg.jpg', 1, 'Nico et Matt', '3:36:39.000', '2020-06-08', '2010-01-01'),
('Reflets d''Acide', 'rda.jpg', 'rdaLg.jpg', 'rdaBg.jpg', 1, 'JBX', '9:14:00.000', '2020-06-08', '2002-12-01'),
('Les Aventuriers du NHL2987 Survivaure', 'survivaure.jpg', 'survivaureLg.jpg', 'survivaureBg.jpg', 1, 'Knarf', '3:26:41.000', '2020-06-08', '2001-12-24'),
('Agent 0', 'agent0.jpg', 'agent0Lg.jpg', 'agent0Bg.jpg', 1, 'Flo', '3:31:00.000', '2020-06-08', '2006-08-25'),
('Trimoria', 'trimoria.jpg', 'trimoriaLg.jpg', 'trimoriaBg.jpg', 1, 'Flo', '2:07:35.000', '2020-06-08', '2008-03-19'),
('Milhana', 'milhana.jpg', 'milhanaLg.jpg', 'milhanaBg.jpg', 1, 'Zylann', '4:00:07.000', '2020-06-08', '2008-12-01'),
('Le Chasseur', 'leChasseur.jpg', 'leChasseurLg.jpg', 'leChasseurBg.jpg', 1, 'François TJP', '0:27:00.000', '2020-06-08', '2018-09-01'),
('L''appartement', 'lappartement.jpg', 'lappartementLg.jpg', 'lappartementBg.jpg', 1, 'François TJP', '0:32:00.000', '2020-06-08', '2011-01-02'),
('Le Docteur Bonobo Show', 'ledocteurBonoboShow.jpg', 'ledocteurBonoboShowLg.jpg', 'ledocteurBonoboShowBg.jpg', 4, 'Monsieur Za & Double Du', '0:34:53.000', '2020-06-08', '2013-01-01'),
('Les Pourfendeurs', 'lesPourfendeurs.jpg', 'lesPourfendeursLg.jpg', 'lesPourfendeursBg.jpg', 1, 'FAL & François TJP', '2:04:00.000', '2020-06-08', '2017-05-01'),
('Le Vaisseau', 'leVaisseau.jpg', 'leVaisseauLg.jpg', 'leVaisseauBg.jpg', 1, 'François TJP', '0:48:00.000', '2020-06-08', '2016-06-01'),
('Enchaines', 'enchaines.jpg', 'enchainesLg.jpg', 'enchainesBg.jpg', 1, 'thetchaff', '0:31:40.000', '2020-06-08', '2016-09-13'),
('Eden', 'eden.jpg', 'edenLg.jpg', 'edenBg.jpg', 3, 'Antoine Rouaud', '6:40:00.000', '2020-06-08', '2009-05-23'),

('Eden Sacrifice', 'edenSacrifice.jpg', 'edenSacrificeLg.jpg', 'edenSacrificeBg.jpg', 1, 'Antoine Rouaud', '1:47:00.000', '2020-06-08', '2012-01-01'),
('Poséidôme', 'poseidome.jpg', 'poseidome.jpg', 'poseidome.jpg', 1, 'David Uystpruyst', '1:12:46.000', '2020-06-08', '2011-01-10'),
('Le Cacao Qui Tue', 'leCacaoQuiTue.jpg', 'leCacaoQuiTueLg.jpg', 'leCacaoQuiTueBg.jpg', 1, 'Hélène & Sébastien', '2:51:00.000', '2020-06-08', '2014-04-13'),
('Les Contes De Fitzgerald', 'lesContesDeFitzgerald.jpg', 'lesContesDeFitzgerald.jpg', 'lesContesDeFitzgerald.jpg', 1, 'FAL', '1:01:07.000', '2020-06-08', '2011-09-24'),
('L''Épopée Temporelle ', 'epopeeTemporelle.jpg', 'epopeeTemporelleLg.jpg', 'epopeeTemporelleBg.jpg', 2, 'Cyprien', '3:30:00.000', '2020-06-08', '2017-07-01'),
('Synapse', 'synapse.jpg', 'synapseLg.jpg', 'synapseBg.jpg', 1, 'Flo', '1:28:43.000', '2020-06-08', '2018-05-13'),
('Trimoria Tv', 'trimoriaTv.jpg', 'trimoriaTvLg.jpg', 'trimoriaTvBg.jpg', 1, 'Flo', '1:10:53.000', '2020-06-08', '2009-07-06'),
('Remi sans Amis', 'remiSansAmis.jpg', 'remiSansAmisLg.jpg', 'remiSansAmisBg.jpg', 1, 'Piwil', '0:47:28.000', '2020-06-08', '2011-12-11'),
('FRITE', 'frite.jpg', 'friteLg.jpg', 'friteBg.jpg', 1, 'Cladall & Daronne & Zylann', '0:31:32.000', '2020-06-08', '2012-06-09'),
('Café et Lembas', 'cafeEtLembas.jpg', 'cafeEtLembasLg.jpg', 'cafeEtLembasBg.jpg', 2, 'Dean & Reivax', '6:38:00.000', '2020-06-08', '2009-06-01'),
('Chez le Psy', 'chezLePsy.jpg', 'chezLePsyLg.jpg', 'chezLePsyBg.jpg', 3, 'Le Magot', '7:00:00.000', '2020-06-08', '2006-06-29'),
('Le Guide Galactique', 'leGuideGalactique.jpg', 'leGuideGalactiqueLg.jpg', 'leGuideGalactiqueBg.jpg', 1, 'Douglas Adams', '6:00:00.000', '2020-06-08', '1995-01-01'),
('Jencyo Rêva', 'jencyoReva.jpg', 'jencyoRevaLg.jpg', 'jencyoRevaBg.jpg', 5, 'Seiko & Ryku', '10:23:00.000', '2020-06-08', '2012-06-19'),
('Et la Terre éclata...', 'etLaTerreEclata.jpg', 'etLaTerreEclataLg.jpg', 'etLaTerreEclataBg.jpg', 2, 'MimiRyudo & François TJP', '2:19:42.000', '2020-06-08', '2014-10-26'),
('Ozion', 'ozion.jpg', 'ozionLg.jpg', 'ozionBg.jpg', 1, 'Mp3', '0:11:40.000', '2020-06-08', '2018-05-31'),
('D.Day', 'dDay.jpg', 'dDayLg.jpg', 'dDayBg.jpg', 1, 'Geek Forever Prod', '0:09:33.000', '2020-06-08', '2020-01-01'),
('Jusque là on était tranquilles', 'jloet.jpg', 'jloetLg.jpg', 'jloetBg.jpg', 1, 'Walter Proof', '0:19:00.000', '2020-06-08', '2020-02-15'),
('La Main sur le Corps', 'laMainSurLeCorp.jpg', 'laMainSurLeCorpLg.jpg', 'laMainSurLeCorpBg.jpg', 1, 'Grégory K.Mizol', '1:40:00.000', '2020-06-08', '2019-08-28'),
('ZAP', 'zap.jpg', 'zapLg.jpg', 'zapBg.jpg', 1, 'Ranne Madsen & Tamica', '1:00:00.000', '2020-06-08', '2019-06-01'),
('The Blind ZONE', 'theBlindZone.jpg', 'theBlindZone.jpg', 'theBlindZone.jpg', 1, 'Geek Forever Prod', '0:25:00.000', '2020-06-08', '2019-01-01'),
('Le mur de l''imaginarium', 'leMurDeLimaginarium.jpg', 'leMurDeLimaginariumLg.jpg', 'leMurDeLimaginariumBg.jpg', 1, 'Geek Forever Prod', '4:06:00.000', '2020-06-08', '2015-11-01'),
('ADN 2082', 'adn.jpg', 'adnLg.jpg', 'adnBg.jpg', 1, 'François TJP', '2:11:00.000', '2020-06-08', '2012-07-07'),
('Les Aventuriers', 'lesAventuriers.jpg', 'lesAventuriersLg.jpg', 'lesAventuriersBg.jpg', 1, 'François TJP', '1:21:00.000', '2020-06-08', '2016-01-06'),
('Blind Cowboy', 'blindCowboy.jpg', 'blindCowboyLg.jpg', 'blindCowboyBg.jpg', 1, 'François TJP', '0:17:00.000', '2020-06-09', '2020-01-01');

INSERT INTO season (serie_id, season_nb, quantite)
VALUES (2, 1, 15),
(2, 2, 19),
(2, 3, 14),
(3, 1, 18),
(4, 1, 8),
(5, 1, 16),
(6, 1, 18),
(7, 1, 15),
(8, 1, 12),
(9, 1, 12),
(10, 1, 21),
(11, 1, 6),
(12, 1, 30),
(12, 2, 10),
(12, 3, 15),
(12, 4, 16),
(12, 5, 8),
(13, 1, 6),
(14, 1, 6),
(15, 1, 25),
(15, 2, 25),
(15, 3, 25);


INSERT INTO account (username, first_name, last_name, email, birth_date, avatar, PASSWORD)
VALUES ('adminValentin', 'valentin', 'cellier', 'valentin@mail.com', '1992-01-19', 'avatar1.jpg', crypt('adminPassword', gen_salt('md5'))),
('adminCharles', 'charles', 'decodin', 'charles@mail.com', '1992-01-19', 'avatar2.jpg', crypt('adminPassword', gen_salt('md5'))),
('adminBoris', 'boris', 'jerrar', 'boris@mail.com', '1992-01-19', 'avatar3.jpg', crypt('adminPassword', gen_salt('md5')))
