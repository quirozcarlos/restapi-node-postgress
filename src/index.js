const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// routes
app.use(require('./routes/index'))

app.listen(3000)
console.log('Running server on port 3000');
