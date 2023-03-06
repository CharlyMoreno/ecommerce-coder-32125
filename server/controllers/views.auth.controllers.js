const AuthServices = require('../services/auth.services')
const UnauthorizedException = require('../utils/exceptions/auth.exceptions')
const ValidationError = require('../utils/exceptions/validation.exceptions')

const {logger} = require('../utils/logger')

const {checkValidation} = require('../middleware/validation.middleware');

const getLogin = async (req,res) => {
    res.render('login')
}

const getRegister = async (req,res) => {
    res.render('register')
}

const postLogin = async (req,res) => {
    try{
        const {username,password} = req.body
        const token = await AuthServices.login(username,password)
        res.cookie('access_token',token,{httpOnly:true})
        res.redirect('/')
    }
    catch(error){
        if(error instanceof UnauthorizedException) res.render('login',{signinMessage:error.message})
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

const postRegister = async (req,res) =>{
    try{
        checkValidation(req)
        await AuthServices.register(req.body)
        res.redirect('login')
    }
    catch(error){
        if(error instanceof ValidationError) res.render('register',{signupMessage:error.data.data[0].msg})
        else if(error instanceof UnauthorizedException) res.render('register',{signupMessage:error.message})
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

const logout = (req,res) => {
    const token = req.cookies.access_token
    if(token){
        res.clearCookie('access_token')
        res.redirect('/auth/login')
    }
}

module.exports = {getLogin,postLogin,postRegister,getRegister,logout}