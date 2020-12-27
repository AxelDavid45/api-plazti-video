const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { authJwtSecret } = require('../../config')
const UsersService = require('../../services/users')
const boom = require('@hapi/boom')
const opts = {
  secretOrKey: authJwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new Strategy(opts, async function jwtStrategyCallback (jwtPayload, done) {
  const usersService = new UsersService()

  // look up the user
  try {
    const user = await usersService.getUser({ email: jwtPayload.email })
    if (!user) {
      return done(boom.unauthorized(), false)
    }

    delete user.password

    done(null, { ...user, scopes: jwtPayload.scopes })
  } catch (err) {
    console.error(`Failed authentication with email: ${jwtPayload.email}`)
    return done(err)
  }
}))
