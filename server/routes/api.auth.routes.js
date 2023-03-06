const { Router } = require('express')
const authRoutes = Router()

const AuthController = require('../controllers/auth.controllers')
//___________________________________________  VALIDATIONS  _________________________________________________ //
const {registerValidation} = require('../middleware/validator/userValidator.middleware')

authRoutes.post('/login',AuthController.login)
authRoutes.post('/register',registerValidation,AuthController.register)

module.exports = authRoutes;