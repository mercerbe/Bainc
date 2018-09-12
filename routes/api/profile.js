//=================dependencies====================//
const express = require('express')
const router = express.Router()
//================================================//

//=================routes========================//
router.get('/test', (req, res) => res.json({msg: "profile route test is working"}))
//=================d=============================//
