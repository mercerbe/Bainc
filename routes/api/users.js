//=================dependencies====================//
const express = require('express')
const router = express.Router()
//================================================//

//=================routes========================//
//@route GET api/users/test
//@desc Tests user route
//@access Public
router.get('/test', (req, res) => res.json({msg: "user route test is working"}))
//===============================================//

module.exports = router
