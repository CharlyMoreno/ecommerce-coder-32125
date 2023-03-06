const { Router } = require('express')
const viewsRoutes = Router()

const {authViewsMiddleware} = require('../middleware/views.auth.middleware')
const ViewsControllers = require('../controllers/views.controllers')

const {createProduct} = require('../middleware/validator/productosValidator.middleware')

viewsRoutes.get('/',authViewsMiddleware,ViewsControllers.getIndex)
viewsRoutes.get('/chat',authViewsMiddleware,ViewsControllers.getMensajes)
viewsRoutes.post('/chat',authViewsMiddleware,ViewsControllers.postMensajes)
viewsRoutes.get('/productos',ViewsControllers.getViewsProductos)
viewsRoutes.get('/carrito',authViewsMiddleware,ViewsControllers.getCarrito)
viewsRoutes.get('/carrito/addProducto/:idProducto/:cantProducto',authViewsMiddleware,ViewsControllers.addProductoCarrito)
viewsRoutes.get('/carrito/deleteProducto/:idProducto',authViewsMiddleware,ViewsControllers.deleteProductoCarrito)
viewsRoutes.get('/carrito/confirmarCompra',authViewsMiddleware,ViewsControllers.confirmarCompra)
viewsRoutes.get('/ordenes',authViewsMiddleware,ViewsControllers.getOrdenes)
viewsRoutes.get('/ordenes/:idOrden',authViewsMiddleware,ViewsControllers.getOrdenesByID)

viewsRoutes.get('/crud/productos',authViewsMiddleware,ViewsControllers.getCrudProductos)
viewsRoutes.get('/crud/productos/crear',authViewsMiddleware,ViewsControllers.getViewCrearProductos)
viewsRoutes.post('/crud/productos/crear',authViewsMiddleware,createProduct,ViewsControllers.postCrearProductos)
viewsRoutes.get('/crud/productos/editar/:idProducto',authViewsMiddleware,ViewsControllers.getEditarProductos)
viewsRoutes.post('/crud/productos/editar/:idProducto',authViewsMiddleware,createProduct,ViewsControllers.postEditarProductos)

module.exports = viewsRoutes;