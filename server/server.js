
'use strict'
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const movieAPI = require('../api/movies')
const authorizationAPI = require('../api/auth')

const start = (options) => {
  return new Promise((resolve, reject) => {
    // we need to verify if we have a repository added and a server port
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }
    // let's init a express app, and add some middlewares
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })
    
    // we add our API's to the express app
    movieAPI(app, options)
    authorizationAPI(app, options)

    app.get('/', function(req, res) {
      res.send('ROBOTRADER API');
    });
    
    // finally we start the server, and return the newly created server 
    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})