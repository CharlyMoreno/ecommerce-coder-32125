const { Router } = require('express')
const viewsAuthRoutes = Router()

const ViewsAuthController = require('../controllers/views.auth.controllers')

//___________________________________________  VALIDATIONS  _________________________________________________ //
const {registerValidation} = require('../middleware/validator/userValidator.middleware')

viewsAuthRoutes.get('/login',ViewsAuthController.getLogin)
viewsAuthRoutes.post('/login',ViewsAuthController.postLogin)
viewsAuthRoutes.get('/logout',ViewsAuthController.logout)
viewsAuthRoutes.get('/register',ViewsAuthController.getRegister)
viewsAuthRoutes.post('/register',registerValidation,ViewsAuthController.postRegister)


module.exports = viewsAuthRoutes;