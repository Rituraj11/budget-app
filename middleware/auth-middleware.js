const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.header('auth-token')

        if(!token) return res.status(403).send({message: 'Access Denied.'})

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)
        req.user = decoded

        next();
    }catch(err){
        res.status(400).send('Invalid token')
    }
}