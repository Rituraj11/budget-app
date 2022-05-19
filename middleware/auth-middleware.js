const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.header('auth-token')

        if (token == 'undefined' || token == undefined ){
            console.log('hi')
            if(req.header('uid') == undefined){
                return res.status(403).send({message: 'Access Denied.'})
            }

            const uId = req.header('uid')
            console.log(uId)

            req.user = {
                'id': uId
            }

            next();
        }else{
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)
            req.user = decoded

            next();
        }

        // if(!token) return res.status(403).send({message: 'Access Denied.'})

    }catch(err){
        res.status(400).send('Invalid token')
    }
}