'use strict'
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const UsersService = require('../../services/users')

passport.use(new BasicStrategy(async (email, password, cb) => {
  const service = new UsersService()
  try {
    const user = await service.getUser({ email })
    if (!user) {
      return cb(boom.unauthorized())
    }

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
      return cb(boom.unauthorized())
    }

    delete user.password
    return cb(null, user)
  } catch (err) {
    cb(err)
  }
}))
