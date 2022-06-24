const express = require('express')
const app = express()

// middlewares (funciones que se ejecutan antes de entrar a las rutas)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use(require('./routes/index'))

app.listen(3000)
console.log('Running server on port 3000');
