const bcrypt = require('bcrypt')
const joi = require('joi')
const jwt = require('jsonwebtoken')


const db = require('../dbconfig')

const User = db.user

// User sign up
const register = async (req, res) => {
    try{
        const { error } = validateRegister(req.body)
        if (error) return res.status(422).json({message: error.details[0].message})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))

        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!userExists){

            const result = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword,
                total_income: req.body.total_income
            })

            return res.status(201).json(result)
        }

        return res.status(422).json({message: 'Already a user'})
    }catch(err){
        return res.status(400).json({message: err})
    }
}

// User Login
const login = async (req, res) => {
    try{
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).json({message:error.details[0].message})

        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(userExists){

            const hashedPassword = userExists.password
            const matched = await bcrypt.compare(req.body.password, hashedPassword)

            if(matched){
                var userData = {
                    'id': userExists.id,
                    'email': userExists.email
                }

                const jwtToken = jwt.sign(userData, process.env.JWTPRIVATEKEY)

                return res.cookie('jwtToken',jwtToken, { expires: new Date( Date.now() + (60 * 60 * 1000))}).status(200).json({'user_id': userExists.id, 'token': jwtToken})
            }

            return res.status(404).json({message: 'Password doesnot match'})
        }

        return res.status(404).json({message: 'User doesnot exists.'})

    }catch(err){
        return res.status(400).json({message: err})
    }
}


const validateRegister = (user) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.number().required(),
        password: joi.string().required(),
        total_income: joi.number().required()
    })
    return schema.validate(user)
}

const validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    return schema.validate(user)
}

module.exports = { register, login }