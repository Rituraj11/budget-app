const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth-middleware')


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/dashboard',(req, res) => {
    res.render('dashboard')
})

router.get('/budget',(req, res) => {
    res.render('expense')
})

module.exports = router