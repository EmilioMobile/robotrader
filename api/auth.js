'use strict'
const status = require('http-status');

module.exports = (app, options) => {
  const {repo} = options

  app.get('/authorization/login', (req, res, next) => {
    repo.signIn().then(profile => {
      res.status(status.OK).json(profile)
    }).catch(next)
  })

  app.get('/authorization/logout', (req, res, next) => {
    repo.signOut().then(movies => {
      res.status(status.OK).json(movies)
    }).catch(next)
  })
  
  app.get('/authorization/setup', function(req, res, next) {
    repo.createUser().then(user => {
      res.status(status.OK).json({ success: true })
    }).catch(next)
  });

  app.get('/authorization/users', function(req, res, next) {
    repo.getAllUsers().then((users, message) => {
      res.status(status.OK).json(users)
    }).catch(next)
  });
}