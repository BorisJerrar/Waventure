const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.port|| 4000
const app = express()
const db = require('../db/database')
const fs = require('fs')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Waventure API',
            description: 'waventure API Information',
            contact: {
                name: 'Boris Jerar, Charles Decodin, Valentin Cellier'
            },
            server: ['http://localhost:4000']
        }
    },
    apis: ['index.js']
}
 const swaggerDocs = swaggerJsDoc(swaggerOptions)


/* import queries */
const mainQueries = require('./queries/main')
const saisonsQueries = require('./queries/saisons')
const categoriesQueries = require('./queries/categories')
const episodesQueries = require('./queries/episodes')
const favoritesQueries = require('./queries/favorites')
const listenQueries = require('./queries/listen')
const roleQueries = require('./queries/role')
const actorsQueries = require('./queries/actors')
const seriesQueries = require('./queries/series')
const seriesActorQueries = require('./queries/series_actors')
const seriesCategoriesQueries = require('./queries/series_categories')
const synopsisQueries = require('./queries/synopsis')
const usersQueries = require('./queries/users')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(bodyParser.json())
app.use(cors())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/images/:image', (req, res) => {
  let image = req.params.image

  let read = fs.createReadStream(`./src/img/${image}`);
  read.on('open', ()=>{
    res.set('Content-Type', 'image/jpeg')
    read.pipe(res)
  })
})

app.get('/sound/:sound', (req, res) => {
  let sound = req.params.sound

  let read = fs.createReadStream(`./src/sound/${sound}.mp3`);
  read.on('open', ()=>{
    res.set('Content-Type', 'audio/mpeg')
    read.pipe(res)
  })
})

/* MAIN */
/**
 * @swagger
 * /sagaInfo/{series_id}:
 *  get:
 *      tags:
 *          - main
 *      description: Use to request all info on saga with episode_number
 *      parameters:
 *          - name: 'series_id'
 *            in: 'path'
 *            type: integer
 *            minimum: 1
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/sagaInfo/:series_id', mainQueries.getSagaInfosBySerieId)



/**
 * @swagger
 * /users:
 *  get:
 *      tags:
 *          - users
 *      description: Use to request all users
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/users', usersQueries.getUsers)

/**
 * @swagger
 * /users/{users_id}:
 *  get:
 *      tags:
 *          - users
 *      description: Use to request users by id
 *      parameters:
 *        - name: 'users_id'
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
app.get('/users/:users_id', usersQueries.getUsersById)

/**
 * @swagger
 * /users:
 *  post:
 *      tags:
 *          - users
 *      description: Use to create users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: users
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  birthdate:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/users', usersQueries.createUsers)

/**
 * @swagger
 * /users/{users_id}:
 *  put:
 *      tags:
 *          - users
 *      description: Use to update users
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: users_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: users
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  birthdate:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put('/users/:users_id', usersQueries.updateUsers)

/**
 * @swagger
 * /users/{users_id}:
 *  delete:
 *      tags:
 *          - users
 *      description: Use to delete users by id
 *      parameters:
 *        - name: 'users_id'
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
app.delete('/users/:users_id', usersQueries.deleteUsers)

/**
 * @swagger
 * /series:
 *  get:
 *      tags:
 *          - series
 *      description: Use to request all series
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/series', seriesQueries.getSeries)

/**
 * @swagger
 * /series/{series_id}:
 *  get:
 *      tags:
 *          - series
 *      description: Use to request series by id
 *      parameters:
 *        - name: 'series_id'
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
app.get('/series/:series_id', seriesQueries.getSerieById)

/**
 * @swagger
 * /series:
 *  post:
 *      tags:
 *          - series
 *      description: Use to create series
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: series
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  image:
 *                      type: string
 *                  imagelg:
 *                      type: string
 *                  autor:
 *                      type: string
 *                  duration:
 *                      type: string
 *                  uploaddate:
 *                      type: string
 *                  creationdate:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/series', seriesQueries.createSeries)

/**
 * @swagger
 * /series/{series_id}:
 *  put:
 *      tags:
 *          - series
 *      description: Use to update series
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: series_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: users
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  image:
 *                      type: string
 *                  imagelg:
 *                      type: string
 *                  autor:
 *                      type: string
 *                  duration:
 *                      type: string
 *                  uploaddate:
 *                      type: string
 *                  creationdate:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put('/series/:series_id', seriesQueries.updateSeries)

/**
 * @swagger
 * /series/{series_id}:
 *  delete:
 *      tags:
 *          - series
 *      description: Use to delete series by id
 *      parameters:
 *        - name: 'series_id'
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
app.delete('/series/:series_id', seriesQueries.deleteSeries)

/**
 * @swagger
 * /series_actors:
 *  get:
 *      tags:
 *          - series_actors
 *      description: Use to request all series_actors
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/series_actors', seriesActorQueries.getSeriesActors)

/**
 * @swagger
 * /series_actors/{series_actors_id}:
 *  get:
 *      tags:
 *          - series_actors
 *      description: Use to request series_actors by id
 *      parameters:
 *        - name: 'series_actors_id'
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
app.get('/series_actors/:series_actors_id',seriesActorQueries.getSeriesActorsById)

/**
 * @swagger
 * /series_actors:
 *  post:
 *      tags:
 *          - series_actors
 *      description: Use to create series_actors relation
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serieid
 *          in: query
 *          type: int
 *        - name: actorid
 *          in: query
 *          type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/series_actors', seriesActorQueries.createSeriesActors)

/**
 * @swagger
 * /series_actors/{series_actors_id}:
 *  put:
 *      tags:
 *          - series_actors
 *      description: Use to update series_actors relation
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: series_actors_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: serieid
 *            in: query
 *            type: int
 *          - name: actorid
 *            in: query
 *            type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put('/series_actors/:series_actors_id', seriesActorQueries.updateSeriesActors)

/**
 * @swagger
 * /series_actors/{series_actors_id}:
 *  delete:
 *      tags:
 *          - series_actors
 *      description: Use to delete series_actors relation by id
 *      parameters:
 *        - name: 'series_actors_id'
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
app.delete('/series_actors/:series_actors_id', seriesActorQueries.deleteSeriesActors)

/**
 * @swagger
 * /series_categories:
 *  get:
 *      tags:
 *          - series_categories
 *      description: Use to request all series_categories
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/series_categories', seriesCategoriesQueries.getSeriesCategories)

/**
 * @swagger
 * /series_categories/{series_categories_id}:
 *  get:
 *      tags:
 *          - series_categories
 *      description: Use to request series_categories by id
 *      parameters:
 *        - name: 'series_categories_id'
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
app.get('/series_categories/:series_categories_id',seriesCategoriesQueries.getSeriesCategoriesById)

/**
 * @swagger
 * /series_categories:
 *  post:
 *      tags:
 *          - series_categories
 *      description: Use to create series_categories relation
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serieid
 *          in: query
 *          type: int
 *        - name: categoryid
 *          in: query
 *          type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/series_categories', seriesCategoriesQueries.createSeriesCategories)

/**
 * @swagger
 * /series_categories/{series_categories_id}:
 *  put:
 *      tags:
 *          - series_categories
 *      description: Use to update series_categories relation
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: series_categories_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: serieid
 *            in: query
 *            type: int
 *          - name: categoryid
 *            in: query
 *            type: int
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put('/series_categories/:series_categories_id', seriesCategoriesQueries.updateSeriesCategories)

/**
 * @swagger
 * /series_categories/{series_categories_id}:
 *  delete:
 *      tags:
 *          - series_categories
 *      description: Use to delete series_categories relation by id
 *      parameters:
 *        - name: 'series_categories_id'
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
app.delete('/series_categories/:series_categories_id', seriesCategoriesQueries.deleteSeriesCategories)

/**
 * @swagger
 * /saisons:
 *  get:
 *      tags:
 *          - saisons
 *      description: Use to request all saisons
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/saisons', saisonsQueries.getSaisons)

/**
 * @swagger
 * /saisons/{saisons_id}:
 *  get:
 *      tags:
 *          - saisons
 *      description: Use to request saisons by id
 *      parameters:
 *        - name: 'saisons_id'
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
app.get('/saisons/:saisons_id', saisonsQueries.getSaisonById)

/**
 * @swagger
 * /saisons:
 *  post:
 *      tags:
 *          - saisons
 *      description: Use to create saisons
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: serieid
 *          type: int
 *          in: query
 *        - name: saisons
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  saison_number:
 *                      type: integer
 *                  quantite:
 *                      type: integer
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/saisons', saisonsQueries.createSaisons)

/**
 * @swagger
 * /saisons/{saisons_id}:
 *  put:
 *      tags:
 *          - saisons
 *      description: Use to update saisons
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: saisons_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: serieid
 *            type: int
 *            in: query
 *          - name: saisons
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  saison_number:
 *                      type: integer
 *                  quantite:
 *                      type: integer
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put('/saisons/:saisons_id', saisonsQueries.updateSaisons)

/**
 * @swagger
 * /saisons/{saisons_id}:
 *  delete:
 *      tags:
 *          - saisons
 *      description: Use to delete saisons by id
 *      parameters:
 *        - name: 'saisons_id'
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
app.delete('/saisons/:saisons_id', saisonsQueries.deleteSaisons)

/**
 * @swagger
 * /episodes:
 *  get:
 *      tags:
 *          - episodes
 *      description: Use to request all episodes
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/episodes', episodesQueries.getEpisodes)

/**
 * @swagger
 * /episodes/{episodes_id}:
 *  get:
 *      tags:
 *          - episodes
 *      description: Use to request episodes by id
 *      parameters:
 *        - name: 'episodes_id'
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
app.get('/episodes/:episodes_id', episodesQueries.getEpisodesById)

/**
 * @swagger
 * /episodesNumber/{episodes_number}:
 *  get:
 *      tags:
 *          - episodes
 *      description: Use to request episodes by episode number
 *      parameters:
 *        - name: 'episodes_number'
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
app.get('/episodesNumber/:episodes_number', episodesQueries.getEpisodesByEpisodeNumber)

/**
 * @swagger
 * /episodes:
 *  post:
 *      tags:
 *          - episodes
 *      description: Use to create episodes
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: saisonid
 *          type: int
 *          in: query
 *        - name: episodes
 *          in: body
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  episode_number:
 *                      type: integer
 *                  duration:
 *                      type: string
 *                  mp3file:
 *                      type string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/episodes', episodesQueries.createEpisodes)

/**
 * @swagger
 * /episodes/{episodes_id}:
 *  put:
 *      tags:
 *          - episodes
 *      description: Use to update episodes
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: episodes_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: saisonid
 *            type: int
 *            in: query
 *          - name: episodes
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  episode_number:
 *                      type: integer
 *                  duration:
 *                      type: string
 *                  mp3file:
 *                      type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put('/episodes/:episodes_id', episodesQueries.updateEpisodes)

/**
 * @swagger
 * /episodes/{episodes_id}:
 *  delete:
 *      tags:
 *          - episodes
 *      description: Use to delete episodes by id
 *      parameters:
 *        - name: 'episodes_id'
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
app.delete('/episodes/:episodes_id', episodesQueries.deleteEpisodes)

/**
 * @swagger
 * /synopsis:
 *  get:
 *      tags:
 *          - synopsis
 *      description: Use to request all synopsis
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/synopsis', synopsisQueries.getSynopsis)

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
app.get('/synopsis/:synopsis_id', synopsisQueries.getSynopsisById)

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
 *        - name: serieid
 *          type: int
 *          in: query
 *        - name: body
 *          in: query
 *          type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.post('/synopsis', synopsisQueries.createSynopsis)

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
 *          - name: serieid
 *            type: int
 *            in: query
 *          - name: body
 *            in: query
 *            type: string
 *      responses:
 *          '201':
 *              description: successful operation
 */
app.put('/synopsis/:synopsis_id', synopsisQueries.updateSynopsis)

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
app.delete('/synopsis/:synopsis_id', synopsisQueries.deleteSynopsis)

/**
 * @swagger
 * /categories:
 *  get:
 *      tags:
 *          - categories
 *      description: Use to request all episodes
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/categories', categoriesQueries.getCategories)

/**
 * @swagger
 * /categories/{categories_id}:
 *  get:
 *      tags:
 *          - categories
 *      description: Use to request categories by id
 *      parameters:
 *        - name: 'categories_id'
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
app.get('/categories/:categories_id', categoriesQueries.getCategoriesById)

/**
 * @swagger
 * /categories:
 *  post:
 *      tags:
 *          - categories
 *      description: Use to create categories
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
app.post('/categories', categoriesQueries.createCategories)

/**
 * @swagger
 * /categories/{categories_id}:
 *  put:
 *      tags:
 *          - categories
 *      description: Use to update categories
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: categories_id
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
app.put('/categories/:categories_id', categoriesQueries.updateCategories)

/**
 * @swagger
 * /categories/{categories_id}:
 *  delete:
 *      tags:
 *          - categories
 *      description: Use to delete categories by id
 *      parameters:
 *        - name: 'categories_id'
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
app.delete('/categories/:categories_id', categoriesQueries.deleteCategories)

/**
 * @swagger
 * /favorites:
 *  get:
 *      tags:
 *          - favorites
 *      description: Use to request all favorites
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/favorites', favoritesQueries.getFavorites)

/**
 * @swagger
 * /favorites/{favorites_id}:
 *  get:
 *      tags:
 *          - favorites
 *      description: Use to request favorites by id
 *      parameters:
 *        - name: 'favorites_id'
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
app.get('/favorites/:favorites_id', favoritesQueries.getFavoritesById)

/**
 * @swagger
 * /favorites:
 *  post:
 *      tags:
 *          - favorites
 *      description: Use to create favorites
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: userid
 *            in: query
 *            type: string
 *          - name: serieid
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.post('/favorites', favoritesQueries.createFavorites)

/**
 * @swagger
 * /favorites/{favorites_id}:
 *  put:
 *      tags:
 *          - favorites
 *      description: Use to update favorites
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: favorites_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: userid
 *            in: query
 *            type: string
 *          - name: serieid
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.put('/favorites/:favorites_id', favoritesQueries.updateFavorites)

/**
 * @swagger
 * /favorites/{favorites_id}:
 *  delete:
 *      tags:
 *          - favorites
 *      description: Use to delete favorites by id
 *      parameters:
 *        - name: 'favorites_id'
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
app.delete('/favorites/:favorites_id', favoritesQueries.deleteFavorites)

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
app.get('/listen', listenQueries.getListen)

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
app.get('/listen/:listen_id', listenQueries.getListenById)

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
 *          - name: userid
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
app.post('/listen', listenQueries.createListen)

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
 *          - name: userid
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
app.put('/listen/:listen_id', listenQueries.updateListen)

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
app.delete('/listen/:listen_id', listenQueries.deleteListen)

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
app.get('/role', roleQueries.getRole)

/**
 * @swagger
 * /role/{roles_id}:
 *  get:
 *      tags:
 *          - role
 *      description: Use to request role by id
 *      parameters:
 *        - name: 'roles_id'
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
app.get('/role/:roles_id', roleQueries.getRoleById)

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
 *          - name: actorid
 *            in: query
 *            type: integer
 *          - name: character
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.post('/role', roleQueries.createRole)

/**
 * @swagger
 * /role/{roles_id}:
 *  put:
 *      tags:
 *          - role
 *      description: Use to update role
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: roles_id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *          - name: actorid
 *            in: query
 *            type: integer
 *          - name: character
 *            in: query
 *            type: string
 *      responses:
 *          '200':
 *              description: results rows
 */
app.put('/role/:roles_id', roleQueries.updateRole)

/**
 * @swagger
 * /role/{roles_id}:
 *  delete:
 *      tags:
 *          - role
 *      description: Use to delete role by id
 *      parameters:
 *        - name: 'roles_id'
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
app.delete('/role/:roles_id', roleQueries.deleteRole)

/**
 * @swagger
 * /actors:
 *  get:
 *      tags:
 *          - actors
 *      description: Use to request all actors
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/actors', actorsQueries.getActors)

/**
 * @swagger
 * /actors/{actors_id}:
 *  get:
 *      tags:
 *          - actors
 *      description: Use to request actors by id
 *      parameters:
 *        - name: 'actors_id'
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
app.get('/actors/:actors_id', actorsQueries.getActorById)

/**
 * @swagger
 * /actors:
 *  post:
 *      tags:
 *          - actors
 *      description: Use to create actors
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
app.post('/actors', actorsQueries.createActors)

/**
 * @swagger
 * /actors/{actors_id}:
 *  put:
 *      tags:
 *          - actors
 *      description: Use to update actors
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: actors_id
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
app.put('/actors/:actors_id', actorsQueries.updateActors)

/**
 * @swagger
 * /actors/{actors_id}:
 *  delete:
 *      tags:
 *          - actors
 *      description: Use to delete actors by id
 *      parameters:
 *        - name: 'actors_id'
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
app.delete('/actors/:actors_id', actorsQueries.deleteActors)

app.listen(port, () => {
    console.log("Running on port " + port);
})
