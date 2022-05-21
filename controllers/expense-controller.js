const db = require('../dbconfig')

const Budget = db.budget
const Expense = db.expense

//  Add income of loggedin user
const addIncome = async (req, res) => {

    if( req.body.expense_name == undefined || req.body.amount == undefined || req.body.spend_date == undefined ){
        return res.status(403).send({message:'Data missing'})
    }

    let data = {
        expense_name: req.body.expense_name,
        income: req.body.amount,
        spend_date: req.body.spend_date,
        budgetId: req.body.budgetId
    }

    try{
        const result = await Expense.create(data)

        return res.status(201).send(result)
    }catch(err){
        return res.status(400).send({message: err})
    }
}


// Add Expense of loggedin user
const addExpense = async (req, res) => {
    if( req.body.expense_name == undefined || req.body.amount == undefined || req.body.spend_date == undefined ){
        return res.status(403).send({message:'Data missing'})
    }

    let data = {
        expense_name: req.body.expense_name,
        expense: req.body.amount,
        spend_date: req.body.spend_date,
        budgetId: req.body.budgetId
    }

    try{
        const result = await Expense.create(data)

        return res.status(201).send(result)
    }catch(err){
        return res.status(400).send({message: err})
    }
}

// Delete expenditure of loggedin user
const deleteExpenditure = async (req, res) => {
    const expenseId = req.params.id

    try{
        const result = await Expense.destroy({
            where:{
                id: expenseId
            },
            include: [{
                model: Budget
            }]
        })

        return res.status(204).send({message: 'Expense deleted'})

    }catch(err){
        return res.status(400).send({message: err})
    }
}

// Get all expenditure of loggedin user
const getAllExpenditure = async (req, res) => {
    const budgetId = req.params.budgetId

    try{
        const result = await Expense.findAll({
            where:{
                budgetId: budgetId
            },
            include: [{
                model: Budget
            }]
        })

        if(result){
            return res.status(200).send(result)
        }

        return res.status(404).send({message: 'Expense data not found'})

    }catch(err){
        return res.status(400).send({message: err})
    }
}

module.exports = { 
    addIncome,
    addExpense,
    deleteExpenditure,
    getAllExpenditure
}