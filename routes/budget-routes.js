const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth-middleware')
const { 
    createBudget,
    getBudget,
    getAllBudgets,
    updateBudget,
    deleteBudget
} = require('../controllers/budget-controller')

router.post('/',auth,createBudget)
router.get('/:id',auth,getBudget)
router.get('/',auth,getAllBudgets)
router.put('/:id',auth,updateBudget)
router.delete('/:id',auth,deleteBudget)

module.exports = router