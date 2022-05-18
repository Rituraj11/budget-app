const db = require('../dbconfig')

const User = db.user
const Budget = db.budget
const Category = db.category

const createBudget = async (req, res) => {
    if(req.body.budget_name == undefined || req.body.budget_amount == undefined || req.body.budget_month == undefined){
        return res.send({message: 'Data missing'})
    }

    try{
        const result = await Budget.create({
            budget_name: req.body.budget_name,
            budget_amount: req.body.budget_amount,
            budget_month: req.body.budget_month,
            userId: req.user.id,
            categoryId: req.body.categoryId
        })
    
        return res.status(201).send({message: 'Budget Created'})

    }catch(err){
        return res.send({message: err})
    }

}

const getBudget = async (req, res) => {
    var budgetId = req.params.id

    try{
        const result = await Budget.findOne({
            where:{
                id: budgetId,
                userId: req.user.id
            },
            include: [{
                model: User
            },{
                model: Category
            }]
        })

        if(result){
            return res.status(200).send(result)
        }

        return res.status(404).send({message: 'Budget not found'})

    }catch(err){
        return res.send({message: err})
    }
}

const getAllBudgets = async (req, res) => {
    try{
        const result = await Budget.findAll({
            where:{
                userId: req.user.id
            },
            include: [{
                model: User
            },{
                model: Category
            }]
        })

        if(result){
            return res.status(200).send(result)
        }

        return res.status(404).send({message: 'Budget not found'})

    }catch(err){
        return res.send({message: err})
    }
}

const updateBudget = async (req, res) => {
    //
}

const deleteBudget = async (req, res) => {

    var budgetId = req.params.id
    try{
        const result = await Budget.destroy({
            where:{
                id: budgetId,
                userId: req.user.id
            }
        })

        return res.status(204).send({message:'deleted'})

    }catch(err){
        return res.send({message: err})
    }
}

const validateBudget = (budget) => {
    const schema = joi.object({
        budget_name: joi.string().required(),
        budget_amount: joi.number().required(),
        budget_month: joi.string().required()
    })
    return schema.validate(budget)
}

module.exports = { 
    createBudget,
    getBudget,
    getAllBudgets,
    updateBudget,
    deleteBudget
}