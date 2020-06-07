CREATE EXTENSION
IF NOT EXISTS pgcrypto;

CREATE TABLE account
(
    account_id serial NOT NULL PRIMARY KEY,
    username varchar(25),
    first_name varchar(25),
    last_name varchar(25),
    email varchar(100),
    birth_date date,
    avatar varchar(64),
    password varchar(64)
);
/* non fini (main_color) */
CREATE TABLE serie
(
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

/* non fini (Eden done) */

CREATE TABLE season
(
    season_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
    season_nb smallint,
    quantite smallint,
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);

/* non fini (a faire clyde vanilla, et agent 0 | apartemment done) */

CREATE TABLE episode
(
    episode_id serial NOT NULL PRIMARY KEY,
    season_id serial,
    title varchar(100),
    episode_nb smallint,
    duration time,
    mp3_file varchar(255),
    FOREIGN KEY (season_id) REFERENCES season (season_id)
);

CREATE TABLE favorite
(
    favorite_id serial NOT NULL PRIMARY KEY,
    account_id serial,
    serie_id serial,
    FOREIGN KEY (account_id) REFERENCES account (account_id),
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);

CREATE TABLE synopsis
(
    synopsis_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
    body text,
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id)
);

CREATE TABLE category
(
    category_id serial NOT NULL PRIMARY KEY,
    name varchar(100)
);

CREATE TABLE serie_category
(
    serie_category_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
    category_id serial,
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id),
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

CREATE TABLE actor
(
    actor_id serial NOT NULL PRIMARY KEY,
    name varchar(100)
);

CREATE TABLE serie_actor
(
    serie_actor_id serial NOT NULL PRIMARY KEY,
    serie_id serial,
    actor_id serial,
    FOREIGN KEY (serie_id) REFERENCES serie (serie_id),
    FOREIGN KEY (actor_id) REFERENCES actor (actor_id)
);

CREATE TABLE role
(
    role_id serial NOT NULL PRIMARY KEY,
    actor_id serial,
    character varchar(100),
    FOREIGN KEY (actor_id) REFERENCES actor (actor_id)
);

CREATE TABLE LISTEN
(
    listen_id serial NOT NULL PRIMARY KEY,
    account_id serial,
    episode_id serial,
    duration time,
    FOREIGN KEY (account_id) REFERENCES account (account_id),
    FOREIGN KEY (episode_id) REFERENCES episode (episode_id)
);

INSERT INTO serie
    (title, image, image_lg, image_bg, season, author, duration, upload_date, creation_date)
VALUES
    ('Clyde Vanilla', 'clydevanilla.jpg', 'clydevanillaLg.jpg', 'clydevanillaBg.jpg', 1, 'Antoine Daniel', '3:11:00.000', '2020-06-08', '2017-09-17'),
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


INSERT INTO season
    (serie_id, season_nb, quantite)
VALUES
    (2, 1, 15),
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
    (15, 3, 25),
    (1, 1, 10);


INSERT INTO episode
    (season_id, epidsode_nb, duration, title, mp3_file)
VALUES
    (1, 1, '0:04:16.000', null, 'leDonjonDeNaheulbeuk_saison1_episode1.mp3'),
    (1, 2, '0:06:17.000', null, 'leDonjonDeNaheulbeuk_saison1_episode2.mp3'),
    (1, 3, '0:04:20.000', null, 'leDonjonDeNaheulbeuk_saison1_episode3.mp3'),
    (1, 4, '0:05:10.000', null, 'leDonjonDeNaheulbeuk_saison1_episode4.mp3'),
    (1, 5, '0:06:37.000', null, 'leDonjonDeNaheulbeuk_saison1_episode5.mp3'),
    (1, 6, '0:05:47.000', null, 'leDonjonDeNaheulbeuk_saison1_episode6.mp3'),
    (1, 7, '0:07:11.000', null, 'leDonjonDeNaheulbeuk_saison1_episode7.mp3'),
    (1, 8, '0:08:30.000', null, 'leDonjonDeNaheulbeuk_saison1_episode8.mp3'),
    (1, 9, '0:07:59.000', null, 'leDonjonDeNaheulbeuk_saison1_episode9.mp3'),
    (1, 10, '0:04:52.000', null, 'leDonjonDeNaheulbeuk_saison1_episode10.mp3'),
    (1, 11, '0:06:16.000', null, 'leDonjonDeNaheulbeuk_saison1_episode11.mp3'),
    (1, 12, '0:06:40.000', null, 'leDonjonDeNaheulbeuk_saison1_episode12.mp3'),
    (1, 13, '0:06:24.000', null, 'leDonjonDeNaheulbeuk_saison1_episode13.mp3'),
    (1, 14, '0:07:07.000', null, 'leDonjonDeNaheulbeuk_saison1_episode14.mp3'),
    (1, 15, '0:08:38.000', null, 'leDonjonDeNaheulbeuk_saison1_episode15.mp3'),

    (2, 1, '0:08:38.000', null, 'leDonjonDeNaheulbeuk_saison2_episode1.mp3'),
    (2, 2, '0:07:47.000', null, 'leDonjonDeNaheulbeuk_saison2_episode2.mp3'),
    (2, 3, '0:10:05.000', null, 'leDonjonDeNaheulbeuk_saison2_episode3.mp3'),
    (2, 4, '0:09:42.000', null, 'leDonjonDeNaheulbeuk_saison2_episode4.mp3'),
    (2, 5, '0:08:59.000', null, 'leDonjonDeNaheulbeuk_saison2_episode5.mp3'),
    (2, 6, '0:06:02.000', null, 'leDonjonDeNaheulbeuk_saison2_episode6.mp3'),
    (2, 7, '0:06:10.000', null, 'leDonjonDeNaheulbeuk_saison2_episode7.mp3'),
    (2, 8, '0:09:30.000', null, 'leDonjonDeNaheulbeuk_saison2_episode8.mp3'),
    (2, 9, '0:09:04.000', null, 'leDonjonDeNaheulbeuk_saison2_episode9.mp3'),
    (2, 10, '0:10:39.000', null, 'leDonjonDeNaheulbeuk_saison2_episode10.mp3'),
    (2, 11, '0:09:51.000', null, 'leDonjonDeNaheulbeuk_saison2_episode11.mp3'),
    (2, 12, '0:05:34.000', null, 'leDonjonDeNaheulbeuk_saison2_episode12.mp3'),
    (2, 13, '0:07:10.000', null, 'leDonjonDeNaheulbeuk_saison2_episode13.mp3'),
    (2, 14, '0:07:09.000', null, 'leDonjonDeNaheulbeuk_saison2_episode14.mp3'),
    (2, 15, '0:04:42.000', null, 'leDonjonDeNaheulbeuk_saison2_episode15.mp3'),
    (2, 16, '0:11:03.000', null, 'leDonjonDeNaheulbeuk_saison2_episode16.mp3'),
    (2, 17, '0:07:11.000', null, 'leDonjonDeNaheulbeuk_saison2_episode17.mp3'),
    (2, 18, '0:09:37.000', null, 'leDonjonDeNaheulbeuk_saison2_episode18.mp3'),
    (2, 19, '0:11:01.000', null, 'leDonjonDeNaheulbeuk_saison2_episode19.mp3'),

    (3, 1, '0:04:57.000', null, 'leDonjonDeNaheulbeuk_saison3_episode1.mp3'),
    (3, 2, '0:12:00.000', null, 'leDonjonDeNaheulbeuk_saison3_episode2.mp3'),
    (3, 3, '0:07:41.000', null, 'leDonjonDeNaheulbeuk_saison3_episode3.mp3'),
    (3, 4, '0:10:05.000', null, 'leDonjonDeNaheulbeuk_saison3_episode4.mp3'),
    (3, 5, '0:05:10.000', null, 'leDonjonDeNaheulbeuk_saison3_episode5.mp3'),
    (3, 6, '0:07:14.000', null, 'leDonjonDeNaheulbeuk_saison3_episode6.mp3'),
    (3, 7, '0:07:18.000', null, 'leDonjonDeNaheulbeuk_saison3_episode7.mp3'),
    (3, 8, '0:06:02.000', null, 'leDonjonDeNaheulbeuk_saison3_episode8.mp3'),
    (3, 9, '0:06:03.000', null, 'leDonjonDeNaheulbeuk_saison3_episode9.mp3'),
    (3, 10, '0:14:19.000', null, 'leDonjonDeNaheulbeuk_saison3_episode10.mp3'),
    (3, 11, '0:09:13.000', null, 'leDonjonDeNaheulbeuk_saison3_episod11.mp3'),
    (3, 12, '0:05:15.000', null, 'leDonjonDeNaheulbeuk_saison3_episode12.mp3'),
    (3, 13, '0:08:34.000', null, 'leDonjonDeNaheulbeuk_saison3_episode13.mp3'),
    (3, 14, '0:12:16.000', null, 'leDonjonDeNaheulbeuk_saison3_episode14.mp3'),

    (4, 1, '0:08:36.000', 'Le Naufrage', 'Adoprixtoxis_saison1_episode1.mp3'),
    (4, 2, '0:14:05.000', 'Rencontre du 3e type', 'Adoprixtoxis_saison1_episode2.mp3'),
    (4, 3, '0:06:09.000', '"On a pas trouvé de titre"', 'Adoprixtoxis_saison1_episode3.mp3'),
    (4, 4, '0:07:30.000', 'La grande évasion', 'Adoprixtoxis_saison1_episode4.mp3'),
    (4, 5, '0:08:30.000', 'Les égouts', 'Adoprixtoxis_saison1_episode5.mp3'),
    (4, 6, '0:08:23.000', 'La suite du 5ème', 'Adoprixtoxis_saison1_episode6.mp3'),
    (4, 7, '0:08:00.000', 'Les abysses', 'Adoprixtoxis_saison1_episode7.mp3'),
    (4, 8, '0:09:28.000', 'La zone 51 et demie où est détenu l''unique survivant du crash du vaisseau cargo échoué', 'Adoprixtoxis_saison1_episode8.mp3'),
    (4, 9, '0:07:47.000', 'Le 9ème épisode', 'Adoprixtoxis_saison1_episode9.mp3'),
    (4, 10, '0:09:00.000', 'Glagla', 'Adoprixtoxis_saison1_episode10.mp3'),
    (4, 11, '0:08:43.000', 'Terminus', 'Adoprixtoxis_saison1_episode11.mp3'),
    (4, 12, '0:08:02.000', 'Vroum !', 'Adoprixtoxis_saison1_episode12.mp3'),
    (4, 13, '0:11:23.000', 'Blanquette de veau', 'Adoprixtoxis_saison1_episode13.mp3'),
    (4, 14, '0:15:30.000', 'L''épave', 'Adoprixtoxis_saison1_episode14.mp3'),
    (4, 15, '0:15:57.000', 'Phase 2', 'Adoprixtoxis_saison1_episode15.mp3'),
    (4, 16, '0:19:57.000', 'Hyperspace', 'Adoprixtoxis_saison1_episode16.mp3'),
    (4, 17, '0:22:22.000', 'Le début de la fin', 'Adoprixtoxis_saison1_episode17.mp3'),
    (4, 18, '0:35:14.000', 'Méga battle of the warriors of the blue sky of the dark empty space of the dead death', 'Adoprixtoxis_saison1_episode18.mp3'),

    (5, 1, '0:17:47.000', 'La capsule', 'laLegendeDeXantah_saison1_episode1.mp3'),
    (5, 2, '0:19:03.000', 'La légende', 'laLegendeDeXantah_saison1_episode2.mp3'),
    (5, 3, '0:19:57.000', 'Le vaisseau fantôme', 'laLegendeDeXantah_saison1_episode3.mp3'),
    (5, 4, '0:20:56.000', 'TOXINE', 'laLegendeDeXantah_saison1_episode4.mp3'),
    (5, 5, '0:26:36.000', 'La clef', 'laLegendeDeXantah_saison1_episode5.mp3'),
    (5, 6, '0:22:22.000', 'GREEN 18', 'laLegendeDeXantah_saison1_episode6.mp3'),
    (5, 7, '0:33:57.000', 'Farra', 'laLegendeDeXantah_saison1_episode7.mp3'),
    (5, 8, '0:56:03.000', 'Hard Reboot', 'laLegendeDeXantah_saison1_episode8.mp3'),

    (6, 1, '0:13:43.000', 'L''enrôlement', 'refletsAcide_saison1_episode1.mp3'),
    (6, 2, '0:12:50.000', 'La Forêt des éventrés', 'refletsAcide_saison1_episode2.mp3'),
    (6, 3, '0:17:00.000', 'Le fleuve des glaires tièdes', 'refletsAcide_saison1_episode3.mp3'),
    (6, 4, '0:10:16.000', 'La Grotte de l''Herpès écorché', 'refletsAcide_saison1_episode4.mp3'),
    (6, 5, '0:13:03.000', 'Le Bivouac...tion !', 'refletsAcide_saison1_episode5.mp3'),
    (6, 6, '0:12:37.000', 'La colline des Mille Gangrènes', 'refletsAcide_saison1_episode6.mp3'),
    (6, 7, '0:13:26.000', 'Le Mont Mucus', 'refletsAcide_saison1_episode7.mp3'),
    (6, 8, '0:16:43.000', 'Au fond du trou...', 'refletsAcide_saison1_episode8.mp3'),
    (6, 9, '0:21:30.000', 'Enigme dans l''abîme !', 'refletsAcide_saison1_episode9.mp3'),
    (6, 10, '0:26:33.000', 'La croisée des chemins', 'refletsAcide_saison1_episode10.mp3'),
    (6, 11, '0:35:23.000', 'L''elfe et la prison brisée', 'refletsAcide_saison1_episode11.mp3'),
    (6, 12, '0:42:54.000', 'L''infâme alliance des fléaux', 'refletsAcide_saison1_episode12.mp3'),
    (6, 13, '0:54:08.000', 'Dies irae, dies illa solvet saeclum in favilla', 'refletsAcide_saison1_episode13.mp3'),
    (6, 14, '1:01:44.000', 'Un peuple qui oublie son passé se condamne à le revivre', 'refletsAcide_saison1_episode14.mp3'),
    (6, 15, '1:29:01.000', 'Bien plus que des racines, mieux vaut avoir des ailes... afin de s''élever...', 'refletsAcide_saison1_episode15.mp3'),
    (6, 16, '1:59:53.000', 'Au delà de la Mort, de l’Enfer et du Temps, Il n’est de pire sort que celui du Néant.', 'refletsAcide_saison1_episode16.mp3'),

    (7, 1, '0:03:55.000', 'Affectation au Survivaure', 'lesAventuriersDuNHL2987_saison1_episode1.mp3'),
    (7, 2, '0:05:25.000', 'L''équipage', 'lesAventuriersDuNHL2987_saison1_episode2.mp3'),
    (7, 3, '0:08:20.000', 'Le vaisseau', 'lesAventuriersDuNHL2987_saison1_episode3.mp3'),
    (7, 4, '0:08:21.000', 'Le décollage', 'lesAventuriersDuNHL2987_saison1_episode4.mp3'),
    (7, 5, '0:06:29.000', 'La torpille', 'lesAventuriersDuNHL2987_saison1_episode5.mp3'),
    (7, 6, '0:07:14.000', 'L''arme secrète', 'lesAventuriersDuNHL2987_saison1_episode6.mp3'),
    (7, 7, '0:07:58.000', 'Le télex', 'lesAventuriersDuNHL2987_saison1_episode7.mp3'),
    (7, 8, '0:08:10.000', 'Le téléporteur', 'lesAventuriersDuNHL2987_saison1_episode8.mp3'),
    (7, 9, '0:09:46.000', 'Dinaro', 'lesAventuriersDuNHL2987_saison1_episode9.mp3'),
    (7, 10, '0:11:39.000', 'L''invasion du Dinaro', 'lesAventuriersDuNHL2987_saison1_episode10.mp3'),
    (7, 11, '0:12:25.000', 'Torture à bord', 'lesAventuriersDuNHL2987_saison1_episode11.mp3'),
    (7, 12, '0:16:28.000', 'Rasmusen', 'lesAventuriersDuNHL2987_saison1_episode12.mp3'),
    (7, 13, '0:13:58.000', 'L''évasion', 'lesAventuriersDuNHL2987_saison1_episode13.mp3'),
    (7, 14, '0:10:58.000', 'Révélation', 'lesAventuriersDuNHL2987_saison1_episode14.mp3'),
    (7, 15, '0:16:10.000', 'Un visiteur', 'lesAventuriersDuNHL2987_saison1_episode15.mp3'),
    (7, 16, '0:18:31.000', 'Les Peutêtriens', 'lesAventuriersDuNHL2987_saison1_episode16.mp3'),
    (7, 17, '0:18:20.000', 'Mission infiltration', 'lesAventuriersDuNHL2987_saison1_episode17.mp3'),
    (7, 18, '0:23:14.000', 'Epilogue', 'lesAventuriersDuNHL2987_saison1_episode18.mp3'),

    (8, 1, '0:03:33.000', null, 'agent0_saison1_episode1.mp3'),
    (8, 2, '0:04:00.000', null, 'agent0_saison1_episode2.mp3'),
    (8, 3, '0:03:44.000', null, 'agent0_saison1_episode3.mp3'),
    (8, 4, '0:04:05.000', null, 'agent0_saison1_episode4.mp3'),
    (8, 5, '0:04:32.000', null, 'agent0_saison1_episode5.mp3'),
    (8, 6, '0:06:17.000', null, 'agent0_saison1_episode6.mp3'),
    (8, 7, '0:06:26.000', null, 'agent0_saison1_episode7.mp3'),
    (8, 8, '0:04:52.000', null, 'agent0_saison1_episode8.mp3'),
    (8, 9, '0:05:31.000', null, 'agent0_saison1_episode9.mp3'),
    (8, 10, '0:04:49.000', null, 'agent0_saison1_episode10.mp3'),
    (8, 11, '0:04:23.000', null, 'agent0_saison1_episode11.mp3'),
    (8, 12, '0:06:57.000', null, 'agent0_saison1_episode12.mp3'),
    (8, 13, '0:05:46.000', null, 'agent0_saison1_episode13.mp3'),
    (8, 14, '0:05:20.000', null, 'agent0_saison1_episode14.mp3'),
    (8, 15, '0:07:26.000', null, 'agent0_saison1_episode15.mp3'),
    (8, 16, '0:07:48.000', null, 'agent0_saison1_episode16.mp3'),
    (8, 17, '0:09:46.000', null, 'agent0_saison1_episode17.mp3'),
    (8, 18, '0:08:49.000', null, 'agent0_saison1_episode18.mp3'),
    (8, 19, '0:06:28.000', null, 'agent0_saison1_episode19.mp3'),
    (8, 20, '0:08:27.000', null, 'agent0_saison1_episode20.mp3'),
    (8, 21, '0:08:22.000', null, 'agent0_saison1_episode21.mp3'),
    (8, 22, '0:06:22.000', null, 'agent0_saison1_episode22.mp3'),
    (8, 23, '0:06:31.000', null, 'agent0_saison1_episode23.mp3'),
    (8, 24, '0:08:43.000', null, 'agent0_saison1_episode24.mp3'),
    (8, 25, '0:08:32.000', null, 'agent0_saison1_episode25.mp3'),
    (8, 26, '0:08:49.000', null, 'agent0_saison1_episode26.mp3'),
    (8, 27, '0:08:52.000', null, 'agent0_saison1_episode27.mp3'),
    (8, 28, '0:10:07.000', null, 'agent0_saison1_episode28.mp3'),
    (8, 29, '0:11:11.000', null, 'agent0_saison1_episode29.mp3'),
    (8, 30, '0:14:47.000', null, 'agent0_saison1_episode30.mp3'),

    (9, 1, '0:07:30.000', null, 'trimoria_saison1_episode1.mp3'),
    (9, 2, '0:08:28.000', null, 'trimoria_saison1_episode2.mp3'),
    (9, 3, '0:10:20.000', null, 'trimoria_saison1_episode3.mp3'),
    (9, 4, '0:11:23.000', null, 'trimoria_saison1_episode4.mp3'),
    (9, 5, '0:09:35.000', null, 'trimoria_saison1_episode5.mp3'),
    (9, 6, '0:12:40.000', null, 'trimoria_saison1_episode6.mp3'),
    (9, 7, '0:09:12.000', null, 'trimoria_saison1_episode7.mp3'),
    (9, 8, '0:08:25.000', null, 'trimoria_saison1_episode8.mp3'),
    (9, 9, '0:09:32.000', null, 'trimoria_saison1_episode9.mp3'),
    (9, 10, '0:09:39.000', null, 'trimoria_saison1_episode10.mp3'),
    (9, 11, '0:14:22.000', null, 'trimoria_saison1_episode11.mp3'),
    (9, 12, '0:16:29.000', null, 'trimoria_saison1_episode12.mp3'),

    (10, 1, '0:20:15.000', 'Login', 'Milhana_saison1_episode1.mp3'),
    (10, 2, '0:15:55.000', 'La Quête', 'Milhana_saison1_episode2.mp3'),
    (10, 3, '0:18:01.000', 'Le Voyage', 'Milhana_saison1_episode3.mp3'),
    (10, 4, '0:21:18.000', 'De Helion à Namos', 'Milhana_saison1_episode4.mp3'),
    (10, 5, '0:18:25.000', 'Liaison', 'Milhana_saison1_episode5.mp3'),
    (10, 6, '0:19:58.000', 'Gamelife Island', 'Milhana_saison1_episode6.mp3'),
    (10, 7, '0:19:24.000', 'Le Nerf', 'Milhana_saison1_episode7.mp3'),
    (10, 8, '0:21:16.000', 'Contact', 'Milhana_saison1_episode8.mp3'),
    (10, 9, '0:17:17.000', 'Retour au chaos', 'Milhana_saison1_episode9.mp3'),
    (10, 10, '0:23:50.000', 'Trangression', 'Milhana_saison1_episode10.mp3'),
    (10, 11, '0:18:32.000', 'Identité', 'Milhana_saison1_episode11.mp3'),
    (10, 12, '0:25:55.000', 'Requiem', 'Milhana_saison1_episode12.mp3'),

    (11, 1, '0:02:20.000', null, 'leChasseur_saison1_rotation1.mp3'),
    (11, 2, '0:01:01.000', null, 'leChasseur_saison1_rotation2.mp3'),
    (11, 3, '0:01:52.000', null, 'leChasseur_saison1_rotation3.mp3'),
    (11, 5, '0:00:46.000', null, 'leChasseur_saison1_rotation5.mp3'),
    (11, 6, '0:00:42.000', null, 'leChasseur_saison1_rotation6.mp3'),
    (11, 8, '0:00:59.000', null, 'leChasseur_saison1_rotation8.mp3'),
    (11, 10, '0:01:44.000', null, 'leChasseur_saison1_rotation10.mp3'),
    (11, 11, '0:01:20.000', null, 'leChasseur_saison1_rotation11.mp3'),
    (11, 14, '0:01:44.000', null, 'leChasseur_saison1_rotation14.mp3'),
    (11, 15, '0:01:16.000', null, 'leChasseur_saison1_rotation15.mp3'),
    (11, 16, '0:01:36.000', null, 'leChasseur_saison1_rotation16.mp3'),
    (11, 17, '0:01:06.000', null, 'leChasseur_saison1_rotation17.mp3'),
    (11, 18, '0:01:05.000', null, 'leChasseur_saison1_rotation18.mp3'),
    (11, 19, '0:01:06.000', null, 'leChasseur_saison1_rotation19.mp3'),
    (11, 22, '0:01:23.000', null, 'leChasseur_saison1_rotation22.mp3'),
    (11, 24, '0:01:28.000', null, 'leChasseur_saison1_rotation24.mp3'),
    (11, 26, '0:01:17.000', null, 'leChasseur_saison1_rotation26.mp3'),
    (11, 28, '0:00:54.000', null, 'leChasseur_saison1_rotation28.mp3'),
    (11, 29, '0:00:57.000', null, 'leChasseur_saison1_rotation29.mp3'),
    (11, 30, '0:02:12.000', null, 'leChasseur_saison1_rotation30.mp3'),
    (11, 31, '0:01:16.000', null, 'leChasseur_saison1_rotation31.mp3'),

    (12, 1, '0:04:16.000', 'L''apartement', 'appartement_saison1_transmission1.mp3'),
    (12, 2, '0:04:06.000', 'La porte', 'appartement_saison1_transmission2.mp3'),
    (12, 3, '0:05:36.000', 'Les courses', 'appartement_saison1_transmission3.mp3'),
    (12, 4, '0:04:04.000', '1er Contact', 'appartement_saison1_transmission4.mp3'),
    (12, 5, '0:05:31.000', 'Rendez-vous', 'appartement_saison1_transmission5.mp3'),
    (12, 6, '0:05:08.000', 'This is the End', 'appartement_saison1_transmission6.mp3'),

    (23, 1, '0:14:15.000', 'Destination Destin', 'clideVanilla_saison1_episode1.mp3'),
    (23, 2, '0:19:21.000', 'Bonjour la Galère !', 'clideVanilla_saison1_episode2.mp3'),
    (23, 3, '0:16:22.000', 'Le Joyau de Agu-Agu', 'clideVanilla_saison1_episode3.mp3'),
    (23, 4, '0:19:21.000', 'Adjugé-Vendu !', 'clideVanilla_saison1_episode4.mp3'),
    (23, 5, '0:19:56.000', 'ＢＲＡＮＬＯＵＩＳ', 'clideVanilla_saison1_episode5.mp3'),
    (23, 6, '0:19:26.000', 'L''Enfer Jaune', 'clideVanillak_saison1_episode6.mp3'),
    (23, 7, '0:22:04.000', 'Discoball', 'clideVanilla_saison1_episode7.mp3'),
    (23, 8, '0:20:01.000', 'Le Client est Roi', 'clideVanilla_saison1_episode8.mp3'),
    (23, 9, '0:20:44.000', ' L''Être Primordial', 'clideVanilla_saison1_episode9.mp3'),
    (23, 10, '0:19:32.000', 'Confrontation ULTRAMAXIMALE', 'clideVanilla_saison1_episode10.mp3');

INSERT INTO account
    (username, first_name, last_name, email, birth_date, avatar, PASSWORD)
VALUES
    ('adminValentin', 'valentin', 'cellier', 'valentin@mail.com', '1992-01-19', 'avatar1.jpg', crypt('adminPassword', gen_salt('md5'))),
    ('adminCharles', 'charles', 'decodin', 'charles@mail.com', '1992-01-19', 'avatar2.jpg', crypt('adminPassword', gen_salt('md5'))),
    ('adminBoris', 'boris', 'jerrar', 'boris@mail.com', '1992-01-19', 'avatar3.jpg', crypt('adminPassword', gen_salt('md5')))
