const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth-middleware')
const { userData } = require('../controllers/user-controller')

router.get('/me',auth, userData)

module.exports = router
