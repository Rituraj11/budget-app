const express = require('express')
const expressEjsLayout = require('express-ejs-layouts') 
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()

const index = require('./routes/index')
const auth = require('./routes/auth-routes')
const user = require('./routes/user-routes')
const budget = require('./routes/budget-routes')
const category = require('./routes/category-routes')
const expense = require('./routes/expense-routes')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(expressEjsLayout)

app.use('/', index)
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/budget', budget)
app.use('/api/category', category)
app.use('/api/expense', expense)

const port = process.env.APP_PORT || 8000

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
