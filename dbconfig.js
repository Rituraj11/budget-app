const dotenv = require('dotenv')
const { Sequelize, DataTypes } = require('sequelize')

dotenv.config()

const db_name = process.env.DB_NAME
const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD || ''
const db_host = process.env.DB_HOST
const port = process.env.RDS_PORT

const sequelize = new Sequelize(db_name, db_username, db_password, {
    dialect: 'mysql',
    host: db_host,
    // port: port,
    // logging: console.log,
    // maxConcurrentQueries: 100,
    // ssl: 'Amazon RDS',
    // pool: { maxConnections: 5, maxIdleTime: 30 },
    // language: 'en',
})

sequelize.authenticate()
    .catch( err => console.log(err))
    .then( () => console.log('DB connected..'))

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Table Schema
db.user = require('./models/user-model')(sequelize,DataTypes)
db.budget = require('./models/budget-model')(sequelize,DataTypes)
db.category = require('./models/category-model')(sequelize,DataTypes)
db.expense = require('./models/expense-model')(sequelize,DataTypes)


// Table Relationships
db.user.hasMany(db.budget)
db.budget.belongsTo(db.user)

db.category.hasMany(db.budget)
db.budget.belongsTo(db.category)


db.budget.hasOne(db.expense)
db.expense.belongsTo(db.budget)

db.sequelize.sync({ force: false })
    .catch( err => console.log(err))
    .then( () => console.log('Re-sync DB.'))


module.exports = db    
