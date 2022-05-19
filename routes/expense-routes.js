const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth-middleware')
const { 
    addIncome,
    addExpense,
    deleteExpenditure,
    getAllExpenditure
 } = require('../controllers/expense-controller')

router.get('/:budgetId', auth, getAllExpenditure)
router.post('/add-income', auth, addIncome)
router.post('/add-expense', auth, addExpense)
router.delete('/:id', auth, deleteExpenditure)

module.exports = router