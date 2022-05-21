const db = require('../dbconfig')

const User = db.user

// Get User data by id
const userData = async (req, res) => {
    var userId = req.user.id
    
    try{

        var userExists = await User.findOne({
            where: {
                id: userId
            }
        })

        if(userExists){
            return res.status(200).send(userExists)
        }
        
        return res.status(401).send({message: 'User not found'})
    }catch(err){
        return res.status(400).json({message: err})
    }
}

module.exports = { userData }