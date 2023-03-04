const { Router } = require('express')
const mensajesRouter = Router()

const { authMiddleware } = require('../middleware/auth.middleware')

const MensajesController = require('../controllers/api.mensajes.controllers')

mensajesRouter.get('/:email',MensajesController.getMensajesByEmail)
mensajesRouter.post('/',authMiddleware,MensajesController.guardarMensaje)

module.exports = mensajesRouter;