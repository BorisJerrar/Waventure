const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.port|| 4000
const app = express()
const db = require('../db/database')

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
 *          - series
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
 *          - series
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
 *          - series
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
 *          - series
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
 *          - series
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
 *          - series
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
 *          - series
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

app.listen(port, () => {
    console.log("Running on port " + port);
})
