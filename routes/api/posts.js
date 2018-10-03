//=================dependencies====================//
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
//model
const Post = require('../../models/Posts')
const Profile = require('../../models/Profile')
//validation
const validatePostInput = require('../../validation/post')
//================================================//

//=================routes========================//
//@route GET api/posts/test
//@desc Tests posts route
//@access Public
router.get('/test', (req, res) => res.json({msg: "posts route test is working"}))

//@route GET api/posts
//@desc Get all posts
//@access Public
router.get('/', (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts exist yet!'}))
})

//@route GET api/posts/:id
//@desc Get a single post by id
//@access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that id'}))
})

//@route POST api/posts
//@desc Create new post
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  //init errors and isEmpty
  const { errors, isValid } = validatePostInput(req.body)
  //validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  //new post
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
    handle: req.body.handle
  })

  newPost.save().then(post => res.json(post))
})

//@route DELETE api/posts/:id
//@desc Delete a post
//@access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //ensure user/profile is associated with post
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check for post owner
          if(post.user.toString() !== req.user.id) {
            //return unauthorized status
            return res.status(401).json({ notauthorized: 'User not authorized to delete this post'})
          }
          //run delete
          post.remove()
            .then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({postnotfound: 'Post not found'}))
    })
})

//@route POST api/posts/like/:id
//@desc Like a post
//@access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //ensure user/profile is associated with post
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if user has liked the post
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this post' })
          }
          //add user id to likes array
          post.likes.unshift({ user: req.user.id })
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound: 'Post not found'}))
    })
})

//@route POST api/posts/unlike/:id
//@desc Unlike a post
//@access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //ensure user/profile is associated with post
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if user has liked the post
          if(post.likes.filter(like => like.user.toString() === req.user.id).length = 0) {
            return res.status(400).json({ notliked: 'User has not liked this post' })
          }
          //Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)
          //splice out of likes array
          post.likes.splice(removeIndex, 1)
          //save changes
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound: 'Post not found'}))
    })
})

//@route POST api/posts/comment/:id
//@desc Add comment to a post
//@access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //init errors and isEmpty
  const { errors, isValid } = validatePostInput(req.body)
  //validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  Post.findById(req.params.id)
    .then(post => {
      //new comment object
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }
      //add to comments array
      post.comments.unshift(newComment)
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found to comment on'}))
})

//@route DELETE api/posts/comment/:id/:comment_id
//@desc Delete comment on a post
//@access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      //check if comment exists
      if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length = 0) {
        return res.status(404).json({ commentnotfound: 'There is no comment found to delete'})
      }
      //get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id)
      //splice out of the array
      post.comments.splice(removeIndex, 1)
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found to comment on'}))
})
//================================================//

module.exports = router
