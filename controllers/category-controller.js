const db = require('../dbconfig')


const Category = db.category


// Get all category list 
const getAllCategory = async (req, res) => {
    try{
        const result = await Category.findAll()

        if(result){
            return res.status(200).send(result)
        }

        return res.status(404).send({message: 'Category not found'})
    }catch(err){
        return res.status(400).send({message: err})
    }
}

// Create Category by loggedin user
const createCategory = async (req, res) => {

    if(req.body.category_name == undefined){
        return res.status(400).send({message: 'Data missing'})
    }

    try{
        const result = await Category.create({
            category_name: req.body.category_name
        })

        return res.status(201).send({message: 'Category Created'})
    }catch(err){
        return res.status(400).send({message: err})
    }
}

module.exports = { getAllCategory, createCategory }