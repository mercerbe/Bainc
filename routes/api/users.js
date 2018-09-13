//=================dependencies====================//
const express = require('express')
const router = express.Router()
//user model
const User = require('../../models/User')
//gravatar
const gravatar = require('gravatar')
//bcrypt
const bcrypt = require('bcryptjs')
//================================================//

//=================routes========================//
//@route GET api/users/test
//@desc Tests user route
//@access Public
router.get('/test', (req, res) => res.json( {msg: "user route test is working"} ))

//@route GET api/users/register
//@desc Register a new user
//@access Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      //user email already registered
      if(user) {
        return res.status(400).json({ email: 'Email already exists' })
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
//@desc login an existing user
//@access Public


//===============================================//

module.exports = router
