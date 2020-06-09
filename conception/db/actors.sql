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

INSERT INTO actor (name) VALUES
('Guile93'),
('Alexis Tomassian'), 
('Sarah Cotten'),
('Gyom Reis'), 
('Surya Ismaël'),
('Antoine Daniel'),
('MetaWendöh'),
('PoC'),
('Nico'),
('Matt'),
('JBX'),
('Knarf'),
('Lili'),
('Welf'),
('Tony'),
('Lady Fae'),
('Ghislain'),
('Valoche'),
('Flo'),
('Zylann'),
('Piwil'),
('Mr Koala'),
('Istria'),
('@now@n'),
('Paxel'),
('Naïde Lancieaux'),
('Thibault Rispal'),
('Tristan Lohengrin'),
('Fallen Swallow'),
('Jill Lyandja'),
('François TJP'),
('Dharma'),
('Monsieur Za'),
('Fal'),
('Isaac'),
('Tanaka'),
('Androssian'),
('MOTHER'),
('Nathalie Favreau'),
('Antoine Rouaud'),
('Olivier Collin'),
('Servane Guichard'),
('Vincent Gaborit'),
('Caroline Hauser'),
('Jonathan Clément'),
('Nicolas Foucard'),
('Benjamin Tribes'),
('Antoine Rouaud'),
('Merween'),
('David Uystpruyst'),



INSERT INTO serie_actor (serie_id, actor_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 8),
(3, 9),
(3, 10),
(4, 9),
(4, 10),
(5, 11),
(6, 12),
(6, 8),
(6, 13),
(6, 14),
(6, 15),
(6, 16),
(6, 17),
(6, 18),
(7, 19),
(8, 19),
(9, 20),
(9, 21),
(9, 22),
(9, 23),
(9, 24),
(9, 25),
(9, 11),
(10, 26),
(10, 27),
(10, 28),
(10, 29),
(10, 30),
(11, 31),
(11, 32),
(12, 33),
(13, 34),
(13, 31),
(14, 35),
(14, 36),
(14, 37),
(14, 38),
(15, 39),
(15, 40),
(15, 41),
(15, 42),
(15, 43),
(15, 44),
(15, 45),
(15, 46),
(15, 47),
(16, 48),
(16, 49),
(17, 50),


INSERT INTO role (serie_id, actor_id, character) VALUES 
(1, 1, 'Narrateur'),
(1, 2, 'Holista'),
(1, 3, 'Diesel'),
(1, 4, 'Brodog'),
(1, 5, 'Catwood'),
(1, 6, 'Sergent Moustachios'),
(1, 7, 'Clyde Vanilla'),
(1, 7, 'Cochonax'),
(2, 8, 'L''Elfe'),
(2, 8, 'L''Ogre'),
(2, 8, 'Le Magicienne'),
(2, 8, 'Le Barbare'),
(2, 8, 'Le Ménestrel'),
(2, 8, 'Le Nain'),
(2, 8, 'Le Ranger'),
(2, 8, 'Le Voleur'),
(3, 9, 'Gloomy'),
(3, 9, 'l''infirmière'),
(3, 9, 'K.R.O.T.E'),
(3, 10, 'Kévin'),
(3, 10, 'Zluglu'),
(3, 10, 'Kellogs'),
(4, 9, 'A.N.A'),
(4, 9, 'Rosten'),
(4, 9, 'Al Batard'),
(4, 10, 'Gonto'),
(4, 10, 'Kannitsh'),
(4, 10, 'voix navigateur capsule'),
(4, 10, 'second de Al BAtard'),
(5, 11, 'Wandrall'),
(5, 11, 'Zarakaï'),
(5, 11, 'Zehirmahnn'),
(5, 11, 'Enoriel'),
(5, 11, 'Trichelieu'),
(5, 11, 'Guertrude'),
(5, 11, 'Le Narrateur'),
(5, 11, 'Roger'),
(5, 11, 'Moumoune'),
(5, 11, 'Kyo Shin Zamurato'),
(5, 11, 'Squikky'),
(6, 12, 'Bleûten'),
(6, 12, 'Sabrovitch'),
(6, 12, 'Hans'),
(6, 12, 'Mac Gregor'),
(6, 12, 'Haldar'),
(6, 12, 'le type des services spéciaux'),
(6, 12, 'Glaviozky'),
(6, 12, 'Purtzmann'),
(6, 12, 'les krygonites'),
(6, 12, 'le Grand Gluant'),
(6, 12, 'l''extra-terrestre'),
(6, 12, 'Voix Off'),
(6, 12, 'un des conseillers de Haldar'),
(6, 12, 'quelques dinariens'),
(6, 12, 'les douillis'),
(6, 12, 'Henri Boteule'),
(6, 8, 'Johnson'),
(6, 8, 'Eagle'),
(6, 8, 'l''ordinateur'),
(6, 8, 'le Lt Krasbeurk'),
(6, 8, 'le Consigliere du Sénat'),
(6, 8, 'le barman'),
(6, 13, 'Wlazgonde'),
(6, 13, 'La femme du Grand Gluant'),
(6, 14, 'Rasmusen'),
(6, 14, 'un conseiller de Haldar'),
(6, 14, 'les peutêtriens'),
(6, 15, 'Indigènes de Dinaro'),
(6, 16, 'Voix du compte à rebours'),
(6, 16, 'Sénatrice de Janthou'),
(6, 16, 'La hotline de Lost Frontier'),
(6, 17, 'Ghislain'),
(6, 18, 'La rousse du bar'),
(7, 19, 'L''Agent 0'),
(7, 19, 'GUM'),
(7, 19, 'L''Agent Bono'),
(7, 19, 'Le Directeur de l''Agence'),
(7, 19, 'Pamela Fatale'),
(7, 19, 'Sonia'),
(8, 19, 'Lucas Salpetrière'),
(8, 19, 'H.A.L.L'),
(8, 19, 'Louise'),
(8, 19, 'Picadilly'),
(8, 19, 'Eric'),
(8, 19, 'Grégoire le hamster'),
(8, 19, 'Divarius'),
(9, 20, 'Mateo'),
(9, 20, 'DEI'),
(9, 20, 'villageois'),
(9, 20, 'un journaliste'),
(9, 20, 'Falkem'),
(9, 20, 'Skardo'),
(9, 21, 'Archibald'),
(9, 22, 'Ruki'),
(9, 22, 'Zarg'),
(9, 23, 'Kino'),
(9, 23, 'Une journaliste'),
(9, 23, 'la voix d''aéroport'),
(9, 24, 'Elenda'),
(9, 25, 'Le reporter'),
(9, 11, 'Drann'),
(10, 26, 'Babel'),
(10, 27, 'Orion'),
(10, 28, 'Iriée'),
(10, 29, 'Grenade'),
(10, 30, 'Ménippé'),
(10, 30, 'Métioché'),
(11, 31, 'Le héros'),
(11, 32, 'Le chat du héros'),
(12, 33, 'Docteur Bonobo'),
(13, 34, 'Jacob'),
(13, 31, 'Wilhelm'),
(14, 35, 'Le personnage principal'),
(14, 36, 'Un membre de l''équipe'),
(14, 37, 'Lieutenant de l''équipage'),
(14, 38, 'Intelligence Artificielle'),
(15, 39, 'Hélène Fresh'),
(15, 40, 'Thomas Délisse'),
(15, 41, 'Wizeel Jam'),
(15, 42, 'Maell Délisse'),
(15, 43, 'Célis Mott'),
(15, 44, 'Amiral Kaylin'),
(15, 45, 'lyama Gonseka'),
(15, 46, 'Les Fuzz'),
(15, 47, 'Kaka Baya'),
(16, 48, 'Capitaine Thomas Delisse'),
(16, 49, 'Maia'),
(17, 50, 'Docteur Ambrosia'),

