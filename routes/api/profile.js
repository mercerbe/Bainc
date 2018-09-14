//=================dependencies====================//
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
//validation
const validateProfileInput = require('../../validation/profile')
//models
const Profile = require('../../models/Profile')
const User = require('../../models/User')
//================================================//

//=================routes========================//
//@route GET api/profile/test
//@desc Tests profile route
//@access Public
router.get('/test', (req, res) => res.json({msg: "profile route test is working"}))

//@route GET api/profile -- don't need :id, we have payload from token
//@desc Get current user's profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //init errors object
  const errors = {}

  Profile.findOne({ user: req.user.id })
  //populate user info into profile
  .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'No profile exists for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

//@route GET api/profile/all
//@desc Get all profiles
//@access Public -- anyone can look at a profile, logged in or not
router.get('/all', (req, res) => {
  //init errors object
  const errors = {}

  Profile.find({})
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if(!profiles) {
        errors.noprofiles = 'No profiles exists'
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => res.status(404).json(err))
})

//@route GET api/profile/handle/:handle -- backend route
//@desc Get user's profile by handle
//@access Public -- anyone can look at a profile, logged in or not
router.get('/handle/:handle', (req, res) => {
  //init errors object
  const errors = {}

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'No profile exists for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

//@route GET api/profile/user/:user_id -- backend route
//@desc Get user's profile by user id
//@access Public -- anyone can look at a profile, logged in or not
router.get('/user/:user_id', (req, res) => {
  //init errors object
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'No profile exists for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

//@route POST api/profile -- don't need :id, we have payload from token
//@desc Post and create or edit/update user's profile
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //VALIDATION
  const { errors, isValid } = validateProfileInput(req.body)
  if(!isValid) {
    //return error messages with 400
    return res.status(400).json(errors)
  }
  //get all fields
  const profileFields = {}
  profileFields.user = req.user.id //includes name, email, avatar
  //handle
  if(req.body.handle) { profileFields.handle = req.body.handle }
  //company
  if(req.body.company) { profileFields.company = req.body.company }
  //website
  if(req.body.website) { profileFields.website = req.body.website }
  //location
  if(req.body.location) { profileFields.location = req.body.location }
  //status
  if(req.body.status) { profileFields.status = req.body.status}
  //bio
  if(req.body.bio) { profileFields.bio = req.body.bio }
  //spotifyId
  if(req.body.spotifyId) { profileFields.spotifyId = req.body.spotifyId }
  //skills - split into array from CSVs
  if(typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }
  //Social
  profileFields.social = {}
  //youtube
  if(req.body.youtube) { profileFields.social.youtube = req.body.youtube }
  //twitter
  if(req.body.twitter) { profileFields.twitter.youtube = req.body.twitter }
  //facebook
  if(req.body.facebook) { profileFields.social.facebook = req.body.facebook }
  //linkedin
  if(req.body.linkedin) { profileFields.social.linkedin = req.body.linkedin }
  //instagram
  if(req.body.instagram) { profileFields.social.instagram = req.body.instagram }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        //this is an update/edit since the profile already exists
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json(profile))
      } else {
        //create a new profile bc profile was not found
        //check to see if handle already exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile) {
              errors.handle = 'That handle is already taken. Please choose another handle.'
              res.status(400).json(errors)
            }
            //save new profile
            new Profile(profileFields).save()
              .then(profile => res.json(profile))
          })
      }
    })
})
//================================================//

module.exports = router
