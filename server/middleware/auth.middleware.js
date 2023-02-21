const jwt = require('jsonwebtoken')

const {logger} = require('../utils/logger')
const config = require('../utils/config')

const authMiddleware = (req, res, next) => {
    try{
        const authorization = req.get('authorization')
        if(authorization) {
            let token = ''
          
            if (authorization && authorization.toLowerCase().startsWith('bearer')) {
              token = authorization.substring(7)
            }
          
            const decodedToken = jwt.verify(token, config.SECRET)
    
          
            if (!token || !decodedToken.idUser) {
              return res.status(401).json({ error: 'Acceso denegado. Token invalido' })
            }
          
            req.idUser = decodedToken.idUser
          
            next()
        }
        else{
            return res.status(401).json({ error: 'Acceso denegado. Token invalido' })
        }
    }
    catch(error){
        if(error instanceof jwt.TokenExpiredError) res.status(401).json({ error: 'Acceso denegado. Token invalido' })
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

module.exports = { 
    authMiddleware
}
