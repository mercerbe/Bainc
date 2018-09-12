//=================dependencies====================//
const express = require('express')
const router = express.Router()
//================================================//

//=================routes========================//
//@route GET api/profile/test
//@desc Tests profile route
//@access Public
router.get('/test', (req, res) => res.json({msg: "profile route test is working"}))
//================================================//

module.exports = router
