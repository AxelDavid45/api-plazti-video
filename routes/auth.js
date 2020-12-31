const express = require('express')
const router = express.Router()
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../services/api-keys')
const { authJwtSecret } = require('../config')

// Basic strategy
require('../auth/strategies/basic')

const apiKeyInstance = new ApiKeysService()

router.post('/sign-in', async (req, res, next) => {
  // this will help us to know which permissions the user will have
  const { apiKeyToken } = req.body

  if (!apiKeyToken) {
    next(boom.unauthorized('apiKeyToken is required'))
  }

  // use passport to verify the users exists and set req.user
  passport.authenticate('basic', function basicAuthentication (error, user) {
    try {
      if (error || !user) {
        console.error('Passport basic strategy -----', error)
        next(boom.unauthorized())
      }

      req.login(user, { session: false }, async function logInPassport (error) {
        if (error) {
          next(error)
        }
        const apiKey = await apiKeyInstance.getApiKey({ token: apiKeyToken })
        if (!apiKey) {
          return next(boom.unauthorized())
        }
        const { _id: id, name, email } = user
        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes
        }
        const token = await jwt.sign(payload, authJwtSecret, {
          expiresIn: '15m'
        })

        return res.json({ token, user: { id, name, email } })
      })
    } catch (error) {
      next(error)
    }
  })(req, res, next)
})

module.exports = router
