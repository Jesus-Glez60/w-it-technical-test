const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.users
const path = require('path')
const passport = require('passport')

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body

  if (!first_name || !last_name || !email || !password || !role) {
    return res.render('register', { error: 'Content can not be empty!' })
  }

  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    return res.render('register', { error: 'User already exists!' })
  }

  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: bcrypt.hashSync(password, 8),
    role: role
  })

  await user
    .save(user)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      return res.render('register', { error: err.message || 'Some error occurred while creating the User.' })
    })
}

exports.logInUser = async (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/landing',
    failureRedirect: '/login?error'
  })(req, res)
}

exports.logoutUser = (req, res) => {
  req.logout(() => res.redirect('/'))
}

exports.loginView = (req, res) => {
  res.render('login')
}

exports.registerView = (req, res) => {
  res.sendFile(path.join(__dirname, '/app/views/register.html'))
}

exports.landingView = (req, res) => {
  res.render('landing')
}
