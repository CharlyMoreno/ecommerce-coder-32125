const jwt = require('jsonwebtoken')

const {logger} = require('../utils/logger')
const config = require('../utils/config')

const authViewsMiddleware = (req, res, next) => {
    try{
        const token = req.cookies.access_token
        if(token){
            const decodedToken = jwt.verify(token, config.SECRET)
            if (!decodedToken.idUser) {
                res.redirect('/auth/login')
            }
            req.idUser = decodedToken.idUser
            next()
        }
        else res.redirect('/auth/login')
    }
    catch(error){
        res.redirect('/auth/login')
        logger.error(error)
    }
}
const decodedToken = (token) => {
    const tokenDecoded = jwt.verify(token, config.SECRET)
    return tokenDecoded
}


module.exports = { 
    authViewsMiddleware,decodedToken
}
