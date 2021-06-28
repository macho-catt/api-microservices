const config = require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const apiRouter = require('./controllers/api')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.static('../frontend'))
app.use(express.json())

//app.use('/api/blogs', apiRouter)
app.use(apiRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app