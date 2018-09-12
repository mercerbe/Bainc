//=================dependencies====================//
const express = require('express')
const router = express.Router()
//================================================//

//=================routes========================//
router.get('/test', (req, res) => res.json({msg: "user route test is working"}))
//=================d=============================//
