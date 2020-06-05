--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actors; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.actors (
    actors_id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.actors OWNER TO borisjerrar;

--
-- Name: actors_actors_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.actors_actors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.actors_actors_id_seq OWNER TO borisjerrar;

--
-- Name: actors_actors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.actors_actors_id_seq OWNED BY public.actors.actors_id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.categories (
    categories_id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.categories OWNER TO borisjerrar;

--
-- Name: categories_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.categories_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_categories_id_seq OWNER TO borisjerrar;

--
-- Name: categories_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.categories_categories_id_seq OWNED BY public.categories.categories_id;


--
-- Name: episodes; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.episodes (
    episodes_id integer NOT NULL,
    saisonid integer NOT NULL,
    title character varying(100),
    episode_number smallint,
    duration time without time zone,
    mp3file character varying(255)
);


ALTER TABLE public.episodes OWNER TO borisjerrar;

--
-- Name: episodes_episodes_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.episodes_episodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.episodes_episodes_id_seq OWNER TO borisjerrar;

--
-- Name: episodes_episodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.episodes_episodes_id_seq OWNED BY public.episodes.episodes_id;


--
-- Name: episodes_saisonid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.episodes_saisonid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.episodes_saisonid_seq OWNER TO borisjerrar;

--
-- Name: episodes_saisonid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.episodes_saisonid_seq OWNED BY public.episodes.saisonid;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.favorites (
    favorites_id integer NOT NULL,
    userid integer NOT NULL,
    serieid integer NOT NULL
);


ALTER TABLE public.favorites OWNER TO borisjerrar;

--
-- Name: favorites_favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.favorites_favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_favorites_id_seq OWNER TO borisjerrar;

--
-- Name: favorites_favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.favorites_favorites_id_seq OWNED BY public.favorites.favorites_id;


--
-- Name: favorites_serieid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.favorites_serieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_serieid_seq OWNER TO borisjerrar;

--
-- Name: favorites_serieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.favorites_serieid_seq OWNED BY public.favorites.serieid;


--
-- Name: favorites_userid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.favorites_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_userid_seq OWNER TO borisjerrar;

--
-- Name: favorites_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.favorites_userid_seq OWNED BY public.favorites.userid;


--
-- Name: listen; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.listen (
    listen_id integer NOT NULL,
    userid integer NOT NULL,
    episodeid integer NOT NULL,
    duration time without time zone
);


ALTER TABLE public.listen OWNER TO borisjerrar;

--
-- Name: listen_episodeid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.listen_episodeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listen_episodeid_seq OWNER TO borisjerrar;

--
-- Name: listen_episodeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.listen_episodeid_seq OWNED BY public.listen.episodeid;


--
-- Name: listen_listen_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.listen_listen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listen_listen_id_seq OWNER TO borisjerrar;

--
-- Name: listen_listen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.listen_listen_id_seq OWNED BY public.listen.listen_id;


--
-- Name: listen_userid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.listen_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listen_userid_seq OWNER TO borisjerrar;

--
-- Name: listen_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.listen_userid_seq OWNED BY public.listen.userid;


--
-- Name: role; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.role (
    roles_id integer NOT NULL,
    actorid integer NOT NULL,
    "character" character varying(100)
);


ALTER TABLE public.role OWNER TO borisjerrar;

--
-- Name: role_actorid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.role_actorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_actorid_seq OWNER TO borisjerrar;

--
-- Name: role_actorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.role_actorid_seq OWNED BY public.role.actorid;


--
-- Name: role_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.role_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_roles_id_seq OWNER TO borisjerrar;

--
-- Name: role_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.role_roles_id_seq OWNED BY public.role.roles_id;


--
-- Name: saisons; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.saisons (
    saisons_id integer NOT NULL,
    serieid integer NOT NULL,
    title character varying(100),
    saison_number smallint,
    quantite smallint
);


ALTER TABLE public.saisons OWNER TO borisjerrar;

--
-- Name: saisons_saisons_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.saisons_saisons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.saisons_saisons_id_seq OWNER TO borisjerrar;

--
-- Name: saisons_saisons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.saisons_saisons_id_seq OWNED BY public.saisons.saisons_id;


--
-- Name: saisons_serieid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.saisons_serieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.saisons_serieid_seq OWNER TO borisjerrar;

--
-- Name: saisons_serieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.saisons_serieid_seq OWNED BY public.saisons.serieid;


--
-- Name: series; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.series (
    series_id integer NOT NULL,
    title character varying(100),
    image character varying(150),
    imagelg character varying(150),
    saison smallint,
    autor character varying(60),
    duration time without time zone,
    uploaddate date,
    creationdate date
);


ALTER TABLE public.series OWNER TO borisjerrar;

--
-- Name: series_actors; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.series_actors (
    series_actors_id integer NOT NULL,
    serieid integer NOT NULL,
    actorid integer NOT NULL
);


ALTER TABLE public.series_actors OWNER TO borisjerrar;

--
-- Name: series_actors_actorid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.series_actors_actorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_actors_actorid_seq OWNER TO borisjerrar;

--
-- Name: series_actors_actorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.series_actors_actorid_seq OWNED BY public.series_actors.actorid;


--
-- Name: series_actors_serieid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.series_actors_serieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_actors_serieid_seq OWNER TO borisjerrar;

--
-- Name: series_actors_serieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.series_actors_serieid_seq OWNED BY public.series_actors.serieid;


--
-- Name: series_actors_series_actors_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.series_actors_series_actors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_actors_series_actors_id_seq OWNER TO borisjerrar;

--
-- Name: series_actors_series_actors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.series_actors_series_actors_id_seq OWNED BY public.series_actors.series_actors_id;


--
-- Name: series_categories; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.series_categories (
    series_id integer NOT NULL,
    serieid integer NOT NULL,
    categoryid integer NOT NULL
);


ALTER TABLE public.series_categories OWNER TO borisjerrar;

--
-- Name: series_categories_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.series_categories_categoryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_categories_categoryid_seq OWNER TO borisjerrar;

--
-- Name: series_categories_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.series_categories_categoryid_seq OWNED BY public.series_categories.categoryid;


--
-- Name: series_categories_serieid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.series_categories_serieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_categories_serieid_seq OWNER TO borisjerrar;

--
-- Name: series_categories_serieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.series_categories_serieid_seq OWNED BY public.series_categories.serieid;


--
-- Name: series_categories_series_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.series_categories_series_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_categories_series_id_seq OWNER TO borisjerrar;

--
-- Name: series_categories_series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.series_categories_series_id_seq OWNED BY public.series_categories.series_id;


--
-- Name: series_series_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.series_series_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_series_id_seq OWNER TO borisjerrar;

--
-- Name: series_series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.series_series_id_seq OWNED BY public.series.series_id;


--
-- Name: synopsis; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.synopsis (
    synopsis_id integer NOT NULL,
    serieid integer NOT NULL,
    body text
);


ALTER TABLE public.synopsis OWNER TO borisjerrar;

--
-- Name: synopsis_serieid_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.synopsis_serieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.synopsis_serieid_seq OWNER TO borisjerrar;

--
-- Name: synopsis_serieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.synopsis_serieid_seq OWNED BY public.synopsis.serieid;


--
-- Name: synopsis_synopsis_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.synopsis_synopsis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.synopsis_synopsis_id_seq OWNER TO borisjerrar;

--
-- Name: synopsis_synopsis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.synopsis_synopsis_id_seq OWNED BY public.synopsis.synopsis_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: borisjerrar
--

CREATE TABLE public.users (
    users_id integer NOT NULL,
    username character varying(25),
    firstname character varying(25),
    lastname character varying(25),
    email character varying(100),
    birthdate date,
    password character varying(64)
);


ALTER TABLE public.users OWNER TO borisjerrar;

--
-- Name: users_users_id_seq; Type: SEQUENCE; Schema: public; Owner: borisjerrar
--

CREATE SEQUENCE public.users_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_users_id_seq OWNER TO borisjerrar;

--
-- Name: users_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: borisjerrar
--

ALTER SEQUENCE public.users_users_id_seq OWNED BY public.users.users_id;


--
-- Name: actors actors_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.actors ALTER COLUMN actors_id SET DEFAULT nextval('public.actors_actors_id_seq'::regclass);


--
-- Name: categories categories_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.categories ALTER COLUMN categories_id SET DEFAULT nextval('public.categories_categories_id_seq'::regclass);


--
-- Name: episodes episodes_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.episodes ALTER COLUMN episodes_id SET DEFAULT nextval('public.episodes_episodes_id_seq'::regclass);


--
-- Name: episodes saisonid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.episodes ALTER COLUMN saisonid SET DEFAULT nextval('public.episodes_saisonid_seq'::regclass);


--
-- Name: favorites favorites_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.favorites ALTER COLUMN favorites_id SET DEFAULT nextval('public.favorites_favorites_id_seq'::regclass);


--
-- Name: favorites userid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.favorites ALTER COLUMN userid SET DEFAULT nextval('public.favorites_userid_seq'::regclass);


--
-- Name: favorites serieid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.favorites ALTER COLUMN serieid SET DEFAULT nextval('public.favorites_serieid_seq'::regclass);


--
-- Name: listen listen_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.listen ALTER COLUMN listen_id SET DEFAULT nextval('public.listen_listen_id_seq'::regclass);


--
-- Name: listen userid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.listen ALTER COLUMN userid SET DEFAULT nextval('public.listen_userid_seq'::regclass);


--
-- Name: listen episodeid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.listen ALTER COLUMN episodeid SET DEFAULT nextval('public.listen_episodeid_seq'::regclass);


--
-- Name: role roles_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.role ALTER COLUMN roles_id SET DEFAULT nextval('public.role_roles_id_seq'::regclass);


--
-- Name: role actorid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.role ALTER COLUMN actorid SET DEFAULT nextval('public.role_actorid_seq'::regclass);


--
-- Name: saisons saisons_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.saisons ALTER COLUMN saisons_id SET DEFAULT nextval('public.saisons_saisons_id_seq'::regclass);


--
-- Name: saisons serieid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.saisons ALTER COLUMN serieid SET DEFAULT nextval('public.saisons_serieid_seq'::regclass);


--
-- Name: series series_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series ALTER COLUMN series_id SET DEFAULT nextval('public.series_series_id_seq'::regclass);


--
-- Name: series_actors series_actors_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_actors ALTER COLUMN series_actors_id SET DEFAULT nextval('public.series_actors_series_actors_id_seq'::regclass);


--
-- Name: series_actors serieid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_actors ALTER COLUMN serieid SET DEFAULT nextval('public.series_actors_serieid_seq'::regclass);


--
-- Name: series_actors actorid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_actors ALTER COLUMN actorid SET DEFAULT nextval('public.series_actors_actorid_seq'::regclass);


--
-- Name: series_categories series_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_categories ALTER COLUMN series_id SET DEFAULT nextval('public.series_categories_series_id_seq'::regclass);


--
-- Name: series_categories serieid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_categories ALTER COLUMN serieid SET DEFAULT nextval('public.series_categories_serieid_seq'::regclass);


--
-- Name: series_categories categoryid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_categories ALTER COLUMN categoryid SET DEFAULT nextval('public.series_categories_categoryid_seq'::regclass);


--
-- Name: synopsis synopsis_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.synopsis ALTER COLUMN synopsis_id SET DEFAULT nextval('public.synopsis_synopsis_id_seq'::regclass);


--
-- Name: synopsis serieid; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.synopsis ALTER COLUMN serieid SET DEFAULT nextval('public.synopsis_serieid_seq'::regclass);


--
-- Name: users users_id; Type: DEFAULT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.users ALTER COLUMN users_id SET DEFAULT nextval('public.users_users_id_seq'::regclass);


--
-- Data for Name: actors; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.actors (actors_id, name) FROM stdin;
1	jean phil
2	jean phil
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.categories (categories_id, name) FROM stdin;
1	heroic fantasy
2	Aventure Médiéval
3	Aventure Spatiale
4	heroic fantasy
5	Aventure Médiéval
6	Aventure Spatiale
\.


--
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.episodes (episodes_id, saisonid, title, episode_number, duration, mp3file) FROM stdin;
3	1	first aventure	1	00:06:49	titletest
4	1	first aventure	2	00:06:49	test1
5	1	first aventure	3	00:06:49	test2
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.favorites (favorites_id, userid, serieid) FROM stdin;
2	1	1
\.


--
-- Data for Name: listen; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.listen (listen_id, userid, episodeid, duration) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.role (roles_id, actorid, "character") FROM stdin;
1	1	poisson rouge
2	2	poisson rouge
\.


--
-- Data for Name: saisons; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.saisons (saisons_id, serieid, title, saison_number, quantite) FROM stdin;
1	2	saison 1	1	13
2	1	Saison 1	1	17
\.


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.series (series_id, title, image, imagelg, saison, autor, duration, uploaddate, creationdate) FROM stdin;
1	Clyde Vanilla	clydevanilla.jpg	clydevanillaLg.jpg	1	Antoine Daniel	00:03:11	2020-06-03	2017-09-17
2	Le Donjon de Naheulbeuk	ledonjondenaheulbeuk.jpg	ledonjondenaheulbeukLg.jpg	4	Pen of Chaos	00:04:53	2020-06-03	2001-01-01
3	Adoprixtoxis	adoprixtoxis.jpg	adoprixtoxisLg.jpg	1	Nico et Matt	00:03:44	2020-06-03	2002-01-01
4	La légende de Xantah	Xantah.jpg	XantahLg.jpg	1	Nico et Matt	00:03:36.39	2020-06-03	2010-01-01
5	Reflets d'Acide	rda.jpg	rdaLg.jpg	1	JBX	00:09:14	2020-06-03	2002-12-01
6	Les Aventuriers du NHL2987 Survivaure	survivaure.jpg	survivaureLg.jpg	1	Knarf	00:03:26.41	2020-06-03	2001-12-24
7	Agent 0	agent0.jpg	agent0Lg.jpg	1	Flo	00:03:31	2020-06-03	2006-08-25
8	Trimoria	trimoria.jpg	trimoriaLg.jpg	1	Flo	00:02:07.35	2020-06-03	2008-03-19
9	Clyde Vanilla	clydevanilla.jpg	clydevanillaLg.jpg	1	Antoine Daniel	00:03:11	2020-06-03	2017-09-17
10	Le Donjon de Naheulbeuk	ledonjondenaheulbeuk.jpg	ledonjondenaheulbeukLg.jpg	4	Pen of Chaos	00:04:53	2020-06-03	2001-01-01
11	Adoprixtoxis	adoprixtoxis.jpg	adoprixtoxisLg.jpg	1	Nico et Matt	00:03:44	2020-06-03	2002-01-01
12	La légende de Xantah	Xantah.jpg	XantahLg.jpg	1	Nico et Matt	00:03:36.39	2020-06-03	2010-01-01
13	Reflets d'Acide	rda.jpg	rdaLg.jpg	1	JBX	00:09:14	2020-06-03	2002-12-01
14	Les Aventuriers du NHL2987 Survivaure	survivaure.jpg	survivaureLg.jpg	1	Knarf	00:03:26.41	2020-06-03	2001-12-24
15	Agent 0	agent0.jpg	agent0Lg.jpg	1	Flo	00:03:31	2020-06-03	2006-08-25
16	Trimoria	trimoria.jpg	trimoriaLg.jpg	1	Flo	00:02:07.35	2020-06-03	2008-03-19
\.


--
-- Data for Name: series_actors; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.series_actors (series_actors_id, serieid, actorid) FROM stdin;
\.


--
-- Data for Name: series_categories; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.series_categories (series_id, serieid, categoryid) FROM stdin;
2	1	1
\.


--
-- Data for Name: synopsis; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.synopsis (synopsis_id, serieid, body) FROM stdin;
1	1	mon enorme chibre
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: borisjerrar
--

COPY public.users (users_id, username, firstname, lastname, email, birthdate, password) FROM stdin;
1	Clorge	Gravely	Rodney	Rondey@mail.com	1961-06-16	$1$ciIEEH4k$gC6sKKcVvDZqkXLWhDPhL.
2	Clorge	Gravely	Rodney	Rondey@mail.com	1961-06-16	$1$ES47xFbR$IEotcDhuholOcD5ymWS.31
\.


--
-- Name: actors_actors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.actors_actors_id_seq', 2, true);


--
-- Name: categories_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.categories_categories_id_seq', 6, true);


--
-- Name: episodes_episodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.episodes_episodes_id_seq', 5, true);


--
-- Name: episodes_saisonid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.episodes_saisonid_seq', 1, false);


--
-- Name: favorites_favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.favorites_favorites_id_seq', 2, true);


--
-- Name: favorites_serieid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.favorites_serieid_seq', 1, false);


--
-- Name: favorites_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.favorites_userid_seq', 1, false);


--
-- Name: listen_episodeid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.listen_episodeid_seq', 1, false);


--
-- Name: listen_listen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.listen_listen_id_seq', 1, false);


--
-- Name: listen_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.listen_userid_seq', 1, false);


--
-- Name: role_actorid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.role_actorid_seq', 2, true);


--
-- Name: role_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.role_roles_id_seq', 2, true);


--
-- Name: saisons_saisons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.saisons_saisons_id_seq', 2, true);


--
-- Name: saisons_serieid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.saisons_serieid_seq', 1, false);


--
-- Name: series_actors_actorid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.series_actors_actorid_seq', 1, false);


--
-- Name: series_actors_serieid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.series_actors_serieid_seq', 1, false);


--
-- Name: series_actors_series_actors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.series_actors_series_actors_id_seq', 1, false);


--
-- Name: series_categories_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.series_categories_categoryid_seq', 1, false);


--
-- Name: series_categories_serieid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.series_categories_serieid_seq', 1, false);


--
-- Name: series_categories_series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.series_categories_series_id_seq', 2, true);


--
-- Name: series_series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.series_series_id_seq', 16, true);


--
-- Name: synopsis_serieid_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.synopsis_serieid_seq', 1, false);


--
-- Name: synopsis_synopsis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.synopsis_synopsis_id_seq', 1, true);


--
-- Name: users_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: borisjerrar
--

SELECT pg_catalog.setval('public.users_users_id_seq', 2, true);


--
-- Name: actors actors_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.actors
    ADD CONSTRAINT actors_pkey PRIMARY KEY (actors_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (categories_id);


--
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (episodes_id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorites_id);


--
-- Name: listen listen_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.listen
    ADD CONSTRAINT listen_pkey PRIMARY KEY (listen_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (roles_id);


--
-- Name: saisons saisons_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.saisons
    ADD CONSTRAINT saisons_pkey PRIMARY KEY (saisons_id);


--
-- Name: series_actors series_actors_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_actors
    ADD CONSTRAINT series_actors_pkey PRIMARY KEY (series_actors_id);


--
-- Name: series_categories series_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_categories
    ADD CONSTRAINT series_categories_pkey PRIMARY KEY (series_id);


--
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (series_id);


--
-- Name: synopsis synopsis_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.synopsis
    ADD CONSTRAINT synopsis_pkey PRIMARY KEY (synopsis_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (users_id);


--
-- Name: episodes episodes_saisonid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_saisonid_fkey FOREIGN KEY (saisonid) REFERENCES public.saisons(saisons_id);


--
-- Name: favorites favorites_serieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_serieid_fkey FOREIGN KEY (serieid) REFERENCES public.series(series_id);


--
-- Name: favorites favorites_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(users_id);


--
-- Name: listen listen_episodeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.listen
    ADD CONSTRAINT listen_episodeid_fkey FOREIGN KEY (episodeid) REFERENCES public.episodes(episodes_id);


--
-- Name: listen listen_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.listen
    ADD CONSTRAINT listen_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(users_id);


--
-- Name: role role_actorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_actorid_fkey FOREIGN KEY (actorid) REFERENCES public.actors(actors_id);


--
-- Name: saisons saisons_serieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.saisons
    ADD CONSTRAINT saisons_serieid_fkey FOREIGN KEY (serieid) REFERENCES public.series(series_id);


--
-- Name: series_actors series_actors_actorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_actors
    ADD CONSTRAINT series_actors_actorid_fkey FOREIGN KEY (actorid) REFERENCES public.actors(actors_id);


--
-- Name: series_actors series_actors_serieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_actors
    ADD CONSTRAINT series_actors_serieid_fkey FOREIGN KEY (serieid) REFERENCES public.series(series_id);


--
-- Name: series_categories series_categories_categoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_categories
    ADD CONSTRAINT series_categories_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.categories(categories_id);


--
-- Name: series_categories series_categories_serieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.series_categories
    ADD CONSTRAINT series_categories_serieid_fkey FOREIGN KEY (serieid) REFERENCES public.series(series_id);


--
-- Name: synopsis synopsis_serieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: borisjerrar
--

ALTER TABLE ONLY public.synopsis
    ADD CONSTRAINT synopsis_serieid_fkey FOREIGN KEY (serieid) REFERENCES public.series(series_id);


--
-- PostgreSQL database dump complete
--

