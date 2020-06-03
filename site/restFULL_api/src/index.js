const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.port|| 4000
const app = express()


app.use(express.json())
app.use(cors())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

/* app.get('/actors', getActors)
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





app.listen(port, () => {
    console.log("Running on port " + port);
})