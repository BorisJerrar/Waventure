const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )


const port = process.env.port|| 4000



app.listen(port, () => {
    console.log("Running on port " + port);
})