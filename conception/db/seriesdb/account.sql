CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE account (
    account_id serial NOT NULL PRIMARY KEY,
    username varchar(25),
    first_name varchar(25),
    last_name varchar(25),
    email varchar(100),
    birth_date date,
    avatar varchar(100),
    password varchar(64)
);

INSERT INTO account (username, first_name, last_name, email, birth_date, avatar, PASSWORD)
VALUES ('adminValentin', 'valentin', 'cellier', 'valentin@mail.com', '1992-01-19', 'avatar1.jpg', crypt('adminPassword', gen_salt('md5'))),
('adminCharles', 'charles', 'decodin', 'charles@mail.com', '1992-01-19', 'avatar2.jpg', crypt('adminPassword', gen_salt('md5'))),
('adminBoris', 'boris', 'jerrar', 'boris@mail.com', '1992-01-19', 'avatar3.jpg', crypt('adminPassword', gen_salt('md5')))
