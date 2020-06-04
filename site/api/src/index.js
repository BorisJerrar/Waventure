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

app.get('/test', (req, res) => {
  let data = req.query.url

  let read = fs.createReadStream(`./src/img/${data}.jpg`);
  read.on('open', ()=>{
    res.set('Content-Type', 'image/jpeg')
    read.pipe(res)
  })
})

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
 * /actors:
 *  get:
 *      tags:
 *          - actor
 *      description: Use to request all actors
 *      responses:
 *          '200':
 *              description: results rows
 */
app.get('/actors', actorsQueries.getActors)

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

app.listen(port, () => {
    console.log("Running on port " + port);
})
