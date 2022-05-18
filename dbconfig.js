const dotenv = require('dotenv')
const { Sequelize, DataTypes } = require('sequelize')

dotenv.config()

const db_name = process.env.DB_NAME
const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD || ''
const db_host = process.env.DB_HOST

const sequelize = new Sequelize(db_name, db_username, db_password, {
    dialect: 'mysql',
    host: db_host
})

sequelize.authenticate()
    .catch( err => console.log(err))
    .then( () => console.log('DB connected..'))

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./models/user-model')(sequelize,DataTypes)
db.budget = require('./models/budget-model')(sequelize,DataTypes)
db.category = require('./models/category-model')(sequelize,DataTypes)

db.user.hasMany(db.budget)
db.budget.belongsTo(db.user)

db.category.hasMany(db.budget)
db.budget.belongsTo(db.category)

db.sequelize.sync({ force: false })
    .catch( err => console.log(err))
    .then( () => console.log('Re-sync DB.'))


module.exports = db    
