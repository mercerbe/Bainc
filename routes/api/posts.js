//=================dependencies====================//
const express = require('express')
const router = express.Router()
//================================================//

//=================routes========================//
//@route GET api/posts/test
//@desc Tests posts route
//@access Public
router.get('/test', (req, res) => res.json({msg: "posts route test is working"}))
//================================================//

module.exports = router
