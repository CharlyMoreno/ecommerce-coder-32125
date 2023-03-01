const { Router } = require('express')
const carritoRouter = Router()

const { authMiddleware } = require('../middleware/auth.middleware')

const CarritoController = require('../controllers/api.carrito.controllers')

// APLICA EL MIDDLEWARE DE AUTENTICACION A TODAS LAS RUTAS DE CARRITO
carritoRouter.use(authMiddleware)

carritoRouter.get('/',CarritoController.getCarritoByUser)
carritoRouter.get('/addProducto/:idProducto/:cantProducto',CarritoController.addProduct)
carritoRouter.get('/deleteProducto/:idProducto',CarritoController.deleteProduct)
carritoRouter.get('/confirmarCompra',CarritoController.confirmarCompra)

module.exports = carritoRouter;