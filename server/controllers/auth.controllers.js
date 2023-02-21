const AuthServices = require('../services/auth.services')

const {logger} = require('../utils/logger')
const {checkValidation} = require('../middleware/validation.middleware');

const ValidationError = require('../utils/exceptions/validation.exceptions')
const UnauthorizedException = require('../utils/exceptions/auth.exceptions')

const login = async (req,res) => {
    try{
        const {username,password} = req.body
        const token = await AuthServices.login(username,password)
        res.status(200).json({"token":token})
    }
    catch(error){
        if(error instanceof UnauthorizedException) res.status(error.status).json({"error":error.message})
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

const register = async (req,res) =>{
    try{
        checkValidation(req)
        await AuthServices.register(req.body)
        res.status(200).json({"message":"Registro exitoso"});
    }
    catch(error){
        if(error instanceof ValidationError) res.status(error.status).json(error.data)
        if(error instanceof UnauthorizedException) res.status(error.status).json({"error":error.message})
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

module.exports = {login,register}