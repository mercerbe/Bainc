//=================dependencies====================//
const express = require('express')
const router = express.Router()
//================================================//

//=================routes========================//
router.get('/test', (req, res) => res.json({msg: "posts route test is working"}))
//=================d=============================//
