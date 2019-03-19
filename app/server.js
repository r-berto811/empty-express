// app/server.js

// Import dependencies.
import express from 'express'
import api from '../src'

// Create new express instance.
const app = express()

// Register all middlewares.
app.use('/', api)

// Start server.
let server = app.listen(process.env.APP_PORT, process.env.APP_HOST, _ => {
  log.info(`Server was listened on ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})

// Write to logs on server error.
server.on('error', function (err) {
  log.error(err)
})
