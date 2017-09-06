'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options
  // User Profiles CRUD Operations

  // Get all the user profiles 
  app.get('/profiles', (req, res, next) => {
    repo.getAllMovies().then(movies => {
      res.status(status.OK).json(movies)
    }).catch(next)
  })
    
  // Get a user profile by id
  app.get('/profiles/:id', (req, res, next) => {
    repo.getMovieById(req.params.id).then(movie => {
      res.status(status.OK).json(movie)
    }).catch(next)
  })

  // Create a user profile
  app.post('/profiles', (req, res, next) => {
    repo.getMovieById(req.params.id).then(movie => {
      res.status(status.OK).json(movie)
    }).catch(next)
  })

  // Update a user profile by id
  app.put('/profiles/:id', (req, res, next) => {
    repo.getMovieById(req.params.id).then(movie => {
      res.status(status.OK).json(movie)
    }).catch(next)
  })

  // Delete a user profile by id
  app.delete('/profiles/:id', (req, res, next) => {
    repo.getMovieById(req.params.id).then(movie => {
      res.status(status.OK).json(movie)
    }).catch(next)
  })
}