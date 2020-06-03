const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.port|| 4000
const app = express()
const db = require('../db/database')

const queries = require('./queries/saisons')

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

 app.get('/actors', (req, res) => {
  db.query("SELECT * FROM series", (error, result) => {
    if (error){
      throw new Error('somting went wrong')
    }
    res.status(200).json(result.rows)
  })
 })

/*
app.get('/categories', getCategories)
app.get('/episodes', getEpisodes)
app.get('/favorites', getFavorites)
app.get('/listen', getListen)
app.get('/role', getRole)

app.get('/saisons', getSaisons)
app.get('/series', getSeries)
app.get('/series_actors', getSeriesActors)
app.get('/series_categories', getSeriesCategories)
app.get('/synopsis', getSynopsis)
app.get('/users', getUsers) */


app.get('/saisons', queries.getSaisons)



app.listen(port, () => {
    console.log("Running on port " + port);
})
