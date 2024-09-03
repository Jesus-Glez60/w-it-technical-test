module.exports = (app) => {
  const users = require('../controllers/index.controller.js')
  var router = require('express').Router()

  router.get('/', (req, res) => {
    res.render('login')
  })

  router.get('/login', (req, res) => {
    res.render('login')
  })

  router.get('/register', (req, res) => {
    res.render('register')
  })

  router.get('/landing', (req, res) => {
    res.render('landing', { name: req.user.first_name, role: req.user.role })
  })

  router.post('/register', users.createUser)

  router.post('/login', users.logInUser)

  router.get('/logout', users.logoutUser)

  app.use('/', router)
}
