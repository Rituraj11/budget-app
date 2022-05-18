const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth-middleware')
const { 
    getAllCategory,
} = require('../controllers/category-controller')

router.get('/',auth,getAllCategory)


module.exports = router