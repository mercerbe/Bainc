//=================dependencies====================//
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')//searching for user with payload
const User = mongoose.model('users')//bring in user model
const keys = require('../config/keys')//secret
//==================================================//

//jwt options object
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //find user
    User.findById(jwt_payload.id)
      .then(user => {
        if(user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}
