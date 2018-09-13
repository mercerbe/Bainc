//=================dependencies====================//
const express = require('express')
const router = express.Router()
//user model
const User = require('../../models/User')
//gravatar
const gravatar = require('gravatar')
//bcrypt
const bcrypt = require('bcryptjs')
//json web tokens
const jwt = require('jsonwebtoken')
//key for JWT
const keys = require('../../config/keys')
//passport
const passport = require('passport')
//================================================//

//=================routes========================//
//@route GET api/users/test
//@desc Tests user route
//@access Public
router.get('/test', (req, res) => res.json( {msg: "user route test is working"} ))

//@route POST api/users/register
//@desc Register a new user
//@access Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      //user email already registered
      if(user) {
        return res.status(400).json({ email: 'An account with this email address already exists.' })
      //create new user
      } else {
        //gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200',//size
          r: 'pg',//rating
          d: 'mm'//default image
        })
        //new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        })
        //bcrypt for password encryption
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) { throw err }
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
              })
          })
        }
      })
    })

//@route GET api/users/login
//@desc login an existing user and return JWT token
//@access Public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  //find user via email
  User.findOne({ email: req.body.email })
    .then(user => {
      //check user
      if(!user) {
        return res.status(404).json({ email: 'No users registered with this email address.' })
      }
      //check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            //User match success
            const payload = { id: user.id, name: user.name, avatar: user.avatar } //JWT payload
            //Sign Token...expire in 1 hour for security
            jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                msg: 'Successful sign in.'
              })
            })
          } else {
            return res.status(400).json({password: 'Password does not match email provided.'})
          }
        })
    })
})
//@route GET api/users/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  //test response token
  res.json({msg: 'Success, current token still valid with ' +  req.user.name})
})
//===============================================//

module.exports = router
