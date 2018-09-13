//=================dependencies====================//
//express
const express = require('express')
//mongoose
const mongoose = require('mongoose')
//body parser
const bodyParser = require('body-parser')
//set app for express
const app = express()
//routes
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
//================================================//


//==================body parser====================//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//================================================//


//===================DB config====================//
const db = require('./config/keys').mongoURI
//Connect to MongoDB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(()=> console.log('connected to DB'))
  .catch((err)=> console.log(err))
//================================================//


//==========================routes================//
app.get('/', (req, res) => res.send('init'))
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)
//===============================================//



//==========================server================//
//port
const port = process.env.PORT || 4000
//server listening
app.listen(port, () => console.log(`Server running on port ${port}`))
//==============================================//
