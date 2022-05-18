const db = require('../dbconfig')


const Category = db.category

const getAllCategory = async (req, res) => {

    try{
        const result = await Category.findAll()

        if(result){
            return res.status(200).send(result)
        }

        return res.status(404).send({message: 'Category not found'})
    }catch(err){
        return res.send({message: err})
    }
}

module.exports = { getAllCategory }