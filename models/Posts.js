//=================dependencies====================//
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//================================================//

//=================Schema========================//
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },//connect user's avatar and name, but stay even if user deletes account
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  handle: {
    type: String
  },
  //each like associated to the user who liked it -- not perimitting multiple likes
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

})
//================================================//

module.exports = Post = mongoose.model('post', PostSchema)
