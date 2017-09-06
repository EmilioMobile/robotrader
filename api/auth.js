'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options
  // User Authentication
  // SignIn / Login
  app.get('/auth-login', (req, res, next) => {
    repo.signIn().then(profile => {
      res.status(status.OK).json(profile)
    }).catch(next)
  })

  // SignOut / Logout
  app.get('/auth-logout', (req, res, next) => {
    repo.signOut().then(movies => {
      res.status(status.OK).json(movies)
    }).catch(next)
  })
}