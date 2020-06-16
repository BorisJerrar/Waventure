const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.port || 4000;
const app = express();
const fs = require("fs");
const ms = require('mediaserver');
const dotenv = require('dotenv');

dotenv.config();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Waventure API",
      description: "waventure API Information",
      contact: {
        name: "Boris Jerar, Charles Decodin, Valentin Cellier",
      },
      server: ["http://localhost:4000"],
    },
  },
  apis: ["index.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(cors());
/* import queries */

const serieByCategory = require("./queries/serie_serie_category_category");
const mainQueries = require("./queries/main");
const seasonQueries = require("./queries/season");
const categoryQueries = require("./queries/category");
const episodeQueries = require("./queries/episode");
const favoriteQueries = require("./queries/favorite");
const listenQueries = require("./queries/listen");
const roleQueries = require("./queries/role");
const actorQueries = require("./queries/actor");
const serieQueries = require("./queries/serie");
const serieActorQueries = require("./queries/serie_actor");
const serieCategoryQueries = require("./queries/serie_category");
const synopsisQueries = require("./queries/synopsis");
const accountQueries = require("./queries/account");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/images/:image", (req, res) => {
  let image = req.params.image;

  let read = fs.createReadStream(`./src/img/${image}`);
  read.on("open", () => {
    res.set("Content-Type", "image/jpeg");
    read.pipe(res);
  });
});

app.get('/sound/', function(req, res){
  let sound = req.query.sound;
  let saga = req.query.saga;
  ms.pipe(req, res, `${process.ENV.SERVER}/src/sound/${saga}/${sound}`);
});
/* MAIN */

/**
 * @swagger
 * /auth/signin:
 *  post:
 *      tags:
 *        - auth
 *      description: Use login account
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: account
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/auth/signin', accountQueries.loginAccount)

/**
 * @swagger
 * /auth/signup:
 *  post:
 *      tags:
 *        - auth 
 *      description: Use to create account
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: account
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  birth_date:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/auth/signup", accountQueries.createAccount);

app.get("/serieCategory/:categoryName", serieByCategory.getSerieByCategory )

/**
 * @swagger
 * /sagaInfo/{serie_id}:
 *  get:
 *      tags:
 *          - main
 *      description: Use to request all info on saga with episode_nb
 *      parameters:
 *          - name: 'serie_id'
 *            in: 'path'
 *            type: integer
 *            minimum: 1
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/sagaInfo/:serie_id", mainQueries.getSagaInfosBySerieId);

/**
 * @swagger
 * /account:
 *  get:
 *      tags:
 *          - account
 *      description: Use to request all account
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/account", accountQueries.getAccount);

/**
 * @swagger
 * /account/{account_id}:
 *  get:
 *      tags:
 *          - account
 *      description: Use to request account by id
 *      parameters:
 *        - name: 'account_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/account/:account_id", accountQueries.getAccountById);


/**
 * @swagger
 * /account/{account_id}:
 *  put:
 *      tags:
 *          - account
 *      description: Use to update account
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: account_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: account
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  birth_date:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put("/account/:account_id", accountQueries.updateAccount);

/**
 * @swagger
 * /account/{account_id}:
 *  delete:
 *      tags:
 *          - account
 *      description: Use to delete account by id
 *      parameters:
 *        - name: 'account_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/account/:account_id", accountQueries.deleteAccount);

/**
 * @swagger
 * /serie:
 *  get:
 *      tags:
 *          - serie
 *      description: Use to request all serie
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/serie", serieQueries.getSerie);

/**
 * @swagger
 * /serie/{serie_id}:
 *  get:
 *      tags:
 *          - serie
 *      description: Use to request serie by id
 *      parameters:
 *        - name: 'serie_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/serie/:serie_id", serieQueries.getSerieById);

/**
 * @swagger
 * /serie/{serie_id}:
 *  get:
 *      tags:
 *          - serie
 *      description: Use to request serie by upload date
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/serieUploades/", serieQueries.getSerieByUploadDate);

/**
 * @swagger
 * /serie:
 *  post:
 *      tags:
 *          - serie
 *      description: Use to create serie
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serie
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  image:
 *                      type: string
 *                  image_lg:
 *                      type: string
 *                  author:
 *                      type: string
 *                  duration:
 *                      type: string
 *                  upload_date:
 *                      type: string
 *                  creation_date:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/serie", serieQueries.createSerie);

/**
 * @swagger
 * /serie/{serie_id}:
 *  put:
 *      tags:
 *          - serie
 *      description: Use to update serie
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: serie_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: account
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  image:
 *                      type: string
 *                  image_lg:
 *                      type: string
 *                  author:
 *                      type: string
 *                  duration:
 *                      type: string
 *                  upload_date:
 *                      type: string
 *                  creation_date:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put("/serie/:serie_id", serieQueries.updateSerie);

/**
 * @swagger
 * /serie/{serie_id}:
 *  delete:
 *      tags:
 *          - serie
 *      description: Use to delete serie by id
 *      parameters:
 *        - name: 'serie_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/serie/:serie_id", serieQueries.deleteSerie);

/**
 * @swagger
 * /serie_actor:
 *  get:
 *      tags:
 *          - serie_actor
 *      description: Use to request all serie_actor
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/serie_actor", serieActorQueries.getSerieActor);

/**
 * @swagger
 * /serie_actor/{serie_actor_id}:
 *  get:
 *      tags:
 *          - serie_actor
 *      description: Use to request serie_actor by id
 *      parameters:
 *        - name: 'serie_actor_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/serie_actor/:serie_actor_id", serieActorQueries.getSerieActorById);

/**
 * @swagger
 * /serie_actor:
 *  post:
 *      tags:
 *          - serie_actor
 *      description: Use to create serie_actor relation
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serie_id
 *          in: query
 *          type: int
 *        - name: actor_id
 *          in: query
 *          type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/serie_actor", serieActorQueries.createSerieActor);

/**
 * @swagger
 * /serie_actor/{serie_actor_id}:
 *  put:
 *      tags:
 *          - serie_actor
 *      description: Use to update serie_actor relation
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: serie_actor_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: serie_id
 *            in: query
 *            type: int
 *          - name: actor_id
 *            in: query
 *            type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put("/serie_actor/:serie_actor_id", serieActorQueries.updateSerieActor);

/**
 * @swagger
 * /serie_actor/{serie_actor_id}:
 *  delete:
 *      tags:
 *          - serie_actor
 *      description: Use to delete serie_actor relation by id
 *      parameters:
 *        - name: 'serie_actor_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/serie_actor/:serie_actor_id", serieActorQueries.deleteSerieActor);

/**
 * @swagger
 * /serie_category:
 *  get:
 *      tags:
 *          - serie_category
 *      description: Use to request all serie_category
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/serie_category", serieCategoryQueries.getSerieCategory);

/**
 * @swagger
 * /serie_category/{serie_category_id}:
 *  get:
 *      tags:
 *          - serie_category
 *      description: Use to request serie_category by id
 *      parameters:
 *        - name: 'serie_category_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get(
  "/serie_category/:serie_category_id",
  serieCategoryQueries.getSerieCategoryById
);

/**
 * @swagger
 * /serie_category:
 *  post:
 *      tags:
 *          - serie_category
 *      description: Use to create serie_category relation
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serie_id
 *          in: query
 *          type: int
 *        - name: category_id
 *          in: query
 *          type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/serie_category", serieCategoryQueries.createSerieCategory);

/**
 * @swagger
 * /serie_category/{serie_category_id}:
 *  put:
 *      tags:
 *          - serie_category
 *      description: Use to update serie_category relation
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: serie_category_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: serie_id
 *            in: query
 *            type: int
 *          - name: category_id
 *            in: query
 *            type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put(
  "/serie_category/:serie_category_id",
  serieCategoryQueries.updateSerieCategory
);

/**
 * @swagger
 * /serie_category/{serie_category_id}:
 *  delete:
 *      tags:
 *          - serie_category
 *      description: Use to delete serie_category relation by id
 *      parameters:
 *        - name: 'serie_category_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete(
  "/serie_category/:serie_category_id",
  serieCategoryQueries.deleteSerieCategory
);

/**
 * @swagger
 * /season:
 *  get:
 *      tags:
 *          - season
 *      description: Use to request all season
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/season", seasonQueries.getSeason);

/**
 * @swagger
 * /season/{season_id}:
 *  get:
 *      tags:
 *          - season
 *      description: Use to request season by id
 *      parameters:
 *        - name: 'season_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/season/:season_id", seasonQueries.getSeasonById);

/**
 * @swagger
 * /season:
 *  post:
 *      tags:
 *          - season
 *      description: Use to create season
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serie_id
 *          type: int
 *          in: query
 *        - name: season
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  season_nb:
 *                      type: integer
 *                  quantite:
 *                      type: integer
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/season", seasonQueries.createSeason);

/**
 * @swagger
 * /season/{season_id}:
 *  put:
 *      tags:
 *          - season
 *      description: Use to update season
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: season_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: serie_id
 *            type: int
 *            in: query
 *          - name: season
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  season_nb:
 *                      type: integer
 *                  quantite:
 *                      type: integer
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put("/season/:season_id", seasonQueries.updateSeason);

/**
 * @swagger
 * /season/{season_id}:
 *  delete:
 *      tags:
 *          - season
 *      description: Use to delete season by id
 *      parameters:
 *        - name: 'season_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/season/:season_id", seasonQueries.deleteSeason);

/**
 * @swagger
 * /episode:
 *  get:
 *      tags:
 *          - episode
 *      description: Use to request all episode
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/episode", episodeQueries.getEpisode);

/**
 * @swagger
 * /episode/{episode_id}:
 *  get:
 *      tags:
 *          - episode
 *      description: Use to request episode by id
 *      parameters:
 *        - name: 'episode_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/episode/:episode_id", episodeQueries.getEpisodeById);

/**
 * @swagger
 * /episodeNumber/{episode_nb}:
 *  get:
 *      tags:
 *          - episode
 *      description: Use to request episode by episode nb
 *      parameters:
 *        - name: 'episode_nb'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/episodeNumber/:episode_nb", episodeQueries.getEpisodeByEpisodeNumber);

/**
 * @swagger
 * /episode:
 *  post:
 *      tags:
 *          - episode
 *      description: Use to create episode
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: seasonid
 *          type: int
 *          in: query
 *        - name: episode
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  episode_nb:
 *                      type: integer
 *                  duration:
 *                      type: string
 *                  mp3file:
 *                      type string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/episode", episodeQueries.createEpisode);

/**
 * @swagger
 * /episode/{episode_id}:
 *  put:
 *      tags:
 *          - episode
 *      description: Use to update episode
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: episode_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: seasonid
 *            type: int
 *            in: query
 *          - name: episode
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  episode_nb:
 *                      type: integer
 *                  duration:
 *                      type: string
 *                  mp3file:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put("/episode/:episode_id", episodeQueries.updateEpisode);

/**
 * @swagger
 * /episode/{episode_id}:
 *  delete:
 *      tags:
 *          - episode
 *      description: Use to delete episode by id
 *      parameters:
 *        - name: 'episode_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/episode/:episode_id", episodeQueries.deleteEpisode);

/**
 * @swagger
 * /synopsis:
 *  get:
 *      tags:
 *          - synopsis
 *      description: Use to request all synopsis
 *      parameters:
 *          - in: query
 *            name: serie_id
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/synopsis", synopsisQueries.getSynopsis);

/**
 * @swagger
 * /synopsis/{synopsis_id}:
 *  get:
 *      tags:
 *          - synopsis
 *      description: Use to request synopsis by id
 *      parameters:
 *        - name: 'synopsis_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/synopsis/:synopsis_id", synopsisQueries.getSynopsisById);

/**
 * @swagger
 * /synopsis:
 *  post:
 *      tags:
 *          - synopsis
 *      description: Use to create synopsis
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serie_id
 *          type: int
 *          in: query
 *        - name: body
 *          in: query
 *          type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/synopsis", synopsisQueries.createSynopsis);

/**
 * @swagger
 * /synopsis/{synopsis_id}:
 *  put:
 *      tags:
 *          - synopsis
 *      description: Use to update synopsis
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: synopsis_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: serie_id
 *            type: int
 *            in: query
 *          - name: body
 *            in: query
 *            type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put("/synopsis/:synopsis_id", synopsisQueries.updateSynopsis);

/**
 * @swagger
 * /synopsis/{synopsis_id}:
 *  delete:
 *      tags:
 *          - synopsis
 *      description: Use to delete synopsis by id
 *      parameters:
 *        - name: 'synopsis_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/synopsis/:synopsis_id", synopsisQueries.deleteSynopsis);

/**
 * @swagger
 * /category:
 *  get:
 *      tags:
 *          - category
 *      description: Use to request all episode
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/category", categoryQueries.getCategory);

/**
 * @swagger
 * /category/{category_id}:
 *  get:
 *      tags:
 *          - category
 *      description: Use to request category by id
 *      parameters:
 *        - name: 'category_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/category/:category_id", categoryQueries.getCategoryById);

/**
 * @swagger
 * /category:
 *  post:
 *      tags:
 *          - category
 *      description: Use to create category
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: name
 *          in: query
 *          type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post("/category", categoryQueries.createCategory);

/**
 * @swagger
 * /category/{category_id}:
 *  put:
 *      tags:
 *          - category
 *      description: Use to update category
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: category_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: name
 *            in: query
 *            type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put("/category/:category_id", categoryQueries.updateCategory);

/**
 * @swagger
 * /category/{category_id}:
 *  delete:
 *      tags:
 *          - category
 *      description: Use to delete category by id
 *      parameters:
 *        - name: 'category_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/category/:category_id", categoryQueries.deleteCategory);

/**
 * @swagger
 * /favorite:
 *  get:
 *      tags:
 *          - favorite
 *      description: Use to request all favorite
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/favorite", favoriteQueries.getFavorites);

/**
 * @swagger
 * /favorite/{favorite_id}:
 *  get:
 *      tags:
 *          - favorite
 *      description: Use to request favorite by id
 *      parameters:
 *        - name: 'favorite_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/favorite/:favorite_id", favoriteQueries.getFavoritesById);

/**
 * @swagger
 * /favorite:
 *  post:
 *      tags:
 *          - favorite
 *      description: Use to create favorite
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: account_id
 *            in: query
 *            type: string
 *          - name: serie_id
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.post("/favorite", favoriteQueries.createFavorites);

/**
 * @swagger
 * /favorite/{favorite_id}:
 *  put:
 *      tags:
 *          - favorite
 *      description: Use to update favorite
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: favorite_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: account_id
 *            in: query
 *            type: string
 *          - name: serie_id
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.put("/favorite/:favorite_id", favoriteQueries.updateFavorites);

/**
 * @swagger
 * /favorite/{favorite_id}:
 *  delete:
 *      tags:
 *          - favorite
 *      description: Use to delete favorite by id
 *      parameters:
 *        - name: 'favorite_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/favorite/:favorite_id", favoriteQueries.deleteFavorites);

/**
 * @swagger
 * /listen:
 *  get:
 *      tags:
 *          - listen
 *      description: Use to request all listen
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/listen", listenQueries.getListen);

/**
 * @swagger
 * /listen/{listen_id}:
 *  get:
 *      tags:
 *          - listen
 *      description: Use to request listen by id
 *      parameters:
 *        - name: 'listen_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/listen/:listen_id", listenQueries.getListenById);

/**
 * @swagger
 * /listen:
 *  post:
 *      tags:
 *          - listen
 *      description: Use to create listen
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: account_id
 *            in: query
 *            type: integer
 *          - name: episodeid
 *            in: query
 *            type: integer
 *          - name: duration
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.post("/listen", listenQueries.createListen);

/**
 * @swagger
 * /listen/{listen_id}:
 *  put:
 *      tags:
 *          - listen
 *      description: Use to update listen
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: listen_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: account_id
 *            in: query
 *            type: integer
 *          - name: episodeid
 *            in: query
 *            type: integer
 *          - name: duration
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.put("/listen/:listen_id", listenQueries.updateListen);

/**
 * @swagger
 * /listen/{listen_id}:
 *  delete:
 *      tags:
 *          - listen
 *      description: Use to delete listen by id
 *      parameters:
 *        - name: 'listen_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/listen/:listen_id", listenQueries.deleteListen);

/**
 * @swagger
 * /role:
 *  get:
 *      tags:
 *          - role
 *      description: Use to request all role
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/role", roleQueries.getRole);

/**
 * @swagger
 * /role/{role_id}:
 *  get:
 *      tags:
 *          - role
 *      description: Use to request role by id
 *      parameters:
 *        - name: 'role_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/role/:role_id", roleQueries.getRoleById);

/**
 * @swagger
 * /role:
 *  post:
 *      tags:
 *          - role
 *      description: Use to create role
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: actor_id
 *            in: query
 *            type: integer
 *          - name: character
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.post("/role", roleQueries.createRole);

/**
 * @swagger
 * /role/{role_id}:
 *  put:
 *      tags:
 *          - role
 *      description: Use to update role
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: role_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: actor_id
 *            in: query
 *            type: integer
 *          - name: character
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.put("/role/:role_id", roleQueries.updateRole);

/**
 * @swagger
 * /role/{role_id}:
 *  delete:
 *      tags:
 *          - role
 *      description: Use to delete role by id
 *      parameters:
 *        - name: 'role_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/role/:role_id", roleQueries.deleteRole);

/**
 * @swagger
 * /actor:
 *  get:
 *      tags:
 *          - actor
 *      description: Use to request all actor
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get("/actor", actorQueries.getActor);

/**
 * @swagger
 * /actor/{actor_id}:
 *  get:
 *      tags:
 *          - actor
 *      description: Use to request actor by id
 *      parameters:
 *        - name: 'actor_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.get("/actor/:actor_id", actorQueries.getActorById);

/**
 * @swagger
 * /actor:
 *  post:
 *      tags:
 *          - actor
 *      description: Use to create actor
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: name
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.post("/actor", actorQueries.createActor);

/**
 * @swagger
 * /actor/{actor_id}:
 *  put:
 *      tags:
 *          - actor
 *      description: Use to update actor
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: actor_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: name
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.put("/actor/:actor_id", actorQueries.updateActor);

/**
 * @swagger
 * /actor/{actor_id}:
 *  delete:
 *      tags:
 *          - actor
 *      description: Use to delete actor by id
 *      parameters:
 *        - name: 'actor_id'
 *          in: 'path'
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *      responses:
 *          '200':
 *              description: successful operation
 */
app.delete("/actor/:actor_id", actorQueries.deleteActor);

app.listen(port, () => {
  console.log("Running on port " + port);
});
