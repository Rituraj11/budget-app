const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth-middleware')
const { 
    getAllCategory,
    createCategory
} = require('../controllers/category-controller')

router.get('/',getAllCategory)
router.post('/', auth, createCategory)


module.exports = router